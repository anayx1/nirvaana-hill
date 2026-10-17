import assert from "node:assert/strict";
import { test, after } from "node:test";
import { registerHooks } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const tempDir = mkdtempSync(path.join(tmpdir(), "nirvaana-crm-test-"));
process.env.NIRVAANA_DATA_DIR = tempDir;
process.env.SEAD_CRM_FORM_KEY = "test-server-key";
// Stale deployments may still have these variables; they must have no effect.
process.env.RECAPTCHA_SECRET_KEY = "unused-legacy-secret";
const root = new URL("../", import.meta.url);
let emails = 0;
globalThis.__crmTestEmail = () => { emails += 1; };
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/email") return {
      url: "data:text/javascript,export async function sendContactNotification() { globalThis.__crmTestEmail(); }",
      shortCircuit: true,
    };
    if (specifier.startsWith("@/")) specifier = new URL(`src/${specifier.slice(2)}.js`, root).href;
    if (specifier === "next/server") specifier = pathToFileURL(path.resolve("node_modules/next/server.js")).href;
    return nextResolve(specifier, context);
  },
});

const { POST } = await import("../src/app/api/contact/route.js");
const { buildCrmPayload, sendCrmEnquiry, CRM_API_URL } = await import("../src/lib/crm.js");
const { getDb, getCrmDelivery, deleteContact, claimCrmDelivery } = await import("../src/lib/db.js");
const { deliverCrmContact } = await import("../src/lib/crm-delivery.js");
const originalFetch = globalThis.fetch;
after(() => {
  globalThis.fetch = originalFetch;
  getDb().close();
  rmSync(tempDir, { recursive: true, force: true });
  delete globalThis.__crmTestEmail;
});

const valid = { name: "Integration Test", phone: "+91 98765 43210", email: "test@example.com" };
let ip = 0;
function submit(body) {
  return POST(new Request("https://website.example/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `192.0.2.${++ip}` },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }));
}
const countContacts = () => getDb().prepare("SELECT COUNT(*) AS count FROM contacts").get().count;

test("each lead form saves locally, notifies email and sends exact CRM fields", async () => {
  for (const source of ["brochure-section", "contact-page-enquiry", "contact-page-channel-partner"]) {
    const contact = {
      ...valid, source, city: "Delhi", budget: "1-2 Crore", purpose: "Investment",
      companyName: "Test Company", requirement: "Site visit", message: "Please call",
      page_url: "https://website.example/contact-us?utm_source=google",
      referrer: "https://search.example/", utm_source: "google", utm_medium: "cpc",
      utm_campaign: "launch", utm_term: "farms", utm_content: "ad-a", gclid: "g1", fbclid: "f1",
      form_key: "untrusted", arbitrary: "not-forwarded", recaptchaToken: "expired-legacy-token",
    };
    let sent;
    globalThis.fetch = async (url, options) => {
      assert.equal(url, CRM_API_URL);
      assert.equal(options.method, "POST");
      sent = JSON.parse(options.body);
      assert.ok(options.signal);
      assert.equal(countContacts() > 0, true);
      return Response.json({ success: true, reference: "CRM-TEST-1" });
    };
    const beforeEmails = emails;
    const response = await submit(contact);
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.equal(result.success, true);
    assert.equal(emails, beforeEmails + 1);
    assert.equal(sent.form_key, "test-server-key");
    assert.equal(sent.phone, "+919876543210");
    assert.equal(sent.company_name, "Test Company");
    assert.equal(sent.companyName, undefined);
    assert.equal(sent.recaptchaToken, undefined);
    assert.equal(sent.arbitrary, undefined);
    assert.equal(sent.project, "Nirvaana Hills");
    assert.equal(sent.website, "");
    for (const key of ["city", "budget", "purpose", "source", "requirement", "message", "page_url", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
      assert.equal(sent[key], contact[key]);
    }
    assert.equal(sent.website_lead_id, result.data.id);
    assert.match(result.data.message, /Company: Test Company/);
    const delivery = getCrmDelivery(result.data.id);
    assert.equal(delivery.status, "sent");
    assert.equal(delivery.reference, "CRM-TEST-1");
    assert.equal(JSON.parse(delivery.payload).form_key, undefined);
    assert.equal(claimCrmDelivery(result.data.id), false);
  }
});

test("both newsletters retain email-only DB and email behavior without CRM", async () => {
  globalThis.fetch = () => { throw new Error("Newsletter must not call CRM"); };
  for (const source of ["blog-newsletter", "footer-newsletter"]) {
    const before = emails;
    const response = await submit({ email: "subscriber@example.com", source, recaptchaToken: "expired-legacy-token" });
    const result = await response.json();
    assert.equal(response.status, 201);
    assert.equal(getCrmDelivery(result.data.id), null);
    assert.equal(emails, before + 1);
  }
});

test("invalid input and spam never save or notify", async () => {
  const before = countContacts();
  const beforeEmails = emails;
  for (const body of ["{", [], null, { ...valid, name: " " }, { ...valid, phone: "123" }, { ...valid, name: {} }, { ...valid, email: "invalid" }]) {
    assert.equal((await submit(body)).status, 400);
  }
  assert.equal((await submit({ ...valid, message: "a".repeat(33000) })).status, 413);
  assert.equal((await submit({ ...valid, website: "https://spam.example" })).status, 201);
  assert.equal(countContacts(), before);
  assert.equal(emails, beforeEmails);
});

test("CRM rejection preserves contact and email; a manual retry cannot resend a sent lead", async () => {
  globalThis.fetch = async () => Response.json({ success: false }, { status: 400 });
  const before = emails;
  const result = await (await submit(valid)).json();
  assert.equal(result.success, true);
  assert.equal(emails, before + 1);
  assert.equal(getCrmDelivery(result.data.id).status, "failed");
  let calls = 0;
  const fetchImpl = async () => { calls++; return Response.json({ success: true, reference: "RETRY" }); };
  await Promise.all([deliverCrmContact(result.data.id, { fetchImpl }), deliverCrmContact(result.data.id, { fetchImpl })]);
  assert.equal(calls, 1);
  assert.equal(getCrmDelivery(result.data.id).attempts, 2);
  await deliverCrmContact(result.data.id, { fetchImpl });
  assert.equal(calls, 1);
});

test("network ambiguity is recorded and needs explicit confirmation before retry", async () => {
  globalThis.fetch = async () => { throw new Error("timeout"); };
  const result = await (await submit(valid)).json();
  assert.equal(result.success, true);
  assert.equal(getCrmDelivery(result.data.id).status, "unknown");
  assert.equal(claimCrmDelivery(result.data.id), false);
  let calls = 0;
  const fetchImpl = async () => { calls++; return Response.json({ success: true }); };
  await deliverCrmContact(result.data.id, { fetchImpl, allowUnknown: true });
  assert.equal(calls, 1);
  deleteContact(result.data.id);
  assert.equal(getCrmDelivery(result.data.id), null);
});

test("CRM protocol handles missing config, oversize, 429, 5xx and malformed success", async () => {
  const payload = buildCrmPayload(valid, "test-id");
  for (const [response, expected] of [
    [Response.json({ success: false }), "failed"],
    [Response.json({ success: false }, { status: 429 }), "failed"],
    [Response.json({ success: false }, { status: 503 }), "unknown"],
    [new Response("not json"), "unknown"],
    [Response.json({ reference: "missing-success-flag" }), "unknown"],
  ]) {
    assert.equal((await sendCrmEnquiry(payload, { fetchImpl: async () => response })).status, expected);
  }
  assert.equal((await sendCrmEnquiry({ ...payload, message: "a".repeat(33000) })).error, "CRM_PAYLOAD_TOO_LARGE");
  delete process.env.SEAD_CRM_FORM_KEY;
  globalThis.fetch = () => { throw new Error("Must not send without configuration"); };
  const result = await (await submit(valid)).json();
  assert.equal(result.success, true);
  assert.equal(getCrmDelivery(result.data.id).status, "pending");
  process.env.SEAD_CRM_FORM_KEY = "test-server-key";
});

test("browser context captures current URL attribution and the actual spam-trap value", async () => {
  const { getContactContext } = await import("../src/lib/contact-context.js");
  const originalFormData = globalThis.FormData;
  try {
    globalThis.window = { location: {
      href: "https://website.example/contact-us?utm_source=google&gclid=test-click",
      search: "?utm_source=google&gclid=test-click",
    } };
    globalThis.document = { referrer: "https://referrer.example/" };
    const form = {};
    globalThis.FormData = class {
      constructor(actual) { assert.equal(actual, form); }
      get(key) { assert.equal(key, "website"); return "bot-filled-value"; }
    };
    const context = getContactContext(form);
    assert.equal(context.page_url, window.location.href);
    assert.equal(context.referrer, document.referrer);
    assert.equal(context.utm_source, "google");
    assert.equal(context.gclid, "test-click");
    assert.equal(context.utm_campaign, "");
    assert.equal(context.website, "bot-filled-value");
  } finally {
    globalThis.FormData = originalFormData;
    delete globalThis.window;
    delete globalThis.document;
  }
});

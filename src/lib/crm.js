import { TRACKING_FIELDS } from "./contact-fields.js";

export const CRM_API_URL = "https://estateapi.ezulix.com/api/v1/public/leads";

// Only approved fields are forwarded. Never send reCAPTCHA tokens or let a
// browser override the account's server-side form key.
export function buildCrmPayload(contact, contactId) {
  const payload = {
    name: contact.name,
    phone: contact.phone,
    project: contact.project || "Nirvaana Hills",
    website: "",
    website_lead_id: contactId,
  };
  for (const key of [
    "email", "city", "budget", "bhk", "transactionType", "message", "timeline",
    "page_url", "referrer", "requirement", "source", "purpose", ...TRACKING_FIELDS,
  ]) {
    if (contact[key]) payload[key] = contact[key];
  }
  if (contact.companyName) payload.company_name = contact.companyName;
  return payload;
}

export async function sendCrmEnquiry(payload, { fetchImpl = fetch } = {}) {
  const formKey = process.env.SEAD_CRM_FORM_KEY?.trim();
  if (!formKey) return { status: "pending", error: "CRM_NOT_CONFIGURED" };

  const body = JSON.stringify({ ...payload, form_key: formKey });
  if (Buffer.byteLength(body, "utf8") > 32 * 1024) {
    return { status: "failed", error: "CRM_PAYLOAD_TOO_LARGE" };
  }

  try {
    const response = await fetchImpl(CRM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
      redirect: "error",
    });
    // An unreadable reply or 5xx can follow a successful insert. Do not retry
    // automatically: this API does not document an idempotency mechanism.
    const data = await response.json().catch(() => null);
    if (response.ok && data?.success === true) {
      return {
        status: "sent",
        reference: typeof data.reference === "string" ? data.reference : null,
      };
    }
    return {
      status: response.status >= 500 || !data || typeof data.success !== "boolean" ? "unknown" : "failed",
      error: `CRM_HTTP_${response.status}`,
    };
  } catch {
    return { status: "unknown", error: "CRM_NETWORK_OR_TIMEOUT" };
  }
}

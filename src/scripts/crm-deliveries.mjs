import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const { getDb, getCrmDelivery } = await import("../lib/db.js");
const { deliverCrmContact } = await import("../lib/crm-delivery.js");
const [command, contactId, confirmation] = process.argv.slice(2);

if (!command || command === "list") {
  console.table(getDb().prepare(`SELECT contactId, status, attempts, reference, lastError, updatedAt
    FROM crm_deliveries ORDER BY updatedAt DESC LIMIT 100`).all());
} else if (command === "retry" && contactId) {
  const existing = getCrmDelivery(contactId);
  if (!existing) throw new Error("CRM delivery not found for this contact ID.");
  if (["unknown", "sending"].includes(existing.status) && confirmation !== "--confirmed-not-in-crm") {
    throw new Error("Check with the CRM that this lead was not received, then pass --confirmed-not-in-crm. Retrying can duplicate a lead.");
  }
  const result = await deliverCrmContact(contactId, {
    allowUnknown: confirmation === "--confirmed-not-in-crm",
  });
  console.log({ contactId, status: result.status, reference: result.reference, error: result.lastError });
  if (result.status !== "sent") process.exitCode = 1;
} else {
  throw new Error("Usage: npm run crm -- [list | retry <contactId> [--confirmed-not-in-crm]]");
}

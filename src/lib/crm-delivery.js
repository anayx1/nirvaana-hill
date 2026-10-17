import { claimCrmDelivery, finishCrmDelivery, getCrmDelivery } from "./db.js";
import { sendCrmEnquiry } from "./crm.js";

export async function deliverCrmContact(contactId, { allowUnknown = false, fetchImpl } = {}) {
  if (!claimCrmDelivery(contactId, allowUnknown)) return getCrmDelivery(contactId);
  const delivery = getCrmDelivery(contactId);
  const result = await sendCrmEnquiry(JSON.parse(delivery.payload), { fetchImpl });
  finishCrmDelivery(contactId, result);
  if (result.status !== "sent") {
    console.warn("CRM delivery needs attention", { contactId, ...result });
  }
  return getCrmDelivery(contactId);
}

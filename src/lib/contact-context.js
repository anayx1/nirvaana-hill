import { TRACKING_FIELDS } from "./contact-fields.js";

// Capture before awaiting async work: React's event.currentTarget is only set
// during the submit handler's synchronous execution.
export function getContactContext(form) {
  const params = new URLSearchParams(window.location.search);
  return {
    page_url: window.location.href,
    referrer: document.referrer,
    website: String(new FormData(form).get("website") || ""),
    ...Object.fromEntries(TRACKING_FIELDS.map((key) => [key, params.get(key) || ""])),
  };
}

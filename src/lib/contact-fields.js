export const NEWSLETTER_SOURCES = ["blog-newsletter", "footer-newsletter"];

export const TRACKING_FIELDS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid",
];

export const CONTACT_FIELDS = [
  "name", "email", "phone", "requirement", "message", "source", "city",
  "budget", "purpose", "companyName", "project", "bhk", "transactionType",
  "timeline", "page_url", "referrer", "website",
  ...TRACKING_FIELDS,
];

export function normalizePhone(value) {
  return value.replace(/[\s().-]/g, "");
}

// The guide accepts a 10-digit mobile, optionally prefixed with India's country code.
export function isValidPhone(value) {
  return /^(?:\+?91)?[0-9]{10}$/.test(normalizePhone(value));
}

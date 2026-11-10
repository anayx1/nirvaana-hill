# SEAD Realty CRM integration

The enquiry, channel-partner and brochure forms submit to `/api/contact`.
The server validates the submission, saves the existing SQLite contact and a
CRM delivery record in one transaction, then awaits the CRM call and the existing
email notification. CRM failure does not undo a saved contact or prevent email
notification. The visitor receives the website's existing acknowledgement after
the local save; that acknowledgement does not assert CRM delivery.

Both newsletter forms (`blog-newsletter`, `footer-newsletter`) remain email-only
and do not send to the CRM, as requested. Admin management forms are not enquiries.

## Deployment

Set `SEAD_CRM_FORM_KEY` in the hosting server's environment to the form key in the
provided integration guide. It is configured in this workspace's ignored
`.env.local`; that file is not deployed by Git. Do not prefix the key with
`NEXT_PUBLIC_`. Restart the server after changing environment variables.

The endpoint is `https://estateapi.ezulix.com/api/v1/public/leads` and requests
are server-side JSON POSTs with `Content-Type: application/json`. No Origin header,
browser cookie, API authentication token or CRM captcha token is fabricated.
Server-side calls have been confirmed enabled by the site owner.

Use a persistent writable SQLite directory. The existing default is `./data`;
`NIRVAANA_DATA_DIR` can override it with an absolute path. The new
`crm_deliveries` table is created automatically without rewriting existing leads.
Existing leads are not retroactively sent. Back up the SQLite database as usual.

## Field mapping

| Website value | CRM key | Notes |
| --- | --- | --- |
| Server environment variable | `form_key` | Sent only from the server; not stored in delivery payloads |
| Full name | `name` | Required for the three lead forms |
| Mobile number | `phone` | Required; ten digits, optionally prefixed with `91` / `+91`; spaces, parentheses, periods and hyphens removed |
| Email | `email` | Optional for leads; required for newsletters |
| City | `city` | Empty placeholder options omitted |
| Project | `project` | Defaults to `Nirvaana Hills` |
| Budget | `budget` | Empty placeholder option omitted |
| Message | `message` | Original visitor message |
| Enquiry interest / form intent | `requirement` | Custom field |
| Form identifier | `source` | Custom field: `brochure-section`, `contact-page-enquiry`, or `contact-page-channel-partner` |
| Purchase purpose | `purpose` | Custom field |
| Company name | `company_name` | Custom field; mapped from the website's `companyName` |
| Local contact UUID | `website_lead_id` | Custom field for reconciliation; the CRM does not promise deduplication by this value |
| Current page URL | `page_url` | Captured at submission |
| Browser referrer | `referrer` | Captured at submission |
| URL parameters | `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid` | Copied from the current page URL when present |
| Offscreen spam-trap input | `website` | Must be empty; filled traps are quietly discarded before DB, email or CRM operations |

The server also accepts and forwards the guide's optional `bhk`, `transactionType`,
and `timeline` fields if future forms collect them. Current forms do not collect
these values. The server forwards only the explicitly supported fields; it never
forwards `recaptchaToken` or accepts a browser-provided `form_key`.

No visible inputs were added. Google reCAPTCHA has been removed from all five
public forms and the contact API. Hidden spam traps, server-side validation and
IP rate limiting remain active. Local message formatting is unchanged. Tracking is from the submission page only;
this change does not implement cross-page first-touch attribution.

## Delivery results and recovery

Run these commands on the server with access to its persistent database:

```sh
npm run crm -- list
npm run crm -- retry <contactId>
```

The list shows the latest 100 delivery results without exposing contact payloads
or the form key. Statuses are:

- `pending`: not sent yet, including missing server configuration.
- `sending`: claimed by a running request.
- `sent`: the CRM returned an HTTP success and JSON `success: true`; its reference
  is stored when provided. Sent records cannot be retried.
- `failed`: the CRM rejected the submission, for example HTTP 400 or 429, or the
  outgoing JSON exceeded the documented 32 KB limit. Correct the cause before retrying.
- `unknown`: timeout, network error, HTTP 5xx, or an unreadable/invalid response;
  the CRM may already have accepted the enquiry.

Requests time out after ten seconds. There is no automatic retry worker. The API
does not document an idempotency key, so blindly retrying ambiguous deliveries
could create duplicates. For an `unknown` delivery, first check the CRM by
`website_lead_id`, name and phone. Only after confirming the lead is absent:

```sh
npm run crm -- retry <contactId> --confirmed-not-in-crm
```

The same flag can recover `sending` records left by a terminated server process,
once they are at least one minute old. Do not use it while the original request
is still running. Atomic claims prevent concurrent retries from sending the same
record. Deleting a local contact also deletes its local CRM delivery record; it
does not delete anything already delivered to the external CRM.

The website deliberately preserves its own confirmation flow and does not use
CRM redirect URLs. The supplied guide currently specifies no redirect.

## Verification

`npm run test:crm` exercises all three lead sources, both newsletter exclusions,
exact field mapping, local persistence and email invocation, invalid submissions,
spam traps, CRM rejection, ambiguous network failure, concurrent retries and
protocol error handling. It uses a temporary database and mocked external calls,
without sending real emails or CRM enquiries.

A live server-side test on 17 October 2026 timed out; delivery is unconfirmed.
It was not repeated. Reconciliation details:

- Name: `Nirvaana Website Integration Test - Please Ignore`
- Phone: `9876543210` (the example number from the integration guide)
- `website_lead_id`: `integration-check-1792235497194`
- Source: `integration-test`

The live test called the CRM adapter directly and did not create a local contact
or send an email. Check with the CRM before repeating this test.

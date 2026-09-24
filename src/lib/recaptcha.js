/**
 * Client & Server utilities for Google reCAPTCHA v3
 */

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfX-swtAAAAABC33yvdKrAOKKr72WSiivsJBOfI";

/**
 * Client-Side: Executes reCAPTCHA v3 and returns a verification token.
 * Resolves to an empty string if reCAPTCHA script is not loaded or fails.
 *
 * @param {string} action - Action identifier (e.g. 'contact_enquiry', 'brochure_download', 'newsletter')
 * @returns {Promise<string>}
 */
export async function executeRecaptcha(action = "submit") {
  if (typeof window === "undefined") return "";

  const siteKey = RECAPTCHA_SITE_KEY;
  if (!siteKey) return "";

  try {
    return await new Promise((resolve) => {
      if (!window.grecaptcha) {
        // reCAPTCHA not loaded yet
        return resolve("");
      }

      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve(token || "");
        } catch (err) {
          console.warn("reCAPTCHA execution error:", err);
          resolve("");
        }
      });
    });
  } catch (err) {
    console.warn("reCAPTCHA helper error:", err);
    return "";
  }
}

/**
 * Server-Side: Verifies reCAPTCHA token against Google's verification API.
 * If RECAPTCHA_SECRET_KEY is not defined in environment variables, it bypasses verification
 * to allow development without blocking leads.
 *
 * @param {string} token - The client-generated response token
 * @returns {Promise<{ valid: boolean, score?: number, error?: string }>}
 */
export async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // If secret key has not been configured by user yet, bypass gracefully
  if (!secretKey || secretKey === "your-recaptcha-secret-key-here") {
    return { valid: true, bypassed: true };
  }

  if (!token) {
    return { valid: false, error: "reCAPTCHA verification token missing" };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!data.success) {
      console.warn("reCAPTCHA verification rejected:", data["error-codes"]);
      return {
        valid: false,
        error: "reCAPTCHA verification failed",
        errorCodes: data["error-codes"],
      };
    }

    // reCAPTCHA v3 returns a score between 0.0 (likely bot) and 1.0 (likely human)
    const score = data.score ?? 1.0;
    if (score < 0.4) {
      console.warn(`reCAPTCHA score too low (${score}) for action: ${data.action}`);
      return { valid: false, score, error: "Low reCAPTCHA confidence score" };
    }

    return { valid: true, score, action: data.action };
  } catch (err) {
    console.error("reCAPTCHA server verification error:", err);
    // On unexpected network error connecting to Google, fail open with warning
    return { valid: true, error: err.message, bypassed: true };
  }
}

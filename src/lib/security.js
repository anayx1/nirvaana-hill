// In-memory sliding window rate limiter
const rateLimitStore = new Map();

/**
 * Checks if an IP or identifier has exceeded the request rate limit.
 * @param {string} key - Unique identifier (e.g., client IP)
 * @param {number} limit - Maximum requests permitted in window
 * @param {number} windowMs - Window duration in milliseconds (default: 60,000ms = 1 min)
 * @returns {{ allowed: boolean, remaining: number, resetTime: number }}
 */
export function checkRateLimit(key, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Remove timestamps outside the sliding window
  const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= limit) {
    const oldestTimestamp = validTimestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    return {
      allowed: false,
      remaining: 0,
      resetTime,
    };
  }

  validTimestamps.push(now);
  rateLimitStore.set(key, { timestamps: validTimestamps });

  return {
    allowed: true,
    remaining: limit - validTimestamps.length,
    resetTime: now + windowMs,
  };
}

/**
 * Extracts client IP from standard Next.js request headers.
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

// Cleanup stale rate limit records periodically
if (typeof setInterval !== "undefined") {
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      const valid = record.timestamps.filter((ts) => now - ts < 300000);
      if (valid.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, { timestamps: valid });
      }
    }
  }, 300000);

  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

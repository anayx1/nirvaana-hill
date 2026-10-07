import fs from "node:fs";
import path from "node:path";
import {
  getStoredInstagramPosts,
  saveInstagramPosts,
  getInstagramMeta,
  setInstagramMeta,
} from "./db.js";

// ========================================================
// LOCAL FALLBACK DATA (USED IF NO API KEY OR DB IS EMPTY)
// ========================================================
export const FALLBACK_SOCIAL_ITEMS = [
  { id: "office-1", imageUrl: "/homepage/sec10-office.avif", alt: "Nirvaana Hills Experience" },
  { id: "woman-1", imageUrl: "/homepage/sec10-woman.avif", alt: "Community Member" },
  { id: "woman-2", imageUrl: "/homepage/sec10-woman.avif", alt: "Community Member" },
  { id: "office-2", imageUrl: "/homepage/sec10-office.avif", alt: "Nirvaana Hills Experience" },
  { id: "woman-3", imageUrl: "/homepage/sec10-woman.avif", alt: "Community Member" },
  { id: "woman-4", imageUrl: "/homepage/sec10-woman.avif", alt: "Community Member" },
];

const DEFAULT_PROFILE_URL = "https://www.instagram.com/nirvaanahills/";
const DEFAULT_TTL_HOURS = 12;
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "instagram");

/**
 * Downloads a remote image and saves it locally in public/uploads/instagram/
 * to prevent browser blocking, CORS issues, ad-blocker blocks, and token expiration.
 */
async function downloadAndCacheImage(url, id) {
  if (!url || !url.startsWith("http")) return url;

  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    const cleanId = String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `${cleanId}.jpg`;
    const filePath = path.join(UPLOADS_DIR, fileName);
    const publicUrl = `/uploads/instagram/${fileName}`;

    // Download image from Instagram CDN via server
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      return publicUrl;
    } else {
      console.warn(`[Instagram Sync] Image download HTTP ${res.status} for post ${id}`);
      return `/api/instagram/proxy?url=${encodeURIComponent(url)}`;
    }
  } catch (err) {
    console.error(`[Instagram Sync] Download error for ${id}:`, err.message);
    return `/api/instagram/proxy?url=${encodeURIComponent(url)}`;
  }
}

/**
 * Executes a sync run with Apify Instagram Post Scraper actor and saves results to SQLite DB.
 */
export async function syncInstagramPostsFromApify() {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) {
    console.warn("[Instagram Sync] APIFY_API_TOKEN is not set in environment variables.");
    return { success: false, reason: "MISSING_API_TOKEN" };
  }

  const profileUrl = process.env.INSTAGRAM_PROFILE_URL || DEFAULT_PROFILE_URL;
  const resultsLimit = Number(process.env.INSTAGRAM_POSTS_LIMIT) || 10;

  const actorInput = {
    dataDetailLevel: "basicData",
    resultsLimit,
    skipPinnedPosts: false,
    username: [profileUrl],
  };

  try {
    const endpoint = `https://api.apify.com/v2/acts/apify~instagram-post-scraper/run-sync-get-dataset-items?token=${token}&timeout=60`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actorInput),
      cache: "no-store", // We manage persistence in SQLite
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Instagram Sync] Apify error HTTP ${response.status}: ${errorText}`);
      return { success: false, reason: `HTTP_${response.status}`, details: errorText };
    }

    const items = await response.json();
    if (!Array.isArray(items) || items.length === 0) {
      console.warn("[Instagram Sync] Apify returned no items or invalid format:", items);
      return { success: false, reason: "EMPTY_DATASET" };
    }

    // Transform and download images locally to avoid CORS / Referrer blocking
    const formattedPosts = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const rawImageUrl =
        item.displayUrl ||
        item.imageUrl ||
        item.thumbnailUrl ||
        (Array.isArray(item.images) && item.images[0]) ||
        (item.displayResource && item.displayResource.src) ||
        "";

      if (!rawImageUrl) continue;

      const postId = item.id || item.shortCode || item.pk || `insta-${index}`;
      const localImageUrl = await downloadAndCacheImage(rawImageUrl, postId);

      const postUrl = item.url || (item.shortCode ? `https://www.instagram.com/p/${item.shortCode}/` : "");
      const shortCode =
        item.shortCode ||
        (postUrl ? postUrl.match(/\/(?:p|reel)\/([^/?#]+)/)?.[1] : "") ||
        "";
      const isVideo = Boolean(
        item.isVideo ||
        item.type === "Video" ||
        item.videoUrl ||
        (postUrl && postUrl.includes("/reel/"))
      );

      formattedPosts.push({
        id: String(postId),
        imageUrl: localImageUrl,
        videoUrl: item.videoUrl || "",
        postUrl: postUrl,
        caption: item.caption || "",
        timestamp: item.timestamp || item.takenAtTimestamp || "",
        isVideo: isVideo ? 1 : 0,
        shortCode: shortCode,
        orderIndex: index,
      });
    }

    if (formattedPosts.length === 0) {
      console.warn("[Instagram Sync] No valid post images found in Apify dataset.");
      return { success: false, reason: "NO_VALID_IMAGES" };
    }

    // Save to SQLite database
    saveInstagramPosts(formattedPosts);
    setInstagramMeta("last_sync", new Date().toISOString());

    return {
      success: true,
      count: formattedPosts.length,
      posts: formattedPosts,
      syncedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Instagram Sync] Failed to fetch from Apify:", error);
    return { success: false, reason: "NETWORK_OR_SERVER_ERROR", error: error.message };
  }
}

/**
 * Returns Instagram posts from SQLite cache, or triggers a sync if cache has expired / is empty.
 * @param {{ force?: boolean }} options
 */
export async function getOrFetchInstagramPosts({ force = false } = {}) {
  try {
    const stored = getStoredInstagramPosts();
    const lastSyncMeta = getInstagramMeta("last_sync");

    const ttlHours = Number(process.env.INSTAGRAM_CACHE_TTL_HOURS) || DEFAULT_TTL_HOURS;
    const ttlMs = ttlHours * 60 * 60 * 1000;

    const isStale =
      !lastSyncMeta ||
      !lastSyncMeta.value ||
      Date.now() - new Date(lastSyncMeta.value).getTime() > ttlMs;

    // Helper formatter
    const mapPost = (post) => {
      const postUrl = post.postUrl || post.url || "";
      const shortCode =
        post.shortCode ||
        (postUrl ? postUrl.match(/\/(?:p|reel)\/([^/?#]+)/)?.[1] : "") ||
        "";
      const isVideo = Boolean(
        post.isVideo ||
        (postUrl && postUrl.includes("/reel/")) ||
        post.videoUrl
      );

      return {
        id: post.id,
        src: post.imageUrl || post.src || "",
        alt: post.caption ? post.caption.slice(0, 80) : "Nirvaana Hills Experience",
        url: postUrl,
        videoUrl: post.videoUrl || "",
        isVideo,
        shortCode,
        caption: post.caption || "",
      };
    };

    // 1. If we have fresh cached posts and no forced sync requested, return immediately
    if (stored.length > 0 && !isStale && !force) {
      return stored.map(mapPost);
    }

    // 2. If token is available and (isStale or empty or force), attempt background sync
    if (process.env.APIFY_API_TOKEN) {
      const syncResult = await syncInstagramPostsFromApify();
      if (syncResult.success && Array.isArray(syncResult.posts) && syncResult.posts.length > 0) {
        return syncResult.posts.map(mapPost);
      }
    }

    // 3. Fallback to existing stored records if available
    if (stored.length > 0) {
      return stored.map(mapPost);
    }

    // 4. Ultimate fallback to local static assets
    return FALLBACK_SOCIAL_ITEMS.map((item) => ({
      id: item.id,
      src: item.imageUrl,
      alt: item.alt,
      url: "",
      isVideo: false,
      shortCode: "",
      caption: "",
    }));
  } catch (err) {
    console.error("[getOrFetchInstagramPosts] Error:", err);
    return FALLBACK_SOCIAL_ITEMS.map((item) => ({
      id: item.id,
      src: item.imageUrl,
      alt: item.alt,
      url: "",
      isVideo: false,
      shortCode: "",
      caption: "",
    }));
  }
}

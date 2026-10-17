import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

const DB_DIR = process.env.NIRVAANA_DATA_DIR || path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "nirvaana.db");

let dbInstance = null;

/**
 * Initializes and returns the SQLite database instance singleton.
 */
export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  // An externally configured database directory is runtime storage, not a
  // dependency to bundle. Keep tracing the existing default data directory.
  const directoryExists = process.env.NIRVAANA_DATA_DIR
    ? fs.existsSync(/* turbopackIgnore: true */ DB_DIR)
    : fs.existsSync(path.join(process.cwd(), "data"));
  if (!directoryExists) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);

  // Performance and concurrency settings
  db.exec("PRAGMA busy_timeout = 30000;");
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Initialize Tables
  initTables(db);

  dbInstance = db;
  return dbInstance;
}

/**
 * Create tables and initial default seed data if not present.
 */
function initTables(db) {
  // 1. Blogs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      featuredImage TEXT,
      readDuration TEXT DEFAULT '4 min read',
      author TEXT DEFAULT 'Nirvaana Hills Team',
      status TEXT DEFAULT 'PUBLISHED',
      publishedAt TEXT NOT NULL,
      metaTitle TEXT,
      metaDescription TEXT,
      metaKeywords TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
    CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
    CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
  `);

  // 2. Gallery Images Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id TEXT PRIMARY KEY,
      title TEXT,
      alt TEXT,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      orderIndex INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
    CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery_images(orderIndex);
  `);

  // 3. Categories Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL DEFAULT 'blog',
      createdAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
    CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
  `);

  // 4. Contacts / Form Leads Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      requirement TEXT,
      message TEXT,
      status TEXT DEFAULT 'NEW',
      source TEXT DEFAULT 'website',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(createdAt);

    CREATE TABLE IF NOT EXISTS crm_deliveries (
      contactId TEXT PRIMARY KEY REFERENCES contacts(id) ON DELETE CASCADE,
      payload TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      attempts INTEGER NOT NULL DEFAULT 0,
      reference TEXT,
      lastError TEXT,
      updatedAt TEXT NOT NULL
    );
  `);

  // 5. Admin Users & Credentials Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      salt TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);
    CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);

    -- 6. Password Resets Table
    CREATE TABLE IF NOT EXISTS password_resets (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      otp TEXT NOT NULL,
      expiresAt INTEGER NOT NULL,
      used INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(email);

    -- 7. Instagram Posts Table (Cached from Apify)
    CREATE TABLE IF NOT EXISTS instagram_posts (
      id TEXT PRIMARY KEY,
      imageUrl TEXT NOT NULL,
      videoUrl TEXT,
      postUrl TEXT,
      caption TEXT,
      timestamp TEXT,
      isVideo INTEGER DEFAULT 0,
      shortCode TEXT,
      orderIndex INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_instagram_posts_order ON instagram_posts(orderIndex);

    -- 8. Instagram Meta Cache Tracking
    CREATE TABLE IF NOT EXISTS instagram_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // Runtime schema migrations for instagram_posts if created earlier
  try {
    const tableInfo = db.prepare("PRAGMA table_info(instagram_posts)").all();
    const colNames = tableInfo.map((c) => c.name);
    if (!colNames.includes("videoUrl")) {
      db.exec("ALTER TABLE instagram_posts ADD COLUMN videoUrl TEXT;");
    }
    if (!colNames.includes("isVideo")) {
      db.exec("ALTER TABLE instagram_posts ADD COLUMN isVideo INTEGER DEFAULT 0;");
    }
    if (!colNames.includes("shortCode")) {
      db.exec("ALTER TABLE instagram_posts ADD COLUMN shortCode TEXT;");
    }
  } catch (e) {
    // Ignore migration error if already migrated
  }

  // Seed default categories if empty
  seedDefaultCategories(db);

  // Seed default gallery images if empty
  seedDefaultGallery(db);

  // Seed default blog articles if empty
  seedDefaultBlogs(db);

  // Seed default root admin user if empty
  seedDefaultAdmin(db);
}

function seedDefaultBlogs(db) {
  const blogCount = db.prepare("SELECT COUNT(*) as count FROM blogs").get().count;
  if (blogCount === 0) {
    const defaultBlogs = [
      {
        id: "blog-1",
        title: "The Art of Slower Living in the Aravallis",
        slug: "the-art-of-slower-living-in-the-aravallis",
        category: "Living & Wellness",
        content: `
          <p>At <strong>Nirvaana Hills</strong>, living slower is not just an aesthetic choice — it is a fundamental <em>reconnection to the natural rhythm of life</em>.</p>
          <h2>Why Nature Dictates Pace</h2>
          <p>When surrounded by uninterrupted Aravalli hill views and century-old tree canopies, the usual urban rush fades away. Morning begins with birdsong, crisp clean air, and sunlight cutting through the morning mist.</p>
          <blockquote>"To step onto your own farmland is to step out of the artificial clock and back into the heartbeat of the earth."</blockquote>
          <h3>Key Pillars of Grounded Living:</h3>
          <ul>
            <li><strong>Zero Industrial Noise</strong>: Deep acoustic calm and undisturbed natural silence.</li>
            <li><strong>Pure Aravalli Aquifers</strong>: Pristine groundwater nourishing organic soil beds.</li>
            <li><strong>Clean Air Canopy</strong>: 60-70% lower AQI compared to congested metropolitan centers.</li>
          </ul>
          <p>Farmland ownership at Nirvaana Hills represents an investment in family longevity, mental clarity, and enduring generational heritage.</p>
        `,
        excerpt: "Discover how living nestled in the Aravalli foothills transforms everyday peace, wellness, and family life.",
        featuredImage: "/gallery/hero.avif",
        readDuration: "5 min read",
        author: "Nirvaana Hills Editorial",
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        metaTitle: "The Art of Slower Living | Nirvaana Hills",
        metaDescription: "Explore slower living, wellness, and mindful farmland lifestyle in the Aravalli foothills at Nirvaana Hills.",
        metaKeywords: "farmland, aravalli, wellness, nature, slower living, organic living",
      },
      {
        id: "blog-2",
        title: "Why Farmland Ownership is the Ultimate Modern Luxury",
        slug: "why-farmland-ownership-is-the-ultimate-modern-luxury",
        category: "Farmland Ownership",
        content: `
          <p>True luxury today is no longer measured by square footage inside a concrete high-rise. It is measured by <strong>space, quietude, clean air, and sovereign land ownership</strong>.</p>
          <h2>The Shift Toward Tangible Earth Assets</h2>
          <p>As cities become denser and more chaotic, forward-thinking families are securing private agricultural acreage within reachable driving distance.</p>
          <blockquote>"Land is the only asset that cannot be manufactured or digitized. Its value deepens with every mature tree and every clean breath."</blockquote>
          <p>Nirvaana Hills combines managed farm stewardship with legal transparency, ensuring seamless ownership without operational burden.</p>
        `,
        excerpt: "Why modern families are choosing open acreage, clean air, and generational security over urban congestion.",
        featuredImage: "/locations/why-distance-changes-everything.avif",
        readDuration: "4 min read",
        author: "Nirvaana Hills Editorial",
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        metaTitle: "Why Farmland is the Ultimate Luxury | Nirvaana Hills",
        metaDescription: "Understand why private farmland ownership in the Aravalli corridor has become the definitive modern luxury asset.",
        metaKeywords: "farmland investment, aravalli real estate, managed farm, luxury land",
      },
    ];

    const insertStmt = db.prepare(`
      INSERT INTO blogs (
        id, title, slug, category, content, excerpt, featuredImage,
        readDuration, author, status, publishedAt, metaTitle,
        metaDescription, metaKeywords, createdAt, updatedAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `);

    const now = new Date().toISOString();

    for (const b of defaultBlogs) {
      insertStmt.run(
        b.id,
        b.title,
        b.slug,
        b.category,
        b.content,
        b.excerpt,
        b.featuredImage,
        b.readDuration,
        b.author,
        b.status,
        b.publishedAt,
        b.metaTitle,
        b.metaDescription,
        b.metaKeywords,
        now,
        now
      );
    }
  }
}

function seedDefaultCategories(db) {
  const catCount = db.prepare("SELECT COUNT(*) as count FROM categories").get().count;
  if (catCount === 0) {
    const defaultCategories = [
      // Blog categories
      { name: "LIFESTYLE", slug: "lifestyle", type: "blog" },
      { name: "DEVELOPMENT UPDATES", slug: "development-updates", type: "blog" },
      // Gallery categories
      { name: "Raw Site Images", slug: "raw-site", type: "gallery" },
      { name: "Landscape Views", slug: "landscape", type: "gallery" },
      { name: "Aravalli Hills View", slug: "aravalli", type: "gallery" },
      { name: "Sunrise & Sunset Moments", slug: "sunrise-sunset", type: "gallery" },
      { name: "Drive Through Experience", slug: "drive-through", type: "gallery" },
    ];

    const insertStmt = db.prepare(
      "INSERT INTO categories (id, name, slug, type, createdAt) VALUES (?, ?, ?, ?, ?)"
    );
    const now = new Date().toISOString();

    for (const cat of defaultCategories) {
      insertStmt.run(crypto.randomUUID(), cat.name, cat.slug, cat.type, now);
    }
  }
}

function seedDefaultGallery(db) {
  const galleryCount = db.prepare("SELECT COUNT(*) as count FROM gallery_images").get().count;
  if (galleryCount === 0) {
    const defaultGalleryItems = [
      {
        id: "visual-1",
        category: "aravalli",
        title: "Aravalli Foothills Panoramic Ground View",
        alt: "Raw site footage of Aravalli hills and natural terrain at Nirvaana Hills",
        image: "/locations/hero.avif",
        orderIndex: 1,
      },
      {
        id: "visual-2",
        category: "landscape",
        title: "Scenic Aravalli Farmland Landscape",
        alt: "Scenic Aravalli green landscape near Mahendragarh",
        image: "/locations/why-distance-changes-everything.avif",
        orderIndex: 2,
      },
      {
        id: "visual-3",
        category: "raw-site",
        title: "Community and Mature Tree Canopy",
        alt: "Real ground moments and natural tree plantation",
        image: "/gallery/hero.avif",
        orderIndex: 3,
      },
      {
        id: "visual-4",
        category: "sunrise-sunset",
        title: "360° Aravalli Mountain Horizon",
        alt: "360 Degree Aravalli mountain views",
        image: "/nirvaana-hills/360-arravali.avif",
        orderIndex: 4,
      },
    ];

    const insertStmt = db.prepare(
      "INSERT INTO gallery_images (id, title, alt, category, image, orderIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    const now = new Date().toISOString();

    for (const item of defaultGalleryItems) {
      insertStmt.run(
        item.id,
        item.title,
        item.alt,
        item.category,
        item.image,
        item.orderIndex,
        now,
        now
      );
    }
  }
}

// ============================================================================
// HELPER CONVERTERS (Converts node:sqlite null-prototype objects to plain JS objects)
// ============================================================================

function toPlain(obj) {
  if (!obj) return null;
  return { ...obj };
}

function toPlainObject(obj) {
  return toPlain(obj);
}

function toPlainList(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.map((item) => ({ ...item }));
}

// ============================================================================
// HELPER FUNCTIONS: BLOGS
// ============================================================================

export function getAllBlogs(filters = {}) {
  const db = getDb();
  const {
    category,
    status = "PUBLISHED",
    search,
    limit,
    offset = 0,
    orderBy = "publishedAt DESC",
  } = filters;

  const conditions = [];
  const params = [];

  if (status && status !== "ALL") {
    conditions.push("status = ?");
    params.push(status);
  }

  if (category && category !== "all") {
    conditions.push("category = ?");
    params.push(category);
  }

  if (search) {
    conditions.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)");
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  let sql = "SELECT * FROM blogs";
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Sanitize simple ordering
  const validOrderBy = ["publishedAt DESC", "publishedAt ASC", "createdAt DESC", "title ASC"].includes(orderBy)
    ? orderBy
    : "publishedAt DESC";
  sql += ` ORDER BY ${validOrderBy}`;

  if (limit) {
    sql += " LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));
  }

  return toPlainList(db.prepare(sql).all(...params));
}

export function getBlogByIdOrSlug(idOrSlug) {
  const db = getDb();
  let blog = db.prepare("SELECT * FROM blogs WHERE id = ?").get(idOrSlug);
  if (!blog) {
    blog = db.prepare("SELECT * FROM blogs WHERE slug = ?").get(idOrSlug);
  }
  return toPlain(blog);
}

export function getAdjacentBlogs(publishedAt, currentId) {
  const db = getDb();
  const prev = db
    .prepare(
      "SELECT id, title, slug, featuredImage, publishedAt FROM blogs WHERE status = 'PUBLISHED' AND publishedAt < ? AND id != ? ORDER BY publishedAt DESC LIMIT 1"
    )
    .get(publishedAt, currentId);

  const next = db
    .prepare(
      "SELECT id, title, slug, featuredImage, publishedAt FROM blogs WHERE status = 'PUBLISHED' AND publishedAt > ? AND id != ? ORDER BY publishedAt ASC LIMIT 1"
    )
    .get(publishedAt, currentId);

  return { prev: toPlain(prev), next: toPlain(next) };
}

export function createBlog(data) {
  const db = getDb();
  const now = new Date().toISOString();
  const id = data.id || crypto.randomUUID();

  // Generate unique slug
  let baseSlug = (data.slug || data.title || "untitled-blog")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let finalSlug = baseSlug;
  let counter = 1;
  while (db.prepare("SELECT id FROM blogs WHERE slug = ?").get(finalSlug)) {
    finalSlug = `${baseSlug}-${counter++}`;
  }

  // Auto calculate read duration if not provided
  let readDuration = data.readDuration;
  if (!readDuration && data.content) {
    const textOnly = data.content.replace(/<[^>]*>/g, " ").trim();
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    readDuration = `${minutes} min read`;
  }

  const publishedAt = data.publishedAt || (data.status === "PUBLISHED" ? now : "");

  const stmt = db.prepare(`
    INSERT INTO blogs (
      id, title, slug, category, content, excerpt, featuredImage,
      readDuration, author, status, publishedAt, metaTitle,
      metaDescription, metaKeywords, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  stmt.run(
    id,
    data.title,
    finalSlug,
    data.category || "General",
    data.content || "",
    data.excerpt || "",
    data.featuredImage || null,
    readDuration || "4 min read",
    data.author || "Nirvaana Hills Team",
    data.status || "PUBLISHED",
    publishedAt,
    data.metaTitle || data.title || "",
    data.metaDescription || data.excerpt || "",
    data.metaKeywords || "",
    now,
    now
  );

  return getBlogByIdOrSlug(id);
}

export function updateBlog(id, data) {
  const db = getDb();
  const existing = getBlogByIdOrSlug(id);
  if (!existing) {
    return null;
  }

  const now = new Date().toISOString();

  let finalSlug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    let baseSlug = data.slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    finalSlug = baseSlug;
    let counter = 1;
    while (
      db.prepare("SELECT id FROM blogs WHERE slug = ? AND id != ?").get(finalSlug, existing.id)
    ) {
      finalSlug = `${baseSlug}-${counter++}`;
    }
  }

  // Recalculate read duration if content changed and duration wasn't explicitly supplied
  let readDuration = data.readDuration !== undefined ? data.readDuration : existing.readDuration;
  if (data.content && data.readDuration === undefined) {
    const textOnly = data.content.replace(/<[^>]*>/g, " ").trim();
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    readDuration = `${minutes} min read`;
  }

  const stmt = db.prepare(`
    UPDATE blogs SET
      title = ?,
      slug = ?,
      category = ?,
      content = ?,
      excerpt = ?,
      featuredImage = ?,
      readDuration = ?,
      author = ?,
      status = ?,
      publishedAt = ?,
      metaTitle = ?,
      metaDescription = ?,
      metaKeywords = ?,
      updatedAt = ?
    WHERE id = ?
  `);

  stmt.run(
    data.title !== undefined ? data.title : existing.title,
    finalSlug,
    data.category !== undefined ? data.category : existing.category,
    data.content !== undefined ? data.content : existing.content,
    data.excerpt !== undefined ? data.excerpt : existing.excerpt,
    data.featuredImage !== undefined ? data.featuredImage : existing.featuredImage,
    readDuration,
    data.author !== undefined ? data.author : existing.author,
    data.status !== undefined ? data.status : existing.status,
    data.publishedAt !== undefined ? data.publishedAt : existing.publishedAt,
    data.metaTitle !== undefined ? data.metaTitle : existing.metaTitle,
    data.metaDescription !== undefined ? data.metaDescription : existing.metaDescription,
    data.metaKeywords !== undefined ? data.metaKeywords : existing.metaKeywords,
    now,
    existing.id
  );

  return getBlogByIdOrSlug(existing.id);
}

export function deleteBlog(id) {
  const db = getDb();
  const existing = getBlogByIdOrSlug(id);
  if (!existing) {
    return false;
  }
  db.prepare("DELETE FROM blogs WHERE id = ?").run(existing.id);
  return true;
}

// ============================================================================
// HELPER FUNCTIONS: GALLERY
// ============================================================================

export function getGalleryImages(category) {
  const db = getDb();
  if (category && category !== "all") {
    return toPlainList(
      db
        .prepare(
          "SELECT * FROM gallery_images WHERE category = ? ORDER BY orderIndex ASC, createdAt DESC"
        )
        .all(category)
    );
  }
  return toPlainList(
    db
      .prepare("SELECT * FROM gallery_images ORDER BY orderIndex ASC, createdAt DESC")
      .all()
  );
}

export function getGalleryImageById(id) {
  const db = getDb();
  return toPlain(db.prepare("SELECT * FROM gallery_images WHERE id = ?").get(id));
}

export function createGalleryImage(data) {
  const db = getDb();
  const now = new Date().toISOString();
  const id = data.id || crypto.randomUUID();

  const stmt = db.prepare(`
    INSERT INTO gallery_images (
      id, title, alt, category, image, orderIndex, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.title || "",
    data.alt || data.title || "",
    data.category || "raw-site",
    data.image,
    Number(data.orderIndex) || 0,
    now,
    now
  );

  return getGalleryImageById(id);
}

export function updateGalleryImage(id, data) {
  const db = getDb();
  const existing = getGalleryImageById(id);
  if (!existing) {
    return null;
  }

  const now = new Date().toISOString();

  const stmt = db.prepare(`
    UPDATE gallery_images SET
      title = ?,
      alt = ?,
      category = ?,
      image = ?,
      orderIndex = ?,
      updatedAt = ?
    WHERE id = ?
  `);

  stmt.run(
    data.title !== undefined ? data.title : existing.title,
    data.alt !== undefined ? data.alt : existing.alt,
    data.category !== undefined ? data.category : existing.category,
    data.image !== undefined ? data.image : existing.image,
    data.orderIndex !== undefined ? Number(data.orderIndex) : existing.orderIndex,
    now,
    id
  );

  return getGalleryImageById(id);
}

export function deleteGalleryImage(id) {
  const db = getDb();
  const existing = getGalleryImageById(id);
  if (!existing) {
    return false;
  }
  db.prepare("DELETE FROM gallery_images WHERE id = ?").run(id);
  return true;
}

// ============================================================================
// HELPER FUNCTIONS: CATEGORIES
// ============================================================================

export function getCategories(type = null) {
  const db = getDb();
  if (type) {
    return toPlainList(
      db
        .prepare("SELECT * FROM categories WHERE type = ? ORDER BY name ASC")
        .all(type)
    );
  }
  return toPlainList(db.prepare("SELECT * FROM categories ORDER BY name ASC").all());
}

export function createCategory(data) {
  const db = getDb();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  let baseSlug = (data.slug || data.name)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  const stmt = db.prepare(
    "INSERT INTO categories (id, name, slug, type, createdAt) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(id, data.name, baseSlug, data.type || "blog", now);

  return toPlain(db.prepare("SELECT * FROM categories WHERE id = ?").get(id));
}

export function deleteCategory(id) {
  const db = getDb();
  db.prepare("DELETE FROM categories WHERE id = ?").run(id);
  return true;
}

function seedDefaultAdmin(db) {
  const adminCount = db.prepare("SELECT COUNT(*) as count FROM admin_users").get().count;
  if (adminCount === 0) {
    const salt = crypto.randomBytes(16).toString("hex");
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin@123";
    const passwordHash = crypto
      .pbkdf2Sync(defaultPassword, salt, 10000, 64, "sha512")
      .toString("hex");
    const now = new Date().toISOString();

    const stmt = db.prepare(
      "INSERT INTO admin_users (id, username, email, passwordHash, salt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    stmt.run(
      crypto.randomUUID(),
      "nirvaanahills",
      "nirvaanahills@gmail.com",
      passwordHash,
      salt,
      now,
      now
    );
  }
}

// ============================================================================
// HELPER FUNCTIONS: ADMIN AUTH & PASSWORD RESETS
// ============================================================================

export function getAdminByEmailOrUsername(identifier) {
  if (!identifier) return null;
  const db = getDb();
  const clean = identifier.trim().toLowerCase();
  const user = db
    .prepare("SELECT * FROM admin_users WHERE lower(username) = ? OR lower(email) = ?")
    .get(clean, clean);
  return toPlain(user);
}

export function getAdminByUsername(username) {
  return getAdminByEmailOrUsername(username);
}

export function getAdminByEmail(email) {
  if (!email) return null;
  const db = getDb();
  const user = db.prepare("SELECT * FROM admin_users WHERE lower(email) = ?").get(email.trim().toLowerCase());
  return toPlain(user);
}

export function getAdminById(id) {
  const db = getDb();
  const user = db.prepare("SELECT id, username, email, createdAt, updatedAt FROM admin_users WHERE id = ?").get(id);
  return toPlain(user);
}

export function createPasswordReset(email, otp, durationMinutes = 15) {
  const db = getDb();
  const now = Date.now();
  const expiresAt = now + durationMinutes * 60 * 1000;
  const id = crypto.randomUUID();
  const stmt = db.prepare(
    "INSERT INTO password_resets (id, email, otp, expiresAt, used, createdAt) VALUES (?, ?, ?, ?, 0, ?)"
  );
  stmt.run(id, email.toLowerCase().trim(), otp, expiresAt, new Date().toISOString());
  return { id, email, otp, expiresAt };
}

export function verifyAndConsumePasswordReset(email, otp) {
  const db = getDb();
  const now = Date.now();
  const record = db
    .prepare(
      "SELECT * FROM password_resets WHERE lower(email) = ? AND otp = ? AND used = 0 AND expiresAt > ? ORDER BY createdAt DESC LIMIT 1"
    )
    .get(email.toLowerCase().trim(), otp.trim(), now);
  if (!record) return false;
  db.prepare("UPDATE password_resets SET used = 1 WHERE id = ?").run(record.id);
  return true;
}

export function updateAdminPassword(identifier, newPassword) {
  const db = getDb();
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(newPassword, salt, 10000, 64, "sha512")
    .toString("hex");
  const now = new Date().toISOString();
  const clean = identifier.trim().toLowerCase();
  const stmt = db.prepare(
    "UPDATE admin_users SET passwordHash = ?, salt = ?, updatedAt = ? WHERE lower(email) = ? OR lower(username) = ?"
  );
  const result = stmt.run(passwordHash, salt, now, clean, clean);
  return result.changes > 0;
}

// ============================================================================
// HELPER FUNCTIONS: CONTACTS & FORM LEADS
// ============================================================================

export function getAllContacts(filters = {}) {
  const db = getDb();
  const { status, search, limit, offset = 0 } = filters;

  const conditions = [];
  const params = [];

  if (status && status !== "ALL") {
    conditions.push("status = ?");
    params.push(status);
  }

  if (search) {
    conditions.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR requirement LIKE ? OR message LIKE ?)");
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
  }

  let sql = "SELECT * FROM contacts";
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }
  sql += " ORDER BY createdAt DESC";

  if (limit) {
    sql += " LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));
  }

  return toPlainList(db.prepare(sql).all(...params));
}

export function getContactById(id) {
  const db = getDb();
  return toPlain(db.prepare("SELECT * FROM contacts WHERE id = ?").get(id));
}

export function createContact(data, crmPayload = null) {
  const db = getDb();
  const id = data.id || crypto.randomUUID();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO contacts (
      id, name, email, phone, requirement, message, status, source, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec("BEGIN IMMEDIATE");
  try {
    stmt.run(
      id,
      data.name || "Inquiry",
      data.email || "",
      data.phone,
      data.requirement || "Farmland Inquiry",
      data.message || "",
      data.status || "NEW",
      data.source || "website",
      now,
      now
    );
    if (crmPayload) {
      db.prepare(`INSERT INTO crm_deliveries (contactId, payload, updatedAt)
        VALUES (?, ?, ?)`).run(id, JSON.stringify(crmPayload), now);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  return getContactById(id);
}

export function getCrmDelivery(contactId) {
  return toPlain(getDb().prepare("SELECT * FROM crm_deliveries WHERE contactId = ?").get(contactId));
}

export function claimCrmDelivery(contactId, allowUnknown = false) {
  // Claim atomically so concurrent operators/requests cannot send the same row.
  const result = getDb().prepare(`UPDATE crm_deliveries
    SET status = 'sending', attempts = attempts + 1, updatedAt = ?
    WHERE contactId = ? AND (status IN ('pending', 'failed') OR
      (? = 1 AND (status = 'unknown' OR (status = 'sending' AND updatedAt < ?))))
  `).run(new Date().toISOString(), contactId, allowUnknown ? 1 : 0,
    new Date(Date.now() - 60000).toISOString());
  return result.changes > 0;
}

export function finishCrmDelivery(contactId, result) {
  getDb().prepare(`UPDATE crm_deliveries
    SET status = ?, reference = ?, lastError = ?, updatedAt = ? WHERE contactId = ?
  `).run(result.status, result.reference || null, result.error || null, new Date().toISOString(), contactId);
}

export function updateContactStatus(id, status) {
  const db = getDb();
  const existing = getContactById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  db.prepare("UPDATE contacts SET status = ?, updatedAt = ? WHERE id = ?").run(
    status,
    now,
    id
  );
  return getContactById(id);
}

export function deleteContact(id) {
  const db = getDb();
  const existing = getContactById(id);
  if (!existing) return false;
  db.prepare("DELETE FROM contacts WHERE id = ?").run(id);
  return true;
}

// ============================================================================
// HELPER FUNCTIONS: DASHBOARD STATS
// ============================================================================

export function getDashboardStats() {
  const db = getDb();

  const totalLeads = db.prepare("SELECT COUNT(*) as count FROM contacts").get().count;
  const newLeads = db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'NEW'").get().count;
  const totalBlogs = db.prepare("SELECT COUNT(*) as count FROM blogs").get().count;
  const publishedBlogs = db.prepare("SELECT COUNT(*) as count FROM blogs WHERE status = 'PUBLISHED'").get().count;
  const totalGalleryImages = db.prepare("SELECT COUNT(*) as count FROM gallery_images").get().count;
  const totalCategories = db.prepare("SELECT COUNT(*) as count FROM categories").get().count;

  const recentLeads = toPlainList(
    db.prepare("SELECT * FROM contacts ORDER BY createdAt DESC LIMIT 5").all()
  );
  const recentBlogs = toPlainList(
    db.prepare("SELECT id, title, slug, category, status, publishedAt, featuredImage FROM blogs ORDER BY createdAt DESC LIMIT 5").all()
  );

  return {
    totalLeads,
    newLeads,
    totalBlogs,
    publishedBlogs,
    totalGalleryImages,
    totalCategories,
    recentLeads,
    recentBlogs,
  };
}

// ============================================================================
// HELPER FUNCTIONS: INSTAGRAM POSTS & CACHE TRACKING
// ============================================================================

/**
 * Returns all cached Instagram posts ordered by orderIndex ASC.
 */
export function getStoredInstagramPosts() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM instagram_posts ORDER BY orderIndex ASC").all();
  return toPlainList(rows);
}

/**
 * Saves/Replaces the entire set of Instagram posts in an atomic transaction.
 * @param {Array<{id: string, imageUrl: string, postUrl?: string, caption?: string, timestamp?: string, orderIndex?: number}>} posts
 */
export function saveInstagramPosts(posts) {
  const db = getDb();
  const now = new Date().toISOString();

  const insertStmt = db.prepare(`
    INSERT INTO instagram_posts (id, imageUrl, videoUrl, postUrl, caption, timestamp, isVideo, shortCode, orderIndex, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      imageUrl = excluded.imageUrl,
      videoUrl = excluded.videoUrl,
      postUrl = excluded.postUrl,
      caption = excluded.caption,
      timestamp = excluded.timestamp,
      isVideo = excluded.isVideo,
      shortCode = excluded.shortCode,
      orderIndex = excluded.orderIndex,
      updatedAt = excluded.updatedAt
  `);

  db.exec("BEGIN TRANSACTION;");
  try {
    // Optionally clean up older items if list completely replaced
    db.prepare("DELETE FROM instagram_posts").run();
    posts.forEach((post, index) => {
      insertStmt.run(
        post.id || `insta-${index}`,
        post.imageUrl || post.src || "",
        post.videoUrl || "",
        post.postUrl || post.url || "",
        post.caption || "",
        post.timestamp || "",
        post.isVideo ? 1 : 0,
        post.shortCode || "",
        post.orderIndex ?? index,
        now,
        now
      );
    });
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }

  return getStoredInstagramPosts();
}

/**
 * Retrieves a metadata value for instagram sync cache.
 * @param {string} key
 */
export function getInstagramMeta(key) {
  const db = getDb();
  const row = db.prepare("SELECT value, updatedAt FROM instagram_meta WHERE key = ?").get(key);
  return row ? toPlainObject(row) : null;
}

/**
 * Sets a metadata key-value pair for instagram sync cache.
 * @param {string} key
 * @param {string} value
 */
export function setInstagramMeta(key, value) {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO instagram_meta (key, value, updatedAt)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updatedAt = excluded.updatedAt
  `).run(key, value, now);
}

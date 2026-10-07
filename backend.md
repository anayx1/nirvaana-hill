
This document provides a comprehensive technical breakdown of the backend setup for the **Kleanflix** project. It details the runtime environment, data storage engine, security layers, API routes, email services, media processing pipeline, and architectural design patterns.

---

## 1. Architecture Overview

Kleanflix leverages a modern **Next.js App Router (v16+)** full-stack architecture that combines Server Components, Server-Side Data Access, RESTful Route Handlers (`/api`), and native Node.js subsystems.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Kleanflix Full Stack                          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────┐                          ┌──────────────────────┐
│  Server Components   │                          │  API Route Handlers  │
│  (SSR / Direct DB)   │                          │  (/api/* Endpoints)  │
└──────────┬───────────┘                          └──────────┬───────────┘
           │                                                 │
           │  Direct In-Process Call                         │  HTTP JSON Requests
           ▼                                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Data & Security Services                        │
│                                                                        │
│  • src/lib/db.js          (Native SQLite queries, transactions)        │
│  • src/lib/auth.js        (PBKDF2 HMAC-SHA256 sessions, OTP auth)      │
│  • src/lib/security.js    (Sliding window rate limit, CORS, IP detect) │
│  • src/lib/email.js       (Nodemailer SMTP transporter)                │
│  • src/lib/recaptcha.js   (Google reCAPTCHA verification)              │
│  • src/app/api/upload     (Sharp WebP optimization engine)             │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Persistence & Storage                          │
│                                                                        │
│  • SQLite Database: data/kleanflix.db (WAL Mode, Busy Timeout: 30s)    │
│  • Media Assets:    public/uploads/*.webp (Lossless compression)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Backend Technologies & Dependencies

| Technology / Library | Version | Role & Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.3.0` | React framework providing App Router, Server Components, and API Route Handlers |
| **Node.js `node:sqlite`** | Native (Node 22+) | Synchronous, zero-overhead SQLite database driver (`DatabaseSync`) |
| **Sharp** | `^0.35.4` | High-performance image processing engine for automatic WebP conversion |
| **Nodemailer** | `^10.0.10` | SMTP email transport for notifications, inquiries, and password reset OTPs |
| **Node.js `crypto`** | Built-in | PBKDF2 password hashing (SHA-512), salt generation, and HMAC token signing |
| **Prisma** | `^6.4.1` | Initial schema and model definitions (`prisma/schema.prisma`) |
| **Google reCAPTCHA** | REST API | Spam and bot protection for public submission forms |

---

## 3. Database Layer (`src/lib/db.js`)

### 3.1 SQLite via Native `node:sqlite` (`DatabaseSync`)
Instead of external database connections or heavy ORM overhead, Kleanflix uses Node.js's native `DatabaseSync` on `data/kleanflix.db`.

- **WAL (Write-Ahead Logging) Mode**: Enabled via `PRAGMA journal_mode = WAL;` to permit concurrent readers alongside writers.
- **Busy Timeout**: Configured to `30000ms` (`PRAGMA busy_timeout = 30000;`) to prevent worker thread lock collisions in multi-threaded Next.js environments.
- **Auto-Directory & Table Provisioning**: Automatically verifies and creates `data/` and all database tables upon startup.

### 3.2 Database Schema & Tables

```sql
-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL DEFAULT 0,
  image TEXT,
  detailImage TEXT,
  inStock INTEGER DEFAULT 1,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featuredImage TEXT,
  author TEXT DEFAULT 'Kleanflix Team',
  tags TEXT DEFAULT '',
  status TEXT DEFAULT 'PUBLISHED',
  publishedAt TEXT NOT NULL,
  metaTitle TEXT,
  metaDescription TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  createdAt TEXT NOT NULL
);

-- 4. Events & Expos Table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  dates TEXT NOT NULL,
  location TEXT,
  featuredImage TEXT,
  orderIndex INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- 5. Admin Users & Credentials Table
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  salt TEXT NOT NULL,
  otpCode TEXT,
  otpExpiresAt TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

### 3.3 Default Seeds & Migrations
- **Categories**: Automatically seeds default categories (e.g. `Facility Care`, `Commercial Cleaning`, `Deep Cleaning`, `Window Cleaning`, `Specialty Care`, etc.) if empty.
- **Admin User**: Automatically provisions a default root administrator if no records exist.
- **Schema Migrations**: Includes runtime column migration safeguards (e.g., dynamic `ALTER TABLE products ADD COLUMN detailImage TEXT`).

---

## 4. Authentication & Security Layer

### 4.1 Password Hashing & Salts (`src/lib/auth.js`)
- **Algorithm**: PBKDF2 with SHA-512.
- **Iterations**: 10,000 rounds with 64-byte key length.
- **Salt Generation**: 16-byte cryptographically secure random bytes generated per user via `crypto.randomBytes(16)`.
- **Timing Attack Prevention**: Employs `crypto.timingSafeEqual` during hash validation.

### 4.2 Admin Session Management
- **Stateless HMAC Tokens**: Generates signed session tokens using HMAC-SHA256 (`createSessionToken`).
- **Cookie Security**: Tokens are stored in an `httpOnly`, `sameSite: 'lax'`, `secure` (production) cookie named `kleanfix_admin_session` with a 7-day lifespan (`SESSION_MAX_AGE`).
- **Session Verification**: Server helper `getAdminSession()` validates cookie signatures directly in Server Components and Route Handlers.

### 4.3 OTP Password Reset Flow
1. Admin requests reset with registered email (`/api/admin/auth/forgot-password`).
2. Server generates a secure 6-digit numeric OTP with a 15-minute expiration (`setAdminOtp`).
3. Nodemailer delivers a branded security email containing the verification code.
4. Admin submits new password with OTP (`/api/admin/auth/reset-password`).
5. Server validates code expiration, updates the PBKDF2 hash and salt, and invalidates the OTP.

### 4.4 In-Memory Sliding Window Rate Limiting (`src/lib/security.js`)
- Prevents brute-force and DDoS attacks on sensitive endpoints (`/api/admin/auth/login`, `/api/contact`, `/api/newsletter`).
- Enforces configurable request limits (e.g., **5 requests per minute per IP**).
- Background cleanup timer runs every 5 minutes (`setInterval` with `.unref()`) to prevent memory leaks.

### 4.5 CORS & Origin Whitelisting (`src/lib/security.js`)
- Restricts API access to verified domains (`kleanfix.com`, `kleanfix.in`, `kleanfix.vercel.app`).
- Generates compliant CORS headers and handles preflight `OPTIONS` requests via `handleCorsPreflight(request)`.

### 4.6 Bot Defense (`src/lib/recaptcha.js`)
- Validates Google reCAPTCHA tokens on public contact form submissions by querying `https://www.google.com/recaptcha/api/siteverify`.

---

## 5. Media & File Upload Processing Pipeline (`src/app/api/upload/route.js`)

Kleanflix includes an automated image optimization pipeline powered by **Sharp**:

1. **Incoming Request**: Accepts `multipart/form-data` with optional `suffix` and `customName` parameters.
2. **Filename Sanitization**: Slugs and normalizes the base filename into lowercase hyphenated alphanumeric strings (e.g., `product-title-detail.webp`).
3. **Lossless WebP Conversion**: Converts all uploaded files (JPEG, PNG, GIF, TIFF) directly to WebP using `sharp(buffer).webp({ lossless: true, effort: 4 })`.
4. **Collision Handling**: Automatically scans `public/uploads/` and appends incremental numeric counters (`-1`, `-2`) if a file with identical naming already exists.
5. **Storage**: Writes the final WebP asset to `public/uploads/` and returns the accessible public URL `/uploads/<filename>.webp`.

---

## 6. Email & Notification Subsystem (`src/lib/email.js` & `src/lib/emailTemplates.js`)

### 6.1 Nodemailer SMTP Engine
- Configured for Gmail SMTP / Custom SMTP relays (`smtp.gmail.com:465` SSL).
- Supports multiple comma-separated notification recipients via `SMTP_TO`.
- Automatically populates `replyTo` with the lead's email address for one-click email replies.

### 6.2 Branded HTML Templates
The template generator in `src/lib/emailTemplates.js` features responsive, inline-styled email templates with brand colors (`#1E6BB8`, `#0E4A8A`, `#F47A1F`):
- **Requirement & Lead Inquiries** (`getContactEmailHtml`): Detailed breakdown of requirement type, client name, company, contact number, and sanitized message.
- **Newsletter Subscription Notifications** (`getNewsletterEmailHtml`): Real-time alert when a visitor subscribes via the website footer.
- **Admin Password Reset OTP** (`getOtpEmailHtml`): High-security OTP verification card with timestamp and expiry notice.
- **XSS Sanitization**: All customer inputs are HTML-escaped (`escapeHtml`) before insertion into email templates.

---

## 7. API Routes Reference

### 7.1 Admin Authentication (`/api/admin/auth/*`)
| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/admin/auth/login` | `POST` | Public (Rate-limited) | Validates credentials, creates HMAC session cookie |
| `/api/admin/auth/logout` | `POST` | Admin | Clears session cookie |
| `/api/admin/auth/me` | `GET` | Admin | Verifies session cookie and returns admin user info |
| `/api/admin/auth/forgot-password` | `POST` | Public (Rate-limited) | Generates and emails 6-digit OTP code |
| `/api/admin/auth/reset-password` | `POST` | Public (Rate-limited) | Verifies OTP and updates admin password |

### 7.2 Products (`/api/products/*`)
| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/products` | `GET` | Public | Returns products list (supports `?category=` and `?search=`) |
| `/api/products` | `POST` | Admin | Creates a new product with auto-generated slug |
| `/api/products/[id]` | `GET` | Public | Fetches product by ID or slug |
| `/api/products/[id]` | `PUT` | Admin | Updates product attributes and image paths |
| `/api/products/[id]` | `DELETE` | Admin | Deletes product record |

### 7.3 Blog Posts (`/api/blogs/*`)
| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/blogs` | `GET` | Public | Returns blog posts (supports `?status=`, `?tag=`, `?search=`) |
| `/api/blogs` | `POST` | Admin | Creates a new blog post with metadata and slug |
| `/api/blogs/[id]` | `GET` | Public | Fetches blog by ID or slug (and adjacent posts) |
| `/api/blogs/[id]` | `PUT` | Admin | Updates blog content, tags, images, or status |
| `/api/blogs/[id]` | `DELETE` | Admin | Deletes blog post |

### 7.4 Categories (`/api/categories/*`)
| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/categories` | `GET` | Public | Returns alphabetical list of all active categories |
| `/api/categories` | `POST` | Admin | Adds a new category name |

### 7.5 Events & Expos (`/api/events/*`)
| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/events` | `GET` | Public | Returns all trade fairs and events sorted by order index |
| `/api/events` | `POST` | Admin | Adds a new event entry |
| `/api/events/[id]` | `GET` | Public | Fetches event details |
| `/api/events/[id]` | `PUT` | Admin | Updates event information |
| `/api/events/[id]` | `DELETE` | Admin | Removes event entry |

### 7.6 Inquiries, Leads & Media
| Route | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/contact` | `POST` | Public (Rate-limited, reCAPTCHA) | Processes requirement inquiries and sends email alerts |
| `/api/newsletter` | `POST` | Public (Rate-limited) | Processes newsletter signups and sends alerts |
| `/api/upload` | `POST` | Admin | Converts uploaded images to `.webp` and saves to `/public/uploads` |
| `/api/instagram/sync` | `GET`, `POST` | Public / Admin | Syncs latest Instagram post images from Apify and caches in SQLite |

---

## 8. Server-Side Data Fetching Pattern

In accordance with Next.js Server Component architecture, public pages (such as `/products`, `/blogs`, `/events`, `/facility-care`, etc.) do **NOT** fetch data via client-side `fetch('/api/...')` proxies. 

Instead, Server Components query the database directly in-process:

```javascript
// Example: src/app/blogs/page.js (Server Component)
import { getAllBlogs } from '@/lib/db';

export default async function BlogsPage() {
  const blogs = getAllBlogs({ status: 'PUBLISHED' });
  return <BlogsClient blogs={blogs} />;
}
```

**Benefits of this pattern:**
- Zero HTTP network overhead during SSR.
- Elimination of redundant internal REST calls.
- Fast Time-to-First-Byte (TTFB) and search engine indexing.

---

## 9. Environment Variables Reference (`.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `465` |
| `SMTP_SECURE` | Use SSL/TLS encryption | `true` |
| `SMTP_USER` | SMTP authentication user / sender address | `administrator@kleanfix.com` |
| `SMTP_PASS` | SMTP app password or credential | `xxxx xxxx xxxx xxxx` |
| `SMTP_TO` | Target recipient(s) for leads and notifications | `Skg@kleanfix.com` |
| `SMTP_FROM_NAME` | Sender display name in email clients | `Kleanfix Website` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public Google reCAPTCHA site key | `6Ldk...` |
| `RECAPTCHA_SECRET_KEY` | Secret Google reCAPTCHA server verification key | `6Ldk...` |
| `ADMIN_JWT_SECRET` | *(Optional)* Secret string for HMAC session token signing | Custom string fallback |
| `APIFY_API_TOKEN` | Personal API token for Apify Actor scraping | `apify_api_...` |
| `INSTAGRAM_PROFILE_URL` | Instagram target profile URL | `https://www.instagram.com/nirvaanahills/` |
| `INSTAGRAM_POSTS_LIMIT` | Number of Instagram posts to retrieve | `10` |
| `INSTAGRAM_CACHE_TTL_HOURS` | Cache expiration duration in hours before checking for new posts | `12` |


---

## 10. Summary & Maintenance Guidelines

1. **Database Backups**: The active database is located at `data/kleanflix.db` (with `-wal` and `-shm` write-ahead logs). To backup the database, copy the `data/` directory.
2. **Media Storage**: Uploaded media resides in `public/uploads/`. All assets are stored in `.webp` format.
3. **Session Cookie**: Sessions are stateless and validated cryptographically against `ADMIN_JWT_SECRET`.
4. **Performance**: All read operations on products and blogs use SQLite indexes and prepared statements (`db.prepare(...)`).

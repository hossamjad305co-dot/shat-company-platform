# SHAT Platform — Phase 1 Architecture Decisions (ADR)
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Architecture Decision Record (ADR) — Technical Tradeoffs & Final Selections*
*Date: 2026-09-25 | Status: APPROVED FOR EXECUTION*

---

## 1. ADR 01: Database Namespace Strategy (Public vs Separate Schema)

### Context & Challenge
The remote Supabase PostgreSQL database contains legacy tables from prior projects (`companies`, `products`, `users`, `roles`, `permissions`, `locations`). If new tables were created under generic names (`users`, `roles`, `permissions`), severe schema collisions and data corruption would occur.

### Options Evaluated
* **Option A: `public` schema with explicit `shat_` namespace prefix (e.g., `public.shat_profiles`, `public.shat_courses`).**
* **Option B: Dedicated schema `shat` (e.g., `shat.profiles`, `shat.courses`).**

### Comparison Matrix

| Evaluation Criterion | Option A: `public.shat_*` | Option B: Dedicated `shat.*` Schema |
| :--- | :--- | :--- |
| **Supabase PostgREST API** | **Seamless & Instant:** PostgREST exposes `public` by default. Zero extra dashboard config required. | **Requires Config Change:** PostgREST requires changing `PGRST_DB_SCHEMAS="public,shat"` in Supabase server settings. |
| **Collision Immunity** | **100% Collision-Proof:** `shat_` prefix cleanly isolates all new entities from legacy `users` or `roles`. | **100% Collision-Proof:** Different PostgreSQL namespace. |
| **Row Level Security (RLS)** | **Native & Direct:** Supported out-of-the-box with standard Supabase `auth.uid()` policies. | **Requires Schema Grants:** Additional `GRANT USAGE ON SCHEMA shat TO anon, authenticated` required. |
| **Developer Experience (DX)** | Simple `supabase.from('shat_courses')`. Fully supported by all Supabase JS SDK versions. | Requires `supabase.schema('shat').from('courses')`. Some client versions have edge-case bugs with joins. |
| **Migration Safety** | Reversible, isolated, zero risk to existing legacy tables. | Clean organization, but added complexity during automated migrations. |

### Decision
**Adopt Option A (`public.shat_*`) as the primary database namespace.**
All SHAT Platform entities will reside in `public` with the unambiguous prefix `shat_`. This guarantees zero configuration barriers on Supabase while providing absolute isolation from legacy ERP records.

---

## 2. ADR 02: Frontend Framework & Architecture Strategy

### Context & Challenge
The current platform is built with Vanilla JavaScript (ES Modules) bundled via Vite v6. The user requires an executive corporate website, high-end SaaS LMS/SIS with Google Classroom/Moodle depth, a corporate CMS with desktop/mobile preview, and WCAG AAA RTL/LTR compliance.

### Options Evaluated
1. **Option 1: Modularized Vanilla JavaScript (ES Modules) with Clean Layered Architecture.**
2. **Option 2: React 19 + Vite.**
3. **Option 3: Next.js 15 (App Router).**
4. **Option 4: Vue 3 / Nuxt.**

### Comparison Matrix

| Dimension | Option 1: Vanilla JS (Modular) | Option 2: React 19 + Vite | Option 3: Next.js 15 |
| :--- | :--- | :--- | :--- |
| **LMS / SIS Dynamic Depth** | High (with proper component abstraction and state dispatch). | Very High (rich component ecosystem, declarative state). | Very High (SSR/RSC advantages for SEO). |
| **CMS Live Preview** | Excellent (instant DOM injection, isolated iframe rendering). | Excellent (component re-render via reactive state). | High (requires preview API or route handlers). |
| **Page Speed & Bundle Weight** | **Unbeatable:** < 100 KB total JS bundle, zero framework overhead. | ~180 KB - 250 KB bundle. | > 350 KB initial hydration. |
| **Arabic RTL & Accessibility** | 100% native control over DOM, CSS tokens, and ARIA roles. | High (requires careful attention to RTL libraries). | High (requires SSR RTL coordination). |
| **Risk of Rewriting Existing Code** | Low to Moderate (decoupling existing monolithic `pages.js`). | High (complete rewrite of all existing views and templates). | Very High (complete rewrite + architectural overhaul). |
| **Vercel Production Alignment** | Zero configuration; fast static/edge caching. | Standard SPA build. | Native Vercel deployment. |

### Decision
**Adopt Option 1 (Modularized Vanilla JS with Domain Services) for the core platform, structured with strict component boundaries.**
* Rationale: The corporate identity requires instantaneous load speeds (FCP < 1.0s), zero dependency baggage, and direct CSS token fidelity (`#0F2E4A`, `#4B8834`). 
* Refactoring Strategy: Rather than an uncontrolled rewrite, we decompose the existing 188 KB monolithic `pages.js` into distinct, single-responsibility domain modules (`/modules/website/`, `/modules/academy/`, `/modules/cms/`, `/modules/auth/`).
* Component boundary contracts will be strictly typed via JSDoc to enable incremental React component drops if specialized UI widgets (e.g., interactive matrix rubrics or SVG grading annotations) require React later.

---

## 3. ADR 03: Backend & Serverless API Architecture

### Context & Challenge
The platform requires secure operations that cannot run client-side:
1. Google Drive 5 TB file streaming and access validation.
2. WhatsApp OTP dispatch via SMS/WhatsApp gateway.
3. AES-256 encryption and hashing of sensitive National IDs.
4. Server-enforced rate limiting and session defense.

### Decision
**Hybrid Architecture: Supabase Database + Vercel Serverless Functions (`/api/*`).**
* **Direct Database Operations (Browser → Supabase PostgREST):** Standard read/write operations (e.g., loading public courses, viewing announcements, submitting inquiries) run directly via Supabase client library governed by **Row Level Security (RLS)**.
* **Privileged Edge Operations (Browser → `/api/*` → External Services):**
  * `/api/auth/send-otp`: Dispatches WhatsApp OTP code without exposing gateway API keys.
  * `/api/auth/register`: Performs atomic profile validation, password hashing, and encrypted National ID storage.
  * `/api/storage/download`: Validates enrollment state before streaming from Google Drive.
  * `/api/storage/quota`: Queries Google Drive storage metrics and calculates 5 TB quota warnings.
  * `/api/forms/webhook`: Receives Google Forms webhooks and syncs applicant data.

---

## 4. ADR 04: Google Drive 5 TB Storage Architecture & Technical Reality

### Context & Challenge
The user has an institutional Google Account with 5 TB of cloud storage for 2 years. We must use Google Drive as the primary storage engine without storing private files directly on the app server.

### Critical Technical Truth
* **Personal / Workspace User Quota vs Service Account Quota:** A Google Cloud Service Account has its own (often zero or very limited) default storage quota. It **cannot** directly own 5 TB of files unless:
  * A Shared Drive (Team Drive) is created in Google Workspace and the Service Account is granted `Content Manager` permissions.
  * OR the Service Account impersonates a Workspace user via Domain-Wide Delegation.
  * OR files are uploaded directly into a specific folder shared with `Editor` access by the master 5 TB account, with ownership transferred.
* **Security Decision:**
  1. Frontend **never** communicates with Google Drive API directly.
  2. The backend serverless proxy handles all Drive API interactions via a Service Account with private key stored in Vercel environment variables (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_ROOT_FOLDER_ID`).
  3. Every file uploaded is shadowed in the database table `shat_files` with `provider = 'google_drive'` and `provider_file_id`.
  4. Access to files is strictly validated by enrollment checks: if a student is not active in the course, the proxy returns `HTTP 403 Forbidden`.
  5. Until the user provides live Google Cloud credentials, the system will explicitly report:
     `GOOGLE_DRIVE: NOT_CONFIGURED` (in compliance with Rule #57).

---

## 5. ADR 05: Identity, National ID Privacy & Authentication Flow

### Context & Challenge
The prompt mandates:
* First-time registration via WhatsApp OTP or Google OAuth.
* Profile completion with National ID.
* National ID is the system `username`.
* National ID must **never** be exposed publicly, in URLs, or to other students.

### Decision
1. **Authentication Separation:** Identity credentials live strictly in `auth.users`. Application details live in `shat_profiles`.
2. **National ID Protection Protocol:**
   * `username`: Stored as a lowercase alphanumeric handle derived from the National ID or account creation.
   * `national_id_hash`: An HMAC-SHA256 salted hash stored for $O(1)$ unique constraint enforcement and duplicate prevention.
   * `national_id_encrypted`: AES-256-GCM ciphertext stored strictly for administrative verification, decryptable only by Super Admin via backend function.
   * **Public RLS Policy:** When public or student views query profiles, a database view `shat_public_profiles` completely omits `national_id_hash`, `national_id_encrypted`, `phone`, and `date_of_birth`.

---

## 6. ADR 06: Content Versioning & CMS Live Preview Pipeline

### Context & Challenge
Content editors must be able to draft articles and project updates, edit them, view side-by-side desktop and mobile previews, and publish without exposing half-edited drafts to public visitors.

### Decision
* The `shat_posts` and `shat_projects` tables incorporate a native state enum:
  `status IN ('draft', 'scheduled', 'published', 'archived')`
* A `version (INT)` column and `published_version_id (UUID)` reference support side-by-side drafting.
* **The Preview Engine:** Renders drafts inside an isolated viewport iframe or shadow DOM passing a secure preview token (`?preview_token=xyz`), which allows authorized editors to see the draft rendered within the live site layout while visitors receive only `status = 'published'` records via RLS.

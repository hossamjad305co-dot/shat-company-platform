# SHAT Platform — Phase 1 Pre-Migration Audit
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Database State, Schema Inspection & Legacy Dependency Audit*
*Date: 2026-09-25 | Environment: Supabase (Project: `virecinrnuhpbadrswjj`)*

---

## 1. Executive Summary

Prior to authoring or applying any database migration for the SHAT Platform, a rigorous deep probe of the active Supabase PostgreSQL database was executed via authenticated REST and PostgREST introspection. 

The audit revealed that the current Supabase instance hosts legacy relational schemas from two previous projects:
1. An enterprise commercial ERP system ("شركة الرزاق الاستثمارية") containing tables for companies, products, users, departments, and financial permissions.
2. A directory listing application ("Alphora") containing tables for locations, categories, notifications, and orders.

**Critical Mandate:** In compliance with Section 3 ("Do Not Destroy Legacy Data"), **no legacy tables, columns, or records shall be dropped or altered**. All new SHAT Platform structures will be isolated and engineered to prevent name collisions, schema pollution, and accidental data loss.

---

## 2. Active Remote Database Inspection

### 2.1 Project Coordinates
* **Project Reference ID:** `virecinrnuhpbadrswjj`
* **Project Endpoint:** `https://virecinrnuhpbadrswjj.supabase.co`
* **Auth Tier:** Anonymous PostgREST access enabled via public JWT key.
* **Database Engine:** PostgreSQL 15+ with standard extensions (`pgcrypto`, `uuid-ossp`).

### 2.2 Table-by-Table Inventory of Existing Remote Database

| Table Name | Origin System | Record Count | Sample Primary Key / Columns | Collides with SHAT? | Action Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `public.companies` | Legacy ERP (Al-Razzaq) | 1 row | `id (BIGINT)`, `name_ar`, `name_en`, `tax_number`, `phone`, `address` | No | **KEEP & ISOLATE** |
| `public.departments` | Legacy ERP | 0 rows | `id (BIGINT)`, `company_id`, `name` | No | **KEEP & ISOLATE** |
| `public.products` | Legacy ERP | Active | `id (BIGINT)`, `company_id`, `code`, `name_ar`, `retail_price` | No | **KEEP & ISOLATE** |
| `public.users` | Legacy ERP | Active (`id: 2`) | `id (BIGINT)`, `company_id`, `username`, `password_hash`, `fullname`, `role` | **YES (Critical Collision)** | **DO NOT TOUCH**. SHAT must use `shat_profiles` linked to `auth.users`. |
| `public.roles` | Legacy ERP | Active | `role (TEXT PK)`, `description` | **YES (Critical Collision)** | **DO NOT TOUCH**. SHAT must use `shat_roles`. |
| `public.permissions` | Legacy ERP | Active | `id (BIGINT)`, `role`, `module_name`, `can_view`, `can_edit` | **YES (Critical Collision)** | **DO NOT TOUCH**. SHAT must use `shat_permissions`. |
| `public.employees` | Legacy ERP | 0 rows | `id (BIGINT)`, `company_id`, `user_id` | No | **KEEP & ISOLATE** |
| `public.locations` | Alphora Listing App | Active | `id (UUID)`, `coordinates (PostGIS Point)`, `latitude`, `longitude` | No | **KEEP & ISOLATE** |
| `public.categories` | Alphora Listing App | Active | `id (TEXT)`, `slug`, `name_en`, `name_ar`, `icon` | No | **KEEP & ISOLATE** |
| `public.alphora_notifications` | Alphora Listing App | Active | `id (TEXT)`, `user_id`, `title`, `message`, `type` | No | **KEEP & ISOLATE** |
| `public.orders` | Alphora Listing App | Active | `id (UUID)`, `amount`, `currency`, `status`, `payment_provider` | No | **KEEP & ISOLATE** |

### 2.3 Status of SHAT Platform Tables in Remote Database
* The tables defined in the previous local `supabase/schema.sql` (`consultations`, `academy_enrollments`, `inquiries`, `certificate_verifications`, `courses`, `course_modules`, `course_materials`, `course_enrollments`, `course_assignments`, `course_submissions`, `chat_messages`):
  * **Status:** `NOT FOUND IN SCHEMA CACHE (PGRST205)`.
  * **Finding:** These tables have not yet been executed in the remote Supabase database. Previous client-side attempts to call these endpoints caught errors and fell back to browser `localStorage`.

---

## 3. Codebase Dependency Audit

A comprehensive search of the frontend codebase (`C:\SHAT_Company\shat-company-platform`) was performed to identify any references to legacy tables or structures:

| Term Searched | Matches in Source Code | Dependency Analysis |
| :--- | :--- | :--- |
| `companies` | 0 matches | The frontend code has **zero** dependency on `public.companies`. |
| `departments` | 0 matches | The frontend code has **zero** dependency on `public.departments`. |
| `locations` | 0 matches | No dependency on legacy geospatial table. |
| `alphora` | 0 matches | No dependency on legacy notification table. |
| `products` | 0 matches | No dependency on legacy catalog table. |
| `consultations` | `assets/js/supabaseClient.js:39` | Inserts consultation leads; currently falls back to `localStorage`. |
| `academy_enrollments` | `assets/js/supabaseClient.js:73` | Inserts course enrollment leads; currently falls back to `localStorage`. |
| `inquiries` | `assets/js/supabaseClient.js:106` | Inserts contact form messages; currently falls back to `localStorage`. |
| `certificate_verifications` | `assets/js/supabaseClient.js:165` | Selects certificate records; currently falls back to in-memory dictionary. |

---

## 4. Name Collision & Schema Protection Plan

Because `public.users`, `public.roles`, and `public.permissions` already exist in the database with schemas incompatible with modern Supabase Auth (e.g. `users.company_id`, integer primary keys, plaintext roles):
1. **Never alter or drop legacy tables:** Preserving `public.users`, `public.roles`, and `public.permissions` prevents breaking any external services connected to this instance.
2. **Namespace Isolation:** All SHAT Platform tables will use the explicit prefix `shat_` (or dedicated schema `shat` with exposed views):
   * `shat_profiles` (linked 1:1 with Supabase `auth.users`)
   * `shat_roles`
   * `shat_permissions`
   * `shat_role_permissions`
   * `shat_user_roles`
   * `shat_courses`
   * `shat_course_sections`
   * `shat_course_lessons`
   * `shat_course_materials`
   * `shat_course_teachers`
   * `shat_enrollments`
   * `shat_assignments`
   * `shat_assignment_submissions`
   * `shat_exams`
   * `shat_exam_questions`
   * `shat_exam_attempts`
   * `shat_grade_items`
   * `shat_grades`
   * `shat_files`
   * `shat_posts`
   * `shat_projects`
   * `shat_services`
   * `shat_media`
   * `shat_site_settings`
   * `shat_audit_logs`
   * `shat_notifications`

This strategy provides **100% collision immunity**, guarantees zero disruption to legacy data, and ensures immediate PostgREST compatibility.

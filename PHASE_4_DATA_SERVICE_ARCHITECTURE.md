# SHAT Platform — Phase 4 Data Service Architecture

## 1. Architectural Boundary & Data Flow

Phase 4 establishes an impenetrable boundary between user interface components and the underlying database layer. UI components are strictly forbidden from performing direct database queries (`supabase.from(...)` or raw SQL).

```
┌────────────────────────────────────────────────────────┐
│                   UI Presentation Layer                │
│    (Cards, Tables, Forms, Layouts, Dashboards)         │
└───────────────────────────┬────────────────────────────┘
                            │ Domain requests
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Domain Service Layer                 │
│   (courseService, cmsService, fileService, etc.)       │
└───────────────────────────┬────────────────────────────┘
                            │ Managed calls & sanitization
                            ▼
┌────────────────────────────────────────────────────────┐
│                   API Client Boundary                  │
│       (services/api/client.js — Supabase Client)       │
└───────────────────────────┬────────────────────────────┘
                            │ Network requests (JWT-authenticated)
                            ▼
┌────────────────────────────────────────────────────────┐
│            PostgreSQL Schema: public.shat_*            │
│   (shat_courses, shat_posts, shat_enrollments, etc.)   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Hard Database Boundary (`public.shat_*`)

All database interactions in Phase 4 adhere to the Phase 1 schema namespace:
`public.shat_*`

### Strict Exclusion of Legacy Tables
The following legacy and external tables are **strictly prohibited** in active platform logic:
- `companies`
- `departments`
- `employees`
- `warehouses`
- `alphora_*`

### Remote Endpoint Forensic Status
A forensic probe against the live Supabase instance (`virecinrnuhpbadrswjj.supabase.co`) reveals:
1. **Auth Service (`/auth/v1`):** HTTP 200 (Active, capable of JWT authentication).
2. **Data Tables (`public.shat_*`):** HTTP 404 `PGRST205` ("Could not find table public.shat_* in the schema cache"). The consolidated migration script (`supabase/consolidated_schema.sql`) must be applied to the remote database to create these tables.
3. **Resilience Strategy:** The domain services layer intercepts `PGRST205` and network offline states gracefully, serving authentic development fixtures or clean empty states without crashing or fabricating fake production data.

---

## 3. Standardized Error Model

All domain services normalize network responses into a unified error dictionary:

| Error Code | Semantic Definition | UI Treatment |
| :--- | :--- | :--- |
| `loading` | Asynchronous operation in progress | Display skeleton card / spinner |
| `empty` | Valid query returned zero records | Render empty state component (`EmptyState.js`) |
| `unauthorized` | User not logged in | Intercept with permission modal guard (`#modal-permission-guard`) |
| `forbidden` | Logged in user lacks required permission | Display 403 Forbidden screen (`ErrorState({ code: '403' })`) |
| `not_found` | Target entity does not exist | Display 404 Not Found screen |
| `validation_error` | Client input violates domain schema | Display inline validation hints |
| `network_error` | Network disconnect or timeout | Render resilient offline retry prompt |
| `server_error` | Remote database or function exception | Render generic safe error message (no leaked stack traces) |
| `not_configured` | Third-party cloud integration not yet provisioned | Render explicit `NOT CONFIGURED` informational banner |

---

## 4. Domain Service Directory

### 4.1 Course Service (`services/courses/courseService.js`)
- **Authority:** `public.shat_courses`, `public.shat_course_sections`, `public.shat_course_lessons`.
- **Truthfulness Guarantee:** Progress fields are initialized to `null` or dynamically computed from verified assignment submissions. Hardcoded fake progress (such as artificial "75%") has been eliminated.
- **Fixture Transparency:** Where development fixtures are used, they are explicitly tagged with `isFixture: true`.

### 4.2 CMS Service (`services/cms/cmsService.js`)
- **Authority:** `public.shat_posts`.
- **Lifecycle Support:** Supports `draft`, `preview`, `published`, and `archived` states.
- **Content:** Governed by verified official corporate publications from `C:\SHAT_Company\info`.

### 4.3 File & Storage Service (`services/files/fileService.js`)
- **Authority:** `public.shat_course_materials`.
- **Separation of Concerns:** Distinguishes between **Database File Metadata** (filename, size, type, track) and **Actual Cloud Storage** (Google Drive API).
- **Zero-Fake-Download:** No artificial synthetic blobs are generated claiming to be Google Drive downloads; file requests honestly state that Drive API integration is `NOT CONFIGURED`.

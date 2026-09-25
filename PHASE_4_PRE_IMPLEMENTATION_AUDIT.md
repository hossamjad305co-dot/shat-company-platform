# SHAT Platform — Phase 4 Pre-Implementation Forensic Audit

## 1. Executive Summary & Forensic Context
This audit was performed on the active codebase at `C:\SHAT_Company\shat-company-platform` and the live Supabase project at `https://virecinrnuhpbadrswjj.supabase.co` prior to executing Phase 4 (Authentication, Identity & Real Supabase Data Layer).

The audit revealed critical architectural realities that govern Phase 4 execution:
1. **Remote Database State:** Probing the remote Supabase REST API confirmed that the Phase 1 `public.shat_*` tables have not yet been applied to the live PostgreSQL schema cache (returning `HTTP 404 PGRST205: Could not find table 'public.shat_*'`). The live database currently contains legacy ERP tables (`companies`, `users`, `warehouses`, `alphora_deposits`).
2. **Supabase Auth API Status:** The remote Supabase Auth server (`/auth/v1/settings`) is active and responding (`HTTP 200`).
3. **Legacy Plaintext Credentials:** Forensic analysis of `assets/js/auth.js` identified hardcoded plaintext passwords (`password: 'admin'`, `'teach'`, `'student'`, `'reg'`, `'edit'`) and bypass logic (`cleanPass === '123456' || cleanPass === 'admin123'`).
4. **Zero-Mock Policy Mandate:** Third-party cloud services (Google Drive 5TB, WhatsApp OTP gateway, Google OAuth SSO) remain unconfigured and must strictly display `STATUS: NOT CONFIGURED`.

---

## 2. Forensic Audit Matrix

| Domain / Area | Current State & Evidence | Exact File & Line | Target Architecture in Phase 4 | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase Remote Endpoint** | Configured and reachable at `https://virecinrnuhpbadrswjj.supabase.co`. Anon key verified. | `assets/js/services/api/client.js` (Lines 8–10) | Maintain client connection; route all queries to `public.shat_*` with network error handling. | Low / Verified |
| **Supabase Schema Cache** | Remote DB does not have `public.shat_*` tables in schema cache (`HTTP 404 PGRST205`). | Probed via `probe_supabase.js`: `shat_profiles`, `shat_courses` return 404. | Services must report real HTTP 404 / migration pending status; strictly prohibit fake success. | Critical / Documented |
| **Legacy ERP Tables** | Remote DB contains active legacy tables (`companies` = "شركة الرزاق الاستثمارية", `users`). | Probed via `probe_supabase.js`: `companies` (HTTP 200), `users` (HTTP 200). | **Strictly Prohibited:** Zero queries permitted to legacy ERP tables. | High / Isolated |
| **Plaintext Passwords in Code**| Hardcoded demo accounts containing plaintext passwords stored in code and LocalStorage. | `assets/js/auth.js` (Lines 29, 39, 49, 59, 69, 117) | Purge plaintext passwords. Transition authentication entirely to Supabase Auth (`supabase.auth`). | Critical / Security Risk |
| **Client-Side Auth Bypass** | `loginWithPassword` accepts `'123456'` or `'admin123'` as universal bypass. | `assets/js/auth.js` (Line 117) | Remove bypass completely. Delegate credential verification exclusively to Supabase Auth. | Critical / Security Risk |
| **WhatsApp OTP Simulation** | Client-side console logging (`console.info`) simulating OTP delivery. | `assets/js/auth.js` (Lines 6–22, `dispatchSecureOtp`) | Display explicit `STATUS: NOT CONFIGURED` with explanation that SMS gateway is unconfigured. | Medium / Deceptive UX |
| **Google OAuth Integration** | Google login button in auth modal triggers simulated client login. | `assets/js/app.js` (Lines 520–535) | Mark Google OAuth explicitly as `STATUS: NOT CONFIGURED` in accordance with Phase 4 rules. | Medium / Deceptive UX |
| **National ID Storage** | Legacy auth does not encrypt or hash National ID; stores raw username in localStorage. | `assets/js/auth.js` (Lines 150–165) | Implement Phase 1 Identity model: `username = national_id`, masked display (`ID-***-XXXX`), hash lookup. | High / Privacy Risk |
| **Client-Side Role Authority** | Client can set arbitrary role via simulator bar or localStorage without server validation. | `assets/js/auth.js` (Lines 80–90) | Explicitly document that client role is a presentation-only UX simulator; server RLS is authoritative. | High / Architecture |
| **Direct Table References** | `supabaseClient.js` contains deprecated queries to `consultations`, `academy_enrollments`, `inquiries`. | `assets/js/supabaseClient.js` (Lines 39, 72, 105, 164) | Deprecate and isolate. Modern code routes through `services/api/client.js` targeting `public.shat_*`. | High / Schema Mismatch |

---

## 3. Remote Supabase REST Probe Evidence (Verified 2026-09-25)

```text
Probing remote Supabase via REST...
Table [shat_profiles]: HTTP 404 | Response: {"code":"PGRST205","hint":"Perhaps you meant the table 'public.profiles'","message":"Could not find the table 'public.shat_profiles' in the schema cache"}
Table [shat_roles]: HTTP 404 | Response: {"code":"PGRST205","hint":"Perhaps you meant the table 'public.tenant_roles'","message":"Could not find table 'public.shat_roles' in schema cache"}
Table [shat_courses]: HTTP 404 | Response: {"code":"PGRST205","hint":"Perhaps you meant the table 'public.warehouses'","message":"Could not find table 'public.shat_courses' in schema cache"}
Table [shat_posts]: HTTP 404 | Response: {"code":"PGRST205","hint":"Perhaps you meant the table 'public.alphora_deposits'","message":"Could not find table 'public.shat_posts' in schema cache"}
Table [companies]: HTTP 200 | Response: [{"id":1,"name_ar":"شركة الرزاق الاستثمارية","name_en":"Al-Razzaq Investment Company"...}]
Table [users]: HTTP 200 | Response: [{"id":2,"company_id":1,"username":"a","password_hash":"$2b$10$..."}]
Auth Settings: HTTP 200 | {"external":{"anonymous_users":false,"apple":false,"azure":false,"bitbucket":false,"discord":false,"facebook":false...}}
```

### Forensic Conclusion from Evidence
The remote Supabase project is active, and its Auth service is live. However, the database administrator has not executed the Phase 1 migration script (`supabase/consolidated_schema.sql`) on the live PostgreSQL instance. Consequently:
1. `public.shat_*` tables are not yet present in the remote schema cache.
2. The platform's domain services must cleanly detect this state, report truthful errors (`MIGRATION_PENDING` / `TABLE_NOT_FOUND`), and fall back to truthful empty states or offline development fixtures clearly marked as `DEMO DATA`.
3. Under no circumstances may the application query or reuse legacy tables (`companies`, `users`, `warehouses`, `alphora_deposits`).
4. Plaintext passwords must be permanently eradicated from the client code and browser storage.

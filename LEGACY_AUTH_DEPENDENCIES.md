# SHAT Platform — Legacy Authentication Dependencies Audit
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Inventory of Client-Side Authentication, Mock Accounts, and LocalStorage States*
*Date: 2026-09-25 | Status: Baseline for Phase 3 Migration*

---

## 1. Overview & Preservation Policy

In compliance with Phase 1 instructions (**"لا تحذفها عشوائيًا في Phase 1 إذا كانت الواجهة الحالية تعتمد عليها"**), this document tracks all client-side authentication mechanisms, plaintext accounts, mock OTP handlers, and localStorage keys currently in the codebase. 

These legacy fallbacks remain intact during Phase 1 to preserve interactive UI verification, and will be methodically replaced by Supabase Auth and serverless endpoints in **Phase 3 (Authentication & Identity)**.

---

## 2. Inventory of Legacy Auth & Identity Dependencies

| # | File Path | Function / Line | Current Behavior | Production Replacement | Security Risk | Removal Phase |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `assets/js/auth.js` | `DEFAULT_ACCOUNTS` (Lines 25–76) | Hardcoded array of 5 staff accounts (`admin`, `instructor`, `student`, `registrar`, `editor`) with plaintext passwords (`admin`, `teach`, `student`, `reg`, `edit`). | Real user accounts in Supabase `auth.users` + `shat_profiles` + `shat_user_roles`. | **High (Critical):** Plaintext credentials exposed in client-side bundle. | **Phase 3** |
| **02** | `assets/js/auth.js` | `loginWithPassword()` (Lines 110–141) | Searches `localStorage.getItem('shat_system_staff')` and compares plaintext strings. Accepts `123456` or `admin123` as universal bypasses. | Supabase `supabase.auth.signInWithPassword({ email, password })` returning encrypted session JWT. | **High:** Trivial client authentication bypass. | **Phase 3** |
| **03** | `assets/js/auth.js` | `sendRegistrationOtp()` (Lines 144–171) | Generates `Math.floor(100000 + Math.random() * 900000)` client-side and stores in `this.pendingOtp`. Dispatches mock code to console. | Serverless `/api/auth/send-otp` calling official WhatsApp Business API; code hashed at rest in backend store. | **High:** Predictable client-side OTP generation. | **Phase 3** |
| **04** | `assets/js/auth.js` | `verifyRegistrationOtp()` (Lines 174–220) | Compares user input directly against `this.pendingOtp` in memory. Stores new user in `shat_registered_users` in localStorage. | Serverless `/api/auth/verify-otp` with atomic Supabase user and profile creation. | **High:** In-memory state tampering via browser console. | **Phase 3** |
| **05** | `assets/js/auth.js` | `loginWithGoogle()` (Lines 282–296) | Fabricates a mock user object (`username: 'google_user'`) and saves to `shat_current_user` in localStorage. | Real Supabase Google OAuth 2.0 PKCE redirect flow (`supabase.auth.signInWithOAuth`). | **Medium:** Unverified mock OAuth session. | **Phase 3** |
| **06** | `assets/js/auth.js` | `switchRoleQuick()` (Lines 329–342) | Role Simulator toolbar instantly switches between `admin`, `instructor`, `student`, and `visitor` without credentials. | Real role simulation powered by Supabase JWT claims and administrative impersonation tokens for audit logging. | **Medium:** In production, role simulator must only be accessible to Super Admins. | **Phase 3** |
| **07** | `assets/js/cms.js` | `CMSService` (Lines 80–110) | Reads and writes articles, applications, and custom images directly from `localStorage.getItem('shat_cms_data')`. | Direct relational PostgREST queries on `shat_posts`, `shat_projects`, and `shat_site_settings`. | **Medium:** Client-side data volatility; changes lost on cache clear. | **Phase 4** |
| **08** | `assets/js/moodle.js` | `getCourses()` (Lines 340–355) | Persists course definitions in `shat_moodle_courses_v3` in localStorage. | Relational queries on `shat_courses`, `shat_course_sections`, and `shat_course_lessons`. | **Medium:** Unsynchronized academic state. | **Phase 5** |

---

## 3. Migration Roadmap for Legacy Auth
1. **Phase 1 (Current):** Document dependencies and preserve backward compatibility while database schema and RLS policies are applied.
2. **Phase 3 (Authentication Migration):**
   * Integrate Supabase Auth JS SDK (`signInWithPassword`, `signUp`, `signInWithOAuth`).
   * Deploy serverless edge functions for `/api/auth/send-otp` and `/api/auth/verify-otp`.
   * Replace `localStorage.getItem('shat_current_user')` with Supabase reactive session listener (`supabase.auth.onAuthStateChange`).
   * Cleanly deprecate `DEFAULT_ACCOUNTS` and mock OTP generator.

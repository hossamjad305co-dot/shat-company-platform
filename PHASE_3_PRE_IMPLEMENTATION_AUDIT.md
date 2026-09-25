# SHAT Platform — Phase 3 Pre-Implementation Forensic Audit

## 1. Executive Summary
This document provides a forensic audit of the existing codebase in `C:\SHAT_Company\shat-company-platform` prior to starting Phase 3 frontend modernization. The audit identifies all monolithic structures, legacy dependencies, hardcoded content, localStorage uses, and database table discrepancies between the legacy code and the Phase 1 `public.shat_*` schema.

---

## 2. Comprehensive Forensic Audit Matrix

| Area | Current State | Evidence (File & Line) | Migration Target | Risk / Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Page Rendering Monolith** | Single file rendering 13 different page templates via large template strings. | `assets/js/pages.js` (Lines 1–2875, 188 KB) | Modularize into `assets/js/pages/company/`, `assets/js/pages/academy/`, `assets/js/pages/teacher/`, `assets/js/pages/admin/` using shared components. | High. Any syntax error breaks all views. Difficult code-splitting. |
| **Localization Monolith** | Monolithic translation dictionary with all languages loaded synchronously at boot. | `assets/js/translations.js` (Lines 1–4127, 254 KB) & `academyTranslations.js` (28.8 KB) | Decompose into `assets/js/locales/{ar,en,fr}/` split by domain (`common.js`, `company.js`, `academy.js`, `teacher.js`, etc.). | High. Unnecessary memory footprint (280KB+ on initial page load), 107 duplicate keys. |
| **Router Monolith** | Monolithic Router class handling routing, DOM event binding, and role state updates in huge procedural blocks. | `assets/js/router.js` (Lines 1–1372, 56.3 KB) | Implement modular route registry with layout shells, permission checks, 404/unauthorized guards, and an Adapter pattern. | High. Brittle event listeners; failure in one page's listeners breaks routing. |
| **LMS Data & Mocking** | In-memory courses with hardcoded completion percentages (75%, 40%) and simulated file downloads. | `assets/js/moodle.js` (Lines 132–250, 414–485) | Encapsulate inside `assets/js/services/courses/` consuming `public.shat_courses`. Clearly label offline fixtures as DEMO DATA. | High. Violates Zero-Mock Policy if presented as live academic state. |
| **Legacy Database Tables** | Direct queries to legacy un-namespaced tables (`consultations`, `academy_enrollments`, `inquiries`, `certificate_verifications`). | `assets/js/supabaseClient.js` (Lines 40, 73, 105, 164) | Migrate queries to Phase 1 authoritative schema (`public.shat_consultations`, `public.shat_course_enrollments`, `public.shat_inquiries`, `public.shat_certificates`). | High. Data will not map to Phase 1 tables, leading to RLS failures. |
| **Auth & Credentials** | Plaintext user accounts with passwords stored in localStorage (`password: 'admin'`). | `assets/js/auth.js` (Lines 25–76, `DEFAULT_ACCOUNTS`) | Encapsulate under `authService` interface. Keep role switcher strictly for development simulation; do not expose passwords in UI. | Critical. Security exposure if treated as production auth. |
| **Simulated OTP Service** | Client-side console logging for WhatsApp OTP (`dispatchSecureOtp`). | `assets/js/auth.js` (Lines 6–22) | Mark WhatsApp OTP explicitly as `STATUS: NOT CONFIGURED` in UI per Phase 1 & 2 rules. | Medium. Confusing to users if presented as real SMS gateway. |
| **CMS Storage in LocalStorage**| Posts, hero copy, and applications stored exclusively in browser localStorage. | `assets/js/cms.js` (Lines 77–100, `shat_cms_data`) | Create `cmsService` with proper schema mapping to `public.shat_posts` and `public.shat_projects`. | Medium. Data is ephemeral and browser-specific. |
| **CSS Physical Properties** | Sprawling CSS stylesheet with over 200 physical directional properties (`margin-left`, `right: 0`). | `assets/css/style.css` (3,545 lines, 74.7 KB) | Transition to `assets/css/variables.css` tokens and `design-system.css` logical properties (`margin-inline-start`, etc.). | High. Incomplete or broken RTL mirroring in Arabic and French views. |
| **Direct DOM Selectors** | Global event bindings querying IDs across page lifecycles without teardown. | `assets/js/router.js` (Lines 149–170, `bindPageInteractions`) | Encapsulate event listeners within component and page lifecycle mount/unmount contracts. | Medium. Memory leaks and duplicate listener triggers on rapid navigation. |

---

## 3. LocalStorage Key Inventory & Risk Classification

| LocalStorage Key | Current Consumer | Stored Content | Target Classification |
| :--- | :--- | :--- | :--- |
| `shat_platform_lang` | `app.js`, `router.js` | Current language (`'ar'`, `'en'`, `'fr'`) | **REQUIRED TEMPORARILY** (User preference) |
| `shat_current_user` | `auth.js`, `router.js` | Current active user profile & role | **MIGRATE NOW** (Clean auth interface) |
| `shat_system_staff` | `auth.js` | Default staff accounts with passwords | **MIGRATE NOW** (Dev simulator only) |
| `shat_registered_users` | `auth.js` | Registered self-service users | **MIGRATE NOW** (Dev simulator only) |
| `shat_moodle_courses` | `moodle.js` | Course catalog, modules, files | **MIGRATE NOW** (Service layer boundary) |
| `shat_cms_data` | `cms.js` | Posts and hero copy overrides | **MIGRATE NOW** (Service layer boundary) |
| `shat_admissions_applications` | `cms.js` | Student application submissions | **MIGRATE NOW** (Service layer boundary) |
| `shat_local_consultations` | `supabaseClient.js` | Offline consultation submissions | **REQUIRED TEMPORARILY** (Offline fallback) |
| `shat_local_academy_enrollments` | `supabaseClient.js`| Offline academy enrollments | **REQUIRED TEMPORARILY** (Offline fallback) |
| `shat_local_inquiries` | `supabaseClient.js` | Offline general contact messages | **REQUIRED TEMPORARILY** (Offline fallback) |

---

## 4. Architectural Rules for Phase 3 Implementation
1. **Incremental Adapter Bridge:** We will NOT delete `pages.js`, `translations.js`, `router.js`, or `moodle.js`. We will implement an `Adapter` pattern where newly modularized screens take priority, delegating unmigrated legacy routes to the legacy renderers until full verification.
2. **Strict Public Schema Enforcement:** All API services must query `public.shat_*` tables only.
3. **Zero Mock Disclosure:** If third-party integrations (Google Drive, WhatsApp OTP) are unconfigured, UI must explicitly indicate `STATUS: NOT CONFIGURED`.
4. **Clean Code Boundaries:** No direct `supabase.from()` calls in UI components. All data access must pass through domain services (`services/courses/`, `services/cms/`, `services/users/`, etc.).

# SHAT Platform — Phase 3 Legacy Migration Matrix

## 1. Executive Summary
In strict compliance with the **No Big-Bang Rewrite** mandate, this document records the exact lifecycle status of every legacy module in the platform, tracking its consumers, modernized replacement, operational status, and the technical rationale for its retention or deprecation.

---

## 2. Legacy Module Migration Lifecycle

| Legacy Module | Original Consumer | Modernized Replacement Module | Current Status | Remaining Dependencies & Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `assets/js/translations.js` (254.8 kB) | `app.js`, `pages.js`, `router.js` | `assets/js/locales/index.js` (ar, en, fr modular bundles) | **ADAPTER** | Retained to supply the dictionary for unmigrated corporate pages (`about`, `services`, `tracks`, etc.) until complete view replacement. |
| `assets/js/academyTranslations.js` (28.8 kB) | `translations.js` | `assets/js/locales/ar/academy.js` & `locales/en/index.js` | **DEPRECATED** | Imported exclusively by `translations.js`. New academic screens consume `locales/ar/academy.js` directly. |
| `assets/js/pages.js` (188.5 kB) | `router.js` | Modular pages in `assets/js/pages/{company,academy,teacher,admin,employee}/` | **ADAPTER** | Retained as fallback rendering engine for 19 secondary corporate views and course detail views via `routerAdapter.js`. |
| `assets/js/router.js` (56.3 kB) | `app.js`, HTML hash listeners | `assets/js/router/routerAdapter.js` & `router/routes.js` | **ADAPTER** | Global modal initialization (`initGlobalModalsAndRoleBar`) and legacy event listeners remain active to support unmigrated views. |
| `assets/js/moodle.js` (36.5 kB) | `pages.js`, `router.js` | `services/courses/courseService.js` & `services/files/fileService.js` | **ADAPTER** | Retained for interactive course chat arrays in legacy course detail view (`renderCourseDetailPage`). |
| `assets/js/auth.js` (11.7 kB) | `app.js`, `router.js` | `assets/js/services/auth/authService.js` | **ACTIVE / ADAPTER** | Supplies DOM click handlers for the development role simulator bar in `index.html`. Authenticated state synced via CustomEvents. |
| `assets/js/cms.js` (10.3 kB) | `pages.js` | `assets/js/services/cms/cmsService.js` | **MIGRATED** | Core posts and official articles now served by `cmsService.js`. Legacy file retained for admissions applications local storage. |
| `assets/js/supabaseClient.js` (6.1 kB) | `app.js`, `router.js` | `assets/js/services/api/client.js` | **MIGRATED** | Deprecated direct queries to legacy tables (`consultations`, `academy_enrollments`). Replaced by `services/api/client.js` mapped to `public.shat_*`. |

---

## 3. Status Definitions
- **ACTIVE:** Actively invoked by the modern runtime.
- **ADAPTER:** Wrapped inside an adapter interface to ensure backward compatibility for unmigrated routes.
- **MIGRATED:** Core logic has been completely ported to the new modular architecture.
- **DEPRECATED:** Scheduled for deletion in subsequent phases once remaining consumers are retired.
- **REMOVED:** Deleted from the repository following zero-dependency verification.

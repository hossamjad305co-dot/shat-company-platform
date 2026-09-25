# SHAT Platform — Phase 3 Frontend Architecture Specification

## 1. Architectural Philosophy & Principles
The modernized frontend architecture for the **SHAT Development & Growth Platform (شركة شات للتنمية والتطوير)** transitions the codebase from an unstructured monolithic model to a modular, domain-driven, component-based architecture.

The core principles enforced in this architecture are:
1. **Contextual Decoupling:** Complete separation between the public corporate marketing presence (SHAT Company) and the utilitarian learning management workspace (SHAT Academy), while sharing unified design tokens and atomic UI primitives.
2. **No Big-Bang Rewrite:** Legacy monoliths (`pages.js`, `translations.js`, `router.js`, `moodle.js`) are retained and wrapped within an **Adapter Bridge** (`routerAdapter.js`) to guarantee zero regression and zero downtime.
3. **Domain Service Boundaries:** Elimination of raw database calls (`supabase.from(...)`) in UI views. All data interactions are routed through domain services (`services/courses/`, `services/cms/`, `services/files/`, `services/auth/`).
4. **Data Truthfulness & Zero-Mock Policy:** Third-party cloud integrations (Google Drive 5TB, WhatsApp OTP, Google OAuth) without active backend credentials explicitly render `STATUS: NOT CONFIGURED`. Development fixtures are clearly isolated from production datasets.

---

## 2. Target Directory Hierarchy

```text
assets/
├── css/
│   ├── variables.css             # Authoritative design tokens (Navy #0F2E4A, Growth Green #4B8834)
│   ├── style.css                 # Legacy base stylesheet & reset
│   └── components/
│       └── design-system.css     # Atomic component classes (.shat-btn, .shat-input, .shat-card, etc.)
│
├── js/
│   ├── app.js                    # Bootstrapper & application controller
│   ├── router/
│   │   ├── routes.js             # Route registry with role metadata & title mapping
│   │   ├── routerAdapter.js      # Non-destructive router bridging modern & legacy views
│   │   └── index.js              # Router export facade
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   └── core.js           # Atomic UI primitives (Button, Input, Badge, Card, Modal, etc.)
│   │   ├── navigation/
│   │   │   └── AcademySidebar.js # Contextual academic navigation panel
│   │   ├── academy/
│   │   │   ├── CourseCard.js     # Academic course card with real progress meter
│   │   │   └── DriveStatusCard.js# Explicit Google Drive mediation notice
│   │   ├── cms/
│   │   │   └── PostCard.js       # Official verified corporate post card
│   │   └── uiPlayground.js       # Phase 2 interactive component showcase
│   │
│   ├── layouts/
│   │   ├── academy/
│   │   │   └── academyLayout.js  # Dedicated workspace shell for learning workflows
│   │   └── admin/
│   │       └── adminLayout.js    # High-density management layout for administrators
│   │
│   ├── pages/
│   │   ├── company/
│   │   │   └── HomePage.js       # Verified corporate homepage
│   │   ├── academy/
│   │   │   ├── AcademyDashboardPage.js # Student LMS learning hub
│   │   │   ├── AssignmentsPage.js      # Task submission & feedback center
│   │   │   ├── ExamsPage.js            # Timed assessments view
│   │   │   ├── GradesPage.js           # Private student gradebook matrix
│   │   │   └── DriveFilesPage.js       # Cloud repository view & authentic downloads
│   │   ├── teacher/
│   │   │   ├── TeacherDashboardPage.js # Trainer workspace & grading queue
│   │   │   └── TeacherCourseBuilderPage.js # Interactive curriculum block builder
│   │   ├── admin/
│   │   │   ├── AdminUsersPage.js       # User governance & RBAC manager
│   │   │   ├── AdminIntegrationsPage.js# Cloud services status & telemetry
│   │   │   └── AdminAuditLogsPage.js   # Immutable audit trail table
│   │   └── employee/
│   │       └── EmployeeCMSPage.js      # CMS editorial & publishing pipeline
│   │
│   ├── services/
│   │   ├── api/
│   │   │   └── client.js         # Supabase client scoped exclusively to public.shat_*
│   │   ├── auth/
│   │   │   └── authService.js    # Clean authentication, session & permission interface
│   │   ├── courses/
│   │   │   └── courseService.js  # Course queries & honest progress calculations
│   │   ├── cms/
│   │   │   └── cmsService.js     # Post & project repository
│   │   └── files/
│   │       └── fileService.js    # Material metadata & authentic browser file generator
│   │
│   └── locales/
│       ├── ar/                   # Arabic domain dictionaries (common, company, academy, admin)
│       ├── en/                   # English domain dictionaries
│       └── index.js              # Localization registry & t() helper
```

---

## 3. Component Interaction & Lifecycle Flow

```
User Action / Hash Change (#/academy/assignments)
             ↓
[Router Adapter] (routerAdapter.js)
             ↓ Matches MODULAR_ROUTES['academy/assignments']
[Permission Check] (authService.hasRole / hasPermission)
             ↓ Authorized
[Page Controller] (AssignmentsPage.js)
             ↓ Fetches data via domain service
[Course Service] (services/courses/courseService.js)
             ↓ Queries public.shat_* with offline fallback
[Layout Shell] (AcademyLayout.js)
             ↓ Wraps content with AcademySidebar & Breadcrumbs
[Atomic UI Primitives] (components/ui/core.js)
             ↓ Consumes Design Tokens (--shat-navy-900, --shat-green-700)
DOM Injection into #app-content (Zero global reload)
```

---

## 4. Security & Isolation Boundaries
1. **Frontend RBAC vs Backend RLS:** The UI dynamically adapts based on the active role (`admin`, `teacher`, `student`, `employee`, `visitor`), but UI visibility is explicitly acknowledged as a presentational convenience. The authoritative security boundary resides in Supabase PostgreSQL Row Level Security (`public.shat_*`).
2. **National ID Protection:** National IDs used for unique identification are never rendered in plain text; they are masked (`ID-***-XXXX`) in all frontend rosters.
3. **No Stored Plaintext Secrets:** Passwords and cloud API secrets are strictly prohibited from `localStorage`, `sessionStorage`, and client-side bundles.

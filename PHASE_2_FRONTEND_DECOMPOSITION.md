# SHAT Platform — Phase 2 Frontend Decomposition & Refactoring Strategy
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Decomposition Plan for Monolithic Files (pages.js, router.js, moodle.js, translations.js)*
*Date: 2026-09-25 | Status: Complete & Frozen for Phase 2*

---

## 1. Problem Statement: Monolithic Debt Audit

An audit of the frontend assets reveals that rapid prototyping led to massive single-file concentrations:
* **`assets/js/pages.js` (188 KB, 2,875 lines):** Houses 13 completely distinct page renderers (Home, About, Services, Consulting, Delivery Model, Approach, References, Expertise, Partnerships, Contact, Academy, Google Form, Course Detail) in a single procedural file.
* **`assets/js/translations.js` (254 KB, 4,127 lines):** Merges general UI dictionary, complete long-form articles, and Moodle academic texts into one file.
* **`assets/js/router.js` (55 KB, 1,361 lines):** Combines hash routing with DOM event listeners, modal controllers, image uploader handlers, chat socket listeners, and permission gates.
* **`assets/js/moodle.js` (36 KB, 501 lines):** Combines course definitions with simulated file blob downloads, teacher course editors, and chat message storage.

**Refactoring Mandate:** In compliance with Section 56 (**"No Big-Bang Rewrite"**), the codebase will be refactored via an **Adapter Pattern**, modularizing functions into clean domain modules without breaking the active production deployment.

---

## 2. Target Modular Directory Architecture

```text
assets/js/
├── core/
│   ├── app.js                       # Lightweight application kernel & lifecycle
│   ├── router.js                    # Pure route matching & history controller
│   └── i18n.js                      # Namespaced translation loader
│
├── components/
│   ├── ui/                          # Reusable Primitive Elements
│   │   ├── button.js
│   │   ├── modal.js
│   │   ├── badge.js
│   │   ├── formFields.js
│   │   ├── dataTable.js
│   │   ├── toast.js
│   │   └── uiPlayground.js          # Phase 2 UI Component Showcase
│   └── layout/
│       ├── header.js
│       ├── footer.js
│       ├── roleBar.js
│       └── sidebar.js
│
├── modules/
│   ├── website/                     # Corporate Website Views
│   │   ├── homeView.js              # Home, Hero, Motto, Pillars
│   │   ├── aboutView.js             # Philosophy, 10 Principles, References
│   │   ├── servicesView.js          # Training & Consulting Services
│   │   ├── projectsView.js          # Project Showcase & Detail
│   │   ├── postsView.js             # Blog & News Reader
│   │   └── contactView.js           # Contact Form & Verification Portal
│   │
│   ├── academy/                     # Learning Management System
│   │   ├── studentDashboard.js      # Course Cards & Deadlines Radar
│   │   ├── courseRoom.js            # Tabbed Learning Room & Syllabus
│   │   ├── lessonViewer.js          # Rich Text & Video Player
│   │   ├── assignmentWorkspace.js   # Student Submission & Rubric
│   │   ├── examArena.js             # Timed Quiz & Exam Engine
│   │   ├── gradebookView.js         # Student Transcript
│   │   └── courseForum.js           # Threaded Discussions
│   │
│   ├── teacher/                     # Instructor Cockpit
│   │   ├── teacherDashboard.js      # Course List & Grading Radar
│   │   ├── courseBuilder.js         # Unit / Lesson / Material Creator
│   │   └── gradingCockpit.js        # Split-screen Submission Review
│   │
│   ├── admin/                       # Administration & Governance
│   │   ├── adminDashboard.js        # System Telemetry & KPIs
│   │   ├── userManagement.js        # User Directory & Role Assignment
│   │   ├── admissionsQueue.js       # Student Application Processing
│   │   ├── cmsManager.js            # Posts & Project Publishing
│   │   ├── previewEngine.js         # Desktop/Mobile Live Preview Viewport
│   │   ├── storageTelemetry.js      # Google Drive 5TB Monitor
│   │   └── auditLogViewer.js        # Immutable Security Trail
│   │
│   └── auth/                        # Identity & Authentication
│       ├── authController.js        # Password, OTP, Google Orchestrator
│       ├── rbacGuard.js             # Permission Checkers
│       └── profileCompletion.js     # First-Time Onboarding Wizard
```

---

## 3. Function-by-Function Decomposition & Migration Mapping

| Current File & Function | Target Module & File | Responsibilities Extracted | Priority | Target Phase |
| :--- | :--- | :--- | :--- | :--- |
| `pages.js:renderHomePage` | `modules/website/homeView.js` | Home hero, brand pillars, value proposition formula, live post slider. | High | Phase 4 |
| `pages.js:renderAboutPage` | `modules/website/aboutView.js` | Company philosophy, 10 principles, 10 international references. | Medium | Phase 4 |
| `pages.js:renderServicesPage` | `modules/website/servicesView.js` | 8 specialized training portfolios and 7-step training system. | High | Phase 4 |
| `pages.js:renderConsultingPage` | `modules/website/servicesView.js` | Protection consulting, OECD DAC external evaluation, 8 consulting systems. | High | Phase 4 |
| `pages.js:renderAcademyPage` | `modules/academy/studentDashboard.js` | Student course cards, circular progress, recent announcements. | High | Phase 5 |
| `pages.js:renderCourseDetailPage`| `modules/academy/courseRoom.js` | Tabbed course workspace: Units, lessons, assignments, materials. | High | Phase 5 |
| `pages.js:renderContactPage` | `modules/website/contactView.js` | Dynamic contact channels, consultation request form. | Medium | Phase 4 |
| `moodle.js:downloadRealFile` | `modules/academy/courseRoom.js` | Deprecate in-memory Blob generator; route to `/api/storage/download`. | High | Phase 6 |
| `moodle.js:renderTeacherPortal` | `modules/teacher/teacherDashboard.js`| Instructor course builder, assignment scheduler, submission queue. | High | Phase 8 |
| `cms.js:CMSService` | `modules/admin/cmsManager.js` | Replace `localStorage` with PostgREST calls to `shat_posts` & `shat_projects`. | High | Phase 4 |
| `auth.js:AuthService` | `modules/auth/authController.js` | Replace plaintext `DEFAULT_ACCOUNTS` with Supabase Auth + JWT claims. | Critical | Phase 3 |

---

## 4. Gradual Migration Protocol (Adapter Pattern)

1. **Step 1 (Encapsulation):** As each new module is constructed in `modules/`, the existing `pages.js` acts as an adapter, re-exporting the new module functions so that `router.js` continues to operate without breaking.
2. **Step 2 (Verification):** Test the extracted view inside the UI Playground and active route across all 4 roles (`visitor`, `student`, `instructor`, `admin`).
3. **Step 3 (Route Modernization):** Update `router.js` to import directly from `modules/*`, cleanly shrinking `pages.js` until it reaches 0 bytes and is archived.

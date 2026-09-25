# SHAT Platform — Phase 2 Design Decisions & Architecture Architecture

## 1. Executive Summary & Purpose

Phase 2 establishes the systematic visual language, component taxonomy, UX flow boundaries, and front-end engineering rules for the **SHAT Development & Growth Platform (شركة شات للتنمية والتطوير)**. 

The primary architectural imperative of this phase is **contextual separation without brand fragmentation**:
- **Corporate Company Portal:** Prestigious, authoritative institutional identity tailored to government bodies, international donors, banks, and enterprise clients.
- **SHAT Academy (LMS/SIS):** Highly utilitarian, cognitive-load-minimized workspace optimized for learning workflows (lessons, submissions, timed examinations, gradebooks, discussions).
- **Executive Administration & CMS:** Dense, data-rich management portal supporting audit trails, RBAC permission filters, multi-role previews, and configuration dashboards.

---

## 2. Brand Source of Truth & Systematic Color Derivation

### 2.1 The Official Master Palette
Derived directly from the verified corporate documents (*SHAT Company Profile*):
| Color Token | Hex Code | Role in System | WCAG AAA Contrast Rating |
| :--- | :--- | :--- | :--- |
| **Navy (Primary)** | `#0F2E4A` | Corporate Anchor, Primary Text, Executive Headers, Dark Surfaces | 12.8:1 against White |
| **Growth Forest Green** | `#4B8834` | Primary Brand Accent, Action CTAs, Progress Indicators, Active States | 4.6:1 against White, 7.8:1 against Dark |
| **Accent Leaf Green** | `#5EA02F` | Secondary Highlights, Badges, Hover Rings, Micro-interactions | 3.2:1 against White, High Contrast against Navy |
| **Tint Green** | `#EEF5E8` | Semantic Success Backgrounds, Active Nav Items, Light Containers | Soft Tint Background |
| **Slate Neutral** | `#EDF2F7` | Card Backgrounds, Inactive Table Headers, Subtle Dividers | Neutral Surface Token |
| **Pure White** | `#FFFFFF` | Core Canvas, Elevated Card Surface, Inverted Typography | 100% Crisp Neutral |

### 2.2 Functional & Derived Palette Rules
No arbitrary or off-brand colors may be introduced in component styles. All state colors are systematically derived:
- **Success (`#4B8834` / bg: `#EEF5E8`):** Uses the official brand Growth Green and Tint Green.
- **Warning (`#b45309` / bg: `#fef3c7`):** Warm amber chosen specifically to harmonize with Navy without clashing with the green spectrum.
- **Danger (`#dc2626` / bg: `#fef2f2`):** Crisp institutional crimson reserved strictly for irreversible actions and validation errors.
- **Info (`#0284c7` / bg: `#e0f2fe`):** Clean cyan-blue for non-critical system updates and guidance notes.
- **Unconfigured (`#64748b` / bg: `#f1f5f9`):** Neutral slate badge identifying uninitialized third-party services (e.g., Google Drive, WhatsApp OTP).

---

## 3. Typography & Directional Scale

### 3.1 Typeface Strategy
- **Arabic Script (Primary, RTL):** `Cairo` paired with `Tajawal` as fallback. High legibility at small sizes (12px captions), sharp open counters for Arabic diacritics, and distinctive modern weights.
- **Latin Script (Secondary, LTR for English & French):** `Plus Jakarta Sans` paired with `Inter`. Geometric precision, wide aperture, and clean optical rendering across all digital screens.

### 3.2 Unified Typography Scale
All typographic levels are bound to strict CSS variables:
| Level | Font Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `2.75rem` (44px) | `1.2` | 800 (Extrabold) | Hero titles, Executive statements |
| **H1** | `2.25rem` (36px) | `1.25` | 700 (Bold) | Page main titles, Course primary headers |
| **H2** | `1.75rem` (28px) | `1.3` | 700 (Bold) | Major sections, Dashboard widgets |
| **H3** | `1.375rem` (22px) | `1.35` | 600 (Semibold) | Subsection titles, Card group headings |
| **H4** | `1.125rem` (18px) | `1.4` | 600 (Semibold) | Card titles, Modal headers |
| **Body Large**| `1.0625rem` (17px)| `1.6` | 400 / 500 | Hero excerpts, Intro paragraphs |
| **Body** | `0.9375rem` (15px) | `1.6` | 400 (Regular) | Standard UI copy, Descriptions, Forms |
| **Body Small**| `0.8125rem` (13px)| `1.5` | 400 / 500 | Metadata, Secondary tables, Timestamps |
| **Caption** | `0.75rem` (12px) | `1.4` | 500 (Medium) | Badges, Micro-labels, Helper notes |

---

## 4. RTL / LTR Architecture via CSS Logical Properties

### 4.1 Strict Prohibition of Physical Directional Properties
To ensure automatic, flawless layout mirroring between Arabic (RTL) and English/French (LTR), physical CSS properties are prohibited in reusable components:
- Prohibited: `left`, `right`, `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`, `border-right`, `text-align: left`, `text-align: right`.
- Enforced: `inset-inline-start`, `inset-inline-end`, `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`, `border-inline-start`, `border-inline-end`, `text-align: start`, `text-align: end`.

### 4.2 Directional Flipping Mechanics
The platform operates on a single `dir="rtl"` or `dir="ltr"` attribute set on the root `<html>` element. All icons indicating forward/backward navigation (e.g., arrow chevrons, step progress) use CSS directional transformations:
```css
[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}
```

---

## 5. Component Modularization & Monolith Elimination

### 5.1 Deconstruction of Legacy Monoliths
Analysis revealed that the existing platform relied on two unmaintainable files:
- `assets/js/pages.js` (188 KB, 2,875 lines)
- `assets/js/translations.js` (254 KB, 4,127 lines)

Phase 2 establishes the target modular component structure:
```text
assets/js/
├── components/
│   ├── ui/             # Dumb, highly reusable atomic UI (Button, Input, Modal, Badge, Toast, Table)
│   ├── navigation/     # Header, Sidebar, Breadcrumb, Tabs, RoleSwitcher
│   ├── corporate/      # ServiceCard, ProjectCard, PostCard, MethodologyTimeline
│   ├── academy/        # CourseCard, LessonViewer, SubmissionDropzone, ExamTimer, GradeCell
│   ├── cms/            # PostEditor, DraftPreviewer, MediaSelector, PublishingControls
│   └── admin/          # AuditTable, UserRoleModal, PermissionGuard, IntegrationStatusBadge
├── locales/            # Modular JSON/ESM dictionaries split by domain (common, academy, corporate, admin)
└── core/               # Router, Auth State, Event Bus
```

### 5.2 The Adapter Migration Pattern
To guarantee zero service downtime and prevent breaking existing functionality, legacy modules will not be removed in a single risky rewrite. Instead:
1. New atomic components are registered in the Design System library (`assets/css/components/design-system.css`).
2. An **Adapter Bridge** renders new components while delegating unresolved callbacks to legacy handlers.
3. Views are migrated route by route.
4. Once all views use the new component suite, legacy monoliths are retired cleanly.

---

## 6. Contextual UX Architecture

### 6.1 Company Website UX
- Focus: Trust, Institutional Authority, Corporate Verification.
- Primary Audience: Donors, Government Agencies, Corporate Leaders, Prospective Trainees.
- Key UX Elements: High-impact hero, official 2-pillar structure (Institutional Development vs. Capacity Building), verified service catalog, methodology timeline, client partner testimonials, direct contact forms.

### 6.2 SHAT Academy (LMS/SIS) UX
- Focus: Cognitive clarity, Task orientation, Zero distraction.
- Primary Audience: Students, Trainees, University Applicants, Instructors.
- Key UX Elements:
  - Global Academy Sidebar (Desktop) / Bottom Sheet Navigation (Mobile).
  - Prominent "Next Action" cards (e.g., "Assignment Due Tomorrow", "Continue Lesson 3").
  - Clear visual progress tracking (real calculations only, no hardcoded percentages).
  - Uncluttered lesson viewer with collapsible table of contents and prominent navigation buttons.

### 6.3 Administration & CMS UX
- Focus: High density, Rapid auditing, Role governance.
- Primary Audience: Platform Administrators, Content Editors, Registrars.
- Key UX Elements: Dense data tables with multi-column filtering, contextual breadcrumbs, real-time draft preview switchers (Desktop / Tablet / Mobile), and explicit permission status indicators.

---

## 7. Strict Handling of Integrations & Zero-Mock Policy

In accordance with architectural principles:
1. **Google Drive Storage:** If the service account or API credentials are not initialized, UI components MUST display `STATUS: NOT CONFIGURED` with a badge. Mock file trees pretending to be live Google Drive folders are strictly forbidden.
2. **WhatsApp OTP:** If SMS/WhatsApp gateway credentials are unset, authentication screens must indicate `SMS/WhatsApp Service Not Configured` rather than simulating a fake delivery.
3. **Student Grades & Examination Times:** Exam countdown timers must synchronize with server-validated session records, and student gradebooks must show genuine empty states until assignments are evaluated by instructors.

---

## 8. Modal vs. Drawer vs. Page Hierarchy
To prevent UX clutter:
- **Modal Dialog (`--z-modal: 1200`):** Reserved for lightweight confirmations, short single-step forms (e.g., "Change Role", "Delete Material"), and permission blocks.
- **Side Drawer (`--z-drawer: 1100`):** Used for contextual inspections (e.g., student submission review, file metadata inspector, quick filter panels).
- **Dedicated Full Page:** Mandated for complex workflows (Course Builder, Rich Text CMS Editor, Exam Taking Session, Gradebook Matrix).

# SHAT Platform — Layout Architecture & Shell Specifications

## 1. Contextual Layout Shells

The SHAT Platform enforces three distinct layout shells to ensure contextually appropriate user experiences:

---

## 2. Shell 1: Corporate Website Shell
Designed for prospective clients, government partners, enterprise stakeholders, and public visitors.

```
┌────────────────────────────────────────────────────────┐
│ Corporate Header (Sticky, 68px)                        │
│ [Logo] [About] [Services] [Projects] [Posts] [Contact] │
│                                  [Academy CTA] [Lang]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│ Hero Section / Corporate Content                       │
│ (Max width: 1400px, Margin-inline: auto)               │
│                                                        │
├────────────────────────────────────────────────────────┤
│ Corporate Footer (Executive Navy #0F2E4A)              │
│ [Company Info & Motto] [Quick Links] [Social & Legal]  │
└────────────────────────────────────────────────────────┘
```
- **Header:** Background `--bg-surface`, backdrop blur on scroll, elevated shadow `--shadow-sm`.
- **Content Canvas:** Center-aligned with fluid padding (`padding-inline: clamp(16px, 4vw, 48px)`).
- **Footer:** Deep Navy background (`--shat-navy-900`), inverted typography (`--text-inverted`), displaying official company credentials and international references.

---

## 3. Shell 2: SHAT Academy Workspace Shell (LMS/SIS)
Designed for students and instructors with minimum cognitive clutter and maximum instructional focus.

```
┌────────────────────────────────────────────────────────┐
│ Academy Topbar (Height: 56px)                          │
│ [Menu Toggle] [Course Breadcrumb]      [Notif] [Avatar]│
├───────────────┬────────────────────────────────────────┤
│ Sidebar       │ Main Academic Canvas                   │
│ (Width: 260px)│                                        │
│ • Dashboard   │ Course Header / Lesson Workspace       │
│ • My Courses  │                                        │
│ • Assignments │                                        │
│ • Exams       │                                        │
│ • Grades      │                                        │
│ • Discussions │                                        │
│ • Drive Files │                                        │
└───────────────┴────────────────────────────────────────┘
```
- **Desktop Sidebar:** Sticky left (in LTR) or right (in RTL), containing hierarchical navigation.
- **Mobile Behavior (< 1024px):** Sidebar collapses into an off-canvas drawer (`--z-drawer: 1100`) activated by the topbar hamburger toggle. On screens < 640px, a persistent bottom navigation bar provides 1-tap access to *Dashboard, Courses, Assignments, and Profile*.

---

## 4. Shell 3: Administration & CMS Shell
Designed for platform administrators, registrars, and corporate content editors.

```
┌────────────────────────────────────────────────────────┐
│ Admin Topbar (Height: 56px, Dark Navy Accent)          │
│ [Logo] [Role Badge: ADMIN] [Search]    [Audit] [Profile│
├───────────────┬────────────────────────────────────────┤
│ Admin Sidebar │ Administration Canvas                  │
│ (Width: 280px)│ Breadcrumbs: Admin > Courses > Manage   │
│ • Overview    ├────────────────────────────────────────┤
│ • Users & RBAC│ Dense Data Table / CMS Editor          │
│ • Courses     │ Multi-column filters                   │
│ • CMS Posts   │ Batch Action Toolbar                   │
│ • Media       │ Pagination Controls                    │
│ • Audit Logs  │                                        │
│ • Integrations│                                        │
│ • Settings    │                                        │
└───────────────┴────────────────────────────────────────┘
```
- **Density:** High density padding (`--space-sm` instead of `--space-md`).
- **Audit Prominence:** Quick access to real-time administrative logs and integration status alerts.

---

## 5. Responsive Grid & Container Tokens

```css
:root {
  --max-width-content: 1400px;
  --max-width-text:    760px;
  --header-height:     68px;
  --topbar-height:     56px;
  --sidebar-width:     280px;
}

.shat-container {
  width: 100%;
  max-width: var(--max-width-content);
  margin-inline: auto;
  padding-inline: var(--space-md);
}

@media (min-width: 768px) {
  .shat-container {
    padding-inline: var(--space-xl);
  }
}
```

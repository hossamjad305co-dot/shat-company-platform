# SHAT Platform — Component Taxonomy & Specifications

## 1. Component Philosophy & Taxonomy

Components in the SHAT Platform are structured according to atomic design principles, separating presentational primitives from business logic:

```
components/
├── ui/              # Dumb atomic primitives (Button, Input, Select, Badge, Toast, Modal, Table, Skeleton)
├── navigation/      # Navigation headers, sidebars, breadcrumbs, role simulator bar
├── corporate/       # Corporate cards, services, project showcases, timeline
├── academy/         # Course cards, lesson viewers, submission dropzones, gradebook cells, exam timers
├── cms/             # Content editors, draft preview switches, media selector
└── admin/           # Audit logs table, user permissions manager, integration status monitors
```

---

## 2. Atomic UI Component Specifications

### 2.1 Buttons (`.shat-btn`)
Buttons trigger explicit user actions and provide stateful feedback.

- **Variants:**
  - `shat-btn-primary`: Background `--shat-green-700`, text `--shat-white`. Used for primary calls to action.
  - `shat-btn-secondary`: Background `--shat-navy-900`, text `--shat-white`. Used for corporate/executive actions.
  - `shat-btn-outline`: Background transparent, border `1px solid var(--border-prominent)`, text `--text-primary`.
  - `shat-btn-ghost`: Background transparent, text `--text-muted`, hover background `--shat-slate-100`.
  - `shat-btn-danger`: Background `--color-danger`, text `--shat-white`. Used for destructive actions.
- **Sizes:**
  - `shat-btn-sm`: Height 32px, text 13px, padding 6px 12px.
  - `shat-btn-md`: Height 42px, text 15px, padding 10px 18px (Default).
  - `shat-btn-lg`: Height 50px, text 17px, padding 14px 26px.
- **States:**
  - `disabled`: Opacity 0.5, cursor `not-allowed`, pointer-events `none`.
  - `loading`: Shows `.shat-spinner`, text content hidden or augmented.

### 2.2 Form Controls (`.shat-input`, `.shat-select`, `.shat-textarea`)
- **Structure:**
  ```html
  <div class="shat-form-group">
    <label class="shat-label" for="field-id">Field Label <span class="required">*</span></label>
    <input type="text" id="field-id" class="shat-input" placeholder="Placeholder text..." />
    <span class="shat-helper-text">Supporting guidance for the user.</span>
  </div>
  ```
- **Error State:**
  - Input class: `.shat-input-error` (Border: `--color-danger`, background: `--color-danger-bg`).
  - Error message: `<span class="shat-error-text">Explicit validation failure explanation</span>`.
- **Disabled State:**
  - Attribute: `disabled`, background `--shat-slate-100`, text `--text-muted`.

### 2.3 Status Badges (`.shat-badge`)
Compact visual indicators for roles, statuses, and course tags.

- `shat-badge-success`: Growth Green tint (`#EEF5E8`), text `#294e1c`. (e.g., Active, Published, Completed).
- `shat-badge-warning`: Amber tint (`#fef3c7`), text `#92400e`. (e.g., In Review, Pending Grading).
- `shat-badge-danger`: Crimson tint (`#fef2f2`), text `#991b1b`. (e.g., Overdue, Rejected, Inactive).
- `shat-badge-info`: Sky Blue tint (`#e0f2fe`), text `#075985`. (e.g., Draft, Information).
- `shat-badge-navy`: Navy tint (`#e2eef8`), text `#0F2E4A`. (e.g., Instructor, Official Corporate).
- `shat-badge-unconfigured`: Slate tint (`#f1f5f9`), text `#475569`. Reserved strictly for uninitialized integrations.

### 2.4 Data Tables (`.shat-table-container`, `.shat-table`)
Engineered for administration, user rosters, and academic gradebooks.
- **Features:** Sticky headers, alternating row hover (`--shat-slate-50`), column sorting triggers, responsive horizontal scrolling wrapper.
- **Mobile Rule:** Large tables wrap inside `.shat-table-responsive` with sticky start columns, or transform into stacked `.shat-card-list` on mobile screens below 640px.

### 2.5 Modals & Dialogs (`.shat-modal-backdrop`, `.shat-modal`)
- **Backdrop:** Background `rgba(6, 21, 35, 0.65)`, backdrop filter `blur(4px)`.
- **Keyboard Access:** Traps focus within modal; closes on `Escape` key press.
- **Sizes:** Small (440px max-width), Medium (620px max-width), Large (880px max-width).

### 2.6 Toasts & Feedback Notifications (`.shat-toast-container`, `.shat-toast`)
Fixed bottom/top notification stack for asynchronous event feedback:
- Variants: Success, Error, Warning, Info.
- Auto-dismiss: 4.5 seconds with pause-on-hover.
- Manual dismiss: Integrated close button with `aria-label="Dismiss"`.

### 2.7 Skeletons & Async Loading States (`.shat-skeleton`)
Animated pulse placeholder (`--shat-slate-200` to `--shat-slate-100`) preventing layout shifts during data fetching.
- Text skeleton: Height 16px, border radius 4px.
- Card skeleton: Preserves exact aspect ratio of media card.

### 2.8 Empty States (`.shat-empty-state`)
Actionable, helpful screens displayed when datasets are empty:
- Components: Large illustrative SVG icon + Clear Heading + Actionable Context Explanation + Primary Action Button.
- Anti-pattern: Never display a blank table or a cold "No data" message.

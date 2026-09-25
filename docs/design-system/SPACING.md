# SHAT Platform — Spacing & Layout Grid System

## 1. The 8pt Base Grid
The SHAT Platform layout is constructed upon an **8-point base grid system** (with a 4px half-step for micro-alignments). Every margin, padding, component height, and structural gap is derived directly from this mathematical scale.

---

## 2. Spacing Scale

| Token | Pixels | Rem (16px base) | Primary Usage |
| :--- | :--- | :--- | :--- |
| `--space-2xs` | `4px` | `0.25rem` | Badge padding, icon micro-gaps, border offsets |
| `--space-xs` | `8px` | `0.5rem` | Input internal vertical padding, tight button gap, chip spacing |
| `--space-sm` | `12px` | `0.75rem` | Medium button vertical padding, table cell vertical padding |
| `--space-md` | `16px` | `1.0rem` | Standard card internal padding, form row gaps, button horizontal padding |
| `--space-lg` | `24px` | `1.5rem` | Large card padding, modal header/body spacing, section content gaps |
| `--space-xl` | `32px` | `2.0rem` | Page container padding, dashboard widget margins, card group gaps |
| `--space-2xl` | `48px` | `3.0rem` | Section vertical margins, corporate service row spacing |
| `--space-3xl` | `64px` | `4.0rem` | Major page section dividers, hero top/bottom padding |
| `--space-4xl` | `96px` | `6.0rem` | Corporate homepage showcase banners, grand landing dividers |

---

## 3. Logical Spacing Enforcement

All directional spacing must use CSS logical properties to automatically flip in RTL:
```css
/* CORRECT: Logical spacing */
.card-content {
  padding-block: var(--space-md);
  padding-inline: var(--space-lg);
  margin-inline-end: var(--space-sm);
}

/* FORBIDDEN: Physical directional properties */
.card-content {
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  margin-right: 12px;
}
```

---

## 4. Component Spacing Standards

### 4.1 Buttons
- **Small:** `padding-block: var(--space-xs); padding-inline: var(--space-sm); gap: var(--space-xs);`
- **Medium (Default):** `padding-block: var(--space-sm); padding-inline: var(--space-md); gap: var(--space-xs);`
- **Large:** `padding-block: var(--space-md); padding-inline: var(--space-lg); gap: var(--space-sm);`

### 4.2 Form Controls
- **Inputs & Selects:** `padding-block: var(--space-sm); padding-inline: var(--space-md);`
- **Label to Input:** `margin-block-end: var(--space-xs);`
- **Input to Helper/Error:** `margin-block-start: var(--space-2xs);`
- **Form Row Gap:** `row-gap: var(--space-lg); column-gap: var(--space-md);`

### 4.3 Data Tables
- **Header Cells:** `padding-block: var(--space-sm); padding-inline: var(--space-md);`
- **Body Cells:** `padding-block: var(--space-md); padding-inline: var(--space-md);`

### 4.4 Modal Dialogs
- **Modal Header:** `padding: var(--space-lg); border-block-end: 1px solid var(--border-subtle);`
- **Modal Body:** `padding: var(--space-xl);`
- **Modal Footer:** `padding: var(--space-lg); gap: var(--space-sm);`

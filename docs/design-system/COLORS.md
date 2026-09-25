# SHAT Platform — Color Palette System

## 1. Brand Identity & Source of Truth
The color architecture for the **SHAT Platform** originates from the corporate visual identity defined in the official company profile (*SHAT Development & Growth — شركة شات للتنمية والتطوير*).

```
   NAVY #0F2E4A             GROWTH GREEN #4B8834          ACCENT GREEN #5EA02F
   Institutional Weight     Strategic Expansion           Active Progression
```

---

## 2. Palette Architecture

### 2.1 Corporate Anchor: Deep Navy
Deep Navy is the foundational pillar of the brand, symbolizing institutional rigor, stability, and executive leadership.

| Token | Hex Value | Primary Function | Contrast Ratio (vs #FFF) |
| :--- | :--- | :--- | :--- |
| `--shat-navy-950` | `#061523` | Highest emphasis titles, deepest borders | 16.4:1 (WCAG AAA) |
| `--shat-navy-900` | `#0F2E4A` | **Official Brand Primary**: Headers, Topbars, Footers | 12.8:1 (WCAG AAA) |
| `--shat-navy-850` | `#13395c` | Active sidebar elements, hover states on dark | 10.9:1 (WCAG AAA) |
| `--shat-navy-800` | `#17456f` | Subheadings in dark containers, prominent borders | 9.4:1 (WCAG AAA) |
| `--shat-navy-700` | `#1f578c` | Secondary brand accents, dark mode cards | 7.2:1 (WCAG AAA) |
| `--shat-navy-600` | `#296fae` | Informative callouts on dark | 5.2:1 (WCAG AA) |
| `--shat-navy-500` | `#3b88ce` | Interactive icons | 3.8:1 |
| `--shat-navy-300` | `#93bce3` | Focus rings on dark backgrounds | 2.1:1 |
| `--shat-navy-200` | `#bfd9f1` | Subtle divider lines on dark | 1.5:1 |
| `--shat-navy-100` | `#e2eef8` | Subtle navy tint surfaces | 1.2:1 |
| `--shat-navy-50`  | `#f0f6fc` | Soft page backgrounds | 1.05:1 |

### 2.2 Strategic Growth: Forest & Leaf Green
Green represents capacity building, organizational development, and active execution.

| Token | Hex Value | Primary Function | Contrast Ratio (vs #FFF) |
| :--- | :--- | :--- | :--- |
| `--shat-green-950` | `#1b3512` | Dark text on tinted green containers | 12.1:1 (WCAG AAA) |
| `--shat-green-900` | `#294e1c` | Heavy green headings | 9.1:1 (WCAG AAA) |
| `--shat-green-800` | `#3a6b27` | Button hover and active states | 6.5:1 (WCAG AAA) |
| `--shat-green-700` | `#4B8834` | **Official Primary Growth Green**: Primary CTAs, Key Highlights | 4.6:1 (WCAG AA Large/AAA graphics) |
| `--shat-green-600` | `#5EA02F` | **Official Accent Leaf Green**: Progress indicators, Micro-dots | 3.2:1 |
| `--shat-green-500` | `#71b83d` | Secondary highlights on dark | 2.5:1 |
| `--shat-green-400` | `#89cf55` | Data visualization positive bars | 1.8:1 |
| `--shat-green-200` | `#c9eab0` | Accent badges borders | 1.3:1 |
| `--shat-green-100` | `#EEF5E8` | **Official Tint Green**: Success card backgrounds, Tag fills | 1.1:1 |
| `--shat-green-50`  | `#f7fbf4` | Light course card highlights | 1.04:1 |

### 2.3 Neutral Palette: Slate & Canvas
Neutrals provide visual breathing room and high readability without cold grays.

| Token | Hex Value | Primary Function |
| :--- | :--- | :--- |
| `--shat-slate-900` | `#0f172a` | Deep body copy |
| `--shat-slate-800` | `#1e293b` | Secondary content body |
| `--shat-slate-700` | `#334155` | Supporting metadata |
| `--shat-slate-600` | `#475569` | Muted descriptions, placeholders |
| `--shat-slate-500` | `#64748b` | Disabled text, subtle labels |
| `--shat-slate-400` | `#94a3b8` | Inactive checkboxes, subtle icons |
| `--shat-slate-300` | `#cbd5e1` | Standard input borders, card outlines |
| `--shat-slate-200` | `#e2e8f0` | Subtle container dividers |
| `--shat-slate-100` | `#EDF2F7` | **Official Slate Neutral**: Table headers, Gray containers |
| `--shat-slate-50`  | `#f8fafc` | Default canvas background |
| `--shat-white`     | `#FFFFFF` | Pure white cards and modal surfaces |

---

## 3. Semantic Status Colors

```css
/* Success: Powered by Official Growth Green */
--color-success:          var(--shat-green-700);  /* #4B8834 */
--color-success-bg:       var(--shat-green-100);  /* #EEF5E8 */

/* Warning: Institutional Warm Amber */
--color-warning:          #b45309;
--color-warning-bg:       #fef3c7;

/* Danger: Corporate Crimson */
--color-danger:           #dc2626;
--color-danger-bg:        #fef2f2;

/* Info: Professional Sky Blue */
--color-info:             #0284c7;
--color-info-bg:          #e0f2fe;

/* Unconfigured: Muted Slate Badge */
--color-unconfigured:     #64748b;
--color-unconfigured-bg:  #f1f5f9;
```

---

## 4. Architectural Rules & Anti-Patterns

1. **No Pure Black (`#000000`):** Always use `--shat-navy-950` (`#061523`) for deep contrast to preserve corporate warmth.
2. **No Unanchored Saturated Primaries:** Never use raw `#ff0000`, `#0000ff`, or `#00ff00`. Always use design tokens.
3. **WCAG Compliance Enforcement:** Text rendered on `--bg-surface` (`#FFFFFF`) must never use text tokens lighter than `--text-muted` (`#475569`, 4.5:1 ratio).
4. **Integration Visibility:** Third-party integrations (Google Drive, WhatsApp OTP, Google Login) without configured credentials must use `--color-unconfigured` to clearly indicate operational reality.

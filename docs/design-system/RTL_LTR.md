# SHAT Platform — RTL / LTR Bi-Directional Engineering Architecture

## 1. Bi-Directional Engineering Principles
The **SHAT Platform** is engineered with an **RTL-First** architecture. Arabic is the primary institutional language, while English and French operate seamlessly as secondary LTR languages without duplicating CSS rules or using separate stylesheets.

---

## 2. CSS Logical Properties Matrix

To ensure instantaneous layout mirroring without writing separate overrides, physical CSS properties are prohibited in favor of logical properties:

| Physical Property (Prohibited) | Logical Property (Enforced) | Behavioral Mechanics |
| :--- | :--- | :--- |
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` | Flips automatically based on document direction |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` | Padding shifts to correct optical edge |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` | Positions absolute/fixed items relative to reading start |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` | Card highlight bars remain on correct reading edge |
| `text-align: left` / `text-align: right` | `text-align: start` / `text-align: end` | Text aligns automatically with script flow |
| `float: left` / `float: right` | Prohibited — use Flexbox or CSS Grid | Layouts maintain modern flow |

---

## 3. Directional Icon Transformations

Not all icons should mirror when switching between RTL and LTR. We classify icons into two categories:

### 3.1 Directional Icons (Must Mirror)
Icons indicating progress, history, back/forward movement, and chevrons must flip horizontally:
```css
/* Mirror navigational arrows in RTL */
[dir="rtl"] .shat-icon-directional,
[dir="rtl"] .icon-arrow-next,
[dir="rtl"] .icon-chevron-right {
  transform: scaleX(-1);
}
```
- Examples: Next/Previous pagination arrows, Breadcrumb separators, Back buttons, Multi-step wizard arrows.

### 3.2 Universal Icons (Must NOT Mirror)
Icons that represent real-world physical objects or universal symbols must maintain static orientation:
- Examples: Search magnifying glasses, Clock faces, Checkmarks, Download arrows, Lock symbols, Audio volume speakers.

---

## 4. Input Controls & Form Flipping

1. **Text Inputs & Textareas:** `text-align: start;` ensures Arabic inputs type from right-to-left while Latin inputs type from left-to-right.
2. **Phone Number & Numeric Inputs:** Must maintain `direction: ltr; unicode-bidi: isolate;` to prevent international phone numbers (e.g., `+967 77...`) from reversing digit blocks.
3. **Form Icons:** Leading icons inside text inputs use `inset-inline-start: var(--space-md);` with corresponding `padding-inline-start: 44px;`.

---

## 5. Language Switching Mechanics

When a user switches language between Arabic, English, and French:
```javascript
export function setPlatformLanguage(langCode) {
  const isRtl = langCode === 'ar';
  document.documentElement.lang = langCode;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  localStorage.setItem('shat_platform_lang', langCode);
  window.dispatchEvent(new CustomEvent('shat:locale-changed', { detail: { lang: langCode, dir: isRtl ? 'rtl' : 'ltr' } }));
}
```

---

## 6. Bi-Directional Testing Checklist
- [ ] Breadcrumbs flow from Start to End without disjointed chevrons.
- [ ] Sidebar docks on the inline-start edge (Right in Arabic, Left in English/French).
- [ ] Tables align text columns to `start` and numeric columns to `end`.
- [ ] Form validation error icons sit at the `inline-end` corner of the input.
- [ ] Toast notifications emerge from the correct corner (`inset-inline-end`).

# SHAT Platform — Typography System

## 1. Typeface Strategy

The typography system is engineered to provide equal optical excellence and readability in **Arabic (RTL)** as well as **English and French (LTR)**.

### 1.1 Arabic Primary Typeface: Cairo & Tajawal
- **Primary:** `Cairo` (Google Fonts)
- **Fallback:** `Tajawal`, system-ui, -apple-system, sans-serif
- **Rationale:** `Cairo` features geometric clarity, open loops, and balanced counter-spaces. It preserves distinct legibility for Arabic diacritics and dots even at 11px and 12px scales, making it ideal for academic dashboards and corporate tables.

### 1.2 Latin Primary Typeface: Plus Jakarta Sans & Inter
- **Primary:** `Plus Jakarta Sans` (Google Fonts)
- **Fallback:** `Inter`, system-ui, -apple-system, sans-serif
- **Rationale:** Modern geometric grotesque with warm letterforms and a clean x-height that naturally harmonizes with `Cairo`'s visual weight and vertical rhythm.

---

## 2. Typography Scale & Properties

| Token | Level | Size (rem / px) | Line Height | Weight | Letter Spacing | Target Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--font-size-display` | **Display** | `2.75rem` / 44px | `1.2` | 800 (Extrabold) | `-0.02em` (LTR) / `0` (RTL) | Hero headlines, Strategic motto |
| `--font-size-h1` | **H1** | `2.25rem` / 36px | `1.25` | 700 (Bold) | `-0.015em` (LTR) / `0` (RTL)| Page titles, Course master titles |
| `--font-size-h2` | **H2** | `1.75rem` / 28px | `1.3` | 700 (Bold) | `-0.01em` (LTR) / `0` (RTL) | Section headers, Dashboard widgets |
| `--font-size-h3` | **H3** | `1.375rem` / 22px| `1.35` | 600 (Semibold) | `0` | Subsections, Card collection titles |
| `--font-size-h4` | **H4** | `1.125rem` / 18px| `1.4` | 600 (Semibold) | `0` | Card titles, Modal headers |
| `--font-size-body-lg` | **Body Large** | `1.0625rem` / 17px| `1.6` | 400 / 500 | `0` | Hero intro excerpts, Subheadings |
| `--font-size-body` | **Body** | `0.9375rem` / 15px | `1.6` | 400 (Regular) | `0` | Standard UI copy, Article paragraphs |
| `--font-size-body-sm` | **Body Small** | `0.8125rem` / 13px| `1.5` | 400 / 500 | `0` | Table cell data, Form helper text |
| `--font-size-caption` | **Caption** | `0.75rem` / 12px | `1.4` | 500 (Medium) | `+0.02em` (LTR) / `0` (RTL)| Badges, Status tags, Meta labels |

---

## 3. Directional Typography Application

### 3.1 CSS Rules
```css
[dir="rtl"] {
  --font-family-primary: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
  --font-family-heading: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
  letter-spacing: 0; /* Letter-spacing is disabled for Arabic script to prevent glyph breaking */
}

[dir="ltr"] {
  --font-family-primary: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-heading: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
  letter-spacing: -0.01em;
}
```

### 3.2 Key Typographic Rules
1. **Never Apply Letter-Spacing to Arabic:** In CSS, `letter-spacing` breaks cursive connections between Arabic characters (Tashkeel and Harakat). Arabic must always have `letter-spacing: 0`.
2. **Line Height Compensation:** Arabic script has naturally larger ascenders and descenders. Line-heights for Arabic must remain at least `1.5` to `1.6` for body text to avoid clipping.
3. **Number Formatting:** Digits in tables, dates, and currency should use uniform tabular numbers (`font-variant-numeric: tabular-nums;`) to maintain clean vertical column alignments.

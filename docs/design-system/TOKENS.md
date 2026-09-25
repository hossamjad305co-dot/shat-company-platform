# SHAT Platform — Design Tokens Reference

## 1. Overview
Design tokens are the single source of truth for all visual attributes across the **SHAT Platform**. All values are defined as CSS Custom Properties in `assets/css/variables.css` and are consumed across the platform via semantic variables.

---

## 2. Core Token Categories

### 2.1 Color Tokens
```css
/* Brand Primary Navy */
--shat-navy-950: #061523;
--shat-navy-900: #0F2E4A; /* Official Brand Primary */
--shat-navy-850: #13395c;
--shat-navy-800: #17456f;
--shat-navy-700: #1f578c;
--shat-navy-600: #296fae;
--shat-navy-500: #3b88ce;
--shat-navy-300: #93bce3;
--shat-navy-200: #bfd9f1;
--shat-navy-100: #e2eef8;
--shat-navy-50:  #f0f6fc;

/* Brand Growth Green */
--shat-green-950: #1b3512;
--shat-green-900: #294e1c;
--shat-green-800: #3a6b27;
--shat-green-700: #4B8834; /* Official Primary Growth Green */
--shat-green-600: #5EA02F; /* Official Accent Leaf Green */
--shat-green-500: #71b83d;
--shat-green-400: #89cf55;
--shat-green-200: #c9eab0;
--shat-green-100: #EEF5E8; /* Official Tint Green */
--shat-green-50:  #f7fbf4;

/* Slate Neutrals & Contrast Tokens */
--shat-slate-900: #0f172a;
--shat-slate-800: #1e293b;
--shat-slate-700: #334155;
--shat-slate-600: #475569;
--shat-slate-500: #64748b;
--shat-slate-400: #94a3b8;
--shat-slate-300: #cbd5e1;
--shat-slate-200: #e2e8f0;
--shat-slate-100: #EDF2F7; /* Official Slate Neutral */
--shat-slate-50:  #f8fafc;
--shat-white:     #FFFFFF; /* Pure White */
```

### 2.2 Semantic Surface Tokens
```css
--bg-page:             var(--shat-slate-50);
--bg-surface:          var(--shat-white);
--bg-surface-elevated: var(--shat-white);
--bg-surface-subtle:   var(--shat-slate-100);
--bg-surface-accent:   var(--shat-green-100);
--bg-surface-navy:     var(--shat-navy-900);

--border-subtle:       var(--shat-slate-200);
--border-prominent:    var(--shat-slate-300);
--border-strong:       var(--shat-navy-800);
--border-brand:        var(--shat-green-700);
```

### 2.3 Semantic Typography Tokens
```css
--text-primary:   var(--shat-navy-950);
--text-secondary: var(--shat-slate-800);
--text-muted:     var(--shat-slate-600);
--text-subtle:    var(--shat-slate-500);
--text-inverted:  var(--shat-white);
--text-brand:     var(--shat-green-700);
```

### 2.4 Functional Status Tokens
```css
--color-success:          var(--shat-green-700);
--color-success-bg:       var(--shat-green-100);
--color-warning:          #b45309;
--color-warning-bg:       #fef3c7;
--color-danger:           #dc2626;
--color-danger-bg:        #fef2f2;
--color-info:             #0284c7;
--color-info-bg:          #e0f2fe;
--color-unconfigured:     #64748b;
--color-unconfigured-bg:  #f1f5f9;
```

### 2.5 Spacing Scale (8pt Grid)
```css
--space-2xs: 4px;
--space-xs:  8px;
--space-sm:  12px;
--space-md:  16px;
--space-lg:  24px;
--space-xl:  32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

### 2.6 Border Radius Tokens
```css
--radius-xs:   4px;
--radius-sm:   8px;
--radius-md:   14px;
--radius-lg:   20px;
--radius-xl:   28px;
--radius-full: 9999px;
```

### 2.7 Elevation & Depth Shadows
```css
--shadow-sm: 0 1px 3px rgba(15, 46, 74, 0.05), 0 1px 2px rgba(15, 46, 74, 0.03);
--shadow-md: 0 4px 14px rgba(15, 46, 74, 0.07), 0 2px 4px rgba(15, 46, 74, 0.03);
--shadow-lg: 0 10px 30px rgba(15, 46, 74, 0.09), 0 4px 8px rgba(15, 46, 74, 0.04);
--shadow-xl: 0 18px 45px rgba(15, 46, 74, 0.12), 0 6px 12px rgba(15, 46, 74, 0.05);
```

### 2.8 Layout & Dimension Tokens
```css
--max-width-content: 1400px;
--max-width-text:    760px;
--header-height:     68px;
--topbar-height:     38px;
--sidebar-width:     280px;

--bp-mobile:  640px;
--bp-tablet:  768px;
--bp-desktop: 1024px;
--bp-wide:    1280px;
```

### 2.9 Z-Index Layering Order
```css
--z-base:     1;
--z-dropdown: 500;
--z-sticky:   800;
--z-header:   1000;
--z-drawer:   1100;
--z-modal:    1200;
--z-toast:    1300;
--z-tooltip:  1400;
```

# SHAT Platform — Responsive Breakpoints & Adaptive Patterns

## 1. Breakpoint Taxonomy

The **SHAT Platform** adopts a systematic four-tier responsive hierarchy:

```
Mobile Phone         Tablet / iPad         Desktop Laptop        Large Screen
[ < 640px ]        [ 640px – 1023px ]    [ 1024px – 1439px ]     [ >= 1440px ]
--bp-mobile          --bp-tablet           --bp-desktop          --bp-wide
```

| Token | Breakpoint | Target Devices | Layout Behavior |
| :--- | :--- | :--- | :--- |
| `--bp-mobile` | `< 640px` | Smart phones (iPhone, Galaxy) | Single column, Bottom nav bar, Drawer modals |
| `--bp-tablet` | `640px – 1023px`| Tablets, iPads, Foldables | 2-column grids, Collapsible sidebar drawer |
| `--bp-desktop`| `1024px – 1439px`| Standard laptops, Workstations| Persistent sidebar, Multi-column tables |
| `--bp-wide` | `>= 1440px` | 4K & High-res monitors | Centered 1400px container, Rich density |

---

## 2. Component Adaptation Strategies

### 2.1 Corporate Navigation Header
- **Desktop (>= 1024px):** Full horizontal bar with all primary navigation links, language dropdown, and prominent Academy CTA button.
- **Mobile (< 1024px):** Compresses into Brand Logo + Language Trigger + Hamburger Menu icon. The menu triggers a full-height off-canvas slideover (`--z-drawer: 1100`).

### 2.2 Academy & Admin Sidebars
- **Desktop (>= 1024px):** Static, persistent vertical navigation panel (width: 260px–280px) docked to the reading start edge.
- **Tablet (< 1024px):** Automatically hidden off-canvas. Activated via topbar button or edge swipe.
- **Mobile Phones (< 640px):** Core academic destinations (*Dashboard, Courses, Tasks, Profile*) are placed into an ergonomic **Bottom Navigation Bar** anchored above browser safe areas.

### 2.3 Data Tables (Gradebooks, Audit Logs, Users)
- **Desktop:** Dense tabular matrix with sticky headers and sortable columns.
- **Tablet:** Horizontal scrolling enabled via `.shat-table-responsive` with sticky student name column.
- **Mobile (< 640px):** Complex tables gracefully decompose into **Card Lists**, where each table row renders as an individual card with key-value pairs to prevent horizontal pinching.

### 2.4 Modal Dialogs vs. Bottom Sheets
- **Desktop:** Centered floating dialogs with maximum widths (440px to 880px).
- **Mobile:** Modals automatically transform into **Bottom Sheets** anchored to the bottom edge with smooth upward transitions, maximizing thumb reachability.

---

## 3. Touch Target Standards
On all touch-enabled screens (`@media (pointer: coarse)`):
- All buttons and interactive links must have a minimum target bounding box of **44px × 44px**.
- Spacing between adjacent interactive links must be at least **8px** to prevent accidental mis-taps.
- Form inputs feature increased vertical padding (`padding-block: 12px; font-size: 16px;`) to prevent iOS Safari auto-zooming.

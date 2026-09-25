# SHAT Company Platform - Workspace Architecture & Agent Instructions

## 1. Project Overview
- **Name:** SHAT Development & Growth Platform (شركة شات للتنمية والتطوير)
- **Tagline:** Building Capacity • Strengthening Institutions • Advancing Results
- **Type:** Executive Corporate Platform, Training Academy, and LMS Management Portal
- **Tech Stack:** Vanilla JavaScript (ES Modules), Custom CSS Design Tokens, Vite v6.4.3 bundler, Vercel Production Deployment.
- **Production URL:** [https://shat-company-platform.vercel.app](https://shat-company-platform.vercel.app)
- **Codebase Path:** `C:\SHAT_Company\shat-company-platform`
- **Central Skills Library:** `C:\Category`

## 2. Directory Structure
```
shat-company-platform/
├── .agents/
│   ├── rules/
│   │   ├── arabic-content-standards.md
│   │   ├── design-and-styling.md
│   │   └── rbac-permissions.md
│   └── skills/                # 50 Project-specific active skills from C:\Category
├── assets/
│   ├── css/
│   │   ├── style.css          # Main corporate styles & mobile responsive media queries
│   │   └── variables.css      # Design tokens (Navy, Green, Amber, typography, radius)
│   ├── js/
│   │   ├── app.js             # Application bootstrapper
│   │   ├── auth.js            # RBAC authentication & role simulator engine
│   │   ├── cms.js             # LocalStorage CMS (custom images, post overrides, form links)
│   │   ├── icons.js           # Crisp inline SVG vector icons
│   │   ├── pages.js           # View templates (Home, Tracks, Academy, Course Detail, Chat)
│   │   ├── router.js          # Hash routing & modal event interceptors
│   │   └── translations.js    # Bilingual dictionary (Arabic primary / English)
│   └── images/ & logo/        # High-resolution vector covers, badges, emblems
├── index.html                 # Single page application markup & global modals
├── package.json               # Vite build configuration
├── shat-company-platform.code-workspace # Multi-root IDE workspace definition
└── vercel.json                # Vercel deployment and routing rules
```

## 3. Active Workspace Skills (50 Skills from C:\Category)
This workspace is equipped with 50 specialized skills from `C:\Category`:
- **UI/UX & Design:** `ui-ux-pro-max`, `high-end-visual-design`, `design-system`, `frontend-ui-engineering`, `brandkit`, `banner-design`, `theme-factory`, `minimalist-ui`, `redesign-existing-projects`, `brand-guidelines`, `web-artifacts-builder`.
- **Engineering & Performance:** `performance-optimization`, `responsiveness-check`, `accessibility-skill`, `webapp-testing`, `landing-page`, `ux-audit`, `onboarding-ux`, `icon-set-generator`, `image-processing`, `favicon-gen`.
- **Education, LMS & Training:** `academy-guide`, `curriculum-knowledge-architecture-designer`, `formative-assessment-loop-designer`, `checking-for-understanding-protocol-designer`, `single-point-rubric-designer`, `socratic-questioning-sequence-generator`, `teach-back-evaluator`, `professional-development-session-designer`, `scope-and-sequence-designer`.
- **Marketing, Social Media & CMS:** `social-media-posts`, `copywriting`, `content-strategy`, `seo-audit`.

## 4. Key Behavioral Rules
1. **Never allow unauthenticated visitors to download course materials or access Google Drive.** Always intercept with the `#modal-permission-guard`.
2. **Keep the Role Simulator Bar active and functional at the top** for testing all roles (`visitor`, `student`, `instructor`, `admin`).
3. **Always preserve high-contrast WCAG AAA readability** and seamless RTL Arabic layout.

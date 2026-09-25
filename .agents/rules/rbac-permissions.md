# SHAT Platform - Role-Based Access Control (RBAC) Rules

## 1. Core Principle
Visitors (`visitor` / غير المسجلين) are strictly prohibited from:
- Downloading course curriculum materials (PDFs, PPTs, guidebooks).
- Accessing or opening Google Drive shared folders.
- Submitting assignments or homework to the learning portal.
- Posting in instructor discussion channels.

## 2. Enforcement Points
1. **Visual UI Layer (`assets/js/pages.js`):**
   - Download buttons for visitors MUST display the amber lock badge `(🔒 يتطلب حساب متدرب)` and class `.btn-guard-download`.
   - Google Drive buttons MUST display `.btn-guard-drive` with lock indicator.
   - Tabs 2, 3, and 4 on the dedicated course page (`#/course/:id`) MUST render `.permission-locked-card` when accessed by visitors.
2. **Behavioral Interception Layer (`assets/js/router.js`):**
   - Clicks on `.btn-guard-download` or `.btn-guard-drive` MUST intercept navigation, prevent default, and trigger `openPermissionGuardModal(courseTitle)`.
3. **Role Simulator Bar (`assets/js/router.js` & `index.html`):**
   - Must allow instant 1-click preview across the 4 verified roles:
     - `visitor`: Everything locked.
     - `student` (أحمد خليل): Downloads, Drive, Assignments unlocked.
     - `instructor` (د. أسامة المنصور): Materials uploader, attendance, chat unlocked.
     - `admin` (أ. حسام جاد الله): Full platform access, course customizer, media editor, social post editor.

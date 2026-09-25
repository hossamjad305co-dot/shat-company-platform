# SHAT Platform — Legacy File & Storage Mocks Audit
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Inventory of Client-Side Blob Generators, Simulated Downloads, and Cloud Migration Strategy*
*Date: 2026-09-25 | Status: Baseline for Phase 6 Migration*

---

## 1. Overview & Directive

In compliance with Directive #57 (**"Do not fabricate functionality — ممنوع إنشاء Fake Google Drive integration أو Fake storage metrics"**), this audit documents all simulated file download handlers, client-side Blob generation scripts, and mock storage mechanisms currently located in the codebase.

These mock generators were implemented during early rapid prototyping to simulate file downloads without server infrastructure. They will be methodically deprecated and replaced by the **Google Drive 5 TB Integration Layer** in Phase 6 / 9.

---

## 2. Inventory of File & Storage Mocks

| # | File Path | Function / Line | Current Mock Behavior | Production Replacement (Google Drive 5 TB) | Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `assets/js/moodle.js` | `downloadRealFile()` (Lines 5–130) | Synthesizes in-memory template text strings for CSV (CHS commitments), DOCX (Word headers), and binary PDF headers, and triggers `new Blob([blobContent], { type: mimeType })`. | Streaming download proxy via `/api/storage/download?fileId=XYZ` connecting to Google Drive API v3 via Service Account. | **Phase 6** |
| **02** | `assets/js/moodle.js` | `renderTeacherPortal()` (Lines 180–235) | Teacher "Upload File" button displays a simulated success toast and appends file metadata to `localStorage.getItem('shat_moodle_courses_v3')`. No real file is stored in cloud. | Multipart upload via `/api/storage/upload` streaming file chunks to Google Drive folder with automatic `shat_files` metadata registration. | **Phase 6** |
| **03** | `assets/js/moodle.js` | `getGoogleFormUrl()` (Lines 360–370) | Hardcodes a fallback Google Forms URL (`https://forms.gle/shat-training-register-2026`) in localStorage. | Dynamic integration layer reading form endpoints from `shat_site_settings` or dedicated `shat_google_forms` table with webhook sync. | **Phase 6** |
| **04** | `assets/js/cms.js` | `saveCustomImage()` (Lines 170–190) | Converts uploaded user image to Base64 data URL and stores it in `localStorage.getItem('shat_site_custom_images')`. | Cloud upload to Google Cloud / Drive public folder or Supabase Storage with CDN URL stored in `shat_media`. | **Phase 4** |

---

## 3. Migration Roadmap for Storage Layer
1. **Phase 1 (Current):** Database metadata table `shat_files` defined with `provider = 'google_drive'` and RLS access gate (`shat_is_enrolled_in_course`).
2. **Phase 6 (Google Drive Integration):**
   * Deploy serverless proxy `/api/storage/download` and `/api/storage/upload`.
   * Configure Google Service Account credentials via environment variables (`GOOGLE_SERVICE_ACCOUNT_JSON`).
   * When credentials are not yet supplied, UI displays standard status indicator:
     `GOOGLE_DRIVE: NOT_CONFIGURED`.
   * Completely decommission in-memory Blob generator in `moodle.js`.

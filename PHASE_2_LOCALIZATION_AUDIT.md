# SHAT Platform — Phase 2 Localization Audit & Namespacing Architecture
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Audit of translations.js & Decentralized Localization Architecture (AR, EN, FR)*
*Date: 2026-09-25 | Status: Complete & Frozen for Phase 2*

---

## 1. Problem Statement: Localization Debt Audit

An audit of `assets/js/translations.js` (254 KB, 4,127 lines) revealed severe structural issues:
1. **Content Ingestion Misplacement:** Full-length news reports, multi-paragraph field articles, and blog posts are hardcoded directly inside `translations.js` (e.g. `post-chs`, `post-psea`, `post-oecd`). These belong in the relational database table `shat_posts`, not in the UI client bundle.
2. **Monolithic Namespace Pollution:** Over 600 key-value pairs are merged in a single flat object per language, causing unnecessary memory consumption on pages that only require basic navigation labels.
3. **Hardcoded UI Strings:** Several template strings in `pages.js` and `moodle.js` contain hardcoded Arabic phrases without localization fallback tags.

---

## 2. Target Namespaced Localization Architecture

To prevent bundle bloat, localization will be split into modular JSON/ES-module namespaces loaded on-demand:

```text
locales/
├── ar/                              # Arabic (Primary Canvas)
│   ├── common.json                  # Buttons, generic states, loading, pagination
│   ├── company.json                 # Hero, about, services, projects, contact
│   ├── academy.json                 # Courses, units, lessons, materials
│   ├── teacher.json                 # Grading, course builder, rubric terms
│   ├── admin.json                   # Governance, telemetry, admissions, settings
│   └── errors.json                  # Validation errors, HTTP error states
│
├── en/                              # English
│   ├── common.json
│   ├── company.json
│   ├── academy.json
│   ├── teacher.json
│   ├── admin.json
│   └── errors.json
│
└── fr/                              # French
    ├── common.json
    ├── company.json
    ├── academy.json
    ├── teacher.json
    ├── admin.json
    └── errors.json
```

---

## 3. Localization Scope & Domain Mapping

| Namespace | Key Count (Est.) | Scope & Responsibilities | Examples |
| :--- | :--- | :--- | :--- |
| **`common`** | 45 keys | Global interactive elements, buttons, generic statuses, language switcher, pagination. | `btn_save`, `btn_cancel`, `btn_submit`, `status_connected`, `status_unconfigured` |
| **`company`** | 120 keys | Official corporate website copy: Motto, Pillars, 10 Principles, 10 References, Delivery Model. | `hero_title`, `tagline_primary`, `about_philosophy`, `services_chs_title` |
| **`academy`** | 95 keys | LMS course room, syllabus, lesson viewer, assignment instructions, exam timers, gradebook headers. | `my_courses`, `upcoming_deadlines`, `mark_completed`, `rubric_score` |
| **`teacher`** | 60 keys | Instructional builder, submission queue, feedback inputs, question bank controls. | `course_builder`, `pending_grading`, `return_for_revision`, `passing_grade` |
| **`admin`** | 80 keys | User management, admissions pipeline, Google Drive 5TB storage warnings, audit logs. | `user_directory`, `approve_admission`, `storage_quota_warning`, `audit_trail` |
| **`errors`** | 35 keys | Localized validation and network error messages. | `err_national_id_invalid`, `err_unauthorized_download`, `err_rate_limited` |

---

## 4. Hardcoded Strings Remediation Plan

The following hardcoded Arabic strings in the legacy UI will be migrated to the `common` or `academy` namespace:

| File Location | Hardcoded String in Legacy Code | Assigned Localization Key |
| :--- | :--- | :--- |
| `pages.js:51` | "دخول الأكاديمية والمودل" | `company:cta_enter_academy` |
| `moodle.js:188` | "رفع مادة تدريبية جديدة" | `teacher:btn_upload_material` |
| `moodle.js:315` | "تم تحديث حالة الدورة بنجاح" | `teacher:toast_course_status_updated` |
| `auth.js:139` | "بيانات الدخول غير صحيحة..." | `errors:err_invalid_credentials` |
| `auth.js:161` | "رمز تأكيد إنشاء حسابك هو: ..." | `common:otp_sms_template` |

---

## 5. Migration Execution Strategy
1. **Preserve Compatibility:** The existing `translations.js` will remain in place during Phase 2 to prevent disrupting current navigation.
2. **Phase 4 & 5 Ingestion:** When the new corporate views and Academy views are built in Phase 4 and Phase 5, they will import directly from the new lightweight namespaced files, reducing initial bundle weight by over 180 KB.

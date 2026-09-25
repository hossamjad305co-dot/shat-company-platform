# SHAT Platform — Phase 2 UI Inventory & Screen Catalog
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Complete Catalog of All System Pages, Views, Modals & Navigation Contexts*
*Date: 2026-09-25 | Status: Complete & Frozen for Phase 2*

---

## 1. Architectural Layout Contexts

To guarantee visual and functional distinction between corporate branding, academic learning, and administrative control, the platform implements 4 isolated layout shells:

```text
SHAT Platform
├── 1. Corporate Context (الموقع الرسمي للشركة) — Executive, Trust-Building, Methodology-First
├── 2. Academy Student Context (بوابة المتدرب) — Focus, Progress-Driven, Minimal Glare
├── 3. Teacher Context (بوابة المدرب المعتمد) — Instructional Cockpit, Grading & Builder
└── 4. Admin & Governance Context (مركز الإدارة الموحد) — Dense, Actionable, Role-Gated
```

---

## 2. Screen & View Inventory

### 2.1 Corporate Website (`/company` or `#/home`, `#/services`, etc.)

| View Identifier | Route Hash | Purpose & Primary Content | Primary Actions / Callouts |
| :--- | :--- | :--- | :--- |
| **Corporate Home** | `#/home` | Executive Hero with verified motto ("بناء القدرات • تعزيز المؤسسات • تطوير النتائج"), 2 core pillars, value proposition formula, live post highlights, quick consultation bar. | `دخول الأكاديمية والمودل`, `طلب استشارة`, `استعراض المسارات` |
| **About SHAT (نبذة عن شات)** | `#/about` | Official profile statement, philosophy (Knowledge → Capacity → Practice → Performance → Results), 10 professional principles, 10 international references (CHS, Sphere, OECD DAC, UNEG, etc.). | `تحميل البروفايل المعتمد`, `طلب شراكة مؤسسية` |
| **Services: Training (التدريب وبناء القدرات)** | `#/services` | The 7-step Training System (TNA, Competency-Based, TOT, etc.) and 8 specialized training portfolios (Humanitarian, Protection, Women/Child, Youth, Teachers, Media, MEL). | `طلب حقيبة تدريبية`, `الالتحاق بدبلوم CHS` |
| **Services: Consulting (الاستشارات والتطوير المؤسسي)** | `#/tracks` | The 8-step Consulting System and 2 advanced specialties: Protection Consulting (PSEA, Do No Harm) and Independent External Evaluation (OECD DAC 6 criteria). | `طلب دراسة تقييم خارجي`, `استشارة صون سلامة` |
| **Projects & Selected Work (أعمالنا ومشاريعنا)** | `#/projects` | Filterable project cards by track (Humanitarian, Safeguarding, Evaluation). Project detail view with methodology, outcomes, and deliverables. | `عرض تفاصيل المشروع`, `تصفح معرض الصور` |
| **Posts & Publications (المقالات والأخبار)** | `#/posts` | Corporate CMS publications, field reports, conference updates, rich media attachments, social links. | `قراءة التقرير الكامل`, `مشاركة عبر وسائل التواصل` |
| **Certificate Verification Portal** | `#/verify` | Public credential verification engine. Real-time verification of accredited certificates (e.g. `SHAT-2026-CHS-01`). | `فحص كود الشهادة`, `عرض بيانات الاعتماد` |
| **Contact & Consultation Intake** | `#/contact` | Dynamic contact channels (phone, WhatsApp, email, address editable from CMS) and consultation intake form. | `إرسال رسالة تواصل`, `طلب اجتماع استشاري` |

---

### 2.2 Academy: Student Portal (`#/academy`)

| View Identifier | Route Hash | Purpose & Content | Access Restriction (RBAC) |
| :--- | :--- | :--- | :--- |
| **Student Dashboard** | `#/academy` (student role) | Welcome banner, enrolled course cards with circular progress rings, upcoming assignment deadlines radar (next 7 days), upcoming scheduled quizzes, latest announcements. | `student`, `admin`, `super_admin` |
| **Course Catalog (المساقات المتاحة)** | `#/academy/catalog` | Filterable catalog of accredited training programs and diplomas with syllabus previews and admission requirements. | All roles + `visitor` |
| **Course Room (غرفة المساق)** | `#/course/:id` | Tabbed learning workspace: 1. Overview, 2. Syllabus, 3. Lessons & Units, 4. Materials & Google Drive Downloads, 5. Assignments, 6. Quizzes, 7. Discussions, 8. Gradebook. | Enrolled students (`active`) + assigned teachers |
| **Lesson Viewer (عرض الدرس)** | `#/course/:id/lesson/:lessonId` | Focused reading and video container, rich text instructional content, attached study guides, mark lesson complete button, navigation (Previous/Next). | Enrolled students (`active`) |
| **Assignment Workspace** | `#/course/:id/assignment/:assignmentId` | Detailed instructions, rubric criteria, deadline timer, file uploader for student solution, submission status badge (`Draft`, `Submitted`, `Late`, `Graded`), instructor feedback card. | Enrolled students (`active`) |
| **Exam Arena (قاعة الاختبار)** | `#/course/:id/exam/:examId` | Timed assessment cockpit, question progression bar, objective MCQ/True-False selectors, short essay textareas, review screen, final submission confirmation. | Enrolled students (`active`) |
| **Student Gradebook** | `#/course/:id/grades` | Personal transcript table: evaluation items, weights, max score, achieved score, percentage, instructor commentary, cumulative course standing. | Enrolled students (self only) |
| **Course Discussion Forum** | `#/course/:id/discussions` | Threaded course communication: instructor pinned announcements, student question threads, replies, file attachments. | Enrolled students + teachers |
| **Direct Instructor Chat** | `#/course/:id/chat` | Private 1-on-1 messaging channel between student and assigned lead trainer. | Enrolled students + assigned teacher |

---

### 2.3 Academy: Teacher Portal (`#/teacher`)

| View Identifier | Route Hash | Purpose & Content | Access Restriction |
| :--- | :--- | :--- | :--- |
| **Teacher Dashboard** | `#/teacher` | Assigned active courses overview, pending submissions grading radar, recent student questions, quick course builder shortcuts. | `teacher`, `admin`, `super_admin` |
| **Course Builder (محرر المساق)** | `#/teacher/course/:id/edit` | Visual curriculum architect: Add Section, Add Lesson, Reorder units, Attach Google Drive materials, Add Assignment, Add Quiz, Publish course. | Assigned teachers (`LEAD_TEACHER`) |
| **Submission Grading Cockpit** | `#/teacher/assignment/:id/submissions` | Split-view grading interface: Student list, submission timestamp, attached solution preview, score input, rubric checklist, qualitative feedback editor, "Return for Revision" action. | Assigned teachers |
| **Exam Question Bank Manager** | `#/teacher/exam/:id/questions` | Build assessment questions: MCQ option manager, true/false selectors, point weighting, answer key obfuscation. | Assigned teachers |
| **Master Course Gradebook** | `#/teacher/course/:id/gradebook` | Class-wide grade matrix, column-based evaluation components, batch grade export (CSV), class average and standard deviation analytics. | Assigned teachers |

---

### 2.4 Administration & Governance Portal (`#/admin`)

| View Identifier | Route Hash | Purpose & Content | Access Restriction |
| :--- | :--- | :--- | :--- |
| **Executive Admin Dashboard** | `#/admin` | High-level telemetry: Total enrolled trainees, active courses, pending admissions, published vs draft posts, Google Drive 5TB storage quota widget. | `admin`, `super_admin` |
| **User & Staff Directory** | `#/admin/users` | Searchable user table with filters (Role, Status, Date). User profile editor, account deactivation, password reset trigger, multi-role assignment (`user_roles`). | `super_admin`, `admin` (`users.manage`) |
| **Role & Permission Manager** | `#/admin/roles` | Granular permission matrix: assign individual capabilities to system roles or create custom employee role packages. | `super_admin` (`roles.manage`) |
| **Admissions & Enrollment Queue** | `#/admin/admissions` | Incoming course applications: review student background, organization, verify National ID, approve admission, reject with reason. | `admin`, `admissions_officer` |
| **Corporate CMS & Posts Manager** | `#/admin/cms` | Article and project list with Draft/Preview/Publish statuses, author attribution, publish scheduler, side-by-side desktop/mobile preview launcher. | `admin`, `employee` (`content.edit`) |
| **Central Media Library** | `#/admin/media` | Upload, search, preview, and tag vector logos, report banners, and course covers. Direct link generator. | `admin`, `employee` (`media.upload`) |
| **Google Drive Storage Telemetry** | `#/admin/storage` | Visual gauge of 5TB institutional quota, storage consumed by course, largest file audit, warning threshold alerts (70%, 80%, 90%, 95%). | `super_admin`, `admin` |
| **Immutable Audit Log Viewer** | `#/admin/audit` | Chronological security ledger: Actor, Role, Action, Entity, IP, User Agent, Diff Before/After. Zero delete/update actions. | `super_admin` (`audit.view`) |
| **Platform Settings & Contact Channels** | `#/admin/settings` | Dynamic management of company phone, email, WhatsApp, office address, and integration status monitors (`NOT CONFIGURED` indicators). | `super_admin` (`settings.manage`) |

---

### 2.5 Global Modals & Dialogs

1. **Authentication Modal (`#auth-modal`):** Tabbed dialog (🔑 Login with Password / Username, 📱 WhatsApp OTP Registration, 🌐 Google Continue).
2. **First-Time Profile Completion Wizard (`#modal-profile-completion`):** Mandatory modal enforcing Arabic Full Name, English Full Name, Phone, WhatsApp, National ID (Username), DOB, Password.
3. **Permission Guard Modal (`#modal-permission-guard`):** Intercepts unauthenticated visitors attempting to download materials or enter enrolled course rooms.
4. **Desktop / Mobile Live Preview Modal (`#modal-cms-preview`):** Side-by-side or responsive viewport emulator (1280px Desktop vs 375px Mobile) for draft posts and projects.
5. **Consultation Request Modal (`#consultation-modal`):** Fast inquiry intake form capturing client organization and required service.
6. **Toast Notification Container (`#toast-container`):** Non-blocking auto-dismiss alerts (Success, Error, Warning, Info).

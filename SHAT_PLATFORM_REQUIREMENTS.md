# SHAT Platform — Full Product Requirements Specification (SRS)
**منظومة شركة شات للتنمية والتطوير وأكاديمية شات**
*Document Version: 1.0.0 | Status: Phase 0 Baseline | Target: Production-Ready Web Application*

---

## 1. System Vision & Product Objective

The objective is to architect and engineer an enterprise-grade, production-ready web platform for **SHAT Development & Growth (شركة شات للتنمية والتطوير)**, consisting of two interconnected yet functionally distinct ecosystems:

1. **SHAT Company Website & CMS:** Executive corporate website showcasing the company's verified mission, 2 main pillars (Training & Consulting), 8 specialized training portfolios, 2 advanced consulting specialties (Protection & OECD DAC External Evaluation), delivery models, verified project showcases, and a content management system with a mandatory **Draft → Preview → Publish** lifecycle.
2. **SHAT Academy (LMS & SIS):** A comprehensive Learning Management and Student Information System inspired by the organizational power of Google Classroom and Moodle, executed in a bespoke, high-end SaaS UX, powered by Google Drive (5 TB institutional tier) as the underlying asset store, structured with granular Role-Based Access Control (RBAC), and backed by real-time relational persistence.

---

## 2. Key Architectural Directives & Non-Negotiable Rules

1. **Zero Fabricated Functionality Rule:** Under no circumstances shall mock data, fake file downloads (such as client-side simulated Blobs), fake OTP bypasses, or mocked Google logins be presented as operational integrations. If an external service (Google Drive API, WhatsApp Gateway, Google OAuth, or Google Forms) lacks live production credentials, the system MUST explicitly display a status indicator: `NOT CONFIGURED` with administrative configuration controls.
2. **Information Authenticity Rule:** All corporate text, methodologies, international references, and values must strictly adhere to `SHAT_COMPANY_CONTENT_AUDIT.md`. Any unconfirmed fields (e.g., dynamic contact numbers, addresses, social channels) must be fully manageable from the Admin CMS.
3. **National ID Protection Rule:** The National ID serves as the student's unique institutional username, but it **MUST NEVER** be exposed in public views, client URLs, search queries, or shared student rosters.
4. **Backend Authorization Defense (Defense in Depth):** Hiding UI buttons in the client is insufficient. Every API endpoint, Google Drive access proxy, and file download route must validate permissions server-side.
5. **Full Bidi (RTL/LTR) & WCAG AAA Accessibility:** Arabic RTL is the primary design canvas; English LTR is fully integrated. High-contrast typography, semantic HTML5, and accessible focus states are mandatory across all views.

---

## 3. User Roles & Permission Matrix (RBAC)

The platform rejects simplistic `is_admin = true` flags and enforces a normalized, granular permission architecture.

### 3.1 Primary System Roles
| Role Code | Title (Arabic / English) | Operational Scope |
| :--- | :--- | :--- |
| `super_admin` | المدير العام (Super Admin) | Unrestricted system control, environment configs, staff management, audit log access. |
| `admin` | مدير العمليات (Operations Manager) | Course creation, enrollment approvals, instructor assignment, CMS oversight. |
| `employee` | موظف إداري (Staff / Employee) | Delegated permissions (e.g., Content Editor, Admissions Registrar, Media Officer). |
| `teacher` | مدرب / محاضر (Instructor / Trainer) | Content management, assignments, exams, and grading **strictly within assigned courses**. |
| `student` | طالب / متدرب (Student / Trainee) | Access to enrolled courses, materials download, assignment submission, exam attempts. |
| `visitor` | زائر غير مسجل (Visitor) | Public website browsing, consultation request, certificate verification portal. |

### 3.2 Granular Permissions Taxonomy
```text
users.view               users.create             users.edit               users.delete
roles.manage             staff.assign_permissions

courses.view             courses.create           courses.edit             courses.delete
courses.publish          courses.assign_teacher   enrollment.manage        enrollment.approve

content.view             content.create           content.edit             content.preview
content.publish          content.archive          media.upload             media.delete

files.view_public        files.view_course        files.upload_course      files.delete_course
files.download_proxy     storage.monitor

assignments.view         assignments.create       assignments.edit         assignments.grade
exams.view               exams.create             exams.edit               exams.grade

discussions.post         discussions.moderate     messages.direct_chat
settings.manage          audit_logs.view
```

---

## 4. Module Specifications

### Module 1: SHAT Company Website
* **Home Section:** High-impact hero with verified motto, executive mission statement, pillars overview, live post slider, consultation call to action, and interactive stats.
* **About Section:** Verified philosophy (Knowledge → Capacity → Practice → Performance → Results), 6-stage delivery model, 10 professional principles, and 10 international reference frameworks (CHS, Sphere, OECD DAC, UNEG, HRBA, AAP, PSEA, CRC, CEDAW).
* **Services Section:** 
  * Training & Capacity Development (8 specialized portfolios + TNA/TOT systems).
  * Consulting & Institutional Development (8 consulting systems + Protection & OECD DAC Evaluation).
* **Projects / Portfolio:** Filterable showcase with project category, timeline, methodology, outcomes, and client type.
* **Posts & News (Corporate CMS):** Article catalog with tags, publication date, rich media, and direct social share.
* **Certificate Verification Portal:** Real-time lookup enabling third-party employers and partners to verify student credentials by certificate number.
* **Contact & Inquiries:** Dynamic contact card (editable from CMS) and consultation intake form with database capture.

---

### Module 2: Corporate CMS & Media Library
* **Strict Publication Workflow:**
  $$\text{Draft} \longrightarrow \text{Autosave} \longrightarrow \text{Desktop/Mobile Preview} \longrightarrow \text{Publish / Schedule}$$
* **Live Side-by-Side Preview Engine:** Administrators and editors must inspect the exact viewport rendering (both desktop 1280px and mobile 375px) prior to committing any draft to public state.
* **Media Library:** Centralized repository for company assets, vector logos, training slides, and document templates with search, tag filtering, and metadata inspection.
* **Media Separation:** Strict segregation between public website assets and private academy instructional documents.

---

### Module 3: Authentication, Onboarding & Identity
* **Authentication Vectors:**
  1. **WhatsApp OTP:** Direct SMS/WhatsApp verification code dispatch via backend serverless proxy. 6-digit one-time code with 5-minute expiry and 3-attempt throttle.
  2. **Google OAuth 2.0:** Secure single sign-on adhering to official OAuth 2.0 PKCE flow.
  3. **Enterprise Credentials:** Username/Password login with bcrypt/Argon2 hashing for staff and enrolled students.
* **Mandatory First-Time Onboarding Flow:**
  Immediately following initial OTP or Google authentication, the student must complete their master identity profile:
  * Full Name (Arabic - mandatory)
  * Full Name (English - mandatory)
  * Phone Number (E.164 international format)
  * WhatsApp Active Number
  * Institutional / Personal Email
  * National ID (Serving as immutable `username`, encrypted at rest, strictly shielded from public display)
  * Date of Birth
  * Password creation

---

### Module 4: SHAT Academy — Learning Management System (LMS)
* **Academic Hierarchy:**
  $$\text{Course} \longrightarrow \text{Term / Semester} \longrightarrow \text{Unit / Chapter} \longrightarrow \text{Lesson} \longrightarrow \text{Materials / Tasks}$$
* **Student Dashboard:**
  * Enrolled course cards with visual progress rings and completion indicators.
  * Upcoming deadlines radar (assignments due within 7 days, scheduled quizzes).
  * Institutional announcements board.
  * Personal Gradebook with weight distribution, instructor feedback, and downloadable transcripts.
* **Course Room:**
  * Tabbed modular navigation: Overview, Syllabus, Lessons, Materials, Assignments, Exams, Forum, Resource Links.
* **Instructor Dashboard:**
  * Course roster management with attendance and progress tracking.
  * Lesson builder: Rich text, file attachments, and video embeds.
  * Submission grading cockpit: Split-screen document viewer, rubric-based score input, and private feedback.
  * Student discussion moderation and pinned announcements.

---

### Module 5: Google Drive Institutional Storage Layer (5 TB Tier)
* **Zero Direct Client Exposure:** No Google Cloud service account keys or access tokens may touch client code.
* **Automated Institutional Directory Hierarchy:**
  ```text
  SHAT_Academy_Root/
  ├── Courses/
  │   ├── [Course_Code]_[Course_Name]/
  │   │   ├── Materials/
  │   │   ├── Assignments/
  │   │   └── Resources/
  ├── Submissions/
  │   └── [Course_Code]/[Assignment_ID]/[Student_ID]/
  └── System_Backups/
  ```
* **Database Metadata Registry:**
  Every uploaded file must maintain a shadow metadata record in the relational store: `google_drive_file_id`, `folder_id`, `file_name`, `mime_type`, `file_size_bytes`, `sha256_hash`, `uploaded_by`, `course_id`, `access_tier`.
* **Access Validation Proxy:**
  File download requests route through `/api/storage/file/:fileId`. The backend inspects user session, role, and enrollment status before streaming the file or generating a signed, time-limited download URL.
* **Storage Telemetry Dashboard:**
  Visual monitor tracking used vs. remaining quota (out of 5 TB), utilization by course, largest file audit, and automated alert thresholds at 70%, 80%, 90%, and 95%.

---

### Module 6: Google Forms Integration Layer
* Official API or webhook-backed request pipeline for surveys, admissions, and feedback forms.
* Support for dynamic form embedding and administrative link management.
* Direct sync of submitted form leads into the platform's admissions review queue.

---

### Module 7: Assignments, Examinations & Gradebook
* **Assignment Lifecycle:**
  $$\text{Draft} \longrightarrow \text{Published} \longrightarrow \text{Submitted (On-time / Late)} \longrightarrow \text{Graded} \longrightarrow \text{Returned for Revision}$$
* **Examination Engine:**
  * Support for Multiple Choice (MCQ), True/False, Short Answer, Essay, and File Upload questions.
  * Configurable examination constraints: Time limit countdown, attempt limits, availability windows, randomized questions.
  * Instant auto-grading for objective question types; instructor grading workflow for qualitative answers.
* **Master Gradebook:**
  Calculates cumulative weighted grades, class averages, standard deviation, and provides exportable CSV/Excel reports.

---

### Module 8: Communication, Community & Notifications
* **Course Discussion Forums:** Threaded discussion topics, reply trees, upvoting, file attachments, and instructor verification badges.
* **Course Chat:** Private direct messaging between enrolled students and their assigned course instructor; institutional staff channel.
* **Notification Center:** In-app real-time notification drawer and email/WhatsApp alert dispatch for critical academic milestones (new assignment, upcoming exam, grade published, enrollment approved).

---

### Module 9: Audit Logs & Administrative Governance
* Immutable logging of all sensitive administrative mutations:
  * User creation, suspension, and deletion
  * Role and permission reassignments
  * Course deletion or material retraction
  * Grade overrides and retroactive edits
  * CMS content publication and archival
* Log Schema: `actor_id`, `actor_role`, `action_type`, `entity_type`, `entity_id`, `ip_address`, `user_agent`, `payload_before`, `payload_after`, `timestamp`.

---

## 5. Non-Functional & Quality Requirements

* **Performance:** First Contentful Paint (FCP) < 1.2s; initial bundle size < 250 KB gzipped; pagination for all lists with $N > 25$.
* **Security & Hardening:**
  * OWASP Top 10 mitigation: strict input validation, parameter binding, CSRF tokens, anti-XSS sanitization.
  * Rate limiting: 5 attempts per 15 minutes on authentication endpoints; 60 requests per minute on general API routes.
  * Strict session invalidation upon logout or credential mutation.
* **Scalability:** Stateless API design allowing horizontal container scaling on Vercel / Cloud Run.
* **Resilience:** Graceful offline handling; network retry strategies with exponential backoff.

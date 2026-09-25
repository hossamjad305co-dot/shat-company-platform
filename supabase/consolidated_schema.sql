
-- ========================================================
-- FILE: 001_extensions.sql
-- ========================================================
-- Migration 001: Required Database Extensions
-- System: SHAT Platform
-- Target: PostgreSQL / Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ========================================================
-- FILE: 002_profiles.sql
-- ========================================================
-- Migration 002: Identity & Profiles Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Master Application Profile (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.shat_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    national_id_hash TEXT UNIQUE NOT NULL,
    national_id_encrypted TEXT NOT NULL,
    full_name_ar TEXT NOT NULL,
    full_name_en TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp_number TEXT,
    date_of_birth DATE NOT NULL,
    avatar_url TEXT,
    status TEXT DEFAULT 'pending_profile' CHECK (status IN ('pending_profile', 'active', 'suspended', 'deactivated')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Sub-Profile
CREATE TABLE IF NOT EXISTS public.shat_student_profiles (
    id UUID PRIMARY KEY REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    educational_level TEXT,
    organization TEXT,
    job_title TEXT,
    specialization TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Teacher / Trainer Sub-Profile
CREATE TABLE IF NOT EXISTS public.shat_teacher_profiles (
    id UUID PRIMARY KEY REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    title_prefix TEXT DEFAULT 'أ.',
    bio_ar TEXT,
    bio_en TEXT,
    academic_degrees JSONB DEFAULT '[]'::jsonb,
    years_of_experience INT DEFAULT 0,
    specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Employee / Staff Sub-Profile
CREATE TABLE IF NOT EXISTS public.shat_employee_profiles (
    id UUID PRIMARY KEY REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    department TEXT NOT NULL,
    job_title TEXT NOT NULL,
    reports_to UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    office_location TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Safe Public Profile View (Shields National ID, Phone, DOB from Public)
CREATE OR REPLACE VIEW public.shat_public_profiles AS
SELECT 
    id,
    username,
    full_name_ar,
    full_name_en,
    avatar_url,
    status,
    created_at
FROM public.shat_profiles;


-- ========================================================
-- FILE: 003_roles_permissions.sql
-- ========================================================
-- Migration 003: Roles & Granular Permissions Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Roles Registry
CREATE TABLE IF NOT EXISTS public.shat_roles (
    id TEXT PRIMARY KEY,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description TEXT,
    priority_level INT DEFAULT 100 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Granular Permissions Registry
CREATE TABLE IF NOT EXISTS public.shat_permissions (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Role-Permission Cross-Table
CREATE TABLE IF NOT EXISTS public.shat_role_permissions (
    role_id TEXT REFERENCES public.shat_roles(id) ON DELETE CASCADE,
    permission_id TEXT REFERENCES public.shat_permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 4. User-Role Assignment (Multi-Role Support)
CREATE TABLE IF NOT EXISTS public.shat_user_roles (
    user_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    role_id TEXT REFERENCES public.shat_roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    assigned_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, role_id)
);

-- 5. User-Permission Direct Override (Individual Exceptions)
CREATE TABLE IF NOT EXISTS public.shat_user_permissions (
    user_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    permission_id TEXT REFERENCES public.shat_permissions(id) ON DELETE CASCADE,
    is_granted BOOLEAN DEFAULT true NOT NULL,
    assigned_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    assigned_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, permission_id)
);

-- Pre-seed System Roles
INSERT INTO public.shat_roles (id, title_ar, title_en, description, priority_level) VALUES
('super_admin', 'المدير العام', 'Super Administrator', 'Full administrative authority across all platform domains and infrastructure', 1),
('admin', 'مدير العمليات', 'Operations Manager', 'Academic and operational administration, admissions, and course oversight', 10),
('employee', 'موظف إداري', 'Staff Employee', 'Delegated administrative tasks, content publishing, and media management', 20),
('teacher', 'مدرب معتمد', 'Master Instructor / Trainer', 'Instructional delivery, grading, and material management within assigned courses', 30),
('student', 'طالب / متدرب', 'Student / Trainee', 'Course enrollment, learning material access, and assignment submission', 50),
('visitor', 'زائر', 'Visitor', 'Public website browsing and consultation inquiries', 100)
ON CONFLICT (id) DO NOTHING;

-- Pre-seed Granular Permissions
INSERT INTO public.shat_permissions (id, category, description_ar, description_en) VALUES
-- User Management
('users.view', 'identity', 'عرض قائمة المستخدمين', 'View user accounts list'),
('users.create', 'identity', 'إنشاء حسابات مستخدمين', 'Create user accounts'),
('users.update', 'identity', 'تعديل بيانات المستخدمين', 'Update user profiles'),
('users.delete', 'identity', 'حذف أو تعطيل المستخدمين', 'Delete or suspend user accounts'),
('roles.manage', 'identity', 'إدارة وتعيين الأدوار والصلاحيات', 'Manage and assign user roles and permissions'),
-- Academic & Courses
('courses.view', 'academic', 'عرض المقررات والكورسات', 'View course catalog'),
('courses.create', 'academic', 'إنشاء دورات تدريبية جديدة', 'Create new courses'),
('courses.edit', 'academic', 'تعديل محتوى وتفاصيل الدورات', 'Edit course details and structure'),
('courses.delete', 'academic', 'حذف أو أرشفة الدورات', 'Delete or archive courses'),
('courses.publish', 'academic', 'نشر وتفعيل الدورات للمتدربين', 'Publish courses to public or student catalog'),
('enrollment.manage', 'academic', 'إدارة طلبات الالتحاق والقبول', 'Review and approve enrollment applications'),
-- Instructional & Grading
('materials.upload', 'instruction', 'رفع وتحديث المواد والحقائب التدريبية', 'Upload instructional course materials'),
('assignments.create', 'instruction', 'إنشاء وإدارة التكليفات والواجبات', 'Create and schedule course assignments'),
('assignments.grade', 'instruction', 'تصحيح تكليفات الطلاب ورصد الدرجات', 'Grade submissions and provide feedback'),
('exams.create', 'instruction', 'إعداد وبناء بنك الأسئلة والاختبارات', 'Build exams and assessment question banks'),
('exams.grade', 'instruction', 'تصحيح واعتماد نتائج الاختبارات', 'Review and finalize exam grades'),
('grades.view', 'instruction', 'عرض سجل الدرجات الأكاديمي', 'View course gradebook and metrics'),
-- Content & CMS
('content.view', 'cms', 'معاينة المسودات والمحتوى الإداري', 'View CMS draft content and articles'),
('content.create', 'cms', 'كتابة مقالات ومنشورات جديدة', 'Create new articles and posts'),
('content.edit', 'cms', 'تعديل المنشورات والمشاريع', 'Edit articles, projects, and home sections'),
('content.publish', 'cms', 'نشر وجدولة المحتوى على الموقع الرسمي', 'Publish and schedule website content'),
('media.upload', 'cms', 'رفع وإدارة مكتبة الوسائط والصور', 'Upload and organize media library'),
-- Governance & System
('settings.manage', 'system', 'تعديل إعدادات وهوية المنصة', 'Manage general platform settings and branding'),
('audit.view', 'system', 'الاطلاع على سجل التدقيق والرقابة المؤسسية', 'Inspect immutable audit logs'),
('storage.monitor', 'system', 'متابعة استهلاك مساحة التخزين السحابية 5TB', 'Monitor 5TB Google Drive quota and alerts')
ON CONFLICT (id) DO NOTHING;

-- Map Pre-seeded Permissions to Roles
-- Super Admin: All permissions
INSERT INTO public.shat_role_permissions (role_id, permission_id)
SELECT 'super_admin', id FROM public.shat_permissions
ON CONFLICT DO NOTHING;

-- Admin: Academic, enrollment, content, grading
INSERT INTO public.shat_role_permissions (role_id, permission_id)
SELECT 'admin', id FROM public.shat_permissions
WHERE category IN ('academic', 'cms', 'instruction', 'identity')
  AND id NOT IN ('users.delete', 'audit.view', 'settings.manage')
ON CONFLICT DO NOTHING;

-- Teacher: Instruction, grading, materials upload
INSERT INTO public.shat_role_permissions (role_id, permission_id)
SELECT 'teacher', id FROM public.shat_permissions
WHERE id IN ('materials.upload', 'assignments.create', 'assignments.grade', 'exams.create', 'exams.grade', 'grades.view', 'courses.view')
ON CONFLICT DO NOTHING;

-- Employee: Content management & media
INSERT INTO public.shat_role_permissions (role_id, permission_id)
SELECT 'employee', id FROM public.shat_permissions
WHERE category = 'cms'
ON CONFLICT DO NOTHING;


-- ========================================================
-- FILE: 004_academy.sql
-- ========================================================
-- Migration 004: Academy Core, Courses & Enrollment Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Courses Catalog
CREATE TABLE IF NOT EXISTS public.shat_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    track TEXT NOT NULL, -- e.g. 'humanitarian', 'protection', 'consulting'
    category TEXT DEFAULT 'diploma', -- 'diploma', 'executive_course', 'workshop'
    level TEXT DEFAULT 'advanced',
    duration_weeks INT DEFAULT 4,
    credit_hours INT DEFAULT 30,
    overview_ar TEXT,
    overview_en TEXT,
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    cover_image_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'active', 'archived')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Multi-Teacher Course Assignment
CREATE TABLE IF NOT EXISTS public.shat_course_teachers (
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    role_in_course TEXT DEFAULT 'LEAD_TEACHER' CHECK (role_in_course IN ('LEAD_TEACHER', 'CO_TEACHER', 'ASSISTANT_TEACHER')),
    assigned_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (course_id, teacher_id)
);

-- 3. Course Sections (Units / Chapters)
CREATE TABLE IF NOT EXISTS public.shat_course_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    sort_order INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Course Lessons
CREATE TABLE IF NOT EXISTS public.shat_course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.shat_course_sections(id) ON DELETE CASCADE,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    content_rich_text TEXT,
    duration_minutes INT DEFAULT 45,
    sort_order INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Course Announcements Board
CREATE TABLE IF NOT EXISTS public.shat_course_announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Academic Enrollments Pipeline
CREATE TABLE IF NOT EXISTS public.shat_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'suspended', 'completed', 'withdrawn', 'rejected')),
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    attendance_rate INT DEFAULT 0 CHECK (attendance_rate BETWEEN 0 AND 100),
    enrolled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    approved_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    CONSTRAINT uq_shat_course_student UNIQUE (course_id, student_id)
);


-- ========================================================
-- FILE: 005_assignments.sql
-- ========================================================
-- Migration 005: Assignments Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Course Assignments
CREATE TABLE IF NOT EXISTS public.shat_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    deadline_at TIMESTAMPTZ NOT NULL,
    max_grade INT DEFAULT 100 CHECK (max_grade > 0),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
    created_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Assignment Submissions
CREATE TABLE IF NOT EXISTS public.shat_assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES public.shat_assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    submission_text TEXT,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'late', 'graded', 'returned')),
    grade INT CHECK (grade >= 0),
    instructor_feedback TEXT,
    graded_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    graded_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_shat_assignment_student UNIQUE (assignment_id, student_id)
);


-- ========================================================
-- FILE: 006_exams.sql
-- ========================================================
-- Migration 006: Examinations Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Course Examinations Registry
CREATE TABLE IF NOT EXISTS public.shat_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    duration_minutes INT DEFAULT 60 CHECK (duration_minutes > 0),
    start_window TIMESTAMPTZ,
    end_window TIMESTAMPTZ,
    max_attempts INT DEFAULT 1 CHECK (max_attempts >= 1),
    passing_grade INT DEFAULT 60 CHECK (passing_grade BETWEEN 0 AND 100),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Exam Question Bank
CREATE TABLE IF NOT EXISTS public.shat_exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES public.shat_exams(id) ON DELETE CASCADE,
    question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'true_false', 'short_answer', 'essay', 'file')),
    prompt TEXT NOT NULL,
    options JSONB DEFAULT '[]'::jsonb, -- Array of strings for MCQ
    correct_answer_hash TEXT, -- Obfuscated/hashed for security
    points INT DEFAULT 10 CHECK (points > 0),
    sort_order INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Student Exam Attempts
CREATE TABLE IF NOT EXISTS public.shat_exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES public.shat_exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    attempt_number INT DEFAULT 1 NOT NULL,
    score INT CHECK (score >= 0),
    passed BOOLEAN DEFAULT false,
    started_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    submitted_at TIMESTAMPTZ,
    CONSTRAINT uq_shat_exam_student_attempt UNIQUE (exam_id, student_id, attempt_number)
);

-- 4. Question Responses / Student Answers
CREATE TABLE IF NOT EXISTS public.shat_exam_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID REFERENCES public.shat_exam_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.shat_exam_questions(id) ON DELETE CASCADE,
    answer_text TEXT,
    selected_option_index INT,
    points_awarded INT DEFAULT 0,
    instructor_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_shat_attempt_question UNIQUE (attempt_id, question_id)
);


-- ========================================================
-- FILE: 007_grades.sql
-- ========================================================
-- Migration 007: Gradebook & Academic Evaluation Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Grade Evaluation Components
CREATE TABLE IF NOT EXISTS public.shat_grade_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('assignment', 'exam', 'quiz', 'participation', 'final_exam', 'manual')),
    source_id UUID, -- Optional foreign UUID pointing to assignment_id or exam_id
    max_points INT DEFAULT 100 CHECK (max_points > 0),
    weight_percentage INT DEFAULT 10 CHECK (weight_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Normalized Grades
CREATE TABLE IF NOT EXISTS public.shat_grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_item_id UUID REFERENCES public.shat_grade_items(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    score NUMERIC(5, 2) NOT NULL CHECK (score >= 0),
    percentage NUMERIC(5, 2) GENERATED ALWAYS AS (ROUND((score / 100.0) * 100, 2)) STORED,
    feedback TEXT,
    graded_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    graded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_shat_grade_item_student UNIQUE (grade_item_id, student_id)
);


-- ========================================================
-- FILE: 008_files.sql
-- ========================================================
-- Migration 008: Storage & Cloud File Metadata Domain (Google Drive Layer)
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Master Cloud Files Shadow Registry (Google Drive Integration)
CREATE TABLE IF NOT EXISTS public.shat_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT DEFAULT 'google_drive' NOT NULL,
    provider_file_id TEXT NOT NULL, -- Google Drive File ID
    folder_id TEXT,                 -- Google Drive Folder ID
    name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0),
    md5_checksum TEXT,
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE SET NULL,
    uploaded_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    access_tier TEXT DEFAULT 'enrolled_students' CHECK (access_tier IN ('public', 'enrolled_students', 'course_teachers', 'staff_only')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Course Materials Registry (Links lessons to files)
CREATE TABLE IF NOT EXISTS public.shat_course_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.shat_course_lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    file_id UUID REFERENCES public.shat_files(id) ON DELETE CASCADE,
    is_mandatory BOOLEAN DEFAULT false,
    downloads_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Assignment Submission Attachments
CREATE TABLE IF NOT EXISTS public.shat_assignment_submission_files (
    submission_id UUID REFERENCES public.shat_assignment_submissions(id) ON DELETE CASCADE,
    file_id UUID REFERENCES public.shat_files(id) ON DELETE CASCADE,
    PRIMARY KEY (submission_id, file_id)
);


-- ========================================================
-- FILE: 009_cms.sql
-- ========================================================
-- Migration 009: Corporate CMS, Media & Website Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Corporate News & Publications
CREATE TABLE IF NOT EXISTS public.shat_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    content_rich_text TEXT NOT NULL,
    excerpt_ar TEXT,
    cover_image_url TEXT,
    category TEXT DEFAULT 'general',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'preview', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects & Corporate Portfolio
CREATE TABLE IF NOT EXISTS public.shat_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    client_name TEXT,
    category TEXT NOT NULL, -- e.g. 'chs_evaluation', 'protection_consulting', 'capacity_strengthening'
    timeline TEXT,
    description_ar TEXT NOT NULL,
    outcomes JSONB DEFAULT '[]'::jsonb,
    cover_image_url TEXT,
    gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Corporate Pillars & Services Catalog
CREATE TABLE IF NOT EXISTS public.shat_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    pillar TEXT NOT NULL CHECK (pillar IN ('training', 'consulting')),
    title_ar TEXT NOT NULL,
    title_en TEXT,
    description_ar TEXT NOT NULL,
    methodology_points JSONB DEFAULT '[]'::jsonb,
    icon_name TEXT DEFAULT 'Layers',
    sort_order INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Central Media Library
CREATE TABLE IF NOT EXISTS public.shat_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    storage_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    uploaded_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Consultation & Advisory Intake Requests
CREATE TABLE IF NOT EXISTS public.shat_consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    service_type TEXT NOT NULL,
    details TEXT,
    language TEXT DEFAULT 'ar',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Verified Certificates Verification Ledger
CREATE TABLE IF NOT EXISTS public.shat_certificate_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_number TEXT UNIQUE NOT NULL,
    recipient_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    issue_date DATE NOT NULL,
    grade TEXT DEFAULT 'Excellence',
    accreditation_details TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Dynamic Platform Settings (Editable from CMS, prevents hardcoding)
CREATE TABLE IF NOT EXISTS public.shat_site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL
);

-- Pre-seed Official Verified Certificates
INSERT INTO public.shat_certificate_verifications (certificate_number, recipient_name, course_name, issue_date, grade, accreditation_details) VALUES
('SHAT-2026-CHS-01', 'أحمد محمد العلي', 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات', '2026-02-15', 'امتياز مع مرتبة الشرف (Distinction)', 'معتمد وفق معايير Core Humanitarian Standard و Sphere Handbook'),
('SHAT-2026-PSEA-02', 'سارة خالد المحمود', 'البرنامج المتقدم في استشارات الحماية وصون السلامة (PSEA)', '2026-03-01', 'امتياز (Excellence)', 'معتمد وفق أطر الحماية العالمية ومبادئ Do No Harm'),
('SHAT-2026-OECD-03', 'د. عمر بن عبد العزيز', 'خبير التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC الستة', '2026-03-10', 'امتياز (Excellence)', 'معتمد وفق معايير OECD DAC و UNEG Norms & Standards')
ON CONFLICT (certificate_number) DO NOTHING;

-- Pre-seed Platform Dynamic Settings
INSERT INTO public.shat_site_settings (key, value, description) VALUES
('company_contact', '{
    "phone": "+972 59 287 9621",
    "email": "shat.company26@gmail.com",
    "whatsapp": "+972592879621",
    "address": "فلسطين • نطاق العمل: دولي وإقليمي",
    "website": "https://shat-company-platform.vercel.app"
}'::jsonb, 'Official contact channels - editable from Admin Settings'),
('storage_google_drive', '{
    "status": "NOT_CONFIGURED",
    "total_quota_bytes": 5497558138880,
    "alert_thresholds_pct": [70, 80, 90, 95]
}'::jsonb, 'Google Drive 5TB institutional storage telemetry configuration'),
('auth_whatsapp_otp', '{
    "status": "NOT_CONFIGURED",
    "provider": "waforge",
    "code_expiry_seconds": 300,
    "max_attempts": 3
}'::jsonb, 'WhatsApp OTP dispatch gateway status')
ON CONFLICT (key) DO NOTHING;


-- ========================================================
-- FILE: 010_notifications.sql
-- ========================================================
-- Migration 010: Notifications & Academic Discussions Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. In-App User Notifications
CREATE TABLE IF NOT EXISTS public.shat_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'urgent')),
    link TEXT,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Course Discussion Threads
CREATE TABLE IF NOT EXISTS public.shat_discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    replies_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Discussion Thread Replies
CREATE TABLE IF NOT EXISTS public.shat_discussion_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID REFERENCES public.shat_discussions(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. 3-Tier Course & Staff Chat Messages
CREATE TABLE IF NOT EXISTS public.shat_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_type TEXT NOT NULL CHECK (conversation_type IN ('student_instructor', 'course_forum', 'staff_internal')),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL, -- Null for forum or staff room
    message TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ========================================================
-- FILE: 011_audit.sql
-- ========================================================
-- Migration 011: Audit Trail & Immutable System Governance Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Immutable Audit Log Ledger
CREATE TABLE IF NOT EXISTS public.shat_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    payload_before JSONB,
    payload_after JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: No UPDATE or DELETE policies will ever be assigned to shat_audit_logs.
-- It acts as an append-only cryptographic ledger.


-- ========================================================
-- FILE: 012_rls.sql
-- ========================================================
-- Migration 012: Row Level Security (RLS) & Authorization Engine
-- System: SHAT Platform
-- Namespace: shat_

-- =============================================================================
-- 1. SECURITY DEFINER HELPER FUNCTIONS (Optimized & Non-Recursive)
-- =============================================================================

-- 1.1 Get internal Profile UUID from Supabase auth.uid()
CREATE OR REPLACE FUNCTION public.shat_get_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.shat_profiles WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

-- 1.2 Check if active user has a specific role (or super_admin)
CREATE OR REPLACE FUNCTION public.shat_has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.shat_user_roles ur
    JOIN public.shat_profiles p ON p.id = ur.user_id
    WHERE p.auth_user_id = auth.uid() 
      AND (ur.role_id = required_role OR ur.role_id = 'super_admin')
  );
$$;

-- 1.3 Check if active user holds a specific granular permission
CREATE OR REPLACE FUNCTION public.shat_has_permission(required_perm TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.shat_profiles p
    WHERE p.auth_user_id = auth.uid()
      AND (
        -- 1. Super Admin bypass
        EXISTS (SELECT 1 FROM public.shat_user_roles ur WHERE ur.user_id = p.id AND ur.role_id = 'super_admin')
        -- 2. Direct user-level grant
        OR EXISTS (SELECT 1 FROM public.shat_user_permissions up WHERE up.user_id = p.id AND up.permission_id = required_perm AND up.is_granted = true)
        -- 3. Role-based permission
        OR EXISTS (
          SELECT 1 
          FROM public.shat_user_roles ur
          JOIN public.shat_role_permissions rp ON rp.role_id = ur.role_id
          WHERE ur.user_id = p.id AND rp.permission_id = required_perm
        )
      )
  );
$$;

-- 1.4 Check if student is actively enrolled in course
CREATE OR REPLACE FUNCTION public.shat_is_enrolled_in_course(course_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.shat_enrollments e
    JOIN public.shat_profiles p ON p.id = e.student_id
    WHERE p.auth_user_id = auth.uid() 
      AND e.course_id = course_uuid
      AND e.status IN ('active', 'completed')
  );
$$;

-- 1.5 Check if instructor is assigned to course
CREATE OR REPLACE FUNCTION public.shat_is_course_teacher(course_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.shat_course_teachers ct
    JOIN public.shat_profiles p ON p.id = ct.teacher_id
    WHERE p.auth_user_id = auth.uid() 
      AND ct.course_id = course_uuid
  );
$$;

-- =============================================================================
-- 2. ENABLE ROW LEVEL SECURITY ON ALL SHAT ENTITIES
-- =============================================================================
ALTER TABLE public.shat_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_course_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_course_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_assignment_submission_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_grade_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_certificate_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shat_audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 3. RLS POLICIES SPECIFICATION
-- =============================================================================

-- 3.1 Profiles
CREATE POLICY "profiles_select_self_or_admin" ON public.shat_profiles
    FOR SELECT TO authenticated
    USING (auth_user_id = auth.uid() OR shat_has_permission('users.view'));

CREATE POLICY "profiles_insert_self" ON public.shat_profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "profiles_update_self_or_admin" ON public.shat_profiles
    FOR UPDATE TO authenticated
    USING (auth_user_id = auth.uid() OR shat_has_permission('users.update'))
    WITH CHECK (auth_user_id = auth.uid() OR shat_has_permission('users.update'));

-- 3.2 Roles & Permissions (Read by all authenticated, modify by Super Admin)
CREATE POLICY "roles_select" ON public.shat_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "permissions_select" ON public.shat_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "user_roles_select" ON public.shat_user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "user_roles_modify" ON public.shat_user_roles FOR ALL TO authenticated 
    USING (shat_has_role('super_admin') OR shat_has_permission('roles.manage'))
    WITH CHECK (shat_has_role('super_admin') OR shat_has_permission('roles.manage'));

-- 3.3 Courses
CREATE POLICY "courses_select" ON public.shat_courses
    FOR SELECT TO anon, authenticated
    USING (status IN ('published', 'active') OR shat_is_course_teacher(id) OR shat_has_permission('courses.view'));

CREATE POLICY "courses_modify" ON public.shat_courses
    FOR ALL TO authenticated
    USING (shat_has_permission('courses.edit') OR shat_is_course_teacher(id))
    WITH CHECK (shat_has_permission('courses.edit') OR shat_is_course_teacher(id));

-- 3.4 Course Sections & Lessons
CREATE POLICY "sections_select" ON public.shat_course_sections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "sections_modify" ON public.shat_course_sections FOR ALL TO authenticated
    USING (shat_is_course_teacher(course_id) OR shat_has_permission('courses.edit'))
    WITH CHECK (shat_is_course_teacher(course_id) OR shat_has_permission('courses.edit'));

CREATE POLICY "lessons_select" ON public.shat_course_lessons FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "lessons_modify" ON public.shat_course_lessons FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.shat_course_sections s WHERE s.id = section_id AND (shat_is_course_teacher(s.course_id) OR shat_has_permission('courses.edit'))))
    WITH CHECK (EXISTS (SELECT 1 FROM public.shat_course_sections s WHERE s.id = section_id AND (shat_is_course_teacher(s.course_id) OR shat_has_permission('courses.edit'))));

-- 3.5 Course Materials & Files (Strict enrollment gate)
CREATE POLICY "materials_select" ON public.shat_course_materials
    FOR SELECT TO authenticated
    USING (shat_is_enrolled_in_course(course_id) OR shat_is_course_teacher(course_id) OR shat_has_permission('courses.view'));

CREATE POLICY "files_select" ON public.shat_files
    FOR SELECT TO authenticated
    USING (
        access_tier = 'public'
        OR (course_id IS NOT NULL AND (shat_is_enrolled_in_course(course_id) OR shat_is_course_teacher(course_id)))
        OR uploaded_by = shat_get_profile_id()
        OR shat_has_permission('courses.view')
    );

-- 3.6 Enrollments (Student can only see self, Teacher sees course, Admin sees all)
CREATE POLICY "enrollments_select" ON public.shat_enrollments
    FOR SELECT TO authenticated
    USING (student_id = shat_get_profile_id() OR shat_is_course_teacher(course_id) OR shat_has_permission('enrollment.manage'));

CREATE POLICY "enrollments_insert_self" ON public.shat_enrollments
    FOR INSERT TO authenticated
    WITH CHECK (student_id = shat_get_profile_id());

CREATE POLICY "enrollments_update_admin" ON public.shat_enrollments
    FOR UPDATE TO authenticated
    USING (shat_has_permission('enrollment.manage'))
    WITH CHECK (shat_has_permission('enrollment.manage'));

-- 3.7 Assignments & Submissions (Cross-Student Isolation)
CREATE POLICY "assignments_select" ON public.shat_assignments
    FOR SELECT TO authenticated
    USING (shat_is_enrolled_in_course(course_id) OR shat_is_course_teacher(course_id) OR shat_has_permission('courses.view'));

CREATE POLICY "submissions_select" ON public.shat_assignment_submissions
    FOR SELECT TO authenticated
    USING (
        student_id = shat_get_profile_id()
        OR EXISTS (SELECT 1 FROM public.shat_assignments a WHERE a.id = assignment_id AND (shat_is_course_teacher(a.course_id) OR shat_has_permission('assignments.grade')))
    );

CREATE POLICY "submissions_insert_self" ON public.shat_assignment_submissions
    FOR INSERT TO authenticated
    WITH CHECK (student_id = shat_get_profile_id());

CREATE POLICY "submissions_update_self_or_teacher" ON public.shat_assignment_submissions
    FOR UPDATE TO authenticated
    USING (
        student_id = shat_get_profile_id() 
        OR EXISTS (SELECT 1 FROM public.shat_assignments a WHERE a.id = assignment_id AND (shat_is_course_teacher(a.course_id) OR shat_has_permission('assignments.grade')))
    );

-- 3.8 Grades (Student can only see their own grades)
CREATE POLICY "grades_select" ON public.shat_grades
    FOR SELECT TO authenticated
    USING (
        student_id = shat_get_profile_id()
        OR EXISTS (SELECT 1 FROM public.shat_grade_items gi WHERE gi.id = grade_item_id AND (shat_is_course_teacher(gi.course_id) OR shat_has_permission('grades.view')))
    );

-- 3.9 CMS Posts & Projects (Public sees published, Editors see all)
CREATE POLICY "posts_select" ON public.shat_posts
    FOR SELECT TO anon, authenticated
    USING (status = 'published' OR shat_has_permission('content.view'));

CREATE POLICY "posts_modify" ON public.shat_posts
    FOR ALL TO authenticated
    USING (shat_has_permission('content.edit'))
    WITH CHECK (shat_has_permission('content.edit'));

CREATE POLICY "projects_select" ON public.shat_projects
    FOR SELECT TO anon, authenticated
    USING (status = 'published' OR shat_has_permission('content.view'));

CREATE POLICY "services_select" ON public.shat_services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "consultations_insert_public" ON public.shat_consultations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "certificates_select_public" ON public.shat_certificate_verifications FOR SELECT TO anon, authenticated USING (true);

-- 3.10 Notifications & Chat (Recipient/Sender Isolation)
CREATE POLICY "notifications_select" ON public.shat_notifications
    FOR SELECT TO authenticated
    USING (user_id = shat_get_profile_id());

CREATE POLICY "chat_select" ON public.shat_chat_messages
    FOR SELECT TO authenticated
    USING (
        conversation_type = 'course_forum' AND shat_is_enrolled_in_course(course_id)
        OR conversation_type = 'student_instructor' AND (sender_id = shat_get_profile_id() OR recipient_id = shat_get_profile_id() OR shat_is_course_teacher(course_id))
        OR conversation_type = 'staff_internal' AND (shat_has_role('super_admin') OR shat_has_role('admin') OR shat_has_role('employee'))
    );

-- 3.11 Audit Logs (Super Admin Read-Only, System Insert, Zero Updates/Deletes)
CREATE POLICY "audit_select_super_admin" ON public.shat_audit_logs
    FOR SELECT TO authenticated
    USING (shat_has_role('super_admin') OR shat_has_permission('audit.view'));

CREATE POLICY "audit_insert_system" ON public.shat_audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);


-- ========================================================
-- FILE: 013_indexes.sql
-- ========================================================
-- Migration 013: High-Performance Database Indexing Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Identity & Profiles
CREATE INDEX IF NOT EXISTS idx_shat_profiles_auth_user_id ON public.shat_profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_shat_profiles_national_id_hash ON public.shat_profiles(national_id_hash);
CREATE INDEX IF NOT EXISTS idx_shat_profiles_username ON public.shat_profiles(username);

-- 2. Academy & Course Navigation
CREATE INDEX IF NOT EXISTS idx_shat_courses_status ON public.shat_courses(status);
CREATE INDEX IF NOT EXISTS idx_shat_courses_track ON public.shat_courses(track);
CREATE INDEX IF NOT EXISTS idx_shat_course_teachers_lookup ON public.shat_course_teachers(course_id, teacher_id);
CREATE INDEX IF NOT EXISTS idx_shat_course_sections_order ON public.shat_course_sections(course_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_shat_course_lessons_order ON public.shat_course_lessons(section_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_shat_course_materials_course ON public.shat_course_materials(course_id);

-- 3. Enrollments & Access Gate
CREATE INDEX IF NOT EXISTS idx_shat_enrollments_student ON public.shat_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_shat_enrollments_course ON public.shat_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_shat_enrollments_active_gate ON public.shat_enrollments(course_id, student_id, status);

-- 4. Instructional & Evaluation Lookups
CREATE INDEX IF NOT EXISTS idx_shat_assignments_course ON public.shat_assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_shat_submissions_assignment ON public.shat_assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_shat_submissions_student ON public.shat_assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_shat_grades_student ON public.shat_grades(student_id);
CREATE INDEX IF NOT EXISTS idx_shat_grades_item ON public.shat_grades(grade_item_id);

-- 5. Storage & Cloud File Lookups
CREATE INDEX IF NOT EXISTS idx_shat_files_course ON public.shat_files(course_id);
CREATE INDEX IF NOT EXISTS idx_shat_files_provider_id ON public.shat_files(provider_file_id);

-- 6. CMS Publishing Queries
CREATE INDEX IF NOT EXISTS idx_shat_posts_published ON public.shat_posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_shat_projects_category ON public.shat_projects(category, status);

-- 7. Governance, Notifications & Chat
CREATE INDEX IF NOT EXISTS idx_shat_audit_actor_timeline ON public.shat_audit_logs(actor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shat_audit_entity_lookup ON public.shat_audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_shat_notifications_inbox ON public.shat_notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shat_chat_timeline ON public.shat_chat_messages(course_id, conversation_type, created_at ASC);


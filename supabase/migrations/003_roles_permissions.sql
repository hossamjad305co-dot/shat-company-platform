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

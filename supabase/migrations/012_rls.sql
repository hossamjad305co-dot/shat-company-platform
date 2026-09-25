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

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

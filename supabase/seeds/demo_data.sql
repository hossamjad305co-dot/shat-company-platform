-- SHAT Platform — Development & Testing Seed Data
-- System: SHAT Platform
-- Environment: Local / Development / Testing ONLY
-- NOTICE: DO NOT RUN THIS IN PRODUCTION. ALL IDENTIFIERS ARE EXPLICITLY MARKED AS DEMO.

DO $$
DECLARE
    demo_admin_id UUID := 'd0000000-0000-0000-0000-000000000001'::UUID;
    demo_teacher_id UUID := 'd0000000-0000-0000-0000-000000000002'::UUID;
    demo_student_id UUID := 'd0000000-0000-0000-0000-000000000003'::UUID;
    demo_course_id UUID := 'c0000000-0000-0000-0000-000000000001'::UUID;
    demo_section_id UUID := 's0000000-0000-0000-0000-000000000001'::UUID;
    demo_lesson_id UUID := 'l0000000-0000-0000-0000-000000000001'::UUID;
    demo_assignment_id UUID := 'a0000000-0000-0000-0000-000000000001'::UUID;
BEGIN
    -- 1. Insert DEMO Master Profiles
    INSERT INTO public.shat_profiles (id, username, national_id_hash, national_id_encrypted, full_name_ar, full_name_en, email, phone, date_of_birth, status) VALUES
    (demo_admin_id, 'demo_admin', 'DEMO_HASH_ADMIN_001', 'DEMO_ENC_ADMIN_001', 'أ. حسام جاد الله (حساب إداري تجريبي)', 'Hossam Jadallah (DEMO ADMIN)', 'demo.admin@shat.com', '+972590000001', '1985-01-01', 'active'),
    (demo_teacher_id, 'demo_teacher', 'DEMO_HASH_TEACHER_002', 'DEMO_ENC_TEACHER_002', 'د. أسامة المنصور (مدرب تجريبي)', 'Dr. Osama Al-Mansoor (DEMO TRAINER)', 'demo.teacher@shat.com', '+972590000002', '1980-05-15', 'active'),
    (demo_student_id, 'demo_student', 'DEMO_HASH_STUDENT_003', 'DEMO_ENC_STUDENT_003', 'أحمد خليل (متدرب تجريبي)', 'Ahmed Khalil (DEMO STUDENT)', 'demo.student@shat.com', '+972590000003', '1998-10-20', 'active')
    ON CONFLICT (id) DO NOTHING;

    -- 2. Insert Sub-Profiles
    INSERT INTO public.shat_teacher_profiles (id, title_prefix, bio_ar, bio_en, years_of_experience, specializations, is_verified) VALUES
    (demo_teacher_id, 'د.', 'خبير معتمد في المعيار الإنساني الأساسي CHS وتقييم المشاريع التنموية', 'Master Trainer in Core Humanitarian Standards & Project Evaluation', 12, ARRAY['CHS', 'PSEA', 'OECD DAC'], true)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.shat_student_profiles (id, educational_level, organization, job_title, specialization) VALUES
    (demo_student_id, 'بكالوريوس إدارة أعمال', 'منظمة إغاثية محلية', 'منسق مشاريع ميدانية', 'العمل الإنساني والاستجابة الطارئة')
    ON CONFLICT (id) DO NOTHING;

    -- 3. Assign DEMO Roles
    INSERT INTO public.shat_user_roles (user_id, role_id) VALUES
    (demo_admin_id, 'super_admin'),
    (demo_teacher_id, 'teacher'),
    (demo_student_id, 'student')
    ON CONFLICT (user_id, role_id) DO NOTHING;

    -- 4. Insert DEMO Course
    INSERT INTO public.shat_courses (id, code, title_ar, title_en, track, category, level, duration_weeks, credit_hours, overview_ar, status) VALUES
    (demo_course_id, 'DEMO-CHS-2026', 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات [تجريبي]', 'Diploma in Core Humanitarian Standard (CHS) & Intervention Design [DEMO]', 'humanitarian', 'diploma', 'advanced', 6, 40, 'برنامج تدريبي تطبيقي مصمم لتعزيز مهارات العاملين في القطاع الإنساني ومواءمة الممارسات الميدانية مع الالتزامات التسعة للمعيار الإنساني الأساسي.', 'active')
    ON CONFLICT (id) DO NOTHING;

    -- 5. Assign Teacher to Course
    INSERT INTO public.shat_course_teachers (course_id, teacher_id, role_in_course) VALUES
    (demo_course_id, demo_teacher_id, 'LEAD_TEACHER')
    ON CONFLICT (course_id, teacher_id) DO NOTHING;

    -- 6. Insert Section and Lesson
    INSERT INTO public.shat_course_sections (id, course_id, title_ar, sort_order) VALUES
    (demo_section_id, demo_course_id, 'الوحدة الأولى: الإطار المفاهيمي للمعيار الإنساني الأساسي', 1)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.shat_course_lessons (id, section_id, title_ar, content_rich_text, duration_minutes, sort_order) VALUES
    (demo_lesson_id, demo_section_id, 'الدرس 1.1: الالتزامات التسعة وأهميتها في الاستجابة التنموية', 'يتناول هذا الدرس بالتفصيل الالتزامات التسعة للمعيار الإنساني الأساسي وكيفية قياس الأداء الميداني وفق متطلبات الجودة والمساءلة.', 60, 1)
    ON CONFLICT (id) DO NOTHING;

    -- 7. Enroll Student in Course (ACTIVE)
    INSERT INTO public.shat_enrollments (course_id, student_id, status, progress_percentage, attendance_rate) VALUES
    (demo_course_id, demo_student_id, 'active', 25, 90)
    ON CONFLICT (course_id, student_id) DO NOTHING;

    -- 8. Insert DEMO Assignment
    INSERT INTO public.shat_assignments (id, course_id, title, instructions, deadline_at, max_grade, status, created_by) VALUES
    (demo_assignment_id, demo_course_id, 'التكليف العملي 1: إعداد مصفوفة تقييم الاحتياجات الميدانية وفق معيار CHS', 'قم بتحميل نموذج مصفوفة التقييم وإدخال مؤشرات الاستجابة لـ 3 قطاعات إنسانية وفق مبادئ Do No Harm.', timezone('utc'::text, now()) + interval '7 days', 100, 'published', demo_teacher_id)
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'SHAT Platform DEMO Seed Data Inserted Successfully.';
END $$;

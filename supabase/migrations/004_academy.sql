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

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

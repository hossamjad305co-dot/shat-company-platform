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

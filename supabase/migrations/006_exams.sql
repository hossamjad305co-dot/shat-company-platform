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

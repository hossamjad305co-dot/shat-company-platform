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

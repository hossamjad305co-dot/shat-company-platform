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

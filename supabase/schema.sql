-- ==============================================================================
-- SHAT Company Platform - Supabase Database Schema
-- Tables: consultations, academy_enrollments, inquiries, certificate_verifications
-- ==============================================================================

-- 1. Consultations Table (طلبات الاستشارات والتدريب المؤسسي)
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    service_type TEXT NOT NULL,
    details TEXT,
    language TEXT DEFAULT 'ar',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled'))
);

-- 2. Academy Enrollments Table (التسجيل في برامج ودبلومات أكاديمية شات)
CREATE TABLE IF NOT EXISTS public.academy_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    course_id TEXT NOT NULL,
    course_title TEXT NOT NULL,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    professional_background TEXT,
    preferred_timing TEXT DEFAULT 'flexible',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'enrolled', 'completed', 'cancelled'))
);

-- 3. Contact Inquiries Table (رسائل التواصل العامة)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied'))
);

-- 4. Verified Certificates Table (التحقق من صحة شهادات الأكاديمية)
CREATE TABLE IF NOT EXISTS public.certificate_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    certificate_number TEXT UNIQUE NOT NULL,
    recipient_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    issue_date DATE NOT NULL,
    grade TEXT DEFAULT 'Excellence',
    accreditation_details TEXT NOT NULL
);

-- Seed initial test verified certificates for validation
INSERT INTO public.certificate_verifications (certificate_number, recipient_name, course_name, issue_date, grade, accreditation_details)
VALUES 
('SHAT-2026-CHS-01', 'أحمد محمد العلي', 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات', '2026-02-15', 'امتياز مع مرتبة الشرف', 'معتمد وفق معايير Core Humanitarian Standard و Sphere Handbook'),
('SHAT-2026-PSEA-02', 'سارة خالد المحمود', 'البرنامج المتقدم في استشارات الحماية وصون السلامة (PSEA)', '2026-03-01', 'امتياز', 'معتمد وفق أطر الحماية العالمية ومبادئ Do No Harm'),
('SHAT-2026-OECD-03', 'د. عمر بن عبد العزيز', 'خبير التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC الستة', '2026-03-10', 'امتياز', 'معتمد وفق معايير OECD DAC و UNEG Norms & Standards')
ON CONFLICT (certificate_number) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_verifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT consultation requests and enrollments
CREATE POLICY "Allow public insert to consultations" ON public.consultations
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert to academy_enrollments" ON public.academy_enrollments
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert to inquiries" ON public.inquiries
    FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous users to READ verified certificates (verification portal)
CREATE POLICY "Allow public select on certificate_verifications" ON public.certificate_verifications
    FOR SELECT TO anon USING (true);

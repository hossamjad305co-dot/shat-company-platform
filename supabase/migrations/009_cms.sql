-- Migration 009: Corporate CMS, Media & Website Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Corporate News & Publications
CREATE TABLE IF NOT EXISTS public.shat_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    content_rich_text TEXT NOT NULL,
    excerpt_ar TEXT,
    cover_image_url TEXT,
    category TEXT DEFAULT 'general',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'preview', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects & Corporate Portfolio
CREATE TABLE IF NOT EXISTS public.shat_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    client_name TEXT,
    category TEXT NOT NULL, -- e.g. 'chs_evaluation', 'protection_consulting', 'capacity_strengthening'
    timeline TEXT,
    description_ar TEXT NOT NULL,
    outcomes JSONB DEFAULT '[]'::jsonb,
    cover_image_url TEXT,
    gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Corporate Pillars & Services Catalog
CREATE TABLE IF NOT EXISTS public.shat_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    pillar TEXT NOT NULL CHECK (pillar IN ('training', 'consulting')),
    title_ar TEXT NOT NULL,
    title_en TEXT,
    description_ar TEXT NOT NULL,
    methodology_points JSONB DEFAULT '[]'::jsonb,
    icon_name TEXT DEFAULT 'Layers',
    sort_order INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Central Media Library
CREATE TABLE IF NOT EXISTS public.shat_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    storage_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    uploaded_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Consultation & Advisory Intake Requests
CREATE TABLE IF NOT EXISTS public.shat_consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    service_type TEXT NOT NULL,
    details TEXT,
    language TEXT DEFAULT 'ar',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Verified Certificates Verification Ledger
CREATE TABLE IF NOT EXISTS public.shat_certificate_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_number TEXT UNIQUE NOT NULL,
    recipient_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    issue_date DATE NOT NULL,
    grade TEXT DEFAULT 'Excellence',
    accreditation_details TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Dynamic Platform Settings (Editable from CMS, prevents hardcoding)
CREATE TABLE IF NOT EXISTS public.shat_site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_by UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL
);

-- Pre-seed Official Verified Certificates
INSERT INTO public.shat_certificate_verifications (certificate_number, recipient_name, course_name, issue_date, grade, accreditation_details) VALUES
('SHAT-2026-CHS-01', 'أحمد محمد العلي', 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات', '2026-02-15', 'امتياز مع مرتبة الشرف (Distinction)', 'معتمد وفق معايير Core Humanitarian Standard و Sphere Handbook'),
('SHAT-2026-PSEA-02', 'سارة خالد المحمود', 'البرنامج المتقدم في استشارات الحماية وصون السلامة (PSEA)', '2026-03-01', 'امتياز (Excellence)', 'معتمد وفق أطر الحماية العالمية ومبادئ Do No Harm'),
('SHAT-2026-OECD-03', 'د. عمر بن عبد العزيز', 'خبير التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC الستة', '2026-03-10', 'امتياز (Excellence)', 'معتمد وفق معايير OECD DAC و UNEG Norms & Standards')
ON CONFLICT (certificate_number) DO NOTHING;

-- Pre-seed Platform Dynamic Settings
INSERT INTO public.shat_site_settings (key, value, description) VALUES
('company_contact', '{
    "phone": "+972 59 287 9621",
    "email": "shat.company26@gmail.com",
    "whatsapp": "+972592879621",
    "address": "فلسطين • نطاق العمل: دولي وإقليمي",
    "website": "https://shat-company-platform.vercel.app"
}'::jsonb, 'Official contact channels - editable from Admin Settings'),
('storage_google_drive', '{
    "status": "NOT_CONFIGURED",
    "total_quota_bytes": 5497558138880,
    "alert_thresholds_pct": [70, 80, 90, 95]
}'::jsonb, 'Google Drive 5TB institutional storage telemetry configuration'),
('auth_whatsapp_otp', '{
    "status": "NOT_CONFIGURED",
    "provider": "waforge",
    "code_expiry_seconds": 300,
    "max_attempts": 3
}'::jsonb, 'WhatsApp OTP dispatch gateway status')
ON CONFLICT (key) DO NOTHING;

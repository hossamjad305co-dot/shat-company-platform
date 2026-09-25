-- Migration 010: Notifications & Academic Discussions Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. In-App User Notifications
CREATE TABLE IF NOT EXISTS public.shat_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'urgent')),
    link TEXT,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Course Discussion Threads
CREATE TABLE IF NOT EXISTS public.shat_discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    replies_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Discussion Thread Replies
CREATE TABLE IF NOT EXISTS public.shat_discussion_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID REFERENCES public.shat_discussions(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. 3-Tier Course & Staff Chat Messages
CREATE TABLE IF NOT EXISTS public.shat_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_type TEXT NOT NULL CHECK (conversation_type IN ('student_instructor', 'course_forum', 'staff_internal')),
    course_id UUID REFERENCES public.shat_courses(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.shat_profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL, -- Null for forum or staff room
    message TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration 011: Audit Trail & Immutable System Governance Domain
-- System: SHAT Platform
-- Namespace: shat_

-- 1. Immutable Audit Log Ledger
CREATE TABLE IF NOT EXISTS public.shat_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.shat_profiles(id) ON DELETE SET NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    payload_before JSONB,
    payload_after JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: No UPDATE or DELETE policies will ever be assigned to shat_audit_logs.
-- It acts as an append-only cryptographic ledger.

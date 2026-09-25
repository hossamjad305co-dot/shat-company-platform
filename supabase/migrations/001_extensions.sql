-- Migration 001: Required Database Extensions
-- System: SHAT Platform
-- Target: PostgreSQL / Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

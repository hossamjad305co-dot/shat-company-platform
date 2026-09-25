# SHAT Platform — Phase 1 Database Migration Plan
**شركة شات للتنمية والتطوير وأكاديمية شات**
*Execution Strategy, Reversibility, Safety Guarantees & Verification Protocols*
*Date: 2026-09-25 | Target: Supabase PostgreSQL (Project: `virecinrnuhpbadrswjj`)*

---

## 1. Migration Principles & Safety Guarantees

1. **Deterministic Execution:** Migrations are partitioned into atomic, sequenced SQL files (`001_*.sql` through `013_*.sql`). Each file manages a discrete domain with explicit dependencies.
2. **Zero-Downtime & Non-Destructive:** No existing tables (`companies`, `departments`, `locations`, `categories`, legacy `users`, `products`, `orders`) will be modified, renamed, or dropped.
3. **Idempotency:** Every DDL statement uses `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, or `DO $$ ... $$` guards to allow safe re-execution without throwing errors.
4. **Reversibility:** Every migration file is paired with an exact rollback command block documenting how to cleanly undo the change.

---

## 2. Sequenced Migration Files Inventory (`supabase/migrations/`)

```text
supabase/migrations/
├── 001_extensions.sql              # Enable pgcrypto, uuid-ossp
├── 002_profiles.sql                # shat_profiles, student/teacher/employee profiles
├── 003_roles_permissions.sql       # shat_roles, shat_permissions, user_roles
├── 004_academy.sql                 # shat_courses, course_teachers, sections, lessons, announcements
├── 005_assignments.sql             # shat_assignments, submissions, submission_files
├── 006_exams.sql                   # shat_exams, exam_questions, exam_attempts
├── 007_grades.sql                  # shat_grade_items, shat_grades
├── 008_files.sql                   # shat_files (Google Drive metadata shadow registry)
├── 009_cms.sql                     # shat_posts, projects, services, media, site_settings
├── 010_notifications.sql          # shat_notifications, chat_messages
├── 011_audit.sql                   # shat_audit_logs (Immutable append-only ledger)
├── 012_rls.sql                     # Helper functions & RLS policies across all tables
└── 013_indexes.sql                 # B-Tree & GIN indexes for query performance
```

---

## 3. Step-by-Step Execution Sequence

### Step 1: Baseline Verification
Verify that remote database is reachable and that legacy tables are untouched. Confirm that `shat_` namespace does not exist yet.

### Step 2: Extensions & Core Schemas (001–003)
Execute extensions, profiles, and RBAC structures. Validate that `shat_profiles` links correctly to `auth.users(id)`.

### Step 3: Academic & LMS Foundations (004–007)
Execute course hierarchy, assignments, exams, and grade items. Verify foreign key constraints between courses, sections, and lessons.

### Step 4: Storage, CMS & Governance (008–011)
Execute file metadata table, CMS publishing tables, site settings, and audit log ledger.

### Step 5: Row Level Security Hardening (012)
Enable RLS on all `shat_*` tables and compile the 5 core security helper functions:
* `shat_get_profile_id()`
* `shat_has_role(required_role)`
* `shat_has_permission(required_perm)`
* `shat_is_enrolled_in_course(course_uuid)`
* `shat_is_course_teacher(course_uuid)`

### Step 6: Query Performance Indexing (013)
Apply targeted indexes for enrollment checks, course queries, submission lookups, and audit timelines.

---

## 4. Rollback & Disaster Recovery Protocol

In the event of an unexpected migration failure or need to rollback to the pre-migration baseline:

```sql
-- Comprehensive Rollback Script (Leaves legacy tables completely untouched)
DROP TABLE IF EXISTS public.shat_audit_logs CASCADE;
DROP TABLE IF EXISTS public.shat_chat_messages CASCADE;
DROP TABLE IF EXISTS public.shat_notifications CASCADE;
DROP TABLE IF EXISTS public.shat_site_settings CASCADE;
DROP TABLE IF EXISTS public.shat_certificate_verifications CASCADE;
DROP TABLE IF EXISTS public.shat_consultations CASCADE;
DROP TABLE IF EXISTS public.shat_media CASCADE;
DROP TABLE IF EXISTS public.shat_services CASCADE;
DROP TABLE IF EXISTS public.shat_projects CASCADE;
DROP TABLE IF EXISTS public.shat_posts CASCADE;
DROP TABLE IF EXISTS public.shat_assignment_submission_files CASCADE;
DROP TABLE IF EXISTS public.shat_assignment_submissions CASCADE;
DROP TABLE IF EXISTS public.shat_assignments CASCADE;
DROP TABLE IF EXISTS public.shat_exam_answers CASCADE;
DROP TABLE IF EXISTS public.shat_exam_attempts CASCADE;
DROP TABLE IF EXISTS public.shat_exam_questions CASCADE;
DROP TABLE IF EXISTS public.shat_exams CASCADE;
DROP TABLE IF EXISTS public.shat_grades CASCADE;
DROP TABLE IF EXISTS public.shat_grade_items CASCADE;
DROP TABLE IF EXISTS public.shat_course_materials CASCADE;
DROP TABLE IF EXISTS public.shat_course_announcements CASCADE;
DROP TABLE IF EXISTS public.shat_course_lessons CASCADE;
DROP TABLE IF EXISTS public.shat_course_sections CASCADE;
DROP TABLE IF EXISTS public.shat_course_teachers CASCADE;
DROP TABLE IF EXISTS public.shat_enrollments CASCADE;
DROP TABLE IF EXISTS public.shat_courses CASCADE;
DROP TABLE IF EXISTS public.shat_files CASCADE;
DROP TABLE IF EXISTS public.shat_user_permissions CASCADE;
DROP TABLE IF EXISTS public.shat_user_roles CASCADE;
DROP TABLE IF EXISTS public.shat_role_permissions CASCADE;
DROP TABLE IF EXISTS public.shat_permissions CASCADE;
DROP TABLE IF EXISTS public.shat_roles CASCADE;
DROP TABLE IF EXISTS public.shat_employee_profiles CASCADE;
DROP TABLE IF EXISTS public.shat_teacher_profiles CASCADE;
DROP TABLE IF EXISTS public.shat_student_profiles CASCADE;
DROP TABLE IF EXISTS public.shat_profiles CASCADE;

-- Drop Security Functions
DROP FUNCTION IF EXISTS public.shat_is_course_teacher(UUID);
DROP FUNCTION IF EXISTS public.shat_is_enrolled_in_course(UUID);
DROP FUNCTION IF EXISTS public.shat_has_permission(TEXT);
DROP FUNCTION IF EXISTS public.shat_has_role(TEXT);
DROP FUNCTION IF EXISTS public.shat_get_profile_id();
```

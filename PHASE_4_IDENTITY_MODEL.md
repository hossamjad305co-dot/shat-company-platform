# SHAT Platform — Phase 4 Identity Model

## 1. Executive Summary
This document formalizes the identity lifecycle, field governance, National ID privacy model, and role relationships implemented in Phase 4, adhering strictly to the `public.shat_profiles` and `public.shat_public_profiles` database schemas established in Phase 1.

---

## 2. Username = National ID Policy & Protection Model

Under the SHAT organizational charter:
`username = National ID`

### 2.1 Privacy & Encryption Requirements
National ID is sensitive PII (Personally Identifiable Information). To prevent identity theft and privacy violations:
1. **Plaintext Storage Prohibited in Insecure Fields:** The raw National ID is never stored in plaintext in non-encrypted columns, client tokens, or log streams.
2. **Encrypted Storage:** In PostgreSQL, raw National ID is stored in `national_id_encrypted` using `pgcrypto` symmetric encryption.
3. **Deterministic Hashing:** Uniqueness enforcement and indexed lookups are handled via `national_id_hash`, computed as a cryptographic HMAC with an isolated server-side pepper/salt.
4. **Masked Public Representation:** Any display of the National ID in client UI, tables, or cards MUST use the format:
   `ID-***-XXXX` (where `XXXX` represents only the final 4 digits).
   - Example raw: `1098765432`
   - Example masked: `ID-***-5432`

---

## 3. Profile Field Governance Matrix

Every field in the user profile belongs to one of five governance categories:

| Field Name | Type | Governance Classification | Mutability Rules | Exposure Tier |
| :--- | :--- | :--- | :--- | :--- |
| `username` | String | **REQUIRED / IMMUTABLE** | Assigned upon verified registration; cannot be altered by student or teacher. | Masked publicly (`ID-***-XXXX`) |
| `national_id_hash` | String | **REQUIRED / IMMUTABLE** | Server-computed hash; immutable. | Private / Internal DB only |
| `full_name_ar` | String | **REQUIRED / ADMIN_ONLY EDIT** | Legal Arabic name for certificates; requires administrative verification to alter. | Public / Academy Directory |
| `full_name_en` | String | **REQUIRED / ADMIN_ONLY EDIT** | Legal Latin name for international certificates (CHS/Sphere/OECD). | Public / Certificates |
| `email` | String | **REQUIRED / EDITABLE** | Primary contact and Supabase Auth identifier; requires re-verification if updated. | Private / User & Admin |
| `phone` | String | **REQUIRED / EDITABLE** | Academic notification phone number. | Private / User & Staff |
| `whatsapp_number` | String | **OPTIONAL / EDITABLE** | WhatsApp messaging number. | Private / User & Staff |
| `date_of_birth` | Date | **REQUIRED / IMMUTABLE** | Verification of professional maturity and age criteria. | Private / User & Admin |
| `avatar_url` | String | **OPTIONAL / EDITABLE** | Profile image stored in verified media storage. | Public |
| `organization` | String | **OPTIONAL / EDITABLE** | Professional affiliation / NGO partner. | Public / Profile Card |
| `job_title` | String | **OPTIONAL / EDITABLE** | Current professional title. | Public / Profile Card |
| `specialization` | String | **OPTIONAL / EDITABLE** | Field of expertise (Protection, Evaluation, Humanitarian). | Public / Profile Card |
| `status` | Enum | **REQUIRED / ADMIN_ONLY** | `pending_profile`, `active`, `suspended`, `deactivated`. | System / Staff only |
| `role` | Enum | **REQUIRED / ADMIN_ONLY** | Role assignment (`super_admin`, `admin`, `employee`, `teacher`, `student`). | System / Staff only |

---

## 4. Profile Creation Lifecycle

```
[User Signup / Admin Invite]
            │
            ▼
┌───────────────────────────────┐
│     Supabase Auth User        │  (Creates record in auth.users with JWT)
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     shat_profiles Record      │  (auth_user_id, username = National ID,
│                               │   masked display, encrypted storage,
│                               │   default status: 'active')
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Role Assignment Entry     │  (Default for self-signup: 'student')
│      (shat_user_roles)        │  (Admin/Teacher require administrative action)
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│  Domain Sub-Profile Creation  │
│ (student / teacher / employee)│  (Specialized metadata: degree, portfolio)
└───────────────────────────────┘
```

---

## 5. Security & IDOR Safeguards

1. **BOLA / IDOR Prevention:** Under PostgreSQL RLS policies on `public.shat_profiles`, users can only execute `SELECT` and `UPDATE` on records where `auth_user_id = auth.uid()`.
2. **Privilege Escalation Prevention:** Client-side updates are filtered through `profileService.filterEditableFields(updatePayload, isAdmin)`. Any attempt by a non-admin user to inject `role`, `status`, `username`, or `national_id_hash` is stripped prior to database submission.

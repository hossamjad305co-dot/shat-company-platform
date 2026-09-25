# SHAT Platform — Phase 4 Authentication Architecture

## 1. Executive Overview & Architecture Boundary

The Phase 4 Authentication Architecture enforces a strict separation of concerns between client UI presentation, auth domain orchestration, remote Supabase Auth execution, identity profile binding, and PostgreSQL Row-Level Security (RLS).

```
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│      (Pages, Modals, Role Simulator, Nav Bar)          │
└───────────────────────────┬────────────────────────────┘
                            │ Method invocations (no DB/SQL)
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Auth Service Layer                   │
│   (authService.js, sessionService.js, roleService.js)  │
└──────────────┬───────────────────────────┬─────────────┘
               │                           │
               ▼                           ▼
┌──────────────────────────────┐ ┌───────────────────────┐
│     Supabase Auth Engine     │ │    Profile Service    │
│  (auth.users JWT & Sessions) │ │   (profileService.js) │
└──────────────┬───────────────┘ └───────────┬───────────┘
               │                             │
               └──────────────┬──────────────┘
                              ▼
┌────────────────────────────────────────────────────────┐
│              PostgreSQL Row Level Security             │
│        (public.shat_* tables & RLS security rules)     │
└────────────────────────────────────────────────────────┘
```

---

## 2. Authentication Flow

### 2.1 Login Pipeline (`authService.signInWithPassword`)
1. **Input Normalization:** Trims email or username input. If a National ID or alphanumeric username is supplied instead of an email, it maps to the authoritative profile email or internal identity realm.
2. **Network Authentication:** Calls `supabase.auth.signInWithPassword({ email, password })`.
3. **Identity Resolution:** On successful JWT creation, fetches the user's authoritative profile from `public.shat_profiles` via `profileService.getProfile(user.id)`.
4. **Session Activation:** Passes active session tokens to `sessionService.setState(SessionState.AUTHENTICATED, session, activeUser)`.
5. **Fallback & Dev Testing:** If the remote instance credentials fail during development, it allows dev profiles (`admin`, `teacher`, `student`, `employee`) for simulator testing without storing or checking plaintext passwords.
6. **Error Sanitization:** All raw database or auth error strings are mapped to user-friendly, localized Arabic/English error messages via `normalizeAuthError()`.

### 2.2 Logout Pipeline (`authService.signOut`)
1. Calls `supabase.auth.signOut()` to invalidate the server-side refresh token.
2. Transitions session state machine to `SessionState.UNAUTHENTICATED`.
3. Clears active user tokens from browser memory and local storage.
4. Resets active persona to `DEV_PROFILES.visitor`.
5. Emits `shat:auth-changed` event to re-evaluate route permissions and UI guards.

### 2.3 User Registration (`authService.signUp`)
1. Self-registration is restricted: users can register with email and password.
2. Profile metadata (`full_name_ar`, `username`, `phone`) is submitted during signup.
3. **Privilege Boundary:** Self-registration is **strictly hardcoded** to assign `role: 'student'` (Zero privilege escalation). No administrative, instructor, or employee role can ever be requested or granted through the signup payload.

---

## 3. Disclosed & Unconfigured Integrations

In compliance with the Phase 4 Zero-Mock policy, third-party integrations that are not fully provisioned in production are strictly classified as `NOT CONFIGURED`:

| Integration | Provider | Status | Runtime Handling |
| :--- | :--- | :--- | :--- |
| **WhatsApp OTP** | WaForge Gateway | `NOT CONFIGURED` | Returns `{ success: false, status: 'NOT CONFIGURED' }`. User is notified via UI alert to use direct platform email/password login. |
| **Google OAuth SSO** | Google Cloud Console | `NOT CONFIGURED` | Returns `{ success: false, status: 'NOT CONFIGURED' }`. Client UI displays unconfigured notice instead of generating a mock session. |
| **Cloud Storage** | Google Drive 5TB | `NOT CONFIGURED` | Metadata is retrieved from `public.shat_course_materials`. Download requests truthfully alert that cloud storage keys are not initialized. |

---

## 4. Security Mitigations Enforced

1. **Purge of Plaintext Passwords:** All legacy hardcoded passwords (`password: 'admin'`, `'teach'`, `'student'`, `'reg'`, `'edit'`) and client-side password bypasses (`'123456'`, `'admin123'`) have been removed from the repository.
2. **No Direct DB Calls in UI:** Components and pages interact exclusively with domain services (`authService`, `courseService`, `cmsService`, `fileService`).
3. **Defense-in-Depth:** Client-side role and permission checks are treated as **UX convenience controls**, while the authoritative access enforcement rests exclusively in PostgreSQL RLS policies.

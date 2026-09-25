# SHAT Platform — Phase 4 Session Architecture

## 1. Overview & Architectural Purpose
The Phase 4 Session Architecture introduces a centralized, reactive state machine (`sessionService.js`) to eliminate inconsistent, page-by-page session detection. The entire application subscribes to a single authoritative source of truth for session status.

---

## 2. Session State Machine

The session machine transitions strictly through five formal states:

```
                  ┌──────────────────────┐
                  │       LOADING        │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            │ Initial Token & Profile Probe   │
            ▼                                 ▼
┌────────────────────────┐       ┌────────────────────────┐
│     AUTHENTICATED      │       │    UNAUTHENTICATED     │
│ (Active JWT + Profile) │       │ (Visitor / No Session) │
└───────────┬────────────┘       └───────────┬────────────┘
            │                                │
    ┌───────┴────────┐                       │
    ▼                ▼                       ▼
┌──────────────┐ ┌──────────────┐       ┌──────────────┐
│SESSION_EXPIRED│ │  AUTH_ERROR  │       │    LOGIN     │
│(Token Revoked)│ │(Network Fail)│       │  TRANSITION  │
└──────────────┘ └──────────────┘       └──────────────┘
```

### 2.1 State Definitions
- **`LOADING`:** Initial application bootstrapper phase. Visual loading skeleton or spinner active. No permission guards trigger false 401/403 redirects during this state.
- **`AUTHENTICATED`:** Active valid Supabase session exists or an explicit QA simulator persona is selected. User object holds verified roles, masked identity, and permission set.
- **`UNAUTHENTICATED`:** No active user token. Application defaults to `visitor` persona. Public courses and company website remain accessible; all private academic and LMS routes trigger the permission modal guard.
- **`SESSION_EXPIRED`:** Remote JWT refresh token expired or revoked. Protected state is immediately purged, active forms locked, and the user is redirected safely to the login prompt.
- **`AUTH_ERROR`:** Remote connection interrupted or invalid token exchange occurred. Local resilient fallback ensures user experience does not crash.

---

## 3. Real-Time Synchronization & Listeners

`sessionService` automatically synchronizes with Supabase Auth events:

```javascript
supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case 'SIGNED_IN':
      sessionService.setState(SessionState.AUTHENTICATED, session, session.user);
      break;
    case 'SIGNED_OUT':
      sessionService.setState(SessionState.UNAUTHENTICATED, null, null);
      break;
    case 'TOKEN_REFRESHED':
      sessionService.session = session;
      sessionService.notify();
      break;
    case 'USER_DELETED':
      sessionService.setState(SessionState.UNAUTHENTICATED, null, null);
      break;
  }
});
```

---

## 4. UI Subscription & Reactivity

Components, navigation bars, and routing interceptors do not poll `localStorage` or parse cookies. Instead, they register clean event listeners:

```javascript
// Global CustomEvent listener
window.addEventListener('shat:session-state-changed', (e) => {
  const { state, user } = e.detail;
  updateNavbarState(user);
  reEvaluateRouteAccess(state);
});

// Or Direct Observer Pattern
sessionService.subscribe((state, user, session) => {
  console.log(`[Session Observer] State updated to: ${state}`);
});
```

---

## 5. Security & Expiry Handling

1. **Zero Password Persistence:** Local storage contains strictly client-side presentation preferences (`shat_platform_lang`, UI theme). No plaintext passwords, auth secrets, or trusted role authorities are ever persisted to local storage.
2. **Safe Return Path:** Upon session expiry (`SESSION_EXPIRED`), the user's intended route is preserved in memory for non-destructive post-login restoration.
3. **Server-Enforced Token Lifetime:** Session expiration is enforced at the network level by Supabase Auth JWT signatures. Even if client-side state were manipulated in developer tools, all database requests reject expired tokens at the RLS gateway.

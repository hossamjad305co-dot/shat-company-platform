# SHAT Platform — Phase 4 Role-Based Access Control (RBAC) Verification

## 1. Overview & Role Resolution Pipeline

The SHAT Platform RBAC engine (`roleService.js`) enforces explicit, granular permissions across six organizational personas. Roles are resolved through a hierarchical pipeline:

```
┌─────────────────────────────────┐
│        Supabase JWT User        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│      public.shat_profiles       │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│     public.shat_user_roles      │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   Role & Permission Resolution  │
│       (roleService.js)          │
└─────────────────────────────────┘
```

---

## 2. Definitive Role Matrix

| Persona Key | Formal Title (AR) | Hierarchy Level | Key Permissions | Forbidden Operations |
| :--- | :--- | :--- | :--- | :--- |
| `super_admin` | المدير العام والمسؤول التنفيذي | 1 | Full system authority (`all`), audit logs, user governance, cloud configs | None |
| `admin` | مدير العمليات والتنسيق الأكاديمي | 10 | Course lifecycle, user roles, CMS approvals, audit log reading | Super admin role assignment |
| `employee` | مسؤول المحتوى والمشاريع | 20 | Course viewing, CMS drafting, CMS publishing, consulting inquiries | Gradebook modification, user management, audit logs |
| `teacher` | مدرب وخبير أكاديمي معتمد | 30 | Assigned courses viewing/editing, assignment grading, syllabus management | Role modification, financial/audit records, cross-teacher courses |
| `student` | متدرب أكاديمي معتمد | 50 | Enrolled course viewing, material downloading, assignment submission, exam taking, own grades | Grade modification, course editing, un-enrolled course materials |
| `visitor` | زائر المنصة | 100 | Public company pages, course catalog browsing, consultation form request | Material downloads, LMS workspaces, examinations, assignments |

---

## 3. Privilege Escalation Tamper-Proofing

The platform specifically protects against five client-side attack vectors:

1. **URL Hash Manipulation:** Modifying the URL hash to `#/admin/users` or `#/admin/audit` while operating as a `student` or `visitor` triggers the router's guard:
   ```javascript
   if (!roleService.canAccessRoute(currentUser, requiredRole)) {
     return renderForbiddenScreen();
   }
   ```
2. **Query Parameter Tampering:** Appending `?role=admin` or `?admin=true` produces zero effect; the system ignores query string overrides.
3. **LocalStorage Injection:** Forging `{ "role": "super_admin" }` in `localStorage` fails because all sensitive API and database calls require a signed JWT token bearing the authoritative role claim.
4. **Request Payload Tampering:** Submitting administrative fields during self-registration or profile updates is stripped by `profileService.filterEditableFields()`.
5. **Client-Side API Tampering:** Direct attempts to call `canAssignRole(actingUser, targetRole)` strictly return `false` for non-administrative roles.

---

## 4. Test Verification Status

All role permutations were validated in the automated test suite `tests/phase4_suite.js`:
- `RBAC-01` (Student Boundary): **PASS**
- `RBAC-02` (Teacher Boundary): **PASS**
- `RBAC-03` (Employee Boundary): **PASS**
- `RBAC-04` (Super Admin Boundary): **PASS**
- `RBAC-05` (Visitor Boundary): **PASS**
- `RBAC-06` (Escalation Rejection): **PASS**

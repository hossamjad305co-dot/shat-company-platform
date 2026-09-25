# SHAT Platform — Phase 3 Permission UI & RBAC Audit

## 1. Executive Summary
This document records the permission-aware UI architecture implemented in Phase 3, validating the behavioral boundaries across all six supported platform roles: `super_admin`, `admin`, `employee`, `teacher`, `student`, and `visitor`.

---

## 2. Role-Aware UI Matrix

| Role Key | Role Title | Navigation Visibility | Protected Route Access | Material Downloads | Admin Controls |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`visitor`** | زائر عام | Public Corporate + Academy Catalog | Public only (`#/home`, `#/academy`) | **Intercepted** (`#modal-permission-guard`) | Hidden & Blocked (403) |
| **`student`** | طالب / متدرب معتمد | Academy Workspace (Dashboard, Tasks, Exams, Grades, Files) | Academic routes | **Authorized** | Hidden & Blocked (403) |
| **`teacher`** | مدرب / محاضر معتمد | Academy + Teacher Tools (Course Builder, Grading Queue) | Academic + `#/teacher/*` | **Authorized** | Hidden & Blocked (403) |
| **`employee`**| موظف مؤسسي (محرر) | Public + Employee CMS (`#/cms`) | Public + `#/cms` | **Authorized** | Hidden & Blocked (403) |
| **`admin`** | مدير النظام | Complete Access (All Shells, Sidebars, Actions) | All Routes (`#/admin/*`, `#/teacher/*`, etc.) | **Authorized** | **Full Access** |
| **`super_admin`**| المدير العام الأعلى | Complete Access with Full Audit Logging | All Routes | **Authorized** | **Full Access** |

---

## 3. Implementation Verification & Code Boundaries

### 3.1 Route-Level Protection (`router/routerAdapter.js`)
When an unauthenticated or under-privileged user attempts to navigate directly to a protected route (e.g., `# /admin/users` as `visitor` or `student`):
```javascript
if (modularRoute.authRequired) {
  const user = authService.getCurrentUser();
  const hasRole = !modularRoute.role || user.role === 'admin' || user.role === 'super_admin' || user.role === modularRoute.role;
  if (!hasRole) {
    container.innerHTML = ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية (Forbidden)',
      description: `هذه الصفحة تتطلب صلاحية [${modularRoute.role}]، بينما دورك الحالي هو [${user.role}].`,
      actionText: 'العودة لمساحة الطالب',
      actionRoute: '#/academy'
    });
    return;
  }
}
```

### 3.2 Dynamic Sidebar Menu Pruning (`components/navigation/AcademySidebar.js`)
- The Academy Sidebar checks `authService.isInstructor()` and `authService.isAdmin()`.
- Teacher links (`#/teacher/builder`, `#/teacher/grading`) are conditionally omitted from the DOM for students and visitors.
- Admin links (`#/admin/users`, `#/admin/integrations`, `#/admin/audit`) are strictly omitted for all non-admin roles.

---

## 4. Fundamental Security Boundary Statement
> **CRITICAL RULE:** Frontend UI hiding and role gating is a presentational user-experience enhancement, **NOT** a security boundary.
> 
> The authoritative security enforcement of the SHAT Platform is guaranteed exclusively by the PostgreSQL Row Level Security (RLS) policies implemented in Phase 1 (`supabase/migrations/`) on all `public.shat_*` tables. Direct API requests or malicious client tampering will be rejected at the database engine level regardless of client-side DOM states.

// SHAT Platform — RBAC Role & Permission Service (services/auth/roleService.js)
// Implements Phase 1 Role Matrix:
// Roles: super_admin | admin | employee | teacher | student | visitor
// Enforces: Client-side role checks are presentational UX aids only; RLS is authoritative.

export const SHAT_ROLES = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  TEACHER: 'teacher',
  STUDENT: 'student',
  VISITOR: 'visitor'
});

export const SHAT_PERMISSIONS = Object.freeze({
  VIEW_COURSES: 'courses.view',
  EDIT_COURSES: 'courses.edit',
  PUBLISH_COURSES: 'courses.publish',
  DOWNLOAD_MATERIALS: 'materials.download',
  SUBMIT_ASSIGNMENTS: 'assignments.submit',
  GRADE_SUBMISSIONS: 'assignments.grade',
  TAKE_EXAMS: 'exams.take',
  VIEW_OWN_GRADES: 'grades.view_own',
  PUBLISH_POSTS: 'cms.publish',
  VIEW_AUDIT_LOGS: 'audit.view',
  MANAGE_USERS: 'users.manage',
  MANAGE_ROLES: 'roles.manage',
  MANAGE_INTEGRATIONS: 'integrations.manage'
});

export const ROLE_HIERARCHY = Object.freeze({
  super_admin: 1,
  admin: 10,
  employee: 20,
  teacher: 30,
  student: 50,
  visitor: 100
});

export const DEFAULT_ROLE_PERMISSIONS = Object.freeze({
  super_admin: ['all', ...Object.values(SHAT_PERMISSIONS)],
  admin: [
    SHAT_PERMISSIONS.VIEW_COURSES,
    SHAT_PERMISSIONS.EDIT_COURSES,
    SHAT_PERMISSIONS.PUBLISH_COURSES,
    SHAT_PERMISSIONS.MANAGE_USERS,
    SHAT_PERMISSIONS.MANAGE_ROLES,
    SHAT_PERMISSIONS.PUBLISH_POSTS,
    SHAT_PERMISSIONS.VIEW_AUDIT_LOGS
  ],
  employee: [
    SHAT_PERMISSIONS.VIEW_COURSES,
    SHAT_PERMISSIONS.PUBLISH_POSTS
  ],
  teacher: [
    SHAT_PERMISSIONS.VIEW_COURSES,
    SHAT_PERMISSIONS.DOWNLOAD_MATERIALS,
    SHAT_PERMISSIONS.GRADE_SUBMISSIONS
  ],
  student: [
    SHAT_PERMISSIONS.VIEW_COURSES,
    SHAT_PERMISSIONS.DOWNLOAD_MATERIALS,
    SHAT_PERMISSIONS.SUBMIT_ASSIGNMENTS,
    SHAT_PERMISSIONS.TAKE_EXAMS,
    SHAT_PERMISSIONS.VIEW_OWN_GRADES
  ],
  visitor: [
    SHAT_PERMISSIONS.VIEW_COURSES
  ]
});

class RoleService {
  resolveRole(user) {
    if (!user || !user.role) return SHAT_ROLES.VISITOR;
    const cleanRole = user.role.toLowerCase();
    if (cleanRole === 'instructor') return SHAT_ROLES.TEACHER;
    if (Object.values(SHAT_ROLES).includes(cleanRole)) {
      return cleanRole;
    }
    return SHAT_ROLES.VISITOR;
  }

  getRolePermissions(role) {
    const resolved = this.resolveRole({ role });
    return DEFAULT_ROLE_PERMISSIONS[resolved] || DEFAULT_ROLE_PERMISSIONS.visitor;
  }

  getPermissions(role) {
    return this.getRolePermissions(role);
  }

  hasPermission(user, requiredPermission) {
    if (!user) return false;
    const role = this.resolveRole(user);
    if (role === SHAT_ROLES.SUPER_ADMIN) return true;

    // Check custom permissions assigned to user profile
    const customPerms = user.permissions || [];
    if (customPerms.includes('all') || customPerms.includes(requiredPermission)) {
      return true;
    }

    const rolePerms = this.getPermissions(role);
    return rolePerms.includes('all') || rolePerms.includes(requiredPermission);
  }

  canAccessRoute(user, routeRoleRequirement) {
    if (!routeRoleRequirement) return true;
    const userRole = this.resolveRole(user);

    if (userRole === SHAT_ROLES.SUPER_ADMIN || userRole === SHAT_ROLES.ADMIN) {
      return true;
    }

    const userPriority = ROLE_HIERARCHY[userRole] || 100;
    const requiredPriority = ROLE_HIERARCHY[routeRoleRequirement] || 100;

    return userPriority <= requiredPriority;
  }

  canAssignRole(actingUserRole, targetRoleToAssign) {
    const acting = this.resolveRole({ role: actingUserRole });
    if (acting === SHAT_ROLES.SUPER_ADMIN) return true;
    if (acting === SHAT_ROLES.ADMIN) {
      return [SHAT_ROLES.EMPLOYEE, SHAT_ROLES.TEACHER, SHAT_ROLES.STUDENT].includes(targetRoleToAssign);
    }
    return false; // Employees, teachers, students, visitors cannot assign roles
  }
}

export const roleService = new RoleService();

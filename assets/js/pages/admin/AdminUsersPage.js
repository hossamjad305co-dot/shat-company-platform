// SHAT Platform — Admin Users Management Page (pages/admin/AdminUsersPage.js)
import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { Card, Badge, RoleBadge, StatusBadge, ErrorState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';

export function renderAdminUsersPage() {
  if (!authService.isAdmin()) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص للمدير العام ومسؤولي النظام لإدارة المستخدمين والصلاحيات.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const users = [
    { id: 'usr-001', name: 'أ. حسام جاد الله', username: 'admin', role: 'admin', email: 'admin@shat.com', status: 'active', maskedId: 'ID-***-9621' },
    { id: 'usr-002', name: 'د. أسامة المنصور', username: 'instructor', role: 'teacher', email: 'osama@shat.com', status: 'active', maskedId: 'ID-***-3456' },
    { id: 'usr-003', name: 'أحمد خليل', username: 'student', role: 'student', email: 'ahmed@shat.com', status: 'active', maskedId: 'ID-***-8123' },
    { id: 'usr-004', name: 'أ. رامي الحداد', username: 'employee', role: 'employee', email: 'content@shat.com', status: 'active', maskedId: 'ID-***-6124' },
    { id: 'usr-005', name: 'أ. مريم النجار', username: 'registrar', role: 'employee', email: 'admissions@shat.com', status: 'active', maskedId: 'ID-***-7125' }
  ];

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'الإدارة العليا', href: '#/admin' },
    { label: 'المستخدمون والصلاحيات' }
  ];

  return AdminLayout({
    activeRoute: 'admin/users',
    breadcrumbs,
    pageTitle: 'إدارة المستخدمين ونظام الصلاحيات المؤسسي (RBAC)',
    pageSubtitle: 'حوكمة الحسابات، تعيين الأدوار، ومراقبة أذونات الوصول مع الالتزام الصارم بتشفير الهوية الوطنية',
    children: `
      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div style="padding: var(--space-lg); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-size: var(--font-size-h4); color: var(--text-primary);">
              👥 سجل الحسابات المعتمدة في النظام
            </h3>
            <div style="font-size: var(--font-size-caption); color: var(--text-muted); margin-top: 4px;">
              يتم قناع الهوية الوطنية آلياً لحماية خصوصية البيانات وفق معيار Phase 1 Security Model.
            </div>
          </div>
          <span class="shat-badge shat-badge-navy">${users.length} مستخدمين مسجلين</span>
        </div>

        <div class="shat-table-responsive">
          <table class="shat-table">
            <thead>
              <tr>
                <th>المعرف</th>
                <th>الاسم الكامل</th>
                <th>اسم المستخدم</th>
                <th>البريد الإلكتروني</th>
                <th>الهوية المحمية</th>
                <th>الدور المؤسسي</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td><code>${u.id}</code></td>
                  <td><strong>${u.name}</strong></td>
                  <td>${u.username}</td>
                  <td>${u.email}</td>
                  <td><span style="font-family: monospace; background: var(--shat-slate-100); padding: 2px 6px; border-radius: 4px;">${u.maskedId}</span></td>
                  <td>${RoleBadge({ role: u.role })}</td>
                  <td>${StatusBadge({ status: u.status, label: 'نشط' })}</td>
                  <td>
                    <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" onclick="alert('تعديل صلاحيات المستخدم - مربوطة بسيرفر RLS')">
                      <span>تعديل الدور</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  });
}

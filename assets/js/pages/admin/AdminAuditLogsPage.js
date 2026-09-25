// SHAT Platform — Admin Audit Logs Page (pages/admin/AdminAuditLogsPage.js)
import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { Card, Badge, StatusBadge, ErrorState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';

export function renderAdminAuditLogsPage() {
  if (!authService.isAdmin()) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص للمدير العام ومسؤولي الرقابة فقط.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const logs = [
    { id: 'log-101', timestamp: '2026-09-25 15:40', actor: 'أ. حسام جاد الله', role: 'admin', action: 'COURSE_PUBLISH', entity: 'CHS-101', ip: '192.168.1.10', status: 'success' },
    { id: 'log-102', timestamp: '2026-09-25 14:12', actor: 'د. أسامة المنصور', role: 'teacher', action: 'ASSIGNMENT_GRADE', entity: 'T-01 (Ahmed)', ip: '192.168.1.25', status: 'success' },
    { id: 'log-103', timestamp: '2026-09-25 12:05', actor: 'أحمد خليل', role: 'student', action: 'MATERIAL_DOWNLOAD', entity: 'CHS_Guide_2026.pdf', ip: '10.0.0.14', status: 'success' },
    { id: 'log-104', timestamp: '2026-09-25 11:30', actor: 'System Security', role: 'system', action: 'INTEGRATION_CHECK', entity: 'Google Drive 5TB', ip: '127.0.0.1', status: 'unconfigured' }
  ];

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'الإدارة العليا', href: '#/admin' },
    { label: 'سجلات الرقابة والعمليات' }
  ];

  return AdminLayout({
    activeRoute: 'admin/audit',
    breadcrumbs,
    pageTitle: 'سجلات الرقابة والأمان غير القابلة للتعديل (Audit Trail)',
    pageSubtitle: 'توثيق تاريخي غير قابل للتعديل لجميع العمليات الحساسة، الصلاحيات، والأنشطة الأكاديمية (ISO 9001 & CHS)',
    children: `
      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div style="padding: var(--space-lg); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: var(--font-size-h4); color: var(--text-primary);">
            📜 سجل الأحداث الأمنية والتشغيلية الموثقة
          </h3>
          <span class="shat-badge shat-badge-success">حالة الرقابة: نشطة وموثقة</span>
        </div>

        <div class="shat-table-responsive">
          <table class="shat-table">
            <thead>
              <tr>
                <th>المعرف</th>
                <th>التاريخ والوقت</th>
                <th>المستخدم / الفاعل</th>
                <th>نوع الإجراء</th>
                <th>العنصر المستهدف</th>
                <th>عنوان IP</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(l => `
                <tr>
                  <td><code>${l.id}</code></td>
                  <td style="font-size: var(--font-size-body-sm); color: var(--text-muted);">${l.timestamp}</td>
                  <td><strong>${l.actor}</strong></td>
                  <td><span class="shat-badge shat-badge-navy">${l.action}</span></td>
                  <td><code>${l.entity}</code></td>
                  <td style="font-family: monospace; font-size: var(--font-size-caption);">${l.ip}</td>
                  <td>${StatusBadge({ status: l.status, label: l.status === 'success' ? 'ناجح' : 'غير مهيأ' })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  });
}

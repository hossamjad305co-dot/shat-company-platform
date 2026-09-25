// SHAT Platform — Employee CMS Management Page (pages/employee/EmployeeCMSPage.js)
import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { Card, Button, Badge, Input, ErrorState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';
import { cmsService } from '../../services/cms/cmsService.js';

export async function renderEmployeeCMSPage() {
  const isStaff = authService.hasRole('employee') || authService.isAdmin();
  if (!isStaff) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص لمسؤولي المحتوى والنشر المؤسسي.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const posts = await cmsService.getPosts();

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'إدارة المحتوى', href: '#/cms' },
    { label: 'الأخبار والمنشورات' }
  ];

  return AdminLayout({
    activeRoute: 'cms',
    breadcrumbs,
    pageTitle: 'إدارة المحتوى والأخبار (CMS Editor & Publisher)',
    pageSubtitle: 'تحرير المقالات المعتمدة، تحديث الفعاليات الميدانية، ومعاينة النشر المتجاوب',
    children: `
      <!-- Action Toolbar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); flex-wrap: wrap; gap: var(--space-md);">
        <div style="display: flex; gap: var(--space-sm);">
          <button type="button" class="shat-btn shat-btn-primary" onclick="alert('فتح محرر المنشورات الجديد')">
            <span>+ إنشاء منشور جديد</span>
          </button>
        </div>
        <div style="font-size: var(--font-size-caption); color: var(--text-muted);">
          خط التدفق: مسودة (Draft) ← معاينة متجاوبة (Preview) ← نشر رسمي (Publish)
        </div>
      </div>

      <!-- Posts List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-md);">
        ${posts.map(p => `
          <div class="shat-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
            <div style="display: flex; align-items: center; gap: var(--space-md);">
              <img src="${p.img}" alt="" style="width: 72px; height: 54px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.src='assets/logo/logo-banner.jpg'" />
              <div>
                <span class="shat-badge shat-badge-navy" style="margin-bottom: 4px; display: inline-block;">${p.categoryLabel || 'خبر معتمد'}</span>
                <h4 style="margin: 0; color: var(--text-primary); font-size: var(--font-size-body); font-weight: 700;">${p.title}</h4>
                <div style="font-size: var(--font-size-caption); color: var(--text-muted); margin-top: 2px;">تاريخ النشر: ${p.date} • المصدر: ${p.platform || 'المنصة'}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: var(--space-sm);">
              <span class="shat-badge shat-badge-success">منشور</span>
              <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" onclick="alert('فتح نافذة المعاينة المتجاوبة')">
                <span>معاينة</span>
              </button>
              <button type="button" class="shat-btn shat-btn-ghost shat-btn-sm" onclick="alert('تعديل المنشور')">
                <span>تعديل</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `
  });
}

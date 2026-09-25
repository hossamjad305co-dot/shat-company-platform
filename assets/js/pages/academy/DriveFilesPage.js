// SHAT Platform — Drive Files Page (pages/academy/DriveFilesPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { DriveStatusCard } from '../../components/academy/DriveStatusCard.js';
import { Card, Button, Badge } from '../../components/ui/core.js';
import { requestFileDownload } from '../../services/files/fileService.js';
import { router } from '../../router.js';

export function renderDriveFilesPage() {
  const materials = [
    { name: 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf', size: '4.8 MB', type: 'PDF', category: 'CHS Standard' },
    { name: 'حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx', size: '12.3 MB', type: 'PPTX', category: 'AAP Framework' },
    { name: 'مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx', size: '1.2 MB', type: 'XLSX', category: 'Compliance Tool' },
    { name: 'إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf', size: '3.5 MB', type: 'PDF', category: 'Protection' },
    { name: 'دليل_معايير_OECD_DAC_للتقييم_التنموي.pdf', size: '5.1 MB', type: 'PDF', category: 'Evaluation' }
  ];

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'مستودع درايف السحابي' }
  ];

  // Global listener attachment for file access requests
  window.shatDownloadFile = async (fileName) => {
    const res = await requestFileDownload(fileName);
    if (!res.success) {
      if (res.requireLogin) {
        if (router && router.showPermissionGuardModal) {
          router.showPermissionGuardModal('download');
        } else {
          alert(res.error);
        }
      } else {
        alert(`[${res.status}]: ${res.message}`);
      }
    }
  };

  return AcademyLayout({
    activeRoute: 'academy/files',
    breadcrumbs,
    pageTitle: 'مستودع Google Drive السحابي (5TB)',
    pageSubtitle: 'المكتبة السحابية المعتمدة للمواد التدريبية، نماذج الإكسل، وأدلة الامتثال الميدانية',
    children: `
      <!-- Unconfigured Cloud Telemetry Notice -->
      <div style="margin-bottom: var(--space-xl);">
        ${DriveStatusCard()}
      </div>

      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div style="padding: var(--space-lg); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h3 style="margin: 0; font-size: var(--font-size-h4); color: var(--text-primary);">
              📁 البيانات الوصفية للملفات المعتمدة (Database Metadata)
            </h3>
            <div style="font-size: var(--font-size-caption); color: var(--text-muted); margin-top: 4px;">
              يتم إدارة سجلات الملفات عبر جدول public.shat_course_materials. التحميل المباشر يتطلب ربط Google Drive API.
            </div>
          </div>
          <span class="shat-badge shat-badge-navy">${materials.length} ملفات مسجلة</span>
        </div>

        <div class="shat-table-responsive">
          <table class="shat-table">
            <thead>
              <tr>
                <th>اسم الملف المعتمد</th>
                <th>التصنيف</th>
                <th>الصيغة</th>
                <th>الحجم</th>
                <th>حالة التخزين</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${materials.map(m => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span>📄</span>
                      <strong style="color: var(--text-primary);">${m.name}</strong>
                    </div>
                  </td>
                  <td><span class="shat-badge shat-badge-info">${m.category}</span></td>
                  <td><span class="shat-badge shat-badge-navy">${m.type}</span></td>
                  <td style="color: var(--text-muted); font-size: var(--font-size-body-sm);">${m.size}</td>
                  <td><span class="shat-badge shat-badge-warning" style="font-size: 11px;">NOT CONFIGURED</span></td>
                  <td>
                    <button type="button" class="shat-btn shat-btn-secondary shat-btn-sm" onclick="window.shatDownloadFile('${m.name}')">
                      <span>📥 طلب التحميل</span>
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

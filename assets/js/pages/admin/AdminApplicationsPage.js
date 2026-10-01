// SHAT Platform — Admin Course Applications Page (pages/admin/AdminApplicationsPage.js)
// Comprehensive applicant review, status transitions, review notes and auto-enrollment

import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { applicationService, ApplicationStatus } from '../../services/applications/applicationService.js';
import { authService } from '../../services/auth/authService.js';
import { ErrorState } from '../../components/ui/core.js';

export async function renderAdminApplicationsPage() {
  if (!authService.isAdmin() && !authService.canManagePlatform()) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص لإدارة طلبات التسجيل والقبول الأكاديمي.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const applications = await applicationService.getApplications('all');

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'لوحة الإدارة', href: '#/admin' },
    { label: 'طلبات التسجيل والقبول (Applications)' }
  ];

  return AdminLayout({
    activeRoute: 'admin/applications',
    breadcrumbs,
    pageTitle: 'إدارة طلبات التسجيل والقبول الأكاديمي',
    pageSubtitle: 'مراجعة طلبات الالتحاق بالمساقات، اعتماد المتدربين، وربطهم بالدورات التدريبية المعتمدة ومستودعات Google Drive',
    children: `
      <!-- Status Filter Tabs -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-lg);" id="app-status-filters">
        <button type="button" class="shat-btn shat-btn-primary shat-btn-sm active" data-status="all">جميع الطلبات (${applications.length})</button>
        <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-status="${ApplicationStatus.NEW}">طلبات جديدة</button>
        <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-status="${ApplicationStatus.UNDER_REVIEW}">قيد المراجعة</button>
        <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-status="${ApplicationStatus.APPROVED}">المعتمدة (Approved)</button>
        <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-status="${ApplicationStatus.REJECTED}">المرفوضة</button>
        <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" data-status="${ApplicationStatus.ARCHIVED}">المؤرشفة</button>
      </div>

      <!-- Main Applications Card -->
      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
          <h3 style="margin: 0; font-size: var(--font-size-h4); color: var(--shat-navy-950);">
            سجل طلبات الالتحاق والمترشحين
          </h3>
          <span style="font-size: var(--font-size-caption); color: var(--text-muted);">
            اعتماد الطلب يمنح الطالب صلاحية الوصول المباشر للدورة والحقائب السحابية
          </span>
        </div>

        <div id="applications-table-container">
          ${renderApplicationsTable(applications)}
        </div>
      </div>

      <!-- Application Details / Review Modal -->
      <div id="app-review-modal" class="shat-modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); z-index: 10000; align-items: center; justify-content: center; padding: 16px;">
        <div class="shat-modal-content" style="background: #ffffff; width: 100%; max-width: 680px; max-height: 90vh; border-radius: var(--radius-xl); overflow-y: auto; padding: 28px; box-shadow: var(--shadow-xl);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px;">
            <div>
              <h3 id="review-modal-title" style="margin: 0 0 4px; font-size: 1.2rem; color: var(--shat-navy-950);">مراجعة طلب الالتحاق</h3>
              <span id="review-modal-id" style="font-family: monospace; font-size: 0.85rem; color: var(--text-muted);">#app_101</span>
            </div>
            <button type="button" id="btn-close-review-modal" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--text-muted); min-height: 44px; min-width: 44px;">✕</button>
          </div>

          <div id="review-modal-body" style="font-size: 0.92rem; line-height: 1.8; color: var(--text-primary);">
            <!-- Populated dynamically -->
          </div>

          <div style="margin-top: 24px; border-top: 1px solid var(--border-subtle); padding-top: 18px;">
            <label style="display: block; font-weight: 700; font-size: 0.85rem; margin-bottom: 6px; color: var(--shat-navy-950);">
              ملاحظات اللجنة الأكاديمية / سبب القرار:
            </label>
            <textarea id="review-admin-notes" class="shat-form-input" rows="2" placeholder="اكتب ملاحظاتك للطالب أو للأرشيف الإداري..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
            <button type="button" id="btn-reject-app" class="shat-btn shat-btn-outline" style="border-color: #fca5a5; color: #dc2626;">
              رفض الطلب
            </button>
            <button type="button" id="btn-under-review-app" class="shat-btn shat-btn-secondary">
              تعيين كقيد المراجعة
            </button>
            <button type="button" id="btn-approve-app" class="shat-btn shat-btn-primary">
              ✓ اعتماد وقبول الطالب (Auto-Enroll)
            </button>
          </div>
        </div>
      </div>
    `
  });
}

function renderApplicationsTable(apps) {
  if (apps.length === 0) {
    return `
      <div style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 12px;">▪</div>
        <h4 style="color: var(--shat-navy-900); margin-bottom: 6px;">لا توجد طلبات في هذا التصنيف</h4>
        <p style="font-size: var(--font-size-body-sm); margin: 0;">ستظهر الطلبات الجديدة هنا فور تقديمها من المتدربين</p>
      </div>
    `;
  }

  return `
    <div class="shat-table-responsive">
      <table class="shat-table responsive-card-table">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>اسم المتدرب</th>
            <th>الدورة المطلوبة</th>
            <th>وسيلة الاتصال</th>
            <th>الحالة</th>
            <th>تاريخ التقديم</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${apps.map(a => `
            <tr data-app-id="${a.id}">
              <td data-label="رقم الطلب" style="font-family: monospace; font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">
                #${a.id}
              </td>
              <td data-label="اسم المتدرب">
                <strong style="color: var(--shat-navy-950); display: block; font-size: 0.95rem;">${a.fullName}</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${a.qualification || 'مشارك'}</span>
              </td>
              <td data-label="الدورة المطلوبة">
                <span class="shat-badge shat-badge-navy">${a.courseTitle}</span>
              </td>
              <td data-label="وسيلة الاتصال" style="font-size: 0.85rem;" dir="ltr">
                <div>${a.phone}</div>
                <div style="color: var(--text-muted); font-size: 0.78rem;">${a.email || ''}</div>
              </td>
              <td data-label="الحالة">
                <span class="shat-badge ${a.status === ApplicationStatus.APPROVED ? 'shat-badge-success' : a.status === ApplicationStatus.REJECTED ? 'shat-badge-error' : a.status === ApplicationStatus.NEW ? 'shat-badge-info' : 'shat-badge-warning'}">
                  ${a.status.toUpperCase()}
                </span>
              </td>
              <td data-label="تاريخ التقديم" style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap;">
                ${new Date(a.createdAt).toLocaleDateString('ar-EG')}
              </td>
              <td data-label="الإجراءات">
                <button type="button" class="shat-btn shat-btn-secondary shat-btn-sm btn-open-review" data-id="${a.id}">
                  مراجعة واعتماد
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function initAdminApplicationsEvents() {
  const modal = document.getElementById('app-review-modal');
  let currentAppId = null;

  // Filter tabs
  const filterBtns = document.querySelectorAll('#app-status-filters button');
  filterBtns.forEach(btn => {
    btn.onclick = async () => {
      filterBtns.forEach(b => {
        b.classList.remove('shat-btn-primary', 'active');
        b.classList.add('shat-btn-outline');
      });
      btn.classList.add('shat-btn-primary', 'active');
      btn.classList.remove('shat-btn-outline');

      const status = btn.getAttribute('data-status');
      const apps = await applicationService.getApplications(status);
      const container = document.getElementById('applications-table-container');
      if (container) {
        container.innerHTML = renderApplicationsTable(apps);
        bindReviewTriggers();
      }
    };
  });

  bindReviewTriggers();

  // Close modal
  const btnClose = document.getElementById('btn-close-review-modal');
  if (btnClose && modal) {
    btnClose.onclick = () => {
      modal.style.display = 'none';
    };
  }

  // Action buttons inside modal
  const btnApprove = document.getElementById('btn-approve-app');
  if (btnApprove) {
    btnApprove.onclick = async () => {
      if (!currentAppId) return;
      const notes = document.getElementById('review-admin-notes').value;
      await applicationService.updateStatus(currentAppId, ApplicationStatus.APPROVED, notes);
      modal.style.display = 'none';
      refreshList();
    };
  }

  const btnReject = document.getElementById('btn-reject-app');
  if (btnReject) {
    btnReject.onclick = async () => {
      if (!currentAppId) return;
      const notes = document.getElementById('review-admin-notes').value;
      if (!notes) {
        alert('يرجى تدوين سبب الرفض لإشعار الطالب.');
        return;
      }
      await applicationService.updateStatus(currentAppId, ApplicationStatus.REJECTED, notes);
      modal.style.display = 'none';
      refreshList();
    };
  }

  const btnUnderReview = document.getElementById('btn-under-review-app');
  if (btnUnderReview) {
    btnUnderReview.onclick = async () => {
      if (!currentAppId) return;
      const notes = document.getElementById('review-admin-notes').value;
      await applicationService.updateStatus(currentAppId, ApplicationStatus.UNDER_REVIEW, notes);
      modal.style.display = 'none';
      refreshList();
    };
  }

  function bindReviewTriggers() {
    document.querySelectorAll('.btn-open-review').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const app = await applicationService.getApplicationById(id);
        if (!app) return;

        currentAppId = id;
        document.getElementById('review-modal-id').textContent = '#' + app.id;
        document.getElementById('review-modal-title').textContent = `طلب: ${app.fullName}`;
        document.getElementById('review-admin-notes').value = app.adminNotes || '';

        const body = document.getElementById('review-modal-body');
        body.innerHTML = `
          <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div><strong>الدورة المطلوبة:</strong> ${app.courseTitle}</div>
              <div><strong>الحالة الحالية:</strong> <span class="shat-badge shat-badge-navy">${app.status}</span></div>
              <div><strong>رقم الهاتف:</strong> <span dir="ltr">${app.phone}</span></div>
              <div><strong>البريد الإلكتروني:</strong> <span dir="ltr">${app.email || 'غير مدخل'}</span></div>
            </div>
          </div>
          <div style="margin-bottom: 10px;">
            <strong>المؤهل العلمي:</strong> ${app.qualification || 'لا يوجد'}
          </div>
          <div style="margin-bottom: 10px;">
            <strong>الخبرة والجهة الحالية:</strong> ${app.experience || 'لا يوجد'}
          </div>
          <div style="margin-bottom: 10px;">
            <strong>مبررات الترشيح والملاحظات:</strong>
            <p style="background: #ffffff; border: 1px solid var(--border-subtle); padding: 10px; border-radius: var(--radius-sm); margin: 6px 0 0;">
              ${app.notes || 'لا توجد ملاحظات إضافية'}
            </p>
          </div>
        `;

        modal.style.display = 'flex';
      };
    });
  }

  async function refreshList() {
    const activeFilter = document.querySelector('#app-status-filters button.active');
    const status = activeFilter ? activeFilter.getAttribute('data-status') : 'all';
    const apps = await applicationService.getApplications(status);
    const container = document.getElementById('applications-table-container');
    if (container) {
      container.innerHTML = renderApplicationsTable(apps);
      bindReviewTriggers();
    }
  }
}

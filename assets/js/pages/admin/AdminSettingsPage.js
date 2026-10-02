// SHAT Platform — Admin Settings Page (pages/admin/AdminSettingsPage.js)
// Central configuration for Registration Mode (Internal / Google Form / Both), Drive links & Platform Policies

import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { applicationService, RegistrationMode } from '../../services/applications/applicationService.js';
import { authService } from '../../services/auth/authService.js';
import { ErrorState } from '../../components/ui/core.js';

export function renderAdminSettingsPage() {
  if (!authService.isAdmin() && !authService.canManagePlatform()) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص لإدارة إعدادات المنصة العليا.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const settings = applicationService.getSettings();

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'لوحة الإدارة', href: '#/admin' },
    { label: 'إعدادات المنصة والتسجيل' }
  ];

  return AdminLayout({
    activeRoute: 'admin/settings',
    breadcrumbs,
    pageTitle: 'إعدادات المنصة وسياسات التسجيل (Platform Settings)',
    pageSubtitle: 'ضبط مسارات التسجيل والقبول، روابط Google Form المركزية، وتكاملات التخزين السحابي',
    children: `
      <div style="max-width: 800px;">
        <div class="shat-card" style="background: #ffffff; border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
          <h3 style="font-size: var(--font-size-h4); color: var(--shat-navy-950); margin: 0 0 12px; display: flex; align-items: center; gap: 8px;">
            إعدادات مسار تسجيل الطلاب في المساقات
          </h3>
          <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); margin-bottom: 24px; line-height: 1.6;">
            حدد كيفية استقبال طلبات الالتحاق بالدورات التدريبية المعتمدة عبر المنصة:
          </p>

          <form id="admin-settings-form">
            <!-- Registration Mode Choice -->
            <div class="shat-form-group" style="margin-bottom: 20px;">
              <label class="shat-form-label" style="font-weight: 700;">نمط التسجيل المعتمد (Registration Mode):</label>
              
              <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
                <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1.5px solid ${settings.mode === RegistrationMode.BOTH ? 'var(--shat-green-600)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); background: ${settings.mode === RegistrationMode.BOTH ? '#f0fdf4' : '#ffffff'}; cursor: pointer;">
                  <input type="radio" name="registrationMode" value="${RegistrationMode.BOTH}" ${settings.mode === RegistrationMode.BOTH ? 'checked' : ''} style="margin-top: 4px;" />
                  <div>
                    <strong style="color: var(--shat-navy-950); display: block; font-size: 0.95rem;">كلا الطريقتين معاً (استمارة شات الداخلية + Google Form) — موصى به</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">يتيح للمتدرب التقديم مباشرة عبر الموقع، مع إتاحة زر Google Form كخيار بديل.</span>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1.5px solid ${settings.mode === RegistrationMode.INTERNAL ? 'var(--shat-green-600)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); background: ${settings.mode === RegistrationMode.INTERNAL ? '#f0fdf4' : '#ffffff'}; cursor: pointer;">
                  <input type="radio" name="registrationMode" value="${RegistrationMode.INTERNAL}" ${settings.mode === RegistrationMode.INTERNAL ? 'checked' : ''} style="margin-top: 4px;" />
                  <div>
                    <strong style="color: var(--shat-navy-950); display: block; font-size: 0.95rem;">استمارة شات الداخلية فقط (Internal SHAT Form)</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">استقبال الطلبات وحفظها في قاعدة بيانات المنصة ومراجعتها عبر لوحة Applications.</span>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1.5px solid ${settings.mode === RegistrationMode.EXTERNAL_GFORM ? 'var(--shat-green-600)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); background: ${settings.mode === RegistrationMode.EXTERNAL_GFORM ? '#f0fdf4' : '#ffffff'}; cursor: pointer;">
                  <input type="radio" name="registrationMode" value="${RegistrationMode.EXTERNAL_GFORM}" ${settings.mode === RegistrationMode.EXTERNAL_GFORM ? 'checked' : ''} style="margin-top: 4px;" />
                  <div>
                    <strong style="color: var(--shat-navy-950); display: block; font-size: 0.95rem;">نموذج Google Form الخارجي فقط (External Google Form)</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">تحويل زر التسجيل مباشرة إلى رابط Google Form المحدد أدناه.</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Default Google Form URL -->
            <div class="shat-form-group" style="margin-bottom: 24px;">
              <label class="shat-form-label" style="font-weight: 700;">رابط Google Form الرسمي العام للشركة:</label>
              <input type="url" id="settings-gform-url" class="shat-form-input" value="${settings.defaultGoogleFormUrl}" placeholder="https://forms.gle/..." dir="ltr" required />
              <span style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-top: 4px;">يتم استخدامه كنموذج افتراضي لكافة الدورات ما لم يُحدد رابط مخصص لكل دورة.</span>
            </div>

            <!-- Save Settings Button -->
            <button type="submit" id="btn-save-settings" class="shat-btn shat-btn-primary" style="min-height: 46px; font-weight: 700; padding: 0 24px;">
              حفظ الإعدادات وسياسات التسجيل
            </button>
            <span id="settings-save-feedback" style="display: none; margin-inline-start: 12px; color: #059669; font-weight: 700; font-size: 0.9rem;">تم الحفظ بنجاح</span>
          </form>
        </div>

        <!-- Google Drive Integration Info -->
        <div class="shat-card" style="background: #ffffff; border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: var(--font-size-h4); color: var(--shat-navy-950); margin: 0 0 10px; display: flex; align-items: center; gap: 8px;">
            تكامل المستودع السحابي (Google Drive 5TB)
          </h3>
          <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
            يتم التنزيل المباشر للملفات التعليمية عبر وسيط المنصة الأمني لمنع كشف روابط التخزين السحابية للمستخدمين غير المصرح لهم.
          </p>
          <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 16px; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
            <span>حالة الوسيط السحابي (Mediation Gateway):</span>
            <span class="shat-badge shat-badge-success">نشط ومفعّل (Masked Direct Download)</span>
          </div>
        </div>
      </div>
    `
  });
}

export function initAdminSettingsEvents() {
  const form = document.getElementById('admin-settings-form');
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    const mode = form.elements['registrationMode'].value;
    const defaultGoogleFormUrl = document.getElementById('settings-gform-url').value.trim();

    applicationService.saveSettings({
      mode,
      defaultGoogleFormUrl
    });

    const feedback = document.getElementById('settings-save-feedback');
    if (feedback) {
      feedback.style.display = 'inline';
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 3000);
    }
  };
}

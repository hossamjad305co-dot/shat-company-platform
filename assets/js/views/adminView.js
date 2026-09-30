// assets/js/views/adminView.js
// Clean Minimalist Admin Portal
import { content } from '../content.js';

export function renderAdminView(lang = 'ar') {
  const storedApps = JSON.parse(localStorage.getItem('shat_course_applications') || '[]');
  const storedPosts = JSON.parse(localStorage.getItem('shat_cms_posts') || '[]');

  return `
    <div class="view-admin">
      <section class="section" style="padding: 48px 0 24px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div class="section-badge">لوحة التحكم • Admin Control Center</div>
              <h1 class="section-title" style="margin-bottom: 4px; font-size: 1.85rem;">إدارة منصة شركة شات</h1>
              <p class="section-desc" style="font-size: 0.95rem;">متابعة طلبات التسجيل، المنشورات الرسمية، وإعدادات المنصة.</p>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="btn-clean btn-primary btn-sm" id="btn-admin-add-post">
                <span>إضافة منشور جديد</span>
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <!-- Overview Cards -->
          <div class="bento-grid grid-3" style="margin-bottom: 36px;">
            <div class="bento-card" style="padding: 20px;">
              <span class="bento-kicker">طلبات الالتحاق</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;">${storedApps.length}</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">طلبات تسجيل مستلمة من المتدربين</p>
            </div>
            <div class="bento-card" style="padding: 20px;">
              <span class="bento-kicker">المساقات الفعالة</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green); margin: 6px 0;">4</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">برامج تدريبية معتمدة بالأكاديمية</p>
            </div>
            <div class="bento-card" style="padding: 20px;">
              <span class="bento-kicker">المنشورات الإخبارية</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--text-main); margin: 6px 0;">${storedPosts.length}</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">منشورات ميدانية معتمدة</p>
            </div>
          </div>

          <!-- Applications Table -->
          <div class="bento-card" style="margin-bottom: 36px;">
            <div class="bento-header">
              <h3 style="font-size: 1.25rem; color: var(--shat-navy);">طلبات الالتحاق والتدريب الأخيرة</h3>
              <span style="font-size: 0.82rem; color: var(--text-muted);">${storedApps.length} طلبات</span>
            </div>

            ${storedApps.length === 0 ? `
              <div style="text-align: center; padding: 36px 0; color: var(--text-muted);">
                لا توجد طلبات التحاق مسجلة حتى الآن. ستظهر الطلبات الجديدة هنا فور تقديمها من المتدربين.
              </div>
            ` : `
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: start;">
                  <thead>
                    <tr style="border-bottom: 2px solid var(--border-light); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
                      <th style="padding: 10px 8px;">الاسم</th>
                      <th style="padding: 10px 8px;">الهاتف</th>
                      <th style="padding: 10px 8px;">البريد</th>
                      <th style="padding: 10px 8px;">المساق</th>
                      <th style="padding: 10px 8px;">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${storedApps.map(app => `
                      <tr style="border-bottom: 1px solid var(--border-light);">
                        <td style="padding: 12px 8px; font-weight: 700; color: var(--shat-navy);">${app.fullName || 'مجهول'}</td>
                        <td style="padding: 12px 8px; font-family: var(--font-mono);">${app.phone || '-'}</td>
                        <td style="padding: 12px 8px;">${app.email || '-'}</td>
                        <td style="padding: 12px 8px; font-weight: 600; color: var(--shat-green);">${app.courseTitle || app.courseId || 'عام'}</td>
                        <td style="padding: 12px 8px; font-size: 0.82rem; color: var(--text-muted);">${new Date(app.createdAt || Date.now()).toLocaleDateString('ar-EG')}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      </section>
    </div>
  `;
}

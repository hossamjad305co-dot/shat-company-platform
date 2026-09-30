// SHAT Platform — Academy Visitor Gateway (pages/academy/AcademyGatewayPage.js)
// Dedicated public landing portal for unauthenticated visitors attempting to access Moodle / Academy LMS.
// Preserves strict RBAC: visitors cannot see private student data or downloads.

import { courseService } from '../../services/courses/courseService.js';
import { Breadcrumbs } from '../../components/ui/core.js';

export function renderAcademyGatewayPage() {
  const courses = courseService.getCourses();

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات للتدريب', href: '#/academy' }
  ];

  return `
    <div class="academy-gateway-page" style="background: var(--bg-page); min-height: 100vh; padding-bottom: 60px;">
      <!-- Breadcrumb Bar -->
      <div class="container" style="padding-top: var(--space-md); padding-bottom: var(--space-xs);">
        ${Breadcrumbs({ items: breadcrumbs })}
      </div>

      <!-- Hero Section -->
      <section style="background: linear-gradient(135deg, var(--shat-navy-950) 0%, var(--shat-navy-800) 100%); color: #ffffff; padding: clamp(40px, 6vw, 70px) 0; position: relative; overflow: hidden; margin-bottom: var(--space-2xl);">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(75, 136, 52, 0.18) 0%, transparent 60%); pointer-events: none;"></div>
        <div class="container" style="position: relative; z-index: 2; max-width: 900px; text-align: center; margin: 0 auto;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; color: #86efac; margin-bottom: var(--space-md);">
            <span>🎓</span>
            <span>بوابة نظام إدارة التعلم المعتمد (SHAT LMS)</span>
          </div>

          <h1 style="font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.3; margin: 0 0 var(--space-md); color: #ffffff;">
            أكاديمية شات لبناء القدرات والتعليم المؤسسي
          </h1>

          <p style="font-size: clamp(1rem, 2vw, 1.15rem); color: rgba(255, 255, 255, 0.85); line-height: 1.7; margin: 0 auto var(--space-xl); max-width: 720px;">
            منصة تدريبية تنفيذية متقدمة مبنية وفق المعايير الدولية للإدارة الإنسانية والتنموية (CHS & OECD DAC). تتيح للمتدربين الوصول للحقائب المعتمدة، التكليفات الميدانية، ومستودع السحابة الخاص.
          </p>

          <!-- Gate Action Buttons -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 14px; flex-wrap: wrap;">
            <button type="button" class="shat-btn" id="btn-gateway-login" style="background: var(--shat-green-500); color: #ffffff; font-weight: 800; font-size: 1rem; padding: 14px 30px; border-radius: var(--radius-md); border: none; cursor: pointer; box-shadow: 0 8px 20px rgba(75, 136, 52, 0.35); display: inline-flex; align-items: center; gap: 10px;">
              <span>🔑 تسجيل الدخول إلى الأكاديمية</span>
            </button>

            <a href="#/apply" class="shat-btn" style="background: rgba(255, 255, 255, 0.12); color: #ffffff; font-weight: 700; font-size: 1rem; padding: 14px 28px; border-radius: var(--radius-md); border: 1.5px solid rgba(255, 255, 255, 0.3); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span>📝 استمارة التسجيل والالتحاق ↗</span>
            </a>
          </div>

          <!-- Lock Notification -->
          <div style="margin-top: var(--space-lg); display: inline-flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #cbd5e1; background: rgba(15, 23, 42, 0.5); padding: 6px 14px; border-radius: 6px;">
            <span>🔒</span>
            <span>المواد والحقائب وسجل التقييمات مخصصة للمتدربين والمدربين المعتمدين بعد تسجيل الدخول.</span>
          </div>
        </div>
      </section>

      <!-- Accredited Programs Catalog -->
      <section class="container" style="max-width: 1100px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md); border-bottom: 2px solid var(--border-subtle); padding-bottom: var(--space-md);">
          <div>
            <h2 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin: 0 0 6px; font-weight: 800;">
              📚 البرامج والمساقات التدريبية المعتمدة
            </h2>
            <p style="font-size: var(--font-size-body-sm); color: var(--text-muted); margin: 0;">
              استعرض المساقات المتاحة وقدم طلب التحاق للحصول على الاعتماد الرسمي
            </p>
          </div>
          <a href="#/apply" style="color: var(--shat-green-700); font-weight: 700; text-decoration: none; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
            <span>تقديم استمارة التحاق عامة</span>
            <span>←</span>
          </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-xl);">
          ${courses.map(c => `
            <div class="shat-card course-gateway-card" style="background: #ffffff; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; transition: transform 0.2s ease, box-shadow 0.2s ease;">
              <!-- Course Badge Header -->
              <div style="background: linear-gradient(135deg, var(--shat-navy-950), #1e293b); padding: 20px; color: #fff;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span class="shat-badge shat-badge-green" style="background: var(--shat-green-600); color: #fff;">${c.code}</span>
                  <span style="font-size: 0.78rem; opacity: 0.85;">اعتماد دولي</span>
                </div>
                <h3 style="font-size: 1.15rem; font-weight: 800; line-height: 1.4; margin: 0; color: #ffffff;">
                  ${c.title}
                </h3>
              </div>

              <!-- Content Body -->
              <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 16px;">
                    ${c.description}
                  </p>
                  <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span>👨‍🏫 المدرب المعتمد:</span>
                      <strong style="color: var(--shat-navy-950);">${c.instructor}</strong>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span>📁 الوحدات التدريبية:</span>
                      <strong>${c.modules ? c.modules.length : 6} فصول تعليمية</strong>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span>☁️ المواد التعليمية:</span>
                      <span>حقائب PDF + قوالب Excel تطبيقية</span>
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div style="display: flex; gap: 10px; margin-top: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
                  <a href="#/apply?course=${encodeURIComponent(c.id)}" class="shat-btn" style="flex: 1; text-align: center; background: var(--shat-green-600); color: #ffffff; padding: 10px; border-radius: var(--radius-sm); font-weight: 700; text-decoration: none; font-size: 0.88rem;">
                    📝 التسجيل في الدورة
                  </a>
                  <a href="#/course/${c.id}" class="shat-btn" style="text-align: center; background: #f1f5f9; color: var(--shat-navy-950); padding: 10px 14px; border-radius: var(--radius-sm); font-weight: 600; text-decoration: none; font-size: 0.88rem;">
                    تفاصيل
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Why SHAT Academy Section -->
      <section class="container" style="max-width: 1100px; margin-top: 60px;">
        <div style="background: #ffffff; border-radius: var(--radius-xl); padding: clamp(24px, 4vw, 40px); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
          <h3 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin: 0 0 var(--space-lg); text-align: center; font-weight: 800;">
            مميزات التعلم عبر أكاديمية شات المعتمدة
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
            <div style="display: flex; gap: 14px; align-items: flex-start;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(75, 136, 52, 0.1); color: var(--shat-green-700); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
                📥
              </div>
              <div>
                <h4 style="margin: 0 0 6px; font-size: 1rem; color: var(--shat-navy-950); font-weight: 700;">تحميل فوري للمواد والحقائب</h4>
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                  تنزيل مباشر لحقائب الـ PDF وملفات الـ Excel الميدانية بنقرة واحدة للمتدربين المسجلين.
                </p>
              </div>
            </div>

            <div style="display: flex; gap: 14px; align-items: flex-start;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(15, 46, 74, 0.08); color: var(--shat-navy-900); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
                🎖️
              </div>
              <div>
                <h4 style="margin: 0 0 6px; font-size: 1rem; color: var(--shat-navy-950); font-weight: 700;">شهادات تدريبية معتمدة</h4>
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                  إصدار شهادات مهنية موثوقة برقم تحقق رسمي معترف به لدى المنظمات الدولية والمحلية.
                </p>
              </div>
            </div>

            <div style="display: flex; gap: 14px; align-items: flex-start;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(234, 179, 8, 0.15); color: #b45309; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
                📊
              </div>
              <div>
                <h4 style="margin: 0 0 6px; font-size: 1rem; color: var(--shat-navy-950); font-weight: 700;">متابعة تفاعلية مستمرة</h4>
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                  تسليم التكليفات عبر المنصة، تصحيح مباشر من المدربين، ومتابعة دقيقة لنسبة الإنجاز.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function initAcademyGatewayEvents() {
  const loginBtn = document.getElementById('btn-gateway-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const authModal = document.getElementById('auth-modal');
      if (authModal) {
        authModal.classList.add('active');
      }
    });
  }
}

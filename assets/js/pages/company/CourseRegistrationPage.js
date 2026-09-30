// SHAT Platform — Course Registration & Admissions Page (pages/company/CourseRegistrationPage.js)
// Supports both Internal SHAT Application Form & External Google Form modes

import { applicationService, RegistrationMode } from '../../services/applications/applicationService.js';
import { courseService } from '../../services/courses/courseService.js';
import { BaseLayout } from '../../layouts/baseLayout.js';

export async function renderCourseRegistrationPage(selectedCourseId = '') {
  const settings = applicationService.getSettings();
  const courses = await courseService.getCourses();
  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0] || {};

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'الأكاديمية والمساقات', href: '#/academy' },
    { label: 'استمارة التسجيل والالتحاق' }
  ];

  return BaseLayout({
    title: 'طلب التسجيل والالتحاق بالبرامج التدريبية | شركة شات للتنمية',
    breadcrumbs,
    children: `
      <section class="registration-page-section" style="padding: 40px 16px 80px; max-width: 800px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(75, 136, 52, 0.12); color: var(--shat-green-800); padding: 6px 16px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; margin-bottom: 12px;">
            🎓 التسجيل الأكاديمي والمهني المعتمد
          </div>
          <h1 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin: 0 0 10px; font-weight: 900;">
            استمارة الالتحاق بمساقات شات التدريبية
          </h1>
          <p style="font-size: var(--font-size-body); color: var(--text-secondary); line-height: 1.7; max-width: 620px; margin: 0 auto;">
            يرجى تعبئة بيانات الالتحاق بالدورة المطلوبة بدقة لمراجعة طلبك من قِبل اللجنة الأكاديمية وإصدار الاعتماد الرسمي.
          </p>
        </div>

        <!-- Google Form Fallback / Alternative Notice -->
        ${(settings.mode === RegistrationMode.BOTH || settings.mode === RegistrationMode.EXTERNAL_GFORM) ? `
          <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: var(--radius-lg); padding: 18px 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <strong style="color: #1e40af; font-size: 0.95rem; display: block; margin-bottom: 4px;">
                📋 تفضل التسجيل عبر Google Form؟
              </strong>
              <span style="font-size: 0.82rem; color: #3b82f6;">
                يمكنك التقديم عبر نموذج جوجل الرسمي للشركة أو المتابعة مباشرة عبر الاستمارة الإلكترونية أدناه.
              </span>
            </div>
            <a href="${selectedCourse.googleFormUrl || settings.defaultGoogleFormUrl}" target="_blank" rel="noopener noreferrer" class="shat-btn shat-btn-outline" style="border-color: #3b82f6; color: #1d4ed8; text-decoration: none; white-space: nowrap;">
              فتح Google Form ↗
            </a>
          </div>
        ` : ''}

        <!-- Internal Application Card -->
        <div class="shat-card" id="application-form-card" style="background: #ffffff; border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-md);">
          <form id="shat-internal-application-form">
            
            <!-- Target Course -->
            <div class="shat-form-group" style="margin-bottom: 20px;">
              <label class="shat-form-label" style="font-weight: 700; color: var(--shat-navy-950);">
                المساق أو البرنامج التدريبي المطلوب *
              </label>
              <select id="app-course-select" class="shat-form-input" style="height: 48px; font-weight: 600;" required>
                ${courses.map(c => `
                  <option value="${c.id}" ${c.id === selectedCourseId ? 'selected' : ''}>
                    ${c.code ? `[${c.code}] ` : ''}${c.title} — (${c.instructor})
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Full Name & Phone -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;" class="form-row-mobile">
              <div class="shat-form-group">
                <label class="shat-form-label" style="font-weight: 700;">الاسم الرباعي الكامل *</label>
                <input type="text" id="app-full-name" class="shat-form-input" placeholder="مثال: أحمد عبد الله خليل" style="height: 46px;" required />
              </div>
              <div class="shat-form-group">
                <label class="shat-form-label" style="font-weight: 700;">رقم الهاتف / واتساب *</label>
                <input type="tel" id="app-phone" class="shat-form-input" placeholder="+970 59 123 4567" style="height: 46px;" dir="ltr" required />
              </div>
            </div>

            <!-- Email & Qualification -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;" class="form-row-mobile">
              <div class="shat-form-group">
                <label class="shat-form-label" style="font-weight: 700;">البريد الإلكتروني الرسمي *</label>
                <input type="email" id="app-email" class="shat-form-input" placeholder="name@domain.org" style="height: 46px;" dir="ltr" required />
              </div>
              <div class="shat-form-group">
                <label class="shat-form-label">المؤهل العلمي / التخصص</label>
                <input type="text" id="app-qualification" class="shat-form-input" placeholder="بكالوريوس / ماجستير في..." style="height: 46px;" />
              </div>
            </div>

            <!-- Experience & Organization -->
            <div class="shat-form-group" style="margin-bottom: 20px;">
              <label class="shat-form-label">الجهة الحالية وسنوات الخبرة المهنية</label>
              <input type="text" id="app-experience" class="shat-form-input" placeholder="المنظمة أو الشركة، والمسمى الوظيفي، وعدد سنوات العمل..." style="height: 46px;" />
            </div>

            <!-- Motivation & Notes -->
            <div class="shat-form-group" style="margin-bottom: 24px;">
              <label class="shat-form-label">مبررات الترشيح وأهدافك من الانضمام للبرنامج</label>
              <textarea id="app-notes" class="shat-form-input" rows="4" placeholder="كيف تساهم هذه الدورة في تطوير أدائك المهني ومؤسستك؟"></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="btn-submit-application" class="shat-btn shat-btn-primary" style="width: 100%; height: 50px; font-size: 1.05rem; font-weight: 800; justify-content: center;">
              <span>إرسال طلب التسجيل والاعتماد 🚀</span>
            </button>

            <div style="text-align: center; margin-top: 14px; font-size: var(--font-size-caption); color: var(--text-muted);">
              🔒 بياناتك محمية وفق سياسة الخصوصية وحوكمة البيانات المعتمدة لشركة شات.
            </div>
          </form>

          <!-- Success Card (Hidden by default) -->
          <div id="application-success-view" style="display: none; text-align: center; padding: 24px 12px;">
            <div style="width: 72px; height: 72px; background: #ecfdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 2.2rem; color: #059669;">
              ✓
            </div>
            <h2 style="color: var(--shat-navy-950); margin: 0 0 10px; font-weight: 800;">
              تم استلام طلب التسجيل بنجاح!
            </h2>
            <p style="font-size: var(--font-size-body); color: var(--text-secondary); max-width: 520px; margin: 0 auto 20px; line-height: 1.7;">
              شكراً لاهتمامك بالانضمام إلى برامج شات للتنمية. تم حفظ طلبك برقم مرجعي: 
              <strong id="success-app-ref" style="color: var(--shat-green-700); font-family: monospace; font-size: 1.1rem; display: block; margin: 8px 0;">#APP-XXXX</strong>
              سيقوم المشرف الأكاديمي بمراجعة مؤهلاتك وإشعارك بالقبول وتفعيل حسابك للدخول إلى الحقائب ومجلد Google Drive.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="#/academy" class="shat-btn shat-btn-primary">
                العودة للأكاديمية
              </a>
              <a href="#/home" class="shat-btn shat-btn-secondary">
                الصفحة الرئيسية
              </a>
            </div>
          </div>
        </div>

      </section>
    `
  });
}

export function initCourseRegistrationEvents() {
  const form = document.getElementById('shat-internal-application-form');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-application');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'جاري الإرسال والاعتماد...';
    }

    const courseSelect = document.getElementById('app-course-select');
    const courseId = courseSelect.value;
    const courseTitle = courseSelect.options[courseSelect.selectedIndex].text;
    const fullName = document.getElementById('app-full-name').value;
    const phone = document.getElementById('app-phone').value;
    const email = document.getElementById('app-email').value;
    const qualification = document.getElementById('app-qualification').value;
    const experience = document.getElementById('app-experience').value;
    const notes = document.getElementById('app-notes').value;

    const res = await applicationService.submitApplication({
      courseId,
      courseTitle,
      fullName,
      phone,
      email,
      qualification,
      experience,
      notes
    });

    if (res.success) {
      form.style.display = 'none';
      const successView = document.getElementById('application-success-view');
      const refEl = document.getElementById('success-app-ref');
      if (refEl) refEl.textContent = '#' + res.application.id;
      if (successView) successView.style.display = 'block';
    } else {
      alert(res.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'إرسال طلب التسجيل والاعتماد 🚀';
      }
    }
  };
}

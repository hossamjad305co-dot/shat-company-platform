// assets/js/views/academyView.js
// Academy & LMS Course Catalog
import { content } from '../content.js';

export function renderAcademyView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const courses = d.courses;

  return `
    <div class="view-academy">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
            <div style="max-width: 720px;">
              <div class="section-badge">أكاديمية التدريب وبناء القدرات • LMS Portal</div>
              <h1 class="section-title" style="margin-bottom: 12px;">المساقات والدبلومات المهنية المعتمدة</h1>
              <p class="section-desc">
                برامج تدريبية تخصصية وتطبيقية تعتمد على الجدارات وتحاكي المعايير الإنسانية والدولية لربط التعلم بالأداء الفعلي.
              </p>
            </div>
            <div>
              <button class="btn-clean btn-primary btn-open-reg-modal" data-course="general">
                <span>تقديم طلب التحاق جديد</span>
                <span>←</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Courses Catalog -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-2">
            ${courses.map(c => `
              <div class="bento-card" style="border-top: 4px solid var(--shat-navy);">
                <div>
                  <div class="bento-header">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); background: var(--shat-green-tint); padding: 3px 8px; border-radius: var(--radius-xs);">
                      ${c.code}
                    </span>
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">
                      ${c.categoryName} • ${c.hours}
                    </span>
                  </div>

                  <h3 class="bento-title" style="font-size: 1.25rem;">${c.title}</h3>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; font-weight: 600;">
                    المستوى: ${c.level}
                  </div>
                  <p class="bento-text" style="margin-bottom: 16px;">${c.summary}</p>

                  <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 16px; border: 1px solid var(--border-light);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">محاور المنهاج التدريبي:</div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                      ${c.syllabus.map(s => `
                        <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px;">
                          <span style="color: var(--shat-green); font-weight: bold;">•</span>
                          <span>${s}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>

                <div class="bento-footer" style="display: flex; gap: 10px; justify-content: space-between;">
                  <button class="btn-clean btn-primary btn-sm btn-open-reg-modal" data-course="${c.id}" style="flex: 1;">
                    <span>طلب التسجيل بالمساق</span>
                    <span>←</span>
                  </button>
                  <a href="https://wa.me/972592879621?text=${encodeURIComponent('مرحباً، أود الاستفسار عن مساق: ' + c.title)}" target="_blank" rel="noopener" class="btn-clean btn-secondary btn-sm">
                    <span>استفسار واتساب</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

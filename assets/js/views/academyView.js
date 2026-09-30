// assets/js/views/academyView.js
// Academy & LMS Course Catalog with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';
import { api } from '../services/api/apiClient.js';

export function renderAcademyView(lang = 'ar') {
  const d = content[lang] || content.ar;
  let courses = d.courses || [];
  try {
    const stored = api.getStoredCourses ? api.getStoredCourses() : null;
    if (stored && Array.isArray(stored) && stored.length > 0) {
      courses = stored;
    }
  } catch (e) {}

  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const t = {
    badge: lang === 'fr' ? 'Académie SHAT de Formation et Renforcement des Capacités' : (isRtl ? 'أكاديمية شركة شات للتدريب وبناء القدرات • SHAT Academy' : 'SHAT Academy for Capacity Development'),
    title: lang === 'fr' ? 'Diplômes Professionnels et Cours Certifiés' : (isRtl ? 'المساقات والدبلومات المهنية المعتمدة' : 'Accredited Courses & Professional Diplomas'),
    desc: lang === 'fr'
      ? 'Des programmes exécutifs spécialisés alignés sur les normes humanitaires et internationales pour relier le savoir à la performance réelle.'
      : (isRtl ? 'برامج تدريبية تخصصية وتطبيقية تعتمد على الجدارات وتحاكي المعايير الإنسانية والدولية لربط التعلم بالأداء الفعلي.' : 'Specialized and applied competency-based training programs aligned with global standards to connect learning with real-world practice.'),
    btnApplyGeneral: lang === 'fr' ? 'Demande d’Inscription' : (isRtl ? 'تقديم طلب التحاق جديد' : 'Apply for Enrollment'),
    levelLabel: lang === 'fr' ? 'Niveau:' : (isRtl ? 'المستوى:' : 'Level:'),
    syllabusLabel: lang === 'fr' ? 'Modules et Axes Didactiques:' : (isRtl ? 'محاور المنهاج التدريبي:' : 'Curriculum Modules:'),
    btnExploreFiles: lang === 'fr' ? '📖 Consulter le Cursus & Fichiers' : (isRtl ? '📖 استعراض المنهاج والملفات' : '📖 View Curriculum & Files'),
    btnRegisterCourse: lang === 'fr' ? 'Inscription Directe' : (isRtl ? 'تسجيل فوري بالمساق' : 'Enroll Now')
  };

  return `
    <div class="view-academy">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
            <div style="max-width: 720px;">
              <div class="section-badge">${t.badge}</div>
              <h1 class="section-title" style="margin-bottom: 12px;">${t.title}</h1>
              <p class="section-desc">${t.desc}</p>
            </div>
            <div>
              <button class="btn-clean btn-primary btn-open-reg-modal" data-course="general">
                <span>${t.btnApplyGeneral}</span>
                <span>${arrow}</span>
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
                      ${c.code || 'SHAT'}
                    </span>
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">
                      ${c.categoryName || c.track || 'دبلوم مهني'} • ${c.hours || '30 ساعة'}
                    </span>
                  </div>

                  <h3 class="bento-title" style="font-size: 1.25rem;">${c.title}</h3>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; font-weight: 600;">
                    ${t.levelLabel} ${c.level || 'معتمد'}
                  </div>
                  <p class="bento-text" style="margin-bottom: 16px;">${c.summary || ''}</p>

                  <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 16px; border: 1px solid var(--border-light);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">${t.syllabusLabel}</div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                      ${(Array.isArray(c.syllabus) ? c.syllabus : []).map(s => `
                        <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px;">
                          <span style="color: var(--shat-green); font-weight: bold;">•</span>
                          <span>${s}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>

                <div class="bento-footer" style="display: flex; gap: 8px; justify-content: space-between; flex-wrap: wrap;">
                  <a href="#/course/${c.id}" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
                    <span>${t.btnExploreFiles}</span>
                  </a>
                  <button class="btn-clean btn-green btn-sm btn-open-reg-modal" data-course="${c.id}">
                    <span>${t.btnRegisterCourse}</span>
                    <span>${arrow}</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

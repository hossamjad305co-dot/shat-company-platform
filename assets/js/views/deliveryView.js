// assets/js/views/deliveryView.js
// 6-Stage Delivery Model View with Double-Bezel Styling & 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderDeliveryView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const dm = d.deliveryModel || { stages: [] };
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const t = {
    badge: `${dm.slogan || 'من الاحتياج إلى النتائج • From Needs to Results'} • شركة شات للتنمية والتطوير (SHAT Platform)`,
    title: dm.title || (isRtl ? 'نموذج التدخل: كيف نعمل؟' : 'Our Delivery Model'),
    desc: dm.subtitle || (isRtl ? 'دورة عمل متكاملة من 6 مراحل لضمان جودة الأداء وتحقيق نتائج قابلة للقياس والاستدامة' : 'A 6-phase operational cycle ensuring seamless transition from diagnosis to sustainable impact.'),
    ctaTitle: lang === 'fr' 
      ? 'Souhaitez-vous déployer ce modèle au sein de votre organisation ?'
      : (isRtl ? 'هل ترغب في تطبيق هذا النموذج في مؤسستك؟' : 'Would you like to deploy this model in your organization?'),
    ctaDesc: lang === 'fr'
      ? 'Nos experts analysent vos réalités institutionnelles et conçoivent un accompagnement sur mesure selon ces 6 phases.'
      : (isRtl ? 'يقوم خبراؤنا بدراسة واقع مؤسستكم وتصميم تدخل استشاري أو تدريبي متكامل وفق المراحل الست.' : 'Our consultants analyze your institutional reality and engineer a tailored intervention mapped across the 6 phases.'),
    ctaBtn: lang === 'fr' ? 'Demander une Proposition Technique' : (isRtl ? 'طلب استشارة وعرض فني مخصص' : 'Request Tailored Advisory Proposal'),
    diagBtn: isRtl ? 'فحص جاهزية المؤسسة للتدخل' : 'Check Readiness for Intervention'
  };

  return `
    <div class="view-delivery">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 860px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 14px; font-weight: 900; color: var(--shat-navy);">${t.title}</h1>
            <p class="section-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- Detailed 6 Stages in Double-Bezel Grid -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-3">
            ${(dm.stages || []).map((st, idx) => `
              <div class="double-bezel" style="border-top: 4px solid var(--shat-navy);">
                <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div class="bento-header" style="margin-bottom: 14px;">
                      <span class="step-number" style="font-family: var(--font-mono); font-size: 1.3rem;">${st.num}</span>
                      <span class="bento-kicker" style="font-size: 0.78rem;">${st.en}</span>
                    </div>
                    <h3 class="bento-title" style="font-size: 1.25rem; font-weight: 900; margin-bottom: 8px;">${st.ar || st.title}</h3>
                    <p class="bento-text" style="font-size: 0.94rem; line-height: 1.7; color: var(--text-secondary);">${st.desc}</p>
                  </div>
                  <div style="border-top: 1px dashed var(--border-light); padding-top: 12px; margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.76rem; color: var(--shat-green); font-weight: 800;">
                      ✓ ${isRtl ? `المرحلة التنفيذية 0${idx + 1}` : `Phase 0${idx + 1}`}
                    </span>
                    <button type="button" class="btn-clean" onclick="if(window.openToolkitsLibrary) window.openToolkitsLibrary();" style="font-size: 0.74rem; color: var(--shat-navy); font-weight: 700; background: transparent; cursor: pointer; text-decoration: underline;">
                      ${isRtl ? 'الأدوات المقترنة' : 'Matched Toolkits'}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom CTA -->
          <div class="double-bezel" style="margin-top: 48px; border-color: var(--shat-green);">
            <div class="double-bezel-inner" style="padding: 40px; text-align: center; background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);">
              <h3 style="font-size: 1.4rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 10px;">${t.ctaTitle}</h3>
              <p style="font-size: 1rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto 24px auto; line-height: 1.8;">
                ${t.ctaDesc}
              </p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="#/contact" class="btn-clean btn-primary btn-lg btn-island">
                  <span>${t.ctaBtn}</span>
                  <span>${arrow}</span>
                </a>
                <button type="button" class="btn-clean btn-green btn-lg btn-island" onclick="if(window.openDiagnosticAssessment) window.openDiagnosticAssessment();">
                  <span>${t.diagBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// assets/js/views/deliveryView.js
// 6-Stage Delivery Model View with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderDeliveryView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const dm = d.deliveryModel;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const t = {
    ctaTitle: lang === 'fr' 
      ? 'Souhaitez-vous déployer ce modèle au sein de votre organisation ?'
      : (isRtl ? 'هل ترغب في تطبيق هذا النموذج في مؤسستك؟' : 'Would you like to deploy this model in your organization?'),
    ctaDesc: lang === 'fr'
      ? 'Nos experts analysent vos réalités institutionnelles et conçoivent un accompagnement sur mesure selon ces 6 phases.'
      : (isRtl ? 'يقوم خبراؤنا بدراسة واقع مؤسستكم وتصميم تدخل استشاري أو تدريبي متكامل وفق المراحل الست.' : 'Our consultants analyze your institutional reality and engineer a tailored intervention mapped across the 6 phases.'),
    ctaBtn: lang === 'fr' ? 'Demander une Proposition Technique' : (isRtl ? 'طلب استشارة وعرض فني مخصص' : 'Request Tailored Advisory Proposal')
  };

  return `
    <div class="view-delivery">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">${dm.slogan} • SHAT Platform</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${dm.title}</h1>
            <p class="section-desc">${dm.subtitle}</p>
          </div>
        </div>
      </section>

      <!-- Detailed 6 Stages -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-3">
            ${dm.stages.map(st => `
              <div class="bento-card" style="border-top: 4px solid var(--shat-navy);">
                <div>
                  <div class="bento-header">
                    <span class="step-number">${st.num}</span>
                    <span class="bento-kicker">${st.en}</span>
                  </div>
                  <h3 class="bento-title" style="font-size: 1.25rem;">${st.ar || st.title}</h3>
                  <p class="bento-text" style="font-size: 0.95rem; line-height: 1.8;">${st.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 48px; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 32px; background: var(--bg-subtle); text-align: center;">
            <h3 style="font-size: 1.25rem; color: var(--shat-navy); margin-bottom: 8px;">${t.ctaTitle}</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 20px auto;">
              ${t.ctaDesc}
            </p>
            <a href="#/contact" class="btn-clean btn-primary">
              <span>${t.ctaBtn}</span>
              <span>${arrow}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

// assets/js/views/homeView.js
// Pristine Executive Minimalist Homepage with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderHomeView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const c = d.company;
  const h = d.home || content.ar.home;
  const eq = d.valueEquation;
  const pillars = d.twoPillars;
  const stList = d.standards.slice(0, 6);
  const portfolios = d.portfolios.slice(0, 6);
  const stages = d.deliveryModel.stages;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  return `
    <div class="view-home">
      <!-- Minimalist Hero Section -->
      <section class="section" style="padding: clamp(60px, 9vw, 110px) 0; background: linear-gradient(180deg, #FFFFFF 0%, var(--bg-subtle) 100%);">
        <div class="container">
          <div style="max-width: 860px; margin: 0 auto; text-align: center;">
            <div class="section-badge" style="margin-bottom: 20px;">
              ${h.heroBadge || (c.name + ' • ' + c.nameEn)}
            </div>
            <h1 style="font-size: clamp(2.2rem, 5vw, 3.4rem); color: var(--shat-navy); line-height: 1.25; font-weight: 900; margin-bottom: 20px;">
              ${c.motto}
            </h1>
            <p style="font-size: clamp(1.05rem, 2vw, 1.25rem); color: var(--text-secondary); line-height: 1.8; margin-bottom: 36px; max-width: 740px; margin-left: auto; margin-right: auto;">
              ${h.heroSubtitle}
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
              <a href="#/academy" class="btn-clean btn-primary btn-lg">
                <span>${h.exploreAcademy}</span>
                <span>${arrow}</span>
              </a>
              <a href="#/services" class="btn-clean btn-secondary btn-lg">
                <span>${h.exploreServices}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Equation Bar -->
      <section class="section-subtle" style="padding: 40px 0;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 16px;">
            <span style="font-size: 0.82rem; font-weight: 800; color: var(--shat-green); text-transform: uppercase; letter-spacing: 0.05em;">
              ${h.valueEqBadge}
            </span>
          </div>
          <div class="value-formula-row">
            ${eq.steps.map((st, i) => `
              <div class="formula-step">
                <div class="formula-label">${st.label}</div>
                <div class="formula-en">${st.key}</div>
              </div>
              ${i < eq.steps.length - 1 ? `<div class="formula-arrow">${arrow}</div>` : ''}
            `).join('')}
          </div>
          <p style="text-align: center; font-size: 0.95rem; color: var(--text-muted); max-width: 740px; margin: 0 auto; line-height: 1.7;">
            ${h.valueEqQuote}
          </p>
        </div>
      </section>

      <!-- Two Strategic Pillars -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.pillarsBadge}</span>
            <h2 class="section-title">${h.pillarsTitle}</h2>
            <p class="section-desc">${h.pillarsSubtitle}</p>
          </div>

          <div class="bento-grid grid-2">
            ${pillars.map(p => `
              <div class="bento-card" style="border-top: 4px solid var(--shat-navy);">
                <div>
                  <div class="bento-header">
                    <span class="section-badge">${p.badge}</span>
                  </div>
                  <h3 class="bento-title">${p.title}</h3>
                  <div class="bento-en">${p.en}</div>
                  <p class="bento-text">${p.desc}</p>
                </div>
                <div class="bento-footer">
                  <a href="#/services" class="btn-clean btn-secondary btn-sm" style="width: 100%;">
                    <span>${lang === 'fr' ? 'Détails des Solutions' : (isRtl ? 'تفاصيل المنظومة والحلول' : 'Solutions & Methodology')}</span>
                    <span>${arrow}</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 6-Stage Delivery Model -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.deliveryBadge}</span>
            <h2 class="section-title">${h.deliveryTitle}</h2>
            <p class="section-desc">${h.deliverySubtitle}</p>
          </div>

          <div class="bento-grid grid-3">
            ${stages.map(st => `
              <div class="bento-card">
                <div>
                  <div class="bento-header">
                    <span class="step-number">${st.num}</span>
                    <span class="bento-kicker">${st.en}</span>
                  </div>
                  <h4 class="bento-title" style="font-size: 1.15rem;">${st.ar || st.title}</h4>
                  <p class="bento-text">${st.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin-top: 36px;">
            <a href="#/delivery" class="btn-clean btn-secondary">
              <span>${h.exploreDelivery}</span>
              <span>${arrow}</span>
            </a>
          </div>
        </div>
      </section>

      <!-- International Standards Matrix -->
      <section class="section section-navy">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.standardsBadge}</span>
            <h2 class="section-title">${h.standardsTitle}</h2>
            <p class="section-desc">${h.standardsSubtitle}</p>
          </div>

          <div class="bento-grid grid-3">
            ${stList.map(st => `
              <div class="bento-card">
                <div>
                  <div class="bento-header">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #4ADE80; font-family: var(--font-mono);">${st.code}</span>
                    <span style="font-size: 0.76rem; color: #94A3B8;">${st.badge}</span>
                  </div>
                  <h3 class="bento-title" style="font-size: 1.15rem;">${st.title}</h3>
                  <div class="bento-en">${st.en}</div>
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 0.78rem; font-weight: 800; color: #FDE047; margin-bottom: 2px;">
                      ${lang === 'fr' ? 'Valeur & Portée Institutionnelle:' : (isRtl ? 'القيمة والأهمية المؤسسية:' : 'Institutional Value & Scope:')}
                    </div>
                    <p style="font-size: 0.88rem; line-height: 1.6;">${st.whyItMatters}</p>
                  </div>
                  <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: var(--radius-xs); border-${isRtl ? 'right' : 'left'}: 3px solid #38BDF8; margin-bottom: 12px;">
                    <div style="font-size: 0.78rem; font-weight: 800; color: #38BDF8; margin-bottom: 2px;">
                      ${lang === 'fr' ? 'Application par SHAT:' : (isRtl ? 'كيف نطبقه في شات؟' : 'How SHAT Implements It:')}
                    </div>
                    <p style="font-size: 0.84rem; line-height: 1.5; color: #E2E8F0; margin: 0;">${st.howShatApplies}</p>
                  </div>
                </div>
                <div class="bento-footer">
                  <div style="font-size: 0.78rem; color: #86EFAC; font-weight: 700; margin-bottom: 6px;">
                    ${lang === 'fr' ? 'Livrable Réalisé:' : (isRtl ? 'المخرج المحقق:' : 'Tangible Deliverable:')}
                  </div>
                  <div style="font-size: 0.82rem; color: #F1F5F9; margin-bottom: 12px;">${st.deliverable}</div>
                  <a href="${st.route}" class="btn-clean btn-secondary btn-sm" style="width: 100%; border-color: rgba(255,255,255,0.2); background: transparent; color: #FFFFFF;">
                    <span>${lang === 'fr' ? 'Parcours Lié' : (isRtl ? 'المسار المرتبط' : 'Associated Track')}</span>
                    <span>${arrow}</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin-top: 36px;">
            <a href="#/standards" class="btn-clean btn-green btn-lg">
              <span>${h.viewAllStandards}</span>
              <span>${arrow}</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Specialized Portfolios Preview -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${h.portfoliosBadge}</span>
            <h2 class="section-title">${h.portfoliosTitle}</h2>
            <p class="section-desc">${h.portfoliosSubtitle}</p>
          </div>

          <div class="bento-grid grid-3">
            ${portfolios.map(pf => `
              <div class="bento-card" style="border-top: 3px solid var(--shat-green);">
                <div>
                  <div class="bento-header">
                    <span class="bento-kicker">${pf.num}</span>
                    <span style="font-size: 0.76rem; color: var(--text-muted);">${lang === 'fr' ? 'Module Agréé' : (isRtl ? 'حقيبة معتمدة' : 'Accredited Module')}</span>
                  </div>
                  <h4 class="bento-title" style="font-size: 1.15rem;">${pf.name}</h4>
                  <div class="bento-en">${pf.en}</div>
                  <p class="bento-text">${pf.desc}</p>
                </div>
                <div class="bento-footer" style="display: flex; justify-content: space-between; align-items: center;">
                  <a href="#/academy" class="btn-clean btn-outline-green btn-sm">
                    <span>${lang === 'fr' ? "S'inscrire au Cours" : (isRtl ? 'التسجيل في المساق' : 'Enroll in Track')}</span>
                    <span>${arrow}</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 8 Professional Principles -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${lang === 'fr' ? 'Notre Déontologie' : (isRtl ? 'منهجيتنا المهنية' : 'Our Professional Ethics')}</span>
            <h2 class="section-title">${lang === 'fr' ? 'Principes Directeurs Fondamentaux' : (isRtl ? 'المبادئ الحاكمة لأعمالنا' : 'Our Governing Principles')}</h2>
            <p class="section-desc">${lang === 'fr' ? 'Principes rigoureux guidant la conception et le déploiement de tous nos services.' : (isRtl ? 'مبادئ راسخة تحكم تصميم وتنفيذ خدماتنا الاستشارية والتدريبية والتقييمية.' : 'Core principles governing our consulting, training, and evaluation interventions.')}</p>
          </div>

          <div class="bento-grid grid-2">
            ${d.principles.map((pr, i) => `
              <div class="bento-card" style="padding: 20px 24px;">
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <span style="font-size: 1.1rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); min-width: 28px;">
                    0${i + 1}
                  </span>
                  <div>
                    <h5 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 2px;">${pr.ar || pr.en}</h5>
                    <div style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-latin); margin-bottom: 6px;">${pr.en}</div>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">${pr.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Minimalist Corporate Call to Action -->
      <section class="section" style="padding: 80px 0; background: #FFFFFF; border-top: 1px solid var(--border-light);">
        <div class="container">
          <div style="border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: clamp(32px, 6vw, 64px); text-align: center; background: var(--bg-subtle);">
            <span class="section-badge" style="margin-bottom: 16px;">${c.name}</span>
            <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.4rem); color: var(--shat-navy); margin-bottom: 14px; line-height: 1.3;">
              ${lang === 'fr' 
                ? 'Prêts à vous accompagner pour transformer le savoir en résultats mesurables' 
                : (isRtl ? 'جاهزون لدعم مؤسستكم في تحويل المعرفة إلى نتائج قابلة للقياس' : 'Ready to support your organization in converting knowledge into measurable results')}
            </h2>
            <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 640px; margin: 0 auto 28px auto; line-height: 1.7;">
              ${lang === 'fr'
                ? "Contactez nos consultants pour analyser vos besoins institutionnels ou concevoir des formations sur mesure pour vos équipes."
                : (isRtl ? 'تواصل مع فريق خبرائنا الاستشاري لبحث احتياجاتكم المؤسسية أو تصميم برامج تدريبية مخصصة لفرق عملكم.' : 'Connect with our advisory team to discuss institutional needs or design tailored capacity-building programs.')}
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="#/contact" class="btn-clean btn-primary btn-lg">
                <span>${d.nav.requestConsultation}</span>
                <span>${arrow}</span>
              </a>
              <a href="https://wa.me/972592879621" target="_blank" rel="noopener" class="btn-clean btn-secondary btn-lg">
                <span>WhatsApp: +972 59 287 9621</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

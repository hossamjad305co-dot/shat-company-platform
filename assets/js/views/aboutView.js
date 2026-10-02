import { icons } from '../icons.js';
// assets/js/views/aboutView.js
// Pristine About SHAT Page with Double-Bezel Styling & 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderAboutView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const a = d.about || {};
  const c = d.company || {};
  const eq = d.valueEquation || { pillars: [] };
  const isRtl = lang === 'ar';
  const arrow = isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14);

  return `
    <div class="view-about">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 860px;">
            <div class="section-badge">${c.name || 'شركة شات للتنمية والتطوير'}</div>
            <h1 class="section-title" style="margin-bottom: 14px; font-weight: 900; color: var(--shat-navy);">${a.title}</h1>
            <p class="section-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">${a.subtitle}</p>
          </div>
        </div>
      </section>

      <!-- Main Profile & Methodology -->
      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: flex-start;">
            <div>
              <div style="margin-bottom: 40px;">
                <h3 style="font-size: 1.5rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 16px;">${a.statementTitle}</h3>
                <p style="font-size: 1.05rem; line-height: 1.9; color: var(--text-main); margin-bottom: 20px;">
                  ${a.statement}
                </p>
                <p style="font-size: 1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
                  ${a.methodology}
                </p>
                <div style="background: var(--shat-green-tint); border: 1px solid var(--shat-green-border); border-radius: var(--radius-sm); padding: 22px 26px; border-${isRtl ? 'right' : 'left'}: 4px solid var(--shat-green);">
                  <div style="font-size: 0.88rem; font-weight: 800; color: var(--shat-green); margin-bottom: 6px;">${a.philosophyLabel}</div>
                  <p style="font-size: 1.02rem; color: var(--shat-navy); font-weight: 700; line-height: 1.7; margin: 0;">
                    ${a.philosophy}
                  </p>
                </div>
              </div>

              <!-- Positioning & Commitment -->
              <div style="border-top: 1px solid var(--border-light); padding-top: 36px;">
                <h3 style="font-size: 1.35rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 14px;">${a.positioningTitle}</h3>
                <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 28px;">
                  ${a.positioning}
                </p>

                <h3 style="font-size: 1.35rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 14px;">${a.commitmentTitle}</h3>
                <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8;">
                  ${a.commitment}
                </p>
              </div>
            </div>

            <!-- Side Card: Company Summary -->
            <div class="double-bezel" style="position: sticky; top: 100px; border-top: 4px solid var(--shat-navy);">
              <div class="double-bezel-inner" style="background: #FFFFFF;">
                <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 54px; margin-bottom: 16px; object-fit: contain;" onerror="this.onerror=null; this.src='assets/logo/logo-symbol.jpg';">
                <h4 style="font-size: 1.2rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 4px;">${c.name}</h4>
                <div style="font-size: 0.82rem; color: var(--shat-green); font-weight: 700; font-family: var(--font-latin); margin-bottom: 16px;">${c.nameEn}</div>
                <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; border-bottom: 1px dashed var(--border-light); padding-bottom: 16px;">
                  <strong>${c.motto}</strong><br>
                  <span style="font-family: var(--font-latin); font-size: 0.78rem; color: var(--text-muted);">${c.subMottoEn}</span>
                </div>

                <div style="font-size: 0.86rem; color: var(--text-main); margin-bottom: 10px;">
                  <strong style="color: var(--shat-navy);">${lang === 'fr' ? 'Courriel:' : (isRtl ? 'البريد المؤسسي:' : 'Corporate Email:')}</strong> ${c.email}
                </div>
                <div style="font-size: 0.86rem; color: var(--text-main); margin-bottom: 20px;">
                  <strong style="color: var(--shat-navy);">${lang === 'fr' ? 'Téléphone:' : (isRtl ? 'الهاتف المعتمد:' : 'Verified Phone:')}</strong> ${c.phone}
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <a href="#/contact" class="btn-clean btn-primary btn-sm btn-island" style="width: 100%; justify-content: center;">
                    <span>${lang === 'fr' ? 'Nous Contacter' : (isRtl ? 'تواصل معنا مباشرة' : 'Contact Us Directly')}</span>
                    <span>${arrow}</span>
                  </a>
                  <button type="button" class="btn-clean btn-secondary btn-sm" onclick="if(window.openCertificateValidator) window.openCertificateValidator();" style="width: 100%; justify-content: center; background: #FFFFFF;">
                    <span>${isRtl ? 'التحقق من الشهادات' : 'Verify Certificate'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Pillars -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${lang === 'fr' ? 'Valeur Ajoutée' : (isRtl ? 'القيمة المضافة والأثر' : 'Value Proposition')}</span>
            <h2 class="section-title">${eq.title}</h2>
          </div>

          <div class="bento-grid grid-3">
            ${(eq.pillars || []).map(pl => `
              <div class="double-bezel">
                <div class="double-bezel-inner" style="height: 100%;">
                  <h4 class="bento-title" style="font-size: 1.15rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 10px;">${pl.title}</h4>
                  <p class="bento-text" style="font-size: 0.92rem; line-height: 1.7; color: var(--text-secondary); margin: 0;">${pl.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

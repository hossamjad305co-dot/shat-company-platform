// assets/js/views/aboutView.js
// Pristine About SHAT Page
import { content } from '../content.js';

export function renderAboutView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const a = d.about;
  const c = d.company;
  const eq = d.valueEquation;

  return `
    <div class="view-about">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">${c.name}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${a.title}</h1>
            <p class="section-desc">${a.subtitle}</p>
          </div>
        </div>
      </section>

      <!-- Main Profile & Methodology -->
      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: flex-start;">
            <div>
              <div style="margin-bottom: 40px;">
                <h3 style="font-size: 1.5rem; color: var(--shat-navy); margin-bottom: 16px;">البيان الرسمي للشركة</h3>
                <p style="font-size: 1.1rem; line-height: 1.9; color: var(--text-main); margin-bottom: 20px;">
                  ${a.statement}
                </p>
                <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 20px;">
                  ${a.methodology}
                </p>
                <div style="background: var(--shat-green-tint); border: 1px solid var(--shat-green-border); border-radius: var(--radius-sm); padding: 20px 24px; border-right: 4px solid var(--shat-green);">
                  <div style="font-size: 0.85rem; font-weight: 800; color: var(--shat-green); margin-bottom: 6px;">فلسفة العمل في شات:</div>
                  <p style="font-size: 1rem; color: var(--shat-navy); font-weight: 600; line-height: 1.7; margin: 0;">
                    ${a.philosophy}
                  </p>
                </div>
              </div>

              <!-- Positioning & Commitment -->
              <div style="border-top: 1px solid var(--border-light); padding-top: 36px;">
                <h3 style="font-size: 1.35rem; color: var(--shat-navy); margin-bottom: 14px;">التوجه المؤسسي (Institutional Positioning)</h3>
                <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">
                  ${a.positioning}
                </p>

                <h3 style="font-size: 1.35rem; color: var(--shat-navy); margin-bottom: 14px;">التزامنا المهني (Our Commitment)</h3>
                <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8;">
                  ${a.commitment}
                </p>
              </div>
            </div>

            <!-- Side Card: Company Summary -->
            <div class="bento-card" style="position: sticky; top: 100px;">
              <div>
                <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 52px; margin-bottom: 16px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
                <h4 style="font-size: 1.15rem; color: var(--shat-navy); margin-bottom: 4px;">${c.name}</h4>
                <div style="font-size: 0.8rem; color: var(--shat-green); font-weight: 700; font-family: var(--font-latin); margin-bottom: 16px;">${c.nameEn}</div>
                <div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
                  ${c.motto}<br>
                  <span style="font-family: var(--font-latin); font-size: 0.78rem;">${c.subMottoEn}</span>
                </div>
              </div>
              <div class="bento-footer">
                <div style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 10px;">
                  <strong>البريد:</strong> ${c.email}
                </div>
                <div style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 16px;">
                  <strong>الهاتف:</strong> ${c.phone}
                </div>
                <a href="#/contact" class="btn-clean btn-primary btn-sm" style="width: 100%;">
                  <span>تواصل معنا مباشرة</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Pillars (Domain 08) -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">القيمة المضافة</span>
            <h2 class="section-title">ركائز القيمة التي نقدمها للمؤسسات</h2>
          </div>

          <div class="bento-grid grid-3">
            ${eq.pillars.map(pl => `
              <div class="bento-card">
                <h4 class="bento-title" style="font-size: 1.1rem;">${pl.title}</h4>
                <p class="bento-text">${pl.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

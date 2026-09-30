// assets/js/views/standardsView.js
// Deep Dive International & Humanitarian Standards Guide with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderStandardsView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const list = d.standards;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const t = {
    badge: lang === 'fr' ? 'Normes & Référentiels Mondiaux' : (isRtl ? 'المرجعيات والمعايير الدولية' : 'Global Norms & Standards'),
    title: lang === 'fr' ? 'Système des Normes Internationales et Applications Institutionnelles' : (isRtl ? 'منظومة المعايير الدولية وتطبيقاتها المؤسسية' : 'International Standards & Institutional Applications'),
    desc: lang === 'fr' 
      ? "SHAT s'appuie rigoureusement sur les cadres internationaux de référence pour guider l'élaboration des politiques, l'évaluation des risques et la redevabilité."
      : (isRtl ? 'تسترشد شات، بحسب طبيعة ونطاق كل مهمة، بأدق المرجعيات الدولية والإنسانية المعتمدة لبناء السياسات، مصفوفات تقييم المخاطر، والتقييم المستقل.' : 'Guided by accredited international frameworks governing policy design, risk matrices, accountability, and independent evaluation.'),
    whyTitle: lang === 'fr' ? '🎯 Portée et valeur pour les organisations:' : (isRtl ? '🎯 ما هو المعيار وما قيمته للمؤسسات؟' : '🎯 Why It Matters to Institutions:'),
    howTitle: lang === 'fr' ? '⚡ Comment SHAT l’applique sur le terrain:' : (isRtl ? '⚡ كيف تطبقه شركة شات ميدانياً؟' : '⚡ How SHAT Implements It:'),
    delivTitle: lang === 'fr' ? '📦 Livrable Institutionnel Réalisé:' : (isRtl ? '📦 المخرج المؤسسي المحقق:' : '📦 Tangible Institutional Deliverable:'),
    btnExplore: lang === 'fr' ? 'Explorer le Parcours ou le Service Lié' : (isRtl ? 'استكشف المسار التدريبي أو الخدمة المرتبطة' : 'Explore Associated Track or Service')
  };

  return `
    <div class="view-standards">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 820px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${t.title}</h1>
            <p class="section-desc">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- Standards Grid -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-2">
            ${list.map(st => `
              <div class="bento-card" style="border-top: 4px solid var(--shat-navy);">
                <div>
                  <div class="bento-header">
                    <span style="font-size: 0.85rem; font-weight: 800; background: var(--shat-green-tint); color: var(--shat-green); padding: 4px 10px; border-radius: var(--radius-xs); border: 1px solid var(--shat-green-border); font-family: var(--font-mono);">
                      ${st.code}
                    </span>
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">
                      ${st.badge}
                    </span>
                  </div>

                  <h3 class="bento-title" style="font-size: 1.3rem;">${st.title}</h3>
                  <div class="bento-en" style="color: var(--shat-navy); font-weight: 700; margin-bottom: 14px;">${st.en}</div>

                  <!-- Why it matters -->
                  <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 12px; border-${isRtl ? 'right' : 'left'}: 3px solid var(--shat-navy);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 3px;">
                      ${t.whyTitle}
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
                      ${st.whyItMatters}
                    </p>
                  </div>

                  <!-- How SHAT applies it -->
                  <div style="background: var(--shat-green-tint); border: 1px solid var(--shat-green-border); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 12px; border-${isRtl ? 'right' : 'left'}: 3px solid var(--shat-green);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-green); margin-bottom: 3px;">
                      ${t.howTitle}
                    </div>
                    <p style="font-size: 0.9rem; color: var(--shat-navy); line-height: 1.6; margin: 0;">
                      ${st.howShatApplies}
                    </p>
                  </div>

                  <!-- Tangible Deliverable -->
                  <div style="border: 1px dashed var(--border-medium); border-radius: var(--radius-xs); padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">
                      ${t.delivTitle}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                      ${st.deliverable}
                    </div>
                  </div>
                </div>

                <div class="bento-footer">
                  <a href="${st.route}" class="btn-clean btn-primary btn-sm" style="width: 100%;">
                    <span>${t.btnExplore}</span>
                    <span>${arrow}</span>
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

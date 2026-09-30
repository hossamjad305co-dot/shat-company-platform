// assets/js/views/standardsView.js
// Deep Dive International & Humanitarian Standards Guide
import { content } from '../content.js';

export function renderStandardsView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const list = d.standards;

  return `
    <div class="view-standards">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 820px;">
            <div class="section-badge">المرجعيات والمعايير الدولية • Domain 06</div>
            <h1 class="section-title" style="margin-bottom: 12px;">منظومة المعايير الدولية وتطبيقاتها المؤسسية</h1>
            <p class="section-desc">
              تسترشد شات، بحسب طبيعة ونطاق كل مهمة، بأدق المرجعيات الدولية والإنسانية المعتمدة. هذه المعايير تمثل الإطار التشغيلي الميداني الحاكم لبناء السياسات، مصفوفات تقييم المخاطر، وآليات المساءلة، والتقييم المستقل.
            </p>
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
                  <div class="bento-en" style="color: var(--shat-navy); font-weight: 700;">${st.en}</div>

                  <!-- Why it matters -->
                  <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 12px; border-right: 3px solid var(--shat-navy);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 3px;">
                      🎯 ما هو المعيار وما قيمته للمؤسسات؟
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
                      ${st.whyItMatters}
                    </p>
                  </div>

                  <!-- How SHAT applies it -->
                  <div style="background: var(--shat-green-tint); border: 1px solid var(--shat-green-border); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 12px; border-right: 3px solid var(--shat-green);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-green); margin-bottom: 3px;">
                      ⚡ كيف تطبقه شركة شات ميدانياً؟
                    </div>
                    <p style="font-size: 0.9rem; color: var(--shat-navy); line-height: 1.6; margin: 0;">
                      ${st.howShatApplies}
                    </p>
                  </div>

                  <!-- Tangible Deliverable -->
                  <div style="border: 1px dashed var(--border-medium); border-radius: var(--radius-xs); padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">
                      📦 المخرج المؤسسي المحقق:
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                      ${st.deliverable}
                    </div>
                  </div>
                </div>

                <div class="bento-footer">
                  <a href="${st.route}" class="btn-clean btn-primary btn-sm" style="width: 100%;">
                    <span>استكشف المسار التدريبي أو الخدمة المرتبطة</span>
                    <span>←</span>
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

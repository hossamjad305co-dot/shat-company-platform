// assets/js/views/servicesView.js
// Training & Consulting Systems & Specialized Portfolios
import { content } from '../content.js';

export function renderServicesView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const ts = d.trainingSystem;
  const cs = d.consultingSystem;
  const pf = d.portfolios;
  const sp = d.specializedConsulting;

  return `
    <div class="view-services">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">ما الذي نقدمه؟ • What We Do</div>
            <h1 class="section-title" style="margin-bottom: 12px;">منظومات التدريب والاستشارات المؤسسية</h1>
            <p class="section-desc">حلول تطبيقية متكاملة تنقل المؤسسات من التشخيص إلى التطوير ومن التوصية إلى التحسين المستمر.</p>
          </div>
        </div>
      </section>

      <!-- 1. Training System (7 Components) -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">الركيزة الأولى: التدريب وبناء القدرات</span>
            <h2 class="section-title">منظومة التدريب (The Training System)</h2>
            <p class="section-desc">منظومة متكاملة من 7 مراحل تضمن ربط مخرجات التعلم بالأداء الوظيفي الفعلي.</p>
          </div>

          <div class="bento-grid grid-3">
            ${ts.map(st => `
              <div class="bento-card">
                <div>
                  <div class="bento-header">
                    <span class="step-number" style="font-size: 1.4rem;">${st.num}</span>
                    <span class="bento-kicker">${st.en}</span>
                  </div>
                  <h4 class="bento-title" style="font-size: 1.1rem;">${st.name}</h4>
                  <p class="bento-text">${st.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 8 Specialized Portfolios -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">المجالات التخصصية</span>
            <h2 class="section-title">الحقائب التدريبية المتخصصة الثماني</h2>
            <p class="section-desc">حقائب تنفيذية معتمدة قائمة على الاحتياجات والجدارات في 8 قطاعات حيوية.</p>
          </div>

          <div class="bento-grid grid-4">
            ${pf.map(p => `
              <div class="bento-card" style="border-top: 3px solid var(--shat-green);">
                <div>
                  <div class="bento-header">
                    <span class="bento-kicker">${p.num}</span>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">معتمد</span>
                  </div>
                  <h4 class="bento-title" style="font-size: 1.05rem;">${p.name}</h4>
                  <div class="bento-en" style="font-size: 0.76rem;">${p.en}</div>
                  <p class="bento-text" style="font-size: 0.88rem;">${p.desc}</p>
                </div>
                <div class="bento-footer">
                  <a href="#/academy" class="btn-clean btn-secondary btn-sm" style="width: 100%;">
                    <span>تسجيل في المساق</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 2. Consulting System (8 Components) -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">الركيزة الثانية: الاستشارات المؤسسية</span>
            <h2 class="section-title">منظومة الاستشارات (The Consulting System)</h2>
            <p class="section-desc">مساعدة المؤسسات على فهم الواقع وتحديد الفجوات وبناء الأنظمة والسياسات الداخلية.</p>
          </div>

          <div class="bento-grid grid-4">
            ${cs.map(c => `
              <div class="bento-card">
                <div>
                  <h4 class="bento-title" style="font-size: 1.05rem; margin-bottom: 4px;">${c.name}</h4>
                  <div class="bento-en" style="font-size: 0.76rem; margin-bottom: 10px;">${c.en}</div>
                  <p class="bento-text" style="font-size: 0.88rem;">${c.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 3. Advanced Specialized Consulting (Protection & Independent Evaluation) -->
      <section class="section section-navy">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">تخصصات استشارية متقدمة</span>
            <h2 class="section-title">استشارات الحماية والتقييم المستقل</h2>
            <p class="section-desc">أعلى المعايير الدولية في صون السلامة والحماية، والتقييم المستقل للبرامج والمشاريع.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <!-- Protection Consulting -->
            <div class="bento-card">
              <div>
                <span class="section-badge">صون السلامة • PSEA</span>
                <h3 class="bento-title" style="font-size: 1.35rem; margin-top: 8px;">${sp.protection.title}</h3>
                <div class="bento-en">${sp.protection.en}</div>
                <p class="bento-text" style="margin-bottom: 20px;">${sp.protection.desc}</p>
              </div>
              <div class="bento-footer">
                <a href="#/contact" class="btn-clean btn-green btn-sm" style="width: 100%;">
                  <span>طلب استشارة في الحماية وصون السلامة</span>
                  <span>←</span>
                </a>
              </div>
            </div>

            <!-- Independent External Evaluation (OECD DAC) -->
            <div class="bento-card">
              <div>
                <span class="section-badge">OECD DAC • UNEG</span>
                <h3 class="bento-title" style="font-size: 1.35rem; margin-top: 8px;">${sp.evaluation.title}</h3>
                <div class="bento-en">${sp.evaluation.en}</div>
                <p class="bento-text" style="margin-bottom: 16px;">${sp.evaluation.desc}</p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  ${sp.evaluation.criteria.map(cr => `
                    <div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: var(--radius-xs); border-right: 2px solid #4ADE80;">
                      <div style="font-size: 0.8rem; font-weight: 800; color: #FFFFFF;">${cr.name.split('(')[0]}</div>
                      <div style="font-size: 0.72rem; color: #94A3B8;">${cr.desc.substring(0, 45)}...</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="bento-footer">
                <a href="#/contact" class="btn-clean btn-secondary btn-sm" style="width: 100%; border-color: rgba(255,255,255,0.2); background: transparent; color: #FFFFFF;">
                  <span>طلب تقييم خارجي مستقل لمشروع</span>
                  <span>←</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

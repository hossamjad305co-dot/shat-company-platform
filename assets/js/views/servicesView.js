// assets/js/views/servicesView.js
// Training & Consulting Systems & Specialized Portfolios with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

export function renderServicesView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const ts = d.trainingSystem;
  const cs = d.consultingSystem;
  const pf = d.portfolios;
  const sp = d.specializedConsulting;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const t = {
    badge: lang === 'fr' ? 'Ce que nous offrons' : (isRtl ? 'ما الذي نقدمه؟' : 'What We Do'),
    title: lang === 'fr' ? 'Systèmes de Formation et Conseil Institutionnel' : (isRtl ? 'منظومات التدريب والاستشارات المؤسسية' : 'Training Systems & Institutional Advisory'),
    desc: lang === 'fr' ? 'Des solutions appliquées guidant les organisations du diagnostic à l’amélioration continue.' : (isRtl ? 'حلول تطبيقية متكاملة تنقل المؤسسات من التشخيص إلى التطوير ومن التوصية إلى التحسين المستمر.' : 'Applied solutions transitioning institutions from diagnosis to sustainable enhancement.'),
    pillar1Badge: lang === 'fr' ? 'Pilier 1: Formation & Capacités' : (isRtl ? 'الركيزة الأولى: التدريب وبناء القدرات' : 'Pillar 1: Training & Capacity Development'),
    pillar1Title: lang === 'fr' ? 'Système de Formation Structuré' : (isRtl ? 'منظومة التدريب (The Training System)' : 'The Training System'),
    pillar1Desc: lang === 'fr' ? 'Un système en 7 étapes reliant directement les acquis au travail réel.' : (isRtl ? 'منظومة متكاملة من 7 مراحل تضمن ربط مخرجات التعلم بالأداء الوظيفي الفعلي.' : 'A 7-stage architecture ensuring direct translation of learning into field performance.'),
    portfoliosBadge: lang === 'fr' ? 'Domaines de Spécialisation' : (isRtl ? 'المجالات التخصصية' : 'Specialized Domains'),
    portfoliosTitle: lang === 'fr' ? 'Huit Portefeuilles de Formation Spécialisés' : (isRtl ? 'الحقائب التدريبية المتخصصة الثماني' : 'Eight Specialized Training Portfolios'),
    portfoliosDesc: lang === 'fr' ? 'Programmes certifiés répondant aux besoins de compétences dans 8 secteurs vitaux.' : (isRtl ? 'حقائب تنفيذية معتمدة قائمة على الاحتياجات والجدارات في 8 قطاعات حيوية.' : 'Certified curricula designed around competencies across 8 vital sectors.'),
    pillar2Badge: lang === 'fr' ? 'Pilier 2: Conseil Institutionnel' : (isRtl ? 'الركيزة الثانية: الاستشارات المؤسسية' : 'Pillar 2: Institutional Consulting'),
    pillar2Title: lang === 'fr' ? 'Système de Conseil et Gouvernance' : (isRtl ? 'منظومة الاستشارات (The Consulting System)' : 'The Consulting System'),
    pillar2Desc: lang === 'fr' ? 'Aider les organisations à structurer leurs politiques et optimiser leurs processus.' : (isRtl ? 'مساعدة المؤسسات على فهم الواقع وتحديد الفجوات وبناء الأنظمة والسياسات الداخلية.' : 'Assisting organizations in gap analysis, policy development, and governance structuring.'),
    specBadge: lang === 'fr' ? 'Spécialisations Avancées' : (isRtl ? 'تخصصات استشارية متقدمة' : 'Advanced Advisory Domains'),
    specTitle: lang === 'fr' ? 'Conseil en Sauvegarde et Évaluation Indépendante' : (isRtl ? 'استشارات الحماية والتقييم المستقل' : 'Safeguarding & Independent Evaluation'),
    specDesc: lang === 'fr' ? 'Les plus hauts standards internationaux pour la protection et l’évaluation de projets.' : (isRtl ? 'أعلى المعايير الدولية في صون السلامة والحماية، والتقييم المستقل للبرامج والمشاريع.' : 'Highest global standards in safeguarding, PSEA, and independent project evaluations.'),
    btnEnroll: lang === 'fr' ? "S'inscrire" : (isRtl ? 'التسجيل في المساق' : 'Enroll in Track'),
    btnPseaConsult: lang === 'fr' ? 'Demande de Conseil PSEA' : (isRtl ? 'طلب استشارة في الحماية وصون السلامة' : 'Request Safeguarding Advisory'),
    btnOecdEval: lang === 'fr' ? "Demande d'Évaluation Externe" : (isRtl ? 'طلب تقييم خارجي مستقل لمشروع' : 'Request Independent Evaluation')
  };

  return `
    <div class="view-services">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 800px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${t.title}</h1>
            <p class="section-desc">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- 1. Training System (7 Components) -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${t.pillar1Badge}</span>
            <h2 class="section-title">${t.pillar1Title}</h2>
            <p class="section-desc">${t.pillar1Desc}</p>
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
            <span class="section-badge">${t.portfoliosBadge}</span>
            <h2 class="section-title">${t.portfoliosTitle}</h2>
            <p class="section-desc">${t.portfoliosDesc}</p>
          </div>

          <div class="bento-grid grid-4">
            ${pf.map(p => `
              <div class="bento-card" style="border-top: 3px solid var(--shat-green);">
                <div>
                  <div class="bento-header">
                    <span class="bento-kicker">${p.num}</span>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${lang === 'fr' ? 'Certifié' : (isRtl ? 'معتمد' : 'Accredited')}</span>
                  </div>
                  <h4 class="bento-title" style="font-size: 1.05rem;">${p.name}</h4>
                  <div class="bento-en" style="font-size: 0.76rem;">${p.en}</div>
                  <p class="bento-text" style="font-size: 0.88rem;">${p.desc}</p>
                </div>
                <div class="bento-footer">
                  <a href="#/academy" class="btn-clean btn-secondary btn-sm" style="width: 100%;">
                    <span>${t.btnEnroll}</span>
                    <span>${arrow}</span>
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
            <span class="section-badge">${t.pillar2Badge}</span>
            <h2 class="section-title">${t.pillar2Title}</h2>
            <p class="section-desc">${t.pillar2Desc}</p>
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
            <span class="section-badge">${t.specBadge}</span>
            <h2 class="section-title">${t.specTitle}</h2>
            <p class="section-desc">${t.specDesc}</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <!-- Protection Consulting -->
            <div class="bento-card">
              <div>
                <span class="section-badge">PSEA • Safeguarding</span>
                <h3 class="bento-title" style="font-size: 1.35rem; margin-top: 8px;">${sp.protection.title}</h3>
                <div class="bento-en">${sp.protection.en}</div>
                <p class="bento-text" style="margin-bottom: 20px;">${sp.protection.desc}</p>
              </div>
              <div class="bento-footer">
                <a href="#/contact" class="btn-clean btn-green btn-sm" style="width: 100%;">
                  <span>${t.btnPseaConsult}</span>
                  <span>${arrow}</span>
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
              </div>
              <div class="bento-footer">
                <a href="#/contact" class="btn-clean btn-secondary btn-sm" style="width: 100%; border-color: rgba(255,255,255,0.2); background: transparent; color: #FFFFFF;">
                  <span>${t.btnOecdEval}</span>
                  <span>${arrow}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

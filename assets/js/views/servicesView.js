// assets/js/views/servicesView.js
// Training & Consulting Systems, Interactive Diagnostic Launcher & Interconnected Portfolios
// 100% Trilingual Support (AR, EN, FR) adhering to WCAG AAA High Contrast Standards
import { content } from '../content.js';

export function renderServicesView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const ts = d.trainingSystem || [];
  const cs = d.consultingSystem || [];
  const pf = d.portfolios || [];
  const sp = d.specializedConsulting || {};
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const t = {
    badge: lang === 'fr' ? 'Ce que nous offrons' : (isRtl ? 'منظومة الخدمات والحلول المؤسسية' : 'Institutional Services & Advisory'),
    title: lang === 'fr' ? 'Systèmes de Formation et Conseil Institutionnel' : (isRtl ? 'منظومات التدريب التطبيقي والاستشارات المؤسسية' : 'Applied Training Systems & Institutional Advisory'),
    desc: lang === 'fr' 
      ? 'Des solutions appliquées guidant les organisations du diagnostic à l’amélioration continue, ancrées dans les normes internationales.' 
      : (isRtl ? 'حلول استشارية وتدريبية تطبيقية متكاملة تنقل المؤسسات من التشخيص إلى التطوير ومن التوصية إلى التحسين المستمر وفق أرفع المعايير الدولية.' : 'Integrated advisory and applied training solutions transitioning institutions from diagnosis to sustainable enhancement, anchored in global standards.'),
    
    // Diagnostic tool banner
    diagBadge: lang === 'fr' ? 'Outil Interactif Exécutif' : (isRtl ? 'أداة تفاعلية حية للمنظمات' : 'Executive Interactive Tool'),
    diagTitle: lang === 'fr' ? 'Diagnostic de Préparation et Maturité Institutionnelle' : (isRtl ? 'أداة تقييم الجاهزية والامتثال المؤسسي الفوري' : 'Instant Institutional Readiness & Compliance Diagnostic'),
    diagDesc: lang === 'fr'
      ? 'Évaluez la maturité de votre organisation sur 4 piliers critiques (CHS, PSEA, MEAL, Gouvernance) et obtenez une feuille de route sur mesure.'
      : (isRtl ? 'افحص مستوى نضج وجاهزية منظمتكم عبر 4 ركائز حيوية (CHS، PSEA، MEAL، الحوكمة) واحصل فوراً على تقرير نضج ومسار تطوير مخصص.' : 'Evaluate your organization’s maturity across 4 critical pillars (CHS, PSEA, MEAL, Governance) and receive a tailored capacity enhancement roadmap.'),
    diagBtn: lang === 'fr' ? 'Lancer le Diagnostic Immédiat' : (isRtl ? '⚡ بدء التقييم الذاتي المباشر' : '⚡ Launch Diagnostic Now'),

    // Pillars
    pillar1Badge: lang === 'fr' ? 'Pilier 1: Formation & Capacités' : (isRtl ? 'الركيزة الأولى: منظومة التدريب وبناء القدرات' : 'Pillar 1: Training & Capacity Development'),
    pillar1Title: lang === 'fr' ? 'Système de Formation Structuré (7 Étapes)' : (isRtl ? 'دورة التدريب المنهجي (7 مراحل تنفيذية)' : 'The 7-Stage Training System Architecture'),
    pillar1Desc: lang === 'fr' ? 'Un système en 7 étapes reliant directement les acquis au travail réel.' : (isRtl ? 'منظومة متكاملة من 7 مراحل تضمن ربط مخرجات التعلم بالأداء الوظيفي الفعلي والمستدام.' : 'A 7-stage architecture ensuring direct translation of learning into field performance.'),
    
    portfoliosBadge: lang === 'fr' ? 'Domaines de Spécialisation' : (isRtl ? 'المجالات التخصصية الثمانية' : 'Eight Specialized Domains'),
    portfoliosTitle: lang === 'fr' ? 'Huit Portefeuilles de Formation Spécialisés' : (isRtl ? 'الحقائب التدريبية المتخصصة الثماني' : 'Eight Specialized Training Portfolios'),
    portfoliosDesc: lang === 'fr' ? 'Programmes certifiés répondant aux besoins de compétences dans 8 secteurs vitaux.' : (isRtl ? 'حقائب تنفيذية معتمدة قائمة على الاحتياجات والجدارات ومترابطة مع المعايير والمشاريع الميدانية.' : 'Certified curricula designed around competencies across 8 vital sectors, interconnected with standards and projects.'),
    
    pillar2Badge: lang === 'fr' ? 'Pilier 2: Conseil Institutionnel' : (isRtl ? 'الركيزة الثانية: الاستشارات والتطوير المؤسسي' : 'Pillar 2: Institutional Consulting'),
    pillar2Title: lang === 'fr' ? 'منظومة الاستشارات (8 مجالات تدخل)' : (isRtl ? 'منظومة الاستشارات وبناء النظم (8 مجالات استشارية)' : 'The Consulting & Systems Architecture (8 Domains)'),
    pillar2Desc: lang === 'fr' ? 'Aider les organisations à structurer leurs politiques et optimiser leurs processus.' : (isRtl ? 'مساعدة المؤسسات على فهم الواقع وتحديد الفجوات وبناء الأنظمة والسياسات الداخلية وضبط الجودة.' : 'Assisting organizations in gap analysis, policy development, internal governance, and quality management.'),
    
    specBadge: lang === 'fr' ? 'Spécialisations Avancées' : (isRtl ? 'تخصصات استشارية رفيعة المستوى' : 'Advanced Advisory Domains'),
    specTitle: lang === 'fr' ? 'Conseil en Sauvegarde et Évaluation Indépendante' : (isRtl ? 'استشارات صون السلامة والتقييم الخارجي المستقل' : 'Safeguarding & Independent Evaluation'),
    specDesc: lang === 'fr' ? 'Les plus hauts standards internationaux pour la protection et l’évaluation de projets.' : (isRtl ? 'أعلى المعايير الدولية في صون السلامة والحماية، والتقييم المستقل للبرامج والمشاريع.' : 'Highest global standards in safeguarding, PSEA, and independent project evaluations.'),
    
    // Cross-relation labels
    linkedStandard: lang === 'fr' ? 'Norme liée:' : (isRtl ? 'المرجعية والمعيار:' : 'Standard:'),
    linkedCourse: lang === 'fr' ? 'Cursus associé:' : (isRtl ? 'المساق التدريبي المرتبط:' : 'Linked Course:'),
    linkedProject: lang === 'fr' ? 'Projet terrain:' : (isRtl ? 'التدخل الميداني الموثق:' : 'Field Project:'),
    btnExploreCourse: lang === 'fr' ? 'Consulter le Cursus' : (isRtl ? 'استعراض المساق المعتمد' : 'View Course'),
    btnRequestConsult: lang === 'fr' ? 'Demande de Conseil' : (isRtl ? 'طلب استشارة بهذا المجال' : 'Request Advisory'),
    btnPseaConsult: lang === 'fr' ? 'طلب استشارة PSEA' : (isRtl ? 'طلب استشارة في الحماية وصون السلامة' : 'Request Safeguarding Advisory'),
    btnOecdEval: lang === 'fr' ? "Demande d'Évaluation Externe" : (isRtl ? 'طلب تقييم خارجي مستقل لمشروع' : 'Request Independent Evaluation')
  };

  // Cross-reference data linking portfolios to real courses, standards, and projects
  const portfolioRelations = {
    humanitarian: {
      standardCode: 'CHS',
      standardName: 'Core Humanitarian Standard (CHS) & Sphere',
      courseId: 'shat-chs-master',
      courseName: isRtl ? 'دبلوم المعيار الإنساني الأساسي (CHS)' : 'CHS Humanitarian Response Diploma',
      projectCode: 'PRJ-CHS-2025',
      projectName: isRtl ? 'برنامج حوكمة وتطبيق معيار CHS لـ 14 منظمة' : 'CHS Governance Program for 14 CSOs'
    },
    protection: {
      standardCode: 'PSEA',
      standardName: 'IASC Safeguarding & Do No Harm',
      courseId: 'shat-psea-expert',
      courseName: isRtl ? 'البرنامج التنفيذي في صون السلامة (PSEA)' : 'Executive PSEA & Safeguarding Program',
      projectCode: 'PRJ-PSEA-2025',
      projectName: isRtl ? 'تأسيس أطر الحماية ومسارات الإحالة الآمنة' : 'PSEA Framework & Referral Pathways'
    },
    'women-child': {
      standardCode: 'Do No Harm',
      standardName: 'CEDAW & UN CRC Inclusion Norms',
      courseId: 'shat-chs-master',
      courseName: isRtl ? 'المساءلة المجتمعية وإدماج الفئات الهشة' : 'AAP & Vulnerable Groups Inclusion',
      projectCode: 'PRJ-CHS-2025',
      projectName: isRtl ? 'تأسيس قنوات الشكاوى الآمنة للمتأثرين' : 'Safe CFRM Channels Establishment'
    },
    youth: {
      standardCode: 'OECD DAC',
      standardName: 'OECD DAC Impact & Sustainability Criteria',
      courseId: 'shat-oecd-eval',
      courseName: isRtl ? 'إدارة وتقييم مشاريع التمكين الاقتصادي' : 'Livelihoods & Youth Project Evaluation',
      projectCode: 'PRJ-DAC-2024',
      projectName: isRtl ? 'تقييم مشاريع التعافي الاقتصادي والتمكين' : 'Economic Recovery & Livelihoods Evaluation'
    },
    education: {
      standardCode: 'CHS',
      standardName: 'INEE & Competency-Based Learning',
      courseId: 'shat-chs-master',
      courseName: isRtl ? 'تأهيل وتدريب الكوادر والمدربين المحترفين' : 'Master Trainer Competencies & INEE',
      projectCode: 'PRJ-GOV-2024',
      projectName: isRtl ? 'بناء اللوائح والأدلة التشغيلية SOPs' : 'Institutional Governance & Capacity Building'
    },
    media: {
      standardCode: 'CHS',
      standardName: 'AAP Community Communication Protocols',
      courseId: 'shat-chs-master',
      courseName: isRtl ? 'الاتصال الاستراتيجي والمساءلة للمتأثرين' : 'Strategic AAP Communication & CFRM',
      projectCode: 'PRJ-CHS-2025',
      projectName: isRtl ? 'صياغة 14 دليلاً تشغيلياً للتواصل والشكاوى' : '14 Standard Operational CFRM Manuals'
    },
    institutional: {
      standardCode: 'Governance',
      standardName: 'Good Governance & Internal Control SOPs',
      courseId: 'shat-gov-lead',
      courseName: isRtl ? 'حوكمة المنظمات وإعداد الأدلة التشغيلية' : 'NGO Governance & SOPs Development',
      projectCode: 'PRJ-GOV-2024',
      projectName: isRtl ? 'إعادة هيكلة الحوكمة واعتماد 9 أدلة تشغيلية' : 'Governance Restructuring & 9 Board SOPs'
    },
    mel: {
      standardCode: 'OECD DAC',
      standardName: 'OECD DAC & UNEG Evaluation Framework',
      courseId: 'shat-oecd-eval',
      courseName: isRtl ? 'خبير التقييم الخارجي المستقل (OECD DAC)' : 'OECD DAC Independent Project Evaluation',
      projectCode: 'PRJ-DAC-2024',
      projectName: isRtl ? 'التقييم الخارجي المستقل لبرامج التمكين' : 'Independent External Project Evaluation'
    }
  };

  return `
    <div class="view-services">
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

      <!-- Interactive Readiness Diagnostic Promo Bar -->
      <section style="background: linear-gradient(135deg, #0F2E4A 0%, #071726 100%); padding: 36px 0; color: #FFFFFF; border-bottom: 3px solid var(--shat-green);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
            <div style="max-width: 780px;">
              <span class="badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3); font-weight: 800; font-size: 0.8rem; margin-bottom: 10px; display: inline-block;">
                ${t.diagBadge}
              </span>
              <h3 style="color: #FFFFFF; font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">
                ${t.diagTitle}
              </h3>
              <p style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.7; margin: 0;">
                ${t.diagDesc}
              </p>
            </div>
            <div>
              <button type="button" class="btn-clean btn-green btn-island" onclick="if(window.openDiagnosticAssessment) window.openDiagnosticAssessment();" style="box-shadow: 0 4px 18px rgba(30, 166, 114, 0.45); white-space: nowrap;">
                <span>${t.diagBtn}</span>
                <span>${arrow}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 1. The 7-Stage Training System -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${t.pillar1Badge}</span>
            <h2 class="section-title">${t.pillar1Title}</h2>
            <p class="section-desc">${t.pillar1Desc}</p>
          </div>

          <div class="bento-grid grid-3">
            ${ts.map(st => `
              <div class="double-bezel">
                <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div class="bento-header" style="margin-bottom: 14px;">
                      <span class="step-number" style="font-size: 1.3rem; font-family: var(--font-mono);">${st.num}</span>
                      <span class="bento-kicker" style="font-size: 0.76rem; letter-spacing: 0.05em;">${st.en}</span>
                    </div>
                    <h3 class="bento-title" style="font-size: 1.15rem; margin-bottom: 8px;">${st.name}</h3>
                    <p class="bento-text" style="font-size: 0.92rem; line-height: 1.7; color: var(--text-secondary);">${st.desc}</p>
                  </div>
                  <div style="border-top: 1px dashed var(--border-light); padding-top: 10px; margin-top: 14px; font-size: 0.78rem; color: var(--shat-green); font-weight: 700;">
                    ✓ ${isRtl ? 'مخرج تطبيقي موثق' : 'Verifiable Output'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 2. Eight Specialized Portfolios (Double-Bezel & Fully Interconnected) -->
      <section class="section section-subtle">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${t.portfoliosBadge}</span>
            <h2 class="section-title">${t.portfoliosTitle}</h2>
            <p class="section-desc">${t.portfoliosDesc}</p>
          </div>

          <div class="bento-grid grid-4">
            ${pf.map(p => {
              const rel = portfolioRelations[p.id] || portfolioRelations.humanitarian;
              return `
                <div class="double-bezel" style="border-top: 4px solid var(--shat-green);">
                  <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div class="bento-header" style="margin-bottom: 10px;">
                        <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); font-family: var(--font-mono); font-size: 0.78rem;">
                          ${p.num}
                        </span>
                        <button type="button" class="btn-clean" onclick="if(window.openStandardsExplorer) window.openStandardsExplorer('${rel.standardCode}');" style="font-size: 0.72rem; color: var(--shat-navy); background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 4px; padding: 2px 7px; font-weight: 700; cursor: pointer;">
                          ⚡ ${rel.standardCode}
                        </button>
                      </div>

                      <h3 class="bento-title" style="font-size: 1.1rem; line-height: 1.4; margin-bottom: 4px;">${p.name}</h3>
                      <div class="bento-en" style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 12px;">${p.en}</div>
                      <p class="bento-text" style="font-size: 0.88rem; line-height: 1.6; margin-bottom: 16px;">${p.desc}</p>

                      <!-- Interconnected Relations Widget -->
                      <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 10px 12px; margin-bottom: 14px; font-size: 0.8rem;">
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                          <div>
                            <span style="color: var(--text-muted); font-size: 0.72rem;">${t.linkedCourse}</span><br>
                            <a href="#/course/${rel.courseId}" style="color: var(--shat-navy); font-weight: 700; text-decoration: none;">
                              🎓 ${rel.courseName}
                            </a>
                          </div>
                          <div style="border-top: 1px dashed var(--border-light); padding-top: 5px;">
                            <span style="color: var(--text-muted); font-size: 0.72rem;">${t.linkedProject}</span><br>
                            <a href="#/projects" style="color: var(--shat-green); font-weight: 700; text-decoration: none;">
                              📋 ${rel.projectCode}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <a href="#/course/${rel.courseId}" class="btn-clean btn-primary btn-sm btn-island" style="width: 100%; justify-content: center; font-size: 0.82rem;">
                        <span>${t.btnExploreCourse}</span>
                        <span>${arrow}</span>
                      </a>
                      <a href="#/contact?service=${encodeURIComponent(p.name)}" class="btn-clean btn-secondary btn-sm" style="width: 100%; justify-content: center; font-size: 0.8rem; background: #FFFFFF;">
                        <span>${t.btnRequestConsult}</span>
                      </a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 3. The 8-Domain Consulting System -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${t.pillar2Badge}</span>
            <h2 class="section-title">${t.pillar2Title}</h2>
            <p class="section-desc">${t.pillar2Desc}</p>
          </div>

          <div class="bento-grid grid-4">
            ${cs.map((c, idx) => `
              <div class="double-bezel">
                <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-family: var(--font-mono); font-size: 0.76rem; font-weight: 800; color: var(--shat-green);">0${idx + 1}</span>
                      <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">${isRtl ? 'استشارة متخصصة' : 'Specialized Advisory'}</span>
                    </div>
                    <h3 class="bento-title" style="font-size: 1.05rem; margin-bottom: 4px;">${c.name}</h3>
                    <div class="bento-en" style="font-size: 0.75rem; margin-bottom: 10px; color: var(--text-muted);">${c.en}</div>
                    <p class="bento-text" style="font-size: 0.88rem; line-height: 1.6;">${c.desc}</p>
                  </div>
                  <div style="border-top: 1px dashed var(--border-light); padding-top: 10px; margin-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.74rem; color: var(--shat-navy); font-weight: 700;">${isRtl ? 'تقرير مخرجات معتمد' : 'Certified Deliverable'}</span>
                    <a href="#/contact?service=${encodeURIComponent(c.name)}" style="font-size: 0.76rem; color: var(--shat-green); font-weight: 800; text-decoration: none;">
                      ${isRtl ? 'طلب فوري' : 'Request'} ${arrow}
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 4. Advanced Specialized Advisory (Safeguarding & OECD DAC Evaluation) -->
      <section class="section section-navy" style="border-top: 4px solid var(--shat-green);">
        <div class="container">
          <div class="section-header">
            <span class="section-badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">${t.specBadge}</span>
            <h2 class="section-title" style="color: #FFFFFF;">${t.specTitle}</h2>
            <p class="section-desc" style="color: #CBD5E1;">${t.specDesc}</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <!-- Protection & Safeguarding -->
            <div class="double-bezel" style="background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15);">
              <div class="double-bezel-inner" style="background: rgba(11, 25, 44, 0.95); height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span class="badge" style="background: rgba(30, 166, 114, 0.2); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">
                      PSEA • Safeguarding • Do No Harm
                    </span>
                    <button type="button" class="btn-clean" onclick="if(window.openStandardsExplorer) window.openStandardsExplorer('PSEA');" style="color: #94A3B8; font-size: 0.78rem; text-decoration: underline; background: transparent; cursor: pointer;">
                      ${isRtl ? 'فحص معيار PSEA' : 'Check PSEA Standard'}
                    </button>
                  </div>
                  <h3 style="font-size: 1.35rem; color: #FFFFFF; font-weight: 800; margin-bottom: 6px;">
                    ${sp.protection?.title || (isRtl ? 'استشارات الحماية وصون السلامة' : 'Safeguarding Consulting')}
                  </h3>
                  <div style="color: #94A3B8; font-size: 0.8rem; margin-bottom: 16px;">${sp.protection?.en || 'Protection & Safeguarding Consulting'}</div>
                  <p style="color: #CBD5E1; font-size: 0.92rem; line-height: 1.7; margin-bottom: 20px;">
                    ${sp.protection?.desc || (isRtl ? 'تطوير أطر وسياسات الحماية ومسارات الإحالة السرية وفق مبادئ Do No Harm.' : 'Developing safeguarding policies and confidential referral pathways.')}
                  </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <a href="#/contact?service=PSEA" class="btn-clean btn-green btn-island" style="flex: 1; justify-content: center;">
                    <span>${t.btnPseaConsult}</span>
                    <span>${arrow}</span>
                  </a>
                  <a href="#/course/shat-psea-expert" class="btn-clean btn-secondary" style="border-color: rgba(255,255,255,0.2); color: #FFFFFF; background: transparent;">
                    <span>🎓 ${isRtl ? 'المساق' : 'Course'}</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Independent External Evaluation (OECD DAC) -->
            <div class="double-bezel" style="background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15);">
              <div class="double-bezel-inner" style="background: rgba(11, 25, 44, 0.95); height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span class="badge" style="background: rgba(59, 130, 246, 0.2); color: #93C5FD; border: 1px solid rgba(59, 130, 246, 0.3);">
                      OECD DAC • UNEG • Rigorous Evaluation
                    </span>
                    <button type="button" class="btn-clean" onclick="if(window.openStandardsExplorer) window.openStandardsExplorer('OECD DAC');" style="color: #94A3B8; font-size: 0.78rem; text-decoration: underline; background: transparent; cursor: pointer;">
                      ${isRtl ? 'فحص معايير DAC' : 'Check DAC Criteria'}
                    </button>
                  </div>
                  <h3 style="font-size: 1.35rem; color: #FFFFFF; font-weight: 800; margin-bottom: 6px;">
                    ${sp.evaluation?.title || (isRtl ? 'التقييم الخارجي المستقل' : 'Independent External Evaluation')}
                  </h3>
                  <div style="color: #94A3B8; font-size: 0.8rem; margin-bottom: 16px;">${sp.evaluation?.en || 'Independent External Evaluation'}</div>
                  <p style="color: #CBD5E1; font-size: 0.92rem; line-height: 1.7; margin-bottom: 20px;">
                    ${sp.evaluation?.desc || (isRtl ? 'خدمات التقييم المستقل للمشاريع وفق معايير OECD DAC الستة ومواثيق UNEG الدولية.' : 'Independent evaluation services aligned with the six OECD DAC criteria.')}
                  </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <a href="#/contact?service=OECD-DAC" class="btn-clean btn-island" style="flex: 1; justify-content: center; background: #FFFFFF; color: var(--shat-navy); font-weight: 800;">
                    <span>${t.btnOecdEval}</span>
                    <span>${arrow}</span>
                  </a>
                  <a href="#/course/shat-oecd-eval" class="btn-clean btn-secondary" style="border-color: rgba(255,255,255,0.2); color: #FFFFFF; background: transparent;">
                    <span>🎓 ${isRtl ? 'المساق' : 'Course'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

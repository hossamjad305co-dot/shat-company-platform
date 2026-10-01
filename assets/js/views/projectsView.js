// assets/js/views/projectsView.js
// Corporate Projects & Field Interventions View with Category Filtering & Interactive Tools
// 100% Trilingual Support (AR, EN, FR) & WCAG AAA High Contrast Design
import { api } from '../services/api/apiClient.js';

export function renderProjectsView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const projects = [
    {
      code: 'PRJ-CHS-2025',
      category: 'chs',
      title: txt(
        'حوكمة وتطبيق المعيار الإنساني الأساسي (CHS) لمنظمات المجتمع المدني',
        'CHS Implementation & Governance Program for CSOs',
        'Programme de Gouvernance et de Déploiement de la Norme CHS pour les OSC'
      ),
      client: txt(
        'ائتلاف المنظمات الإنسانية والتنموية • قطاع غزة والضفة الغربية',
        'Humanitarian & Development CSOs Coalition • Gaza & West Bank',
        'Coalition des OSC Humanitaires et de Développement • Gaza et Cisjordanie'
      ),
      duration: txt('8 أشهر • مكتمل وموثق', '8 Months • Successfully Completed', '8 Mois • Mené à bien'),
      standardCode: 'CHS',
      standardLabel: 'Core Humanitarian Standard (CHS) & AAP',
      linkedCourseId: 'shat-chs-master',
      linkedCourseTitle: txt('دبلوم المعيار الإنساني الأساسي', 'CHS Master Diploma', 'Cursus Supérieur CHS'),
      summary: txt(
        'بناء القدرات المؤسسية وتطوير سياسات المساءلة للمتأثرين (AAP) وقنوات الشكاوى والمقترحات السرية (CFRM) لـ 14 منظمة أهلية وفق الالتزامات التسعة.',
        'Institutional capacity strengthening and AAP/CFRM complaints mechanism design for 14 local NGOs aligned with the 9 CHS commitments.',
        'Renforcement des capacités institutionnelles et structuration des mécanismes de redevabilité (AAP/CFRM) pour 14 ONG locales selon les 9 engagements CHS.'
      ),
      outcomes: [
        txt('تأهيل 42 كادراً قيادياً في مجالات المساءلة والامتثال الإنساني', 'Trained 42 executive leaders in accountability', '42 cadres dirigeants formés à la redevabilité et à la conformité'),
        txt('صياغة 14 دليلاً تشغيلياً معتمداً للشكاوى والحماية الميدانية', 'Drafted 14 operational CFRM manuals', '14 manuels opérationnels de gestion des plaintes homologués'),
        txt('إجراء تدقيق ميداني شامل للجاهزية والنزاهة المؤسسية والشفافية', 'Conducted field baseline readiness audits', 'Audits de préparation et d’intégrité institutionnelle réalisés')
      ]
    },
    {
      code: 'PRJ-PSEA-2025',
      category: 'psea',
      title: txt(
        'تأسيس أطر الحماية وصون السلامة ومنع الاستغلال والانتهاك (PSEA)',
        'Protection & Safeguarding (PSEA) Framework Establishment',
        'Établissement du Cadre de Sauvegarde et Prévention des Abus (PSEA)'
      ),
      client: txt(
        'شبكة حماية الطفولة والبرامج الإغاثية المشتركة',
        'Child Protection & Emergency Relief Network',
        'Réseau de Protection de l’Enfance et Secours d’Urgence'
      ),
      duration: txt('6 أشهر • معتمد رسمياً', '6 Months • Formally Certified', '6 Mois • Certifié Officiellement'),
      standardCode: 'PSEA',
      standardLabel: 'IASC Safeguarding & Do No Harm Principles',
      linkedCourseId: 'shat-psea-expert',
      linkedCourseTitle: txt('البرنامج التنفيذي في صون السلامة', 'Executive PSEA Program', 'Programme Exécutif PSEA'),
      summary: txt(
        'تصميم مدونات السلوك المؤسسية، وتأسيس مسارات الإحالة الآمنة والسرية، وتدريب لجان الحماية على فحص مخاطر الاستغلال في العمليات الميدانية وتوزيع المساعدات.',
        'Designing institutional codes of conduct, safe referral pathways, and training protection committees on risk screening.',
        'Conception des codes de conduite institutionnels, mise en place des circuits de signalement sécurisés et formation des comités de protection.'
      ),
      outcomes: [
        txt('اعتماد سياسة صون السلامة وحماية الطفل في 8 مؤسسات شريكة', 'PSEA & Child Safeguarding policies adopted by 8 entities', 'Politiques PSEA et protection de l’enfance adoptées par 8 institutions'),
        txt('تأسيس وحدة تحقيق سرية مدربة للتعامل مع الشكاوى الحساسة', 'Trained confidential internal investigation units', 'Unités d’enquête interne confidentielles formées aux plaintes sensibles'),
        txt('مواءمة إجراءات التوظيف والتعاقد مع معايير التدقيق المسبق', 'Vetting & background checks integrated into HR SOPs', 'Procédures de recrutement alignées sur les vérifications d’antécédents')
      ]
    },
    {
      code: 'PRJ-DAC-2024',
      category: 'evaluation',
      title: txt(
        'التقييم الخارجي المستقل لمشاريع التعافي الاقتصادي والتمكين',
        'OECD DAC Independent External Evaluation for Livelihoods',
        'Évaluation Externe Indépendante OCDE CAD pour les Moyens de Subsistance'
      ),
      client: txt('وكالة تنموية دولية مانحة', 'International Donor Agency', 'Agence Internationale de Coopération et Développement'),
      duration: txt('4 أشهر • تقرير نهائي منشور', '4 Months • Published Final Report', '4 Mois • Rapport Final Publié'),
      standardCode: 'OECD DAC',
      standardLabel: 'OECD DAC Criteria (Relevance, Efficiency, Impact, Sustainability)',
      linkedCourseId: 'shat-oecd-eval',
      linkedCourseTitle: txt('خبير التقييم الخارجي المستقل', 'OECD DAC Evaluator Certification', 'Certification Évaluateur OCDE CAD'),
      summary: txt(
        'تقييم مستقل وشامل لأثر برامج التدريب المهني والمنح النقدية الصغيرة، استند إلى 180 مقابلة ميدانية و12 حلقة نقاش بؤرية وفق المعايير الستة المعتمدة.',
        'Independent evaluation assessing livelihoods and cash grants, based on 180 field interviews and 12 focus group discussions.',
        'Évaluation indépendante d’impact sur les programmes de formation professionnelle et micro-subventions, fondée sur 180 entretiens et 12 groupes de discussion.'
      ),
      outcomes: [
        txt('تحليل معدلات استدامة المشاريع الصغيرة بعد 12 شهراً من التمويل', '12-month post-intervention sustainability analytics', 'Analyse de durabilité des micro-projets après 12 mois de clôture'),
        txt('إصدار مصفوفة توصيات تنفيذية لصناع القرار والمانحين الدوليين', 'Strategic executive recommendations for donors', 'Recommandations stratégiques formulées aux bailleurs et décideurs'),
        txt('توثيق أفضل الممارسات وقصص الأثر الإيجابي للتحسين المستمر', 'Documented impact stories and institutional learning', 'Capitalisation des bonnes pratiques et récits d’impact positif')
      ]
    },
    {
      code: 'PRJ-GOV-2024',
      category: 'governance',
      title: txt(
        'إعادة هيكلة الحوكمة وتطوير اللوائح التشغيلية (SOPs)',
        'Governance Restructuring & Operational SOPs Development',
        'Restructuration de la Gouvernance et Élaboration des Procédures SOP'
      ),
      client: txt('المؤسسة الوطنية للتنمية الاجتماعية', 'National Social Development Foundation', 'Fondation Nationale pour le Développement Social'),
      duration: txt('5 أشهر • معتمد من مجلس الإدارة', '5 Months • Board Approved', '5 Mois • Validé par le CA'),
      standardCode: 'Governance',
      standardLabel: 'Institutional Governance & Accountability Standards',
      linkedCourseId: 'shat-gov-lead',
      linkedCourseTitle: txt('دبلوم حوكمة المنظمات وبناء النظم', 'NGO Governance & SOPs Diploma', 'Diplôme de Gouvernance des ONG'),
      summary: txt(
        'إعداد الهيكل التنظيمي المتكامل، بطاقات الوصف الوظيفي، اللائحة المالية والإدارية، ولائحة المشتريات واللوازم بما يتوافق مع متطلبات الامتثال الدولية.',
        'Developing comprehensive organizational charts, job descriptions, financial, HR, and procurement SOPs.',
        'Élaboration d’organigrammes fonctionnels, fiches de poste, manuels de procédures financières, RH et passation des marchés selon les normes de conformité.'
      ),
      outcomes: [
        txt('إعداد 9 أدلة تشغيلية قياسية معتمدة من مجلس الإدارة رسمياً', '9 board-approved standard operating procedures', '9 manuels de procédures opérationnelles approuvés par le conseil d’administration'),
        txt('مواءمة إدارة المخاطر وتضارب المصالح مع المعايير الفضلى', 'Risk management & conflict of interest protocols', 'Protocoles de gestion des risques et de conflits d’intérêts formalisés'),
        txt('تحسين كفاءة اتخاذ القرار وتوزيع المسؤوليات بنسبة 40%', 'Decision-making workflow efficiency boosted by 40%', 'Efficacité décisionnelle et fluidité managériale améliorées de 40%')
      ]
    }
  ];

  const t = {
    badge: txt('سجل الإنجاز والخبرة الميدانية • Track Record', 'Track Record & Institutional Interventions', 'Bilan des Réalisations & Projets'),
    title: txt('المشاريع والتدخلات الاستشارية المعتمدة ميدانياً', 'Featured Institutional Interventions & Evaluations', 'Projets et Interventions Institutionnelles de Référence'),
    desc: txt(
      'نماذج واقعية من التدخلات المؤسسية، وعمليات التقييم الخارجي المستقل، وتطوير أطر الحوكمة وصون السلامة التي نفذها خبراء شركة شات لصالح المنظمات الشريكة.',
      'Selected institutional interventions, independent external evaluations, and governance frameworks delivered by SHAT experts.',
      'Interventions institutionnelles, évaluations indépendantes et cadres de gouvernance réalisés par les experts de SHAT.'
    ),
    filterAll: txt('كافة المشاريع والتدخلات', 'All Interventions', 'Toutes les Interventions'),
    filterChs: txt('المعيار الإنساني (CHS)', 'Humanitarian (CHS)', 'Humanitaire (CHS)'),
    filterPsea: txt('صون السلامة (PSEA)', 'Safeguarding (PSEA)', 'Sauvegarde (PSEA)'),
    filterEval: txt('التقييم المستقل (OECD DAC)', 'Evaluation (OECD DAC)', 'Évaluation (OCDE)'),
    filterGov: txt('الحوكمة والنظم (SOPs)', 'Governance & SOPs', 'Gouvernance (SOP)'),
    clientLabel: txt('الجهة الشريكة:', 'Partner / Client:', 'Partenaire / Client :'),
    standardLabel: txt('المرجعية المعتمدة:', 'Standard:', 'Norme :'),
    outcomesTitle: txt('أهم المخرجات والنتائج المحققة:', 'Key Deliverables & Documented Outcomes:', 'Livrables Clés et Résultats Obtenus :'),
    verifiedDocs: txt('توثيق مؤسسي رسمي', 'Officially Verified & Documented', 'Documentation Officiellement Validée'),
    btnRequestSimilar: txt('طلب تدخل مماثل', 'Request Similar Intervention', 'Demander une Intervention Similaire'),
    btnDownloadSummary: txt('تحميل ملخص المخرجات (PDF)', 'Download Summary (PDF)', 'Télécharger la Synthèse (PDF)'),
    ctaTitle: txt(
      'هل تحتاج مؤسستكم إلى تقييم مستقل أو تطوير مؤسسي معتمد؟',
      'Does your organization require independent evaluation or institutional development?',
      'Votre organisation a-t-elle besoin d’une évaluation indépendante ou d’un appui institutionnel ?'
    ),
    ctaDesc: txt(
      'يقدم فريق خبراء شركة شات دراسات الجدوى والتقييم المؤسسي وصياغة السياسات التشغيلية وفق أعلى معايير الجودة الدولية.',
      'SHAT’s expert team delivers feasibility studies, institutional audits, and policy formulations aligned with premier international standards.',
      'Nos experts réalisent des études de faisabilité, audits institutionnels et manuels de procédures conformes aux standards internationaux.'
    ),
    ctaBtn: txt('طلب استشارة وعرض فني متكامل', 'Request Consulting & Technical Proposal', 'Demander une Proposition Technique')
  };

  return `
    <div class="view-projects">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="max-width: 860px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 14px; font-weight: 900; color: var(--shat-navy);">${t.title}</h1>
            <p class="section-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">${t.desc}</p>
          </div>

          <!-- Category Filter Tabs -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 32px;" id="projects-filter-bar">
            <button class="btn-clean project-filter-btn active" data-filter="all" style="padding: 8px 18px; border-radius: 9999px; font-size: 0.86rem; font-weight: 700; border: 1px solid var(--shat-navy); background: var(--shat-navy); color: #FFFFFF;">
              ${t.filterAll}
            </button>
            <button class="btn-clean project-filter-btn" data-filter="chs" style="padding: 8px 18px; border-radius: 9999px; font-size: 0.86rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
              ${t.filterChs}
            </button>
            <button class="btn-clean project-filter-btn" data-filter="psea" style="padding: 8px 18px; border-radius: 9999px; font-size: 0.86rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
              ${t.filterPsea}
            </button>
            <button class="btn-clean project-filter-btn" data-filter="evaluation" style="padding: 8px 18px; border-radius: 9999px; font-size: 0.86rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
              ${t.filterEval}
            </button>
            <button class="btn-clean project-filter-btn" data-filter="governance" style="padding: 8px 18px; border-radius: 9999px; font-size: 0.86rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
              ${t.filterGov}
            </button>
          </div>
        </div>
      </section>

      <!-- Projects Grid -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-2" id="projects-cards-container">
            ${projects.map(p => `
              <div class="double-bezel project-card" data-category="${p.category}" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column;">
                <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div class="bento-header" style="margin-bottom: 12px;">
                      <span class="badge" style="font-size: 0.82rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); background: var(--shat-green-tint); border: 1px solid var(--shat-green-border);">
                        ${p.code}
                      </span>
                      <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                        ⏱️ ${p.duration}
                      </span>
                    </div>

                    <h3 class="bento-title" style="font-size: 1.3rem; font-weight: 900; margin-bottom: 8px; line-height: 1.4;">${p.title}</h3>
                    
                    <div style="font-size: 0.85rem; color: var(--shat-navy); font-weight: 700; margin-bottom: 10px;">
                      ${t.clientLabel} <span style="color: var(--text-secondary); font-weight: 600;">${p.client}</span>
                    </div>
                    
                    <!-- Standard Tag with Tool Trigger -->
                    <div style="margin-bottom: 14px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                      <button type="button" class="btn-clean" onclick="if(window.openStandardsExplorer) window.openStandardsExplorer('${p.standardCode}');" style="background: #EFF6FF; color: #1D4ED8; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; border: 1px solid #BFDBFE; cursor: pointer;">
                        ⚡ ${t.standardLabel} ${p.standardLabel}
                      </button>
                      <a href="#/course/${p.linkedCourseId}" style="font-size: 0.78rem; color: var(--shat-green); font-weight: 700; text-decoration: none;">
                        🎓 ${p.linkedCourseTitle}
                      </a>
                    </div>

                    <p class="bento-text" style="margin-bottom: 18px; font-size: 0.92rem; line-height: 1.7; color: var(--text-secondary);">
                      ${p.summary}
                    </p>

                    <!-- Outcomes List -->
                    <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 16px; margin-bottom: 18px; border: 1px solid var(--border-light);">
                      <div style="font-size: 0.82rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">${t.outcomesTitle}</div>
                      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0;">
                        ${p.outcomes.map(o => `
                          <li style="font-size: 0.88rem; color: var(--text-main); display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;">
                            <span style="color: var(--shat-green); font-weight: bold; flex-shrink: 0;">✓</span>
                            <span>${o}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>

                  <!-- Footer Actions & Download Interceptor -->
                  <div style="border-top: 1px solid var(--border-light); padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <!-- Direct Interception via Permission Guard for Unauthenticated Members -->
                    <button type="button" class="btn-clean btn-download-case" data-project="${p.code}" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light); font-size: 0.8rem; font-weight: 700; padding: 6px 12px; border-radius: var(--radius-xs);">
                      📥 ${t.btnDownloadSummary}
                    </button>

                    <a href="#/contact?project=${encodeURIComponent(p.code)}" class="btn-clean btn-primary btn-sm btn-island">
                      <span>${t.btnRequestSimilar}</span>
                      <span>${arrow}</span>
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom CTA -->
          <div class="double-bezel" style="margin-top: 48px; border-color: var(--shat-green);">
            <div class="double-bezel-inner" style="padding: 40px; text-align: center; background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);">
              <h3 style="font-size: 1.45rem; color: var(--shat-navy); font-weight: 800; margin-bottom: 10px;">${t.ctaTitle}</h3>
              <p style="font-size: 1rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto 24px auto; line-height: 1.8;">
                ${t.ctaDesc}
              </p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="#/contact" class="btn-clean btn-primary btn-lg btn-island">
                  <span>${t.ctaBtn}</span>
                  <span>${arrow}</span>
                </a>
                <button type="button" class="btn-clean btn-green btn-lg btn-island" onclick="if(window.openDiagnosticAssessment) window.openDiagnosticAssessment();">
                  <span>⚡ ${txt('فحص الجاهزية المؤسسية للمشروع', 'Project Readiness Diagnostic', 'Diagnostic de Projet')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function bindProjectsEvents() {
  // Category tab filtering
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.color = 'var(--text-main)';
        b.style.borderColor = 'var(--border-medium)';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--shat-navy)';
      btn.style.color = '#FFFFFF';
      btn.style.borderColor = 'var(--shat-navy)';

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Download case study button -> Enforce Rule 1: unauthenticated users intercepted by permission guard
  document.querySelectorAll('.btn-download-case').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-project') || 'PRJ';
      const currentUser = api.currentUser;
      if (currentUser) {
        // Authenticated: trigger simulated download
        const dummyLink = document.createElement('a');
        dummyLink.href = `/api/files/download/${code}_Summary_2026.pdf`;
        dummyLink.download = `${code}_Summary_2026.pdf`;
        document.body.appendChild(dummyLink);
        dummyLink.click();
        document.body.removeChild(dummyLink);
      } else {
        // Intercept with Permission Guard
        if (window.openPermissionGuard) {
          window.openPermissionGuard(`تقرير المخرجات الميدانية للمشروع (${code})`, 'student');
        }
      }
    });
  });
}

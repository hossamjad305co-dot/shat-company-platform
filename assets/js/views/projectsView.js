// assets/js/views/projectsView.js
// Corporate Projects & Field Interventions View with M&E Live Indicators & Interactive Briefs
// 100% Trilingual Support (AR, EN, FR) & WCAG AAA High Contrast Design
import { api } from '../services/api/apiClient.js';

export const PROJECTS_REGISTRY = [
  {
    code: 'PRJ-CHS-2025',
    category: 'chs',
    titleAr: 'حوكمة وتطبيق المعيار الإنساني الأساسي (CHS) لمنظمات المجتمع المدني',
    titleEn: 'CHS Implementation & Governance Program for CSOs',
    titleFr: 'Programme de Gouvernance et de Déploiement de la Norme CHS pour les OSC',
    clientAr: 'ائتلاف المنظمات الإنسانية والتنموية • قطاع غزة والضفة الغربية',
    clientEn: 'Humanitarian & Development CSOs Coalition • Gaza & West Bank',
    clientFr: 'Coalition des OSC Humanitaires et de Développement • Gaza et Cisjordanie',
    durationAr: '8 أشهر • مكتمل وموثق',
    durationEn: '8 Months • Successfully Completed',
    durationFr: '8 Mois • Mené à bien',
    standardCode: 'CHS',
    standardLabel: 'Core Humanitarian Standard (CHS) & AAP',
    linkedCourseId: 'shat-chs-master',
    linkedCourseTitleAr: 'دبلوم المعيار الإنساني الأساسي',
    linkedCourseTitleEn: 'CHS Master Diploma',
    linkedCourseTitleFr: 'Cursus Supérieur CHS',
    progress: 100,
    stageAr: 'مكتمل وموثق رسمياً',
    stageEn: 'Completed & Audited',
    stageFr: 'Clôturé & Homologué',
    baseline: '32%',
    target: '90%',
    actual: '95.4%',
    budget: '$180,000',
    beneficiariesAr: '14 منظمة أهلية • 42 كادراً قيادياً',
    beneficiariesEn: '14 local NGOs • 42 executives',
    beneficiariesFr: '14 ONG locales • 42 cadres',
    summaryAr: 'بناء القدرات المؤسسية وتطوير سياسات المساءلة للمتأثرين (AAP) وقنوات الشكاوى والمقترحات السرية (CFRM) لـ 14 منظمة أهلية وفق الالتزامات التسعة.',
    summaryEn: 'Institutional capacity strengthening and AAP/CFRM complaints mechanism design for 14 local NGOs aligned with the 9 CHS commitments.',
    summaryFr: 'Renforcement des capacités institutionnelles et structuration des mécanismes de redevabilité (AAP/CFRM) pour 14 ONG locales selon les 9 engagements CHS.',
    outcomesAr: [
      'تأهيل 42 كادراً قيادياً في مجالات المساءلة والامتثال الإنساني',
      'صياغة 14 دليلاً تشغيلياً معتمداً للشكاوى والحماية الميدانية',
      'إجراء تدقيق ميداني شامل للجاهزية والنزاهة المؤسسية والشفافية'
    ],
    outcomesEn: [
      'Trained 42 executive leaders in accountability',
      'Drafted 14 operational CFRM manuals',
      'Conducted field baseline readiness audits'
    ],
    outcomesFr: [
      '42 cadres dirigeants formés à la redevabilité et à la conformité',
      '14 manuels opérationnels de gestion des plaintes homologués',
      'Audits de préparation et d’intégrité institutionnelle réalisés'
    ]
  },
  {
    code: 'PRJ-EMERG-2026',
    category: 'chs',
    titleAr: 'الاستجابة الإنسانية الطارئة وتعزيز سلاسل الإمداد والمساءلة الميدانية',
    titleEn: 'Emergency Humanitarian Response & Supply Chain Accountability',
    titleFr: 'Réponse Humanitaire d’Urgence et Redevabilité de la Chaîne d’Approvisionnement',
    clientAr: 'شبكة المبادرات الإغاثية والشركاء الميدانيين • قطاع غزة',
    clientEn: 'Emergency Relief Alliance & Field Partners • Gaza Sector',
    clientFr: 'Alliance de Secours d’Urgence et Partenaires de Terrain • Gaza',
    durationAr: '12 شهراً • قيد التنفيذ الميداني',
    durationEn: '12 Months • Active Field Execution',
    durationFr: '12 Mois • Exécution en Cours',
    standardCode: 'SPHERE & CHS',
    standardLabel: 'Sphere Standards & Humanitarian Accountability',
    linkedCourseId: 'shat-chs-master',
    linkedCourseTitleAr: 'دبلوم المعيار الإنساني الأساسي',
    linkedCourseTitleEn: 'CHS Master Diploma',
    linkedCourseTitleFr: 'Cursus Supérieur CHS',
    progress: 78,
    stageAr: 'المرحلة 3: التوزيع الميداني وتتبع الشكاوى',
    stageEn: 'Phase 3: Field Distribution & CFRM Tracking',
    stageFr: 'Phase 3 : Distribution & Gestion des Plaintes',
    baseline: '18%',
    target: '85%',
    actual: '78.5%',
    budget: '$340,000',
    beneficiariesAr: '18,500 أسرة متضررة • 6 مراكز إيواء',
    beneficiariesEn: '18,500 affected families • 6 shelters',
    beneficiariesFr: '18 500 familles affectées • 6 centres',
    summaryAr: 'تطبيق معايير أسفير في توزيع المياه والمأوى وإدارة المخيمات الطارئة مع تفعيل قنوات استجابة مجتمعية سريعة لمنع الهدر وضمان وصول المساعدات لمستحقيها.',
    summaryEn: 'Implementing Sphere and CHS standards across emergency WASH and shelter operations with confidential feedback hotlines to prevent aid diversion.',
    summaryFr: 'Déploiement des standards Sphère et CHS pour l’eau, l’assainissement et les abris avec lignes d’alerte confidentielles pour sécuriser l’aide.',
    outcomesAr: [
      'تجهيز 6 نقاط توزيع نموذجية ومجهزة بمسارات آمنة للنساء وذوي الإعاقة',
      'رصد ومعالجة 4,200 استفسار وشكوى مجتمعية خلال أقل من 48 ساعة',
      'تدريب 65 متطوعاً وموظفاً ميدانياً على مدونة السلوك ومبادئ عدم الإضرار'
    ],
    outcomesEn: [
      'Established 6 safe and accessible aid distribution centers',
      'Logged and resolved 4,200 community feedback tickets within 48 hours',
      'Trained 65 field volunteers on code of conduct and Do No Harm'
    ],
    outcomesFr: [
      '6 points de distribution sécurisés et accessibles aménagés',
      '4 200 retours et réclamations traités sous 48 heures',
      '65 volontaires de terrain formés au code de conduite et au principe de ne pas nuire'
    ]
  },
  {
    code: 'PRJ-PSEA-2025',
    category: 'psea',
    titleAr: 'تأسيس أطر الحماية وصون السلامة ومنع الاستغلال والانتهاك (PSEA)',
    titleEn: 'Protection & Safeguarding (PSEA) Framework Establishment',
    titleFr: 'Établissement du Cadre de Sauvegarde et Prévention des Abus (PSEA)',
    clientAr: 'شبكة حماية الطفولة والبرامج الإغاثية المشتركة',
    clientEn: 'Child Protection & Emergency Relief Network',
    clientFr: 'Réseau de Protection de l’Enfance et Secours d’Urgence',
    durationAr: '6 أشهر • معتمد رسمياً',
    durationEn: '6 Months • Formally Certified',
    durationFr: '6 Mois • Certifié Officiellement',
    standardCode: 'PSEA',
    standardLabel: 'IASC Safeguarding & Do No Harm Principles',
    linkedCourseId: 'shat-psea-expert',
    linkedCourseTitleAr: 'البرنامج التنفيذي في صون السلامة',
    linkedCourseTitleEn: 'Executive PSEA Program',
    linkedCourseTitleFr: 'Programme Exécutif PSEA',
    progress: 100,
    stageAr: 'مكتمل ومعتمد',
    stageEn: 'Completed & Certified',
    stageFr: 'Clôturé & Validé',
    baseline: '22%',
    target: '85%',
    actual: '92.1%',
    budget: '$120,000',
    beneficiariesAr: '8 مؤسسات شريكة • 350 كادراً',
    beneficiariesEn: '8 partner organizations • 350 staff',
    beneficiariesFr: '8 organisations partenaires • 350 agents',
    summaryAr: 'تصميم مدونات السلوك المؤسسية، وتأسيس مسارات الإحالة الآمنة والسرية، وتدريب لجان الحماية على فحص مخاطر الاستغلال في العمليات الميدانية وتوزيع المساعدات.',
    summaryEn: 'Designing institutional codes of conduct, safe referral pathways, and training protection committees on risk screening.',
    summaryFr: 'Conception des codes de conduite institutionnels, mise en place des circuits de signalement sécurisés et formation des comités de protection.',
    outcomesAr: [
      'اعتماد سياسة صون السلامة وحماية الطفل في 8 مؤسسات شريكة',
      'تأسيس وحدة تحقيق سرية مدربة للتعامل مع الشكاوى الحساسة',
      'مواءمة إجراءات التوظيف والتعاقد مع معايير التدقيق المسبق'
    ],
    outcomesEn: [
      'PSEA & Child Safeguarding policies adopted by 8 entities',
      'Trained confidential internal investigation units',
      'Vetting & background checks integrated into HR SOPs'
    ],
    outcomesFr: [
      'Politiques PSEA et protection de l’enfance adoptées par 8 institutions',
      'Unités d’enquête interne confidentielles formées aux plaintes sensibles',
      'Procédures de recrutement alignées sur les vérifications d’antécédents'
    ]
  },
  {
    code: 'PRJ-DAC-2024',
    category: 'evaluation',
    titleAr: 'التقييم الخارجي المستقل لمشاريع التعافي الاقتصادي والتمكين',
    titleEn: 'OECD DAC Independent External Evaluation for Livelihoods',
    titleFr: 'Évaluation Externe Indépendante OCDE CAD pour les Moyens de Subsistance',
    clientAr: 'وكالة تنموية دولية مانحة',
    clientEn: 'International Donor Agency',
    clientFr: 'Agence Internationale de Coopération et Développement',
    durationAr: '4 أشهر • تقرير نهائي منشور',
    durationEn: '4 Months • Published Final Report',
    durationFr: '4 Mois • Rapport Final Publié',
    standardCode: 'OECD DAC',
    standardLabel: 'OECD DAC Criteria (Relevance, Efficiency, Impact, Sustainability)',
    linkedCourseId: 'shat-oecd-eval',
    linkedCourseTitleAr: 'خبير التقييم الخارجي المستقل',
    linkedCourseTitleEn: 'OECD DAC Evaluator Certification',
    linkedCourseTitleFr: 'Certification Évaluateur OCDE CAD',
    progress: 100,
    stageAr: 'منشور وموثق',
    stageEn: 'Published & Documented',
    stageFr: 'Publié & Archivé',
    baseline: '40%',
    target: '85%',
    actual: '91.0%',
    budget: '$95,000',
    beneficiariesAr: '180 مقابلة ميدانية • 12 جلسة بؤرية',
    beneficiariesEn: '180 field interviews • 12 FGDs',
    beneficiariesFr: '180 entretiens • 12 groupes de discussion',
    summaryAr: 'تقييم مستقل وشامل لأثر برامج التدريب المهني والمنح النقدية الصغيرة، استند إلى 180 مقابلة ميدانية و12 حلقة نقاش بؤرية وفق المعايير الستة المعتمدة.',
    summaryEn: 'Independent evaluation assessing livelihoods and cash grants, based on 180 field interviews and 12 focus group discussions.',
    summaryFr: 'Évaluation indépendante d’impact sur les programmes de formation professionnelle et micro-subventions, fondée sur 180 entretiens et 12 groupes de discussion.',
    outcomesAr: [
      'تحليل معدلات استدامة المشاريع الصغيرة بعد 12 شهراً من التمويل',
      'إصدار مصفوفة توصيات تنفيذية لصناع القرار والمانحين الدوليين',
      'توثيق أفضل الممارسات وقصص الأثر الإيجابي للتحسين المستمر'
    ],
    outcomesEn: [
      '12-month post-intervention sustainability analytics',
      'Strategic executive recommendations for donors',
      'Documented impact stories and institutional learning'
    ],
    outcomesFr: [
      'Analyse de durabilité des micro-projets après 12 mois de clôture',
      'Recommandations stratégiques formulées aux bailleurs et décideurs',
      'Capitalisation des bonnes pratiques et récits d’impact positif'
    ]
  },
  {
    code: 'PRJ-GOV-2024',
    category: 'governance',
    titleAr: 'إعادة هيكلة الحوكمة وتطوير اللوائح التشغيلية (SOPs)',
    titleEn: 'Governance Restructuring & Operational SOPs Development',
    titleFr: 'Restructuration de la Gouvernance et Élaboration des Procédures SOP',
    clientAr: 'المؤسسة الوطنية للتنمية الاجتماعية',
    clientEn: 'National Social Development Foundation',
    clientFr: 'Fondation Nationale pour le Développement Social',
    durationAr: '5 أشهر • معتمد من مجلس الإدارة',
    durationEn: '5 Months • Board Approved',
    durationFr: '5 Mois • Validé par le CA',
    standardCode: 'Governance',
    standardLabel: 'Institutional Governance & Accountability Standards',
    linkedCourseId: 'shat-gov-lead',
    linkedCourseTitleAr: 'دبلوم حوكمة المنظمات وبناء النظم',
    linkedCourseTitleEn: 'NGO Governance & SOPs Diploma',
    linkedCourseTitleFr: 'Diplôme de Gouvernance des ONG',
    progress: 100,
    stageAr: 'معتمد رسمياً',
    stageEn: 'Board Approved',
    stageFr: 'Homologué',
    baseline: '25%',
    target: '80%',
    actual: '88.5%',
    budget: '$110,000',
    beneficiariesAr: '1 منظمة وطنية • 9 لوائح معتمدة',
    beneficiariesEn: '1 national NGO • 9 approved SOPs',
    beneficiariesFr: '1 ONG nationale • 9 manuels SOP',
    summaryAr: 'إعداد الهيكل التنظيمي المتكامل، بطاقات الوصف الوظيفي، اللائحة المالية والإدارية، ولائحة المشتريات واللوازم بما يتوافق مع متطلبات الامتثال الدولية.',
    summaryEn: 'Developing comprehensive organizational charts, job descriptions, financial, HR, and procurement SOPs.',
    summaryFr: 'Élaboration d’organigrammes fonctionnels, fiches de poste, manuels de procédures financières, RH et passation des marchés selon les normes de conformité.',
    outcomesAr: [
      'إعداد 9 أدلة تشغيلية قياسية معتمدة من مجلس الإدارة رسمياً',
      'مواءمة إدارة المخاطر وتضارب المصالح مع المعايير الفضلى',
      'تحسين كفاءة اتخاذ القرار وتوزيع المسؤوليات بنسبة 40%'
    ],
    outcomesEn: [
      '9 board-approved standard operating procedures',
      'Risk management & conflict of interest protocols',
      'Decision-making workflow efficiency boosted by 40%'
    ],
    outcomesFr: [
      '9 manuels de procédures opérationnelles approuvés par le conseil d’administration',
      'Protocoles de gestion des risques et de conflits d’intérêts formalisés',
      'Efficacité décisionnelle et fluidité managériale améliorées de 40%'
    ]
  }
];

export function renderProjectsView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

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
    btnRequestSimilar: txt('طلب تدخل مماثل', 'Request Similar Intervention', 'Demander une Intervention'),
    btnViewBrief: txt('ملخص المشروع (Brief)', 'Project Brief', 'Fiche Projet'),
    btnDownloadSummary: txt('تحميل المخرجات (PDF)', 'Download PDF', 'Télécharger PDF'),
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

          <!-- Live M&E Telemetry Dashboard Banner -->
          <div style="background: linear-gradient(135deg, #071527 0%, #0F2E4A 60%, #16426C 100%); color: #FFFFFF; border-radius: 16px; padding: clamp(20px, 3vw, 32px); margin-top: 32px; box-shadow: 0 10px 25px rgba(15,46,74,0.18); border: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.3rem; font-weight: 900; color: #6EE7B7;">▲</span>
                <div>
                  <h2 style="font-size: 1.15rem; font-weight: 900; margin: 0; color: #FFFFFF;">
                    ${txt('لوحة المؤشرات التنموية الحية وإدارة الأثر (M&E Live Impact Dashboard)', 'Live M&E & Impact Telemetry Dashboard', 'Tableau de Bord M&E et Impact')}
                  </h2>
                  <div style="font-size: 0.78rem; color: #86EFAC; font-weight: 700;">
                    ● ${txt('تحديث فوري للمؤشرات الميدانية • نظام المتابعة والتقييم والمساءلة والتعلم (MEAL)', 'Live Indicators Updated • Verified MEAL System', 'Indicateurs en Direct • Système MEAL Validé')}
                  </div>
                </div>
              </div>
              <div style="font-size: 0.76rem; font-family: var(--font-mono); color: #94A3B8;">
                ISO/IEC & OECD DAC COMPLIANT
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 16px;">
                <span style="font-size: 0.76rem; color: #94A3B8; font-weight: 700; text-transform: uppercase;">
                  ${txt('المؤسسات الشريكة الممكّنة', 'CSOs Strengthened', 'OSC Renforcées')}
                </span>
                <div style="font-size: 2rem; font-weight: 900; color: #6EE7B7; margin-top: 4px;">42+</div>
                <div style="font-size: 0.74rem; color: #CBD5E1; margin-top: 2px;">
                  ${txt('منظمات أهلية وإنسانية شريكة', 'Local partner NGOs', 'ONG locales')}
                </div>
              </div>

              <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 16px;">
                <span style="font-size: 0.76rem; color: #94A3B8; font-weight: 700; text-transform: uppercase;">
                  ${txt('متوسط امتثال CHS الميداني', 'CHS Compliance Score', 'Score Conformité CHS')}
                </span>
                <div style="font-size: 2rem; font-weight: 900; color: #60A5FA; margin-top: 4px;">94.8%</div>
                <div style="font-size: 0.74rem; color: #CBD5E1; margin-top: 2px;">
                  ${txt('عبر الالتزامات التسعة المعتمدة', 'Across the 9 commitments', 'Selon les 9 engagements')}
                </div>
              </div>

              <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 16px;">
                <span style="font-size: 0.76rem; color: #94A3B8; font-weight: 700; text-transform: uppercase;">
                  ${txt('حالات رعاية وإحالة منجزة', 'Cases Managed & Closed', 'Cas Gérés & Clôturés')}
                </span>
                <div style="font-size: 2rem; font-weight: 900; color: #FBBF24; margin-top: 4px;">1,280+</div>
                <div style="font-size: 0.74rem; color: #CBD5E1; margin-top: 2px;">
                  ${txt('وفق مسارات الحماية الآمنة', 'Safe protection pathways', 'Circuits de protection')}
                </div>
              </div>

              <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 16px;">
                <span style="font-size: 0.76rem; color: #94A3B8; font-weight: 700; text-transform: uppercase;">
                  ${txt('حجم البرامج المقيمة دولياً', 'Evaluated Interventions', 'Volume Évalué')}
                </span>
                <div style="font-size: 2rem; font-weight: 900; color: #F472B6; margin-top: 4px;">$3.8M+</div>
                <div style="font-size: 0.74rem; color: #CBD5E1; margin-top: 2px;">
                  ${txt('تقييم أثر خارجي مستقل', 'Independent external audits', 'Audits d’impact')}
                </div>
              </div>
            </div>
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
            ${PROJECTS_REGISTRY.map(p => {
              const title = isRtl ? p.titleAr : (lang === 'fr' ? p.titleFr || p.titleEn : p.titleEn);
              const client = isRtl ? p.clientAr : (lang === 'fr' ? p.clientFr || p.clientEn : p.clientEn);
              const duration = isRtl ? p.durationAr : (lang === 'fr' ? p.durationFr || p.durationEn : p.durationEn);
              const summary = isRtl ? p.summaryAr : (lang === 'fr' ? p.summaryFr || p.summaryEn : p.summaryEn);
              const outcomes = isRtl ? p.outcomesAr : (lang === 'fr' ? p.outcomesFr || p.outcomesEn : p.outcomesEn);
              const linkedTitle = isRtl ? p.linkedCourseTitleAr : (lang === 'fr' ? p.linkedCourseTitleFr || p.linkedCourseTitleEn : p.linkedCourseTitleEn);
              const stage = isRtl ? p.stageAr : (lang === 'fr' ? p.stageFr || p.stageEn : p.stageEn);

              return `
                <div class="double-bezel project-card" data-category="${p.category}" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column;">
                  <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div class="bento-header" style="margin-bottom: 12px;">
                        <span class="badge" style="font-size: 0.82rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); background: var(--shat-green-tint); border: 1px solid var(--shat-green-border);">
                          ${p.code}
                        </span>
                        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                          • ${duration}
                        </span>
                      </div>

                      <h3 class="bento-title" style="font-size: 1.3rem; font-weight: 900; margin-bottom: 8px; line-height: 1.4;">${title}</h3>
                      
                      <div style="font-size: 0.85rem; color: var(--shat-navy); font-weight: 700; margin-bottom: 10px;">
                        ${t.clientLabel} <span style="color: var(--text-secondary); font-weight: 600;">${client}</span>
                      </div>
                      
                      <!-- Standard Tag with Tool Trigger -->
                      <div style="margin-bottom: 14px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                        <button type="button" class="btn-clean" onclick="if(window.openStandardsExplorer) window.openStandardsExplorer('${p.standardCode}');" style="background: #EFF6FF; color: #1D4ED8; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; border: 1px solid #BFDBFE; cursor: pointer;">
                          ◈ ${t.standardLabel} ${p.standardLabel}
                        </button>
                        <a href="#/course/${p.linkedCourseId}" style="font-size: 0.78rem; color: var(--shat-green); font-weight: 700; text-decoration: none;">
                          ✦ ${linkedTitle}
                        </a>
                      </div>

                      <p class="bento-text" style="margin-bottom: 16px; font-size: 0.92rem; line-height: 1.7; color: var(--text-secondary);">
                        ${summary}
                      </p>

                      <!-- M&E Indicator Tracking Table (ITT) Widget -->
                      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.76rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
                          <span>▲ ${txt('مؤشر الامتثال والأداء الميداني (M&E Indicator):', 'M&E Key Indicator Matrix:', 'Indicateur M&E :')}</span>
                          <span style="color: var(--shat-green);">${stage}</span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; margin-bottom: 6px;">
                          <span style="color: #64748B;">${txt('خط الأساس:', 'Baseline:', 'Référence :')} <strong>${p.baseline}</strong></span>
                          <span style="color: #64748B;">${txt('المستهدف:', 'Target:', 'Cible :')} <strong>${p.target}</strong></span>
                          <span style="color: #0F2E4A; font-weight: 800;">${txt('المتحقق:', 'Actual:', 'Réalisé :')} <strong style="color: var(--shat-green);">${p.actual}</strong></span>
                        </div>

                        <!-- Progress Bar -->
                        <div style="width: 100%; height: 7px; background: #E2E8F0; border-radius: 99px; overflow: hidden;">
                          <div style="width: ${p.progress}%; height: 100%; background: ${p.progress === 100 ? 'var(--shat-green)' : '#3B82F6'}; border-radius: 99px;"></div>
                        </div>
                      </div>

                      <!-- Outcomes List -->
                      <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 16px; margin-bottom: 18px; border: 1px solid var(--border-light);">
                        <div style="font-size: 0.82rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">${t.outcomesTitle}</div>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0;">
                          ${outcomes.map(o => `
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
                      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" class="btn-clean btn-view-brief" data-project="${p.code}" style="background: var(--shat-navy); color: #FFFFFF; font-size: 0.8rem; font-weight: 700; padding: 6px 12px; border-radius: var(--radius-xs); box-shadow: 0 2px 6px rgba(15,46,74,0.2);">
                          ▪ ${t.btnViewBrief}
                        </button>
                        <button type="button" class="btn-clean btn-download-case" data-project="${p.code}" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light); font-size: 0.8rem; font-weight: 700; padding: 6px 12px; border-radius: var(--radius-xs);">
                          ↓ ${t.btnDownloadSummary}
                        </button>
                      </div>

                      <a href="#/contact?project=${encodeURIComponent(p.code)}" class="btn-clean btn-primary btn-sm btn-island">
                        <span>${t.btnRequestSimilar}</span>
                        <span>${arrow}</span>
                      </a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
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
                  <span>◈ ${txt('فحص الجاهزية المؤسسية للمشروع', 'Project Readiness Diagnostic', 'Diagnostic de Projet')}</span>
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
  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const isRtl = currentLang === 'ar';
  const txt = (ar, en, fr) => (currentLang === 'fr' ? fr || en : (currentLang === 'en' ? en : ar));

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

  // Project Brief Modal Listener
  document.querySelectorAll('.btn-view-brief').forEach(btn => {
    btn.onclick = () => {
      const code = btn.getAttribute('data-project');
      const prj = PROJECTS_REGISTRY.find(p => p.code === code) || PROJECTS_REGISTRY[0];
      openProjectBriefModal(prj, currentLang);
    };
  });

  // Download case study button -> Enforce Rule 1: unauthenticated users intercepted by permission guard
  document.querySelectorAll('.btn-download-case').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-project') || 'PRJ';
      const currentUser = api.currentUser;
      if (currentUser) {
        // Authenticated: open project brief modal directly for print/download
        const prj = PROJECTS_REGISTRY.find(p => p.code === code) || PROJECTS_REGISTRY[0];
        openProjectBriefModal(prj, currentLang);
      } else {
        // Intercept with Permission Guard
        if (window.openPermissionGuard) {
          window.openPermissionGuard(`تقرير المخرجات الميدانية للمشروع (${code})`, 'student');
        }
      }
    });
  });
}

function openProjectBriefModal(project, lang = 'ar') {
  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  let modal = document.getElementById('modal-project-brief');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-project-brief';
    modal.className = 'modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="modal-window" style="max-width: 820px; max-height: 92vh; display: flex; flex-direction: column;">
        <div class="modal-top no-print" style="border-bottom: 2px solid var(--shat-navy); padding: 16px 24px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.3rem;">▪</span>
            <h3 style="font-size: 1.15rem; font-weight: 900; color: var(--shat-navy); margin: 0;">
              ${txt('وثيقة ملخص التدخل الميداني المعتمد', 'Official Project Brief & Evaluation Sheet', 'Fiche Synthèse de Projet Homologué')}
            </h3>
          </div>
          <button class="modal-close" id="modal-project-brief-close" aria-label="Close">✕</button>
        </div>
        <div id="modal-project-brief-body" style="overflow-y: auto; padding: 24px;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const btnClose = modal.querySelector('#modal-project-brief-close');
    if (btnClose) btnClose.onclick = () => modal.classList.remove('open');
  }

  const container = document.getElementById('modal-project-brief-body');
  if (!container) return;

  const title = isRtl ? project.titleAr : (lang === 'fr' ? project.titleFr || project.titleEn : project.titleEn);
  const client = isRtl ? project.clientAr : (lang === 'fr' ? project.clientFr || project.clientEn : project.clientEn);
  const summary = isRtl ? project.summaryAr : (lang === 'fr' ? project.summaryFr || project.summaryEn : project.summaryEn);
  const outcomes = isRtl ? project.outcomesAr : (lang === 'fr' ? project.outcomesFr || project.outcomesEn : project.outcomesEn);
  const beneficiaries = isRtl ? project.beneficiariesAr : (lang === 'fr' ? project.beneficiariesFr || project.beneficiariesEn : project.beneficiariesEn);

  container.innerHTML = `
    <div class="project-brief-document" style="
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: clamp(20px, 3.5vw, 36px);
      box-shadow: 0 4px 18px rgba(0,0,0,0.04);
    ">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0F2E4A; padding-bottom: 16px; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 48px; width: auto; object-fit: contain;">
          <div>
            <div style="font-size: 1.1rem; font-weight: 900; color: #0F2E4A;">شركة شات للتنمية والتطوير</div>
            <div style="font-size: 0.74rem; color: #64748B;">قطاع الاستشارات المؤسسية وتطوير المعايير</div>
          </div>
        </div>

        <div style="text-align: ${isRtl ? 'left' : 'right'};">
          <div style="font-size: 0.72rem; font-family: var(--font-mono); font-weight: 800; color: #0F2E4A;">REF: ${project.code}</div>
          <div style="font-size: 0.72rem; color: #16A34A; font-weight: 700;">● ${project.stageAr}</div>
        </div>
      </div>

      <!-- Project Title Banner -->
      <div style="margin-bottom: 22px;">
        <span style="font-size: 0.76rem; font-weight: 800; color: #10B981; text-transform: uppercase;">
          ${txt('ملخص التدخل الاستشاري والتنموي المعتمد', 'Accredited Intervention Brief', 'Fiche Synthèse Homologuée')}
        </span>
        <h2 style="font-size: 1.35rem; font-weight: 900; color: #0F2E4A; margin: 4px 0 8px;">${title}</h2>
        <div style="font-size: 0.88rem; color: #475569;">
          <strong>${txt('الجهة المستفيدة / الشريكة:', 'Partner / Client Entity:', 'Partenaire :')}</strong> ${client}
        </div>
      </div>

      <!-- Indicator & Telemetry Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-bottom: 22px;">
        <div>
          <span style="font-size: 0.72rem; color: #64748B; font-weight: 700;">خط الأساس (Baseline):</span>
          <div style="font-size: 1.1rem; font-weight: 900; color: #0F2E4A;">${project.baseline}</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: #64748B; font-weight: 700;">المستهدف (Target):</span>
          <div style="font-size: 1.1rem; font-weight: 900; color: #3B82F6;">${project.target}</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: #64748B; font-weight: 700;">المتحقق الفعلي (Actual):</span>
          <div style="font-size: 1.1rem; font-weight: 900; color: #10B981;">${project.actual}</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: #64748B; font-weight: 700;">نطاق التغطية والمستفيدين:</span>
          <div style="font-size: 0.84rem; font-weight: 800; color: #0F2E4A; margin-top: 2px;">${beneficiaries}</div>
        </div>
      </div>

      <!-- Overview -->
      <div style="margin-bottom: 22px;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F2E4A; margin-bottom: 8px;">
          ${txt('ملخص نطاق العمل والمنهجية الميدانية:', 'Scope of Work & Methodology:', 'Périmètre & Démarche :')}
        </h4>
        <p style="font-size: 0.9rem; color: #334155; line-height: 1.7; margin: 0;">
          ${summary}
        </p>
      </div>

      <!-- Deliverables List -->
      <div style="margin-bottom: 26px;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F2E4A; margin-bottom: 10px;">
          ${txt('أبرز المخرجات والنتائج الموثقة:', 'Key Deliverables & Verified Outcomes:', 'Livrables Clés & Résultats :')}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${outcomes.map(o => `
            <div style="display: flex; align-items: center; gap: 10px; background: #F1F5F9; padding: 10px 14px; border-radius: 6px; font-size: 0.88rem; color: #1E293B;">
              <span style="color: #10B981; font-weight: 900;">✓</span>
              <span>${o}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Official Sign-off -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 18px; border-top: 1.5px solid #CBD5E1; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="font-size: 0.82rem; font-weight: 800; color: #0F2E4A;">وحدة المتابعة والتقييم وإدارة الأثر (MEAL Unit)</div>
          <div style="font-size: 0.74rem; color: #64748B;">شركة شات للتنمية والتطوير — الاعتماد الدولي CHS/DAC</div>
        </div>

        <div style="border: 1.5px dashed #94A3B8; padding: 10px 20px; border-radius: 8px; text-align: center; background: #F8FAFC;">
          <div style="font-size: 0.8rem; font-weight: 900; color: #0F2E4A;">SHAT MEAL VERIFIED</div>
          <div style="font-size: 0.65rem; color: #10B981; font-weight: 800;">موثق ومعتمد رسمياً</div>
        </div>
      </div>
    </div>

    <!-- Actions (Excluded from print) -->
    <div class="no-print" style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <button type="button" class="btn-clean btn-secondary btn-md" id="btn-close-brief-inner">
        ${txt('إغلاق', 'Close', 'Fermer')}
      </button>

      <button type="button" class="btn-clean btn-primary btn-md allow-print" id="btn-print-brief" style="background: var(--shat-navy); font-weight: 800; box-shadow: 0 4px 14px rgba(15,46,74,0.3);">
        ⎙ ${txt('طباعة الملخص / حفظ كـ PDF', 'Print / Save as PDF', 'Imprimer le Document (PDF)')}
      </button>
    </div>
  `;

  modal.classList.add('open');

  const btnCloseInner = document.getElementById('btn-close-brief-inner');
  if (btnCloseInner) btnCloseInner.onclick = () => modal.classList.remove('open');

  const btnPrint = document.getElementById('btn-print-brief');
  if (btnPrint) {
    btnPrint.onclick = () => {
      window.print();
    };
  }
}

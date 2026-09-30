// assets/js/views/projectsView.js
// Corporate Projects & Field Interventions View for SHAT Company with 100% Trilingual Support (AR, EN, FR)
import { content } from '../content.js';

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
      duration: txt('8 أشهر • مكتمل بنجاح', '8 Months • Successfully Completed', '8 Mois • Mené à bien'),
      standard: 'Core Humanitarian Standard (CHS) & AAP',
      summary: txt(
        'بناء القدرات المؤسسية وتطوير سياسات المساءلة للمتأثرين (AAP) وقنوات الشكاوى والمقترحات السرية (CFRM) لـ 14 منظمة أهلية وفق الالتزامات التسعة.',
        'Institutional capacity strengthening and AAP/CFRM complaints mechanism design for 14 local NGOs aligned with the 9 CHS commitments.',
        'Renforcement des capacités institutionnelles et structuration des mécanismes de redevabilité (AAP/CFRM) pour 14 ONG locales selon les 9 engagements CHS.'
      ),
      outcomes: [
        txt('تأهيل 42 كادراً قيادياً في مجالات المساءلة والامتثال', 'Trained 42 executive leaders in accountability', '42 cadres dirigeants formés à la redevabilité et à la conformité'),
        txt('صياغة 14 دليلاً تشغيلياً معتمداً للشكاوى والحماية', 'Drafted 14 operational CFRM manuals', '14 manuels opérationnels de gestion des plaintes homologués'),
        txt('إجراء تدقيق ميداني شامل للجاهزية والنزاهة المؤسسية', 'Conducted field baseline readiness audits', 'Audits de préparation et d’intégrité institutionnelle réalisés')
      ]
    },
    {
      code: 'PRJ-PSEA-2025',
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
      standard: 'IASC Safeguarding & Do No Harm Principles',
      summary: txt(
        'تصميم مدونات السلوك المؤسسية، وتأسيس مسارات الإحالة الآمنة والسرية، وتدريب لجان الحماية على فحص مخاطر الاستغلال في العمليات الميدانية وتوزيع المساعدات.',
        'Designing institutional codes of conduct, safe referral pathways, and training protection committees on risk screening.',
        'Conception des codes de conduite institutionnels, mise en place des circuits de signalement sécurisés et formation des comités de protection.'
      ),
      outcomes: [
        txt('اعتماد سياسة صون السلامة وحماية الطفل في 8 مؤسسات', 'PSEA & Child Safeguarding policies adopted by 8 entities', 'Politiques PSEA et protection de l’enfance adoptées par 8 institutions'),
        txt('تأسيس وحدة تحقيق سرية مدربة للتعامل مع الشكاوى الحساسة', 'Trained confidential internal investigation units', 'Unités d’enquête interne confidentielles formées aux plaintes sensibles'),
        txt('مواءمة إجراءات التوظيف والتعاقد مع معايير التدقيق المسبق', 'Vetting & background checks integrated into HR SOPs', 'Procédures de recrutement alignées sur les vérifications d’antécédents')
      ]
    },
    {
      code: 'PRJ-DAC-2024',
      title: txt(
        'التقييم الخارجي المستقل لمشاريع التعافي الاقتصادي والتمكين',
        'OECD DAC Independent External Evaluation for Livelihoods',
        'Évaluation Externe Indépendante OCDE CAD pour les Moyens de Subsistance'
      ),
      client: txt('وكالة تنموية دولية مانحة', 'International Donor Agency', 'Agence Internationale de Coopération et Développement'),
      duration: txt('4 أشهر • تقرير نهائي منشور', '4 Months • Published Final Report', '4 Mois • Rapport Final Publié'),
      standard: 'OECD DAC Criteria (Relevance, Efficiency, Impact, Sustainability)',
      summary: txt(
        'تقييم مستقل وشامل لأثر برامج التدريب المهني والمنح النقدية الصغيرة، استند إلى 180 مقابلة ميدانية و12 حلقة نقاش بؤرية وفق المعايير الستة المعتمدة.',
        'Independent evaluation assessing livelihoods and cash grants, based on 180 field interviews and 12 focus group discussions.',
        'Évaluation indépendante d’impact sur les programmes de formation professionnelle et micro-subventions, fondée sur 180 entretiens et 12 groupes de discussion.'
      ),
      outcomes: [
        txt('تحليل معدلات استدامة المشاريع الصغيرة بعد 12 شهراً', '12-month post-intervention sustainability analytics', 'Analyse de durabilité des micro-projets après 12 mois de clôture'),
        txt('إصدار مصفوفة توصيات تنفيذية لصناع القرار والمانحين', 'Strategic executive recommendations for donors', 'Recommandations stratégiques formulées aux bailleurs et décideurs'),
        txt('توثيق أفضل الممارسات وقصص الأثر الإيجابي', 'Documented impact stories and institutional learning', 'Capitalisation des bonnes pratiques et récits d’impact positif')
      ]
    },
    {
      code: 'PRJ-GOV-2024',
      title: txt(
        'إعادة هيكلة الحوكمة وتطوير اللوائح التشغيلية (SOPs)',
        'Governance Restructuring & Operational SOPs Development',
        'Restructuration de la Gouvernance et Élaboration des Procédures SOP'
      ),
      client: txt('المؤسسة الوطنية للتنمية الاجتماعية', 'National Social Development Foundation', 'Fondation Nationale pour le Développement Social'),
      duration: txt('5 أشهر • مكتمل', '5 Months • Completed', '5 Mois • Finalisé'),
      standard: 'Institutional Governance & Accountability Standards',
      summary: txt(
        'إعداد الهيكل التنظيمي المتكامل، بطاقات الوصف الوظيفي، اللائحة المالية والإدارية، ولائحة المشتريات واللوازم بما يتوافق مع متطلبات الامتثال الدولية.',
        'Developing comprehensive organizational charts, job descriptions, financial, HR, and procurement SOPs.',
        'Élaboration d’organigrammes fonctionnels, fiches de poste, manuels de procédures financières, RH et passation des marchés selon les normes de conformité.'
      ),
      outcomes: [
        txt('إعداد 9 أدلة تشغيلية قياسية معتمدة من مجلس الإدارة', '9 board-approved standard operating procedures', '9 manuels de procédures opérationnelles approuvés par le conseil d’administration'),
        txt('مواءمة إدارة المخاطر وتضارب المصالح مع المعايير الفضلى', 'Risk management & conflict of interest protocols', 'Protocoles de gestion des risques et de conflits d’intérêts formalisés'),
        txt('تحسين كفاءة اتخاذ القرار وتوزيع المسؤوليات بنسبة 40%', 'Decision-making workflow efficiency boosted by 40%', 'Efficacité décisionnelle et fluidité managériale améliorées de 40%')
      ]
    }
  ];

  const t = {
    badge: txt('سجل الإنجاز والخبرة الميدانية • Track Record', 'Track Record & Projects', 'Bilan des Réalisations & Projets'),
    title: txt('المشاريع والتدخلات الاستشارية المعتمدة', 'Featured Institutional Projects & Interventions', 'Projets et Interventions Institutionnelles de Référence'),
    desc: txt(
      'نماذج من التدخلات المؤسسية، وعمليات التقييم الخارجي المستقل، وتطوير أطر الحوكمة والامتثال التي نفذها خبراء شركة شات لصالح المنظمات الشريكة.',
      'Selected institutional interventions, independent external evaluations, and governance frameworks delivered by SHAT experts.',
      'Interventions institutionnelles, évaluations indépendantes et cadres de gouvernance réalisés par les experts de SHAT.'
    ),
    clientLabel: txt('الجهة الشريكة:', 'Partner / Client:', 'Partenaire / Client :'),
    standardLabel: txt('المرجعية:', 'Standard:', 'Norme :'),
    outcomesTitle: txt('أهم المخرجات والنتائج المحققة:', 'Key Deliverables & Documented Outcomes:', 'Livrables Clés et Résultats Obtenus :'),
    verifiedDocs: txt('وثائق التقييم موثقة رسمياً', 'Officially Verified & Documented', 'Documentation Officiellement Validée'),
    btnRequestSimilar: txt('طلب تدخل مماثل', 'Request Similar Intervention', 'Demander une Intervention Similaire'),
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
          <div style="max-width: 800px;">
            <div class="section-badge">${t.badge}</div>
            <h1 class="section-title" style="margin-bottom: 12px;">${t.title}</h1>
            <p class="section-desc">${t.desc}</p>
          </div>
        </div>
      </section>

      <!-- Projects Grid -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-2">
            ${projects.map(p => `
              <div class="bento-card" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div class="bento-header" style="margin-bottom: 12px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); background: var(--shat-green-tint); padding: 3px 8px; border-radius: var(--radius-xs);">
                      ${p.code}
                    </span>
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">
                      ${p.duration}
                    </span>
                  </div>

                  <h3 class="bento-title" style="font-size: 1.25rem; margin-bottom: 8px;">${p.title}</h3>
                  <div style="font-size: 0.82rem; color: var(--shat-navy); font-weight: 700; margin-bottom: 10px;">
                    ${t.clientLabel} <span style="color: var(--text-secondary); font-weight: 600;">${p.client}</span>
                  </div>
                  
                  <div style="display: inline-block; background: #EFF6FF; color: #1D4ED8; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-bottom: 12px;">
                    ${t.standardLabel} ${p.standard}
                  </div>

                  <p class="bento-text" style="margin-bottom: 16px; font-size: 0.9rem; line-height: 1.7;">
                    ${p.summary}
                  </p>

                  <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 16px; border: 1px solid var(--border-light);">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">${t.outcomesTitle}</div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                      ${p.outcomes.map(o => `
                        <li style="font-size: 0.84rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px;">
                          <span style="color: var(--shat-green); font-weight: bold;">✓</span>
                          <span>${o}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>

                <div class="bento-footer" style="border-top: 1px solid var(--border-light); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${t.verifiedDocs}</span>
                  <a href="#/contact" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
                    <span>${t.btnRequestSimilar}</span>
                    <span>${arrow}</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom CTA -->
          <div style="margin-top: 48px; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 36px; background: var(--bg-subtle); text-align: center;">
            <h3 style="font-size: 1.3rem; color: var(--shat-navy); margin-bottom: 8px;">${t.ctaTitle}</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto 24px auto; line-height: 1.8;">
              ${t.ctaDesc}
            </p>
            <a href="#/contact" class="btn-clean btn-primary btn-lg">
              <span>${t.ctaBtn}</span>
              <span>${arrow}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

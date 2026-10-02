// assets/js/components/syllabusViewer.js
// Official Syllabus & Course Specification Sheet Viewer for SHAT Academy
// Renders printable, accredited academic syllabi with SHAT institutional header & competencies
// 100% Trilingual Support (Arabic, English, French)

import { icons } from '../icons.js';

export const SYLLABUS_CATALOG = {
  'shat-chs-master': {
    code: 'SHAT-SYL-CHS-101',
    titleAr: 'دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة والمساءلة',
    titleEn: 'Core Humanitarian Standard (CHS) Master Diploma & Accountability',
    titleFr: 'Diplôme Supérieur de la Norme Humanitaire Fondamentale (CHS)',
    instructorAr: 'أ. حسام جاد الله • خبير معتمد في معايير الجودة والمساءلة الإنسانية',
    instructorEn: 'Hossam Jadallah • Senior Quality & Humanitarian Accountability Expert',
    instructorFr: 'Hossam Jadallah • Expert Senior en Normes et Qualité Humanitaire',
    hoursAr: '60 ساعة تدريبية معتمدة (30 ساعة نظري + 30 ساعة تطبيق ميداني ومحاكاة)',
    hoursEn: '60 Accredited Hours (30h Theory + 30h Field Simulation & Labs)',
    hoursFr: '60 Heures Agréées (30h Théorie + 30h Simulation de Terrain)',
    levelAr: 'دبلوم مهني تنفيذي / متقدم',
    levelEn: 'Executive Professional Diploma / Advanced',
    levelFr: 'Diplôme Professionnel Supérieur / Avancé',
    accreditationAr: 'المعيار الإنساني الأساسي (CHS Alliance) بالتعاون مع أكاديمية شات',
    accreditationEn: 'CHS Alliance Framework in partnership with SHAT Academy',
    accreditationFr: 'Cadre CHS Alliance en partenariat avec la SHAT Academy',
    targetAudienceAr: 'مديرو البرامج والمشاريع، منسقو المساءلة AAP، ضباط المتابعة والتقييم MEAL، والعاملون بالمنظمات الإنسانية.',
    targetAudienceEn: 'Program directors, AAP coordinators, MEAL officers, and humanitarian practitioners seeking international compliance leadership.',
    targetAudienceFr: 'Directeurs de programmes, coordinateurs redevabilité AAP, chargés MEAL et professionnels des ONG humanitaires.',
    objectivesAr: [
      'فهم وتطبيق الالتزامات التسعة للمعيار الإنساني الأساسي (Core Humanitarian Standard).',
      'بناء وتفعيل آليات الشكاوى والمقترحات المجتمعية الآمنة والسرية (CFRM).',
      'إدماج معايير صون السلامة والحماية من الاستغلال الجنسي والاعتداء (PSEA) في كافة مراحل المشروع.',
      'تصميم مصفوفات التحقق المستقل وإعداد تقارير التقييم المؤسسي وفق معايير OECD DAC.'
    ],
    objectivesEn: [
      'Master and operationalize the 9 commitments of the Core Humanitarian Standard (CHS).',
      'Architect and manage confidential Community Feedback and Response Mechanisms (CFRM).',
      'Mainstream PSEA safeguarding and survivor-centered referral protocols across operations.',
      'Design independent verification matrices and evaluations aligned with OECD DAC criteria.'
    ],
    objectivesFr: [
      'Maîtriser et appliquer les 9 engagements de la Norme Humanitaire Fondamentale (CHS).',
      'Concevoir et piloter des mécanismes sécurisés de gestion des plaintes et retours (CFRM).',
      'Intégrer les normes de sauvegarde PEAS dans l’ensemble du cycle de projet.',
      'Élaborer des matrices d’évaluation externe indépendantes conformes aux critères OCDE/CAD.'
    ],
    modulesAr: [
      { num: 1, title: 'الإطار المفاهيمي والتاريخي لنشأة معيار CHS ونظام المساءلة الإنسانية', hours: '10 ساعات' },
      { num: 2, title: 'الالتزامات (1-3): ملاءمة المساعدات، الفاعلية، والقدرات المحلية المستدامة', hours: '12 ساعة' },
      { num: 3, title: 'الالتزامات (4-6): الشفافية والمساءلة، آليات CFRM، والتنسيق متعدد القطاعات', hours: '14 ساعة' },
      { num: 4, title: 'الالتزامات (7-9): التعلم المستمر، كفاءة وتأهيل الكوادر، والإدارة الرشيدة للموارد', hours: '12 ساعة' },
      { num: 5, title: 'مشروع التخرج والمحاكاة الإكلينيكية: مراجعة خطة استجابة مؤسسية وإعداد التقرير المعتمد', hours: '12 ساعة' }
    ],
    modulesEn: [
      { num: 1, title: 'Foundational Epistemology & Historical Genesis of CHS Accountability Architecture', hours: '10 Hours' },
      { num: 2, title: 'Commitments 1-3: Humanitarian Relevance, Operational Effectiveness & Local Capacity', hours: '12 Hours' },
      { num: 3, title: 'Commitments 4-6: Transparency, Confidential CFRM Architecture & Sectoral Coordination', hours: '14 Hours' },
      { num: 4, title: 'Commitments 7-9: Continuous Learning, Competent Staffing & Prudent Resource Stewardship', hours: '12 Hours' },
      { num: 5, title: 'Capstone Practicum: Comprehensive Institutional Audit & Response Plan Evaluation', hours: '12 Hours' }
    ],
    modulesFr: [
      { num: 1, title: 'Fondements Théoriques et Évolution Historique de la Norme CHS', hours: '10 Heures' },
      { num: 2, title: 'Engagements 1 à 3 : Pertinence de l’Aide, Efficacité et Renforcement Local', hours: '12 Heures' },
      { num: 3, title: 'Engagements 4 à 6 : Transparence, Mécanismes CFRM et Coordination Intersectorielle', hours: '14 Heures' },
      { num: 4, title: 'Engagements 7 à 9 : Apprentissage Continu, Compétences et Gestion Éthique', hours: '12 Heures' },
      { num: 5, title: 'Projet de Fin d’Études : Audit Institutionnel et Rapport d’Évaluation Certifié', hours: '12 Heures' }
    ],
    passingGradeAr: '75% في التكليفات العملية ومشروع التخرج النهائي + حضور لا يقل عن 85% من الجلسات',
    passingGradeEn: '75% aggregate grade on field practicum assignments and capstone project + minimum 85% attendance',
    passingGradeFr: '75% aux évaluations pratiques et soutenance finale + présence minimale de 85% aux sessions',
    formId: 'humanitarian-worker-2026'
  },
  'shat-case-management': {
    code: 'SHAT-SYL-CM-201',
    titleAr: 'دورة إعداد وتأهيل مدير حالة Case Management في العمل الاجتماعي والإنساني',
    titleEn: 'Professional Case Management Qualification Course',
    titleFr: 'Formation Professionnelle Certifiante en Gestion de Cas',
    instructorAr: 'د. محمد إسليم • استشاري إدارة الحالة والرعاية المتكاملة والصحة النفسية',
    instructorEn: 'Dr. Mohammed Isleem • Case Management & Social Protection Consultant',
    instructorFr: 'Dr. Mohammed Isleem • Consultant en Gestion de Cas et Protection Sociale',
    hoursAr: '30 ساعة تدريبية وتطبيق إكلينيكي مباشر',
    hoursEn: '30 Accredited Clinical & Practical Hours',
    hoursFr: '30 Heures Certifiées Cliniques et Pratiques',
    levelAr: 'تأهيل مهني متخصص',
    levelEn: 'Specialized Professional Certification',
    levelFr: 'Certification Professionnelle Spécialisée',
    accreditationAr: 'أكاديمية شات للتدريب المهني وبناء القدرات المؤسسية',
    accreditationEn: 'SHAT Academy for Capacity Development & Executive Training',
    accreditationFr: 'Académie SHAT pour le Renforcement Institutionnel',
    targetAudienceAr: 'الأخصائيون الاجتماعيون والنفسيون، مشرفو الحماية، ومنسقو الحالات بالمنظمات الدولية والمحلية.',
    targetAudienceEn: 'Social workers, clinical case workers, child protection officers, and community welfare staff.',
    targetAudienceFr: 'Travailleurs sociaux, psychologues, officiers de protection de l’enfance et coordinateurs de cas.',
    objectivesAr: [
      'إتقان المراحل الست لإدارة الحالة: (التعرف والتسجيل، التقييم الشامل، خطة التدخل، التنفيذ، المتابعة والمراجعة، الإغلاق).',
      'صياغة نماذج تقييم المخاطر وتحديد الأولويات والتدخل الطارئ.',
      'تفعيل مسارات الإحالة الآمنة (Safe Referral Pathways) مع مراعاة السرية التامة وحماية البيانات.',
      'إدارة الضغوط المهنية، الرعاية الذاتية لمنع الاحتراق النفسي، وأخلاقيات المهنة.'
    ],
    objectivesEn: [
      'Master the 6-stage case management cycle: Identification, Assessment, Care Planning, Implementation, Follow-up, Case Closure.',
      'Conduct multi-dimensional risk stratification and acute protection screening.',
      'Operationalize safe, confidential inter-agency referral pathways upholding GDPR/data protection norms.',
      'Apply clinical self-care strategies and secondary traumatic stress mitigation.'
    ],
    objectivesFr: [
      'Maîtriser les 6 étapes de la gestion de cas : Identification, Évaluation, Plan de Soins, Mise en œuvre, Suivi, Clôture.',
      'Réaliser des diagnostics de vulnérabilité et des évaluations de risques multidimensionnelles.',
      'Mettre en œuvre des circuits de référencement sécurisés garantissant la stricte confidentialité.',
      'Appliquer les protocoles d’éthique professionnelle et les techniques de prévention de l’épuisement.'
    ],
    modulesAr: [
      { num: 1, title: 'مبادئ وأخلاقيات إدارة الحالة والمسؤوليات القانونية والمهنية', hours: '6 ساعات' },
      { num: 2, title: 'التقييم الشامل للاحتياجات وتحديد مكامن القوة ونقاط الضعف والمخاطر', hours: '6 ساعات' },
      { num: 3, title: 'هندسة خطة التدخل الفردية والأسرية المتكاملة وتحديد الأهداف الذكية SMART', hours: '6 ساعات' },
      { num: 4, title: 'مسارات الإحالة متعددة القطاعات وشبكات الدعم المجتمعي', hours: '6 ساعات' },
      { num: 5, title: 'دراسة حالات حية وتطبيق عملي على نماذج السجلات الإكلينيكية', hours: '6 ساعات' }
    ],
    modulesEn: [
      { num: 1, title: 'Ethical Foundations, Legal Mandates & Child Safeguarding Imperatives', hours: '6 Hours' },
      { num: 2, title: 'Multi-Sectoral Assessment Tools, Needs Profiling & Protective Assets', hours: '6 Hours' },
      { num: 3, title: 'Formulating Individualized SMART Care Plans & Inter-Disciplinary Contracts', hours: '6 Hours' },
      { num: 4, title: 'Cross-Sector Referral Directories, Mapping & Coordinated Case Conferences', hours: '6 Hours' },
      { num: 5, title: 'Live Case Simulations, Clinical Record Keeping & Graduation Presentation', hours: '6 Hours' }
    ],
    modulesFr: [
      { num: 1, title: 'Principes Déontologiques, Cadre Légal et Normes de Sauvegarde', hours: '6 Heures' },
      { num: 2, title: 'Évaluation Multidimensionnelle des Besoins et Cartographie des Risques', hours: '6 Heures' },
      { num: 3, title: 'Conception des Plans d’Action Personnalisés et Objectifs SMART', hours: '6 Heures' },
      { num: 4, title: 'Circuits de Référencement Multi-acteurs et Réseaux Communautaires', hours: '6 Heures' },
      { num: 5, title: 'Études de Cas Réels, Tenue des Dossiers et Examen Pratique', hours: '6 Heures' }
    ],
    passingGradeAr: '70% في التقييمات العملية ودراسة الحالة الإكلينيكية',
    passingGradeEn: '70% minimum score on clinical case evaluations and live simulation exam',
    passingGradeFr: '70% minimum aux évaluations de cas cliniques et études appliquées',
    formId: 'case-manager-2026'
  },
  'shat-presentation-skills': {
    code: 'SHAT-SYL-PRES-301',
    titleAr: 'البرنامج التنفيذي في مهارات العرض والتقديم والتأثير الجماهيري Presentation Skills',
    titleEn: 'Executive Presentation Skills & High-Impact Speaking',
    titleFr: 'Formation Dirigeants en Prise de Parole et Présentations d’Impact',
    instructorAr: 'م. مهدي الملاحي • استشاري التواصل المؤسسي والعرض الفعال',
    instructorEn: 'Eng. Mahdi Al-Malahi • Senior Executive Communication & Public Speaking Consultant',
    instructorFr: 'Ing. Mahdi Al-Malahi • Consultant en Communication Stratégique',
    hoursAr: '24 ساعة تدريبية وتطبيق مسرحي ومحاكاة مباشرة',
    hoursEn: '24 Practical Workshop & Live Studio Performance Hours',
    hoursFr: '24 Heures d’Ateliers Pratiques et Prise de Parole en Studio',
    levelAr: 'قيادي / تنفيذي',
    levelEn: 'Executive / Leadership Masterclass',
    levelFr: 'Niveau Dirigeant / Masterclass Leadership',
    accreditationAr: 'شركة شات للتنمية والتطوير • قطاع بناء القدرات القيادية',
    accreditationEn: 'SHAT Development & Growth • Executive Leadership Directorate',
    accreditationFr: 'Société SHAT • Pôle Développement du Leadership',
    targetAudienceAr: 'المديرون التنفيذيون، مسؤولو العلاقات والتواصل، المدربون، وقادة المشاريع الراغبون في إتقان الإلقاء المقنع.',
    targetAudienceEn: 'NGO directors, project leads, donor relations managers, and executives aiming for persuasive speaking mastery.',
    targetAudienceFr: 'Directeurs d’ONG, chefs de projets, chargés de plaidoyer et formateurs souhaitant maîtriser la prise de parole persuasive.',
    objectivesAr: [
      'هندسة وبناء هيكل العرض التقديمي المقنع وفق نموذج "المشكلة - الحل - الأثر".',
      'إتقان لغة الجسد، الاتصال البصري، وتنويع النبرة الصوتية لشد انتباه الحضور.',
      'تصميم شرائح بصرية احترافية تخاطب العقل وتعتمد قواعد الإيجاز والتسلسل البصري.',
      'إدارة قاعات المؤتمرات والتعامل ببراعة مع الأسئلة الحرجة والجمهور المتحدي.'
    ],
    objectivesEn: [
      'Architect persuasive presentation narratives using the "Problem - Solution - Impact" paradigm.',
      'Command stage presence, vocal modulation, open body language, and audience eye connection.',
      'Design clean, cognitive visual slides avoiding text overload and prioritizing clarity.',
      'Navigate tough donor Q&A sessions and handle adversarial auditorium dynamics.'
    ],
    objectivesFr: [
      'Structurer une argumentation percutante selon le modèle Problème - Solution - Impact.',
      'Maîtriser la gestuelle, le contact visuel et les modulations vocales en public.',
      'Concevoir des supports visuels épurés et professionnels optimisant l’attention.',
      'Gérer avec aisance les séances de questions-réponses difficiles face aux bailleurs.'
    ],
    modulesAr: [
      { num: 1, title: 'علم الإقناع والتأثير الجماهيري وهندسة المحتوى القيادي', hours: '5 ساعات' },
      { num: 2, title: 'لغة الجسد، الحضور المسرحي، وتطويع طبقات الصوت والنبرات', hours: '5 ساعات' },
      { num: 3, title: 'فن تصميم السلايدات الاحترافية والإخراج البصري للمعلومات المعقدة', hours: '5 ساعات' },
      { num: 4, title: 'إدارة منصات التحدث أمام المانحين والشركاء والتعامل مع الأسئلة المعقدة', hours: '4 ساعات' },
      { num: 5, title: 'العروض الختامية التطبيقية والتغذية الراجعة الفردية بالصوت والصورة', hours: '5 ساعات' }
    ],
    modulesEn: [
      { num: 1, title: 'Cognitive Science of Persuasion & Narrative Pitch Architecture', hours: '5 Hours' },
      { num: 2, title: 'Body Language Mastery, Stage Dynamics & Vocal Delivery Range', hours: '5 Hours' },
      { num: 3, title: 'Executive Slide Crafting & Simplifying Dense Technical Data', hours: '5 Hours' },
      { num: 4, title: 'Mastering Donor Pitches, Panel Discussions & High-Stakes Q&A', hours: '4 Hours' },
      { num: 5, title: 'Live Capstone Presentation Studio with Video Analysis & Feedback', hours: '5 Hours' }
    ],
    modulesFr: [
      { num: 1, title: 'Psychologie de la Persuasion et Structure de Pitch Stratégique', hours: '5 Heures' },
      { num: 2, title: 'Langage Corporel, Présence Scénique et Pose de la Voix', hours: '5 Heures' },
      { num: 3, title: 'Conception de Diaporamas Exécutifs et Visualisation des Données', hours: '5 Heures' },
      { num: 4, title: 'Prise de Parole Face aux Bailleurs et Gestion des Questions Complexes', hours: '4 Heures' },
      { num: 5, title: 'Prestation Finale en Studio avec Débriefing Vidéo Personnalisé', hours: '5 Heures' }
    ],
    passingGradeAr: 'إنجاز العرض التقديمي النهائي المباشر وتقييم لجنة التحكيم',
    passingGradeEn: 'Successful delivery of live capstone pitch evaluated by the executive panel',
    passingGradeFr: 'Validation de la présentation finale en direct devant le jury d’experts',
    formId: 'presentation-skills-2026'
  }
};

export class SyllabusViewer {
  constructor() {
    this.init();
  }

  init() {
    this.createDom();
    window.openSyllabusModal = (courseId) => this.open(courseId);
  }

  createDom() {
    if (document.getElementById('shat-syllabus-modal-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'shat-syllabus-modal-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(11, 30, 54, 0.7);
      backdrop-filter: blur(6px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 30px 16px;
      overflow-y: auto;
    `;

    backdrop.innerHTML = `
      <div id="shat-syllabus-modal-card" style="
        background: #FFFFFF;
        width: 100%;
        max-width: 840px;
        max-height: 90vh;
        border-radius: 18px;
        box-shadow: 0 25px 50px -12px rgba(11, 30, 54, 0.4);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      ">
        <!-- Top Toolbar -->
        <div id="shat-syllabus-toolbar" style="background: var(--shat-navy, #0B1E36); color: #FFFFFF; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.1rem; color: var(--shat-green);">📄</span>
            <span id="shat-syl-title-label" style="font-weight: 800; font-size: 0.95rem;">الخطة التدريبية المعتمدة • Course Syllabus</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="btn-print-syllabus" class="btn-clean" style="background: #1E7E34; color: #FFFFFF; font-weight: 700; font-size: 0.82rem; padding: 6px 14px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px;">
              ${icons.printer('icon-inline', 15)} <span id="shat-syl-print-label">طباعة / حفظ PDF</span>
            </button>
            <button id="btn-close-syllabus" style="background: transparent; border: none; color: #94A3B8; font-size: 1.3rem; cursor: pointer; padding: 2px 8px; display: inline-flex; align-items: center;">${icons.x('', 18)}</button>
          </div>
        </div>

        <!-- Scrollable Content Body -->
        <div id="shat-syllabus-body" style="padding: 32px 36px; overflow-y: auto;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const closeBtn = backdrop.querySelector('#btn-close-syllabus');
    if (closeBtn) closeBtn.onclick = () => this.close();

    const printBtn = backdrop.querySelector('#btn-print-syllabus');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }

    backdrop.onclick = (e) => {
      if (e.target === backdrop) this.close();
    };
  }

  open(courseId = 'shat-chs-master') {
    const s = SYLLABUS_CATALOG[courseId] || SYLLABUS_CATALOG['shat-chs-master'];
    const body = document.getElementById('shat-syllabus-body');
    const backdrop = document.getElementById('shat-syllabus-modal-backdrop');

    if (!body || !backdrop) return;

    const lang = localStorage.getItem('shat_platform_lang') || 'ar';
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    // Update toolbar labels
    const titleLabel = document.getElementById('shat-syl-title-label');
    const printLabel = document.getElementById('shat-syl-print-label');
    if (titleLabel) titleLabel.textContent = txt('الخطة التدريبية المعتمدة • Course Syllabus', 'Accredited Course Syllabus', 'Programme Pédagogique Officiel');
    if (printLabel) printLabel.textContent = txt('طباعة / حفظ PDF', 'Print / Save PDF', 'Imprimer / PDF');

    const title = txt(s.titleAr, s.titleEn, s.titleFr);
    const instructor = txt(s.instructorAr, s.instructorEn, s.instructorFr);
    const hours = txt(s.hoursAr, s.hoursEn, s.hoursFr);
    const level = txt(s.levelAr, s.levelEn, s.levelFr);
    const accreditation = txt(s.accreditationAr, s.accreditationEn, s.accreditationFr);
    const targetAudience = txt(s.targetAudienceAr, s.targetAudienceEn, s.targetAudienceFr);
    const objectives = lang === 'fr' ? (s.objectivesFr || s.objectivesEn) : (lang === 'en' ? s.objectivesEn : s.objectivesAr);
    const modules = lang === 'fr' ? (s.modulesFr || s.modulesEn) : (lang === 'en' ? s.modulesEn : s.modulesAr);
    const passingGrade = txt(s.passingGradeAr, s.passingGradeEn, s.passingGradeFr);
    const formUrl = `#/${lang}/forms?id=${s.formId}`;

    body.innerHTML = `
      <div class="printable-syllabus" style="text-align: ${isRtl ? 'right' : 'left'};">
        
        <!-- Institutional Letterhead Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0B1E36; padding-bottom: 18px; margin-bottom: 24px;">
          <div>
            <div style="font-size: 1.2rem; font-weight: 900; color: #0B1E36;">
              ${txt('شركة شات للتنمية والتطوير', 'SHAT Development & Growth Company', 'Société SHAT pour le Développement')}
            </div>
            <div style="font-size: 0.82rem; color: #475569; font-weight: 600;">
              ${txt('أكاديمية شات للتدريب وبناء القدرات المؤسسية', 'SHAT Training Academy & Capacity Development Directorate', 'Académie de Formation SHAT')}
            </div>
            <div style="font-size: 0.76rem; color: #1E7E34; font-weight: 700; margin-top: 2px;">
              ${txt('بناء القدرات • تعزيز المؤسسات • تطوير النتائج', 'Building Capacity • Strengthening Institutions • Advancing Results', 'Renforcer les Capacités • Consolider les Institutions')}
            </div>
          </div>
          <div style="text-align: ${isRtl ? 'left' : 'right'};">
            <span style="font-family: monospace; font-size: 0.84rem; background: #F1F5F9; border: 1px solid #CBD5E1; padding: 4px 10px; border-radius: 6px; font-weight: 700; color: #0B1E36;">
              ${s.code}
            </span>
            <div style="font-size: 0.74rem; color: #64748B; margin-top: 4px;">
              ${txt('نسخة رسمية معتمدة لعام 2026', 'Official Accredited 2026 Edition', 'Édition Officielle Homologuée 2026')}
            </div>
          </div>
        </div>

        <!-- Course Title & Metadata Box -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
          <h2 style="font-size: 1.35rem; font-weight: 900; color: #0B1E36; margin: 0 0 6px; line-height: 1.35;">
            ${title}
          </h2>
          <div style="font-size: 0.88rem; color: #64748B; font-weight: 600; margin-bottom: 16px;">
            ${s.code} • ${txt('المعيار المهني المعتمد', 'Accredited Curriculum', 'Norme Pédagogique Certifiée')}
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; font-size: 0.86rem; color: #334155; padding-top: 14px; border-top: 1px solid #E2E8F0;">
            <div><strong>${txt('الخبير والمدرب:', 'Instructor / Expert:', 'Formateur / Expert :')}</strong> ${instructor}</div>
            <div><strong>${txt('الساعات المعتمدة:', 'Accredited Hours:', 'Volume horaire :')}</strong> ${hours}</div>
            <div><strong>${txt('المستوى:', 'Level:', 'Niveau :')}</strong> ${level}</div>
            <div><strong>${txt('جهة الاعتماد:', 'Accreditation Body:', 'Organisme d’Agrément :')}</strong> ${accreditation}</div>
          </div>
        </div>

        <!-- Target Audience -->
        <div style="margin-bottom: 22px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0B1E36; margin: 0 0 8px;">
            ${txt('الفئة المستهدفة وشروط الالتحاق:', 'Target Audience & Eligibility Criteria:', 'Public Cible & Prérequis :')}
          </h3>
          <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.7;">
            ${targetAudience}
          </p>
        </div>

        <!-- Learning Objectives -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0B1E36; margin: 0 0 10px;">
            ${txt('مخرجات التعلم والجدارات المستهدفة (Competencies):', 'Target Learning Competencies & Core Outcomes:', 'Compétences Visées & Acquis Pédagogiques :')}
          </h3>
          <ul style="margin: 0; padding-inline-start: 22px; font-size: 0.9rem; color: #475569; line-height: 1.8;">
            ${objectives.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>

        <!-- Modules Breakdown -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0B1E36; margin: 0 0 12px;">
            ${txt('مخطط الوحدات والمحاور التدريبية التفصيلية:', 'Course Module Schedule & Detailed Content:', 'Plan Détaillé des Modules Pédagogiques :')}
          </h3>
          <div style="border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.88rem;">
              <thead>
                <tr style="background: #F1F5F9; color: #0B1E36; font-weight: 800;">
                  <th style="padding: 10px 14px; width: 80px;">${txt('الوحدة', 'Module', 'Module')}</th>
                  <th style="padding: 10px 14px;">${txt('الموضوع والمحتوى العلمي', 'Topic & Academic Content', 'Thématique & Contenu')}</th>
                  <th style="padding: 10px 14px; width: 110px;">${txt('الساعات', 'Hours', 'Durée')}</th>
                </tr>
              </thead>
              <tbody>
                ${modules.map(m => `
                  <tr style="border-top: 1px solid #E2E8F0;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1E7E34;">${m.num}</td>
                    <td style="padding: 10px 14px; color: #334155; font-weight: 600;">${m.title}</td>
                    <td style="padding: 10px 14px; color: #64748B;">${m.hours}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Certification & Assessment -->
        <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; font-size: 0.88rem; color: #065F46;">
          <strong>${txt('معايير التقييم ومنح الشهادة:', 'Assessment & Certification Criteria:', 'Critères d’Évaluation & Certification :')}</strong> ${passingGrade}
        </div>

        <!-- Bottom Action CTA -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
          <div style="font-size: 0.84rem; color: #64748B;">
            ${txt('للاستفسار عن الدفعات القادمة:', 'Admissions & Next Cohorts Desk:', 'Inscriptions & Prochaines Sessions :')} <a href="https://wa.me/972592879621" target="_blank" style="color: #1E7E34; font-weight: 700;">+972 59 287 9621</a>
          </div>
          <a href="${formUrl}" class="btn-clean btn-green" style="font-weight: 800; padding: 10px 22px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
            ${icons.check('icon-inline', 16)} <span>${txt('فتح استمارة التسجيل الرسمية', 'Open Official Enrollment Form', 'Ouvrir le Formulaire d’Inscription')}</span>
            <span style="display:inline-flex; align-items:center;">${isRtl ? icons.arrowLeft('icon-inline', 14) : icons.arrowRight('icon-inline', 14)}</span>
          </a>
        </div>

      </div>
    `;

    backdrop.style.display = 'flex';
  }

  close() {
    const backdrop = document.getElementById('shat-syllabus-modal-backdrop');
    if (backdrop) backdrop.style.display = 'none';
  }
}

export function initSyllabusViewer() {
  return new SyllabusViewer();
}

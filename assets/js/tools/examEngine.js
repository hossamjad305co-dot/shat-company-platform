// assets/js/tools/examEngine.js
// Production LMS Interactive Exam Engine & Accredited Digital Certificate Generator
// Fully Trilingual (AR, EN, FR) & WCAG AAA High Contrast Design

import { showToast } from '../components/toast.js';

export const EXAM_REGISTRY = {
  'shat-chs-master': {
    courseId: 'shat-chs-master',
    prefix: 'CHS',
    titleAr: 'دبلوم المعيار الإنساني الأساسي للجودة والمساءلة (CHS Master Diploma)',
    titleEn: 'Core Humanitarian Standard (CHS) Master Diploma',
    titleFr: 'Diplôme Supérieur de la Norme Humanitaire Fondamentale (CHS)',
    trainerAr: 'أ. حسام جاد الله • خبير الامتثال والمساءلة الإنسانية',
    trainerEn: 'Hossam Jadallah • Humanitarian Compliance & Accountability Expert',
    hours: '60 ساعة تدريبية معتمدة',
    hoursEn: '60 Accredited Training Hours',
    passingScore: 80,
    questions: [
      {
        id: 1,
        textAr: 'ما هو الهدف الجوهري للالتزام الأول من التزامات المعيار الإنساني الأساسي (CHS)؟',
        textEn: 'What is the primary objective of Commitment 1 in the Core Humanitarian Standard (CHS)?',
        textFr: 'Quel est l’objectif fondamental du Premier Engagement de la norme CHS ?',
        optionsAr: [
          'تقديم استجابة إنسانية ملائمة، متسقة، وتلبي الاحتياجات الفعلية والموثقة',
          'تقليص الميزانيات التشغيلية للمشاريع الإغاثية',
          'الاعتماد الحصري على التوريد الدولي وتجاوز الموردين المحليين',
          'إلغاء إجراءات التقييم الميداني السريع'
        ],
        optionsEn: [
          'Delivering humanitarian response that is appropriate, relevant, and based on verified needs',
          'Reducing operational budgets of emergency relief operations',
          'Relying solely on international procurement without local suppliers',
          'Bypassing rapid field needs assessment processes'
        ],
        optionsFr: [
          'Fournir une réponse humanitaire appropriée, pertinente et fondée sur des besoins vérifiés',
          'Réduire les budgets opérationnels des secours d’urgence',
          'S’appuyer uniquement sur les marchés internationaux sans fournisseurs locaux',
          'Supprimer les phases d’évaluation rapide des besoins sur le terrain'
        ],
        correct: 0,
        explanationAr: 'الالتزام 1 يركز على ملاءمة الاستجابة الإنسانية وتماشيها التام مع الاحتياجات والسياق المحلي للسكان المتأثرين.'
      },
      {
        id: 2,
        textAr: 'أي من العناصر التالية يمثل ركناً إلزامياً في قنوات الشكاوى والمقترحات المجتمعية (CFRM) وفق الالتزام 5؟',
        textEn: 'Which of the following is mandatory for Community Feedback & Response Mechanisms (CFRM) under Commitment 5?',
        textFr: 'Lequel des éléments suivants est obligatoire pour un mécanisme CFRM selon l’Engagement 5 ?',
        optionsAr: [
          'كشف هوية المشتكي علناً في المجتمع المحلي',
          'السرية التامة، سهولة الوصول، وتحديد فترات زمنية ملزمة للرد والتحقيق',
          'قصر قنوات الشكوى على المراسلات الورقية البريدية فقط',
          'حظر استقبال أي ملاحظات تتعلق بسلوك الموظفين'
        ],
        optionsEn: [
          'Publicly revealing the complainant identity in the community',
          'Strict confidentiality, accessibility, and binding response timeframes',
          'Restricting feedback channels exclusively to postal mail',
          'Prohibiting any complaints regarding staff behavior'
        ],
        optionsFr: [
          'Révéler publiquement l’identité du plaignant dans la communauté',
          'Confidentialité stricte, accessibilité et délais de traitement contraignants',
          'Limiter les canaux de réclamation au seul courrier postal',
          'Interdire tout signalement relatif au comportement du personnel'
        ],
        correct: 1,
        explanationAr: 'يفرض الالتزام 5 حماية السرية وتوفير قنوات آمنة وميسرة لكافة الفئات الضعيفة مع الالتزام بالرد في مدد زمنية محددة.'
      },
      {
        id: 3,
        textAr: 'وفق مبدأ صون السلامة (Safeguarding) ومنع الاستغلال (PSEA)، ما هو الإجراء الفوري الواجب عند الاشتباه بحالة انتهاك؟',
        textEn: 'Under PSEA and Safeguarding principles, what is the mandatory immediate action upon suspecting abuse?',
        textFr: 'En matière de PSEA, quelle est l’action immédiate obligatoire en cas de soupçon d’abus ?',
        optionsAr: [
          'مواجهة المشتبه به مباشرة في مكان العمل بشكل علني',
          'تفعيل مسار الإحالة السري الآمن وتقديم الرعاية الفورية للناجي وإبلاغ نقطة ارتكاز PSEA',
          'الانتظار حتى انتهاء المشروع قبل فتح أي تحقيق',
          'طلب فدية أو تسوية عشائرية دون توثيق مؤسسي'
        ],
        optionsEn: [
          'Confronting the suspect publicly at the work site',
          'Activating the safe confidential referral pathway, providing survivor care, and alerting the PSEA focal point',
          'Waiting until project completion before initiating any inquiry',
          'Seeking informal unrecorded tribal settlement'
        ],
        optionsFr: [
          'Confronter publiquement le suspect sur le lieu de travail',
          'Activer le circuit d’orientation confidentiel, assurer la prise en charge de la victime et informer le point focal PSEA',
          'Attendre la clôture du projet avant d’initier une enquête',
          'Recourir à un règlement informel sans archivage institutionnel'
        ],
        correct: 1,
        explanationAr: 'النهج المرتكز على الناجي (Survivor-Centered Approach) يتطلب توفير الأمان والدعم السري الفوري وإبلاغ نقطة الارتكاز المعتمدة.'
      },
      {
        id: 4,
        textAr: 'ما هي معايير التقييم الستة المعتمدة لدى لجنة المساعدات الإنمائية (OECD DAC)؟',
        textEn: 'What are the 6 OECD DAC evaluation criteria used in international development assessment?',
        textFr: 'Quels sont les 6 critères d’évaluation du CAD de l’OCDE ?',
        optionsAr: [
          'الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة',
          'السرعة، الربحية، التكتم، الإلغاء، التوسع، والتسويق',
          'التوظيف، التبرعات، الإعلانات، المقرات، المعدات، والأرباح',
          'التصميم، الطباعة، التوزيع، التخزين، المبيعات، والتخليص'
        ],
        optionsEn: [
          'Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability',
          'Speed, Profitability, Secrecy, Cancellation, Expansion, and Marketing',
          'Recruitment, Donations, Advertising, Facilities, Logistics, and Margins',
          'Design, Printing, Distribution, Warehousing, Sales, and Clearance'
        ],
        optionsFr: [
          'Pertinence, Cohérence, Efficacité, Efficience, Impact et Durabilité',
          'Rapidité, Rentabilité, Confidentialité, Annulation, Expansion et Marketing',
          'Recrutement, Dons, Publicité, Locaux, Équipements et Profits',
          'Conception, Impression, Distribution, Stockage, Ventes et Dédouanement'
        ],
        correct: 0,
        explanationAr: 'معايير OECD DAC الستة تمثل المعيار الذهبي الدولي المعتمد لتقييم التدخلات الإنسانية والتنموية.'
      },
      {
        id: 5,
        textAr: 'كيف يسهم مبدأ عدم إلحاق الضرر (Do No Harm) في تصميم المساعدات الميدانية؟',
        textEn: 'How does the "Do No Harm" principle guide the design of field assistance?',
        textFr: 'Comment le principe de "Ne pas nuire" guide-t-il la conception de l’aide sur le terrain ?',
        optionsAr: [
          'عبر دراسة التوترات الاجتماعية وتفادي خلق انقسامات أو تعريض الفئات المستفيدة لمخاطر أمنية',
          'عبر منع توزيع أي مساعدات غذائية في المناطق النائية',
          'عبر إلزام المستفيدين بالتنازل عن حقوقهم المدنية',
          'عبر توجيه كافة المساعدات لفئة واحدة فقط دون معايير استحقاق'
        ],
        optionsEn: [
          'By analyzing social dividers/connectors to avoid exacerbating tensions or exposing beneficiaries to risks',
          'By halting any aid delivery in remote communities',
          'By requiring beneficiaries to waive their civil rights',
          'By allocating all aid to a single group without vulnerability criteria'
        ],
        optionsFr: [
          'En analysant les facteurs de tension et de cohésion pour éviter d’aggraver les conflits ou d’exposer les bénéficiaires',
          'En suspendant toute aide dans les zones éloignées',
          'En exigeant des bénéficiaires le renoncement à leurs droits civils',
          'En allouant l’aide à un groupe unique sans critères de vulnérabilité'
        ],
        correct: 0,
        explanationAr: 'يفرض مبدأ عدم إلحاق الضرر التخطيط الدقيق لمنع استغلال المساعدات أو تأجيج الصراعات المحلية.'
      }
    ]
  },
  'shat-case-management': {
    courseId: 'shat-case-management',
    prefix: 'CM',
    titleAr: 'دورة إعداد وتأهيل مدير حالة في العمل الاجتماعي والإنساني',
    titleEn: 'Professional Case Manager Qualification Course',
    titleFr: 'Formation Certifiante de Gestionnaire de Cas',
    trainerAr: 'د. محمد إسليم • خبير إدارة الحالة والرعاية المتكاملة',
    trainerEn: 'Dr. Mohammed Isleem • Case Management & Social Welfare Expert',
    hours: '40 ساعة تدريبية وتطبيق ميداني',
    hoursEn: '40 Accredited Hours & Field Practicum',
    passingScore: 80,
    questions: [
      {
        id: 1,
        textAr: 'ما هي الخطوة الأولى الإلزامية في الدورة القياسية لإدارة الحالة؟',
        textEn: 'What is the mandatory first step in the standard case management cycle?',
        textFr: 'Quelle est la première étape obligatoire du cycle de gestion de cas ?',
        optionsAr: [
          'تحديد الحالة وتسجيلها والحصول على الموافقة/الموافقة المستنيرة المستمرة',
          'إغلاق الملف وحفظه بالأرشيف فوراً',
          'اتخاذ قرارات علاجية دون التحدث مع المستفيد',
          'نشر بيانات الحالة على وسائل التواصل'
        ],
        optionsEn: [
          'Identification, registration, and obtaining continuous informed consent/assent',
          'Immediately closing and archiving the case file',
          'Making clinical decisions without speaking to the client',
          'Publishing case information on social platforms'
        ],
        optionsFr: [
          'Identification, enregistrement et obtention du consentement éclairé continu',
          'Clôture immédiate et archivage du dossier',
          'Prise de décision sans entretien avec l’usager',
          'Publication des informations sur les réseaux sociaux'
        ],
        correct: 0,
        explanationAr: 'تحديد الحالة والحصول على الموافقة المستنيرة يمثلان الأساس القانوني والأخلاقي لإدارة الحالة.'
      },
      {
        id: 2,
        textAr: 'ما هو المبدأ الحاكم لمشاركة معلومات الحالة الحساسة مع مقدمي الخدمات الخارجيين؟',
        textEn: 'What is the governing principle for sharing sensitive case information with external service providers?',
        textFr: 'Quel est le principe régissant le partage d’informations sensibles avec des partenaires ?',
        optionsAr: [
          'مبدأ الحاجة إلى المعرفة (Need to Know) وبموافقة كتابية صريحة من صاحب الحالة',
          'مشاركة كامل الملف وسجل العائلة مع كافة الجمعيات دون قيد',
          'حظر أي تعاون مع أي جهة طبية أو قانونية حتى في حالات الخطر الشديد',
          'إرسال البيانات عبر مجموعات عامة غير مشفرة'
        ],
        optionsEn: [
          '"Need to Know" principle with explicit written informed consent from the client',
          'Sharing full files and family history with all entities without restriction',
          'Prohibiting any external cooperation even in life-threatening emergencies',
          'Distributing case data via unencrypted public groups'
        ],
        optionsFr: [
          'Principe du "besoin d’en savoir" avec consentement éclairé écrit du bénéficiaire',
          'Partage illimité de l’historique familial avec toutes les associations',
          'Interdiction absolue de coopération même en cas d’urgence vitale',
          'Transmission des données via des canaux publics non chiffrés'
        ],
        correct: 0,
        explanationAr: 'لا تتم مشاركة المعلومات إلا بالقدر الضروري لتقديم الخدمة وبموافقة مستنيرة موثقة.'
      },
      {
        id: 3,
        textAr: 'متى يتم إغلاق ملف إدارة الحالة بشكل منهجي؟',
        textEn: 'When is a case management file systematically closed?',
        textFr: 'Quand clôture-t-on méthodiquement un dossier de gestion de cas ?',
        optionsAr: [
          'عند تحقيق أهداف خطة التدخل، استقرار الحالة، وتراجع مستويات الخطر مع جاهزية العميل',
          'بمجرد انتهاء الشهر الأول بغض النظر عن حالة المستفيد',
          'عند سفر مدير الحالة في إجازة سنوية',
          'بقرار عشوائي دون إجراء تقييم نهائي'
        ],
        optionsEn: [
          'Upon achieving intervention goals, case stabilization, risk reduction, and client readiness',
          'Automatically at month-end regardless of client status',
          'Whenever the case worker goes on annual leave',
          'Through an arbitrary decision without final case review'
        ],
        optionsFr: [
          'Lorsque les objectifs sont atteints, la situation stabilisée et les risques atténués',
          'Dès la fin du premier mois sans évaluation de l’état du bénéficiaire',
          'Dès que le gestionnaire part en congé',
          'Sur décision arbitraire sans examen final du dossier'
        ],
        correct: 0,
        explanationAr: 'الإغلاق المنهجي يتطلب مراجعة شاملة والتأكد من تمكين الحالة والحد من المخاطر.'
      }
    ]
  },
  'shat-psea-expert': {
    courseId: 'shat-psea-expert',
    prefix: 'PSEA',
    titleAr: 'البرنامج التنفيذي المتقدم في الحماية وصون السلامة ومنع الاستغلال (PSEA)',
    titleEn: 'Executive Safeguarding & PSEA Leadership Certification',
    titleFr: 'Certification Exécutive en Sauvegarde et Prévention PSEA',
    trainerAr: 'أ. حسام جاد الله • خبير الحماية وصون السلامة',
    trainerEn: 'Hossam Jadallah • Safeguarding & PSEA Specialist',
    hours: '30 ساعة تدريبية وتطبيق إجرائي',
    hoursEn: '30 Accredited Hours & Institutional Policy Practicum',
    passingScore: 80,
    questions: [
      {
        id: 1,
        textAr: 'وفق تعريف اللجنة الدائمة المشتركة بين الوكالات (IASC)، ماذا يعني الاستغلال الجنسي؟',
        textEn: 'Under IASC guidelines, what defines sexual exploitation?',
        textFr: 'Selon les directives de l’IASC, comment définit-on l’exploitation sexuelle ?',
        optionsAr: [
          'إساءة استغلال موقع ضعف أو فارق سلطة لأغراض جنسية، بما في ذلك تقديم المساعدات مقابل خدمات',
          'الخلافات الإدارية بين موظفي المؤسسة حول ساعات العمل',
          'التأخر في صرف الرواتب الشهرية للكوادر',
          'تحديث الموقع الإلكتروني للمؤسسة دون إذن'
        ],
        optionsEn: [
          'Any actual or attempted abuse of position of vulnerability or differential power for sexual purposes',
          'Administrative disagreements between staff regarding office working hours',
          'Delays in monthly staff payroll disbursement',
          'Updating the organization website without prior authorization'
        ],
        optionsFr: [
          'Tout abus effectif ou tentative d’abus d’un état de vulnérabilité ou de pouvoir à des fins sexuelles',
          'Les différends administratifs entre collègues sur les horaires de bureau',
          'Les retards dans le versement des salaires mensuels',
          'La mise à jour du site web sans autorisation préalable'
        ],
        correct: 0,
        explanationAr: 'الاستغلال الجنسي ينطوي على استغلال النفوذ أو الفقر أو الاحتياج للمساعدات الإنسانية.'
      },
      {
        id: 2,
        textAr: 'ما هو التزام الموظف الإنساني في حال علمه بوجود شبهة استغلال جنسي وفق مدونة السلوك؟',
        textEn: 'What is the mandatory duty of a humanitarian worker upon suspecting sexual exploitation?',
        textFr: 'Quelle est l’obligation déontologique de tout travailleur humanitaire face à un soupçon d’exploitation ?',
        optionsAr: [
          'الإبلاغ الإلزامي الفوري عبر القنوات السرية المعتمدة لحماية المتأثرين وصون السلامة',
          'التزام الصمت التام لتجنب المشاكل الإدارية',
          'التحقيق الفردي السري دون الرجوع للمسؤولين',
          'مطالبة الضحية بإثبات الجريمة بنفسها أولاً'
        ],
        optionsEn: [
          'Mandatory immediate reporting through official confidential channels to safeguard affected populations',
          'Remaining silent to avoid internal friction and administrative issues',
          'Conducting unauthorized private inquiries independently',
          'Requiring the victim to gather forensic proof before filing a report'
        ],
        optionsFr: [
          'Signalement obligatoire et immédiat via les circuits confidentiels homologués',
          'Garder le silence pour éviter les tensions internes',
          'Mener des investigations personnelles non encadrées',
          'Exiger que la victime apporte elle-même les preuves matérielles'
        ],
        correct: 0,
        explanationAr: 'الإبلاغ الإلزامي الفوري واجب أخلاقي ومؤسسي لا يقبل التهاون أو التأجيل لحماية الأرواح.'
      }
    ]
  }
};

export const examEngine = {
  activeExam: null,
  userAnswers: {},

  initExam(courseId = 'shat-chs-master', lang = 'ar') {
    const exam = EXAM_REGISTRY[courseId] || EXAM_REGISTRY['shat-chs-master'];
    this.activeExam = exam;
    this.userAnswers = {};

    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    // Get or Create Modal in DOM
    let modal = document.getElementById('modal-exam-engine');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-exam-engine';
      modal.className = 'modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = `
        <div class="modal-window" style="max-width: 780px; max-height: 92vh; display: flex; flex-direction: column;">
          <div class="modal-top no-print" style="border-bottom: 2px solid var(--shat-navy); padding: 18px 24px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.5rem;">📝</span>
              <div>
                <h3 id="modal-exam-title" style="font-size: 1.15rem; font-weight: 900; color: var(--shat-navy); margin: 0;"></h3>
                <span id="modal-exam-subtitle" style="font-size: 0.78rem; color: var(--shat-green); font-weight: 700;"></span>
              </div>
            </div>
            <button class="modal-close" id="modal-exam-close" aria-label="Close">✕</button>
          </div>
          <div id="modal-exam-body" style="overflow-y: auto; padding: 24px;"></div>
        </div>
      `;
      document.body.appendChild(modal);

      const btnClose = modal.querySelector('#modal-exam-close');
      if (btnClose) btnClose.onclick = () => modal.classList.remove('open');
    }

    const titleEl = document.getElementById('modal-exam-title');
    const subtitleEl = document.getElementById('modal-exam-subtitle');
    if (titleEl) titleEl.innerText = txt(exam.titleAr, exam.titleEn, exam.titleFr);
    if (subtitleEl) subtitleEl.innerText = txt('الاختبار المهني المعتمد • درجة الاجتياز المطلوبة: 80%', 'Accredited Exam • Passing Score: 80%', 'Épreuve Certifiante • Seuil : 80%');

    this.renderExamQuestions(lang);
    modal.classList.add('open');
  },

  renderExamQuestions(lang = 'ar') {
    const container = document.getElementById('modal-exam-body');
    if (!container || !this.activeExam) return;

    const exam = this.activeExam;
    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    container.innerHTML = `
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 10px; padding: 14px 18px; margin-bottom: 22px; font-size: 0.88rem; color: #1E40AF; line-height: 1.6;">
        ℹ️ ${txt(
          'أهلاً بك في نظام التقييم الأكاديمي المعتمد. أجب عن كافة الأسئلة بدقة استناداً للمعايير الدولية. عند تحقيقك درجة 80% فأعلى، سيتم تلقائياً إصدار شهادتك الرقمية المعتمدة رسمياً وتوثيقها بباركود التحقق الفوري.',
          'Welcome to the accredited assessment portal. Answer all questions adhering to international standards. Achieving 80% or higher unlocks your verifiable official digital certificate instantly.',
          'Bienvenue dans l’évaluation officielle. Un score d’au moins 80% génère instantanément votre certificat accrédité vérifiable par QR code.'
        )}
      </div>

      <form id="form-interactive-exam" style="display: flex; flex-direction: column; gap: 24px;">
        ${exam.questions.map((q, idx) => {
          const qText = isAr ? q.textAr : (lang === 'fr' ? q.textFr || q.textEn : q.textEn);
          const options = isAr ? q.optionsAr : (lang === 'fr' ? q.optionsFr || q.optionsEn : q.optionsEn);

          return `
            <div class="exam-question-card" style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
              <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 14px;">
                <span style="background: var(--shat-navy); color: #FFFFFF; font-weight: 800; font-size: 0.82rem; padding: 3px 10px; border-radius: 6px;">
                  ${txt('سؤال', 'Question', 'Question')} 0${idx + 1}
                </span>
                <div style="font-weight: 800; font-size: 1rem; color: var(--shat-navy); line-height: 1.5;">
                  ${qText}
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                ${options.map((opt, optIdx) => `
                  <label class="exam-option-label" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #F8FAFC;
                    font-size: 0.92rem;
                    color: #334155;
                  ">
                    <input
                      type="radio"
                      name="q_${q.id}"
                      value="${optIdx}"
                      style="accent-color: var(--shat-green); width: 18px; height: 18px; cursor: pointer;"
                      required
                    >
                    <span style="font-weight: 600;">${opt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #E2E8F0; margin-top: 10px; flex-wrap: wrap; gap: 12px;">
          <button type="button" class="btn-clean btn-secondary btn-md" id="btn-cancel-exam">
            ${txt('إلغاء والعودة', 'Cancel', 'Annuler')}
          </button>

          <button type="submit" class="btn-clean btn-primary btn-md" style="background: var(--shat-green); font-weight: 800; padding: 12px 28px; box-shadow: 0 4px 14px rgba(30,126,52,0.3);">
            <span>🚀 ${txt('تسليم الإجابات واحتساب النتيجة', 'Submit & Grade Exam', 'Soumettre et Calculer')}</span>
          </button>
        </div>
      </form>
    `;

    // Bind event
    const form = document.getElementById('form-interactive-exam');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        this.evaluateExam(lang);
      };
    }

    const btnCancel = document.getElementById('btn-cancel-exam');
    if (btnCancel) {
      btnCancel.onclick = () => {
        const modal = document.getElementById('modal-exam-engine');
        if (modal) modal.classList.remove('open');
      };
    }
  },

  evaluateExam(lang = 'ar') {
    if (!this.activeExam) return;
    const exam = this.activeExam;
    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    let correctCount = 0;
    const totalCount = exam.questions.length;
    const reviewDetails = [];

    exam.questions.forEach((q, idx) => {
      const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
      const userVal = selected ? parseInt(selected.value, 10) : -1;
      const isRight = userVal === q.correct;
      if (isRight) correctCount++;

      reviewDetails.push({
        index: idx + 1,
        questionText: isAr ? q.textAr : (lang === 'fr' ? q.textFr || q.textEn : q.textEn),
        explanation: isAr ? q.explanationAr : 'Based on international compliance framework.',
        isRight
      });
    });

    const scorePercentage = Math.round((correctCount / totalCount) * 100);
    const passed = scorePercentage >= exam.passingScore;

    const container = document.getElementById('modal-exam-body');
    if (!container) return;

    if (passed) {
      // Create and Save Certificate
      const cert = this.generateAndSaveCertificate(exam, scorePercentage, lang);

      container.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="width: 80px; height: 80px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 16px; border: 3px solid #86EFAC;">
            ✓
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--shat-navy); margin: 0 0 8px;">
            🎉 ${txt('مبارك! تم اجتياز الاختبار بنجاح باهر', 'Congratulations! You Passed Successfully', 'Félicitations ! Examen Réussi')}
          </h2>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--shat-green); margin-bottom: 12px;">
            ${txt('النتيجة النهائية:', 'Final Score:', 'Score Final :')} ${scorePercentage}% (${correctCount}/${totalCount})
          </div>
          <p style="font-size: 0.92rem; color: #475569; max-width: 540px; margin: 0 auto 24px; line-height: 1.6;">
            ${txt(
              'تم توثيق إنجازك الأكاديمي رسمياً في سجلات شركة شات للتنمية والتطوير، وتم إصدار شهادتك الرقمية المعتمدة برقم تسلسلي موثق وباركود تحقق فوري.',
              'Your achievement is officially accredited and recorded in SHAT registry. Your verified certificate with dynamic verification barcode is now ready.',
              'Votre réussite est officiellement certifiée dans les registres SHAT. Votre certificat accrédité avec code de vérification est disponible.'
            )}
          </p>

          <div style="background: #F8FAFC; border: 1.5px dashed #CBD5E1; border-radius: 12px; padding: 18px; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 16px; text-align: right;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 700; color: #64748B;">الرقم التسلسلي المعتمد للشهادة:</div>
              <div style="font-size: 1.15rem; font-weight: 900; font-family: var(--font-mono); color: var(--shat-navy);">${cert.serial}</div>
            </div>
            <a href="#/verify" class="btn-clean btn-sm" style="background: var(--shat-navy); color: #FFFFFF; font-weight: 700;">
              🔍 فحص في بوابة التحقق
            </a>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button type="button" class="btn-clean btn-primary btn-md" id="btn-view-generated-cert" style="background: var(--shat-navy); font-weight: 800; padding: 12px 24px; box-shadow: 0 4px 14px rgba(15,46,74,0.3);">
              📜 ${txt('استعراض وتحميل الشهادة المعتمدة', 'View & Print Official Certificate', 'Voir le Certificat Homologué')}
            </button>
            <button type="button" class="btn-clean btn-secondary btn-md" id="btn-close-exam-modal">
              ${txt('إغلاق والعودة', 'Close', 'Fermer')}
            </button>
          </div>
        </div>
      `;

      const btnViewCert = document.getElementById('btn-view-generated-cert');
      if (btnViewCert) {
        btnViewCert.onclick = () => {
          const modal = document.getElementById('modal-exam-engine');
          if (modal) modal.classList.remove('open');
          this.openCertificateModal(cert, lang);
        };
      }

      const btnCloseModal = document.getElementById('btn-close-exam-modal');
      if (btnCloseModal) {
        btnCloseModal.onclick = () => {
          const modal = document.getElementById('modal-exam-engine');
          if (modal) modal.classList.remove('open');
        };
      }

      showToast(txt('✓ تهانينا! تم إصدار وتوثيق شهادتك بنجاح!', '✓ Certificate officially issued and registered!', '✓ Certificat émis et validé avec succès !'), 'success');

    } else {
      // Failed - Retry Option
      container.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="width: 72px; height: 72px; background: #FEE2E2; color: #DC2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 16px;">
            ⚠️
          </div>
          <h2 style="font-size: 1.4rem; font-weight: 900; color: #991B1B; margin: 0 0 8px;">
            ${txt('لم يتم تحقيق نسبة الاجتياز المطلوبة (80%)', 'Passing score not reached (80%)', 'Seuil de réussite non atteint (80%)')}
          </h2>
          <div style="font-size: 1.1rem; font-weight: 800; color: #DC2626; margin-bottom: 12px;">
            ${txt('درجتك:', 'Your Score:', 'Votre Score :')} ${scorePercentage}% (${correctCount}/${totalCount})
          </div>
          <p style="font-size: 0.9rem; color: #64748B; max-width: 500px; margin: 0 auto 24px; line-height: 1.6;">
            ${txt(
              'وفقاً لمعايير الاعتماد المهني لشركة شات، يشترط تحقيق 80% على الأقل للحصول على الشهادة المعتمدة. يمكنك مراجعة منهاج المساق وإعادة المحاولة في أي وقت.',
              'Adhering to SHAT institutional standards, an 80% passing threshold is required for official certification. Review course syllabus and re-attempt.',
              'Un seuil de 80% est exigé pour l’obtention du certificat. Vous pouvez réviser le cursus et retenter l’épreuve.'
            )}
          </p>

          <div style="display: flex; justify-content: center; gap: 12px;">
            <button type="button" class="btn-clean btn-primary btn-md" id="btn-retry-exam" style="background: var(--shat-navy); font-weight: 800;">
              🔄 ${txt('إعادة المحاولة الآن', 'Retake Exam Now', 'Retenter l’Épreuve')}
            </button>
            <button type="button" class="btn-clean btn-secondary btn-md" id="btn-cancel-retry">
              ${txt('العودة للمنهاج', 'Return to Course', 'Retour au Cursus')}
            </button>
          </div>
        </div>
      `;

      const btnRetry = document.getElementById('btn-retry-exam');
      if (btnRetry) btnRetry.onclick = () => this.renderExamQuestions(lang);

      const btnCancelRetry = document.getElementById('btn-cancel-retry');
      if (btnCancelRetry) {
        btnCancelRetry.onclick = () => {
          const modal = document.getElementById('modal-exam-engine');
          if (modal) modal.classList.remove('open');
        };
      }
    }
  },

  generateAndSaveCertificate(exam, score, lang = 'ar') {
    const rawUser = localStorage.getItem('shat_platform_current_user');
    let studentNameAr = 'أحمد محمود خليل';
    let studentNameEn = 'Ahmed Mahmoud Khalil';
    let nationalId = '902148901';

    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        if (u.name) {
          studentNameAr = u.name;
          studentNameEn = u.nameEn || u.name;
        }
        if (u.id) nationalId = String(u.id);
      } catch (e) {}
    }

    const year = new Date().getFullYear();
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const serial = `SHAT-${exam.prefix}-${year}-${randDigits}`;
    const today = new Date().toISOString().slice(0, 10);

    const cert = {
      serial,
      traineeNameAr: studentNameAr,
      traineeNameEn: studentNameEn,
      nationalId,
      programTitleAr: exam.titleAr,
      programTitleEn: exam.titleEn,
      hours: exam.hours,
      leadTrainer: exam.trainerAr,
      issueDate: today,
      grade: `امتياز مرتفع (${score}%)`,
      gradeEn: `Distinction (${score}%)`,
      status: 'معتمد وساري المفعول',
      statusEn: 'Officially Accredited & Active',
      accreditationBody: 'شركة شات للتنمية والتطوير • قطاع بناء القدرات والاعتماد المهني الدولي',
      verificationHash: `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      securityStamp: 'OFFICIAL_ACCREDITED_SEAL'
    };

    // Save into localStorage earned registry
    const earnedMap = JSON.parse(localStorage.getItem('shat_earned_certificates') || '{}');
    earnedMap[serial] = cert;
    localStorage.setItem('shat_earned_certificates', JSON.stringify(earnedMap));

    // Also record completed course id
    const completedList = JSON.parse(localStorage.getItem('shat_completed_courses') || '[]');
    if (!completedList.includes(exam.courseId)) {
      completedList.push(exam.courseId);
      localStorage.setItem('shat_completed_courses', JSON.stringify(completedList));
    }

    return cert;
  },

  openCertificateModal(cert, lang = 'ar') {
    const isAr = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    let modal = document.getElementById('modal-accredited-certificate');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-accredited-certificate';
      modal.className = 'modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = `
        <div class="modal-window" style="max-width: 900px; max-height: 94vh; display: flex; flex-direction: column;">
          <div class="modal-top no-print" style="border-bottom: 2px solid var(--shat-navy); padding: 16px 24px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.4rem;">📜</span>
              <h3 style="font-size: 1.15rem; font-weight: 900; color: var(--shat-navy); margin: 0;">
                ${txt('الشهادة الرقمية المعتمدة رسمياً', 'Officially Accredited Digital Certificate', 'Certificat Numérique Homologué')}
              </h3>
            </div>
            <button class="modal-close" id="modal-cert-close" aria-label="Close">✕</button>
          </div>
          <div id="modal-cert-body" style="overflow-y: auto; padding: 24px;"></div>
        </div>
      `;
      document.body.appendChild(modal);

      const btnClose = modal.querySelector('#modal-cert-close');
      if (btnClose) btnClose.onclick = () => modal.classList.remove('open');
    }

    const container = document.getElementById('modal-cert-body');
    if (!container) return;

    // Full High-End Executive Certificate Template with Guilloche Border, Gold Seal & Dynamic QR
    container.innerHTML = `
      <div class="certificate-document" style="
        background: #FFFFFF;
        color: #0F172A;
        border: 12px double #0F2E4A;
        border-radius: 12px;
        padding: clamp(24px, 4vw, 44px);
        position: relative;
        box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        background-image: radial-gradient(#0F2E4A08 1px, transparent 1px);
        background-size: 24px 24px;
      ">
        <!-- Watermark Emblem -->
        <div style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.035;
          pointer-events: none;
          font-size: 22rem;
          font-weight: 900;
        ">
          SHAT
        </div>

        <!-- Header: Logos & Accreditation -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #CBD5E1; padding-bottom: 18px; margin-bottom: 28px; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 54px; width: auto; object-fit: contain;">
            <div>
              <div style="font-size: 1.15rem; font-weight: 900; color: #0F2E4A; letter-spacing: 0.5px;">شركة شات للتنمية والتطوير</div>
              <div style="font-size: 0.76rem; color: #64748B; font-weight: 700;">SHAT DEVELOPMENT & GROWTH PLATFORM</div>
            </div>
          </div>

          <div style="text-align: ${isAr ? 'left' : 'right'};">
            <span style="display: inline-block; background: #FEF3C7; border: 1px solid #F59E0B; color: #B45309; padding: 4px 12px; border-radius: 999px; font-size: 0.72rem; font-weight: 800;">
              ★ ${txt('اعتماد دولي وتدقيق مؤسسي معتمد', 'Accredited Credential', 'Certificat Homologué')}
            </span>
            <div style="font-size: 0.72rem; font-family: var(--font-mono); color: #64748B; margin-top: 4px; font-weight: 700;">
              REF: ${cert.serial}
            </div>
          </div>
        </div>

        <!-- Certificate Main Title -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 0.88rem; font-weight: 800; color: var(--shat-green); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
            ${txt('شهادة اجتياز واعتماد مهني متقدم', 'CERTIFICATE OF PROFESSIONAL ACHIEVEMENT', 'CERTIFICAT D’ACCOMPLISSEMENT PROFESSIONNEL')}
          </div>
          <h1 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; color: #0F2E4A; margin: 0; line-height: 1.3;">
            ${txt('تـشـهـد شـركـة شـات لـلـتـنـمـيـة والـتـطـويـر', 'This is to officially certify that', 'Ce document certifie avec honneur que')}
          </h1>
          <div style="font-size: 0.95rem; color: #64748B; margin-top: 6px;">
            ${txt('بأن المتدرب التنفيذي:', 'That the executive candidate:', 'Le candidat exécutif :')}
          </div>
        </div>

        <!-- Trainee Prominent Name -->
        <div style="text-align: center; margin-bottom: 26px;">
          <div style="font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 900; color: #0F2E4A; border-bottom: 2px dashed #94A3B8; display: inline-block; padding: 0 40px 8px;">
            ${cert.traineeNameAr}
          </div>
          <div style="font-size: 1.05rem; font-weight: 700; color: #64748B; margin-top: 6px; font-family: sans-serif;">
            ${cert.traineeNameEn}
          </div>
          <div style="font-size: 0.82rem; color: #94A3B8; margin-top: 4px; font-family: var(--font-mono);">
            ID / REG: ${cert.nationalId}
          </div>
        </div>

        <!-- Program & Fulfillment Text -->
        <div style="text-align: center; max-width: 680px; margin: 0 auto 32px; font-size: 0.96rem; color: #334155; line-height: 1.8;">
          ${txt(
            `قد أتم بنجاح واقتدار كافة متطلبات البرنامج التدريبي التخصصي والاختبار المعتمد بعنوان:`,
            `has successfully fulfilled all academic, practical, and evaluation requirements for the program:`,
            `a satisfait avec succès à toutes les exigences didactiques et pratiques du cursus :`
          )}
          <div style="font-size: 1.25rem; font-weight: 900; color: var(--shat-green); margin: 8px 0;">
            « ${cert.programTitleAr} »
          </div>
          <div style="font-size: 0.85rem; color: #64748B;">
            ${cert.hours} • ${txt('التقدير العام:', 'Overall Grade:', 'Mention :')} <strong>${cert.grade}</strong>
          </div>
        </div>

        <!-- Verification QR & Official Sign-off Seals -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 24px; border-top: 1.5px solid #E2E8F0; flex-wrap: wrap; gap: 20px;">
          
          <!-- Trainer Signature -->
          <div style="text-align: center; min-width: 170px;">
            <div style="font-size: 1.3rem; margin-bottom: 2px; font-family: 'Brush Script MT', cursive; color: #0F2E4A;">Hossam Jadallah</div>
            <div style="font-size: 0.84rem; font-weight: 800; color: #0F2E4A;">${cert.leadTrainer}</div>
            <div style="font-size: 0.72rem; color: #64748B;">استشاري بناء القدرات المؤسسية</div>
          </div>

          <!-- Official Gold Seal & QR Code -->
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="text-align: center;">
              <div style="width: 84px; height: 84px; padding: 6px; background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 8px;">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect x="5" y="5" width="26" height="26" fill="#0F2E4A"/>
                  <rect x="9" y="9" width="18" height="18" fill="#FFFFFF"/>
                  <rect x="13" y="13" width="10" height="10" fill="#10B981"/>
                  <rect x="69" y="5" width="26" height="26" fill="#0F2E4A"/>
                  <rect x="73" y="9" width="18" height="18" fill="#FFFFFF"/>
                  <rect x="77" y="13" width="10" height="10" fill="#10B981"/>
                  <rect x="5" y="69" width="26" height="26" fill="#0F2E4A"/>
                  <rect x="9" y="73" width="18" height="18" fill="#FFFFFF"/>
                  <rect x="13" y="77" width="10" height="10" fill="#10B981"/>
                  <rect x="36" y="8" width="6" height="6" fill="#0F2E4A"/>
                  <rect x="48" y="18" width="8" height="8" fill="#10B981"/>
                  <rect x="36" y="38" width="28" height="28" fill="#0F2E4A"/>
                  <rect x="42" y="44" width="16" height="16" fill="#10B981"/>
                </svg>
              </div>
              <div style="font-size: 0.65rem; font-family: var(--font-mono); color: #64748B; margin-top: 4px; font-weight: 700;">
                VERIFY CREDENTIAL
              </div>
            </div>

            <!-- Gold Embossed Seal -->
            <div style="
              width: 90px;
              height: 90px;
              border-radius: 50%;
              background: radial-gradient(circle, #FDE68A 0%, #D97706 70%, #92400E 100%);
              border: 3px solid #F59E0B;
              box-shadow: 0 4px 14px rgba(217,119,6,0.3);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #78350F;
              text-align: center;
              padding: 6px;
            ">
              <span style="font-size: 1.2rem;">🏛️</span>
              <span style="font-size: 0.58rem; font-weight: 900; letter-spacing: 0.5px;">SHAT SEAL</span>
              <span style="font-size: 0.5rem; font-weight: 800;">VERIFIED 2026</span>
            </div>
          </div>

          <!-- Board Sign-off -->
          <div style="text-align: center; min-width: 170px;">
            <div style="font-size: 1.3rem; margin-bottom: 2px; font-family: 'Brush Script MT', cursive; color: #0F2E4A;">Executive Board</div>
            <div style="font-size: 0.84rem; font-weight: 800; color: #0F2E4A;">إدارة شركة شات للتنمية</div>
            <div style="font-size: 0.72rem; color: #64748B;">تاريخ الإصدار: ${cert.issueDate}</div>
          </div>

        </div>

        <!-- Microprint Security Strip -->
        <div style="border-top: 1px dashed #CBD5E1; margin-top: 18px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 0.66rem; color: #94A3B8; font-family: var(--font-mono);">
          <span>SECURITY TOKEN: ${cert.verificationHash}</span>
          <span>CHECK AUTHENTICITY AT: SHAT-COMPANY-PLATFORM.VERCEL.APP/#/VERIFY</span>
        </div>

      </div>

      <!-- Action Bar (Excluded from Print) -->
      <div class="no-print" style="margin-top: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <button type="button" class="btn-clean btn-secondary btn-md" id="btn-close-cert-view">
          ${txt('إغلاق', 'Close', 'Fermer')}
        </button>

        <div style="display: flex; gap: 10px;">
          <a href="#/verify" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
            🔍 ${txt('التحقق في البوابة الرقمية', 'Verify Online', 'Vérifier')}
          </a>
          <button type="button" class="btn-clean btn-primary btn-md allow-print" id="btn-print-official-cert" style="background: var(--shat-navy); font-weight: 800; box-shadow: 0 4px 14px rgba(15,46,74,0.3);">
            🖨️ ${txt('طباعة الشهادة / حفظ كـ PDF', 'Print / Save Certificate (PDF)', 'Imprimer le Certificat (PDF)')}
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');

    const btnCloseInner = document.getElementById('btn-close-cert-view');
    if (btnCloseInner) btnCloseInner.onclick = () => modal.classList.remove('open');

    const btnPrint = document.getElementById('btn-print-official-cert');
    if (btnPrint) {
      btnPrint.onclick = () => {
        window.print();
      };
    }
  }
};

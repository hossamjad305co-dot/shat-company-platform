// SHAT Academy - Multilingual Content (AR, EN, FR, ES, IT)

export const academyTranslations = {
  ar: {
    navAcademy: "🎓 الأكاديمية",
    badge: "أكاديمية شات للقيادة والتطوير المؤسسي",
    title: "منصة بناء القدرات وإعداد الخبراء والممارسين",
    subtitle: "برامج تدريبية وتطبيقية متقدمة للمنظمات والكوادر الإنسانية والتنموية وفق أعلى المعايير والمواثيق العالمية (CHS, Sphere, OECD DAC, PSEA).",
    searchPlaceholder: "ابحث في البرامج والدبلومات التخصصية بالاسم أو المحور...",
    allTracks: "جميع المسارات الأكاديمية",
    tracks: [
      { id: "all", name: "جميع المسارات الأكاديمية" },
      { id: "humanitarian", name: "القطاع الإنساني والمعايير (CHS & Sphere)" },
      { id: "protection", name: "الحماية وصون السلامة (PSEA & Do No Harm)" },
      { id: "evaluation", name: "التقييم المستقل والمتابعة (OECD DAC & MEL)" },
      { id: "governance", name: "الحوكمة والقيادة والتخطيط الاستراتيجي" },
      { id: "tot", name: "إعداد وتأهيل المدربين المحترفين (TOT)" },
      { id: "empowerment", name: "تمكين المرأة والشباب والمجتمع" }
    ],
    stats: {
      graduates: "+1,450",
      graduatesLabel: "خريج وخبير معتمد",
      programs: "24+",
      programsLabel: "برنامج تدريبي وتطبيقي",
      partners: "50+",
      partnersLabel: "منظمة ومؤسسة شريكة",
      satisfaction: "99.2%",
      satisfactionLabel: "نسبة الرضا وجودة الأثر"
    },
    courses: [
      {
        id: "shat-chs-master",
        track: "humanitarian",
        trackName: "القطاع الإنساني",
        title: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة التنموية",
        desc: "برنامج متقدم يؤهل ممارسي العمل الإنساني لتطبيق الالتزامات التسعة للمعيار الإنساني الأساسي وضمان جودة المساءلة للجهات المتضررة (AAP).",
        duration: "45 ساعة تدريبية • 6 أسابيع",
        level: "متقدم (Advanced)",
        format: "هجين (تفاعلي + دراسات حالة عملية)",
        accreditation: "معتمد وفق CHS & Sphere",
        syllabus: [
          "الوحدة الأولى: الالتزامات التسعة للمعيار الإنساني الأساسي (CHS)",
          "الوحدة الثانية: أدوات المساءلة للمتأثرين بالأزمات (AAP)",
          "الوحدة الثالثة: تقييم الاحتياجات الإنسانية وتصميم التدخلات",
          "الوحدة الرابعة: دراسة حالة واقعية وتطبيق مصفوفة الجودة"
        ]
      },
      {
        id: "shat-psea-expert",
        track: "protection",
        trackName: "الحماية وصون السلامة",
        title: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA & Safeguarding)",
        desc: "تأهيل المستشارين ومسؤولي الحماية لبناء سياسات الصون المؤسسي، تحليل مخاطر الاستغلال والانتهاك الجنسيين، وتأسيس آليات الإحالة والشكاوى الآمنة.",
        duration: "40 ساعة تدريبية • 5 أسابيع",
        level: "تنفيذي واستشاري (Executive)",
        format: "افتراضي مباشر + تدريب عملي موجه",
        accreditation: "معتمد وفق أطر PSEA الدولية وDo No Harm",
        syllabus: [
          "الوحدة الأولى: المفاهيم القانونية والإنسانية للحماية وصون السلامة",
          "الوحدة الثانية: آليات تقييم المخاطر وتصميم سياسات Safeguarding",
          "الوحدة الثالثة: إدارة الإبلاغ، التحقيقات، وحماية الضحايا وسرية البيانات",
          "الوحدة الرابعة: خطة عمل مؤسسية ومراجعة الامتثال"
        ]
      },
      {
        id: "shat-oecd-evaluator",
        track: "evaluation",
        trackName: "التقييم المستقل والمتابعة",
        title: "إعداد مقيمي المشاريع والبرامج وفق معايير OECD DAC الستة",
        desc: "تطوير قدرات المقيمين المستقلين في تقييم الملائمة، الاتساق، الفعالية، الكفاءة، الأثر، والاستدامة مع إتقان مناهج البحث الكمي والنوعي وأطر UNEG.",
        duration: "50 ساعة تدريبية • 7 أسابيع",
        level: "خبير استشاري (Expert Level)",
        format: "حضوري وهجين + مشروع تقييم ميداني حقيقي",
        accreditation: "معتمد وفق OECD DAC Criteria & UNEG",
        syllabus: [
          "الوحدة الأولى: معايير OECD DAC الستة وأسئلة التقييم الاستراتيجية",
          "الوحدة الثانية: منهجيات جمع الأدلة، العينات، والتحليل المختلط",
          "الوحدة الثالثة: بناء تقارير التقييم المستقلة واستخلاص التوصيات",
          "الوحدة الرابعة: مناقشة تقرير تقييم حقيقي وعرض النتائج للمانحين"
        ]
      },
      {
        id: "shat-tot-professional",
        track: "tot",
        trackName: "إعداد المدربين",
        title: "تأهيل وإعداد المدربين المحترفين للمؤسسات الإنسانية والتنموية (TOT)",
        desc: "إتقان تصميم الحقائب التدريبية القائمة على الكفايات، تيسير التعلم التجريبي للبالغين، وتقييم مخرجات التعلم وفق نموذج كيركباتريك وتطبيقات الذكاء الاصطناعي في التعليم.",
        duration: "36 ساعة تدريبية • 4 أسابيع",
        level: "ممارس محترف (Professional)",
        format: "ورش عمل تفاعلية ومحاكاة حية",
        accreditation: "شهادة مدرب معتمد من شات",
        syllabus: [
          "الوحدة الأولى: سيكولوجية تعليم الكبار والتعلم التجريبي (Kolb's Cycle)",
          "الوحدة الثانية: تحليل الاحتياجات التدريبية وتصميم الحقائب القائمة على الكفايات",
          "الوحدة الثالثة: مهارات الإلقاء والتيسير وإدارة مجموعات العمل",
          "الوحدة الرابعة: مشروع التخرج: تقديم جلسة تدريبية وتقييم الأداء بالصوت والصورة"
        ]
      },
      {
        id: "shat-governance-strategy",
        track: "governance",
        trackName: "الحوكمة والقيادة",
        title: "الحوكمة والقيادة الاستراتيجية لمنظمات المجتمع المدني والمؤسسات التنموية",
        desc: "بناء الرؤى الاستراتيجية، هياكل الحوكمة الرشيدة، إدارة التغيير المؤسسي، ومؤشرات الأداء الرئيسية (KPIs) لتعزيز مرونة واستدامة المنظمات.",
        duration: "32 ساعة تدريبية • 4 أسابيع",
        level: "قيادي وتنفيذي (Leadership)",
        format: "حلقات نقاش تنفيذية ودراسات قيادية",
        accreditation: "معتمد وفق معايير الحوكمة المؤسسية الدولية",
        syllabus: [
          "الوحدة الأولى: أطر ومبادئ الحوكمة الرشيدة وإدارة مجالس الإدارة",
          "الوحدة الثانية: صياغة الخطط الاستراتيجية وخرائط الأهداف والمخاطر",
          "الوحدة الثالثة: تطوير بطاقات الأداء المتوازن (Balanced Scorecards)",
          "الوحدة الرابعة: قيادة التغيير والتحول الرقمي المستدام"
        ]
      },
      {
        id: "shat-meal-systems",
        track: "evaluation",
        trackName: "المتابعة والتقييم MEAL",
        title: "تصميم وإدارة منظومة الرصد والمتابعة والمساءلة والتعلم (MEAL Systems)",
        desc: "تأسيس نظم MEAL متكاملة، مؤشرات الأداء، خطط الرصد الرقمية، آليات المساءلة المجتمعية، واستراتيجيات إدارة المعرفة المؤسسية.",
        duration: "40 ساعة تدريبية • 5 أسابيع",
        level: "متقدم (Advanced)",
        format: "تطبيقي مع برمجيات وأدوات رقمية",
        accreditation: "معتمد وفق المعايير الإنسانية الدولية",
        syllabus: [
          "الوحدة الأولى: إطار المنطق التدخلي ونظرية التغيير (Theory of Change)",
          "الوحدة الثانية: بناء خطط الرصد (PMP) ومصفوفة المؤشرات الذكية",
          "الوحدة الثالثة: المساءلة والتعلم المستمر (Adaptive Management)",
          "الوحدة الرابعة: لوحات القياس الرقمية وتوثيق الدروس المستفادة"
        ]
      }
    ],
    verify: {
      title: "بوابة التحقق من الشهادات والاعتمادات الرسمية",
      subtitle: "تتيح لك هذه المنصة التحقق الفوري من صحة ومصداقية أي شهادة صادرة عن أكاديمية شركة شات للتنمية والتطوير.",
      placeholder: "أدخل رقم الشهادة (مثال: SHAT-2026-CHS-01)",
      btn: "التحقق من الوثيقة",
      testingTip: "نماذج شهادات معتمدة للتجربة: SHAT-2026-CHS-01 أو SHAT-2026-PSEA-02 أو SHAT-2026-OECD-03",
      verifiedTitle: "وثيقة معتمدة ومسجلة رسمياً",
      studentLabel: "اسم المستفيد / الخريج:",
      courseLabel: "البرنامج الأكاديمي:",
      dateLabel: "تاريخ الإصدار:",
      gradeLabel: "التقدير والتقييم:",
      accreditationLabel: "الاعتماد الدولي:",
      statusActive: "سارية ومعتمدة دولياً",
      notFound: "عذراً، لم يتم العثور على شهادة مسجلة بهذا الرقم. يرجى التأكد من كتابة الرقم بدقة ومراجعة إدارة الأكاديمية."
    },
    modal: {
      enrollTitle: "التسجيل في البرنامج الأكاديمي",
      syllabusTitle: "المنهج والوحدات التدريبية",
      fullName: "الاسم الكامل للمشارك",
      email: "البريد الإلكتروني المهني",
      phone: "رقم الهاتف / الواتساب",
      org: "جهة العمل / المنظمة الحالية",
      background: "الخلفية المهنية والهدف من الالتحاق",
      submitEnroll: "تأكيد طلب الالتحاق",
      successMsg: "تم تقديم طلب الالتحاق بنجاح! سيتم التواصل معك من قبل فريق القبول والتسجيل بالأكاديمية لإتمام إجراءات الانضمام."
    }
  },

  en: {
    navAcademy: "🎓 SHAT Academy",
    badge: "SHAT Academy for Leadership & Institutional Growth",
    title: "Executive Capacity Building & Professional Mastery",
    subtitle: "Advanced applied learning programs for humanitarian and institutional development practitioners, aligned with global standards (CHS, Sphere, OECD DAC, PSEA).",
    searchPlaceholder: "Search specialized programs and diplomas by title or topic...",
    allTracks: "All Academic Tracks",
    tracks: [
      { id: "all", name: "All Academic Tracks" },
      { id: "humanitarian", name: "Humanitarian & Global Standards (CHS & Sphere)" },
      { id: "protection", name: "Protection & Safeguarding (PSEA & Do No Harm)" },
      { id: "evaluation", name: "Independent Evaluation & MEL (OECD DAC)" },
      { id: "governance", name: "Governance & Strategic Leadership" },
      { id: "tot", name: "Training of Trainers (TOT Professional)" },
      { id: "empowerment", name: "Women & Youth Empowerment" }
    ],
    stats: {
      graduates: "+1,450",
      graduatesLabel: "Certified Graduates & Experts",
      programs: "24+",
      programsLabel: "Applied Professional Programs",
      partners: "50+",
      partnersLabel: "Partner Institutions & NGOs",
      satisfaction: "99.2%",
      satisfactionLabel: "Participant Satisfaction & Impact"
    },
    courses: [
      {
        id: "shat-chs-master",
        track: "humanitarian",
        trackName: "Humanitarian Sector",
        title: "Core Humanitarian Standard (CHS) & Development Response Diploma",
        desc: "Advanced program qualifying humanitarian practitioners to implement the Nine Commitments of the CHS and enforce rigorous Accountability to Affected People (AAP).",
        duration: "45 Training Hours • 6 Weeks",
        level: "Advanced",
        format: "Hybrid (Interactive + Case Studies)",
        accreditation: "Accredited according to CHS & Sphere",
        syllabus: [
          "Module 1: The Nine Commitments of the Core Humanitarian Standard",
          "Module 2: Practical AAP Tools and Community Feedback Mechanisms",
          "Module 3: Needs Assessment and Principled Intervention Design",
          "Module 4: Real-world Case Simulation and Quality Matrix Audit"
        ]
      },
      {
        id: "shat-psea-expert",
        track: "protection",
        trackName: "Protection & Safeguarding",
        title: "Executive Program in Protection & Safeguarding Consulting (PSEA)",
        desc: "Equipping advisors and focal points to build institutional safeguarding policies, conduct sexual exploitation and abuse risk assessments, and establish secure referral pathways.",
        duration: "40 Training Hours • 5 Weeks",
        level: "Executive & Advisory",
        format: "Live Virtual + Practical Mentoring",
        accreditation: "Aligned with Inter-Agency PSEA Standards & Do No Harm",
        syllabus: [
          "Module 1: Legal and Humanitarian Foundations of Safeguarding",
          "Module 2: Risk Assessment Architectures and Policy Formulation",
          "Module 3: Incident Management, Investigation Protocols, and Survivor Protection",
          "Module 4: Institutional Action Planning and Compliance Auditing"
        ]
      },
      {
        id: "shat-oecd-evaluator",
        track: "evaluation",
        trackName: "Independent Evaluation",
        title: "External Evaluation Specialist: OECD DAC Six Criteria",
        desc: "Developing independent evaluators proficient in assessing Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability using mixed-method research and UNEG norms.",
        duration: "50 Training Hours • 7 Weeks",
        level: "Expert Level",
        format: "Hybrid + Supervised Field Evaluation Project",
        accreditation: "Accredited under OECD DAC Criteria & UNEG Standards",
        syllabus: [
          "Module 1: The Six OECD DAC Criteria and Strategic Evaluation Questions",
          "Module 2: Evidence Synthesis, Mixed Methods, and Field Sampling",
          "Module 3: Formulating Independent Evaluation Reports & Actionable Lessons",
          "Module 4: Presenting Findings to Donor Boards & Stakeholders"
        ]
      },
      {
        id: "shat-tot-professional",
        track: "tot",
        trackName: "Training of Trainers",
        title: "Professional Training of Trainers for Humanitarian & Development Orgs (TOT)",
        desc: "Master competency-based curriculum design, adult experiential learning facilitation (Kolb's cycle), Kirkpatrick outcome evaluation, and AI-assisted educational frameworks.",
        duration: "36 Training Hours • 4 Weeks",
        level: "Professional Practitioner",
        format: "Interactive Studio Workshops & Micro-teaching",
        accreditation: "SHAT Certified Professional Facilitator",
        syllabus: [
          "Module 1: Adult Learning Psychology and Experiential Cycles",
          "Module 2: Competency-based Curriculum and Instructional Architecture",
          "Module 3: Facilitation Dynamics, Conflict Resolution & Group Management",
          "Module 4: Capstone: Micro-teaching Delivery with Video Analysis & Feedback"
        ]
      },
      {
        id: "shat-governance-strategy",
        track: "governance",
        trackName: "Governance & Leadership",
        title: "Strategic Governance & Institutional Leadership for Non-Profit Organizations",
        desc: "Developing executive governance structures, robust board oversight, organizational change management, and balanced scorecards for resilient civil society entities.",
        duration: "32 Training Hours • 4 Weeks",
        level: "Executive & Leadership",
        format: "Executive Seminars & Case Labs",
        accreditation: "Conforms to International Governance Frameworks",
        syllabus: [
          "Module 1: Good Governance Norms, Board Dynamics & Fiduciary Accountability",
          "Module 2: Strategic Roadmapping, Objective Cascades & Risk Matrices",
          "Module 3: Designing Balanced Scorecards and Operational KPIs",
          "Module 4: Transformational Leadership and Change Management"
        ]
      },
      {
        id: "shat-meal-systems",
        track: "evaluation",
        trackName: "MEAL Systems",
        title: "Designing & Managing Integrated MEAL Systems (Monitoring, Evaluation, Accountability & Learning)",
        desc: "Architecting end-to-end MEAL architectures, result frameworks, digital indicators, community accountability loops, and organizational knowledge harvesting.",
        duration: "40 Training Hours • 5 Weeks",
        level: "Advanced",
        format: "Hands-on with Industry Cloud Toolkits",
        accreditation: "Conforms to International Development Standards",
        syllabus: [
          "Module 1: Results Frameworks, LogFrames, and Theory of Change",
          "Module 2: Performance Monitoring Plans (PMP) & Indicator Tracking",
          "Module 3: Community Accountability, Complaint Channels & Feedback Loops",
          "Module 4: Digital Dashboards and Knowledge Harvesting Methodologies"
        ]
      }
    ],
    verify: {
      title: "Official Certificate Verification Portal",
      subtitle: "Instant real-time verification of credentials, diplomas, and accreditations issued by SHAT Academy.",
      placeholder: "Enter Certificate Code (e.g., SHAT-2026-CHS-01)",
      btn: "Verify Credential",
      testingTip: "Sample verified credentials to test: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, or SHAT-2026-OECD-03",
      verifiedTitle: "Officially Verified & Authenticated Credential",
      studentLabel: "Awardee / Graduate Name:",
      courseLabel: "Academic Program:",
      dateLabel: "Issuance Date:",
      gradeLabel: "Evaluation & Distinction:",
      accreditationLabel: "International Accreditation:",
      statusActive: "Active & Internationally Recognized",
      notFound: "No certified record was found for this code. Please verify the code and contact SHAT Academy registry."
    },
    modal: {
      enrollTitle: "Enroll in Academic Program",
      syllabusTitle: "Course Curriculum & Syllabus",
      fullName: "Full Name",
      email: "Professional Email",
      phone: "Phone / WhatsApp",
      org: "Organization / Institution",
      background: "Professional Background & Learning Objectives",
      submitEnroll: "Confirm Academic Enrollment",
      successMsg: "Enrollment request submitted successfully! Our Academic Admissions Office will contact you within 24 hours."
    }
  },

  fr: {
    navAcademy: "🎓 Académie SHAT",
    badge: "Académie SHAT pour le Leadership et le Développement Institutionnel",
    title: "Plateforme de Renforcement des Capacités & d'Excellence Professionnelle",
    subtitle: "Programmes appliqués de haut niveau pour les acteurs humanitaires et du développement, conformes aux normes internationales (CHS, Sphere, OECD DAC, PSEA).",
    searchPlaceholder: "Rechercher des programmes et diplômes...",
    allTracks: "Tous les parcours",
    tracks: [
      { id: "all", name: "Tous les parcours académiques" },
      { id: "humanitarian", name: "Secteur Humanitaire (CHS & Sphere)" },
      { id: "protection", name: "Protection & Sauvegarde (PSEA)" },
      { id: "evaluation", name: "Évaluation Indépendante (OECD DAC)" },
      { id: "governance", name: "Gouvernance & Leadership Stratégique" },
      { id: "tot", name: "Formation de Formateurs (TOT)" },
      { id: "empowerment", name: "Autonomisation Femmes & Jeunes" }
    ],
    stats: {
      graduates: "+1,450",
      graduatesLabel: "Diplômés et Experts Certifiés",
      programs: "24+",
      programsLabel: "Programmes Professionnels Appliqués",
      partners: "50+",
      partnersLabel: "Institutions & ONG Partenaires",
      satisfaction: "99.2%",
      satisfactionLabel: "Taux de Satisfaction et Impact"
    },
    courses: [],
    verify: {
      title: "Portail Officiel de Vérification des Certificats",
      subtitle: "Vérification instantanée et sécurisée des diplômes émis par l'Académie SHAT.",
      placeholder: "Code du certificat (ex: SHAT-2026-CHS-01)",
      btn: "Vérifier le diplôme",
      testingTip: "Certificats de test: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, ou SHAT-2026-OECD-03",
      verifiedTitle: "Certificat Officiellement Validé et Reconnu",
      studentLabel: "Nom du Titulaire:",
      courseLabel: "Programme Académique:",
      dateLabel: "Date de Délivrance:",
      gradeLabel: "Mention et Évaluation:",
      accreditationLabel: "Accréditation Internationale:",
      statusActive: "Actif et Internationalement Reconnu",
      notFound: "Aucun certificat trouvé avec ce numéro. Veuillez vérifier le code."
    },
    modal: {
      enrollTitle: "Inscription au Programme Académique",
      syllabusTitle: "Programme & Modules de Formation",
      fullName: "Nom et Prénom",
      email: "Email Professionnel",
      phone: "Téléphone / WhatsApp",
      org: "Organisation / Institution",
      background: "Parcours et Objectifs d'apprentissage",
      submitEnroll: "Confirmer l'inscription",
      successMsg: "Demande d'inscription reçue avec succès ! Notre bureau des admissions vous contactera sous 24h."
    }
  },

  es: {
    navAcademy: "🎓 Academia SHAT",
    badge: "Academia SHAT para el Liderazgo y Desarrollo Institucional",
    title: "Plataforma de Fortalecimiento de Capacidades y Excelencia",
    subtitle: "Programas avanzados para profesionales humanitarios y de desarrollo, alineados con normas globales (CHS, Sphere, OCDE DAC, PSEA).",
    searchPlaceholder: "Buscar programas y diplomados...",
    allTracks: "Todos los itinerarios",
    tracks: [
      { id: "all", name: "Todos los itinerarios académicos" },
      { id: "humanitarian", name: "Sector Humanitario (CHS & Sphere)" },
      { id: "protection", name: "Protección y Salvaguardia (PSEA)" },
      { id: "evaluation", name: "Evaluación Independiente (OCDE DAC)" },
      { id: "governance", name: "Gobernanza y Liderazgo Estratégico" },
      { id: "tot", name: "Formación de Formadores (TOT)" },
      { id: "empowerment", name: "Empoderamiento Mujeres y Jóvenes" }
    ],
    stats: {
      graduates: "+1,450",
      graduatesLabel: "Graduados y Expertos Certificados",
      programs: "24+",
      programsLabel: "Programas Profesionales Aplicados",
      partners: "50+",
      partnersLabel: "Instituciones y ONG Asociadas",
      satisfaction: "99.2%",
      satisfactionLabel: "Satisfacción e Impacto Demostrado"
    },
    courses: [],
    verify: {
      title: "Portal Oficial de Verificación de Certificados",
      subtitle: "Verificación en tiempo real de títulos y credenciales emitidos por la Academia SHAT.",
      placeholder: "Código del certificado (ej: SHAT-2026-CHS-01)",
      btn: "Verificar Credencial",
      testingTip: "Certificados de prueba: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, o SHAT-2026-OECD-03",
      verifiedTitle: "Credencial Oficialmente Verificada y Autenticada",
      studentLabel: "Nombre del Graduado:",
      courseLabel: "Programa Académico:",
      dateLabel: "Fecha de Emisión:",
      gradeLabel: "Calificación y Distinción:",
      accreditationLabel: "Acreditación Internacional:",
      statusActive: "Activo y Reconocido Internacionalmente",
      notFound: "No se encontró ningún registro para este código. Verifique e intente nuevamente."
    },
    modal: {
      enrollTitle: "Inscripción en el Programa Académico",
      syllabusTitle: "Plan de Estudios y Módulos",
      fullName: "Nombre y Apellidos",
      email: "Correo Profesional",
      phone: "Teléfono / WhatsApp",
      org: "Organización / Institución",
      background: "Experiencia y Objetivos",
      submitEnroll: "Confirmar Inscripción",
      successMsg: "¡Solicitud de inscripción recibida con éxito! Nuestro departamento de admisiones se comunicará con usted en 24 horas."
    }
  },

  it: {
    navAcademy: "🎓 Accademia SHAT",
    badge: "Accademia SHAT per la Leadership e lo Sviluppo Istituzionale",
    title: "Piattaforma di Potenziamento delle Capacità ed Eccellenza",
    subtitle: "Programmi avanzati per professionisti umanitari e dello sviluppo, conformi agli standard internazionali (CHS, Sphere, OCSE DAC, PSEA).",
    searchPlaceholder: "Cerca programmi e corsi di specializzazione...",
    allTracks: "Tutti i percorsi",
    tracks: [
      { id: "all", name: "Tutti i percorsi accademici" },
      { id: "humanitarian", name: "Settore Umanitario (CHS & Sphere)" },
      { id: "protection", name: "Protezione e Salvaguardia (PSEA)" },
      { id: "evaluation", name: "Valutazione Indipendente (OCSE DAC)" },
      { id: "governance", name: "Governance & Leadership Strategica" },
      { id: "tot", name: "Formazione dei Formatori (TOT)" },
      { id: "empowerment", name: "Empowerment Donne e Giovani" }
    ],
    stats: {
      graduates: "+1,450",
      graduatesLabel: "Laureati ed Esperti Certificati",
      programs: "24+",
      programsLabel: "Programmi Professionali Applicati",
      partners: "50+",
      partnersLabel: "Istituzioni e ONG Partner",
      satisfaction: "99.2%",
      satisfactionLabel: "Soddisfazione e Impatto Accertato"
    },
    courses: [],
    verify: {
      title: "Portale Ufficiale di Verifica dei Certificati",
      subtitle: "Verifica immediata dell'autenticità dei titoli rilasciati dall'Accademia SHAT.",
      placeholder: "Codice del certificato (es: SHAT-2026-CHS-01)",
      btn: "Verifica Titolo",
      testingTip: "Certificati di prova: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, o SHAT-2026-OECD-03",
      verifiedTitle: "Titolo Ufficialmente Verificato e Autenticato",
      studentLabel: "Nome del Diplomato:",
      courseLabel: "Programma Accademico:",
      dateLabel: "Data di Rilascio:",
      gradeLabel: "Valutazione e Merito:",
      accreditationLabel: "Accreditamento Internazionale:",
      statusActive: "Attivo e Riconosciuto a Livello Internazionale",
      notFound: "Nessun certificato trovato con questo codice."
    },
    modal: {
      enrollTitle: "Iscrizione al Programma Accademico",
      syllabusTitle: "Programma di Studio e Moduli",
      fullName: "Nome e Cognome",
      email: "Email Professionale",
      phone: "Telefono / WhatsApp",
      org: "Organizzazione / Istituzione",
      background: "Esperienza e Obiettivi",
      submitEnroll: "Conferma Iscrizione",
      successMsg: "Richiesta di iscrizione ricevuta con successo! Il nostro ufficio ammissioni ti contatterà entro 24 ore."
    }
  }
};

// Fallback course data for fr, es, it to english if empty
for (const l of ['fr', 'es', 'it']) {
  if (!academyTranslations[l].courses || academyTranslations[l].courses.length === 0) {
    academyTranslations[l].courses = academyTranslations.en.courses;
  }
}

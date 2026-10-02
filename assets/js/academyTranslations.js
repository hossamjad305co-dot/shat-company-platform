// SHAT Academy - Multilingual Content (AR, EN, FR, ES, IT)

export const academyTranslations = {
  ar: {
    navAcademy: "الأكاديمية",
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
        code: "CHS-101",
        track: "humanitarian",
        trackName: "القطاع الإنساني",
        title: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة التنموية",
        desc: "برنامج متقدم يؤهل ممارسي العمل الإنساني لتطبيق الالتزامات التسعة للمعيار الإنساني الأساسي وضمان جودة المساءلة للجهات المتضررة (AAP).",
        duration: "45 ساعة تدريبية • 6 أسابيع",
        level: "متقدم (Advanced)",
        instructorName: "د. أسامة المنصور",
        fee: "250$ (أو منحة ممولة للمنظمات)",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfzjius7lEMOULtsaz6ByhXwFx82mWUkXwQoisdkbid4PLhGg/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_CHS_MATERIALS_2026",
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
        id: "case-manager-2026",
        code: "CM-2026",
        track: "protection",
        trackName: "إدارة الحالة والعمل الميداني",
        title: "دورة إعداد وتأهيل مدير حالة Case Management (د. محمد إسليم)",
        desc: "برنامج تطبيقي متقدم يؤهل الأخصائيين الاجتماعيين والنفسيين وكوادر المنظمات لإدارة خطط الرعاية المتكاملة، تقييم الاحتياجات، وإحالة الحالات وفق أدلة العمل المعتمدة.",
        duration: "12 ساعة تدريبية (4 لقاءات)",
        level: "مهني تطبيقي تخصصي",
        instructorName: "د. محمد إسليم",
        fee: "150 شيكل فقط",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfzjius7lEMOULtsaz6ByhXwFx82mWUkXwQoisdkbid4PLhGg/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_CASE_MANAGEMENT_MATERIALS",
        format: "حضوري بقاعة شات التفاعلية",
        accreditation: "شهادة إتمام مشاركة معتمدة رسمياً",
        syllabus: [
          "المحور الأول: مفاهيم ومبادئ إدارة الحالة وخطوات التدخل الست",
          "المحور الثاني: أدوات التقييم الشامل وتحديد المخاطر والأولويات",
          "المحور الثالث: تصميم خطة التدخل الفردية ومسارات الإحالة الآمنة",
          "المحور الرابع: المتابعة والتوثيق وإغلاق الحالة وتطبيقات إكلينيكية"
        ]
      },
      {
        id: "presentation-skills-2026",
        code: "COMM-102",
        track: "governance",
        trackName: "الاتصال والتأثير المؤسسي",
        title: "دورة تدريبية مهارات العرض و التقديم (م. مهدي الملاحي)",
        desc: "تطوير مهارات الإلقاء والتحدث الجماهيري، إدارة لغة الجسد، وصياغة العروض التقديمية المؤثرة لإقناع المانحين والشركاء في قاعة شات التفاعلية.",
        duration: "12 ساعة تدريبية (4 لقاءات)",
        level: "احترافي تطبيقي",
        instructorName: "م. مهدي الملاحي",
        fee: "120 شيكل فقط",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSewFY_nZGz_jQ-FCWTw40O8wxuoQK4H9f1ted6An1NzIcGc_Q/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_PRESENTATION_SKILLS_MATERIALS",
        format: "حضوري تفاعلي عملي",
        accreditation: "شهادة إتمام معتمدة رسمياً",
        syllabus: [
          "المحور الأول: سيكولوجية الجمهور وهيكلة الرسالة الإقناعية",
          "المحور الثاني: لغة الجسد ونبرات الصوت والسيطرة على التوتر",
          "المحور الثالث: تصميم الشرائح الاحترافية وعرض البيانات المؤثرة",
          "المحور الرابع: محاكاة عملية وتقديم مشاريع التخرج أمام لجنة تحكيم"
        ]
      },
      {
        id: "humanitarian-worker-diploma",
        code: "HUM-DIP-142",
        track: "humanitarian",
        trackName: "دبلومات العمل الإنساني الشاملة",
        title: "دبلوم تأهيل عامل في المجال الإنساني «من المبادئ إلى الممارسة»",
        desc: "برنامج دبلوم تأهيلي مكثف وشامل يغطي المعايير الإنسانية، إدارة المشاريع، المتابعة والتقييم MEAL، الحماية PSEA، وسلاسل الإمداد، مؤهلاً الخريجين للعمل الفوري في المنظمات الدولية.",
        duration: "3 أشهر • 142 ساعة تدريبية • 13 دورة",
        level: "دبلوم مهني متكامل",
        instructorName: "نخبة من كبار الخبراء الإنسانيين (أكثر من 10 مدربين)",
        fee: "دفعات ميسرة خلال فترة التدريب",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSft0nB4QGxS2HCZApraSmn5GDca1R7taC0ZNs441kVx6gh_Og/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_HUMANITARIAN_DIPLOMA_MATERIALS",
        format: "مدمج (قاعات شات + تطبيقات ميدانية)",
        accreditation: "شهادة دبلوم معتمدة ضمن حفل تخرج رسمي",
        syllabus: [
          "المسار الأول: المعايير الإنسانية الدولية (Sphere, CHS, Do No Harm)",
          "المسار الثاني: إدارة دورة المشروع الإنساني والتنموي (PCM)",
          "المسار الثالث: المتابعة والتقييم والمساءلة والتعلم (MEAL)",
          "المسار الرابع: اللوجستيات وسلاسل الإمداد وإدارة المخيمات والإيواء"
        ]
      },
      {
        id: "shat-psea-expert",
        code: "PSEA-201",
        track: "protection",
        trackName: "الحماية وصون السلامة",
        title: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA & Safeguarding)",
        desc: "تأهيل المستشارين ومسؤولي الحماية لبناء سياسات الصون المؤسسي، تحليل مخاطر الاستغلال والانتهاك الجنسيين، وتأسيس آليات الإحالة والشكاوى الآمنة.",
        duration: "40 ساعة تدريبية • 5 أسابيع",
        level: "تنفيذي واستشاري (Executive)",
        instructorName: "أ. ندى الخالدي",
        fee: "200$",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_PSEA_MATERIALS",
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
        code: "OECD-301",
        track: "evaluation",
        trackName: "التقييم المستقل والمتابعة",
        title: "إعداد مقيمي المشاريع والبرامج وفق معايير OECD DAC الستة",
        desc: "تطوير قدرات المقيمين المستقلين في تقييم الملائمة، الاتساق، الفعالية، الكفاءة، الأثر، والاستدامة مع إتقان مناهج البحث الكمي والنوعي وأطر UNEG.",
        duration: "50 ساعة تدريبية • 7 أسابيع",
        level: "خبير استشاري (Expert Level)",
        instructorName: "د. أسامة المنصور",
        fee: "220$",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_OECD_DAC_MATERIALS",
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
        code: "TOT-401",
        track: "tot",
        trackName: "إعداد المدربين",
        title: "تأهيل وإعداد المدربين المحترفين للمؤسسات الإنسانية والتنموية (TOT)",
        desc: "إتقان تصميم الحقائب التدريبية القائمة على الكفايات، تيسير التعلم التجريبي للبالغين، وتقييم مخرجات التعلم وفق نموذج كيركباتريك وتطبيقات الذكاء الاصطناعي في التعليم.",
        duration: "36 ساعة تدريبية • 4 أسابيع",
        level: "ممارس محترف (Professional)",
        instructorName: "أ. حسام جاد الله",
        fee: "180$",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_TOT_MATERIALS",
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
        code: "GOV-501",
        track: "governance",
        trackName: "الحوكمة والقيادة",
        title: "الحوكمة والقيادة الاستراتيجية لمنظمات المجتمع المدني والمؤسسات التنموية",
        desc: "بناء الرؤى الاستراتيجية، هياكل الحوكمة الرشيدة، إدارة التغيير المؤسسي، ومؤشرات الأداء الرئيسية (KPIs) لتعزيز مرونة واستدامة المنظمات.",
        duration: "32 ساعة تدريبية • 4 أسابيع",
        level: "قيادي وتنفيذي (Leadership)",
        instructorName: "أ. حسام جاد الله",
        fee: "240$",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_GOV_MATERIALS",
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
        code: "MEAL-601",
        track: "evaluation",
        trackName: "المتابعة والتقييم MEAL",
        title: "تصميم وإدارة منظومة الرصد والمتابعة والمساءلة والتعلم (MEAL Systems)",
        desc: "تأسيس نظم MEAL متكاملة، مؤشرات الأداء، خطط الرصد الرقمية، آليات المساءلة المجتمعية، واستراتيجيات إدارة المعرفة المؤسسية.",
        duration: "40 ساعة تدريبية • 5 أسابيع",
        level: "متقدم (Advanced)",
        instructorName: "م. أحمد عمار",
        fee: "210$",
        googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform",
        driveFolderUrl: "https://drive.google.com/drive/folders/1_SHAT_MEAL_MATERIALS",
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
    navAcademy: "SHAT Academy",
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
        id: "case-manager-2026",
        code: "CM-2026",
        track: "protection",
        trackName: "Case Management & Field Work",
        title: "Professional Case Manager Qualification Course (Dr. Mohammed Isleem)",
        desc: "Advanced applied program qualifying social workers, psychologists, and NGO staff to design integrated care plans, conduct risk assessments, and establish safe referral pathways.",
        duration: "12 Training Hours (4 Sessions)",
        level: "Applied Professional",
        instructorName: "Dr. Mohammed Isleem",
        fee: "150 ILS only",
        format: "In-Person at SHAT Interactive Hall",
        accreditation: "Officially Certified Completion Credential",
        syllabus: [
          "Module 1: Case Management Foundations & Six Intervention Steps",
          "Module 2: Comprehensive Assessment Tools, Risk Screening & Prioritization",
          "Module 3: Individual Care Planning & Safe Multi-Sector Referral Pathways",
          "Module 4: Monitoring, Documentation, Case Closure & Clinical Applications"
        ]
      },
      {
        id: "presentation-skills-2026",
        code: "COMM-102",
        track: "governance",
        trackName: "Communications & Institutional Influence",
        title: "Executive Presentation Skills & Public Speaking (Eng. Mahdi Al-Mallahi)",
        desc: "Mastering public speaking, body language, vocal modulation, and crafting persuasive presentations to pitch projects and engage donors in SHAT interactive studio.",
        duration: "12 Training Hours (4 Sessions)",
        level: "Executive & Professional",
        instructorName: "Eng. Mahdi Al-Mallahi",
        fee: "120 ILS only",
        format: "Hands-on Interactive Studio",
        accreditation: "Officially Certified Completion Credential",
        syllabus: [
          "Module 1: Audience Psychology & Persuasive Storytelling Architecture",
          "Module 2: Body Language, Vocal Dynamics & Stage Fright Control",
          "Module 3: High-Impact Slide Design & Data Visualization for Donors",
          "Module 4: Live Simulated Pitches & Video Jury Evaluation"
        ]
      },
      {
        id: "humanitarian-worker-diploma",
        code: "HUM-DIP-142",
        track: "humanitarian",
        trackName: "Comprehensive Humanitarian Diplomas",
        title: "Humanitarian Worker Professional Diploma: Principles to Practice",
        desc: "Comprehensive 3-month intensive diploma covering international standards (Sphere, CHS, PSEA), Project Cycle Management, MEAL, and logistics for immediate NGO deployment.",
        duration: "3 Months • 142 Training Hours • 13 Modules",
        level: "Comprehensive Professional Diploma",
        instructorName: "Senior International Humanitarian Faculty (10+ Instructors)",
        fee: "Flexible Installments During Training",
        format: "Blended (Interactive Labs + Field Practicum)",
        accreditation: "Accredited Diploma with Official Graduation Ceremony",
        syllabus: [
          "Track 1: Global Humanitarian Standards (Sphere, CHS, Do No Harm)",
          "Track 2: Humanitarian & Development Project Cycle Management (PCM)",
          "Track 3: Monitoring, Evaluation, Accountability and Learning (MEAL)",
          "Track 4: Supply Chain, Logistics, Shelter & Camp Management"
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
    navAcademy: "Académie SHAT",
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
    courses: [
      {
        id: "shat-chs-master",
        code: "CHS-101",
        track: "humanitarian",
        trackName: "Secteur Humanitaire",
        title: "Diplôme de la Norme Humanitaire Fondamentale (CHS) et Réponse au Développement",
        desc: "Programme avancé qualifiant les praticiens humanitaires à mettre en œuvre les neuf engagements de la CHS et à garantir la redevabilité envers les populations affectées (AAP).",
        duration: "45 Heures de Formation • 6 Semaines",
        level: "Avancé",
        instructorName: "Dr. Osama Al-Mansour",
        fee: "250 $ (ou bourse financée)",
        format: "Hybride (Interactif + Études de cas)",
        accreditation: "Agréé selon CHS & Sphere",
        syllabus: [
          "Module 1 : Les Neuf Engagements de la Norme Humanitaire Fondamentale",
          "Module 2 : Outils pratiques de redevabilité (AAP) et gestion des plaintes",
          "Module 3 : Évaluation des besoins et conception des interventions",
          "Module 4 : Simulation de cas réel et audit de la matrice de qualité"
        ]
      },
      {
        id: "case-manager-2026",
        code: "CM-2026",
        track: "protection",
        trackName: "Gestion de Cas & Travail de Terrain",
        title: "Formation Qualifiante de Gestionnaire de Cas (Dr. Mohammed Isleem)",
        desc: "Programme appliqué avancé préparant les travailleurs sociaux et psychologues à piloter des plans de soins intégrés, évaluer les vulnérabilités et gérer les référencements sécurisés.",
        duration: "12 Heures de Formation (4 Sessions)",
        level: "Professionnel Appliqué",
        instructorName: "Dr. Mohammed Isleem",
        fee: "150 ILS seulement",
        format: "Présentiel en Salle Interactive SHAT",
        accreditation: "Certificat Officiel d'Accomplissement",
        syllabus: [
          "Module 1 : Principes fondamentaux de la gestion de cas et six étapes d'intervention",
          "Module 2 : Outils d'évaluation globale, identification des risques et priorités",
          "Module 3 : Élaboration du plan d'intervention individuel et circuits d'orientation sûrs",
          "Module 4 : Suivi, documentation, clôture de dossier et études cliniques"
        ]
      },
      {
        id: "presentation-skills-2026",
        code: "COMM-102",
        track: "governance",
        trackName: "Communication & Influence Institutionnelle",
        title: "Formation aux Compétences de Présentation et Prise de Parole (Ing. Mahdi Al-Mallahi)",
        desc: "Maîtrise de l'art oratoire, du langage corporel, de la modulation vocale et de la conception de présentations persuasives pour convaincre bailleurs et partenaires.",
        duration: "12 Heures de Formation (4 Sessions)",
        level: "Exécutif & Professionnel",
        instructorName: "Ing. Mahdi Al-Mallahi",
        fee: "120 ILS seulement",
        format: "Atelier Pratique Interactif",
        accreditation: "Certificat Officiel d'Accomplissement",
        syllabus: [
          "Module 1 : Psychologie de l'auditoire et structuration du message persuasif",
          "Module 2 : Langage corporel, voix et gestion du trac",
          "Module 3 : Conception de diapositives d'impact et visualisation de données",
          "Module 4 : Simulation en direct et présentation devant jury"
        ]
      },
      {
        id: "humanitarian-worker-diploma",
        code: "HUM-DIP-142",
        track: "humanitarian",
        trackName: "Diplômes Humanitaires Complets",
        title: "Diplôme Professionnel de Travailleur Humanitaire : Des Principes à la Pratique",
        desc: "Diplôme intensif de 3 mois couvrant les normes internationales (Sphere, CHS, PSEA), la gestion de cycle de projet, le MEAL et la logistique humanitaire.",
        duration: "3 Mois • 142 Heures • 13 Modules",
        level: "Diplôme Professionnel Complet",
        instructorName: "Corps professoral d'experts internationaux (10+ formateurs)",
        fee: "Paiement échelonné durant la formation",
        format: "Mixte (Ateliers interactifs + Pratique de terrain)",
        accreditation: "Diplôme Agréé avec Cérémonie Officielle",
        syllabus: [
          "Filière 1 : Normes Humanitaires Internationales (Sphere, CHS, Ne Pas Nuire)",
          "Filière 2 : Gestion du Cycle de Projet Humanitaire et de Développement (PCM)",
          "Filière 3 : Suivi, Évaluation, Redevabilité et Apprentissage (MEAL)",
          "Filière 4 : Chaîne d'Approvisionnement, Logistique et Gestion des Camps"
        ]
      },
      {
        id: "shat-psea-expert",
        code: "PSEA-201",
        track: "protection",
        trackName: "Protection & Sauvegarde",
        title: "Programme Exécutif en Conseil de Protection et Sauvegarde (PSEA)",
        desc: "Formation des conseillers et points focaux pour concevoir les politiques institutionnelles de sauvegarde, évaluer les risques d'exploitation et d'abus sexuels et établir des mécanismes sûrs.",
        duration: "40 Heures de Formation • 5 Semaines",
        level: "Exécutif & Conseil",
        instructorName: "Mme Nada Al-Khalidi",
        fee: "200 $",
        format: "Virtuel Direct + Mentorat Pratique",
        accreditation: "Conforme aux normes inter-agences PSEA et Ne Pas Nuire",
        syllabus: [
          "Module 1 : Fondements juridiques et humanitaires de la sauvegarde",
          "Module 2 : Évaluation des risques institutionnels et rédaction de politiques",
          "Module 3 : Gestion des signalements, enquêtes et protection des survivants",
          "Module 4 : Plan d'action institutionnel et audit de conformité"
        ]
      },
      {
        id: "shat-oecd-evaluator",
        code: "OECD-301",
        track: "evaluation",
        trackName: "Évaluation Indépendante",
        title: "Spécialiste en Évaluation Externe : Les Six Critères OCDE CAD",
        desc: "Perfectionnement des évaluateurs indépendants pour apprécier la pertinence, la cohérence, l'efficacité, l'efficience, l'impact et la durabilité selon les normes UNEG.",
        duration: "50 Heures de Formation • 7 Semaines",
        level: "Niveau Expert",
        instructorName: "Dr. Osama Al-Mansour",
        fee: "240 $",
        format: "Hybride + Projet d'Évaluation Supervisé",
        accreditation: "Agréé selon les critères OCDE CAD & normes UNEG",
        syllabus: [
          "Module 1 : Les six critères OCDE CAD et questions évaluatives stratégiques",
          "Module 2 : Collecte de données, méthodes mixtes et échantillonnage de terrain",
          "Module 3 : Rédaction de rapports d'évaluation indépendants et leçons apprises",
          "Module 4 : Restitution des conclusions aux conseils de bailleurs"
        ]
      },
      {
        id: "shat-tot-professional",
        code: "TOT-401",
        track: "tot",
        trackName: "Formation de Formateurs",
        title: "Formation Professionnelle de Formateurs pour ONG Humanitaires (TOT)",
        desc: "Maîtrise de l'ingénierie pédagogique par compétences, de la facilitation expérientielle pour adultes (cycle de Kolb) et de l'évaluation des impacts (modèle de Kirkpatrick).",
        duration: "36 Heures de Formation • 4 Semaines",
        level: "Praticien Professionnel",
        instructorName: "M. Hossam Jadallah",
        fee: "180 $",
        format: "Ateliers Pratiques & Micro-enseignement",
        accreditation: "Facilitateur Professionnel Certifié SHAT",
        syllabus: [
          "Module 1 : Psychologie de l'apprentissage des adultes et cycles expérientiels",
          "Module 2 : Ingénierie des compétences et architecture pédagogique",
          "Module 3 : Dynamique de groupe, résolution de conflits et facilitation",
          "Module 4 : Projet final : Session de micro-enseignement filmée et évaluée"
        ]
      },
      {
        id: "shat-governance-strategy",
        code: "GOV-501",
        track: "governance",
        trackName: "Gouvernance & Leadership",
        title: "Gouvernance Stratégique et Leadership Institutionnel pour ONG",
        desc: "Développement des structures de gouvernance, surveillance des conseils d'administration, conduite du changement et tableaux de bord prospectifs pour organisations civiles.",
        duration: "32 Heures de Formation • 4 Semaines",
        level: "Exécutif & Direction",
        instructorName: "Dr. Khaled Al-Masri",
        fee: "190 $",
        format: "Séminaires Exécutifs & Études de Cas",
        accreditation: "Conforme aux Référentiels Internationaux de Gouvernance",
        syllabus: [
          "Module 1 : Principes de bonne gouvernance et dynamique des conseils",
          "Module 2 : Planification stratégique, cartographie des objectifs et risques",
          "Module 3 : Élaboration de tableaux de bord prospectifs et indicateurs",
          "Module 4 : Leadership transformationnel et conduite du changement"
        ]
      },
      {
        id: "shat-meal-systems",
        code: "MEAL-601",
        track: "evaluation",
        trackName: "Systèmes MEAL",
        title: "Conception et Gestion de Systèmes MEAL Intégrés",
        desc: "Mise en place de systèmes MEAL complets, cadres logiques, indicateurs numériques, mécanismes de redevabilité communautaire et capitalisation des connaissances.",
        duration: "40 Heures de Formation • 5 Semaines",
        level: "Avancé",
        instructorName: "Ing. Ahmed Ammar",
        fee: "210 $",
        format: "Pratique avec Outils Numériques et Cloud",
        accreditation: "Conforme aux Normes Internationales du Développement",
        syllabus: [
          "Module 1 : Cadres de résultats, cadres logiques et Théorie du Changement",
          "Module 2 : Plans de suivi des performances (PMP) et matrices d'indicateurs",
          "Module 3 : Redevabilité communautaire, circuits de réclamation et boucles de retour",
          "Module 4 : Tableaux de bord numériques et capitalisation des leçons apprises"
        ]
      }
    ],
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
    navAcademy: "Academia SHAT",
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
    navAcademy: "Accademia SHAT",
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

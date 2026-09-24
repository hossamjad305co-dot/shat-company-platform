// Shat Company Platform - Multilingual Localization Engine (AR, EN, FR, ES, IT)
// Notice: In strict compliance with guidelines, section titles contain NO numeric prefixes.

import { academyTranslations } from './academyTranslations.js';

export const translations = {
  ar: {
    dir: "rtl",
    langName: "العربية",
    flag: "🇸🇦",
    companyName: "شركة شات للتنمية والتطوير",
    companyShortName: "شات",
    companyTagline: "بناء القدرات • تعزيز المؤسسات • تطوير النتائج",
    companyMotto: "الإنسان • المهارات • غدٌ أكثر إشراقاً",
    pillTraining: "التدريب",
    pillConsulting: "الاستشارات",
    
    // Navigation
    nav: {
      academy: "🎓 مساحتي في المودل",
      s01: "اكتشف SHAT",
      s02: "قصتنا",
      s03: "ماذا نصنع؟",
      s04: "مساراتنا",
      s05: "تجاربنا",
      s06: "أثرنا",
      s07: "مساحة المعرفة",
      s08: "لنبني الأثر معًا",
      home: "اكتشف SHAT",
      about: "قصتنا",
      services: "ماذا نصنع؟",
      consulting: "مساراتنا",
      deliveryModel: "تجاربنا",
      approach: "أثرنا",
      references: "مساحة المعرفة",
      expertise: "مجالات الخبرة",
      valuePartnerships: "القيمة المضافة والشراكات",
      contact: "لنبني الأثر معًا",
      requestConsultation: "طلب استشارة / تدريب",
      explorePlatform: "استكشف الأقسام",
      readMore: "اقرأ المزيد",
      backHome: "العودة للرئيسية",
      viewDetails: "عرض التفاصيل",
      close: "إغلاق",
      allSections: "جميع الأقسام المؤسسية",
      downloadProfile: "تحميل بروفايل الشركة",
    },

    // Hero Section on Home
    hero: {
      badge: "شريك موثوق في التطوير المؤسسي وبناء القدرات",
      title: "بناء القدرات، تعزيز المؤسسات، وتطوير النتائج القابلة للقياس",
      description: "شركة شات للتنمية والتطوير متخصصة في التدريب، بناء القدرات، الاستشارات، والتطوير المؤسسي. نعمل مع المنظمات والأفراد لتحويل المعرفة إلى ممارسة مستدامة وأداء عالي الكفاءة.",
      ctaPrimary: "استكشف خدماتنا وبرامجنا",
      ctaSecondary: "تواصل معنا واطلب استشارة",
      stat1Number: "100%",
      stat1Label: "التزام بالمعايير الإنسانية والدولية",
      stat2Number: "8+",
      stat2Label: "مجالات خبرة قطاعية متخصصة",
      stat3Number: "6",
      stat3Label: "مراحل نموذج العمل الممنهج",
      stat4Number: "5",
      stat4Label: "لغات دولية معتمدة للتواصل والتدريب",
    },

    // Home Sections Highlights
    homeCards: {
      title: "الأقسام والمحاور المؤسسية",
      subtitle: "استكشف كل قسم من الأقسام التخصصية للشركة؛ حيث يضم كل قسم منظومة متكاملة من المجالات والخدمات الفرعية.",
    },

    // Section 1: About SHAT
    about: {
      title: "نبذة عن شات",
      subtitle: "التعريف بالشركة، الهوية، الرؤية، وفلسفة الربط بين المعرفة والأداء والنتائج",
      subsections: {
        whoWeAre: {
          title: "من نحن",
          desc: "شركة شات للتنمية والتطوير شركة متخصصة في التدريب وبناء القدرات والاستشارات والتطوير المؤسسي، تعمل مع الأفراد والمؤسسات والمنظمات على تطوير الكفاءات، وتعزيز الأنظمة المؤسسية، ورفع جودة البرامج والتدخلات وتحسين النتائج.",
          bullets: [
            "شريك استراتيجي للمؤسسات الإنسانية والتنموية والحكومية والخاصة.",
            "فريق من الخبراء والاستشاريين المعتمدين دولياً ذوي الخبرة الميدانية العميقة.",
            "اعتماد منهجيات تدريب واستشارة مرنة تتكيف مع السياقات المعقدة وبيئات العمل الحساسة."
          ]
        },
        methodology: {
          title: "منهجية تقديم الخدمات",
          desc: "تقدم شات خدماتها من خلال منهجيات قائمة على الأدلة، وتعلم قائم على الكفاءة، وتحليل مؤسسي، وتقييم منهجي، وتطوير مستمر، بالاستناد إلى المبادئ والمعايير الدولية والإنسانية ذات الصلة."
        },
        philosophy: {
          title: "فلسفة شات ونموذج الأثر",
          desc: "تقوم فلسفة شات على الربط بين المعرفة والقدرة والممارسة والنتائج؛ بحيث لا يقتصر التدخل على نقل المعرفة، بل يمتد إلى تطوير القدرات، وتحسين الممارسات، ودعم المؤسسات في تحويل المعرفة إلى أداء ونتائج قابلة للقياس.",
          flow: [
            { step: "المعرفة", detail: "اكتساب الأطر والمفاهيم والأدوات المنهجية المتقدمة" },
            { step: "القدرة", detail: "بناء الجاهزية العملية والمهارات التطبيقية للكوادر" },
            { step: "الممارسة", detail: "تطبيق المعايير والسياسات والإجراءات في الميدان" },
            { step: "الأداء", detail: "رفع الكفاءة التشغيلية وجودة التدخلات والخدمات" },
            { step: "النتائج", detail: "تحقيق أثر ملموس وقابل للقياس ومستدام للمستفيدين" }
          ]
        },
        identity: {
          title: "الهوية المؤسسية والثقافة",
          desc: "تتجسد هويتنا في الجمع بين الصرامة العلمية والأخلاقية الرفيعة، وتوفير بيئة تشاركية تلهم التغيير الإيجابي وترسخ ثقافة التحسين المستمر والمسؤولية المجتمعية."
        }
      }
    },

    // Section 2: What We Do
    services: {
      title: "ما الذي نقدمه",
      subtitle: "منظومة متكاملة من حلول التدريب وبناء القدرات والاستشارات والتطوير المؤسسي",
      subsections: {
        training: {
          title: "التدريب وبناء القدرات",
          summary: "تقدم شات برامج تدريبية متخصصة، تطبيقية، قائمة على الاحتياجات والكفاءات، مصممة لتعزيز المعرفة والمهارات والسلوكيات المهنية، وربط مخرجات التعلم بالأداء الفعلي.",
          pillars: [
            { name: "تحليل الاحتياجات التدريبية", detail: "دراسة معمقة للميدان وتحديد الفجوات المهنية بدقة قبل تصميم أي محتوى تدريبي." },
            { name: "التعلم القائم على الكفاءات", detail: "التركيز على الجدارات والقدرات الأدائية العملية وليس فقط تلقين المعارف النظرية." },
            { name: "تصميم البرامج والمناهج", detail: "بناء مناهج وحقائب تدريبية متوافقة مع أحدث المعايير البيداغوجية الدولية." },
            { name: "التعلم العملي والتجريبي", detail: "محاكاة الحالات الواقعية، ورش عمل تطبيقية، ودراسات حالة تفاعلية." },
            { name: "تدريب المدربين — TOT", detail: "تأهيل كوادر تدريبية قادرة على نقل المعرفة وبناء القدرات داخل مؤسساتها بكفاءة." },
            { name: "بناء القدرات المؤسسية", detail: "برامج متكاملة ترفع كفاءة الفرق وتدعم جاهزية المؤسسة لمواجهة التحديات." },
            { name: "قياس مخرجات التعلم", detail: "استخدام نماذج قياس علمية لتقييم الأثر المباشر والمهني للتدريب في بيئة العمل." }
          ]
        },
        consulting: {
          title: "الاستشارات والتطوير المؤسسي",
          summary: "تساعد شات المؤسسات والمنظمات على فهم الواقع المؤسسي، وتحديد الفجوات، وبناء الأنظمة، وتطوير السياسات، وتحسين الأداء، وتعزيز جودة البرامج والعمليات. يركز التدخل الاستشاري على الانتقال من التشخيص إلى التطوير، ومن التوصية إلى التطبيق، ومن التطبيق إلى التحسين المستمر.",
          pillars: [
            { name: "التقييم والتشخيص المؤسسي", detail: "فحص شامل للبنى الهيكلية، العمليات، والمناخ التنظيمي لتحديد نقاط القوة ومجالات التطوير." },
            { name: "التخطيط الاستراتيجي", detail: "صياغة الخطط الاستراتيجية، الأهداف المؤسسية، وخرائط الطريق القابلة للتنفيذ بمرونة." },
            { name: "التطوير التنظيمي", detail: "إعادة هندسة العمليات وتحديث الهياكل التنظيمية بما يواكب النمو وأهداف المؤسسة." },
            { name: "تطوير السياسات والإجراءات والأنظمة", detail: "صياغة الأدلة واللوائح التنظيمية وإجراءات التشغيل القياسية (SOPs)." },
            { name: "إدارة البرامج والمشاريع", detail: "تحسين حوكمة المشاريع التنموية والإنسانية وضمان كفاءة سلاسل الإمداد والتنفيذ." },
            { name: "تطوير الموارد البشرية وبناء القدرات", detail: "بناء نظم تقييم الأداء، سلم الكفاءات، واستراتيجيات استبقاء المواهب." },
            { name: "تحسين الأداء والجودة", detail: "تطبيق معايير الجودة العالمية وتبسيط الإجراءات لتقليل الهدر ورفع الإنتاجية." },
            { name: "تطوير أنظمة المتابعة والتقييم والتعلم", detail: "بناء منظومات MEL مؤتمتة ومؤشرات أداء دقيقة تدعم اتخاذ القرارات القائمة على الأدلة." }
          ]
        }
      }
    },

    // Section 3: Specialized Consulting & Evaluation
    consultingSec: {
      title: "التخصصات الاستشارية والتقييم",
      subtitle: "استشارات الحماية المتقدمة وصون السلامة وخدمات التقييم الخارجي المستقل",
      subsections: {
        protection: {
          title: "استشارات الحماية وصون السلامة",
          desc: "تدعم شات المؤسسات في تطوير أطر وسياسات وإجراءات الحماية، وتحليل مخاطر الحماية، وتعزيز الوقاية والاستجابة، وآليات الإبلاغ والإحالة الآمنة، وممارسات صون السلامة.",
          principles: "ويستند هذا المجال إلى مبادئ الحماية وحقوق الإنسان، ومبدأ Do No Harm، والمساءلة، والشمول، والسرية، والوقاية من الاستغلال والانتهاك الجنسيين (PSEA).",
          items: [
            "تصميم سياسات صون السلامة والحماية للطفل والفئات الأكثر ضعفاً.",
            "مصفوفات تقييم مخاطر الحماية وخطط التخفيف والوقاية المؤسسية.",
            "بناء قنوات الإبلاغ الآمنة ونظم معالجة الشكاوى المستقلة وسرية البيانات.",
            "برامج رفع الوعي وتدريب الكوادر على مدونات السلوك وأخلاقيات الحماية."
          ]
        },
        evaluation: {
          title: "التقييم الخارجي المستقل",
          desc: "تقدم شات خدمات التقييم الخارجي المستقل للبرامج والمشاريع والتدخلات، من خلال منهجيات كمية ونوعية قائمة على الأدلة. وتهدف عمليات التقييم إلى إنتاج أدلة موثوقة، واستخلاص الدروس، ودعم اتخاذ القرار، وتعزيز التعلم المؤسسي، وتحسين جودة التدخلات.",
          criteriaTitle: "معايير التقييم الدولية المعتمدة (OECD DAC Criteria):",
          criteria: [
            { name: "الملائمة (Relevance)", desc: "مدى توافق أهداف التدخل مع احتياجات وأولويات المستفيدين والسياق." },
            { name: "الاتساق (Coherence)", desc: "مدى تكامل التدخل مع السياسات والتدخلات الأخرى للمؤسسة والشركاء." },
            { name: "الفعالية (Effectiveness)", desc: "مدى تحقيق التدخل لأهدافه المخططة والنتائج المتوقعة بدقة." },
            { name: "الكفاءة (Efficiency)", desc: "الاستخدام الأمثل والرشيد للموارد والوقت لتحقيق أفضل النتائج." },
            { name: "الأثر (Impact)", desc: "التغييرات الإيجابية أو السلبية، المباشرة وغير المباشرة، طويلة المدى الناتجة عن التدخل." },
            { name: "الاستدامة (Sustainability)", desc: "استمرار الفوائد والمكتسبات بعد انتهاء الدعم الخارجي والتمويل المباشر." }
          ]
        }
      }
    },

    // Section 4: Delivery Model
    deliveryModel: {
      title: "نموذج العمل",
      subtitle: "منهجية التدخل المنظم من 6 مراحل للانتقال من الاحتياج إلى النتائج",
      slogan: "From Needs to Results — من الاحتياج إلى النتائج",
      intro: "تتبع شات نموذج عمل محكم يضمن الدقة والمواءمة السياقية وتوليد نتائج قابلة للاستدامة والقياس عبر كل مرحلة من مراحل المشروع.",
      stages: [
        {
          name: "فهم الاحتياج والسياق",
          en: "Understand",
          desc: "استيعاب السياق العام، تحليل أصحاب المصلحة، وفهم التحديات الفريدة والبيئة المحيطة بالمؤسسة."
        },
        {
          name: "التشخيص وتحليل الفجوات",
          en: "Assess",
          desc: "إجراء تقييم منهجي موضوعي لتحديد الفجوات بين الواقع الحالي والطموحات المستهدفة بدقة."
        },
        {
          name: "تصميم التدخل أو الحل",
          en: "Design",
          desc: "بناء وتطوير حلول استشارية أو برامج تدريبية مخصصة ومصممة خصيصاً لتلبية متطلبات العميل."
        },
        {
          name: "التنفيذ ونقل المعرفة",
          en: "Deliver",
          desc: "تطبيق الحلول وتنفيذ الورش والبرامج وفق خطط زمنية واضحة مع نقل حقيقي للمعرفة والمهارات."
        },
        {
          name: "قياس النتائج والأداء",
          en: "Measure",
          desc: "استخدام مؤشرات أداء دقيقة لقياس النتائج المحققة ومقارنتها بالأهداف الموضوعة للتحقق من الأثر."
        },
        {
          name: "التعلم والتحسين المستمر",
          en: "Learn & Improve",
          desc: "استخلاص الدروس المستفادة، تقديم التغذية الراجعة، وتحديث الممارسات لضمان الاستدامة طويلة المدى."
        }
      ]
    },

    // Section 5: Professional Approach
    approach: {
      title: "منهجيتنا المهنية",
      subtitle: "المبادئ والقيم المؤسسية التي تشكل أساس تصميم وتنفيذ جميع خدمات شات",
      intro: "تعتمد شات على مجموعة من المبادئ الراسخة التي تشكل أساس تصميم وتنفيذ خدماتها لضمان أعلى مستويات النزاهة والموثوقية والمهنية:",
      pillars: [
        {
          title: "الممارسة القائمة على الأدلة",
          en: "Evidence-Based Practice",
          desc: "الاعتماد على البيانات الموثوقة والبحوث الرصينة في توجيه التوصيات وبناء التدخلات."
        },
        {
          title: "التطوير القائم على الكفاءات",
          en: "Competency-Based Development",
          desc: "التركيز على تنمية المهارات التطبيقية والجدارات التي تصنع فرقاً حقيقياً في بيئة العمل."
        },
        {
          title: "النهج القائم على حقوق الإنسان",
          en: "Human Rights-Based Approach",
          desc: "احترام الكرامة الإنسانية وتعزيز الشفافية وحماية الحقوق الأصيلة لجميع الأفراد."
        },
        {
          title: "مبدأ عدم الإضرار",
          en: "Do No Harm",
          desc: "تحليل معمق للأثر لضمان عدم تسبب التدخلات بأي ضرر غير مقصود للمجتمعات أو المؤسسات."
        },
        {
          title: "المساءلة",
          en: "Accountability",
          desc: "الالتزام بأعلى معايير الشفافية والمسؤولية أمام الشركاء والعملاء والمستفيدين."
        },
        {
          title: "الشمول وعدم التمييز",
          en: "Inclusion & Non-Discrimination",
          desc: "إتاحة الفرص المتكافئة وضمان مشاركة الجميع بإنصاف بغض النظر عن أي اعتبارات."
        },
        {
          title: "الحماية وصون السلامة",
          en: "Safeguarding & Protection",
          desc: "توفير بيئات آمنة تماماً للمشاركين والفرق والمستفيدين خالية من أي استغلال أو إساءة."
        },
        {
          title: "الممارسة الأخلاقية",
          en: "Ethical Practice",
          desc: "التمسك الصارم بأخلاقيات المهنة، الاستقلالية التامة، والحياد في كافة أعمالنا."
        },
        {
          title: "السرية وحماية البيانات",
          en: "Confidentiality & Data Protection",
          desc: "حماية البيانات الحساسة والمعلومات المؤسسية وفق أشد البروتوكولات الأمنية العالمية."
        },
        {
          title: "الجودة والتحسين المستمر",
          en: "Quality & Continuous Improvement",
          desc: "السعي الدائم لتطوير الأداء وابتكار حلول تواكب أفضل الممارسات الدولية المتجددة."
        }
      ]
    },

    // Section 6: International & Humanitarian References
    references: {
      title: "المرجعيات والمعايير الدولية",
      subtitle: "أهم الأطر والمواثيق العالمية التي تسترشد بها شات في جميع مهامها وتدخلاتها",
      intro: "تسترشد شات، بحسب طبيعة ونطاق كل مهمة، بالمرجعيات الدولية والإنسانية المناسبة، ومن أبرزها:",
      standards: [
        {
          code: "CHS",
          title: "المعيار الإنساني الأساسي للجودة والمساءلة",
          en: "Core Humanitarian Standard",
          desc: "إطار عالمي يحدد التزامات المنظمات الإنسانية لتقديم استجابات عالية الجودة تخضع للمساءلة."
        },
        {
          code: "SPHERE",
          title: "المعايير الإنسانية الدنيا — دليل إسفير",
          en: "Sphere Handbook",
          desc: "ميثاق العمل الإنساني والمعايير الدنيا المشتركة في مجالات الاستجابة المنقذة للحياة وصون الكرامة."
        },
        {
          code: "OECD DAC",
          title: "معايير لجنة المساعدات الإنمائية للتقييم",
          en: "OECD DAC Evaluation Criteria",
          desc: "المعايير المعتمدة دولياً لتقييم المساعدات والبرامج التنموية والإنسانية (الملائمة، الفعالية، الأثر...)."
        },
        {
          code: "UNEG",
          title: "أطر ومبادئ التقييم — فريق الأمم المتحدة للتقييم",
          en: "UN Evaluation Group",
          desc: "المعايير الأخلاقية والمهنية الموحدة لضمان نزاهة وموضوعية التقييمات في منظومة الأمم المتحدة."
        },
        {
          code: "HRBA",
          title: "النهج القائم على حقوق الإنسان",
          en: "Human Rights-Based Approach",
          desc: "إدماج مبادئ حقوق الإنسان الدولية كجوهر للتخطيط، التصميم، والتنفيذ في العمل التنموي."
        },
        {
          code: "AAP",
          title: "المساءلة تجاه الأشخاص المتأثرين",
          en: "Accountability to Affected People",
          desc: "آليات ضمان مشاركة المجتمعات المتأثرة والاستماع لأصواتهم وتضمين ملاحظاتهم في القرارات."
        },
        {
          code: "Protection",
          title: "إدماج الحماية عبر القطاعات",
          en: "Protection Mainstreaming",
          desc: "دمج مبادئ السلامة والكرامة والوصول ذو المعنى وعدم التمييز في شتى الخدمات والقطاعات."
        },
        {
          code: "PSEA",
          title: "أطر الحماية من الاستغلال والانتهاك الجنسيين",
          en: "PSEA Frameworks",
          desc: "سياسات صارمة لمنع ومعالجة أي شكل من أشكال الاستغلال وسوء السلوك الجنسي في بيئة العمل."
        },
        {
          code: "CRC",
          title: "اتفاقية حقوق الطفل",
          en: "Convention on the Rights of the Child",
          desc: "المعاهدة الدولية الحامية لحقوق الطفل النمائية والتعليمية وحمايته من كافة أشكال الإساءة."
        },
        {
          code: "CEDAW",
          title: "اتفاقية القضاء على التمييز ضد المرأة",
          en: "CEDAW Convention",
          desc: "الأطر الدولية الضامنة لتمكين المرأة وتحقيق المساواة وتكافؤ الفرص في الحياة العامة والمهنية."
        }
      ]
    },

    // Section 7: Areas of Expertise
    expertise: {
      title: "مجالات الخبرة",
      subtitle: "قطاعات العمل التخصصية التي تقدم فيها شات خدمات التدريب والاستشارات والتقييم",
      sectors: [
        {
          name: "العمل الإنساني",
          en: "Humanitarian Action",
          icon: "heart-handshake",
          desc: "إدارة الأزمات، التنسيق الميداني، إدارة المخيمات، والاستجابة للطوارئ وفق معايير الجودة الدولية."
        },
        {
          name: "الحماية وصون السلامة",
          en: "Protection & Safeguarding",
          icon: "shield-check",
          desc: "سياسات حماية الأطفال، إدارة الحالات، الوقاية من العنف القائم على النوع الاجتماعي، وPSEA."
        },
        {
          name: "تنمية وتمكين المرأة والطفل",
          en: "Women & Child Development",
          icon: "sparkles",
          desc: "برامج التمكين الاقتصادي والاجتماعي، بناء المهارات الحياتية، ورعاية وتنمية الطفولة المبكرة."
        },
        {
          name: "تنمية وتمكين الشباب",
          en: "Youth Development & Empowerment",
          icon: "users",
          desc: "ريادة الأعمال المجتمعية، القيادة الشبابية، التأهيل لسوق العمل، ومبادرات المواطنة الفاعلة."
        },
        {
          name: "التعليم وتطوير المعلمين",
          en: "Education & Teacher Development",
          icon: "graduation-cap",
          desc: "تطوير المناهج، أساليب التدريس النشط، التعليم في حالات الطوارئ، والتأهيل البيداغوجي للمعلمين."
        },
        {
          name: "الإعلام والاتصال",
          en: "Media & Communication",
          icon: "radio",
          desc: "الاتصال الاستراتيجي، حملات التوعية والمناصرة، إدارة السمعة المؤسسية، وصناعة المحتوى الهادف."
        },
        {
          name: "التطوير المؤسسي",
          en: "Institutional Development",
          icon: "building-2",
          desc: "الحوكمة، السياسات الداخلية، إدارة التغيير، والتحول الرقمي لرفع الكفاءة والاستدامة المؤسسية."
        },
        {
          name: "المتابعة والتقييم والتعلم",
          en: "Monitoring, Evaluation & Learning",
          icon: "line-chart",
          desc: "تصميم أطر MEL، مؤشرات الأداء الذكية، خطط جمع البيانات الميدانية، والتقييمات المستقلة للأثر."
        }
      ]
    },

    // Section 8: Value Proposition & Partnerships
    valuePartnerships: {
      title: "القيمة المضافة والشراكات",
      subtitle: "ما يميز شات كشريك تنموي استراتيجي والتزامنا الثابت بالنتائج والأداء",
      valuePropsTitle: "القيمة التي نقدمها",
      values: [
        {
          title: "القدرات",
          en: "Capacity",
          slogan: "نبني المعرفة والكفاءات.",
          desc: "تطوير رأس المال البشري وتحويل المعارف إلى قدرات تشغيلية مستدامة."
        },
        {
          title: "الأنظمة",
          en: "Systems",
          slogan: "نطور الأنظمة والممارسات المؤسسية.",
          desc: "بناء سياسات وإجراءات متماسكة تضمن الاستمرارية والامتثال وتفادي المخاطر."
        },
        {
          title: "الأدلة",
          en: "Evidence",
          slogan: "نحوّل البيانات إلى معرفة قابلة للاستخدام.",
          desc: "الاستناد إلى التحليل الميداني العميق لصناعة قرارات استراتيجية صائبة."
        },
        {
          title: "الأداء",
          en: "Performance",
          slogan: "نربط التطوير بالأداء الفعلي.",
          desc: "تحسين جودة المخرجات اليومية وكفاءة العمليات الإدارية والميدانية."
        },
        {
          title: "النتائج",
          en: "Results",
          slogan: "نركز على النتائج والأثر والتحسين المستمر.",
          desc: "تحقيق تغيير ملموس وقابل للقياس ينعكس مباشرة على نجاح المؤسسة والمستفيدين."
        }
      ],
      positioningTitle: "التوجه والتموضع المؤسسي",
      positioningLead: "شات ليست مجرد جهة تدريب؛ بل شريك في بناء القدرات والتطوير المؤسسي.",
      positioningBody: "نؤمن بأن التدريب الأكثر قيمة هو الذي يقود إلى قدرة قابلة للتطبيق، وأن الاستشارة الفاعلة هي التي تنتقل من التحليل إلى الحل ومن الحل إلى التطوير، وأن التقييم الفعّال هو الذي يحول الأدلة والنتائج إلى تعلم وقرارات وتحسينات عملية.",
      commitmentTitle: "التزامنا المؤسسي",
      commitmentBody: "نسعى إلى تقديم خدمات ذات جودة، قائمة على الأدلة، ومبنية على منهجيات واضحة، مع الحفاظ على المهنية والاستقلالية والسرية، والتركيز على بناء القدرات وتعزيز جودة الأداء وتحقيق نتائج قابلة للقياس.",
      partnerCtaTitle: "جاهزون للتعاون وبناء شراكة تنموية مستدامة",
      partnerCtaDesc: "تواصل مع فريق خبراء شات اليوم لمناقشة احتياجات مؤسستك وتصميم الحل المناسب."
    },

    // Contact & Request Form
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للإجابة على استفساراتكم وبناء شراكات مثمرة",
      infoTitle: "بيانات التواصل المؤسسية",
      emailLabel: "البريد الإلكتروني",
      emailValue: "info@shatgrowth.com",
      phoneLabel: "الهاتف والتواصل المباشر",
      phoneValue: "+966 50 000 0000",
      websiteLabel: "الموقع الإلكتروني",
      websiteValue: "www.shatgrowth.com",
      addressLabel: "المقر الرئيسي",
      addressValue: "المملكة العربية السعودية / مكاتب إقليمية دولية",
      formTitle: "طلب استشارة أو برنامج تدريبي",
      formSubtitle: "يرجى تعبئة النموذج أدناه وسيقوم فريقنا بالتواصل معكم خلال 24 ساعة.",
      nameLabel: "الاسم الكامل",
      emailInputLabel: "البريد الإلكتروني المهني",
      orgLabel: "اسم المؤسسة / المنظمة",
      phoneInputLabel: "رقم الهاتف / الواتساب",
      serviceTypeLabel: "نوع الخدمة المطلوبة",
      serviceOptions: [
        "برامج التدريب وبناء القدرات",
        "الاستشارات والتطوير المؤسسي",
        "استشارات الحماية وصون السلامة",
        "التقييم الخارجي المستقل للمشاريع",
        "بناء أنظمة المتابعة والتقييم (MEL)",
        "شراكة استراتيجية عامة"
      ],
      messageLabel: "تفاصيل الطلب أو نطاق العمل",
      submitBtn: "إرسال طلب الاستشارة",
      successMsg: "شكراً لتواصلكم معنا! تم استلام طلبكم بنجاح وسيتواصل معكم فريق شات قريباً."
    },

    // Footer
    
    academy: {
      "navAcademy": "🎓 الأكاديمية",
      "badge": "أكاديمية شات للقيادة والتطوير المؤسسي",
      "title": "منصة بناء القدرات وإعداد الخبراء والممارسين",
      "subtitle": "برامج تدريبية وتطبيقية متقدمة للمنظمات والكوادر الإنسانية والتنموية وفق أعلى المعايير والمواثيق العالمية (CHS, Sphere, OECD DAC, PSEA).",
      "searchPlaceholder": "ابحث في البرامج والدبلومات التخصصية بالاسم أو المحور...",
      "allTracks": "جميع المسارات الأكاديمية",
      "tracks": [
            {
                  "id": "all",
                  "name": "جميع المسارات الأكاديمية"
            },
            {
                  "id": "humanitarian",
                  "name": "القطاع الإنساني والمعايير (CHS & Sphere)"
            },
            {
                  "id": "protection",
                  "name": "الحماية وصون السلامة (PSEA & Do No Harm)"
            },
            {
                  "id": "evaluation",
                  "name": "التقييم المستقل والمتابعة (OECD DAC & MEL)"
            },
            {
                  "id": "governance",
                  "name": "الحوكمة والقيادة والتخطيط الاستراتيجي"
            },
            {
                  "id": "tot",
                  "name": "إعداد وتأهيل المدربين المحترفين (TOT)"
            },
            {
                  "id": "empowerment",
                  "name": "تمكين المرأة والشباب والمجتمع"
            }
      ],
      "stats": {
            "graduates": "+1,450",
            "graduatesLabel": "خريج وخبير معتمد",
            "programs": "24+",
            "programsLabel": "برنامج تدريبي وتطبيقي",
            "partners": "50+",
            "partnersLabel": "منظمة ومؤسسة شريكة",
            "satisfaction": "99.2%",
            "satisfactionLabel": "نسبة الرضا وجودة الأثر"
      },
      "courses": [
            {
                  "id": "shat-chs-master",
                  "track": "humanitarian",
                  "trackName": "القطاع الإنساني",
                  "title": "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة التنموية",
                  "desc": "برنامج متقدم يؤهل ممارسي العمل الإنساني لتطبيق الالتزامات التسعة للمعيار الإنساني الأساسي وضمان جودة المساءلة للجهات المتضررة (AAP).",
                  "duration": "45 ساعة تدريبية • 6 أسابيع",
                  "level": "متقدم (Advanced)",
                  "format": "هجين (تفاعلي + دراسات حالة عملية)",
                  "accreditation": "معتمد وفق CHS & Sphere",
                  "syllabus": [
                        "الوحدة الأولى: الالتزامات التسعة للمعيار الإنساني الأساسي (CHS)",
                        "الوحدة الثانية: أدوات المساءلة للمتأثرين بالأزمات (AAP)",
                        "الوحدة الثالثة: تقييم الاحتياجات الإنسانية وتصميم التدخلات",
                        "الوحدة الرابعة: دراسة حالة واقعية وتطبيق مصفوفة الجودة"
                  ]
            },
            {
                  "id": "shat-psea-expert",
                  "track": "protection",
                  "trackName": "الحماية وصون السلامة",
                  "title": "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA & Safeguarding)",
                  "desc": "تأهيل المستشارين ومسؤولي الحماية لبناء سياسات الصون المؤسسي، تحليل مخاطر الاستغلال والانتهاك الجنسيين، وتأسيس آليات الإحالة والشكاوى الآمنة.",
                  "duration": "40 ساعة تدريبية • 5 أسابيع",
                  "level": "تنفيذي واستشاري (Executive)",
                  "format": "افتراضي مباشر + تدريب عملي موجه",
                  "accreditation": "معتمد وفق أطر PSEA الدولية وDo No Harm",
                  "syllabus": [
                        "الوحدة الأولى: المفاهيم القانونية والإنسانية للحماية وصون السلامة",
                        "الوحدة الثانية: آليات تقييم المخاطر وتصميم سياسات Safeguarding",
                        "الوحدة الثالثة: إدارة الإبلاغ، التحقيقات، وحماية الضحايا وسرية البيانات",
                        "الوحدة الرابعة: خطة عمل مؤسسية ومراجعة الامتثال"
                  ]
            },
            {
                  "id": "shat-oecd-evaluator",
                  "track": "evaluation",
                  "trackName": "التقييم المستقل والمتابعة",
                  "title": "إعداد مقيمي المشاريع والبرامج وفق معايير OECD DAC الستة",
                  "desc": "تطوير قدرات المقيمين المستقلين في تقييم الملائمة، الاتساق، الفعالية، الكفاءة، الأثر، والاستدامة مع إتقان مناهج البحث الكمي والنوعي وأطر UNEG.",
                  "duration": "50 ساعة تدريبية • 7 أسابيع",
                  "level": "خبير استشاري (Expert Level)",
                  "format": "حضوري وهجين + مشروع تقييم ميداني حقيقي",
                  "accreditation": "معتمد وفق OECD DAC Criteria & UNEG",
                  "syllabus": [
                        "الوحدة الأولى: معايير OECD DAC الستة وأسئلة التقييم الاستراتيجية",
                        "الوحدة الثانية: منهجيات جمع الأدلة، العينات، والتحليل المختلط",
                        "الوحدة الثالثة: بناء تقارير التقييم المستقلة واستخلاص التوصيات",
                        "الوحدة الرابعة: مناقشة تقرير تقييم حقيقي وعرض النتائج للمانحين"
                  ]
            },
            {
                  "id": "shat-tot-professional",
                  "track": "tot",
                  "trackName": "إعداد المدربين",
                  "title": "تأهيل وإعداد المدربين المحترفين للمؤسسات الإنسانية والتنموية (TOT)",
                  "desc": "إتقان تصميم الحقائب التدريبية القائمة على الكفايات، تيسير التعلم التجريبي للبالغين، وتقييم مخرجات التعلم وفق نموذج كيركباتريك وتطبيقات الذكاء الاصطناعي في التعليم.",
                  "duration": "36 ساعة تدريبية • 4 أسابيع",
                  "level": "ممارس محترف (Professional)",
                  "format": "ورش عمل تفاعلية ومحاكاة حية",
                  "accreditation": "شهادة مدرب معتمد من شات",
                  "syllabus": [
                        "الوحدة الأولى: سيكولوجية تعليم الكبار والتعلم التجريبي (Kolb's Cycle)",
                        "الوحدة الثانية: تحليل الاحتياجات التدريبية وتصميم الحقائب القائمة على الكفايات",
                        "الوحدة الثالثة: مهارات الإلقاء والتيسير وإدارة مجموعات العمل",
                        "الوحدة الرابعة: مشروع التخرج: تقديم جلسة تدريبية وتقييم الأداء بالصوت والصورة"
                  ]
            },
            {
                  "id": "shat-governance-strategy",
                  "track": "governance",
                  "trackName": "الحوكمة والقيادة",
                  "title": "الحوكمة والقيادة الاستراتيجية لمنظمات المجتمع المدني والمؤسسات التنموية",
                  "desc": "بناء الرؤى الاستراتيجية، هياكل الحوكمة الرشيدة، إدارة التغيير المؤسسي، ومؤشرات الأداء الرئيسية (KPIs) لتعزيز مرونة واستدامة المنظمات.",
                  "duration": "32 ساعة تدريبية • 4 أسابيع",
                  "level": "قيادي وتنفيذي (Leadership)",
                  "format": "حلقات نقاش تنفيذية ودراسات قيادية",
                  "accreditation": "معتمد وفق معايير الحوكمة المؤسسية الدولية",
                  "syllabus": [
                        "الوحدة الأولى: أطر ومبادئ الحوكمة الرشيدة وإدارة مجالس الإدارة",
                        "الوحدة الثانية: صياغة الخطط الاستراتيجية وخرائط الأهداف والمخاطر",
                        "الوحدة الثالثة: تطوير بطاقات الأداء المتوازن (Balanced Scorecards)",
                        "الوحدة الرابعة: قيادة التغيير والتحول الرقمي المستدام"
                  ]
            },
            {
                  "id": "shat-meal-systems",
                  "track": "evaluation",
                  "trackName": "المتابعة والتقييم MEAL",
                  "title": "تصميم وإدارة منظومة الرصد والمتابعة والمساءلة والتعلم (MEAL Systems)",
                  "desc": "تأسيس نظم MEAL متكاملة، مؤشرات الأداء، خطط الرصد الرقمية، آليات المساءلة المجتمعية، واستراتيجيات إدارة المعرفة المؤسسية.",
                  "duration": "40 ساعة تدريبية • 5 أسابيع",
                  "level": "متقدم (Advanced)",
                  "format": "تطبيقي مع برمجيات وأدوات رقمية",
                  "accreditation": "معتمد وفق المعايير الإنسانية الدولية",
                  "syllabus": [
                        "الوحدة الأولى: إطار المنطق التدخلي ونظرية التغيير (Theory of Change)",
                        "الوحدة الثانية: بناء خطط الرصد (PMP) ومصفوفة المؤشرات الذكية",
                        "الوحدة الثالثة: المساءلة والتعلم المستمر (Adaptive Management)",
                        "الوحدة الرابعة: لوحات القياس الرقمية وتوثيق الدروس المستفادة"
                  ]
            }
      ],
      "verify": {
            "title": "بوابة التحقق من الشهادات والاعتمادات الرسمية",
            "subtitle": "تتيح لك هذه المنصة التحقق الفوري من صحة ومصداقية أي شهادة صادرة عن أكاديمية شركة شات للتنمية والتطوير.",
            "placeholder": "أدخل رقم الشهادة (مثال: SHAT-2026-CHS-01)",
            "btn": "التحقق من الوثيقة",
            "testingTip": "نماذج شهادات معتمدة للتجربة: SHAT-2026-CHS-01 أو SHAT-2026-PSEA-02 أو SHAT-2026-OECD-03",
            "verifiedTitle": "وثيقة معتمدة ومسجلة رسمياً",
            "studentLabel": "اسم المستفيد / الخريج:",
            "courseLabel": "البرنامج الأكاديمي:",
            "dateLabel": "تاريخ الإصدار:",
            "gradeLabel": "التقدير والتقييم:",
            "accreditationLabel": "الاعتماد الدولي:",
            "statusActive": "سارية ومعتمدة دولياً",
            "notFound": "عذراً، لم يتم العثور على شهادة مسجلة بهذا الرقم. يرجى التأكد من كتابة الرقم بدقة ومراجعة إدارة الأكاديمية."
      },
      "modal": {
            "enrollTitle": "التسجيل في البرنامج الأكاديمي",
            "syllabusTitle": "المنهج والوحدات التدريبية",
            "fullName": "الاسم الكامل للمشارك",
            "email": "البريد الإلكتروني المهني",
            "phone": "رقم الهاتف / الواتساب",
            "org": "جهة العمل / المنظمة الحالية",
            "background": "الخلفية المهنية والهدف من الالتحاق",
            "submitEnroll": "تأكيد طلب الالتحاق",
            "successMsg": "تم تقديم طلب الالتحاق بنجاح! سيتم التواصل معك من قبل فريق القبول والتسجيل بالأكاديمية لإتمام إجراءات الانضمام."
      }
},

    academy: {
      "navAcademy": "🎓 Academia SHAT",
      "badge": "Academia SHAT para el Liderazgo y Desarrollo Institucional",
      "title": "Plataforma de Fortalecimiento de Capacidades y Excelencia",
      "subtitle": "Programas avanzados para profesionales humanitarios y de desarrollo, alineados con normas globales (CHS, Sphere, OCDE DAC, PSEA).",
      "searchPlaceholder": "Buscar programas y diplomados...",
      "allTracks": "Todos los itinerarios",
      "tracks": [
            {
                  "id": "all",
                  "name": "All Academic Tracks"
            },
            {
                  "id": "humanitarian",
                  "name": "Humanitarian & Global Standards (CHS & Sphere)"
            },
            {
                  "id": "protection",
                  "name": "Protection & Safeguarding (PSEA & Do No Harm)"
            },
            {
                  "id": "evaluation",
                  "name": "Independent Evaluation & MEL (OECD DAC)"
            },
            {
                  "id": "governance",
                  "name": "Governance & Strategic Leadership"
            },
            {
                  "id": "tot",
                  "name": "Training of Trainers (TOT Professional)"
            },
            {
                  "id": "empowerment",
                  "name": "Women & Youth Empowerment"
            }
      ],
      "stats": {
            "graduates": "+1,450",
            "graduatesLabel": "Certified Graduates & Experts",
            "programs": "24+",
            "programsLabel": "Applied Professional Programs",
            "partners": "50+",
            "partnersLabel": "Partner Institutions & NGOs",
            "satisfaction": "99.2%",
            "satisfactionLabel": "Participant Satisfaction & Impact"
      },
      "courses": [
            {
                  "id": "shat-chs-master",
                  "track": "humanitarian",
                  "trackName": "Humanitarian Sector",
                  "title": "Core Humanitarian Standard (CHS) & Development Response Diploma",
                  "desc": "Advanced program qualifying humanitarian practitioners to implement the Nine Commitments of the CHS and enforce rigorous Accountability to Affected People (AAP).",
                  "duration": "45 Training Hours • 6 Weeks",
                  "level": "Advanced",
                  "format": "Hybrid (Interactive + Case Studies)",
                  "accreditation": "Accredited according to CHS & Sphere",
                  "syllabus": [
                        "Module 1: The Nine Commitments of the Core Humanitarian Standard",
                        "Module 2: Practical AAP Tools and Community Feedback Mechanisms",
                        "Module 3: Needs Assessment and Principled Intervention Design",
                        "Module 4: Real-world Case Simulation and Quality Matrix Audit"
                  ]
            },
            {
                  "id": "shat-psea-expert",
                  "track": "protection",
                  "trackName": "Protection & Safeguarding",
                  "title": "Executive Program in Protection & Safeguarding Consulting (PSEA)",
                  "desc": "Equipping advisors and focal points to build institutional safeguarding policies, conduct sexual exploitation and abuse risk assessments, and establish secure referral pathways.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Executive & Advisory",
                  "format": "Live Virtual + Practical Mentoring",
                  "accreditation": "Aligned with Inter-Agency PSEA Standards & Do No Harm",
                  "syllabus": [
                        "Module 1: Legal and Humanitarian Foundations of Safeguarding",
                        "Module 2: Risk Assessment Architectures and Policy Formulation",
                        "Module 3: Incident Management, Investigation Protocols, and Survivor Protection",
                        "Module 4: Institutional Action Planning and Compliance Auditing"
                  ]
            },
            {
                  "id": "shat-oecd-evaluator",
                  "track": "evaluation",
                  "trackName": "Independent Evaluation",
                  "title": "External Evaluation Specialist: OECD DAC Six Criteria",
                  "desc": "Developing independent evaluators proficient in assessing Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability using mixed-method research and UNEG norms.",
                  "duration": "50 Training Hours • 7 Weeks",
                  "level": "Expert Level",
                  "format": "Hybrid + Supervised Field Evaluation Project",
                  "accreditation": "Accredited under OECD DAC Criteria & UNEG Standards",
                  "syllabus": [
                        "Module 1: The Six OECD DAC Criteria and Strategic Evaluation Questions",
                        "Module 2: Evidence Synthesis, Mixed Methods, and Field Sampling",
                        "Module 3: Formulating Independent Evaluation Reports & Actionable Lessons",
                        "Module 4: Presenting Findings to Donor Boards & Stakeholders"
                  ]
            },
            {
                  "id": "shat-tot-professional",
                  "track": "tot",
                  "trackName": "Training of Trainers",
                  "title": "Professional Training of Trainers for Humanitarian & Development Orgs (TOT)",
                  "desc": "Master competency-based curriculum design, adult experiential learning facilitation (Kolb's cycle), Kirkpatrick outcome evaluation, and AI-assisted educational frameworks.",
                  "duration": "36 Training Hours • 4 Weeks",
                  "level": "Professional Practitioner",
                  "format": "Interactive Studio Workshops & Micro-teaching",
                  "accreditation": "SHAT Certified Professional Facilitator",
                  "syllabus": [
                        "Module 1: Adult Learning Psychology and Experiential Cycles",
                        "Module 2: Competency-based Curriculum and Instructional Architecture",
                        "Module 3: Facilitation Dynamics, Conflict Resolution & Group Management",
                        "Module 4: Capstone: Micro-teaching Delivery with Video Analysis & Feedback"
                  ]
            },
            {
                  "id": "shat-governance-strategy",
                  "track": "governance",
                  "trackName": "Governance & Leadership",
                  "title": "Strategic Governance & Institutional Leadership for Non-Profit Organizations",
                  "desc": "Developing executive governance structures, robust board oversight, organizational change management, and balanced scorecards for resilient civil society entities.",
                  "duration": "32 Training Hours • 4 Weeks",
                  "level": "Executive & Leadership",
                  "format": "Executive Seminars & Case Labs",
                  "accreditation": "Conforms to International Governance Frameworks",
                  "syllabus": [
                        "Module 1: Good Governance Norms, Board Dynamics & Fiduciary Accountability",
                        "Module 2: Strategic Roadmapping, Objective Cascades & Risk Matrices",
                        "Module 3: Designing Balanced Scorecards and Operational KPIs",
                        "Module 4: Transformational Leadership and Change Management"
                  ]
            },
            {
                  "id": "shat-meal-systems",
                  "track": "evaluation",
                  "trackName": "MEAL Systems",
                  "title": "Designing & Managing Integrated MEAL Systems (Monitoring, Evaluation, Accountability & Learning)",
                  "desc": "Architecting end-to-end MEAL architectures, result frameworks, digital indicators, community accountability loops, and organizational knowledge harvesting.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Advanced",
                  "format": "Hands-on with Industry Cloud Toolkits",
                  "accreditation": "Conforms to International Development Standards",
                  "syllabus": [
                        "Module 1: Results Frameworks, LogFrames, and Theory of Change",
                        "Module 2: Performance Monitoring Plans (PMP) & Indicator Tracking",
                        "Module 3: Community Accountability, Complaint Channels & Feedback Loops",
                        "Module 4: Digital Dashboards and Knowledge Harvesting Methodologies"
                  ]
            }
      ],
      "verify": {
            "title": "Official Certificate Verification Portal",
            "subtitle": "Instant real-time verification of credentials, diplomas, and accreditations issued by SHAT Academy.",
            "placeholder": "Enter Certificate Code (e.g., SHAT-2026-CHS-01)",
            "btn": "Verify Credential",
            "testingTip": "Sample verified credentials to test: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, or SHAT-2026-OECD-03",
            "verifiedTitle": "Officially Verified & Authenticated Credential",
            "studentLabel": "Awardee / Graduate Name:",
            "courseLabel": "Academic Program:",
            "dateLabel": "Issuance Date:",
            "gradeLabel": "Evaluation & Distinction:",
            "accreditationLabel": "International Accreditation:",
            "statusActive": "Active & Internationally Recognized",
            "notFound": "No certified record was found for this code. Please verify the code and contact SHAT Academy registry."
      },
      "modal": {
            "enrollTitle": "Inscripción en el Programa Académico",
            "syllabusTitle": "Plan de Estudios y Módulos",
            "fullName": "Nombre y Apellidos",
            "email": "Correo Profesional",
            "phone": "Teléfono / WhatsApp",
            "org": "Organización / Institución",
            "background": "Experiencia y Objetivos",
            "submitEnroll": "Confirmar Inscripción",
            "successMsg": "¡Solicitud de inscripción recibida con éxito! Nuestro departamento de admisiones se comunicará con usted en 24 horas."
      }
},
footer: {
      aboutText: "شركة شات للتنمية والتطوير — شركة متخصصة في التدريب، بناء القدرات، الاستشارات والتطوير المؤسسي وفق المعايير الدولية والإنسانية.",
      quickLinks: "روابط سريعة",
      legalNotice: "جميع الحقوق محفوظة © 2026 شركة شات للتنمية والتطوير (SHAT Development & Growth).",
      privacyPledge: "ملتزمون بأعلى معايير السرية، النزاهة، وحماية البيانات المؤسسية."
    }
  },

  en: {
    dir: "ltr",
    langName: "English",
    flag: "🇬🇧",
    companyName: "SHAT Development & Growth",
    companyShortName: "SHAT",
    companyTagline: "Building Capacity • Strengthening Institutions • Advancing Results",
    companyMotto: "PEOPLE • SKILLS • A BRIGHTER TOMORROW",
    pillTraining: "TRAINING",
    pillConsulting: "CONSULTING",

    nav: {
      academy: "🎓 My Moodle Portal",
      s01: "Discover SHAT",
      s02: "Our Story",
      s03: "What We Make",
      s04: "Our Tracks",
      s05: "Our Experiences",
      s06: "Our Impact",
      s07: "Knowledge Hub",
      s08: "Building Impact Together",
      home: "Discover SHAT",
      about: "Our Story",
      services: "What We Make",
      consulting: "Our Tracks",
      deliveryModel: "Our Experiences",
      approach: "Our Impact",
      references: "Knowledge Hub",
      expertise: "Areas of Expertise",
      valuePartnerships: "Value Proposition & Partnerships",
      contact: "Building Impact Together",
      requestConsultation: "Request Consultation / Training",
      explorePlatform: "Explore Sections",
      readMore: "Read More",
      backHome: "Back to Home",
      viewDetails: "View Details",
      close: "Close",
      allSections: "All Institutional Sections",
      downloadProfile: "Download Company Profile",
    },

    hero: {
      badge: "Trusted Partner in Institutional Development & Capacity Strengthening",
      title: "Building Capacity, Strengthening Institutions, Advancing Measurable Results",
      description: "SHAT Development & Growth is a specialized firm in training, capacity development, consulting, and institutional development, working with individuals, institutions, and organizations to strengthen competencies, improve institutional systems, enhance programme quality, and advance results.",
      ctaPrimary: "Explore Services & Solutions",
      ctaSecondary: "Get in Touch & Request Consultation",
      stat1Number: "100%",
      stat1Label: "Adherence to International & Humanitarian Standards",
      stat2Number: "8+",
      stat2Label: "Specialized Domain Verticals",
      stat3Number: "6",
      stat3Label: "Systematic Delivery Stages",
      stat4Number: "5",
      stat4Label: "International Languages Supported",
    },

    homeCards: {
      title: "Institutional Sections & Domains",
      subtitle: "Explore each dedicated section of the platform; each section contains its own integrated system of sub-disciplines and services.",
    },

    about: {
      title: "About SHAT",
      subtitle: "Identity, vision, mission, and the integrated model connecting knowledge to results",
      subsections: {
        whoWeAre: {
          title: "Who We Are",
          desc: "SHAT Development & Growth is a specialized company in training, capacity development, consulting, and institutional development, working with individuals, institutions, and organizations to strengthen competencies, improve institutional systems, enhance programme quality, and advance results.",
          bullets: [
            "Strategic partner for humanitarian, development, public, and private institutions.",
            "Multidisciplinary team of internationally certified consultants with profound field experience.",
            "Agile, context-sensitive advisory and training methodologies adapted to complex operating environments."
          ]
        },
        methodology: {
          title: "Service Delivery Methodology",
          desc: "SHAT delivers its services through evidence-based methodologies, competency-based learning, organizational analysis, systematic assessment, and continuous improvement, informed by relevant international and humanitarian principles and standards."
        },
        philosophy: {
          title: "SHAT Philosophy & Impact Model",
          desc: "SHAT’s approach connects knowledge, capacity, practice, and results — moving beyond knowledge transfer towards strengthened capabilities, improved practice, and measurable organizational and programme performance.",
          flow: [
            { step: "Knowledge", detail: "Acquiring advanced theoretical frameworks, standards, and methodological tools." },
            { step: "Capacity", detail: "Building practical readiness and hands-on professional capabilities." },
            { step: "Practice", detail: "Operationalizing standards, policies, and procedures in real-world contexts." },
            { step: "Performance", detail: "Elevating organizational efficiency, programme quality, and execution excellence." },
            { step: "Results", detail: "Achieving tangible, measurable, and sustainable positive impact." }
          ]
        },
        identity: {
          title: "Institutional Identity & Culture",
          desc: "Our identity blends rigorous scientific analysis with the highest ethical conduct, fostering a collaborative ecosystem that inspires positive transformation, continuous improvement, and social accountability."
        }
      }
    },

    services: {
      title: "What We Do",
      subtitle: "An integrated ecosystem of training, capacity building, consulting, and organizational transformation",
      subsections: {
        training: {
          title: "Training & Capacity Development",
          summary: "SHAT provides specialized, practical, needs-based, and competency-oriented training programmes, designed to enhance knowledge, professional skills, and organizational behaviours, directly linking learning outcomes to operational performance.",
          pillars: [
            { name: "Training Needs Assessment (TNA)", detail: "Rigorous field diagnostics to pinpoint exact capability gaps prior to curriculum design." },
            { name: "Competency-Based Learning", detail: "Focusing on verifiable functional competencies rather than purely theoretical instruction." },
            { name: "Programme & Curriculum Design", detail: "Crafting customized curricula and training packages aligned with global pedagogical standards." },
            { name: "Practical & Experiential Learning", detail: "Real-world simulations, interactive workshops, and evidence-grounded case studies." },
            { name: "Training of Trainers (TOT)", detail: "Empowering organizational champions to cascade knowledge and foster internal capacity." },
            { name: "Institutional Capacity Building", detail: "Comprehensive initiatives enhancing team readiness and structural adaptability." },
            { name: "Learning Outcome Assessment", detail: "Utilizing scientifically validated evaluation models to track performance change and ROI." }
          ]
        },
        consulting: {
          title: "Consulting & Institutional Development",
          summary: "SHAT assists institutions and organizations in understanding organizational realities, diagnosing gaps, establishing systems, formulating policies, boosting performance, and enhancing programme and process quality. Consulting interventions progress from diagnosis to development, from recommendation to implementation, and from implementation to continuous improvement.",
          pillars: [
            { name: "Institutional Assessment & Diagnosis", detail: "Holistic evaluation of organizational structures, workflows, and culture to identify growth levers." },
            { name: "Strategic Planning", detail: "Formulating actionable strategic plans, visionary roadmaps, and agile execution frameworks." },
            { name: "Organizational Development", detail: "Streamlining operational structures and restructuring workflows to support sustained growth." },
            { name: "Policies, Procedures & Systems", detail: "Drafting corporate governance manuals, compliance frameworks, and Standard Operating Procedures (SOPs)." },
            { name: "Programme & Project Management", detail: "Refining project lifecycle governance across humanitarian and development interventions." },
            { name: "Human Resources & Talent Development", detail: "Designing performance appraisal systems, competency frameworks, and talent retention strategies." },
            { name: "Performance & Quality Improvement", detail: "Embedding total quality management standards and eliminating organizational bottlenecks." },
            { name: "MEL Systems Architecture", detail: "Engineering automated Monitoring, Evaluation, and Learning systems with evidence-driven KPI dashboards." }
          ]
        }
      }
    },

    consultingSec: {
      title: "Specialized Consulting & Evaluation",
      subtitle: "Advanced protection advisory, safeguarding frameworks, and independent external evaluations",
      subsections: {
        protection: {
          title: "Protection & Safeguarding Consulting",
          desc: "SHAT supports institutions in developing protection frameworks, policies, and procedures, conducting protection risk analyses, strengthening prevention and response mechanisms, safe reporting and referral pathways, and safeguarding practices.",
          principles: "This practice area is firmly grounded in protection and human rights principles, the Do No Harm doctrine, accountability, inclusivity, strict confidentiality, and Protection from Sexual Exploitation and Abuse (PSEA).",
          items: [
            "Formulating safeguarding policies for children and vulnerable populations.",
            "Conducting comprehensive protection risk assessments and institutional mitigation strategies.",
            "Establishing confidential reporting hotlines, complaint mechanisms, and secure referral systems.",
            "Delivering code of conduct orientations and ethics training for operational staff."
          ]
        },
        evaluation: {
          title: "External Independent Evaluation",
          desc: "SHAT delivers independent external evaluation services for programmes, projects, and interventions using evidence-based quantitative and qualitative methodologies. Our evaluations aim to generate credible evidence, distill lessons learned, inform strategic decision-making, foster institutional learning, and enhance intervention quality.",
          criteriaTitle: "Benchmarked OECD DAC Evaluation Criteria:",
          criteria: [
            { name: "Relevance", desc: "Alignment of intervention objectives with beneficiary needs, stakeholder priorities, and local context." },
            { name: "Coherence", desc: "Compatibility and synergy with other initiatives, policies, and partner programmes in the sector." },
            { name: "Effectiveness", desc: "The extent to which the intervention achieved its planned outcomes and specific objectives." },
            { name: "Efficiency", desc: "Optimal, economic, and timely conversion of inputs and resources into planned results." },
            { name: "Impact", desc: "Higher-level positive or negative, intended or unintended, long-term societal and systemic changes." },
            { name: "Sustainability", desc: "Continuity of benefits and positive outcomes after direct external assistance ceases." }
          ]
        }
      }
    },

    deliveryModel: {
      title: "Our Delivery Model",
      subtitle: "A systematic 6-stage operational pathway moving from needs to measurable results",
      slogan: "From Needs to Results",
      intro: "SHAT adheres to an agile, disciplined delivery model that ensures contextual precision, stakeholder alignment, and sustainable value across every project phase.",
      stages: [
        {
          name: "Understand",
          en: "Understand Context & Needs",
          desc: "Deep immersion in stakeholder dynamics, contextual nuances, and foundational organizational challenges."
        },
        {
          name: "Assess",
          en: "Diagnose & Gap Analysis",
          desc: "Systematic, evidence-driven evaluation to identify the exact variance between current state and strategic aspirations."
        },
        {
          name: "Design",
          en: "Tailor Solutions & Frameworks",
          desc: "Co-designing bespoke training modules, policy frameworks, and implementation roadmaps tailored to client needs."
        },
        {
          name: "Deliver",
          en: "Execute & Knowledge Transfer",
          desc: "Executing interventions with high precision while actively transferring operational capabilities to client teams."
        },
        {
          name: "Measure",
          en: "Evaluate Outcomes & Performance",
          desc: "Deploying rigorous metric frameworks to benchmark outcomes, verify learning mastery, and substantiate impact."
        },
        {
          name: "Learn & Improve",
          en: "Continuous Adaptation & Growth",
          desc: "Synthesizing debriefs, extracting institutional lessons, and embedding continuous optimization routines."
        }
      ]
    },

    approach: {
      title: "Our Professional Approach",
      subtitle: "Core principles and institutional values governing the architecture of every SHAT intervention",
      intro: "SHAT is guided by foundational principles that underpin the design and execution of all our professional services:",
      pillars: [
        {
          title: "Evidence-Based Practice",
          en: "Evidence-Based Practice",
          desc: "Grounding all diagnoses, recommendations, and curriculums in verified empirical data and robust research."
        },
        {
          title: "Competency-Based Development",
          en: "Competency-Based Development",
          desc: "Cultivating operational, applied capabilities that translate into immediate workplace performance gains."
        },
        {
          title: "Human Rights-Based Approach",
          en: "Human Rights-Based Approach (HRBA)",
          desc: "Centering universal human dignity, equity, and intrinsic legal rights in every institutional intervention."
        },
        {
          title: "Do No Harm",
          en: "Do No Harm Doctrine",
          desc: "Anticipating secondary systemic impacts to ensure zero unintended adverse consequences for communities."
        },
        {
          title: "Accountability",
          en: "Accountability & Transparency",
          desc: "Upholding uncompromising integrity and mutual accountability towards clients, partners, and affected people."
        },
        {
          title: "Inclusion & Non-Discrimination",
          en: "Inclusion & Non-Discrimination",
          desc: "Fostering equal access, equitable participation, and universal representation across all interventions."
        },
        {
          title: "Safeguarding & Protection",
          en: "Safeguarding & Protection",
          desc: "Maintaining safe, protective, and empowering environments free from exploitation, abuse, or harassment."
        },
        {
          title: "Ethical Practice",
          en: "Ethical Practice & Neutrality",
          desc: "Steadfast adherence to professional independence, intellectual honesty, and unbiased neutrality."
        },
        {
          title: "Confidentiality & Data Protection",
          en: "Confidentiality & Data Protection",
          desc: "Enforcing stringent cybersecurity and data privacy protocols across all proprietary and sensitive assets."
        },
        {
          title: "Quality & Continuous Improvement",
          en: "Quality & Continuous Improvement",
          desc: "Relentless commitment to institutional excellence, service refinement, and international state-of-the-art practice."
        }
      ]
    },

    references: {
      title: "International & Humanitarian References",
      subtitle: "Global standards, treaties, and benchmarks informing SHAT’s methodologies and frameworks",
      intro: "Depending on scope and mandate, SHAT benchmarks its engagements against premier international and humanitarian conventions:",
      standards: [
        {
          code: "CHS",
          title: "Core Humanitarian Standard on Quality and Accountability",
          en: "Core Humanitarian Standard",
          desc: "A globally recognized framework defining institutional commitments for principled, accountable humanitarian action."
        },
        {
          code: "SPHERE",
          title: "Sphere Handbook Minimum Standards",
          en: "Sphere Handbook",
          desc: "Universal ethical charter and minimum technical benchmarks for humanitarian crisis response and dignity."
        },
        {
          code: "OECD DAC",
          title: "OECD Development Assistance Committee Criteria",
          en: "OECD DAC Evaluation Criteria",
          desc: "International gold standard for assessing development cooperation and humanitarian program efficacy."
        },
        {
          code: "UNEG",
          title: "UN Evaluation Group Norms & Standards",
          en: "UN Evaluation Group",
          desc: "Professional guidelines safeguarding the objectivity, rigor, and credibility of systemic evaluations."
        },
        {
          code: "HRBA",
          title: "Human Rights-Based Approach",
          en: "Human Rights-Based Approach",
          desc: "Normative framework integrating international human rights covenants into program design and implementation."
        },
        {
          code: "AAP",
          title: "Accountability to Affected People",
          en: "Accountability to Affected People",
          desc: "Operationalizing community voice, feedback loops, and stakeholder governance in aid delivery."
        },
        {
          code: "Protection",
          title: "Protection Mainstreaming Guidelines",
          en: "Protection Mainstreaming",
          desc: "Ensuring non-discriminatory access, meaningful participation, and physical safety across all sectoral activities."
        },
        {
          code: "PSEA",
          title: "Protection from Sexual Exploitation and Abuse",
          en: "PSEA Frameworks",
          desc: "Zero-tolerance institutional systems, preventative audits, and investigation protocols safeguarding beneficiaries."
        },
        {
          code: "CRC",
          title: "UN Convention on the Rights of the Child",
          en: "Convention on the Rights of the Child",
          desc: "The binding legal instrument defending child welfare, protection, education, and holistic development."
        },
        {
          code: "CEDAW",
          title: "Convention on the Elimination of All Discrimination Against Women",
          en: "CEDAW Convention",
          desc: "International bill of rights for women advancing gender equality, institutional parity, and non-discrimination."
        }
      ]
    },

    expertise: {
      title: "Areas of Expertise",
      subtitle: "Dedicated sector practices where SHAT delivers training, consulting, and evaluation",
      sectors: [
        {
          name: "Humanitarian Action",
          en: "Humanitarian Action",
          icon: "heart-handshake",
          desc: "Crisis management, emergency response protocols, camp coordination, and rapid deployment readiness."
        },
        {
          name: "Protection & Safeguarding",
          en: "Protection & Safeguarding",
          icon: "shield-check",
          desc: "Child protection systems, GBV risk mitigation, PSEA compliance, and vulnerable population safety."
        },
        {
          name: "Women & Child Development",
          en: "Women & Child Development",
          icon: "sparkles",
          desc: "Socio-economic empowerment, early childhood development, and systemic gender mainstreaming."
        },
        {
          name: "Youth Development & Empowerment",
          en: "Youth Development & Empowerment",
          icon: "users",
          desc: "Social entrepreneurship, youth leadership academies, employability skills, and civic participation."
        },
        {
          name: "Education & Teacher Development",
          en: "Education & Teacher Development",
          icon: "graduation-cap",
          desc: "Pedagogical engineering, Education in Emergencies (EiE), active learning curricula, and faculty upskilling."
        },
        {
          name: "Media & Communication",
          en: "Media & Communication",
          icon: "radio",
          desc: "Institutional storytelling, advocacy campaign architecture, public diplomacy, and strategic communication."
        },
        {
          name: "Institutional Development",
          en: "Institutional Development",
          icon: "building-2",
          desc: "Corporate governance, change management, operational restructuring, and organizational resilience."
        },
        {
          name: "Monitoring, Evaluation & Learning",
          en: "Monitoring, Evaluation & Learning",
          icon: "line-chart",
          desc: "End-to-end MEL system design, digital data collection architectures, baseline/endline studies, and impact evaluations."
        }
      ]
    },

    valuePartnerships: {
      title: "Value Proposition & Partnerships",
      subtitle: "Our distinctive strategic edge as an institutional partner dedicated to measurable transformation",
      valuePropsTitle: "Our Five Value Pillars",
      values: [
        {
          title: "Capacity",
          en: "Capacity",
          slogan: "We build knowledge and competencies.",
          desc: "Cultivating organizational talent and turning abstract concepts into resilient capabilities."
        },
        {
          title: "Systems",
          en: "Systems",
          slogan: "We develop institutional systems and practices.",
          desc: "Engineering coherent policies and Standard Operating Procedures that guarantee continuity and compliance."
        },
        {
          title: "Evidence",
          en: "Evidence",
          slogan: "We transform data into actionable intelligence.",
          desc: "Synthesizing deep diagnostic findings into strategic roadmaps that drive confident decisions."
        },
        {
          title: "Performance",
          en: "Performance",
          slogan: "We connect development directly to performance.",
          desc: "Elevating daily operational productivity and field delivery excellence."
        },
        {
          title: "Results",
          en: "Results",
          slogan: "We focus on outcomes, impact, and continuous improvement.",
          desc: "Securing verifiable, lasting transformations that benefit organizations and end-stakeholders alike."
        }
      ],
      positioningTitle: "Our Institutional Positioning",
      positioningLead: "SHAT is more than a training provider — it is a partner in capacity strengthening and institutional development.",
      positioningBody: "We believe effective training should lead to practical capability, consulting should move from analysis to solutions and from solutions to improvement, and evaluation should transform evidence and findings into learning, informed decisions, and meaningful improvements.",
      commitmentTitle: "Our Institutional Commitment",
      commitmentBody: "We are committed to delivering quality, evidence-based services grounded in clear methodologies, while maintaining professionalism, independence, confidentiality, and a strong focus on capacity strengthening, performance improvement, and measurable results.",
      partnerCtaTitle: "Ready to Forge a Transformative Partnership?",
      partnerCtaDesc: "Connect with SHAT’s senior advisory council today to discuss your institution's strategic objectives and design custom interventions."
    },

    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our advisory team to explore customized training and consulting engagements",
      infoTitle: "Corporate Contact Details",
      emailLabel: "Official Email",
      emailValue: "info@shatgrowth.com",
      phoneLabel: "Telephone & Direct WhatsApp",
      phoneValue: "+966 50 000 0000",
      websiteLabel: "Corporate Website",
      websiteValue: "www.shatgrowth.com",
      addressLabel: "Headquarters",
      addressValue: "Kingdom of Saudi Arabia / International Regional Hubs",
      formTitle: "Request a Consultation or Training Program",
      formSubtitle: "Complete the inquiry form below, and our senior advisory team will contact you within 24 business hours.",
      nameLabel: "Full Name",
      emailInputLabel: "Professional Email",
      orgLabel: "Organization / Institution Name",
      phoneInputLabel: "Phone Number / WhatsApp",
      serviceTypeLabel: "Service of Interest",
      serviceOptions: [
        "Training & Capacity Development Programs",
        "Consulting & Institutional Development",
        "Protection & Safeguarding Advisory",
        "External Independent Project Evaluation",
        "Monitoring, Evaluation & Learning (MEL) Architecture",
        "General Strategic Partnership"
      ],
      messageLabel: "Project Scope or Specific Requirements",
      submitBtn: "Submit Consultation Request",
      successMsg: "Thank you for reaching out! Your inquiry has been received, and our team will get in touch shortly."
    },

    
    academy: {
      "navAcademy": "🎓 SHAT Academy",
      "badge": "SHAT Academy for Leadership & Institutional Growth",
      "title": "Executive Capacity Building & Professional Mastery",
      "subtitle": "Advanced applied learning programs for humanitarian and institutional development practitioners, aligned with global standards (CHS, Sphere, OECD DAC, PSEA).",
      "searchPlaceholder": "Search specialized programs and diplomas by title or topic...",
      "allTracks": "All Academic Tracks",
      "tracks": [
            {
                  "id": "all",
                  "name": "All Academic Tracks"
            },
            {
                  "id": "humanitarian",
                  "name": "Humanitarian & Global Standards (CHS & Sphere)"
            },
            {
                  "id": "protection",
                  "name": "Protection & Safeguarding (PSEA & Do No Harm)"
            },
            {
                  "id": "evaluation",
                  "name": "Independent Evaluation & MEL (OECD DAC)"
            },
            {
                  "id": "governance",
                  "name": "Governance & Strategic Leadership"
            },
            {
                  "id": "tot",
                  "name": "Training of Trainers (TOT Professional)"
            },
            {
                  "id": "empowerment",
                  "name": "Women & Youth Empowerment"
            }
      ],
      "stats": {
            "graduates": "+1,450",
            "graduatesLabel": "Certified Graduates & Experts",
            "programs": "24+",
            "programsLabel": "Applied Professional Programs",
            "partners": "50+",
            "partnersLabel": "Partner Institutions & NGOs",
            "satisfaction": "99.2%",
            "satisfactionLabel": "Participant Satisfaction & Impact"
      },
      "courses": [
            {
                  "id": "shat-chs-master",
                  "track": "humanitarian",
                  "trackName": "Humanitarian Sector",
                  "title": "Core Humanitarian Standard (CHS) & Development Response Diploma",
                  "desc": "Advanced program qualifying humanitarian practitioners to implement the Nine Commitments of the CHS and enforce rigorous Accountability to Affected People (AAP).",
                  "duration": "45 Training Hours • 6 Weeks",
                  "level": "Advanced",
                  "format": "Hybrid (Interactive + Case Studies)",
                  "accreditation": "Accredited according to CHS & Sphere",
                  "syllabus": [
                        "Module 1: The Nine Commitments of the Core Humanitarian Standard",
                        "Module 2: Practical AAP Tools and Community Feedback Mechanisms",
                        "Module 3: Needs Assessment and Principled Intervention Design",
                        "Module 4: Real-world Case Simulation and Quality Matrix Audit"
                  ]
            },
            {
                  "id": "shat-psea-expert",
                  "track": "protection",
                  "trackName": "Protection & Safeguarding",
                  "title": "Executive Program in Protection & Safeguarding Consulting (PSEA)",
                  "desc": "Equipping advisors and focal points to build institutional safeguarding policies, conduct sexual exploitation and abuse risk assessments, and establish secure referral pathways.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Executive & Advisory",
                  "format": "Live Virtual + Practical Mentoring",
                  "accreditation": "Aligned with Inter-Agency PSEA Standards & Do No Harm",
                  "syllabus": [
                        "Module 1: Legal and Humanitarian Foundations of Safeguarding",
                        "Module 2: Risk Assessment Architectures and Policy Formulation",
                        "Module 3: Incident Management, Investigation Protocols, and Survivor Protection",
                        "Module 4: Institutional Action Planning and Compliance Auditing"
                  ]
            },
            {
                  "id": "shat-oecd-evaluator",
                  "track": "evaluation",
                  "trackName": "Independent Evaluation",
                  "title": "External Evaluation Specialist: OECD DAC Six Criteria",
                  "desc": "Developing independent evaluators proficient in assessing Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability using mixed-method research and UNEG norms.",
                  "duration": "50 Training Hours • 7 Weeks",
                  "level": "Expert Level",
                  "format": "Hybrid + Supervised Field Evaluation Project",
                  "accreditation": "Accredited under OECD DAC Criteria & UNEG Standards",
                  "syllabus": [
                        "Module 1: The Six OECD DAC Criteria and Strategic Evaluation Questions",
                        "Module 2: Evidence Synthesis, Mixed Methods, and Field Sampling",
                        "Module 3: Formulating Independent Evaluation Reports & Actionable Lessons",
                        "Module 4: Presenting Findings to Donor Boards & Stakeholders"
                  ]
            },
            {
                  "id": "shat-tot-professional",
                  "track": "tot",
                  "trackName": "Training of Trainers",
                  "title": "Professional Training of Trainers for Humanitarian & Development Orgs (TOT)",
                  "desc": "Master competency-based curriculum design, adult experiential learning facilitation (Kolb's cycle), Kirkpatrick outcome evaluation, and AI-assisted educational frameworks.",
                  "duration": "36 Training Hours • 4 Weeks",
                  "level": "Professional Practitioner",
                  "format": "Interactive Studio Workshops & Micro-teaching",
                  "accreditation": "SHAT Certified Professional Facilitator",
                  "syllabus": [
                        "Module 1: Adult Learning Psychology and Experiential Cycles",
                        "Module 2: Competency-based Curriculum and Instructional Architecture",
                        "Module 3: Facilitation Dynamics, Conflict Resolution & Group Management",
                        "Module 4: Capstone: Micro-teaching Delivery with Video Analysis & Feedback"
                  ]
            },
            {
                  "id": "shat-governance-strategy",
                  "track": "governance",
                  "trackName": "Governance & Leadership",
                  "title": "Strategic Governance & Institutional Leadership for Non-Profit Organizations",
                  "desc": "Developing executive governance structures, robust board oversight, organizational change management, and balanced scorecards for resilient civil society entities.",
                  "duration": "32 Training Hours • 4 Weeks",
                  "level": "Executive & Leadership",
                  "format": "Executive Seminars & Case Labs",
                  "accreditation": "Conforms to International Governance Frameworks",
                  "syllabus": [
                        "Module 1: Good Governance Norms, Board Dynamics & Fiduciary Accountability",
                        "Module 2: Strategic Roadmapping, Objective Cascades & Risk Matrices",
                        "Module 3: Designing Balanced Scorecards and Operational KPIs",
                        "Module 4: Transformational Leadership and Change Management"
                  ]
            },
            {
                  "id": "shat-meal-systems",
                  "track": "evaluation",
                  "trackName": "MEAL Systems",
                  "title": "Designing & Managing Integrated MEAL Systems (Monitoring, Evaluation, Accountability & Learning)",
                  "desc": "Architecting end-to-end MEAL architectures, result frameworks, digital indicators, community accountability loops, and organizational knowledge harvesting.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Advanced",
                  "format": "Hands-on with Industry Cloud Toolkits",
                  "accreditation": "Conforms to International Development Standards",
                  "syllabus": [
                        "Module 1: Results Frameworks, LogFrames, and Theory of Change",
                        "Module 2: Performance Monitoring Plans (PMP) & Indicator Tracking",
                        "Module 3: Community Accountability, Complaint Channels & Feedback Loops",
                        "Module 4: Digital Dashboards and Knowledge Harvesting Methodologies"
                  ]
            }
      ],
      "verify": {
            "title": "Official Certificate Verification Portal",
            "subtitle": "Instant real-time verification of credentials, diplomas, and accreditations issued by SHAT Academy.",
            "placeholder": "Enter Certificate Code (e.g., SHAT-2026-CHS-01)",
            "btn": "Verify Credential",
            "testingTip": "Sample verified credentials to test: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, or SHAT-2026-OECD-03",
            "verifiedTitle": "Officially Verified & Authenticated Credential",
            "studentLabel": "Awardee / Graduate Name:",
            "courseLabel": "Academic Program:",
            "dateLabel": "Issuance Date:",
            "gradeLabel": "Evaluation & Distinction:",
            "accreditationLabel": "International Accreditation:",
            "statusActive": "Active & Internationally Recognized",
            "notFound": "No certified record was found for this code. Please verify the code and contact SHAT Academy registry."
      },
      "modal": {
            "enrollTitle": "Enroll in Academic Program",
            "syllabusTitle": "Course Curriculum & Syllabus",
            "fullName": "Full Name",
            "email": "Professional Email",
            "phone": "Phone / WhatsApp",
            "org": "Organization / Institution",
            "background": "Professional Background & Learning Objectives",
            "submitEnroll": "Confirm Academic Enrollment",
            "successMsg": "Enrollment request submitted successfully! Our Academic Admissions Office will contact you within 24 hours."
      }
},
footer: {
      aboutText: "SHAT Development & Growth is a premier firm specialized in training, capacity strengthening, consulting, and institutional evolution aligned with international standards.",
      quickLinks: "Quick Navigation",
      legalNotice: "All rights reserved © 2026 SHAT Development & Growth.",
      privacyPledge: "Strictly upholding non-disclosure, institutional confidentiality, and enterprise data protection standards."
    }
  },

  fr: {
    dir: "ltr",
    langName: "Français",
    flag: "🇫🇷",
    companyName: "SHAT Développement & Croissance",
    companyShortName: "SHAT",
    companyTagline: "Renforcer les capacités • Consolider les institutions • Développer les résultats",
    companyMotto: "L'HUMAIN • LES COMPÉTENCES • UN AVENIR MEILLEUR",
    pillTraining: "FORMATION",
    pillConsulting: "CONSEIL",

    nav: {
      academy: "🎓 Académie SHAT",
      home: "Accueil",
      about: "À propos de SHAT",
      services: "Nos interventions",
      consulting: "Conseil spécialisé et évaluation",
      deliveryModel: "Notre modèle d'intervention",
      approach: "Notre approche professionnelle",
      references: "Référentiels internationaux",
      expertise: "Domaines d'expertise",
      valuePartnerships: "Notre valeur ajoutée et partenariats",
      contact: "Contactez-nous",
      requestConsultation: "Demande de conseil / formation",
      explorePlatform: "Explorer les sections",
      readMore: "En savoir plus",
      backHome: "Retour à l'accueil",
      viewDetails: "Voir les détails",
      close: "Fermer",
      allSections: "Toutes les sections institutionnelles",
      downloadProfile: "Télécharger le profil de l'entreprise",
    },

    hero: {
      badge: "Partenaire de confiance en développement institutionnel et renforcement des capacités",
      title: "Renforcer les capacités, consolider les institutions, développer des résultats mesurables",
      description: "SHAT Développement & Croissance est une société spécialisée dans la formation, le renforcement des capacités, le conseil et le développement institutionnel. Elle accompagne les individus, institutions et organisations dans le renforcement des compétences, l’amélioration des systèmes institutionnels, la qualité des programmes et l’amélioration des résultats.",
      ctaPrimary: "Découvrir nos services et programmes",
      ctaSecondary: "Prendre contact et demander un conseil",
      stat1Number: "100%",
      stat1Label: "Conformité aux normes internationales et humanitaires",
      stat2Number: "8+",
      stat2Label: "Domaines d'expertise sectorielle",
      stat3Number: "6",
      stat3Label: "Étapes du modèle d'intervention méthodique",
      stat4Number: "5",
      stat4Label: "Langues internationales prises en charge",
    },

    homeCards: {
      title: "Sections et domaines institutionnels",
      subtitle: "Explorez chaque section dédiée de notre plateforme; chaque domaine rassemble un ensemble structuré de compétences et de services.",
    },

    about: {
      title: "À propos de SHAT",
      subtitle: "Identité, vision, mission et modèle intégré reliant le savoir aux résultats",
      subsections: {
        whoWeAre: {
          title: "Qui sommes-nous",
          desc: "SHAT Développement & Croissance est une société spécialisée dans la formation, le renforcement des capacités, le conseil et le développement institutionnel. Elle accompagne les individus, institutions et organisations dans le renforcement des compétences, l’amélioration des systèmes institutionnels, la qualité des programmes et l’amélioration des résultats.",
          bullets: [
            "Partenaire stratégique des institutions humanitaires, de développement et du secteur public/privé.",
            "Équipe pluridisciplinaire d'experts certifiés internationalement avec une solide expérience de terrain.",
            "Méthodologies de formation et de conseil agiles, adaptées aux contextes opérationnels complexes."
          ]
        },
        methodology: {
          title: "Méthodologie d'intervention",
          desc: "SHAT dispense ses services selon des démarches fondées sur les données probantes, un apprentissage axé sur les compétences, l'analyse organisationnelle, l'évaluation systématique et l'amélioration continue."
        },
        philosophy: {
          title: "Philosophie SHAT et modèle d'impact",
          desc: "La philosophie de SHAT repose sur le lien continu entre Savoir, Capacité, Pratique et Résultats — allant au-delà de la simple transmission de connaissances vers des compétences renforcées et une performance mesurable.",
          flow: [
            { step: "Savoir", detail: "Acquisition de cadres théoriques, d'outils et de standards méthodologiques." },
            { step: "Capacité", detail: "Développement de compétences opérationnelles et de préparation pratique." },
            { step: "Pratique", detail: "Application rigoureuse des normes et des procédures sur le terrain." },
            { step: "Performance", detail: "Optimisation de l'efficience opérationnelle et de la qualité des programmes." },
            { step: "Résultats", detail: "Obtention d'impacts durables, mesurables et positifs pour les bénéficiaires." }
          ]
        },
        identity: {
          title: "Identité et culture institutionnelle",
          desc: "Notre culture associe rigueur scientifique et éthique irréprochable, stimulant la responsabilité sociale et l'amélioration continue au sein de chaque organisation partenaire."
        }
      }
    },

    services: {
      title: "Nos interventions",
      subtitle: "Un écosystème intégré de formation, renforcement des capacités et conseil institutionnel",
      subsections: {
        training: {
          title: "Formation et renforcement des capacités",
          summary: "SHAT propose des programmes de formation spécialisés, pratiques, axés sur les besoins et les compétences, conçus pour consolider les connaissances, les aptitudes et les comportements professionnels, reliant directement les acquis à la performance opérationnelle.",
          pillars: [
            { name: "Évaluation des besoins en formation (TNA)", detail: "Diagnostics de terrain rigoureux pour identifier avec précision les lacunes de compétences." },
            { name: "Apprentissage axé sur les compétences", detail: "Priorité accordée aux compétences professionnelles directement applicables." },
            { name: "Ingénierie pédagogique et conception de programmes", detail: "Élaboration de modules pédagogiques sur mesure conformes aux meilleures normes internationales." },
            { name: "Apprentissage pratique et expérientiel", detail: "Simulations réalistes, ateliers participatifs et études de cas contextualisées." },
            { name: "Formation de formateurs (TOT)", detail: "Autonomisation de relais internes capables de disséminer les compétences au sein de leur structure." },
            { name: "Renforcement des capacités institutionnelles", detail: "Programmes complets renforçant la cohésion et l'adaptabilité organisationnelle." },
            { name: "Évaluation des acquis d'apprentissage", detail: "Mesure scientifique de la progression et de l'impact direct dans l'environnement de travail." }
          ]
        },
        consulting: {
          title: "Conseil et développement institutionnel",
          summary: "SHAT accompagne les institutions dans la compréhension de leur réalité, le diagnostic des lacunes, l'élaboration de politiques, l'amélioration des performances et l'élévation des standards de qualité. Notre conseil évolue du diagnostic au développement, de la recommandation à l'application, et de l'application à l'amélioration continue.",
          pillars: [
            { name: "Diagnostic et évaluation institutionnelle", detail: "Audit approfondi des structures, des processus et de la culture organisationnelle." },
            { name: "Planification stratégique", detail: "Formulation de plans stratégiques réalistes et de feuilles de route opérationnelles." },
            { name: "Développement organisationnel", detail: "Optimisation des processus et restructuration des organigrammes pour soutenir la croissance." },
            { name: "Élaboration des politiques et procédures (SOP)", detail: "Rédaction de manuels de gouvernance et de procédures opératoires normalisées." },
            { name: "Gestion de programmes et de projets", detail: "Gouvernance rigoureuse du cycle de projet humanitaire et de développement." },
            { name: "Ressources humaines et gestion des talents", detail: "Mise en place de grilles de compétences, d'évaluations et de stratégies de fidélisation." },
            { name: "Amélioration de la performance et qualité", detail: "Instauration de démarches qualité totale pour maximiser l'efficience." },
            { name: "Systèmes de suivi, évaluation et apprentissage (MEL)", detail: "Conception de dispositifs MEL informatisés et de tableaux de bord d'indicateurs." }
          ]
        }
      }
    },

    consultingSec: {
      title: "Conseil spécialisé et évaluation",
      subtitle: "Conseil de pointe en protection, sauvegarde et services d'évaluation externe indépendante",
      subsections: {
        protection: {
          title: "Conseil en protection et sauvegarde",
          desc: "SHAT accompagne les institutions dans l'élaboration de cadres, de politiques et de procédures de protection, l'analyse des risques de protection, le renforcement de la prévention et de la réponse, les mécanismes de signalement et de référencement sûrs, ainsi que les pratiques de sauvegarde.",
          principles: "Ce domaine repose sur les droits humains, le principe « Ne pas nuire » (Do No Harm), la redevabilité, l'inclusion, la stricte confidentialité et la prévention de l'exploitation et des abus sexuels (PEAS).",
          items: [
            "Conception de politiques de sauvegarde pour les enfants et personnes vulnérables.",
            "Cartographie des risques de protection et plans d'atténuation institutionnels.",
            "Canaux confidentiels de signalement, traitement des plaintes et référencement sécurisé.",
            "Formations aux codes de conduite et sensibilisation éthique des équipes de terrain."
          ]
        },
        evaluation: {
          title: "Évaluation externe indépendante",
          desc: "SHAT réalise des évaluations externes et indépendantes de programmes, de projets et d'interventions au moyen de méthodes quantitatives et qualitatives probantes. L'objectif est de produire des données fiables, de tirer des enseignements, d'éclairer la prise de décision et de perfectionner la qualité des interventions.",
          criteriaTitle: "Critères d'évaluation internationaux du CAD de l'OCDE :",
          criteria: [
            { name: "Pertinence", desc: "Adéquation des objectifs du projet avec les besoins prioritaires des populations et le contexte." },
            { name: "Cohérence", desc: "Synergie et articulation avec les autres politiques et interventions du secteur." },
            { name: "Efficacité", desc: "Degré d'atteinte des résultats escomptés et des objectifs spécifiques fixés." },
            { name: "Efficience", desc: "Utilisation optimale et rationnelle des ressources pour obtenir les meilleurs résultats." },
            { name: "Impact", desc: "Effets significatifs à long terme, directs ou indirects, voulus ou imprévus." },
            { name: "Durabilité", desc: "Pérennité des bénéfices et acquis après la fin des financements extérieurs." }
          ]
        }
      }
    },

    deliveryModel: {
      title: "Notre modèle d'intervention",
      subtitle: "Une démarche opérationnelle structurée en 6 phases, reliant le besoin aux résultats",
      slogan: "From Needs to Results — Du besoin aux résultats",
      intro: "SHAT applique un modèle d'intervention rigoureux garantissant une précision contextuelle, l'alignement des acteurs et des retombées mesurables à chaque étape.",
      stages: [
        {
          name: "Comprendre",
          en: "Understand",
          desc: "Compréhension approfondie du contexte, des parties prenantes et des défis institutionnels."
        },
        {
          name: "Diagnostiquer",
          en: "Assess",
          desc: "Diagnostic méthodologique pour mesurer avec exactitude les écarts et les axes d'amélioration."
        },
        {
          name: "Concevoir",
          en: "Design",
          desc: "Co-conception de solutions de conseil ou de parcours de formation taillés sur mesure."
        },
        {
          name: "Mettre en œuvre",
          en: "Deliver",
          desc: "Déploiement des interventions avec transfert effectif et durable des compétences aux équipes."
        },
        {
          name: "Mesurer",
          en: "Measure",
          desc: "Évaluation outillée des résultats obtenus et suivi rigoureux des indicateurs de performance."
        },
        {
          name: "Apprendre et améliorer",
          en: "Learn & Improve",
          desc: "Capitalisation des acquis, retour d'expérience et ancrage de pratiques d'amélioration continue."
        }
      ]
    },

    approach: {
      title: "Notre approche professionnelle",
      subtitle: "Principes fondateurs et valeurs d'intégrité qui caractérisent chaque engagement de SHAT",
      intro: "SHAT s'appuie sur des principes fondamentaux qui guident l'élaboration et la conduite de ses prestations :",
      pillars: [
        {
          title: "Pratique fondée sur les preuves",
          en: "Evidence-Based Practice",
          desc: "Appui sur des données fiables et des analyses rigoureuses pour toute préconisation."
        },
        {
          title: "Développement axé sur les compétences",
          en: "Competency-Based Development",
          desc: "Développement d'aptitudes opérationnelles créant un impact immédiat sur le terrain."
        },
        {
          title: "Approche fondée sur les droits humains",
          en: "Human Rights-Based Approach",
          desc: "Respect inconditionnel de la dignité, de l'équité et des droits inhérents à chaque individu."
        },
        {
          title: "Ne pas nuire (Do No Harm)",
          en: "Do No Harm",
          desc: "Anticipation des impacts secondaires pour prévenir tout préjudice collatéral imprévu."
        },
        {
          title: "Redevabilité",
          en: "Accountability",
          desc: "Transparence totale et sens aigu de la responsabilité envers nos clients et partenaires."
        },
        {
          title: "Inclusion et non-discrimination",
          en: "Inclusion & Non-Discrimination",
          desc: "Garantie d'une participation équitable et inclusive sans aucune forme de distinction."
        },
        {
          title: "Sauvegarde et protection",
          en: "Safeguarding & Protection",
          desc: "Création d'espaces professionnels sûrs, protégés de tout risque d'abus ou d'exploitation."
        },
        {
          title: "Éthique professionnelle",
          en: "Ethical Practice",
          desc: "Attachement indéfectible à l'indépendance de jugement, la neutralité et l'honnêteté."
        },
        {
          title: "Confidentialité et protection des données",
          en: "Confidentiality & Data Protection",
          desc: "Protocoles stricts de sécurisation et de confidentialité des données sensibles confiées."
        },
        {
          title: "Qualité et amélioration continue",
          en: "Quality & Continuous Improvement",
          desc: "Recherche perpétuelle d'excellence et adoption des standards internationaux de pointe."
        }
      ]
    },

    references: {
      title: "Référentiels internationaux",
      subtitle: "Conventions, normes et standards mondiaux guidant la pratique et les évaluations de SHAT",
      intro: "Selon les objectifs et le champ d'action, SHAT se réfère aux grands cadres internationaux et humanitaires :",
      standards: [
        {
          code: "CHS",
          title: "Norme humanitaire fondamentale de qualité et de redevabilité",
          en: "Core Humanitarian Standard",
          desc: "Référentiel mondial établissant les engagements pour des interventions humanitaires éthiques."
        },
        {
          code: "SPHERE",
          title: "Standards minimums du manuel Sphere",
          en: "Sphere Handbook",
          desc: "Charte universelle définissant les critères techniques vitaux en gestion de crise humanitaire."
        },
        {
          code: "OECD DAC",
          title: "Critères d'évaluation du CAD de l'OCDE",
          en: "OECD DAC Evaluation Criteria",
          desc: "Standard mondial pour évaluer la pertinence, l'efficience et l'impact des coopérations au développement."
        },
        {
          code: "UNEG",
          title: "Normes et standards du Groupe d'évaluation de l'ONU",
          en: "UN Evaluation Group",
          desc: "Règles déontologiques assurant l'impartialité et la crédibilité des audits et évaluations."
        },
        {
          code: "HRBA",
          title: "Approche fondée sur les droits humains",
          en: "Human Rights-Based Approach",
          desc: "Intégration systématique des droits universels au cœur de la conception programmatique."
        },
        {
          code: "AAP",
          title: "Redevabilité envers les populations affectées",
          en: "Accountability to Affected People",
          desc: "Mécanismes concrets d'écoute, de participation et de concertation des communautés locales."
        },
        {
          code: "Protection",
          title: "Intégration transversale de la protection",
          en: "Protection Mainstreaming",
          desc: "Prise en compte de la sécurité, de la dignité et de l'accès équitable dans chaque action."
        },
        {
          code: "PSEA",
          title: "Prévention de l'exploitation et des abus sexuels",
          en: "PSEA Frameworks",
          desc: "Politiques institutionnelles de tolérance zéro et procédures préventives et répressives rigoureuses."
        },
        {
          code: "CRC",
          title: "Convention relative aux droits de l'enfant",
          en: "Convention on the Rights of the Child",
          desc: "Cadre juridique international garantissant la protection et l'épanouissement de chaque enfant."
        },
        {
          code: "CEDAW",
          title: "Convention sur l'élimination des discriminations à l'égard des femmes",
          en: "CEDAW Convention",
          desc: "Norme fondamentale pour la promotion de l'égalité de genre et l'autonomisation des femmes."
        }
      ]
    },

    expertise: {
      title: "Domaines d'expertise",
      subtitle: "Pôles sectoriels où SHAT déploie ses interventions en formation, conseil et évaluation",
      sectors: [
        {
          name: "Action humanitaire",
          en: "Humanitarian Action",
          icon: "heart-handshake",
          desc: "Gestion de crises, coordination d'urgence, planification d'abris et conformité aux standards vitaux."
        },
        {
          name: "Protection et sauvegarde",
          en: "Protection & Safeguarding",
          icon: "shield-check",
          desc: "Protection de l'enfance, prévention des VBG, protocoles PEAS et sauvegarde des plus vulnérables."
        },
        {
          name: "Développement des femmes et des enfants",
          en: "Women & Child Development",
          icon: "sparkles",
          desc: "Autonomisation économique, développement de la petite enfance et leadership féminin."
        },
        {
          name: "Développement et autonomisation des jeunes",
          en: "Youth Development & Empowerment",
          icon: "users",
          desc: "Entrepreneuriat social, compétences d'employabilité, insertion professionnelle et citoyenneté active."
        },
        {
          name: "Éducation et formation des enseignants",
          en: "Education & Teacher Development",
          icon: "graduation-cap",
          desc: "Ingénierie didactique, éducation en situation d'urgence (EiE) et perfectionnement pédagogique."
        },
        {
          name: "Médias et communication stratégique",
          en: "Media & Communication",
          icon: "radio",
          desc: "Stratégies de plaidoyer, campagnes d'influence sociétale, gestion de la réputation et communication de crise."
        },
        {
          name: "Développement institutionnel",
          en: "Institutional Development",
          icon: "building-2",
          desc: "Gouvernance d'entreprise, conduite du changement, restructuration et résilience managériale."
        },
        {
          name: "Suivi, évaluation et apprentissage (MEL)",
          en: "Monitoring, Evaluation & Learning",
          icon: "line-chart",
          desc: "Architecture des dispositifs MEL, enquêtes de référence et finales, et évaluations d'impact rigoureuses."
        }
      ]
    },

    valuePartnerships: {
      title: "Notre valeur ajoutée et partenariats",
      subtitle: "Notre positionnement distinctif et notre engagement indéfectible pour l'impact",
      valuePropsTitle: "Nos cinq moteurs de valeur",
      values: [
        {
          title: "Capacité",
          en: "Capacity",
          slogan: "Nous développons le savoir et les compétences.",
          desc: "Développement du capital humain et conversion des notions en compétences durables."
        },
        {
          title: "Systèmes",
          en: "Systems",
          slogan: "Nous consolidons les systèmes et pratiques institutionnels.",
          desc: "Structuration de procédures qui sécurisent les opérations et garantissent la conformité."
        },
        {
          title: "Preuves",
          en: "Evidence",
          slogan: "Nous transformons les données en intelligence actionnable.",
          desc: "Exploitation de données probantes pour éclairer les décisions stratégiques majeures."
        },
        {
          title: "Performance",
          en: "Performance",
          slogan: "Nous associons le développement à la performance réelle.",
          desc: "Amélioration tangible de la productivité et de la qualité des livrables de terrain."
        },
        {
          title: "Résultats",
          en: "Results",
          slogan: "Nous ciblons l'impact mesurable et l'amélioration continue.",
          desc: "Obtention de transformations positives et vérifiables pour les partenaires et bénéficiaires."
        }
      ],
      positioningTitle: "Notre positionnement institutionnel",
      positioningLead: "SHAT est plus qu’un prestataire de formation ; c’est un partenaire du renforcement des capacités et du développement institutionnel.",
      positioningBody: "Nous croyons qu'une formation efficace doit conduire à une capacité opérationnelle, qu'un conseil pertinent doit évoluer de l'analyse vers les solutions, et qu'une évaluation rigoureuse doit transformer les constats en apprentissage et en décisions éclairées.",
      commitmentTitle: "Notre engagement institutionnel",
      commitmentBody: "Nous nous engageons à fournir des services de qualité, fondés sur les données probantes et reposant sur des méthodologies claires, tout en garantissant professionnalisme, indépendance, confidentialité et orientation vers des résultats mesurables.",
      partnerCtaTitle: "Prêt à bâtir un partenariat stratégique d'avenir ?",
      partnerCtaDesc: "Échangez dès aujourd'hui avec nos conseillers seniors pour concevoir des interventions adaptées à votre institution."
    },

    contact: {
      title: "Contactez-nous",
      subtitle: "Prenez contact avec notre équipe pour étudier vos projets de formation ou d'accompagnement",
      infoTitle: "Coordonnées de l'entreprise",
      emailLabel: "Courriel officiel",
      emailValue: "info@shatgrowth.com",
      phoneLabel: "Téléphone et assistance WhatsApp",
      phoneValue: "+966 50 000 0000",
      websiteLabel: "Site web officiel",
      websiteValue: "www.shatgrowth.com",
      addressLabel: "Siège social",
      addressValue: "Royaume d'Arabie Saoudite / Bureaux régionaux internationaux",
      formTitle: "Demande de consultation ou programme de formation",
      formSubtitle: "Remplissez le formulaire ci-dessous et nos experts vous répondront sous 24 heures ouvrables.",
      nameLabel: "Nom complet",
      emailInputLabel: "Courriel professionnel",
      orgLabel: "Organisation / Institution",
      phoneInputLabel: "Téléphone / WhatsApp",
      serviceTypeLabel: "Type d'intervention souhaitée",
      serviceOptions: [
        "Programmes de formation et renforcement des capacités",
        "Conseil en développement institutionnel",
        "Conseil en protection et sauvegarde",
        "Évaluation externe indépendante de projets",
        "Mise en place de systèmes MEL",
        "Partenariat stratégique institutionnel"
      ],
      messageLabel: "Détails du besoin ou périmètre du projet",
      submitBtn: "Envoyer la demande",
      successMsg: "Merci de nous avoir contactés ! Votre demande a été reçue et notre équipe vous recontactera rapidement."
    },

    
    academy: {
      "navAcademy": "🎓 Académie SHAT",
      "badge": "Académie SHAT pour le Leadership et le Développement Institutionnel",
      "title": "Plateforme de Renforcement des Capacités & d'Excellence Professionnelle",
      "subtitle": "Programmes appliqués de haut niveau pour les acteurs humanitaires et du développement, conformes aux normes internationales (CHS, Sphere, OECD DAC, PSEA).",
      "searchPlaceholder": "Rechercher des programmes et diplômes...",
      "allTracks": "Tous les parcours",
      "tracks": [
            {
                  "id": "all",
                  "name": "All Academic Tracks"
            },
            {
                  "id": "humanitarian",
                  "name": "Humanitarian & Global Standards (CHS & Sphere)"
            },
            {
                  "id": "protection",
                  "name": "Protection & Safeguarding (PSEA & Do No Harm)"
            },
            {
                  "id": "evaluation",
                  "name": "Independent Evaluation & MEL (OECD DAC)"
            },
            {
                  "id": "governance",
                  "name": "Governance & Strategic Leadership"
            },
            {
                  "id": "tot",
                  "name": "Training of Trainers (TOT Professional)"
            },
            {
                  "id": "empowerment",
                  "name": "Women & Youth Empowerment"
            }
      ],
      "stats": {
            "graduates": "+1,450",
            "graduatesLabel": "Certified Graduates & Experts",
            "programs": "24+",
            "programsLabel": "Applied Professional Programs",
            "partners": "50+",
            "partnersLabel": "Partner Institutions & NGOs",
            "satisfaction": "99.2%",
            "satisfactionLabel": "Participant Satisfaction & Impact"
      },
      "courses": [
            {
                  "id": "shat-chs-master",
                  "track": "humanitarian",
                  "trackName": "Humanitarian Sector",
                  "title": "Core Humanitarian Standard (CHS) & Development Response Diploma",
                  "desc": "Advanced program qualifying humanitarian practitioners to implement the Nine Commitments of the CHS and enforce rigorous Accountability to Affected People (AAP).",
                  "duration": "45 Training Hours • 6 Weeks",
                  "level": "Advanced",
                  "format": "Hybrid (Interactive + Case Studies)",
                  "accreditation": "Accredited according to CHS & Sphere",
                  "syllabus": [
                        "Module 1: The Nine Commitments of the Core Humanitarian Standard",
                        "Module 2: Practical AAP Tools and Community Feedback Mechanisms",
                        "Module 3: Needs Assessment and Principled Intervention Design",
                        "Module 4: Real-world Case Simulation and Quality Matrix Audit"
                  ]
            },
            {
                  "id": "shat-psea-expert",
                  "track": "protection",
                  "trackName": "Protection & Safeguarding",
                  "title": "Executive Program in Protection & Safeguarding Consulting (PSEA)",
                  "desc": "Equipping advisors and focal points to build institutional safeguarding policies, conduct sexual exploitation and abuse risk assessments, and establish secure referral pathways.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Executive & Advisory",
                  "format": "Live Virtual + Practical Mentoring",
                  "accreditation": "Aligned with Inter-Agency PSEA Standards & Do No Harm",
                  "syllabus": [
                        "Module 1: Legal and Humanitarian Foundations of Safeguarding",
                        "Module 2: Risk Assessment Architectures and Policy Formulation",
                        "Module 3: Incident Management, Investigation Protocols, and Survivor Protection",
                        "Module 4: Institutional Action Planning and Compliance Auditing"
                  ]
            },
            {
                  "id": "shat-oecd-evaluator",
                  "track": "evaluation",
                  "trackName": "Independent Evaluation",
                  "title": "External Evaluation Specialist: OECD DAC Six Criteria",
                  "desc": "Developing independent evaluators proficient in assessing Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability using mixed-method research and UNEG norms.",
                  "duration": "50 Training Hours • 7 Weeks",
                  "level": "Expert Level",
                  "format": "Hybrid + Supervised Field Evaluation Project",
                  "accreditation": "Accredited under OECD DAC Criteria & UNEG Standards",
                  "syllabus": [
                        "Module 1: The Six OECD DAC Criteria and Strategic Evaluation Questions",
                        "Module 2: Evidence Synthesis, Mixed Methods, and Field Sampling",
                        "Module 3: Formulating Independent Evaluation Reports & Actionable Lessons",
                        "Module 4: Presenting Findings to Donor Boards & Stakeholders"
                  ]
            },
            {
                  "id": "shat-tot-professional",
                  "track": "tot",
                  "trackName": "Training of Trainers",
                  "title": "Professional Training of Trainers for Humanitarian & Development Orgs (TOT)",
                  "desc": "Master competency-based curriculum design, adult experiential learning facilitation (Kolb's cycle), Kirkpatrick outcome evaluation, and AI-assisted educational frameworks.",
                  "duration": "36 Training Hours • 4 Weeks",
                  "level": "Professional Practitioner",
                  "format": "Interactive Studio Workshops & Micro-teaching",
                  "accreditation": "SHAT Certified Professional Facilitator",
                  "syllabus": [
                        "Module 1: Adult Learning Psychology and Experiential Cycles",
                        "Module 2: Competency-based Curriculum and Instructional Architecture",
                        "Module 3: Facilitation Dynamics, Conflict Resolution & Group Management",
                        "Module 4: Capstone: Micro-teaching Delivery with Video Analysis & Feedback"
                  ]
            },
            {
                  "id": "shat-governance-strategy",
                  "track": "governance",
                  "trackName": "Governance & Leadership",
                  "title": "Strategic Governance & Institutional Leadership for Non-Profit Organizations",
                  "desc": "Developing executive governance structures, robust board oversight, organizational change management, and balanced scorecards for resilient civil society entities.",
                  "duration": "32 Training Hours • 4 Weeks",
                  "level": "Executive & Leadership",
                  "format": "Executive Seminars & Case Labs",
                  "accreditation": "Conforms to International Governance Frameworks",
                  "syllabus": [
                        "Module 1: Good Governance Norms, Board Dynamics & Fiduciary Accountability",
                        "Module 2: Strategic Roadmapping, Objective Cascades & Risk Matrices",
                        "Module 3: Designing Balanced Scorecards and Operational KPIs",
                        "Module 4: Transformational Leadership and Change Management"
                  ]
            },
            {
                  "id": "shat-meal-systems",
                  "track": "evaluation",
                  "trackName": "MEAL Systems",
                  "title": "Designing & Managing Integrated MEAL Systems (Monitoring, Evaluation, Accountability & Learning)",
                  "desc": "Architecting end-to-end MEAL architectures, result frameworks, digital indicators, community accountability loops, and organizational knowledge harvesting.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Advanced",
                  "format": "Hands-on with Industry Cloud Toolkits",
                  "accreditation": "Conforms to International Development Standards",
                  "syllabus": [
                        "Module 1: Results Frameworks, LogFrames, and Theory of Change",
                        "Module 2: Performance Monitoring Plans (PMP) & Indicator Tracking",
                        "Module 3: Community Accountability, Complaint Channels & Feedback Loops",
                        "Module 4: Digital Dashboards and Knowledge Harvesting Methodologies"
                  ]
            }
      ],
      "verify": {
            "title": "Official Certificate Verification Portal",
            "subtitle": "Instant real-time verification of credentials, diplomas, and accreditations issued by SHAT Academy.",
            "placeholder": "Enter Certificate Code (e.g., SHAT-2026-CHS-01)",
            "btn": "Verify Credential",
            "testingTip": "Sample verified credentials to test: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, or SHAT-2026-OECD-03",
            "verifiedTitle": "Officially Verified & Authenticated Credential",
            "studentLabel": "Awardee / Graduate Name:",
            "courseLabel": "Academic Program:",
            "dateLabel": "Issuance Date:",
            "gradeLabel": "Evaluation & Distinction:",
            "accreditationLabel": "International Accreditation:",
            "statusActive": "Active & Internationally Recognized",
            "notFound": "No certified record was found for this code. Please verify the code and contact SHAT Academy registry."
      },
      "modal": {
            "enrollTitle": "Inscription au Programme Académique",
            "syllabusTitle": "Programme & Modules de Formation",
            "fullName": "Nom et Prénom",
            "email": "Email Professionnel",
            "phone": "Téléphone / WhatsApp",
            "org": "Organisation / Institution",
            "background": "Parcours et Objectifs d'apprentissage",
            "submitEnroll": "Confirmer l'inscription",
            "successMsg": "Demande d'inscription reçue avec succès ! Notre bureau des admissions vous contactera sous 24h."
      }
},
footer: {
      aboutText: "SHAT Développement & Croissance est un cabinet d'excellence dédié à la formation, au renforcement des capacités et au conseil institutionnel selon les plus hauts standards internationaux.",
      quickLinks: "Navigation rapide",
      legalNotice: "Tous droits réservés © 2026 SHAT Développement & Croissance.",
      privacyPledge: "Engagement strict en matière de confidentialité institutionnelle et de protection des données."
    }
  },

  es: {
    dir: "ltr",
    langName: "Español",
    flag: "🇪🇸",
    companyName: "SHAT Desarrollo & Crecimiento",
    companyShortName: "SHAT",
    companyTagline: "Fortalecer capacidades • Consolidar instituciones • Promover resultados",
    companyMotto: "PERSONAS • HABILIDADES • UN MAÑANA MÁS BRILLANTE",
    pillTraining: "CAPACITACIÓN",
    pillConsulting: "CONSULTORÍA",

    nav: {
      home: "Inicio",
      about: "Sobre SHAT",
      services: "Qué hacemos",
      consulting: "Consultoría especializada y evaluación",
      deliveryModel: "Modelo de entrega",
      approach: "Enfoque profesional",
      references: "Referenciales internacionales y humanitarios",
      expertise: "Áreas de especialización",
      valuePartnerships: "Propuesta de valor y alianzas",
      contact: "Contáctenos",
      requestConsultation: "Solicitar consultoría / formación",
      explorePlatform: "Explorar secciones",
      readMore: "Leer más",
      backHome: "Volver al inicio",
      viewDetails: "Ver detalles",
      close: "Cerrar",
      allSections: "Todas las secciones institucionales",
      downloadProfile: "Descargar perfil corporativo",
    },

    hero: {
      badge: "Socio de confianza en desarrollo institucional y fortalecimiento de capacidades",
      title: "Fortalecer capacidades, consolidar instituciones y promover resultados medibles",
      description: "SHAT Desarrollo & Crecimiento es una firma especializada en capacitación, desarrollo de capacidades, consultoría y fortalecimiento institucional, que colabora con individuos, instituciones y organizaciones para elevar competencias, perfeccionar sistemas organizacionales y maximizar resultados.",
      ctaPrimary: "Conozca nuestros servicios y programas",
      ctaSecondary: "Contáctenos y solicite una asesoría",
      stat1Number: "100%",
      stat1Label: "Adhesión a normas internacionales y humanitarias",
      stat2Number: "8+",
      stat2Label: "Áreas de especialización sectorial",
      stat3Number: "6",
      stat3Label: "Fases del modelo operativo sistemático",
      stat4Number: "5",
      stat4Label: "Idiomas internacionales disponibles",
    },

    homeCards: {
      title: "Secciones y ejes institucionales",
      subtitle: "Explore cada sección temática de la plataforma; cada eje contiene un ecosistema completo de subdisciplinas y servicios.",
    },

    about: {
      title: "Sobre SHAT",
      subtitle: "Identidad, visión, misión y el modelo articulado que vincula el conocimiento con los resultados",
      subsections: {
        whoWeAre: {
          title: "Quiénes somos",
          desc: "SHAT Desarrollo & Crecimiento es una compañía especializada en formación, desarrollo de capacidades, consultoría y desarrollo institucional que acompaña a organizaciones y profesionales para optimizar competencias y sistemas institucionales.",
          bullets: [
            "Socio estratégico para entidades humanitarias, de desarrollo y organizaciones públicas y privadas.",
            "Equipo multidisciplinario de consultores certificados internacionalmente con vasta experiencia en terreno.",
            "Metodologías formativas y de asesoría adaptables a entornos operativos complejos y sensibles."
          ]
        },
        methodology: {
          title: "Metodología de intervención",
          desc: "SHAT ofrece sus servicios mediante metodologías basadas en evidencia, aprendizaje por competencias, diagnóstico organizacional, evaluación rigurosa y mejora continua fundamentadas en estándares internacionales."
        },
        philosophy: {
          title: "Filosofía SHAT y modelo de impacto",
          desc: "La filosofía de SHAT une Conocimiento, Capacidad, Práctica y Resultados — trascendiendo la transferencia teórica para consolidar destrezas prácticas y un desempeño medible en cada programa.",
          flow: [
            { step: "Conocimiento", detail: "Incorporación de marcos conceptuales y herramientas metodológicas avanzadas." },
            { step: "Capacidad", detail: "Desarrollo de competencias técnicas y operativas prácticas para los equipos." },
            { step: "Práctica", detail: "Aplicación rigurosa de estándares, protocolos y políticas en el terreno." },
            { step: "Desempeño", detail: "Optimización de la eficiencia operativa y de la calidad de las intervenciones." },
            { step: "Resultados", detail: "Generación de impacto tangible, verificable y sostenible para las comunidades." }
          ]
        },
        identity: {
          title: "Identidad y cultura institucional",
          desc: "Nuestra identidad combina rigor analítico y los más altos estándares éticos, fomentando una cultura de aprendizaje continuo y responsabilidad social compartida."
        }
      }
    },

    services: {
      title: "Qué hacemos",
      subtitle: "Soluciones integradas de capacitación, fortalecimiento de capacidades y desarrollo organizacional",
      subsections: {
        training: {
          title: "Capacitación y desarrollo de capacidades",
          summary: "SHAT diseña e implementa programas de formación especializados, vivenciales y orientados a competencias, conectando directamente los aprendizajes con el desempeño real en el puesto de trabajo.",
          pillars: [
            { name: "Diagnóstico de necesidades de capacitación (DNC)", detail: "Investigación rigurosa en terreno para identificar brechas de habilidades específicas." },
            { name: "Aprendizaje basado en competencias", detail: "Enfoque en capacidades funcionales aplicadas en lugar de instrucción puramente teórica." },
            { name: "Diseño curricular y de programas", detail: "Creación de mallas formativas acordes con los estándares pedagógicos mundiales." },
            { name: "Aprendizaje práctico y vivencial", detail: "Simulaciones operativas, talleres interactivos y análisis de casos reales." },
            { name: "Formación de formadores (TOT)", detail: "Capacitación de líderes internos para multiplicar el conocimiento dentro de su institución." },
            { name: "Fortalecimiento de capacidades institucionales", detail: "Planes integrales que incrementan la resiliencia y adaptabilidad organizacional." },
            { name: "Evaluación del impacto del aprendizaje", detail: "Uso de métricas contrastadas para medir la evolución del rendimiento profesional." }
          ]
        },
        consulting: {
          title: "Consultoría y desarrollo institucional",
          summary: "Apoyamos a las organizaciones en el diagnóstico de su situación, la estructuración de sistemas, la elaboración de políticas y la optimización del rendimiento. Nuestra consultoría transita del diagnóstico a la solución, de la recomendación a la práctica, y de la práctica a la mejora continua.",
          pillars: [
            { name: "Diagnóstico y evaluación institucional", detail: "Evaluación integral de estructuras, flujos de trabajo y cultura organizacional." },
            { name: "Planificación estratégica", detail: "Diseño de planes estratégicos viables y hojas de ruta operativas claras." },
            { name: "Desarrollo organizacional", detail: "Reingeniería de procesos y adecuación de organigramas institucionales." },
            { name: "Políticas, procedimientos y normativas (SOP)", detail: "Redacción de manuales operativos y protocolos de gestión interna." },
            { name: "Gestión de proyectos y programas", detail: "Gobernanza del ciclo de proyectos humanitarios y de desarrollo sostenible." },
            { name: "Gestión del talento y desarrollo humano", detail: "Sistemas de evaluación del desempeño y planes de retención del talento clave." },
            { name: "Calidad y optimización del rendimiento", detail: "Implementación de modelos de calidad para eliminar ineficiencias operativas." },
            { name: "Sistemas de monitoreo, evaluación y aprendizaje (MEL)", detail: "Diseño de plataformas MEL automatizadas y cuadros de mando orientados a evidencia." }
          ]
        }
      }
    },

    consultingSec: {
      title: "Consultoría especializada y evaluación",
      subtitle: "Asesoría avanzada en salvaguardia, protección de derechos y evaluaciones independientes",
      subsections: {
        protection: {
          title: "Consultoría en protección y salvaguardia",
          desc: "SHAT apoya a las organizaciones en el desarrollo de políticas de protección, análisis de riesgos de salvaguardia, fortalecimiento de mecanismos de prevención y respuesta, vías seguras de denuncia y buenas prácticas de cuidado institucional.",
          principles: "Esta área se rige por los derechos humanos, el principio de No Hacer Daño (Do No Harm), la rendición de cuentas, la inclusión, la confidencialidad y la prevención de la explotación y abusos sexuales (PEAS).",
          items: [
            "Políticas de salvaguardia institucional para la infancia y colectivos vulnerables.",
            "Matrices de evaluación de riesgos de protección y planes de mitigación.",
            "Canales de denuncia seguros, protocolos de quejas y mecanismos confidenciales de derivación.",
            "Capacitación en códigos de conducta y ética profesional para el personal operativo."
          ]
        },
        evaluation: {
          title: "Evaluación externa independiente",
          desc: "SHAT efectúa evaluaciones independientes y objetivas de programas y proyectos mediante enfoques cuantitativos y cualitativos contrastados. Buscamos generar evidencia confiable, capitalizar lecciones aprendidas y fortalecer la toma de decisiones estratégicas.",
          criteriaTitle: "Criterios internacionales de evaluación del CAD de la OCDE:",
          criteria: [
            { name: "Pertinencia", desc: "Coherencia de los objetivos del proyecto con las prioridades de los beneficiarios y el contexto." },
            { name: "Coherencia", desc: "Grado de complementariedad con otras políticas e intervenciones afines del sector." },
            { name: "Eficacia", desc: "Nivel de cumplimiento de los objetivos y resultados previstos en el plan." },
            { name: "Eficiencia", desc: "Aprovechamiento idóneo y económico de los recursos asignados para maximizar resultados." },
            { name: "Impacto", desc: "Efectos a largo plazo, positivos o negativos, intencionales o no, en la comunidad." },
            { name: "Sostenibilidad", desc: "Permanencia de los efectos positivos tras la finalización de los recursos externos." }
          ]
        }
      }
    },

    deliveryModel: {
      title: "Modelo de entrega",
      subtitle: "Un itinerario de 6 fases sistemáticas para transformar las necesidades en resultados",
      slogan: "From Needs to Results — De las necesidades a los resultados",
      intro: "SHAT implementa un modelo de trabajo estructurado que garantiza precisión contextual, sinergia entre actores y resultados medibles en cada proyecto.",
      stages: [
        {
          name: "Comprender",
          en: "Understand",
          desc: "Inmersión rigurosa en el entorno, mapeo de actores clave y comprensión de retos institucionales."
        },
        {
          name: "Diagnosticar",
          en: "Assess",
          desc: "Evaluación metódica para identificar la brecha entre la situación actual y los objetivos deseados."
        },
        {
          name: "Diseñar",
          en: "Design",
          desc: "Co-creación de soluciones de consultoría y programas de capacitación a la medida de la entidad."
        },
        {
          name: "Implementar",
          en: "Deliver",
          desc: "Ejecución con altos estándares de calidad y transferencia efectiva de competencias a los equipos."
        },
        {
          name: "Medir",
          en: "Measure",
          desc: "Evaluación cuantitativa y cualitativa de los resultados obtenidos respecto a las metas trazadas."
        },
        {
          name: "Aprender y mejorar",
          en: "Learn & Improve",
          desc: "Sistematización de aprendizajes, retroalimentación y establecimiento de mejoras institucionales sostenibles."
        }
      ]
    },

    approach: {
      title: "Enfoque profesional",
      subtitle: "Principios fundacionales y valores institucionales que orientan los servicios de SHAT",
      intro: "Nuestras intervenciones se cimientan en directrices de excelencia e integridad profesional:",
      pillars: [
        {
          title: "Práctica basada en evidencia",
          en: "Evidence-Based Practice",
          desc: "Sustento en datos rigurosos y análisis contrastados para fundamentar cada recomendación."
        },
        {
          title: "Desarrollo basado en competencias",
          en: "Competency-Based Development",
          desc: "Desarrollo de habilidades prácticas que incrementan de inmediato el rendimiento operativo."
        },
        {
          title: "Enfoque basado en derechos humanos",
          en: "Human Rights-Based Approach",
          desc: "Reconocimiento y garantía irrestricta de la dignidad y los derechos fundamentales de las personas."
        },
        {
          title: "No hacer daño (Do No Harm)",
          en: "Do No Harm",
          desc: "Previsión exhaustiva para garantizar que ninguna acción genere perjuicios involuntarios."
        },
        {
          title: "Rendición de cuentas",
          en: "Accountability",
          desc: "Compromiso absoluto de transparencia y responsabilidad ante clientes y comunidades."
        },
        {
          title: "Inclusión y no discriminación",
          en: "Inclusion & Non-Discrimination",
          desc: "Garantía de participación equitativa y sin exclusiones de ninguna naturaleza."
        },
        {
          title: "Salvaguardia y protección",
          en: "Safeguarding & Protection",
          desc: "Entornos de trabajo seguros y exentos de cualquier abuso, maltrato o vulneración."
        },
        {
          title: "Práctica ética",
          en: "Ethical Practice",
          desc: "Estricta adhesión a la independencia profesional, la objetividad y la honestidad intelectual."
        },
        {
          title: "Confidencialidad y custodia de datos",
          en: "Confidentiality & Data Protection",
          desc: "Protocolos avanzados de seguridad para salvaguardar la información sensible institucional."
        },
        {
          title: "Calidad y mejora continua",
          en: "Quality & Continuous Improvement",
          desc: "Búsqueda incansable de la excelencia y adopción de mejores prácticas internacionales."
        }
      ]
    },

    references: {
      title: "Referenciales internacionales y humanitarios",
      subtitle: "Marcos, tratados y estándares universales que guían la actuación técnica de SHAT",
      intro: "Conforme a los requerimientos de cada intervención, SHAT incorpora directrices de los principales referentes mundiales:",
      standards: [
        {
          code: "CHS",
          title: "Norma Humanitaria Esencial de Calidad y Rendición de Cuentas",
          en: "Core Humanitarian Standard",
          desc: "Referente global que define los compromisos para una ayuda humanitaria ética y eficiente."
        },
        {
          code: "SPHERE",
          title: "Manual Esfera y Estándares Mínimos Humanitarios",
          en: "Sphere Handbook",
          desc: "Carta humanitaria y normas operativas mínimas para intervenciones humanitarias de emergencia."
        },
        {
          code: "OECD DAC",
          title: "Criterios de evaluación del CAD de la OCDE",
          en: "OECD DAC Evaluation Criteria",
          desc: "Parámetros globales para dictaminar la pertinencia, eficacia e impacto de proyectos de cooperación."
        },
        {
          code: "UNEG",
          title: "Normas y estándares del Grupo de Evaluación de la ONU",
          en: "UN Evaluation Group",
          desc: "Pautas deontológicas que garantizan la independencia y rigor de las evaluaciones del sistema de la ONU."
        },
        {
          code: "HRBA",
          title: "Enfoque Basado en Derechos Humanos",
          en: "Human Rights-Based Approach",
          desc: "Integración de tratados internacionales de derechos humanos en la planificación y desarrollo social."
        },
        {
          code: "AAP",
          title: "Rendición de Cuentas a las Poblaciones Afectadas",
          en: "Accountability to Affected People",
          desc: "Mecanismos para garantizar que las comunidades influyan en las decisiones que les atañen."
        },
        {
          code: "Protection",
          title: "Transversalización de la protección",
          en: "Protection Mainstreaming",
          desc: "Incorporación de la seguridad, dignidad y acceso no discriminatorio en todas las áreas asistenciales."
        },
        {
          code: "PSEA",
          title: "Protección contra la explotación y abusos sexuales",
          en: "PSEA Frameworks",
          desc: "Sistemas institucionales de cero tolerancia y protocolos rigurosos de prevención e investigación."
        },
        {
          code: "CRC",
          title: "Convención sobre los Derechos del Niño",
          en: "Convention on the Rights of the Child",
          desc: "Tratado internacional que tutela el bienestar integral y la protección de la infancia."
        },
        {
          code: "CEDAW",
          title: "Convención sobre la Eliminación de la Discriminación contra la Mujer",
          en: "CEDAW Convention",
          desc: "Compendio internacional que promueve la equidad de género y los derechos de las mujeres."
        }
      ]
    },

    expertise: {
      title: "Áreas de especialización",
      subtitle: "Sectores estratégicos donde SHAT ofrece capacitación, consultoría y evaluación",
      sectors: [
        {
          name: "Acción humanitaria",
          en: "Humanitarian Action",
          icon: "heart-handshake",
          desc: "Gestión de emergencias, coordinación interagencial, respuesta rápida y estándares humanitarios."
        },
        {
          name: "Protección y salvaguardia",
          en: "Protection & Safeguarding",
          icon: "shield-check",
          desc: "Protección infantil, mitigación de violencia basada en género (VBG), y cumplimiento de salvaguardias."
        },
        {
          name: "Desarrollo de la mujer y la infancia",
          en: "Women & Child Development",
          icon: "sparkles",
          desc: "Empoderamiento socioeconómico femenino, desarrollo de la primera infancia y derechos de las familias."
        },
        {
          name: "Desarrollo y empoderamiento juvenil",
          en: "Youth Development & Empowerment",
          icon: "users",
          desc: "Emprendimiento social, liderazgo juvenil, inserción laboral e iniciativas cívicas."
        },
        {
          name: "Educación y formación docente",
          en: "Education & Teacher Development",
          icon: "graduation-cap",
          desc: "Ingeniería pedagógica, Educación en Situaciones de Emergencia (EiE) y profesionalización docente."
        },
        {
          name: "Medios y comunicación estratégica",
          en: "Media & Communication",
          icon: "radio",
          desc: "Campañas de incidencia y visibilidad, gestión de la reputación institucional y comunicación pública."
        },
        {
          name: "Desarrollo institucional",
          en: "Institutional Development",
          icon: "building-2",
          desc: "Gobernanza corporativa, gestión del cambio, modernización operativa y sostenibilidad directiva."
        },
        {
          name: "Monitoreo, evaluación y aprendizaje (MEL)",
          en: "Monitoring, Evaluation & Learning",
          icon: "line-chart",
          desc: "Diseño de marcos MEL, levantamiento de líneas de base y evaluaciones rigurosas de impacto."
        }
      ]
    },

    valuePartnerships: {
      title: "Propuesta de valor y alianzas",
      subtitle: "Nuestro diferencial estratégico como aliado de desarrollo enfocado en resultados",
      valuePropsTitle: "Nuestros cinco pilares de valor",
      values: [
        {
          title: "Capacidades",
          en: "Capacity",
          slogan: "Construimos conocimiento y competencias.",
          desc: "Potenciamos el capital humano transformando el saber en capacidades operativas duraderas."
        },
        {
          title: "Sistemas",
          en: "Systems",
          slogan: "Consolidamos sistemas y prácticas institucionales.",
          desc: "Diseñamos procedimientos internos que aportan seguridad, continuidad y cumplimiento normativo."
        },
        {
          title: "Evidencia",
          en: "Evidence",
          slogan: "Convertimos los datos en conocimiento accionable.",
          desc: "Utilizamos análisis de campo precisos para sustentar decisiones estratégicas inteligentes."
        },
        {
          title: "Desempeño",
          en: "Performance",
          slogan: "Conectamos el desarrollo directamente con el desempeño.",
          desc: "Elevamos la calidad del trabajo diario y la productividad de los equipos."
        },
        {
          title: "Resultados",
          en: "Results",
          slogan: "Priorizamos el impacto verificable y la mejora continua.",
          desc: "Alcanzamos mejoras tangibles que inciden en el éxito institucional y el bienestar comunitario."
        }
      ],
      positioningTitle: "Nuestro posicionamiento institucional",
      positioningLead: "SHAT es más que un proveedor de capacitación: es un socio para el fortalecimiento de capacidades y la transformación institucional.",
      positioningBody: "Creemos que la capacitación más valiosa es aquella que genera capacidades prácticas; que la consultoría efectiva transita del análisis a las soluciones viables; y que una evaluación auténtica transforma los hallazgos en aprendizaje continuo y decisiones acertadas.",
      commitmentTitle: "Nuestro compromiso institucional",
      commitmentBody: "Garantizamos servicios de alta calidad basados en evidencia contrastada y metodologías transparentes, manteniendo absoluta independencia profesional, estricta confidencialidad y enfoque constante en resultados medibles.",
      partnerCtaTitle: "¿Listo para consolidar una alianza estratégica transformadora?",
      partnerCtaDesc: "Póngase en contacto hoy mismo con nuestro equipo directivo para coordinar soluciones a la medida de su institución."
    },

    contact: {
      title: "Contáctenos",
      subtitle: "Comuníquese con nuestros consultores para coordinar iniciativas formativas y de asesoría",
      infoTitle: "Información de contacto institucional",
      emailLabel: "Correo corporativo",
      emailValue: "info@shatgrowth.com",
      phoneLabel: "Teléfono y WhatsApp directo",
      phoneValue: "+966 50 000 0000",
      websiteLabel: "Sitio web corporativo",
      websiteValue: "www.shatgrowth.com",
      addressLabel: "Sede central",
      addressValue: "Reino de Arabia Saudita / Oficinas regionales internacionales",
      formTitle: "Solicitud de consultoría o programa de capacitación",
      formSubtitle: "Complete el formulario y nuestro equipo directivo le responderá en un plazo máximo de 24 horas hábiles.",
      nameLabel: "Nombre completo",
      emailInputLabel: "Correo profesional",
      orgLabel: "Organización / Institución",
      phoneInputLabel: "Teléfono / WhatsApp",
      serviceTypeLabel: "Servicio de interés",
      serviceOptions: [
        "Programas de capacitación y desarrollo de capacidades",
        "Consultoría y desarrollo institucional",
        "Asesoría en protección y salvaguardia",
        "Evaluación externa independiente de proyectos",
        "Diseño de sistemas MEL (Monitoreo y Evaluación)",
        "Alianza estratégica institucional"
      ],
      messageLabel: "Alcance del proyecto o necesidades específicas",
      submitBtn: "Enviar solicitud",
      successMsg: "¡Gracias por contactarnos! Hemos recibido su solicitud y nuestro equipo le responderá a la brevedad."
    },

    footer: {
      aboutText: "SHAT Desarrollo & Crecimiento es una entidad referente en capacitación, desarrollo de capacidades y asesoría institucional conforme a los más altos estándares mundiales.",
      quickLinks: "Enlaces rápidos",
      legalNotice: "Todos los derechos reservados © 2026 SHAT Desarrollo & Crecimiento.",
      privacyPledge: "Compromiso irrestricto de confidencialidad institucional y resguardo de datos corporativos."
    }
  },

  it: {
    dir: "ltr",
    langName: "Italiano",
    flag: "🇮🇹",
    companyName: "SHAT Sviluppo & Crescita",
    companyShortName: "SHAT",
    companyTagline: "Costruire capacità • Rafforzare le istituzioni • Sviluppare i risultati",
    companyMotto: "PERSONE • COMPETENZE • UN DOMANI PIÙ LUMINOSO",
    pillTraining: "FORMAZIONE",
    pillConsulting: "CONSULENZA",

    nav: {
      academy: "🎓 Accademia SHAT",
      home: "Home",
      about: "Chi siamo",
      services: "Cosa facciamo",
      consulting: "Consulenza specialistica e valutazione",
      deliveryModel: "Modello operativo",
      approach: "Approccio professionale",
      references: "Riferimenti internazionali e umanitari",
      expertise: "Aree di competenza",
      valuePartnerships: "Proposta di valore e partnership",
      contact: "Contattaci",
      requestConsultation: "Richiedi consulenza / formazione",
      explorePlatform: "Esplora le sezioni",
      readMore: "Scopri di più",
      backHome: "Torna alla Home",
      viewDetails: "Visualizza dettagli",
      close: "Chiudi",
      allSections: "Tutte le sezioni istituzionali",
      downloadProfile: "Scarica profilo aziendale",
    },

    hero: {
      badge: "Partner di fiducia nello sviluppo istituzionale e nel potenziamento delle capacità",
      title: "Costruire capacità, rafforzare le istituzioni, generare risultati misurabili",
      description: "SHAT Sviluppo & Crescita è una società specializzata in formazione, capacity building, consulenza e sviluppo istituzionale. Collabora con individui, istituzioni e organizzazioni per potenziare le competenze, ottimizzare i sistemi e conseguire risultati ad alto impatto.",
      ctaPrimary: "Scopri i nostri servizi e programmi",
      ctaSecondary: "Contattaci per una consulenza",
      stat1Number: "100%",
      stat1Label: "Adesione ai più elevati standard internazionali",
      stat2Number: "8+",
      stat2Label: "Ambiti di competenza settoriale",
      stat3Number: "6",
      stat3Label: "Fasi del modello d'intervento metodico",
      stat4Number: "5",
      stat4Label: "Lingue internazionali supportate",
    },

    homeCards: {
      title: "Sezioni e pilastri istituzionali",
      subtitle: "Esplora ogni sezione specialistica della piattaforma; ciascuna include un articolato sistema di sotto-ambiti e servizi integrati.",
    },

    about: {
      title: "Chi siamo",
      subtitle: "Identità, visione, missione e il modello integrato che unisce conoscenza, performance e risultati",
      subsections: {
        whoWeAre: {
          title: "Chi siamo",
          desc: "SHAT Sviluppo & Crescita è un'organizzazione specializzata nella formazione, nel potenziamento delle capacità e nella consulenza manageriale che affianca organizzazioni umanitarie, governative e private nel perfezionare processi e competenze.",
          bullets: [
            "Partner strategico per istituzioni di cooperazione internazionale, enti pubblici e settore privato.",
            "Team multidisciplinare di esperti certificati a livello internazionale con comprovata esperienza sul campo.",
            "Metodologie flessibili e orientate al contesto, in grado di operare efficacemente in ambienti operativi complessi."
          ]
        },
        methodology: {
          title: "Metodologia d'intervento",
          desc: "SHAT fornisce servizi basati su evidenze scientifiche, apprendimento per competenze, diagnosi organizzativa, valutazione sistematica e miglioramento continuo guidati da standard e principi internazionali."
        },
        philosophy: {
          title: "Filosofia SHAT e modello d'impatto",
          desc: "La visione di SHAT collega Conoscenza, Capacità, Pratica e Risultati: superare il mero trasferimento teorico per consolidare capacità operative e prestazioni misurabili nel tempo.",
          flow: [
            { step: "Conoscenza", detail: "Acquisizione di quadri teorici avanzati e strumenti metodologici solidi." },
            { step: "Capacità", detail: "Sviluppo di prontezza operativa e abilità pratiche per i team." },
            { step: "Pratica", detail: "Applicazione puntuale di protocolli, politiche e procedure sul campo." },
            { step: "Performance", detail: "Innalzamento dell'efficienza dei processi e della qualità dei programmi." },
            { step: "Risultati", detail: "Raggiungimento di cambiamenti tangibili, misurabili e sostenibili." }
          ]
        },
        identity: {
          title: "Identità e cultura istituzionale",
          desc: "La nostra identità coniuga rigore scientifico e i più stringenti principi etici, promuovendo una cultura aziendale volta al miglioramento costante e alla responsabilità sociale."
        }
      }
    },

    services: {
      title: "Cosa facciamo",
      subtitle: "Un ecosistema integrato di formazione specialistica, potenziamento delle capacità e consulenza",
      subsections: {
        training: {
          title: "Formazione e potenziamento delle capacità",
          summary: "SHAT realizza percorsi formativi specialistici, pratici e orientati alle competenze, progettati per accrescere conoscenze e comportamenti professionali collegandoli alle performance reali.",
          pillars: [
            { name: "Analisi dei fabbisogni formativi (TNA)", detail: "Indagine approfondita per individuare le reali lacune di competenza prima di progettare i moduli." },
            { name: "Apprendimento basato sulle competenze", detail: "Focus su abilità operative concrete rispetto a nozioni meramente astratte." },
            { name: "Progettazione didattica e curricula", detail: "Elaborazione di piani formativi conformi ai moderni standard pedagogici internazionali." },
            { name: "Apprendimento esperienziale e pratico", detail: "Simulazioni sul campo, workshop partecipativi e casi di studio reali." },
            { name: "Formazione formatori (TOT)", detail: "Qualificazione di esperti interni capaci di trasferire e moltiplicare le competenze." },
            { name: "Sviluppo delle capacità istituzionali", detail: "Percorsi strategici per rafforzare la resilienza e l'adattabilità della struttura." },
            { name: "Valutazione dell'apprendimento e impatto", detail: "Utilizzo di modelli analitici per verificare l'effettivo impatto del percorso formativo." }
          ]
        },
        consulting: {
          title: "Consulenza e sviluppo istituzionale",
          summary: "Assistiamo le organizzazioni nella comprensione delle dinamiche interne, nell'elaborazione di politiche strutturate e nel potenziamento della qualità dei programmi. La nostra consulenza si evolve dall'analisi alla soluzione, dalla raccomandazione alla pratica, e dalla pratica al miglioramento continuo.",
          pillars: [
            { name: "Diagnosi e audit istituzionale", detail: "Esame approfondito dell'organigramma, dei flussi di lavoro e del clima organizzativo." },
            { name: "Pianificazione strategica", detail: "Definizione di piani strategici realistici e tabelle di marcia esecutive." },
            { name: "Sviluppo organizzativo", detail: "Riorganizzazione delle mansioni e ottimizzazione delle strutture interne per favorire la crescita." },
            { name: "Politiche, procedure e sistemi (SOP)", detail: "Stesura di manuali di governance e procedure operative standardizzate." },
            { name: "Project e programme management", detail: "Gestione del ciclo di vita di progetti umanitari e di sviluppo internazionale." },
            { name: "Gestione delle risorse umane e dei talenti", detail: "Implementazione di sistemi di valutazione delle prestazioni e percorsi di carriera." },
            { name: "Miglioramento delle prestazioni e qualità", detail: "Adozione di criteri di Total Quality per eliminare le inefficienze." },
            { name: "Sistemi di monitoraggio, valutazione e apprendimento (MEL)", detail: "Sviluppo di piattaforme MEL avanzate con indicatori KPI guidati da evidenze." }
          ]
        }
      }
    },

    consultingSec: {
      title: "Consulenza specialistica e valutazione",
      subtitle: "Consulenza avanzata in salvaguardia, protezione dei diritti e valutazioni esterne indipendenti",
      subsections: {
        protection: {
          title: "Consulenza in protezione e salvaguardia",
          desc: "SHAT affianca gli enti nella definizione di politiche di protezione, analisi dei rischi di salvaguardia, consolidamento dei sistemi di risposta preventiva, canali confidenziali di segnalazione e pratiche operative sicure.",
          principles: "Quest'area si fonda sui diritti umani, sul principio Do No Harm (non arrecare danno), sulla trasparenza, sull'inclusione e sulla prevenzione da abusi e sfruttamento sessuale (PSEA).",
          items: [
            "Formulazione di policy di salvaguardia per minori e soggetti a rischio.",
            "Valutazione dei rischi e piani istituzionali di mitigazione preventiva.",
            "Canali sicuri di segnalazione, gestione reclami e percorsi confidenziali di tutela.",
            "Corsi su codice di condotta ed etica deontologica per il personale sul campo."
          ]
        },
        evaluation: {
          title: "Valutazione esterna indipendente",
          desc: "SHAT conduce valutazioni indipendenti e terze di programmi e progetti mediante approcci quantitativi e qualitativi consolidati, con lo scopo di generare evidenze affidabili, trarre lezioni apprese e migliorare le decisioni future.",
          criteriaTitle: "Criteri di valutazione internazionali OCSE DAC:",
          criteria: [
            { name: "Pertinenza", desc: "Coerenza tra gli obiettivi perseguiti e i reali fabbisogni della comunità locale." },
            { name: "Coerenza", desc: "Armonizzazione e sinergia con altre politiche o interventi affini nel settore." },
            { name: "Efficacia", desc: "Misura in cui sono stati conseguiti gli obiettivi prefissati nel programma." },
            { name: "Efficienza", desc: "Impiego economico e tempestivo delle risorse per massimizzare gli output." },
            { name: "Impatto", desc: "Cambiamenti a lungo termine, positivi o negativi, generati dal progetto." },
            { name: "Sostenibilità", desc: "Capacità dei benefici di perdurare dopo il termine del supporto finanziario." }
          ]
        }
      }
    },

    deliveryModel: {
      title: "Modello operativo",
      subtitle: "Un percorso sistematico in 6 fasi operative per tradurre i bisogni in risultati tangibili",
      slogan: "From Needs to Results — Dai bisogni ai risultati",
      intro: "SHAT adotta un modello operativo agile e rigoroso che assicura precisione d'intervento, piena integrazione dei partner e risultati misurabili.",
      stages: [
        {
          name: "Comprendere",
          en: "Understand",
          desc: "Comprensione del contesto di riferimento, mappatura dei portatori d'interesse e delle sfide istituzionali."
        },
        {
          name: "Diagnosticare",
          en: "Assess",
          desc: "Valutazione analitica per identificare il divario tra la condizione attuale e gli obiettivi strategici."
        },
        {
          name: "Progettare",
          en: "Design",
          desc: "Co-progettazione di soluzioni di consulenza o piani formativi su misura per le esigenze del cliente."
        },
        {
          name: "Attuare",
          en: "Deliver",
          desc: "Esecuzione qualificata delle attività con reale trasferimento di competenze operative ai team interni."
        },
        {
          name: "Misurare",
          en: "Measure",
          desc: "Monitoraggio stringente tramite indicatori di performance per comprovare l'efficacia dei risultati."
        },
        {
          name: "Apprendere e migliorare",
          en: "Learn & Improve",
          desc: "Condivisione degli apprendimenti, restituzione dei feedback e integrazione di prassi virtuose durature."
        }
      ]
    },

    approach: {
      title: "Approccio professionale",
      subtitle: "Principi cardine e standard di condotta che ispirano ogni intervento progettato da SHAT",
      intro: "La nostra prassi professionale è orientata da valori imprescindibili che ne garantiscono l'eccellenza:",
      pillars: [
        {
          title: "Pratica fondata su evidenze",
          en: "Evidence-Based Practice",
          desc: "Adozione esclusiva di dati comprovati e analisi rigorose a supporto di ogni decisione."
        },
        {
          title: "Sviluppo per competenze",
          en: "Competency-Based Development",
          desc: "Perfezionamento di competenze applicate capaci di incidere sul rendimento operativo."
        },
        {
          title: "Approccio basato sui diritti umani",
          en: "Human Rights-Based Approach",
          desc: "Tutela assoluta della dignità e dei diritti universali di ogni singola persona."
        },
        {
          title: "Non arrecare danno (Do No Harm)",
          en: "Do No Harm",
          desc: "Valutazione preventiva per evitare qualsiasi effetto avverso o collaterale non desiderato."
        },
        {
          title: "Responsabilità e trasparenza",
          en: "Accountability",
          desc: "Massima trasparenza e integrità nei confronti di partner, committenti e beneficiari."
        },
        {
          title: "Inclusione e non discriminazione",
          en: "Inclusion & Non-Discrimination",
          desc: "Pari opportunità di accesso e partecipazione attiva per tutti i soggetti coinvolti."
        },
        {
          title: "Salvaguardia e protezione",
          en: "Safeguarding & Protection",
          desc: "Creazione di contesti protetti, privi di rischi di abusi, molestie o condotte inappropriate."
        },
        {
          title: "Etica professionale",
          en: "Ethical Practice",
          desc: "Fiducia, neutralità e totale indipendenza intellettuale nello svolgimento degli incarichi."
        },
        {
          title: "Riservatezza e tutela dei dati",
          en: "Confidentiality & Data Protection",
          desc: "Adozione delle più severe procedure di protezione delle informazioni e dei dati sensibili."
        },
        {
          title: "Qualità e miglioramento continuo",
          en: "Quality & Continuous Improvement",
          desc: "Costante aggiornamento professionale e adesione alle pratiche internazionali più innovative."
        }
      ]
    },

    references: {
      title: "Riferimenti internazionali e umanitari",
      subtitle: "Norme, convenzioni e standard mondiali che orientano le valutazioni e la consulenza di SHAT",
      intro: "In relazione agli obiettivi operativi, SHAT assume a riferimento i più autorevoli standard internazionali:",
      standards: [
        {
          code: "CHS",
          title: "Standard Umanitario Fondamentale di Qualità e Responsabilità",
          en: "Core Humanitarian Standard",
          desc: "Accordo globale che fissa gli impegni per interventi umanitari responsabili ed efficienti."
        },
        {
          code: "SPHERE",
          title: "Standard Minimi del Manuale Sphere",
          en: "Sphere Handbook",
          desc: "Carta universale e parametri tecnici essenziali per gli aiuti umanitari salvavita."
        },
        {
          code: "OECD DAC",
          title: "Criteri di valutazione OCSE DAC",
          en: "OECD DAC Evaluation Criteria",
          desc: "Punto di riferimento globale per valutare l'efficacia e l'impatto dei programmi di cooperazione."
        },
        {
          code: "UNEG",
          title: "Norme e standard del Gruppo di Valutazione dell'ONU",
          en: "UN Evaluation Group",
          desc: "Principi professionali che garantiscono terzietà e credibilità alle valutazioni delle Nazioni Unite."
        },
        {
          code: "HRBA",
          title: "Approccio basato sui Diritti Umani",
          en: "Human Rights-Based Approach",
          desc: "Integrazione delle convenzioni internazionali sui diritti umani nella pianificazione dello sviluppo."
        },
        {
          code: "AAP",
          title: "Responsabilità verso le Popolazioni Coinvolte",
          en: "Accountability to Affected People",
          desc: "Canali strutturati per coinvolgere le comunità nelle scelte programmatiche che le riguardano."
        },
        {
          code: "Protection",
          title: "Integrazione trasversale della protezione",
          en: "Protection Mainstreaming",
          desc: "Tutela di sicurezza, dignità e pari accesso in qualsiasi iniziativa d'assistenza settoriale."
        },
        {
          code: "PSEA",
          title: "Protezione da sfruttamento e abusi sessuali",
          en: "PSEA Frameworks",
          desc: "Policy di tolleranza zero con rigorosi protocolli di prevenzione e indagine interna."
        },
        {
          code: "CRC",
          title: "Convenzione sui Diritti dell'Infanzia",
          en: "Convention on the Rights of the Child",
          desc: "Trattato internazionale per la tutela, lo sviluppo armonioso e la protezione dei minori."
        },
        {
          code: "CEDAW",
          title: "Convenzione sull'eliminazione di ogni forma di discriminazione contro le donne",
          en: "CEDAW Convention",
          desc: "Strumento internazionale volto a garantire la parità di genere e l'uguaglianza delle opportunità."
        }
      ]
    },

    expertise: {
      title: "Aree di competenza",
      subtitle: "Settori strategici in cui SHAT realizza programmi di formazione, consulenza e valutazione",
      sectors: [
        {
          name: "Azione umanitaria",
          en: "Humanitarian Action",
          icon: "heart-handshake",
          desc: "Gestione delle crisi, coordinamento degli aiuti, logistica dei rifugi ed emergenze complesse."
        },
        {
          name: "Protezione e salvaguardia",
          en: "Protection & Safeguarding",
          icon: "shield-check",
          desc: "Protezione dei minori, prevenzione della violenza di genere (GBV) e audit di salvaguardia."
        },
        {
          name: "Sviluppo di donne e infanzia",
          en: "Women & Child Development",
          icon: "sparkles",
          desc: "Empowerment socio-economico, sviluppo della prima infanzia e programmi educativi dedicati."
        },
        {
          name: "Sviluppo e protagonismo giovanile",
          en: "Youth Development & Empowerment",
          icon: "users",
          desc: "Imprenditoria a vocazione sociale, accademie di leadership giovanile e inserimento al lavoro."
        },
        {
          name: "Istruzione e formazione docenti",
          en: "Education & Teacher Development",
          icon: "graduation-cap",
          desc: "Ingegneria della formazione, istruzione in emergenza (EiE) e innovazione didattica."
        },
        {
          name: "Media e comunicazione strategica",
          en: "Media & Communication",
          icon: "radio",
          desc: "Campagne di advocacy, gestione della reputazione, storytelling istituzionale e public relations."
        },
        {
          name: "Sviluppo istituzionale",
          en: "Institutional Development",
          icon: "building-2",
          desc: "Governance, gestione del cambiamento, digitalizzazione e ottimizzazione organizzativa."
        },
        {
          name: "Monitoraggio, valutazione e apprendimento (MEL)",
          en: "Monitoring, Evaluation & Learning",
          icon: "line-chart",
          desc: "Progettazione di sistemi MEL, raccolta dati digitalizzata e valutazioni d'impatto rigorose."
        }
      ]
    },

    valuePartnerships: {
      title: "Proposta di valore e partnership",
      subtitle: "Il nostro valore differenziale quale partner di sviluppo orientato a risultati concreti",
      valuePropsTitle: "I cinque motori del valore SHAT",
      values: [
        {
          title: "Capacità",
          en: "Capacity",
          slogan: "Costruiamo conoscenza e competenze.",
          desc: "Valorizziamo il capitale umano trasformando concetti teorici in capacità operative durature."
        },
        {
          title: "Sistemi",
          en: "Systems",
          slogan: "Perfezioniamo sistemi e procedure istituzionali.",
          desc: "Sviluppiamo procedure che assicurano conformità, continuità e riduzione del rischio."
        },
        {
          title: "Evidenze",
          en: "Evidence",
          slogan: "Trasformiamo i dati in conoscenza fruibile.",
          desc: "Analisi sul campo puntuali per orientare decisioni strategiche lungimiranti."
        },
        {
          title: "Performance",
          en: "Performance",
          slogan: "Colleghiamo lo sviluppo alle prestazioni effettive.",
          desc: "Incrementiamo la qualità operativa quotidiana e l'efficacia dei progetti."
        },
        {
          title: "Risultati",
          en: "Results",
          slogan: "Puntiamo sull'impatto e sul miglioramento continuo.",
          desc: "Raggiungimento di risultati tangibili e verificabili per enti e comunità beneficiarie."
        }
      ],
      positioningTitle: "Posizionamento istituzionale",
      positioningLead: "SHAT non è semplicemente un fornitore di formazione: è un partner strategico per il capacity building e lo sviluppo istituzionale.",
      positioningBody: "Riteniamo che la formazione più efficace sia quella che sfocia in capacità concrete; che la consulenza vincente passi dalla diagnosi alle soluzioni operative; e che una valutazione accurata converta i dati in apprendimento e scelte oculate.",
      commitmentTitle: "Il nostro impegno istituzionale",
      commitmentBody: "Assicuriamo servizi di alto livello fondati su evidenze e metodologie trasparenti, garantendo terzietà, etica, totale riservatezza e costante orientamento a traguardi misurabili.",
      partnerCtaTitle: "Pronto a stringere una partnership strategica e duratura?",
      partnerCtaDesc: "Contatta oggi stesso i nostri advisor senior per discutere le priorità della tua organizzazione."
    },

    contact: {
      title: "Contattaci",
      subtitle: "Rivolgiti al nostro team per concordare programmi di formazione o interventi di consulenza",
      infoTitle: "Recapiti istituzionali",
      emailLabel: "Email aziendale",
      emailValue: "info@shatgrowth.com",
      phoneLabel: "Telefono e WhatsApp diretto",
      phoneValue: "+966 50 000 0000",
      websiteLabel: "Sito web ufficiale",
      websiteValue: "www.shatgrowth.com",
      addressLabel: "Sede principale",
      addressValue: "Regno dell'Arabia Saudita / Uffici regionali internazionali",
      formTitle: "Richiesta di consulenza o programma formativo",
      formSubtitle: "Compila il modulo sottostante: i nostri consulenti ti risponderanno entro 24 ore lavorative.",
      nameLabel: "Nome e cognome",
      emailInputLabel: "Email professionale",
      orgLabel: "Nome dell'ente / organizzazione",
      phoneInputLabel: "Telefono / WhatsApp",
      serviceTypeLabel: "Tipologia di servizio richiesto",
      serviceOptions: [
        "Programmi di formazione e capacity building",
        "Consulenza e sviluppo istituzionale",
        "Consulenza in protezione e salvaguardia",
        "Valutazione esterna indipendente di progetti",
        "Architettura e sistemi MEL",
        "Partnership strategica generale"
      ],
      messageLabel: "Dettagli o ambito dell'intervento richiesto",
      submitBtn: "Invia richiesta",
      successMsg: "Grazie per averci contattato! La tua richiesta è stata registrata con successo: ti risponderemo a breve."
    },

    
    academy: {
      "navAcademy": "🎓 Accademia SHAT",
      "badge": "Accademia SHAT per la Leadership e lo Sviluppo Istituzionale",
      "title": "Piattaforma di Potenziamento delle Capacità ed Eccellenza",
      "subtitle": "Programmi avanzati per professionisti umanitari e dello sviluppo, conformi agli standard internazionali (CHS, Sphere, OCSE DAC, PSEA).",
      "searchPlaceholder": "Cerca programmi e corsi di specializzazione...",
      "allTracks": "Tutti i percorsi",
      "tracks": [
            {
                  "id": "all",
                  "name": "All Academic Tracks"
            },
            {
                  "id": "humanitarian",
                  "name": "Humanitarian & Global Standards (CHS & Sphere)"
            },
            {
                  "id": "protection",
                  "name": "Protection & Safeguarding (PSEA & Do No Harm)"
            },
            {
                  "id": "evaluation",
                  "name": "Independent Evaluation & MEL (OECD DAC)"
            },
            {
                  "id": "governance",
                  "name": "Governance & Strategic Leadership"
            },
            {
                  "id": "tot",
                  "name": "Training of Trainers (TOT Professional)"
            },
            {
                  "id": "empowerment",
                  "name": "Women & Youth Empowerment"
            }
      ],
      "stats": {
            "graduates": "+1,450",
            "graduatesLabel": "Certified Graduates & Experts",
            "programs": "24+",
            "programsLabel": "Applied Professional Programs",
            "partners": "50+",
            "partnersLabel": "Partner Institutions & NGOs",
            "satisfaction": "99.2%",
            "satisfactionLabel": "Participant Satisfaction & Impact"
      },
      "courses": [
            {
                  "id": "shat-chs-master",
                  "track": "humanitarian",
                  "trackName": "Humanitarian Sector",
                  "title": "Core Humanitarian Standard (CHS) & Development Response Diploma",
                  "desc": "Advanced program qualifying humanitarian practitioners to implement the Nine Commitments of the CHS and enforce rigorous Accountability to Affected People (AAP).",
                  "duration": "45 Training Hours • 6 Weeks",
                  "level": "Advanced",
                  "format": "Hybrid (Interactive + Case Studies)",
                  "accreditation": "Accredited according to CHS & Sphere",
                  "syllabus": [
                        "Module 1: The Nine Commitments of the Core Humanitarian Standard",
                        "Module 2: Practical AAP Tools and Community Feedback Mechanisms",
                        "Module 3: Needs Assessment and Principled Intervention Design",
                        "Module 4: Real-world Case Simulation and Quality Matrix Audit"
                  ]
            },
            {
                  "id": "shat-psea-expert",
                  "track": "protection",
                  "trackName": "Protection & Safeguarding",
                  "title": "Executive Program in Protection & Safeguarding Consulting (PSEA)",
                  "desc": "Equipping advisors and focal points to build institutional safeguarding policies, conduct sexual exploitation and abuse risk assessments, and establish secure referral pathways.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Executive & Advisory",
                  "format": "Live Virtual + Practical Mentoring",
                  "accreditation": "Aligned with Inter-Agency PSEA Standards & Do No Harm",
                  "syllabus": [
                        "Module 1: Legal and Humanitarian Foundations of Safeguarding",
                        "Module 2: Risk Assessment Architectures and Policy Formulation",
                        "Module 3: Incident Management, Investigation Protocols, and Survivor Protection",
                        "Module 4: Institutional Action Planning and Compliance Auditing"
                  ]
            },
            {
                  "id": "shat-oecd-evaluator",
                  "track": "evaluation",
                  "trackName": "Independent Evaluation",
                  "title": "External Evaluation Specialist: OECD DAC Six Criteria",
                  "desc": "Developing independent evaluators proficient in assessing Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability using mixed-method research and UNEG norms.",
                  "duration": "50 Training Hours • 7 Weeks",
                  "level": "Expert Level",
                  "format": "Hybrid + Supervised Field Evaluation Project",
                  "accreditation": "Accredited under OECD DAC Criteria & UNEG Standards",
                  "syllabus": [
                        "Module 1: The Six OECD DAC Criteria and Strategic Evaluation Questions",
                        "Module 2: Evidence Synthesis, Mixed Methods, and Field Sampling",
                        "Module 3: Formulating Independent Evaluation Reports & Actionable Lessons",
                        "Module 4: Presenting Findings to Donor Boards & Stakeholders"
                  ]
            },
            {
                  "id": "shat-tot-professional",
                  "track": "tot",
                  "trackName": "Training of Trainers",
                  "title": "Professional Training of Trainers for Humanitarian & Development Orgs (TOT)",
                  "desc": "Master competency-based curriculum design, adult experiential learning facilitation (Kolb's cycle), Kirkpatrick outcome evaluation, and AI-assisted educational frameworks.",
                  "duration": "36 Training Hours • 4 Weeks",
                  "level": "Professional Practitioner",
                  "format": "Interactive Studio Workshops & Micro-teaching",
                  "accreditation": "SHAT Certified Professional Facilitator",
                  "syllabus": [
                        "Module 1: Adult Learning Psychology and Experiential Cycles",
                        "Module 2: Competency-based Curriculum and Instructional Architecture",
                        "Module 3: Facilitation Dynamics, Conflict Resolution & Group Management",
                        "Module 4: Capstone: Micro-teaching Delivery with Video Analysis & Feedback"
                  ]
            },
            {
                  "id": "shat-governance-strategy",
                  "track": "governance",
                  "trackName": "Governance & Leadership",
                  "title": "Strategic Governance & Institutional Leadership for Non-Profit Organizations",
                  "desc": "Developing executive governance structures, robust board oversight, organizational change management, and balanced scorecards for resilient civil society entities.",
                  "duration": "32 Training Hours • 4 Weeks",
                  "level": "Executive & Leadership",
                  "format": "Executive Seminars & Case Labs",
                  "accreditation": "Conforms to International Governance Frameworks",
                  "syllabus": [
                        "Module 1: Good Governance Norms, Board Dynamics & Fiduciary Accountability",
                        "Module 2: Strategic Roadmapping, Objective Cascades & Risk Matrices",
                        "Module 3: Designing Balanced Scorecards and Operational KPIs",
                        "Module 4: Transformational Leadership and Change Management"
                  ]
            },
            {
                  "id": "shat-meal-systems",
                  "track": "evaluation",
                  "trackName": "MEAL Systems",
                  "title": "Designing & Managing Integrated MEAL Systems (Monitoring, Evaluation, Accountability & Learning)",
                  "desc": "Architecting end-to-end MEAL architectures, result frameworks, digital indicators, community accountability loops, and organizational knowledge harvesting.",
                  "duration": "40 Training Hours • 5 Weeks",
                  "level": "Advanced",
                  "format": "Hands-on with Industry Cloud Toolkits",
                  "accreditation": "Conforms to International Development Standards",
                  "syllabus": [
                        "Module 1: Results Frameworks, LogFrames, and Theory of Change",
                        "Module 2: Performance Monitoring Plans (PMP) & Indicator Tracking",
                        "Module 3: Community Accountability, Complaint Channels & Feedback Loops",
                        "Module 4: Digital Dashboards and Knowledge Harvesting Methodologies"
                  ]
            }
      ],
      "verify": {
            "title": "Official Certificate Verification Portal",
            "subtitle": "Instant real-time verification of credentials, diplomas, and accreditations issued by SHAT Academy.",
            "placeholder": "Enter Certificate Code (e.g., SHAT-2026-CHS-01)",
            "btn": "Verify Credential",
            "testingTip": "Sample verified credentials to test: SHAT-2026-CHS-01, SHAT-2026-PSEA-02, or SHAT-2026-OECD-03",
            "verifiedTitle": "Officially Verified & Authenticated Credential",
            "studentLabel": "Awardee / Graduate Name:",
            "courseLabel": "Academic Program:",
            "dateLabel": "Issuance Date:",
            "gradeLabel": "Evaluation & Distinction:",
            "accreditationLabel": "International Accreditation:",
            "statusActive": "Active & Internationally Recognized",
            "notFound": "No certified record was found for this code. Please verify the code and contact SHAT Academy registry."
      },
      "modal": {
            "enrollTitle": "Iscrizione al Programma Accademico",
            "syllabusTitle": "Programma di Studio e Moduli",
            "fullName": "Nome e Cognome",
            "email": "Email Professionale",
            "phone": "Telefono / WhatsApp",
            "org": "Organizzazione / Istituzione",
            "background": "Esperienza e Obiettivi",
            "submitEnroll": "Conferma Iscrizione",
            "successMsg": "Richiesta di iscrizione ricevuta con successo! Il nostro ufficio ammissioni ti contatterà entro 24 ore."
      }
},
footer: {
      aboutText: "SHAT Sviluppo & Crescita è una realtà di vertice dedicata a formazione, capacity building e consulenza per lo sviluppo istituzionale secondo i più alti standard globali.",
      quickLinks: "Navigazione rapida",
      legalNotice: "Tutti i diritti riservati © 2026 SHAT Sviluppo & Crescita.",
      privacyPledge: "Totale adesione a standard stringenti di riservatezza e protezione dei dati aziendali."
    }
  }
};

// Bind Academy translations across all languages
for (const lang of Object.keys(translations)) {
  if (academyTranslations[lang]) {
    translations[lang].academy = academyTranslations[lang];
    if (!translations[lang].nav) translations[lang].nav = {};
    translations[lang].nav.academy = academyTranslations[lang].navAcademy;
  }
}


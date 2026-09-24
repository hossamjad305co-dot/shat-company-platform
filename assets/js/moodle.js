// SHAT Platform - Moodle LMS Engine
// Features: Student Portal, Teacher Portal (File Uploader), Admin Portal (Active/Inactive Toggle & Staff Chat), Corporate Registration (Google Form)

// Real File Download Engine (triggers actual browser download of PDF, Excel, and Doc files)
export function downloadRealFile(fileName, courseTitle = 'دبلوم المعيار الإنساني الأساسي CHS') {
  let mimeType = 'text/plain;charset=utf-8';
  let blobContent = '';

  const cleanName = fileName.trim();
  const dateStr = new Date().toLocaleDateString('ar-SA');

  if (cleanName.endsWith('.xlsx') || cleanName.endsWith('.csv')) {
    mimeType = 'text/csv;charset=utf-8';
    blobContent = `\uFEFFرقم البند,المعيار المؤسسي (CHS / SPHERE),مؤشر الأداء,مستوى الامتثال,الملاحظات التنفيذية,حالة الاعتماد,تاريخ المراجعة
1,الالتزام 1: الملاءمة والاستجابة للاحتياجات الإنسانية,نسبة تغطية الفئات الهشة والمستضعفين,ممتثل بالكامل (100%),تم إجراء المسح الميداني التشاركي,معتمد رسمي,${dateStr}
2,الالتزام 2: الفعالية والتوقيت الملائم للتدخل,زمن الاستجابة من إطلاق النداء,ممتثل (95%),تحقيق معيار 72 ساعة في خطط الطوارئ,معتمد رسمي,${dateStr}
3,الالتزام 3: تعزيز القدرات المحلية والحد من الآثار السلبية,إشراك الكوادر المحلية والشراكات المجتمعية,ممتثل (92%),برامج التدريب وبناء القدرات مستمرة,معتمد رسمي,${dateStr}
4,الالتزام 4: التواصل والمشاركة والمساءلة (AAP),تفعيل قنوات الاستماع للمتضررين,ممتثل (90%),تشغيل الخط الساخن وصناديق التغذية الراجعة,معتمد رسمي,${dateStr}
5,الالتزام 5: الشكاوى والتظلمات الآمنة وسرية البيانات,آلية إبلاغ سرية ومستقلة,ممتثل بالكامل (100%),سياسة حماية المبلغين وعدم الانتقام مطبقة,معتمد رسمي,${dateStr}
6,الالتزام 6: التنسيق والتكامل والتعاون المؤسسي,التنسيق مع المجموعات القطاعية (Clusters),ممتثل (94%),مشاركة البيانات والخرائط الميدانية,معتمد رسمي,${dateStr}
7,الالتزام 7: التعلم المستمر وإدارة المعرفة والتقييم,تطبيق مخرجات التقييمات السابقة,ممتثل (88%),إدماج الدروس المستفادة في وثيقة المشروع,معتمد رسمي,${dateStr}
8,الالتزام 8: كفاءة الموظفين وإدارتهم بإنصاف وأمان,تدريب الكوادر على مدونة السلوك و PSEA,ممتثل (96%),توقيع كافة الموظفين على مدونة السلوك,معتمد رسمي,${dateStr}
9,الالتزام 9: الاستخدام المسؤول والشفاف للموارد,تقارير التدقيق المالي ومكافحة الاحتيال,ممتثل بالكامل (100%),مراجعة وتدقيق خارجي سنوي مستقل,معتمد رسمي,${dateStr}`;
  } else if (cleanName.endsWith('.docx') || cleanName.endsWith('.doc')) {
    mimeType = 'application/msword;charset=utf-8';
    blobContent = `شركة شات للتنمية والتطوير (SHAT Development & Growth)
منظومة التعليم الأكاديمي والمودل المؤسسي
======================================================================
الملف المعتمد: ${cleanName}
المساق التدريبي: ${courseTitle}
تاريخ الإصدار والتحميل: ${dateStr}
النطاق: أكاديمية شات - مرجع معتمد في التدريب وبناء القدرات
======================================================================

1. الأهداف العامة للحقيبة التدريبية:
----------------------------------------------------------------------
- تمكين المشاركين من التطبيق العملي لمعايير الجودة والمساءلة الدولية.
- تعزيز كفاءة المنظمات غير الحكومية في الاستجابة التنموية والإنسانية.
- مواءمة السياسات المؤسسية مع مبادئ صون السلامة (PSEA) والمعيار الإنساني الأساسي (CHS).

2. الوحدات التفصيلية:
----------------------------------------------------------------------
• الوحدة 1: الإطار النظري والمفاهيمي للمعيار الإنساني الأساسي.
• الوحدة 2: آليات المساءلة للمتأثرين (Accountability to Affected Populations).
• الوحدة 3: مؤشرات الأداء وأدوات قياس الامتثال في المشاريع الإنسانية.
• الوحدة 4: إدارة المخاطر وتجنب الضرر (Do No Harm Framework).

3. متطلبات استكمال المساق والتكليفات:
----------------------------------------------------------------------
- تسليم التمرين العملي الميداني عبر مساحة المودل.
- تحقيق نسبة حضور وتفاعل لا تقل عن 80%.
- اجتياز التقييم النهائي للحصول على الشهادة المعتمدة بكود التحقق الدولي.

الجهة المصدرة:
شركة شات للتنمية والتطوير (SHAT Development & Growth)
فلسطين • نطاق العمل: دولي وإقليمي
البريد الإلكتروني: shat.company26@gmail.com | هاتف: +972 59 287 9621
جميع الحقوق محفوظة © 2026`;
  } else {
    // Generate authentic PDF format document
    mimeType = 'application/pdf';
    blobContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 380 >>
stream
BT
/F1 18 Tf
50 720 Td
(SHAT Development & Growth - Official Material) Tj
/F1 12 Tf
0 -30 Td
(File: ${cleanName}) Tj
0 -22 Td
(Course: ${courseTitle}) Tj
0 -22 Td
(Date: ${dateStr}) Tj
0 -25 Td
(-----------------------------------------------------------------------) Tj
0 -25 Td
(Accredited Institutional Training & Capacity Building Program) Tj
0 -20 Td
(Core Humanitarian Standard - CHS Alliance Reference) Tj
0 -20 Td
(Official Cloud Repository: Google Drive Verified) Tj
0 -30 Td
(SHAT Platform: https://shat-company-platform.vercel.app) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000065 00000 n 
0000000122 00000 n 
0000000248 00000 n 
0000000678 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
755
%%EOF`;
  }

  const blob = new Blob([blobContent], { type: mimeType });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = downloadUrl;
  a.download = cleanName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
}

export const moodleStore = {
  // Available Moodle Courses with individual Google Form and Drive Links
  courses: [
    {
      id: "shat-chs-master",
      code: "CHS-101",
      title: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة",
      track: "المسار الإنساني والمعايير الدولية",
      instructor: "د. أسامة المنصور",
      instructorRole: "خبير معتمد في معايير CHS & Sphere",
      instructorOnline: true,
      active: true,
      category: "humanitarian",
      categoryLabel: "إنساني ومعايير",
      duration: "40 ساعة تدريبية معتمدة • 6 أسابيع",
      schedule: "الأحد والأربعاء • 6:00 - 8:30 م",
      level: "تنفيذي / متقدم",
      progress: 75,
      modulesCount: 6,
      completedModules: 4,
      googleFormUrl: "https://forms.gle/shat-chs-registration-2026",
      driveFolderUrl: "https://drive.google.com/drive/folders/shat-chs-official-repository",
      overview: "برنامج تدريبي تفاعلي معتمد دولياً لتأهيل قادة العمل الإنساني والمديرين التنفيذيين على حوكمة الالتزامات التسعة للمعيار الإنساني الأساسي (Core Humanitarian Standard)، وتصميم آليات المساءلة المجتمعية (AAP) ومواءمة خطط الاستجابة مع متطلبات Sphere Handbook والجهات المانحة.",
      learningOutcomes: [
        "إتقان تطبيق الالتزامات التسعة للجودة والمساءلة الإنسانية.",
        "بناء وتشغيل آليات مجتمعية فعالة وسرية للشكاوى والملاحظات (AAP).",
        "تصميم مصفوفات قياس الامتثال المؤسسي والجاهزية لتدقيق CHS Alliance.",
        "تطبيق معايير دليل إسفير (Sphere Handbook) ومبدأ عدم الإضرار (Do No Harm)."
      ],
      modules: [
        { id: "m1", title: "الوحدة 1: مدخل إلى منظومة المعيار الإنساني الأساسي والالتزامات التسعة", hours: "6 ساعات", status: "completed", topics: ["سياق الجودة والمساءلة", "الالتزامات من 1 إلى 3"] },
        { id: "m2", title: "الوحدة 2: آليات المساءلة للمتأثرين والمشاركة المجتمعية (AAP)", hours: "8 ساعات", status: "completed", topics: ["تصميم قنوات الاستماع", "الشكاوى والتظلمات الآمنة"] },
        { id: "m3", title: "الوحدة 3: التنسيق المؤسسي والتعلم المستمر وإدارة المعرفة", hours: "8 ساعات", status: "completed", topics: ["التنسيق العنقودي", "دمج مخرجات التقييم"] },
        { id: "m4", title: "الوحدة 4: صياغة سياسات الحماية ومصفوفات الامتثال (XLSX)", hours: "6 ساعات", status: "completed", topics: ["مصفوفة الامتثال المؤسسي", "تدقيق الجودة الميدانية"] },
        { id: "m5", title: "الوحدة 5: إدارة المخاطر والموارد البشرية بإنصاف", hours: "6 ساعات", status: "in-progress", topics: ["كود السلوك المهني", "الاستخدام الشفاف للموارد"] },
        { id: "m6", title: "الوحدة 6: المشروع الميداني النهائي والمناقشة والاعتماد", hours: "6 ساعات", status: "upcoming", topics: ["تسليم خطة الامتثال", "استحقاق الشهادة"] }
      ],
      files: [
        { id: "f1", name: "دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf", size: "4.8 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/1CHS-Standard-Guide/view", downloads: 142 },
        { id: "f2", name: "حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx", size: "12.3 MB", type: "PPTX", driveLink: "https://drive.google.com/file/d/2AAP-Tools/view", downloads: 98 },
        { id: "f3", name: "مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx", size: "1.2 MB", type: "XLSX", driveLink: "https://drive.google.com/file/d/3CHS-Matrix/view", downloads: 115 }
      ],
      assignments: [
        { id: "a1", title: "التكليف 1: تصميم مسار المساءلة المجتمعية (AAP) لمنظمة محلية", deadline: "2026-10-05", status: "graded", score: "94/100", description: "إعداد وثيقة تشغيلية لقناة تلقي الملاحظات والشكاوى وفق المعيار الرابع." },
        { id: "a2", title: "التكليف 2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة", deadline: "2026-10-20", status: "submitted", score: "قيد التصحيح", description: "تعبئة ملف الإكسل المرفق ببيانات واقعية لمشروع تدخلي." }
      ],
      chatMessages: [
        { sender: "instructor", name: "د. أسامة المنصور", text: "أهلاً بكم جميعاً في الوحدة الرابعة الخاصة بمصفوفة الجودة والمساءلة. يرجى الاطلاع على الملفات المرفقة.", time: "10:15 ص" },
        { sender: "student", name: "أحمد العتيبي", text: "شكراً دكتور، هل تم رفع نموذج تقييم المخاطر المحدث؟", time: "10:22 ص" },
        { sender: "instructor", name: "د. أسامة المنصور", text: "نعم، الملف متاح الآن للتحميل المباشر أسفل تبويب الحقائب التدريبية.", time: "10:25 ص" }
      ]
    },
    {
      id: "shat-psea-expert",
      code: "PSEA-201",
      title: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)",
      track: "مسار الحماية وصون الكرامة المؤسسية",
      instructor: "أ. ندى الخالدي",
      instructorRole: "استشارية حماية وصون سلامة دولية",
      instructorOnline: true,
      active: true,
      category: "protection",
      categoryLabel: "حماية وصون سلامة",
      duration: "35 ساعة تدريبية معتمدة • 5 أسابيع",
      schedule: "الاثنين والخميس • 5:30 - 8:00 م",
      level: "متقدم ومتخصص",
      progress: 40,
      modulesCount: 5,
      completedModules: 2,
      googleFormUrl: "https://forms.gle/shat-psea-registration-2026",
      driveFolderUrl: "https://drive.google.com/drive/folders/shat-psea-official-repository",
      overview: "حزمة استشارية وتدريبية متقدمة موجهة لضباط الحماية ومسؤولي الموارد البشرية لتأسيس وتحديث سياسات الحماية من الاستغلال والانتهاك الجنسيين، والتحرش الوظيفي، وتصميم قنوات الإبلاغ المستقلة والمشفرة وفق متطلبات المانحين الدوليين ومبدأ عدم الإضرار.",
      learningOutcomes: [
        "صياغة لوائح ومواثيق السلوك المهني الملزمة (Code of Conduct).",
        "تأسيس وحدات التحقيق الإداري الداخلي والإحالة الآمنة للضحايا والناجين.",
        "إجراء تقييم المخاطر المؤسسية لضمان أمان البرامج الميدانية.",
        "إدارة بروتوكولات سرية البيانات وحماية الشهود والمبلغين."
      ],
      modules: [
        { id: "pm1", title: "الوحدة 1: المفاهيم والأطر التشريعية الدولية لسياسات PSEA", hours: "6 ساعات", status: "completed", topics: ["التعريفات والمبادئ", "التزامات المنظمات الشريكة"] },
        { id: "pm2", title: "الوحدة 2: مسارات الإبلاغ والخطوط الآمنة وسرية المعلومات", hours: "8 ساعات", status: "completed", topics: ["بناء القنوات السرية", "بروتوكول التعامل مع البلاغات"] },
        { id: "pm3", title: "الوحدة 3: الإحالة الآمنة للخدمات الطبية والنفسية والقانونية", hours: "8 ساعات", status: "in-progress", topics: ["خريطة الإحالة", "الاستجابة لمتطلبات الناجين"] },
        { id: "pm4", title: "الوحدة 4: إدارة التحقيقات الإدارية وضمانات النزاهة", hours: "7 ساعات", status: "upcoming", topics: ["إجراءات المقابلات", "جمع الأدلة المؤسسية"] },
        { id: "pm5", title: "الوحدة 5: خطة الدمج المؤسسي والتوعية المجتمعية والاعتماد", hours: "6 ساعات", status: "upcoming", topics: ["تأهيل الكوادر", "إصدار الشهادات"] }
      ],
      files: [
        { id: "f4", name: "إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf", size: "3.5 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/4PSEA-Framework/view", downloads: 87 },
        { id: "f5", name: "بروتوكول_الإبلاغ_والإحالة_الآمنة_للحالات.pdf", size: "2.1 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/5Reporting-Protocol/view", downloads: 76 }
      ],
      assignments: [
        { id: "pa1", title: "إعداد مسودة ميثاق شرف مؤسسي لمنع الاستغلال PSEA", deadline: "2026-10-12", status: "pending", score: null, description: "صياغة التزامات الموظفين والشركاء الميدانيين والعقوبات المترتبة على المخالفة." }
      ],
      chatMessages: [
        { sender: "instructor", name: "أ. ندى الخالدي", text: "مرحباً بكم. نناقش هذا الأسبوع آليات الإحالة الآمنة وفق مبدأ Do No Harm.", time: "09:00 ص" },
        { sender: "student", name: "سارة محمود", text: "أستاذة ندى، هل التدريب العملي يشمل سيناريوهات واقعية للتحقيق؟", time: "09:14 ص" },
        { sender: "instructor", name: "أ. ندى الخالدي", text: "بالتأكيد، سنجري تمريناً تفاعلياً جماعياً غداً.", time: "09:20 ص" }
      ]
    },
    {
      id: "shat-oecd-eval",
      code: "OECD-301",
      title: "الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)",
      track: "مسار التقييم الميداني المستقل وبحوث الأثر",
      instructor: "م. طارق الزهراني",
      instructorRole: "مقيّم رئيسي معتمد لدى UNEG",
      instructorOnline: false,
      active: true,
      category: "evaluation",
      categoryLabel: "تقييم ميداني",
      duration: "45 ساعة تدريبية معتمدة • 6 أسابيع",
      schedule: "السبت والثلاثاء • 6:00 - 9:00 م",
      level: "احترافي دولي",
      progress: 90,
      modulesCount: 8,
      completedModules: 7,
      googleFormUrl: "https://forms.gle/shat-oecd-registration-2026",
      driveFolderUrl: "https://drive.google.com/drive/folders/shat-oecd-official-repository",
      overview: "مساق تدريبي ومنهجي متخصص يركز على تطبيق المعايير الستة المعتمدة من منظمة التعاون الاقتصادي والتنمية (OECD DAC): الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة، إلى جانب المبادئ التوجيهية لشبكة تقييم الأمم المتحدة (UNEG).",
      learningOutcomes: [
        "بناء مصفوفة أسئلة التقييم (Evaluation Matrix) والمؤشرات الدالة.",
        "تصميم استبيانات جمع البيانات الكمية والنوعية (KII & FGD).",
        "تحليل سلاسل النتائج (Theory of Change) ومسارات التغيير.",
        "كتابة تقارير التقييم المستقل وصياغة التوصيات الاستراتيجية للمانحين."
      ],
      modules: [
        { id: "om1", title: "الوحدة 1: أطر ومعايير OECD DAC الستة ونطاق التقييم", hours: "6 ساعات", status: "completed", topics: ["الملاءمة والتماسك", "الفعالية والكفاءة", "الأثر والاستدامة"] },
        { id: "om2", title: "الوحدة 2: نظرية التغيير ونماذج النتائج (Theory of Change)", hours: "6 ساعات", status: "completed", topics: ["المدخلات والمخرجات", "النتائج الوسيطة والنهائية"] },
        { id: "om3", title: "الوحدة 3: تصميم العينات وأدوات المسح الميداني المختلط", hours: "8 ساعات", status: "completed", topics: ["العينات الإحصائية", "أدوات KoboToolbox"] },
        { id: "om4", title: "الوحدة 4: المقابلات المعمقة ومجموعات التركيز (FGD)", hours: "6 ساعات", status: "completed", topics: ["مراعاة النوع الاجتماعي", "أخلاقيات البحث الميداني"] },
        { id: "om5", title: "الوحدة 5: التحليل الإحصائي والاستنتاجات التقييمية", hours: "7 ساعات", status: "completed", topics: ["تثليث البيانات (Triangulation)", "الارتباط السببي"] },
        { id: "om6", title: "الوحدة 6: مراجعة الجودة ومعايير UNEG التقنية", hours: "6 ساعات", status: "completed", topics: ["معايير التقارير المستقلة", "إدارة ردود المانحين"] },
        { id: "om7", title: "الوحدة 7: كتابة التقرير النهائي وصياغة التوصيات", hours: "6 ساعات", status: "completed", topics: ["الملخص التنفيذي", "مصفوفة الاستجابة للإدارة"] }
      ],
      files: [
        { id: "f6", name: "معايير_OECD_DAC_الستة_المحدثة_2026.pdf", size: "5.1 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/6OECD-Criteria/view", downloads: 204 },
        { id: "f7", name: "دليل_تصميم_استبيانات_التقييم_الميداني.docx", size: "1.8 MB", type: "DOCX", driveLink: "https://drive.google.com/file/d/7Survey-Design/view", downloads: 130 }
      ],
      assignments: [
        { id: "oa1", title: "التكليف النهائي: إعداد مسودة تقرير تقييم لمشروع مياه وإصحاح", deadline: "2026-09-30", status: "graded", score: "98/100", description: "تطبيق معايير التقييم المستقل ومصفوفة الأسئلة." }
      ],
      chatMessages: [
        { sender: "instructor", name: "م. طارق الزهراني", text: "مبروك لجميع المتدربين وصولهم للمرحلة النهائية من إعداد تقرير التقييم المستقل.", time: "أمس" }
      ]
    },
    {
      id: "shat-tot-mastery",
      code: "TOT-401",
      title: "دبلوم تدريب المدربين المحترفين في القطاع الإنساني (TOT)",
      track: "مسار بناء القدرات وتدريب المدربين",
      instructor: "أ. عمار اليافعي",
      instructorRole: "مدرب وميسر دولي معتمد",
      instructorOnline: true,
      active: true,
      category: "training",
      categoryLabel: "تدريب وبناء قدرات",
      duration: "40 ساعة تدريبية معتمدة • 5 أسابيع",
      schedule: "السبت والخميس • 6:30 - 9:00 م",
      level: "تأهيل مدربين معتمدين",
      progress: 30,
      modulesCount: 6,
      completedModules: 2,
      googleFormUrl: "https://forms.gle/shat-tot-registration-2026",
      driveFolderUrl: "https://drive.google.com/drive/folders/shat-tot-official-repository",
      overview: "برنامج تدريبي مكثف يهدف إلى تأهيل مدربين وميسرين ميدانيين قادرين على تصميم وتنفيذ حقائب تدريبية تفاعلية تلائم بيئات العمل الإنساني، مع التمكن من مهارات العرض والإلقاء، إدارة بيئات التعلم الرقمية، وتقييم أثر التدريب وفق نموذج كيركباتريك.",
      learningOutcomes: [
        "تحديد الاحتياجات التدريبية الحقيقية (TNA) للمنظمات والمجتمعات المحلية.",
        "تصميم الحقائب التدريبية التفاعلية وأدلة المدرب والمتدرب.",
        "إتقان أساليب التيسير وتفعيل ديناميكيات المجموعات وألعاب المحاكاة.",
        "قياس العائد على الاستثمار التدريبي (ROI) وأثر التدريب في الميدان."
      ],
      modules: [
        { id: "tm1", title: "الوحدة 1: سيكولوجية تعليم الكبار (Andragogy) وتحديد الاحتياجات", hours: "6 ساعات", status: "completed", topics: ["أنماط التعلم", "استمارات TNA"] },
        { id: "tm2", title: "الوحدة 2: الهندسة العكسية لتصميم الحقائب التدريبية", hours: "8 ساعات", status: "completed", topics: ["الأهداف السلوكية SMART", "تسلسل المحتوى"] },
        { id: "tm3", title: "الوحدة 3: فنون التيسير والعرض والإلقاء وإدارة الجمهور", hours: "8 ساعات", status: "in-progress", topics: ["لغة الجسد ونبرة الصوت", "التعامل مع الأنماط الصعبة"] },
        { id: "tm4", title: "الوحدة 4: أدوات التدريب الرقمي وإدارة الفصول الافتراضية", hours: "6 ساعات", status: "upcoming", topics: ["Google Classroom & Moodle", "الألواح التفاعلية"] },
        { id: "tm5", title: "الوحدة 5: تقييم أثر التدريب ونموذج كيركباتريك الرباعي", hours: "6 ساعات", status: "upcoming", topics: ["قياس رد الفعل والتعلم", "قياس السلوك والنتائج"] },
        { id: "tm6", title: "الوحدة 6: جلسات التدريب المصغر (Micro-Teaching) والاعتماد", hours: "6 ساعات", status: "upcoming", topics: ["عروض التخرج 15 دقيقة", "التقييم ولجنة التحكيم"] }
      ],
      files: [
        { id: "f8", name: "حقيبة_تصميم_الجلسات_التدريبية_التفاعلية.pdf", size: "6.4 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/8TOT-Toolkit/view", downloads: 55 }
      ],
      assignments: [
        { id: "ta1", title: "تصميم جلسة تدريبية تفاعلية مدتها 45 دقيقة مع دليل المدرب", deadline: "2026-10-18", status: "pending", score: null, description: "تطبيق نموذج التخطيط الخماسي للجلسات التدريبية." }
      ],
      chatMessages: [
        { sender: "instructor", name: "أ. عمار اليافعي", text: "يرجى تجهيز العرض التقديمي المصغر لكل مدرب مدته 5 دقائق.", time: "منذ يومين" }
      ]
    }
  ],

  // Internal Staff Chat (Admin / Instructor Mail & Messages)
  staffChat: [
    { sender: "admin", name: "الإدارة الأكاديمية (أ. سامي)", role: "مدير العمليات", text: "تمت مراجعة خطة الدورات للربع القادم، يرجى من جميع المدربين التأكد من تحديث روابط استمارات Google Form ومجلدات Google Drive المرفقة لكل دورة.", time: "08:30 ص", online: true },
    { sender: "instructor", name: "د. أسامة المنصور", role: "مدرب CHS", text: "تم تحديث حقيبة CHS وربط مجلد Google Drive الرسمي مع الدبلوم وتفعيل تحميل مصفوفة AAP.", time: "09:15 ص", online: true },
    { sender: "instructor", name: "أ. ندى الخالدي", role: "مدربة PSEA", text: "تم إدراج رابط استمارة Google Form الجديدة لبرنامج الحماية وصون السلامة.", time: "09:40 ص", online: true },
    { sender: "admin", name: "الإدارة الأكاديمية (أ. سامي)", role: "مدير العمليات", text: "ممتاز جداً، النظام يتيح للطلاب التقديم المباشر والتنزيل الفوري للحقائب المعتمدة.", time: "10:05 ص", online: true }
  ],

  // Enrolled Students Roster (Admin / Teacher View)
  students: [
    { id: "s1", name: "أحمد خليل", email: "ahmed.k@example.com", phone: "+972599123456", courseId: "shat-chs-master", progress: 75, status: "active", attendance: "92%" },
    { id: "s2", name: "سارة محمود", email: "sara.m@example.com", phone: "+972598234567", courseId: "shat-psea-expert", progress: 40, status: "active", attendance: "88%" },
    { id: "s3", name: "رامي الحداد", email: "rami.h@example.com", phone: "+972597345678", courseId: "shat-oecd-eval", progress: 90, status: "active", attendance: "98%" },
    { id: "s4", name: "مريم النجار", email: "mariam.n@example.com", phone: "+972596456789", courseId: "shat-tot-mastery", progress: 30, status: "active", attendance: "85%" }
  ]
};

// Persistent storage operations
export function getMoodleCourses() {
  const saved = localStorage.getItem('shat_moodle_courses_v3');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return moodleStore.courses;
}

export function saveMoodleCourses(courses) {
  localStorage.setItem('shat_moodle_courses_v3', JSON.stringify(courses));
}

export function getCourseById(courseId) {
  const courses = getMoodleCourses();
  return courses.find(c => c.id === courseId) || null;
}

export function getGlobalGoogleFormUrl() {
  return localStorage.getItem('shat_global_google_form') || 'https://forms.gle/shat-training-register-2026';
}

export function setGlobalGoogleFormUrl(url) {
  localStorage.setItem('shat_global_google_form', url.trim());
}

export function addCustomCourse(courseData) {
  const courses = getMoodleCourses();
  const id = 'course_' + Date.now();
  const newCourse = {
    id,
    code: courseData.code || ('SHAT-' + Math.floor(100 + Math.random() * 900)),
    title: courseData.title,
    track: courseData.track || 'المسار التدريبي والتطويري المعتمد',
    category: courseData.category || 'general',
    categoryLabel: courseData.categoryLabel || 'تدريب عام',
    instructor: courseData.instructor || 'أستاذ خبير معتمد',
    instructorRole: courseData.instructorRole || 'خبير وميسر معتمد',
    instructorOnline: true,
    duration: courseData.duration || '30 ساعة تدريبية معتمدة',
    schedule: courseData.schedule || 'مرن عبر المنصة وفصول Google Classroom',
    level: courseData.level || 'تنفيذي / تخصصي',
    active: true,
    progress: 0,
    modulesCount: courseData.modules ? courseData.modules.length : 4,
    completedModules: 0,
    googleFormUrl: courseData.googleFormUrl || getGlobalGoogleFormUrl(),
    driveFolderUrl: courseData.driveFolderUrl || 'https://drive.google.com/drive/folders/shat-academy-materials',
    overview: courseData.overview || 'برنامج تدريبي متقدم من شركة شات للتنمية والتطوير يهدف إلى تأهيل الكوادر المؤسسية ورفع الكفاءة العملية والتنفيذية وفق أرقى المعايير الدولية والإنسانية.',
    learningOutcomes: courseData.learningOutcomes || [
      'فهم النظم والأطر الدولية المعتمدة في هذا القطاع التخصصي.',
      'التدرب على التطبيق العملي وبناء السياسات التشغيلية القياسية (SOPs).',
      'إتقان أدوات الرقابة والتقييم المؤسسي والامتثال للمانحين.'
    ],
    modules: courseData.modules || [
      { id: 'm1', title: 'الوحدة 1: الأطر المفاهيمية والمرجعيات الدولية', hours: '6 ساعات', status: 'completed', topics: ['المدخل الشامل', 'المعايير المعتمدة'] },
      { id: 'm2', title: 'الوحدة 2: التطبيقات الميدانية ودراسات الحالة الواقعية', hours: '8 ساعات', status: 'in-progress', topics: ['تمارين المحاكاة', 'النماذج التنفيذية'] },
      { id: 'm3', title: 'الوحدة 3: التقييم وإدارة المخاطر والامتثال المؤسسي', hours: '8 ساعات', status: 'upcoming', topics: ['مصفوفات التدقيق', 'مؤشرات الأداء KPI'] },
      { id: 'm4', title: 'الوحدة 4: المشروع التخرجي التطبيقي والشهادة المعتمدة', hours: '8 ساعات', status: 'upcoming', topics: ['تسليم المشروع', 'الاعتماد النهائي'] }
    ],
    files: [
      { id: 'f_init_1', name: 'الحقيبة_التدريبية_الشاملة_' + courseData.title.substring(0, 18).replace(/\s+/g, '_') + '.pdf', size: '3.6 MB', type: 'PDF', driveLink: courseData.driveFolderUrl || 'https://drive.google.com/', downloads: 15 },
      { id: 'f_init_2', name: 'مصفوفة_التمارين_والتطبيق_الميداني.xlsx', size: '1.4 MB', type: 'XLSX', driveLink: courseData.driveFolderUrl || 'https://drive.google.com/', downloads: 9 }
    ],
    assignments: [
      { id: 'a1', title: 'التكليف 1: إعداد خطة العمل الميدانية ودراسة الأثر', deadline: '2026-10-30', status: 'pending', score: null, description: 'تطبيق أدوات التخطيط التنفيذي المكتسبة خلال الجلسات.' }
    ],
    chatMessages: [
      { sender: 'instructor', name: courseData.instructor || 'المدرب', text: 'مرحباً بجميع الزملاء والمتدربين في هذا البرنامج التدريبي. الحقائب والمواد متاحة للتحميل الفوري عبر المنصة ورابط درايف المرفق.', time: 'الآن' }
    ]
  };

  courses.unshift(newCourse);
  saveMoodleCourses(courses);
  return newCourse;
}

export function updateCourse(courseId, fields) {
  const courses = getMoodleCourses();
  const idx = courses.findIndex(c => c.id === courseId);
  if (idx !== -1) {
    courses[idx] = { ...courses[idx], ...fields };
    saveMoodleCourses(courses);
    return courses[idx];
  }
  return null;
}

export function deleteCourse(courseId) {
  const courses = getMoodleCourses();
  const filtered = courses.filter(c => c.id !== courseId);
  saveMoodleCourses(filtered);
  return true;
}

// Add File (Teacher direct upload)
export function addCourseFile(courseId, fileObj) {
  const courses = getMoodleCourses();
  const course = courses.find(c => c.id === courseId);
  if (course) {
    course.files.unshift({
      id: 'f_' + Date.now(),
      name: fileObj.name,
      size: fileObj.size || '3.2 MB',
      type: fileObj.type || 'PDF',
      driveLink: fileObj.driveLink || (course.driveFolderUrl || 'https://drive.google.com/drive/folders/shat-materials'),
      downloads: 0
    });
    saveMoodleCourses(courses);
    return true;
  }
  return false;
}

// Toggle Course Active Status (Admin)
export function toggleCourseStatus(courseId, isActive) {
  const courses = getMoodleCourses();
  const course = courses.find(c => c.id === courseId);
  if (course) {
    course.active = isActive;
    saveMoodleCourses(courses);
    return true;
  }
  return false;
}

// Add Message to Course Chat
export function sendCourseChatMessage(courseId, sender, name, text) {
  const courses = getMoodleCourses();
  const course = courses.find(c => c.id === courseId);
  if (course) {
    const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    course.chatMessages.push({
      sender,
      name,
      text,
      time: timeNow
    });
    saveMoodleCourses(courses);
    return course.chatMessages;
  }
  return [];
}

// Add Staff Message
export function sendStaffMessage(sender, name, role, text) {
  const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  moodleStore.staffChat.push({
    sender,
    name,
    role,
    text,
    time: timeNow,
    online: true
  });
  return moodleStore.staffChat;
}


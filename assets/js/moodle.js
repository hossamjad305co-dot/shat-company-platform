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
  // Available Moodle Courses
  courses: [
    {
      id: "shat-chs-master",
      title: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة",
      instructor: "د. أسامة المنصور",
      instructorRole: "خبير معتمد في معايير CHS & Sphere",
      instructorOnline: true,
      active: true,
      category: "إنساني",
      progress: 75,
      modulesCount: 6,
      completedModules: 4,
      files: [
        { id: "f1", name: "دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf", size: "4.8 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/1CHS-Standard-Guide/view", downloads: 142 },
        { id: "f2", name: "حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx", size: "12.3 MB", type: "PPTX", driveLink: "https://drive.google.com/file/d/2AAP-Tools/view", downloads: 98 },
        { id: "f3", name: "مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx", size: "1.2 MB", type: "XLSX", driveLink: "https://drive.google.com/file/d/3CHS-Matrix/view", downloads: 115 }
      ],
      chatMessages: [
        { sender: "instructor", name: "د. أسامة المنصور", text: "أهلاً بكم جميعاً في الوحدة الرابعة الخاصة بمصفوفة الجودة والمساءلة. يرجى الاطلاع على الملفات المرفقة.", time: "10:15 ص" },
        { sender: "student", name: "أحمد العتيبي", text: "شكراً دكتور، هل تم رفع نموذج تقييم المخاطر المحدث؟", time: "10:22 ص" },
        { sender: "instructor", name: "د. أسامة المنصور", text: "نعم، الملف متاح الآن للتحميل المباشر أسفل تبويب الحقائب التدريبية.", time: "10:25 ص" }
      ]
    },
    {
      id: "shat-psea-expert",
      title: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)",
      instructor: "أ. ندى الخالدي",
      instructorRole: "استشارية حماية وصون سلامة دولية",
      instructorOnline: true,
      active: true,
      category: "حماية",
      progress: 40,
      modulesCount: 5,
      completedModules: 2,
      files: [
        { id: "f4", name: "إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf", size: "3.5 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/4PSEA-Framework/view", downloads: 87 },
        { id: "f5", name: "بروتوكول_الإبلاغ_والإحالة_الآمنة_للحالات.pdf", size: "2.1 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/5Reporting-Protocol/view", downloads: 76 }
      ],
      chatMessages: [
        { sender: "instructor", name: "أ. ندى الخالدي", text: "مرحباً بكم. نناقش هذا الأسبوع آليات الإحالة الآمنة وفق مبدأ Do No Harm.", time: "09:00 ص" },
        { sender: "student", name: "سارة محمود", text: "أستاذة ندى، هل التدريب العملي يشمل سيناريوهات واقعية للتحقيق؟", time: "09:14 ص" },
        { sender: "instructor", name: "أ. ندى الخالدي", text: "بالتأكيد، سنجري تمريناً تفاعلياً جماعياً غداً.", time: "09:20 ص" }
      ]
    },
    {
      id: "shat-oecd-eval",
      title: "الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)",
      instructor: "م. طارق الزهراني",
      instructorRole: "مقيّم رئيسي معتمد لدى UNEG",
      instructorOnline: false,
      active: true,
      category: "تقييم",
      progress: 90,
      modulesCount: 8,
      completedModules: 7,
      files: [
        { id: "f6", name: "معايير_OECD_DAC_الستة_المحدثة_2026.pdf", size: "5.1 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/6OECD-Criteria/view", downloads: 204 },
        { id: "f7", name: "دليل_تصميم_استبيانات_التقييم_الميداني.docx", size: "1.8 MB", type: "DOCX", driveLink: "https://drive.google.com/file/d/7Survey-Design/view", downloads: 130 }
      ],
      chatMessages: [
        { sender: "instructor", name: "م. طارق الزهراني", text: "مبروك لجميع المتدربين وصولهم للمرحلة النهائية من إعداد تقرير التقييم المستقل.", time: "أمس" }
      ]
    },
    {
      id: "shat-tot-mastery",
      title: "دبلوم تدريب المدربين المحترفين في القطاع الإنساني (TOT)",
      instructor: "أ. عمار اليافعي",
      instructorRole: "مدرب وميسر دولي معتمد",
      instructorOnline: true,
      active: false,
      category: "تدريب",
      progress: 15,
      modulesCount: 6,
      completedModules: 1,
      files: [
        { id: "f8", name: "حقيبة_تصميم_الجلسات_التدريبية_التفاعلية.pdf", size: "6.4 MB", type: "PDF", driveLink: "https://drive.google.com/file/d/8TOT-Toolkit/view", downloads: 55 }
      ],
      chatMessages: [
        { sender: "instructor", name: "أ. عمار اليافعي", text: "يرجى تجهيز العرض التقديمي المصغر لكل مدرب مدته 5 دقائق.", time: "منذ يومين" }
      ]
    }
  ],

  // Internal Staff Chat (Admin / Instructor Mail & Messages)
  staffChat: [
    { sender: "admin", name: "الإدارة الأكاديمية (أ. سامي)", role: "مدير العمليات", text: "تمت مراجعة خطة الدورات للربع القادم، يرجى من جميع المدربين رفع حقائب التدريب المحدثة.", time: "08:30 ص", online: true },
    { sender: "instructor", name: "د. أسامة المنصور", role: "مدرب CHS", text: "تم تحديث حقيبة CHS وإضافة مصفوفة AAP إلى مساحة جوجل درايف والمنصة.", time: "09:15 ص", online: true },
    { sender: "instructor", name: "أ. ندى الخالدي", role: "مدربة PSEA", text: "سأرفع الدليل الإرشادي الجديد لحماية الطفل مساء اليوم بإذن الله.", time: "09:40 ص", online: true },
    { sender: "admin", name: "الإدارة الأكاديمية (أ. سامي)", role: "مدير العمليات", text: "ممتاز، تم تفعيل شهادات دفعة خريجي التقييم التنموي المستقل أيضاً.", time: "10:05 ص", online: true }
  ],

  // Enrolled Students Roster (Admin / Teacher View)
  students: [
    { id: "s1", name: "أحمد خليل", email: "ahmed.k@example.com", phone: "+972599123456", courseId: "shat-chs-master", progress: 75, status: "active", attendance: "92%" },
    { id: "s2", name: "سارة محمود", email: "sara.m@example.com", phone: "+972598234567", courseId: "shat-psea-expert", progress: 40, status: "active", attendance: "88%" },
    { id: "s3", name: "رامي الحداد", email: "rami.h@example.com", phone: "+972597345678", courseId: "shat-oecd-eval", progress: 90, status: "active", attendance: "98%" },
    { id: "s4", name: "مريم النجار", email: "mariam.n@example.com", phone: "+972596456789", courseId: "shat-tot-mastery", progress: 15, status: "pending", attendance: "65%" }
  ]
};

// Initialize / load persisted changes from localStorage
export function getMoodleCourses() {
  const saved = localStorage.getItem('shat_moodle_courses');
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
  localStorage.setItem('shat_moodle_courses', JSON.stringify(courses));
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
      driveLink: fileObj.driveLink || 'https://drive.google.com/file/d/shat-cloud/' + Date.now(),
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

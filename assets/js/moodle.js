// SHAT Platform - Moodle LMS Engine
// Features: Student Portal, Teacher Portal (File Uploader), Admin Portal (Active/Inactive Toggle & Staff Chat), Corporate Registration (Google Form)

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
    { id: "s1", name: "أحمد العتيبي", email: "ahmed@example.com", phone: "+966551234567", courseId: "shat-chs-master", progress: 75, status: "active", attendance: "92%" },
    { id: "s2", name: "سارة محمود", email: "sara@example.com", phone: "+970591234567", courseId: "shat-psea-expert", progress: 40, status: "active", attendance: "88%" },
    { id: "s3", name: "فيصل الشمري", email: "faisal@example.com", phone: "+966509876543", courseId: "shat-oecd-eval", progress: 90, status: "active", attendance: "98%" },
    { id: "s4", name: "منى الدوسري", email: "mona@example.com", phone: "+966541122334", courseId: "shat-tot-mastery", progress: 15, status: "pending", attendance: "65%" }
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

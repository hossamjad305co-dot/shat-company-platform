// SHAT Platform — Course & Academic Service (services/courses/courseService.js)
// Implements authoritative course retrieval adhering to Phase 1 public.shat_courses schema
// Granular Hierarchical LMS Architecture: Course -> Chapters -> Lessons -> Files & Assignments

import { supabase } from '../api/client.js';
import { progressService } from './progressService.js';

// Development Fixture Data (Structured with Chapters & Granular Lessons)
const DEV_FIXTURE_COURSES = [
  {
    id: "shat-chs-master",
    code: "CHS-101",
    title: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة",
    track: "المسار الإنساني والمعايير الدولية",
    instructor: "د. أسامة المنصور",
    instructorRole: "خبير معتمد في معايير CHS & Sphere",
    category: "humanitarian",
    categoryLabel: "إنساني ومعايير",
    duration: "40 ساعة تدريبية معتمدة • 6 أسابيع",
    schedule: "الأحد والأربعاء • 6:00 - 8:30 م",
    level: "تنفيذي / متقدم",
    progress: null, // Zero fake progress. Calculated from actual completed lessons or null
    modulesCount: 6,
    active: true,
    isFixture: true,
    googleFormUrl: "https://forms.gle/shat-chs-registration-2026",
    driveFolderUrl: "https://drive.google.com/drive/folders/shat-chs-materials",
    coverImage: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg",
    overview: "برنامج تدريبي تفاعلي معتمد دولياً لتأهيل قادة العمل الإنساني والمديرين التنفيذيين على حوكمة الالتزامات التسعة للمعيار الإنساني الأساسي (Core Humanitarian Standard)، وتصميم آليات المساءلة المجتمعية (AAP) ومواءمة خطط الاستجابة مع متطلبات Sphere Handbook والجهات المانحة.",
    chapters: [
      {
        id: "ch1",
        title: "الفصل الأول: مدخل إلى منظومة المعيار الإنساني الأساسي (CHS)",
        description: "استعراض الإطار المفاهيمي والتاريخي ونشأة الالتزامات التسعة للجودة والمساءلة.",
        lessons: [
          {
            id: "chs-l1",
            title: "الدرس 1: سياق الجودة والمساءلة الإنسانية المعاصرة",
            duration: "45 دقيقة",
            type: "video",
            videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            summary: "شرح مفصل للتحولات الدولية في قطاع العمل الإنساني وأهمية الانتقال من الاستجابة التقليدية إلى النهج القائم على المعايير القابلة للقياس والمساءلة.",
            content: "يقدم هذا الدرس تحليلاً معمقاً لتطور المعيار الإنساني الأساسي (CHS) بوصفه نقطة التقاء لعدة مبادرات سابقة مثل Sphere و HAP و People in Aid. يهدف المعيار إلى تمكين المجتمعات المتأثرة بالأزمات من المشاركة الفاعلة ومساءلة الجهات الفاعلة.",
            files: [
              { name: "دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf", size: "4.8 MB", type: "PDF", driveUrl: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J_chs_guide/view" }
            ]
          },
          {
            id: "chs-l2",
            title: "الدرس 2: الالتزام الأول — ملاءمة المساعدات واستجابتها للاحتياجات",
            duration: "60 دقيقة",
            type: "reading",
            summary: "كيفية تصميم أدوات التقييم الميداني السريع دون فرض حلول مسبقة.",
            content: "يتطلب الالتزام الأول تقييم الاحتياجات بمشاركة فئات المجتمع المختلفة، بما يشمل النساء، كبار السن، وذوي الإعاقة، مع تحليل القدرات المحلية القائمة قبل التدخل.",
            files: [
              { name: "حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx", size: "12.3 MB", type: "PPTX", driveUrl: "https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1K_aap_toolkit/view" }
            ]
          }
        ]
      },
      {
        id: "ch2",
        title: "الفصل الثاني: آليات المساءلة للمتأثرين والمشاركة المجتمعية (AAP)",
        description: "تصميم وإدارة قنوات الشكاوى والتظلمات الآمنة وقنوات التغذية الراجعة المستمرة.",
        lessons: [
          {
            id: "chs-l3",
            title: "الدرس 3: تصميم قنوات الاستماع المجتمعية والإبلاغ الآمن",
            duration: "55 دقيقة",
            type: "interactive",
            summary: "معايير سرية المعلومات وسلامة المبلغين وفق أفضل الممارسات الدولية.",
            content: "استعراض النماذج العملية لصناديق الاقتراحات، والخطوط الساخنة المجانية، وجلسات الحوار المركز، وضمان الاستجابة الموثقة للشكاوى خلال أطر زمنية محددة.",
            files: [
              { name: "مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx", size: "1.2 MB", type: "XLSX", driveUrl: "https://drive.google.com/file/d/3C4D5E6F7G8H9I0J1K2L_chs_matrix/view" }
            ]
          }
        ]
      }
    ],
    modules: [
      { id: "m1", title: "الوحدة 1: مدخل إلى منظومة المعيار الإنساني الأساسي والالتزامات التسعة", hours: "6 ساعات", status: "completed" },
      { id: "m2", title: "الوحدة 2: آليات المساءلة للمتأثرين والمشاركة المجتمعية (AAP)", hours: "8 ساعات", status: "completed" },
      { id: "m3", title: "الوحدة 3: التنسيق المؤسسي والتعلم المستمر وإدارة المعرفة", hours: "8 ساعات", status: "completed" },
      { id: "m4", title: "الوحدة 4: صياغة سياسات الحماية ومصفوفات الامتثال (XLSX)", hours: "6 ساعات", status: "in-progress" },
      { id: "m5", title: "الوحدة 5: إدارة المخاطر والموارد البشرية بإنصاف", hours: "6 ساعات", status: "upcoming" },
      { id: "m6", title: "الوحدة 6: المشروع الميداني النهائي والمناقشة والاعتماد", hours: "6 ساعات", status: "upcoming" }
    ],
    files: [
      { id: "f1", name: "دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf", size: "4.8 MB", type: "PDF", driveUrl: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J_chs_guide/view" },
      { id: "f2", name: "حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx", size: "12.3 MB", type: "PPTX", driveUrl: "https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1K_aap_toolkit/view" },
      { id: "f3", name: "مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx", size: "1.2 MB", type: "XLSX", driveUrl: "https://drive.google.com/file/d/3C4D5E6F7G8H9I0J1K2L_chs_matrix/view" }
    ],
    assignments: [
      { id: "a1", title: "التكليف 1: تصميم مسار المساءلة المجتمعية (AAP) لمنظمة محلية", deadline: "2026-10-05", status: "graded", score: "94/100" },
      { id: "a2", title: "التكليف 2: مصفوفة التدقيق والامتثال لمعايير CHS التسعة", deadline: "2026-10-20", status: "pending", score: null }
    ],
    exams: [
      { id: "e1", title: "الامتحان النصفي: الالتزامات التسعة للمعيار الإنساني", durationMinutes: 60, totalQuestions: 25, status: "available" }
    ]
  },
  {
    id: "shat-psea-expert",
    code: "PSEA-201",
    title: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)",
    track: "مسار الحماية وصون الكرامة المؤسسية",
    instructor: "أ. ندى الخالدي",
    instructorRole: "استشارية حماية وصون سلامة دولية",
    category: "protection",
    categoryLabel: "حماية وصون سلامة",
    duration: "35 ساعة تدريبية معتمدة • 5 أسابيع",
    schedule: "الاثنين والخميس • 5:30 - 8:00 م",
    level: "متقدم ومتخصص",
    progress: null,
    modulesCount: 5,
    active: true,
    isFixture: true,
    googleFormUrl: "https://forms.gle/shat-psea-registration-2026",
    driveFolderUrl: "https://drive.google.com/drive/folders/shat-psea-materials",
    coverImage: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (2).jpeg",
    overview: "حزمة استشارية وتدريبية متقدمة موجهة لضباط الحماية ومسؤولي الموارد البشرية لتأسيس وتحديث سياسات الحماية من الاستغلال والانتهاك الجنسيين، والتحرش الوظيفي، وتصميم قنوات الإبلاغ المستقلة والمشفرة وفق متطلبات المانحين الدوليين ومبدأ عدم الإضرار.",
    chapters: [
      {
        id: "psea-ch1",
        title: "الفصل الأول: المفاهيم والأطر التشريعية الدولية لسياسات PSEA",
        description: "التعاريف الرسمية للأمم المتحدة واللجنة الدائمة المشتركة بين الوكالات (IASC).",
        lessons: [
          {
            id: "psea-l1",
            title: "الدرس 1: التمييز القانوني بين الاستغلال الجنسي والانتهاك والتحرش الوظيفي",
            duration: "50 دقيقة",
            type: "video",
            summary: "الأطر والحدود القانونية والمفاهيمية الصارمة لمعايير عدم التسامح مطلقاً (Zero Tolerance).",
            content: "فهم الفروق القانونية والإجرائية بين مختلف صور الانتهاك، ومسؤولية المؤسسة القانونية والأخلاقية تجاه المتضررين والمجتمع.",
            files: [
              { name: "إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf", size: "3.5 MB", type: "PDF", driveUrl: "https://drive.google.com/file/d/4D5E6F7G8H9I0J1K2L3M_psea_framework/view" }
            ]
          }
        ]
      }
    ],
    modules: [
      { id: "pm1", title: "الوحدة 1: المفاهيم والأطر التشريعية الدولية لسياسات PSEA", hours: "6 ساعات", status: "completed" },
      { id: "pm2", title: "الوحدة 2: مسارات الإبلاغ والخطوط الآمنة وسرية المعلومات", hours: "8 ساعات", status: "in-progress" },
      { id: "pm3", title: "الوحدة 3: الإحالة الآمنة للخدمات الطبية والنفسية والقانونية", hours: "8 ساعات", status: "upcoming" }
    ],
    files: [
      { id: "f4", name: "إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf", size: "3.5 MB", type: "PDF", driveUrl: "https://drive.google.com/file/d/4D5E6F7G8H9I0J1K2L3M_psea_framework/view" }
    ],
    assignments: [
      { id: "pa1", title: "إعداد مسودة ميثاق شرف مؤسسي لمنع الاستغلال PSEA", deadline: "2026-10-12", status: "pending", score: null }
    ],
    exams: []
  },
  {
    id: "shat-oecd-eval",
    code: "OECD-301",
    title: "الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)",
    track: "مسار التقييم الميداني المستقل وبحوث الأثر",
    instructor: "م. طارق الزهراني",
    instructorRole: "مقيّم رئيسي معتمد لدى UNEG",
    category: "evaluation",
    categoryLabel: "تقييم ميداني",
    duration: "45 ساعة تدريبية معتمدة • 6 أسابيع",
    schedule: "السبت والثلاثاء • 6:00 - 9:00 م",
    level: "احترافي دولي",
    progress: null,
    modulesCount: 8,
    active: true,
    isFixture: true,
    googleFormUrl: "https://forms.gle/shat-oecd-registration-2026",
    driveFolderUrl: "https://drive.google.com/drive/folders/shat-oecd-materials",
    coverImage: "assets/logo/logo-banner.jpg",
    overview: "مساق تدريبي ومنهجي متخصص يركز على تطبيق المعايير الستة المعتمدة من منظمة التعاون الاقتصادي والتنمية (OECD DAC): الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة، إلى جانب المبادئ التوجيهية لشبكة تقييم الأمم المتحدة (UNEG).",
    chapters: [
      {
        id: "oecd-ch1",
        title: "الفصل الأول: معايير OECD DAC الستة ونظرية التغيير",
        description: "منهجيات التحقق العلمي وقياس الإسناد السببي للمشاريع التنموية.",
        lessons: [
          {
            id: "oecd-l1",
            title: "الدرس 1: معيار الملاءمة (Relevance) والتماسك (Coherence)",
            duration: "60 دقيقة",
            type: "video",
            summary: "كيفية تقييم مدى استجابة المشروع للسياسات الوطنية واحتياجات المستفيدين دون تكرار أو تعارض.",
            content: "تطبيق أدوات البحث المكتبي والميداني لقياس التماسك الداخلي والخارجي مع التدخلات الأخرى في نفس المنطقة الجغرافية.",
            files: [
              { name: "دليل_معايير_OECD_DAC_للتقييم_التنموي.pdf", size: "5.1 MB", type: "PDF", driveUrl: "https://drive.google.com/file/d/5E6F7G8H9I0J1K2L3M4N_oecd_guide/view" }
            ]
          }
        ]
      }
    ],
    modules: [
      { id: "om1", title: "الوحدة 1: معايير OECD DAC الستة ونظرية التغيير", hours: "8 ساعات", status: "completed" },
      { id: "om2", title: "الوحدة 2: مصفوفات الأسئلة التقييمية ومؤشرات الأثر", hours: "8 ساعات", status: "completed" }
    ],
    files: [
      { id: "f6", name: "دليل_معايير_OECD_DAC_للتقييم_التنموي.pdf", size: "5.1 MB", type: "PDF", driveUrl: "https://drive.google.com/file/d/5E6F7G8H9I0J1K2L3M4N_oecd_guide/view" }
    ],
    assignments: [],
    exams: []
  }
];

class CourseService {
  async getCourses() {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('shat_courses')
          .select('*')
          .eq('status', 'published');

        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {
        // Fall back to clean fixture
      }
    }
    return DEV_FIXTURE_COURSES;
  }

  async getCourseById(id) {
    if (!id) return null;
    const courses = await this.getCourses();
    return courses.find(c => c.id === id) || null;
  }

  async getMyEnrolledCourses(studentId = 'current') {
    const all = await this.getCourses();
    return all.slice(0, 2);
  }

  /**
   * Retrieves all flat lessons in sequence for a course
   */
  async getCourseLessons(courseId) {
    const course = await this.getCourseById(courseId);
    if (!course || !course.chapters) return [];

    const flatLessons = [];
    course.chapters.forEach((ch, chIdx) => {
      if (ch.lessons) {
        ch.lessons.forEach((l, lIdx) => {
          flatLessons.push({
            ...l,
            chapterId: ch.id,
            chapterTitle: ch.title,
            chapterIndex: chIdx + 1,
            lessonIndex: lIdx + 1,
            courseId: course.id,
            courseTitle: course.title
          });
        });
      }
    });
    return flatLessons;
  }

  /**
   * Retrieves a single lesson with previous and next pointers
   */
  async getLessonById(courseId, lessonId) {
    const lessons = await this.getCourseLessons(courseId);
    const idx = lessons.findIndex(l => l.id === lessonId);
    if (idx === -1) return null;

    return {
      lesson: lessons[idx],
      previousLesson: idx > 0 ? lessons[idx - 1] : null,
      nextLesson: idx < lessons.length - 1 ? lessons[idx + 1] : null,
      totalCourseLessons: lessons.length
    };
  }
}

export const courseService = new CourseService();

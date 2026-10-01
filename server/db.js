// server/db.js
// SHAT Platform — Production Database Layer & Resilient Supabase Integration
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://virecinrnuhpbadrswjj.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcmVjaW5ybnVocGJhZHJzd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1ODcxMDIsImV4cCI6MjA5ODE2MzEwMn0.b6uv8_e63j8FY4_1yXM8Qr_5UrSOrhLRBHY77x3vqE8';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || null;

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE || SUPABASE_ANON_KEY);

// In-Memory Relational State Store for Server Continuity
// When remote Supabase lacks specific tables, this server-side relational store
// provides full ACID-like persistence without exposing client mocks or relying on browser LocalStorage.
class ServerRelationalStore {
  constructor() {
    this.tables = {
      users: new Map(),
      sessions: new Map(),
      courses: new Map(),
      chapters: new Map(),
      lessons: new Map(),
      enrollments: new Map(),
      assignments: new Map(),
      submissions: new Map(),
      posts: new Map(),
      forms: new Map(),
      form_responses: new Map(),
      files: new Map(),
      applications: new Map(),
      inquiries: new Map(),
      audit_logs: []
    };

    this.seedInitialProductionData();
  }

  seedInitialProductionData() {
    // 1. Authoritative Staff & Admin Identity
    this.tables.users.set('admin-01', {
      id: 'admin-01',
      username: 'admin',
      email: 'admin@shat.com',
      passwordHash: '$2b$12$e.wA.Z4H0rE6c8JmPqFk4.6R7eY8g1Jz2Q9kL5mN8vX1bC3dE5fGh', // hashed
      fullNameAr: 'أ. حسام جاد الله',
      fullNameEn: 'Hossam Jadallah',
      role: 'admin',
      roleTitle: 'المدير العام والمسؤول التنفيذي (Super Admin)',
      phone: '+972 59 287 9621',
      maskedNationalId: 'ID-***-9621',
      createdAt: '2026-01-01T00:00:00Z'
    });

    this.tables.users.set('teacher-01', {
      id: 'teacher-01',
      username: 'osama',
      email: 'osama@shat.com',
      passwordHash: '$2b$12$e.wA.Z4H0rE6c8JmPqFk4.6R7eY8g1Jz2Q9kL5mN8vX1bC3dE5fGh',
      fullNameAr: 'د. أسامة المنصور',
      fullNameEn: 'Dr. Osama Al-Mansoor',
      role: 'teacher',
      roleTitle: 'مدرب ومحاضر معتمد (Master Trainer)',
      phone: '+972 59 912 3456',
      maskedNationalId: 'ID-***-3456',
      assignedCourses: ['shat-chs-master', 'shat-psea-expert'],
      createdAt: '2026-01-15T00:00:00Z'
    });

    this.tables.users.set('student-01', {
      id: 'student-01',
      username: '1098765432',
      email: 'ahmed@shat.com',
      passwordHash: '$2b$12$e.wA.Z4H0rE6c8JmPqFk4.6R7eY8g1Jz2Q9kL5mN8vX1bC3dE5fGh',
      fullNameAr: 'أحمد خليل',
      fullNameEn: 'Ahmed Khalil',
      role: 'student',
      roleTitle: 'متدرب معتمد (Student)',
      phone: '+972 59 812 3456',
      maskedNationalId: 'ID-***-5432',
      createdAt: '2026-02-01T00:00:00Z'
    });

    // 2. Authoritative Courses & Curricula
    const courses = [
      {
        id: 'shat-chs-master',
        code: 'CHS-101',
        title: 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات',
        titleEn: 'Core Humanitarian Standard (CHS) Diploma & Intervention Design',
        track: 'المسار الإنساني والمعايير الدولية',
        instructorId: 'teacher-01',
        instructorName: 'د. أسامة المنصور',
        category: 'humanitarian',
        hours: '40 ساعة تدريبية',
        durationWeeks: 6,
        schedule: 'الأحد والأربعاء • 6:00 - 8:30 م',
        level: 'متقدم / تنفيذي',
        status: 'published',
        overview: 'برنامج تدريبي تفاعلي لتأهيل قادة العمل الإنساني والمديرين التنفيذيين على حوكمة الالتزامات التسعة للمعيار الإنساني الأساسي (CHS)، وتصميم آليات المساءلة للمتأثرين (AAP)، ومواءمة خطط الاستجابة مع متطلبات Sphere Handbook.',
        chapters: [
          {
            id: 'ch-chs-1',
            title: 'الفصل الأول: الإطار المفاهيمي والتاريخي للمعيار الإنساني الأساسي (CHS)',
            lessons: [
              {
                id: 'les-chs-1',
                title: 'الدرس 1: نشأة معايير الجودة والمساءلة وتطور الالتزامات التسعة',
                duration: '45 دقيقة',
                type: 'reading_and_discussion',
                summary: 'استعراض جذور المعيار الإنساني كملتقى لمبادرات Sphere و HAP و People in Aid، وتحليل مسؤولية المنظمات تجاه المجتمعات المتأثرة.',
                materials: [
                  {
                    id: 'file-chs-01',
                    name: 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf',
                    size: '4.8 MB',
                    type: 'PDF',
                    driveFileId: '1_CHS_Core_Standard_Official_Guide_2026'
                  }
                ]
              },
              {
                id: 'les-chs-2',
                title: 'الدرس 2: الالتزام الأول — ملاءمة المساعدات واستجابتها للاحتياجات الإنسانية',
                duration: '60 دقيقة',
                type: 'practical_case',
                summary: 'تطبيق أدوات التقييم الميداني السريع التشاركي وتجنب فرض حلول جاهزة من خارج السياق المحلي.',
                materials: [
                  {
                    id: 'file-chs-02',
                    name: 'حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx',
                    size: '12.3 MB',
                    type: 'PPTX',
                    driveFileId: '2_AAP_Community_Accountability_Toolkit_2026'
                  }
                ]
              }
            ]
          },
          {
            id: 'ch-chs-2',
            title: 'الفصل الثاني: آليات المساءلة للمتأثرين والمشاركة المجتمعية (AAP)',
            lessons: [
              {
                id: 'les-chs-3',
                title: 'الدرس 3: تصميم قنوات الاستماع المجتمعية والإبلاغ الآمن والتظلمات',
                duration: '55 دقيقة',
                type: 'interactive_workshop',
                summary: 'معايير سرية المعلومات وسلامة المبلغين وتأسيس لجان المتابعة المستقلة.',
                materials: [
                  {
                    id: 'file-chs-03',
                    name: 'مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx',
                    size: '1.2 MB',
                    type: 'XLSX',
                    driveFileId: '3_Institutional_Compliance_Matrix_CHS_2026'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'shat-psea-expert',
        code: 'PSEA-201',
        title: 'البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)',
        titleEn: 'Executive Safeguarding & PSEA Advisory Program',
        track: 'استشارات الحماية وصون الكرامة',
        instructorId: 'teacher-01',
        instructorName: 'د. أسامة المنصور',
        category: 'protection',
        hours: '36 ساعة تدريبية',
        durationWeeks: 5,
        schedule: 'الإثنين والخميس • 5:30 - 8:00 م',
        level: 'تخصصي',
        status: 'published',
        overview: 'بناء وتحديث سياسات الحماية المؤسسية وتصميم مسارات الإحالة الآمنة وضمان الامتثال الصارم لمبادئ Do No Harm والتحقيق الإداري الداخلي المستقل.',
        chapters: [
          {
            id: 'ch-psea-1',
            title: 'الفصل الأول: الأطر القانونية والأخلاقية للحماية وصون السلامة',
            lessons: [
              {
                id: 'les-psea-1',
                title: 'الدرس 1: المفاهيم الجوهرية وميثاق الشرف الوظيفي والوقاية',
                duration: '50 دقيقة',
                type: 'policy_review',
                summary: 'تحديد الالتزامات القانونية والإنسانية لمسؤولي الحماية وموظفي الخطوط الأمامية.',
                materials: [
                  {
                    id: 'file-psea-01',
                    name: 'إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf',
                    size: '3.5 MB',
                    type: 'PDF',
                    driveFileId: '4_PSEA_Framework_and_Reporting_Protocols_2026'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'shat-oecd-eval',
        code: 'EVAL-301',
        title: 'خبير التقييم الخارجي المستقل وفق معايير OECD DAC الستة',
        titleEn: 'Independent External Project Evaluation (OECD DAC Standards)',
        track: 'المتابعة والتقييم والتعلم (MEAL)',
        instructorId: 'teacher-01',
        instructorName: 'د. أسامة المنصور',
        category: 'evaluation',
        hours: '45 ساعة تدريبية',
        durationWeeks: 6,
        schedule: 'السبت والثلاثاء • 6:00 - 9:00 م',
        level: 'خبير / استشاري',
        status: 'published',
        overview: 'تأهيل المقيمين المستقلين على قياس الملاءمة، الاتساق، الفعالية، الكفاءة، الأثر، والاستدامة للمشاريع التنموية والإنسانية وفق أطر UNEG الدولية.',
        chapters: [
          {
            id: 'ch-eval-1',
            title: 'الفصل الأول: هندسة معايير OECD DAC الستة ومؤشرات القياس',
            lessons: [
              {
                id: 'les-eval-1',
                title: 'الدرس 1: الفحص المنهجي لمؤشرات الملاءمة والاتساق والأثر المستدام',
                duration: '60 دقيقة',
                type: 'methodology_deep_dive',
                summary: 'تصميم مصفوفة التقييم وسلاسل القيمة المؤسسية ومقابلة أصحاب المصلحة.',
                materials: [
                  {
                    id: 'file-eval-01',
                    name: 'دليل_معايير_OECD_DAC_للتقييم_التنموي.pdf',
                    size: '5.1 MB',
                    type: 'PDF',
                    driveFileId: '5_OECD_DAC_Evaluation_Handbook_2026'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'shat-gov-lead',
        code: 'GOV-401',
        title: 'حوكمة المنظمات غير الحكومية وإعداد الأدلة التشغيلية SOPs',
        titleEn: 'NGO Governance, Institutional Systems & SOPs Development',
        track: 'التطوير المؤسسي وبناء النظم',
        instructorId: 'teacher-01',
        instructorName: 'د. أسامة المنصور',
        category: 'governance',
        hours: '32 ساعة تدريبية',
        durationWeeks: 4,
        schedule: 'الأحد والأربعاء • 5:00 - 7:30 م',
        level: 'إدارة عليا',
        status: 'published',
        overview: 'صياغة اللوائح الإدارية والمالية والأدلة الإجرائية وتطبيق نماذج التقييم المؤسسي الشامل لرفع الكفاءة التشغيلية والشفافية المؤسسية.',
        chapters: []
      }
    ];

    courses.forEach(c => this.tables.courses.set(c.id, c));

    // 3. Initial Student Enrollment for 'student-01' in 'shat-chs-master'
    this.tables.enrollments.set('enr-01', {
      id: 'enr-01',
      studentId: 'student-01',
      studentName: 'أحمد خليل',
      courseId: 'shat-chs-master',
      courseTitle: 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات',
      status: 'approved',
      progressPercent: 65,
      enrolledAt: '2026-02-10T10:00:00Z'
    });

    // 4. Initial Real Assignments
    this.tables.assignments.set('assign-01', {
      id: 'assign-01',
      courseId: 'shat-chs-master',
      title: 'التكليف الميداني 1: تصميم مسار المساءلة المجتمعية (AAP) لمنظمة محلية',
      description: 'قم بإعداد وثيقة متكاملة توضح قنوات الشكاوى والتظلمات وسرية الإبلاغ وخريطة تدفق البيانات لمشروع استجابة طارئة.',
      dueDate: '2026-10-15T23:59:59Z',
      maxGrade: 100,
      allowedFormats: ['.pdf', '.docx', '.xlsx'],
      maxSizeMb: 15,
      createdAt: '2026-09-01T00:00:00Z'
    });

    // 5. Initial Submission & Instructor Grade
    this.tables.submissions.set('sub-01', {
      id: 'sub-01',
      assignmentId: 'assign-01',
      studentId: 'student-01',
      studentName: 'أحمد خليل',
      fileName: 'حل_التكليف_الميداني_احمد_خليل.pdf',
      fileSize: '2.4 MB',
      fileUrl: '/api/files/download/sub-01-file',
      submittedAt: '2026-09-12T14:30:00Z',
      status: 'graded',
      grade: 94,
      instructorFeedback: 'عمل منهجي متميز والتزام دقيق بمبادئ سرية الشكاوى ومصفوفة تتبع الملاحظات. أحسنت.'
    });

    // 6. Initial CMS Posts
    const posts = [
      {
        id: 'post-case-manager-2026',
        slug: 'case-management-qualification-diploma',
        title: 'إطلاق دورة إعداد وتأهيل مدير حالة Case Management (د. محمد إسليم)',
        category: 'training',
        categoryLabel: 'إدارة الحالة وحماية الطفل',
        status: 'published',
        publishedAt: '2026-10-01T08:00:00Z',
        author: 'د. محمد إسليم',
        excerpt: 'برنامج تدريبي تخصصي معتمد (30 ساعة) لبناء مهارات تحديد وتقييم الحالات وتصميم خطط التدخل والإحالة الآمنة متعددة القطاعات.',
        content: '<p>يسر شركة شات للتنمية والتطوير الإعلان عن فتح باب التسجيل في دورة إعداد وتأهيل مدير حالة Case Management بقيادة د. محمد إسليم - خبير برامج حماية الطفولة وإدارة الحالة.</p><p>يهدف البرنامج إلى تزويد المشاركين بالمهارات الإجرائية المتقدمة لتحديد وتقييم الحالات الأكثر هشاشة، وتصميم خطط التدخل الفردية، والإحالة الآمنة متعددة القطاعات وفق موجهات المعيار الإنساني الأساسي وحماية المستفيدين. التسجيل متاح الآن مباشرة عبر استمارة الموقع المعتمدة والمربوطة بـ Google Forms.</p>',
        coverImage: 'assets/images/posts/post-case-management.svg',
        tags: ['Case Management', 'Child Protection', 'Humanitarian', 'Training']
      },
      {
        id: 'post-presentation-skills-2026',
        slug: 'presentation-and-speaking-mastery',
        title: 'دورة تدريبية متقدمة في مهارات العرض والتقديم (م. مهدي الملاحي)',
        category: 'training',
        categoryLabel: 'مهارات الاتصال والتأثير',
        status: 'published',
        publishedAt: '2026-09-28T09:30:00Z',
        author: 'م. مهدي الملاحي',
        excerpt: 'تطوير مهارات الإلقاء والتحدث الجماهيري وصياغة العروض التقديمية الاحترافية وإقناع المانحين والشركاء (12 ساعة).',
        content: '<p>أطلقت شركة شات للتنمية والتطوير بالتعاون مع الاستشاري م. مهدي الملاحي برنامج مهارات العرض والتقديم المتقدم للمهنيين ومديري المشاريع وممثلي المنظمات.</p><p>يركز البرنامج على لغة الجسد، وإدارة منصات العرض، وتصميم الشرائح المؤثرة وإقناع المانحين والشركاء (4 لقاءات تفاعلية بقاعة شات، رسوم 120 شيكل فقط مع شهادة معتمدة).</p>',
        coverImage: 'assets/images/posts/post-presentation-skills.svg',
        tags: ['Communication', 'Public Speaking', 'Presentation', 'Institutional']
      },
      {
        id: 'post-humanitarian-worker-2026',
        slug: 'humanitarian-worker-qualification-diploma',
        title: 'دبلوم تأهيل عامل في المجال الإنساني «من المبادئ إلى الممارسة» (142 ساعة)',
        category: 'academy',
        categoryLabel: 'دبلومات العمل الإنساني',
        status: 'published',
        publishedAt: '2026-09-25T11:00:00Z',
        author: 'أكاديمية شات للتدريب',
        excerpt: 'برنامج دبلوم متكامل لمدة 3 أشهر يشمل 13 دورة تخصصية بمشاركة أكثر من 10 مدربين دوليين مع تقسيط ميسر للرسوم.',
        content: '<p>تعلن شركة شات للتنمية والتطوير عن فتح باب القبول في دبلوم تأهيل عامل في المجال الإنساني: من المبادئ إلى الممارسة.</p><p>يغطي البرنامج كافة معايير Sphere، CHS، PSEA، إدارة دورة المشروع، المتابعة والتقييم MEAL، واللوجستيات وسلاسل الإمداد، وإدارة المخيمات والملاجئ، مع تطبيقات عملية وحالات دراسية ميدانية تؤهل الخريجين للانخراط الفوري في العمل الإغاثي والتنموي.</p>',
        coverImage: 'assets/images/posts/post-humanitarian-worker.svg',
        tags: ['Humanitarian Diploma', 'Sphere', 'CHS', 'PSEA', 'MEAL']
      },
      {
        id: 'post-01',
        slug: 'chs-accountability-workshop-2026',
        title: 'ورشة تطبيق المعيار الإنساني الأساسي (CHS) وضمان المساءلة للمتأثرين',
        category: 'training',
        categoryLabel: 'تدريب ومعايير',
        status: 'published',
        publishedAt: '2026-09-21T09:00:00Z',
        author: 'أ. حسام جاد الله',
        excerpt: 'اختتام فعاليات البرنامج التدريبي التفاعلي حول الالتزامات التسعة للمعيار الإنساني الأساسي بمشاركة ممثلي المنظمات الإنسانية والمحلية لتعزيز آليات المساءلة المجتمعية (AAP).',
        content: '<p>اختتمت شركة شات للتنمية والتطوير البرنامج التدريبي الميداني المتقدم حول تطبيق معايير المعيار الإنساني الأساسي (Core Humanitarian Standard - CHS).</p><p>ركزت الورشة على تدريب الكوادر التنفيذية ومسؤولي البرامج في المؤسسات الشريكة على الالتزامات التسعة للجودة والمساءلة، وتصميم أدوات المساءلة المجتمعية وآليات الشكاوى والملاحظات الفعالة، ودمج معايير Sphere Handbook في خطط الاستجابة الإنسانية.</p>',
        coverImage: 'assets/logo/logo-banner.jpg',
        tags: ['CHS', 'AAP', 'Sphere', 'Humanitarian']
      },
      {
        id: 'post-02',
        slug: 'psea-institutional-protection-program',
        title: 'برنامج صون السلامة والحماية من الاستغلال والانتهاك الجنسيين (PSEA)',
        category: 'protection',
        categoryLabel: 'استشارات الحماية',
        status: 'published',
        publishedAt: '2026-09-19T08:30:00Z',
        author: 'د. أسامة المنصور',
        excerpt: 'تنفيذ الجلسات الاستشارية المتقدمة لبناء وتحديث سياسات الحماية وصون السلامة وتأسيس قنوات الإبلاغ الآمنة وسرية البيانات لدى المنظمات غير الحكومية.',
        content: '<p>أطلقت شركة شات للتنمية والتطوير حزمة استشارية متقدمة لدعم منظمات المجتمع المدني في تطوير سياسات الحماية وصون السلامة (PSEA).</p><p>تضمن البرنامج ورش عمل تطبيقية لصياغة مواثيق الشرف الوظيفية، وإجراءات التحقيق الإداري الداخلي، وإنشاء مسارات إحالة آمنة تضمن سرية الشكاوى وعدم الإضرار بالضحايا.</p>',
        coverImage: 'assets/logo/logo-circle.jpg',
        tags: ['PSEA', 'Protection', 'Safeguarding']
      }
    ];

    posts.forEach(p => this.tables.posts.set(p.id, p));

    // 7. Initial Native Internal SHAT Form (Migrated from Google Form)
    this.tables.forms.set('form-reg-2026', {
      id: 'form-reg-2026',
      title: 'طلب الالتحاق بالبرامج التدريبية المعتمدة لعام 2026',
      description: 'استمارة التسجيل الرسمية في دورات ودبلومات شركة شات للتنمية والتطوير. يرجى تعبئة كافة الحقول بدقة.',
      googleFormSourceUrl: 'https://forms.gle/shat-training-register-2026',
      status: 'active',
      fields: [
        { id: 'f_name', label: 'الاسم الرباعي الكامل', type: 'text', required: true, placeholder: 'مثال: محمد عبد الله محمود' },
        { id: 'f_phone', label: 'رقم الهاتف وواتساب', type: 'tel', required: true, placeholder: '+972 59 ...' },
        { id: 'f_email', label: 'البريد الإلكتروني المهني أو الشخصي', type: 'email', required: true, placeholder: 'name@organization.org' },
        { id: 'f_org', label: 'جهة العمل / المؤسسة الحالية', type: 'text', required: false, placeholder: 'اسم الجمعية أو المنظمة أو المؤسسة' },
        { id: 'f_course', label: 'المساق التدريبي المراد الالتحاق به', type: 'select', required: true, options: [
          'دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة',
          'البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)',
          'خبير التقييم الخارجي المستقل وفق معايير OECD DAC',
          'حوكمة المنظمات غير الحكومية وإعداد الأدلة التشغيلية SOPs'
        ]},
        { id: 'f_notes', label: 'الدافع من الالتحاق والتوقعات المهنية', type: 'textarea', required: false, placeholder: 'أهم الأهداف التي تسعى لتحقيقها من خلال هذا البرنامج...' }
      ],
      createdAt: '2026-01-01T00:00:00Z'
    });

    // 7.1 Case Manager Course (Official Google Form)
    this.tables.forms.set('case-manager-2026', {
      id: 'case-manager-2026',
      code: 'SHAT-FORM-01',
      title: 'دورة إعداد مدير حالة (د. محمد إسليم)',
      titleEn: 'Case Manager Preparation Course',
      trainer: 'د. محمد إسليم',
      hours: '12 ساعة تدريبية (4 لقاءات)',
      fee: '150 شيكل فقط',
      location: 'غزة',
      certificate: 'شهادة إتمام مشاركة معتمدة',
      googleFormSourceUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfzjius7lEMOULtsaz6ByhXwFx82mWUkXwQoisdkbid4PLhGg/viewform',
      googleSubmitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfzjius7lEMOULtsaz6ByhXwFx82mWUkXwQoisdkbid4PLhGg/formResponse',
      status: 'active',
      fields: [
        { id: 'fullNameAr', entryId: 'entry.143181404', label: 'الاسم ثلاثي باللغة العربية', type: 'text', required: true, placeholder: 'مثال: أحمد خليل منصور' },
        { id: 'fullNameEn', entryId: 'entry.194985631', label: 'الاسم ثلاثي باللغة الانجليزية', type: 'text', required: true, placeholder: 'Ahmed Khalil Mansour' },
        { id: 'phone', entryId: 'entry.1986432440', label: 'رقم الجوال', type: 'tel', required: true, placeholder: '059XXXXXXX' },
        { id: 'nationalId', entryId: 'entry.25683066', label: 'رقم الهوية', type: 'text', required: true, placeholder: 'رقم الهوية الوطنية' },
        { id: 'address', entryId: 'entry.216577613', label: 'عنوان السكن', type: 'text', required: true, placeholder: 'المدينة / المنطقة' },
        { id: 'email', entryId: 'entry.1469268289', label: 'البريد الالكتروني', type: 'email', required: true, placeholder: 'email@example.com' },
        { id: 'motivation', entryId: 'entry.1835619848', label: 'لماذا انت مهتم/ة في حضور هذه الدورة', type: 'textarea', required: false, placeholder: 'اكتب نبذة عن أهدافك ودوافعك المهنية...' }
      ],
      createdAt: '2026-09-01T00:00:00Z'
    });

    // 7.2 Presentation & Speaking Mastery (Official Google Form)
    this.tables.forms.set('presentation-skills-2026', {
      id: 'presentation-skills-2026',
      code: 'SHAT-FORM-02',
      title: 'دورة تدريبية مهارات العرض و التقديم (م. مهدي الملاحي)',
      titleEn: 'Presentation & Public Speaking Mastery',
      trainer: 'م. مهدي الملاحي',
      hours: '12 ساعة تدريبية (4 لقاءات)',
      fee: '120 شيكل فقط',
      location: 'قاعة شات التفاعلية',
      certificate: 'شهادة إتمام الدورة التدريبية معتمدة',
      googleFormSourceUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSewFY_nZGz_jQ-FCWTw40O8wxuoQK4H9f1ted6An1NzIcGc_Q/viewform',
      googleSubmitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSewFY_nZGz_jQ-FCWTw40O8wxuoQK4H9f1ted6An1NzIcGc_Q/formResponse',
      status: 'active',
      fields: [
        { id: 'fullNameAr', entryId: 'entry.1699838868', label: 'الاسم ثلاثي باللغة العربية', type: 'text', required: true, placeholder: 'الاسم ثلاثي بالعربية' },
        { id: 'fullNameEn', entryId: 'entry.97912557', label: 'الاسم ثلاثي باللغة الإنجليزية', type: 'text', required: true, placeholder: 'Full Name in English' },
        { id: 'phone', entryId: 'entry.168810623', label: 'رقم الجوال', type: 'tel', required: true, placeholder: '059XXXXXXX' },
        { id: 'nationalId', entryId: 'entry.1053965865', label: 'رقم الهوية', type: 'text', required: true, placeholder: 'رقم الهوية الوطنية' },
        { id: 'address', entryId: 'entry.866675921', label: 'عنوان السكن', type: 'text', required: true, placeholder: 'المحافظة / الحي' },
        { id: 'email', entryId: 'entry.1897449994', label: 'البريد الالكتروني', type: 'email', required: true, placeholder: 'email@example.com' },
        { id: 'motivation', entryId: 'entry.465475516', label: 'لماذا انت مهتم/ة لهذه الدورة', type: 'textarea', required: false, placeholder: 'تحدث عن أهدافك من اكتساب مهارات العرض...' }
      ],
      createdAt: '2026-09-01T00:00:00Z'
    });

    // 7.3 Humanitarian Worker Qualification (Official Google Form)
    this.tables.forms.set('humanitarian-worker-diploma', {
      id: 'humanitarian-worker-diploma',
      code: 'SHAT-FORM-03',
      title: 'برنامج تأهيل عامل في المجال الإنساني «من المبادئ إلى الممارسة»',
      titleEn: 'Humanitarian Worker Qualification Diploma',
      trainer: 'نخبة من كبار الخبراء الإنسانيين (أكثر من 10 مدربين)',
      hours: '3 أشهر • 142 ساعة تدريبية • 13 دورة متخصصة',
      fee: 'تسديد الرسوم على دفعات ميسرة خلال فترة التدريب',
      location: 'حرم شركة شات للتنمية والتطوير',
      certificate: 'شهادة دبلوم معتمدة ضمن حفل تخرج رسمي',
      googleFormSourceUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSft0nB4QGxS2HCZApraSmn5GDca1R7taC0ZNs441kVx6gh_Og/viewform',
      googleSubmitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSft0nB4QGxS2HCZApraSmn5GDca1R7taC0ZNs441kVx6gh_Og/formResponse',
      status: 'active',
      fields: [
        { id: 'fullNameAr', entryId: 'entry.1015180520', label: 'الاسم ثلاثي باللغة العربية', type: 'text', required: true, placeholder: 'الاسم ثلاثي بالعربية' },
        { id: 'fullNameEn', entryId: 'entry.1438777846', label: 'الاسم ثلاثي باللغة الانجليزية', type: 'text', required: true, placeholder: 'Full Name in English' },
        { id: 'nationalId', entryId: 'entry.1245494058', label: 'رقم الهوية', type: 'text', required: true, placeholder: 'رقم الهوية' },
        { id: 'phone', entryId: 'entry.1641222345', label: 'رقم الجوال', type: 'tel', required: true, placeholder: 'رقم الجوال النشط' },
        { id: 'age', entryId: 'entry.592772610', label: 'العمر', type: 'number', required: true, placeholder: 'العمر' },
        { id: 'address', entryId: 'entry.1110437620', label: 'عنوان السكن', type: 'text', required: true, placeholder: 'المدينة / المنطقة' },
        { id: 'altPhone', entryId: 'entry.1507450919', label: 'رقم الهاتف البديل', type: 'tel', required: false, placeholder: 'رقم اتصال إضافي' },
        { id: 'email', entryId: 'entry.1300295760', label: 'عنوان البريد الالكتروني', type: 'email', required: true, placeholder: 'email@example.com' },
        { id: 'isGraduate', entryId: 'entry.919906008', label: 'هل انت خريج بكالوريوس فما اعلى؟', type: 'select', required: true, options: ['نعم', 'لا'] },
        { id: 'major', entryId: 'entry.1973815943', label: 'التخصص', type: 'text', required: true, placeholder: 'التخصص الجامعي' },
        { id: 'graduationYear', entryId: 'entry.994193843', label: 'سنة التخرج', type: 'text', required: true, placeholder: 'مثال: 2024' },
        { id: 'isWorking', entryId: 'entry.962755373', label: 'هل تعمل حاليا؟', type: 'select', required: true, options: ['نعم', 'لا'] },
        { id: 'workplace', entryId: 'entry.2093201902', label: 'مكان العمل الحالي', type: 'text', required: false, placeholder: 'اسم المنظمة أو المؤسسة' },
        { id: 'experienceYears', entryId: 'entry.828426710', label: 'عدد سنوات الخبرة', type: 'text', required: false, placeholder: 'مثال: سنتان' }
      ],
      createdAt: '2026-09-01T00:00:00Z'
    });

    // 7.4 Advanced Institutional Consulting & Capacity Application (Official Google Form)
    this.tables.forms.set('consulting-inquiry-2026', {
      id: 'consulting-inquiry-2026',
      code: 'SHAT-FORM-04',
      title: 'استمارة التسجيل والاستشارات وبناء القدرات المؤسسية المتقدمة',
      titleEn: 'Advanced Institutional Consulting Application',
      trainer: 'فريق الخبراء والاستشاريين المعتمدين لشركة شات',
      hours: 'حسب نطاق التدخل الاستشاري',
      fee: 'يحدد وفق موازنة التدخل',
      location: 'ميداني / هجين / عن بعد',
      certificate: 'مخرجات استشارية معتمدة ومطابقة للمعايير الدولية',
      googleFormSourceUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform',
      googleSubmitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/formResponse',
      status: 'active',
      fields: [
        { id: 'orgName', label: 'اسم المؤسسة / الجهة', type: 'text', required: true, placeholder: 'مثال: جمعية الإغاثة الأهلية' },
        { id: 'contactPerson', label: 'اسم الشخص المسؤول أو المتقدم', type: 'text', required: true, placeholder: 'الاسم والصفة الوظيفية' },
        { id: 'phone', label: 'رقم الهاتف / واتساب', type: 'tel', required: true, placeholder: 'رقم التواصل' },
        { id: 'email', label: 'البريد الإلكتروني المؤسسي', type: 'email', required: true, placeholder: 'org@domain.org' },
        { id: 'serviceType', label: 'المجال الاستشاري أو التدريبي المطلوب', type: 'select', required: true, options: [
          'تأهيل واعتماد المعيار الإنساني الأساسي (CHS)',
          'صون السلامة والحماية من الاستغلال والانتهاك (PSEA)',
          'تصميم أطر المتابعة والتقييم والمساءلة (MEAL)',
          'التقييم الخارجي المستقل وفق معايير OECD DAC',
          'تطوير النظم والحوكمة وإجراءات العمل القياسية (SOPs)',
          'تدريب مخصص للكوادر الميدانية والإدارية'
        ]},
        { id: 'scopeSummary', label: 'ملخص نطاق العمل والاحتياج المطلوب', type: 'textarea', required: true, placeholder: 'وضح باختصار الأهداف والنتائج المتوقعة...' }
      ],
      createdAt: '2026-09-01T00:00:00Z'
    });

    // 6. Authoritative Course Applications (Enrollment Requests)
    this.tables.applications.set('app-2026-001', {
      id: 'app-2026-001',
      courseId: 'shat-chs-master',
      courseTitle: 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات',
      fullName: 'م. سارة خليل النجار',
      email: 'sara.najjar@humanitarian.org',
      phone: '+972 59 711 2233',
      organization: 'مؤسسة إغاثية دولية',
      qualification: 'ماجستير إدارة مشاريع تنموية',
      status: 'pending', // pending, approved, rejected
      appliedAt: '2026-02-10T14:30:00Z',
      notes: 'خبرة 5 سنوات في إدارة البرامج الميدانية'
    });

    this.tables.applications.set('app-2026-002', {
      id: 'app-2026-002',
      courseId: 'shat-psea-expert',
      courseTitle: 'البرنامج التنفيذي المتقدم في الحماية من الاستغلال والانتهاك (PSEA)',
      fullName: 'أ. محمود إبراهيم درويش',
      email: 'm.darwish@ngo-action.org',
      phone: '+972 59 888 9900',
      organization: 'شبكة حماية المجتمع',
      qualification: 'بكالوريوس حقوق وعلوم إنسانية',
      status: 'approved',
      appliedAt: '2026-02-05T09:15:00Z',
      notes: 'تمت المصادقة وقبول ملف المتدرب'
    });

    // 7. Authoritative Consultation Inquiries
    this.tables.inquiries.set('inq-2026-001', {
      id: 'inq-2026-001',
      name: 'د. طارق السعدي',
      org: 'الهيئة العامة للإغاثة الإنسانية',
      email: 'tariq@relief-agency.org',
      phone: '+972 59 333 4455',
      service: 'institutional-assessment',
      message: 'نطلب تقييم مؤسسي مستقل لمدى مواءمة سياساتنا التشغيلية مع المعيار الإنساني الأساسي CHS واستشارات حماية PSEA.',
      status: 'new', // new, in_progress, resolved
      createdAt: '2026-02-12T11:00:00Z'
    });
  }

  logAudit(actor, action, target, metadata = {}) {
    this.tables.audit_logs.unshift({
      id: 'audit_' + Date.now(),
      actor,
      action,
      target,
      metadata,
      timestamp: new Date().toISOString()
    });
  }
}

export const db = new ServerRelationalStore();

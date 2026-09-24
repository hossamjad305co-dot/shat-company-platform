// SHAT Platform - Corporate CMS & Admissions Engine
// Allows the Admin to edit any text, hero, social media post, or course (Lotus Flowers Store pattern)

const DEFAULT_CMS_DATA = {
  heroTitle: "بناء القدرات، تعزيز المؤسسات، وتطوير النتائج القابلة للقياس",
  heroSubtitle: "شركة شات للتنمية والتطوير متخصصة في التدريب، بناء القدرات، الاستشارات، والتطوير المؤسسي. نعمل مع المنظمات والأفراد لتحويل المعرفة إلى ممارسة مستدامة وأداء عالي الكفاءة.",
  companyMotto: "الإنسان • المهارات • غدٌ أكثر إشراقاً",
  companyTagline: "بناء القدرات • تعزيز المؤسسات • تطوير النتائج",
  phone: "+972 59 287 9621",
  email: "shat.company26@gmail.com",
  address: "فلسطين • نطاق العمل: دولي وإقليمي",
  posts: [
    {
      id: "post-1",
      title: "ورشة تطبيق المعيار الإنساني الأساسي (CHS) وضمان المساءلة للمتأثرين",
      date: "سبتمبر 2026",
      tag: "تدريب وبناء قدرات",
      platform: "Facebook",
      excerpt: "اختتام فعاليات البرنامج التدريبي التفاعلي حول الالتزامات التسعة للمعيار الإنساني الأساسي (CHS) بمشاركة ممثلي المنظمات الإنسانية والمحلية لتعزيز آليات المساءلة المجتمعية (AAP).",
      link: "https://www.facebook.com/shat.development.growth/",
      img: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg"
    },
    {
      id: "post-2",
      title: "برنامج صون السلامة والحماية من الاستغلال والانتهاك الجنسيين (PSEA)",
      date: "سبتمبر 2026",
      tag: "استشارات الحماية",
      platform: "Instagram",
      excerpt: "تنفيذ الجلسات الاستشارية المتقدمة لبناء وتحديث سياسات الحماية وصون السلامة وتأسيس قنوات الإبلاغ الآمنة وسرية البيانات لدى المنظمات غير الحكومية.",
      link: "https://www.instagram.com/shat.development.growth/",
      img: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (2).jpeg"
    },
    {
      id: "post-3",
      title: "إطلاق مهمة التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC",
      date: "أغسطس 2026",
      tag: "التقييم المستقل",
      platform: "Facebook",
      excerpt: "بدء الفريق الاستشاري لشركة شات مهام التقييم الميداني المستقل للمشاريع التنموية والإنسانية لقياس الملاءمة، الأثر، الكفاءة، واستدامة التدخلات وفق أطر UNEG الدولية.",
      link: "https://www.facebook.com/shat.development.growth/",
      img: "assets/logo/logo-banner.jpg"
    }
  ]
};

const DEFAULT_APPLICATIONS = [
  {
    id: "SHAT-REG-2026-0101",
    fullName: "إبراهيم محمد صالح",
    phone: "+972599876543",
    email: "ibrahim@ngo-partner.org",
    organization: "منظمة إغاثة وتنمية دولية",
    jobTitle: "مسؤول برامج إنسانية",
    courseTrack: "دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة",
    trainingMode: "تدريب افتراضي عبر الإنترنت",
    experience: "خبرة 4 سنوات في إدارة مخيمات وتدخلات الاستجابة الطارئة",
    status: "approved",
    submittedAt: "2026-09-22T10:30:00Z"
  },
  {
    id: "SHAT-REG-2026-0102",
    fullName: "ريم كمال الدجاني",
    phone: "+972598765432",
    email: "reem.dajani@safeguard.org",
    organization: "مؤسسة حماية الطفولة المجتمعية",
    jobTitle: "أخصائية حماية ومتابعة",
    courseTrack: "البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)",
    trainingMode: "تدريب حضوري وهجين",
    experience: "إعداد سياسات حماية الطفل والإبلاغ الآمن",
    status: "pending",
    submittedAt: "2026-09-23T14:15:00Z"
  }
];

class CMSService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem('shat_cms_data')) {
      localStorage.setItem('shat_cms_data', JSON.stringify(DEFAULT_CMS_DATA));
    }
    if (!localStorage.getItem('shat_admissions_applications')) {
      localStorage.setItem('shat_admissions_applications', JSON.stringify(DEFAULT_APPLICATIONS));
    }
  }

  getCMSData() {
    try {
      const saved = localStorage.getItem('shat_cms_data');
      return saved ? { ...DEFAULT_CMS_DATA, ...JSON.parse(saved) } : DEFAULT_CMS_DATA;
    } catch (e) {
      return DEFAULT_CMS_DATA;
    }
  }

  saveCMSData(newData) {
    const current = this.getCMSData();
    const updated = { ...current, ...newData };
    localStorage.setItem('shat_cms_data', JSON.stringify(updated));
    return updated;
  }

  addSocialPost(post) {
    const data = this.getCMSData();
    const newPost = {
      id: 'post-' + Date.now(),
      ...post
    };
    data.posts = [newPost, ...(data.posts || [])];
    this.saveCMSData(data);
    return newPost;
  }

  deleteSocialPost(postId) {
    const data = this.getCMSData();
    data.posts = (data.posts || []).filter(p => p.id !== postId);
    this.saveCMSData(data);
    return data.posts;
  }

  // Admissions & Google Form Applications
  getApplications() {
    try {
      const saved = localStorage.getItem('shat_admissions_applications');
      return saved ? JSON.parse(saved) : DEFAULT_APPLICATIONS;
    } catch (e) {
      return DEFAULT_APPLICATIONS;
    }
  }

  submitApplication(formData) {
    const apps = this.getApplications();
    const refId = 'SHAT-REG-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newApp = {
      id: refId,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    apps.unshift(newApp);
    localStorage.setItem('shat_admissions_applications', JSON.stringify(apps));
    return newApp;
  }

  updateApplicationStatus(appId, newStatus) {
    const apps = this.getApplications();
    const target = apps.find(a => a.id === appId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem('shat_admissions_applications', JSON.stringify(apps));
      return true;
    }
    return false;
  }
}

export const cmsService = new CMSService();

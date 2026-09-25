// SHAT Platform — CMS & Posts Service (services/cms/cmsService.js)
// Aligned with Phase 1 schema: public.shat_posts
// Lifecycle supported: draft -> preview -> published -> archived

import { supabase } from '../api/client.js';

export const CMSPostStatus = Object.freeze({
  DRAFT: 'draft',
  PREVIEW: 'preview',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
});

const OFFICIAL_COMPANY_POSTS = [
  {
    id: "post-chs",
    slug: "chs-accountability-workshop-2026",
    status: CMSPostStatus.PUBLISHED,
    category: "training",
    categoryLabel: "تدريب ومعايير",
    title: "ورشة تطبيق المعيار الإنساني الأساسي (CHS) وضمان المساءلة للمتأثرين",
    title_ar: "ورشة تطبيق المعيار الإنساني الأساسي (CHS) وضمان المساءلة للمتأثرين",
    title_en: "Core Humanitarian Standard (CHS) & AAP Implementation Workshop",
    date: "سبتمبر 2026",
    readTime: "3 دقائق قراءة",
    tag: "تدريب وبناء قدرات",
    tags: ["CHS", "AAP", "Sphere", "Humanitarian"],
    platform: "Facebook",
    excerpt: "اختتام فعاليات البرنامج التدريبي التفاعلي حول الالتزامات التسعة للمعيار الإنساني الأساسي (CHS) بمشاركة ممثلي المنظمات الإنسانية والمحلية لتعزيز آليات المساءلة المجتمعية (AAP).",
    excerpt_ar: "اختتام فعاليات البرنامج التدريبي التفاعلي حول الالتزامات التسعة للمعيار الإنساني الأساسي (CHS) بمشاركة ممثلي المنظمات الإنسانية والمحلية لتعزيز آليات المساءلة المجتمعية (AAP).",
    fullText: "اختتمت شركة شات للتنمية والتطوير البرنامج التدريبي الميداني المتقدم حول تطبيق معايير المعيار الإنساني الأساسي (Core Humanitarian Standard - CHS). ركزت الورشة على تدريب الكوادر التنفيذية ومسؤولي البرامج في المؤسسات الشريكة على الالتزامات التسعة للجودة والمساءلة، وتصميم أدوات المساءلة المجتمعية وآليات الشكاوى والملاحظات الفعالة، ودمج معايير Sphere Handbook في خطط الاستجابة الإنسانية.",
    content_rich_text: "اختتمت شركة شات للتنمية والتطوير البرنامج التدريبي الميداني المتقدم حول تطبيق معايير المعيار الإنساني الأساسي (Core Humanitarian Standard - CHS). ركزت الورشة على تدريب الكوادر التنفيذية ومسؤولي البرامج في المؤسسات الشريكة على الالتزامات التسعة للجودة والمساءلة، وتصميم أدوات المساءلة المجتمعية وآليات الشكاوى والملاحظات الفعالة، ودمج معايير Sphere Handbook في خطط الاستجابة الإنسانية.",
    img: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg",
    cover_image_url: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg"
  },
  {
    id: "post-psea",
    slug: "psea-institutional-protection-program",
    status: CMSPostStatus.PUBLISHED,
    category: "protection",
    categoryLabel: "استشارات الحماية",
    title: "برنامج صون السلامة والحماية من الاستغلال والانتهاك الجنسيين (PSEA)",
    title_ar: "برنامج صون السلامة والحماية من الاستغلال والانتهاك الجنسيين (PSEA)",
    title_en: "Institutional PSEA & Safeguarding Program",
    date: "سبتمبر 2026",
    readTime: "4 دقائق قراءة",
    tag: "استشارات الحماية",
    tags: ["PSEA", "Protection", "Safeguarding", "Compliance"],
    platform: "Instagram",
    excerpt: "تنفيذ الجلسات الاستشارية المتقدمة لبناء وتحديث سياسات الحماية وصون السلامة وتأسيس قنوات الإبلاغ الآمنة وسرية البيانات لدى المنظمات غير الحكومية.",
    excerpt_ar: "تنفيذ الجلسات الاستشارية المتقدمة لبناء وتحديث سياسات الحماية وصون السلامة وتأسيس قنوات الإبلاغ الآمنة وسرية البيانات لدى المنظمات غير الحكومية.",
    fullText: "أطلقت شركة شات للتنمية والتطوير حزمة استشارية متقدمة لدعم منظمات المجتمع المدني في تطوير سياسات الحماية وصون السلامة (PSEA). تضمن البرنامج ورش عمل تطبيقية لصياغة مواثيق الشرف الوظيفية، وإجراءات التحقيق الإداري الداخلي، وإنشاء مسارات إحالة آمنة تضمن سرية الشكاوى وعدم الإضرار بالضحايا.",
    content_rich_text: "أطلقت شركة شات للتنمية والتطوير حزمة استشارية متقدمة لدعم منظمات المجتمع المدني في تطوير سياسات الحماية وصون السلامة (PSEA). تضمن البرنامج ورش عمل تطبيقية لصياغة مواثيق الشرف الوظيفية، وإجراءات التحقيق الإداري الداخلي، وإنشاء مسارات إحالة آمنة تضمن سرية الشكاوى وعدم الإضرار بالضحايا.",
    img: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (2).jpeg",
    cover_image_url: "assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (2).jpeg"
  },
  {
    id: "post-eval",
    slug: "oecd-dac-external-evaluation-mission",
    status: CMSPostStatus.PUBLISHED,
    category: "evaluation",
    categoryLabel: "تقييم ميداني",
    title: "إطلاق مهمة التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC",
    title_ar: "إطلاق مهمة التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC",
    title_en: "OECD DAC External Independent Evaluation Mission",
    date: "أغسطس 2026",
    readTime: "5 دقائق قراءة",
    tag: "التقييم المستقل",
    tags: ["OECD DAC", "Evaluation", "Impact", "UNEG"],
    platform: "Facebook",
    excerpt: "بدء الفريق الاستشاري لشركة شات مهام التقييم الميداني المستقل للمشاريع التنموية والإنسانية لقياس الملاءمة، الأثر، الكفاءة، واستدامة التدخلات وفق أطر UNEG الدولية.",
    excerpt_ar: "بدء الفريق الاستشاري لشركة شات مهام التقييم الميداني المستقل للمشاريع التنموية والإنسانية لقياس الملاءمة، الأثر، الكفاءة، واستدامة التدخلات وفق أطر UNEG الدولية.",
    fullText: "بدأ الفريق الاستشاري المتخصص في شركة شات للتنمية والتطوير تنفيذ دراسة تقييم خارجي مستقل لمجموعة من المشاريع التنموية والإنسانية. يعتمد التقييم على المعايير الستة لمنظمة التعاون الاقتصادي والتنمية (OECD DAC)، والتي تشمل فحص الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة.",
    content_rich_text: "بدأ الفريق الاستشاري المتخصص في شركة شات للتنمية والتطوير تنفيذ دراسة تقييم خارجي مستقل لمجموعة من المشاريع التنموية والإنسانية. يعتمد التقييم على المعايير الستة لمنظمة التعاون الاقتصادي والتنمية (OECD DAC)، والتي تشمل فحص الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة.",
    img: "assets/logo/logo-banner.jpg",
    cover_image_url: "assets/logo/logo-banner.jpg"
  }
];

class CMSService {
  async getPosts(status = CMSPostStatus.PUBLISHED) {
    if (supabase) {
      try {
        let query = supabase.from('shat_posts').select('*');
        if (status) {
          query = query.eq('status', status);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        // Fallback to verified official posts
      }
    }
    return OFFICIAL_COMPANY_POSTS.filter(p => !status || p.status === status);
  }

  async getPostById(id) {
    const posts = await this.getPosts(null);
    return posts.find(p => p.id === id || p.slug === id) || null;
  }
}

export const cmsService = new CMSService();

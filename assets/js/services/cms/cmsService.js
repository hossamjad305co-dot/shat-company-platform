// SHAT Platform — CMS & Posts Service (services/cms/cmsService.js)
// Production-grade CMS lifecycle: draft -> preview -> published -> unpublished -> archived
// Includes media library management, live editor syncing, and forensic audit logging

import { supabase } from '../api/client.js';
import { auditService } from '../audit/auditService.js';

export const CMSPostStatus = Object.freeze({
  DRAFT: 'draft',
  PREVIEW: 'preview',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  ARCHIVED: 'archived'
});

const STORAGE_POSTS_KEY = 'shat_cms_posts_v2';
const STORAGE_MEDIA_KEY = 'shat_media_library_v2';

const SEED_COMPANY_POSTS = [
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
    ctaText: "التسجيل في الورشة القادمة",
    ctaLink: "#/apply?course=shat-chs-master",
    links: [
      { label: "رابط التقرير الميداني", url: "https://www.facebook.com/shat.development.growth/" }
    ],
    excerpt: "اختتام فعاليات البرنامج التدريبي التفاعلي حول الالتزامات التسعة للمعيار الإنساني الأساسي (CHS) بمشاركة ممثلي المنظمات الإنسانية والمحلية لتعزيز آليات المساءلة المجتمعية (AAP).",
    excerpt_ar: "اختتام فعاليات البرنامج التدريبي التفاعلي حول الالتزامات التسعة للمعيار الإنساني الأساسي (CHS) بمشاركة ممثلي المنظمات الإنسانية والمحلية لتعزيز آليات المساءلة المجتمعية (AAP).",
    fullText: "اختتمت شركة شات للتنمية والتطوير البرنامج التدريبي الميداني المتقدم حول تطبيق معايير المعيار الإنساني الأساسي (Core Humanitarian Standard - CHS). ركزت الورشة على تدريب الكوادر التنفيذية ومسؤولي البرامج في المؤسسات الشريكة على الالتزامات التسعة للجودة والمساءلة، وتصميم أدوات المساءلة المجتمعية وآليات الشكاوى والملاحظات الفعالة، ودمج معايير Sphere Handbook في خطط الاستجابة الإنسانية.",
    content_rich_text: "<p>اختتمت شركة شات للتنمية والتطوير البرنامج التدريبي الميداني المتقدم حول تطبيق معايير المعيار الإنساني الأساسي (Core Humanitarian Standard - CHS).</p><p>ركزت الورشة على تدريب الكوادر التنفيذية ومسؤولي البرامج في المؤسسات الشريكة على الالتزامات التسعة للجودة والمساءلة، وتصميم أدوات المساءلة المجتمعية وآليات الشكاوى والملاحظات الفعالة، ودمج معايير Sphere Handbook في خطط الاستجابة الإنسانية.</p>",
    img: "assets/logo/logo-banner.jpg",
    cover_image_url: "assets/logo/logo-banner.jpg",
    createdAt: "2026-09-20T10:00:00Z",
    publishedAt: "2026-09-21T09:00:00Z"
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
    ctaText: "طلب حزمة استشارية",
    ctaLink: "#/tracks",
    links: [
      { label: "حساب الإنستغرام الرسمي", url: "https://www.instagram.com/shat.development.growth/" }
    ],
    excerpt: "تنفيذ الجلسات الاستشارية المتقدمة لبناء وتحديث سياسات الحماية وصون السلامة وتأسيس قنوات الإبلاغ الآمنة وسرية البيانات لدى المنظمات غير الحكومية.",
    excerpt_ar: "تنفيذ الجلسات الاستشارية المتقدمة لبناء وتحديث سياسات الحماية وصون السلامة وتأسيس قنوات الإبلاغ الآمنة وسرية البيانات لدى المنظمات غير الحكومية.",
    fullText: "أطلقت شركة شات للتنمية والتطوير حزمة استشارية متقدمة لدعم منظمات المجتمع المدني في تطوير سياسات الحماية وصون السلامة (PSEA). تضمن البرنامج ورش عمل تطبيقية لصياغة مواثيق الشرف الوظيفية، وإجراءات التحقيق الإداري الداخلي، وإنشاء مسارات إحالة آمنة تضمن سرية الشكاوى وعدم الإضرار بالضحايا.",
    content_rich_text: "<p>أطلقت شركة شات للتنمية والتطوير حزمة استشارية متقدمة لدعم منظمات المجتمع المدني في تطوير سياسات الحماية وصون السلامة (PSEA).</p><p>تضمن البرنامج ورش عمل تطبيقية لصياغة مواثيق الشرف الوظيفية، وإجراءات التحقيق الإداري الداخلي، وإنشاء مسارات إحالة آمنة تضمن سرية الشكاوى وعدم الإضرار بالضحايا.</p>",
    img: "assets/logo/logo-circle.jpg",
    cover_image_url: "assets/logo/logo-circle.jpg",
    createdAt: "2026-09-18T11:00:00Z",
    publishedAt: "2026-09-19T08:30:00Z"
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
    ctaText: "استعراض منهجيات التقييم",
    ctaLink: "#/tracks",
    links: [],
    excerpt: "بدء الفريق الاستشاري لشركة شات مهام التقييم الميداني المستقل للمشاريع التنموية والإنسانية لقياس الملاءمة، الأثر، الكفاءة، واستدامة التدخلات وفق أطر UNEG الدولية.",
    excerpt_ar: "بدء الفريق الاستشاري لشركة شات مهام التقييم الميداني المستقل للمشاريع التنموية والإنسانية لقياس الملاءمة، الأثر، الكفاءة، واستدامة التدخلات وفق أطر UNEG الدولية.",
    fullText: "بدأ الفريق الاستشاري المتخصص في شركة شات للتنمية والتطوير تنفيذ دراسة تقييم خارجي مستقل لمجموعة من المشاريع التنموية والإنسانية. يعتمد التقييم على المعايير الستة لمنظمة التعاون الاقتصادي والتنمية (OECD DAC)، والتي تشمل فحص الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة.",
    content_rich_text: "<p>بدأ الفريق الاستشاري المتخصص في شركة شات للتنمية والتطوير تنفيذ دراسة تقييم خارجي مستقل لمجموعة من المشاريع التنموية والإنسانية.</p><p>يعتمد التقييم على المعايير الستة لمنظمة التعاون الاقتصادي والتنمية (OECD DAC)، والتي تشمل فحص الملاءمة، التماسك، الفعالية، الكفاءة، الأثر، والاستدامة.</p>",
    img: "assets/logo/logo-banner.jpg",
    cover_image_url: "assets/logo/logo-banner.jpg",
    createdAt: "2026-08-25T14:00:00Z",
    publishedAt: "2026-08-26T10:00:00Z"
  }
];

const SEED_MEDIA = [
  {
    id: "media_chs_banner",
    title: "ورشة CHS والمساءلة",
    url: "assets/logo/logo-banner.jpg",
    size: "114 KB",
    type: "image/jpeg",
    createdAt: "2026-09-20"
  },
  {
    id: "media_psea_banner",
    title: "برنامج صون السلامة PSEA",
    url: "assets/logo/logo-circle.jpg",
    size: "157 KB",
    type: "image/jpeg",
    createdAt: "2026-09-18"
  },
  {
    id: "media_badge",
    title: "شارة شات الرسمية",
    url: "assets/logo/logo-badge.jpg",
    size: "199 KB",
    type: "image/jpeg",
    createdAt: "2026-09-15"
  },
  {
    id: "media_transparent",
    title: "شعار شات شفاف (PNG)",
    url: "assets/logo/logo-transparent.png",
    size: "288 KB",
    type: "image/png",
    createdAt: "2026-09-10"
  },
  {
    id: "media_logo_banner",
    title: "بانر هوية شات الرسمي",
    url: "assets/logo/logo-banner.jpg",
    size: "114 KB",
    type: "image/jpeg",
    createdAt: "2026-08-25"
  },
  {
    id: "media_logo_badge",
    title: "شارة شات المعتمدة",
    url: "assets/logo/logo-badge.jpg",
    size: "199 KB",
    type: "image/jpeg",
    createdAt: "2026-08-01"
  }
];

function getStoredPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_POSTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(SEED_COMPANY_POSTS));
      return SEED_COMPANY_POSTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_COMPANY_POSTS;
  }
}

function saveStoredPosts(posts) {
  try {
    localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
  } catch (e) {
    console.warn('Error saving CMS posts:', e);
  }
}

function getStoredMedia() {
  try {
    const raw = localStorage.getItem(STORAGE_MEDIA_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_MEDIA_KEY, JSON.stringify(SEED_MEDIA));
      return SEED_MEDIA;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_MEDIA;
  }
}

function saveStoredMedia(media) {
  try {
    localStorage.setItem(STORAGE_MEDIA_KEY, JSON.stringify(media));
  } catch (e) {
    console.warn('Error saving Media Library:', e);
  }
}

class CMSService {
  /**
   * Get posts. If status is provided, filter by status.
   * If status is null or not provided, for public consumers default to PUBLISHED.
   * Admin callers explicitly pass 'all' or specific status.
   */
  async getPosts(status = CMSPostStatus.PUBLISHED) {
    const posts = getStoredPosts();
    if (!status || status === 'all') {
      return posts;
    }
    return posts.filter(p => p.status === status);
  }

  /**
   * Get single post by id or slug
   */
  async getPostById(id) {
    const posts = getStoredPosts();
    return posts.find(p => p.id === id || p.slug === id) || null;
  }

  /**
   * Create a new post
   */
  async createPost(postData) {
    const posts = getStoredPosts();
    const id = 'post_' + Date.now();
    const slug = (postData.slug || postData.title || id)
      .toLowerCase()
      .replace(/[^\w\u0621-\u064A]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newPost = {
      id,
      slug,
      status: postData.status || CMSPostStatus.DRAFT,
      category: postData.category || 'general',
      categoryLabel: postData.categoryLabel || 'أخبار وتحديثات',
      title: postData.title || 'منشور جديد',
      title_ar: postData.title || 'منشور جديد',
      title_en: postData.title_en || '',
      date: postData.date || new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' }),
      readTime: postData.readTime || '3 دقائق قراءة',
      tag: postData.tag || 'أخبار شات',
      tags: Array.isArray(postData.tags) ? postData.tags : (postData.tags ? postData.tags.split(',').map(t => t.trim()) : []),
      platform: postData.platform || 'Website',
      ctaText: postData.ctaText || '',
      ctaLink: postData.ctaLink || '',
      links: postData.links || [],
      excerpt: postData.excerpt || '',
      excerpt_ar: postData.excerpt || '',
      fullText: postData.fullText || '',
      content_rich_text: postData.content_rich_text || `<p>${postData.fullText || ''}</p>`,
      img: postData.img || 'assets/logo/logo-banner.jpg',
      cover_image_url: postData.img || 'assets/logo/logo-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: postData.status === CMSPostStatus.PUBLISHED ? new Date().toISOString() : null
    };

    posts.unshift(newPost);
    saveStoredPosts(posts);

    await auditService.logAction({
      action: 'CREATE_POST',
      entity: 'post',
      entityId: id,
      details: { title: newPost.title, status: newPost.status }
    });

    return newPost;
  }

  /**
   * Update an existing post
   */
  async updatePost(id, updates) {
    const posts = getStoredPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    const existing = posts[index];
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if (updates.tags && !Array.isArray(updates.tags)) {
      updated.tags = String(updates.tags).split(',').map(t => t.trim());
    }

    if (updates.status === CMSPostStatus.PUBLISHED && existing.status !== CMSPostStatus.PUBLISHED) {
      updated.publishedAt = new Date().toISOString();
    }

    posts[index] = updated;
    saveStoredPosts(posts);

    await auditService.logAction({
      action: 'UPDATE_POST',
      entity: 'post',
      entityId: id,
      details: { title: updated.title, status: updated.status }
    });

    return updated;
  }

  /**
   * Save a draft (with autosave debounce support)
   */
  async saveDraft(id, draftData) {
    if (!id || id === 'new') {
      return this.createPost({ ...draftData, status: CMSPostStatus.DRAFT });
    }
    return this.updatePost(id, { ...draftData, status: CMSPostStatus.DRAFT });
  }

  /**
   * Publish a post
   */
  async publishPost(id) {
    return this.updatePost(id, { status: CMSPostStatus.PUBLISHED });
  }

  /**
   * Unpublish a post (revert to UNPUBLISHED)
   */
  async unpublishPost(id) {
    return this.updatePost(id, { status: CMSPostStatus.UNPUBLISHED });
  }

  /**
   * Archive a post
   */
  async archivePost(id) {
    return this.updatePost(id, { status: CMSPostStatus.ARCHIVED });
  }

  /**
   * Delete a post permanently
   */
  async deletePost(id) {
    const posts = getStoredPosts();
    const target = posts.find(p => p.id === id);
    const filtered = posts.filter(p => p.id !== id);
    saveStoredPosts(filtered);

    await auditService.logAction({
      action: 'DELETE_POST',
      entity: 'post',
      entityId: id,
      details: { title: target ? target.title : id }
    });

    return true;
  }

  // ==========================================
  // Media Library Engine
  // ==========================================

  getMediaItems(query = '') {
    const items = getStoredMedia();
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(m => m.title.toLowerCase().includes(q) || m.url.toLowerCase().includes(q));
  }

  addMediaItem({ title, url, size = '150 KB', type = 'image/jpeg' }) {
    if (!url) return null;
    const media = getStoredMedia();
    const newItem = {
      id: 'media_' + Date.now(),
      title: title || 'صورة جديدة',
      url,
      size,
      type,
      createdAt: new Date().toISOString().split('T')[0]
    };
    media.unshift(newItem);
    saveStoredMedia(media);

    auditService.logAction({
      action: 'UPLOAD_MEDIA',
      entity: 'media',
      entityId: newItem.id,
      details: { title: newItem.title, url: newItem.url }
    });

    return newItem;
  }

  deleteMediaItem(id) {
    const media = getStoredMedia();
    const target = media.find(m => m.id === id);
    const filtered = media.filter(m => m.id !== id);
    saveStoredMedia(filtered);

    auditService.logAction({
      action: 'DELETE_MEDIA',
      entity: 'media',
      entityId: id,
      details: { title: target ? target.title : id }
    });

    return true;
  }
}

export const cmsService = new CMSService();

import { icons } from './icons.js';
import { authService } from './auth.js';
import { cmsService } from './cms.js';
import {
  moodleStore,
  getMoodleCourses,
  getCourseById,
  getGlobalGoogleFormUrl,
  setGlobalGoogleFormUrl,
  addCustomCourse,
  updateCourse,
  deleteCourse,
  downloadRealFile
} from './moodle.js';

// Shat Company Platform - Page Rendering Engine
// Clean executive architecture, Vector SVG icons, and Dedicated Course Detail pages

export function renderHomePage(t) {
  const courses = getMoodleCourses();
  const activeCourses = courses.filter(c => c.active !== false);
  const isAdmin = authService.isAdmin();
  const canDownload = authService.canDownloadMaterials();
  const heroBadgeImg = cmsService.getCustomImage('heroBadge', '/assets/logo/logo-badge.jpg?v=2026');

  const sectionsList = [
    { key: "our-story", title: t.nav.s02 || "قصتنا", desc: t.about.subtitle, icon: icons.book('', 24) },
    { key: "what-we-make", title: t.nav.s03 || "ماذا نصنع؟", desc: t.services.subtitle, icon: icons.course('', 24) },
    { key: "tracks", title: t.nav.s04 || "مساراتنا", desc: t.consultingSec.subtitle, icon: icons.compass('', 24) },
    { key: "experiences", title: t.nav.s05 || "تجاربنا", desc: t.deliveryModel.subtitle, icon: icons.layers('', 24) },
    { key: "impact", title: t.nav.s06 || "أثرنا", desc: t.approach.subtitle, icon: icons.trendingUp('', 24) },
    { key: "knowledge-hub", title: t.nav.s07 || "مساحة المعرفة", desc: t.references.subtitle, icon: icons.shield('', 24) },
    { key: "build-impact", title: t.nav.s08 || "لنبني الأثر معًا", desc: t.valuePartnerships.subtitle, icon: icons.users('', 24) }
  ];

  return `
    <!-- Executive Hero Section -->
    <section class="home-hero-section">
      <div class="container">
        <div class="home-hero-grid">
          <div class="hero-content-col">
            <div class="hero-badge-pill">
              ${icons.sparkles('icon-inline', 16)}
              <span>${t.hero.badge}</span>
            </div>
            <h1 class="hero-main-title">${t.hero.title}</h1>
            <p class="hero-lead-text">${t.hero.description}</p>
            <div class="hero-actions-row">
              <a href="#/academy" class="btn-cta" style="display: inline-flex; align-items: center; gap: 8px;">
                ${icons.academy('icon-inline', 20)}
                <span>دخول الأكاديمية والمودل</span>
                ${icons.arrowLeft('icon-inline', 16)}
              </a>
              <a href="#/services" class="btn-secondary">
                <span>${t.hero.ctaPrimary}</span>
              </a>
            </div>
          </div>
          <div class="hero-badge-col">
            <div class="hero-emblem-card">
              <div class="hero-emblem-badge-wrapper" style="position: relative;">
                <img src="${heroBadgeImg}" alt="SHAT Development & Growth" class="hero-badge-img" onerror="this.src='/assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg'">
                <div class="hero-verified-stamp" title="جهة معتمدة رسمياً">✓</div>
              </div>
              ${isAdmin ? `
                <div style="margin-top: 8px;">
                  <button type="button" class="btn-secondary btn-edit-image-trigger" data-img-key="heroBadge" data-img-title="تعديل شعار الهوية البصرية الرئيسي" style="font-size: 0.74rem; padding: 3px 10px; border-radius: var(--radius-full); background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;">
                    ${icons.image('icon-inline', 13)} تغيير الشعار (مدير)
                  </button>
                </div>
              ` : ''}
              <div class="hero-emblem-title">${t.companyShortName}</div>
              <div class="hero-emblem-motto">${t.companyMotto}</div>
              <div class="hero-accreditations-strip">
                <span class="hero-accred-pill">CHS Alliance Standard</span>
                <span class="hero-accred-pill">OECD DAC & UNEG</span>
                <span class="hero-accred-pill">PSEA Safeguarding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Numerical Telemetry Strip -->
    <div class="hero-stats-strip">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">${t.hero.stat1Number}</span>
            <span class="stat-label">${t.hero.stat1Label}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${t.hero.stat2Number}</span>
            <span class="stat-label">${t.hero.stat2Label}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${t.hero.stat3Number}</span>
            <span class="stat-label">${t.hero.stat3Label}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${t.hero.stat4Number}</span>
            <span class="stat-label">${t.hero.stat4Label}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURED ACCREDITED COURSES & TRAINING SHOWCASE -->
    <section class="courses-showcase-section" id="section-featured-courses">
      <div class="container">
        <div class="section-intro-block" style="text-align: center; margin-bottom: 32px;">
          <div class="hero-badge-pill" style="margin: 0 auto 12px;">
            ${icons.academy('icon-inline', 18)}
            <span>الأكاديمية وبناء القدرات المؤسسية</span>
          </div>
          <h2 class="section-intro-title" style="font-size: 2.15rem; color: var(--shat-navy-950);">
            دليل الدورات والبرامج التدريبية المعتمدة 2026
          </h2>
          <p class="section-intro-desc" style="max-width: 720px; margin: 0 auto; color: var(--text-secondary);">
            برامج تنفيذية ودبلومات مهنية معتمدة دولياً، لكل دورة صفحة مخصصة متكاملة للمتدرب والمدرب مع روابط التسجيل المباشرة عبر Google Form ومجلدات Google Drive المعتمدة.
          </p>
        </div>

        <div class="courses-grid">
          ${activeCourses.slice(0, 3).map((c, idx) => {
            const defaultCover = idx === 0 
              ? '/assets/images/posts/post-chs-workshop.svg' 
              : idx === 1 
                ? '/assets/images/posts/post-psea-protection.svg' 
                : '/assets/images/posts/post-oecd-evaluation.svg';
            const courseCover = cmsService.getCustomImage('courseCover_' + c.id, c.coverImage || defaultCover);
            return `
            <article class="course-card" style="overflow: hidden;">
              <!-- Course Visual Cover Image with Admin Edit Trigger -->
              <div class="course-card-cover-wrap" style="position: relative; height: 160px; overflow: hidden; background: #0f172a;">
                <img src="${courseCover}" alt="${c.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${defaultCover}'">
                ${isAdmin ? `
                  <button type="button" class="btn-edit-image-trigger" data-img-key="courseCover_${c.id}" data-img-title="تعديل غلاف دورة: ${c.title}" style="position: absolute; top: 10px; inset-inline-end: 10px; background: rgba(255,255,255,0.92); border: 1px solid #cbd5e1; border-radius: var(--radius-sm); padding: 4px 8px; font-size: 0.72rem; font-weight: 700; color: #1e3a8a; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                    ${icons.image('icon-inline', 13)} تغيير الغلاف
                  </button>
                ` : ''}
              </div>

              <div class="course-card-header">
                <div class="course-card-badges">
                  <span class="course-code-badge">${c.code}</span>
                  <span class="course-track-pill">${c.track}</span>
                </div>
                <h3 class="course-card-title">${c.title}</h3>
              </div>

              <div class="course-card-body">
                <div class="course-instructor-row">
                  <div class="course-instructor-avatar">
                    ${c.instructor ? c.instructor.charAt(0) : 'د'}
                  </div>
                  <div>
                    <strong style="color: var(--shat-navy-950); font-size: 0.92rem; display: block;">${c.instructor}</strong>
                    <span style="font-size: 0.76rem; color: var(--text-muted);">${c.instructorRole || 'خبير وميسر معتمد'}</span>
                  </div>
                </div>

                <div class="course-meta-list">
                  <div class="course-meta-item">
                    ${icons.clock('icon-inline', 16)}
                    <span>المدة: <strong>${c.duration}</strong></span>
                  </div>
                  <div class="course-meta-item">
                    ${icons.calendar('icon-inline', 16)}
                    <span>المواعيد: <strong>${c.schedule}</strong></span>
                  </div>
                  <div class="course-meta-item">
                    ${icons.shield('icon-inline', 16)}
                    <span>المستوى: <strong>${c.level}</strong></span>
                  </div>
                </div>

                <div class="course-card-actions">
                  <!-- Direct Link to Single Dedicated Course Page -->
                  <a href="#/course/${c.id}" class="btn-course-cta">
                    ${icons.book('icon-inline', 18)}
                    <span>صفحة الدورة والمنهاج الكامل 📄</span>
                  </a>

                  <!-- Direct Google Form Registration Link for this Specific Course -->
                  <a href="${c.googleFormUrl || 'https://forms.gle/shat-training-register-2026'}" target="_blank" rel="noopener" class="btn-course-form" title="التسجيل المباشر في الدورة">
                    ${icons.form('icon-inline', 16)}
                    <span>التسجيل في الدورة (Google Form) ↗</span>
                  </a>

                  <!-- Permissions Guard Material Download -->
                  ${canDownload ? `
                    <button type="button" class="btn-trigger-real-download btn-secondary" data-file="${c.files && c.files[0] ? c.files[0].name : 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf'}" style="padding: 7px 12px; font-size: 0.78rem; width: 100%; justify-content: center;">
                      ${icons.download('icon-inline', 15)}
                      <span>تحميل الحقيبة المعتمدة (PDF)</span>
                    </button>
                  ` : `
                    <button type="button" class="btn-guard-download btn-secondary" data-file="${c.files && c.files[0] ? c.files[0].name : 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf'}" data-course-title="${c.title}" style="padding: 7px 12px; font-size: 0.78rem; width: 100%; justify-content: center; background: #fffbeb; border-color: #fde68a; color: #b45309;">
                      ${icons.lock('icon-inline', 14)}
                      <span>تحميل الحقيبة (🔒 يتطلب حساب متدرب)</span>
                    </button>
                  `}
                </div>
              </div>
            </article>
          `;
          }).join('')}
        </div>

        <div style="margin-top: 36px; text-align: center; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <a href="#/academy" class="btn-cta" style="padding: 12px 24px; font-size: 0.95rem;">
            ${icons.academy('icon-inline', 18)}
            <span>استعراض كافة دبلومات الأكاديمية وكلاس روم (${courses.length} برامج) ←</span>
          </a>
          <a href="#/register-course" class="btn-secondary" style="padding: 12px 24px; font-size: 0.95rem;">
            ${icons.form('icon-inline', 18)}
            <span>فتح استمارة القبول والتسجيل العام (Google Form)</span>
          </a>
        </div>
      </div>
    </section>

    <!-- REAL FACEBOOK & INSTAGRAM SOCIAL MEDIA SHOWCASE -->
    <section class="social-showcase-section">
      <div class="container">
        <div class="section-intro-block" style="text-align: center; margin-bottom: 28px;">
          <div class="hero-badge-pill" style="margin: 0 auto 12px;">
            ${icons.sparkles('icon-inline', 16)}
            <span>${t.socialSection?.badge || 'نشاطات ميدانية وفعاليات'}</span>
          </div>
          <h2 class="section-intro-title" style="font-size: 2.15rem; color: var(--shat-navy-950);">
            ${t.socialSection?.title || 'منشورات وفعاليات المنصات الرسمية'}
          </h2>
          <p class="section-intro-desc" style="max-width: 700px; margin: 0 auto; color: var(--text-secondary);">
            ${t.socialSection?.subtitle || 'تابع أحدث الورش التدريبية، البعثات الميدانية، وبرامج التطوير المؤسسي المنشورة عبر قنواتنا على فيسبوك وإنستغرام.'}
          </p>
        </div>

        <!-- Category Filter Tabs with Clean Vector Icons -->
        <div class="social-filter-tabs">
          <button type="button" class="social-filter-btn active" data-category="all">
            ${icons.filter('icon-inline', 16)} ${t.socialSection?.filterAll || 'الكل'}
          </button>
          <button type="button" class="social-filter-btn" data-category="training">
            ${icons.academy('icon-inline', 16)} ${t.socialSection?.filterTraining || 'تدريب ومعايير'}
          </button>
          <button type="button" class="social-filter-btn" data-category="protection">
            ${icons.shield('icon-inline', 16)} ${t.socialSection?.filterProtection || 'حماية وصون كرامة'}
          </button>
          <button type="button" class="social-filter-btn" data-category="evaluation">
            ${icons.award('icon-inline', 16)} ${t.socialSection?.filterEvaluation || 'تقييم ميداني'}
          </button>
          <button type="button" class="social-filter-btn" data-category="governance">
            ${icons.layers('icon-inline', 16)} ${t.socialSection?.filterGovernance || 'حوكمة ونظم'}
          </button>
          <button type="button" class="social-filter-btn" data-category="academy">
            ${icons.book('icon-inline', 16)} ${t.socialSection?.filterAcademy || 'الأكاديمية'}
          </button>
        </div>

        <div class="social-posts-grid" id="social-posts-grid-container">
          ${(t.socialSection?.posts || []).map(post => {
            const override = cmsService.getPostOverride(post.id);
            const p = override ? { ...post, ...override } : post;
            const postImg = cmsService.getCustomImage('postImg_' + p.id, p.img);
            return `
            <article class="social-card" data-category="${p.category || 'general'}" data-post-id="${p.id}">
              ${isAdmin ? `
                <div style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 6px 14px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.72rem; color: #1e3a8a; font-weight: 700;">⚙️ تحكم المدير:</span>
                  <div style="display: flex; gap: 6px;">
                    <button type="button" class="btn-secondary btn-admin-edit-post" data-post-id="${p.id}" style="padding: 3px 8px; font-size: 0.72rem;">
                      ${icons.edit('icon-inline', 12)} تعديل
                    </button>
                    <button type="button" class="btn-secondary btn-edit-image-trigger" data-img-key="postImg_${p.id}" data-img-title="تعديل صورة منشور: ${p.title}" style="padding: 3px 8px; font-size: 0.72rem;">
                      ${icons.image('icon-inline', 12)} تغيير الصورة
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- Realistic Social Post Header -->
              <div style="padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; background: #ffffff;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img src="/assets/logo/logo-badge.jpg" alt="SHAT" style="width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #10b981; object-fit: cover;" onerror="this.src='/assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg'">
                  <div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <strong style="font-size: 0.85rem; color: var(--shat-navy-950);">شركة شات للتنمية</strong>
                      <span style="color: #0284c7; font-size: 0.78rem;" title="حساب موثق">✓</span>
                    </div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${p.date}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  ${p.platform === 'Instagram'
                    ? `<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 700; color: #e1306c; background: #fdf2f8; padding: 2px 8px; border-radius: 12px;">${icons.instagram('', 14)} Instagram</span>`
                    : `<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 700; color: #1877f2; background: #eff6ff; padding: 2px 8px; border-radius: 12px;">${icons.facebook('', 14)} Facebook</span>`
                  }
                </div>
              </div>

              <!-- Post Media Cover with Live Custom Image -->
              <div class="social-card-img-wrap" style="position: relative;">
                <img src="/${postImg.replace(/^\//, '')}" alt="${p.title}" class="social-card-img" onerror="this.src='/assets/logo/WhatsApp Image 2026-09-23 at 19.33.56 (1).jpeg'" loading="lazy">
              </div>

              <div class="social-card-body">
                <div class="social-card-meta">
                  <span class="social-card-tag">${p.tag}</span>
                  <span class="social-card-readtime">${icons.clock('icon-inline', 13)} ${p.readTime || '3 دقائق'}</span>
                </div>

                <h3 class="social-card-title">${p.title}</h3>
                <p class="social-card-excerpt">${p.excerpt}</p>

                <!-- Social Engagement Indicators -->
                <div class="social-engagement-bar">
                  <span class="social-engagement-item">
                    ${icons.heart('icon-inline', 15)} 284 إعجاب
                  </span>
                  <span class="social-engagement-item">
                    ${icons.messageCircle('icon-inline', 15)} 42 تعليق
                  </span>
                  <span class="social-engagement-item">
                    ${icons.share('icon-inline', 15)} 19 مشاركة
                  </span>
                </div>

                <div class="social-card-footer">
                  <button type="button" class="btn-read-post" data-post-id="${p.id}">
                    <span>${t.socialSection?.readArticle || 'قراءة التقرير والتفاصيل 📄'}</span>
                  </button>
                  <a href="${p.link}" target="_blank" rel="noopener" class="social-view-link" title="${p.platform}">
                    <span>${p.platform === 'Instagram' ? (t.socialSection?.viewInsta || 'إنستغرام ↗') : (t.socialSection?.viewFb || 'فيسبوك ↗')}</span>
                  </a>
                </div>
              </div>
            </article>
          `;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- Institutional Pathways & Hub Cards -->
    <section class="home-hub-section">
      <div class="container">
        <div class="section-intro-block">
          <h2 class="section-intro-title">${t.homeCards.title}</h2>
          <p class="section-intro-desc">${t.homeCards.subtitle}</p>
        </div>

        <div class="grid-4">
          ${sectionsList.map(sec => `
            <div class="section-hub-card ${sec.highlight ? 'highlight-academy' : ''}" style="${sec.highlight ? 'border: 2px solid var(--shat-green-500); background: #f0fdf4;' : ''}">
              <div class="hub-card-icon" style="color: var(--shat-green-700);">${sec.icon}</div>
              <h3 class="hub-card-title">${sec.title}</h3>
              <p class="hub-card-desc">${sec.desc}</p>
              <div class="hub-card-footer">
                <a href="#/${sec.key}" class="hub-card-link">
                  <span>${sec.highlight ? 'دخول نظام المودل' : t.nav.explorePlatform}</span>
                  ${icons.arrowLeft('icon-inline', 16)}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}


export function renderAboutPage(t) {
  const a = t.about;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${a.title}</span>
        </div>
        <h1 class="page-title">${t.nav.s02 || a.title}</h1>
        <p class="page-subtitle">${a.subtitle}</p>
      </div>
    </div>

    <div class="subsections-nav-wrap">
      <div class="container">
        <div class="subsections-nav">
          <button class="sub-tab-btn active" data-target="who-we-are">${a.subsections.whoWeAre.title}</button>
          <button class="sub-tab-btn" data-target="methodology">${a.subsections.methodology.title}</button>
          <button class="sub-tab-btn" data-target="philosophy">${a.subsections.philosophy.title}</button>
          <button class="sub-tab-btn" data-target="identity">${a.subsections.identity.title}</button>
        </div>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="sub-section-content" id="who-we-are">
        <div class="content-card">
          <span class="card-badge">${a.title}</span>
          <h2 class="card-title">${a.subsections.whoWeAre.title}</h2>
          <p class="card-desc">${a.subsections.whoWeAre.desc}</p>
          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
            ${a.subsections.whoWeAre.bullets.map(b => `
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="color: var(--shat-green-600); font-weight: bold; font-size: 1.2rem;">✓</span>
                <span style="color: var(--text-secondary); font-size: 1rem;">${b}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="sub-section-content" id="methodology" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${a.title}</span>
          <h2 class="card-title">${a.subsections.methodology.title}</h2>
          <p class="card-desc">${a.subsections.methodology.desc}</p>
        </div>
      </div>

      <div class="sub-section-content" id="philosophy" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${a.title}</span>
          <h2 class="card-title">${a.subsections.philosophy.title}</h2>
          <p class="card-desc">${a.subsections.philosophy.desc}</p>
          <div class="impact-flow-container">
            ${a.subsections.philosophy.flow.map((f, idx) => `
              <div class="flow-step-card">
                <div class="flow-indicator-dot">${idx + 1}</div>
                <div>
                  <h3 class="flow-step-title">${f.step}</h3>
                  <p class="flow-step-detail">${f.detail}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="sub-section-content" id="identity" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${a.title}</span>
          <h2 class="card-title">${a.subsections.identity.title}</h2>
          <p class="card-desc">${a.subsections.identity.desc}</p>
        </div>
      </div>

      <div class="section-pagination">
        <a href="#/home" class="page-jump-btn">
          <span>←</span>
          <span>${t.nav.backHome}</span>
        </a>
        <a href="#/services" class="page-jump-btn">
          <span>${t.services.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderServicesPage(t) {
  const s = t.services;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${s.title}</span>
        </div>
        <h1 class="page-title">${t.nav.s03 || s.title}</h1>
        <p class="page-subtitle">${s.subtitle}</p>
      </div>
    </div>

    <div class="subsections-nav-wrap">
      <div class="container">
        <div class="subsections-nav">
          <button class="sub-tab-btn active" data-target="training-system">${s.subsections.training.title}</button>
          <button class="sub-tab-btn" data-target="consulting-system">${s.subsections.consulting.title}</button>
        </div>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="sub-section-content" id="training-system">
        <div class="content-card">
          <span class="card-badge">${t.pillTraining}</span>
          <h2 class="card-title">${s.subsections.training.title}</h2>
          <p class="card-desc">${s.subsections.training.summary}</p>
          <div class="grid-2" style="margin-top: 32px;">
            ${s.subsections.training.pillars.map(p => `
              <div style="background: var(--bg-surface-subtle); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 1.15rem; color: var(--shat-navy-900); margin-bottom: 8px;">${p.name}</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary);">${p.detail}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="sub-section-content" id="consulting-system" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${t.pillConsulting}</span>
          <h2 class="card-title">${s.subsections.consulting.title}</h2>
          <p class="card-desc">${s.subsections.consulting.summary}</p>
          <div class="grid-2" style="margin-top: 32px;">
            ${s.subsections.consulting.pillars.map(p => `
              <div style="background: var(--bg-surface-subtle); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 1.15rem; color: var(--shat-navy-900); margin-bottom: 8px;">${p.name}</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary);">${p.detail}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="section-pagination">
        <a href="#/about" class="page-jump-btn">
          <span>←</span>
          <span>${t.about.title}</span>
        </a>
        <a href="#/consulting" class="page-jump-btn">
          <span>${t.consultingSec.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderConsultingPage(t) {
  const c = t.consultingSec;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${c.title}</span>
        </div>
        <h1 class="page-title">${t.nav.s04 || c.title}</h1>
        <p class="page-subtitle">${c.subtitle}</p>
      </div>
    </div>

    <div class="subsections-nav-wrap">
      <div class="container">
        <div class="subsections-nav">
          <button class="sub-tab-btn active" data-target="protection-sub">${c.subsections.protection.title}</button>
          <button class="sub-tab-btn" data-target="evaluation-sub">${c.subsections.evaluation.title}</button>
        </div>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="sub-section-content" id="protection-sub">
        <div class="content-card">
          <span class="card-badge">${c.title}</span>
          <h2 class="card-title">${c.subsections.protection.title}</h2>
          <p class="card-desc">${c.subsections.protection.desc}</p>
          <p style="font-size: 0.95rem; font-style: italic; color: var(--shat-green-800); background: var(--shat-green-50); padding: 14px; border-radius: var(--radius-sm); margin-bottom: 24px;">
            ${c.subsections.protection.principles}
          </p>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${c.subsections.protection.items.map(it => `
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="color: var(--shat-green-600); font-weight: bold; font-size: 1.2rem;">✓</span>
                <span style="color: var(--text-secondary); font-size: 1rem;">${it}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="sub-section-content" id="evaluation-sub" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${c.title}</span>
          <h2 class="card-title">${c.subsections.evaluation.title}</h2>
          <p class="card-desc">${c.subsections.evaluation.desc}</p>
          <h3 style="font-size: 1.2rem; color: var(--shat-navy-950); margin: 28px 0 16px;">
            ${c.subsections.evaluation.criteriaTitle}
          </h3>
          <div class="grid-3">
            ${c.subsections.evaluation.criteria.map(cr => `
              <div style="background: var(--bg-surface-subtle); padding: 20px; border-radius: var(--radius-md); border-top: 3px solid var(--shat-navy-800);">
                <h4 style="font-size: 1.05rem; color: var(--shat-navy-900); margin-bottom: 8px;">${cr.name}</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">${cr.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="section-pagination">
        <a href="#/services" class="page-jump-btn">
          <span>←</span>
          <span>${t.services.title}</span>
        </a>
        <a href="#/delivery-model" class="page-jump-btn">
          <span>${t.deliveryModel.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderDeliveryModelPage(t) {
  const d = t.deliveryModel;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${d.title}</span>
        </div>
        <h1 class="page-title">${d.title}</h1>
        <p class="page-subtitle">${d.subtitle}</p>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="content-card" style="text-align: center; margin-bottom: 40px;">
        <span class="card-badge">${d.slogan}</span>
        <h2 class="card-title" style="margin-bottom: 12px;">${d.title}</h2>
        <p class="card-desc" style="max-width: 760px; margin: 0 auto;">${d.intro}</p>
      </div>

      <div class="grid-3">
        ${d.stages.map(st => `
          <div class="delivery-stage-card">
            <span class="stage-badge-name">${st.en}</span>
            <h3 class="stage-title">${st.name}</h3>
            <p class="stage-desc">${st.desc}</p>
          </div>
        `).join('')}
      </div>

      <div class="section-pagination">
        <a href="#/consulting" class="page-jump-btn">
          <span>←</span>
          <span>${t.consultingSec.title}</span>
        </a>
        <a href="#/approach" class="page-jump-btn">
          <span>${t.approach.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderApproachPage(t) {
  const ap = t.approach;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${ap.title}</span>
        </div>
        <h1 class="page-title">${t.nav.s06 || ap.title}</h1>
        <p class="page-subtitle">${ap.subtitle}</p>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="content-card" style="margin-bottom: 40px;">
        <span class="card-badge">${ap.title}</span>
        <p class="card-desc">${ap.intro}</p>
      </div>

      <div class="grid-2">
        ${ap.pillars.map(p => `
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); border-inline-start: 4px solid var(--shat-green-600);">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--shat-green-700); text-transform: uppercase; margin-bottom: 4px;">${p.en}</div>
            <h3 style="font-size: 1.2rem; color: var(--shat-navy-950); margin-bottom: 8px;">${p.title}</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${p.desc}</p>
          </div>
        `).join('')}
      </div>

      <div class="section-pagination">
        <a href="#/delivery-model" class="page-jump-btn">
          <span>←</span>
          <span>${t.deliveryModel.title}</span>
        </a>
        <a href="#/references" class="page-jump-btn">
          <span>${t.references.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderReferencesPage(t) {
  const r = t.references;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${r.title}</span>
        </div>
        <h1 class="page-title">${t.nav.s07 || r.title}</h1>
        <p class="page-subtitle">${r.subtitle}</p>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="content-card" style="margin-bottom: 40px;">
        <span class="card-badge">${r.title}</span>
        <p class="card-desc">${r.intro}</p>
      </div>

      <div class="grid-2">
        ${r.standards.map(st => `
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 0.8rem; font-weight: 800; background: var(--shat-navy-100); color: var(--shat-navy-800); padding: 3px 10px; border-radius: var(--radius-full);">${st.code}</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${st.en}</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--shat-navy-950); margin-bottom: 8px;">${st.title}</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; flex: 1;">${st.desc}</p>
          </div>
        `).join('')}
      </div>

      <div class="section-pagination">
        <a href="#/approach" class="page-jump-btn">
          <span>←</span>
          <span>${t.approach.title}</span>
        </a>
        <a href="#/expertise" class="page-jump-btn">
          <span>${t.expertise.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderExpertisePage(t) {
  const ex = t.expertise;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${ex.title}</span>
        </div>
        <h1 class="page-title">${ex.title}</h1>
        <p class="page-subtitle">${ex.subtitle}</p>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="grid-4">
        ${ex.sectors.map(sec => `
          <div class="content-card" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--shat-green-50); color: var(--shat-green-700); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 16px;">
                ✦
              </div>
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--shat-green-700); text-transform: uppercase; margin-bottom: 4px;">${sec.en}</div>
              <h3 style="font-size: 1.2rem; color: var(--shat-navy-950); margin-bottom: 12px;">${sec.name}</h3>
              <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${sec.desc}</p>
            </div>
            <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
              <a href="#/contact" style="font-size: 0.88rem; font-weight: 700; color: var(--shat-navy-800);">
                ${t.nav.requestConsultation} →
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section-pagination">
        <a href="#/references" class="page-jump-btn">
          <span>←</span>
          <span>${t.references.title}</span>
        </a>
        <a href="#/value-partnerships" class="page-jump-btn">
          <span>${t.valuePartnerships.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderValuePartnershipsPage(t) {
  const vp = t.valuePartnerships;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${vp.title}</span>
        </div>
        <h1 class="page-title">${vp.title}</h1>
        <p class="page-subtitle">${vp.subtitle}</p>
      </div>
    </div>

    <div class="subsections-nav-wrap">
      <div class="container">
        <div class="subsections-nav">
          <button class="sub-tab-btn active" data-target="value-props">${vp.valuePropsTitle}</button>
          <button class="sub-tab-btn" data-target="positioning">${vp.positioningTitle}</button>
          <button class="sub-tab-btn" data-target="commitment">${vp.commitmentTitle}</button>
        </div>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="sub-section-content" id="value-props">
        <div class="content-card">
          <span class="card-badge">${vp.title}</span>
          <h2 class="card-title">${vp.valuePropsTitle}</h2>
          <div class="grid-2" style="margin-top: 24px;">
            ${vp.values.map(v => `
              <div style="background: var(--bg-surface-subtle); padding: 24px; border-radius: var(--radius-md); border-inline-start: 4px solid var(--shat-navy-800);">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--shat-green-700); text-transform: uppercase;">${v.en}</div>
                <h3 style="font-size: 1.25rem; color: var(--shat-navy-950); margin: 4px 0 8px;">${v.title}</h3>
                <div style="font-weight: 700; color: var(--shat-navy-800); margin-bottom: 8px;">${v.slogan}</div>
                <p style="font-size: 0.95rem; color: var(--text-secondary);">${v.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="sub-section-content" id="positioning" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${vp.title}</span>
          <h2 class="card-title">${vp.positioningTitle}</h2>
          <p style="font-size: 1.25rem; font-weight: 700; color: var(--shat-green-800); margin-bottom: 16px;">
            ${vp.positioningLead}
          </p>
          <p class="card-desc">${vp.positioningBody}</p>
        </div>
      </div>

      <div class="sub-section-content" id="commitment" style="display: none;">
        <div class="content-card">
          <span class="card-badge">${vp.title}</span>
          <h2 class="card-title">${vp.commitmentTitle}</h2>
          <p class="card-desc">${vp.commitmentBody}</p>
          <div style="margin-top: 32px; background: linear-gradient(135deg, var(--shat-navy-950), var(--shat-navy-900)); color: #ffffff; padding: 36px; border-radius: var(--radius-lg); text-align: center;">
            <h3 style="color: #ffffff; font-size: 1.6rem; margin-bottom: 12px;">${vp.partnerCtaTitle}</h3>
            <p style="color: rgba(255,255,255,0.85); max-width: 600px; margin: 0 auto 24px;">${vp.partnerCtaDesc}</p>
            <a href="#/contact" class="btn-cta" style="background: var(--shat-green-600);">${t.nav.requestConsultation}</a>
          </div>
        </div>
      </div>

      <div class="section-pagination">
        <a href="#/expertise" class="page-jump-btn">
          <span>←</span>
          <span>${t.expertise.title}</span>
        </a>
        <a href="#/contact" class="page-jump-btn">
          <span>${t.contact.title}</span>
          <span>→</span>
        </a>
      </div>
    </div>
  `;
}

export function renderContactPage(t) {
  const ct = t.contact;
  return `
    <div class="page-header-banner">
      <div class="container">
        <div class="breadcrumb-trail">
          <a href="#/home">${t.nav.home}</a>
          <span class="breadcrumb-separator">/</span>
          <span>${ct.title}</span>
        </div>
        <h1 class="page-title">${t.nav.s08 || ct.title}</h1>
        <p class="page-subtitle">${ct.subtitle}</p>
      </div>
    </div>

    <div class="container page-body-container">
      <div class="grid-2">
        <div>
          <div class="content-card">
            <h2 class="card-title">${ct.infoTitle}</h2>
            <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 24px;">
              <div>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${ct.emailLabel}</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: var(--shat-navy-800);">${ct.emailValue}</div>
              </div>
              <div>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${ct.phoneLabel}</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: var(--shat-navy-800);">${ct.phoneValue}</div>
              </div>
              <div>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${ct.websiteLabel}</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: var(--shat-navy-800);">${ct.websiteValue}</div>
              </div>
              <div>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${ct.addressLabel}</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: var(--shat-navy-800);">${ct.addressValue}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="content-card">
            <h2 class="card-title">${ct.formTitle}</h2>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px;">${ct.formSubtitle}</p>
            <form id="contact-page-form">
              <div class="form-group">
                <label class="form-label">${ct.nameLabel}</label>
                <input type="text" class="form-input" required placeholder="...">
              </div>
              <div class="form-group">
                <label class="form-label">${ct.emailInputLabel}</label>
                <input type="email" class="form-input" required placeholder="name@domain.com">
              </div>
              <div class="form-group">
                <label class="form-label">${ct.orgLabel}</label>
                <input type="text" class="form-input" required placeholder="...">
              </div>
              <div class="form-group">
                <label class="form-label">${ct.serviceTypeLabel}</label>
                <select class="form-select">
                  ${ct.serviceOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${ct.messageLabel}</label>
                <textarea class="form-textarea" placeholder="..."></textarea>
              </div>
              <button type="submit" class="btn-cta" style="width: 100%;">
                ${ct.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderAcademyPage(t) {
  const ac = t.academy || {};
  const user = authService.getCurrentUser();
  const isLoggedIn = authService.isLoggedIn();
  const courses = getMoodleCourses();

  // 1. GATE VIEW: If user is NOT logged in, require login first!
  if (!isLoggedIn) {
    return `
      <!-- University LMS Entrance Header -->
      <div class="moodle-lms-header-bar" style="background: #ffffff; border-bottom: 2px solid var(--shat-green-600); padding: 16px 0; box-shadow: var(--shadow-sm);">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--shat-green-50); border: 1.5px solid var(--shat-green-500); display: flex; align-items: center; justify-content: center; font-size: 1.6rem;">
              🎓
            </div>
            <div>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy-950);">
                منظومة المودل وكلاس روم الأكاديمية
              </div>
              <div style="font-size: 0.8rem; color: var(--shat-green-700); font-weight: 600;">
                SHAT Development & Growth • University LMS Portal
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="status-pill active" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">
              ☁️ سحابة Google Drive المؤسسية متصلة
            </span>
          </div>
        </div>
      </div>

      <div class="container" style="padding: 40px 16px 80px; max-width: 860px; margin: 0 auto;">
        <!-- Gated Login Card -->
        <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 40px 24px; text-align: center; box-shadow: var(--shadow-md);">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: #ecfdf5; border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 16px;">
            🔐
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 8px;">
            تسجيل الدخول إلى منظومة المودل الأكاديمي
          </h2>
          <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; max-width: 600px; margin-left: auto; margin-right: auto;">
            يرجى تسجيل الدخول للوصول إلى كلاس روم الدورات، حقائب التدريب المباشرة على Google Drive، والتواصل مع هيئة التدريس حسب نوع حسابك:
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; text-align: start;" class="gate-roles-grid">
            <div style="background: #f8fafc; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
              <div style="font-size: 1.5rem; margin-bottom: 6px;">🎓</div>
              <strong style="font-size: 1rem; color: var(--shat-navy-950); display: block;">حساب الطالب</strong>
              <span style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; display: block; margin-top: 6px;">
                عرض الدروس، تحميل ملفات Google Drive مباشرة، تسليم التكليفات، ومحادثة المدرب.
              </span>
            </div>

            <div style="background: #f8fafc; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
              <div style="font-size: 1.5rem; margin-bottom: 6px;">👨‍🏫</div>
              <strong style="font-size: 1rem; color: var(--shat-navy-950); display: block;">حساب المدرس</strong>
              <span style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; display: block; margin-top: 6px;">
                رفع الحقائب السحابية لدرايف، متابعة الحضور، وتصحيح التكليفات والتفاعل المباشر.
              </span>
            </div>

            <div style="background: #f8fafc; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
              <div style="font-size: 1.5rem; margin-bottom: 6px;">⚙️</div>
              <strong style="font-size: 1rem; color: var(--shat-navy-950); display: block;">حساب الإدارة</strong>
              <span style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; display: block; margin-top: 6px;">
                إدارة الموظفين والصلاحيات، قبول طلبات التسجيل، وتعديل محتوى الموقع بالكامل (CMS).
              </span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 460px; margin: 0 auto;">
            <button type="button" class="btn-cta" id="btn-gate-open-auth" style="padding: 13px; font-size: 1.02rem; border-radius: var(--radius-full); font-weight: 700;">
              <span>🔑 الدخول باسم المستخدم وكلمة المرور / واتساب OTP</span>
            </button>
            <span style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
              حسابات تجريبية سريعة متوفرة داخل نافذة الدخول بنقرة واحدة (admin, instructor, student)
            </span>
          </div>
        </div>

        <!-- Google Form Course Registration Direct Card -->
        <div style="margin-top: 32px; background: #ffffff; border: 1.5px solid #d1fae5; border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="status-pill active" style="background: #ecfdf5; color: #047857;">📝 تسجيل جديد</span>
              <strong style="font-size: 1.18rem; color: var(--shat-navy-950);">لست مسجلاً بعد في دورات الأكاديمية؟</strong>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); margin: 6px 0 0; max-width: 540px; line-height: 1.65;">
              يمكن للمتدربين وممثلي المنظمات والشركات التسجيل فوراً في الدورات والبرامج الجديدة عبر نموذج Google Form المعتمد.
            </p>
          </div>
          <a href="#/register-course" class="btn-cta" style="padding: 11px 22px; font-size: 0.92rem; text-decoration: none; border-radius: var(--radius-full);">
            فتح نموذج التسجيل (Google Form) ↗
          </a>
        </div>
      </div>
    `;
  }

  // 2. LOGGED-IN VIEW: University LMS / Google Classroom UI
  const userRole = user.role || 'student';
  const activeCourse = courses[0] || {};
  const staffMembers = authService.getSystemStaff();
  const applications = cmsService.getApplications();
  const cmsData = cmsService.getCMSData();

  return `
    <!-- Google Classroom / University Top Bar -->
    <div class="moodle-lms-classroom-header" style="background: #ffffff; border-bottom: 1px solid var(--border-subtle); padding: 14px 0; box-shadow: var(--shadow-sm); position: sticky; top: 0; z-index: 40;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: #f0fdf4; border: 1.5px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            🎓
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-size: 1.15rem; color: var(--shat-navy-950);">SHAT Moodle • كلاس روم الأكاديمية</strong>
              <span class="status-pill active" style="font-size: 0.72rem; padding: 2px 8px; background: #e0f2fe; color: #0369a1; border-color: #bae6fd;">
                الفصل التدريبي 2026
              </span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 10px; margin-top: 2px;">
              <span>المقرر النشط: <strong>${activeCourse.title || 'دبلوم المعيار الإنساني CHS'}</strong></span>
              <span>•</span>
              <span style="color: #059669; font-weight: 600;">☁️ متصل بسحابة Google Drive</span>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <!-- User Profile Chip -->
          <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1px solid var(--border-subtle); padding: 6px 12px; border-radius: var(--radius-full);">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--shat-green-600); color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.82rem;">
              ${user.avatarLetter || user.name.charAt(0)}
            </div>
            <div style="text-align: start;">
              <div style="font-size: 0.82rem; font-weight: 700; color: var(--shat-navy-950);">${user.name}</div>
              <div style="font-size: 0.72rem; color: var(--shat-green-700); font-weight: 600;">${user.roleTitle}</div>
            </div>
          </div>

          <a href="#/register-course" class="btn-secondary" style="padding: 6px 12px; font-size: 0.78rem; text-decoration: none; border-radius: var(--radius-full);" title="تسجيل متدرب جديد">
            📝 نموذج Google Form
          </a>

          <button type="button" class="btn-secondary" id="btn-moodle-logout" style="padding: 6px 12px; font-size: 0.78rem; border-radius: var(--radius-full); color: #dc2626; border-color: #fecaca; background: #fff5f5;">
            خروج
          </button>
        </div>
      </div>
    </div>

    <!-- Classroom Sub-Navigation Tabs Bar (Moodle & Google Classroom Style) -->
    <div style="background: #ffffff; border-bottom: 2px solid var(--border-subtle);">
      <div class="container" style="display: flex; gap: 4px; overflow-x: auto; padding: 0 16px;">
        <button class="classroom-nav-tab active" data-classroom-tab="stream" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 700; border: none; background: none; cursor: pointer; color: var(--shat-green-700); border-bottom: 3px solid var(--shat-green-600); display: flex; align-items: center; gap: 6px; white-space: nowrap;">
          <span>📢</span>
          <span>ساحة المشاركات (Stream)</span>
        </button>

        <button class="classroom-nav-tab" data-classroom-tab="classwork" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 600; border: none; background: none; cursor: pointer; color: var(--text-secondary); border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
          <span>📚</span>
          <span>الواجب الدراسي والمقررات (Classwork)</span>
        </button>

        <button class="classroom-nav-tab" data-classroom-tab="drive-folder" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 600; border: none; background: none; cursor: pointer; color: var(--text-secondary); border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
          <span>📁</span>
          <span>سحابة Google Drive (Class Drive)</span>
        </button>

        <button class="classroom-nav-tab" data-classroom-tab="chat-room" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 600; border: none; background: none; cursor: pointer; color: var(--text-secondary); border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
          <span>💬</span>
          <span>المحادثة والساعات المكتبية (Chat)</span>
        </button>

        <button class="classroom-nav-tab" data-classroom-tab="grades-cert" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 600; border: none; background: none; cursor: pointer; color: var(--text-secondary); border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
          <span>📊</span>
          <span>الدرجات والشهادة (Grades)</span>
        </button>

        ${userRole === 'instructor' ? `
          <button class="classroom-nav-tab" data-classroom-tab="instructor-upload" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 700; border: none; background: none; cursor: pointer; color: #047857; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
            <span>📤</span>
            <span>رفع الحقائب لدرايف</span>
          </button>
        ` : ''}

        ${userRole === 'admin' ? `
          <button class="classroom-nav-tab" data-classroom-tab="admin-courses" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 700; border: none; background: none; cursor: pointer; color: #047857; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
            ${icons.course('icon-inline', 18)}
            <span>إدارة وتخصيص الدورات والفورم</span>
          </button>

          <button class="classroom-nav-tab" data-classroom-tab="admin-staff" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 700; border: none; background: none; cursor: pointer; color: #1e3a8a; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
            ${icons.users('icon-inline', 18)}
            <span>إدارة الموظفين والصلاحيات</span>
          </button>

          <button class="classroom-nav-tab" data-classroom-tab="admin-admissions" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 700; border: none; background: none; cursor: pointer; color: #7c2d12; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
            ${icons.form('icon-inline', 18)}
            <span>طلبات Google Form (${applications.length})</span>
          </button>

          <button class="classroom-nav-tab" data-classroom-tab="admin-cms" style="padding: 14px 18px; font-size: 0.88rem; font-weight: 700; border: none; background: none; cursor: pointer; color: #065f46; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
            ${icons.settings('icon-inline', 18)}
            <span>محرر الموقع الحي (CMS)</span>
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Main Classroom Body Container -->
    <div class="container" style="padding: 30px 16px 80px; max-width: 1200px;">

      <!-- ==========================================
           TAB 1: STREAM (ساحة المشاركات)
           ========================================== -->
      <div class="classroom-pane active" id="pane-stream">
        <!-- Course Classroom Hero Banner -->
        <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: var(--radius-lg); padding: 32px 28px; color: #ffffff; margin-bottom: 24px; position: relative; overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="position: relative; z-index: 2;">
            <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600;">
              الكود الأكاديمي: SHAT-CHS-2026 • معتمد من CHS Alliance
            </span>
            <h1 style="font-size: 1.85rem; font-weight: 800; margin: 10px 0 6px; color: #ffffff;">
              ${activeCourse.title || 'دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة'}
            </h1>
            <p style="margin: 0; font-size: 0.95rem; opacity: 0.92; max-width: 680px;">
              المدرب الرئيسي: <strong>${activeCourse.instructor || 'د. أسامة المنصور'}</strong> • الساعات المعتمدة: 60 ساعة تدريبية معتمدة دولياً
            </p>
          </div>
          <div style="position: absolute; left: 24px; bottom: 20px; opacity: 0.15; font-size: 6rem; line-height: 1;">
            🎓
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px;" class="classroom-stream-grid">
          <!-- Left Column: Upcoming Work & Drive Link -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 0.98rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                <span>المواعيد القادمة</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">هذا الأسبوع</span>
              </h3>
              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.84rem;">
                <div style="padding: 10px; background: #f8fafc; border-radius: var(--radius-sm); border-right: 3px solid #10b981;">
                  <strong style="color: var(--shat-navy-950); display: block;">تسليم مصفوفة المساءلة AAP</strong>
                  <span style="color: var(--text-muted); font-size: 0.76rem;">الخميس القادم • الساعة 11:59 م</span>
                </div>
                <div style="padding: 10px; background: #f8fafc; border-radius: var(--radius-sm); border-right: 3px solid #0284c7;">
                  <strong style="color: var(--shat-navy-950); display: block;">جلسة المراجعة التفاعلية عبر الإنترنت</strong>
                  <span style="color: var(--text-muted); font-size: 0.76rem;">السبت القادم • الساعة 06:00 م</span>
                </div>
              </div>
            </div>

            <!-- Quick Direct Download Card -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 0.98rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 12px;">
                📂 تحميل سريع للحقيبة التدريبية
              </h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
                انقر للتحميل الفعلي المباشر لملف دليل المعيار الإنساني الأساسي بصيغة PDF لجهازك فوراً:
              </p>
              <button class="btn-cta btn-trigger-real-download" data-file="دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf" style="width: 100%; padding: 10px; font-size: 0.84rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>📥</span>
                <span>تحميل الدليل المعتمد (PDF)</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Stream Posts Feed -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- New Announcement Box -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--shat-navy-900);">
                ${user.avatarLetter || user.name.charAt(0)}
              </div>
              <input type="text" placeholder="أعلن عن شيء لصفك التدريبي..." style="flex: 1; border: 1px solid var(--border-subtle); border-radius: var(--radius-full); padding: 10px 16px; font-size: 0.88rem; outline: none; background: #f8fafc;" id="stream-quick-announce">
              <button class="btn-secondary" id="btn-post-stream-announce" style="padding: 8px 16px; font-size: 0.82rem; border-radius: var(--radius-full);">نشر</button>
            </div>

            <!-- Announcements Feed -->
            <div id="classroom-stream-feed" style="display: flex; flex-direction: column; gap: 14px;">
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: #ecfdf5; border: 1px solid #10b981; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #047857;">
                    أ
                  </div>
                  <div>
                    <strong style="color: var(--shat-navy-950); font-size: 0.95rem; display: block;">د. أسامة المنصور (مدرب المساق)</strong>
                    <span style="font-size: 0.76rem; color: var(--text-muted);">أمس في 04:30 م • منشور تدريبي معتمد</span>
                  </div>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
                  أهلاً بكم جميعاً. تم رفع مصفوفة التقييم والامتثال المؤسسي بصيغة Excel على سحابة Google Drive التابعة للصف، كما تم إرفاقها أدناه للتحميل الفعلي المباشر. يرجى تنزيلها وتعبئة الحقول المطلوبة.
                </p>
                <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">📊</span>
                    <div>
                      <div style="font-weight: 700; font-size: 0.86rem; color: var(--shat-navy-950);">مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx</div>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">Excel Spreadsheet • 1.2 MB • Google Drive</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-trigger-real-download" data-file="مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx" style="padding: 6px 12px; font-size: 0.8rem;">
                    📥 تحميل مباشر
                  </button>
                </div>
              </div>

              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: #eff6ff; border: 1px solid #3b82f6; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1d4ed8;">
                    ش
                  </div>
                  <div>
                    <strong style="color: var(--shat-navy-950); font-size: 0.95rem; display: block;">إدارة الأكاديمية (SHAT Academic Office)</strong>
                    <span style="font-size: 0.76rem; color: var(--text-muted);">منذ يومين • إعلان إداري</span>
                  </div>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px;">
                  نرحب بجميع المتدربين والمنظمات الشريكة الملتحقين بالدفعة الحالية. يمكنكم تنزيل وثيقة الحقيبة الكاملة أو تصفح مجلد Google Drive المشترك من التبويبات بالأعلى.
                </p>
                <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">📄</span>
                    <div>
                      <div style="font-weight: 700; font-size: 0.86rem; color: var(--shat-navy-950);">دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf</div>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">PDF Document • 4.8 MB • معتمد</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-trigger-real-download" data-file="دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf" style="padding: 6px 12px; font-size: 0.8rem;">
                    📥 تحميل مباشر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 2: CLASSWORK (الواجب الدراسي والمقررات)
           ========================================== -->
      <div class="classroom-pane" id="pane-classwork" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">موضوعات ووحدات المنهج التدريبي</h2>
            <p style="font-size: 0.9rem; color: var(--text-muted);">الوحدات الأكاديمية والتكليفات والملفات المباشرة للتحميل لجهازك</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <a href="https://drive.google.com" target="_blank" rel="noopener" class="btn-secondary" style="padding: 8px 14px; font-size: 0.82rem; border-radius: var(--radius-full);">
              📁 فتح مجلد Drive المشترك ↗
            </a>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Topic Unit 1 -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="background: #f8fafc; padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">
                الوحدة الأولى: الإطار المفاهيمي ومعايير الجودة والمساءلة الدولية
              </h3>
              <span class="status-pill active">✓ مكتملة (100%)</span>
            </div>
            <div style="padding: 18px 20px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.4rem;">📄</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.88rem; color: var(--shat-navy-950);">دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">المرجع الأساسي للوحدة • PDF • 4.8 MB</div>
                  </div>
                </div>
                <button class="btn-cta btn-trigger-real-download" data-file="دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf" style="padding: 6px 14px; font-size: 0.8rem;">
                  📥 تحميل مباشر
                </button>
              </div>
            </div>
          </div>

          <!-- Topic Unit 2 -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="background: #f8fafc; padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">
                الوحدة الثانية: أدوات المساءلة للجهات المتضررة (AAP Framework)
              </h3>
              <span class="status-pill active">● جارية الآن (75%)</span>
            </div>
            <div style="padding: 18px 20px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.4rem;">📊</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.88rem; color: var(--shat-navy-950);">مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">تمرين تطبيقي على قياس الامتثال • Excel • 1.2 MB</div>
                  </div>
                </div>
                <button class="btn-cta btn-trigger-real-download" data-file="مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx" style="padding: 6px 14px; font-size: 0.8rem;">
                  📥 تحميل مباشر
                </button>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.4rem;">📑</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.88rem; color: var(--shat-navy-950);">حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.docx</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">نماذج وقوائم التحقق الميدانية • Word • 2.4 MB</div>
                  </div>
                </div>
                <button class="btn-cta btn-trigger-real-download" data-file="حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.docx" style="padding: 6px 14px; font-size: 0.8rem;">
                  📥 تحميل مباشر
                </button>
              </div>
            </div>
          </div>

          <!-- Topic Unit 3 -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="background: #f8fafc; padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">
                الوحدة الثالثة: صون السلامة والحماية من الاستغلال والانتهاك (PSEA)
              </h3>
              <span class="status-pill" style="background: #f1f5f9; color: var(--text-muted);">قيد الإعداد للأسبوع القادم</span>
            </div>
            <div style="padding: 18px 20px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.4rem;">📄</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.88rem; color: var(--shat-navy-950);">إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">سياسات وإجراءات الإبلاغ الآمن • PDF • 3.5 MB</div>
                  </div>
                </div>
                <button class="btn-cta btn-trigger-real-download" data-file="إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf" style="padding: 6px 14px; font-size: 0.8rem;">
                  📥 تحميل مباشر
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 3: GOOGLE DRIVE REPOSITORY (سحابة درايف)
           ========================================== -->
      <div class="classroom-pane" id="pane-drive-folder" style="display: none;">
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="font-size: 2.2rem;">☁️</div>
              <div>
                <h2 style="font-size: 1.3rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">
                  مستودع Google Drive المشترك لشركة شات
                </h2>
                <div style="font-size: 0.82rem; color: var(--shat-green-700); font-weight: 600;">
                  سحابة رسمية موثقة • مزامنة فورية لكافة حقائب التدريب
                </div>
              </div>
            </div>

            <!-- Download All Button -->
            <button class="btn-cta btn-trigger-real-download" data-file="الحقيبة_التدريبية_الشاملة_CHS_2026.docx" style="padding: 9px 18px; font-size: 0.86rem; border-radius: var(--radius-full); display: flex; align-items: center; gap: 8px;">
              <span>⚡</span>
              <span>تحميل الحزمة الشاملة فوراً لجهازك</span>
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
            <!-- Drive File 1 -->
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 1.5rem;">📄</span>
                  <span class="status-pill active" style="font-size: 0.7rem; padding: 1px 6px;">PDF معتمد</span>
                </div>
                <strong style="font-size: 0.9rem; color: var(--shat-navy-950); display: block; margin-bottom: 4px;">
                  دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf
                </strong>
                <span style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-bottom: 12px;">
                  الحجم: 4.8 MB • تم التحقق عبر Google Drive CDN
                </span>
              </div>
              <button class="btn-secondary btn-trigger-real-download" data-file="دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf" style="width: 100%; padding: 8px; font-size: 0.82rem; font-weight: 700;">
                📥 تحميل مباشر لجهازك
              </button>
            </div>

            <!-- Drive File 2 -->
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 1.5rem;">📊</span>
                  <span class="status-pill active" style="font-size: 0.7rem; padding: 1px 6px; background: #ecfdf5; color: #047857;">Excel تطبيق</span>
                </div>
                <strong style="font-size: 0.9rem; color: var(--shat-navy-950); display: block; margin-bottom: 4px;">
                  مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx
                </strong>
                <span style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-bottom: 12px;">
                  الحجم: 1.2 MB • جدول التقييم التفاعلي الكامل
                </span>
              </div>
              <button class="btn-secondary btn-trigger-real-download" data-file="مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx" style="width: 100%; padding: 8px; font-size: 0.82rem; font-weight: 700;">
                📥 تحميل مباشر لجهازك
              </button>
            </div>

            <!-- Drive File 3 -->
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 1.5rem;">📑</span>
                  <span class="status-pill active" style="font-size: 0.7rem; padding: 1px 6px; background: #eff6ff; color: #1e40af;">Word وثيقة</span>
                </div>
                <strong style="font-size: 0.9rem; color: var(--shat-navy-950); display: block; margin-bottom: 4px;">
                  حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.docx
                </strong>
                <span style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-bottom: 12px;">
                  الحجم: 2.4 MB • خطة المساءلة المجتمعية المعتمدة
                </span>
              </div>
              <button class="btn-secondary btn-trigger-real-download" data-file="حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.docx" style="width: 100%; padding: 8px; font-size: 0.82rem; font-weight: 700;">
                📥 تحميل مباشر لجهازك
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 4: CHAT ROOM & OFFICE HOURS
           ========================================== -->
      <div class="classroom-pane" id="pane-chat-room" style="display: none;">
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 20px;" class="classroom-chat-grid">
          <!-- Chat Channels -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 16px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 12px;">قنوات المحادثة الأكاديمية</h3>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="padding: 10px 12px; background: #ecfdf5; border-radius: var(--radius-sm); border-right: 3px solid #059669; font-weight: 700; font-size: 0.86rem; color: #065f46; cursor: pointer;">
                💬 شات المساق العام (د. أسامة)
              </div>
              <div style="padding: 10px 12px; background: #f8fafc; border-radius: var(--radius-sm); font-size: 0.86rem; color: var(--text-secondary); cursor: pointer;">
                👥 نقاشات مجموعات العمل
              </div>
              <div style="padding: 10px 12px; background: #f8fafc; border-radius: var(--radius-sm); font-size: 0.86rem; color: var(--text-secondary); cursor: pointer;">
                💼 الدعم الفني والأكاديمي
              </div>
            </div>
          </div>

          <!-- Active Chat Window -->
          <div class="chat-window-card" style="box-shadow: var(--shadow-sm);">
            <div class="chat-header">
              <div class="chat-user-info">
                <div class="chat-avatar"><span>أ</span><span class="status-dot online pulse"></span></div>
                <div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy-950);">د. أسامة المنصور</div>
                  <div style="font-size: 0.75rem; color: var(--shat-green-700); font-weight: 600;">مدرب المساق (متصل ومتاح للرد)</div>
                </div>
              </div>
              <span class="meta-tag">ساعات مكتبية مفتوحة</span>
            </div>

            <div class="chat-thread-container" id="student-chat-thread" style="height: 340px;">
              <div class="chat-message-row incoming">
                <div class="chat-bubble">
                  أهلاً بك يا ${user.name}. تم رفع مصفوفة التقييم والامتثال المحدثة. يرجى مراجعتها وتنزيلها من تبويب ملفات Drive والبدء بحل التمارين.
                  <span class="chat-bubble-time">10:15 ص</span>
                </div>
              </div>
            </div>

            <div class="chat-input-bar">
              <input type="text" class="chat-input-field" id="student-chat-input" placeholder="اكتب استفسارك للمدرب هنا...">
              <button class="chat-send-btn" id="student-chat-send" title="إرسال">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 5: GRADES & CERTIFICATE (الدرجات والشهادة)
           ========================================== -->
      <div class="classroom-pane" id="pane-grades-cert" style="display: none;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="classroom-grades-grid">
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
              سجل الإنجاز والدرجات التراكمية
            </h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <span class="status-pill active">نسبة الإنجاز: 75%</span>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
                  تم اجتياز 4 تكليفات من أصل 6 بنجاح
                </div>
              </div>
              <div class="progress-ring-box" title="75%">
                <svg class="progress-ring-svg" width="70" height="70">
                  <circle class="progress-ring-bg" stroke-width="6" fill="transparent" r="28" cx="35" cy="35"/>
                  <circle class="progress-ring-fill" stroke-width="6" stroke-dasharray="175.9" stroke-dashoffset="44" fill="transparent" r="28" cx="35" cy="35"/>
                </svg>
                <span class="progress-ring-label">75%</span>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.86rem;">
              <div style="display: flex; justify-content: space-between; padding: 10px; background: #f8fafc; border-radius: 6px;">
                <span>اختبار الوحدة 1 (CHS Foundations)</span>
                <strong style="color: #047857;">95 / 100 ✓</strong>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px; background: #f8fafc; border-radius: 6px;">
                <span>تمرين مصفوفة المساءلة AAP</span>
                <strong style="color: #047857;">90 / 100 ✓</strong>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px; background: #f8fafc; border-radius: 6px;">
                <span>نسبة الحضور والتفاعل الحي</span>
                <strong style="color: #047857;">92% ✓</strong>
              </div>
            </div>
          </div>

          <!-- Digital Certificate Card -->
          <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <span class="status-pill active" style="background: #ecfdf5; color: #047857;">🏆 شهادة التخرج المعتمدة</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">كود التحقق: SHAT-CERT-2026</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 8px;">
                شهادة إتمام دبلوم المعيار الإنساني الأساسي
              </h3>
              <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                تمنح هذه الشهادة رسمياً بعد استكمال متطلبات الدورة بنسبة حضور لا تقل عن 80% وتسليم كافة التمارين العملية الميدانية.
              </p>
            </div>
            <button class="btn-cta btn-trigger-real-download" data-file="شهادة_تخرج_معتمدة_SHAT_2026.pdf" style="width: 100%; padding: 11px; font-weight: 700; font-size: 0.88rem;">
              📥 تحميل الشهادة الرسمية بصيغة PDF لجهازك
            </button>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 6: INSTRUCTOR DRIVE UPLOADER (للمدرس)
           ========================================== -->
      ${userRole === 'instructor' ? `
        <div class="classroom-pane" id="pane-instructor-upload" style="display: none;">
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); max-width: 760px; margin: 0 auto;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 6px;">
              📤 رفع حقيبة تدريبية جديدة إلى Google Drive والمنصة
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
              الملفات المرفوعة يتم حفظها فوراً في سحابة Google Drive التابعة للصف التدريبي وتتاح للطلاب للتنزيل المباشر.
            </p>

            <form id="teacher-file-upload-form">
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">المساق التدريبي المستهدف:</label>
                <select id="upload-course-select" class="form-select">
                  <option value="shat-chs-master">دبلوم المعيار الإنساني الأساسي (CHS)</option>
                  <option value="shat-psea-expert">استشارات الحماية وصون السلامة (PSEA)</option>
                  <option value="shat-oecd-eval">الشهادة الاحترافية في التقييم OECD DAC</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">عنوان الملف / اسم الحقيبة:</label>
                <input type="text" id="upload-file-title" class="form-input" required placeholder="مثال: حقيبة_المساءلة_الميدانية_المحدثة_2026.pdf">
              </div>

              <div class="upload-dropzone" id="teacher-dropzone" style="margin-bottom: 16px; border: 2px dashed #10b981; border-radius: var(--radius-md); padding: 28px; text-align: center; cursor: pointer; background: #f0fdf4;">
                <div style="font-size: 2.2rem; margin-bottom: 6px;">☁️</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950);">اسحب الملف هنا أو انقر للاختيار</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">يتم التخزين والمزامنة السحابية الفورية</div>
                <input type="file" id="teacher-file-input" style="display: none;">
              </div>

              <div id="upload-progress-container" style="display: none; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
                  <span id="upload-status-text">جارٍ الرفع والمزامنة مع Google Drive...</span>
                  <span id="upload-percent-text">100%</span>
                </div>
                <div class="progress-bar-track"><div class="progress-bar-fill" id="upload-progress-bar" style="width: 100%;"></div></div>
              </div>

              <button type="submit" class="btn-cta" style="width: 100%; padding: 11px; font-weight: 700;">
                🚀 رفع الملف واعتماده فوراً للطلاب
              </button>
            </form>
          </div>
        </div>
      ` : ''}

      <!-- ==========================================
           TAB 7: ADMIN STAFF MANAGEMENT (للمدير)
           ========================================== -->
      ${userRole === 'admin' ? `
        <div class="classroom-pane" id="pane-admin-staff" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--shat-navy-950);">إدارة الكادر والموظفين وتعيين الصلاحيات</h2>
              <p style="font-size: 0.88rem; color: var(--text-muted);">إضافة موظفين جدد، وتحديد الأدوار: مدير، مدرب، مسؤول تسجيل وقبول، مسؤول محتوى</p>
            </div>
            <button class="btn-cta" id="btn-toggle-add-staff" style="padding: 8px 16px; font-size: 0.84rem; border-radius: var(--radius-full);">
              + إضافة موظف جديد
            </button>
          </div>

          <!-- Add Staff Form Drawer / Box -->
          <div id="box-add-staff-form" style="display: none; background: #ffffff; border: 1.5px solid var(--shat-green-500); border-radius: var(--radius-lg); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 14px;">بيانات الموظف الجديد والصلاحية الممنوحة</h3>
            <form id="form-create-staff-member">
              <div class="grid-2" style="gap: 12px; margin-bottom: 12px;">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.82rem;">الاسم الكامل للموظف *</label>
                  <input type="text" id="new-staff-name" class="form-input" required placeholder="مثال: د. إياس شلبي">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.82rem;">اسم المستخدم (Username) *</label>
                  <input type="text" id="new-staff-username" class="form-input" required placeholder="eyas">
                </div>
              </div>
              <div class="grid-2" style="gap: 12px; margin-bottom: 12px;">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.82rem;">البريد الإلكتروني *</label>
                  <input type="email" id="new-staff-email" class="form-input" required placeholder="eyas@shat.com">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.82rem;">كلمة المرور *</label>
                  <input type="password" id="new-staff-password" class="form-input" required placeholder="••••••••">
                </div>
              </div>
              <div class="grid-2" style="gap: 12px; margin-bottom: 16px;">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.82rem;">رقم الواتساب للتواصل</label>
                  <input type="tel" id="new-staff-phone" class="form-input" placeholder="+972592879621" dir="ltr">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.82rem;">الصلاحية والرتبة في النظام *</label>
                  <select id="new-staff-role" class="form-select">
                    <option value="instructor">👨‍🏫 مدرب معتمد (Instructor)</option>
                    <option value="registrar">📋 مسؤول التسجيل والقبول (Registrar)</option>
                    <option value="editor">✍️ مسؤول المحتوى والنشر (Editor)</option>
                    <option value="admin">⚙️ مدير عام (Admin)</option>
                  </select>
                </div>
              </div>
              <div style="display: flex; gap: 10px;">
                <button type="submit" class="btn-cta" style="padding: 9px 20px; font-size: 0.86rem;">حفظ وإضافة الموظف</button>
                <button type="button" class="btn-secondary" id="btn-cancel-add-staff" style="padding: 9px 16px; font-size: 0.86rem;">إلغاء</button>
              </div>
            </form>
          </div>

          <!-- Staff Table -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
            <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.88rem;">
              <thead style="background: #f8fafc; border-bottom: 1px solid var(--border-subtle);">
                <tr>
                  <th style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy-950);">الموظف</th>
                  <th style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy-950);">اسم المستخدم</th>
                  <th style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy-950);">الرتبة والصلاحية</th>
                  <th style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy-950);">بيانات الاتصال</th>
                  <th style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy-950); text-align: center;">إجراءات</th>
                </tr>
              </thead>
              <tbody id="admin-staff-table-body">
                ${staffMembers.map(member => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 16px;">
                      <div style="font-weight: 700; color: var(--shat-navy-950);">${member.name}</div>
                      <div style="font-size: 0.76rem; color: var(--text-muted);">${member.email}</div>
                    </td>
                    <td style="padding: 12px 16px; font-family: monospace; font-size: 0.85rem; color: var(--shat-navy-900);">
                      ${member.username}
                    </td>
                    <td style="padding: 12px 16px;">
                      <select class="form-select form-select-sm staff-role-change" data-username="${member.username}" style="padding: 4px 8px; font-size: 0.8rem; border-radius: 4px;">
                        <option value="admin" ${member.role === 'admin' ? 'selected' : ''}>⚙️ المدير العام (Admin)</option>
                        <option value="instructor" ${member.role === 'instructor' ? 'selected' : ''}>👨‍🏫 مدرب معتمد (Instructor)</option>
                        <option value="registrar" ${member.role === 'registrar' ? 'selected' : ''}>📋 مسؤول القبول والتسجيل (Registrar)</option>
                        <option value="editor" ${member.role === 'editor' ? 'selected' : ''}>✍️ مسؤول المحتوى (Editor)</option>
                        <option value="student" ${member.role === 'student' ? 'selected' : ''}>🎓 طالب / متدرب (Student)</option>
                      </select>
                    </td>
                    <td style="padding: 12px 16px; font-size: 0.8rem; color: var(--text-secondary);">
                      ${member.phone || 'غير مسجل'}
                    </td>
                    <td style="padding: 12px 16px; text-align: center;">
                      ${member.username !== 'admin' ? `
                        <button type="button" class="btn-delete-staff" data-username="${member.username}" style="background: none; border: 1px solid #fecaca; color: #dc2626; border-radius: 4px; padding: 4px 8px; font-size: 0.76rem; cursor: pointer;">
                          حذف
                        </button>
                      ` : '<span style="font-size: 0.75rem; color: var(--text-muted);">رئيسي</span>'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ==========================================
             TAB 8: ADMIN GOOGLE FORM ADMISSIONS (للمدير)
             ========================================== -->
        <div class="classroom-pane" id="pane-admin-admissions" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--shat-navy-950);">طلبات الالتحاق بالدورات التدريبية (Google Form Admissions)</h2>
              <p style="font-size: 0.88rem; color: var(--text-muted);">إدارة وتسكين المتدربين والمنظمات الذين سجلوا عبر نموذج التسجيل السحابي</p>
            </div>
            <a href="#/register-course" target="_blank" class="btn-secondary" style="padding: 8px 16px; font-size: 0.82rem; border-radius: var(--radius-full);">
              🔗 فتح نموذج Google Form المباشر ↗
            </a>
          </div>

          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow-x: auto; box-shadow: var(--shadow-sm);">
            <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.86rem;">
              <thead style="background: #f8fafc; border-bottom: 1px solid var(--border-subtle);">
                <tr>
                  <th style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy-950);">رقم الطلب والتاريخ</th>
                  <th style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy-950);">المتقدم / المنظمة</th>
                  <th style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy-950);">المسار التدريبي</th>
                  <th style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy-950);">النمط والاتصال</th>
                  <th style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy-950);">الحالة</th>
                  <th style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy-950); text-align: center;">إجراءات الاعتماد</th>
                </tr>
              </thead>
              <tbody id="admin-admissions-table-body">
                ${applications.map(app => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 14px;">
                      <strong style="color: var(--shat-navy-950); font-family: monospace;">${app.id}</strong>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">${new Date(app.submittedAt).toLocaleDateString('ar-SA')}</div>
                    </td>
                    <td style="padding: 12px 14px;">
                      <div style="font-weight: 700; color: var(--shat-navy-950);">${app.fullName}</div>
                      <div style="font-size: 0.76rem; color: var(--text-secondary);">${app.jobTitle || ''} • ${app.organization || 'مستقل'}</div>
                    </td>
                    <td style="padding: 12px 14px; font-size: 0.82rem; color: var(--shat-navy-900);">
                      ${app.courseTrack}
                    </td>
                    <td style="padding: 12px 14px; font-size: 0.78rem;">
                      <div>${app.trainingMode || 'افتراضي'}</div>
                      <div style="color: var(--shat-green-700); font-weight: 600;">${app.phone}</div>
                    </td>
                    <td style="padding: 12px 14px;">
                      <span class="status-pill ${app.status === 'approved' ? 'active' : ''}" style="font-size: 0.72rem; padding: 2px 8px;">
                        ${app.status === 'approved' ? '✓ مقبول وتم التسكين' : (app.status === 'rejected' ? '✗ مرفوض' : '⏳ قيد المراجعة')}
                      </span>
                    </td>
                    <td style="padding: 12px 14px; text-align: center;">
                      <div style="display: flex; gap: 6px; justify-content: center;">
                        <button class="btn-cta btn-approve-admission" data-appid="${app.id}" style="padding: 4px 10px; font-size: 0.76rem; background: #059669;">
                          قبول
                        </button>
                        <button class="btn-secondary btn-reject-admission" data-appid="${app.id}" style="padding: 4px 10px; font-size: 0.76rem; color: #dc2626; border-color: #fecaca;">
                          رفض
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ==========================================
             TAB 8: ADMIN COURSE & GOOGLE FORM CUSTOMIZER
             ========================================== -->
        <div class="classroom-pane" id="pane-admin-courses" style="display: none;">
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
              <div>
                <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy-950); margin: 0; display: flex; align-items: center; gap: 8px;">
                  ${icons.course('icon-inline', 24)}
                  <span>إدارة وتخصيص الدورات ونماذج Google Form المعتمدة</span>
                </h2>
                <p style="font-size: 0.86rem; color: var(--text-muted); margin: 4px 0 0;">
                  التحكم الكامل في إضافة المقررات، تعيين روابط Google Form المخصصة للتسجيل، وروابط سحابة Google Drive لكل مساق
                </p>
              </div>
              <button type="button" class="btn-cta" id="btn-toggle-new-course-form" style="padding: 9px 18px; font-size: 0.88rem;">
                ${icons.plus('icon-inline', 18)} إضافة دورة تدريبية جديدة
              </button>
            </div>

            <!-- Global Default Google Form URL Settings Box -->
            <div style="background: #f0fdf4; border: 1.5px solid #a7f3d0; border-radius: var(--radius-md); padding: 20px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="status-pill active" style="font-size: 0.76rem;">رابط التسجيل العام الافتراضي</span>
                <strong style="font-size: 0.95rem; color: var(--shat-navy-950);">الرابط العام لاستمارة Google Form (يطبق على طلبات التسجيل السريع)</strong>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
                يمكنك تخصيص الرابط العام الذي يفتح عند النقر على استمارة القبول من أي مكان في الموقع:
              </p>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <input type="url" id="admin-global-gform-input" class="form-input" value="${getGlobalGoogleFormUrl()}" style="flex: 1; min-width: 260px; font-size: 0.88rem; background: #ffffff;" placeholder="https://forms.gle/..." dir="ltr">
                <button type="button" id="btn-save-global-gform" class="btn-cta" style="padding: 9px 20px; font-size: 0.88rem;">
                  ${icons.check('icon-inline', 16)} حفظ الرابط العام
                </button>
              </div>
            </div>

            <!-- New Course Form (Expandable) -->
            <div id="box-new-course-form" style="display: none; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: var(--radius-md); padding: 24px; animation: fadeIn 0.25s ease;">
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                ${icons.plus('icon-inline', 20)}
                <span>بيانات الدورة التدريبية الجديدة</span>
              </h3>
              <form id="form-create-new-course">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">عنوان الدورة *</label>
                    <input type="text" id="new-course-title" class="form-input" placeholder="مثال: دبلوم إدارة المشاريع التنموية الاحترافي" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">كود الدورة *</label>
                    <input type="text" id="new-course-code" class="form-input" placeholder="مثال: DEV-401" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">المسار التدريبي والتخصصي</label>
                    <input type="text" id="new-course-track" class="form-input" placeholder="المسار التنموي والحوكمة المؤسسية" style="width: 100%; font-size: 0.88rem;">
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">اسم المدرب / المشرف الأكاديمي</label>
                    <input type="text" id="new-course-instructor" class="form-input" placeholder="أ. د. عبد الله السالم" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px; color: #047857;">
                      🔗 رابط استمارة Google Form الخاصة بالدورة:
                    </label>
                    <input type="url" id="new-course-gform-url" class="form-input" placeholder="https://forms.gle/..." style="width: 100%; font-size: 0.88rem; border-color: #10b981;" dir="ltr">
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px; color: #0369a1;">
                      📁 رابط مجلد Google Drive للدورة:
                    </label>
                    <input type="url" id="new-course-drive-url" class="form-input" placeholder="https://drive.google.com/drive/folders/..." style="width: 100%; font-size: 0.88rem; border-color: #0284c7;" dir="ltr">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">الساعات المعتمدة والمدة:</label>
                    <input type="text" id="new-course-duration" class="form-input" placeholder="40 ساعة تدريبية معتمدة • 6 أسابيع" style="width: 100%; font-size: 0.88rem;">
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">المواعيد والجدول:</label>
                    <input type="text" id="new-course-schedule" class="form-input" placeholder="الأحد والثلاثاء • 6:00 - 8:30 م" style="width: 100%; font-size: 0.88rem;">
                  </div>
                </div>

                <div style="margin-bottom: 18px;">
                  <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">نبذة تعريفية عن البرنامج ومخرجاته:</label>
                  <textarea id="new-course-overview" class="form-textarea" rows="3" placeholder="وصف المساق والأهداف التدريبية والمخرجات..."></textarea>
                </div>

                <div style="display: flex; gap: 10px;">
                  <button type="submit" class="btn-cta" style="padding: 10px 24px; font-size: 0.9rem;">
                    ${icons.check('icon-inline', 16)} حفظ وإدراج الدورة فوراً
                  </button>
                  <button type="button" id="btn-cancel-new-course" class="btn-secondary" style="padding: 10px 18px; font-size: 0.9rem;">
                    إلغاء
                  </button>
                </div>
              </form>
            </div>

            <!-- Existing Courses Customization List -->
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
                المقررات والدورات الحالية وإمكانية تخصيص الروابط (${courses.length} مساقات)
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${courses.map(c => `
                  <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 10px;">
                      <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span class="course-code-badge">${c.code}</span>
                          <strong style="font-size: 1.05rem; color: var(--shat-navy-950);">${c.title}</strong>
                        </div>
                        <span style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-top: 3px;">
                          ${c.track} • المدرب: ${c.instructor} • ${c.duration}
                        </span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <a href="#/course/${c.id}" class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem; text-decoration: none;">
                          ${icons.book('icon-inline', 15)} صفحة الدورة 📄
                        </a>
                        <button type="button" class="btn-secondary btn-delete-moodle-course" data-course-id="${c.id}" style="padding: 6px 12px; font-size: 0.8rem; color: #dc2626; border-color: #fecaca; background: #fff5f5;">
                          ${icons.trash('icon-inline', 15)} حذف
                        </button>
                      </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 12px;">
                      <div>
                        <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #047857; margin-bottom: 4px;">
                          رابط استمارة Google Form المخصصة:
                        </label>
                        <input type="url" id="custom-gform-${c.id}" class="form-input" value="${c.googleFormUrl || ''}" placeholder="https://forms.gle/..." style="width: 100%; font-size: 0.82rem; background: #f0fdf4; border-color: #10b981;" dir="ltr">
                      </div>
                      <div>
                        <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #0369a1; margin-bottom: 4px;">
                          رابط مجلد Google Drive للمقرر:
                        </label>
                        <input type="url" id="custom-drive-${c.id}" class="form-input" value="${c.driveFolderUrl || ''}" placeholder="https://drive.google.com/..." style="width: 100%; font-size: 0.82rem; background: #f0f9ff; border-color: #0284c7;" dir="ltr">
                      </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end;">
                      <button type="button" class="btn-cta btn-save-course-links" data-course-id="${c.id}" style="padding: 7px 16px; font-size: 0.82rem;">
                        ${icons.check('icon-inline', 15)} حفظ وتحديث روابط الدورة فوراً
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- ==========================================
             TAB 9: ADMIN SITE CMS EDITOR (للمدير مثل لوتس)
             ========================================== -->
        <div class="classroom-pane" id="pane-admin-cms" style="display: none;">
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); max-width: 860px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">
                  🛠️ محرر محتوى نصوص الموقع والمنشورات (Live CMS Editor)
                </h2>
                <p style="font-size: 0.86rem; color: var(--text-muted); margin: 4px 0 0;">
                  تعديل نصوص الصفحة الرئيسية، الشعار المؤسسي، بيانات الاتصال، ومنشورات المنصات الاجتماعية فوراً
                </p>
              </div>
              <span class="status-pill active">حفظ تلقائي وفوري</span>
            </div>

            <form id="form-site-cms-editor">
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">عنوان الهيدر الرئيسي (Hero Main Title):</label>
                <input type="text" id="cms-hero-title" class="form-input" value="${cmsData.heroTitle || ''}">
              </div>

              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">الوصف الترحيبي المؤسسي (Hero Subtitle):</label>
                <textarea id="cms-hero-subtitle" class="form-textarea" style="min-height: 80px;">${cmsData.heroSubtitle || ''}</textarea>
              </div>

              <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">شعار الشركة اللفظي (Company Motto):</label>
                  <input type="text" id="cms-motto" class="form-input" value="${cmsData.companyMotto || ''}">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">الشعار المؤسسي الفرعي (Tagline):</label>
                  <input type="text" id="cms-tagline" class="form-input" value="${cmsData.companyTagline || ''}">
                </div>
              </div>

              <div class="grid-3" style="gap: 12px; margin-bottom: 20px;">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">رقم الهاتف / واتساب:</label>
                  <input type="text" id="cms-phone" class="form-input" value="${cmsData.phone || '+972 59 287 9621'}" dir="ltr">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">البريد الإلكتروني:</label>
                  <input type="email" id="cms-email" class="form-input" value="${cmsData.email || 'shat.company26@gmail.com'}">
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">العنوان ونطاق العمل:</label>
                  <input type="text" id="cms-address" class="form-input" value="${cmsData.address || 'فلسطين • نطاق العمل: دولي وإقليمي'}">
                </div>
              </div>

              <button type="submit" class="btn-cta" style="width: 100%; padding: 12px; font-weight: 700; font-size: 0.95rem;">
                💾 حفظ وتطبيق كافة التعديلات على الموقع فوراً
              </button>
            </form>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

// -------------------------------------------------------------
// GOOGLE FORM STYLE COURSE REGISTRATION PAGE (#/register-course)
// -------------------------------------------------------------
export function renderGoogleFormRegistration(t) {
  return `
    <div style="background: #f0fdf4; min-height: 100vh; padding: 30px 16px 80px;">
      <div style="max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">

        <!-- Google Form Accent Banner -->
        <div style="background: linear-gradient(90deg, #059669 0%, #10b981 100%); height: 10px; border-radius: 8px 8px 0 0; margin-bottom: -16px;"></div>

        <!-- Google Form Title Header Card -->
        <div style="background: #ffffff; border: 1px solid #d1fae5; border-radius: var(--radius-lg); padding: 32px 28px; box-shadow: var(--shadow-sm); border-top: 6px solid #059669;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <img src="assets/logo/logo-transparent.png" alt="SHAT Logo" style="height: 38px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
            <div>
              <div style="font-size: 0.82rem; color: var(--shat-green-700); font-weight: 700;">شركة شات للتنمية والتطوير (SHAT Development & Growth)</div>
              <div style="font-size: 0.74rem; color: var(--text-muted);">بوابة التسجيل والقبول الأكاديمي الموحد 2026</div>
            </div>
          </div>

          <h1 style="font-size: 1.65rem; font-weight: 800; color: var(--shat-navy-950); margin: 0 0 10px;">
            استمارة تسجيل المتدربين والمنظمات في برامج ودبلومات شات التدريبية
          </h1>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin: 0 0 14px;">
            نرحب بانضمامكم لبرامج بناء القدرات والاستشارات المتخصصة. يرجى تعبئة الحقول التالية بدقة لتأكيد تسجيلكم وتسكينكم في مساحة المودل وإصدار بطاقة المتدرب.
          </p>

          <div style="padding: 10px 14px; background: #ecfdf5; border-radius: var(--radius-sm); font-size: 0.82rem; color: #047857; display: flex; align-items: center; gap: 8px;">
            <span>ℹ️</span>
            <span>الحقول التي تحمل علامة (*) إلزامية لاستكمال التسجيل.</span>
          </div>
        </div>

        <!-- Submission Form -->
        <form id="google-form-course-application" style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Question 1: Full Name -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 8px; display: block;">
              1. الاسم الرباعي الكامل للمتدرب/ة (أو ممثل المنظمة) *
            </label>
            <input type="text" id="gform-name" class="form-input" required placeholder="إجابتك..." style="border-bottom: 2px solid var(--border-subtle); border-top: none; border-left: none; border-right: none; border-radius: 0; padding: 8px 4px; background: transparent;">
          </div>

          <!-- Question 2: Email -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 8px; display: block;">
              2. البريد الإلكتروني الرسمي للمراسلات وتفعيل حساب المودل *
            </label>
            <input type="email" id="gform-email" class="form-input" required placeholder="name@domain.com" style="border-bottom: 2px solid var(--border-subtle); border-top: none; border-left: none; border-right: none; border-radius: 0; padding: 8px 4px; background: transparent;">
          </div>

          <!-- Question 3: WhatsApp Phone -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 8px; display: block;">
              3. رقم الواتساب المباشر (مع رمز الدولة للتأكيد الفوري) *
            </label>
            <input type="tel" id="gform-phone" class="form-input" required placeholder="+972592879621" dir="ltr" value="+97259" style="border-bottom: 2px solid var(--border-subtle); border-top: none; border-left: none; border-right: none; border-radius: 0; padding: 8px 4px; background: transparent;">
          </div>

          <!-- Question 4: Organization -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 8px; display: block;">
              4. جهة العمل أو اسم المنظمة / المؤسسة (أو اكتب: متدرب مستقل) *
            </label>
            <input type="text" id="gform-org" class="form-input" required placeholder="إجابتك..." style="border-bottom: 2px solid var(--border-subtle); border-top: none; border-left: none; border-right: none; border-radius: 0; padding: 8px 4px; background: transparent;">
          </div>

          <!-- Question 5: Job Title -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 8px; display: block;">
              5. المسمى الوظيفي الحالي *
            </label>
            <input type="text" id="gform-job" class="form-input" required placeholder="مثال: منسق مشاريع، أخصائي حماية، مقيّم..." style="border-bottom: 2px solid var(--border-subtle); border-top: none; border-left: none; border-right: none; border-radius: 0; padding: 8px 4px; background: transparent;">
          </div>

          <!-- Question 6: Course Track Selection -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 12px; display: block;">
              6. اختر المسار أو البرنامج التدريبي المطلوب *
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-course" value="دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة" checked>
                <span>دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-course" value="البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)">
                <span>البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-course" value="الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)">
                <span>الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-course" value="دبلوم تدريب المدربين المحترفين في القطاع الإنساني (TOT)">
                <span>دبلوم تدريب المدربين المحترفين في القطاع الإنساني (TOT)</span>
              </label>
            </div>
          </div>

          <!-- Question 7: Delivery Mode -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 12px; display: block;">
              7. نمط التدريب المفضل لك *
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-mode" value="تدريب افتراضي عبر الإنترنت (Online Interactive)" checked>
                <span>تدريب افتراضي تفاعلي عبر الإنترنت (Zoom / Teams)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-mode" value="تدريب حضوري في القاعات التدريبية (In-Person)">
                <span>تدريب حضوري في القاعات التدريبية التابعة للشركة</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="gform-mode" value="نمط هجين مدمج (Blended Learning)">
                <span>نمط هجين مدمج (جلسات حضورية + ورش افتراضية)</span>
              </label>
            </div>
          </div>

          <!-- Question 8: Experience -->
          <div class="gform-question-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px 24px; box-shadow: var(--shadow-sm);">
            <label class="form-label" style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950); margin-bottom: 8px; display: block;">
              8. عدد سنوات الخبرة أو نبذة مختصرة عن المجال:
            </label>
            <textarea id="gform-exp" class="form-textarea" placeholder="إجابتك..." style="min-height: 70px;"></textarea>
          </div>

          <!-- Submit Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button type="submit" class="btn-cta" id="btn-submit-gform" style="padding: 12px 36px; font-size: 0.95rem; font-weight: 700; border-radius: 4px;">
              إرسال الاستمارة (Submit)
            </button>
            <a href="#/academy" style="color: var(--text-muted); font-size: 0.85rem; text-decoration: none;">
              الرجوع إلى المودل
            </a>
          </div>
        </form>

        <!-- Confirmation Success Screen (Initially hidden) -->
        <div id="gform-success-receipt" style="display: none; background: #ffffff; border: 1px solid #bbf7d0; border-radius: var(--radius-lg); padding: 36px 28px; box-shadow: var(--shadow-sm); border-top: 6px solid #059669; text-align: center;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #ecfdf5; border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 16px; color: #047857;">
            ✓
          </div>
          <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 8px;">
            تم تسجيل استجابتك بنجاح
          </h2>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
            شكراً لاهتمامك ببرامج شركة شات للتنمية والتطوير. تم حفظ طلبك وإرساله إلى قسم القبول والتسجيل.
          </p>

          <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; max-width: 380px; margin: 0 auto 24px; text-align: start; font-size: 0.86rem;">
            <div>رقم التتبع المرجعي: <strong id="gform-receipt-code" style="color: #047857; font-family: monospace; font-size: 1rem;"></strong></div>
            <div style="margin-top: 4px; color: var(--text-muted); font-size: 0.78rem;">سيصلك إشعار القبول وبيانات الدخول عبر واتساب والبريد.</div>
          </div>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <a href="#/academy" class="btn-cta" style="padding: 10px 22px; font-size: 0.88rem; text-decoration: none;">
              الانتقال إلى نظام المودل
            </a>
            <button type="button" class="btn-secondary" id="btn-submit-another-gform" style="padding: 10px 18px; font-size: 0.88rem;">
              إرسال استجابة أخرى
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// DEDICATED SINGLE COURSE DETAIL PAGE (#/course/:id)
// Comprehensive interactive page for Student, Instructor, and Admin
// -------------------------------------------------------------
export function renderCourseDetailPage(t, courseId) {
  const courses = getMoodleCourses();
  const course = courses.find(c => c.id === courseId) || courses[0] || {};
  const user = authService.getCurrentUser();
  const canDownload = authService.canDownloadMaterials();
  const isAdmin = authService.isAdmin();
  const isInstructor = authService.isInstructor();
  const isStudent = authService.isStudent();
  const defaultCover = '/assets/images/posts/post-chs-workshop.svg';
  const courseCover = cmsService.getCustomImage('courseCover_' + course.id, course.coverImage || defaultCover);

  return `
    <div class="course-page-wrapper">
      <!-- Breadcrumb Navigation Bar -->
      <div class="course-breadcrumb-bar">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; flex-wrap: wrap;">
            <a href="#/home">${icons.arrowRight('icon-inline', 15)} الرئيسية</a>
            <span>/</span>
            <a href="#/academy">${icons.academy('icon-inline', 15)} الأكاديمية والدورات</a>
            <span>/</span>
            <span class="active-crumb">${course.title || 'تفاصيل الدورة'}</span>
          </div>
          <div>
            <a href="#/academy" class="btn-secondary" style="padding: 4px 12px; font-size: 0.8rem; border-radius: var(--radius-full);">
              ${icons.arrowRight('icon-inline', 14)} العودة لجميع البرامج
            </a>
          </div>
        </div>
      </div>

      <!-- Course Hero Header -->
      <section class="course-hero-header">
        <div class="container">
          <div class="course-hero-grid">
            <div>
              <div class="course-hero-badges">
                <span class="course-hero-pill" style="background: rgba(255,255,255,0.22); font-weight: 800; border-color: rgba(255,255,255,0.35);">
                  ${course.code || 'CHS-101'}
                </span>
                <span class="course-hero-pill">
                  ${icons.award('icon-inline', 15)} ${course.track || 'المسار التدريبي المعتمد'}
                </span>
                <span class="course-hero-pill">
                  ${icons.shield('icon-inline', 15)} معتمد دولياً • CHS & Sphere
                </span>
              </div>

              <h1 class="course-hero-title">${course.title || 'دبلوم المعيار الإنساني الأساسي (CHS)'}</h1>

              <p style="font-size: 1.02rem; opacity: 0.95; line-height: 1.7; max-width: 760px; margin-bottom: 24px;">
                ${course.overview || 'برنامج تدريبي تفاعلي معتمد دولياً لتأهيل الكوادر وتطبيق المعايير الإنسانية والحوكمة المؤسسية.'}
              </p>

              <!-- Meta Specs Grid -->
              <div style="display: flex; flex-wrap: wrap; gap: 18px; font-size: 0.88rem; opacity: 0.95;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  ${icons.clock('icon-inline', 18)}
                  <span>الساعات المعتمدة: <strong>${course.duration || '40 ساعة تدريبية معتمدة'}</strong></span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  ${icons.calendar('icon-inline', 18)}
                  <span>المواعيد: <strong>${course.schedule || 'الأحد والأربعاء • 6:00 - 8:30 م'}</strong></span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  ${icons.userCheck('icon-inline', 18)}
                  <span>المشرف الأكاديمي: <strong>${course.instructor || 'د. أسامة المنصور'}</strong></span>
                </div>
              </div>
            </div>

            <!-- Side Card with Custom Action Buttons -->
            <div>
              <div class="course-hero-sidecard">
                <!-- Course Visual Thumbnail & Admin Edit Button -->
                <div style="position: relative; height: 130px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 14px; background: #0f172a;">
                  <img src="${courseCover}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${defaultCover}'">
                  ${isAdmin ? `
                    <button type="button" class="btn-edit-image-trigger" data-img-key="courseCover_${course.id}" data-img-title="تعديل غلاف دورة: ${course.title}" style="position: absolute; top: 8px; inset-inline-end: 8px; background: rgba(255,255,255,0.95); border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 8px; font-size: 0.72rem; font-weight: 700; color: #1e3a8a; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
                      ${icons.image('icon-inline', 13)} تغيير الغلاف
                    </button>
                  ` : ''}
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px; margin-bottom: 12px;">
                  <span class="status-pill active" style="font-size: 0.78rem;">
                    ${icons.check('icon-inline', 14)} التسجيل متاح الآن
                  </span>
                  <span style="font-size: 0.82rem; font-weight: 700; color: var(--shat-green-700);">
                    دفعة 2026
                  </span>
                </div>

                <!-- 1. Custom Google Form Link for this Course (Open for all) -->
                <a href="${course.googleFormUrl || 'https://forms.gle/shat-training-register-2026'}" target="_blank" rel="noopener" class="btn-course-cta" style="padding: 13px; font-size: 0.96rem; text-align: center;" id="course-btn-gform">
                  ${icons.form('icon-inline', 20)}
                  <span>سجل في الدورة عبر Google Form ↗</span>
                </a>

                <!-- 2. Custom Google Drive Repository (Permission Checked) -->
                ${canDownload ? `
                  <a href="${course.driveFolderUrl || 'https://drive.google.com/drive/folders/shat-materials'}" target="_blank" rel="noopener" class="btn-course-form" style="padding: 10px; font-size: 0.88rem; justify-content: center;" id="course-btn-drive">
                    ${icons.drive('icon-inline', 18)}
                    <span>فتح مجلد الدورة على Google Drive ↗</span>
                  </a>
                ` : `
                  <button type="button" class="btn-course-form btn-guard-drive" data-course-title="${course.title}" style="padding: 10px; font-size: 0.85rem; justify-content: center; width: 100%; border-color: #fde68a; background: #fffbeb; color: #b45309;" id="course-btn-drive">
                    ${icons.lock('icon-inline', 16)}
                    <span>مجلد Google Drive (🔒 للمتدربين فقط)</span>
                  </button>
                `}

                <!-- 3. Real Material File Download (Permission Checked) -->
                ${canDownload ? `
                  <button type="button" class="btn-trigger-real-download btn-secondary" data-file="${course.files && course.files[0] ? course.files[0].name : 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf'}" style="padding: 10px; font-size: 0.85rem; justify-content: center; width: 100%;">
                    ${icons.download('icon-inline', 18)}
                    <span>تحميل الحقيبة التدريبية الكاملة (PDF)</span>
                  </button>
                ` : `
                  <button type="button" class="btn-guard-download btn-secondary" data-file="${course.files && course.files[0] ? course.files[0].name : 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf'}" data-course-title="${course.title}" style="padding: 10px; font-size: 0.85rem; justify-content: center; width: 100%; border-color: #fca5a5; background: #fef2f2; color: #dc2626;">
                    ${icons.lock('icon-inline', 16)}
                    <span>تحميل الحقيبة الكاملة (🔒 للمتدربين المسجلين)</span>
                  </button>
                `}

                <div style="font-size: 0.76rem; color: var(--text-muted); text-align: center; line-height: 1.5; margin-top: 4px;">
                  ✓ تسليم شهادة معتمدة دولياً برقم تسلسلي معتمد عند اجتياز المتطلبات.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Course Detail Navigation Tabs -->
      <div class="course-detail-nav">
        <div class="container" style="display: flex; gap: 4px; overflow-x: auto; padding: 0 16px;">
          <button class="course-detail-tab-btn active" data-course-tab="syllabus">
            ${icons.book('icon-inline', 18)}
            <span>المنهاج والمحاور (${course.modules ? course.modules.length : 6} وحدات)</span>
          </button>

          <button class="course-detail-tab-btn" data-course-tab="materials">
            ${icons.drive('icon-inline', 18)}
            <span>الحقائب وملفات Google Drive (${course.files ? course.files.length : 3})</span>
            ${!canDownload ? `<span class="locked-tab-badge">🔒 مقفل</span>` : ''}
          </button>

          <button class="course-detail-tab-btn" data-course-tab="assignments">
            ${icons.check('icon-inline', 18)}
            <span>التكليفات والمهام (${course.assignments ? course.assignments.length : 2})</span>
            ${!canDownload ? `<span class="locked-tab-badge">🔒 مقفل</span>` : ''}
          </button>

          <button class="course-detail-tab-btn" data-course-tab="discussion">
            ${icons.chat('icon-inline', 18)}
            <span>شات واستفسارات المدرب</span>
            ${!canDownload ? `<span class="locked-tab-badge">🔒 مقفل</span>` : ''}
          </button>

          <button class="course-detail-tab-btn" data-course-tab="instructor-view">
            ${icons.userCheck('icon-inline', 18)}
            <span>صفة المدرب وهيئة التدريس</span>
          </button>

          ${isAdmin ? `
            <button class="course-detail-tab-btn" data-course-tab="admin-customizer" style="color: #1e3a8a;">
              ${icons.settings('icon-inline', 18)}
              <span>تخصيص الدورة والفورم (الإدارة)</span>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Main Course Tabs Container -->
      <div class="container" style="padding: 36px 16px 60px; max-width: 1100px;">
        
        <!-- PANE 1: SYLLABUS & MODULES (Open to all) -->
        <div class="course-tab-pane active" id="course-pane-syllabus">
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              ${icons.sparkles('icon-inline', 22)}
              <span>مخرجات التعلم والكفايات المهنية المستهدفة</span>
            </h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;" class="outcomes-grid">
              ${(course.learningOutcomes || [
                'إتقان تطبيق المعايير الدولية والالتزامات الميدانية.',
                'تصميم أدوات الرقابة والتقييم المؤسسي والامتثال للمانحين.',
                'صياغة السياسات التشغيلية القياسية (SOPs) ومواثيق الشرف.',
                'إدارة برامج الطوارئ والاستجابة بفعالية ومسؤولية كاملة.'
              ]).map(item => `
                <div style="display: flex; align-items: flex-start; gap: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 14px 16px;">
                  <span style="color: #059669; margin-top: 2px;">${icons.check('icon-inline', 18)}</span>
                  <span style="font-size: 0.92rem; color: var(--shat-navy-900); font-weight: 600; line-height: 1.6;">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Modules List -->
          <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 18px; display: flex; align-items: center; gap: 8px;">
            ${icons.course('icon-inline', 22)}
            <span>المحاور والوحدات التدريبية المعتمدة</span>
          </h2>

          <div class="modules-accordion-list">
            ${(course.modules || []).map((m, idx) => `
              <div class="module-accordion-item">
                <div class="module-accordion-header" style="cursor: pointer;">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: #ecfdf5; border: 1.5px solid #10b981; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #047857; font-size: 0.9rem;">
                      0${idx + 1}
                    </div>
                    <div>
                      <strong style="font-size: 1.02rem; color: var(--shat-navy-950); display: block;">${m.title}</strong>
                      <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${m.hours || '6 ساعات معتمدة'}</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="status-pill ${m.status === 'completed' ? 'active' : ''}" style="font-size: 0.74rem;">
                      ${m.status === 'completed' ? '✓ تم الإنجاز' : m.status === 'in-progress' ? 'قيد التنفيذ' : 'الوحدة القادمة'}
                    </span>
                    <span style="color: var(--text-muted); font-size: 0.85rem;">▼</span>
                  </div>
                </div>
                <div class="module-accordion-body">
                  <div style="padding-top: 14px;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px;">المواضيع المغطاة في هذه الوحدة:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                      ${(m.topics || ['الإطار النظري والمفاهيمي', 'التطبيق العملي وتمارين المحاكاة']).map(top => `
                        <span style="background: #ffffff; border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--shat-navy-900);">
                          • ${top}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- PANE 2: MATERIALS & GOOGLE DRIVE -->
        <div class="course-tab-pane" id="course-pane-materials">
          ${!canDownload ? `
            <div class="permission-locked-card">
              <div class="locked-icon-badge">${icons.lock('', 36)}</div>
              <h3>الحقائب والمواد التدريبية مخصصة للمتدربين المسجلين فقط</h3>
              <p>
                تطبيقاً لمعايير الحوكمة وضبط الجودة والاعتماد الأكاديمي لشركة شات (SHAT)، لا يُتاح للزوار غير المسجلين تحميل الحقائب التدريبية أو تصفح مجلدات Google Drive الرسمية قبل التحقق من قيدهم الأكاديمي.
              </p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <button type="button" class="btn-cta btn-open-login-from-guard" style="display: flex; align-items: center; gap: 8px; padding: 11px 20px;">
                  ${icons.key('icon-inline', 16)}
                  <span>تسجيل الدخول بالمنصة</span>
                </button>
                <a href="${course.googleFormUrl || 'https://forms.gle/shat-training-register-2026'}" target="_blank" rel="noopener" class="btn-secondary" style="border-color: #10b981; color: #047857; text-decoration: none; display: flex; align-items: center; gap: 8px; padding: 11px 20px;">
                  ${icons.form('icon-inline', 16)}
                  <span>التسجيل في الدورة (Google Form) ↗</span>
                </a>
                <button type="button" class="btn-secondary btn-quick-student-login" style="background: #eff6ff; color: #1e40af; border-color: #93c5fd; padding: 11px 20px;">
                  ⚡ دخول سريع كمتدرب معتمد (أحمد خليل)
                </button>
              </div>
            </div>
          ` : `
            <!-- Drive Direct Connect Banner -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%); color: #ffffff; border-radius: var(--radius-xl); padding: 28px 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  ${icons.drive('icon-inline', 22)}
                  <span style="background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700;">سحابة Google Drive الرسمية</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 6px; color: #ffffff;">مجلد الحقائب والملفات التدريبية للدورة</h3>
                <p style="font-size: 0.88rem; opacity: 0.9; margin: 0; max-width: 600px;">
                  يمكن للمتدربين تصفح المجلد السحابي الكامل وتحميل ملفات المحاضرات والعروض ونماذج Excel المعتمدة مباشرة.
                </p>
              </div>
              <a href="${course.driveFolderUrl || 'https://drive.google.com/drive/folders/shat-materials'}" target="_blank" rel="noopener" class="btn-cta" style="background: #ffffff; color: #1e3a8a !important; font-weight: 800; border-radius: var(--radius-full); padding: 11px 22px;">
                ${icons.external('icon-inline', 18)} فتح مجلد Google Drive
              </a>
            </div>

            <!-- Files Table -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
                الحقائب التدريبية المتاحة للتحميل الفوري لجهازك
              </h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${(course.files || []).map(f => `
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 14px 18px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 40px; height: 40px; border-radius: 8px; background: ${f.type === 'PDF' ? '#fee2e2' : f.type === 'XLSX' ? '#dcfce7' : '#e0e7ff'}; color: ${f.type === 'PDF' ? '#dc2626' : f.type === 'XLSX' ? '#16a34a' : '#4f46e5'}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.78rem;">
                        ${f.type}
                      </div>
                      <div>
                        <strong style="font-size: 0.95rem; color: var(--shat-navy-950); display: block;">${f.name}</strong>
                        <span style="font-size: 0.78rem; color: var(--text-muted);">${f.size} • تحميل مباشر معتمد</span>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <button type="button" class="btn-trigger-real-download btn-secondary" data-file="${f.name}" style="padding: 7px 14px; font-size: 0.82rem;">
                        ${icons.download('icon-inline', 15)} تحميل لجهازك
                      </button>
                      <a href="${f.driveLink || course.driveFolderUrl}" target="_blank" rel="noopener" class="btn-secondary" style="padding: 7px 14px; font-size: 0.82rem;" title="فتح في درايف">
                        ${icons.drive('icon-inline', 15)} في درايف
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `}
        </div>

        <!-- PANE 3: ASSIGNMENTS -->
        <div class="course-tab-pane" id="course-pane-assignments">
          ${!canDownload ? `
            <div class="permission-locked-card">
              <div class="locked-icon-badge">${icons.lock('', 36)}</div>
              <h3>تسليم التكليفات والمهام متاح للطلبة المعتمدين</h3>
              <p>
                يجب تسجيل الدخول كمتدرب مسجل في هذا البرنامج التدريبي حتى تتمكن من رفع التكليفات والمشاريع الميدانية ورصد درجات التقييم الأكاديمي.
              </p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 18px;">
                <button type="button" class="btn-cta btn-open-login-from-guard">تسجيل الدخول كطالب</button>
                <button type="button" class="btn-secondary btn-quick-student-login">⚡ تجربة الدخول كمتدرب (أحمد)</button>
              </div>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: 1fr 360px; gap: 24px;" class="course-assignments-grid">
              <div>
                <h3 style="font-size: 1.18rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
                  التكليفات والمهام العملية المطلوبة للاعتماد
                </h3>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  ${(course.assignments || []).map(a => `
                    <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm);">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 10px;">
                        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">${a.title}</h4>
                        <span class="status-pill ${a.status === 'graded' ? 'active' : ''}" style="font-size: 0.74rem;">
                          ${a.status === 'graded' ? `✓ معتمد (${a.score})` : a.status === 'submitted' ? 'قيد التصحيح' : 'بانتظار التسليم'}
                        </span>
                      </div>
                      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
                        ${a.description}
                      </p>
                      <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
                        ${icons.clock('icon-inline', 14)}
                        <span>الموعد النهائي: <strong>${a.deadline}</strong></span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Submission Form -->
              <div>
                <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: var(--radius-xl); padding: 22px; box-shadow: var(--shadow-sm);">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <span class="status-pill active" style="font-size: 0.76rem;">تسليم الواجب</span>
                    <strong style="font-size: 1rem; color: var(--shat-navy-950);">رفع التكليف الميداني</strong>
                  </div>
                  <form id="course-assignment-submit-form">
                    <div style="margin-bottom: 12px;">
                      <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">اختر التكليف:</label>
                      <select class="form-input" style="width: 100%; font-size: 0.85rem;" required>
                        ${(course.assignments || []).map(a => `<option value="${a.id}">${a.title}</option>`).join('')}
                      </select>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">رابط الملف أو مجلد Google Drive:</label>
                      <input type="url" class="form-input" placeholder="https://docs.google.com/..." style="width: 100%; font-size: 0.85rem;" required dir="ltr">
                    </div>
                    <div style="margin-bottom: 14px;">
                      <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">ملاحظات للطاقم التدريبي:</label>
                      <textarea class="form-input" rows="3" placeholder="أرفقت التقرير الميداني ومصفوفة الامتثال..." style="width: 100%; font-size: 0.85rem;"></textarea>
                    </div>
                    <button type="submit" class="btn-cta" style="width: 100%; padding: 10px; font-size: 0.88rem; justify-content: center;">
                      ${icons.check('icon-inline', 16)} تسليم التكليف للمراجعة
                    </button>
                  </form>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- PANE 4: INSTRUCTOR DISCUSSION & Q&A -->
        <div class="course-tab-pane" id="course-pane-discussion">
          ${!canDownload ? `
            <div class="permission-locked-card">
              <div class="locked-icon-badge">${icons.lock('', 36)}</div>
              <h3>غرفة الاستفسارات والتواصل مع المدرب مغلقة للزوار</h3>
              <p>
                المحادثة المباشرة مع المشرف الأكاديمي وهيئة التدريس مخصصة للمشاركين المسجلين في هذا المساق. يرجى تسجيل الدخول بحساب طالب للوصول إلى نقاشات الدورة.
              </p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 18px;">
                <button type="button" class="btn-cta btn-open-login-from-guard">تسجيل الدخول للمحادثة</button>
                <button type="button" class="btn-secondary btn-quick-student-login">⚡ تجربة الدخول كمتدرب (أحمد)</button>
              </div>
            </div>
          ` : `
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-sm); max-width: 860px; margin: 0 auto;">
              <div style="background: #f8fafc; border-bottom: 1px solid var(--border-subtle); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div class="course-instructor-avatar">
                    ${course.instructor ? course.instructor.charAt(0) : 'د'}
                  </div>
                  <div>
                    <strong style="font-size: 0.95rem; color: var(--shat-navy-950); display: block;">${course.instructor || 'المشرف التدريبي'}</strong>
                    <span style="font-size: 0.76rem; color: #059669; font-weight: 700;">● متواجد الآن للرد على الاستفسارات الأكاديمية</span>
                  </div>
                </div>
                <span style="font-size: 0.78rem; color: var(--text-muted); background: #ffffff; border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: var(--radius-full);">
                  ${course.code || 'CHS-101'} Discussion
                </span>
              </div>

              <!-- Chat Messages Thread -->
              <div id="course-chat-thread" style="height: 360px; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; background: #fafaf9;">
                ${(course.chatMessages || [
                  { sender: 'instructor', name: course.instructor || 'المدرب', text: 'مرحباً بجميع المشاركين في هذا المساق. يرجى مراجعة المواد المحملة في تبويب الحقائب ومجلد Google Drive وطرح أية استفسارات هنا.', time: '10:00 ص' }
                ]).map(msg => `
                  <div class="chat-message-row ${msg.sender === 'student' ? 'outgoing' : 'incoming'}">
                    <div class="chat-bubble">
                      <strong style="display: block; font-size: 0.8rem; margin-bottom: 3px; color: ${msg.sender === 'instructor' ? '#047857' : 'inherit'};">${msg.name}</strong>
                      ${msg.text}
                      <span class="chat-bubble-time">${msg.time}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Chat Input Box -->
              <div style="padding: 14px 18px; background: #ffffff; border-top: 1px solid var(--border-subtle); display: flex; gap: 10px;">
                <input type="text" id="course-chat-input" class="form-input" placeholder="اكتب سؤالك أو استفسارك للمدرب..." style="flex: 1; font-size: 0.88rem;">
                <button type="button" id="course-chat-send-btn" class="btn-cta" style="padding: 10px 18px; font-size: 0.88rem;">
                  ${icons.arrowLeft('icon-inline', 16)} إرسال
                </button>
              </div>
            </div>
          `}
        </div>

        <!-- PANE 5: INSTRUCTOR VIEW & TOOLS -->
        <div class="course-tab-pane" id="course-pane-instructor-view">
          ${!isInstructor ? `
            <div class="permission-locked-card" style="border-color: #fed7aa; background: #fffaf5;">
              <div class="locked-icon-badge" style="background: #ffedd5; color: #ea580c; border-color: #fdba74;">${icons.userCheck('', 36)}</div>
              <h3>صفة المدرب وهيئة التدريس</h3>
              <p>
                هذا القسم مخصص للأساتذة والمشرفين الأكاديميين المعتمدين لمتابعة قوائم المتدربين المسجلين ورفع الملفات الإضافية لمجلد Google Drive الخاص بالدورة.
              </p>
              <div style="margin-top: 16px;">
                <button type="button" class="btn-secondary btn-quick-instructor-login" style="background: #ecfdf5; color: #065f46; border-color: #a7f3d0; padding: 9px 20px;">
                  ⚡ الدخول كمدرب معتمد (د. أسامة المنصور)
                </button>
              </div>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="instructor-view-grid">
              <!-- Upload Material Box -->
              <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                  ${icons.plus('icon-inline', 20)}
                  <span>رفع حقيبة تدريبية جديدة لهذا المساق</span>
                </h3>
                <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                  يتم حفظ الملف فوراً في سحابة Google Drive التابعة للدورة وتضمينه في قائمة التحميل المباشر لجميع الطلاب.
                </p>
                <form id="course-instructor-upload-form">
                  <input type="hidden" id="instructor-upload-course-id" value="${course.id}">
                  <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">عنوان المادة أو الملف:</label>
                    <input type="text" id="instructor-upload-title" class="form-input" placeholder="مثال: الدليل الإرشادي لحساب المؤشرات..." required style="width: 100%; font-size: 0.85rem;">
                  </div>
                  <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">نوع المادة:</label>
                    <select id="instructor-upload-type" class="form-input" style="width: 100%; font-size: 0.85rem;">
                      <option value="PDF">مستند PDF معتمد</option>
                      <option value="XLSX">مصفوفة إكسل XLSX</option>
                      <option value="PPTX">عرض تقديمي PPTX</option>
                      <option value="DOCX">وثيقة Word</option>
                    </select>
                  </div>
                  <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">رابط Google Drive المباشر للملف:</label>
                    <input type="url" id="instructor-upload-drive" class="form-input" placeholder="${course.driveFolderUrl || 'https://drive.google.com/drive/folders/...'}" style="width: 100%; font-size: 0.85rem;" dir="ltr">
                  </div>
                  <button type="submit" class="btn-cta" style="width: 100%; padding: 10px; font-size: 0.88rem; justify-content: center;">
                    ${icons.drive('icon-inline', 16)} رفع وحفظ الملف للمقرر
                  </button>
                </form>
              </div>

              <!-- Enrolled Students Roster -->
              <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                  <span>قائمة المتدربين المسجلين</span>
                  <span class="status-pill active" style="font-size: 0.74rem;">24 متدرب</span>
                </h3>
                <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: var(--radius-sm);">
                    <div>
                      <strong style="color: var(--shat-navy-950); display: block;">أحمد العتيبي</strong>
                      <span style="font-size: 0.74rem; color: var(--text-muted);">مسؤول الرقابة • منظمة إغاثية</span>
                    </div>
                    <span class="status-pill active" style="font-size: 0.72rem;">حضور 92%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: var(--radius-sm);">
                    <div>
                      <strong style="color: var(--shat-navy-950); display: block;">سارة محمود</strong>
                      <span style="font-size: 0.74rem; color: var(--text-muted);">ضابطة حماية • جمعية تنموية</span>
                    </div>
                    <span class="status-pill active" style="font-size: 0.72rem;">حضور 96%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: var(--radius-sm);">
                    <div>
                      <strong style="color: var(--shat-navy-950); display: block;">م. يوسف النجار</strong>
                      <span style="font-size: 0.74rem; color: var(--text-muted);">مدير مشروع • مؤسسة أهلية</span>
                    </div>
                    <span class="status-pill active" style="font-size: 0.72rem;">حضور 88%</span>
                  </div>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- PANE 6: ADMIN CUSTOMIZER -->
        ${isAdmin ? `
          <div class="course-tab-pane" id="course-pane-admin-customizer">
            <div style="background: #ffffff; border: 2px solid #93c5fd; border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-md); max-width: 820px; margin: 0 auto;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: #eff6ff; border: 1.5px solid #3b82f6; display: flex; align-items: center; justify-content: center; color: #1d4ed8;">
                  ${icons.settings('', 22)}
                </div>
                <div>
                  <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--shat-navy-950); margin: 0;">
                    تخصيص بيانات ورابط استمارة Google Form وغلاف هذه الدورة
                  </h3>
                  <div style="font-size: 0.8rem; color: #2563eb; font-weight: 600;">لوحة تحكم المدير والمشرف العام</div>
                </div>
              </div>

              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
                يمكن للمدير تعديل رابط نموذج التسجيل الخاص بهذه الدورة (Google Form) أو مجلد Google Drive، أو غلاف الصورة، وسيتم حفظ التعديلات فوراً وتطبيقها في جميع صفحات المنصة.
              </p>

              <!-- Course Cover Customizer Trigger inside Admin Pane -->
              <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <img src="${courseCover}" alt="Cover" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
                  <div>
                    <strong style="font-size: 0.92rem; color: var(--shat-navy-950); display: block;">صورة وغلاف الدورة</strong>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">تعديل الكفر الظاهر في بطاقات الرئيسية وصفحة المقرر</span>
                  </div>
                </div>
                <button type="button" class="btn-secondary btn-edit-image-trigger" data-img-key="courseCover_${course.id}" data-img-title="تعديل غلاف دورة: ${course.title}" style="padding: 7px 14px; font-size: 0.82rem;">
                  ${icons.image('icon-inline', 15)} تغيير وتخصيص الغلاف ↗
                </button>
              </div>

              <form id="form-admin-course-customizer" data-course-id="${course.id}">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">عنوان الدورة التدريبية:</label>
                    <input type="text" id="admin-course-title" class="form-input" value="${course.title || ''}" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">كود الدورة والمستوى:</label>
                    <input type="text" id="admin-course-code" class="form-input" value="${course.code || ''}" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                </div>

                <div style="margin-bottom: 14px;">
                  <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px; color: #047857;">
                    🔗 رابط استمارة التسجيل الخاصة بالدورة (Google Form URL):
                  </label>
                  <input type="url" id="admin-course-gform" class="form-input" value="${course.googleFormUrl || ''}" placeholder="https://forms.gle/..." required style="width: 100%; font-size: 0.9rem; border-color: #10b981; background: #f0fdf4;" dir="ltr">
                  <span style="font-size: 0.74rem; color: var(--text-muted); display: block; margin-top: 3px;">
                    أي متدرب ينقر على زر «سجل في الدورة عبر Google Form» سيتم توجيهه مباشرة إلى هذا الرابط.
                  </span>
                </div>

                <div style="margin-bottom: 14px;">
                  <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px; color: #0369a1;">
                    📁 رابط مجلد الدورة على Google Drive:
                  </label>
                  <input type="url" id="admin-course-drive" class="form-input" value="${course.driveFolderUrl || ''}" placeholder="https://drive.google.com/drive/folders/..." required style="width: 100%; font-size: 0.9rem; border-color: #0284c7; background: #f0f9ff;" dir="ltr">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">اسم المدرب الأكاديمي:</label>
                    <input type="text" id="admin-course-instructor" class="form-input" value="${course.instructor || ''}" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">الساعات المعتمدة والمدة:</label>
                    <input type="text" id="admin-course-duration" class="form-input" value="${course.duration || ''}" required style="width: 100%; font-size: 0.88rem;">
                  </div>
                </div>

                <div style="margin-bottom: 20px;">
                  <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">نبذة تفصيلية عن الدورة:</label>
                  <textarea id="admin-course-overview" class="form-input" rows="3" style="width: 100%; font-size: 0.88rem;">${course.overview || ''}</textarea>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid var(--border-subtle); padding-top: 18px;">
                  <button type="submit" class="btn-cta" style="padding: 11px 24px; font-size: 0.92rem;">
                    ${icons.check('icon-inline', 18)} حفظ التعديلات وتحديث الروابط فوراً
                  </button>

                  <button type="button" class="btn-secondary btn-delete-course-trigger" data-course-id="${course.id}" style="color: #dc2626; border-color: #fecaca; background: #fff5f5; padding: 11px 18px; font-size: 0.88rem;">
                    ${icons.trash('icon-inline', 16)} حذف هذه الدورة
                  </button>
                </div>
              </form>
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}



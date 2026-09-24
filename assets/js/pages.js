import { authService } from './auth.js';
// Shat Company Platform - Page Rendering Engine
// All pages render dedicated views without numeric prefixes in section names.

export function renderHomePage(t) {
  const sectionsList = [
    { key: "our-story", title: t.nav.s02 || "قصتنا", desc: t.about.subtitle, icon: "🏛️" },
    { key: "what-we-make", title: t.nav.s03 || "ماذا نصنع؟", desc: t.services.subtitle, icon: "💼" },
    { key: "tracks", title: t.nav.s04 || "مساراتنا", desc: t.consultingSec.subtitle, icon: "🧭" },
    { key: "experiences", title: t.nav.s05 || "تجاربنا", desc: t.deliveryModel.subtitle, icon: "🔄" },
    { key: "impact", title: t.nav.s06 || "أثرنا", desc: t.approach.subtitle, icon: "📈" },
    { key: "knowledge-hub", title: t.nav.s07 || "مساحة المعرفة", desc: t.references.subtitle, icon: "📚" },
    { key: "build-impact", title: t.nav.s08 || "لنبني الأثر معًا", desc: t.valuePartnerships.subtitle, icon: "🤝" }
  ];

  return `
    <section class="home-hero-section">
      <div class="container">
        <div class="home-hero-grid">
          <div class="hero-content-col">
            <div class="hero-badge-pill">
              <span>✦</span> ${t.hero.badge}
            </div>
            <h1 class="hero-main-title">${t.hero.title}</h1>
            <p class="hero-lead-text">${t.hero.description}</p>
            <div class="hero-actions-row">
              <a href="#/services" class="btn-cta">
                <span>${t.hero.ctaPrimary}</span>
                <span class="action-arrow">←</span>
              </a>
              <a href="#/contact" class="btn-secondary">
                <span>${t.hero.ctaSecondary}</span>
              </a>
            </div>
          </div>
          <div class="hero-badge-col">
            <div class="hero-emblem-card">
              <img src="assets/logo/logo-banner.jpg" alt="SHAT Development & Growth" class="hero-badge-img" onerror="this.src='assets/logo/logo-clean.jpg'">
              <div style="font-weight: 800; font-size: 1.15rem; color: var(--shat-navy-950); margin-bottom: 4px;">${t.companyShortName}</div>
              <div style="font-size: 0.82rem; color: var(--shat-green-700); font-weight: 700;">${t.companyMotto}</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

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

    <!-- Corporate Social Media & Field Activities Showcase -->
    <section class="social-showcase-section">
      <div class="container">
        <div class="section-intro-block" style="text-align: center; margin-bottom: 36px;">
          <div class="hero-badge-pill" style="margin: 0 auto 12px;">
            <span>★</span> ${t.socialSection?.badge || 'نشاطات ميدانية وفعاليات'}
          </div>
          <h2 class="section-intro-title" style="font-size: 2.1rem; color: var(--shat-navy-950);">
            ${t.socialSection?.title || 'منشورات وفعاليات المنصات الرسمية'}
          </h2>
          <p class="section-intro-desc" style="max-width: 700px; margin: 0 auto; color: var(--text-secondary);">
            ${t.socialSection?.subtitle || 'تابع أحدث الورش التدريبية، البعثات الميدانية، وبرامج التطوير المؤسسي المنشورة عبر قنواتنا على فيسبوك وإنستغرام.'}
          </p>
        </div>

        <div class="social-posts-grid">
          ${(t.socialSection?.posts || []).map(post => `
            <article class="social-card">
              <div class="social-card-img-wrap">
                <img src="${post.img}" alt="${post.title}" class="social-card-img" onerror="this.src='assets/logo/logo-banner.jpg'">
                <div class="social-platform-badge">
                  <span>${post.platform === 'Instagram' ? '📷 Instagram' : '🌐 Facebook'}</span>
                </div>
              </div>
              <div class="social-card-body">
                <div class="social-card-meta">
                  <span class="social-card-tag">${post.tag}</span>
                  <span class="social-card-date">${post.date}</span>
                </div>
                <h3 class="social-card-title">${post.title}</h3>
                <p class="social-card-excerpt">${post.excerpt}</p>
                <div class="social-card-footer">
                  <a href="${post.link}" target="_blank" rel="noopener" class="social-view-link">
                    <span>${post.platform === 'Instagram' ? (t.socialSection?.viewInsta || 'شاهد على إنستغرام ↗') : (t.socialSection?.viewFb || 'شاهد على فيسبوك ↗')}</span>
                  </a>
                  <span style="font-size: 0.78rem; color: var(--text-muted);">@shat.development.growth</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="home-hub-section">
      <div class="container">
        <div class="section-intro-block">
          <h2 class="section-intro-title">${t.homeCards.title}</h2>
          <p class="section-intro-desc">${t.homeCards.subtitle}</p>
        </div>

        <div class="grid-4">
          ${sectionsList.map(sec => `
            <div class="section-hub-card ${sec.highlight ? 'highlight-academy' : ''}" style="${sec.highlight ? 'border: 2px solid var(--shat-green-500); background: #f0fdf4;' : ''}">
              <div class="hub-card-icon"><span>${sec.icon}</span></div>
              <h3 class="hub-card-title">${sec.title}</h3>
              <p class="hub-card-desc">${sec.desc}</p>
              <div class="hub-card-footer">
                <a href="#/${sec.key}" class="hub-card-link">
                  <span>${sec.highlight ? 'دخول نظام المودل' : t.nav.explorePlatform}</span>
                  <span>→</span>
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
  const ac = t.academy;
  const user = authService.getCurrentUser();
  const isLoggedIn = authService.isLoggedIn();

  // 1. GATE VIEW: If user is NOT logged in, require login first!
  if (!isLoggedIn) {
    return `
      <!-- Gated Academy Banner -->
      <div class="academy-hero" style="background: radial-gradient(circle at center, #0c2b54 0%, #06152b 100%); padding: 50px 0;">
        <div class="container" style="text-align: center;">
          <div class="academy-hero-badge" style="margin: 0 auto 16px;">
            <span>🔐</span>
            <span>بوابة مغلقة • نظام المودل المؤسسي</span>
          </div>
          <h1 class="academy-hero-title" style="font-size: 2.1rem; color: #ffffff;">
            منظومة المودل للأكاديمية والتدريب
          </h1>
          <p class="academy-hero-desc" style="color: rgba(255,255,255,0.85); max-width: 680px; margin: 10px auto 0;">
            مساحة تعليمية متقدمة مخصصة للطلاب، المدربين، ومسؤولي الإدارة في شركة شات للتنمية والتطوير.
          </p>
        </div>
      </div>

      <div class="container" style="padding: 40px 16px 80px; max-width: 820px; margin: 0 auto;">
        <!-- Access Gate Card -->
        <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 40px 24px; text-align: center; box-shadow: var(--shadow-lg);">
          <div style="width: 78px; height: 78px; border-radius: 50%; background: var(--shat-green-50); border: 2px solid var(--shat-green-500); display: flex; align-items: center; justify-content: center; font-size: 2.4rem; margin: 0 auto 18px;">
            🎓
          </div>
          <h2 style="font-size: 1.55rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 10px;">
            يرجى تسجيل الدخول للوصول إلى نظام المودل
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; max-width: 580px; margin-left: auto; margin-right: auto;">
            تتيح لك المنصة الدخول المخصص حسب صلاحيات حسابك المسجل:
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; text-align: start;" class="gate-roles-grid">
            <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">🎓</div>
              <strong style="font-size: 0.92rem; color: var(--shat-navy-950); display: block;">حساب الطالب</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; display: block; margin-top: 4px;">
                عرض المقررات، نسبة الإنجاز، تحميل ملفات Google Drive مباشرة، وشات الأستاذ.
              </span>
            </div>

            <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">👨‍🏫</div>
              <strong style="font-size: 0.92rem; color: var(--shat-navy-950); display: block;">حساب المدرس</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; display: block; margin-top: 4px;">
                رفع الحقائب والملفات مباشرة للمنصة ودرايف، متابعة الحضور، والرد على استفسارات الطلاب.
              </span>
            </div>

            <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">⚙️</div>
              <strong style="font-size: 0.92rem; color: var(--shat-navy-950); display: block;">حساب الإدارة</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; display: block; margin-top: 4px;">
                تفعيل وإيقاف الكورسات، لوحة الحفظ العائمة، وإدارة شات وبريد الموظفين الداخلي.
              </span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 440px; margin: 0 auto;">
            <button type="button" class="btn-cta" id="btn-gate-open-auth" style="padding: 13px; font-size: 1rem; border-radius: var(--radius-full);">
              <span>📱 تسجيل الدخول برقم واتساب (WaForge) أو Google</span>
            </button>
            <span style="font-size: 0.8rem; color: var(--text-muted);">
              يصلك رمز التحقق الفوري OTP مباشرة عبر واتساب
            </span>
          </div>
        </div>

        <!-- Corporate Registration Form for External Companies -->
        <div style="margin-top: 36px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div>
              <span class="status-pill active">🏢 تعاقدات الشركات والمؤسسات</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 6px;">
                هل تمثل شركة أو منظمة وترغب في تدريب كوادركم؟
              </h3>
            </div>
            <a href="https://forms.google.com" target="_blank" rel="noopener" class="btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;">
              <span>فتح Google Form المباشر ↗</span>
            </a>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
            يمكن للمؤسسات والمنظمات التقدم بطلب تدريب جماعي مخصص دون الحاجة لتسجيل دخول مسبق:
          </p>

          <form id="corporate-training-form">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">اسم الشركة أو المنظمة *</label>
                <input type="text" id="corp-company-name" class="form-input" required placeholder="...">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">عدد المتدربين *</label>
                <input type="number" id="corp-trainees-count" class="form-input" required placeholder="مثال: 20">
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">رقم هاتف / واتساب للتواصل *</label>
                <input type="tel" id="corp-contact-phone" class="form-input" required placeholder="+972592879621" dir="ltr">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">البريد الإلكتروني المؤسسي *</label>
                <input type="email" id="corp-contact-email" class="form-input" required placeholder="name@domain.com">
              </div>
            </div>
            <button type="submit" class="btn-cta" style="width: 100%; margin-top: 8px; padding: 10px;">
              إرسال طلب تدريب المؤسسة وتأكيد الحجز
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // 2. LOGGED-IN VIEW: User is verified! Show ONLY their role-permitted view!
  const userRole = user.role || 'student';

  return `
    <!-- Executive Logged-in Header -->
    <div class="academy-hero" style="padding: 40px 0 30px;">
      <div class="container">
        <div class="breadcrumb-trail" style="margin-bottom: 16px; opacity: 0.85;">
          <a href="#/discover" style="color: #a7f3d0;">${t.nav.s01 || 'اكتشف SHAT'}</a>
          <span class="breadcrumb-separator" style="color: rgba(255,255,255,0.4);">/</span>
          <span style="color: #ffffff;">نظام المودل المؤسسي</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div class="academy-hero-badge" style="margin-bottom: 8px;">
              <span>★</span>
              <span>نظام المودل للأكاديمية والتدريب</span>
            </div>
            <h1 class="academy-hero-title" style="font-size: 1.85rem; margin-bottom: 4px;">
              مرحباً بك، ${user.name}
            </h1>
            <p class="academy-hero-desc" style="margin: 0; font-size: 0.92rem;">
              صلاحية الحساب النشط: <strong>${user.roleTitle}</strong> • مساحة العمل المؤسسية
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <button type="button" class="btn-secondary" id="btn-moodle-logout" style="background: rgba(255,255,255,0.12); color: #ffffff; border-color: rgba(255,255,255,0.3); padding: 8px 16px; font-size: 0.82rem; border-radius: var(--radius-full);">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container moodle-portal-wrap">

      <!-- ========================================================
           PORTAL 1: STUDENT VIEW (واجهة الطالب الحصرية)
           ======================================================== -->
      ${userRole === 'student' ? `
        <div class="moodle-tab-pane" style="display: block;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">مساحتي التعليمية المقررة</h2>
              <p style="font-size: 0.92rem; color: var(--text-muted);">تحميل ملفات التدريب مباشرة من Google Drive والتواصل المباشر مع أستاذ المساق</p>
            </div>
            <span class="status-pill active">● جلسة طالب نشطة</span>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;" class="moodle-student-grid">
            <!-- Courses & Drive Files -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                  <div>
                    <span class="status-pill active">● مسجل • دورة جارية</span>
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 8px;">
                      دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة
                    </h3>
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px; font-size: 0.85rem; color: var(--text-secondary);">
                      <span>المدرب: <strong>د. أسامة المنصور</strong></span>
                      <span class="status-dot online pulse"></span>
                      <span style="color: var(--shat-green-700); font-weight: 600;">متصل الآن</span>
                    </div>
                  </div>

                  <div class="progress-ring-box" title="نسبة الإنجاز: 75%">
                    <svg class="progress-ring-svg" width="72" height="72">
                      <circle class="progress-ring-bg" stroke-width="6" fill="transparent" r="28" cx="36" cy="36"/>
                      <circle class="progress-ring-fill" stroke-width="6" stroke-dasharray="175.9" stroke-dashoffset="44" fill="transparent" r="28" cx="36" cy="36"/>
                    </svg>
                    <span class="progress-ring-label">75%</span>
                  </div>
                </div>

                <div style="margin-bottom: 20px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">
                    <span>إكمال 4 من 6 وحدات تدريبية</span>
                    <span>75% مكتمل</span>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill" style="width: 75%;"></div>
                  </div>
                </div>

                <!-- Direct Drive File Downloads -->
                <div style="border-top: 1px solid var(--border-subtle); padding-top: 18px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <h4 style="font-size: 1rem; font-weight: 800; color: var(--shat-navy-900);">
                      📂 ملفات وحقائب التدريب (تحميل مباشر من Google Drive)
                    </h4>
                    <span class="meta-tag">سحابة Google Drive مؤمنة</span>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 10px;" id="student-files-list">
                    <div class="file-download-card">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.6rem;">📄</span>
                        <div>
                          <div style="font-weight: 700; font-size: 0.92rem; color: var(--shat-navy-950);">دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf</div>
                          <div style="font-size: 0.78rem; color: var(--text-muted);">PDF • 4.8 MB • متاح للتحميل الفوري</div>
                        </div>
                      </div>
                      <button class="file-download-btn btn-direct-download" data-file="دليل CHS 2026">
                        <span>📥 تحميل مباشر</span>
                      </button>
                    </div>

                    <div class="file-download-card">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.6rem;">📊</span>
                        <div>
                          <div style="font-weight: 700; font-size: 0.92rem; color: var(--shat-navy-950);">حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx</div>
                          <div style="font-size: 0.78rem; color: var(--text-muted);">PowerPoint • 12.3 MB • حقيبة العرض التقديمي</div>
                        </div>
                      </div>
                      <button class="file-download-btn btn-direct-download" data-file="حقيبة المساءلة AAP">
                        <span>📥 تحميل مباشر</span>
                      </button>
                    </div>

                    <div class="file-download-card">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.6rem;">📑</span>
                        <div>
                          <div style="font-weight: 700; font-size: 0.92rem; color: var(--shat-navy-950);">مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx</div>
                          <div style="font-size: 0.78rem; color: var(--text-muted);">Excel • 1.2 MB • تمرين تطبيقي عملي</div>
                        </div>
                      </div>
                      <button class="file-download-btn btn-direct-download" data-file="مصفوفة تقييم الامتثال">
                        <span>📥 تحميل مباشر</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Student-Teacher Chat -->
            <div>
              <div class="chat-window-card">
                <div class="chat-header">
                  <div class="chat-user-info">
                    <div class="chat-avatar">
                      <span>أ</span>
                      <span class="status-dot online pulse"></span>
                    </div>
                    <div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy-950);">د. أسامة المنصور</div>
                      <div style="font-size: 0.75rem; color: var(--shat-green-700); font-weight: 600;">مدرب المساق (متصل)</div>
                    </div>
                  </div>
                  <span class="meta-tag">شات مباشر</span>
                </div>

                <div class="chat-thread-container" id="student-chat-thread">
                  <div class="chat-message-row incoming">
                    <div class="chat-bubble">
                      أهلاً بك يا ${user.name}. يرجى مراجعة ملفات مصفوفة الامتثال xlsx المرفقة للبدء بحل التقييم العملي.
                      <span class="chat-bubble-time">10:15 ص</span>
                    </div>
                  </div>
                </div>

                <div class="chat-input-bar">
                  <input type="text" class="chat-input-field" id="student-chat-input" placeholder="اكتب استفسارك للمدرب...">
                  <button class="chat-send-btn" id="student-chat-send" title="إرسال">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ========================================================
           PORTAL 2: INSTRUCTOR / TEACHER VIEW (واجهة المدرس الحصرية)
           ======================================================== -->
      ${userRole === 'instructor' ? `
        <div class="moodle-tab-pane" style="display: block;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">بوابة إدارة المنهج والحقائب التدريبية</h2>
              <p style="font-size: 0.92rem; color: var(--text-muted);">ارفع الملفات مباشرة لتتزامن تلقائياً مع Google Drive وتظهر فوراً للمتدربين</p>
            </div>
            <span class="status-pill active">👨‍🏫 حساب مدرب معتمد</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="moodle-teacher-grid">
            <!-- Direct File Uploader -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
                📤 رفع ملف أو حقيبة تدريبية جديدة
              </h3>

              <form id="teacher-file-upload-form">
                <div class="form-group" style="margin-bottom: 14px;">
                  <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">الدورة المستهدفة:</label>
                  <select id="upload-course-select" class="form-select">
                    <option value="shat-chs-master">دبلوم المعيار الإنساني الأساسي (CHS)</option>
                    <option value="shat-psea-expert">استشارات الحماية وصون السلامة (PSEA)</option>
                  </select>
                </div>

                <div class="form-group" style="margin-bottom: 14px;">
                  <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">عنوان الملف / الحقيبة التدريبية:</label>
                  <input type="text" id="upload-file-title" class="form-input" required placeholder="مثال: حقيبة_تطبيقات_المساءلة_الميدانية_2026.pdf">
                </div>

                <div class="upload-dropzone" id="teacher-dropzone" style="margin-bottom: 16px;">
                  <div style="font-size: 2.2rem; color: var(--shat-green-600); margin-bottom: 6px;">☁️</div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950);">اسحب الملف هنا أو انقر للاختيار</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">يتم التخزين المباشر في سحابة Google Drive التابعة للمنصة</div>
                  <input type="file" id="teacher-file-input" style="display: none;">
                </div>

                <div id="upload-progress-container" style="display: none; margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
                    <span id="upload-status-text">جارٍ الرفع والمزامنة مع Google Drive...</span>
                    <span id="upload-percent-text">100%</span>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill" id="upload-progress-bar" style="width: 100%;"></div>
                  </div>
                </div>

                <button type="submit" class="btn-cta" style="width: 100%; padding: 11px;">
                  <span>🚀 رفع الملف واعتماده فوراً للطلاب</span>
                </button>
              </form>
            </div>

            <!-- Enrolled Students Roster -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
                قائمة المتدربين في دوراتك
              </h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                  <div style="display: flex; justify-content: space-between;">
                    <strong style="color: var(--shat-navy-950);">أحمد العتيبي</strong>
                    <span class="status-pill active">حضور 92%</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin: 6px 0;">دبلوم المعيار الإنساني (CHS)</div>
                  <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 75%;"></div></div>
                </div>
                <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                  <div style="display: flex; justify-content: space-between;">
                    <strong style="color: var(--shat-navy-950);">سارة محمود</strong>
                    <span class="status-pill active">حضور 88%</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin: 6px 0;">برنامج استشارات الحماية (PSEA)</div>
                  <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 40%;"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ========================================================
           PORTAL 3: ADMIN VIEW (واجهة الإدارة والتحكم الحصرية)
           ======================================================== -->
      ${userRole === 'admin' ? `
        <div class="moodle-tab-pane" style="display: block;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">لوحة الإدارة والتحكم الأكاديمي الشامل</h2>
              <p style="font-size: 0.92rem; color: var(--text-muted);">تحكم في تفعيل أو إلغاء تفعيل الكورسات وشات الموظفين الداخلي</p>
            </div>
            <span class="status-pill active">⚙️ صلاحية المدير العام</span>
          </div>

          <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px;" class="moodle-admin-grid">
            <!-- Active / Inactive Course Toggles -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px;">
                إدارة الدورات: تفعيل وإلغاء تفعيل (Active / Inactive)
              </h3>

              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                  <div>
                    <div style="font-weight: 800; color: var(--shat-navy-950);">دبلوم المعيار الإنساني الأساسي (CHS)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">المدرب: د. أسامة المنصور</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="status-indicator-text" style="font-size: 0.82rem; font-weight: 700; color: #1b5e20;">مفعل (نشط)</span>
                    <label class="switch-control">
                      <input type="checkbox" checked class="admin-course-toggle" data-course-id="shat-chs-master">
                      <span class="switch-slider"></span>
                    </label>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                  <div>
                    <div style="font-weight: 800; color: var(--shat-navy-950);">برنامج استشارات الحماية (PSEA)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">المدربة: أ. ندى الخالدي</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="status-indicator-text" style="font-size: 0.82rem; font-weight: 700; color: #1b5e20;">مفعل (نشط)</span>
                    <label class="switch-control">
                      <input type="checkbox" checked class="admin-course-toggle" data-course-id="shat-psea-expert">
                      <span class="switch-slider"></span>
                    </label>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                  <div>
                    <div style="font-weight: 800; color: var(--shat-navy-950);">الشهادة الاحترافية في التقييم OECD DAC</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">المدرب: م. طارق الزهراني</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="status-indicator-text" style="font-size: 0.82rem; font-weight: 700; color: #1b5e20;">مفعل (نشط)</span>
                    <label class="switch-control">
                      <input type="checkbox" checked class="admin-course-toggle" data-course-id="shat-oecd-eval">
                      <span class="switch-slider"></span>
                    </label>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                  <div>
                    <div style="font-weight: 800; color: var(--shat-navy-950);">دبلوم تدريب المدربين المحترفين (TOT)</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">المدرب: أ. عمار اليافعي</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="status-indicator-text" style="font-size: 0.82rem; font-weight: 700; color: #991b1b;">معطل مؤقتاً</span>
                    <label class="switch-control">
                      <input type="checkbox" class="admin-course-toggle" data-course-id="shat-tot-mastery">
                      <span class="switch-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Internal Staff Chat -->
            <div>
              <div class="chat-window-card">
                <div class="chat-header">
                  <div class="chat-user-info">
                    <div class="chat-avatar"><span>💼</span><span class="status-dot online pulse"></span></div>
                    <div>
                      <div style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy-950);">شات وبريد الموظفين الداخلي</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">الإدارة • المدربون • المتابعة</div>
                    </div>
                  </div>
                </div>

                <div class="chat-thread-container" id="staff-chat-thread">
                  <div class="chat-message-row incoming">
                    <div class="chat-bubble">
                      <strong>الإدارة العامة:</strong> نرجو من كافة المدربين مراجعة تحديثات حقائب CHS و PSEA على درايف.
                      <span class="chat-bubble-time">08:30 ص</span>
                    </div>
                  </div>
                  <div class="chat-message-row outgoing">
                    <div class="chat-bubble">
                      <strong>د. أسامة المنصور:</strong> تم التحديث ومزامنة الرابط المباشر بنجاح.
                      <span class="chat-bubble-time">09:15 ص ✓✓</span>
                    </div>
                  </div>
                </div>

                <div class="chat-input-bar">
                  <input type="text" class="chat-input-field" id="staff-chat-input" placeholder="اكتب رسالة داخلية...">
                  <button class="chat-send-btn" id="staff-chat-send" title="إرسال">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

    </div>

    <!-- Floating Save Panel -->
    <div class="floating-save-panel" id="admin-floating-save-panel">
      <div class="save-panel-text">
        <span>⚠️</span>
        <span>تم تعديل حالة بعض الكورسات في النظام</span>
      </div>
      <button type="button" class="save-panel-btn-save" id="save-panel-confirm-btn">
        ✓ حفظ التعديلات الآن
      </button>
      <button type="button" class="save-panel-btn-discard" id="save-panel-discard-btn">
        إلغاء
      </button>
    </div>
  `;
}

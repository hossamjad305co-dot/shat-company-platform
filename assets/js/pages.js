// Shat Company Platform - Page Rendering Engine
// All pages render dedicated views without numeric prefixes in section names.

export function renderHomePage(t) {
  const sectionsList = [
    { num: "02", key: "our-story", title: t.nav.s02 || "02 — قصتنا", desc: t.about.subtitle, icon: "building" },
    { num: "03", key: "what-we-make", title: t.nav.s03 || "03 — ماذا نصنع؟", desc: t.services.subtitle, icon: "briefcase" },
    { num: "04", key: "tracks", title: t.nav.s04 || "04 — مساراتنا", desc: t.consultingSec.subtitle, icon: "shield-check" },
    { num: "05", key: "experiences", title: t.nav.s05 || "05 — تجاربنا", desc: t.deliveryModel.subtitle, icon: "git-merge" },
    { num: "06", key: "impact", title: t.nav.s06 || "06 — أثرنا", desc: t.approach.subtitle, icon: "award" },
    { num: "07", key: "knowledge-hub", title: t.nav.s07 || "07 — مساحة المعرفة", desc: t.references.subtitle, icon: "globe" },
    { num: "08", key: "build-impact", title: t.nav.s08 || "08 — لنبني الأثر معًا", desc: t.valuePartnerships.subtitle, icon: "trending-up" },
    { num: "🎓", key: "academy", title: t.nav.academy || "أكاديمية SHAT (نظام المودل)", desc: "بوابات الطالب والمدرس، رفع ملفات Drive، والشات المباشر", icon: "award", highlight: true }
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
              <img src="assets/logo/logo-badge.jpg" alt="SHAT Development & Growth Emblem" class="hero-badge-img" onerror="this.src='assets/logo/logo-symbol.jpg'">
              <div style="font-weight: 800; font-size: 1.1rem; color: #ffffff; margin-bottom: 4px;">${t.companyShortName}</div>
              <div style="font-size: 0.8rem; color: #81c784;">${t.companyMotto}</div>
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

    <section class="home-hub-section">
      <div class="container">
        <div class="section-intro-block">
          <h2 class="section-intro-title">${t.homeCards.title}</h2>
          <p class="section-intro-desc">${t.homeCards.subtitle}</p>
        </div>

        <div class="grid-4">
          ${sectionsList.map(sec => `
            <div class="section-hub-card ${sec.highlight ? 'highlight-academy' : ''}" style="${sec.highlight ? 'border: 2px solid var(--shat-green-500); background: #f0fdf4;' : ''}">
              <div class="hub-card-icon" style="${sec.highlight ? 'background: var(--shat-green-600); color: #fff;' : ''}">
                <span style="font-size: 1.1rem; font-weight: 800;">${sec.num}</span>
              </div>
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
        <h1 class="page-title"><span class="nav-num-badge" style="font-size: 1rem; margin-inline-end: 10px;">02</span>${t.nav.s02 || a.title}</h1>
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
        <h1 class="page-title"><span class="nav-num-badge" style="font-size: 1rem; margin-inline-end: 10px;">03</span>${t.nav.s03 || s.title}</h1>
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
        <h1 class="page-title"><span class="nav-num-badge" style="font-size: 1rem; margin-inline-end: 10px;">04</span>${t.nav.s04 || c.title}</h1>
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
        <h1 class="page-title"><span class="nav-num-badge" style="font-size: 1rem; margin-inline-end: 10px;">06</span>${t.nav.s06 || ap.title}</h1>
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
        <h1 class="page-title"><span class="nav-num-badge" style="font-size: 1rem; margin-inline-end: 10px;">07</span>${t.nav.s07 || r.title}</h1>
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
        <h1 class="page-title"><span class="nav-num-badge" style="font-size: 1rem; margin-inline-end: 10px;">08</span>${t.nav.s08 || ct.title}</h1>
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
  return `
    <!-- Distinct Executive Academy & Moodle Hero -->
    <div class="academy-hero">
      <div class="container">
        <div class="breadcrumb-trail" style="margin-bottom: 20px; opacity: 0.85;">
          <a href="#/discover" style="color: #a7f3d0;">${t.nav.s01 || '01 — اكتشف SHAT'}</a>
          <span class="breadcrumb-separator" style="color: rgba(255,255,255,0.4);">/</span>
          <span style="color: #ffffff;">نظام المودل وأكاديمية SHAT</span>
        </div>

        <div class="academy-hero-badge">
          <span>★</span>
          <span>منظومة المودل والتعلم المؤسسي المتقدم (SHAT Moodle LMS)</span>
        </div>

        <h1 class="academy-hero-title">
          أكاديمية SHAT ونظام المودل للتدريب وبناء القدرات
        </h1>
        <p class="academy-hero-desc">
          منصة متكاملة تجمع بين بوابات الطالب والأستاذ، الرفع المباشر للحقائب التدريبية المتزامنة مع Google Drive، المحادثة الحية، وإدارة الدورات للشركات والمؤسسات.
        </p>

        <!-- Metric Badges -->
        <div class="stats-grid" style="margin-top: 30px;">
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 14px;">
            <span class="stat-number" style="color: #a7f3d0;">+1,450</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">خريج ومتدرب معتمد</span>
          </div>
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 14px;">
            <span class="stat-number" style="color: #a7f3d0;">100%</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">تخزين سحابي مباشر (Drive)</span>
          </div>
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 14px;">
            <span class="stat-number" style="color: #a7f3d0;">24/7</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">شات وتواصل طالب-مدرس</span>
          </div>
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 14px;">
            <span class="stat-number" style="color: #a7f3d0;">CHS & Sphere</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">معايير دولية معتمدة</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Moodle Roles Interactive Navigation Bar -->
    <div class="container moodle-portal-wrap">
      <div class="moodle-role-tabs" id="moodle-role-tab-bar">
        <button class="moodle-role-btn active" data-tab="tab-moodle-student">
          <span>🎓</span>
          <span>بوابة الطالب (Student Portal)</span>
        </button>
        <button class="moodle-role-btn" data-tab="tab-moodle-teacher">
          <span>👨‍🏫</span>
          <span>بوابة المدرس والمدرب (Teacher Portal)</span>
        </button>
        <button class="moodle-role-btn" data-tab="tab-moodle-admin">
          <span>⚙️</span>
          <span>لوحة الإدارة والتحكم (Admin LMS)</span>
        </button>
        <button class="moodle-role-btn" data-tab="tab-moodle-corporate">
          <span>🏢</span>
          <span>تسجيل الشركات (Corporate & Google Form)</span>
        </button>
        <button class="moodle-role-btn" data-tab="tab-moodle-verify">
          <span>📜</span>
          <span>فحص الشهادات (Verification)</span>
        </button>
      </div>

      <!-- ==========================================
           TAB 1: STUDENT PORTAL (واجهة الطالب)
           ========================================== -->
      <div class="moodle-tab-pane" id="tab-moodle-student" style="display: block;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">مرحباً بك في مساحتك التعليمية</h2>
            <p style="font-size: 0.92rem; color: var(--text-muted);">تابع تقدمك في الدورات، حمّل الملفات والحقائب، وتواصل مباشرة مع أستاذ الدورة</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-dot online pulse"></span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--shat-green-800);">جلسة الطالب متصلة</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;" class="moodle-student-grid">
          <!-- Left: Enrolled Courses & Files -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <!-- Active Course Card -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                <div>
                  <span class="status-pill active">● جارية الآن • مسجل</span>
                  <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 8px;">
                    دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة التنموية
                  </h3>
                  <div style="display: flex; align-items: center; gap: 10px; margin-top: 6px; font-size: 0.86rem; color: var(--text-secondary);">
                    <span>الأستاذ: <strong>د. أسامة المنصور</strong></span>
                    <span class="status-dot online" title="متصل الآن"></span>
                    <span style="color: var(--shat-green-700); font-weight: 600;">متصل</span>
                  </div>
                </div>

                <!-- NameThatUI: Progress Ring -->
                <div class="progress-ring-box" title="نسبة الإنجاز: 75%">
                  <svg class="progress-ring-svg" width="72" height="72">
                    <circle class="progress-ring-bg" stroke-width="6" fill="transparent" r="28" cx="36" cy="36"/>
                    <circle class="progress-ring-fill" stroke-width="6" stroke-dasharray="175.9" stroke-dashoffset="44" fill="transparent" r="28" cx="36" cy="36"/>
                  </svg>
                  <span class="progress-ring-label">75%</span>
                </div>
              </div>

              <!-- NameThatUI: Progress Bar -->
              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">
                  <span>اكتمال 4 من أصل 6 وحدات تدريبية</span>
                  <span>75% مكتمل</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 75%;"></div>
                </div>
              </div>

              <!-- Direct File Downloads (Google Drive Sync) -->
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 18px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                  <h4 style="font-size: 1rem; font-weight: 800; color: var(--shat-navy-900); display: flex; align-items: center; gap: 6px;">
                    <span>📂</span>
                    <span>ملفات التدريب والحقائب (تحميل مباشر من Google Drive والمنصة)</span>
                  </h4>
                  <span class="meta-tag">سحابة Google Drive مؤمنة</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;" id="student-files-list">
                  <div class="file-download-card">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span style="font-size: 1.6rem;">📄</span>
                      <div>
                        <div style="font-weight: 700; font-size: 0.92rem; color: var(--shat-navy-950);">دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf</div>
                        <div style="font-size: 0.78rem; color: var(--text-muted);">PDF • 4.8 MB • تم الرفع بواسطة د. أسامة • 142 تحميل</div>
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
                        <div style="font-size: 0.78rem; color: var(--text-muted);">PowerPoint • 12.3 MB • متاح للمشاهدة والتحميل</div>
                      </div>
                    </div>
                    <button class="file-download-btn btn-direct-download" data-file="حقيبة أدوات المساءلة">
                      <span>📥 تحميل مباشر</span>
                    </button>
                  </div>

                  <div class="file-download-card">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span style="font-size: 1.6rem;">📑</span>
                      <div>
                        <div style="font-weight: 700; font-size: 0.92rem; color: var(--shat-navy-950);">مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx</div>
                        <div style="font-size: 0.78rem; color: var(--text-muted);">Excel Sheet • 1.2 MB • قالب تطبيقي للتمرين العملي</div>
                      </div>
                    </div>
                    <button class="file-download-btn btn-direct-download" data-file="مصفوفة الامتثال المؤسسي">
                      <span>📥 تحميل مباشر</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Second Course -->
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span class="status-pill active">● مسجل</span>
                  <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 6px;">
                    البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)
                  </h3>
                  <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">الأستاذة: أ. ندى الخالدي • تقدمك: 40%</p>
                </div>
                <div class="progress-ring-box" title="نسبة الإنجاز: 40%">
                  <svg class="progress-ring-svg" width="60" height="60">
                    <circle class="progress-ring-bg" stroke-width="5" fill="transparent" r="23" cx="30" cy="30"/>
                    <circle class="progress-ring-fill" stroke-width="5" stroke-dasharray="144.5" stroke-dashoffset="86.7" fill="transparent" r="23" cx="30" cy="30"/>
                  </svg>
                  <span class="progress-ring-label" style="font-size: 0.75rem;">40%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Student-Teacher Chat (NameThatUI: Chat Bubble + Status Dot) -->
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
                    <div style="font-size: 0.75rem; color: var(--shat-green-700); font-weight: 600;">أستاذ مساق المعيار الإنساني (متصل)</div>
                  </div>
                </div>
                <span class="meta-tag">شات الدورة المباشر</span>
              </div>

              <div class="chat-thread-container" id="student-chat-thread">
                <div class="chat-message-row incoming">
                  <div class="chat-bubble">
                    أهلاً بك يا أحمد في مساق المعيار الإنساني الأساسي (CHS). هل لديك أي استفسار حول ملفات الوحدة الرابعة؟
                    <span class="chat-bubble-time">10:15 ص</span>
                  </div>
                </div>
                <div class="chat-message-row outgoing">
                  <div class="chat-bubble">
                    مرحباً دكتور، اطلعت على حقيبة أدوات المساءلة AAP وبدأت في حل التمرين التطبيقي.
                    <span class="chat-bubble-time">10:20 ص ✓✓</span>
                  </div>
                </div>
                <div class="chat-message-row incoming">
                  <div class="chat-bubble">
                    ممتاز جداً! يمكنك تحميل مصفوفة الامتثال xlsx المرفقة وتعبئة دراسة الحالة، وسأقوم بمراجعتها معك غداً.
                    <span class="chat-bubble-time">10:24 ص</span>
                  </div>
                </div>
              </div>

              <div class="chat-input-bar">
                <input type="text" class="chat-input-field" id="student-chat-input" placeholder="اكتب استفسارك للدكتور أسامة...">
                <button class="chat-send-btn" id="student-chat-send" title="إرسال">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 2: TEACHER / INSTRUCTOR PORTAL (واجهة المدرس)
           ========================================== -->
      <div class="moodle-tab-pane" id="tab-moodle-teacher" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">بوابة إدارة المنهج والحقائب التدريبية</h2>
            <p style="font-size: 0.92rem; color: var(--text-muted);">ارفع ملفات الدورات مباشرة إلى مساحة التخزين السحابي دون الحاجة لفتح Google Drive يدوياً</p>
          </div>
          <span class="status-pill active">● حساب مدرب معتمد (د. أسامة المنصور)</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="moodle-teacher-grid">
          <!-- Direct File Uploader Card -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <span>📤</span>
              <span>رفع ملف أو حقيبة تدريبية جديدة</span>
            </h3>

            <form id="teacher-file-upload-form">
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">الدورة المستهدفة:</label>
                <select id="upload-course-select" class="form-select">
                  <option value="shat-chs-master">دبلوم المعيار الإنساني الأساسي (CHS)</option>
                  <option value="shat-psea-expert">البرنامج التنفيذي في استشارات الحماية (PSEA)</option>
                  <option value="shat-oecd-eval">الشهادة الاحترافية في التقييم المستقل (OECD DAC)</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">عنوان الملف / الحقيبة التدريبية:</label>
                <input type="text" id="upload-file-title" class="form-input" required placeholder="مثال: حقيبة_تطبيقات_المساءلة_الميدانية_2026.pdf">
              </div>

              <div class="grid-2" style="margin-bottom: 14px;">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">الوحدة التعليمية:</label>
                  <select id="upload-module-select" class="form-select">
                    <option value="1">الوحدة الأولى: المفاهيم والأسس</option>
                    <option value="2">الوحدة الثانية: المعايير التسعة</option>
                    <option value="3">الوحدة الثالثة: أدوات التقييم</option>
                    <option value="4">الوحدة الرابعة: دراسات الحالة</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">نوع الملف:</label>
                  <select id="upload-type-select" class="form-select">
                    <option value="PDF">مستند PDF</option>
                    <option value="PPTX">عرض تقديمي PowerPoint</option>
                    <option value="XLSX">جدول بيانات Excel</option>
                    <option value="DOCX">مستند Word</option>
                  </select>
                </div>
              </div>

              <div class="upload-dropzone" id="teacher-dropzone" style="margin-bottom: 16px;">
                <div style="font-size: 2.2rem; color: var(--shat-green-600); margin-bottom: 6px;">☁️</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950);">اسحب الملف هنا أو انقر للاختيار</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">يتم التخزين الآمن والمباشر على Google Drive CDN والمنصة تلقائياً</div>
                <input type="file" id="teacher-file-input" style="display: none;">
              </div>

              <!-- Upload Progress Indicator -->
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

          <!-- Students Roster & Tracking -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy-950);">قائمة المتدربين المسجلين</h3>
              <span class="badge-count">4 متدربين</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--shat-navy-950);">أحمد العتيبي</strong>
                  <span class="status-pill active">حضور 92%</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">دبلوم المعيار الإنساني (CHS)</div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 75%;"></div>
                </div>
              </div>

              <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--shat-navy-950);">سارة محمود</strong>
                  <span class="status-pill active">حضور 88%</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">برنامج استشارات الحماية (PSEA)</div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 40%;"></div>
                </div>
              </div>

              <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--shat-navy-950);">فيصل الشمري</strong>
                  <span class="status-pill active">حضور 98%</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">الشهادة الاحترافية في التقييم OECD DAC</div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: 90%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 3: ADMIN PORTAL (واجهة الإدارة والتحكم)
           ========================================== -->
      <div class="moodle-tab-pane" id="tab-moodle-admin" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950);">لوحة الإدارة الأكاديمية والتحكم الشامل</h2>
            <p style="font-size: 0.92rem; color: var(--text-muted);">تحكم في تفعيل أو إلغاء تفعيل الكورسات، متابعة الطلاب، ومحادثة الموظفين والمدربين الداخلية</p>
          </div>
          <span class="status-pill active">⚙️ صلاحية مدير النظام الكاملة</span>
        </div>

        <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px;" class="moodle-admin-grid">
          <!-- Left: Course Activation & Control -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy-950);">
                إدارة الدورات: تفعيل وإلغاء تفعيل (Active / Inactive)
              </h3>
              <span class="meta-tag">تحكم فوري</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                <div>
                  <div style="font-weight: 800; color: var(--shat-navy-950); font-size: 0.95rem;">دبلوم المعيار الإنساني الأساسي (CHS)</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">المدرب: د. أسامة المنصور • 45 ساعة</div>
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
                  <div style="font-weight: 800; color: var(--shat-navy-950); font-size: 0.95rem;">البرنامج التنفيذي في استشارات الحماية (PSEA)</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">المدربة: أ. ندى الخالدي • 40 ساعة</div>
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
                  <div style="font-weight: 800; color: var(--shat-navy-950); font-size: 0.95rem;">الشهادة الاحترافية في التقييم المستقل (OECD DAC)</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">المدرب: م. طارق الزهراني • 50 ساعة</div>
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
                  <div style="font-weight: 800; color: var(--shat-navy-950); font-size: 0.95rem;">دبلوم تدريب المدربين المحترفين (TOT)</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">المدرب: أ. عمار اليافعي • 35 ساعة</div>
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

          <!-- Right: Internal Staff Mail & Chat (بريد ومحادثة الموظفين الداخلي) -->
          <div>
            <div class="chat-window-card">
              <div class="chat-header">
                <div class="chat-user-info">
                  <div class="chat-avatar" style="background: var(--shat-navy-950);">
                    <span>💼</span>
                    <span class="status-dot online pulse"></span>
                  </div>
                  <div>
                    <div style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy-950);">المحادثة الداخلية للموظفين والمدربين</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">الإدارة العامة • المدربون • المتابعة</div>
                  </div>
                </div>
              </div>

              <div class="chat-thread-container" id="staff-chat-thread">
                <div class="chat-message-row incoming">
                  <div class="chat-bubble">
                    <strong>الإدارة (أ. سامي):</strong> تمت مراجعة جدول الدورات للفصل القادم، نرجو من كافة المدربين التأكد من اكتمال الحقائب على درايف.
                    <span class="chat-bubble-time">08:30 ص</span>
                  </div>
                </div>
                <div class="chat-message-row outgoing">
                  <div class="chat-bubble">
                    <strong>د. أسامة المنصور:</strong> تم تحديث حقيبة CHS وإضافة مصفوفة المساءلة AAP إلى الرابط المباشر.
                    <span class="chat-bubble-time">09:15 ص ✓✓</span>
                  </div>
                </div>
                <div class="chat-message-row incoming">
                  <div class="chat-bubble">
                    <strong>أ. ندى الخالدي:</strong> سأرفع دليل الحماية المحدث مساء اليوم بإذن الله.
                    <span class="chat-bubble-time">09:40 ص</span>
                  </div>
                </div>
              </div>

              <div class="chat-input-bar">
                <input type="text" class="chat-input-field" id="staff-chat-input" placeholder="اكتب رسالة داخلية لفريق العمل...">
                <button class="chat-send-btn" id="staff-chat-send" title="إرسال">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 4: CORPORATE REGISTRATION & GOOGLE FORM
           ========================================== -->
      <div class="moodle-tab-pane" id="tab-moodle-corporate" style="display: none;">
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-sm); max-width: 880px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 28px;">
            <span class="status-pill active" style="font-size: 0.85rem; padding: 4px 14px;">🏢 تعاقدات وتدريب المؤسسات</span>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 10px;">
              تسجيل الشركات والمنظمات في الدورات والبرامج
            </h2>
            <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 600px; margin: 6px auto 0;">
              حلول تدريبية مخصصة للكوادر المؤسسية وفرق المنظمات الإنسانية والتنموية وفق برامج مرنة وحقائب معتمدة.
            </p>
          </div>

          <!-- Google Form Embed Notice & Toggle -->
          <div style="background: var(--shat-green-50); border: 1px solid var(--shat-green-200); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.5rem;">📋</span>
              <div>
                <strong style="color: var(--shat-green-900); font-size: 0.92rem;">استمارة تسجيل الشركات عبر Google Form المباشر:</strong>
                <div style="font-size: 0.82rem; color: var(--shat-green-800);">يمكنك تعبئة نموذج Google Form الرسمي المباشر أو التسجيل عبر النموذج الإلكتروني أدناه</div>
              </div>
            </div>
            <a href="https://forms.google.com" target="_blank" rel="noopener" class="btn-secondary" style="padding: 8px 16px; font-size: 0.85rem; background: #ffffff;">
              <span>فتح Google Form ↗</span>
            </a>
          </div>

          <form id="corporate-training-form">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700;">اسم الشركة / المؤسسة / المنظمة *</label>
                <input type="text" id="corp-company-name" class="form-input" required placeholder="مثال: منظمة التنمية والإغاثة">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700;">قطاع النشاط *</label>
                <select id="corp-sector" class="form-select">
                  <option value="humanitarian">القطاع الإنساني والإغاثي (NGOs/INGOs)</option>
                  <option value="private">القطاع الخاص والشركات</option>
                  <option value="governmental">القطاع الحكومي وشبه الحكومي</option>
                  <option value="education">القطاع الأكاديمي والتعليمي</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700;">عدد المتدربين المتوقع *</label>
                <input type="number" id="corp-trainees-count" class="form-input" required placeholder="مثال: 25" min="1">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700;">المسار أو البرنامج المطلوب *</label>
                <select id="corp-target-program" class="form-select">
                  <option value="chs">المعيار الإنساني الأساسي وإدارة الاستجابة (CHS)</option>
                  <option value="psea">الحماية وصون السلامة ومكافحة الاستغلال (PSEA)</option>
                  <option value="eval">التقييم التنموي المستقل والمتابعة (OECD DAC)</option>
                  <option value="tot">تدريب المدربين المحترفين للكوادر (TOT)</option>
                  <option value="custom">تصميم برنامج تدريبي واستشاري مخصص</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700;">اسم مسؤول التواصل *</label>
                <input type="text" id="corp-contact-name" class="form-input" required placeholder="الاسم الكامل">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700;">البريد الإلكتروني المؤسسي *</label>
                <input type="email" id="corp-contact-email" class="form-input" required placeholder="contact@organization.org">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">رقم الهاتف / واتساب *</label>
              <input type="tel" id="corp-contact-phone" class="form-input" required placeholder="+972592879621" dir="ltr">
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">تفاصيل الاحتياج التدريبي أو مواعيد التنفيذ المقترحة</label>
              <textarea id="corp-notes" class="form-textarea" placeholder="اذكر أي متطلبات خاصة بالحقيبة التدريبية أو شهادات الكوادر..."></textarea>
            </div>

            <button type="submit" class="btn-cta" style="width: 100%; padding: 13px; font-size: 0.95rem; margin-top: 10px;">
              <span>إرسال طلب تدريب المؤسسات وتأكيد الحجز</span>
            </button>
          </form>
        </div>
      </div>

      <!-- ==========================================
           TAB 5: CERTIFICATE VERIFICATION (فحص الشهادات)
           ========================================== -->
      <div class="moodle-tab-pane" id="tab-moodle-verify" style="display: none;">
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-sm); max-width: 780px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="status-pill active">✓ المنظومة الرسمية للتحقق والاعتماد</span>
            <h2 style="font-size: 1.55rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 10px;">
              فحص واعتماد الشهادات الصادرة من شركة شات
            </h2>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-top: 6px;">
              أدخل الرقم المرجعي للشهادة الصادرة للتحقق المباشر من صحة البيانات والاعتمادات الدولية
            </p>
          </div>

          <div style="display: flex; gap: 10px; max-width: 540px; margin: 0 auto 24px;">
            <input type="text" id="cert-code-input" class="form-input" placeholder="مثال: SHAT-CHS-2026-089" style="text-align: center; font-weight: 700; letter-spacing: 1px;" dir="ltr">
            <button type="button" id="cert-verify-btn" class="btn-cta" style="flex-shrink: 0; padding: 10px 20px;">
              فحص الشهادة
            </button>
          </div>

          <!-- Result Container -->
          <div id="cert-result-box" style="display: none; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: var(--radius-lg); padding: 24px; animation: fadeIn 0.3s ease;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #bbf7d0;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.6rem; color: #16a34a;">✓</span>
                <strong style="color: #14532d; font-size: 1.1rem;">شهادة رسمية موثقة ومعتمدة</strong>
              </div>
              <span class="meta-tag" id="res-cert-number"></span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.95rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">اسم المتدرب / المستفيد:</span>
                <strong id="res-student-name" style="color: var(--shat-navy-950);"></strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">اسم الدورة / البرنامج:</span>
                <strong id="res-course-name" style="color: var(--shat-navy-950); text-align: end; max-width: 65%;"></strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">تاريخ الإصدار:</span>
                <span id="res-issue-date" style="font-weight: 600;"></span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">التقدير / النتيجة:</span>
                <span id="res-grade" style="color: #15803d; font-weight: 700;"></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px dashed var(--border-subtle);">
                <span style="color: var(--text-muted);">الاعتمادات الدولية:</span>
                <span id="res-accreditation" style="font-weight: 600; color: var(--shat-navy-800); text-align: end; max-width: 65%;"></span>
              </div>
            </div>
          </div>

          <div id="cert-not-found-box" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-lg); padding: 20px; color: #991b1b; animation: fadeIn 0.3s ease; text-align: center;">
            <div style="font-size: 1.8rem; margin-bottom: 6px;">⚠️</div>
            <strong style="display: block; margin-bottom: 4px;">لم يتم العثور على شهادة بهذا الرقم المرجعي</strong>
            <p style="font-size: 0.88rem; margin: 0; opacity: 0.85;">يرجى التأكد من كتابة الرقم بدقة أو التواصل مع الإدارة الأكاديمية عبر واتساب: +972592879621</p>
          </div>
        </div>
      </div>
    </div>

    <!-- NameThatUI: Floating Save Panel (Appears when Admin changes course status) -->
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

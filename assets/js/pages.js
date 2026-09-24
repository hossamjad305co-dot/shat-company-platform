// Shat Company Platform - Page Rendering Engine
// All pages render dedicated views without numeric prefixes in section names.

export function renderHomePage(t) {
  const sectionsList = [
    { key: "about", title: t.about.title, desc: t.about.subtitle, icon: "building" },
    { key: "services", title: t.services.title, desc: t.services.subtitle, icon: "briefcase" },
    { key: "consulting", title: t.consultingSec.title, desc: t.consultingSec.subtitle, icon: "shield-check" },
    { key: "delivery-model", title: t.deliveryModel.title, desc: t.deliveryModel.subtitle, icon: "git-merge" },
    { key: "approach", title: t.approach.title, desc: t.approach.subtitle, icon: "award" },
    { key: "references", title: t.references.title, desc: t.references.subtitle, icon: "globe" },
    { key: "expertise", title: t.expertise.title, desc: t.expertise.subtitle, icon: "layers" },
    { key: "value-partnerships", title: t.valuePartnerships.title, desc: t.valuePartnerships.subtitle, icon: "trending-up" }
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
            <div class="section-hub-card">
              <div class="hub-card-icon">
                <span style="font-size: 1.5rem;">❖</span>
              </div>
              <h3 class="hub-card-title">${sec.title}</h3>
              <p class="hub-card-desc">${sec.desc}</p>
              <div class="hub-card-footer">
                <a href="#/${sec.key}" class="hub-card-link">
                  <span>${t.nav.explorePlatform}</span>
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
        <h1 class="page-title">${a.title}</h1>
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
        <h1 class="page-title">${s.title}</h1>
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
        <h1 class="page-title">${c.title}</h1>
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
        <h1 class="page-title">${ap.title}</h1>
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
        <h1 class="page-title">${r.title}</h1>
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
        <h1 class="page-title">${ct.title}</h1>
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
    <!-- Distinct Executive Academy Hero -->
    <div class="academy-hero">
      <div class="container">
        <div class="breadcrumb-trail" style="margin-bottom: 24px; opacity: 0.85;">
          <a href="#/home" style="color: #a7f3d0;">${t.nav.home}</a>
          <span class="breadcrumb-separator" style="color: rgba(255,255,255,0.4);">/</span>
          <span style="color: #ffffff;">${ac.badge}</span>
        </div>

        <div class="academy-hero-badge">
          <span>★</span>
          <span>${ac.badge}</span>
        </div>

        <h1 class="academy-hero-title">
          ${ac.title}
        </h1>
        <p class="academy-hero-desc">
          ${ac.subtitle}
        </p>

        <!-- Dynamic Course Search -->
        <div class="academy-search-bar">
          <span style="font-size: 1.2rem; color: #34d399; margin-inline-end: 8px;">🔍</span>
          <input type="text" id="academy-course-search" class="academy-search-input" placeholder="${ac.searchPlaceholder}">
        </div>

        <!-- Metric Badges -->
        <div class="stats-grid" style="margin-top: 36px;">
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 18px;">
            <span class="stat-number" style="color: #a7f3d0;">${ac.stats.graduates}</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">${ac.stats.graduatesLabel}</span>
          </div>
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 18px;">
            <span class="stat-number" style="color: #a7f3d0;">${ac.stats.programs}</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">${ac.stats.programsLabel}</span>
          </div>
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 18px;">
            <span class="stat-number" style="color: #a7f3d0;">${ac.stats.partners}</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">${ac.stats.partnersLabel}</span>
          </div>
          <div class="stat-item" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); padding: 18px;">
            <span class="stat-number" style="color: #a7f3d0;">${ac.stats.satisfaction}</span>
            <span class="stat-label" style="color: rgba(255,255,255,0.8);">${ac.stats.satisfactionLabel}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Academy Catalog Section -->
    <div class="container" style="padding-top: 50px; padding-bottom: 70px;">
      <!-- Track Filter Pills -->
      <div class="academy-tracks-bar" id="academy-tracks-container">
        ${ac.tracks.map(trk => `
          <button class="academy-track-pill ${trk.id === 'all' ? 'active' : ''}" data-track="${trk.id}">
            ${trk.name}
          </button>
        `).join('')}
      </div>

      <!-- Course Cards Grid -->
      <div class="academy-courses-grid" id="academy-courses-list">
        ${ac.courses.map(course => `
          <div class="course-card" data-track="${course.track}" data-course-id="${course.id}">
            <div class="course-card-top">
              <span class="course-track-tag">${course.trackName}</span>
              <h3 class="course-card-title">${course.title}</h3>
            </div>
            <div class="course-card-body">
              <p class="course-card-desc">${course.desc}</p>
              <div class="course-meta-pills">
                <span class="course-meta-pill">⏱ ${course.duration}</span>
                <span class="course-meta-pill">🎯 ${course.level}</span>
                <span class="course-meta-pill">📍 ${course.format}</span>
                <span class="course-meta-pill" style="color: var(--shat-green-800); background: var(--shat-green-50);">✓ ${course.accreditation}</span>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-syllabus" data-course-id="${course.id}">
                ${ac.modal.syllabusTitle}
              </button>
              <button class="btn-enroll" data-course-id="${course.id}" data-course-title="${course.title}">
                ${ac.modal.enrollTitle}
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Learning Progression Architecture -->
      <div class="learning-path-banner">
        <span class="card-badge">منظومة بناء القدرات التراكمية</span>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--shat-navy-950); margin-top: 10px; margin-bottom: 12px;">
          مسار التدرج المهني من الممارس إلى الخبير الاستشاري
        </h2>
        <p style="color: var(--text-secondary); max-width: 780px;">
          صممت برامج شات بنموذج تدرج مهني متكامل يربط المهارة المعرفية بالممارسة الميدانية والاعتماد الاستشاري.
        </p>

        <div class="path-steps-row">
          <div class="path-step-card">
            <div class="path-step-num">1</div>
            <h4 style="font-size: 1.1rem; color: var(--shat-navy-900); margin-bottom: 6px;">التأسيس المعرفي</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">استيعاب المعايير الإنسانية الدولية (CHS, Sphere, PSEA) والمبادئ التوجيهية.</p>
          </div>
          <div class="path-step-card">
            <div class="path-step-num">2</div>
            <h4 style="font-size: 1.1rem; color: var(--shat-navy-900); margin-bottom: 6px;">الممارسة التطبيقية</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">دراسات حالة واقعية، محاكاة مشاريع حية، وتصميم أدلة عمل ميدانية.</p>
          </div>
          <div class="path-step-card">
            <div class="path-step-num">3</div>
            <h4 style="font-size: 1.1rem; color: var(--shat-navy-900); margin-bottom: 6px;">التقييم والامتثال</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">إجراء عمليات التدقيق المؤسسي والتقييم المستقل وفق معايير OECD DAC.</p>
          </div>
          <div class="path-step-card">
            <div class="path-step-num">4</div>
            <h4 style="font-size: 1.1rem; color: var(--shat-navy-900); margin-bottom: 6px;">الاعتماد الاستشاري</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">نيل شهادة الاعتماد المهني والانضمام لشبكة خبراء ومستشاري شات الإقليمية.</p>
          </div>
        </div>
      </div>

      <!-- Official Certificate Verification Box -->
      <div class="cert-verify-box">
        <div class="cert-verify-grid">
          <div>
            <span class="card-badge" style="background: rgba(52, 211, 153, 0.2); color: #6ee7b7; border-color: rgba(52, 211, 153, 0.4);">
              خدمة إلكترونية فورية
            </span>
            <h2 style="font-size: 2.1rem; font-weight: 800; color: #ffffff; margin-top: 14px; margin-bottom: 14px;">
              ${ac.verify.title}
            </h2>
            <p style="color: rgba(255, 255, 255, 0.85); line-height: 1.7; font-size: 1rem;">
              ${ac.verify.subtitle}
            </p>
            <div style="font-size: 0.82rem; color: #a7f3d0; margin-top: 12px; font-family: monospace;">
              ${ac.verify.testingTip}
            </div>

            <div class="cert-input-group">
              <input type="text" id="cert-code-input" class="cert-input" placeholder="${ac.verify.placeholder}">
              <button id="cert-verify-btn" class="btn-cta" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                ${ac.verify.btn}
              </button>
            </div>
          </div>

          <div>
            <!-- Verification Result Card (Dynamic) -->
            <div id="cert-result-box" class="cert-result-card">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: bold;">
                  ✓
                </div>
                <div>
                  <h4 style="color: #166534; font-size: 1.15rem; font-weight: 800; margin: 0;">${ac.verify.verifiedTitle}</h4>
                  <span id="res-cert-number" style="font-size: 0.85rem; color: var(--text-muted); font-family: monospace;"></span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.95rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">${ac.verify.studentLabel}</span>
                  <strong id="res-student-name" style="color: var(--shat-navy-950);"></strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">${ac.verify.courseLabel}</span>
                  <strong id="res-course-name" style="color: var(--shat-navy-950); text-align: end; max-width: 65%;"></strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">${ac.verify.dateLabel}</span>
                  <span id="res-issue-date" style="font-weight: 600;"></span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">${ac.verify.gradeLabel}</span>
                  <span id="res-grade" style="color: #15803d; font-weight: 700;"></span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px dashed var(--border-subtle);">
                  <span style="color: var(--text-muted);">${ac.verify.accreditationLabel}</span>
                  <span id="res-accreditation" style="font-weight: 600; color: var(--shat-navy-800); text-align: end; max-width: 65%;"></span>
                </div>
              </div>
            </div>

            <!-- Error Notice -->
            <div id="cert-not-found-box" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-lg); padding: 20px; color: #991b1b; animation: fadeIn 0.3s ease;">
              <div style="display: flex; align-items: center; gap: 10px; font-weight: 700; margin-bottom: 6px;">
                <span>⚠️</span>
                <span>تنبيه التحقق</span>
              </div>
              <p style="font-size: 0.92rem; margin: 0; line-height: 1.6;">${ac.verify.notFound}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Academy Syllabus Modal -->
    <div class="modal-overlay" id="academy-syllabus-modal" role="dialog" aria-modal="true">
      <div class="modal-box" style="max-width: 650px;">
        <button class="modal-close-btn" id="syllabus-modal-close" aria-label="Close dialog">✕</button>
        <div id="syllabus-modal-content">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>

    <!-- Academy Enrollment Modal -->
    <div class="modal-overlay" id="academy-enroll-modal" role="dialog" aria-modal="true">
      <div class="modal-box" style="max-width: 580px;">
        <button class="modal-close-btn" id="enroll-modal-close" aria-label="Close dialog">✕</button>
        <div id="enroll-modal-content">
          <span class="card-badge" style="background: var(--shat-green-50); color: var(--shat-green-800);">بوابة القبول والتسجيل</span>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--shat-navy-950); margin: 10px 0 6px;">
            ${ac.modal.enrollTitle}
          </h2>
          <p id="enroll-course-subtitle" style="font-size: 0.95rem; color: var(--shat-green-700); font-weight: 700; margin-bottom: 24px;"></p>

          <form id="academy-enrollment-form">
            <input type="hidden" id="enroll-course-id">
            <input type="hidden" id="enroll-course-title">

            <div class="form-group">
              <label class="form-label">${ac.modal.fullName} *</label>
              <input type="text" id="enroll-fullname" class="form-input" required placeholder="...">
            </div>

            <div class="form-group">
              <label class="form-label">${ac.modal.email} *</label>
              <input type="email" id="enroll-email" class="form-input" required placeholder="name@domain.com">
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">${ac.modal.phone}</label>
                <input type="tel" id="enroll-phone" class="form-input" placeholder="+966 ...">
              </div>
              <div class="form-group">
                <label class="form-label">${ac.modal.org}</label>
                <input type="text" id="enroll-org" class="form-input" placeholder="...">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${ac.modal.background}</label>
              <textarea id="enroll-background" class="form-textarea" placeholder="..."></textarea>
            </div>

            <button type="submit" class="btn-cta" style="width: 100%; margin-top: 10px;">
              ${ac.modal.submitEnroll}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}


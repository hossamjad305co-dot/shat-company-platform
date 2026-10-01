// assets/js/app.js
// Main Bootstrap, Dynamic Header & Footer, Mobile Bottom Nav, and Global Modal Engine
// Fully Trilingual Support (العربية AR, English EN, Français FR)
import { content } from './content.js';
import { router } from './router.js';
import { initLoadingScreen } from './components/loadingScreen.js';
import { api } from './services/api/apiClient.js';
import { showToast } from './components/toast.js';
import { icons } from './icons.js';
import { roleSimulator } from './tools/roleSimulator.js';
import { siteCustomizer } from './tools/siteCustomizer.js';
import { globalSearch } from './tools/globalSearch.js';
import { diagnosticTool } from './tools/diagnosticTool.js';
import { certificateValidator } from './tools/certificateValidator.js';
import { toolkitsLibrary } from './tools/toolkitsLibrary.js';
import { standardsExplorer } from './tools/standardsExplorer.js';
import { commandPalette } from './components/commandPalette.js';
import { initWhatsAppConcierge } from './components/whatsappConcierge.js';
import { initSyllabusViewer } from './components/syllabusViewer.js';
import { aiAdvisorWidget } from './components/aiAdvisorWidget.js';
import { examEngine } from './tools/examEngine.js';

class Application {
  constructor() {
    initLoadingScreen();
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
    this.init();
  }

  init() {
    siteCustomizer.applyThemeToDocument();
    window.siteCustomizer = siteCustomizer;
    window.openSiteCustomizer = (l) => siteCustomizer.openModal(l || this.currentLang);
    window.addEventListener('shat:customization-updated', (e) => {
      siteCustomizer.applyThemeToDocument(e.detail);
      this.renderHeader();
      this.renderFooter();
      this.renderMobileDrawer();
    });
    window.commandPalette = commandPalette;
    window.openCommandPalette = () => commandPalette.open();
    window.examEngine = examEngine;
    window.aiAdvisorWidget = aiAdvisorWidget;
    this.concierge = initWhatsAppConcierge();
    this.syllabusViewer = initSyllabusViewer();
    this.applyLanguage(this.currentLang);
    this.renderRoleSimulator();
    this.renderHeader();
    this.renderMobileDrawer();
    aiAdvisorWidget.init(this.currentLang);
    this.renderFooter();
    this.renderMobileBottomNav();
    this.bindGlobalEvents();
    router.init();

    // Verify session with server silently on boot
    api.getMe().then(() => {
      this.renderRoleSimulator();
      this.renderHeader();
      this.renderMobileDrawer();
      this.renderMobileBottomNav();
    }).catch(() => {});
  }

  renderRoleSimulator() {
    const container = document.getElementById('role-simulator-container');
    if (!container) return;
    container.innerHTML = roleSimulator.renderBar(this.currentLang);
    roleSimulator.bindEvents(this.currentLang);
  }

  setLanguage(lang) {
    if (!['ar', 'en', 'fr'].includes(lang)) return;
    this.currentLang = lang;
    localStorage.setItem('shat_platform_lang', lang);
    this.applyLanguage(lang);
    router.setLang(lang);
    this.renderRoleSimulator();
    this.renderHeader();
    this.renderMobileDrawer();
    this.renderMobileBottomNav();
    this.renderFooter();
  }

  applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const d = content[lang] || content.ar;
    if (lang === 'ar') {
      document.title = 'شركة شات للتنمية والتطوير | SHAT Development & Growth';
    } else if (lang === 'fr') {
      document.title = 'SHAT Développement & Croissance | Renforcement des Capacités & Institutions';
    } else {
      document.title = 'SHAT Development & Growth | Building Capacity • Strengthening Institutions';
    }

    // Dynamic Top Utility Bar Update
    const topMotto = document.getElementById('top-bar-motto');
    if (topMotto && d.topBar) {
      topMotto.textContent = d.topBar.motto;
    }
    const topWhatsapp = document.getElementById('top-bar-whatsapp');
    if (topWhatsapp && d.topBar) {
      topWhatsapp.textContent = d.topBar.whatsapp;
    }
  }

  renderHeader() {
    const d = content[this.currentLang] || content.ar;
    const c = d.company;
    const nav = d.nav;
    const user = api.currentUser;
    const isRtl = this.currentLang === 'ar';

    // Desktop Navigation Links
    const navContainer = document.getElementById('site-desktop-nav');
    if (navContainer) {
      navContainer.innerHTML = `
        <a href="#/home" class="nav-link">${nav.home}</a>
        <a href="#/about" class="nav-link">${nav.about}</a>
        <a href="#/services" class="nav-link">${nav.services}</a>
        <a href="#/standards" class="nav-link">${nav.standards}</a>
        <a href="#/projects" class="nav-link">${nav.projects || (this.currentLang === 'fr' ? 'Projets' : 'المشاريع')}</a>
        <a href="#/toolkits" class="nav-link">${this.currentLang === 'fr' ? 'Outils' : (this.currentLang === 'en' ? 'Toolkits' : 'الأدلة والنماذج')}</a>
        <a href="#/news" class="nav-link">${nav.news || (this.currentLang === 'fr' ? 'Actualités' : 'الأخبار')}</a>
        <a href="#/academy" class="nav-link">${nav.academy}</a>
        <a href="#/verify" class="nav-link">${this.currentLang === 'fr' ? 'Vérification' : (this.currentLang === 'en' ? 'Verify' : 'التحقق')}</a>
        <a href="#/contact" class="nav-link">${nav.contact}</a>
      `;
    }

    const brandEl = document.getElementById('header-brand-title');
    if (brandEl) brandEl.textContent = c.name;
    const subEl = document.getElementById('header-brand-sub');
    if (subEl) {
      subEl.textContent = this.currentLang === 'ar' 
        ? c.nameEn 
        : (this.currentLang === 'fr' ? 'SHAT Plateforme Institutionnelle' : 'SHAT Institutional Platform');
    }

    // Dynamic Language Selector Label
    const langLabel = this.currentLang === 'ar' 
      ? 'العربية' 
      : (this.currentLang === 'fr' ? 'Français' : 'English');

    // Language Dropdown HTML Component
    const langPickerHtml = `
      <div class="lang-switch-dropdown" style="position: relative; display: inline-block;">
        <button id="btn-lang-selector" class="btn-clean btn-secondary btn-sm" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 6px 12px; border-radius: var(--radius-xs);" title="اختيار اللغة / Select Language / Choisir la langue">
          <span>🌐</span>
          <span>${langLabel}</span>
          <span style="font-size: 0.65rem; opacity: 0.7;">▼</span>
        </button>
        <div id="lang-dropdown-menu" style="display: none; position: absolute; top: calc(100% + 4px); ${isRtl ? 'left: 0;' : 'right: 0;'} background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-xs); box-shadow: var(--shadow-md); z-index: 1000; min-width: 140px; overflow: hidden; padding: 4px 0;">
          <button class="btn-clean lang-option-btn ${this.currentLang === 'ar' ? 'active' : ''}" data-lang="ar" style="width: 100%; text-align: ${isRtl ? 'right' : 'left'}; padding: 8px 14px; font-size: 0.85rem; font-weight: ${this.currentLang === 'ar' ? '800' : '600'}; color: ${this.currentLang === 'ar' ? 'var(--shat-green)' : 'var(--shat-navy)'}; display: flex; align-items: center; gap: 8px; border: none; background: ${this.currentLang === 'ar' ? 'var(--bg-subtle)' : 'transparent'};">
            <span>🇸🇦</span> <span>العربية</span>
          </button>
          <button class="btn-clean lang-option-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" style="width: 100%; text-align: ${isRtl ? 'right' : 'left'}; padding: 8px 14px; font-size: 0.85rem; font-weight: ${this.currentLang === 'en' ? '800' : '600'}; color: ${this.currentLang === 'en' ? 'var(--shat-green)' : 'var(--shat-navy)'}; display: flex; align-items: center; gap: 8px; border: none; background: ${this.currentLang === 'en' ? 'var(--bg-subtle)' : 'transparent'};">
            <span>🇬🇧</span> <span>English</span>
          </button>
          <button class="btn-clean lang-option-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr" style="width: 100%; text-align: ${isRtl ? 'right' : 'left'}; padding: 8px 14px; font-size: 0.85rem; font-weight: ${this.currentLang === 'fr' ? '800' : '600'}; color: ${this.currentLang === 'fr' ? 'var(--shat-green)' : 'var(--shat-navy)'}; display: flex; align-items: center; gap: 8px; border: none; background: ${this.currentLang === 'fr' ? 'var(--bg-subtle)' : 'transparent'};">
            <span>🇫🇷</span> <span>Français</span>
          </button>
        </div>
      </div>
    `;

    // Header Actions (Right Side)
    const headerActions = document.getElementById('site-header-actions');
    if (headerActions) {
      if (user) {
        let portalRoute = '#/student';
        let portalLabel = this.currentLang === 'ar' ? 'لوحة المتدرب' : (this.currentLang === 'fr' ? 'Portail Stagiaire' : 'Trainee Portal');
        if (user.role === 'teacher') {
          portalRoute = '#/teacher';
          portalLabel = this.currentLang === 'ar' ? 'بوابة المدرب' : (this.currentLang === 'fr' ? 'Portail Formateur' : 'Trainer Portal');
        } else if (user.role === 'admin') {
          portalRoute = '#/admin';
          portalLabel = this.currentLang === 'ar' ? 'المركز الإداري ⚙️' : (this.currentLang === 'fr' ? 'Centre Admin ⚙️' : 'Admin Center ⚙️');
        }

        const logoutLabel = this.currentLang === 'ar' ? 'خروج' : (this.currentLang === 'fr' ? 'Quitter' : 'Logout');
        const notifTooltip = this.currentLang === 'ar' ? 'التنبيهات المؤسسية' : (this.currentLang === 'fr' ? 'Notifications' : 'Notifications');

        const searchBtnHtml = `
          <button id="btn-spotlight-search" class="btn-clean btn-sm" style="display: flex; align-items: center; gap: 5px; padding: 6px 10px; background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); color: var(--shat-navy); font-weight: 700; cursor: pointer; flex-shrink: 0;" title="البحث الشامل (Ctrl+K)">
            <span>🔍</span>
            <span class="search-text-label" style="font-size: 0.80rem;">${isRtl ? 'بحث...' : 'Search...'}</span>
            <kbd class="search-kbd-hint" style="font-size: 0.65rem; padding: 1px 4px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 3px; font-family: var(--font-mono); color: var(--text-muted);">⌘K</kbd>
          </button>
        `;

        const shortDisplayName = (user.fullNameAr || user.username || '').split(' ')[0] + ' ' + ((user.fullNameAr || user.username || '').split(' ')[1] || '');
        const roleBadge = user.role === 'admin' ? '⚙️ إشراف' : (user.role === 'teacher' ? '👨‍🏫 مدرب' : '🎓 متدرب');

        headerActions.innerHTML = `
          ${searchBtnHtml}
          ${langPickerHtml}
          
          <!-- Notifications Bell -->
          <div class="header-notif-container" style="position: relative;">
            <button id="btn-notifications-toggle" class="btn-clean btn-secondary btn-sm" style="position: relative; padding: 7px 11px;" title="${notifTooltip}">
              <span style="font-size: 1.1rem;">🔔</span>
              <span class="notification-badge-dot">3</span>
            </button>
          </div>

          <!-- User Identity Pill & Direct Logout Button (Always Visible) -->
          <div class="user-header-auth-group" style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <a href="${portalRoute}" class="btn-clean btn-sm user-portal-pill" style="font-weight: 700; background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); padding: 5px 10px; border-radius: var(--radius-xs); display: inline-flex; align-items: center; gap: 6px; text-decoration: none;" title="${user.fullNameAr || user.username} - ${portalLabel}">
              <span class="user-avatar-circle" style="width: 22px; height: 22px; border-radius: 50%; background: var(--shat-green); color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 800;">
                ${(user.fullNameAr || user.username || 'U')[0]}
              </span>
              <span class="user-short-name" style="font-size: 0.82rem; white-space: nowrap; max-width: 120px; overflow: hidden; text-overflow: ellipsis;">${shortDisplayName}</span>
              <span class="badge" style="background: #FFFFFF; color: var(--shat-navy); font-size: 0.68rem; padding: 1px 6px; border-radius: 10px; font-weight: 800;">${roleBadge}</span>
            </a>

            <button id="btn-header-logout" class="btn-clean btn-sm header-logout-btn" style="flex-shrink: 0; background: #DC2626; color: #FFFFFF; font-weight: 800; font-size: 0.78rem; padding: 6px 12px; border-radius: var(--radius-xs); border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 1px 3px rgba(220,38,38,0.3); transition: all 0.15s ease;" title="${logoutLabel}">
              <span>🚪</span>
              <span class="logout-btn-text">${logoutLabel}</span>
            </button>
          </div>

          <button class="mobile-toggle" id="btn-mobile-menu" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        `;

        const logoutBtn = document.getElementById('btn-header-logout');
        if (logoutBtn) {
          logoutBtn.onclick = async () => {
            await api.logout();
            const msg = this.currentLang === 'ar' 
              ? 'تم تسجيل الخروج بنجاح من المنصة.' 
              : (this.currentLang === 'fr' ? 'Déconnexion réussie.' : 'Successfully logged out.');
            showToast(msg, 'info');
            this.renderRoleSimulator();
            this.renderHeader();
            this.renderMobileDrawer();
            this.renderMobileBottomNav();
            window.location.hash = '#/home';
          };
        }

        const notifBtn = document.getElementById('btn-notifications-toggle');
        const notifMenu = document.getElementById('notifications-dropdown-menu');
        if (notifBtn && notifMenu) {
          notifBtn.onclick = (e) => {
            e.stopPropagation();
            const isOpen = notifMenu.style.display === 'block';
            notifMenu.style.display = isOpen ? 'none' : 'block';
          };
          document.addEventListener('click', (ev) => {
            if (!notifMenu.contains(ev.target) && ev.target !== notifBtn) {
              notifMenu.style.display = 'none';
            }
          });
        }
      } else {
        // Visitor Navigation Header
        const searchBtnHtml = `
          <button id="btn-spotlight-search" class="btn-clean btn-sm" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xs); color: var(--shat-navy); font-weight: 700; cursor: pointer;" title="البحث الشامل (Ctrl+K)">
            <span>🔍</span>
            <span style="font-size: 0.82rem;">${isRtl ? 'بحث...' : 'Search...'}</span>
            <kbd style="font-size: 0.65rem; padding: 1px 5px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 3px; font-family: var(--font-mono); color: var(--text-muted);">⌘K</kbd>
          </button>
        `;

        headerActions.innerHTML = `
          ${searchBtnHtml}
          ${langPickerHtml}
          <a href="#/login" class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); font-weight: 700;">
            ${nav.login}
          </a>
          <a href="#/contact" class="btn-clean btn-primary btn-sm">
            ${nav.requestConsultation}
          </a>
          <button class="mobile-toggle" id="btn-mobile-menu" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        `;
      }

      // Bind Search Trigger
      const searchTrigger = document.getElementById('btn-spotlight-search');
      if (searchTrigger) {
        searchTrigger.onclick = () => {
          commandPalette.open();
        };
      }

      // Bind Language Dropdown Clicks
      const langSelectorBtn = document.getElementById('btn-lang-selector');
      const langDropdownMenu = document.getElementById('lang-dropdown-menu');
      if (langSelectorBtn && langDropdownMenu) {
        langSelectorBtn.onclick = (e) => {
          e.stopPropagation();
          const isOpen = langDropdownMenu.style.display === 'block';
          langDropdownMenu.style.display = isOpen ? 'none' : 'block';
        };

        langDropdownMenu.querySelectorAll('.lang-option-btn').forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            const chosenLang = btn.getAttribute('data-lang');
            langDropdownMenu.style.display = 'none';
            if (chosenLang && chosenLang !== this.currentLang) {
              this.setLanguage(chosenLang);
            }
          };
        });

        document.addEventListener('click', (ev) => {
          if (!langDropdownMenu.contains(ev.target) && ev.target !== langSelectorBtn) {
            langDropdownMenu.style.display = 'none';
          }
        });
      }

      const mobileBtn = document.getElementById('btn-mobile-menu');
      const mobileDrawer = document.getElementById('mobile-drawer-nav');
      if (mobileBtn && mobileDrawer) {
        mobileBtn.onclick = () => mobileDrawer.style.display = 'block';
      }
    }

    // Localize Notifications Menu Panel Content
    const notifHeader = document.querySelector('#notifications-dropdown-menu .notifications-header');
    if (notifHeader && d.notifications) {
      notifHeader.innerHTML = `
        <span style="font-weight: 800; color: var(--shat-navy); font-size: 0.95rem;">${d.notifications.title}</span>
        <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green); font-size: 0.75rem; font-weight: 700;">${d.notifications.badge}</span>
      `;
    }
    const notifList = document.getElementById('notifications-items-list');
    if (notifList && d.notifications?.items) {
      const colors = ['var(--shat-green)', 'var(--shat-navy)', 'var(--shat-amber)'];
      notifList.innerHTML = d.notifications.items.map((item, idx) => `
        <div class="notification-item">
          <div class="notif-dot" style="background: ${colors[idx % colors.length]};"></div>
          <div>
            <div style="font-weight: 700; font-size: 0.86rem; color: var(--shat-navy);">${item.title}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">${item.sub || item.desc}</div>
          </div>
        </div>
      `).join('');
    }
  }

  renderMobileDrawer() {
    const d = content[this.currentLang] || content.ar;
    const nav = d.nav;
    const user = api.currentUser;

    const drawerTitle = document.getElementById('mobile-drawer-title');
    if (drawerTitle) {
      drawerTitle.textContent = this.currentLang === 'ar' ? 'قائمة شركة شات' : (this.currentLang === 'fr' ? 'Menu SHAT' : 'SHAT Menu');
    }

    const drawerLinks = document.getElementById('mobile-drawer-links');
    if (drawerLinks) {
      drawerLinks.innerHTML = `
        <!-- Language Switcher in Mobile Drawer -->
        <div style="display: flex; gap: 6px; padding-bottom: 12px; margin-bottom: 8px; border-bottom: 1px solid var(--border-light);">
          <button class="btn-clean mobile-lang-btn ${this.currentLang === 'ar' ? 'active' : ''}" data-lang="ar" style="flex: 1; padding: 7px 4px; font-size: 0.82rem; font-weight: 700; border-radius: var(--radius-xs); border: 1px solid ${this.currentLang === 'ar' ? 'var(--shat-green)' : 'var(--border-light)'}; background: ${this.currentLang === 'ar' ? 'var(--shat-green-tint)' : '#FFFFFF'}; color: ${this.currentLang === 'ar' ? 'var(--shat-green)' : 'var(--shat-navy)'};">🇸🇦 العربية</button>
          <button class="btn-clean mobile-lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" style="flex: 1; padding: 7px 4px; font-size: 0.82rem; font-weight: 700; border-radius: var(--radius-xs); border: 1px solid ${this.currentLang === 'en' ? 'var(--shat-green)' : 'var(--border-light)'}; background: ${this.currentLang === 'en' ? 'var(--shat-green-tint)' : '#FFFFFF'}; color: ${this.currentLang === 'en' ? 'var(--shat-green)' : 'var(--shat-navy)'};">🇬🇧 English</button>
          <button class="btn-clean mobile-lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr" style="flex: 1; padding: 7px 4px; font-size: 0.82rem; font-weight: 700; border-radius: var(--radius-xs); border: 1px solid ${this.currentLang === 'fr' ? 'var(--shat-green)' : 'var(--border-light)'}; background: ${this.currentLang === 'fr' ? 'var(--shat-green-tint)' : '#FFFFFF'}; color: ${this.currentLang === 'fr' ? 'var(--shat-green)' : 'var(--shat-navy)'};">🇫🇷 Français</button>
        </div>

        <a href="#/home" class="nav-link">${nav.home}</a>
        <a href="#/about" class="nav-link">${nav.about}</a>
        <a href="#/services" class="nav-link">${nav.services}</a>
        <a href="#/standards" class="nav-link">${nav.standards}</a>
        <a href="#/projects" class="nav-link">${nav.projects || (this.currentLang === 'fr' ? 'Projets' : 'المشاريع')}</a>
        <a href="#/toolkits" class="nav-link" style="color: var(--shat-navy); font-weight: 700;">📂 ${this.currentLang === 'fr' ? 'Outils & Modèles' : (this.currentLang === 'en' ? 'Toolkits & Templates' : 'الأدلة والنماذج الميدانية')}</a>
        <a href="#/news" class="nav-link">${nav.news || (this.currentLang === 'fr' ? 'Actualités' : 'الأخبار')}</a>
        <a href="#/academy" class="nav-link">${nav.academy}</a>
        <a href="#/forms" class="nav-link" style="color: var(--shat-green); font-weight: 800;">📋 ${this.currentLang === 'ar' ? 'استمارات التسجيل المعتمدة' : (this.currentLang === 'fr' ? 'Formulaires d’Inscription' : 'Official Forms')}</a>
        <a href="#/verify" class="nav-link" style="color: #10B981; font-weight: 800;">🛡️ ${this.currentLang === 'ar' ? 'التحقق من الشهادات والاعتمادات' : (this.currentLang === 'fr' ? 'Vérifier Certificats' : 'Verify Certificates')}</a>
        <a href="#/contact" class="nav-link">${nav.contact}</a>
        
        <button type="button" id="btn-mobile-drawer-search" class="btn-clean" style="margin: 8px 0; background: var(--bg-subtle); color: var(--shat-navy); font-weight: 800; width: 100%; justify-content: center; padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>🔍</span>
          <span>${this.currentLang === 'ar' ? 'البحث الذكي الشامل (Ctrl+K)' : 'Spotlight Search (Ctrl+K)'}</span>
        </button>
        <div style="height: 1px; background: var(--border-light); margin: 6px 0;"></div>
        ${user ? `
          <a href="${user.role === 'teacher' ? '#/teacher' : (user.role === 'admin' ? '#/admin' : '#/student')}" class="nav-link" style="color: var(--shat-green); font-weight: 800;">
            👤 ${user.fullNameAr || user.username} (${user.roleTitle || user.role})
          </a>
          ${(user.role === 'admin' || user.role === 'supervisor') ? `
            <button type="button" id="btn-mobile-drawer-customizer" class="btn-clean" style="margin-top: 6px; background: var(--shat-navy); color: #FFFFFF; font-weight: 700; width: 100%; justify-content: center; padding: 9px 12px; border-radius: var(--radius-xs); border: 1px solid rgba(255,255,255,0.2); cursor: pointer;">
              🎨 ${this.currentLang === 'ar' ? 'تخصيص المنصة والمحتوى' : 'Platform Customizer'}
            </button>
          ` : ''}
          <button type="button" id="btn-mobile-drawer-logout" class="btn-clean" style="margin-top: 8px; background: #DC2626; color: #FFFFFF; font-weight: 700; width: 100%; justify-content: center; padding: 9px 12px; border-radius: var(--radius-xs); border: none; cursor: pointer;">
            🚪 ${this.currentLang === 'ar' ? 'تسجيل الخروج' : (this.currentLang === 'fr' ? 'Se déconnecter' : 'Logout')}
          </button>
        ` : `
          <a href="#/login" class="nav-link" style="color: var(--shat-navy);">🔑 ${nav.login}</a>
          <a href="#/contact" class="btn-clean btn-primary btn-sm" style="margin-top: 6px;">${nav.requestConsultation}</a>
        `}
      `;

      // Bind Drawer Logout
      const drawerLogoutBtn = document.getElementById('btn-mobile-drawer-logout');
      if (drawerLogoutBtn) {
        drawerLogoutBtn.onclick = async () => {
          await api.logout();
          const drawer = document.getElementById('mobile-drawer-nav');
          if (drawer) drawer.style.display = 'none';
          const msg = this.currentLang === 'ar' 
            ? 'تم تسجيل الخروج بنجاح من المنصة.' 
            : (this.currentLang === 'fr' ? 'Déconnexion réussie.' : 'Successfully logged out.');
          showToast(msg, 'info');
          this.renderRoleSimulator();
          this.renderHeader();
          this.renderMobileDrawer();
          this.renderMobileBottomNav();
          window.location.hash = '#/home';
        };
      }

      // Bind Drawer Customizer
      const drawerCustomizerBtn = document.getElementById('btn-mobile-drawer-customizer');
      if (drawerCustomizerBtn) {
        drawerCustomizerBtn.onclick = () => {
          const drawer = document.getElementById('mobile-drawer-nav');
          if (drawer) drawer.style.display = 'none';
          if (window.openSiteCustomizer) {
            window.openSiteCustomizer();
          } else {
            showToast('أداة تخصيص المنصة جاهزة للمشرفين', 'info');
          }
        };
      }

      const drawerSearchBtn = document.getElementById('btn-mobile-drawer-search');
      if (drawerSearchBtn) {
        drawerSearchBtn.onclick = () => {
          const drawer = document.getElementById('mobile-drawer-nav');
          if (drawer) drawer.style.display = 'none';
          commandPalette.open();
        };
      }

      drawerLinks.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const selectedLang = e.currentTarget.getAttribute('data-lang');
          if (selectedLang) {
            this.setLanguage(selectedLang);
            const drawer = document.getElementById('mobile-drawer-nav');
            if (drawer) drawer.style.display = 'none';
          }
        });
      });
    }
  }

  // Mobile-First Bottom Navigation Bar
  renderMobileBottomNav() {
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (!bottomNav) return;

    const d = content[this.currentLang] || content.ar;
    const b = d.bottomNav || content.ar.bottomNav;
    const user = api.currentUser;

    if (!user) {
      // Guest Bottom Navigation: Ergonomic Thumb Reach
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">${b.home}</span>
        </a>
        <a href="#/academy" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎓</span>
          <span class="mobile-bottom-label">${b.academy}</span>
        </a>
        <a href="#/forms" class="mobile-bottom-link" style="color: var(--shat-green);">
          <span class="mobile-bottom-icon">📋</span>
          <span class="mobile-bottom-label">${this.currentLang === 'ar' ? 'الاستمارات' : 'Forms'}</span>
        </a>
        <a href="#/verify" class="mobile-bottom-link" style="color: #10B981;">
          <span class="mobile-bottom-icon">🛡️</span>
          <span class="mobile-bottom-label">${this.currentLang === 'ar' ? 'الشهادات' : 'Verify'}</span>
        </a>
        <a href="#/login" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🔑</span>
          <span class="mobile-bottom-label">${b.login}</span>
        </a>
      `;
    } else if (user.role === 'student') {
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">${b.home}</span>
        </a>
        <a href="#/academy" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📚</span>
          <span class="mobile-bottom-label">${b.courses}</span>
        </a>
        <a href="#/student" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📊</span>
          <span class="mobile-bottom-label">${b.myDashboard}</span>
        </a>
        <a href="#/course/shat-chs-master" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎯</span>
          <span class="mobile-bottom-label">${b.myRoom}</span>
        </a>
        <a href="#/student" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">👤</span>
          <span class="mobile-bottom-label">${b.profile}</span>
        </a>
      `;
    } else if (user.role === 'teacher') {
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">${b.home}</span>
        </a>
        <a href="#/teacher" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">👨‍🏫</span>
          <span class="mobile-bottom-label">${b.courses}</span>
        </a>
        <a href="#/teacher" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">✍️</span>
          <span class="mobile-bottom-label">${b.grading}</span>
        </a>
        <a href="#/academy" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎓</span>
          <span class="mobile-bottom-label">${b.academy}</span>
        </a>
      `;
    } else if (user.role === 'admin') {
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">${b.home}</span>
        </a>
        <a href="#/admin" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📰</span>
          <span class="mobile-bottom-label">${b.content}</span>
        </a>
        <a href="#/admin" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📥</span>
          <span class="mobile-bottom-label">${b.requests}</span>
        </a>
        <a href="#/admin" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">⚙️</span>
          <span class="mobile-bottom-label">${b.admin}</span>
        </a>
      `;
    }
  }

  renderFooter() {
    const d = content[this.currentLang] || content.ar;
    const c = d.company;
    const nav = d.nav;
    const f = d.footer || content.ar.footer;

    const footerContainer = document.getElementById('site-footer-content');
    if (footerContainer) {
      footerContainer.innerHTML = `
        <div class="footer-grid">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-direction: row;">
              <span style="font-weight: 900; font-size: 1.1rem; color: #FFFFFF;">${c.name}</span>
              <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 38px;" onerror="this.onerror=null; this.src='assets/logo/logo-symbol.jpg';">
            </div>
            <p style="font-size: 0.9rem; color: #94A3B8; line-height: 1.7; margin-bottom: 16px;">
              ${c.motto}<br>
              <span style="font-family: var(--font-latin); font-size: 0.8rem; color: #64748B;">${c.subMottoEn || c.subMotto}</span>
            </p>
            <div style="font-size: 0.85rem; color: #CBD5E1;">
              ${f.scope}
            </div>
          </div>

          <div>
            <div class="footer-title">${f.sectionsTitle}</div>
            <ul class="footer-links">
              <li><a href="#/home">${nav.home}</a></li>
              <li><a href="#/about">${nav.about}</a></li>
              <li><a href="#/services">${nav.services}</a></li>
              <li><a href="#/standards">${nav.standards}</a></li>
              <li><a href="#/projects">${nav.projects || (this.currentLang === 'fr' ? 'Projets' : 'المشاريع')}</a></li>
              <li><a href="#/news">${nav.news || (this.currentLang === 'fr' ? 'Actualités' : 'الأخبار')}</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-title">${f.academyTitle}</div>
            <ul class="footer-links">
              <li><a href="#/academy">${nav.academy}</a></li>
              <li><a href="#/delivery">${nav.delivery}</a></li>
              <li><a href="#/contact">${nav.contact}</a></li>
              <li><a href="#/admin">${nav.admin}</a></li>
              <li><a href="https://wa.me/972592879621" target="_blank" rel="noopener">${f.techSupport}</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-title">${f.contactTitle}</div>
            <ul class="footer-links">
              <li style="color: #CBD5E1;">${f.emailLabel} <a href="mailto:${c.email}" style="color: #FFFFFF;">${c.email}</a></li>
              <li style="color: #CBD5E1;">${f.phoneLabel} <a href="https://wa.me/972592879621" target="_blank" rel="noopener" style="color: #4ADE80;">${c.phone}</a></li>
              <li style="margin-top: 10px;">
                <a href="#/contact" class="btn-clean btn-green btn-sm" style="width: 100%;">
                  <span>${f.requestConsultBtn}</span>
                  <span>${this.currentLang === 'ar' ? '←' : '→'}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>© ${c.year} ${c.name} (${c.nameEn}). ${f.rights}</div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <a href="https://www.facebook.com/shat.development.growth/" target="_blank" rel="noopener" class="social-pill-btn icon-only" title="Facebook" style="width: 42px; height: 42px; padding: 0 !important; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #1877F2; transition: all 0.25s ease;">
              ${icons.facebook('svg-social-fb', 22)}
            </a>
            <a href="https://wa.me/972592879621" target="_blank" rel="noopener" class="social-pill-btn icon-only" title="WhatsApp" style="width: 42px; height: 42px; padding: 0 !important; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #25D366; transition: all 0.25s ease;">
              ${icons.whatsapp('svg-social-wa', 22)}
            </a>
            <a href="https://www.instagram.com/shat.development.growth/" target="_blank" rel="noopener" class="social-pill-btn icon-only" title="Instagram" style="width: 42px; height: 42px; padding: 0 !important; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #E4405F; transition: all 0.25s ease;">
              ${icons.instagram('svg-social-ig', 22)}
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener" class="social-pill-btn icon-only" title="LinkedIn" style="width: 42px; height: 42px; padding: 0 !important; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #0A66C2; transition: all 0.25s ease;">
              ${icons.linkedin('svg-social-li', 22)}
            </a>
          </div>
          <div>${f.standardsNotice}</div>
        </div>
      `;
    }
  }

  bindGlobalEvents() {
    // Mobile Drawer Close triggers
    const mobileDrawer = document.getElementById('mobile-drawer-nav');
    const closeDrawerBtn = document.getElementById('btn-close-mobile-drawer');

    if (closeDrawerBtn && mobileDrawer) {
      closeDrawerBtn.onclick = () => mobileDrawer.style.display = 'none';
      mobileDrawer.onclick = (e) => {
        if (e.target === mobileDrawer || e.target.tagName === 'A') {
          mobileDrawer.style.display = 'none';
        }
      };
    }

    // Global Modal Setup
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    const modalCloseBtn = document.getElementById('global-modal-close');
    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('open');
      });
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('open');
        }
      });
    }

    // Expose openGlobalModal
    window.openGlobalModal = (courseId = 'general') => {
      const modalBackdrop = document.getElementById('global-modal-backdrop');
      const modalBody = document.getElementById('global-modal-body');
      const modalTitle = document.getElementById('global-modal-title');
      if (!modalBackdrop || !modalBody) return;

      const d = content[this.currentLang] || content.ar;
      const m = d.modal || content.ar.modal;
      const foundCourse = d.courses?.find(c => c.id === courseId);
      const courseTitle = foundCourse ? foundCourse.title : m.generalCourse;

      if (modalTitle) modalTitle.textContent = m.title;

      modalBody.innerHTML = `
        <div style="margin-bottom: 16px; background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--shat-green);">${m.courseSelected}</div>
          <div style="font-weight: 800; color: var(--shat-navy);">${courseTitle}</div>
        </div>

        <form id="modal-enrollment-form">
          <input type="hidden" id="app-course-id" value="${courseId}">
          <input type="hidden" id="app-course-title" value="${courseTitle}">

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${m.fullName}</label>
            <input type="text" id="app-fullname" class="form-input" placeholder="${m.fullNamePlaceholder}" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${m.phone}</label>
              <input type="tel" id="app-phone" class="form-input" placeholder="+97259..." required>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${m.email}</label>
              <input type="email" id="app-email" class="form-input" placeholder="name@domain.com" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${m.org}</label>
            <input type="text" id="app-org" class="form-input" placeholder="${m.orgPlaceholder}">
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">${m.qualification}</label>
            <input type="text" id="app-qualification" class="form-input" placeholder="${m.qualificationPlaceholder}">
          </div>

          <button type="submit" class="btn-clean btn-primary btn-lg" style="width: 100%;">
            <span>${m.submit}</span>
            <span>${this.currentLang === 'ar' ? '←' : '→'}</span>
          </button>
        </form>
      `;

      modalBackdrop.classList.add('open');

      const enrollForm = document.getElementById('modal-enrollment-form');
      if (enrollForm) {
        enrollForm.addEventListener('submit', async (ev) => {
          ev.preventDefault();
          const submitBtn = enrollForm.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>${m.sending}</span>`;
          }

          const appData = {
            courseId: document.getElementById('app-course-id')?.value,
            courseTitle: document.getElementById('app-course-title')?.value,
            fullName: document.getElementById('app-fullname')?.value,
            phone: document.getElementById('app-phone')?.value,
            email: document.getElementById('app-email')?.value,
            organization: document.getElementById('app-org')?.value,
            qualification: document.getElementById('app-qualification')?.value
          };

          try {
            const res = await api.submitApplication(appData);
            showToast(res.message || m.success, 'success');
            modalBackdrop.classList.remove('open');
          } catch (err) {
            showToast(m.error + err.message, 'error');
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = `<span>${m.submit}</span><span>${this.currentLang === 'ar' ? '←' : '→'}</span>`;
            }
          }
        });
      }
    };

    // Keyboard Shortcut for Global Spotlight Search (Ctrl+K / Cmd+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        globalSearch.open(this.currentLang);
      }
    });

    // Modal: Diagnostic Assessment Tool Opener
    window.openDiagnosticModal = () => {
      const modal = document.getElementById('modal-diagnostic-assessment');
      const body = document.getElementById('modal-diagnostic-body');
      if (!modal || !body) return;
      body.innerHTML = diagnosticTool.renderModal(this.currentLang);
      modal.classList.add('open');
      diagnosticTool.init(this.currentLang);
    };
    window.openDiagnosticAssessment = window.openDiagnosticModal;

    const diagClose = document.getElementById('modal-diagnostic-close');
    const diagModal = document.getElementById('modal-diagnostic-assessment');
    if (diagClose && diagModal) {
      diagClose.onclick = () => diagModal.classList.remove('open');
      diagModal.onclick = (e) => {
        if (e.target === diagModal) diagModal.classList.remove('open');
      };
    }

    // Modal: Certificate Verification Tool Opener
    window.openCertificateModal = () => {
      const modal = document.getElementById('modal-certificate-validator');
      const body = document.getElementById('modal-certificate-body');
      if (!modal || !body) return;
      body.innerHTML = certificateValidator.renderModal(this.currentLang);
      modal.classList.add('open');
      certificateValidator.init(this.currentLang);
    };
    window.openCertificateValidator = window.openCertificateModal;

    const certClose = document.getElementById('modal-certificate-close');
    const certModal = document.getElementById('modal-certificate-validator');
    if (certClose && certModal) {
      certClose.onclick = () => certModal.classList.remove('open');
      certModal.onclick = (e) => {
        if (e.target === certModal) certModal.classList.remove('open');
      };
    }

    // Modal: Toolkit Preview Opener
    window.openToolkitModal = (toolkitId = 'meal-plan') => {
      toolkitsLibrary.openPreview(toolkitId, this.currentLang);
    };
    window.openToolkitsLibrary = () => {
      window.openToolkitModal('meal-plan');
    };

    // Modal: Standards Explorer Opener
    window.openStandardsExplorer = (stdCode = 'CHS') => {
      standardsExplorer.openModal(stdCode, this.currentLang);
    };

    const tkClose = document.getElementById('modal-toolkit-close');
    const tkModal = document.getElementById('modal-toolkit-preview');
    if (tkClose && tkModal) {
      tkClose.onclick = () => tkModal.classList.remove('open');
      tkModal.onclick = (e) => {
        if (e.target === tkModal) tkModal.classList.remove('open');
      };
    }

    // Modal: Permission Guard (Rule 1 Enforcement for unauthenticated visitors)
    window.openPermissionGuard = (actionTitle = '') => {
      const guard = document.getElementById('modal-permission-guard');
      if (!guard) return;
      guard.classList.add('open');
    };

    const guardClose = document.getElementById('modal-permission-guard-close');
    const guardDismiss = document.getElementById('btn-guard-dismiss');
    const guardModal = document.getElementById('modal-permission-guard');
    if (guardClose && guardModal) {
      guardClose.onclick = () => guardModal.classList.remove('open');
    }
    if (guardDismiss && guardModal) {
      guardDismiss.onclick = () => guardModal.classList.remove('open');
    }
    if (guardModal) {
      guardModal.onclick = (e) => {
        if (e.target === guardModal) guardModal.classList.remove('open');
      };
    }

    // 1-Click Instant Demo Student in Permission Guard
    const instantStudentBtn = document.getElementById('btn-guard-instant-student');
    if (instantStudentBtn && guardModal) {
      instantStudentBtn.onclick = () => {
        const studentRole = roleSimulator.roles.find(r => r.id === 'student');
        if (studentRole) {
          localStorage.setItem('shat_current_user', JSON.stringify(studentRole.user));
          api.currentUser = studentRole.user;
          guardModal.classList.remove('open');
          showToast(
            this.currentLang === 'ar' ? 'تم الدخول الفوري بصفة متدرب معتمد.' : 'Instant student access granted.',
            'success'
          );
          window.dispatchEvent(new CustomEvent('shat:auth-updated'));
          setTimeout(() => {
            window.location.hash = '#/student';
          }, 300);
        }
      };
    }

    // Re-render on auth updates
    window.addEventListener('shat:auth-updated', () => {
      this.renderRoleSimulator();
      this.renderHeader();
      this.renderMobileDrawer();
      this.renderMobileBottomNav();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Application();
});


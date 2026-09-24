// Shat Company Platform - Main Application Controller

import { translations } from './translations.js';
import { router } from './router.js';
import { submitConsultation } from './supabaseClient.js';

class App {
  constructor() {
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.bindEvents();
    router.init(this.currentLang);
  }

  applyLanguage(lang) {
    if (!translations[lang]) lang = 'ar';
    this.currentLang = lang;
    localStorage.setItem('shat_platform_lang', lang);

    const t = translations[lang];
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', t.dir);
    document.title = `${t.companyName} | ${t.companyTagline}`;

    this.renderHeader(t);
    this.renderFooter(t);
    this.renderModal(t);

    router.setLang(lang);
  }

  renderHeader(t) {
    const headerNav = document.getElementById('desktop-nav');
    if (headerNav) {
      headerNav.innerHTML = `
        <a href="#/home" class="nav-link">${t.nav.home}</a>
        <a href="#/about" class="nav-link">${t.nav.about}</a>
        <a href="#/services" class="nav-link">${t.nav.services}</a>
        <a href="#/consulting" class="nav-link">${t.nav.consulting}</a>
        <a href="#/delivery-model" class="nav-link">${t.nav.deliveryModel}</a>
        <a href="#/approach" class="nav-link">${t.nav.approach}</a>
        <a href="#/references" class="nav-link">${t.nav.references}</a>
        <a href="#/expertise" class="nav-link">${t.nav.expertise}</a>
        <a href="#/value-partnerships" class="nav-link">${t.nav.valuePartnerships}</a>
        <a href="#/academy" class="nav-academy-badge">${t.nav.academy}</a>
      `;
    }

    // Update Language Button
    const langBtnText = document.getElementById('current-lang-text');
    if (langBtnText) {
      langBtnText.innerHTML = `${t.flag} ${t.langName}`;
    }

    // Update Header CTA
    const headerCta = document.getElementById('header-cta-btn');
    if (headerCta) {
      headerCta.textContent = t.nav.requestConsultation;
    }

    // Update Top Notice
    const topMotto = document.getElementById('top-bar-motto');
    if (topMotto) {
      topMotto.textContent = t.companyMotto;
    }
    const pillTraining = document.getElementById('top-pill-training');
    if (pillTraining) pillTraining.textContent = t.pillTraining;
    const pillConsulting = document.getElementById('top-pill-consulting');
    if (pillConsulting) pillConsulting.textContent = t.pillConsulting;

    // Mobile nav
    const mobileNavList = document.getElementById('mobile-nav-links');
    if (mobileNavList) {
      mobileNavList.innerHTML = `
        <a href="#/home" class="mobile-link">${t.nav.home}</a>
        <a href="#/about" class="mobile-link">${t.nav.about}</a>
        <a href="#/services" class="mobile-link">${t.nav.services}</a>
        <a href="#/consulting" class="mobile-link">${t.nav.consulting}</a>
        <a href="#/delivery-model" class="mobile-link">${t.nav.deliveryModel}</a>
        <a href="#/approach" class="mobile-link">${t.nav.approach}</a>
        <a href="#/references" class="mobile-link">${t.nav.references}</a>
        <a href="#/expertise" class="mobile-link">${t.nav.expertise}</a>
        <a href="#/value-partnerships" class="mobile-link">${t.nav.valuePartnerships}</a>
        <a href="#/academy" class="mobile-link" style="color: #059669; font-weight: 800;">${t.nav.academy}</a>
        <a href="#/contact" class="mobile-link">${t.nav.contact}</a>
      `;
    }
  }

  renderFooter(t) {
    const footerAbout = document.getElementById('footer-about-text');
    if (footerAbout) footerAbout.textContent = t.footer.aboutText;

    const footerQuickTitle = document.getElementById('footer-quick-title');
    if (footerQuickTitle) footerQuickTitle.textContent = t.footer.quickLinks;

    const footerLinks = document.getElementById('footer-links');
    if (footerLinks) {
      footerLinks.innerHTML = `
        <a href="#/about">${t.about.title}</a>
        <a href="#/services">${t.services.title}</a>
        <a href="#/consulting">${t.consultingSec.title}</a>
        <a href="#/delivery-model">${t.deliveryModel.title}</a>
        <a href="#/approach">${t.approach.title}</a>
        <a href="#/references">${t.references.title}</a>
        <a href="#/expertise">${t.expertise.title}</a>
        <a href="#/value-partnerships">${t.valuePartnerships.title}</a>
        <a href="#/academy" style="color: #a7f3d0; font-weight: 700;">${t.nav.academy}</a>
      `;
    }

    const footerLegal = document.getElementById('footer-legal-copy');
    if (footerLegal) footerLegal.textContent = t.footer.legalNotice;

    const footerPledge = document.getElementById('footer-privacy-pledge');
    if (footerPledge) footerPledge.textContent = t.footer.privacyPledge;
  }

  renderModal(t) {
    const modalContent = document.getElementById('consultation-modal-content');
    if (modalContent) {
      const ct = t.contact;
      modalContent.innerHTML = `
        <h2 style="font-size: 1.5rem; color: var(--shat-navy-950); margin-bottom: 8px;">${ct.formTitle}</h2>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;">${ct.formSubtitle}</p>
        <form id="modal-consultation-form">
          <div class="form-group">
            <label class="form-label">${ct.nameLabel}</label>
            <input type="text" id="modal-c-name" class="form-input" required placeholder="...">
          </div>
          <div class="form-group">
            <label class="form-label">${ct.emailInputLabel}</label>
            <input type="email" id="modal-c-email" class="form-input" required placeholder="name@domain.com">
          </div>
          <div class="form-group">
            <label class="form-label">${ct.orgLabel}</label>
            <input type="text" id="modal-c-org" class="form-input" required placeholder="...">
          </div>
          <div class="form-group">
            <label class="form-label">${ct.serviceTypeLabel}</label>
            <select id="modal-c-service" class="form-select">
              ${ct.serviceOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${ct.messageLabel}</label>
            <textarea id="modal-c-details" class="form-textarea" placeholder="..."></textarea>
          </div>
          <button type="submit" class="btn-cta" style="width: 100%; margin-top: 10px;">
            ${ct.submitBtn}
          </button>
        </form>
      `;

      const form = document.getElementById('modal-consultation-form');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '... جارٍ الإرسال';
          }
          const cData = {
            fullName: document.getElementById('modal-c-name')?.value || '',
            email: document.getElementById('modal-c-email')?.value || '',
            organization: document.getElementById('modal-c-org')?.value || '',
            serviceType: document.getElementById('modal-c-service')?.value || '',
            details: document.getElementById('modal-c-details')?.value || '',
            language: this.currentLang
          };
          await submitConsultation(cData);
          alert(ct.successMsg);
          this.closeModal();
          form.reset();
        });
      }
    }
  }

  bindEvents() {
    // Language Dropdown Toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    const langDropdown = document.getElementById('lang-dropdown-menu');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        langDropdown.classList.remove('show');
      });

      document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const lang = opt.getAttribute('data-lang');
          this.applyLanguage(lang);
          langDropdown.classList.remove('show');
        });
      });
    }

    // Modal Triggers
    const openModalBtn = document.getElementById('header-cta-btn');
    const modalOverlay = document.getElementById('consultation-modal');
    const modalCloseBtn = document.getElementById('modal-close-button');

    if (openModalBtn && modalOverlay) {
      openModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('open');
      });
    }

    if (modalCloseBtn && modalOverlay) {
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('open');
        }
      });
    }

    // Mobile Drawer
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileClose = document.getElementById('mobile-drawer-close');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
    }
    if (mobileClose && mobileDrawer) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    }

    // Close mobile drawer when clicking a mobile nav link
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('mobile-link') && mobileDrawer) {
        mobileDrawer.classList.remove('open');
      }
    });
  }

  closeModal() {
    const modalOverlay = document.getElementById('consultation-modal');
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.shatApp = new App();
});

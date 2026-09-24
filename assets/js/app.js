// Shat Company Platform - Main Application Controller

import { translations } from './translations.js';
import { router } from './router.js';
import { submitConsultation } from './supabaseClient.js';
import { authService } from './auth.js';

class App {
  constructor() {
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.bindEvents();
    this.initAuthUI();
    router.init(this.currentLang);

    // Auto-hide Visual Loading Screen (Header z-index: 1000, Loader z-index: 900)
    const loader = document.getElementById('shat-page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 350);
    }
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
        <a href="#/discover" class="nav-link" data-route="discover"><span class="nav-num-badge">01</span><span>${t.nav.s01 || 'اكتشف SHAT'}</span></a>
        <a href="#/our-story" class="nav-link" data-route="our-story"><span class="nav-num-badge">02</span><span>${t.nav.s02 || 'قصتنا'}</span></a>
        <a href="#/what-we-make" class="nav-link" data-route="what-we-make"><span class="nav-num-badge">03</span><span>${t.nav.s03 || 'ماذا نصنع؟'}</span></a>
        <a href="#/tracks" class="nav-link" data-route="tracks"><span class="nav-num-badge">04</span><span>${t.nav.s04 || 'مساراتنا'}</span></a>
        <a href="#/experiences" class="nav-link" data-route="experiences"><span class="nav-num-badge">05</span><span>${t.nav.s05 || 'تجاربنا'}</span></a>
        <a href="#/impact" class="nav-link" data-route="impact"><span class="nav-num-badge">06</span><span>${t.nav.s06 || 'أثرنا'}</span></a>
        <a href="#/knowledge-hub" class="nav-link" data-route="knowledge-hub"><span class="nav-num-badge">07</span><span>${t.nav.s07 || 'مساحة المعرفة'}</span></a>
        <a href="#/build-impact" class="nav-link" data-route="build-impact"><span class="nav-num-badge">08</span><span>${t.nav.s08 || 'لنبني الأثر معًا'}</span></a>
        <a href="#/academy" class="nav-academy-badge" data-route="academy"><span>🎓</span><span>${t.nav.academy || 'نظام المودل'}</span></a>
      `;
    }

    // Language selector current text
    const langBtnText = document.getElementById('current-lang-text');
    if (langBtnText) {
      langBtnText.innerHTML = `${t.flag} ${t.langName}`;
    }

    // Header CTA
    const headerCta = document.getElementById('header-cta-btn');
    if (headerCta) {
      headerCta.textContent = t.nav.requestConsultation || 'طلب استشارة';
    }

    // Top Notice Pills & Motto
    const topMotto = document.getElementById('top-bar-motto');
    if (topMotto) topMotto.textContent = t.companyMotto;
    const pillTraining = document.getElementById('top-pill-training');
    if (pillTraining) pillTraining.textContent = t.pillTraining;
    const pillConsulting = document.getElementById('top-pill-consulting');
    if (pillConsulting) pillConsulting.textContent = t.pillConsulting;

    // Mobile Drawer Links (Numbered 01 to 08 + Moodle)
    const mobileNavList = document.getElementById('mobile-nav-links');
    if (mobileNavList) {
      mobileNavList.innerHTML = `
        <a href="#/discover" class="mobile-link" data-route="discover"><span class="nav-num-badge">01</span> ${t.nav.s01 || 'اكتشف SHAT'}</a>
        <a href="#/our-story" class="mobile-link" data-route="our-story"><span class="nav-num-badge">02</span> ${t.nav.s02 || 'قصتنا'}</a>
        <a href="#/what-we-make" class="mobile-link" data-route="what-we-make"><span class="nav-num-badge">03</span> ${t.nav.s03 || 'ماذا نصنع؟'}</a>
        <a href="#/tracks" class="mobile-link" data-route="tracks"><span class="nav-num-badge">04</span> ${t.nav.s04 || 'مساراتنا'}</a>
        <a href="#/experiences" class="mobile-link" data-route="experiences"><span class="nav-num-badge">05</span> ${t.nav.s05 || 'تجاربنا'}</a>
        <a href="#/impact" class="mobile-link" data-route="impact"><span class="nav-num-badge">06</span> ${t.nav.s06 || 'أثرنا'}</a>
        <a href="#/knowledge-hub" class="mobile-link" data-route="knowledge-hub"><span class="nav-num-badge">07</span> ${t.nav.s07 || 'مساحة المعرفة'}</a>
        <a href="#/build-impact" class="mobile-link" data-route="build-impact"><span class="nav-num-badge">08</span> ${t.nav.s08 || 'لنبني الأثر معًا'}</a>
        <div style="border-top: 1px solid var(--border-subtle); margin: 6px 0; padding-top: 8px;">
          <a href="#/academy" class="mobile-link" style="color: var(--shat-green-700); font-weight: 800;">
            🎓 ${t.nav.academy || 'أكاديمية SHAT (نظام المودل)'}
          </a>
        </div>
        <div style="margin-top: 10px; padding: 12px; background: var(--shat-navy-50); border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--shat-navy-900);">
          <div style="font-weight: 700; margin-bottom: 4px;">تواصل مؤسسي سريع:</div>
          <div>✆ +972592879621</div>
          <div>✉ shat.company26@gmail.com</div>
        </div>
      `;
    }
  }

  renderFooter(t) {
    const footerAbout = document.getElementById('footer-about-text');
    if (footerAbout) footerAbout.textContent = t.footer?.aboutText || 'شركة شات للتنمية والتطوير — شركة متخصصة في التدريب، بناء القدرات، الاستشارات والتطوير المؤسسي.';

    const footerQuickTitle = document.getElementById('footer-quick-title');
    if (footerQuickTitle) footerQuickTitle.textContent = 'الأقسام المؤسسية';

    const footerLinks = document.getElementById('footer-links');
    if (footerLinks) {
      footerLinks.innerHTML = `
        <a href="#/discover">${t.nav.s01 || '01 — اكتشف SHAT'}</a>
        <a href="#/our-story">${t.nav.s02 || '02 — قصتنا'}</a>
        <a href="#/what-we-make">${t.nav.s03 || '03 — ماذا نصنع؟'}</a>
        <a href="#/tracks">${t.nav.s04 || '04 — مساراتنا'}</a>
        <a href="#/experiences">${t.nav.s05 || '05 — تجاربنا'}</a>
        <a href="#/impact">${t.nav.s06 || '06 — أثرنا'}</a>
        <a href="#/knowledge-hub">${t.nav.s07 || '07 — مساحة المعرفة'}</a>
        <a href="#/build-impact">${t.nav.s08 || '08 — لنبني الأثر معًا'}</a>
        <a href="#/academy" style="color: #a7f3d0; font-weight: 700;">🎓 أكاديمية SHAT (نظام المودل)</a>
      `;
    }
  }

  renderModal(t) {
    const modalContent = document.getElementById('consultation-modal-content');
    if (modalContent) {
      const ct = t.contact;
      modalContent.innerHTML = `
        <h2 style="font-size: 1.45rem; color: var(--shat-navy-950); margin-bottom: 8px;">${ct.formTitle}</h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">${ct.formSubtitle}</p>
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
              ${ct.serviceOptions ? ct.serviceOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('') : '<option value="تدريب">تدريب وبناء قدرات</option>'}
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

  initAuthUI() {
    const authBtn = document.getElementById('header-auth-btn');
    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-modal-close-btn');

    const tabWa = document.getElementById('tab-auth-whatsapp');
    const tabGoogle = document.getElementById('tab-auth-google');
    const paneWa = document.getElementById('auth-pane-whatsapp');
    const paneGoogle = document.getElementById('auth-pane-google');

    const stepPhone = document.getElementById('otp-step-phone');
    const stepVerify = document.getElementById('otp-step-verify');
    const waTargetDisplay = document.getElementById('wa-display-target');
    const demoCodeAlert = document.getElementById('wa-demo-code-alert');

    const btnSendOtp = document.getElementById('btn-send-wa-otp');
    const btnVerifyOtp = document.getElementById('btn-verify-otp');
    const btnBackPhone = document.getElementById('btn-back-phone');
    const btnGoogleLogin = document.getElementById('btn-google-login-action');

    const updateAuthBtn = () => {
      const user = authService.getCurrentUser();
      const label = document.getElementById('auth-btn-label');
      if (user && label) {
        label.textContent = `${user.roleTitle}: ${user.name}`;
        authBtn.classList.add('logged-in');
      } else if (label) {
        label.textContent = 'دخول / حسابي';
        authBtn.classList.remove('logged-in');
      }
    };

    updateAuthBtn();

    if (authBtn && authModal) {
      authBtn.addEventListener('click', () => {
        authModal.classList.add('open');
      });
    }

    if (authCloseBtn && authModal) {
      authCloseBtn.addEventListener('click', () => {
        authModal.classList.remove('open');
      });
    }

    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.classList.remove('open');
      });
    }

    // Tabs toggle
    if (tabWa && tabGoogle && paneWa && paneGoogle) {
      tabWa.addEventListener('click', () => {
        tabWa.classList.add('active');
        tabGoogle.classList.remove('active');
        paneWa.style.display = 'block';
        paneGoogle.style.display = 'none';
      });

      tabGoogle.addEventListener('click', () => {
        tabGoogle.classList.add('active');
        tabWa.classList.remove('active');
        paneGoogle.style.display = 'block';
        paneWa.style.display = 'none';
      });
    }

    // Send WhatsApp OTP via WaForge
    if (btnSendOtp) {
      btnSendOtp.addEventListener('click', async () => {
        const phone = document.getElementById('auth-wa-phone')?.value.trim() || '';
        const role = document.getElementById('auth-user-role')?.value || 'student';

        if (!phone) {
          alert('يرجى كتابة رقم واتساب كامل مع رمز الدولة (مثال: +972592879621)');
          return;
        }

        btnSendOtp.disabled = true;
        btnSendOtp.textContent = '... جارٍ الإرسال عبر WaForge';

        const res = await authService.sendWhatsAppOtp(phone, role);

        btnSendOtp.disabled = false;
        btnSendOtp.textContent = 'إرسال رمز التحقق عبر واتساب (WaForge)';

        if (stepPhone && stepVerify) {
          stepPhone.style.display = 'none';
          stepVerify.style.display = 'block';
          if (waTargetDisplay) waTargetDisplay.textContent = phone;
          if (demoCodeAlert) demoCodeAlert.textContent = `رمز التحقق الخاص بك هو: [ ${res.otpCode} ]`;

          // Auto-fill first box for smooth experience
          document.getElementById('otp-d1')?.focus();
        }
      });
    }

    if (btnBackPhone && stepPhone && stepVerify) {
      btnBackPhone.addEventListener('click', () => {
        stepVerify.style.display = 'none';
        stepPhone.style.display = 'block';
      });
    }

    // OTP Input auto-advance
    const otpInputs = [
      document.getElementById('otp-d1'),
      document.getElementById('otp-d2'),
      document.getElementById('otp-d3'),
      document.getElementById('otp-d4'),
      document.getElementById('otp-d5'),
      document.getElementById('otp-d6')
    ].filter(Boolean);

    otpInputs.forEach((inp, idx) => {
      inp.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && idx < otpInputs.length - 1) {
          otpInputs[idx + 1].focus();
        }
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          otpInputs[idx - 1].focus();
        }
      });
    });

    // Verify OTP
    if (btnVerifyOtp) {
      btnVerifyOtp.addEventListener('click', () => {
        const code = otpInputs.map(inp => inp.value).join('');
        if (code.length < 6) {
          alert('يرجى إدخال الرمز المكون من 6 أرقام');
          return;
        }

        const res = authService.verifyOtp(code);
        if (res.success) {
          alert(`✓ مرحباً بك! تم تسجيل الدخول بنجاح بصفتك (${res.user.roleTitle}).`);
          authModal.classList.remove('open');
          updateAuthBtn();

          // If role is teacher or admin, switch to moodle view
          window.location.hash = '#/academy';
          setTimeout(() => {
            if (res.user.role === 'instructor') {
              document.querySelector('[data-tab="tab-moodle-teacher"]')?.click();
            } else if (res.user.role === 'admin') {
              document.querySelector('[data-tab="tab-moodle-admin"]')?.click();
            } else {
              document.querySelector('[data-tab="tab-moodle-student"]')?.click();
            }
          }, 300);
        } else {
          alert(res.error || 'رمز التحقق غير صحيح');
        }
      });
    }

    // Google Login Action
    if (btnGoogleLogin) {
      btnGoogleLogin.addEventListener('click', () => {
        const user = authService.loginWithGoogle();
        alert(`✓ تم تسجيل الدخول بحساب Google المؤسسي بنجاح.`);
        authModal.classList.remove('open');
        updateAuthBtn();
        window.location.hash = '#/academy';
      });
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

    // Consultation Modal Triggers
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

    // Mobile Drawer Triggers
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileClose = document.getElementById('mobile-drawer-close');
    const bottomMenuBtn = document.getElementById('bottom-bar-menu-btn');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
    }
    if (bottomMenuBtn && mobileDrawer) {
      bottomMenuBtn.addEventListener('click', () => {
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

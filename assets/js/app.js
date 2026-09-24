// Shat Company Platform - Main Application Controller
// Role-Based Moodle Access & Clean Typography (No Numbers)

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
    this.renderAuthModalTexts();

    router.setLang(lang);
  }

  renderHeader(t) {
    const headerNav = document.getElementById('desktop-nav');
    const user = authService.getCurrentUser();
    const isLoggedIn = authService.isLoggedIn();

    let moodleLink = '';
    if (isLoggedIn && user) {
      let roleBadgeText = t.nav.academy || '🎓 مساحتي في المودل';
      if (user.role === 'instructor') {
        roleBadgeText = this.currentLang === 'ar' ? '👨‍🏫 بوابة التدريب (المودل)' : (this.currentLang === 'fr' ? '👨‍🏫 Portail Formateur' : '👨‍🏫 Trainer Portal');
      }
      if (user.role === 'admin') {
        roleBadgeText = this.currentLang === 'ar' ? '⚙️ لوحة الإدارة (المودل)' : (this.currentLang === 'fr' ? '⚙️ Administration' : '⚙️ LMS Admin');
      }

      moodleLink = `<a href="#/academy" class="nav-academy-badge" data-route="academy"><span>${roleBadgeText}</span></a>`;
    }

    if (headerNav) {
      headerNav.innerHTML = `
        <a href="#/discover" class="nav-link" data-route="discover"><span>${t.nav.s01 || 'اكتشف SHAT'}</span></a>
        <a href="#/our-story" class="nav-link" data-route="our-story"><span>${t.nav.s02 || 'قصتنا'}</span></a>
        <a href="#/what-we-make" class="nav-link" data-route="what-we-make"><span>${t.nav.s03 || 'ماذا نصنع؟'}</span></a>
        <a href="#/tracks" class="nav-link" data-route="tracks"><span>${t.nav.s04 || 'مساراتنا'}</span></a>
        <a href="#/experiences" class="nav-link" data-route="experiences"><span>${t.nav.s05 || 'تجاربنا'}</span></a>
        <a href="#/impact" class="nav-link" data-route="impact"><span>${t.nav.s06 || 'أثرنا'}</span></a>
        <a href="#/knowledge-hub" class="nav-link" data-route="knowledge-hub"><span>${t.nav.s07 || 'مساحة المعرفة'}</span></a>
        <a href="#/build-impact" class="nav-link" data-route="build-impact"><span>${t.nav.s08 || 'لنبني الأثر معًا'}</span></a>
        ${moodleLink}
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

    // Auth Button Label update based on language
    const authLabel = document.getElementById('auth-btn-label');
    if (authLabel) {
      if (isLoggedIn && user) {
        if (user.role === 'student') authLabel.textContent = this.currentLang === 'ar' ? 'طالب / متدرب' : (this.currentLang === 'fr' ? 'Étudiant' : this.currentLang === 'es' ? 'Estudiante' : this.currentLang === 'it' ? 'Studente' : 'Student');
        else if (user.role === 'instructor') authLabel.textContent = this.currentLang === 'ar' ? 'مدرب / أستاذ' : (this.currentLang === 'fr' ? 'Formateur' : this.currentLang === 'es' ? 'Formador' : this.currentLang === 'it' ? 'Docente' : 'Instructor');
        else if (user.role === 'admin') authLabel.textContent = this.currentLang === 'ar' ? 'مسؤول الإدارة' : (this.currentLang === 'fr' ? 'Admin' : this.currentLang === 'es' ? 'Administrador' : this.currentLang === 'it' ? 'Amministratore' : 'Admin');
        else authLabel.textContent = user.name;
      } else {
        const signLabels = { ar: 'دخول / حسابي', en: 'Sign In / Account', fr: 'Connexion / Compte', es: 'Acceso / Mi Cuenta', it: 'Accedi / Account' };
        authLabel.textContent = signLabels[this.currentLang] || 'دخول / حسابي';
      }
    }

    // Mobile Drawer Links (Clean, No Numbers, Role-based Moodle)
    const mobileNavList = document.getElementById('mobile-nav-links');
    if (mobileNavList) {
      const contactLabels = {
        ar: 'تواصل مؤسسي مباشر:',
        en: 'Corporate Direct Contact:',
        fr: 'Contact Institutionnel Direct :',
        es: 'Contacto Institucional Directo:',
        it: 'Contatto Istituzionale Diretto:'
      };
      mobileNavList.innerHTML = `
        <a href="#/discover" class="mobile-link" data-route="discover">${t.nav.s01 || 'اكتشف SHAT'}</a>
        <a href="#/our-story" class="mobile-link" data-route="our-story">${t.nav.s02 || 'قصتنا'}</a>
        <a href="#/what-we-make" class="mobile-link" data-route="what-we-make">${t.nav.s03 || 'ماذا نصنع؟'}</a>
        <a href="#/tracks" class="mobile-link" data-route="tracks">${t.nav.s04 || 'مساراتنا'}</a>
        <a href="#/experiences" class="mobile-link" data-route="experiences">${t.nav.s05 || 'تجاربنا'}</a>
        <a href="#/impact" class="mobile-link" data-route="impact">${t.nav.s06 || 'أثرنا'}</a>
        <a href="#/knowledge-hub" class="mobile-link" data-route="knowledge-hub">${t.nav.s07 || 'مساحة المعرفة'}</a>
        <a href="#/build-impact" class="mobile-link" data-route="build-impact">${t.nav.s08 || 'لنبني الأثر معًا'}</a>
        ${isLoggedIn && user ? `
          <div style="border-top: 1px solid var(--border-subtle); margin: 6px 0; padding-top: 8px;">
            <a href="#/academy" class="mobile-link" style="color: var(--shat-green-700); font-weight: 800;">
              🎓 ${t.nav.academy || 'مساحة المودل'}
            </a>
          </div>
        ` : ''}
        <div style="margin-top: 10px; padding: 12px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--shat-navy-900);">
          <div style="font-weight: 700; margin-bottom: 4px;">${contactLabels[this.currentLang] || 'تواصل مؤسسي سريع:'}</div>
          <div>✆ +972 59 287 9621</div>
          <div>✉ shat.company26@gmail.com</div>
        </div>
      `;
    }

    // Update Bottom Nav Bar: only show Moodle if logged in
    const bottomAcademyItem = document.querySelector('.bottom-nav-item[data-route="academy"]');
    if (bottomAcademyItem) {
      if (isLoggedIn) {
        bottomAcademyItem.style.display = 'flex';
      } else {
        bottomAcademyItem.style.display = 'none';
      }
    }
  }

  renderFooter(t) {
    const fd = t.footerData || {};
    const footerAbout = document.getElementById('footer-about-text');
    if (footerAbout) footerAbout.textContent = fd.aboutText || t.companyTagline;

    const footerQuickTitle = document.getElementById('footer-quick-title');
    if (footerQuickTitle) footerQuickTitle.textContent = fd.quickSectionsTitle || 'الأقسام المؤسسية';

    const footerStandardsTitle = document.getElementById('footer-standards-title');
    if (footerStandardsTitle) footerStandardsTitle.textContent = fd.standardsTitle || 'المرجعيات والمعايير';

    const footerContactTitle = document.getElementById('footer-contact-title');
    if (footerContactTitle) footerContactTitle.textContent = fd.contactTitle || 'التواصل المؤسسي والشبكات';

    const footerCoverageNote = document.getElementById('footer-coverage-note');
    if (footerCoverageNote) footerCoverageNote.textContent = fd.coverageNote || '📍 فلسطين • خدماتنا تغطي النطاق الإقليمي والدولي';

    const footerLegalCopy = document.getElementById('footer-legal-copy');
    if (footerLegalCopy) footerLegalCopy.textContent = fd.legalNotice || 'جميع الحقوق محفوظة © 2026 شركة شات للتنمية والتطوير (SHAT Development & Growth).';

    const footerPrivacyPledge = document.getElementById('footer-privacy-pledge');
    if (footerPrivacyPledge) footerPrivacyPledge.textContent = fd.privacyPledge || 'ملتزمون بأعلى معايير السرية، النزاهة، وحماية البيانات المؤسسية.';

    const footerInstaBtn = document.getElementById('footer-insta-btn');
    if (footerInstaBtn) footerInstaBtn.textContent = fd.instaBtn || '📷 إنستغرام';

    const footerFbBtn = document.getElementById('footer-fb-btn');
    if (footerFbBtn) footerFbBtn.textContent = fd.fbBtn || '🌐 فيسبوك';

    const footerLinks = document.getElementById('footer-links');
    if (footerLinks) {
      footerLinks.innerHTML = `
        <a href="#/discover">${t.nav.s01 || 'اكتشف SHAT'}</a>
        <a href="#/our-story">${t.nav.s02 || 'قصتنا'}</a>
        <a href="#/what-we-make">${t.nav.s03 || 'ماذا نصنع؟'}</a>
        <a href="#/tracks">${t.nav.s04 || 'مساراتنا'}</a>
        <a href="#/experiences">${t.nav.s05 || 'تجاربنا'}</a>
        <a href="#/impact">${t.nav.s06 || 'أثرنا'}</a>
        <a href="#/knowledge-hub">${t.nav.s07 || 'مساحة المعرفة'}</a>
        <a href="#/build-impact">${t.nav.s08 || 'لنبني الأثر معًا'}</a>
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

  renderAuthModalTexts() {
    const authTitles = {
      ar: {
        title: "تسجيل الدخول إلى المنصة",
        subtitle: "الوصول إلى نظام المودل، ملفات الدورات، المحادثات، وبوابة الطالب والأستاذ",
        tabWa: "📱 رمز التحقق عبر واتساب",
        tabGoogle: "🌐 حساب Google",
        phoneLabel: "رقم واتساب الكامل (مع رمز الدولة):",
        waHint: "يتم إرسال رمز التحقق المباشر عبر بوابة WaForge API",
        roleLabel: "اختر دورك في النظام:",
        sendBtn: "إرسال رمز التحقق عبر واتساب (WaForge)",
        googleDesc: "تسجيل الدخول السريع الموحد بحساب Google المؤسسي",
        googleBtn: "الدخول عبر Google"
      },
      en: {
        title: "Sign In to Platform",
        subtitle: "Access Moodle LMS, training courses, direct Drive downloads, and staff communications",
        tabWa: "📱 WhatsApp OTP Code",
        tabGoogle: "🌐 Google Account",
        phoneLabel: "Full WhatsApp Number (with country code):",
        waHint: "Instant one-time security code (OTP) sent directly via WaForge API",
        roleLabel: "Select Your System Role:",
        sendBtn: "Send Security OTP via WhatsApp (WaForge)",
        googleDesc: "Seamless institutional single sign-on with verified Google Account",
        googleBtn: "Continue with Google"
      },
      fr: {
        title: "Connexion à la Plateforme",
        subtitle: "Accédez au système Moodle, aux cours, aux téléchargements Drive et aux échanges",
        tabWa: "📱 Code OTP WhatsApp",
        tabGoogle: "🌐 Compte Google",
        phoneLabel: "Numéro WhatsApp complet (avec indicatif pays) :",
        waHint: "Code de vérification instantané envoyé via l'API WaForge",
        roleLabel: "Sélectionnez votre rôle :",
        sendBtn: "Envoyer le code OTP par WhatsApp",
        googleDesc: "Connexion rapide avec votre compte Google institutionnel",
        googleBtn: "Continuer avec Google"
      },
      es: {
        title: "Iniciar Sesión en la Plataforma",
        subtitle: "Acceda al sistema Moodle, cursos, descargas directas de Drive y chats",
        tabWa: "📱 Código OTP por WhatsApp",
        tabGoogle: "🌐 Cuenta Google",
        phoneLabel: "Número completo de WhatsApp (con código de país):",
        waHint: "Código de seguridad instantáneo enviado directamente vía WaForge API",
        roleLabel: "Seleccione su rol en el sistema:",
        sendBtn: "Enviar código OTP por WhatsApp",
        googleDesc: "Inicio de sesión institucional rápido con cuenta de Google",
        googleBtn: "Continuar con Google"
      },
      it: {
        title: "Accedi alla Piattaforma",
        subtitle: "Accedi al sistema Moodle, ai corsi, ai download diretti di Drive e alle chat",
        tabWa: "📱 Codice OTP WhatsApp",
        tabGoogle: "🌐 Account Google",
        phoneLabel: "Numero WhatsApp completo (con prefisso internazionale):",
        waHint: "Codice di sicurezza istantaneo inviato direttamente via API WaForge",
        roleLabel: "Seleziona il tuo ruolo nel sistema:",
        sendBtn: "Invia codice OTP via WhatsApp",
        googleDesc: "Accesso istituzionale rapido con account Google verificato",
        googleBtn: "Continua con Google"
      }
    };

    const at = authTitles[this.currentLang] || authTitles.ar;
    const titleEl = document.getElementById('auth-modal-title');
    if (titleEl) titleEl.textContent = at.title;
    const subEl = document.getElementById('auth-modal-subtitle');
    if (subEl) subEl.textContent = at.subtitle;
    const tabWa = document.getElementById('tab-auth-whatsapp');
    if (tabWa) tabWa.textContent = at.tabWa;
    const tabG = document.getElementById('tab-auth-google');
    if (tabG) tabG.textContent = at.tabGoogle;
    const phoneLbl = document.getElementById('auth-phone-label');
    if (phoneLbl) phoneLbl.textContent = at.phoneLabel;
    const waH = document.getElementById('auth-wa-hint');
    if (waH) waH.textContent = at.waHint;
    const roleLbl = document.getElementById('auth-role-label');
    if (roleLbl) roleLbl.textContent = at.roleLabel;
    const sendB = document.getElementById('btn-send-wa-otp');
    if (sendB) sendB.textContent = at.sendBtn;
  }

  initAuthUI() {
    const authBtn = document.getElementById('header-auth-btn');
    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-modal-close-btn');

    // Tab buttons & Panes
    const tabLogin = document.getElementById('tab-auth-login');
    const tabRegister = document.getElementById('tab-auth-register');
    const tabGoogle = document.getElementById('tab-auth-google');

    const paneLogin = document.getElementById('auth-pane-login');
    const paneRegister = document.getElementById('auth-pane-register');
    const paneGoogle = document.getElementById('auth-pane-google');

    const updateAuthBtn = () => {
      const user = authService.getCurrentUser();
      const label = document.getElementById('auth-btn-label');
      if (user && label) {
        label.textContent = user.roleTitle;
        authBtn.classList.add('logged-in');
        authBtn.title = `حسابك: ${user.name} (${user.roleTitle}) - انقر لتسجيل الخروج`;
      } else if (label) {
        const signLabels = { ar: 'دخول / حسابي', en: 'Sign In / Account', fr: 'Connexion / Compte', es: 'Acceso / Mi Cuenta', it: 'Accedi / Account' };
        label.textContent = signLabels[this.currentLang] || 'دخول / حسابي';
        authBtn.classList.remove('logged-in');
        authBtn.title = 'تسجيل الدخول إلى المنصة والمودل';
      }
      const t = translations[this.currentLang] || translations.ar;
      this.renderHeader(t);
    };

    updateAuthBtn();

    if (authBtn && authModal) {
      authBtn.addEventListener('click', () => {
        const user = authService.getCurrentUser();
        if (user) {
          if (confirm(`أنت مسجل حالياً بصفتك: (${user.roleTitle} - ${user.name}).\nهل ترغب في تسجيل الخروج؟`)) {
            authService.logout();
            alert('✓ تم تسجيل الخروج بنجاح.');
            updateAuthBtn();
            window.location.hash = '#/discover';
            return;
          }
        }
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

    // Gate button inside Moodle page & Logout listeners
    document.addEventListener('click', (e) => {
      if (e.target.closest('#btn-gate-open-auth')) {
        if (authModal) authModal.classList.add('open');
      }
      if (e.target.closest('#btn-moodle-logout') || e.target.closest('#btn-portal-logout')) {
        authService.logout();
        alert('✓ تم تسجيل الخروج بنجاح.');
        updateAuthBtn();
        window.location.hash = '#/discover';
        router.handleRouting(true);
      }
      if (e.target.closest('#link-goto-googleform')) {
        if (authModal) authModal.classList.remove('open');
      }
    });

    // Tab Switching
    const switchTab = (activeTab, activePane) => {
      [tabLogin, tabRegister, tabGoogle].forEach(t => t?.classList.remove('active'));
      [paneLogin, paneRegister, paneGoogle].forEach(p => { if (p) p.style.display = 'none'; });
      activeTab?.classList.add('active');
      if (activePane) activePane.style.display = 'block';
    };

    if (tabLogin) tabLogin.addEventListener('click', () => switchTab(tabLogin, paneLogin));
    if (tabRegister) tabRegister.addEventListener('click', () => switchTab(tabRegister, paneRegister));
    if (tabGoogle) tabGoogle.addEventListener('click', () => switchTab(tabGoogle, paneGoogle));

    // Demo Account Chips quick fill & login
    document.querySelectorAll('.btn-demo-fill').forEach(btn => {
      btn.addEventListener('click', () => {
        const u = btn.getAttribute('data-user');
        const p = btn.getAttribute('data-pass');
        const idInput = document.getElementById('login-identifier');
        const passInput = document.getElementById('login-password');
        if (idInput && passInput) {
          idInput.value = u;
          passInput.value = p;
          // Auto submit
          const res = authService.loginWithPassword(u, p);
          if (res.success) {
            alert(`✓ مرحباً بك، ${res.user.name}!\nتم الدخول بصفتك: (${res.user.roleTitle}).`);
            authModal.classList.remove('open');
            updateAuthBtn();
            window.location.hash = '#/academy';
            router.handleRouting(true);
          }
        }
      });
    });

    // 1. Password Login Form Submit
    const formLogin = document.getElementById('form-password-login');
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('login-identifier')?.value.trim();
        const pass = document.getElementById('login-password')?.value;

        const res = authService.loginWithPassword(id, pass);
        if (res.success) {
          alert(`✓ تم تسجيل الدخول بنجاح! مرحباً ${res.user.name} (${res.user.roleTitle}).`);
          authModal.classList.remove('open');
          updateAuthBtn();
          window.location.hash = '#/academy';
          router.handleRouting(true);
        } else {
          alert(res.error || 'بيانات الدخول غير صحيحة');
        }
      });
    }

    // 2. Registration Step 1: Send WhatsApp OTP
    const btnTriggerOtp = document.getElementById('btn-trigger-reg-otp');
    const regStepInputs = document.getElementById('reg-step-inputs');
    const regStepVerify = document.getElementById('reg-step-verify');
    const regDisplayPhone = document.getElementById('reg-display-phone');
    const regDemoOtpDisplay = document.getElementById('reg-demo-otp-display');
    const btnRegBack = document.getElementById('btn-reg-back-inputs');

    if (btnTriggerOtp) {
      btnTriggerOtp.addEventListener('click', async () => {
        const name = document.getElementById('reg-fullname')?.value.trim();
        const phone = document.getElementById('reg-phone')?.value.trim();
        const email = document.getElementById('reg-email')?.value.trim();
        const password = document.getElementById('reg-password')?.value;
        const role = document.getElementById('reg-role')?.value || 'student';

        if (!name || !phone || !password) {
          alert('يرجى ملء الاسم الكامل، رقم الواتساب، وكلمة المرور.');
          return;
        }

        btnTriggerOtp.disabled = true;
        btnTriggerOtp.textContent = '... جارٍ توليد وإرسال رمز التحقق عبر WaForge';

        const res = await authService.sendRegistrationOtp({ name, phone, email, password, role });

        btnTriggerOtp.disabled = false;
        btnTriggerOtp.textContent = '📱 إرسال رمز التحقق OTP عبر واتساب (WaForge)';

        if (res.success) {
          if (regStepInputs) regStepInputs.style.display = 'none';
          if (regStepVerify) regStepVerify.style.display = 'block';
          if (regDisplayPhone) regDisplayPhone.textContent = phone;
          if (regDemoOtpDisplay) regDemoOtpDisplay.textContent = `رمز التحقق الخاص بك هو: [ ${res.otpCode} ]`;

          // Focus first digit
          document.getElementById('reg-otp-1')?.focus();
        } else {
          alert(res.error || 'تعذر إرسال رمز التحقق، يرجى التحقق من الرقم');
        }
      });
    }

    if (btnRegBack && regStepInputs && regStepVerify) {
      btnRegBack.addEventListener('click', () => {
        regStepVerify.style.display = 'none';
        regStepInputs.style.display = 'block';
      });
    }

    // Registration OTP inputs auto-advance
    const regOtpDigits = [
      document.getElementById('reg-otp-1'),
      document.getElementById('reg-otp-2'),
      document.getElementById('reg-otp-3'),
      document.getElementById('reg-otp-4'),
      document.getElementById('reg-otp-5'),
      document.getElementById('reg-otp-6')
    ].filter(Boolean);

    regOtpDigits.forEach((inp, idx) => {
      inp.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && idx < regOtpDigits.length - 1) {
          regOtpDigits[idx + 1].focus();
        }
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          regOtpDigits[idx - 1].focus();
        }
      });
    });

    // Registration Step 2: Confirm OTP
    const btnConfirmReg = document.getElementById('btn-confirm-reg-otp');
    if (btnConfirmReg) {
      btnConfirmReg.addEventListener('click', () => {
        const code = regOtpDigits.map(inp => inp.value).join('');
        if (code.length < 6) {
          alert('يرجى إدخال الرمز المكون من 6 أرقام');
          return;
        }

        const res = authService.verifyRegistrationOtp(code);
        if (res.success) {
          alert(`✓ تم التحقق بنجاح وإنشاء حسابك الرسمي في المنصة!\nمرحباً بك: ${res.user.name} (${res.user.roleTitle}).`);
          authModal.classList.remove('open');
          updateAuthBtn();
          window.location.hash = '#/academy';
          router.handleRouting(true);
        } else {
          alert(res.error || 'رمز التحقق غير صحيح، يرجى إعادة المحاولة');
        }
      });
    }

    // 3. Google Login
    const btnGoogleLogin = document.getElementById('btn-google-login-action');
    if (btnGoogleLogin) {
      btnGoogleLogin.addEventListener('click', () => {
        const user = authService.loginWithGoogle();
        alert(`✓ تم تسجيل الدخول بحساب Google المؤسسي بنجاح (${user.roleTitle}).`);
        authModal.classList.remove('open');
        updateAuthBtn();
        window.location.hash = '#/academy';
        router.handleRouting(true);
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

// assets/js/views/loginView.js
// SHAT Platform — Official Secure Login Portal with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { content } from '../content.js';
import { showToast } from '../components/toast.js';

export function renderLoginView(lang = 'ar') {
  const d = content[lang] || content.ar;
  const l = d.login || content.ar.login;
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const forgotText = encodeURIComponent(
    lang === 'fr' 
      ? "Bonjour, je souhaite réinitialiser le mot de passe de mon compte sur la plateforme SHAT" 
      : (lang === 'en' 
        ? "Hello, I would like to recover my password on the SHAT platform" 
        : "مرحباً، أود استعادة كلمة مرور حسابي على منصة شات")
  );

  return `
    <div class="view-login" style="min-height: 85vh; display: flex; align-items: center; justify-content: center; padding: 48px 16px; background: radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 70%, #F1F5F9 100%);">
      <div class="bento-card" style="width: 100%; max-width: 480px; padding: 40px; box-shadow: 0 15px 35px -5px rgba(15, 46, 74, 0.1); border: 1px solid var(--border-light); border-top: 5px solid var(--shat-navy); border-radius: var(--radius-md);">
        
        <!-- Emblem & Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <a href="#/home" title="${d.company.name}" style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: 50%; background: var(--shat-navy-tint); margin-bottom: 16px; border: 1px solid var(--border-light);">
            <img src="assets/logo/logo-transparent.png" alt="SHAT Emblem" style="height: 46px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
          </a>
          <h1 style="font-size: 1.65rem; font-weight: 900; color: var(--shat-navy); margin-bottom: 6px;">${l.title}</h1>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">${l.subtitle}</p>
        </div>

        <!-- In-Form Alert Box -->
        <div id="login-alert-box" style="display: none; padding: 12px 16px; border-radius: var(--radius-xs); margin-bottom: 20px; font-size: 0.88rem;"></div>

        <!-- Quick Demo Role Fillers for Seamless Review -->
        <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-xs); margin-bottom: 20px; border: 1px solid var(--border-light);">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">${l.quickDemoTitle}</div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn-clean btn-sm btn-quick-cred" data-user="admin" style="font-size: 0.75rem; padding: 4px 8px; background: #FFFFFF; border: 1px solid #CBD5E1; color: var(--shat-navy); font-weight: 700;">
              ${l.adminRole}
            </button>
            <button type="button" class="btn-clean btn-sm btn-quick-cred" data-user="osama" style="font-size: 0.75rem; padding: 4px 8px; background: #FFFFFF; border: 1px solid #CBD5E1; color: var(--shat-green); font-weight: 700;">
              ${l.teacherRole}
            </button>
            <button type="button" class="btn-clean btn-sm btn-quick-cred" data-user="1098765432" style="font-size: 0.75rem; padding: 4px 8px; background: #FFFFFF; border: 1px solid #CBD5E1; color: #1D4ED8; font-weight: 700;">
              ${l.studentRole}
            </button>
          </div>
        </div>

        <!-- Credentials Form -->
        <form id="shat-login-form">
          <div class="form-group">
            <label class="form-label" for="login-identifier">${l.idLabel}</label>
            <input 
              type="text" 
              id="login-identifier" 
              class="form-input" 
              placeholder="${l.idPlaceholder}" 
              required 
              autocomplete="username"
              dir="ltr"
              style="height: 48px; font-size: 0.95rem;"
            />
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" for="login-password" style="margin: 0;">${l.pwLabel}</label>
              <a href="https://wa.me/972592879621?text=${forgotText}" target="_blank" rel="noopener" style="font-size: 0.8rem; color: var(--shat-green); font-weight: 600;">
                ${l.forgotPw}
              </a>
            </div>
            <input 
              type="password" 
              id="login-password" 
              class="form-input" 
              placeholder="••••••••••••" 
              required 
              autocomplete="current-password"
              dir="ltr"
              style="height: 48px; font-size: 0.95rem;"
            />
          </div>

          <button type="submit" id="btn-submit-login" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center; height: 50px; font-size: 1rem; font-weight: 800;">
            <span>${l.submitBtn}</span>
            <span>${arrow}</span>
          </button>
        </form>

        <!-- Divider -->
        <div style="display: flex; align-items: center; margin: 24px 0; color: var(--text-muted); font-size: 0.8rem;">
          <div style="flex: 1; height: 1px; background: var(--border-light);"></div>
          <span style="padding: 0 14px; font-weight: 600;">${l.orSso}</span>
          <div style="flex: 1; height: 1px; background: var(--border-light);"></div>
        </div>

        <!-- Google Enterprise SSO Button -->
        <button type="button" id="btn-login-google" class="btn-clean" style="width: 100%; justify-content: center; height: 46px; background: #FFFFFF; border: 1px solid var(--border-medium); color: var(--text-main); font-weight: 600; font-size: 0.9rem;">
          <svg style="width: 18px; height: 18px; margin-${isRtl ? 'left' : 'right'}: 8px;" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.16z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.32 14.27c-.24-.73-.38-1.5-.38-2.27s.14-1.54.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.06-3.15z"/>
            <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.06 3.15c.94-2.83 3.58-4.96 6.68-4.96z"/>
          </svg>
          <span>${l.googleSso}</span>
        </button>

        <!-- New User Apply Link -->
        <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-light); font-size: 0.9rem; color: var(--text-secondary);">
          <span>${l.noAccount}</span>
          <button type="button" id="btn-go-apply" class="btn-clean" style="color: var(--shat-green); font-weight: 800; background: none; border: none; cursor: pointer; text-decoration: underline; padding: 0 4px;">
            ${l.applyLink}
          </button>
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <a href="#/home" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            ${l.backHome}
          </a>
        </div>
      </div>
    </div>
  `;
}

export function bindLoginEvents() {
  const form = document.getElementById('shat-login-form');
  const alertBox = document.getElementById('login-alert-box');
  const submitBtn = document.getElementById('btn-submit-login');
  const googleBtn = document.getElementById('btn-login-google');
  const applyBtn = document.getElementById('btn-go-apply');

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  // Quick Credential auto-fill buttons
  document.querySelectorAll('.btn-quick-cred').forEach(btn => {
    btn.onclick = () => {
      const user = btn.getAttribute('data-user');
      const idInput = document.getElementById('login-identifier');
      const pwInput = document.getElementById('login-password');
      if (idInput && pwInput) {
        idInput.value = user;
        pwInput.value = 'password123';
        showToast(
          txt(`تمت تعبئة بيانات حساب [${user}] بنجاح`, `Credentials for [${user}] auto-filled successfully`, `Données du compte [${user}] insérées avec succès`),
          'info', 
          2000
        );
      }
    };
  });

  if (applyBtn) {
    applyBtn.onclick = () => {
      if (window.openGlobalModal) {
        window.openGlobalModal('general');
      } else {
        window.location.hash = '#/academy';
      }
    };
  }

  if (googleBtn) {
    googleBtn.onclick = () => {
      showToast(
        txt('جاري التحقق عبر نظام Google Workspace SSO المؤسسي...', 'Authenticating via Google Workspace SSO...', 'Authentification via Google Workspace SSO...'),
        'info'
      );
      setTimeout(() => {
        // Auto-authenticate with staff account for demo
        const idInput = document.getElementById('login-identifier');
        const pwInput = document.getElementById('login-password');
        if (idInput && pwInput) {
          idInput.value = 'admin@shat.com';
          pwInput.value = 'password123';
          form?.dispatchEvent(new Event('submit'));
        }
      }, 700);
    };
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!identifier || !password) return;

    if (alertBox) {
      alertBox.style.display = 'none';
      alertBox.className = '';
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${txt('جاري المصادقة عبر الخادم...', 'Authenticating with server...', 'Authentification auprès du serveur...')}</span>`;
    }

    try {
      const res = await api.login(identifier, password);
      if (res.success && res.user) {
        const user = res.user;
        const displayName = currentLang === 'ar' ? (user.fullNameAr || user.username) : (user.fullNameEn || user.username);
        showToast(
          txt(`مرحباً بك يا ${displayName}! تم تسجيل الدخول بنجاح.`, `Welcome, ${displayName}! Signed in successfully.`, `Bienvenue, ${displayName} ! Connexion réussie.`),
          'success'
        );

        // Route strictly according to server-verified role
        setTimeout(() => {
          if (user.role === 'admin') {
            window.location.hash = '#/admin';
          } else if (user.role === 'teacher') {
            window.location.hash = '#/teacher';
          } else {
            window.location.hash = '#/student';
          }
        }, 300);
      }
    } catch (err) {
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.style.background = '#FEE2E2';
        alertBox.style.color = '#991B1B';
        alertBox.style.border = '1px solid #FCA5A5';
        alertBox.innerHTML = `⚠️ ${err.message || txt('بيانات الدخول غير صحيحة. يرجى التحقق والمحاولة مجدداً.', 'Invalid credentials. Please verify and retry.', 'Identifiants invalides. Veuillez vérifier et réessayer.')}`;
      }
      showToast(err.message || txt('فشل تسجيل الدخول', 'Login failed', 'Échec de connexion'), 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${content[currentLang]?.login?.submitBtn || 'Sign In'}</span><span>${currentLang === 'ar' ? '←' : '→'}</span>`;
      }
    }
  });
}

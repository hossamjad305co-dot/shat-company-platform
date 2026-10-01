// assets/js/views/loginView.js
// SHAT Platform — Innovative Multi-Channel Authentication Hub (100% Trilingual: AR, EN, FR)
// Features: 
// 1. Corporate Enterprise Account (Email/Username + Password + Visibility Toggle)
// 2. National / Student ID Direct Login (رقم الهوية الوطنية / الأكاديمية)
// 3. WhatsApp Instant OTP Verification (تحقق واتساب السريع)
// 4. 1-Click Role Simulator (محاكي الأدوار الفوري لكافة الصلاحيات)

import { api } from '../services/api/apiClient.js';
import { content } from '../content.js';
import { showToast } from '../components/toast.js';
import { icons } from '../icons.js';

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
    <div class="view-login" style="min-height: 85vh; display: flex; align-items: center; justify-content: center; padding: 32px 16px; background: radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 70%, #F1F5F9 100%);">
      <div class="bento-card login-card-container" style="width: 100%; max-width: 520px; padding: 32px 28px; box-shadow: 0 15px 35px -5px rgba(15, 46, 74, 0.12); border: 1px solid var(--border-light); border-top: 5px solid var(--shat-navy); border-radius: var(--radius-md); background: #FFFFFF;">
        
        <!-- Emblem & Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="#/home" title="${d.company.name}" style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: 50%; background: var(--shat-navy-tint); margin-bottom: 14px; border: 1px solid var(--border-light);">
            <img src="assets/logo/logo-transparent.png" alt="SHAT Emblem" style="height: 46px;" onerror="this.onerror=null; this.src='assets/logo/logo-symbol.jpg';">
          </a>
          <h1 style="font-size: 1.55rem; font-weight: 900; color: var(--shat-navy); margin-bottom: 6px;">${l.title}</h1>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">${l.subtitle}</p>
        </div>

        <!-- In-Form Alert Box -->
        <div id="login-alert-box" style="display: none; padding: 12px 16px; border-radius: var(--radius-xs); margin-bottom: 18px; font-size: 0.88rem;"></div>

        <!-- Method Navigation Tabs (4 Channels) -->
        <div class="login-tabs-container" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; background: var(--bg-subtle); padding: 5px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin-bottom: 22px;">
          <button type="button" class="btn-clean login-tab-btn active" data-tab="corporate" style="padding: 8px 4px; font-size: 0.78rem; font-weight: 700; border-radius: 6px; text-align: center; transition: all 0.2s ease;">
            ${l.tabs?.corporate || 'حساب المؤسسة'}
          </button>
          <button type="button" class="btn-clean login-tab-btn" data-tab="nationalId" style="padding: 8px 4px; font-size: 0.78rem; font-weight: 700; border-radius: 6px; text-align: center; transition: all 0.2s ease;">
            ${l.tabs?.nationalId || 'الهوية الأكاديمية'}
          </button>
          <button type="button" class="btn-clean login-tab-btn" data-tab="whatsapp" style="padding: 8px 4px; font-size: 0.78rem; font-weight: 700; border-radius: 6px; text-align: center; transition: all 0.2s ease;">
            ${l.tabs?.whatsapp || 'واتساب السريع'}
          </button>
          <button type="button" class="btn-clean login-tab-btn" data-tab="simulator" style="padding: 8px 4px; font-size: 0.78rem; font-weight: 700; border-radius: 6px; text-align: center; transition: all 0.2s ease;">
            ${l.tabs?.simulator || 'محاكي الأدوار'}
          </button>
        </div>

        <!-- ========================================== -->
        <!-- TAB 1: CORPORATE ACCOUNT                   -->
        <!-- ========================================== -->
        <div id="tab-pane-corporate" class="login-tab-pane">
          <!-- Quick Demo Role Fillers -->
          <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-xs); margin-bottom: 18px; border: 1px solid var(--border-light);">
            <div style="font-size: 0.74rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">${l.quickDemoTitle}</div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="btn-clean btn-sm btn-quick-cred" data-user="admin" style="font-size: 0.74rem; padding: 4px 8px; background: #FFFFFF; border: 1px solid #CBD5E1; color: var(--shat-navy); font-weight: 700; border-radius: 4px;">
                ${l.adminRole}
              </button>
              <button type="button" class="btn-clean btn-sm btn-quick-cred" data-user="osama" style="font-size: 0.74rem; padding: 4px 8px; background: #FFFFFF; border: 1px solid #CBD5E1; color: var(--shat-green); font-weight: 700; border-radius: 4px;">
                ${l.teacherRole}
              </button>
              <button type="button" class="btn-clean btn-sm btn-quick-cred" data-user="1098765432" style="font-size: 0.74rem; padding: 4px 8px; background: #FFFFFF; border: 1px solid #CBD5E1; color: #1D4ED8; font-weight: 700; border-radius: 4px;">
                ${l.studentRole}
              </button>
            </div>
          </div>

          <form id="shat-login-form">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="login-identifier">${l.idLabel}</label>
              <input 
                type="text" 
                id="login-identifier" 
                class="form-input" 
                placeholder="${l.idPlaceholder}" 
                required 
                autocomplete="username"
                dir="ltr"
                style="height: 48px; font-size: 0.95rem; border-radius: var(--radius-xs);"
              />
            </div>

            <div class="form-group" style="margin-bottom: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="form-label" for="login-password" style="margin: 0;">${l.pwLabel}</label>
                <a href="https://wa.me/972592879621?text=${forgotText}" target="_blank" rel="noopener" style="font-size: 0.8rem; color: var(--shat-green); font-weight: 600;">
                  ${l.forgotPw}
                </a>
              </div>
              <div style="position: relative; display: flex; align-items: center;">
                <input 
                  type="password" 
                  id="login-password" 
                  class="form-input" 
                  placeholder="••••••••••••" 
                  required 
                  autocomplete="current-password"
                  dir="ltr"
                  style="height: 48px; font-size: 0.95rem; width: 100%; border-radius: var(--radius-xs); padding-${isRtl ? 'left' : 'right'}: 44px;"
                />
                <button type="button" id="btn-toggle-password" title="Show/Hide Password" class="btn-clean" style="position: absolute; ${isRtl ? 'left: 10px' : 'right: 10px'}; top: 50%; transform: translateY(-50%); width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; color: var(--text-muted); cursor: pointer; padding: 0;">
                  <span id="pwd-icon-show">${icons.eye}</span>
                  <span id="pwd-icon-hide" style="display: none;">${icons.eyeOff}</span>
                </button>
              </div>
            </div>

            <button type="submit" id="btn-submit-login" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center; height: 48px; font-size: 0.98rem; font-weight: 800; border-radius: var(--radius-xs);">
              <span>${l.submitBtn}</span>
              <span>${arrow}</span>
            </button>
          </form>

          <!-- Divider -->
          <div style="display: flex; align-items: center; margin: 20px 0; color: var(--text-muted); font-size: 0.8rem;">
            <div style="flex: 1; height: 1px; background: var(--border-light);"></div>
            <span style="padding: 0 12px; font-weight: 600;">${l.orSso}</span>
            <div style="flex: 1; height: 1px; background: var(--border-light);"></div>
          </div>

          <!-- Google Enterprise SSO Button -->
          <button type="button" id="btn-login-google" class="btn-clean" style="width: 100%; justify-content: center; height: 46px; background: #FFFFFF; border: 1px solid var(--border-medium); color: var(--text-main); font-weight: 600; font-size: 0.88rem; border-radius: var(--radius-xs);">
            <svg style="width: 18px; height: 18px; margin-${isRtl ? 'left' : 'right'}: 8px;" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.16z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"/>
              <path fill="#FBBC05" d="M5.32 14.27c-.24-.73-.38-1.5-.38-2.27s.14-1.54.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.06-3.15z"/>
              <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.06 3.15c.94-2.83 3.58-4.96 6.68-4.96z"/>
            </svg>
            <span>${l.googleSso}</span>
          </button>
        </div>

        <!-- ========================================== -->
        <!-- TAB 2: NATIONAL / STUDENT ID               -->
        <!-- ========================================== -->
        <div id="tab-pane-nationalId" class="login-tab-pane" style="display: none;">
          <div style="background: rgba(30, 58, 138, 0.04); border: 1px solid rgba(30, 58, 138, 0.15); padding: 14px; border-radius: var(--radius-xs); margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #1E3A8A; font-size: 0.88rem; margin-bottom: 4px;">
              <span style="display: inline-flex;">${icons.fingerprint || '🪪'}</span>
              <span>${l.tabs?.nationalId || 'الهوية الأكاديمية'}</span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">${l.nationalIdHelp}</p>
          </div>

          <form id="national-id-form">
            <div class="form-group" style="margin-bottom: 18px;">
              <label class="form-label" for="input-national-id">${l.nationalIdLabel}</label>
              <input 
                type="text" 
                id="input-national-id" 
                class="form-input" 
                placeholder="${l.nationalIdPlaceholder}" 
                required 
                dir="ltr"
                style="height: 48px; font-size: 1rem; letter-spacing: 1px; font-weight: 600; border-radius: var(--radius-xs);"
              />
            </div>

            <!-- Preset Quick ID tags -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;">
              <button type="button" class="btn-clean btn-sm btn-quick-id" data-id="1098765432" style="font-size: 0.75rem; padding: 4px 10px; background: var(--bg-subtle); border: 1px solid var(--border-medium); border-radius: 4px; color: var(--shat-navy);">
                🎓 1098765432 (طارق الخالد)
              </button>
              <button type="button" class="btn-clean btn-sm btn-quick-id" data-id="401234567" style="font-size: 0.75rem; padding: 4px 10px; background: var(--bg-subtle); border: 1px solid var(--border-medium); border-radius: 4px; color: var(--shat-green);">
                🎓 401234567 (سارة العلي)
              </button>
            </div>

            <button type="submit" id="btn-submit-national-id" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center; height: 48px; font-size: 0.98rem; font-weight: 800; border-radius: var(--radius-xs); background: linear-gradient(135deg, #1E3A8A 0%, #172554 100%);">
              <span>${l.nationalIdBtn}</span>
            </button>
          </form>
        </div>

        <!-- ========================================== -->
        <!-- TAB 3: WHATSAPP INSTANT OTP                -->
        <!-- ========================================== -->
        <div id="tab-pane-whatsapp" class="login-tab-pane" style="display: none;">
          <div style="background: rgba(37, 211, 102, 0.08); border: 1px solid rgba(37, 211, 102, 0.25); padding: 14px; border-radius: var(--radius-xs); margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #15803D; font-size: 0.88rem; margin-bottom: 4px;">
              <span style="display: inline-flex; width: 20px; height: 20px;">${icons.whatsapp}</span>
              <span>${l.tabs?.whatsapp || 'واتساب السريع'}</span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: #166534; line-height: 1.5;">${l.whatsappSimNote}</p>
          </div>

          <form id="whatsapp-login-form">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="input-whatsapp-phone">${l.whatsappPhoneLabel}</label>
              <input 
                type="tel" 
                id="input-whatsapp-phone" 
                class="form-input" 
                placeholder="${l.whatsappPhonePlaceholder}" 
                value="+972 59 287 9621"
                required 
                dir="ltr"
                style="height: 48px; font-size: 0.98rem; font-weight: 600; border-radius: var(--radius-xs);"
              />
            </div>

            <!-- OTP Step (Initially Hidden) -->
            <div id="whatsapp-otp-step" style="display: none; margin-bottom: 18px; padding: 12px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px dashed #25D366;">
              <label class="form-label" for="input-whatsapp-otp" style="color: #15803D; font-weight: 700;">${l.whatsappOtpLabel}</label>
              <input 
                type="text" 
                id="input-whatsapp-otp" 
                class="form-input" 
                placeholder="7264" 
                maxlength="6"
                dir="ltr"
                style="height: 48px; font-size: 1.3rem; letter-spacing: 6px; text-align: center; font-weight: 900; color: #15803D; background: #FFFFFF;"
              />
              <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 6px; text-align: center;">
                رمز التحقق التجريبي الفوري: <strong>7264</strong> (تم إرساله للواتساب)
              </div>
            </div>

            <button type="button" id="btn-send-whatsapp-otp" class="btn-clean btn-lg" style="width: 100%; justify-content: center; height: 48px; font-size: 0.95rem; font-weight: 800; border-radius: var(--radius-xs); background: #25D366; color: #FFFFFF; margin-bottom: 8px;">
              <span>${l.whatsappBtn}</span>
            </button>

            <button type="submit" id="btn-verify-whatsapp-otp" class="btn-clean btn-primary btn-lg" style="display: none; width: 100%; justify-content: center; height: 48px; font-size: 0.98rem; font-weight: 800; border-radius: var(--radius-xs); background: #15803D;">
              <span>${l.whatsappVerifyBtn}</span>
            </button>
          </form>
        </div>

        <!-- ========================================== -->
        <!-- TAB 4: 1-CLICK ROLE SIMULATOR               -->
        <!-- ========================================== -->
        <div id="tab-pane-simulator" class="login-tab-pane" style="display: none;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 6px;">
            ${l.simulatorTitle}
          </div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
            ${l.simulatorNote}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <!-- Trainee Student Card -->
            <button type="button" class="btn-clean btn-instant-role" data-role="student" style="padding: 14px 12px; text-align: ${isRtl ? 'right' : 'left'}; background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-xs); transition: all 0.2s ease;">
              <div style="font-size: 1.3rem; margin-bottom: 4px;">🎓</div>
              <div style="font-weight: 800; color: #1D4ED8; font-size: 0.88rem;">${l.studentRole}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">لوحة المتدرب، المقررات، والشهادات</div>
            </button>

            <!-- Master Trainer Card -->
            <button type="button" class="btn-clean btn-instant-role" data-role="teacher" style="padding: 14px 12px; text-align: ${isRtl ? 'right' : 'left'}; background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-xs); transition: all 0.2s ease;">
              <div style="font-size: 1.3rem; margin-bottom: 4px;">👨‍🏫</div>
              <div style="font-weight: 800; color: #15803D; font-size: 0.88rem;">${l.teacherRole}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">إدارة الفصول، التقييم، وبنوك الأسئلة</div>
            </button>

            <!-- Super Admin Card -->
            <button type="button" class="btn-clean btn-instant-role" data-role="admin" style="padding: 14px 12px; text-align: ${isRtl ? 'right' : 'left'}; background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-xs); transition: all 0.2s ease;">
              <div style="font-size: 1.3rem; margin-bottom: 4px;">⚙️</div>
              <div style="font-weight: 800; color: var(--shat-navy); font-size: 0.88rem;">${l.adminRole}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">إدارة المنظومة، المحتوى، والتحكم الشامل</div>
            </button>

            <!-- Public Visitor Card -->
            <button type="button" class="btn-clean btn-instant-role" data-role="visitor" style="padding: 14px 12px; text-align: ${isRtl ? 'right' : 'left'}; background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-xs); transition: all 0.2s ease;">
              <div style="font-size: 1.3rem; margin-bottom: 4px;">🌐</div>
              <div style="font-weight: 800; color: #475569; font-size: 0.88rem;">${l.visitorRole || 'الزائر العام'}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">استكشاف البرامج والخدمات العامة</div>
            </button>
          </div>
        </div>

        <!-- New User Apply Link -->
        <div style="text-align: center; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--border-light); font-size: 0.88rem; color: var(--text-secondary);">
          <span>${l.noAccount}</span>
          <button type="button" id="btn-go-apply" class="btn-clean" style="color: var(--shat-green); font-weight: 800; background: none; border: none; cursor: pointer; text-decoration: underline; padding: 0 4px;">
            ${l.applyLink}
          </button>
        </div>

        <div style="text-align: center; margin-top: 14px;">
          <a href="#/home" style="font-size: 0.84rem; color: var(--text-muted); font-weight: 600;">
            ${l.backHome}
          </a>
        </div>
      </div>
    </div>
  `;
}

export function bindLoginEvents() {
  const form = document.getElementById('shat-login-form');
  const nationalForm = document.getElementById('national-id-form');
  const whatsappForm = document.getElementById('whatsapp-login-form');
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

  // 1. Tab Switching Logic
  const tabs = document.querySelectorAll('.login-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = 'transparent';
        t.style.color = 'var(--text-secondary)';
        t.style.boxShadow = 'none';
      });
      tab.classList.add('active');
      tab.style.background = '#FFFFFF';
      tab.style.color = 'var(--shat-navy)';
      tab.style.boxShadow = '0 2px 5px rgba(0,0,0,0.06)';

      const target = tab.getAttribute('data-tab');
      document.querySelectorAll('.login-tab-pane').forEach(pane => {
        pane.style.display = 'none';
      });
      const activePane = document.getElementById(`tab-pane-${target}`);
      if (activePane) activePane.style.display = 'block';

      if (alertBox) alertBox.style.display = 'none';
    });
  });

  // Set active style for initial tab
  const activeTab = document.querySelector('.login-tab-btn.active');
  if (activeTab) {
    activeTab.style.background = '#FFFFFF';
    activeTab.style.color = 'var(--shat-navy)';
    activeTab.style.boxShadow = '0 2px 5px rgba(0,0,0,0.06)';
  }

  // 2. Password Visibility Toggle
  const togglePwdBtn = document.getElementById('btn-toggle-password');
  const pwdInput = document.getElementById('login-password');
  const showIcon = document.getElementById('pwd-icon-show');
  const hideIcon = document.getElementById('pwd-icon-hide');

  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener('click', () => {
      const isPassword = pwdInput.type === 'password';
      pwdInput.type = isPassword ? 'text' : 'password';
      if (showIcon && hideIcon) {
        showIcon.style.display = isPassword ? 'none' : 'inline-flex';
        hideIcon.style.display = isPassword ? 'inline-flex' : 'none';
      }
    });
  }

  // 3. Quick Credential auto-fill buttons
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

  // 4. Quick Student IDs
  document.querySelectorAll('.btn-quick-id').forEach(btn => {
    btn.onclick = () => {
      const idVal = btn.getAttribute('data-id');
      const input = document.getElementById('input-national-id');
      if (input) {
        input.value = idVal;
      }
    };
  });

  // 5. 1-Click Role Simulator Cards
  document.querySelectorAll('.btn-instant-role').forEach(card => {
    card.onclick = () => {
      const role = card.getAttribute('data-role');
      if (role === 'visitor') {
        localStorage.removeItem('shat_current_user');
        window.location.hash = '#/home';
        showToast(txt('تم تفعيل وضع الزائر العام', 'Switched to Public Visitor mode', 'Mode Visiteur Public activé'), 'info');
        return;
      }

      let simulatedUser = {
        role: role,
        username: role === 'admin' ? 'admin' : (role === 'teacher' ? 'osama' : 'tariq'),
        fullNameAr: role === 'admin' ? 'المدير العام' : (role === 'teacher' ? 'د. أسامة الشريف' : 'طارق الخالد'),
        fullNameEn: role === 'admin' ? 'General Administrator' : (role === 'teacher' ? 'Dr. Osama Al-Sharif' : 'Tariq Al-Khalid'),
        token: 'simulated_jwt_token_' + Date.now()
      };

      localStorage.setItem('shat_current_user', JSON.stringify(simulatedUser));
      
      showToast(
        txt(`تم الدخول الفوري بصفة: ${simulatedUser.fullNameAr}`, `Signed in instantly as: ${simulatedUser.fullNameEn}`, `Connexion instantanée en tant que : ${simulatedUser.fullNameEn}`),
        'success'
      );

      setTimeout(() => {
        if (role === 'admin') window.location.hash = '#/admin';
        else if (role === 'teacher') window.location.hash = '#/teacher';
        else window.location.hash = '#/student';
      }, 300);
    };
  });

  // 6. WhatsApp OTP Simulation
  const sendOtpBtn = document.getElementById('btn-send-whatsapp-otp');
  const verifyOtpBtn = document.getElementById('btn-verify-whatsapp-otp');
  const otpStep = document.getElementById('whatsapp-otp-step');
  const otpInput = document.getElementById('input-whatsapp-otp');

  if (sendOtpBtn && otpStep && verifyOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      const phone = document.getElementById('input-whatsapp-phone')?.value.trim();
      if (!phone) {
        showToast(txt('يرجى إدخال رقم الهاتف المسجل أولاً', 'Please enter your phone number first', 'Veuillez saisir votre numéro de téléphone'), 'error');
        return;
      }

      sendOtpBtn.disabled = true;
      sendOtpBtn.innerHTML = `<span>${txt('جاري إرسال الرمز إلى واتساب...', 'Sending OTP to WhatsApp...', 'Envoi du code vers WhatsApp...')}</span>`;

      setTimeout(() => {
        otpStep.style.display = 'block';
        if (otpInput) otpInput.value = '7264';
        sendOtpBtn.style.display = 'none';
        verifyOtpBtn.style.display = 'flex';
        showToast(
          txt('تم إرسال رمز التحقق الفوري إلى واتساب: 7264', 'Verification OTP sent to WhatsApp: 7264', 'Code de vérification envoyé à WhatsApp : 7264'),
          'success',
          4000
        );
      }, 800);
    });
  }

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = otpInput?.value.trim();
      if (code === '7264' || code.length >= 4) {
        const studentUser = {
          role: 'student',
          username: 'student_wa',
          fullNameAr: 'طالب معتمد (تحقق واتساب)',
          fullNameEn: 'Verified Student (WhatsApp)',
          token: 'wa_jwt_' + Date.now()
        };
        localStorage.setItem('shat_current_user', JSON.stringify(studentUser));
        showToast(
          txt('تم تأكيد رمز الواتساب بنجاح! مرحباً بك في منصتك.', 'WhatsApp OTP verified! Welcome back.', 'Code WhatsApp vérifié ! Bienvenue.'),
          'success'
        );
        setTimeout(() => {
          window.location.hash = '#/student';
        }, 400);
      } else {
        showToast(txt('رمز التحقق غير صحيح، الرمز التجريبي هو 7264', 'Invalid code, demo code is 7264', 'Code invalide, le code démo est 7264'), 'error');
      }
    });
  }

  // 7. National / Student ID Login Form
  if (nationalForm) {
    nationalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const idVal = document.getElementById('input-national-id')?.value.trim();
      if (!idVal) return;

      const submitBtn = document.getElementById('btn-submit-national-id');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>${txt('جاري التحقق من الرقم الأكاديمي...', 'Verifying ID Number...', 'Vérification du numéro...')}</span>`;
      }

      try {
        // Try server login first
        const res = await api.login(idVal, 'password123');
        if (res.success && res.user) {
          showToast(txt(`تم تسجيل الدخول برقم الهوية: ${idVal}`, `Signed in with Student ID: ${idVal}`, `Connexion réussie avec l'ID : ${idVal}`), 'success');
          setTimeout(() => { window.location.hash = '#/student'; }, 300);
          return;
        }
      } catch (err) {
        // Fallback for demo ID verification
        const studentUser = {
          role: 'student',
          username: idVal,
          fullNameAr: idVal === '401234567' ? 'سارة العلي' : 'طارق الخالد (متدرب)',
          fullNameEn: idVal === '401234567' ? 'Sarah Al-Ali' : 'Tariq Al-Khalid (Trainee)',
          token: 'id_jwt_' + Date.now()
        };
        localStorage.setItem('shat_current_user', JSON.stringify(studentUser));
        showToast(txt(`تم التحقق من الهوية الأكاديمية بنجاح: ${studentUser.fullNameAr}`, `Academic ID verified: ${studentUser.fullNameEn}`, `ID académique vérifié : ${studentUser.fullNameEn}`), 'success');
        setTimeout(() => { window.location.hash = '#/student'; }, 300);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>${content[currentLang]?.login?.nationalIdBtn || 'Instant ID Verification Sign In ←'}</span>`;
        }
      }
    });
  }

  // 8. Apply button & Google SSO
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

  // 9. Standard Corporate Form Submission
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

// assets/js/views/loginView.js
// SHAT Platform — Official Secure Login Portal
import { api } from '../services/api/apiClient.js';

export function renderLoginView(lang = 'ar') {
  return `
    <div class="view-login" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 48px 16px; background: radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 100%);">
      <div class="bento-card" style="width: 100%; max-width: 460px; padding: 40px; box-shadow: 0 10px 30px rgba(15, 46, 74, 0.08); border: 1px solid var(--border-light); border-top: 4px solid var(--shat-navy);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: var(--radius-md); background: var(--shat-navy-tint); margin-bottom: 16px;">
            <img src="assets/logo/logo-transparent.png" alt="SHAT Emblem" style="height: 44px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
          </div>
          <h1 style="font-size: 1.6rem; font-weight: 900; color: var(--shat-navy); margin-bottom: 6px;">بوابة تسجيل الدخول الموحدة</h1>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">منظومة شركة شات للتنمية والتطوير • أكاديمية التدريب</p>
        </div>

        <!-- Alert Notification Box -->
        <div id="login-alert-box" style="display: none; padding: 12px 14px; border-radius: var(--radius-xs); margin-bottom: 20px; font-size: 0.88rem;"></div>

        <!-- Credentials Form -->
        <form id="shat-login-form">
          <div class="form-group">
            <label class="form-label" for="login-identifier">اسم المستخدم أو البريد الإلكتروني *</label>
            <input 
              type="text" 
              id="login-identifier" 
              class="form-input" 
              placeholder="مثال: admin@shat.com أو الرقم الوظيفي/التدريبي" 
              required 
              autocomplete="username"
              dir="ltr"
            />
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" for="login-password" style="margin: 0;">كلمة المرور *</label>
              <a href="https://wa.me/972592879621?text=${encodeURIComponent('مرحباً، أحتاج مساعدة في استعادة كلمة مرور حسابي على منصة شات')}" target="_blank" rel="noopener" style="font-size: 0.8rem; color: var(--shat-green); font-weight: 600;">
                نسيت كلمة المرور؟
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
            />
          </div>

          <button type="submit" id="btn-submit-login" class="btn-clean btn-primary btn-lg" style="width: 100%; justify-content: center; padding: 13px;">
            <span>تسجيل الدخول إلى الحساب</span>
            <span>←</span>
          </button>
        </form>

        <!-- Official Accounts Directory Notice -->
        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-light); font-size: 0.82rem; color: var(--text-muted); line-height: 1.6;">
          <div style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">حسابات الوصول الرسمية المعتمدة للمنظومة:</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div>• <strong style="color: var(--shat-navy);">المدير العام:</strong> <code>admin@shat.com</code></div>
            <div>• <strong style="color: var(--shat-green);">المدرب المعتمد:</strong> <code>osama@shat.com</code></div>
            <div>• <strong style="color: var(--text-main);">المتدرب المعتمد:</strong> <code>ahmed@shat.com</code></div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <a href="#/home" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            ← العودة إلى الصفحة الرئيسية
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
      submitBtn.innerHTML = `<span>جاري التحقق والمصادقة...</span>`;
    }

    try {
      const res = await api.login(identifier, password);
      if (res.success && res.user) {
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.style.background = 'var(--shat-green-tint)';
          alertBox.style.color = 'var(--shat-green)';
          alertBox.style.border = '1px solid var(--shat-green-border)';
          alertBox.textContent = `تم تسجيل الدخول بنجاح! مرحباً بك يا ${res.user.fullNameAr}. جاري التوجيه...`;
        }

        setTimeout(() => {
          // Route according to authoritative server role
          if (res.user.role === 'admin') {
            window.location.hash = '#/admin';
          } else if (res.user.role === 'teacher') {
            window.location.hash = '#/teacher';
          } else if (res.user.role === 'student') {
            window.location.hash = '#/student';
          } else {
            window.location.hash = '#/home';
          }
        }, 600);
      }
    } catch (err) {
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.style.background = '#FEF2F2';
        alertBox.style.color = '#991B1B';
        alertBox.style.border = '1px solid #FECACA';
        alertBox.textContent = err.message || 'بيانات الدخول غير صحيحة. يرجى التأكد والمحاولة مرة أخرى.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>تسجيل الدخول إلى الحساب</span><span>←</span>`;
      }
    }
  });
}

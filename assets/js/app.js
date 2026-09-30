// assets/js/app.js
// Main Bootstrap & Global Modal Engine
import { content } from './content.js';
import { router } from './router.js';

class Application {
  constructor() {
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
    this.init();
  }

  init() {
    this.renderHeader();
    this.renderFooter();
    this.bindGlobalEvents();
    router.init();
  }

  renderHeader() {
    const d = content[this.currentLang] || content.ar;
    const c = d.company;
    const nav = d.nav;

    const navContainer = document.getElementById('site-desktop-nav');
    if (navContainer) {
      navContainer.innerHTML = `
        <a href="#/home" class="nav-link">${nav.home}</a>
        <a href="#/about" class="nav-link">${nav.about}</a>
        <a href="#/services" class="nav-link">${nav.services}</a>
        <a href="#/standards" class="nav-link">${nav.standards}</a>
        <a href="#/delivery" class="nav-link">${nav.delivery}</a>
        <a href="#/academy" class="nav-link">${nav.academy}</a>
        <a href="#/contact" class="nav-link">${nav.contact}</a>
        <a href="#/admin" class="nav-link" style="color: var(--shat-green); font-weight: 700;">⚙️ ${nav.admin}</a>
      `;
    }

    const brandEl = document.getElementById('header-brand-title');
    if (brandEl) brandEl.textContent = c.name;
    const subEl = document.getElementById('header-brand-sub');
    if (subEl) subEl.textContent = c.nameEn;
  }

  renderFooter() {
    const d = content[this.currentLang] || content.ar;
    const c = d.company;
    const nav = d.nav;

    const footerContainer = document.getElementById('site-footer-content');
    if (footerContainer) {
      footerContainer.innerHTML = `
        <div class="footer-grid">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
              <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 38px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
              <span style="font-weight: 900; font-size: 1.1rem; color: #FFFFFF;">${c.name}</span>
            </div>
            <p style="font-size: 0.9rem; color: #94A3B8; line-height: 1.7; margin-bottom: 16px;">
              ${c.motto}<br>
              <span style="font-family: var(--font-latin); font-size: 0.8rem; color: #64748B;">${c.subMottoEn}</span>
            </p>
            <div style="font-size: 0.85rem; color: #CBD5E1;">
              نطاق العمل: دولي وإقليمي • فلسطين
            </div>
          </div>

          <div>
            <div class="footer-title">الأقسام الرئيسية</div>
            <ul class="footer-links">
              <li><a href="#/home">${nav.home}</a></li>
              <li><a href="#/about">${nav.about}</a></li>
              <li><a href="#/services">${nav.services}</a></li>
              <li><a href="#/standards">${nav.standards}</a></li>
              <li><a href="#/delivery">${nav.delivery}</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-title">الأكاديمية والإدارة</div>
            <ul class="footer-links">
              <li><a href="#/academy">${nav.academy}</a></li>
              <li><a href="#/contact">${nav.contact}</a></li>
              <li><a href="#/admin">${nav.admin}</a></li>
              <li><a href="https://wa.me/972592879621" target="_blank" rel="noopener">الدعم الفني المباشر</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-title">التواصل المؤسسي</div>
            <ul class="footer-links">
              <li style="color: #CBD5E1;">البريد: <a href="mailto:${c.email}" style="color: #FFFFFF;">${c.email}</a></li>
              <li style="color: #CBD5E1;">الهاتف: <a href="https://wa.me/972592879621" target="_blank" rel="noopener" style="color: #4ADE80;">${c.phone}</a></li>
              <li style="margin-top: 10px;">
                <a href="#/contact" class="btn-clean btn-green btn-sm" style="width: 100%;">
                  <span>طلب استشارة أو تدريب</span>
                  <span>←</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© ${c.year} ${c.name} (SHAT Development & Growth). جميع الحقوق محفوظة.</div>
          <div>وفق أعلى المعايير الدولية والإنسانية المعتمدة.</div>
        </div>
      `;
    }
  }

  bindGlobalEvents() {
    // Language Switcher
    const langBtn = document.getElementById('btn-toggle-lang');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.currentLang = nextLang;
        router.setLang(nextLang);
        this.renderHeader();
        this.renderFooter();
      });
    }

    // Mobile Navigation Toggle
    const mobileBtn = document.getElementById('btn-mobile-menu');
    const mobileDrawer = document.getElementById('mobile-drawer-nav');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
      mobileDrawer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.id === 'btn-close-mobile-drawer') {
          mobileDrawer.classList.remove('open');
        }
      });
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
      const foundCourse = d.courses?.find(c => c.id === courseId);
      const courseTitle = foundCourse ? foundCourse.title : 'طلب التحاق وتدريب عام';

      if (modalTitle) modalTitle.textContent = 'طلب التحاق بمساق تدريبي';

      modalBody.innerHTML = `
        <div style="margin-bottom: 16px; background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--shat-green);">المساق التدريبي:</div>
          <div style="font-weight: 800; color: var(--shat-navy);">${courseTitle}</div>
        </div>

        <form id="modal-enrollment-form">
          <input type="hidden" id="app-course-id" value="${courseId}">
          <input type="hidden" id="app-course-title" value="${courseTitle}">

          <div class="form-group">
            <label class="form-label">الاسم الرباعي الكامل *</label>
            <input type="text" id="app-fullname" class="form-input" placeholder="مثال: أحمد عبد الله خليل" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">رقم الهاتف وواتساب *</label>
              <input type="tel" id="app-phone" class="form-input" placeholder="+97259..." required>
            </div>
            <div class="form-group">
              <label class="form-label">البريد الإلكتروني *</label>
              <input type="email" id="app-email" class="form-input" placeholder="name@domain.com" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">المؤسسة / جهة العمل الحالية</label>
            <input type="text" id="app-org" class="form-input" placeholder="اسم المنظمة أو المؤسسة أو الجامعة">
          </div>

          <div class="form-group">
            <label class="form-label">المؤهل العلمي أو التخصص</label>
            <input type="text" id="app-qualification" class="form-input" placeholder="مثال: بكالوريوس إدارة أعمال / علوم إنسانية">
          </div>

          <button type="submit" class="btn-clean btn-primary btn-lg" style="width: 100%; margin-top: 8px;">
            <span>تأكيد وإرسال طلب الالتحاق</span>
            <span>←</span>
          </button>
        </form>
      `;

      modalBackdrop.classList.add('open');

      const enrollForm = document.getElementById('modal-enrollment-form');
      if (enrollForm) {
        enrollForm.addEventListener('submit', (ev) => {
          ev.preventDefault();
          const appData = {
            id: 'app_' + Date.now(),
            courseId: document.getElementById('app-course-id')?.value,
            courseTitle: document.getElementById('app-course-title')?.value,
            fullName: document.getElementById('app-fullname')?.value,
            phone: document.getElementById('app-phone')?.value,
            email: document.getElementById('app-email')?.value,
            org: document.getElementById('app-org')?.value,
            qualification: document.getElementById('app-qualification')?.value,
            createdAt: new Date().toISOString()
          };

          const stored = JSON.parse(localStorage.getItem('shat_course_applications') || '[]');
          stored.unshift(appData);
          localStorage.setItem('shat_course_applications', JSON.stringify(stored));

          alert('تم استلام طلب تسجيلكم بنجاح! سيقوم فريق القبول والتسجيل بالتواصل معكم لتأكيد القبول وتفاصيل المواعيد.');
          modalBackdrop.classList.remove('open');
        });
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Application();
});

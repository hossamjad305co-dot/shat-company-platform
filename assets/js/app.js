// assets/js/app.js
// Main Bootstrap, Dynamic Header & Footer, Mobile Bottom Nav, and Global Modal Engine
import { content } from './content.js';
import { router } from './router.js';
import { initLoadingScreen } from './components/loadingScreen.js';
import { api } from './services/api/apiClient.js';
import { showToast } from './components/toast.js';

class Application {
  constructor() {
    initLoadingScreen();
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
    this.init();
  }

  init() {
    this.renderHeader();
    this.renderFooter();
    this.renderMobileBottomNav();
    this.bindGlobalEvents();
    router.init();

    // Verify session with server silently on boot
    api.getMe().then(() => {
      this.renderHeader();
      this.renderMobileBottomNav();
    }).catch(() => {});
  }

  renderHeader() {
    const d = content[this.currentLang] || content.ar;
    const c = d.company;
    const nav = d.nav;
    const user = api.currentUser;

    // Desktop Navigation Links
    const navContainer = document.getElementById('site-desktop-nav');
    if (navContainer) {
      navContainer.innerHTML = `
        <a href="#/home" class="nav-link">${nav.home}</a>
        <a href="#/about" class="nav-link">${nav.about}</a>
        <a href="#/services" class="nav-link">${nav.services}</a>
        <a href="#/standards" class="nav-link">${nav.standards}</a>
        <a href="#/projects" class="nav-link">${nav.projects || 'المشاريع'}</a>
        <a href="#/news" class="nav-link">${nav.news || 'الأخبار'}</a>
        <a href="#/academy" class="nav-link">${nav.academy}</a>
        <a href="#/contact" class="nav-link">${nav.contact}</a>
      `;
    }

    const brandEl = document.getElementById('header-brand-title');
    if (brandEl) brandEl.textContent = c.name;
    const subEl = document.getElementById('header-brand-sub');
    if (subEl) subEl.textContent = c.nameEn;

    // Header Actions (Right Side)
    const headerActions = document.getElementById('site-header-actions');
    if (headerActions) {
      if (user) {
        let portalRoute = '#/student';
        let portalLabel = 'لوحة المتدرب';
        if (user.role === 'teacher') {
          portalRoute = '#/teacher';
          portalLabel = 'بوابة المدرب';
        } else if (user.role === 'admin') {
          portalRoute = '#/admin';
          portalLabel = 'المركز الإداري ⚙️';
        }

        headerActions.innerHTML = `
          <button class="btn-clean btn-secondary btn-sm" id="btn-toggle-lang" title="تبديل اللغة / Switch Language">
            🌐 ${this.currentLang === 'ar' ? 'English' : 'العربية'}
          </button>
          
          <!-- Notifications Bell (Point 3) -->
          <div style="position: relative;">
            <button id="btn-notifications-toggle" class="btn-clean btn-secondary btn-sm" style="position: relative; padding: 7px 11px;" title="التنبيهات المؤسسية">
              <span style="font-size: 1.1rem;">🔔</span>
              <span class="notification-badge-dot">3</span>
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <a href="${portalRoute}" class="btn-clean btn-green btn-sm" style="font-weight: 700;">
              <span>👤 ${user.fullNameAr || user.username} (${portalLabel})</span>
            </a>
            <button id="btn-header-logout" class="btn-clean btn-sm" style="background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2);" title="تسجيل الخروج">
              خروج
            </button>
          </div>

          <button class="mobile-toggle" id="btn-mobile-menu" aria-label="فتح القائمة">
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
            showToast('تم تسجيل الخروج بنجاح من المنصة.', 'info');
            this.renderHeader();
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
        headerActions.innerHTML = `
          <button class="btn-clean btn-secondary btn-sm" id="btn-toggle-lang" title="تبديل اللغة / Switch Language">
            🌐 ${this.currentLang === 'ar' ? 'English' : 'العربية'}
          </button>
          <a href="#/login" class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); font-weight: 700;">
            تسجيل الدخول
          </a>
          <a href="#/contact" class="btn-clean btn-primary btn-sm">
            طلب استشارة
          </a>
          <button class="mobile-toggle" id="btn-mobile-menu" aria-label="فتح القائمة">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        `;
      }

      // Rebind language toggle and mobile drawer
      const langBtn = document.getElementById('btn-toggle-lang');
      if (langBtn) {
        langBtn.onclick = () => {
          const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
          this.currentLang = nextLang;
          router.setLang(nextLang);
          this.renderHeader();
          this.renderFooter();
          this.renderMobileBottomNav();
        };
      }

      const mobileBtn = document.getElementById('btn-mobile-menu');
      const mobileDrawer = document.getElementById('mobile-drawer-nav');
      if (mobileBtn && mobileDrawer) {
        mobileBtn.onclick = () => mobileDrawer.style.display = 'block';
      }
    }
  }

  // Mobile-First Bottom Navigation Bar (Point 5)
  renderMobileBottomNav() {
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (!bottomNav) return;

    const user = api.currentUser;

    if (!user) {
      // Guest Bottom Navigation
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">الرئيسية</span>
        </a>
        <a href="#/services" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">💼</span>
          <span class="mobile-bottom-label">الخدمات</span>
        </a>
        <a href="#/projects" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎯</span>
          <span class="mobile-bottom-label">المشاريع</span>
        </a>
        <a href="#/academy" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎓</span>
          <span class="mobile-bottom-label">الأكاديمية</span>
        </a>
        <a href="#/login" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🔑</span>
          <span class="mobile-bottom-label">الدخول</span>
        </a>
      `;
    } else if (user.role === 'student') {
      // Student Bottom Navigation (Point 5: Home, Courses, Dashboard, Me)
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">الرئيسية</span>
        </a>
        <a href="#/academy" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📚</span>
          <span class="mobile-bottom-label">المساقات</span>
        </a>
        <a href="#/student" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📊</span>
          <span class="mobile-bottom-label">لوحتي</span>
        </a>
        <a href="#/course/shat-chs-master" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎯</span>
          <span class="mobile-bottom-label">قاعتي</span>
        </a>
        <a href="#/student" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">👤</span>
          <span class="mobile-bottom-label">حسابي</span>
        </a>
      `;
    } else if (user.role === 'teacher') {
      // Teacher Bottom Navigation
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">الرئيسية</span>
        </a>
        <a href="#/teacher" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">👨‍🏫</span>
          <span class="mobile-bottom-label">مقرراتي</span>
        </a>
        <a href="#/teacher" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">✍️</span>
          <span class="mobile-bottom-label">التصحيح</span>
        </a>
        <a href="#/academy" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🎓</span>
          <span class="mobile-bottom-label">الأكاديمية</span>
        </a>
      `;
    } else if (user.role === 'admin') {
      // Admin Bottom Navigation
      bottomNav.innerHTML = `
        <a href="#/home" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">🏠</span>
          <span class="mobile-bottom-label">الرئيسية</span>
        </a>
        <a href="#/admin" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📰</span>
          <span class="mobile-bottom-label">المحتوى</span>
        </a>
        <a href="#/admin" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">📥</span>
          <span class="mobile-bottom-label">الطلبات</span>
        </a>
        <a href="#/admin" class="mobile-bottom-link">
          <span class="mobile-bottom-icon">⚙️</span>
          <span class="mobile-bottom-label">الإدارة</span>
        </a>
      `;
    }
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
            <div class="footer-title">الأقسام والخدمات</div>
            <ul class="footer-links">
              <li><a href="#/home">${nav.home}</a></li>
              <li><a href="#/about">${nav.about}</a></li>
              <li><a href="#/services">${nav.services}</a></li>
              <li><a href="#/standards">${nav.standards}</a></li>
              <li><a href="#/projects">${nav.projects || 'المشاريع'}</a></li>
              <li><a href="#/news">${nav.news || 'الأخبار'}</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-title">الأكاديمية والأنظمة</div>
            <ul class="footer-links">
              <li><a href="#/academy">${nav.academy}</a></li>
              <li><a href="#/delivery">${nav.delivery}</a></li>
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
      const foundCourse = d.courses?.find(c => c.id === courseId);
      const courseTitle = foundCourse ? foundCourse.title : 'طلب التحاق وتدريب عام';

      if (modalTitle) modalTitle.textContent = 'طلب التحاق بمساق تدريبي معتمد';

      modalBody.innerHTML = `
        <div style="margin-bottom: 16px; background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--shat-green);">المساق التدريبي المختار:</div>
          <div style="font-weight: 800; color: var(--shat-navy);">${courseTitle}</div>
        </div>

        <form id="modal-enrollment-form">
          <input type="hidden" id="app-course-id" value="${courseId}">
          <input type="hidden" id="app-course-title" value="${courseTitle}">

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">الاسم الرباعي الكامل *</label>
            <input type="text" id="app-fullname" class="form-input" placeholder="مثال: أحمد عبد الله خليل" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">رقم الهاتف وواتساب *</label>
              <input type="tel" id="app-phone" class="form-input" placeholder="+97259..." required>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">البريد الإلكتروني *</label>
              <input type="email" id="app-email" class="form-input" placeholder="name@domain.com" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">المؤسسة / جهة العمل الحالية</label>
            <input type="text" id="app-org" class="form-input" placeholder="اسم المنظمة أو المؤسسة أو الجامعة">
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-weight: 700; font-size: 0.88rem;">المؤهل العلمي أو التخصص</label>
            <input type="text" id="app-qualification" class="form-input" placeholder="مثال: بكالوريوس إدارة أعمال / علوم إنسانية">
          </div>

          <button type="submit" class="btn-clean btn-primary btn-lg" style="width: 100%;">
            <span>تأكيد وإرسال طلب الالتحاق</span>
            <span>←</span>
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
            submitBtn.innerHTML = `<span>جاري إرسال الطلب للخادم...</span>`;
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
            showToast(res.message || 'تم استلام طلب تسجيلكم بنجاح! سيقوم فريق القبول والتسجيل بالتواصل معكم لتأكيد الاعتماد.', 'success');
            modalBackdrop.classList.remove('open');
          } catch (err) {
            showToast('تعذر إرسال طلب الالتحاق: ' + err.message, 'error');
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = `<span>تأكيد وإرسال طلب الالتحاق</span><span>←</span>`;
            }
          }
        });
      }
    };

    // Re-render on auth updates
    window.addEventListener('shat:auth-updated', () => {
      this.renderHeader();
      this.renderMobileBottomNav();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Application();
});

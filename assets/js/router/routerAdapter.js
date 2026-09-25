// SHAT Platform — Router Adapter Engine (router/routerAdapter.js)
// Implements the Adapter Pattern:
// Resolves routes through the modern modular route registry first,
// while gracefully delegating unmigrated legacy views to the legacy router/pages.js.
// Strictly prevents Big-Bang Rewrite regressions.

import { MODULAR_ROUTES } from './routes.js';
import { authService } from '../services/auth/authService.js';
import { ErrorState } from '../components/ui/core.js';
import { router as legacyRouter } from '../router.js';
import { translations } from '../translations.js';
import { renderCourseDetailPage } from '../pages.js';

class RouterAdapter {
  constructor() {
    this.currentRoute = 'home';
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  }

  init(lang) {
    this.currentLang = lang || this.currentLang;
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('shat:auth-changed', () => this.handleRouting(true));
    this.handleRouting();
  }

  setLang(lang) {
    this.currentLang = lang;
    this.handleRouting(true);
  }

  async handleRouting(forceRerender = false) {
    let hash = window.location.hash.replace('#/', '').replace('#', '').trim();
    if (!hash) hash = 'home';

    const container = document.getElementById('app-content');
    if (!container) return;

    // 1. Check Course Detail Route (#/course/:id)
    if (hash.startsWith('course/')) {
      const courseId = hash.replace('course/', '').split('?')[0].trim();
      const t = translations[this.currentLang] || translations.ar;
      container.style.opacity = '0';
      setTimeout(() => {
        container.innerHTML = renderCourseDetailPage(t, courseId);
        legacyRouter.bindCourseDetailInteractions(courseId);
        this.updateActiveNav('academy');
        container.style.opacity = '1';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
      return;
    }

    // 2. Check Modern Modular Routes
    const modularRoute = MODULAR_ROUTES[hash];
    if (modularRoute) {
      // Permission Gate Check
      if (modularRoute.authRequired) {
        const user = authService.getCurrentUser();
        const hasRole = !modularRoute.role || user.role === 'admin' || user.role === 'super_admin' || user.role === modularRoute.role;
        if (!hasRole) {
          container.innerHTML = ErrorState({
            code: '403',
            title: 'صلاحيات غير كافية (Forbidden)',
            description: `هذه الصفحة تتطلب صلاحية [${modularRoute.role}]، بينما دورك الحالي هو [${user.role}].`,
            actionText: 'العودة لمساحة الطالب',
            actionRoute: '#/academy'
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      container.style.opacity = '0';
      try {
        const renderedHtml = await modularRoute.handler();
        container.innerHTML = renderedHtml;
        document.title = modularRoute.title;
        this.updateActiveNav(hash);
        container.style.opacity = '1';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('[RouterAdapter Error]:', err);
        container.innerHTML = ErrorState({
          code: '500',
          title: 'خطأ غير متوقع',
          description: 'تعذر تحميل هذه الصفحة، يرجى المحاولة لاحقاً.'
        });
        container.style.opacity = '1';
      }
      return;
    }

    // 3. Fallback to Legacy Router for Unmigrated Views (About, Tracks, Experiences, Impact, Contact, Google Form)
    if (legacyRouter.routes[hash]) {
      const t = translations[this.currentLang] || translations.ar;
      container.style.opacity = '0';
      setTimeout(() => {
        const renderFn = legacyRouter.routes[hash];
        container.innerHTML = renderFn(t);
        legacyRouter.bindPageInteractions();
        this.updateActiveNav(hash);
        container.style.opacity = '1';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
      return;
    }

    // 4. Catch-all 404 Route
    container.innerHTML = ErrorState({
      code: '404',
      title: 'الصفحة غير موجودة (404)',
      description: 'المسار المطلوب غير موجود أو تم نقله.',
      actionText: 'العودة للصفحة الرئيسية',
      actionRoute: '#/home'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateActiveNav(route) {
    document.querySelectorAll('.nav-link, .nav-academy-badge, .mobile-link').forEach(link => {
      const href = (link.getAttribute('href') || '').replace('#/', '').replace('#', '');
      const dataRoute = link.getAttribute('data-route') || '';
      const isMatch = href === route || dataRoute === route || (route === 'home' && href === 'discover');
      if (isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

export const routerAdapter = new RouterAdapter();

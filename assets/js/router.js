// assets/js/router.js
// Production Client-Side Hash Router for SHAT Platform
import { api } from './services/api/apiClient.js';
import { renderHomeView, bindHomeEvents } from './views/homeView.js';
import { renderAboutView } from './views/aboutView.js';
import { renderServicesView } from './views/servicesView.js';
import { renderStandardsView, bindStandardsEvents } from './views/standardsView.js';
import { renderDeliveryView } from './views/deliveryView.js';
import { renderProjectsView, bindProjectsEvents } from './views/projectsView.js';
import { renderNewsView, bindNewsEvents } from './views/newsView.js';
import { renderAcademyView, bindAcademyEvents } from './views/academyView.js';
import { renderContactView } from './views/contactView.js';
import { renderLoginView, bindLoginEvents } from './views/loginView.js';
import { renderStudentDashboardView, bindStudentEvents } from './views/studentDashboardView.js';
import { renderTeacherDashboardView, bindTeacherEvents } from './views/teacherDashboardView.js';
import { renderAdminView, bindAdminEvents } from './views/adminView.js';
import { renderCourseDetailView, bindCourseDetailEvents } from './views/courseDetailView.js';
import { renderFormsView, bindFormsEvents } from './views/formsView.js';
import { renderVerifyView, bindVerifyEvents } from './views/verifyView.js';
import { showToast } from './components/toast.js';

class SimpleRouter {
  constructor() {
    this.routes = {
      '': renderHomeView,
      'home': renderHomeView,
      'about': renderAboutView,
      'services': renderServicesView,
      'standards': renderStandardsView,
      'references': renderStandardsView,
      'projects': renderProjectsView,
      'news': renderNewsView,
      'delivery': renderDeliveryView,
      'delivery-model': renderDeliveryView,
      'academy': renderAcademyView,
      'contact': renderContactView,
      'login': renderLoginView,
      'student': renderStudentDashboardView,
      'student-dashboard': renderStudentDashboardView,
      'teacher': renderTeacherDashboardView,
      'admin': renderAdminView,
      'course': renderCourseDetailView,
      'forms': renderFormsView,
      'verify': renderVerifyView,
      'verify-certificate': renderVerifyView
    };
    this.currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('shat_platform_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    this.handleRoute();
  }

  handleRoute() {
    const rawHash = window.location.hash.replace('#/', '').replace('#', '').trim();
    const [path] = rawHash.split('?');
    const rootPath = path.split('/')[0] || 'home';

    const renderFn = this.routes[rootPath] || this.routes['home'];
    const container = document.getElementById('app-content');
    if (!container) return;

    // Fast, smooth fade in
    container.style.opacity = '0';
    setTimeout(() => {
      container.innerHTML = renderFn(this.currentLang);
      container.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updateActiveNav(rootPath);
      this.bindInteractions(rootPath);
    }, 40);
  }

  updateActiveNav(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.replace('#/', '').replace('#', '').trim();
      if (linkPath === path || (path === 'home' && linkPath === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update bottom nav active indicator as well
    document.querySelectorAll('.mobile-bottom-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.replace('#/', '').replace('#', '').trim();
      if (linkPath === path || (path === 'home' && linkPath === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  bindInteractions(activeRoute) {
    // Route-specific binders
    if (activeRoute === '' || activeRoute === 'home') {
      bindHomeEvents();
    } else if (activeRoute === 'login') {
      bindLoginEvents();
    } else if (activeRoute === 'student' || activeRoute === 'student-dashboard') {
      bindStudentEvents();
    } else if (activeRoute === 'teacher') {
      bindTeacherEvents();
    } else if (activeRoute === 'admin') {
      bindAdminEvents();
    } else if (activeRoute === 'course') {
      bindCourseDetailEvents();
    } else if (activeRoute === 'forms') {
      bindFormsEvents();
    } else if (activeRoute === 'projects') {
      bindProjectsEvents();
    } else if (activeRoute === 'academy') {
      bindAcademyEvents();
    } else if (activeRoute === 'news') {
      bindNewsEvents();
    } else if (activeRoute === 'verify' || activeRoute === 'verify-certificate') {
      bindVerifyEvents();
    } else if (activeRoute === 'standards' || activeRoute === 'references') {
      bindStandardsEvents();
    }

    // Consultation Inquiry Form Handler (Contact View)
    const inquiryForm = document.getElementById('consultation-inquiry-form');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        const lang = this.currentLang;
        const txt = (ar, en, fr) => {
          if (lang === 'fr') return fr || en;
          if (lang === 'en') return en;
          return ar;
        };

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = txt('جاري إرسال الطلب...', 'Sending inquiry...', 'Envoi de la demande...');
        }

        const inquiryData = {
          name: document.getElementById('contact-name')?.value,
          org: document.getElementById('contact-org')?.value,
          email: document.getElementById('contact-email')?.value,
          phone: document.getElementById('contact-phone')?.value,
          service: document.getElementById('contact-service')?.value,
          message: document.getElementById('contact-message')?.value
        };

        try {
          const res = await api.submitInquiry(inquiryData);
          const successMsg = res.message || txt(
            'شكراً لتواصلكم مع شركة شات للتنمية والتطوير. تم استلام طلبكم بنجاح وسيتواصل معكم فريقنا خلال 24 ساعة.',
            'Thank you for contacting SHAT Development & Growth. Your inquiry has been received and our team will contact you within 24 hours.',
            'Merci de contacter SHAT Développement & Croissance. Votre demande a bien été reçue et notre équipe vous recontactera sous 24h.'
          );
          showToast(successMsg, 'success');
          inquiryForm.reset();
        } catch (err) {
          showToast(txt('تعذر إرسال الطلب عبر الخادم: ', 'Failed to send inquiry to server: ', 'Échec de l\'envoi de la demande : ') + err.message, 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = txt('إرسال طلب الاستشارة أو التدريب ←', 'Submit Consultation / Training Request →', 'Envoyer la Demande de Consultation / Formation →');
          }
        }
      });
    }

    // Modal Registration Triggers
    document.querySelectorAll('.btn-open-reg-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const courseId = e.currentTarget.getAttribute('data-course') || 'general';
        if (window.openGlobalModal) {
          window.openGlobalModal(courseId);
        }
      });
    });
  }
}

export const router = new SimpleRouter();

// assets/js/router.js
// Clean Minimalist Client-Side Hash Router
import { renderHomeView } from './views/homeView.js';
import { renderAboutView } from './views/aboutView.js';
import { renderServicesView } from './views/servicesView.js';
import { renderStandardsView } from './views/standardsView.js';
import { renderDeliveryView } from './views/deliveryView.js';
import { renderAcademyView } from './views/academyView.js';
import { renderContactView } from './views/contactView.js';
import { renderAdminView } from './views/adminView.js';

class SimpleRouter {
  constructor() {
    this.routes = {
      '': renderHomeView,
      'home': renderHomeView,
      'about': renderAboutView,
      'services': renderServicesView,
      'standards': renderStandardsView,
      'references': renderStandardsView,
      'delivery': renderDeliveryView,
      'delivery-model': renderDeliveryView,
      'academy': renderAcademyView,
      'contact': renderContactView,
      'admin': renderAdminView
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
    const cleanPath = path || 'home';

    const renderFn = this.routes[cleanPath] || this.routes['home'];
    const container = document.getElementById('app-content');
    if (!container) return;

    // Fast, smooth fade in
    container.style.opacity = '0';
    setTimeout(() => {
      container.innerHTML = renderFn(this.currentLang);
      container.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updateActiveNav(cleanPath);
      this.bindInteractions();
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
  }

  bindInteractions() {
    // Consultation Inquiry Form Handler
    const inquiryForm = document.getElementById('consultation-inquiry-form');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inquiryData = {
          name: document.getElementById('contact-name')?.value,
          org: document.getElementById('contact-org')?.value,
          email: document.getElementById('contact-email')?.value,
          phone: document.getElementById('contact-phone')?.value,
          service: document.getElementById('contact-service')?.value,
          message: document.getElementById('contact-message')?.value,
          createdAt: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('shat_inquiries') || '[]');
        existing.unshift(inquiryData);
        localStorage.setItem('shat_inquiries', JSON.stringify(existing));

        alert('شكراً لتواصلكم مع شركة شات للتنمية والتطوير. تم استلام طلبكم بنجاح وسيتواصل معكم فريقنا خلال 24 ساعة.');
        inquiryForm.reset();
      });
    }

    // Modal Registration Triggers
    document.querySelectorAll('.btn-open-reg-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const courseId = e.currentTarget.getAttribute('data-course') || 'general';
        window.openGlobalModal(courseId);
      });
    });
  }
}

export const router = new SimpleRouter();

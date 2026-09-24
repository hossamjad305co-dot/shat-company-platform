// Shat Company Platform - Client-Side Multi-Page Router

import { translations } from './translations.js';
import {
  renderHomePage,
  renderAboutPage,
  renderServicesPage,
  renderConsultingPage,
  renderDeliveryModelPage,
  renderApproachPage,
  renderReferencesPage,
  renderExpertisePage,
  renderValuePartnershipsPage,
  renderContactPage,
  renderAcademyPage
} from './pages.js';
import {
  submitAcademyEnrollment,
  submitInquiry,
  verifyCertificate
} from './supabaseClient.js';

class Router {
  constructor() {
    this.routes = {
      'home': renderHomePage,
      'about': renderAboutPage,
      'services': renderServicesPage,
      'consulting': renderConsultingPage,
      'delivery-model': renderDeliveryModelPage,
      'approach': renderApproachPage,
      'references': renderReferencesPage,
      'expertise': renderExpertisePage,
      'value-partnerships': renderValuePartnershipsPage,
      'contact': renderContactPage,
      'academy': renderAcademyPage
    };
    this.currentRoute = 'home';
    this.currentLang = 'ar';
  }

  init(currentLang) {
    this.currentLang = currentLang;
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  }

  setLang(lang) {
    this.currentLang = lang;
    this.handleRouting(true);
  }

  handleRouting(forceRerender = false) {
    let hash = window.location.hash.replace('#/', '').replace('#', '').trim();
    if (!hash || !this.routes[hash]) {
      hash = 'home';
      window.location.hash = '#/home';
    }

    if (!forceRerender && this.currentRoute === hash && document.getElementById('app-content').innerHTML !== '') {
      return;
    }

    this.currentRoute = hash;
    const t = translations[this.currentLang] || translations.ar;
    const renderFn = this.routes[hash];
    const container = document.getElementById('app-content');

    if (container && renderFn) {
      container.style.opacity = '0';
      setTimeout(() => {
        container.innerHTML = renderFn(t);
        this.updateActiveNavLinks(hash);
        this.bindPageInteractions();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        container.style.opacity = '1';
      }, 100);
    }
  }

  updateActiveNavLinks(route) {
    document.querySelectorAll('.nav-link, .nav-academy-badge, .mobile-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `/#/${route}` || (route === 'home' && href === '#/home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  bindPageInteractions() {
    const t = translations[this.currentLang] || translations.ar;

    // Subsection Tab Switching inside section pages
    const tabButtons = document.querySelectorAll('.sub-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.sub-section-content').forEach(sec => {
          if (sec.id === targetId) {
            sec.style.display = 'block';
            sec.style.animation = 'fadeIn 0.25s ease forwards';
          } else {
            sec.style.display = 'none';
          }
        });
      });
    });

    // Contact Form submission
    const contactForm = document.getElementById('contact-page-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        const inquiryData = {
          fullName: inputs[0]?.value || '',
          email: inputs[1]?.value || '',
          subject: inputs[3]?.value || 'General Inquiry',
          message: inputs[4]?.value || ''
        };
        await submitInquiry(inquiryData);
        alert(t.contact.successMsg);
        contactForm.reset();
      });
    }

    // ACADEMY INTERACTIONS
    // 1. Track Filter Pills
    const trackPills = document.querySelectorAll('.academy-track-pill');
    const courseCards = document.querySelectorAll('.course-card');
    trackPills.forEach(pill => {
      pill.addEventListener('click', () => {
        trackPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const trackId = pill.getAttribute('data-track');

        courseCards.forEach(card => {
          const cardTrack = card.getAttribute('data-track');
          if (trackId === 'all' || cardTrack === trackId) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.25s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // 2. Real-time Search Filter
    const searchInput = document.getElementById('academy-course-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        courseCards.forEach(card => {
          const text = card.textContent.toLowerCase();
          if (!query || text.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    // 3. Syllabus Modal
    const syllabusModal = document.getElementById('academy-syllabus-modal');
    const syllabusContent = document.getElementById('syllabus-modal-content');
    const syllabusCloseBtn = document.getElementById('syllabus-modal-close');

    if (syllabusModal && syllabusCloseBtn) {
      syllabusCloseBtn.addEventListener('click', () => {
        syllabusModal.classList.remove('active');
      });
      syllabusModal.addEventListener('click', (e) => {
        if (e.target === syllabusModal) syllabusModal.classList.remove('active');
      });
    }

    document.querySelectorAll('.btn-syllabus').forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.getAttribute('data-course-id');
        const course = t.academy.courses.find(c => c.id === courseId);
        if (course && syllabusContent && syllabusModal) {
          syllabusContent.innerHTML = `
            <span class="card-badge" style="background: var(--shat-green-50); color: var(--shat-green-800);">${course.trackName}</span>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--shat-navy-950); margin: 10px 0 8px;">
              ${course.title}
            </h2>
            <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
              ${course.desc}
            </p>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--shat-navy-900); margin-bottom: 12px;">
              ${t.academy.modal.syllabusTitle}:
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${course.syllabus.map((mod, idx) => `
                <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px 18px; display: flex; align-items: center; gap: 12px;">
                  <span style="width: 26px; height: 26px; border-radius: 50%; background: var(--shat-green-600); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: bold; flex-shrink: 0;">${idx + 1}</span>
                  <span style="font-size: 0.95rem; font-weight: 600; color: var(--shat-navy-950);">${mod}</span>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.88rem; color: var(--text-muted);">⏱ ${course.duration}</span>
              <button class="btn-enroll" data-course-id="${course.id}" data-course-title="${course.title}" onclick="document.getElementById('academy-syllabus-modal').classList.remove('active');">
                ${t.academy.modal.enrollTitle}
              </button>
            </div>
          `;
          syllabusModal.classList.add('active');

          // Re-bind enroll button inside syllabus
          syllabusContent.querySelector('.btn-enroll')?.addEventListener('click', () => {
            openEnrollModal(course.id, course.title);
          });
        }
      });
    });

    // 4. Enrollment Modal & Form
    const enrollModal = document.getElementById('academy-enroll-modal');
    const enrollCloseBtn = document.getElementById('enroll-modal-close');
    const enrollCourseSubtitle = document.getElementById('enroll-course-subtitle');
    const enrollCourseId = document.getElementById('enroll-course-id');
    const enrollCourseTitle = document.getElementById('enroll-course-title');
    const enrollForm = document.getElementById('academy-enrollment-form');

    function openEnrollModal(cId, cTitle) {
      if (enrollModal && enrollCourseSubtitle && enrollCourseId && enrollCourseTitle) {
        enrollCourseId.value = cId;
        enrollCourseTitle.value = cTitle;
        enrollCourseSubtitle.textContent = `« ${cTitle} »`;
        enrollModal.classList.add('active');
      }
    }

    if (enrollModal && enrollCloseBtn) {
      enrollCloseBtn.addEventListener('click', () => enrollModal.classList.remove('active'));
      enrollModal.addEventListener('click', (e) => {
        if (e.target === enrollModal) enrollModal.classList.remove('active');
      });
    }

    document.querySelectorAll('.btn-enroll').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-course-id');
        const cTitle = btn.getAttribute('data-course-title');
        openEnrollModal(cId, cTitle);
      });
    });

    if (enrollForm) {
      enrollForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = enrollForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '... جارٍ التسجيل';
        }

        const data = {
          courseId: enrollCourseId.value,
          courseTitle: enrollCourseTitle.value,
          fullName: document.getElementById('enroll-fullname').value,
          email: document.getElementById('enroll-email').value,
          phone: document.getElementById('enroll-phone').value,
          organization: document.getElementById('enroll-org').value,
          background: document.getElementById('enroll-background').value
        };

        await submitAcademyEnrollment(data);

        alert(t.academy.modal.successMsg);
        enrollForm.reset();
        enrollModal.classList.remove('active');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = t.academy.modal.submitEnroll;
        }
      });
    }

    // 5. Official Certificate Verification
    const certInput = document.getElementById('cert-code-input');
    const certBtn = document.getElementById('cert-verify-btn');
    const certResultBox = document.getElementById('cert-result-box');
    const certNotFoundBox = document.getElementById('cert-not-found-box');

    if (certBtn && certInput) {
      certBtn.addEventListener('click', async () => {
        const code = certInput.value.trim();
        if (!code) return;

        certBtn.disabled = true;
        certBtn.textContent = '... جارٍ الفحص';

        const { found, certificate } = await verifyCertificate(code);

        certBtn.disabled = false;
        certBtn.textContent = t.academy.verify.btn;

        if (found && certificate) {
          if (certNotFoundBox) certNotFoundBox.style.display = 'none';
          document.getElementById('res-cert-number').textContent = certificate.certificate_number;
          document.getElementById('res-student-name').textContent = certificate.recipient_name;
          document.getElementById('res-course-name').textContent = certificate.course_name;
          document.getElementById('res-issue-date').textContent = certificate.issue_date;
          document.getElementById('res-grade').textContent = certificate.grade;
          document.getElementById('res-accreditation').textContent = certificate.accreditation_details;
          if (certResultBox) certResultBox.style.display = 'block';
        } else {
          if (certResultBox) certResultBox.style.display = 'none';
          if (certNotFoundBox) certNotFoundBox.style.display = 'block';
        }
      });
    }
  }
}

export const router = new Router();


// Shat Company Platform - Client-Side Multi-Page Router & Moodle Controller

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
  submitConsultation,
  verifyCertificate
} from './supabaseClient.js';
import {
  moodleStore,
  getMoodleCourses,
  saveMoodleCourses,
  addCourseFile,
  toggleCourseStatus,
  sendCourseChatMessage,
  sendStaffMessage
} from './moodle.js';

class Router {
  constructor() {
    this.routes = {
      // 01 — اكتشف SHAT
      'discover': renderHomePage,
      'home': renderHomePage,

      // 02 — قصتنا
      'our-story': renderAboutPage,
      'about': renderAboutPage,

      // 03 — ماذا نصنع؟
      'what-we-make': renderServicesPage,
      'services': renderServicesPage,

      // 04 — مساراتنا
      'tracks': renderConsultingPage,
      'consulting': renderConsultingPage,

      // 05 — تجاربنا
      'experiences': renderDeliveryModelPage,
      'delivery-model': renderDeliveryModelPage,

      // 06 — أثرنا
      'impact': renderApproachPage,
      'approach': renderApproachPage,

      // 07 — مساحة المعرفة
      'knowledge-hub': renderReferencesPage,
      'references': renderReferencesPage,
      'expertise': renderExpertisePage,
      'value-partnerships': renderValuePartnershipsPage,

      // 08 — لنبني الأثر معًا
      'build-impact': renderContactPage,
      'contact': renderContactPage,

      // أكاديمية SHAT ونظام المودل
      'academy': renderAcademyPage,
      'moodle': renderAcademyPage,
      'moodle-chat': renderAcademyPage
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

    if (!forceRerender && this.currentRoute === hash && document.getElementById('app-content')?.innerHTML !== '') {
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

        // Auto select chat if accessed via #/moodle-chat
        if (hash === 'moodle-chat') {
          const chatBtn = document.querySelector('[data-tab="tab-moodle-student"]');
          if (chatBtn) chatBtn.click();
          document.getElementById('student-chat-input')?.focus();
        }
      }, 80);
    }
  }

  updateActiveNavLinks(route) {
    // 1. Desktop Nav & Mobile Drawer
    document.querySelectorAll('.nav-link, .nav-academy-badge, .mobile-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const cleanHref = href.replace('#/', '').replace('#', '');
      const dataRoute = link.getAttribute('data-route') || '';

      const isMatch = (
        cleanHref === route ||
        dataRoute === route ||
        (route === 'home' && (cleanHref === 'discover' || cleanHref === 'home')) ||
        (route === 'discover' && (cleanHref === 'home' || cleanHref === 'discover')) ||
        (route === 'about' && (cleanHref === 'our-story' || cleanHref === 'about')) ||
        (route === 'services' && (cleanHref === 'what-we-make' || cleanHref === 'services')) ||
        (route === 'consulting' && (cleanHref === 'tracks' || cleanHref === 'consulting')) ||
        (route === 'delivery-model' && (cleanHref === 'experiences' || cleanHref === 'delivery-model')) ||
        (route === 'approach' && (cleanHref === 'impact' || cleanHref === 'approach')) ||
        (route === 'references' && (cleanHref === 'knowledge-hub' || cleanHref === 'references')) ||
        (route === 'contact' && (cleanHref === 'build-impact' || cleanHref === 'contact')) ||
        (route === 'moodle' && cleanHref === 'academy') ||
        (route === 'moodle-chat' && cleanHref === 'academy')
      );

      if (isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 2. Mobile Bottom Navigation Bar (Tab Bar)
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const itemRoute = item.getAttribute('data-route');
      if (itemRoute === route || (itemRoute === 'academy' && (route === 'moodle' || route === 'academy'))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  bindPageInteractions() {
    const t = translations[this.currentLang] || translations.ar;

    // 1. Sub-sections Tab Switching (Scrollspy / Tabs inside 8 sections)
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

    // 2. Contact Page Form submission
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

    // ========================================================
    // MOODLE LMS INTERACTIONS (نظام المودل والأكاديمية)
    // ========================================================

    // 3. Moodle Role Tabs (Student, Teacher, Admin, Corporate, Verify)
    const moodleRoleButtons = document.querySelectorAll('.moodle-role-btn');
    const moodlePanes = document.querySelectorAll('.moodle-tab-pane');
    moodleRoleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        moodleRoleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        moodlePanes.forEach(pane => {
          if (pane.id === targetTab) {
            pane.style.display = 'block';
            pane.style.animation = 'fadeIn 0.25s ease forwards';
          } else {
            pane.style.display = 'none';
          }
        });
      });
    });

    // 4. Direct File Download (Google Drive CDN simulation)
    document.querySelectorAll('.btn-direct-download').forEach(btn => {
      btn.addEventListener('click', () => {
        const fileName = btn.getAttribute('data-file') || 'ملف تدريبي';
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>⏳ جارٍ التنزيل...</span>';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '<span>✓ تم التحميل</span>';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }, 2000);

          // Simulated safe file download trigger
          alert(`✓ تم تحميل « ${fileName} » بنجاح مباشرة من سحابة Google Drive التابعة لمنصة شات.`);
        }, 800);
      });
    });

    // 5. Teacher Portal: Direct Training File Uploader
    const uploadForm = document.getElementById('teacher-file-upload-form');
    const dropzone = document.getElementById('teacher-dropzone');
    const fileInput = document.getElementById('teacher-file-input');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const titleInput = document.getElementById('upload-file-title');
          if (titleInput && !titleInput.value) {
            titleInput.value = file.name;
          }
        }
      });
    }

    if (uploadForm) {
      uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const courseSelect = document.getElementById('upload-course-select');
        const titleInput = document.getElementById('upload-file-title');
        const typeSelect = document.getElementById('upload-type-select');
        const progressContainer = document.getElementById('upload-progress-container');
        const progressBar = document.getElementById('upload-progress-bar');
        const submitBtn = uploadForm.querySelector('button[type="submit"]');

        if (!titleInput.value) return;

        if (progressContainer && progressBar) {
          progressContainer.style.display = 'block';
          progressBar.style.width = '0%';
          if (submitBtn) submitBtn.disabled = true;

          let p = 0;
          const interval = setInterval(() => {
            p += 25;
            progressBar.style.width = p + '%';
            if (p >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                const newFile = {
                  name: titleInput.value,
                  size: (Math.random() * 8 + 1).toFixed(1) + ' MB',
                  type: typeSelect.value,
                  driveLink: 'https://drive.google.com/file/d/shat-cloud/' + Date.now()
                };

                addCourseFile(courseSelect.value, newFile);

                // Add to student files list if visible
                const studentFilesList = document.getElementById('student-files-list');
                if (studentFilesList) {
                  const card = document.createElement('div');
                  card.className = 'file-download-card';
                  card.style.animation = 'fadeIn 0.3s ease';
                  card.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span style="font-size: 1.6rem;">📄</span>
                      <div>
                        <div style="font-weight: 700; font-size: 0.92rem; color: var(--shat-navy-950);">${newFile.name}</div>
                        <div style="font-size: 0.78rem; color: var(--text-muted);">${newFile.type} • ${newFile.size} • رُفع للتو بواسطة المدرب • Google Drive CDN</div>
                      </div>
                    </div>
                    <button class="file-download-btn btn-direct-download" data-file="${newFile.name}">
                      <span>📥 تحميل مباشر</span>
                    </button>
                  `;
                  studentFilesList.prepend(card);

                  // Re-bind download button
                  card.querySelector('.btn-direct-download').addEventListener('click', function() {
                    alert(`✓ تم تحميل « ${newFile.name} » بنجاح.`);
                  });
                }

                alert(`✓ تم رفع الملف « ${newFile.name} » بنجاح وتخزينه في سحابة Google Drive التابعة للدورة، وأصبح متاحاً للطلاب فوراً!`);
                uploadForm.reset();
                progressContainer.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
              }, 400);
            }
          }, 200);
        }
      });
    }

    // 6. Admin Portal: Course Active / Inactive Toggle & Floating Save Panel
    const courseToggles = document.querySelectorAll('.admin-course-toggle');
    const savePanel = document.getElementById('admin-floating-save-panel');
    const saveConfirmBtn = document.getElementById('save-panel-confirm-btn');
    const saveDiscardBtn = document.getElementById('save-panel-discard-btn');

    let pendingToggles = {};

    courseToggles.forEach(toggle => {
      toggle.addEventListener('change', () => {
        const cId = toggle.getAttribute('data-course-id');
        pendingToggles[cId] = toggle.checked;

        // Update indicator text next to switch
        const statusText = toggle.closest('div').querySelector('.status-indicator-text');
        if (statusText) {
          if (toggle.checked) {
            statusText.textContent = 'مفعل (نشط)';
            statusText.style.color = '#1b5e20';
          } else {
            statusText.textContent = 'معطل مؤقتاً';
            statusText.style.color = '#991b1b';
          }
        }

        // Show NameThatUI Save Panel
        if (savePanel) savePanel.classList.add('show');
      });
    });

    if (saveConfirmBtn) {
      saveConfirmBtn.addEventListener('click', () => {
        Object.keys(pendingToggles).forEach(cId => {
          toggleCourseStatus(cId, pendingToggles[cId]);
        });
        pendingToggles = {};
        if (savePanel) savePanel.classList.remove('show');
        alert('✓ تم حفظ وتطبيق حالة الدورات في النظام بنجاح!');
      });
    }

    if (saveDiscardBtn) {
      saveDiscardBtn.addEventListener('click', () => {
        pendingToggles = {};
        if (savePanel) savePanel.classList.remove('show');
      });
    }

    // 7. Student-Teacher Chat (NameThatUI: Chat Bubble + Status Dot)
    const studentChatSend = document.getElementById('student-chat-send');
    const studentChatInput = document.getElementById('student-chat-input');
    const studentChatThread = document.getElementById('student-chat-thread');

    function sendStudentMsg() {
      if (!studentChatInput || !studentChatThread) return;
      const text = studentChatInput.value.trim();
      if (!text) return;

      const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

      // Outgoing bubble
      const msgRow = document.createElement('div');
      msgRow.className = 'chat-message-row outgoing';
      msgRow.innerHTML = `
        <div class="chat-bubble">
          ${text}
          <span class="chat-bubble-time">${timeNow} ✓✓</span>
        </div>
      `;
      studentChatThread.appendChild(msgRow);
      studentChatInput.value = '';
      studentChatThread.scrollTop = studentChatThread.scrollHeight;

      // Simulated Instructor reply after 1.2s
      setTimeout(() => {
        const replyRow = document.createElement('div');
        replyRow.className = 'chat-message-row incoming';
        replyRow.innerHTML = `
          <div class="chat-bubble">
            <strong>د. أسامة المنصور:</strong> مرحباً أحمد، تم استلام استفسارك بخصوص (${text}). سأقوم بالرد التفصيلي ومراجعة ملفاتك خلال ساعات العمل اليوم.
            <span class="chat-bubble-time">${new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        `;
        studentChatThread.appendChild(replyRow);
        studentChatThread.scrollTop = studentChatThread.scrollHeight;
      }, 1200);
    }

    if (studentChatSend && studentChatInput) {
      studentChatSend.addEventListener('click', sendStudentMsg);
      studentChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendStudentMsg();
      });
    }

    // 8. Staff Internal Chat
    const staffChatSend = document.getElementById('staff-chat-send');
    const staffChatInput = document.getElementById('staff-chat-input');
    const staffChatThread = document.getElementById('staff-chat-thread');

    function sendStaffMsg() {
      if (!staffChatInput || !staffChatThread) return;
      const text = staffChatInput.value.trim();
      if (!text) return;

      const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
      const msgRow = document.createElement('div');
      msgRow.className = 'chat-message-row outgoing';
      msgRow.innerHTML = `
        <div class="chat-bubble">
          <strong>أنت:</strong> ${text}
          <span class="chat-bubble-time">${timeNow} ✓✓</span>
        </div>
      `;
      staffChatThread.appendChild(msgRow);
      staffChatInput.value = '';
      staffChatThread.scrollTop = staffChatThread.scrollHeight;
    }

    if (staffChatSend && staffChatInput) {
      staffChatSend.addEventListener('click', sendStaffMsg);
      staffChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendStaffMsg();
      });
    }

    // 9. Corporate Training Registration Form
    const corporateForm = document.getElementById('corporate-training-form');
    if (corporateForm) {
      corporateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = corporateForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '... جارٍ الإرسال والتأكيد';
        }

        const corpData = {
          companyName: document.getElementById('corp-company-name')?.value || '',
          sector: document.getElementById('corp-sector')?.value || '',
          traineesCount: document.getElementById('corp-trainees-count')?.value || '1',
          program: document.getElementById('corp-target-program')?.value || '',
          contactPerson: document.getElementById('corp-contact-name')?.value || '',
          email: document.getElementById('corp-contact-email')?.value || '',
          phone: document.getElementById('corp-contact-phone')?.value || '',
          notes: document.getElementById('corp-notes')?.value || ''
        };

        await submitConsultation({
          fullName: corpData.contactPerson,
          email: corpData.email,
          organization: `${corpData.companyName} (${corpData.sector})`,
          serviceType: `Corporate Training: ${corpData.program} (${corpData.traineesCount} Trainees)`,
          details: `Phone: ${corpData.phone} | Notes: ${corpData.notes}`
        });

        alert('✓ تم إرسال طلب تدريب المؤسسة بنجاح! سيتواصل معكم مستشار التدريب في شركة شات للتنمية عبر واتساب أو البريد لتنسيق تفاصيل الحقائب ومواعيد الجلسات.');
        corporateForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'إرسال طلب تدريب المؤسسات وتأكيد الحجز';
        }
      });
    }

    // 10. Certificate Verification
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
        certBtn.textContent = 'فحص الشهادة';

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

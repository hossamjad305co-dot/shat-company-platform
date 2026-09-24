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
  renderAcademyPage,
  renderGoogleFormRegistration
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
  sendStaffMessage,
  downloadRealFile
} from './moodle.js';
import { authService } from './auth.js';
import { cmsService } from './cms.js';

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

      // استمارة تسجيل الدورات التدريبية (Google Form)
      'register-course': renderGoogleFormRegistration,
      'registration': renderGoogleFormRegistration,
      'admissions': renderGoogleFormRegistration,

      // أكاديمية SHAT ونظام المودل وكلاس روم
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
    // MOODLE & GOOGLE CLASSROOM LMS INTERACTIONS
    // ========================================================

    // 1. Google Classroom Sub-Navigation Tabs
    const classroomTabs = document.querySelectorAll('.classroom-nav-tab');
    const classroomPanes = document.querySelectorAll('.classroom-pane');

    classroomTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPaneId = 'pane-' + tab.getAttribute('data-classroom-tab');
        classroomTabs.forEach(t => {
          t.classList.remove('active');
          t.style.borderBottomColor = 'transparent';
          t.style.color = 'var(--text-secondary)';
          t.style.fontWeight = '600';
        });
        tab.classList.add('active');
        tab.style.borderBottomColor = 'var(--shat-green-600)';
        tab.style.color = 'var(--shat-green-700)';
        tab.style.fontWeight = '700';

        classroomPanes.forEach(pane => {
          if (pane.id === targetPaneId) {
            pane.style.display = 'block';
            pane.classList.add('active');
            pane.style.animation = 'fadeIn 0.2s ease forwards';
          } else {
            pane.style.display = 'none';
            pane.classList.remove('active');
          }
        });
      });
    });

    // 2. REAL FILE DOWNLOAD ENGINE (Physical browser download of genuine materials)
    document.querySelectorAll('.btn-trigger-real-download, .btn-direct-download').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const fileName = btn.getAttribute('data-file') || 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf';
        const originalHtml = btn.innerHTML;

        btn.innerHTML = '<span>⏳ جارٍ التنزيل الفعلي...</span>';
        btn.disabled = true;

        setTimeout(() => {
          // Trigger actual browser download
          downloadRealFile(fileName);

          btn.innerHTML = '<span>✓ تم التحميل لجهازك</span>';
          setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
          }, 2200);
        }, 500);
      });
    });

    // 3. Quick Stream Announcement Poster
    const btnPostAnnounce = document.getElementById('btn-post-stream-announce');
    const inputAnnounce = document.getElementById('stream-quick-announce');
    const streamFeed = document.getElementById('classroom-stream-feed');

    if (btnPostAnnounce && inputAnnounce && streamFeed) {
      btnPostAnnounce.addEventListener('click', () => {
        const text = inputAnnounce.value.trim();
        if (!text) return;

        const user = authService.getCurrentUser() || { name: 'المستخدم', avatarLetter: 'ش' };
        const newCard = document.createElement('div');
        newCard.style.cssText = 'background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm); animation: fadeIn 0.3s ease;';
        newCard.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ecfdf5; border: 1px solid #10b981; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #047857;">
              ${user.avatarLetter || user.name.charAt(0)}
            </div>
            <div>
              <strong style="color: var(--shat-navy-950); font-size: 0.95rem; display: block;">${user.name}</strong>
              <span style="font-size: 0.76rem; color: var(--text-muted);">الآن • منشور ساحة المشاركات</span>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin: 0;">
            ${text}
          </p>
        `;
        streamFeed.prepend(newCard);
        inputAnnounce.value = '';
      });
    }

    // 4. Google Form Course Application Wizard (#/register-course)
    const gformApp = document.getElementById('google-form-course-application');
    const gformReceipt = document.getElementById('gform-success-receipt');
    const gformReceiptCode = document.getElementById('gform-receipt-code');
    const btnSubmitAnother = document.getElementById('btn-submit-another-gform');

    if (gformApp) {
      gformApp.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btn-submit-gform');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '... جارٍ الإرسال والتسجيل';
        }

        const formData = {
          fullName: document.getElementById('gform-name')?.value.trim() || '',
          email: document.getElementById('gform-email')?.value.trim() || '',
          phone: document.getElementById('gform-phone')?.value.trim() || '',
          organization: document.getElementById('gform-org')?.value.trim() || 'متدرب مستقل',
          jobTitle: document.getElementById('gform-job')?.value.trim() || '',
          courseTrack: document.querySelector('input[name="gform-course"]:checked')?.value || 'دبلوم CHS',
          trainingMode: document.querySelector('input[name="gform-mode"]:checked')?.value || 'افتراضي',
          experience: document.getElementById('gform-exp')?.value.trim() || ''
        };

        const newApp = cmsService.submitApplication(formData);

        setTimeout(() => {
          gformApp.style.display = 'none';
          if (gformReceipt) gformReceipt.style.display = 'block';
          if (gformReceiptCode) gformReceiptCode.textContent = newApp.id;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 600);
      });
    }

    if (btnSubmitAnother && gformApp && gformReceipt) {
      btnSubmitAnother.addEventListener('click', () => {
        gformApp.reset();
        gformReceipt.style.display = 'none';
        gformApp.style.display = 'flex';
        const submitBtn = document.getElementById('btn-submit-gform');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'إرسال الاستمارة (Submit)';
        }
      });
    }

    // 5. Admin Staff Management
    const btnToggleAddStaff = document.getElementById('btn-toggle-add-staff');
    const boxAddStaff = document.getElementById('box-add-staff-form');
    const btnCancelAddStaff = document.getElementById('btn-cancel-add-staff');
    const formAddStaff = document.getElementById('form-create-staff-member');

    if (btnToggleAddStaff && boxAddStaff) {
      btnToggleAddStaff.addEventListener('click', () => {
        const isHidden = boxAddStaff.style.display === 'none';
        boxAddStaff.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (btnCancelAddStaff && boxAddStaff) {
      btnCancelAddStaff.addEventListener('click', () => {
        boxAddStaff.style.display = 'none';
      });
    }

    if (formAddStaff) {
      formAddStaff.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-staff-name')?.value.trim();
        const username = document.getElementById('new-staff-username')?.value.trim();
        const email = document.getElementById('new-staff-email')?.value.trim();
        const password = document.getElementById('new-staff-password')?.value;
        const phone = document.getElementById('new-staff-phone')?.value.trim();
        const role = document.getElementById('new-staff-role')?.value || 'instructor';

        if (!name || !username || !email || !password) return;

        authService.addStaffMember({ name, username, email, password, phone, role });
        alert(`✓ تم تعيين الموظف « ${name} » بصلاحية (${authService.getRoleTitle(role)}) بنجاح!`);
        formAddStaff.reset();
        if (boxAddStaff) boxAddStaff.style.display = 'none';

        // Re-render Moodle page to reflect updated staff list
        router.handleRouting(true);
      });
    }

    // Staff Role changes & Delete actions
    document.querySelectorAll('.staff-role-change').forEach(select => {
      select.addEventListener('change', () => {
        const username = select.getAttribute('data-username');
        const newRole = select.value;
        authService.updateStaffRole(username, newRole);
        alert(`✓ تم تحديث صلاحية الموظف (${username}) إلى: ${authService.getRoleTitle(newRole)}.`);
      });
    });

    document.querySelectorAll('.btn-delete-staff').forEach(btn => {
      btn.addEventListener('click', () => {
        const username = btn.getAttribute('data-username');
        if (confirm(`هل أنت متأكد من رغبتك في حذف الموظف (${username}) من النظام؟`)) {
          authService.deleteStaffMember(username);
          alert('✓ تم حذف الموظف بنجاح.');
          router.handleRouting(true);
        }
      });
    });

    // 6. Admin Admissions Approval / Rejection
    document.querySelectorAll('.btn-approve-admission').forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.getAttribute('data-appid');
        cmsService.updateApplicationStatus(appId, 'approved');
        const row = btn.closest('tr');
        if (row) {
          const pill = row.querySelector('.status-pill');
          if (pill) {
            pill.className = 'status-pill active';
            pill.textContent = '✓ مقبول وتم التسكين';
          }
        }
        alert(`✓ تم قبول الطلب [${appId}] بنجاح، وتسكين الطالب في كلاس روم المودل وإرسال إشعار الترحيب.`);
      });
    });

    document.querySelectorAll('.btn-reject-admission').forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.getAttribute('data-appid');
        cmsService.updateApplicationStatus(appId, 'rejected');
        const row = btn.closest('tr');
        if (row) {
          const pill = row.querySelector('.status-pill');
          if (pill) {
            pill.className = 'status-pill';
            pill.textContent = '✗ مرفوض';
          }
        }
        alert(`تم تحديث حالة الطلب [${appId}] إلى مرفوض.`);
      });
    });

    // 7. Admin Site CMS Editor Form (Like Lotus Flowers Store pattern)
    const cmsForm = document.getElementById('form-site-cms-editor');
    if (cmsForm) {
      cmsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const heroTitle = document.getElementById('cms-hero-title')?.value.trim();
        const heroSubtitle = document.getElementById('cms-hero-subtitle')?.value.trim();
        const companyMotto = document.getElementById('cms-motto')?.value.trim();
        const companyTagline = document.getElementById('cms-tagline')?.value.trim();
        const phone = document.getElementById('cms-phone')?.value.trim();
        const email = document.getElementById('cms-email')?.value.trim();
        const address = document.getElementById('cms-address')?.value.trim();

        cmsService.saveCMSData({
          heroTitle,
          heroSubtitle,
          companyMotto,
          companyTagline,
          phone,
          email,
          address
        });

        alert('✓ تم حفظ كافة تعديلات نصوص وبيانات الموقع بنجاح، وتطبيقها فوراً على المنصة!');
      });
    }

    // 8. Teacher Training File Uploader
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
                  type: 'PDF',
                  driveLink: 'https://drive.google.com/file/d/shat-cloud/' + Date.now()
                };

                addCourseFile(courseSelect.value, newFile);

                alert(`✓ تم رفع الملف « ${newFile.name} » بنجاح وتخزينه في سحابة Google Drive التابعة للدورة، وأصبح متاحاً للتحميل الفوري للطلاب!`);
                uploadForm.reset();
                progressContainer.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
                router.handleRouting(true);
              }, 400);
            }
          }, 150);
        }
      });
    }

    // 9. Student-Teacher Chat
    const studentChatSend = document.getElementById('student-chat-send');
    const studentChatInput = document.getElementById('student-chat-input');
    const studentChatThread = document.getElementById('student-chat-thread');

    function sendStudentMsg() {
      if (!studentChatInput || !studentChatThread) return;
      const text = studentChatInput.value.trim();
      if (!text) return;

      const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
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
            <strong>د. أسامة المنصور:</strong> مرحباً، تم استلام استفسارك بخصوص (${text}). سأقوم بالرد التفصيلي ومراجعة ملفاتك خلال ساعات العمل اليوم.
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

    // 11. Social Posts Category Filter & Interactive Reader Modal
    const filterButtons = document.querySelectorAll('.social-filter-btn');
    const postCards = document.querySelectorAll('.social-card');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        postCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.2s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Reader Modal Open
    const postModal = document.getElementById('post-reader-modal');
    const postContent = document.getElementById('post-reader-content');
    const postCloseBtn = document.getElementById('post-reader-close-btn');

    const openPostModal = (postId) => {
      const posts = t.socialSection?.posts || translations.ar.socialSection?.posts || [];
      const post = posts.find(p => p.id === postId);
      if (!post || !postModal || !postContent) return;

      postContent.innerHTML = `
        <div class="post-reader-cover-wrap">
          <img src="${post.img}" alt="${post.title}" class="post-reader-hero-img" onerror="this.src='assets/logo/logo-banner.jpg'">
          <div class="post-reader-platform-badge">
            ${post.platform === 'Instagram' ? '📷 Instagram' : '🌐 Facebook'}
          </div>
        </div>
        <div class="post-reader-body">
          <div class="post-reader-meta">
            <span class="social-card-tag">${post.tag}</span>
            <span class="social-card-readtime">⏱️ ${post.readTime || '3 دقائق'}</span>
            <span class="social-card-date">📅 ${post.date}</span>
          </div>
          <h2 class="post-reader-title">${post.title}</h2>
          <div class="post-reader-text">
            <p class="post-reader-lead">${post.excerpt}</p>
            <div class="post-reader-full-article">${post.fullText || post.excerpt}</div>
          </div>
          <div class="post-reader-footer">
            <div class="post-reader-channel-info">
              <strong>شركة شات للتنمية والتطوير</strong>
              <span>@shat.development.growth</span>
            </div>
            <div class="post-reader-actions">
              <a href="${post.link}" target="_blank" rel="noopener" class="btn-cta" style="padding: 8px 18px; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 8px;">
                <span>${post.platform === 'Instagram' ? (t.socialSection?.viewInsta || 'مشاهدة على إنستغرام ↗') : (t.socialSection?.viewFb || 'مشاهدة على فيسبوك ↗')}</span>
              </a>
              <button type="button" class="btn-secondary" id="post-reader-done-btn" style="padding: 8px 16px; font-size: 0.88rem;">
                ${t.socialSection?.closeArticle || 'إغلاق'}
              </button>
            </div>
          </div>
        </div>
      `;

      postModal.classList.add('open');
      postModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      const doneBtn = document.getElementById('post-reader-done-btn');
      if (doneBtn) {
        doneBtn.addEventListener('click', closePostModal);
      }
    };

    const closePostModal = () => {
      if (postModal) {
        postModal.classList.remove('open');
        postModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    document.querySelectorAll('.btn-read-post').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const postId = btn.getAttribute('data-post-id');
        openPostModal(postId);
      });
    });

    document.querySelectorAll('.social-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const postId = card.getAttribute('data-post-id');
        openPostModal(postId);
      });
    });

    if (postCloseBtn) {
      postCloseBtn.addEventListener('click', closePostModal);
    }
    if (postModal) {
      postModal.addEventListener('click', (e) => {
        if (e.target === postModal) closePostModal();
      });
    }
  }
}

export const router = new Router();


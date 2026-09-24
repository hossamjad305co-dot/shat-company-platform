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
  renderGoogleFormRegistration,
  renderCourseDetailPage
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
  getCourseById,
  saveMoodleCourses,
  addCustomCourse,
  updateCourse,
  deleteCourse,
  getGlobalGoogleFormUrl,
  setGlobalGoogleFormUrl,
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
    this.initGlobalModalsAndRoleBar();
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  }

  setLang(lang) {
    this.currentLang = lang;
    this.handleRouting(true);
  }

  handleRouting(forceRerender = false) {
    let hash = window.location.hash.replace('#/', '').replace('#', '').trim();
    let isCourseDetail = false;
    let courseId = null;

    if (hash.startsWith('course/')) {
      courseId = hash.replace('course/', '').split('?')[0].trim();
      isCourseDetail = true;
    } else if (hash.startsWith('course?') || hash.startsWith('courses?')) {
      const searchParams = new URLSearchParams(hash.split('?')[1] || '');
      courseId = searchParams.get('id') || searchParams.get('courseId');
      isCourseDetail = true;
    } else if (hash === 'course' || hash === 'courses') {
      hash = 'academy';
    }

    if (!isCourseDetail && (!hash || !this.routes[hash])) {
      hash = 'home';
      window.location.hash = '#/home';
    }

    const currentHashKey = isCourseDetail ? `course/${courseId}` : hash;
    if (!forceRerender && this.currentRoute === currentHashKey && document.getElementById('app-content')?.innerHTML !== '') {
      return;
    }

    this.currentRoute = currentHashKey;
    const t = translations[this.currentLang] || translations.ar;
    const container = document.getElementById('app-content');

    if (container) {
      container.style.opacity = '0';
      setTimeout(() => {
        if (isCourseDetail) {
          container.innerHTML = renderCourseDetailPage(t, courseId);
          this.updateActiveNavLinks('academy');
          this.bindPageInteractions();
          this.bindCourseDetailInteractions(courseId);
        } else {
          const renderFn = this.routes[hash];
          if (renderFn) {
            container.innerHTML = renderFn(t);
            this.updateActiveNavLinks(hash);
            this.bindPageInteractions();
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        container.style.opacity = '1';
        this.updateRoleSimulatorStatus();

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

  initGlobalModalsAndRoleBar() {
    this.updateRoleSimulatorStatus();

    // 1. Role Simulator Bar Buttons
    document.querySelectorAll('.btn-role-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetRole = btn.getAttribute('data-role');
        authService.switchRoleQuick(targetRole);
        this.updateRoleSimulatorStatus();
        if (window.shatApp && window.shatApp.applyLanguage) {
          window.shatApp.applyLanguage(this.currentLang);
        } else {
          this.handleRouting(true);
        }
      });
    });

    // 2. Permission Guard Modal Close and Login Handlers
    const guardModal = document.getElementById('modal-permission-guard');
    const closeGuardBtn = document.getElementById('btn-close-perm-guard');
    if (closeGuardBtn) {
      closeGuardBtn.addEventListener('click', () => this.closePermissionGuardModal());
    }
    if (guardModal) {
      guardModal.addEventListener('click', (e) => {
        if (e.target === guardModal) this.closePermissionGuardModal();
      });
    }

    document.querySelectorAll('.btn-open-login-from-guard').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closePermissionGuardModal();
        const authModal = document.getElementById('auth-modal');
        if (authModal) {
          authModal.classList.add('open');
          authModal.style.display = 'flex';
          const tabLogin = document.getElementById('tab-auth-login');
          if (tabLogin) tabLogin.click();
        }
      });
    });

    document.querySelectorAll('.btn-quick-student-login').forEach(btn => {
      btn.addEventListener('click', () => {
        authService.switchRoleQuick('student');
        this.closePermissionGuardModal();
        this.updateRoleSimulatorStatus();
        if (window.shatApp && window.shatApp.applyLanguage) {
          window.shatApp.applyLanguage(this.currentLang);
        } else {
          this.handleRouting(true);
        }
      });
    });

    document.querySelectorAll('.btn-quick-instructor-login').forEach(btn => {
      btn.addEventListener('click', () => {
        authService.switchRoleQuick('instructor');
        this.closePermissionGuardModal();
        this.updateRoleSimulatorStatus();
        if (window.shatApp && window.shatApp.applyLanguage) {
          window.shatApp.applyLanguage(this.currentLang);
        } else {
          this.handleRouting(true);
        }
      });
    });

    // 3. Admin Image Editor Modal Wiring
    const imgModal = document.getElementById('modal-admin-image-editor');
    const closeImgBtn = document.getElementById('btn-close-image-editor');
    const cancelImgBtn = document.getElementById('btn-cancel-image-edit');
    const saveImgBtn = document.getElementById('btn-save-image-edit');
    const imgUrlInput = document.getElementById('image-editor-url-input');
    const imgPreview = document.getElementById('image-editor-preview');

    if (closeImgBtn) closeImgBtn.addEventListener('click', () => this.closeImageEditor());
    if (cancelImgBtn) cancelImgBtn.addEventListener('click', () => this.closeImageEditor());
    if (imgModal) {
      imgModal.addEventListener('click', (e) => {
        if (e.target === imgModal) this.closeImageEditor();
      });
    }

    if (imgUrlInput && imgPreview) {
      imgUrlInput.addEventListener('input', () => {
        imgPreview.src = imgUrlInput.value.trim() || '/assets/logo/logo-badge.jpg';
      });
    }

    if (saveImgBtn) {
      saveImgBtn.addEventListener('click', () => {
        if (!this.activeImageKey) return;
        const newUrl = imgUrlInput?.value.trim();
        if (!newUrl) {
          alert('يرجى تحديد أو إدخال رابط الصورة.');
          return;
        }
        cmsService.setCustomImage(this.activeImageKey, newUrl);
        alert('✓ تم حفظ وتطبيق الصورة وتحديث المنصة بنجاح!');
        this.closeImageEditor();
        this.handleRouting(true);
      });
    }

    // 4. Admin Social Post Editor Modal Wiring
    const postEditorModal = document.getElementById('modal-admin-post-editor');
    const closePostEditorBtn = document.getElementById('btn-close-post-editor');
    const cancelPostEditorBtn = document.getElementById('btn-cancel-post-edit');
    const postEditorForm = document.getElementById('form-admin-post-editor');
    const pickPostCoverBtn = document.getElementById('btn-pick-post-preset-img');

    if (closePostEditorBtn) closePostEditorBtn.addEventListener('click', () => this.closePostEditor());
    if (cancelPostEditorBtn) cancelPostEditorBtn.addEventListener('click', () => this.closePostEditor());
    if (postEditorModal) {
      postEditorModal.addEventListener('click', (e) => {
        if (e.target === postEditorModal) this.closePostEditor();
      });
    }

    if (pickPostCoverBtn) {
      pickPostCoverBtn.addEventListener('click', () => {
        const postId = document.getElementById('admin-post-edit-id')?.value;
        if (postId) {
          this.closePostEditor();
          this.openImageEditor('postImg_' + postId, 'اختيار كفر للمنشور');
        }
      });
    }

    if (postEditorForm) {
      postEditorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = document.getElementById('admin-post-edit-id')?.value;
        const title = document.getElementById('admin-post-edit-title')?.value.trim();
        const img = document.getElementById('admin-post-edit-img')?.value.trim();
        const platform = document.getElementById('admin-post-edit-platform')?.value;
        const tag = document.getElementById('admin-post-edit-tag')?.value.trim();
        const excerpt = document.getElementById('admin-post-edit-excerpt')?.value.trim();
        const fullText = document.getElementById('admin-post-edit-fulltext')?.value.trim();

        if (!postId || !title) return;

        cmsService.updateSocialPost(postId, { title, img, platform, tag, excerpt, fullText });
        if (img) {
          cmsService.setCustomImage('postImg_' + postId, img);
        }

        alert('✓ تم حفظ تعديلات المنشور بنجاح!');
        this.closePostEditor();
        this.handleRouting(true);
      });
    }
  }

  updateRoleSimulatorStatus() {
    const user = authService.getCurrentUser();
    const statusLabel = document.getElementById('role-sim-current');
    const pills = document.querySelectorAll('.btn-role-pill');

    pills.forEach(p => p.classList.remove('active'));

    if (!user) {
      if (statusLabel) statusLabel.innerHTML = '👤 زائر (المواد مقفلة)';
      document.querySelector('.btn-role-pill[data-role="visitor"]')?.classList.add('active');
    } else {
      const role = user.role;
      if (role === 'student') {
        if (statusLabel) statusLabel.innerHTML = '🎓 متدرب (أحمد خليل - التحميل والتكليفات مفتوحة)';
        document.querySelector('.btn-role-pill[data-role="student"]')?.classList.add('active');
      } else if (role === 'instructor') {
        if (statusLabel) statusLabel.innerHTML = '👨‍🏫 مدرب (د. أسامة المنصور - رفع الحقائب للطلبة)';
        document.querySelector('.btn-role-pill[data-role="instructor"]')?.classList.add('active');
      } else if (role === 'admin') {
        if (statusLabel) statusLabel.innerHTML = '⚙️ مدير عام (أ. حسام جاد الله - تحكم وتعديل كامل)';
        document.querySelector('.btn-role-pill[data-role="admin"]')?.classList.add('active');
      } else {
        if (statusLabel) statusLabel.innerHTML = `👤 ${user.name} (${user.roleTitle || role})`;
      }
    }
  }

  openPermissionGuardModal(courseTitle = '') {
    const modal = document.getElementById('modal-permission-guard');
    const titleEl = document.getElementById('perm-guard-title');
    if (!modal) return;

    if (courseTitle && titleEl) {
      titleEl.textContent = `المواد والحقائب التدريبية لدورة « ${courseTitle} » مخصصة للمتدربين المسجلين`;
    } else if (titleEl) {
      titleEl.textContent = 'المواد التدريبية المعتمدة مخصصة للمتدربين المسجلين فقط';
    }

    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closePermissionGuardModal() {
    const modal = document.getElementById('modal-permission-guard');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  openImageEditor(imgKey, title = 'تعديل واستبدال الصورة') {
    this.activeImageKey = imgKey;
    const modal = document.getElementById('modal-admin-image-editor');
    const titleEl = document.getElementById('image-editor-title');
    const urlInput = document.getElementById('image-editor-url-input');
    const preview = document.getElementById('image-editor-preview');
    const presetContainer = document.getElementById('image-preset-picker');

    if (!modal) return;

    if (titleEl) titleEl.textContent = title;
    const currentUrl = cmsService.getCustomImage(imgKey, '/assets/logo/logo-badge.jpg');
    if (urlInput) urlInput.value = currentUrl;
    if (preview) preview.src = currentUrl;

    if (presetContainer) {
      const presets = cmsService.getPresetImages();
      presetContainer.innerHTML = presets.map(p => `
        <div class="image-preset-option" data-url="${p.url}" style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1.5px solid ${p.url === currentUrl ? '#2563eb' : '#e2e8f0'}; border-radius: var(--radius-sm); cursor: pointer; background: #ffffff; transition: all 0.2s ease;">
          <img src="${p.url}" alt="${p.name}" style="width: 36px; height: 36px; object-fit: cover; border-radius: 4px; border: 1px solid #cbd5e1;">
          <div style="text-align: start; overflow: hidden; flex: 1;">
            <strong style="display: block; font-size: 0.78rem; color: var(--shat-navy-950); white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${p.name}</strong>
            <span style="font-size: 0.68rem; color: var(--text-muted);">${p.type}</span>
          </div>
        </div>
      `).join('');

      presetContainer.querySelectorAll('.image-preset-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const url = opt.getAttribute('data-url');
          if (urlInput) urlInput.value = url;
          if (preview) preview.src = url;
          presetContainer.querySelectorAll('.image-preset-option').forEach(o => o.style.borderColor = '#e2e8f0');
          opt.style.borderColor = '#2563eb';
        });
      });
    }

    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeImageEditor() {
    const modal = document.getElementById('modal-admin-image-editor');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  openPostEditor(postId) {
    const modal = document.getElementById('modal-admin-post-editor');
    if (!modal) return;

    const t = translations[this.currentLang] || translations.ar;
    const posts = t.socialSection?.posts || [];
    const basePost = posts.find(p => p.id === postId) || {};
    const override = cmsService.getPostOverride(postId) || {};
    const post = { ...basePost, ...override };

    const customImg = cmsService.getCustomImage('postImg_' + postId, post.img);

    document.getElementById('admin-post-edit-id').value = postId;
    document.getElementById('admin-post-edit-title').value = post.title || '';
    const imgEl = document.getElementById('admin-post-edit-img');
    if (imgEl) imgEl.value = customImg || post.img || '';
    const platformEl = document.getElementById('admin-post-edit-platform');
    if (platformEl) platformEl.value = post.platform || 'Facebook';
    const tagEl = document.getElementById('admin-post-edit-tag');
    if (tagEl) tagEl.value = post.tag || '';
    const excerptEl = document.getElementById('admin-post-edit-excerpt');
    if (excerptEl) excerptEl.value = post.excerpt || '';
    const fulltextEl = document.getElementById('admin-post-edit-fulltext');
    if (fulltextEl) fulltextEl.value = post.fullText || post.excerpt || '';

    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closePostEditor() {
    const modal = document.getElementById('modal-admin-post-editor');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
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
        // Permission check
        if (!authService.canDownloadMaterials()) {
          const courseTitle = btn.getAttribute('data-course-title') || '';
          this.openPermissionGuardModal(courseTitle);
          return;
        }

        const fileName = btn.getAttribute('data-file') || 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf';
        const originalHtml = btn.innerHTML;

        btn.innerHTML = '<span>⏳ جارٍ التنزيل الفعلي...</span>';
        btn.disabled = true;

        setTimeout(() => {
          downloadRealFile(fileName);

          btn.innerHTML = '<span>✓ تم التحميل لجهازك</span>';
          setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
          }, 2200);
        }, 500);
      });
    });

    // 2.1 Permission Guard Triggers for Visitors
    document.querySelectorAll('.btn-guard-download, .btn-guard-drive').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const courseTitle = btn.getAttribute('data-course-title') || '';
        this.openPermissionGuardModal(courseTitle);
      });
    });

    // 2.2 In-Place Image Editor Triggers
    document.querySelectorAll('.btn-edit-image-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imgKey = btn.getAttribute('data-img-key');
        const imgTitle = btn.getAttribute('data-img-title') || 'تعديل واستبدال الصورة';
        this.openImageEditor(imgKey, imgTitle);
      });
    });

    // 2.3 Admin Social Post Editor Triggers
    document.querySelectorAll('.btn-admin-edit-post').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const postId = btn.getAttribute('data-post-id');
        this.openPostEditor(postId);
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

    // 7.1 Admin Course & Google Form Customizer
    const btnToggleNewCourse = document.getElementById('btn-toggle-new-course-form');
    const boxNewCourse = document.getElementById('box-new-course-form');
    const btnCancelNewCourse = document.getElementById('btn-cancel-new-course');
    const formNewCourse = document.getElementById('form-create-new-course');

    if (btnToggleNewCourse && boxNewCourse) {
      btnToggleNewCourse.addEventListener('click', () => {
        const isHidden = boxNewCourse.style.display === 'none';
        boxNewCourse.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (btnCancelNewCourse && boxNewCourse) {
      btnCancelNewCourse.addEventListener('click', () => {
        boxNewCourse.style.display = 'none';
      });
    }

    // Save Global Google Form URL
    const btnSaveGlobalGForm = document.getElementById('btn-save-global-gform');
    if (btnSaveGlobalGForm) {
      btnSaveGlobalGForm.addEventListener('click', () => {
        const val = document.getElementById('admin-global-gform-input')?.value.trim();
        if (val) {
          setGlobalGoogleFormUrl(val);
          alert('✓ تم حفظ وتحديث الرابط العام لاستمارة Google Form بنجاح!');
        }
      });
    }

    // Create New Course Submit
    if (formNewCourse) {
      formNewCourse.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('new-course-title')?.value.trim();
        const code = document.getElementById('new-course-code')?.value.trim();
        const track = document.getElementById('new-course-track')?.value.trim();
        const instructor = document.getElementById('new-course-instructor')?.value.trim();
        const googleFormUrl = document.getElementById('new-course-gform-url')?.value.trim();
        const driveFolderUrl = document.getElementById('new-course-drive-url')?.value.trim();
        const duration = document.getElementById('new-course-duration')?.value.trim();
        const schedule = document.getElementById('new-course-schedule')?.value.trim();
        const overview = document.getElementById('new-course-overview')?.value.trim();

        if (!title || !code) return;

        const newCourse = addCustomCourse({
          title,
          code,
          track,
          instructor,
          googleFormUrl: googleFormUrl || getGlobalGoogleFormUrl(),
          driveFolderUrl: driveFolderUrl || 'https://drive.google.com/drive/folders/shat-materials',
          duration,
          schedule,
          overview
        });

        alert(`✓ تم إدراج دورة « ${newCourse.title} » بنجاح في المنصة وتخصيص رابط Google Form وصفحتها المستقلة!`);
        formNewCourse.reset();
        if (boxNewCourse) boxNewCourse.style.display = 'none';
        router.handleRouting(true);
      });
    }

    // Update Individual Course Google Form & Drive Links
    document.querySelectorAll('.btn-save-course-links').forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.getAttribute('data-course-id');
        const gformVal = document.getElementById(`custom-gform-${courseId}`)?.value.trim();
        const driveVal = document.getElementById(`custom-drive-${courseId}`)?.value.trim();

        updateCourse(courseId, {
          googleFormUrl: gformVal,
          driveFolderUrl: driveVal
        });

        alert('✓ تم حفظ وتحديث روابط استمارة Google Form ومجلد Google Drive لهذه الدورة بنجاح!');
      });
    });

    // Delete Course from Admin Table
    document.querySelectorAll('.btn-delete-moodle-course').forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.getAttribute('data-course-id');
        if (confirm('هل أنت متأكد من رغبتك في حذف هذه الدورة من المنصة؟')) {
          deleteCourse(courseId);
          alert('✓ تم حذف الدورة بنجاح.');
          router.handleRouting(true);
        }
      });
    });

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

  bindCourseDetailInteractions(courseId) {
    const course = getCourseById(courseId) || getMoodleCourses()[0];
    if (!course) return;

    // 1. Course Tab switching
    const courseTabBtns = document.querySelectorAll('.course-detail-tab-btn');
    const coursePanes = document.querySelectorAll('.course-tab-pane');

    courseTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-course-tab');
        courseTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        coursePanes.forEach(pane => {
          if (pane.id === 'course-pane-' + targetTab) {
            pane.style.display = 'block';
            pane.classList.add('active');
          } else {
            pane.style.display = 'none';
            pane.classList.remove('active');
          }
        });
      });
    });

    // 2. Modules accordion toggle
    document.querySelectorAll('.module-accordion-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const body = hdr.nextElementSibling;
        if (body) {
          const isHidden = body.style.display === 'none';
          body.style.display = isHidden ? 'block' : 'none';
        }
      });
    });

    // 3. Assignment submit
    const assignForm = document.getElementById('course-assignment-submit-form');
    if (assignForm) {
      assignForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✓ تم تسليم التكليف بنجاح وإرساله للمشرف الأكاديمي لمراجعته ورصد الدرجة.');
        assignForm.reset();
      });
    }

    // 4. Course Chat send
    const chatInput = document.getElementById('course-chat-input');
    const chatSendBtn = document.getElementById('course-chat-send-btn');
    const chatThread = document.getElementById('course-chat-thread');

    const sendCourseMsg = () => {
      if (!chatInput || !chatThread) return;
      const text = chatInput.value.trim();
      if (!text) return;

      const user = authService.getCurrentUser() || { name: 'المتدرب' };
      const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

      sendCourseChatMessage(course.id, 'student', user.name, text);

      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message-row outgoing';
      msgDiv.innerHTML = `
        <div class="chat-bubble">
          <strong style="display: block; font-size: 0.8rem; margin-bottom: 3px;">${user.name}</strong>
          ${text}
          <span class="chat-bubble-time">${timeNow} ✓✓</span>
        </div>
      `;
      chatThread.appendChild(msgDiv);
      chatInput.value = '';
      chatThread.scrollTop = chatThread.scrollHeight;

      // Simulated Instructor response after 1.4s
      setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'chat-message-row incoming';
        replyDiv.innerHTML = `
          <div class="chat-bubble">
            <strong style="display: block; font-size: 0.8rem; margin-bottom: 3px; color: #047857;">${course.instructor}</strong>
            أهلاً بك، تم استلام سؤالك بخصوص (${text.substring(0, 32)}...). سنناقش هذه النقطة بالتفصيل، كما يمكنك مراجعة الدليل المرفق في تبويب الحقائب ومجلد Google Drive.
            <span class="chat-bubble-time">${new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        `;
        chatThread.appendChild(replyDiv);
        chatThread.scrollTop = chatThread.scrollHeight;
      }, 1400);
    };

    if (chatSendBtn && chatInput) {
      chatSendBtn.addEventListener('click', sendCourseMsg);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendCourseMsg();
      });
    }

    // 5. Instructor Upload Form for this course
    const uploadForm = document.getElementById('course-instructor-upload-form');
    if (uploadForm) {
      uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('instructor-upload-title')?.value.trim();
        const type = document.getElementById('instructor-upload-type')?.value || 'PDF';
        const driveLink = document.getElementById('instructor-upload-drive')?.value.trim();

        if (!title) return;

        addCourseFile(course.id, {
          name: title + (type === 'PDF' ? '.pdf' : type === 'XLSX' ? '.xlsx' : '.pptx'),
          type,
          driveLink,
          size: (Math.random() * 5 + 1).toFixed(1) + ' MB'
        });

        alert(`✓ تم رفع المادة « ${title} » وحفظها في مجلد الدورة على Google Drive بنجاح!`);
        uploadForm.reset();
        router.handleRouting(true);
      });
    }

    // 6. Admin Course Customizer Form for this course
    const adminCourseForm = document.getElementById('form-admin-course-customizer');
    if (adminCourseForm) {
      adminCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('admin-course-title')?.value.trim();
        const code = document.getElementById('admin-course-code')?.value.trim();
        const googleFormUrl = document.getElementById('admin-course-gform')?.value.trim();
        const driveFolderUrl = document.getElementById('admin-course-drive')?.value.trim();
        const instructor = document.getElementById('admin-course-instructor')?.value.trim();
        const duration = document.getElementById('admin-course-duration')?.value.trim();
        const overview = document.getElementById('admin-course-overview')?.value.trim();

        updateCourse(course.id, {
          title,
          code,
          googleFormUrl,
          driveFolderUrl,
          instructor,
          duration,
          overview
        });

        alert('✓ تم حفظ وتحديث بيانات الدورة ورابط Google Form ورابط Google Drive بنجاح!');
        router.handleRouting(true);
      });
    }

    // 7. Delete Course Trigger
    const btnDeleteTrigger = document.querySelector('.btn-delete-course-trigger');
    if (btnDeleteTrigger) {
      btnDeleteTrigger.addEventListener('click', () => {
        if (confirm(`هل أنت متأكد من رغبتك في حذف دورة « ${course.title} » نهائياً؟`)) {
          deleteCourse(course.id);
          alert('✓ تم حذف الدورة من النظام.');
          window.location.hash = '#/academy';
        }
      });
    }
  }
}

export const router = new Router();


// assets/js/tools/siteCustomizer.js
// Production In-Site Deep Customizer Engine for SHAT Platform
// Enables Admin & Authorized Staff to customize virtually everything in real time:
// Branding, Titles, Logo Alignment, Contact Info, Social Media Links, Hero Headlines,
// Forms Integrations, Section Toggles, and Visual Presets.

import { showToast } from '../components/toast.js';

export const DEFAULT_SITE_CONFIG = {
  brandNameAr: 'شركة شات للتنمية والتطوير',
  brandNameEn: 'SHAT Development & Growth',
  mottoAr: 'بناء القدرات • تعزيز المؤسسات • تحقيق النتائج',
  mottoEn: 'Building Capacity • Strengthening Institutions • Advancing Results',
  subMottoAr: 'بيت خبرة واستشارات دولي معتمد للتميز والمساءلة المؤسسية',
  subMottoEn: 'International Advisory House for Capacity Building & Humanitarian Standards',
  logoPlacement: 'right', // 'right' puts text to the right of logo in RTL
  primaryPhone: '+972 59 287 9621',
  whatsappNumber: '+972 59 287 9621',
  primaryEmail: 'shat.company26@gmail.com',
  addressAr: 'فلسطين - قطاع غزة - مقر شركة شات',
  addressEn: 'Gaza, Palestine • SHAT Development Headquarters',
  workingHoursAr: 'السبت - الخميس: 8:30 ص - 4:30 م',
  workingHoursEn: 'Sat - Thu: 8:30 AM - 4:30 PM',
  
  // Social Media Links (Verified Official Accounts)
  facebookUrl: 'https://www.facebook.com/shat.development.growth',
  instagramUrl: 'https://www.instagram.com/shat.development.growth/',
  whatsappUrl: 'https://wa.me/972592879621',
  linkedinUrl: 'https://www.linkedin.com/company/shat-development',
  
  // Top Announcement Bar
  announcementActive: true,
  announcementTextAr: '🚀 انطلاق التسجيل في برامج ودبلومات الربع الأخير لعام 2026 وفق معايير CHS وPSEA',
  announcementTextEn: 'Registration open for Q4 2026 humanitarian diplomas & institutional capacity tracks',
  
  // Hero Section Customization
  heroTitleAr: 'بناء القدرات • تعزيز المؤسسات • تحقيق النتائج',
  heroSubtitleAr: 'منظومة استشارية وتدريبية متخصصة لتمكين المنظمات الأهلية والكوادر الميدانية وفق أرقى المعايير الإنسانية الدولية.',
  primaryCtaTextAr: 'استكشاف الأكاديمية والمساقات',
  primaryCtaLink: '#/academy',
  secondaryCtaTextAr: 'أداة التشخيص المؤسسي الفوري',
  secondaryCtaLink: '#/tools/diagnostic',

  // Google Forms Integration URLs
  formCaseManagerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfzjius7lEMOULtsaz6ByhXwFx82mWUkXwQoisdkbid4PLhGg/viewform',
  formPresentationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSewFY_nZGz_jQ-FCWTw40O8wxuoQK4H9f1ted6An1NzIcGc_Q/viewform',
  formHumanitarianUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSft0nB4QGxS2HCZApraSmn5GDca1R7taC0ZNs441kVx6gh_Og/viewform',
  formConsultingUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScIM3dPv92bS-61qrfr_vW8_eVKQS2tsrvR_QhUY_CfbsdlGw/viewform',

  // Section Toggles
  showAnnouncement: true,
  showRoleSimulator: true,
  showHeroMetrics: true,
  showDiagnosticPromo: true,
  showStandardsExplorer: true,
  showToolkitsHub: true,
  showSocialFeed: true
};

export const siteCustomizer = {
  getConfig() {
    try {
      const stored = localStorage.getItem('shat_site_customization');
      if (stored) {
        return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {}
    return { ...DEFAULT_SITE_CONFIG };
  },

  saveConfig(newConfig) {
    try {
      const merged = { ...this.getConfig(), ...newConfig };
      localStorage.setItem('shat_site_customization', JSON.stringify(merged));
      // Dispatch live update event
      window.dispatchEvent(new CustomEvent('shat:customization-updated', { detail: merged }));
      return { success: true, config: merged };
    } catch (err) {
      console.error('Error saving site customization:', err);
      return { success: false, error: err.message };
    }
  },

  resetDefaults() {
    try {
      localStorage.removeItem('shat_site_customization');
      window.dispatchEvent(new CustomEvent('shat:customization-updated', { detail: DEFAULT_SITE_CONFIG }));
      return { success: true, config: DEFAULT_SITE_CONFIG };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  openModal(lang = 'ar') {
    let modal = document.getElementById('shat-customizer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shat-customizer-modal';
      modal.className = 'tool-modal-overlay';
      document.body.appendChild(modal);
    }

    const cfg = this.getConfig();
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    modal.innerHTML = `
      <div class="tool-modal-card customizer-modal-card" style="max-width: 900px; width: 95%; max-height: 90vh; display: flex; flex-direction: column; background: #FFFFFF; border-radius: var(--radius-md); box-shadow: var(--shadow-xl); overflow: hidden; animation: modalFadeIn 0.2s ease-out;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0F2E4A 0%, #061523 100%); color: #FFFFFF; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #10B981; flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(16,185,129,0.2); border: 1px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              🎨
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 900; color: #FFFFFF; font-family: var(--font-primary);">
                ${txt('مركز تخصيص وإدارة المنصة الشامل', 'Platform Site Customizer & Controls', 'Centre de Personnalisation SHAT')}
              </h3>
              <p style="margin: 2px 0 0 0; font-size: 0.78rem; color: #94A3B8;">
                ${txt('تعديل فوري ومباشر لكافة نصوص، روابط، أقسام، وهوية الموقع من داخل المنظومة', 'Live in-site customization of branding, copy, social links, and forms', 'Personnalisation en direct des textes, liens et formulaires')}
              </p>
            </div>
          </div>
          <button type="button" class="tool-modal-close" id="btn-close-customizer" style="background: rgba(255,255,255,0.1); border: none; color: #FFFFFF; font-size: 1.2rem; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">✕</button>
        </div>

        <!-- Customizer Body with Tabs -->
        <div style="padding: 20px 24px; overflow-y: auto; flex: 1;">
          
          <form id="site-customizer-form" style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- Section 1: Brand & Identity -->
            <div class="customizer-section-box" style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px;">
              <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                <span>🏛️</span>
                <span>${txt('هوية الشركة والعلامة التجارية', 'Brand Identity & Titles', 'Identité & Titres de Marque')}</span>
              </h4>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">اسم المنصة (بالعربية)</label>
                  <input type="text" name="brandNameAr" value="${cfg.brandNameAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" required />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">Brand Title (English)</label>
                  <input type="text" name="brandNameEn" value="${cfg.brandNameEn}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" required />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">الشعار المؤسسي المعتمد (Motto)</label>
                  <input type="text" name="mottoAr" value="${cfg.mottoAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">الوصف التخصصي الفرعي</label>
                  <input type="text" name="subMottoAr" value="${cfg.subMottoAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
              </div>
            </div>

            <!-- Section 2: Contact & Official Social Links -->
            <div class="customizer-section-box" style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px;">
              <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                <span>🌐</span>
                <span>${txt('بيانات الاتصال وحسابات التواصل الاجتماعي الرسمية', 'Contact Information & Social Channels', 'Coordonnées & Réseaux Sociaux')}</span>
              </h4>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رقم الهاتف الرسمي</label>
                  <input type="text" name="primaryPhone" value="${cfg.primaryPhone}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رقم واتساب المباشر</label>
                  <input type="text" name="whatsappNumber" value="${cfg.whatsappNumber}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">البريد الإلكتروني المعتمد</label>
                  <input type="email" name="primaryEmail" value="${cfg.primaryEmail}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رابط فيسبوك الرسمي (Facebook URL)</label>
                  <input type="url" name="facebookUrl" value="${cfg.facebookUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رابط إنستغرام الرسمي (Instagram URL)</label>
                  <input type="url" name="instagramUrl" value="${cfg.instagramUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رابط لينكد إن (LinkedIn URL)</label>
                  <input type="url" name="linkedinUrl" value="${cfg.linkedinUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
              </div>
            </div>

            <!-- Section 3: Official Google Forms Integration -->
            <div class="customizer-section-box" style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px;">
              <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                <span>📋</span>
                <span>${txt('روابط استمارات Google Forms الرسمية المرتبطة', 'Connected Official Google Forms', 'Formulaires Google Connectés')}</span>
              </h4>

              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">1. استمارة دورة إعداد مدير حالة (Google Form Link)</label>
                  <input type="url" name="formCaseManagerUrl" value="${cfg.formCaseManagerUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">2. استمارة دورة مهارات العرض والتقديم (Google Form Link)</label>
                  <input type="url" name="formPresentationUrl" value="${cfg.formPresentationUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">3. استمارة تأهيل عامل في المجال الإنساني (Google Form Link)</label>
                  <input type="url" name="formHumanitarianUrl" value="${cfg.formHumanitarianUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">4. استمارة التسجيل والاستشارات المتقدمة (Google Form Link)</label>
                  <input type="url" name="formConsultingUrl" value="${cfg.formConsultingUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: var(--radius-xs); border: 1px solid var(--border-medium);" />
                </div>
              </div>
            </div>

            <!-- Section 4: Section Visibility Toggles -->
            <div class="customizer-section-box" style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px;">
              <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                <span>⚙️</span>
                <span>${txt('التحكم في ظهور الأقسام الرئيسية للمنصة', 'Sections Visibility Controls', 'Visibilité des Sections')}</span>
              </h4>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; cursor: pointer;">
                  <input type="checkbox" name="showAnnouncement" ${cfg.showAnnouncement ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--shat-green);" />
                  <span>شريط التنبيهات العلوي</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; cursor: pointer;">
                  <input type="checkbox" name="showHeroMetrics" ${cfg.showHeroMetrics ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--shat-green);" />
                  <span>مؤشرات الإنجاز الرقمية</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; cursor: pointer;">
                  <input type="checkbox" name="showDiagnosticPromo" ${cfg.showDiagnosticPromo ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--shat-green);" />
                  <span>أداة التشخيص المؤسسي</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; cursor: pointer;">
                  <input type="checkbox" name="showToolkitsHub" ${cfg.showToolkitsHub ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--shat-green);" />
                  <span>مكتبة الحقائب الميدانية</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; cursor: pointer;">
                  <input type="checkbox" name="showSocialFeed" ${cfg.showSocialFeed ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--shat-green);" />
                  <span>تغذية الأخبار والسوشيال ميديا</span>
                </label>
              </div>
            </div>

            <!-- Footer Action Buttons -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 10px; border-top: 1px solid var(--border-light);">
              <button type="button" id="btn-reset-customizer" class="btn-clean" style="background: #F1F5F9; color: #64748B; font-weight: 700; border: 1px solid var(--border-medium); padding: 8px 16px; font-size: 0.84rem;">
                <span>🔄</span>
                <span>${txt('استعادة الإعدادات الافتراضية', 'Reset Defaults', 'Réinitialiser')}</span>
              </button>

              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-clean" id="btn-cancel-customizer" style="background: #FFFFFF; color: var(--text-main); border: 1px solid var(--border-medium); padding: 8px 16px; font-size: 0.84rem;">
                  <span>${txt('إلغاء', 'Cancel', 'Annuler')}</span>
                </button>
                <button type="submit" class="btn-clean btn-primary" style="padding: 8px 22px; font-size: 0.88rem; font-weight: 800; background: var(--shat-green); color: #FFFFFF; border: none; box-shadow: 0 2px 8px rgba(16,185,129,0.3);">
                  <span>💾</span>
                  <span>${txt('حفظ وتطبيق التغييرات فوراً', 'Save & Apply Live', 'Enregistrer et Appliquer')}</span>
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    `;

    modal.style.display = 'flex';

    // Bind Event Handlers
    const closeBtn = document.getElementById('btn-close-customizer');
    const cancelBtn = document.getElementById('btn-cancel-customizer');
    const resetBtn = document.getElementById('btn-reset-customizer');
    const form = document.getElementById('site-customizer-form');

    const closeModal = () => { modal.style.display = 'none'; };
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm(txt('هل أنت متأكد من رغبتك في استعادة كافة الإعدادات والنصوص الافتراضية للمنصة؟', 'Reset all site settings to factory defaults?', 'Réinitialiser tous les paramètres ?'))) {
          this.resetDefaults();
          showToast(txt('تمت استعادة الإعدادات الافتراضية بنجاح.', 'Defaults restored successfully.', 'Paramètres par défaut restaurés.'), 'info');
          closeModal();
          window.location.reload();
        }
      };
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const updated = {
          brandNameAr: fd.get('brandNameAr'),
          brandNameEn: fd.get('brandNameEn'),
          mottoAr: fd.get('mottoAr'),
          subMottoAr: fd.get('subMottoAr'),
          primaryPhone: fd.get('primaryPhone'),
          whatsappNumber: fd.get('whatsappNumber'),
          primaryEmail: fd.get('primaryEmail'),
          facebookUrl: fd.get('facebookUrl'),
          instagramUrl: fd.get('instagramUrl'),
          linkedinUrl: fd.get('linkedinUrl'),
          formCaseManagerUrl: fd.get('formCaseManagerUrl'),
          formPresentationUrl: fd.get('formPresentationUrl'),
          formHumanitarianUrl: fd.get('formHumanitarianUrl'),
          formConsultingUrl: fd.get('formConsultingUrl'),
          showAnnouncement: fd.get('showAnnouncement') === 'on',
          showHeroMetrics: fd.get('showHeroMetrics') === 'on',
          showDiagnosticPromo: fd.get('showDiagnosticPromo') === 'on',
          showToolkitsHub: fd.get('showToolkitsHub') === 'on',
          showSocialFeed: fd.get('showSocialFeed') === 'on'
        };

        this.saveConfig(updated);
        showToast(txt('تم تطبيق وحفظ كافة التعديلات بنجاح!', 'All site customizations saved and applied live!', 'Modifications enregistrées avec succès !'), 'success');
        closeModal();
      };
    }
  }
};

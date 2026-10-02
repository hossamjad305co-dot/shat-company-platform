// assets/js/tools/siteCustomizer.js
// Production In-Site Deep Customizer Engine for SHAT Platform
// Enables Admin & Authorized Staff to customize virtually everything in real time:
// 1. Theme, Colors, Fonts, and Border Radius (:root CSS token injection)
// 2. Branding, Titles, Hero Headlines, Taglines, and Announcements
// 3. Official Contact Info & Verified Social Media Channels
// 4. Official Google Forms & LMS Platform Forms
// 5. Section Visibility & Layout Controls

import { showToast } from '../components/toast.js';
import { icons } from '../icons.js';

export const THEME_PRESETS = {
  corporate: {
    nameAr: 'الهوية المؤسسية الكلاسيكية (Executive Navy)',
    nameEn: 'Executive Classic Navy',
    primaryColor: '#0F2E4A',
    growthColor: '#166534',
    accentColor: '#D97706',
    pageBgColor: '#F8FAFC'
  },
  emerald: {
    nameAr: 'الزمرد الإنساني الحديث (Humanitarian Emerald)',
    nameEn: 'Humanitarian Emerald',
    primaryColor: '#064E3B',
    growthColor: '#059669',
    accentColor: '#F59E0B',
    pageBgColor: '#F0FDF4'
  },
  royal: {
    nameAr: 'الأزرق الدبلوماسي الملكي (Diplomatic Royal)',
    nameEn: 'Diplomatic Royal Blue',
    primaryColor: '#1E3A8A',
    growthColor: '#0D9488',
    accentColor: '#F59E0B',
    pageBgColor: '#F8FAFC'
  },
  dark_luxury: {
    nameAr: 'الفخامة الليلية الداكنة (Executive Dark Luxury)',
    nameEn: 'Executive Dark Luxury',
    primaryColor: '#0B132B',
    growthColor: '#10B981',
    accentColor: '#FBBF24',
    pageBgColor: '#F1F5F9'
  }
};

export const DEFAULT_SITE_CONFIG = {
  brandNameAr: 'شركة شات للتنمية والتطوير',
  brandNameEn: 'SHAT Development & Growth',
  mottoAr: 'بناء القدرات • تعزيز المؤسسات • تحقيق النتائج',
  mottoEn: 'Building Capacity • Strengthening Institutions • Advancing Results',
  subMottoAr: 'بيت خبرة واستشارات دولي معتمد للتميز والمساءلة المؤسسية',
  subMottoEn: 'International Advisory House for Capacity Building & Humanitarian Standards',
  logoPlacement: 'right', // 'right' keeps text to the right of logo in RTL

  // Theme & Appearance
  themePreset: 'corporate',
  primaryColor: '#0F2E4A',
  growthColor: '#166534',
  accentColor: '#D97706',
  pageBgColor: '#F8FAFC',
  fontFamily: 'Cairo',
  borderRadius: '12px',

  // Contact Info
  primaryPhone: '+972 59 287 9621',
  whatsappNumber: '+972 59 287 9621',
  primaryEmail: 'shat.company26@gmail.com',
  addressAr: 'فلسطين - قطاع غزة - مقر شركة شات',
  addressEn: 'Gaza, Palestine • SHAT Development Headquarters',
  workingHoursAr: 'السبت - الخميس: 8:30 ص - 4:30 م',
  workingHoursEn: 'Sat - Thu: 8:30 AM - 4:30 PM',
  
  // Official Social Media Channels
  facebookUrl: 'https://www.facebook.com/shat.development.growth',
  instagramUrl: 'https://www.instagram.com/shat.development.growth/',
  whatsappUrl: 'https://wa.me/972592879621',
  linkedinUrl: 'https://www.linkedin.com/company/shat-development',
  
  // Top Announcement Bar
  announcementActive: true,
  announcementTextAr: 'انطلاق التسجيل في برامج ودبلومات الربع الأخير لعام 2026 وفق معايير CHS وPSEA',
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

  applyThemeToDocument(cfg = null) {
    const c = cfg || this.getConfig();
    const root = document.documentElement;

    if (c.primaryColor) {
      root.style.setProperty('--shat-navy', c.primaryColor);
      root.style.setProperty('--shat-navy-900', c.primaryColor);
    }
    if (c.growthColor) {
      root.style.setProperty('--shat-green', c.growthColor);
      root.style.setProperty('--shat-green-700', c.growthColor);
    }
    if (c.accentColor) {
      root.style.setProperty('--shat-amber', c.accentColor);
    }
    if (c.pageBgColor) {
      root.style.setProperty('--bg-page', c.pageBgColor);
    }
    if (c.borderRadius) {
      root.style.setProperty('--radius-md', c.borderRadius);
    }
    if (c.fontFamily) {
      root.style.setProperty('--font-primary', `'${c.fontFamily}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
    }
  },

  saveConfig(newConfig) {
    try {
      const merged = { ...this.getConfig(), ...newConfig };
      localStorage.setItem('shat_site_customization', JSON.stringify(merged));
      this.applyThemeToDocument(merged);
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
      this.applyThemeToDocument(DEFAULT_SITE_CONFIG);
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
      <div class="tool-modal-card customizer-modal-card" style="max-width: 960px; width: 96%; max-height: 92vh; display: flex; flex-direction: column; background: #FFFFFF; border-radius: var(--radius-md); box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow: hidden; animation: modalFadeIn 0.2s ease-out;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, var(--shat-navy, #0F2E4A) 0%, #061523 100%); color: #FFFFFF; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--shat-green, #10B981); flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(16,185,129,0.25); border: 1px solid rgba(16,185,129,0.5); display: flex; align-items: center; justify-content: center; color: #10B981;">
              ${icons.settings('', 22)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="margin: 0; font-size: 1.2rem; font-weight: 900; color: #FFFFFF; font-family: var(--font-primary);">
                  ${txt('مركز تخصيص وإدارة المنصة والمظهر الشامل', 'Platform Master Customizer & Design Suite', 'Centre de Personnalisation SHAT')}
                </h3>
                <span class="badge" style="background: rgba(255,255,255,0.15); color: #F8FAFC; font-size: 0.72rem; padding: 2px 8px;">Live Engine</span>
              </div>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #94A3B8;">
                ${txt('تعديل حي وفوري لكافة ألوان، خطوط، نصوص، روابط، وقنوات المنظومة مع حفظ فوري محلي', 'Real-time interactive customization of branding, palette, copy, social channels, and forms', 'Personnalisation en direct de l’apparence et du contenu')}
              </p>
            </div>
          </div>
          <button type="button" class="tool-modal-close" id="btn-close-customizer" style="background: rgba(255,255,255,0.12); border: none; color: #FFFFFF; font-size: 1.3rem; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">${icons.x('', 18)}</button>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 4px; background: #F1F5F9; padding: 8px 16px; border-bottom: 1px solid var(--border-light); overflow-x: auto; flex-shrink: 0;">
          <button type="button" class="customizer-tab-btn active" data-tab="tab-theme" style="padding: 8px 16px; font-size: 0.86rem; font-weight: 800; border-radius: 6px; border: none; cursor: pointer; background: #FFFFFF; color: var(--shat-navy, #0F2E4A); box-shadow: 0 1px 3px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-flex; align-items:center;">${icons.sparkles('', 16)}</span>
            <span>${txt('المظهر والألوان', 'Theme & Palette', 'Thème & Couleurs')}</span>
          </button>
          <button type="button" class="customizer-tab-btn" data-tab="tab-identity" style="padding: 8px 16px; font-size: 0.86rem; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; background: transparent; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-flex; align-items:center;">${icons.idCard('', 16)}</span>
            <span>${txt('الهوية والنصوص', 'Branding & Copy', 'Identité & Textes')}</span>
          </button>
          <button type="button" class="customizer-tab-btn" data-tab="tab-contacts" style="padding: 8px 16px; font-size: 0.86rem; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; background: transparent; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-flex; align-items:center;">${icons.chat('', 16)}</span>
            <span>${txt('الاتصال والتواصل', 'Contacts & Social', 'Contacts & Réseaux')}</span>
          </button>
          <button type="button" class="customizer-tab-btn" data-tab="tab-forms" style="padding: 8px 16px; font-size: 0.86rem; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; background: transparent; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-flex; align-items:center;">${icons.form('', 16)}</span>
            <span>${txt('روابط الاستمارات', 'Google Forms Links', 'Liens Formulaires')}</span>
          </button>
          <button type="button" class="customizer-tab-btn" data-tab="tab-sections" style="padding: 8px 16px; font-size: 0.86rem; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; background: transparent; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-flex; align-items:center;">${icons.settings('', 16)}</span>
            <span>${txt('ظهور الأقسام', 'Sections Visibility', 'Visibilité Sections')}</span>
          </button>
        </div>

        <!-- Customizer Body with Tab Panes -->
        <div style="padding: 24px; overflow-y: auto; flex: 1; background: #FAFAFA;">
          
          <form id="site-customizer-form" style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- Tab 1: Theme & Palette -->
            <div id="tab-theme" class="customizer-tab-pane" style="display: flex; flex-direction: column; gap: 18px;">
              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 12px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                  
                  <span>${txt('القوالب اللونية الجاهزة (One-Click Presets)', 'Curated Color Presets', 'Préréglages de Thème')}</span>
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px;">
                  ${Object.entries(THEME_PRESETS).map(([key, p]) => `
                    <div class="preset-card ${cfg.themePreset === key ? 'active-preset' : ''}" data-preset="${key}" style="border: 2px solid ${cfg.themePreset === key ? 'var(--shat-green, #10B981)' : 'var(--border-light)'}; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.2s ease; background: #FFFFFF;">
                      <div style="display: flex; gap: 6px; margin-bottom: 8px;">
                        <span style="width: 22px; height: 22px; border-radius: 50%; background: ${p.primaryColor}; display: inline-block;"></span>
                        <span style="width: 22px; height: 22px; border-radius: 50%; background: ${p.growthColor}; display: inline-block;"></span>
                        <span style="width: 22px; height: 22px; border-radius: 50%; background: ${p.accentColor}; display: inline-block;"></span>
                      </div>
                      <div style="font-weight: 800; font-size: 0.85rem; color: var(--shat-navy);">${p.nameAr}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                  
                  <span>${txt('تخصيص الألوان التفصيلي (Custom Palette)', 'Custom Color Controls', 'Palette Personnalisée')}</span>
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">اللون الرئيسي الأساسي (Primary Navy)</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="color" id="input-primaryColor" name="primaryColor" value="${cfg.primaryColor}" style="width: 44px; height: 38px; border: 1px solid var(--border-medium); border-radius: 6px; cursor: pointer; padding: 2px;" />
                      <input type="text" id="text-primaryColor" value="${cfg.primaryColor}" style="flex: 1; padding: 8px 12px; font-family: var(--font-mono); font-size: 0.84rem; border: 1px solid var(--border-medium); border-radius: 6px;" />
                    </div>
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">لون النمو والتمييز (Growth Green)</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="color" id="input-growthColor" name="growthColor" value="${cfg.growthColor}" style="width: 44px; height: 38px; border: 1px solid var(--border-medium); border-radius: 6px; cursor: pointer; padding: 2px;" />
                      <input type="text" id="text-growthColor" value="${cfg.growthColor}" style="flex: 1; padding: 8px 12px; font-family: var(--font-mono); font-size: 0.84rem; border: 1px solid var(--border-medium); border-radius: 6px;" />
                    </div>
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">لون التنبيه والأزرار الفرعية (Accent Amber)</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="color" id="input-accentColor" name="accentColor" value="${cfg.accentColor}" style="width: 44px; height: 38px; border: 1px solid var(--border-medium); border-radius: 6px; cursor: pointer; padding: 2px;" />
                      <input type="text" id="text-accentColor" value="${cfg.accentColor}" style="flex: 1; padding: 8px 12px; font-family: var(--font-mono); font-size: 0.84rem; border: 1px solid var(--border-medium); border-radius: 6px;" />
                    </div>
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">لون خلفية الصفحات (Page Canvas)</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="color" id="input-pageBgColor" name="pageBgColor" value="${cfg.pageBgColor}" style="width: 44px; height: 38px; border: 1px solid var(--border-medium); border-radius: 6px; cursor: pointer; padding: 2px;" />
                      <input type="text" id="text-pageBgColor" value="${cfg.pageBgColor}" style="flex: 1; padding: 8px 12px; font-family: var(--font-mono); font-size: 0.84rem; border: 1px solid var(--border-medium); border-radius: 6px;" />
                    </div>
                  </div>
                </div>
              </div>

              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); display: flex; align-items: center; gap: 8px;">
                  
                  <span>${txt('الخطوط وانحناء الحواف (Typography & Geometry)', 'Typography & Geometry', 'Typographie & Rayon')}</span>
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">خط الواجهة الأساسي (Arabic Font)</label>
                    <select name="fontFamily" class="form-select" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium); background: #FFFFFF;">
                      <option value="Cairo" ${cfg.fontFamily === 'Cairo' ? 'selected' : ''}>Cairo (الخط الرسمي لشركة شات)</option>
                      <option value="Almarai" ${cfg.fontFamily === 'Almarai' ? 'selected' : ''}>Almarai (عصري متوازن)</option>
                      <option value="Tajawal" ${cfg.fontFamily === 'Tajawal' ? 'selected' : ''}>Tajawal (هندسي رشيق)</option>
                      <option value="IBM Plex Sans Arabic" ${cfg.fontFamily === 'IBM Plex Sans Arabic' ? 'selected' : ''}>IBM Plex Sans Arabic (تقني رفيع)</option>
                    </select>
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">انحناء حواف البطاقات والأزرار (Border Radius)</label>
                    <select name="borderRadius" class="form-select" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium); background: #FFFFFF;">
                      <option value="4px" ${cfg.borderRadius === '4px' ? 'selected' : ''}>حاد أنيق (Sharp Minimalist - 4px)</option>
                      <option value="8px" ${cfg.borderRadius === '8px' ? 'selected' : ''}>كلاسيكي (Classic - 8px)</option>
                      <option value="12px" ${cfg.borderRadius === '12px' ? 'selected' : ''}>عصري ناعم (Modern Rounded - 12px)</option>
                      <option value="20px" ${cfg.borderRadius === '20px' ? 'selected' : ''}>دائري فخم (Smooth Pill - 20px)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 2: Identity & Copy -->
            <div id="tab-identity" class="customizer-tab-pane" style="display: none; flex-direction: column; gap: 18px;">
              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy);">
                  ${txt('عناوين وهوية المنصة', 'Platform Titles & Identity', 'Identité & Titres')}
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">اسم المنصة بالعربية</label>
                    <input type="text" name="brandNameAr" value="${cfg.brandNameAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" required />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">Brand Title (English)</label>
                    <input type="text" name="brandNameEn" value="${cfg.brandNameEn}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" required />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">الشعار المؤسسي الرسمي (Motto)</label>
                    <input type="text" name="mottoAr" value="${cfg.mottoAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">الوصف التخصصي الفرعي</label>
                    <input type="text" name="subMottoAr" value="${cfg.subMottoAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                </div>
              </div>

              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy);">
                  ${txt('شريط الإعلانات العاجل والواجهة الرئيسية', 'Announcement Banner & Hero Copy', 'Bandeau & Hero')}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">نص شريط الإعلانات العلوي</label>
                    <input type="text" name="announcementTextAr" value="${cfg.announcementTextAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">العنوان الترويجي في الواجهة الرئيسية (Hero Title)</label>
                    <input type="text" name="heroTitleAr" value="${cfg.heroTitleAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">النص التوضيحي للواجهة الرئيسية (Hero Subtitle)</label>
                    <textarea name="heroSubtitleAr" rows="2" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);">${cfg.heroSubtitleAr}</textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 3: Contacts & Social -->
            <div id="tab-contacts" class="customizer-tab-pane" style="display: none; flex-direction: column; gap: 18px;">
              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy);">
                  ${txt('بيانات الاتصال الرسمية', 'Official Contact Details', 'Coordonnées')}
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رقم الهاتف الرسمي</label>
                    <input type="text" name="primaryPhone" value="${cfg.primaryPhone}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">رقم واتساب المباشر</label>
                    <input type="text" name="whatsappNumber" value="${cfg.whatsappNumber}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">البريد الإلكتروني المعتمد</label>
                    <input type="email" name="primaryEmail" value="${cfg.primaryEmail}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">عنوان المقر الرئيسي</label>
                    <input type="text" name="addressAr" value="${cfg.addressAr}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.88rem; border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                </div>
              </div>

              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy);">
                  ${txt('قنوات التواصل الاجتماعي الرسمية المعتمدة', 'Official Verified Social Channels', 'Réseaux Socials Officiels')}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">صفحة فيسبوك الرسمية (Facebook Page URL)</label>
                    <input type="url" name="facebookUrl" value="${cfg.facebookUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">حساب إنستغرام الرسمي (Instagram Account URL)</label>
                    <input type="url" name="instagramUrl" value="${cfg.instagramUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">صفحة لينكد إن الرسمية (LinkedIn Company URL)</label>
                    <input type="url" name="linkedinUrl" value="${cfg.linkedinUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 4: Forms Links -->
            <div id="tab-forms" class="customizer-tab-pane" style="display: none; flex-direction: column; gap: 18px;">
              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy);">
                  ${txt('روابط استمارات Google Forms المعتمدة', 'Verified Google Form URLs', 'Liens Google Forms')}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">1. استمارة دورة إعداد وتأهيل مدير حالة Case Management (د. محمد إسليم)</label>
                    <input type="url" name="formCaseManagerUrl" value="${cfg.formCaseManagerUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">2. استمارة دورة مهارات العرض والتقديم (م. مهدي الملاحي)</label>
                    <input type="url" name="formPresentationUrl" value="${cfg.formPresentationUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">3. استمارة دبلوم تأهيل عامل في المجال الإنساني «من المبادئ إلى الممارسة»</label>
                    <input type="url" name="formHumanitarianUrl" value="${cfg.formHumanitarianUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; display: block;">4. استمارة طلب الاستشارات التنموية المتقدمة ودبلوم CHS</label>
                    <input type="url" name="formConsultingUrl" value="${cfg.formConsultingUrl}" class="form-input" style="width: 100%; padding: 8px 12px; font-size: 0.84rem; font-family: var(--font-mono); border-radius: 6px; border: 1px solid var(--border-medium);" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 5: Sections Visibility -->
            <div id="tab-sections" class="customizer-tab-pane" style="display: none; flex-direction: column; gap: 18px;">
              <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px; box-shadow: var(--shadow-sm);">
                <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; font-weight: 800; color: var(--shat-navy);">
                  ${txt('التحكم في تفعيل وظهور مكونات المنصة', 'Platform Components Toggles', 'Visibilité des Composants')}
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
                  <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; font-weight: 700; cursor: pointer; background: #F8FAFC; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-light);">
                    <input type="checkbox" name="showAnnouncement" ${cfg.showAnnouncement ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--shat-green);" />
                    <span>شريط التنبيهات العلوي</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; font-weight: 700; cursor: pointer; background: #F8FAFC; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-light);">
                    <input type="checkbox" name="showHeroMetrics" ${cfg.showHeroMetrics ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--shat-green);" />
                    <span>مؤشرات الإنجاز الرقمية</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; font-weight: 700; cursor: pointer; background: #F8FAFC; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-light);">
                    <input type="checkbox" name="showDiagnosticPromo" ${cfg.showDiagnosticPromo ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--shat-green);" />
                    <span>أداة التشخيص المؤسسي</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; font-weight: 700; cursor: pointer; background: #F8FAFC; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-light);">
                    <input type="checkbox" name="showToolkitsHub" ${cfg.showToolkitsHub ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--shat-green);" />
                    <span>مكتبة الحقائب والقوالب</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; font-weight: 700; cursor: pointer; background: #F8FAFC; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-light);">
                    <input type="checkbox" name="showSocialFeed" ${cfg.showSocialFeed ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--shat-green);" />
                    <span>تغذية الأخبار والسوشيال ميديا</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Footer Action Buttons -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid var(--border-light); flex-shrink: 0;">
              <button type="button" id="btn-reset-customizer" class="btn-clean" style="background: #F1F5F9; color: #64748B; font-weight: 700; border: 1px solid var(--border-medium); padding: 9px 18px; font-size: 0.84rem; border-radius: 6px;">
                <span>↺</span>
                <span>${txt('استعادة الإعدادات الأصلية المصنعية', 'Reset to Factory Defaults', 'Réinitialiser')}</span>
              </button>

              <div style="display: flex; gap: 10px;">
                <button type="button" class="btn-clean" id="btn-cancel-customizer" style="background: #FFFFFF; color: var(--text-main); border: 1px solid var(--border-medium); padding: 9px 18px; font-size: 0.84rem; border-radius: 6px;">
                  <span>${txt('إلغاء التعديل', 'Cancel', 'Annuler')}</span>
                </button>
                <button type="submit" class="btn-clean btn-primary" style="padding: 10px 26px; font-size: 0.9rem; font-weight: 800; background: var(--shat-green, #10B981); color: #FFFFFF; border: none; border-radius: 6px; box-shadow: 0 4px 12px rgba(16,185,129,0.35); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                  ${icons.check('icon-inline', 16)}
                  <span>${txt('حفظ وتطبيق التغييرات فوراً', 'Save & Apply Live', 'Enregistrer et Appliquer')}</span>
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    `;

    modal.style.display = 'flex';

    // Tab Navigation Binding
    const tabBtns = modal.querySelectorAll('.customizer-tab-btn');
    const tabPanes = modal.querySelectorAll('.customizer-tab-pane');
    tabBtns.forEach(btn => {
      btn.onclick = () => {
        const targetTab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = 'var(--text-muted)';
          b.style.boxShadow = 'none';
        });
        btn.classList.add('active');
        btn.style.background = '#FFFFFF';
        btn.style.color = 'var(--shat-navy, #0F2E4A)';
        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';

        tabPanes.forEach(pane => {
          if (pane.id === targetTab) {
            pane.style.display = 'flex';
          } else {
            pane.style.display = 'none';
          }
        });
      };
    });

    // Preset Clicks
    const presetCards = modal.querySelectorAll('.preset-card');
    presetCards.forEach(card => {
      card.onclick = () => {
        const pKey = card.getAttribute('data-preset');
        const preset = THEME_PRESETS[pKey];
        if (!preset) return;
        presetCards.forEach(c => {
          c.classList.remove('active-preset');
          c.style.borderColor = 'var(--border-light)';
        });
        card.classList.add('active-preset');
        card.style.borderColor = 'var(--shat-green, #10B981)';

        // Update inputs
        modal.querySelector('#input-primaryColor').value = preset.primaryColor;
        modal.querySelector('#text-primaryColor').value = preset.primaryColor;
        modal.querySelector('#input-growthColor').value = preset.growthColor;
        modal.querySelector('#text-growthColor').value = preset.growthColor;
        modal.querySelector('#input-accentColor').value = preset.accentColor;
        modal.querySelector('#text-accentColor').value = preset.accentColor;
        modal.querySelector('#input-pageBgColor').value = preset.pageBgColor;
        modal.querySelector('#text-pageBgColor').value = preset.pageBgColor;

        // Preview live
        this.applyThemeToDocument({
          ...cfg,
          primaryColor: preset.primaryColor,
          growthColor: preset.growthColor,
          accentColor: preset.accentColor,
          pageBgColor: preset.pageBgColor
        });
      };
    });

    // Live color input binding
    ['primaryColor', 'growthColor', 'accentColor', 'pageBgColor'].forEach(field => {
      const picker = modal.querySelector(`#input-${field}`);
      const text = modal.querySelector(`#text-${field}`);
      if (picker && text) {
        picker.oninput = () => {
          text.value = picker.value;
          this.applyThemeToDocument({
            ...this.getConfig(),
            [field]: picker.value
          });
        };
        text.oninput = () => {
          if (/^#[0-9A-Fa-f]{6}$/.test(text.value)) {
            picker.value = text.value;
            this.applyThemeToDocument({
              ...this.getConfig(),
              [field]: text.value
            });
          }
        };
      }
    });

    // Modal Control Handlers
    const closeBtn = document.getElementById('btn-close-customizer');
    const cancelBtn = document.getElementById('btn-cancel-customizer');
    const resetBtn = document.getElementById('btn-reset-customizer');
    const form = document.getElementById('site-customizer-form');

    const closeModal = () => {
      this.applyThemeToDocument(); // Revert any unsaved live previews
      modal.style.display = 'none';
    };
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm(txt('هل أنت متأكد من رغبتك في استعادة كافة الإعدادات والألوان الافتراضية للمنصة؟', 'Reset all site settings and colors to factory defaults?', 'Réinitialiser tous les paramètres ?'))) {
          this.resetDefaults();
          showToast(txt('تمت استعادة الإعدادات الافتراضية بنجاح.', 'Defaults restored successfully.', 'Paramètres restaurés.'), 'info');
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
          primaryColor: fd.get('primaryColor'),
          growthColor: fd.get('growthColor'),
          accentColor: fd.get('accentColor'),
          pageBgColor: fd.get('pageBgColor'),
          fontFamily: fd.get('fontFamily'),
          borderRadius: fd.get('borderRadius'),
          brandNameAr: fd.get('brandNameAr'),
          brandNameEn: fd.get('brandNameEn'),
          mottoAr: fd.get('mottoAr'),
          subMottoAr: fd.get('subMottoAr'),
          announcementTextAr: fd.get('announcementTextAr'),
          heroTitleAr: fd.get('heroTitleAr'),
          heroSubtitleAr: fd.get('heroSubtitleAr'),
          primaryPhone: fd.get('primaryPhone'),
          whatsappNumber: fd.get('whatsappNumber'),
          primaryEmail: fd.get('primaryEmail'),
          addressAr: fd.get('addressAr'),
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
        showToast(txt('تم تطبيق وحفظ كافة التعديلات والتخصيصات بنجاح!', 'All customizations and styling tokens saved and applied live!', 'Modifications enregistrées avec succès !'), 'success');
        modal.style.display = 'none';
      };
    }
  }
};

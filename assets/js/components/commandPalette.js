// assets/js/components/commandPalette.js
// Executive Spotlight / Command Palette (Ctrl+K) for SHAT Platform
// Linear & Apple-Tier Instant Search Across All Courses, Forms, Tools & Pages
import { icons } from '../icons.js';

export class CommandPalette {
  constructor() {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.items = this.getIndex();
    this.filteredItems = [...this.items];
    this.init();
  }

  getIndex() {
    const lang = localStorage.getItem('shat_platform_lang') || 'ar';
    const isAr = lang === 'ar';

    return [
      // 1. Google Forms
      {
        id: 'form-cm',
        category: isAr ? 'استمارات التسجيل المعتمدة' : 'Official Forms',
        title: isAr ? 'دورة إعداد مدير حالة Case Management (د. محمد إسليم)' : 'Case Manager Training (Dr. Mohamed Isleem)',
        subtitle: isAr ? 'استمارة Google Forms الرسمية • 30 ساعة تدريبية معتمدة' : 'Official Google Form • 30 Accredited Hours',
        icon: icons.form('cmd-icon', 18),
        url: '#/forms?id=case-manager-2026',
        badge: 'SHAT-FORM-01'
      },
      {
        id: 'form-pres',
        category: isAr ? 'استمارات التسجيل المعتمدة' : 'Official Forms',
        title: isAr ? 'دورة مهارات العرض والتقديم Presentation Skills (م. مهدي الملاحي)' : 'Presentation Skills Course (Eng. Mahdi Al-Malahi)',
        subtitle: isAr ? 'استمارة Google Forms الرسمية • مهارات الإلقاء والتأثير' : 'Official Google Form • Executive Speaking',
        icon: icons.form('cmd-icon', 18),
        url: '#/forms?id=presentation-skills-2026',
        badge: 'SHAT-FORM-02'
      },
      {
        id: 'form-hw',
        category: isAr ? 'استمارات التسجيل المعتمدة' : 'Official Forms',
        title: isAr ? 'دبلوم الممارس الإنساني وبناء القدرات المؤسسية' : 'Humanitarian Worker Diploma & Capacity Building',
        subtitle: isAr ? 'استمارة Google Forms الرسمية • معايير العمل الإنساني والتدخل' : 'Official Google Form • Humanitarian Standards',
        icon: icons.form('cmd-icon', 18),
        url: '#/forms?id=humanitarian-worker-2026',
        badge: 'SHAT-FORM-03'
      },
      {
        id: 'form-cons',
        category: isAr ? 'استمارات التسجيل المعتمدة' : 'Official Forms',
        title: isAr ? 'استمارة الاستشارات المؤسسية وبناء القدرات المتقدمة' : 'Institutional Consulting & Advisory Application',
        subtitle: isAr ? 'استمارة Google Forms الرسمية • للمنظمات والجمعيات والمؤسسات' : 'Official Google Form • For NGOs & Entities',
        icon: icons.form('cmd-icon', 18),
        url: '#/forms?id=consulting-inquiry-2026',
        badge: 'SHAT-FORM-04'
      },

      // 2. Training Courses & LMS
      {
        id: 'course-chs',
        category: isAr ? 'الأكاديمية والمساقات' : 'Academy & Courses',
        title: isAr ? 'دبلوم المعيار الإنساني الأساسي (CHS Master Diploma)' : 'Core Humanitarian Standard (CHS Master)',
        subtitle: isAr ? '60 ساعة • 6 مساقات متخصصة • شهادة دولية معتمدة' : '60 Hours • 6 Modules • International Certificate',
        icon: icons.award('cmd-icon', 18),
        url: '#/course?id=shat-chs-master',
        badge: 'دبلوم تنفيذي'
      },
      {
        id: 'course-psea',
        category: isAr ? 'الأكاديمية والمساقات' : 'Academy & Courses',
        title: isAr ? 'صون السلامة والحماية من الاستغلال والانتهاك (PSEA)' : 'Protection from Sexual Exploitation & Abuse (PSEA)',
        subtitle: isAr ? 'أدلة الامتثال المؤسسي وتدابير الحماية الميدانية' : 'Institutional Compliance & Safeguarding',
        icon: icons.shield('cmd-icon', 18),
        url: '#/academy',
        badge: 'معتمد دولياً'
      },
      {
        id: 'course-meal',
        category: isAr ? 'الأكاديمية والمساقات' : 'Academy & Courses',
        title: isAr ? 'نظم المتابعة والتقييم والمساءلة والتعلم (MEAL)' : 'Monitoring, Evaluation, Accountability & Learning (MEAL)',
        subtitle: isAr ? 'تصميم مصفوفات المؤشرات وأدوات الرصد الميداني' : 'Indicator Matrices & Field Monitoring',
        icon: icons.book('cmd-icon', 18),
        url: '#/academy',
        badge: 'تطبيقي'
      },
      {
        id: 'course-oecd',
        category: isAr ? 'الأكاديمية والمساقات' : 'Academy & Courses',
        title: isAr ? 'خبير التقييم الخارجي المستقل للمشاريع OECD DAC' : 'OECD DAC External Evaluation Expert',
        subtitle: isAr ? 'معايير الملاءمة والفاعلية والكفاءة والاستدامة' : 'Relevance, Effectiveness & Sustainability',
        icon: icons.eye('cmd-icon', 18),
        url: '#/academy',
        badge: 'استشاري'
      },

      // 3. Interactive Tools
      {
        id: 'tool-verify',
        category: isAr ? 'الأدوات التفاعلية' : 'Interactive Tools',
        title: isAr ? 'بوابة التحقق الرقمي من الشهادات والاعتمادات' : 'Digital Certificate Verification Portal',
        subtitle: isAr ? 'فحص صحة وأصالة أي شهادة صادرة من شركة شات' : 'Verify validity & authenticity of SHAT certificates',
        icon: icons.checkCircle('cmd-icon', 18),
        url: '#/verify',
        badge: 'جديد'
      },
      {
        id: 'tool-diag',
        category: isAr ? 'الأدوات التفاعلية' : 'Interactive Tools',
        title: isAr ? 'أداة التشخيص المؤسسي والجاهزية الفورية' : 'Instant Institutional Readiness Diagnostic',
        subtitle: isAr ? 'تقييم امتثال منظمتك لمعايير CHS والحوكمة والسلامة' : 'Assess compliance with CHS & Governance',
        icon: icons.compass('cmd-icon', 18),
        url: '#/home',
        badge: 'تفاعلي'
      },
      {
        id: 'tool-customizer',
        category: isAr ? 'الأدوات التفاعلية' : 'Interactive Tools',
        title: isAr ? 'تخصيص المنصة والمظهر والمحتوى (CMS)' : 'Deep In-Site Platform Customizer',
        subtitle: isAr ? 'تعديل شعارات ونصوص وروابط وألوان المنصة مباشرة' : 'Customize branding, texts, contacts & colors',
        icon: icons.settings('cmd-icon', 18),
        action: () => {
          if (window.openSiteCustomizer) window.openSiteCustomizer();
        },
        badge: 'الإدارة'
      },

      // 4. Portals & Core Views
      {
        id: 'nav-forms',
        category: isAr ? 'بوابات المنظومة' : 'Platform Portals',
        title: isAr ? 'كافة استمارات التسجيل وسجل المتابعة الميداني' : 'All Registration Forms & Submissions Log',
        subtitle: isAr ? 'استعراض النماذج وتعبئتها ومتابعة سجلات التقديم' : 'Browse forms, submit & view submissions table',
        icon: icons.form('cmd-icon', 18),
        url: '#/forms',
        badge: 'متزامن'
      },
      {
        id: 'nav-academy',
        category: isAr ? 'بوابات المنظومة' : 'Platform Portals',
        title: isAr ? 'بوابة الأكاديمية والتدريب LMS' : 'LMS Training Academy Portal',
        subtitle: isAr ? 'المساقات، المحاضرات، التكليفات الدراسية والاختبارات' : 'Courses, lectures, assignments & exams',
        icon: icons.academy('cmd-icon', 18),
        url: '#/academy',
        badge: 'LMS'
      },
      {
        id: 'nav-services',
        category: isAr ? 'بوابات المنظومة' : 'Platform Portals',
        title: isAr ? 'مجالات العمل والاستشارات المؤسسية' : 'Consulting Services & Advisory Tracks',
        subtitle: isAr ? 'تأهيل المؤسسات، الحوكمة، وإعداد الأدلة التشغيلية SOPs' : 'Institutional rehabilitation & SOPs development',
        icon: icons.briefcase('cmd-icon', 18),
        url: '#/services',
        badge: 'استشارات'
      },
      {
        id: 'nav-news',
        category: isAr ? 'بوابات المنظومة' : 'Platform Portals',
        title: isAr ? 'الأخبار والمنشورات وأوراق الموقف' : 'News, Announcements & Position Papers',
        subtitle: isAr ? 'آخر الفعاليات ومشاركات فيسبوك وإنستغرام' : 'Latest events & social feeds',
        icon: icons.fileText('cmd-icon', 18),
        url: '#/news',
        badge: 'إعلامي'
      },
      {
        id: 'nav-contact',
        category: isAr ? 'بوابات المنظومة' : 'Platform Portals',
        title: isAr ? 'التواصل المؤسسي وحجز الاستشارات' : 'Institutional Contact & Inquiries',
        subtitle: isAr ? 'واتساب المعتمد: 972592879621+ • shat.company26@gmail.com' : 'Direct WhatsApp & corporate email',
        icon: icons.whatsapp('cmd-icon', 18),
        url: '#/contact',
        badge: 'مباشر'
      }
    ];
  }

  init() {
    this.createDom();
    this.bindShortcuts();
  }

  createDom() {
    if (document.getElementById('shat-command-palette-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'shat-command-palette-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(11, 30, 54, 0.65);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 99999;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: 80px 16px 24px;
      opacity: 0;
      transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    backdrop.innerHTML = `
      <div id="shat-command-palette-modal" style="
        background: #FFFFFF;
        width: 100%;
        max-width: 640px;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(11, 30, 54, 0.35), 0 0 0 1px rgba(11, 30, 54, 0.08);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: scale(0.96) translateY(-10px);
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <!-- Input Header -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid #E2E8F0; background: #F8FAFC;">
          <span style="font-size: 1.1rem; color: #1E3A8A; font-weight: bold;"></span>
          <input type="text" id="palette-search-input" placeholder="ابحث عن دورة، استمارة، مساق، استشارة، أو أداة... (Ctrl+K)" style="
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-size: 1.05rem;
            font-weight: 600;
            color: #0B1E36;
            direction: rtl;
          ">
          <span style="
            font-size: 0.72rem;
            background: #E2E8F0;
            color: #475569;
            padding: 3px 8px;
            border-radius: 6px;
            font-family: monospace;
            font-weight: 700;
          ">ESC</span>
        </div>

        <!-- Filtered Results Container -->
        <div id="palette-results-list" style="
          max-height: 380px;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        ">
          <!-- Populated dynamically -->
        </div>

        <!-- Footer Shortcuts Help -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 18px; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 0.76rem; color: #64748B;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <span><kbd style="background: #E2E8F0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">↑↓</kbd> للتنقل</span>
            <span><kbd style="background: #E2E8F0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">Enter</kbd> للفتح</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: #1E7E34;">
            <span>شركة شات للتنمية والتطوير</span>
            <span>•</span>
            <span>SHAT Platform</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Event bindings inside modal
    const input = backdrop.querySelector('#palette-search-input');
    input.addEventListener('input', (e) => {
      this.filter(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % Math.max(1, this.filteredItems.length);
        this.renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredItems.length) % Math.max(1, this.filteredItems.length);
        this.renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.selectItem(this.selectedIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });
  }

  bindShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Global helper
    window.openCommandPalette = () => this.open();
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    this.items = this.getIndex();
    this.filteredItems = [...this.items];
    this.selectedIndex = 0;

    const backdrop = document.getElementById('shat-command-palette-backdrop');
    const modal = document.getElementById('shat-command-palette-modal');
    const input = document.getElementById('palette-search-input');

    if (backdrop && modal) {
      backdrop.style.display = 'flex';
      setTimeout(() => {
        backdrop.style.opacity = '1';
        modal.style.transform = 'scale(1) translateY(0)';
      }, 10);
    }

    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
    }

    this.renderResults();
  }

  close() {
    this.isOpen = false;
    const backdrop = document.getElementById('shat-command-palette-backdrop');
    const modal = document.getElementById('shat-command-palette-modal');

    if (backdrop && modal) {
      backdrop.style.opacity = '0';
      modal.style.transform = 'scale(0.96) translateY(-10px)';
      setTimeout(() => {
        backdrop.style.display = 'none';
      }, 200);
    }
  }

  filter(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.subtitle.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q) ||
               (item.badge && item.badge.toLowerCase().includes(q));
      });
    }
    this.selectedIndex = 0;
    this.renderResults();
  }

  renderResults() {
    const list = document.getElementById('palette-results-list');
    if (!list) return;

    if (this.filteredItems.length === 0) {
      list.innerHTML = `
        <div style="padding: 32px 20px; text-align: center; color: #64748B;">
          <span style="font-size: 1.8rem; display: block; margin-bottom: 8px; color: #94A3B8;"></span>
          <div style="font-weight: 700; font-size: 0.95rem; color: #0B1E36;">لم يتم العثور على نتائج مطابقة</div>
          <div style="font-size: 0.82rem; margin-top: 4px;">جرب البحث بكلمات أخرى مثل "إدارة حالة"، "CHS"، "استشارة"، أو "استمارة"</div>
        </div>
      `;
      return;
    }

    // Group items by category
    let html = '';
    let currentCat = '';

    this.filteredItems.forEach((item, idx) => {
      if (item.category !== currentCat) {
        currentCat = item.category;
        html += `
          <div style="padding: 8px 12px 4px; font-size: 0.72rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em;">
            ${currentCat}
          </div>
        `;
      }

      const isSelected = idx === this.selectedIndex;

      html += `
        <div class="palette-item" data-index="${idx}" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          background: ${isSelected ? 'rgba(30,126,52,0.08)' : 'transparent'};
          border: 1px solid ${isSelected ? 'rgba(30,126,52,0.3)' : 'transparent'};
          transition: all 0.1s ease;
        ">
          <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
            <span style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--shat-green);">${item.icon}</span>
            <div style="min-width: 0;">
              <div style="font-size: 0.92rem; font-weight: 700; color: ${isSelected ? '#166534' : '#0B1E36'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${item.title}
              </div>
              <div style="font-size: 0.78rem; color: #64748B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;">
                ${item.subtitle}
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-inline-start: 12px;">
            ${item.badge ? `<span style="font-size: 0.72rem; font-weight: 700; background: #F1F5F9; color: #475569; padding: 2px 8px; border-radius: 4px;">${item.badge}</span>` : ''}
            <span style="color: #94A3B8; display:inline-flex; align-items:center;">${icons.arrowLeft('icon-inline', 13)}</span>
          </div>
        </div>
      `;
    });

    list.innerHTML = html;

    // Attach click listeners to each item
    list.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectItem(idx);
      });
      el.addEventListener('mouseenter', () => {
        this.selectedIndex = parseInt(el.getAttribute('data-index'), 10);
        this.renderResults();
      });
    });
  }

  selectItem(index) {
    const item = this.filteredItems[index];
    if (!item) return;

    this.close();

    if (item.action) {
      item.action();
    } else if (item.url) {
      window.location.hash = item.url;
    }
  }
}

// Global Singleton Instance
export const commandPalette = new CommandPalette();

// assets/js/tools/globalSearch.js
// Production Global Spotlight Search Engine (Ctrl+K / ⌘K)
// Indexes all Courses, Services, Standards, Projects, and Tools across the SHAT Platform

import { content } from '../content.js';
import { icons } from '../icons.js';

export const globalSearch = {
  getSearchIndex(lang = 'ar') {
    const d = content[lang] || content.ar;
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    return [
      // Tools & Utilities
      {
        type: 'tool',
        typeLabel: txt('أداة تفاعلية', 'Interactive Tool', 'Outil Interactif'),
        title: txt('أداة التقييم والتشخيص المؤسسي (Readiness Diagnostic)', 'Institutional Readiness Diagnostic Tool', 'Diagnostic Institutionnel'),
        desc: txt('تقييم فوري لجاهزية المؤسسة وفق معايير CHS, PSEA, MEAL وخارطة الطريق.', 'Assess readiness across CHS, PSEA, MEAL and get tailored roadmaps.', 'Évaluez la maturité organisationnelle.'),
        action: 'open_diagnostic',
        icon: '◈'
      },
      {
        type: 'tool',
        typeLabel: txt('أداة تفاعلية', 'Interactive Tool', 'Outil Interactif'),
        title: txt('أداة التحقق من الشهادات الرقمية المعتمدة (Certificate Verification)', 'Digital Certificate Verification Tool', 'Vérification de Certificat'),
        desc: txt('التحقق الفوري من صحة الشهادات الصادرة من شركة شات وسجل الساعات والجدارات.', 'Instant verification of SHAT issued diplomas, hours and competencies.', 'Vérification en direct des diplômes.'),
        action: 'open_cert',
        icon: '▪'
      },
      {
        type: 'tool',
        typeLabel: txt('أداة تفاعلية', 'Interactive Tool', 'Outil Interactif'),
        title: txt('مكتبة الحقائب الميدانية والنماذج التشغيلية (Field Toolkits)', 'Field Toolkits & Templates Hub', 'Boîte à Outils Institutionnelle'),
        desc: txt('نماذج MEAL, PSEA, CFRM, وميثاق المشروع الجاهزة للتطبيق الفوري.', 'Downloadable MEAL, PSEA, CFRM, and Project Charter templates.', 'Modèles opérationnels téléchargeables.'),
        action: 'open_toolkits',
        icon: '◈'
      },

      // Courses
      {
        type: 'course',
        typeLabel: txt('دبلوم تدريبي', 'Academic Course', 'Formation Certifiante'),
        title: txt('دبلوم المعيار الإنساني الأساسي (CHS) وإدارة الاستجابة', 'Core Humanitarian Standard (CHS) Master Diploma', 'Diplôme Norme CHS'),
        desc: txt('حوكمة الالتزامات التسعة وآليات المساءلة للمتأثرين (AAP) وقنوات الشكاوى (CFRM).', 'Governing the 9 CHS commitments, AAP mechanisms and CFRM.', 'Gouvernance des 9 engagements CHS et redevabilité.'),
        route: '#/course/shat-chs-master',
        icon: '★'
      },
      {
        type: 'course',
        typeLabel: txt('دبلوم تدريبي', 'Academic Course', 'Formation Certifiante'),
        title: txt('البرنامج التنفيذي في استشارات الحماية وصون السلامة (PSEA)', 'Executive Program in Safeguarding & PSEA Advisory', 'Programme Exécutif PSEA'),
        desc: txt('مأسسة سياسات عدم التسامح مطلقاً وتأسيس وحدات التحقيق ومسارات الإحالة الآمنة.', 'Institutionalizing zero-tolerance, internal investigations and safe referrals.', 'Politiques de sauvegarde et circuits de signalement.'),
        route: '#/course/shat-psea-expert',
        icon: '◈'
      },
      {
        type: 'course',
        typeLabel: txt('دبلوم تدريبي', 'Academic Course', 'Formation Certifiante'),
        title: txt('الشهادة الاحترافية في التقييم التنموي المستقل (OECD DAC)', 'Professional Certificate in Independent Evaluation (OECD DAC)', 'Certificat Évaluation OCDE CAD'),
        desc: txt('المعايير الستة المعتمدة لقياس الأثر التنموي والاستدامة ونظرية التغيير.', 'The 6 criteria for evaluating development impact, sustainability and theory of change.', 'Évaluation d\'impact selon les 6 critères OCDE.'),
        route: '#/course/shat-oecd-eval',
        icon: '▲'
      },

      // Standards
      {
        type: 'standard',
        typeLabel: txt('معيار دولي', 'Global Standard', 'Norme Internationale'),
        title: txt('المعيار الإنساني الأساسي للجودة والمساءلة (CHS)', 'Core Humanitarian Standard (CHS)', 'Norme Humanitaire Fondamentale CHS'),
        desc: txt('الالتزامات التسعة للجودة والمساءلة في العمل الإنساني والتنموي.', 'Nine commitments for quality and accountability in aid.', '9 engagements pour la qualité et la redevabilité.'),
        route: '#/standards',
        icon: '◈'
      },
      {
        type: 'standard',
        typeLabel: txt('معيار دولي', 'Global Standard', 'Norme Internationale'),
        title: txt('معايير مشروع إسفير للاستجابة الإنسانية (Sphere Handbook)', 'The Sphere Handbook Minimum Standards', 'Le Manuel Sphère'),
        desc: txt('المعايير الفنية الدنيا في المياه والإصحاح والمأوى والصحة والأمن الغذائي.', 'Minimum technical standards in WASH, shelter, health, food.', 'Standards minimums en eau, abri, santé, nutrition.'),
        route: '#/standards',
        icon: '▪'
      },

      // Services & Portfolios
      {
        type: 'service',
        typeLabel: txt('خدمة استشارية', 'Advisory Service', 'Service de Conseil'),
        title: txt('منظومة الاستشارات المؤسسية والحوكمة', 'Institutional Consulting & Governance System', 'Système de Conseil & Gouvernance'),
        desc: txt('مساعدة المؤسسات على فهم الواقع، تحليل الفجوات، وبناء اللوائح والسياسات.', 'Assisting organizations in gap analysis and SOP policy formulation.', 'Audit organisationnel et élaboration des politiques.'),
        route: '#/services',
        icon: '◈'
      },
      {
        type: 'service',
        typeLabel: txt('حقيبة معتمدة', 'Training Portfolio', 'Portefeuille de Formation'),
        title: txt('الحقائب التدريبية المتخصصة الثماني (8 Portfolios)', 'Eight Specialized Training Portfolios', 'Huit Portefeuilles de Formation'),
        desc: txt('إدارة المشاريع التنموية، المتابعة والتقييم، الحوكمة، القيادة، والتحول الرقمي.', 'Project management, MEAL, governance, leadership, and digital transformation.', 'Gestion de projets, MEAL, gouvernance, leadership.'),
        route: '#/services',
        icon: '▪'
      },

      // Projects
      {
        type: 'project',
        typeLabel: txt('مشروع ميداني', 'Field Project', 'Projet de Terrain'),
        title: txt('مشروع حوكمة وتطبيق معيار CHS لمنظمات المجتمع المدني', 'CHS Governance & Implementation for CSOs', 'Déploiement Norme CHS pour ONG'),
        desc: txt('تأهيل 42 كادراً وصياغة 14 دليلاً تشغيلياً للشكاوى والحماية.', 'Trained 42 leaders and drafted 14 CFRM operational manuals.', 'Formation de 42 cadres et 14 manuels CFRM.'),
        route: '#/projects',
        icon: '★'
      },
      {
        type: 'project',
        typeLabel: txt('مشروع ميداني', 'Field Project', 'Projet de Terrain'),
        title: txt('مشروع أطر الحماية وصون السلامة ومنع الاستغلال (PSEA)', 'Protection & Safeguarding (PSEA) Frameworks', 'Cadre de Sauvegarde PSEA'),
        desc: txt('اعتماد سياسات الحماية وتأسيس لجان التحقيق الداخلي لـ 8 مؤسسات.', 'Policy adoption and investigation committees established across 8 entities.', 'Adoption de politiques PSEA dans 8 institutions.'),
        route: '#/projects',
        icon: '◈'
      }
    ];
  },

  renderModal(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    return `
      <div class="global-search-box" style="background: #FFFFFF; border-radius: var(--radius-md); max-width: 680px; width: 100%; margin: 60px auto 0; box-shadow: var(--shadow-xl); border: 1px solid var(--border-light); overflow: hidden; animation: searchDrop 0.2s ease;">
        
        <!-- Search Input Bar -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--border-light); background: #FFFFFF;">
          <span style="font-size: 1.25rem; color: var(--shat-green); font-weight: bold;"></span>
          <input type="text" id="spotlight-search-input" placeholder="${txt('ابحث عن دورة، خدمة، معيار، أداة، أو مشروع... (Esc للإغلاق)', 'Search courses, services, standards, tools, or projects...', 'Rechercher une formation, service, norme...')}" style="flex: 1; border: none; outline: none; font-size: 1.05rem; font-family: inherit; color: var(--shat-navy); background: transparent; text-align: ${isRtl ? 'right' : 'left'};">
          <kbd style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 4px; padding: 3px 8px; font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">ESC</kbd>
        </div>

        <!-- Filter Tags -->
        <div style="display: flex; gap: 6px; padding: 10px 20px; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light); overflow-x: auto;" id="search-filter-pills">
          <button class="btn-clean search-pill-btn active" data-filter="all" style="font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; background: var(--shat-navy); color: #FFFFFF;">
            ${txt('الكل', 'All', 'Tous')}
          </button>
          <button class="btn-clean search-pill-btn" data-filter="tool" style="font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-light);">
            ${txt('الأدوات', 'Tools', 'Outils')}
          </button>
          <button class="btn-clean search-pill-btn" data-filter="course" style="font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-light);">
            ${txt('الدورات', 'Courses', 'Formations')}
          </button>
          <button class="btn-clean search-pill-btn" data-filter="service" style="font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-light);">
            ${txt('الخدمات', 'Services', 'Services')}
          </button>
          <button class="btn-clean search-pill-btn" data-filter="standard" style="font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-light);">
            ${txt('المعايير', 'Standards', 'Normes')}
          </button>
          <button class="btn-clean search-pill-btn" data-filter="project" style="font-size: 0.75rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-light);">
            ${txt('المشاريع', 'Projects', 'Projets')}
          </button>
        </div>

        <!-- Search Results List -->
        <div id="spotlight-results-list" style="max-height: 400px; overflow-y: auto; padding: 12px 16px; display: flex; flex-direction: column; gap: 6px;">
          <!-- Populated dynamically -->
        </div>

        <!-- Search Footer -->
        <div style="padding: 10px 20px; background: var(--bg-subtle); border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem; color: var(--text-muted);">
          <div style="display: flex; gap: 12px; align-items: center;">
            <span><kbd style="padding: 1px 4px; border: 1px solid var(--border-light); border-radius: 3px;">↵</kbd> ${txt('للانتقال', 'to select', 'pour ouvrir')}</span>
            <span><kbd style="padding: 1px 4px; border: 1px solid var(--border-light); border-radius: 3px;">↑</kbd> <kbd style="padding: 1px 4px; border: 1px solid var(--border-light); border-radius: 3px;">↓</kbd> ${txt('للتنقل', 'to navigate', 'naviguer')}</span>
          </div>
          <div>شركة شات للتنمية والتطوير • SHAT Search</div>
        </div>
      </div>
    `;
  },

  open(lang = 'ar') {
    const modal = document.getElementById('global-search-modal');
    if (!modal) return;
    modal.innerHTML = this.renderModal(lang);
    modal.classList.add('open');

    const input = document.getElementById('spotlight-search-input');
    if (input) {
      input.focus();
      input.oninput = () => this.filterResults(lang);
      input.onkeydown = (e) => {
        if (e.key === 'Escape') {
          modal.classList.remove('open');
        }
      };
    }

    // Filter pills
    modal.querySelectorAll('.search-pill-btn').forEach(btn => {
      btn.onclick = () => {
        modal.querySelectorAll('.search-pill-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = '#FFFFFF';
          b.style.color = 'var(--shat-navy)';
        });
        btn.classList.add('active');
        btn.style.background = 'var(--shat-navy)';
        btn.style.color = '#FFFFFF';
        this.filterResults(lang);
      };
    });

    // Close on backdrop click
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('open');
    };

    this.filterResults(lang);
  },

  filterResults(lang = 'ar') {
    const input = document.getElementById('spotlight-search-input');
    const container = document.getElementById('spotlight-results-list');
    const modal = document.getElementById('global-search-modal');
    if (!container || !input) return;

    const query = input.value.trim().toLowerCase();
    const activeFilterBtn = modal.querySelector('.search-pill-btn.active');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

    const items = this.getSearchIndex(lang);
    const filtered = items.filter(item => {
      const matchFilter = filter === 'all' || item.type === filter;
      if (!matchFilter) return false;
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.typeLabel.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--text-muted);">
          <div style="display: flex; justify-content: center; margin-bottom: 12px; color: var(--shat-navy); opacity: 0.6;">
            ${icons.search('', 36)}
          </div>
          <div style="font-weight: 700; color: var(--shat-navy);">${lang === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching results found'}</div>
          <div style="font-size: 0.8rem; margin-top: 4px;">${lang === 'ar' ? 'جرّب البحث بكلمات أخرى مثل: CHS، تدريب، استشارات، تقييم...' : 'Try keywords like: CHS, training, evaluation, MEAL...'}</div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="search-result-row" data-route="${item.route || ''}" data-action="${item.action || ''}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); background: #FFFFFF; cursor: pointer; transition: all 0.15s ease;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: rgba(15, 46, 74, 0.06); color: var(--shat-navy); flex-shrink: 0;">
            ${item.type === 'tool' ? icons.compass('', 18) : item.type === 'course' ? icons.book('', 18) : item.type === 'standard' ? icons.shield('', 18) : item.type === 'service' ? icons.briefcase('', 18) : icons.fileText('', 18)}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-weight: 800; font-size: 0.92rem; color: var(--shat-navy);">${item.title}</span>
              <span class="badge" style="background: var(--bg-subtle); color: var(--shat-green); font-size: 0.7rem; font-weight: 700;">${item.typeLabel}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${item.desc}</div>
          </div>
        </div>
        <span style="color: var(--shat-green); display: flex; align-items: center;">${lang === 'ar' ? icons.arrowLeft('', 16) : icons.arrowRight('', 16)}</span>
      </div>
    `).join('');

    // Bind row clicks
    container.querySelectorAll('.search-result-row').forEach(row => {
      row.onclick = () => {
        modal.classList.remove('open');
        const route = row.getAttribute('data-route');
        const action = row.getAttribute('data-action');

        if (action === 'open_diagnostic') {
          if (window.openDiagnosticModal) window.openDiagnosticModal();
        } else if (action === 'open_cert') {
          if (window.openCertificateModal) window.openCertificateModal();
        } else if (action === 'open_toolkits') {
          window.location.hash = '#/services';
        } else if (route) {
          window.location.hash = route;
        }
      };

      row.onmouseover = () => {
        row.style.background = 'var(--shat-green-tint)';
        row.style.borderColor = 'var(--shat-green)';
      };
      row.onmouseout = () => {
        row.style.background = '#FFFFFF';
        row.style.borderColor = 'var(--border-light)';
      };
    });
  }
};

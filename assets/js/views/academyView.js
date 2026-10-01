// assets/js/views/academyView.js
// Academy & LMS Course Catalog with Live Search, Filter Tabs, and Direct Interactive Tools Suite
// 100% Trilingual Support (AR, EN, FR) & WCAG AAA High Contrast Design
import { content } from '../content.js';
import { api } from '../services/api/apiClient.js';
import { academyTranslations } from '../academyTranslations.js';
import { renderTrainingCalendarSection, bindTrainingCalendarEvents } from '../components/trainingCalendar.js';
import { renderFaqSection, bindFaqEvents } from '../components/faqSection.js';

export function renderAcademyView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const at = academyTranslations[lang] || academyTranslations.ar;
  const d = content[lang] || content.ar;

  // Combine courses from academyTranslations and stored courses to guarantee live editing takes effect
  const stored = (api.getStoredCourses ? api.getStoredCourses() : []) || [];
  const storedMap = new Map();
  if (Array.isArray(stored)) {
    stored.forEach(sc => storedMap.set(sc.id, sc));
  }

  // Merge overrides into translation catalog
  let courses = (at.courses || []).map(baseCourse => {
    if (storedMap.has(baseCourse.id)) {
      const override = storedMap.get(baseCourse.id);
      storedMap.delete(baseCourse.id);
      return { ...baseCourse, ...override };
    }
    return baseCourse;
  });

  // Append new courses created via Admin
  storedMap.forEach(newCourse => {
    courses.push(newCourse);
  });

  const t = {
    badge: lang === 'fr' ? 'Académie SHAT de Formation et Renforcement des Capacités' : (isRtl ? 'أكاديمية شركة شات للتدريب وبناء القدرات • SHAT Academy' : 'SHAT Academy for Capacity Development'),
    title: lang === 'fr' ? 'Diplômes Professionnels et Cursus Certifiés' : (isRtl ? 'المساقات والدبلومات المهنية والتطبيقية المعتمدة' : 'Accredited Professional Diplomas & Applied Tracks'),
    desc: lang === 'fr'
      ? 'Des programmes exécutifs spécialisés alignés sur les normes humanitaires et internationales pour relier le savoir à la performance réelle.'
      : (isRtl ? 'برامج تدريبية تخصصية وتطبيقية تعتمد على الجدارات وتحاكي المعايير الإنسانية والدولية (CHS, Sphere, PSEA, OECD DAC) لربط التعلم بالأداء الفعلي.' : 'Specialized competency-based training programs aligned with global standards (CHS, Sphere, PSEA, OECD DAC) to bridge knowledge with field performance.'),
    
    // Quick tool actions
    verifyBtn: lang === 'fr' ? '🔍 Vérifier un Certificat' : (isRtl ? '🔍 التحقق من شهادة رقمية' : '🔍 Verify Digital Certificate'),
    toolkitsBtn: lang === 'fr' ? '📂 Boîtes à Outils de Terrain' : (isRtl ? '📂 مكتبة الأدوات الميدانية' : '📂 Field Toolkits Hub'),
    diagBtn: lang === 'fr' ? '⚡ Test de Préparation' : (isRtl ? '⚡ تقييم الجاهزية المؤسسية' : '⚡ Readiness Diagnostic'),

    searchPlaceholder: lang === 'fr' ? 'Rechercher un cursus par mot-clé, code ou axe...' : (isRtl ? 'ابحث في البرامج والدبلومات المعتمدة بالاسم أو المحور...' : 'Search accredited diplomas by title, code or module...'),
    filterAll: lang === 'fr' ? 'Tous les Cursus' : (isRtl ? 'كافة المساقات الأكاديمية' : 'All Academic Tracks'),
    filterHumanitarian: lang === 'fr' ? 'Humanitaire (CHS)' : (isRtl ? 'العمل الإنساني (CHS & Sphere)' : 'Humanitarian (CHS & Sphere)'),
    filterProtection: lang === 'fr' ? 'Protection (PSEA)' : (isRtl ? 'الحماية وصون السلامة (PSEA)' : 'Protection (PSEA)'),
    filterEvaluation: lang === 'fr' ? 'Évaluation (OECD DAC)' : (isRtl ? 'التقييم المستقل (OECD DAC)' : 'Evaluation (OECD DAC)'),
    filterGovernance: lang === 'fr' ? 'Gouvernance & SOPs' : (isRtl ? 'الحوكمة والقيادة (SOPs)' : 'Governance & SOPs'),
    filterTot: lang === 'fr' ? 'Formation de Formateurs' : (isRtl ? 'إعداد المدربين (TOT)' : 'Training of Trainers (TOT)'),

    levelLabel: lang === 'fr' ? 'Niveau:' : (isRtl ? 'المستوى:' : 'Level:'),
    syllabusLabel: lang === 'fr' ? 'محاور المنهاج التدريبي:' : (isRtl ? 'محاور المنهاج المعتمد:' : 'Curriculum Modules:'),
    btnExploreFiles: lang === 'fr' ? '📖 استعراض المنهاج والملفات' : (isRtl ? '📖 استعراض المنهاج والملفات' : '📖 View Curriculum & Files'),
    btnRegisterCourse: lang === 'fr' ? 'التسجيل بالمساق' : (isRtl ? 'تسجيل فوري بالمساق' : 'Enroll Now'),
    btnApplyGeneral: lang === 'fr' ? 'Demande d’Inscription' : (isRtl ? 'تقديم طلب التحاق جديد' : 'Apply for Enrollment'),
    emptySearch: lang === 'fr' ? 'Aucun cursus ne correspond à votre recherche.' : (isRtl ? 'لا توجد مساقات مطابقة للبحث الحالي. جرب كلمة بحث أخرى.' : 'No courses match your current search criteria.')
  };

  return `
    <div class="view-academy">
      <!-- Page Header -->
      <section class="section" style="padding: 64px 0 40px 0; background: var(--bg-subtle); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px;">
            <div style="max-width: 780px;">
              <div class="section-badge">${t.badge}</div>
              <h1 class="section-title" style="margin-bottom: 14px; font-weight: 900; color: var(--shat-navy);">${t.title}</h1>
              <p class="section-desc" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">${t.desc}</p>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button type="button" class="btn-clean btn-primary btn-island btn-open-reg-modal" data-course="general">
                <span>${t.btnApplyGeneral}</span>
                <span>${arrow}</span>
              </button>
            </div>
          </div>

          <!-- Quick Tools Actions Bar -->
          <div style="margin-top: 32px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; background: #FFFFFF; padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-medium); box-shadow: var(--shadow-sm);">
            <span style="font-size: 0.84rem; font-weight: 800; color: var(--shat-navy);">
              ⚡ ${isRtl ? 'الأدوات الرقمية المعتمدة:' : 'Accredited Digital Tools:'}
            </span>
            <button type="button" class="btn-clean btn-sm" onclick="if(window.openCertificateValidator) window.openCertificateValidator();" style="background: #F8FAFC; color: var(--shat-navy); border: 1px solid var(--border-medium); font-weight: 700; border-radius: 9999px; padding: 6px 14px;">
              ${t.verifyBtn}
            </button>
            <button type="button" class="btn-clean btn-sm" onclick="if(window.openToolkitsLibrary) window.openToolkitsLibrary();" style="background: #F8FAFC; color: var(--shat-navy); border: 1px solid var(--border-medium); font-weight: 700; border-radius: 9999px; padding: 6px 14px;">
              ${t.toolkitsBtn}
            </button>
            <button type="button" class="btn-clean btn-sm" onclick="if(window.openDiagnosticAssessment) window.openDiagnosticAssessment();" style="background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green-border); font-weight: 800; border-radius: 9999px; padding: 6px 14px;">
              ${t.diagBtn}
            </button>
          </div>

          <!-- Live Search & Track Filter Bar -->
          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 16px;">
            <!-- Search Input -->
            <div style="position: relative;">
              <input 
                type="text" 
                id="academy-search-input" 
                placeholder="${t.searchPlaceholder}" 
                style="width: 100%; padding: 14px 20px; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main); font-family: var(--font-primary); box-shadow: 0 2px 8px rgba(0,0,0,0.04); outline: none;"
              />
              <span style="position: absolute; ${isRtl ? 'left' : 'right'}: 16px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: var(--text-muted); pointer-events: none;">
                🔍
              </span>
            </div>

            <!-- Track Tabs -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="academy-track-filter-bar">
              <button class="btn-clean academy-track-btn active" data-track="all" style="padding: 7px 16px; border-radius: 9999px; font-size: 0.84rem; font-weight: 700; border: 1px solid var(--shat-navy); background: var(--shat-navy); color: #FFFFFF;">
                ${t.filterAll}
              </button>
              <button class="btn-clean academy-track-btn" data-track="humanitarian" style="padding: 7px 16px; border-radius: 9999px; font-size: 0.84rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
                ${t.filterHumanitarian}
              </button>
              <button class="btn-clean academy-track-btn" data-track="protection" style="padding: 7px 16px; border-radius: 9999px; font-size: 0.84rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
                ${t.filterProtection}
              </button>
              <button class="btn-clean academy-track-btn" data-track="evaluation" style="padding: 7px 16px; border-radius: 9999px; font-size: 0.84rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
                ${t.filterEvaluation}
              </button>
              <button class="btn-clean academy-track-btn" data-track="governance" style="padding: 7px 16px; border-radius: 9999px; font-size: 0.84rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
                ${t.filterGovernance}
              </button>
              <button class="btn-clean academy-track-btn" data-track="tot" style="padding: 7px 16px; border-radius: 9999px; font-size: 0.84rem; font-weight: 700; border: 1px solid var(--border-medium); background: #FFFFFF; color: var(--text-main);">
                ${t.filterTot}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Courses Bento Grid -->
      <section class="section">
        <div class="container">
          <div class="bento-grid grid-2" id="academy-courses-container">
            ${courses.map(c => `
              <div class="double-bezel course-item-card" data-track="${c.track || c.category || 'humanitarian'}" data-title="${(c.title || '').toLowerCase()}" data-desc="${(c.summary || c.desc || '').toLowerCase()}" style="border-top: 4px solid var(--shat-navy); display: flex; flex-direction: column;">
                <div class="double-bezel-inner" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div class="bento-header" style="margin-bottom: 12px;">
                      <span class="badge" style="font-size: 0.82rem; font-weight: 800; color: var(--shat-green); font-family: var(--font-mono); background: var(--shat-green-tint); border: 1px solid var(--shat-green-border);">
                        ${c.code || 'SHAT'}
                      </span>
                      <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                        ${c.trackName || c.categoryName || c.track || 'دبلوم مهني'} • ${c.duration || c.hours || '35 ساعة'}
                      </span>
                    </div>

                    <h3 class="bento-title" style="font-size: 1.3rem; font-weight: 900; line-height: 1.4; margin-bottom: 6px; color: var(--shat-navy);">${c.title}</h3>
                    
                    <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; font-size: 0.82rem; align-items: center;">
                      <span style="color: var(--shat-navy); font-weight: 700;">${t.levelLabel} ${c.level || 'تنفيذي'}</span>
                      <span style="color: var(--text-muted);">•</span>
                      <span style="color: var(--text-secondary); font-weight: 600;">👨‍🏫 ${c.instructorName || c.instructor || 'د. أسامة المنصور'}</span>
                      ${c.fee ? `
                        <span style="color: var(--text-muted);">•</span>
                        <span class="pro-symbol-badge" style="background: var(--shat-green-tint); color: var(--shat-green); border-color: var(--shat-green-border); font-weight: 800;">
                          💰 ${c.fee}
                        </span>
                      ` : ''}
                    </div>

                    <p class="bento-text" style="margin-bottom: 16px; font-size: 0.92rem; line-height: 1.7; color: var(--text-secondary);">
                      ${c.desc || c.summary || ''}
                    </p>

                    <!-- Syllabus Modules -->
                    <div style="background: var(--bg-subtle); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 16px; border: 1px solid var(--border-light);">
                      <div style="font-size: 0.82rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
                        ${t.syllabusLabel}
                      </div>
                      <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0;">
                        ${(Array.isArray(c.syllabus) ? c.syllabus : []).map(s => `
                          <li style="font-size: 0.86rem; color: var(--text-main); display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;">
                            <span style="color: var(--shat-green); font-weight: bold; flex-shrink: 0;">✓</span>
                            <span>${s}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>

                  <!-- Actions: Google Form, Platform Form, Drive Folder, and Syllabus -->
                  <div style="display: flex; gap: 8px; justify-content: flex-start; align-items: center; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid var(--border-light);">
                    ${c.googleFormUrl ? `
                      <a href="${c.googleFormUrl}" target="_blank" rel="noopener" class="btn-clean btn-sm btn-google-form" style="padding: 7px 12px; font-size: 0.82rem;" title="التسجيل المباشر عبر Google Form">
                        <span>📋 Google Form</span>
                      </a>
                    ` : ''}

                    <button type="button" class="btn-clean btn-green btn-sm btn-island btn-open-reg-modal" data-course="${c.id}" style="padding: 7px 14px; font-size: 0.82rem;">
                      <span>✍️ ${t.btnRegisterCourse}</span>
                      <span>${arrow}</span>
                    </button>

                    ${c.driveFolderUrl ? `
                      <a href="${c.driveFolderUrl}" target="_blank" rel="noopener" class="btn-clean btn-sm btn-drive-folder" style="padding: 7px 12px; font-size: 0.82rem;" title="ملفات وحقيبة المساق على Google Drive">
                        <span>📁 Drive</span>
                      </a>
                    ` : ''}

                    <a href="#/course/${c.id}" class="btn-clean btn-sm" style="background: #FFFFFF; color: var(--shat-navy); border: 1px solid var(--border-medium); font-weight: 700; padding: 7px 12px; font-size: 0.82rem; margin-inline-start: auto;">
                      <span>${t.btnExploreFiles}</span>
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div id="academy-empty-state" style="display: none; padding: 60px; text-align: center; color: var(--text-muted); background: var(--bg-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
            <div style="font-size: 2.2rem; margin-bottom: 12px;">🔍</div>
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--shat-navy); margin-bottom: 6px;">${t.emptySearch}</div>
          </div>
        </div>
      </section>

      <!-- 2. Interactive Training Calendar & Upcoming Cohorts Schedule -->
      ${renderTrainingCalendarSection(lang)}

      <!-- 3. Interactive FAQ Section with Live Search -->
      ${renderFaqSection(lang)}
    </div>
  `;
}

export function bindAcademyEvents() {
  const searchInput = document.getElementById('academy-search-input');
  const trackBtns = document.querySelectorAll('.academy-track-btn');
  const courseCards = document.querySelectorAll('.course-item-card');
  const emptyState = document.getElementById('academy-empty-state');

  let activeTrack = 'all';
  let searchQuery = '';

  function filterCards() {
    let visibleCount = 0;
    courseCards.forEach(card => {
      const track = card.getAttribute('data-track') || '';
      const title = card.getAttribute('data-title') || '';
      const desc = card.getAttribute('data-desc') || '';

      const matchesTrack = (activeTrack === 'all' || track.includes(activeTrack));
      const matchesSearch = (!searchQuery || title.includes(searchQuery) || desc.includes(searchQuery));

      if (matchesTrack && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }

  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      trackBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.color = 'var(--text-main)';
        b.style.borderColor = 'var(--border-medium)';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--shat-navy)';
      btn.style.color = '#FFFFFF';
      btn.style.borderColor = 'var(--shat-navy)';

      activeTrack = btn.getAttribute('data-track') || 'all';
      filterCards();
    });
  });

  // Modal Registration Triggers
  document.querySelectorAll('.btn-open-reg-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.getAttribute('data-course') || 'general';
      if (window.openGlobalModal) {
        window.openGlobalModal(courseId);
      }
    });
  });

  // Syllabus Modal Triggers
  document.querySelectorAll('.btn-open-course-syllabus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.getAttribute('data-course') || 'shat-chs-master';
      if (window.openSyllabusModal) {
        window.openSyllabusModal(courseId);
      }
    });
  });

  // Bind Calendar and FAQ Sub-components
  bindTrainingCalendarEvents();
  bindFaqEvents();
}

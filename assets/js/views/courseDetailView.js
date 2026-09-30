// assets/js/views/courseDetailView.js
// Production Course Room & Interactive Syllabus for SHAT Academy with 100% Trilingual Support (AR, EN, FR)
import { api } from '../services/api/apiClient.js';
import { content } from '../content.js';

export function renderCourseDetailView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    academyLabel: txt('أكاديمية شركة شات (SHAT)', 'SHAT Academy', 'Académie SHAT'),
    courseTrackLabel: txt('المساق التدريبي المعتمد', 'Accredited Course Track', 'Cursus Professionnel Certifié'),
    btnBackDashboard: txt('← العودة للوحة التعلم', '← Back to Learning Dashboard', '← Retour au Tableau de Bord'),
    btnAllCourses: txt('دليل كافة المساقات', 'All Courses Catalog', 'Catalogue des Cursus'),
    loading: txt('جاري تحميل تفاصيل المساق والمنهاج المعتمد...', 'Loading course curriculum from server...', 'Chargement du cursus en cours...'),
    modalTitle: txt('تسليم التكليف الدراسي المعتمد', 'Submit Course Assignment', 'Soumettre le Devoir Certifié')
  };

  return `
    <div class="course-detail-wrapper" style="padding-top: 100px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container">
        
        <!-- Breadcrumb & Back Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-muted);">
            <a href="#/academy" style="color: var(--shat-navy); text-decoration: none; font-weight: 700;">${t.academyLabel}</a>
            <span>/</span>
            <span id="breadcrumb-course-title">${t.courseTrackLabel}</span>
          </div>

          <div style="display: flex; gap: 10px;">
            <a href="#/student" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy);">
              <span>${t.btnBackDashboard}</span>
            </a>
            <a href="#/academy" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--text-muted);">
              <span>${t.btnAllCourses}</span>
            </a>
          </div>
        </div>

        <div id="course-detail-container">
          <div style="padding: 60px; text-align: center; color: var(--text-muted);">
            ${t.loading}
          </div>
        </div>

      </div>
    </div>

    <!-- Assignment Submission Modal -->
    <div id="modal-submit-assignment-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 580px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-sub-title">${t.modalTitle}</div>
          <button id="modal-sub-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" id="modal-sub-body">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  `;
}

export async function bindCourseDetailEvents() {
  const container = document.getElementById('course-detail-container');
  const breadcrumbTitle = document.getElementById('breadcrumb-course-title');
  if (!container) return;

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const isRtl = currentLang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  // Extract courseId from hash: e.g. #/course/shat-chs-master or query
  const rawHash = window.location.hash.replace('#/', '').replace('#', '');
  const parts = rawHash.split('/');
  const courseId = parts[1] || 'shat-chs-master';

  try {
    const res = await api.getCourseById(courseId);
    const c = (res && res.course) ? res.course : res;
    if (!c || !c.title) {
      container.innerHTML = `
        <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">⚠️</div>
          <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
            ${txt('المساق التدريبي غير متاح', 'Course Track Not Found', 'Cursus Non Disponible')}
          </h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">
            ${txt('لم يتم العثور على المساق المطلوب أو قد يكون قيد المراجعة الأكاديمية.', 'The requested course is currently unavailable or under academic review.', 'Le cursus demandé est introuvable ou en cours de révision pédagogique.')}
          </p>
          <a href="#/academy" class="btn-clean btn-primary">
            ${txt('العودة لدليل الأكاديمية', 'Return to Academy Catalog', 'Retour au Catalogue de l’Académie')}
          </a>
        </div>
      `;
      return;
    }
    const courseTitle = currentLang === 'en' ? (c.titleEn || c.title) : c.title;
    if (breadcrumbTitle) breadcrumbTitle.textContent = courseTitle;

    // Check if current user is logged in
    const currentUser = api.currentUser;

    container.innerHTML = `
      <!-- Hero Course Header -->
      <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, #0B192C 100%); border-radius: var(--radius-md); padding: 36px; color: #FFFFFF; margin-bottom: 32px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 24px;">
          <div style="max-width: 780px;">
            <div style="display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3); font-family: var(--font-mono);">${c.code}</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.12); color: #F8FAFC;">${c.track}</span>
              <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #FBBF24;">${c.level}</span>
            </div>
            <h1 style="font-size: 1.85rem; font-weight: 900; line-height: 1.4; margin-bottom: 14px; color: #FFFFFF;">${courseTitle}</h1>
            <p style="color: #CBD5E1; font-size: 0.96rem; line-height: 1.7; margin-bottom: 20px;">
              ${c.overview}
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; font-size: 0.88rem; color: #94A3B8;">
              <div>👨‍🏫 ${txt('المدرب المعتمد:', 'Master Trainer:', 'Formateur Expert :')} <strong style="color: #FFFFFF;">${c.instructorName}</strong></div>
              <div>⏱️ ${txt('الساعات المعتمدة:', 'Accredited Hours:', 'Heures Certifiées :')} <strong style="color: #FFFFFF;">${c.hours}</strong></div>
              <div>📅 ${txt('المواعيد:', 'Schedule:', 'Horaires :')} <strong style="color: #FFFFFF;">${c.schedule}</strong></div>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.06); padding: 24px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.1); min-width: 260px; text-align: center;">
            <div style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 8px;">
              ${txt('حالة التسجيل الأكاديمي', 'Enrollment Status', 'Statut d’Inscription')}
            </div>
            ${currentUser ? `
              <div style="font-weight: 800; color: #4ADE80; font-size: 1.1rem; margin-bottom: 16px;">
                ${txt('متاح للتسجيل والتعلم', 'Active & Enrolled', 'Accessible & Validé')}
              </div>
              <a href="#/student" class="btn-clean btn-green" style="width: 100%; justify-content: center; margin-bottom: 8px;">
                <span>${txt('الانتقال للمقرر في لوحتي', 'Open in My Dashboard', 'Ouvrir dans Mon Espace')}</span>
              </a>
            ` : `
              <div style="font-weight: 800; color: #FBBF24; font-size: 1.1rem; margin-bottom: 16px;">
                ${txt('متاح للالتحاق العام', 'Open for Registration', 'Inscriptions Ouvertes')}
              </div>
              <button class="btn-clean btn-primary btn-open-reg-modal" data-course="${c.id}" style="width: 100%; justify-content: center; margin-bottom: 8px;">
                <span>${txt('تقديم طلب التحاق بالمساق', 'Apply for Enrollment', 'Demande d’Inscription')}</span>
                <span>${arrow}</span>
              </button>
              <div style="font-size: 0.78rem; color: #94A3B8;">
                ${txt('يتم التدقيق والاعتماد الإداري خلال 24 ساعة', 'Reviewed within 24 hours by Admissions', 'Dossier traité sous 24h par l’équipe')}
              </div>
            `}
          </div>
        </div>
      </div>

      <!-- Main Course Grid: Content & Chapters -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px; align-items: start;">
        
        <!-- Left: Course Chapters & Lessons -->
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <h2 style="font-size: 1.3rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
              ${txt('المنهاج التفصيلي والوحدات التدريبية', 'Detailed Curriculum & Modules', 'Programme Didactique et Modules')} (${(c.chapters || []).length} ${txt('فصول', 'Chapters', 'Chapitres')})
            </h2>
            <span style="font-size: 0.85rem; color: var(--text-muted);">
              ${txt('تحميل الوثائق مباشرة من داخل المنصة', 'Download verified materials directly', 'Téléchargement direct des ressources')}
            </span>
          </div>

          <div class="chapters-container" style="display: flex; flex-direction: column; gap: 20px;">
            ${(c.chapters || []).map((ch, chIdx) => `
              <div class="chapter-card" style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="background: var(--bg-subtle); padding: 18px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: var(--shat-navy); color: #FFFFFF; font-weight: 800; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;">
                      ${chIdx + 1}
                    </span>
                    <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">${ch.title}</h3>
                  </div>
                  <span style="font-size: 0.82rem; color: var(--text-muted);">${(ch.lessons || []).length} ${txt('درس تفصيلي', 'detailed lessons', 'leçons')}</span>
                </div>

                <div style="padding: 20px 24px;">
                  <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 16px; line-height: 1.6;">${ch.description}</p>
                  
                  <!-- Lessons List -->
                  <div style="display: flex; flex-direction: column; gap: 14px;">
                    ${(ch.lessons || []).map(les => `
                      <div style="background: #F8FAFC; border-radius: var(--radius-xs); padding: 16px; border: 1px solid #E2E8F0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                          <div style="font-weight: 700; color: var(--shat-navy); font-size: 0.95rem;">📖 ${les.title}</div>
                          <span style="font-size: 0.8rem; color: var(--text-muted);">${les.duration}</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.6;">${les.contentSummary}</p>

                        <!-- Attached Files / Materials -->
                        ${(les.materials || []).length > 0 ? `
                          <div style="border-top: 1px dashed #CBD5E1; padding-top: 12px; margin-top: 8px;">
                            <div style="font-size: 0.8rem; font-weight: 700; color: var(--shat-green); margin-bottom: 8px;">
                              ${txt('المراجع والملفات المعتمدة:', 'Course Materials & References:', 'Documents & Ressources Pédagogiques :')}
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                              ${(les.materials || []).map(m => `
                                <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                                  <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #EFF6FF; color: #1D4ED8; font-size: 0.75rem; font-weight: 800; padding: 3px 6px; border-radius: 4px;">${m.type}</span>
                                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--shat-navy);">${m.name}</span>
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">${m.size}</span>
                                  </div>
                                  
                                  ${currentUser ? `
                                    <a href="/api/files/download/${m.id}" class="btn-clean btn-sm" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
                                      <span>📥 ${txt('تنزيل مباشر', 'Direct Download', 'Télécharger')}</span>
                                    </a>
                                  ` : `
                                    <button class="btn-clean btn-sm btn-open-reg-modal" data-course="${c.id}" style="background: #F1F5F9; color: var(--text-muted); border: 1px solid var(--border-light); font-size: 0.78rem;">
                                      <span>🔒 ${txt('يتطلب تسجيلاً', 'Enroll to Download', 'Inscription Requise')}</span>
                                    </button>
                                  `}
                                </div>
                              `).join('')}
                            </div>
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Course Highlights & Academic Standards -->
        <div>
          <!-- Course Details Widget -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 16px; border-bottom: 2px solid var(--shat-green); padding-bottom: 8px;">
              ${txt('معايير وضوابط المساق', 'Course Quality Assurances', 'Critères de Qualité du Cursus')}
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.88rem; color: var(--text-main); display: flex; flex-direction: column; gap: 12px;">
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                ${txt('شهادة إتمام معتمدة رسمياً وموثقة برقم ترخيص مهني', 'Accredited completion certificate with digital verification ID', 'Certificat d’achèvement officiel avec identifiant vérifié')}
              </li>
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                ${txt('دراسات حالة حية مأخوذة من قطاع العمل الإنساني والتنموي', 'Real-world humanitarian & development field case studies', 'Études de cas réelles issues du secteur humanitaire')}
              </li>
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                ${txt('تغذية راجعة فردية مباشرة من خبير التدريب المعتمد', 'Individualized feedback from accredited Master Trainer', 'Rétroaction personnalisée du formateur expert')}
              </li>
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                ${txt('حفظ وتسليم كافة التكليفات في المستودع الأكاديمي المباشر', 'In-platform direct task submission & repository storage', 'Dépôt et archivage des devoirs sur la plateforme')}
              </li>
            </ul>
          </div>

          <!-- Academic Policies Widget -->
          <div style="background: #F8FAFC; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px;">
            <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
              ${txt('سياسة الحضور والإنجاز', 'Attendance & Graduation Policy', 'Assiduité et Validation')}
            </h4>
            <p style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.7; margin: 0;">
              ${txt(
                'يشترط للحصول على الشهادة المعتمدة حضور ما لا يقل عن 80% من الجلسات التفاعلية المباشرة، وتسليم كافة التكليفات المطلوبة والحصول على تقييم لا يقل عن 70% في المشروع النهائي.',
                'Qualifying for the accredited credential requires a minimum of 80% live attendance, completion of all field assignments, and scoring at least 70% on the capstone evaluation.',
                'L’obtention du certificat exige au minimum 80 % de présence aux ateliers en direct, la remise de tous les devoirs et un résultat minimal de 70 % au projet final.'
              )}
            </p>
          </div>
        </div>

      </div>
    `;

    // Modal register listeners if visitor clicks enrollment
    document.querySelectorAll('.btn-open-reg-modal').forEach(btn => {
      btn.onclick = () => {
        const cId = btn.getAttribute('data-course') || courseId;
        if (window.openGlobalModal) window.openGlobalModal(cId);
      };
    });

  } catch (err) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
        <div style="font-size: 2.5rem; margin-bottom: 16px; color: var(--accent-red);">❌</div>
        <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">
          ${txt('خطأ في الاتصال بالخادم', 'Server Connection Notice', 'Avis de Connexion Serveur')}
        </h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${err.message}</p>
        <a href="#/academy" class="btn-clean btn-primary">
          ${txt('العودة لدليل الأكاديمية', 'Return to Academy Catalog', 'Retour au Catalogue de l’Académie')}
        </a>
      </div>
    `;
  }
}

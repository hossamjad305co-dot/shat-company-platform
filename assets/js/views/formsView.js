// assets/js/views/formsView.js
// Production Native Internal SHAT Form View (Cloned & Deep-Synced with Google Forms)
// Provides complete custom UI, direct no-cors submission into Google Forms (Sheets) + SHAT Platform DB,
// and Admin Submissions Management Viewer with CSV export.

import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';
import { icons } from '../icons.js';

export function renderFormsView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const arrow = isRtl ? '←' : '→';

  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    home: txt('الرئيسية', 'Home', 'Accueil'),
    breadcrumb: txt('استمارات ونماذج شركة شات المعتمدة (SHAT Forms)', 'SHAT Official Forms & Registration Portal', 'Formulaires Officiels SHAT'),
    btnBack: txt(`${arrow} العودة للأكاديمية`, `${arrow} Back to Academy`, `${arrow} Retour à l’Académie`),
    btnAllForms: txt('جميع الاستمارات والبرامج', 'All Programs & Forms', 'Tous les Programmes'),
    loading: txt('جاري تهيئة منظومة الاستمارات المعتمدة...', 'Loading official forms portal...', 'Chargement du portail en cours...')
  };

  return `
    <div class="forms-wrapper" style="padding-top: 105px; padding-bottom: 90px; min-height: 90vh; background: var(--bg-body, #F8FAFC);">
      <div class="container" style="max-width: 1140px; margin: 0 auto; padding: 0 16px;">
        
        <!-- Breadcrumb & Top Navigation -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: var(--text-muted, #64748B);">
            <a href="#/home" style="color: var(--shat-navy, #0B1E36); text-decoration: none; font-weight: 700;">${t.home}</a>
            <span>/</span>
            <span style="font-weight: 600; color: var(--shat-green, #1E7E34);">${t.breadcrumb}</span>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            <a href="#/forms" id="btn-show-all-forms-top" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light, #E2E8F0); color: var(--shat-navy, #0B1E36); font-size: 0.85rem; padding: 7px 16px;">
              <span>${t.btnAllForms}</span>
            </a>
            <a href="#/academy" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light, #E2E8F0); color: var(--shat-navy, #0B1E36); font-size: 0.85rem; padding: 7px 16px;">
              <span>${t.btnBack}</span>
            </a>
          </div>
        </div>

        <!-- Dynamic Render Target -->
        <div id="forms-render-target">
          <div style="padding: 70px 20px; text-align: center; color: var(--text-muted, #64748B);">
            <div class="spinner-shat" style="margin: 0 auto 16px; width: 36px; height: 36px; border: 3px solid #E2E8F0; border-top-color: var(--shat-green, #1E7E34); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <p style="font-size: 0.95rem; font-weight: 600;">${t.loading}</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal for Viewing Submission Details -->
    <div id="form-submission-modal" style="display: none; position: fixed; inset: 0; background: rgba(11,30,54,0.7); z-index: 1050; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px);">
      <div style="background: #FFFFFF; border-radius: var(--radius-lg, 16px); max-width: 650px; width: 100%; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.25); border: 1px solid var(--border-light, #E2E8F0);">
        <div style="padding: 20px 24px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;">
          <h3 id="submission-modal-title" style="margin: 0; font-size: 1.1rem; font-weight: 800; color: var(--shat-navy, #0B1E36);">تفاصيل طلب التسجيل</h3>
          <button type="button" id="btn-close-sub-modal" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #64748B;">✕</button>
        </div>
        <div id="submission-modal-body" style="padding: 24px;"></div>
      </div>
    </div>
  `;
}

export async function bindFormsEvents() {
  const container = document.getElementById('forms-render-target');
  if (!container) return;

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  // Determine Form ID or Mode from URL
  const rawHash = window.location.hash.replace('#/', '').replace('#', '').trim();
  const searchParams = new URLSearchParams(rawHash.includes('?') ? rawHash.split('?')[1] : '');
  const pathPart = rawHash.split('?')[0];
  const hashSegments = pathPart.split('/');

  let targetFormId = searchParams.get('id');
  if (!targetFormId && hashSegments.length > 1 && hashSegments[1]) {
    targetFormId = hashSegments[1];
  }

  try {
    const allForms = await api.getForms();
    const formsList = Array.isArray(allForms) ? allForms : (allForms.forms || []);

    // If a specific form is requested, render that form view
    if (targetFormId && targetFormId !== 'all') {
      const selectedForm = formsList.find(f => f.id === targetFormId || f.code === targetFormId);
      if (selectedForm) {
        renderSingleForm(container, selectedForm, currentLang, formsList);
        return;
      }
    }

    // Default: Render the Comprehensive Forms Portal (Catalog + Submissions Tab)
    renderFormsPortal(container, formsList, currentLang);

  } catch (err) {
    console.error('Forms binding error:', err);
    container.innerHTML = `
      <div style="background: #FFFFFF; border-radius: var(--radius-md, 12px); padding: 48px; text-align: center; border: 1px solid var(--border-light, #E2E8F0);">
        <div style="font-size: 2.5rem; margin-bottom: 16px; color: var(--accent-red, #DC2626); font-weight: 900;">▲</div>
        <h2 style="font-weight: 800; color: var(--shat-navy, #0B1E36); margin-bottom: 8px;">
          ${txt('تعذر تحميل الاستمارات', 'Failed to load forms', 'Impossible de charger les formulaires')}
        </h2>
        <p style="color: var(--text-muted, #64748B); margin-bottom: 24px;">${err.message}</p>
        <a href="#/home" class="btn-clean btn-primary">${txt('العودة للرئيسية', 'Return to Home', 'Retour à l’Accueil')}</a>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// View 1: Comprehensive Forms Portal Catalog & Submissions Hub
// -------------------------------------------------------------
function renderFormsPortal(container, formsList, lang) {
  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  container.innerHTML = `
    <!-- Portal Header Banner -->
    <div style="background: linear-gradient(135deg, var(--shat-navy, #0B1E36) 0%, #0F2A4A 100%); border-radius: var(--radius-lg, 16px); padding: 36px 32px; color: #FFFFFF; margin-bottom: 30px; border-bottom: 4px solid var(--shat-green, #1E7E34); box-shadow: var(--shadow-sm);">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(30,126,52,0.25); border: 1px solid rgba(74,222,128,0.4); padding: 4px 14px; border-radius: 999px; margin-bottom: 12px;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #4ADE80;">${txt('نظام الاستمارات المتزامن رسمياً', 'Officially Synced Forms Engine', 'Moteur de Formulaires Synchronisé')}</span>
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 900; color: #FFFFFF; margin: 0 0 8px;">
            ${txt('استمارات التسجيل والالتحاق بالبرامج المعتمدة 2026', 'Official Program Registration & Admission Forms 2026', 'Formulaires d’Inscription et d’Admission 2026')}
          </h1>
          <p style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.6; margin: 0; max-width: 720px;">
            ${txt(
              'اختر البرنامج التدريبي أو المسار الاستشاري للتقديم المباشر من خلال الاستمارة الرسمية لشركة شات. كافة البيانات تسجل لحظياً في المنصة وتتزامن مباشرة مع نماذج Google Forms وجداول المتابعة الميدانية.',
              'Choose your training program or consulting track to apply directly through SHAT official forms. Data is saved in the platform and simultaneously recorded into Google Forms & Sheets.',
              'Choisissez votre programme pour postuler directement. Vos données sont enregistrées sur la plateforme et synchronisées en direct avec Google Forms.'
            )}
          </p>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="button" id="tab-btn-catalog" class="btn-clean" style="background: var(--shat-green, #1E7E34); color: #FFFFFF; font-weight: 700; padding: 10px 20px; border-radius: 8px;">
            ${txt('نماذج التسجيل المتاحة', 'Available Forms', 'Formulaires Disponibles')}
          </button>
          <button type="button" id="tab-btn-submissions" class="btn-clean" style="background: rgba(255,255,255,0.15); color: #FFFFFF; font-weight: 700; padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
            ▲ ${txt('سجل طلبات التسجيل (الإدارة)', 'Submissions Log', 'Registre des Inscriptions')}
          </button>
        </div>
      </div>
    </div>

    <!-- Section 1: Forms Catalog Cards -->
    <div id="forms-catalog-section">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-bottom: 40px;">
        ${formsList.map(form => {
          return `
            <div class="card card-hover" style="background: #FFFFFF; border-radius: var(--radius-md, 12px); border: 1px solid var(--border-light, #E2E8F0); overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s ease;">
              
              <!-- Card Header -->
              <div style="padding: 24px 24px 16px; border-bottom: 1px solid #F1F5F9;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                  <span class="badge" style="background: #E8F5E9; color: #1E7E34; font-weight: 700; font-size: 0.78rem; padding: 4px 10px; border-radius: 6px;">
                    ${form.code || 'SHAT-FORM'}
                  </span>
                  <span style="font-size: 0.78rem; color: #64748B; background: #F1F5F9; padding: 3px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <span style="color: #10B981; font-weight: bold;">•</span> ${txt('التسجيل متاح', 'Registration Open', 'Ouvert')}
                  </span>
                </div>

                <h3 style="font-size: 1.12rem; font-weight: 800; color: var(--shat-navy, #0B1E36); margin: 0 0 10px; line-height: 1.5; min-height: 52px;">
                  ${form.title}
                </h3>

                <p style="font-size: 0.86rem; color: var(--text-muted, #64748B); line-height: 1.6; margin: 0 0 16px; min-height: 42px;">
                  ${form.description || (form.fields ? `${form.fields.length} حقول بيانات معتمدة ومطابقة لنموذج Google Form الرسمي` : 'استمارة التحاق معتمدة')}
                </p>

                <!-- Program Highlights Pills -->
                <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.84rem; color: #334155; background: #F8FAFC; padding: 12px 14px; border-radius: 8px;">
                  ${form.trainer ? `<div style="display: flex; align-items: center; gap: 8px;"> <span><strong>المدرب / الخبير:</strong> ${form.trainer}</span></div>` : ''}
                  ${form.hours ? `<div style="display: flex; align-items: center; gap: 8px;"> <span><strong>المدة:</strong> ${form.hours}</span></div>` : ''}
                  ${form.fee ? `<div style="display: flex; align-items: center; gap: 8px;"> <span><strong>الرسوم:</strong> <span style="color: #1E7E34; font-weight: 700;">${form.fee}</span></span></div>` : ''}
                </div>
              </div>

              <!-- Card Action Footer -->
              <div style="padding: 16px 24px; background: #FFFFFF; display: flex; flex-direction: column; gap: 10px;">
                <a href="#/forms?id=${form.id}" class="btn-clean btn-green" style="width: 100%; text-align: center; justify-content: center; font-weight: 800; padding: 11px 16px; border-radius: 8px;">
                  <span>✓ ${txt('تعبئة الاستمارة بالموقع', 'Fill Native Form', 'Remplir le Formulaire')}</span>
                  <span>←</span>
                </a>

                ${form.googleFormSourceUrl ? `
                  <a href="${form.googleFormSourceUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; text-align: center; color: var(--text-muted, #64748B); text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 4px 0;">
                    <span>رابط Google Form المباشر</span>
                    <span>↗</span>
                  </a>
                ` : ''}
              </div>

            </div>
          `;
        }).join('')}
      </div>

      <!-- Trust Assurance Box -->
      <div style="background: #FFFFFF; border-radius: 12px; border: 1px solid var(--border-light, #E2E8F0); padding: 24px 28px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #DCFCE7; color: #166534; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${icons.shield('', 24)}
        </div>
        <div style="flex: 1; min-width: 250px;">
          <h4 style="margin: 0 0 4px; font-weight: 800; color: var(--shat-navy, #0B1E36); font-size: 1rem;">
            ${txt('ضمان التوثيق المزدوج لجميع الاستمارات', 'Dual-Sync Registration Guarantee', 'Garantie de Double Synchronisation')}
          </h4>
          <p style="margin: 0; color: var(--text-muted, #64748B); font-size: 0.88rem; line-height: 1.6;">
            ${txt(
              'كل طلب تسجيل يتم عبر الموقع يوثق تلقائياً في سجلات شركة شات، ويتم ترحيله فوراً إلى Google Sheets التابع للجوجل فورم لضمان عدم ضياع أي طلب وتسهيل التواصل الفوري مع المتقدمين.',
              'Every application submitted on this website is instantly documented in SHAT platform database and dispatched directly to the official Google Form sheet.',
              'Chaque candidature sur le site est enregistrée sur la plateforme SHAT et envoyée simultanément à la feuille Google Forms officielle.'
            )}
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2: Submissions Log (Admin / Audit View) -->
    <div id="forms-submissions-section" style="display: none;">
      <div style="background: #FFFFFF; border-radius: 12px; border: 1px solid var(--border-light, #E2E8F0); padding: 24px; box-shadow: var(--shadow-sm);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="margin: 0 0 6px; font-weight: 900; color: var(--shat-navy, #0B1E36); font-size: 1.25rem;">
              ${txt('سجل طلبات التسجيل الميدانية الموثقة', 'Recorded Applications Log', 'Registre des Candidatures')}
            </h2>
            <p style="margin: 0; color: var(--text-muted, #64748B); font-size: 0.86rem;">
              ${txt('استعراض كافة الاستجابات الواردة عبر استمارات الموقع والمزامنة مع Google Forms', 'All responses registered via website forms and synced with Google Forms', 'Toutes les réponses enregistrées')}
            </p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <input type="text" id="sub-search-input" placeholder="${txt('بحث بالاسم أو الهاتف...', 'Search name or phone...', 'Rechercher...')}" class="form-input" style="height: 38px; width: 220px; font-size: 0.85rem;">
            <button type="button" id="btn-export-submissions-csv" class="btn-clean" style="background: #107C41; color: #FFFFFF; font-weight: 700; font-size: 0.85rem; padding: 8px 16px; border-radius: 6px;">
              ↓ ${txt('تصدير Excel / CSV', 'Export CSV', 'Exporter CSV')}
            </button>
          </div>
        </div>

        <!-- Filter Pills -->
        <div style="display: flex; gap: 8px; margin-bottom: 18px; overflow-x: auto; padding-bottom: 4px;" id="sub-filter-pills">
          <button type="button" class="btn-clean sub-filter-pill active" data-filter="all" style="background: var(--shat-navy, #0B1E36); color: #FFFFFF; font-size: 0.82rem; padding: 5px 14px; border-radius: 20px;">الكل</button>
          ${formsList.map(f => `
            <button type="button" class="btn-clean sub-filter-pill" data-filter="${f.id}" style="background: #F1F5F9; color: #475569; font-size: 0.82rem; padding: 5px 14px; border-radius: 20px; white-space: nowrap;">
              ${f.code || f.title.substring(0, 20)}
            </button>
          `).join('')}
        </div>

        <!-- Table Container -->
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.88rem;" id="submissions-table">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 2px solid #E2E8F0; color: var(--shat-navy, #0B1E36);">
                <th style="padding: 12px 14px; font-weight: 800;">#</th>
                <th style="padding: 12px 14px; font-weight: 800;">البرنامج / الاستمارة</th>
                <th style="padding: 12px 14px; font-weight: 800;">اسم المتقدم</th>
                <th style="padding: 12px 14px; font-weight: 800;">رقم الهاتف</th>
                <th style="padding: 12px 14px; font-weight: 800;">البريد الإلكتروني</th>
                <th style="padding: 12px 14px; font-weight: 800;">تاريخ التقديم</th>
                <th style="padding: 12px 14px; font-weight: 800;">حالة المزامنة</th>
                <th style="padding: 12px 14px; font-weight: 800; text-align: center;">إجراء</th>
              </tr>
            </thead>
            <tbody id="submissions-tbody">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>

        <div id="submissions-empty" style="display: none; padding: 40px; text-align: center; color: #64748B;">
          <p style="font-size: 0.95rem; margin: 0;">لا توجد طلبات تسجيل مطابقة للبحث حالياً.</p>
        </div>

      </div>
    </div>
  `;

  // Bind Tab Switching
  const tabBtnCatalog = document.getElementById('tab-btn-catalog');
  const tabBtnSubmissions = document.getElementById('tab-btn-submissions');
  const sectionCatalog = document.getElementById('forms-catalog-section');
  const sectionSubmissions = document.getElementById('forms-submissions-section');

  const showCatalog = () => {
    tabBtnCatalog.style.background = 'var(--shat-green, #1E7E34)';
    tabBtnCatalog.style.color = '#FFFFFF';
    tabBtnSubmissions.style.background = 'rgba(255,255,255,0.15)';
    tabBtnSubmissions.style.color = '#FFFFFF';
    sectionCatalog.style.display = 'block';
    sectionSubmissions.style.display = 'none';
  };

  const showSubmissions = async () => {
    tabBtnSubmissions.style.background = 'var(--shat-green, #1E7E34)';
    tabBtnSubmissions.style.color = '#FFFFFF';
    tabBtnCatalog.style.background = 'rgba(255,255,255,0.15)';
    tabBtnCatalog.style.color = '#FFFFFF';
    sectionCatalog.style.display = 'none';
    sectionSubmissions.style.display = 'block';
    await loadAndRenderSubmissions(formsList, lang);
  };

  if (tabBtnCatalog) tabBtnCatalog.onclick = showCatalog;
  if (tabBtnSubmissions) tabBtnSubmissions.onclick = showSubmissions;

  // Search and Filter Listeners for Submissions
  const searchInput = document.getElementById('sub-search-input');
  if (searchInput) {
    searchInput.oninput = () => filterSubmissionsTable();
  }

  const filterPills = document.querySelectorAll('.sub-filter-pill');
  filterPills.forEach(pill => {
    pill.onclick = () => {
      filterPills.forEach(p => {
        p.style.background = '#F1F5F9';
        p.style.color = '#475569';
        p.classList.remove('active');
      });
      pill.style.background = 'var(--shat-navy, #0B1E36)';
      pill.style.color = '#FFFFFF';
      pill.classList.add('active');
      filterSubmissionsTable();
    };
  });

  // Export CSV
  const btnExport = document.getElementById('btn-export-submissions-csv');
  if (btnExport) {
    btnExport.onclick = () => exportSubmissionsToCSV();
  }
}

// -------------------------------------------------------------
// Submissions Table Engine & CSV Export
// -------------------------------------------------------------
let cachedSubmissions = [];

async function loadAndRenderSubmissions(formsList, lang) {
  const tbody = document.getElementById('submissions-tbody');
  const emptyEl = document.getElementById('submissions-empty');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="8" style="padding: 28px; text-align: center; color: #64748B;">جاري جلب سجلات التسجيل...</td></tr>`;

  try {
    cachedSubmissions = await api.getAllFormResponses();
    if (!Array.isArray(cachedSubmissions)) cachedSubmissions = [];
    renderSubmissionsRows(cachedSubmissions);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="8" style="padding: 24px; text-align: center; color: #DC2626;">تعذر جلب السجلات: ${err.message}</td></tr>`;
  }
}

function renderSubmissionsRows(list) {
  const tbody = document.getElementById('submissions-tbody');
  const emptyEl = document.getElementById('submissions-empty');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  tbody.innerHTML = list.map((item, idx) => {
    const answers = item.answers || {};
    // Extract common fields dynamically
    const name = answers.fullNameAr || answers.fullName || answers['entry.143181404'] || answers['entry.1699838868'] || answers['entry.1015180520'] || answers.contactPerson || answers.f_name || 'متقدم شات';
    const phone = answers.phone || answers['entry.1986432440'] || answers['entry.168810623'] || answers['entry.1641222345'] || answers.f_phone || '-';
    const email = answers.email || answers['entry.1469268289'] || answers['entry.1897449994'] || answers['entry.1300295760'] || answers.f_email || '-';
    const dateFormatted = item.submittedAt ? new Date(item.submittedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

    return `
      <tr style="border-bottom: 1px solid #F1F5F9; hover: background: #F8FAFC;" data-sub-id="${item.id}" data-form-id="${item.formId || ''}">
        <td style="padding: 12px 14px; font-weight: 700; color: #64748B;">${idx + 1}</td>
        <td style="padding: 12px 14px; font-weight: 700; color: var(--shat-navy, #0B1E36); max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.formTitle || item.formId}">
          ${item.formTitle || item.formId}
        </td>
        <td style="padding: 12px 14px; font-weight: 800; color: #1E293B;">${name}</td>
        <td style="padding: 12px 14px; font-family: monospace; color: #1E7E34; direction: ltr; text-align: right;">${phone}</td>
        <td style="padding: 12px 14px; color: #475569; font-size: 0.82rem;">${email}</td>
        <td style="padding: 12px 14px; color: #64748B; font-size: 0.8rem;">${dateFormatted}</td>
        <td style="padding: 12px 14px;">
          <span style="background: #E8F5E9; color: #1E7E34; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
            ✓ Google Sheets
          </span>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <button type="button" class="btn-clean btn-sm btn-view-sub" data-index="${idx}" style="background: #F1F5F9; color: var(--shat-navy, #0B1E36); font-size: 0.78rem; padding: 5px 10px; border-radius: 6px; font-weight: 700;">
            عرض
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Bind view buttons
  document.querySelectorAll('.btn-view-sub').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const sub = list[idx];
      if (sub) openSubmissionModal(sub);
    };
  });
}

function filterSubmissionsTable() {
  const query = (document.getElementById('sub-search-input')?.value || '').toLowerCase().trim();
  const activePill = document.querySelector('.sub-filter-pill.active');
  const filterFormId = activePill ? activePill.getAttribute('data-filter') : 'all';

  const filtered = cachedSubmissions.filter(item => {
    const matchesForm = (filterFormId === 'all') || (item.formId === filterFormId);
    if (!matchesForm) return false;

    if (!query) return true;

    const answers = item.answers || {};
    const valuesStr = Object.values(answers).join(' ').toLowerCase();
    const titleStr = (item.formTitle || '').toLowerCase();
    const idStr = (item.id || '').toLowerCase();

    return valuesStr.includes(query) || titleStr.includes(query) || idStr.includes(query);
  });

  renderSubmissionsRows(filtered);
}

function openSubmissionModal(sub) {
  const modal = document.getElementById('form-submission-modal');
  const titleEl = document.getElementById('submission-modal-title');
  const bodyEl = document.getElementById('submission-modal-body');
  const closeBtn = document.getElementById('btn-close-sub-modal');
  if (!modal || !bodyEl) return;

  if (titleEl) titleEl.textContent = `طلب رقم: ${sub.id} • ${sub.formTitle || sub.formId}`;

  const answers = sub.answers || {};
  const entriesHtml = Object.entries(answers).map(([key, val]) => {
    return `
      <div style="background: #F8FAFC; padding: 12px 16px; border-radius: 8px; border: 1px solid #E2E8F0; display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #64748B;">${key}:</span>
        <span style="font-size: 0.92rem; font-weight: 700; color: #0B1E36; word-break: break-word;">${val || '—'}</span>
      </div>
    `;
  }).join('');

  bodyEl.innerHTML = `
    <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-radius: 8px; font-size: 0.84rem; color: #166534; display: flex; justify-content: space-between; align-items: center;">
      <span><strong>تاريخ التقديم:</strong> ${new Date(sub.submittedAt).toLocaleString('ar-EG')}</span>
      <span style="font-weight: 700;">حالة التوثيق: متزامن مع Google Forms ✓</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${entriesHtml}
    </div>
  `;

  modal.style.display = 'flex';

  closeBtn.onclick = () => { modal.style.display = 'none'; };
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

function exportSubmissionsToCSV() {
  if (!cachedSubmissions || cachedSubmissions.length === 0) {
    showToast('لا توجد بيانات لتصديرها حالياً', 'warning');
    return;
  }

  const rows = [];
  rows.push(['رقم الطلب', 'البرنامج التدريبي', 'تاريخ التقديم', 'الاسم', 'رقم الهاتف', 'البريد الالكتروني', 'التفاصيل والمدخلات']);

  cachedSubmissions.forEach(sub => {
    const answers = sub.answers || {};
    const name = answers.fullNameAr || answers.fullName || answers['entry.143181404'] || answers['entry.1699838868'] || answers['entry.1015180520'] || answers.contactPerson || answers.f_name || '';
    const phone = answers.phone || answers['entry.1986432440'] || answers['entry.168810623'] || answers['entry.1641222345'] || answers.f_phone || '';
    const email = answers.email || answers['entry.1469268289'] || answers['entry.1897449994'] || answers['entry.1300295760'] || answers.f_email || '';
    const date = sub.submittedAt || '';
    const details = JSON.stringify(answers).replace(/"/g, '""');

    rows.push([
      `"${sub.id}"`,
      `"${sub.formTitle || sub.formId}"`,
      `"${date}"`,
      `"${name}"`,
      `"${phone}"`,
      `"${email}"`,
      `"${details}"`
    ]);
  });

  const csvContent = '\uFEFF' + rows.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SHAT_Form_Applications_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('تم تصدير ملف CSV بنجاح!', 'success');
}

// -------------------------------------------------------------
// View 2: Single Dedicated Form View (Deep Synced with Google Forms)
// -------------------------------------------------------------
function renderSingleForm(container, form, lang, formsList) {
  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  container.innerHTML = `
    <div style="background: #FFFFFF; border-radius: var(--radius-lg, 16px); border: 1px solid var(--border-light, #E2E8F0); overflow: hidden; box-shadow: var(--shadow-sm); max-width: 820px; margin: 0 auto;">
      
      <!-- Top Form Header Banner -->
      <div style="background: linear-gradient(135deg, var(--shat-navy, #0B1E36) 0%, #0F2A4A 100%); padding: 32px 36px; color: #FFFFFF; border-bottom: 4px solid var(--shat-green, #1E7E34);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="assets/logo/logo-symbol.jpg" alt="SHAT" style="height: 32px; width: 32px; border-radius: 6px; object-fit: cover;" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
            <span style="font-size: 0.85rem; font-weight: 700; color: #4ADE80;">
              ${txt('استمارة تسجيل معتمدة ومطابقة لـ Google Forms', 'Accredited Form Synced with Google Forms', 'Formulaire Officiel Synchronisé')}
            </span>
          </div>
          <span class="badge" style="background: rgba(255,255,255,0.15); color: #FFFFFF; font-size: 0.78rem;">
            ${form.code || 'SHAT-FORM'}
          </span>
        </div>

        <h1 style="font-size: 1.55rem; font-weight: 900; color: #FFFFFF; margin: 0 0 12px; line-height: 1.4;">
          ${form.title}
        </h1>

        <!-- Course Meta Row -->
        <div style="display: flex; gap: 16px; flex-wrap: wrap; font-size: 0.86rem; color: #CBD5E1; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.15);">
          ${form.trainer ? `<div><strong>المدرب:</strong> ${form.trainer}</div>` : ''}
          ${form.hours ? `<div><strong>الساعات:</strong> ${form.hours}</div>` : ''}
          ${form.fee ? `<div><strong>الرسوم:</strong> <span style="color: #4ADE80; font-weight: 700;">${form.fee}</span></div>` : ''}
          ${form.certificate ? `<div><strong>الشهادة:</strong> ${form.certificate}</div>` : ''}
        </div>
      </div>

      <!-- Sync & Security Assurance Bar -->
      <div style="background: #F0FDF4; padding: 12px 36px; border-bottom: 1px solid #DCFCE7; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 0.84rem; color: #166534;">
        <div style="display: flex; align-items: center; gap: 8px;">
          
          <span>${txt(
            'توثيق آمن: يتم تسجيل طلبك في المنصة وإرساله مباشرة لجدول المتابعة الميداني على Google Forms.',
            'Secure Dual-Sync: Recorded directly to SHAT database and Google Form sheet simultaneously.',
            'Enregistrement sécurisé synchronisé avec Google Forms.'
          )}</span>
        </div>

        ${form.googleFormSourceUrl ? `
          <a href="${form.googleFormSourceUrl}" target="_blank" rel="noopener noreferrer" style="color: #15803D; font-weight: 700; text-decoration: underline; font-size: 0.8rem;">
            فتح النموذج في Google Forms ↗
          </a>
        ` : ''}
      </div>

      <!-- 3-Step Visual Progress Breadcrumb -->
      <div style="background: #F8FAFC; padding: 14px 36px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 0.82rem; font-weight: 700;">
        <div style="display: flex; align-items: center; gap: 6px; color: #166534;">
          <span style="width: 22px; height: 22px; border-radius: 50%; background: #166534; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.72rem;">1</span>
          <span>البيانات الأساسية</span>
        </div>
        <span style="color: #CBD5E1;">←</span>
        <div style="display: flex; align-items: center; gap: 6px; color: #0B1E36;">
          <span style="width: 22px; height: 22px; border-radius: 50%; background: #0B1E36; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.72rem;">2</span>
          <span>التخصص والمؤهل</span>
        </div>
        <span style="color: #CBD5E1;">←</span>
        <div style="display: flex; align-items: center; gap: 6px; color: #64748B;">
          <span style="width: 22px; height: 22px; border-radius: 50%; background: #E2E8F0; color: #64748B; display: flex; align-items: center; justify-content: center; font-size: 0.72rem;">3</span>
          <span>المزامنة والاعتماد</span>
        </div>
      </div>

      <!-- Native Form Fields -->
      <form id="native-shat-form" style="padding: 36px;">
        <input type="hidden" id="native-form-id" value="${form.id}">

        <!-- Auto-Draft Banner -->
        <div id="form-draft-notice" style="display: none; background: #FEF3C7; border: 1px solid #FDE68A; padding: 10px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 0.84rem; color: #92400E; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>✓</span>
            <span>تم استعادة مسودتك المحفوظة تلقائياً. يمكنك المتابعة أو مسح المسودة.</span>
          </div>
          <button type="button" id="btn-clear-draft" class="btn-clean" style="font-size: 0.76rem; color: #DC2626; font-weight: 800; text-decoration: underline;">
            مسح المسودة
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 22px;">
          ${(form.fields || []).map(field => {
            const fieldIdentifier = field.entryId || field.id;

            if (field.type === 'select') {
              return `
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.95rem; font-weight: 700; color: var(--shat-navy, #0B1E36); margin-bottom: 8px; display: block;">
                    ${field.label} ${field.required ? '<span style="color: var(--accent-red, #DC2626);">*</span>' : ''}
                  </label>
                  <select id="${fieldIdentifier}" data-field-id="${field.id}" data-entry-id="${field.entryId || ''}" class="form-input form-field-input" style="height: 48px; font-size: 0.95rem; width: 100%; border-radius: 8px; border: 1px solid #CBD5E1; padding: 0 14px;" ${field.required ? 'required' : ''}>
                    <option value="">${txt('-- يرجى الاختيار من القائمة المعتمدة --', '-- Select an option --', '-- Choisir une option --')}</option>
                    ${(field.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                  </select>
                </div>
              `;
            } else if (field.type === 'textarea') {
              return `
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.95rem; font-weight: 700; color: var(--shat-navy, #0B1E36); margin-bottom: 8px; display: block;">
                    ${field.label} ${field.required ? '<span style="color: var(--accent-red, #DC2626);">*</span>' : ''}
                  </label>
                  <textarea id="${fieldIdentifier}" data-field-id="${field.id}" data-entry-id="${field.entryId || ''}" class="form-input form-field-input" style="min-height: 110px; font-size: 0.95rem; width: 100%; border-radius: 8px; border: 1px solid #CBD5E1; padding: 12px 14px;" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>
                </div>
              `;
            } else {
              return `
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.95rem; font-weight: 700; color: var(--shat-navy, #0B1E36); margin-bottom: 8px; display: block;">
                    ${field.label} ${field.required ? '<span style="color: var(--accent-red, #DC2626);">*</span>' : ''}
                  </label>
                  <input type="${field.type || 'text'}" id="${fieldIdentifier}" data-field-id="${field.id}" data-entry-id="${field.entryId || ''}" class="form-input form-field-input" style="height: 48px; font-size: 0.95rem; width: 100%; border-radius: 8px; border: 1px solid #CBD5E1; padding: 0 14px;" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>
                </div>
              `;
            }
          }).join('')}
        </div>

        <!-- Form Submit & Controls -->
        <div style="border-top: 1px solid var(--border-light, #E2E8F0); margin-top: 32px; padding-top: 24px; display: flex; justify-content: space-between; gap: 14px; align-items: center; flex-wrap: wrap;">
          <a href="#/forms" class="btn-clean" style="background: #F1F5F9; color: var(--shat-navy, #0B1E36); border: 1px solid var(--border-light, #E2E8F0); font-weight: 700;">
            ← استعراض برامج أخرى
          </a>

          <div style="display: flex; gap: 10px;">
            <button type="reset" id="btn-reset-native-form" class="btn-clean" style="background: #F8FAFC; color: var(--text-muted, #64748B); border: 1px solid var(--border-light, #E2E8F0);">
              ${txt('إعادة ضبط', 'Reset', 'Réinitialiser')}
            </button>
            <button type="submit" id="btn-submit-native-form" class="btn-clean btn-green btn-lg" style="padding: 13px 36px; font-weight: 900; border-radius: 8px; font-size: 1rem; box-shadow: 0 4px 12px rgba(30,126,52,0.25);">
              <span>${txt('تأكيد وإرسال الاستمارة فوراً', 'Submit Application Now', 'Confirmer et Envoyer')}</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </form>

    </div>
  `;

  // Bind Form Submission & Auto-Draft Persistence
  const formEl = document.getElementById('native-shat-form');
  const submitBtn = document.getElementById('btn-submit-native-form');
  const draftKey = `shat_form_draft_${form.id}`;
  const draftNoticeBox = document.getElementById('form-draft-notice');
  const clearDraftBtn = document.getElementById('btn-clear-draft');

  // A. Restore Draft if available
  try {
    const rawDraft = localStorage.getItem(draftKey);
    if (rawDraft) {
      const draftObj = JSON.parse(rawDraft);
      let count = 0;
      Object.entries(draftObj).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el && val) {
          el.value = val;
          count++;
        }
      });
      if (count > 0 && draftNoticeBox) {
        draftNoticeBox.style.display = 'flex';
      }
    }
  } catch (e) {}

  // B. Clear Draft Handler
  if (clearDraftBtn) {
    clearDraftBtn.onclick = () => {
      localStorage.removeItem(draftKey);
      if (formEl) formEl.reset();
      if (draftNoticeBox) draftNoticeBox.style.display = 'none';
      showToast('تم مسح المسودة المحفوظة بنجاح.', 'info');
    };
  }

  // C. Auto-save input changes
  if (formEl) {
    formEl.addEventListener('input', () => {
      const currentDraft = {};
      (form.fields || []).forEach(field => {
        const k = field.entryId || field.id;
        const el = document.getElementById(k);
        if (el && el.value) currentDraft[k] = el.value;
      });
      try {
        localStorage.setItem(draftKey, JSON.stringify(currentDraft));
      } catch (e) {}
    });

    formEl.onsubmit = async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>${txt('جاري التسجيل والمزامنة مع Google Forms...', 'Syncing with Google Forms...', 'Synchronisation en cours...')}</span>`;
      }

      // Collect answers mapped by both entryId (for Google Forms) and readable fieldId (for SHAT platform)
      const answers = {};
      (form.fields || []).forEach(field => {
        const fieldKey = field.entryId || field.id;
        const el = document.getElementById(fieldKey);
        if (el) {
          answers[fieldKey] = el.value;
          // Also set by field.id if different
          if (field.id && field.id !== fieldKey) {
            answers[field.id] = el.value;
          }
          // Also store with entry.XXXX if present
          if (field.entryId && !answers[field.entryId]) {
            answers[field.entryId] = el.value;
          }
        }
      });

      try {
        const res = await api.submitDualFormRegistration(form.id, form, answers);
        // Clear saved draft upon successful submission
        try { localStorage.removeItem(draftKey); } catch (e) {}
        
        container.innerHTML = `
          <div style="background: #FFFFFF; border-radius: var(--radius-lg, 16px); padding: 48px 36px; text-align: center; border: 1px solid var(--border-light, #E2E8F0); box-shadow: var(--shadow-sm); max-width: 720px; margin: 0 auto;">
            
            <div style="width: 72px; height: 72px; background: #DCFCE7; color: #166534; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.4rem; margin: 0 auto 20px;">
              ✓
            </div>

            <div style="display: inline-flex; align-items: center; gap: 6px; background: #E8F5E9; color: #1E7E34; padding: 4px 14px; border-radius: 999px; font-size: 0.82rem; font-weight: 800; margin-bottom: 12px;">
              <span>تم التوثيق والمزامنة مع Google Sheets بنجاح</span>
            </div>

            <h2 style="font-weight: 900; color: var(--shat-navy, #0B1E36); margin-bottom: 12px; font-size: 1.6rem;">
              ${txt('تم استلام وتأكيد طلب تسجيلكم بنجاح!', 'Registration Submitted & Confirmed!', 'Inscription Confirmée avec Succès !')}
            </h2>

            <p style="color: var(--text-main, #334155); font-size: 0.96rem; line-height: 1.8; max-width: 580px; margin: 0 auto 24px;">
              ${txt(
                `نشكرك على اهتمامك ببرامج شركة شات للتنمية والتطوير. تم حفظ طلبك رسمياً في المنظومة وإرساله إلى منسق الدورة وجدول المتابعة. رقم الطلب المرجعي: <strong style="color: var(--shat-navy, #0B1E36);">${res.submissionId || 'SHAT-' + Date.now()}</strong>.`,
                `Thank you for applying. Your registration has been documented and synced with the training coordinator. Reference ID: <strong style="color: var(--shat-navy, #0B1E36);">${res.submissionId || 'SHAT-' + Date.now()}</strong>.`,
                `Merci pour votre inscription. Référence : <strong style="color: var(--shat-navy, #0B1E36);">${res.submissionId || 'SHAT-' + Date.now()}</strong>.`
              )}
            </p>

            <!-- Actions Row -->
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="https://wa.me/972592879621?text=${encodeURIComponent('مرحباً شركة شات، قمت للتو بتقديم طلب تسجيل في: ' + form.title)}" target="_blank" class="btn-clean" style="background: #25D366; color: #FFFFFF; font-weight: 800; padding: 12px 24px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
                ${icons.whatsapp('', 20)} <span>متابعة عبر واتساب</span>
              </a>
              <a href="#/forms" class="btn-clean btn-primary" style="padding: 12px 24px; border-radius: 8px;">
                استعراض استمارات وبرامج أخرى
              </a>
              <a href="#/home" class="btn-clean" style="background: #F1F5F9; color: var(--shat-navy, #0B1E36); border: 1px solid var(--border-light, #E2E8F0); padding: 12px 20px; border-radius: 8px;">
                الرئيسية
              </a>
            </div>

          </div>
        `;

        showToast(txt('تم تأكيد التسجيل ومزامنة البيانات بنجاح!', 'Registration confirmed and synced!', 'Inscription confirmée et synchronisée !'), 'success');

      } catch (err) {
        console.error('Submission error:', err);
        showToast(txt('حدث خطأ أثناء الإرسال: ', 'Submission error: ', 'Erreur de soumission : ') + err.message, 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>${txt('تأكيد وإرسال الاستمارة فوراً', 'Submit Application Now', 'Confirmer et Envoyer')}</span><span>✓</span>`;
        }
      }
    };
  }
}

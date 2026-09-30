// SHAT Platform — Master Executive Admin Control Center (pages/admin/AdminPortalPage.js)
// Comprehensive administrative portal fulfilling:
// 1. Dedicated Admin Authentication Gate with instant unlock
// 2. CMS & Post Lifecycle (Publish/Unpublish, Rich Text, Image Upload, Live Preview, Drafts)
// 3. Admissions Engine (Google Form link input, internal form generation, direct link copy, 1-click approval)
// 4. LMS & Drive Direct Downloads (Course management, direct download URL testing)
// 5. Media & Asset Manager (Device image upload, copy URL, site image assignments)
// 6. User Management (Roles, passwords, profiles)
// 7. Platform Settings & Data Backup (JSON Export & Restore)
// 8. Audit Trail

import { authService } from '../../services/auth/authService.js';
import { cmsService } from '../../services/cms/cmsService.js';
import { applicationService, RegistrationMode } from '../../services/applications/applicationService.js';
import { courseService } from '../../services/courses/courseService.js';
import { settingsService } from '../../services/settings/settingsService.js';
import { auditService } from '../../services/audit/auditService.js';
import { parseGoogleDriveResource } from '../../services/files/fileService.js';
import { PostEditorModal, openPostEditor } from '../../components/cms/PostEditorModal.js';
import { MediaLibraryModal } from '../../components/cms/MediaLibraryModal.js';

let activeAdminTab = 'overview';

export async function renderAdminPortalPage() {
  const user = authService.getCurrentUser();
  const isAdmin = authService.isAdmin();

  // 1. GATE: If not logged in as Admin, show high-security Admin Login Gate
  if (!isAdmin) {
    return renderAdminLoginGate();
  }

  // 2. Fetch all data for panels
  const settings = settingsService.getSettings();
  const posts = cmsService.getAllPosts();
  const applications = applicationService.getAllApplications();
  const courses = await courseService.getCourses();
  const media = cmsService.getMediaLibrary();
  const auditLogs = await auditService.getLogs();

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const newAppsCount = applications.filter(a => a.status === 'new').length;

  return `
    <div class="admin-portal-wrapper" style="min-height: 100vh; background: #f8fafc; padding-bottom: 80px;" dir="rtl">
      <!-- Admin Top Banner -->
      <header style="background: linear-gradient(135deg, #0F2E4A 0%, #1e293b 100%); color: #ffffff; padding: 18px 0; border-bottom: 3px solid #10b981; box-shadow: 0 4px 15px rgba(0,0,0,0.15); position: sticky; top: 0; z-index: 100;">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(16, 185, 129, 0.2); border: 1.5px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              ⚙️
            </div>
            <div>
              <h1 style="font-size: 1.25rem; font-weight: 800; margin: 0; color: #ffffff; display: flex; align-items: center; gap: 10px;">
                <span>المركز الإداري والتحكم الشامل</span>
                <span style="font-size: 0.75rem; background: #10b981; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-weight: 700;">الإدارة العليا</span>
              </h1>
              <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">
                ${settings.company.nameAr} • مرحباً بك، ${user.name || 'أ. حسام جاد الله'}
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <a href="#/home" target="_blank" rel="noopener" style="background: rgba(255,255,255,0.12); color: #fff; text-decoration: none; padding: 8px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.2);">
              <span>👁️ معاينة الموقع</span>
              <span>↗</span>
            </a>
            <button type="button" id="btn-admin-logout" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); padding: 8px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
              🚪 خروج
            </button>
          </div>
        </div>
      </header>

      <!-- Admin Navigation Tabs -->
      <nav style="background: #ffffff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 80px; z-index: 90; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
        <div class="container" style="display: flex; gap: 4px; overflow-x: auto; padding: 6px 0;">
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'overview' ? 'active' : ''}" data-tab="overview">
            📊 نظرة عامة
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'cms' ? 'active' : ''}" data-tab="cms">
            📰 إدارة المنشورات (${posts.length})
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'admissions' ? 'active' : ''}" data-tab="admissions">
            📋 استمارات القبول وGoogle Form ${newAppsCount > 0 ? `<span style="background: #ef4444; color: #fff; padding: 1px 6px; border-radius: 10px; font-size: 0.72rem;">${newAppsCount}</span>` : ''}
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'courses' ? 'active' : ''}" data-tab="courses">
            📚 المساقات والتنزيلات (${courses.length})
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'media' ? 'active' : ''}" data-tab="media">
            🖼️ مكتبة الوسائط (${media.length})
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'users' ? 'active' : ''}" data-tab="users">
            👥 المستخدمين والصلاحيات
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'settings' ? 'active' : ''}" data-tab="settings">
            ⚙️ إعدادات المنصة والهوية
          </button>
          <button type="button" class="admin-tab-btn ${activeAdminTab === 'audit' ? 'active' : ''}" data-tab="audit">
            📜 سجل العمليات
          </button>
        </div>
      </nav>

      <!-- Tab Content Area -->
      <main class="container" style="margin-top: 24px;">
        <!-- TAB 1: OVERVIEW -->
        <div class="admin-tab-pane ${activeAdminTab === 'overview' ? 'active' : ''}" id="pane-overview">
          ${renderOverviewPane({ courses, posts, applications, media, settings, publishedCount, draftCount, newAppsCount })}
        </div>

        <!-- TAB 2: CMS POSTS -->
        <div class="admin-tab-pane ${activeAdminTab === 'cms' ? 'active' : ''}" id="pane-cms">
          ${renderCMSPane({ posts })}
        </div>

        <!-- TAB 3: ADMISSIONS & GOOGLE FORM -->
        <div class="admin-tab-pane ${activeAdminTab === 'admissions' ? 'active' : ''}" id="pane-admissions">
          ${renderAdmissionsPane({ applications, settings })}
        </div>

        <!-- TAB 4: COURSES & DRIVE DOWNLOADS -->
        <div class="admin-tab-pane ${activeAdminTab === 'courses' ? 'active' : ''}" id="pane-courses">
          ${renderCoursesPane({ courses })}
        </div>

        <!-- TAB 5: MEDIA MANAGER -->
        <div class="admin-tab-pane ${activeAdminTab === 'media' ? 'active' : ''}" id="pane-media">
          ${renderMediaPane({ media, settings })}
        </div>

        <!-- TAB 6: USERS & ROLES -->
        <div class="admin-tab-pane ${activeAdminTab === 'users' ? 'active' : ''}" id="pane-users">
          ${renderUsersPane()}
        </div>

        <!-- TAB 7: SETTINGS & BACKUP -->
        <div class="admin-tab-pane ${activeAdminTab === 'settings' ? 'active' : ''}" id="pane-settings">
          ${renderSettingsPane({ settings })}
        </div>

        <!-- TAB 8: AUDIT TRAIL -->
        <div class="admin-tab-pane ${activeAdminTab === 'audit' ? 'active' : ''}" id="pane-audit">
          ${renderAuditPane({ auditLogs })}
        </div>
      </main>

      <!-- Mount Global Post & Media Modals -->
      ${PostEditorModal()}
      ${MediaLibraryModal()}
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 1: OVERVIEW
// -------------------------------------------------------------
function renderOverviewPane({ courses, posts, applications, media, settings, publishedCount, draftCount, newAppsCount }) {
  return `
    <div>
      <!-- KPI Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-bottom: 28px;">
        <div class="shat-card" style="background: #ffffff; border-radius: 12px; padding: 20px; border-inline-start: 4px solid #10b981; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="font-size: 0.85rem; color: #64748b; font-weight: 700; margin-bottom: 6px;">المنشورات والمقالات</div>
          <div style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${posts.length}</div>
          <div style="font-size: 0.78rem; color: #10b981; font-weight: 600;">${publishedCount} منشور نشط • ${draftCount} مسودة</div>
        </div>

        <div class="shat-card" style="background: #ffffff; border-radius: 12px; padding: 20px; border-inline-start: 4px solid #0284c7; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="font-size: 0.85rem; color: #64748b; font-weight: 700; margin-bottom: 6px;">طلبات التسجيل والالتحاق</div>
          <div style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${applications.length}</div>
          <div style="font-size: 0.78rem; color: #0284c7; font-weight: 600;">${newAppsCount} طلبات جديدة بانتظار الاعتماد</div>
        </div>

        <div class="shat-card" style="background: #ffffff; border-radius: 12px; padding: 20px; border-inline-start: 4px solid #f59e0b; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="font-size: 0.85rem; color: #64748b; font-weight: 700; margin-bottom: 6px;">المساقات المعتمدة (LMS)</div>
          <div style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${courses.length}</div>
          <div style="font-size: 0.78rem; color: #f59e0b; font-weight: 600;">CHS, PSEA, OECD DAC</div>
        </div>

        <div class="shat-card" style="background: #ffffff; border-radius: 12px; padding: 20px; border-inline-start: 4px solid #8b5cf6; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="font-size: 0.85rem; color: #64748b; font-weight: 700; margin-bottom: 6px;">الوسائط والصور المرفوعة</div>
          <div style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${media.length}</div>
          <div style="font-size: 0.78rem; color: #8b5cf6; font-weight: 600;">تخزين سحابي ومحلي فوري</div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 28px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0 0 16px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
          <span>⚡ إجراءات التحكم والتحرير السريع</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <button type="button" class="btn-quick-admin-action" data-action="new-post" style="padding: 14px; background: #f0fdf4; border: 1.5px solid #10b981; border-radius: 8px; font-weight: 700; color: #166534; cursor: pointer; text-align: center;">
            ✍️ إنشاء منشور جديد
          </button>
          <button type="button" class="btn-quick-admin-action" data-action="goto-admissions" style="padding: 14px; background: #f0f9ff; border: 1.5px solid #0284c7; border-radius: 8px; font-weight: 700; color: #075985; cursor: pointer; text-align: center;">
            📋 إعداد رابط Google Form
          </button>
          <button type="button" class="btn-quick-admin-action" data-action="upload-media" style="padding: 14px; background: #faf5ff; border: 1.5px solid #8b5cf6; border-radius: 8px; font-weight: 700; color: #6b21a8; cursor: pointer; text-align: center;">
            🖼️ رفع صورة جديدة
          </button>
          <button type="button" class="btn-quick-admin-action" data-action="export-backup" style="padding: 14px; background: #fffbeb; border: 1.5px solid #f59e0b; border-radius: 8px; font-weight: 700; color: #92400e; cursor: pointer; text-align: center;">
            📥 تصدير نسخة احتياطية (JSON)
          </button>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 2: CMS POSTS
// -------------------------------------------------------------
function renderCMSPane({ posts }) {
  return `
    <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            📰 إدارة المنشورات والمقالات الإخبارية
          </h2>
          <p style="font-size: 0.85rem; color: #64748b; margin: 0;">
            يمكنك إنشاء منشور جديد، إضافة صور وروابط، حفظ مسودات، وتعطيل أو تفعيل أي منشور بنقرة واحدة.
          </p>
        </div>

        <button type="button" id="btn-admin-create-post" style="background: #10b981; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);">
          <span>➕ إنشاء منشور جديد</span>
        </button>
      </div>

      <!-- Posts Table -->
      <div style="overflow-x: auto;">
        <table class="shat-table" style="width: 100%; border-collapse: collapse; text-align: right;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
              <th style="padding: 12px;">الصورة</th>
              <th style="padding: 12px;">عنوان المنشور</th>
              <th style="padding: 12px;">التصنيف</th>
              <th style="padding: 12px;">الحالة</th>
              <th style="padding: 12px;">تاريخ النشر</th>
              <th style="padding: 12px; text-align: center;">الإجراءات والتحكم</th>
            </tr>
          </thead>
          <tbody>
            ${posts.map(p => {
              const isPub = p.status === 'published';
              return `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px;">
                    <img src="${p.img || 'assets/logo/logo-banner.jpg'}" alt="" style="width: 50px; height: 38px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;" onerror="this.src='assets/logo/logo-banner.jpg'">
                  </td>
                  <td style="padding: 12px; font-weight: 700; color: #0f172a;">
                    ${p.title}
                  </td>
                  <td style="padding: 12px; font-size: 0.85rem; color: #64748b;">
                    ${p.category || 'أخبار عامة'}
                  </td>
                  <td style="padding: 12px;">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; ${isPub ? 'background: #dcfce7; color: #15803d;' : 'background: #f1f5f9; color: #475569;'}">
                      ${isPub ? '✓ منشور نشط' : (p.status === 'draft' ? '📝 مسودة' : '⏸️ غير منشور')}
                    </span>
                  </td>
                  <td style="padding: 12px; font-size: 0.82rem; color: #94a3b8;">
                    ${p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('ar-EG') : 'غير محدد'}
                  </td>
                  <td style="padding: 12px; text-align: center;">
                    <div style="display: inline-flex; gap: 6px;">
                      <!-- Toggle Publish/Unpublish -->
                      <button type="button" class="btn-toggle-post-status" data-id="${p.id}" data-current="${p.status}" title="${isPub ? 'تعطيل المنشور' : 'نشر وتفعيل'}" style="padding: 6px 10px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; font-size: 0.82rem; cursor: pointer; font-weight: 600;">
                        ${isPub ? '⏸️ تعطيل' : '🚀 نشر'}
                      </button>
                      <!-- Edit -->
                      <button type="button" class="btn-edit-post" data-id="${p.id}" title="تعديل المنشور" style="padding: 6px 10px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; font-size: 0.82rem; cursor: pointer;">
                        ✏️ تعديل
                      </button>
                      <!-- Delete -->
                      <button type="button" class="btn-delete-post" data-id="${p.id}" title="حذف" style="padding: 6px 10px; border-radius: 6px; border: 1px solid #fecaca; background: #fef2f2; color: #dc2626; font-size: 0.82rem; cursor: pointer;">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 3: ADMISSIONS & GOOGLE FORM DUAL ENGINE
// -------------------------------------------------------------
function renderAdmissionsPane({ applications, settings }) {
  const gformUrl = settings.admissions.defaultGoogleFormUrl;
  const internalUrl = window.location.origin + window.location.pathname + '#/apply';

  return `
    <div>
      <!-- Google Form Link Setting & Generated Internal Form Box -->
      <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 24px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 10px; display: flex; align-items: center; gap: 8px;">
          <span>🔗 ربط نموذج Google Form وتوليد الاستمارة الداخلية</span>
        </h3>
        <p style="font-size: 0.88rem; color: #64748b; margin: 0 0 20px; line-height: 1.6;">
          ضع رابط استمارة Google Form هنا؛ ستقوم المنصة بتوليد استمارة تقديم إلكترونية متطابقة بهوية شات فوراً، مع إظهار رابط المشاركة الجديد الخاص بالشركة.
        </p>

        <form id="admin-gform-sync-form" style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
          <input type="url" id="input-admin-gform-url" value="${gformUrl}" placeholder="https://forms.gle/..." required style="flex: 1; min-width: 280px; padding: 12px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;" dir="ltr">
          <button type="submit" style="background: #0F2E4A; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer;">
            💾 حفظ وتوليد الاستمارة
          </button>
        </form>

        <!-- Result Box: Generated Internal Link -->
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 18px; margin-top: 14px;">
          <div style="display: flex; align-items: center; gap: 8px; color: #166534; font-weight: 800; font-size: 0.95rem; margin-bottom: 8px;">
            <span>✓</span>
            <span>الاستمارة الداخلية مفعلة ومربوطة بهوية المنصة بنجاح:</span>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
            <input type="text" id="live-generated-internal-link" value="${internalUrl}" readonly style="flex: 1; min-width: 260px; padding: 10px 14px; background: #ffffff; border: 1px solid #bbf7d0; border-radius: 6px; font-weight: 700; color: #0F2E4A;" dir="ltr">
            <button type="button" id="btn-copy-generated-link" style="background: #10b981; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; cursor: pointer;">
              📋 نسخ الرابط للمشاركة
            </button>
            <a href="#/apply" target="_blank" style="background: #ffffff; color: #0F2E4A; border: 1px solid #cbd5e1; padding: 10px 16px; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
              <span>معاينة الاستمارة ↗</span>
            </a>
          </div>

          <div style="font-size: 0.8rem; color: #15803d;">
            💡 المتدربون عند دخولهم هذا الرابط سيسجلون عبر استمارة شات الرسمية، وتصل طلباتهم مباشرة إلى هذا الجدول أدناه مع إمكانية فتح نموذج Google Form الأصلي كخيار بديل.
          </div>
        </div>
      </div>

      <!-- Applications Table -->
      <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 16px;">
          📥 طلبات الالتحاق الواردة (${applications.length})
        </h3>

        <div style="overflow-x: auto;">
          <table class="shat-table" style="width: 100%; border-collapse: collapse; text-align: right;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                <th style="padding: 12px;">رقم الطلب</th>
                <th style="padding: 12px;">اسم المتدرب</th>
                <th style="padding: 12px;">المساق المطلوب</th>
                <th style="padding: 12px;">الهاتف / واتساب</th>
                <th style="padding: 12px;">الحالة</th>
                <th style="padding: 12px; text-align: center;">القرار والاعتماد</th>
              </tr>
            </thead>
            <tbody>
              ${applications.length === 0 ? `
                <tr><td colspan="6" style="padding: 30px; text-align: center; color: #94a3b8;">لا توجد طلبات التحاق حتى الآن</td></tr>
              ` : applications.map(app => `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px; font-weight: 700; color: #0284c7;">${app.id}</td>
                  <td style="padding: 12px; font-weight: 700; color: #0f172a;">${app.fullName}</td>
                  <td style="padding: 12px; font-size: 0.85rem;">${app.courseTitle || app.courseId}</td>
                  <td style="padding: 12px; font-size: 0.85rem;" dir="ltr">${app.phone}</td>
                  <td style="padding: 12px;">
                    <span style="padding: 3px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; ${app.status === 'approved' ? 'background: #dcfce7; color: #166534;' : (app.status === 'rejected' ? 'background: #fee2e2; color: #991b1b;' : 'background: #fef3c7; color: #92400e;')}">
                      ${app.status === 'approved' ? '✓ مقبول ومعتمد' : (app.status === 'rejected' ? 'مرفوض' : 'جديد')}
                    </span>
                  </td>
                  <td style="padding: 12px; text-align: center;">
                    ${app.status !== 'approved' ? `
                      <button type="button" class="btn-approve-app" data-id="${app.id}" style="background: #10b981; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                        ✓ قبول واعتماد
                      </button>
                    ` : '<span style="color: #10b981; font-size: 0.85rem; font-weight: 700;">تم التفعيل</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 4: COURSES & DRIVE DIRECT DOWNLOADS
// -------------------------------------------------------------
function renderCoursesPane({ courses }) {
  return `
    <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 8px;">
        📚 إدارة المساقات وروابط Google Drive للتنزيل المباشر
      </h2>
      <p style="font-size: 0.88rem; color: #64748b; margin: 0 0 24px; line-height: 1.6;">
        عند وضع رابط ملف من Google Drive، يقوم محرك شات بتحويله تلقائياً لرابط تحميل مباشر بحيث يتم تنزيل الملف فوراً للطالب دون نقله إلى واجهة Google Drive.
      </p>

      <div style="display: grid; gap: 16px;">
        ${courses.map(c => `
          <div style="border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="background: #0F2E4A; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px;">${c.code}</span>
                <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #0f172a;">${c.title}</h4>
              </div>
              <div style="font-size: 0.82rem; color: #64748b;">
                المدرب: <strong>${c.instructor}</strong> • ${c.modules ? c.modules.length : 6} وحدات تعليمية
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <a href="#/course/${c.id}" target="_blank" style="padding: 8px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.85rem; font-weight: 600; text-decoration: none; color: #0f172a;">
                معاينة المساق ↗
              </a>
              <button type="button" class="btn-edit-course-drive" data-id="${c.id}" style="padding: 8px 16px; background: #10b981; color: #fff; border: none; border-radius: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
                📁 تعديل رابط Drive المباشر
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 5: MEDIA MANAGER
// -------------------------------------------------------------
function renderMediaPane({ media, settings }) {
  return `
    <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">
            🖼️ مكتبة الوسائط ورفع الصور
          </h2>
          <p style="font-size: 0.85rem; color: #64748b; margin: 0;">
            ارفع أي صورة من جهازك بحد أقصى 5MB. يمكنك نسخ رابطها المباشر أو تعيينها كشعار أو غلاف مساق.
          </p>
        </div>

        <div>
          <input type="file" id="admin-device-file-input" accept="image/*" style="display: none;">
          <button type="button" id="btn-trigger-device-upload" style="background: #8b5cf6; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
            <span>📤 رفع صورة من جهازي</span>
          </button>
        </div>
      </div>

      <!-- Media Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;">
        ${media.map(m => `
          <div style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="height: 120px; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <img src="${m.url}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/logo/logo-badge.jpg'">
            </div>
            <div style="padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="font-size: 0.82rem; font-weight: 700; color: #0f172a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 6px;">
                ${m.title}
              </div>
              <button type="button" class="btn-copy-media-url" data-url="${m.url}" style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 5px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; text-align: center;">
                📋 نسخ الرابط
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 6: USERS & ROLES
// -------------------------------------------------------------
function renderUsersPane() {
  const users = [
    { username: 'admin', name: 'أ. حسام جاد الله', role: 'admin', roleTitle: 'المدير العام', email: 'admin@shat.com' },
    { username: 'osama', name: 'د. أسامة المنصور', role: 'instructor', roleTitle: 'مدرب معتمد', email: 'osama@shat.com' },
    { username: 'ahmed', name: 'أحمد خليل', role: 'student', roleTitle: 'طالب معتمد', email: 'ahmed@shat.com' },
    { username: 'content', name: 'سارة عبد الله', role: 'employee', roleTitle: 'مسؤول نشر ومحتوى', email: 'content@shat.com' }
  ];

  return `
    <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 16px;">
        👥 إدارة المستخدمين والصلاحيات
      </h2>

      <div style="overflow-x: auto;">
        <table class="shat-table" style="width: 100%; border-collapse: collapse; text-align: right;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
              <th style="padding: 12px;">الاسم الكامل</th>
              <th style="padding: 12px;">اسم المستخدم</th>
              <th style="padding: 12px;">البريد الإلكتروني</th>
              <th style="padding: 12px;">الدور المؤسسي</th>
              <th style="padding: 12px;">حالة الحساب</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: 700; color: #0f172a;">${u.name}</td>
                <td style="padding: 12px; font-size: 0.85rem;" dir="ltr">${u.username}</td>
                <td style="padding: 12px; font-size: 0.85rem;" dir="ltr">${u.email}</td>
                <td style="padding: 12px;">
                  <span style="padding: 3px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; background: #e0e7ff; color: #3730a3;">
                    ${u.roleTitle}
                  </span>
                </td>
                <td style="padding: 12px; color: #10b981; font-weight: 700; font-size: 0.82rem;">نشط</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 7: SETTINGS & BACKUP
// -------------------------------------------------------------
function renderSettingsPane({ settings }) {
  const comp = settings.company;

  return `
    <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 16px;">
        ⚙️ إعدادات المنصة، الهوية المؤسسية، والنسخ الاحتياطي
      </h2>

      <form id="form-site-settings" style="max-width: 700px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; font-weight: 700; font-size: 0.88rem; margin-bottom: 6px;">اسم الشركة بالعربية:</label>
          <input type="text" id="cfg-name-ar" value="${comp.nameAr}" class="shat-form-input" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
        </div>

        <div>
          <label style="display: block; font-weight: 700; font-size: 0.88rem; margin-bottom: 6px;">شعار الشركة اللفظي (Tagline):</label>
          <input type="text" id="cfg-tagline-ar" value="${comp.taglineAr}" class="shat-form-input" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
        </div>

        <div>
          <label style="display: block; font-weight: 700; font-size: 0.88rem; margin-bottom: 6px;">شريط الإعلانات العلوي (Motto):</label>
          <input type="text" id="cfg-motto-ar" value="${comp.mottoAr}" class="shat-form-input" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div>
            <label style="display: block; font-weight: 700; font-size: 0.88rem; margin-bottom: 6px;">رقم الهاتف:</label>
            <input type="text" id="cfg-phone" value="${comp.phone}" dir="ltr" class="shat-form-input" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
          </div>
          <div>
            <label style="display: block; font-weight: 700; font-size: 0.88rem; margin-bottom: 6px;">البريد الإلكتروني:</label>
            <input type="email" id="cfg-email" value="${comp.email}" dir="ltr" class="shat-form-input" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
          </div>
        </div>

        <div>
          <button type="submit" style="background: #10b981; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; align-self: flex-start;">
            💾 حفظ تعديلات المنصة
          </button>
        </div>
      </form>

      <!-- Backup Section -->
      <div style="margin-top: 36px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0 0 10px;">
          💾 إدارة البيانات والنسخ الاحتياطي (Backup & Restore)
        </h3>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 16px;">
          تصدير كافة إعدادات المنصة، المقالات، والطلبات في ملف JSON واحد للحفظ أو الاستعادة.
        </p>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button type="button" id="btn-export-backup" style="background: #0F2E4A; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; cursor: pointer;">
            📥 تصدير نسخة احتياطية (JSON)
          </button>

          <input type="file" id="input-restore-backup" accept=".json" style="display: none;">
          <button type="button" id="btn-trigger-restore-backup" style="background: #ffffff; color: #0F2E4A; border: 1.5px solid #0F2E4A; padding: 10px 18px; border-radius: 6px; font-weight: 700; cursor: pointer;">
            📤 استيراد واستعادة نسخة (JSON)
          </button>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PANE 8: AUDIT TRAIL
// -------------------------------------------------------------
function renderAuditPane({ auditLogs }) {
  return `
    <div style="background: #ffffff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 16px;">
        📜 سجل الرقابة والعمليات الإدارية
      </h2>

      <div style="overflow-x: auto;">
        <table class="shat-table" style="width: 100%; border-collapse: collapse; text-align: right;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
              <th style="padding: 12px;">التوقيت</th>
              <th style="padding: 12px;">العملية</th>
              <th style="padding: 12px;">المورد</th>
              <th style="padding: 12px;">التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            ${auditLogs.slice(0, 30).map(l => `
              <tr style="border-bottom: 1px solid #f1f5f9; font-size: 0.85rem;">
                <td style="padding: 10px; color: #94a3b8;" dir="ltr">${new Date(l.timestamp).toLocaleString('ar-EG')}</td>
                <td style="padding: 10px; font-weight: 700; color: #0284c7;">${l.action}</td>
                <td style="padding: 10px; font-weight: 600;">${l.resource}</td>
                <td style="padding: 10px; color: #475569;">${l.details}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// ADMIN LOGIN GATE (Displayed when not logged in as Admin)
// -------------------------------------------------------------
function renderAdminLoginGate() {
  return `
    <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: #f8fafc;" dir="rtl">
      <div style="width: 100%; max-width: 440px; background: #ffffff; border-radius: 16px; padding: 32px 28px; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; text-align: center;">
        <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(15, 46, 74, 0.08); border: 1.5px solid #0F2E4A; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 16px;">
          🔐
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; color: #0F2E4A; margin: 0 0 6px;">
          بوابة المركز الإداري الموحد
        </h2>
        <p style="font-size: 0.88rem; color: #64748b; margin: 0 0 24px; line-height: 1.6;">
          يرجى تسجيل الدخول ببيانات الإدارة للتحكم في المنصة، المحتوى، والطلبات.
        </p>

        <form id="admin-gate-login-form" style="text-align: right;">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 700; font-size: 0.86rem; color: #1e293b; margin-bottom: 6px;">اسم المستخدم أو البريد:</label>
            <input type="text" id="gate-admin-username" class="shat-form-input" value="admin" required style="width: 100%; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;">
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 700; font-size: 0.86rem; color: #1e293b; margin-bottom: 6px;">كلمة المرور:</label>
            <input type="password" id="gate-admin-password" class="shat-form-input" value="admin123" required style="width: 100%; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;">
          </div>

          <div id="gate-login-error" style="display: none; background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 6px; font-size: 0.85rem; margin-bottom: 14px; text-align: center;"></div>

          <button type="submit" style="width: 100%; background: #0F2E4A; color: #ffffff; border: none; padding: 14px; border-radius: 8px; font-weight: 800; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 12px rgba(15, 46, 74, 0.25);">
            🔑 الدخول إلى لوحة التحكم
          </button>
        </form>

        <div style="margin-top: 20px; font-size: 0.8rem; color: #94a3b8;">
          <a href="#/home" style="color: #64748b; text-decoration: none;">← العودة للصفحة الرئيسية للموقع</a>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// EVENT INITIALIZATION & DISPATCH
// -------------------------------------------------------------
export function initAdminPortalEvents() {
  // 1. Admin Gate Login Form Listener
  const gateForm = document.getElementById('admin-gate-login-form');
  if (gateForm) {
    gateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('gate-admin-username').value.trim();
      const password = document.getElementById('gate-admin-password').value.trim();
      const errorBox = document.getElementById('gate-login-error');

      const res = await authService.signInWithPassword({ emailOrUsername: username, password });
      if (res.success) {
        window.location.reload();
      } else {
        if (errorBox) {
          errorBox.textContent = res.error || 'بيانات الدخول غير صحيحة';
          errorBox.style.display = 'block';
        }
      }
    });
    return;
  }

  // 2. Tab Navigation
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      activeAdminTab = tab;
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = document.getElementById(`pane-${tab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 3. Admin Logout Button
  const logoutBtn = document.getElementById('btn-admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await authService.signOut();
      window.location.hash = '#/home';
      window.location.reload();
    });
  }

  // 4. Quick Actions
  document.querySelectorAll('.btn-quick-admin-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action === 'new-post') {
        openPostEditor(null, () => window.location.reload());
      } else if (action === 'goto-admissions') {
        const admissionsTab = document.querySelector('.admin-tab-btn[data-tab="admissions"]');
        if (admissionsTab) admissionsTab.click();
      } else if (action === 'upload-media') {
        const fileInput = document.getElementById('admin-device-file-input');
        if (fileInput) fileInput.click();
      } else if (action === 'export-backup') {
        settingsService.exportFullBackup();
      }
    });
  });

  // 5. CMS Create Post
  const createPostBtn = document.getElementById('btn-admin-create-post');
  if (createPostBtn) {
    createPostBtn.addEventListener('click', () => {
      openPostEditor(null, () => window.location.reload());
    });
  }

  // 6. CMS Toggle Publish / Unpublish
  document.querySelectorAll('.btn-toggle-post-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const current = btn.getAttribute('data-current');
      if (current === 'published') {
        cmsService.unpublishPost(id);
      } else {
        cmsService.publishPost(id);
      }
      window.location.reload();
    });
  });

  // 7. CMS Edit Post
  document.querySelectorAll('.btn-edit-post').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const post = cmsService.getAllPosts().find(p => p.id === id);
      openPostEditor(post, () => window.location.reload());
    });
  });

  // 8. CMS Delete Post
  document.querySelectorAll('.btn-delete-post').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
        cmsService.deletePost(id);
        window.location.reload();
      }
    });
  });

  // 8.1 Courses & Drive Direct Download Link Editor
  document.querySelectorAll('.btn-edit-course-drive').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const currentUrl = localStorage.getItem(`shat_course_drive_${id}`) || 'https://drive.google.com/file/d/.../view';
      const newUrl = prompt(`أدخل رابط Google Drive المباشر لهذا المساق (${id}):\n(يقبل روابط الملفات والمستندات وجداول البيانات والمجلدات)`, currentUrl);
      if (newUrl && newUrl.trim()) {
        const parsed = parseGoogleDriveResource(newUrl.trim());
        localStorage.setItem(`shat_course_drive_${id}`, newUrl.trim());
        alert(`✓ تم حفظ رابط Google Drive للمساق بنجاح!\n\n• نوع المورد: ${parsed.type}\n• إمكانية التحميل المباشر: ${parsed.canDirectDownload ? 'نعم (تنزيل تلقائي للطالب)' : 'لا (عرض في المتصفح)'}\n• رابط التحميل المشتق: ${parsed.downloadUrl || 'غير متاح'}`);
        window.location.reload();
      }
    });
  });

  // 9. Admissions: Google Form Sync
  const gformSync = document.getElementById('admin-gform-sync-form');
  if (gformSync) {
    gformSync.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('input-admin-gform-url').value.trim();
      settingsService.setGoogleFormUrl(val);
      alert('✓ تم حفظ رابط Google Form وتوليد الاستمارة الداخلية بنجاح!');
      window.location.reload();
    });
  }

  // 10. Copy Generated Link
  const copyBtn = document.getElementById('btn-copy-generated-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const input = document.getElementById('live-generated-internal-link');
      if (input) {
        navigator.clipboard.writeText(input.value);
        alert('📋 تم نسخ الرابط الداخلي بنجاح للمشاركة مع المتدربين!');
      }
    });
  }

  // 11. Approve Application
  document.querySelectorAll('.btn-approve-app').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      applicationService.updateStatus(id, 'approved', 'تم الاعتماد بنجاح');
      alert('✓ تم قبول واعتماد الطالب وتفعيل حسابه بنجاح!');
      window.location.reload();
    });
  });

  // 12. Media Upload from Device
  const uploadTrigger = document.getElementById('btn-trigger-device-upload');
  const fileInput = document.getElementById('admin-device-file-input');
  if (uploadTrigger && fileInput) {
    uploadTrigger.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة أكبر من 5MB. يرجى اختيار صورة أصغر.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        cmsService.addMediaItem({
          title: file.name,
          url: event.target.result,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type
        });
        alert('✓ تم رفع الصورة إلى مكتبة الوسائط بنجاح!');
        window.location.reload();
      };
      reader.readAsDataURL(file);
    });
  }

  // 13. Copy Media URL
  document.querySelectorAll('.btn-copy-media-url').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      navigator.clipboard.writeText(url);
      alert('📋 تم نسخ رابط الصورة بنجاح!');
    });
  });

  // 14. Site Settings Form
  const settingsForm = document.getElementById('form-site-settings');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      settingsService.saveSettings({
        company: {
          nameAr: document.getElementById('cfg-name-ar').value.trim(),
          taglineAr: document.getElementById('cfg-tagline-ar').value.trim(),
          mottoAr: document.getElementById('cfg-motto-ar').value.trim(),
          phone: document.getElementById('cfg-phone').value.trim(),
          email: document.getElementById('cfg-email').value.trim()
        }
      });
      alert('✓ تم حفظ إعدادات وبيانات المنصة بنجاح!');
      window.location.reload();
    });
  }

  // 15. Backup Export & Restore
  const exportBtn = document.getElementById('btn-export-backup');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => settingsService.exportFullBackup());
  }

  const restoreTrigger = document.getElementById('btn-trigger-restore-backup');
  const restoreInput = document.getElementById('input-restore-backup');
  if (restoreTrigger && restoreInput) {
    restoreTrigger.addEventListener('click', () => restoreInput.click());
    restoreInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = settingsService.importFullBackup(event.target.result);
        if (res.success) {
          alert('✓ تم استعادة النسخة الاحتياطية بنجاح!');
          window.location.reload();
        } else {
          alert('فشل استيراد النسخة: ' + res.error);
        }
      };
      reader.readAsText(file);
    });
  }
}

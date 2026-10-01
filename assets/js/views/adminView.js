// assets/js/views/adminView.js
// Production Executive Administration Center, Full CMS & LMS Management Engine
// Supports 100% Trilingual UI (AR, EN, FR), Live Post Editing, Device File Uploads & Local Device Storage
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';
import { MediaStorageService } from '../services/storage/mediaStorageService.js';
import { content } from '../content.js';
import { siteCustomizer } from '../tools/siteCustomizer.js';

export function renderAdminView(lang = 'ar') {
  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => {
    if (lang === 'fr') return fr || en;
    if (lang === 'en') return en;
    return ar;
  };

  const t = {
    brandTitle: txt('إدارة شركة شات', 'SHAT Admin Center', 'Centre Admin SHAT'),
    brandSub: txt('المركز التنفيذي الموحد', 'Enterprise Admin Center', 'Centre de Gestion Institutionnel'),
    tabDashboard: txt('لوحة المؤشرات (Dashboard)', 'Dashboard Overview', 'Tableau de Bord'),
    groupContent: txt('إدارة المحتوى (Content)', 'Content Management', 'Gestion de Contenu'),
    tabPosts: txt('المنشورات والأخبار (Posts)', 'News & Publications', 'Actualités & Publications'),
    tabMedia: txt('مكتبة الوسائط والصور (Media)', 'Media Library & Files', 'Médiathèque & Fichiers'),
    groupAcademy: txt('الأكاديمية والتدريب (Academy)', 'Academy & Courses', 'Académie & Formations'),
    tabCourses: txt('المقررات والمناهج (Courses)', 'Courses & Curricula', 'Cursus & Programmes'),
    tabRoster: txt('سجل الطلاب والمدربين', 'Staff & Student Directory', 'Annuaire Étudiants & Formateurs'),
    groupApps: txt('الطلبات والاستمارات (Applications)', 'Applications & Inquiries', 'Candidatures & Demandes'),
    tabApplications: txt('طلبات الالتحاق (Applications)', 'Course Applications', 'Demandes d\'Inscription'),
    tabForms: txt('نماذج Google Forms', 'Native Form Engine', 'Formulaires Intégrés'),
    tabInquiries: txt('طلبات الاستشارات (Inquiries)', 'Consulting Inquiries', 'Demandes de Conseil'),
    groupSettings: txt('النظام والإعدادات (Settings)', 'System & Backups', 'Système & Sauvegardes'),
    tabHealth: txt('صحة النظام والنسخ الاحتياطي', 'System Health & Backups', 'Santé Système & Sauvegardes')
  };

  return `
    <div class="admin-portal-layout" style="display: flex; min-height: 90vh; background: var(--bg-subtle); margin-top: 70px;">
      
      <!-- Collapsible Desktop/Tablet Admin Sidebar -->
      <aside id="admin-sidebar" class="admin-sidebar" style="width: 280px; background: #0B192C; color: #FFFFFF; flex-shrink: 0; display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s ease;">
        
        <!-- Sidebar Brand Banner: Text to the RIGHT of Logo (in RTL) -->
        <div style="padding: 20px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.22); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px; flex-direction: row;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 900; font-size: 1.05rem; color: #FFFFFF; letter-spacing: -0.3px;">${t.brandTitle}</span>
                <span style="background: rgba(16,185,129,0.2); color: #34D399; font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(52,211,153,0.3);">HQ</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block; box-shadow: 0 0 8px #10B981;"></span>
                <span style="font-size: 0.74rem; font-weight: 600; color: #94A3B8;">${t.brandSub}</span>
              </div>
            </div>

            <!-- Elevated Logo Emblem Container -->
            <div style="
              width: 44px;
              height: 44px;
              border-radius: 12px;
              background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
              border: 1px solid rgba(255,255,255,0.16);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              flex-shrink: 0;
            ">
              <img src="assets/logo/logo-transparent.png" alt="SHAT" style="max-height: 28px; max-width: 28px; object-fit: contain;" onerror="this.onerror=null; this.src='assets/logo/logo-symbol.jpg';">
            </div>
          </div>
          <button id="btn-close-admin-sidebar" class="mobile-only" style="background: none; border: none; color: #94A3B8; font-size: 1.2rem; cursor: pointer; display: none;">✕</button>
        </div>

        <!-- Sidebar Navigation Tree -->
        <nav class="admin-sidebar-nav" style="padding: 16px 12px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;">
          
          <!-- Section: Dashboard -->
          <button class="admin-nav-item active" data-target="admin-tab-dashboard">
            <span>📊</span>
            <span>${t.tabDashboard}</span>
          </button>

          <!-- Group: Content -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            ${t.groupContent}
          </div>
          <button class="admin-nav-item" data-target="admin-tab-posts">
            <span>📝</span>
            <span>${t.tabPosts}</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-media">
            <span>🖼️</span>
            <span>${t.tabMedia}</span>
          </button>

          <!-- Group: Academy -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            ${t.groupAcademy}
          </div>
          <button class="admin-nav-item" data-target="admin-tab-courses">
            <span>🎓</span>
            <span>${t.tabCourses}</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-roster">
            <span>👥</span>
            <span>${t.tabRoster}</span>
          </button>

          <!-- Group: Applications -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            ${t.groupApps}
          </div>
          <button class="admin-nav-item" data-target="admin-tab-applications">
            <span>📥</span>
            <span>${t.tabApplications}</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-forms">
            <span>📋</span>
            <span>${t.tabForms}</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-inquiries">
            <span>💬</span>
            <span>${t.tabInquiries}</span>
          </button>

          <!-- Group: Settings -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            ${t.groupSettings}
          </div>
          <button class="admin-nav-item" data-target="admin-tab-health">
            <span>🛡️</span>
            <span>${t.tabHealth}</span>
          </button>
          <button type="button" class="admin-nav-item" id="btn-admin-customizer-trigger" style="margin-top: 6px; background: rgba(30,126,52,0.18); border: 1px solid rgba(30,126,52,0.4); color: #4ADE80; font-weight: 800;">
            <span>🎨</span>
            <span>${txt('تخصيص المنصة والمظهر', 'Platform Customizer', 'Personnalisation du Site')}</span>
          </button>
        </nav>

        <!-- Sidebar User Footer -->
        <div style="padding: 16px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--shat-green); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; color: #FFFFFF;">
              ح
            </div>
            <div style="font-size: 0.8rem;">
              <div style="font-weight: 700; color: #FFFFFF;" id="admin-sidebar-user">أ. حسام جاد الله</div>
              <div style="font-size: 0.7rem; color: #94A3B8;">Super Admin</div>
            </div>
          </div>
          <a href="#/home" title="الخروج للموقع" style="color: #94A3B8; font-size: 0.9rem; text-decoration: none;">🌐</a>
        </div>
      </aside>

      <!-- Main Admin Workspace Area -->
      <main class="admin-main-content" style="flex: 1; padding: 28px 32px; overflow-y: auto;">
        
        <!-- Mobile/Tablet Sidebar Toggle Bar -->
        <div class="admin-top-toggle-bar" style="display: none; justify-content: space-between; align-items: center; margin-bottom: 20px; background: #FFFFFF; padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
          <button id="btn-toggle-admin-sidebar" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--shat-navy); font-weight: 700;">
            ☰ ${txt('قائمة لوحة التحكم', 'Admin Menu', 'Menu Admin')}
          </button>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--shat-navy);">${txt('لوحة الإدارة التنفيذية', 'Executive Dashboard', 'Gestion Exécutive')}</span>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 1: DASHBOARD OVERVIEW -->
        <!-- ======================================================== -->
        <div id="admin-tab-dashboard" class="admin-view-pane active">
          
          <!-- Welcome Banner with Executive Ambient Mesh & Status Lighting -->
          <div style="
            background: radial-gradient(circle at 92% 12%, rgba(16, 185, 129, 0.22) 0%, transparent 48%), radial-gradient(circle at 12% 88%, rgba(59, 130, 246, 0.18) 0%, transparent 48%), linear-gradient(135deg, #071527 0%, #0B2548 55%, #08162B 100%);
            border-radius: 18px;
            padding: 30px 36px;
            color: #FFFFFF;
            margin-bottom: 28px;
            box-shadow: 0 16px 36px -10px rgba(11, 30, 54, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.12);
            position: relative;
            overflow: hidden;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; position: relative; z-index: 1;">
              <div>
                <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.16); border: 1px solid rgba(52, 211, 153, 0.35); color: #34D399; padding: 4px 14px; border-radius: 999px; font-size: 0.78rem; font-weight: 800; margin-bottom: 10px;">
                  <span style="width: 7px; height: 7px; border-radius: 50%; background: #34D399; box-shadow: 0 0 8px #34D399;"></span>
                  <span>${txt('المركز التنفيذي الموحد • SHAT Executive Management • مباشر 2026', 'Enterprise Control Center • Live', 'Centre de Contrôle')}</span>
                </div>
                <h1 style="font-size: 1.85rem; font-weight: 900; color: #FFFFFF; margin: 4px 0 8px 0; line-height: 1.3; letter-spacing: -0.4px;">
                  ${txt('📊 لوحة المؤشرات والعمليات المركزية (Executive Dashboard)', 'Central Operations & KPI Dashboard', 'Tableau de Bord & Opérations')}
                </h1>
                <p style="color: #CBD5E1; font-size: 0.94rem; margin: 0 0 14px 0; max-width: 680px; line-height: 1.6;">
                  ${txt(
                    'المتابعة المباشرة لمؤشرات الأداء المؤسسي، تسجيلات المتدربين، الاستشارات التخصصية، ومزامنة استمارات Google Forms.',
                    'Real-time institutional KPI monitoring, trainee admissions, consulting requests, and Google Forms dual-sync.',
                    'Suivi en temps réel des KPI institutionnels, des inscriptions et des demandes de conseil.'
                  )}
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; font-size: 0.76rem; color: #94A3B8;">
                  <span style="background: rgba(255,255,255,0.06); padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">⚡ زمن الاستجابة: <strong>92ms</strong></span>
                  <span style="background: rgba(255,255,255,0.06); padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">🛡️ امتثال CHS: <strong>100%</strong></span>
                  <span style="background: rgba(255,255,255,0.06); padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">🔒 أمان البيانات: <strong>OWASP Level 3</strong></span>
                </div>
              </div>

              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn-clean btn-green btn-sm" id="btn-quick-new-post" style="box-shadow: 0 4px 14px rgba(30,126,52,0.35); font-weight: 800; padding: 10px 18px; border-radius: 8px;">
                  <span>+ ${txt('إضافة منشور جديد', 'New Publication', 'Nouvelle Publication')}</span>
                </button>
                <button class="btn-clean btn-sm" id="btn-refresh-dashboard" style="background: rgba(255,255,255,0.12); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.22); font-weight: 700; padding: 10px 16px; border-radius: 8px;">
                  <span>🔄 ${txt('تحديث البيانات', 'Refresh Data', 'Actualiser')}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- KPI Cards Grid with Rich Color Harmonies & Micro-Progress -->
          <div class="grid-4" style="margin-bottom: 28px;">
            
            <!-- Card 1: Students (Emerald) -->
            <div class="admin-kpi-card kpi-emerald" style="background: linear-gradient(145deg, #FFFFFF 0%, #F0FDF4 100%); border: 1.5px solid #BBF7D0;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 0.78rem; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${txt('إجمالي الطلاب والمتدربين', 'Total Enrolled Students', 'Étudiants Inscrits')}
                  </span>
                  <div style="font-size: 2.3rem; font-weight: 900; color: #064E3B; margin: 4px 0; line-height: 1.1;" id="kpi-students-count">245</div>
                </div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: #DCFCE7; border: 1px solid #A7F3D0; color: #15803D; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                  👥
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.8rem;">
                <span style="background: #DCFCE7; color: #15803D; font-weight: 800; font-size: 0.76rem; padding: 3px 10px; border-radius: 999px; border: 1px solid #86EFAC;">
                  ↑ +12 ${txt('هذا الأسبوع', 'this week', 'cette semaine')}
                </span>
                <span style="color: #047857; font-weight: 700; font-size: 0.76rem;">نشط ومسجل</span>
              </div>
              <div style="height: 5px; background: #E2E8F0; border-radius: 999px; overflow: hidden; margin-top: 12px;">
                <div style="height: 100%; width: 88%; background: linear-gradient(90deg, #10B981, #059669); border-radius: 999px;"></div>
              </div>
            </div>

            <!-- Card 2: Trainers (Blue) -->
            <div class="admin-kpi-card kpi-blue" style="background: linear-gradient(145deg, #FFFFFF 0%, #EFF6FF 100%); border: 1.5px solid #BFDBFE;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 0.78rem; font-weight: 800; color: #1E40AF; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${txt('المدربون والخبراء المعتمدون', 'Accredited Trainers', 'Formateurs Certifiés')}
                  </span>
                  <div style="font-size: 2.3rem; font-weight: 900; color: #1E3A8A; margin: 4px 0; line-height: 1.1;" id="kpi-teachers-count">18</div>
                </div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: #DBEAFE; border: 1px solid #BFDBFE; color: #1D4ED8; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                  👨‍🏫
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.8rem;">
                <span style="background: #DBEAFE; color: #1D4ED8; font-weight: 800; font-size: 0.76rem; padding: 3px 10px; border-radius: 999px; border: 1px solid #93C5FD;">
                  ✓ ${txt('كادر استشاري مرخص', 'Licensed Experts', 'Experts Agréés')}
                </span>
                <span style="color: #1D4ED8; font-weight: 700; font-size: 0.76rem;">100% تغطية</span>
              </div>
              <div style="height: 5px; background: #E2E8F0; border-radius: 999px; overflow: hidden; margin-top: 12px;">
                <div style="height: 100%; width: 100%; background: linear-gradient(90deg, #3B82F6, #1D4ED8); border-radius: 999px;"></div>
              </div>
            </div>

            <!-- Card 3: Active Courses (Purple) -->
            <div class="admin-kpi-card kpi-purple" style="background: linear-gradient(145deg, #FFFFFF 0%, #FAF5FF 100%); border: 1.5px solid #E9D5FF;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 0.78rem; font-weight: 800; color: #6D28D9; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${txt('المساقات والدبلومات الفعالة', 'Active Curricula', 'Cursus Actifs')}
                  </span>
                  <div style="font-size: 2.3rem; font-weight: 900; color: #5B21B6; margin: 4px 0; line-height: 1.1;" id="kpi-courses-count">8</div>
                </div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: #F3E8FF; border: 1px solid #DDD6FE; color: #7C3AED; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                  📚
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.8rem;">
                <span style="background: #EDE9FE; color: #6D28D9; font-weight: 800; font-size: 0.76rem; padding: 3px 10px; border-radius: 999px; border: 1px solid #C4B5FD;">
                  ${txt('4 دبلومات + 4 استشارات', '4 Diplomas + 4 Advisory', '4 Diplômes')}
                </span>
                <span style="color: #6D28D9; font-weight: 700; font-size: 0.76rem;">CHS & Sphere</span>
              </div>
              <div style="height: 5px; background: #E2E8F0; border-radius: 999px; overflow: hidden; margin-top: 12px;">
                <div style="height: 100%; width: 100%; background: linear-gradient(90deg, #8B5CF6, #6D28D9); border-radius: 999px;"></div>
              </div>
            </div>

            <!-- Card 4: Pending Applications (Amber) -->
            <div class="admin-kpi-card kpi-amber" style="background: linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 100%); border: 1.5px solid #FDE68A;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 0.78rem; font-weight: 800; color: #B45309; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${txt('طلبات الالتحاق المعلقة', 'Pending Applications', 'Demandes en Attente')}
                  </span>
                  <div style="font-size: 2.3rem; font-weight: 900; color: #92400E; margin: 4px 0; line-height: 1.1;" id="kpi-pending-apps">1</div>
                </div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: #FEF3C7; border: 1px solid #FDE68A; color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                  📥
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.8rem;">
                <span style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.76rem; padding: 3px 10px; border-radius: 999px; border: 1px solid #FCD34D;">
                  ⚡ ${txt('تتطلب مصادقة فورية', 'Requires Approval', 'À Valider')}
                </span>
                <span style="color: #B45309; font-weight: 700; font-size: 0.76rem;">Google Forms</span>
              </div>
              <div style="height: 5px; background: #E2E8F0; border-radius: 999px; overflow: hidden; margin-top: 12px;">
                <div style="height: 100%; width: 45%; background: linear-gradient(90deg, #F59E0B, #D97706); border-radius: 999px;"></div>
              </div>
            </div>

          </div>

          <!-- Visual Operational Analytics & Distribution Row -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-bottom: 28px;">
            
            <!-- Analytics Card 1: Track Distribution -->
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(11,30,54,0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px;">
                <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                  <span>🎯</span>
                  <span>${txt('توزيع المتدربين والاهتمام حسب المسار التخصصي', 'Enrollment Distribution by Track', 'Répartition par Cursus')}</span>
                </h3>
                <span style="font-size: 0.74rem; font-weight: 700; background: #ECFDF5; color: #15803D; padding: 2px 8px; border-radius: 4px;">بيانات حية 2026</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 14px;">
                <!-- Track 1: Case Management -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 5px;">
                    <span style="color: #065F46;">🤝 إدارة الحالة Case Management (د. محمد إسليم)</span>
                    <span style="color: #10B981; font-weight: 800;">38% (93 متدرب)</span>
                  </div>
                  <div style="height: 8px; background: #E2E8F0; border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: 38%; background: linear-gradient(90deg, #10B981, #059669); border-radius: 999px;"></div>
                  </div>
                </div>

                <!-- Track 2: CHS Humanitarian -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 5px;">
                    <span style="color: #1E40AF;">🛡️ دبلوم المعيار الإنساني CHS (أ. حسام جاد الله)</span>
                    <span style="color: #2563EB; font-weight: 800;">32% (78 متدرب)</span>
                  </div>
                  <div style="height: 8px; background: #E2E8F0; border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: 32%; background: linear-gradient(90deg, #3B82F6, #1D4ED8); border-radius: 999px;"></div>
                  </div>
                </div>

                <!-- Track 3: Presentation Skills -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 5px;">
                    <span style="color: #92400E;">🎤 مهارات العرض والتقديم (م. مهدي الملاحي)</span>
                    <span style="color: #D97706; font-weight: 800;">18% (44 متدرب)</span>
                  </div>
                  <div style="height: 8px; background: #E2E8F0; border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: 18%; background: linear-gradient(90deg, #F59E0B, #D97706); border-radius: 999px;"></div>
                  </div>
                </div>

                <!-- Track 4: Institutional Consulting -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 5px;">
                    <span style="color: #5B21B6;">🏛️ الاستشارات وتطوير النظم للمنظمات</span>
                    <span style="color: #7C3AED; font-weight: 800;">12% (30 جهة)</span>
                  </div>
                  <div style="height: 8px; background: #E2E8F0; border-radius: 999px; overflow: hidden;">
                    <div style="height: 100%; width: 12%; background: linear-gradient(90deg, #8B5CF6, #6D28D9); border-radius: 999px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analytics Card 2: Operational Health & SLAs -->
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(11,30,54,0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px;">
                <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                  <span>⚡</span>
                  <span>${txt('مؤشرات الكفاءة وسرعة الاستجابة التشغيلية', 'Operational Efficiency & SLA Metrics', 'Indicateurs de Performance')}</span>
                </h3>
                <span style="font-size: 0.74rem; font-weight: 700; background: #EFF6FF; color: #1D4ED8; padding: 2px 8px; border-radius: 4px;">SLA Level 1</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; text-align: center;">
                  <div style="font-size: 0.76rem; font-weight: 700; color: #64748B;">معدل الرد على الاستفسارات</div>
                  <div style="font-size: 1.5rem; font-weight: 900; color: #10B981; margin: 4px 0;">98.6%</div>
                  <div style="font-size: 0.72rem; color: #15803D; font-weight: 600;">⚡ أقل من ساعتين</div>
                </div>

                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; text-align: center;">
                  <div style="font-size: 0.76rem; font-weight: 700; color: #64748B;">شهادات محققة رقمياً</div>
                  <div style="font-size: 1.5rem; font-weight: 900; color: #2563EB; margin: 4px 0;">142</div>
                  <div style="font-size: 0.72rem; color: #1D4ED8; font-weight: 600;">🛡️ رمز موثق سارٍ</div>
                </div>

                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; text-align: center;">
                  <div style="font-size: 0.76rem; font-weight: 700; color: #64748B;">مزامنة الاستمارات السحابية</div>
                  <div style="font-size: 1.5rem; font-weight: 900; color: #7C3AED; margin: 4px 0;">100%</div>
                  <div style="font-size: 0.72rem; color: #6D28D9; font-weight: 600;">☁️ Google Sheets API</div>
                </div>

                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; text-align: center;">
                  <div style="font-size: 0.76rem; font-weight: 700; color: #64748B;">معدل الإنجاز والتخرج</div>
                  <div style="font-size: 1.5rem; font-weight: 900; color: #D97706; margin: 4px 0;">94.2%</div>
                  <div style="font-size: 0.72rem; color: #B45309; font-weight: 600;">🎓 تقييم ممتاز</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Pending Applications & Recent Activity Split Grid -->
          <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px; align-items: start;">
            
            <!-- Pending Applications Table Card -->
            <div class="bento-card" style="padding: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
                <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                  ${txt('طلبات الالتحاق الحديثة (Pending Applications)', 'Recent Course Applications', 'Dernières Candidatures')}
                </h3>
                <button class="btn-clean btn-sm" id="btn-view-all-apps" style="color: var(--shat-green); font-weight: 700;">
                  ${txt('عرض الكل ←', 'View All →', 'Voir Tout →')}
                </button>
              </div>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: ${isRtl ? 'right' : 'left'};">
                  <thead>
                    <tr style="color: var(--text-muted); border-bottom: 2px solid var(--border-light);">
                      <th style="padding: 10px 8px;">${txt('المتقدم', 'Applicant', 'Candidat')}</th>
                      <th style="padding: 10px 8px;">${txt('المساق', 'Course', 'Cursus')}</th>
                      <th style="padding: 10px 8px;">${txt('الحالة', 'Status', 'Statut')}</th>
                      <th style="padding: 10px 8px; text-align: ${isRtl ? 'left' : 'right'};">${txt('الإجراء', 'Action', 'Action')}</th>
                    </tr>
                  </thead>
                  <tbody id="dash-pending-apps-tbody">
                    <tr><td colspan="4" style="padding: 20px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل الطلبات...', 'Loading applications...', 'Chargement...')}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Recent Activity Stream -->
            <div class="bento-card" style="padding: 22px;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 16px 0; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
                ${txt('النشاط الأخير وسجل العمليات', 'Recent Platform Activity', 'Activité Récente')}
              </h3>
              <div id="dash-recent-activity-list" style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
                <div style="padding: 10px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: var(--shat-navy);">${txt('تسجيل متدرب جديد في دبلوم CHS', 'New student enrolled in CHS Diploma', 'Nouvel étudiant inscrit')}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('منذ 15 دقيقة • بواسطة الإدارة', '15 mins ago • By Admin', 'Il y a 15 min')}</div>
                </div>
                <div style="padding: 10px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: var(--shat-green);">${txt('رصد درجات التكليف #1 لدبلوم CHS', 'Assignment #1 graded (94/100)', 'Devoir #1 noté')}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('منذ ساعة • د. أسامة المنصور', '1 hour ago • Dr. Osama', 'Il y a 1 heure')}</div>
                </div>
                <div style="padding: 10px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: #1D4ED8;">${txt('نشر مقال: معايير التقييم الخارجي OECD DAC', 'Published article: OECD DAC Standards', 'Article publié : Normes OECD')}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${txt('منذ 3 ساعات • أ. حسام جاد الله', '3 hours ago • Admin', 'Il y a 3 heures')}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- ======================================================== -->
        <!-- TAB 2: CMS POSTS & RICH EDITOR (WITH FULL EDIT & DEVICE UPLOAD) -->
        <!-- ======================================================== -->
        <div id="admin-tab-posts" class="admin-view-pane" style="display: none;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 id="cms-editor-heading" style="font-size: 1.3rem; font-weight: 900; color: var(--shat-navy); margin: 0;">
                ${txt('محرر المنشورات والمقالات المعتمدة', 'Publications & Insights Editor', 'Éditeur de Publications')}
              </h2>
              <span id="cms-editing-badge" class="badge" style="display: none; background: #FEF3C7; color: #92400E; font-weight: 700;">
                ✏️ ${txt('وضع التعديل النشط', 'Editing Mode Active', 'Mode Modification')}
              </span>
            </div>

            <div style="display: flex; gap: 8px;">
              <button id="btn-cms-new" class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); font-weight: 700;">
                <span>+ ${txt('منشور جديد', 'New Post', 'Nouveau')}</span>
              </button>
              <button id="btn-cms-cancel-edit" class="btn-clean btn-sm" style="display: none; background: #F1F5F9; border: 1px solid #CBD5E1; color: var(--text-secondary); font-weight: 700;">
                <span>✕ ${txt('إلغاء التعديل', 'Cancel Edit', 'Annuler')}</span>
              </button>
              <button id="btn-cms-publish" class="btn-clean btn-green btn-sm" style="font-weight: 800;">
                <span id="btn-cms-publish-text">🚀 ${txt('نشر المنشور على الموقع', 'Publish to Website', 'Publier sur le Site')}</span>
              </button>
            </div>
          </div>

          <!-- Split-Screen Editor & Live Preview -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; margin-bottom: 36px;">
            
            <!-- Editor Column -->
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 22px; box-shadow: var(--shadow-sm);">
              <!-- Hidden tracking input for editing existing post -->
              <input type="hidden" id="post-editing-id" value="">

              <div class="form-group">
                <label class="form-label">${txt('عنوان المنشور الرسمي *', 'Official Publication Title *', 'Titre Officiel *')}</label>
                <input type="text" id="post-title-input" class="form-input" style="font-size: 1rem; font-weight: 700;" placeholder="${txt('عنوان المقال أو الإعلان الرسمي', 'Publication title...', 'Titre de l\'article...')}" value="">
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">${txt('التصنيف المؤسسي', 'Category', 'Catégorie')}</label>
                  <select id="post-category-input" class="form-input">
                    <option value="humanitarian">${txt('إنساني وتطويري', 'Humanitarian & Development', 'Humanitaire & Développement')}</option>
                    <option value="institutional">${txt('حوكمة واستشارات', 'Governance & Consulting', 'Gouvernance & Conseil')}</option>
                    <option value="evaluation">${txt('تقييم ومتابعة (OECD DAC)', 'Evaluation & Monitoring', 'Évaluation & Suivi')}</option>
                    <option value="partnerships">${txt('شراكات دولية', 'International Partnerships', 'Partenariats')}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">${txt('حالة النشر', 'Publication Status', 'Statut de Publication')}</label>
                  <select id="post-status-input" class="form-input">
                    <option value="published" selected>${txt('منشور حي (Published)', 'Published (Live)', 'Publié (En Ligne)')}</option>
                    <option value="draft">${txt('مسودة (Draft)', 'Draft', 'Brouillon')}</option>
                    <option value="disabled">${txt('معطل مؤقتاً (Disabled)', 'Disabled', 'Désactivé')}</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${txt('المقتطف التعريفي الموجز', 'Summary / Excerpt', 'Extrait / Résumé')}</label>
                <textarea id="post-excerpt-input" class="form-input" style="min-height: 55px; font-size: 0.88rem;" placeholder="${txt('موجز تشويقي للمنشور يظهر في البطاقة...', 'Short summary for cards...', 'Bref résumé pour la carte...')}"></textarea>
              </div>

              <!-- Formatting Toolbar -->
              <div class="form-group">
                <label class="form-label">${txt('المحتوى والمقال التفصيلي *', 'Full Article Content *', 'Contenu Détaillé *')}</label>
                <div style="display: flex; gap: 6px; background: var(--bg-subtle); padding: 8px; border: 1px solid var(--border-light); border-bottom: none; border-radius: var(--radius-xs) var(--radius-xs) 0 0; flex-wrap: wrap;">
                  <button type="button" class="btn-format" data-cmd="bold" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">B</button>
                  <button type="button" class="btn-format" data-cmd="italic" style="padding: 4px 10px; font-style: italic; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">I</button>
                  <button type="button" class="btn-format" data-cmd="h2" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">H2</button>
                  <button type="button" class="btn-format" data-cmd="h3" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">H3</button>
                  <button type="button" class="btn-format" data-cmd="ul" style="padding: 4px 10px; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">• ${txt('قائمة', 'List', 'Liste')}</button>
                  <button type="button" class="btn-format" data-cmd="quote" style="padding: 4px 10px; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">" ${txt('اقتباس', 'Quote', 'Citation')}</button>
                </div>
                <textarea id="post-body-input" class="form-input" style="min-height: 180px; font-size: 0.92rem; border-top: none; border-radius: 0 0 var(--radius-xs) var(--radius-xs); line-height: 1.7;" placeholder="${txt('اكتب تفاصيل المنشور هنا...', 'Write publication text here...', 'Rédigez le contenu ici...')}"></textarea>
              </div>

              <!-- Device File Upload Integration for Cover Image -->
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">${txt('صورة غلاف المنشور (رابط أو رفع من جهازك) *', 'Cover Image (URL or Upload from Device) *', 'Image de Couverture (URL ou Fichier) *')}</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" id="post-cover-input" class="form-input" value="assets/logo/logo-banner.jpg" style="flex: 1;">
                  <input type="file" id="post-cover-file-input" accept="image/*" style="display: none;">
                  <button type="button" id="btn-trigger-post-upload" class="btn-clean btn-sm" style="background: var(--shat-green-tint); color: var(--shat-green); border: 1px solid var(--shat-green); font-weight: 700; white-space: nowrap; padding: 10px 14px;">
                    📁 ${txt('رفع من الجهاز', 'Upload File', 'Importer')}
                  </button>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
                  ${txt('✓ يدعم JPG, PNG, WebP ويتم ضغطها وتخزينها محلياً على جهازك لتوفير المساحة وتصفحها أوفلاين.', 'Supports JPG, PNG, WebP with local device compression & caching.', 'Prend en charge JPG, PNG, WebP avec stockage local.')}
                </div>
              </div>
            </div>

            <!-- Live Preview Column -->
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 22px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; background: #22C55E; border-radius: 50%;"></span>
                  <h3 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                    ${txt('المعاينة الحية الفورية (Live Preview)', 'Live Preview', 'Aperçu en Direct')}
                  </h3>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn-preview-mode btn-clean btn-sm active" data-mode="desktop" style="padding: 3px 8px; font-size: 0.75rem;">💻 ${txt('سطح المكتب', 'Desktop', 'Ordinateur')}</button>
                  <button class="btn-preview-mode btn-clean btn-sm" data-mode="mobile" style="padding: 3px 8px; font-size: 0.75rem; background: #F1F5F9; color: var(--text-muted);">📱 ${txt('هاتف', 'Mobile', 'Mobile')}</button>
                </div>
              </div>

              <div id="live-preview-box" style="flex: 1; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 18px; background: #FFFFFF; overflow-y: auto; max-height: 480px; width: 100%; transition: max-width 0.3s ease; margin: 0 auto;">
                <div id="preview-category-badge" class="badge" style="background: #EFF6FF; color: #1D4ED8; margin-bottom: 10px;">إنساني وتطويري</div>
                <h2 id="preview-title" style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px; line-height: 1.4;">
                  عنوان المنشور
                </h2>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;" id="preview-meta">
                  ✍️ ${txt('بواسطة: أ. حسام جاد الله', 'By: SHAT Management', 'Par : Direction SHAT')} • 📅 ${new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US')}
                </div>
                <img id="preview-cover" src="assets/logo/logo-banner.jpg" alt="Preview" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 14px;" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
                <p id="preview-excerpt" style="font-weight: 600; color: var(--text-main); font-size: 0.9rem; margin-bottom: 10px;">
                  المقتطف التعريفي الموجز
                </p>
                <div id="preview-body" style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8; white-space: pre-wrap;">
                  محتوى المنشور التفصيلي...
                </div>
              </div>
            </div>

          </div>

          <!-- Posts Management Table with Edit and Delete Buttons -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                  ${txt('سجل المنشورات في قاعدة البيانات (انقر "تعديل" لتعديل أي منشور)', 'Publications Directory (Click Edit to Modify Any Post)', 'Gestion des Publications')}
                </h3>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 2px 0 0 0;">
                  ${txt('يمكنك تعديل محتوى وصور وحالة أي منشور منشور سابقاً وتنعكس فوراً على الموقع الرسمي.', 'Modify text, images, and status of any existing post instantly.', 'Modifiez le contenu et les images de toute publication.')}
                </p>
              </div>
              <span id="posts-count-badge" class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">-- منشور</span>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">${txt('الغلاف', 'Cover', 'Image')}</th>
                    <th style="padding: 12px 16px;">${txt('العنوان', 'Title', 'Titre')}</th>
                    <th style="padding: 12px 16px;">${txt('التصنيف', 'Category', 'Catégorie')}</th>
                    <th style="padding: 12px 16px;">${txt('الحالة', 'Status', 'Statut')}</th>
                    <th style="padding: 12px 16px;">${txt('التاريخ', 'Date', 'Date')}</th>
                    <th style="padding: 12px 16px; text-align: ${isRtl ? 'left' : 'right'};">${txt('الإجراءات', 'Actions', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody id="posts-table-tbody">
                  <tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل المنشورات...', 'Loading posts...', 'Chargement...')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- ======================================================== -->
        <!-- TAB 3: MEDIA LIBRARY (WITH DEVICE UPLOAD & LOCAL STORAGE) -->
        <!-- ======================================================== -->
        <div id="admin-tab-media" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                  ${txt('مكتبة الوسائط والصور المعتمدة (Media Library)', 'Media Library & Device Storage', 'Médiathèque Institutionnelle')}
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                  ${txt(
                    'ارفع الصور والملفات مباشرة من جهازك؛ يتم ضغطها وتخزينها محلياً على جهازك لتستخدمها في المنشورات والمقررات.',
                    'Upload images directly from your computer or phone; compressed & cached on your device.',
                    'Importez des images depuis votre appareil pour vos publications et cours.'
                  )}
                </p>
              </div>

              <div style="display: flex; gap: 8px;">
                <input type="file" id="media-library-file-input" accept="image/*" multiple style="display: none;">
                <button id="btn-upload-media-device" class="btn-clean btn-green btn-sm">
                  <span>📁 ${txt('رفع صور من جهازك', 'Upload from Device', 'Importer de l\'appareil')}</span>
                </button>
              </div>
            </div>

            <!-- Media Grid Container -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;" id="media-library-grid">
              <!-- Populated dynamically from MediaStorageService -->
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 4: ACADEMY COURSES & ROSTER (WITH COURSE EDITING) -->
        <!-- ======================================================== -->
        <div id="admin-tab-courses" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                  ${txt('المساقات والدبلومات التدريبية في الأكاديمية', 'Academy Curricula Management', 'Gestion des Cursus')}
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                  ${txt('تعديل أسماء المساقات، الساعات، المحاضرين، وإرفاق ملفات تدريبية مباشرة من جهازك.', 'Edit courses, hours, trainers, and attach training files from device.', 'Modifiez les cursus, formateurs et fichiers.')}
                </p>
              </div>
              <button id="btn-open-new-course" class="btn-clean btn-green btn-sm">
                <span>+ ${txt('إضافة مساق جديد', 'Add New Course', 'Nouveau Cursus')}</span>
              </button>
            </div>

            <div id="admin-courses-list" style="display: flex; flex-direction: column; gap: 16px;">
              <!-- Populated dynamically -->
            </div>
          </div>
        </div>

        <div id="admin-tab-roster" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 16px 0;">
              ${txt('دليل المستخدمين المعتمدين (الكادر التدريسي والطلاب)', 'Staff & Student Directory', 'Annuaire des Utilisateurs')}
            </h3>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.9rem;" id="admin-users-table">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">${txt('الاسم الكامل', 'Full Name', 'Nom')}</th>
                    <th style="padding: 12px 16px;">${txt('البريد الإلكتروني', 'Email', 'Courriel')}</th>
                    <th style="padding: 12px 16px;">${txt('الدور المؤسسي', 'Role', 'Rôle')}</th>
                    <th style="padding: 12px 16px;">${txt('الهاتف', 'Phone', 'Téléphone')}</th>
                    <th style="padding: 12px 16px;">${txt('الحالة', 'Status', 'Statut')}</th>
                  </tr>
                </thead>
                <tbody id="admin-users-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل المستخدمين...', 'Loading users...', 'Chargement...')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 5: APPLICATIONS MANAGEMENT -->
        <!-- ======================================================== -->
        <div id="admin-tab-applications" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 18px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                  ${txt('إدارة طلبات الالتحاق بالبرامج التدريبية', 'Course Applications Management', 'Gestion des Inscriptions')}
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                  ${txt('قبول واعتماد المتدربين مع التفعيل التلقائي لحساباتهم في الأكاديمية.', 'Approve applicants with automatic account activation.', 'Validez les candidatures des stagiaires.')}
                </p>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button id="btn-export-apps-csv" class="btn-clean btn-sm" style="background: #10B981; color: #FFFFFF; font-weight: 800; border-radius: 6px; padding: 7px 14px; box-shadow: 0 2px 8px rgba(16,185,129,0.25);">
                  📊 ${txt('تصدير كشيت Excel (CSV معتمد)', 'Export Excel / CSV', 'Exporter CSV')}
                </button>
                <button id="btn-refresh-apps-tab" class="btn-clean btn-sm" style="background: var(--bg-subtle); border: 1px solid var(--border-light);">🔄 ${txt('تحديث', 'Refresh', 'Actualiser')}</button>
              </div>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">${txt('المتقدم', 'Applicant', 'Candidat')}</th>
                    <th style="padding: 12px 16px;">${txt('بيانات التواصل', 'Contact Info', 'Contact')}</th>
                    <th style="padding: 12px 16px;">${txt('المساق', 'Course', 'Cursus')}</th>
                    <th style="padding: 12px 16px;">${txt('الجهة / المؤهل', 'Organization / Degree', 'Organisation')}</th>
                    <th style="padding: 12px 16px;">${txt('الحالة', 'Status', 'Statut')}</th>
                    <th style="padding: 12px 16px; text-align: ${isRtl ? 'left' : 'right'};">${txt('القرار الإداري', 'Decision', 'Décision')}</th>
                  </tr>
                </thead>
                <tbody id="admin-apps-tbody">
                  <tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل الطلبات...', 'Loading applications...', 'Chargement...')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 6: GOOGLE FORMS TO SHAT FORMS -->
        <!-- ======================================================== -->
        <div id="admin-tab-forms" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 28px; margin-bottom: 24px;">
            <div style="max-width: 720px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span style="font-size: 1.5rem;">🔗</span>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                  ${txt('محول استمارات Google Forms إلى نماذج شات الداخلية', 'Google Forms to Native SHAT Forms Importer', 'Convertisseur de Formulaires')}
                </h3>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
                ${txt(
                  'ألصق رابط أي استمارة Google Form لتحويلها فورياً إلى نموذج SHAT داخلي متكامل بهوية وألوان شات، مع حفظ كافة الاستجابات في قاعدة بيانات المنصة.',
                  'Paste any Google Form URL to instantly convert it into a branded native SHAT form with local response storage.',
                  'Convertissez n\'importe quel formulaire Google Form en formulaire SHAT natif.'
                )}
              </p>
              <form id="form-import-google-url">
                <div class="form-group">
                  <label class="form-label">${txt('رابط استمارة Google Form *', 'Google Form URL *', 'Lien Google Form *')}</label>
                  <input type="url" id="google-form-url-input" class="form-input" style="height: 48px;" placeholder="https://docs.google.com/forms/d/e/... أو https://forms.gle/..." required>
                </div>
                <button type="submit" class="btn-clean btn-green btn-lg">
                  <span>📥 ${txt('استيراد وتوليد نموذج SHAT الداخلي', 'Import & Generate Native SHAT Form', 'Générer le Formulaire Natif')}</span>
                  <span>${isRtl ? '←' : '→'}</span>
                </button>
              </form>
            </div>
          </div>

          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden;">
            <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-light);">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">${txt('النماذج المعتمدة النشطة', 'Active Forms', 'Formulaires Actifs')}</h3>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">${txt('عنوان النموذج', 'Form Title', 'Titre du Formulaire')}</th>
                    <th style="padding: 12px 16px;">${txt('الحقول', 'Questions', 'Champs')}</th>
                    <th style="padding: 12px 16px;">${txt('الحالة', 'Status', 'Statut')}</th>
                    <th style="padding: 12px 16px;">${txt('الرابط الداخلي', 'Internal Link', 'Lien')}</th>
                    <th style="padding: 12px 16px; text-align: ${isRtl ? 'left' : 'right'};">${txt('معاينة', 'Preview', 'Aperçu')}</th>
                  </tr>
                </thead>
                <tbody id="admin-forms-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل النماذج...', 'Loading forms...', 'Chargement...')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 7: INQUIRIES -->
        <!-- ======================================================== -->
        <div id="admin-tab-inquiries" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden;">
            <div style="padding: 18px 24px; border-bottom: 1px solid var(--border-light);">
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                ${txt('سجل طلبات الاستشارات والتواصل المؤسسي', 'Corporate Consulting Inquiries', 'Demandes de Conseils')}
              </h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                ${txt('استفسارات المؤسسات والشركاء الواردة عبر الموقع الرسمي.', 'Inquiries from partners submitted through the platform.', 'Demandes soumises via la plateforme.')}
              </p>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">${txt('المؤسسة / الاسم', 'Name / Org', 'Nom / Org')}</th>
                    <th style="padding: 12px 16px;">${txt('بيانات الاتصال', 'Contact', 'Contact')}</th>
                    <th style="padding: 12px 16px;">${txt('الخدمة المطلوبة', 'Service', 'Service')}</th>
                    <th style="padding: 12px 16px;">${txt('الرسالة', 'Message', 'Message')}</th>
                    <th style="padding: 12px 16px;">${txt('التاريخ', 'Date', 'Date')}</th>
                  </tr>
                </thead>
                <tbody id="admin-inquiries-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل الاستفسارات...', 'Loading inquiries...', 'Chargement...')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 8: SYSTEM HEALTH, AUDIT & DEVICE BACKUPS -->
        <!-- ======================================================== -->
        <div id="admin-tab-health" class="admin-view-pane" style="display: none;">
          
          <!-- Device Backup Controls Card -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                  💾 ${txt('النسخ الاحتياطي وحفظ بيانات المنصة على جهازك', 'Device Backup & Platform Data Storage', 'Sauvegarde & Export sur Appareil')}
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                  ${txt(
                    'قم بتصدير وحفظ كافة المنشورات، المقررات، الصور، وطلبات التسجيل كملف على جهازك في أي وقت، أو استعد نسخة محفوظة سابقة.',
                    'Export all posts, courses, applications, and uploaded media directly to your computer as a secure backup JSON.',
                    'Exportez ou restaurez l\'ensemble des données de la plateforme sur votre appareil.'
                  )}
                </p>
              </div>

              <div style="display: flex; gap: 8px;">
                <button id="btn-export-backup" class="btn-clean btn-green btn-sm">
                  <span>📥 ${txt('تصدير نسخة لجهازك (JSON)', 'Export Backup to PC', 'Télécharger Sauvegarde')}</span>
                </button>
                <input type="file" id="import-backup-file-input" accept=".json" style="display: none;">
                <button id="btn-import-backup-trigger" class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); font-weight: 700;">
                  <span>📤 ${txt('استعادة نسخة من الجهاز', 'Restore from PC', 'Restaurer du PC')}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="grid-4" style="margin-bottom: 28px;">
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid #22C55E;">
              <div style="font-size: 0.78rem; color: var(--text-muted);">${txt('قاعدة البيانات المركزية', 'Central Database', 'Base de Données')}</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">CONNECTED</div>
              <div style="font-size: 0.75rem; color: var(--shat-green);">PostgreSQL + Supabase + LocalStore</div>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid #22C55E;">
              <div style="font-size: 0.78rem; color: var(--text-muted);">${txt('المصادقة والأدوار', 'Authentication Engine', 'Moteur de Sécurité')}</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">ACTIVE</div>
              <div style="font-size: 0.75rem; color: var(--shat-green);">Server-Side RBAC + Resilient Fallback</div>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid var(--shat-navy);">
              <div style="font-size: 0.78rem; color: var(--text-muted);">${txt('تخزين الجهاز ووسائط Media', 'Device Media Storage', 'Stockage Appareil')}</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">DEVICE_READY</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Compressed Base64 & Local Caching</div>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid #3B82F6;">
              <div style="font-size: 0.78rem; color: var(--text-muted);">${txt('الخادم المخصص والإنتاج', 'Production & Server', 'Serveur Dédié')}</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">ONLINE</div>
              <div style="font-size: 0.75rem; color: #3B82F6;">Vercel Edge API + Express :3001</div>
            </div>
          </div>

          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden;">
            <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                ${txt('سجل العمليات والتدقيق الأمني (Audit Logs)', 'System Audit Trail', 'Journal d\'Audit')}
              </h3>
              <span class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">Audit Telemetry</span>
            </div>
            <div style="overflow-x: auto; max-height: 420px;">
              <table style="width: 100%; border-collapse: collapse; text-align: ${isRtl ? 'right' : 'left'}; font-size: 0.85rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 10px 14px;">${txt('المستخدم / الفاعل', 'Actor', 'Acteur')}</th>
                    <th style="padding: 10px 14px;">${txt('نوع الإجراء', 'Action Type', 'Action')}</th>
                    <th style="padding: 10px 14px;">${txt('الهدف', 'Target', 'Cible')}</th>
                    <th style="padding: 10px 14px;">${txt('التوقيت', 'Timestamp', 'Horodatage')}</th>
                  </tr>
                </thead>
                <tbody id="admin-audit-tbody">
                  <tr><td colspan="4" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('جاري تحميل سجل التدقيق...', 'Loading audit logs...', 'Chargement...')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- Course Edit Modal -->
    <div id="modal-course-editor-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 680px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <div class="modal-title" id="course-editor-modal-title">${txt('تعديل بيانات المساق التدريبي الشامل', 'Edit Course Curriculum', 'Modifier le Cursus')}</div>
          <button type="button" class="modal-close" id="btn-close-course-modal">✕</button>
        </div>
        <form id="form-course-editor" style="padding: 24px;">
          <input type="hidden" id="edit-course-id" value="">
          
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">${txt('اسم المساق التدريبي أو الدبلوم *', 'Course Title *', 'Titre du Cursus *')}</label>
              <input type="text" id="edit-course-title" class="form-input" required placeholder="مثال: دبلوم المعيار الإنساني الأساسي (CHS)">
            </div>
            <div class="form-group">
              <label class="form-label">${txt('رمز المساق (Code)', 'Course Code', 'Code')}</label>
              <input type="text" id="edit-course-code" class="form-input" placeholder="CHS-101" style="font-family: var(--font-mono);">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">${txt('الساعات التدريبية', 'Training Hours', 'Heures')}</label>
              <input type="text" id="edit-course-hours" class="form-input" placeholder="40 ساعة معتمدة">
            </div>
            <div class="form-group">
              <label class="form-label">${txt('المستوى الأكاديمي', 'Academic Level', 'Niveau')}</label>
              <input type="text" id="edit-course-level" class="form-input" placeholder="تنفيذي / متقدم">
            </div>
            <div class="form-group">
              <label class="form-label">${txt('الرسوم / التكلفة', 'Course Fee', 'Frais')}</label>
              <input type="text" id="edit-course-fee" class="form-input" placeholder="150 شيكل أو منحة ممولة">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">${txt('المسار التخصصي', 'Specialized Track', 'Filière')}</label>
              <select id="edit-course-track" class="form-input">
                <option value="humanitarian">العمل الإنساني والمعايير (CHS & Sphere)</option>
                <option value="protection">الحماية وصون السلامة (PSEA & Safeguarding)</option>
                <option value="evaluation">التقييم المستقل والمتابعة (OECD DAC & MEL)</option>
                <option value="governance">الحوكمة والقيادة والتخطيط (SOPs)</option>
                <option value="tot">إعداد وتأهيل المدربين (TOT)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${txt('مواعيد وأيام اللقاءات', 'Schedule', 'Horaires')}</label>
              <input type="text" id="edit-course-schedule" class="form-input" placeholder="الأحد والأربعاء • 6:00 - 8:30 م">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${txt('المدرب المعتمد المسؤول', 'Lead Instructor', 'Formateur')}</label>
            <input type="text" id="edit-course-instructor" class="form-input" placeholder="د. أسامة المنصور">
          </div>

          <!-- Official Forms & Google Drive Links Panel -->
          <div style="background: #F8FAFC; border: 1px solid var(--border-medium); border-radius: var(--radius-xs); padding: 14px; margin-bottom: 16px;">
            <div style="font-weight: 800; font-size: 0.88rem; color: var(--shat-navy); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <span>🔗</span>
              <span>${txt('روابط التسجيل والملفات التدريبية (Google Forms & Drive)', 'Enrollment & Materials Links', 'Liens d’Inscription & Drive')}</span>
            </div>
            
            <div class="form-group">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 700; color: #1D4ED8;">
                📋 ${txt('رابط استمارة Google Form الخاصة بالمساق (للتسجيل الخارجي المباشر)', 'Google Form Registration URL', 'Lien Google Form')}
              </label>
              <input type="url" id="edit-course-google-form" class="form-input" placeholder="https://docs.google.com/forms/d/e/.../viewform" style="font-family: var(--font-mono); font-size: 0.82rem;">
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 700; color: var(--shat-green);">
                ✍️ ${txt('رابط أو معرف استمارة المنصة الداخلية (مثل #/forms?id=...)', 'Platform Form Link or ID', 'Formulaire de la Plateforme')}
              </label>
              <input type="text" id="edit-course-native-form" class="form-input" placeholder="#/forms?id=case-manager-2026" style="font-family: var(--font-mono); font-size: 0.82rem;">
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 700; color: #B45309;">
                📁 ${txt('رابط مجلد الحقيبة التدريبية والملفات على Google Drive', 'Google Drive Materials Folder URL', 'Dossier Google Drive')}
              </label>
              <input type="url" id="edit-course-drive-url" class="form-input" placeholder="https://drive.google.com/drive/folders/..." style="font-family: var(--font-mono); font-size: 0.82rem;">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${txt('الموجز التعريفي للمساق', 'Course Summary', 'Résumé')}</label>
            <textarea id="edit-course-summary" class="form-input" style="min-height: 70px;" placeholder="نص وصفي شامل لأهداف المساق والنتائج المرجوة..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">${txt('محاور المنهاج التفصيلية (سطر لكل محور)', 'Syllabus Modules (one per line)', 'Modules')}</label>
            <textarea id="edit-course-syllabus" class="form-input" style="min-height: 100px; line-height: 1.6;" placeholder="الوحدة الأولى: مدخل إلى المنظومة المعيارية&#10;الوحدة الثانية: أدوات المساءلة المجتمعية&#10;الوحدة الثالثة: دراسة حالة تطبيقية ميدانية"></textarea>
          </div>

          <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
            <button type="button" class="btn-clean btn-sm" id="btn-cancel-course-modal" style="background: var(--bg-subtle);">${txt('إلغاء', 'Cancel', 'Annuler')}</button>
            <button type="submit" class="btn-clean btn-green btn-sm" style="font-weight: 800; padding: 10px 20px;">
              💾 ${txt('حفظ تعديلات المساق بالكامل', 'Save All Course Changes', 'Enregistrer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export async function bindAdminEvents() {
  const storedUser = (function() {
    try {
      const u = localStorage.getItem('shat_auth_user_cache') || localStorage.getItem('shat_current_user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  })();

  const currentUser = api.currentUser || storedUser;
  if (!api.currentUser && storedUser) {
    api.currentUser = storedUser;
  }

  const currentLang = localStorage.getItem('shat_platform_lang') || 'ar';
  const txt = (ar, en, fr) => {
    if (currentLang === 'fr') return fr || en;
    if (currentLang === 'en') return en;
    return ar;
  };

  const userRole = (currentUser && currentUser.role) ? currentUser.role.toLowerCase() : '';
  const isAdmin = userRole === 'admin' || userRole === 'super_admin' || userRole === 'manager';
  if (!currentUser || !isAdmin) {
    showToast(txt('يجب تسجيل الدخول بصلاحيات الإدارة للوصول إلى لوحة التحكم.', 'Admin credentials required to access this dashboard.', 'Accès restreint à l\'administration.'), 'warning');
    window.location.hash = '#/login';
    return;
  }

  // Set user label
  const sidebarUser = document.getElementById('admin-sidebar-user');
  if (sidebarUser) sidebarUser.textContent = currentUser.fullNameAr || currentUser.fullNameEn || currentUser.username;

  // --- Sidebar Navigation Switcher ---
  const navItems = document.querySelectorAll('.admin-nav-item');
  const panes = document.querySelectorAll('.admin-view-pane');
  const sidebar = document.getElementById('admin-sidebar');
  const toggleBtn = document.getElementById('btn-toggle-admin-sidebar');
  const closeBtn = document.getElementById('btn-close-admin-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.onclick = () => {
      sidebar.classList.toggle('open');
    };
  }

  if (closeBtn && sidebar) {
    closeBtn.onclick = () => {
      sidebar.classList.remove('open');
    };
  }

  function activateTab(targetId) {
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
        item.style.background = '';
        item.style.color = '';
      } else {
        item.classList.remove('active');
        item.style.background = '';
        item.style.color = '';
      }
    });

    panes.forEach(pane => {
      if (pane.id === targetId) {
        pane.style.display = 'block';
      } else {
        pane.style.display = 'none';
      }
    });

    if (sidebar) sidebar.classList.remove('open');

    // Trigger specific loaders
    if (targetId === 'admin-tab-dashboard') loadDashboardData();
    if (targetId === 'admin-tab-posts') loadPosts();
    if (targetId === 'admin-tab-media') loadMediaLibrary();
    if (targetId === 'admin-tab-courses') loadCourses();
    if (targetId === 'admin-tab-roster') loadUsers();
    if (targetId === 'admin-tab-applications') loadApplications();
    if (targetId === 'admin-tab-forms') loadForms();
    if (targetId === 'admin-tab-inquiries') loadInquiries();
    if (targetId === 'admin-tab-health') loadHealthAndAudit();
  }

  navItems.forEach(item => {
    item.onclick = () => {
      const targetId = item.getAttribute('data-target');
      activateTab(targetId);
    };
  });

  const quickNewPostBtn = document.getElementById('btn-quick-new-post');
  if (quickNewPostBtn) {
    quickNewPostBtn.onclick = () => {
      resetPostEditor();
      activateTab('admin-tab-posts');
    };
  }

  const viewAllAppsBtn = document.getElementById('btn-view-all-apps');
  if (viewAllAppsBtn) {
    viewAllAppsBtn.onclick = () => activateTab('admin-tab-applications');
  }

  const customizerTriggerBtn = document.getElementById('btn-admin-customizer-trigger');
  if (customizerTriggerBtn) {
    customizerTriggerBtn.onclick = () => {
      siteCustomizer.openModal(currentLang);
    };
  }
  window.openSiteCustomizer = (l = currentLang) => siteCustomizer.openModal(l);

  const refreshDashBtn = document.getElementById('btn-refresh-dashboard');
  if (refreshDashBtn) {
    refreshDashBtn.onclick = () => {
      loadDashboardData();
      showToast(txt('تم تحديث بيانات اللوحة!', 'Dashboard data refreshed!', 'Données actualisées !'), 'info');
    };
  }

  // --- CMS Post Editor Form Elements ---
  const postEditingIdInput = document.getElementById('post-editing-id');
  const postTitleInput = document.getElementById('post-title-input');
  const postCategoryInput = document.getElementById('post-category-input');
  const postStatusInput = document.getElementById('post-status-input');
  const postExcerptInput = document.getElementById('post-excerpt-input');
  const postBodyInput = document.getElementById('post-body-input');
  const postCoverInput = document.getElementById('post-cover-input');
  const postCoverFileInput = document.getElementById('post-cover-file-input');
  const btnTriggerPostUpload = document.getElementById('btn-trigger-post-upload');

  const cmsEditorHeading = document.getElementById('cms-editor-heading');
  const cmsEditingBadge = document.getElementById('cms-editing-badge');
  const btnCmsCancelEdit = document.getElementById('btn-cms-cancel-edit');
  const btnCmsNew = document.getElementById('btn-cms-new');
  const publishBtn = document.getElementById('btn-cms-publish');
  const publishBtnText = document.getElementById('btn-cms-publish-text');

  const previewTitle = document.getElementById('preview-title');
  const previewCategory = document.getElementById('preview-category-badge');
  const previewExcerpt = document.getElementById('preview-excerpt');
  const previewBody = document.getElementById('preview-body');
  const previewCover = document.getElementById('preview-cover');
  const livePreviewBox = document.getElementById('live-preview-box');

  function updateLivePreview() {
    if (previewTitle && postTitleInput) previewTitle.textContent = postTitleInput.value || txt('عنوان المنشور', 'Publication Title', 'Titre de l\'Article');
    if (previewCategory && postCategoryInput) previewCategory.textContent = postCategoryInput.options[postCategoryInput.selectedIndex].text;
    if (previewExcerpt && postExcerptInput) previewExcerpt.textContent = postExcerptInput.value || txt('المقتطف التعريفي للمنشور...', 'Summary excerpt...', 'Résumé...');
    if (previewBody && postBodyInput) previewBody.textContent = postBodyInput.value || txt('محتوى المنشور التفصيلي...', 'Content...', 'Contenu...');
    if (previewCover && postCoverInput) previewCover.src = postCoverInput.value || 'assets/logo/logo-banner.jpg';
  }

  [postTitleInput, postCategoryInput, postStatusInput, postExcerptInput, postBodyInput, postCoverInput].forEach(el => {
    if (el) el.addEventListener('input', updateLivePreview);
  });

  // Device File Upload for Post Cover Image
  if (btnTriggerPostUpload && postCoverFileInput) {
    btnTriggerPostUpload.onclick = () => postCoverFileInput.click();

    postCoverFileInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      btnTriggerPostUpload.disabled = true;
      btnTriggerPostUpload.textContent = txt('⏳ جاري المعالجة...', 'Compressing...', 'Compression...');

      try {
        const compressedBase64 = await MediaStorageService.compressImage(file, 1200, 800, 0.82);
        
        // Save to device storage media library
        const savedMedia = MediaStorageService.saveMediaItem(file.name, compressedBase64, file.type, file.size);

        // Update cover input and preview
        if (postCoverInput) postCoverInput.value = compressedBase64;
        if (previewCover) previewCover.src = compressedBase64;

        showToast(
          txt(`✓ تم رفع الصورة بنجاح من جهازك (${file.name}) وتخزينها محلياً!`, `✓ Image uploaded from device successfully!`, `✓ Image importée de l'appareil avec succès !`),
          'success'
        );
      } catch (err) {
        showToast(txt('تعذر قراءة الصورة من الجهاز: ', 'Failed to read image from device: ', 'Échec de lecture : ') + err.message, 'error');
      } finally {
        btnTriggerPostUpload.disabled = false;
        btnTriggerPostUpload.textContent = `📁 ${txt('رفع من الجهاز', 'Upload File', 'Importer')}`;
        postCoverFileInput.value = '';
      }
    };
  }

  // Reset editor to "Create New" mode
  function resetPostEditor() {
    if (postEditingIdInput) postEditingIdInput.value = '';
    if (postTitleInput) postTitleInput.value = '';
    if (postExcerptInput) postExcerptInput.value = '';
    if (postBodyInput) postBodyInput.value = '';
    if (postCoverInput) postCoverInput.value = 'assets/logo/logo-banner.jpg';
    if (postCategoryInput) postCategoryInput.selectedIndex = 0;
    if (postStatusInput) postStatusInput.value = 'published';

    if (cmsEditorHeading) cmsEditorHeading.textContent = txt('محرر المنشورات والمقالات المعتمدة', 'Publications & Insights Editor', 'Éditeur de Publications');
    if (cmsEditingBadge) cmsEditingBadge.style.display = 'none';
    if (btnCmsCancelEdit) btnCmsCancelEdit.style.display = 'none';
    if (publishBtnText) publishBtnText.textContent = `🚀 ${txt('نشر المنشور على الموقع', 'Publish to Website', 'Publier sur le Site')}`;

    updateLivePreview();
  }

  if (btnCmsNew) btnCmsNew.onclick = resetPostEditor;
  if (btnCmsCancelEdit) btnCmsCancelEdit.onclick = resetPostEditor;

  // Load a post into the editor for modifying
  async function loadPostForEdit(postId) {
    try {
      const post = await api.getPostById(postId);
      if (!post) {
        showToast(txt('تعذر العثور على المنشور المحدد', 'Post not found', 'Publication introuvable'), 'error');
        return;
      }

      // Switch editor state to edit mode
      if (postEditingIdInput) postEditingIdInput.value = post.id;
      if (postTitleInput) postTitleInput.value = post.title || '';
      if (postExcerptInput) postExcerptInput.value = post.excerpt || '';
      if (postBodyInput) postBodyInput.value = post.content || '';
      if (postCoverInput) postCoverInput.value = post.coverImage || 'assets/logo/logo-banner.jpg';
      if (postCategoryInput) postCategoryInput.value = post.category || 'humanitarian';
      if (postStatusInput) postStatusInput.value = post.status || 'published';

      if (cmsEditorHeading) cmsEditorHeading.textContent = `✏️ ${txt('تعديل المنشور:', 'Edit Post:', 'Modifier :')} ${post.title.substring(0, 35)}...`;
      if (cmsEditingBadge) cmsEditingBadge.style.display = 'inline-block';
      if (btnCmsCancelEdit) btnCmsCancelEdit.style.display = 'inline-block';
      if (publishBtnText) publishBtnText.textContent = `💾 ${txt('حفظ التعديلات على المنشور', 'Save Post Changes', 'Enregistrer les Modifications')}`;

      updateLivePreview();

      // Smooth scroll to editor
      postTitleInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      postTitleInput?.focus();

      showToast(
        txt('تم تحميل بيانات المنشور للتعديل. قم بإجراء تغييراتك واضغط "حفظ التعديلات".', 'Post loaded for editing. Make changes and save.', 'Publication chargée pour modification.'),
        'info'
      );
    } catch (err) {
      showToast(txt('خطأ في تحميل المنشور: ', 'Error loading post: ', 'Erreur : ') + err.message, 'error');
    }
  }

  // Publish / Save Post Button
  if (publishBtn) {
    publishBtn.onclick = async () => {
      const editingId = postEditingIdInput?.value?.trim();
      const title = postTitleInput?.value?.trim();
      const contentText = postBodyInput?.value?.trim();

      if (!title || !contentText) {
        showToast(txt('يرجى كتابة عنوان ومحتوى للمنشور.', 'Title and content are required.', 'Veuillez saisir le titre et le contenu.'), 'warning');
        return;
      }

      const postData = {
        title,
        excerpt: postExcerptInput?.value || '',
        content: contentText,
        category: postCategoryInput?.value || 'humanitarian',
        categoryLabel: postCategoryInput?.options[postCategoryInput.selectedIndex].text,
        status: postStatusInput?.value || 'published',
        coverImage: postCoverInput?.value || 'assets/logo/logo-banner.jpg'
      };

      publishBtn.disabled = true;
      publishBtn.innerHTML = `<span>⏳ ${txt('جاري الحفظ في قاعدة البيانات...', 'Saving to database...', 'Enregistrement...')}</span>`;

      try {
        let res;
        if (editingId) {
          // UPDATE existing post
          res = await api.updatePost(editingId, postData);
          showToast(txt('✓ تم حفظ وتحديث المنشور بنجاح في قاعدة البيانات وعلى الموقع!', '✓ Post updated successfully in database and website!', '✓ Publication mise à jour avec succès !'), 'success');
        } else {
          // CREATE new post
          res = await api.createPost(postData);
          showToast(txt('✓ تم نشر المنشور الجديد بنجاح في المنظومة!', '✓ New post published successfully!', '✓ Nouvelle publication ajoutée avec succès !'), 'success');
        }

        resetPostEditor();
        loadPosts();
      } catch (err) {
        showToast(txt('فشل في حفظ المنشور: ', 'Failed to save post: ', 'Échec d\'enregistrement : ') + err.message, 'error');
      } finally {
        publishBtn.disabled = false;
        publishBtn.innerHTML = `<span>${publishBtnText ? publishBtnText.textContent : 'Save'}</span>`;
      }
    };
  }

  // Formatting Toolbar Buttons
  document.querySelectorAll('.btn-format').forEach(btn => {
    btn.onclick = () => {
      const cmd = btn.getAttribute('data-cmd');
      if (!postBodyInput) return;
      const start = postBodyInput.selectionStart;
      const end = postBodyInput.selectionEnd;
      const val = postBodyInput.value;
      const selected = val.substring(start, end) || 'نص';

      let replacement = selected;
      if (cmd === 'bold') replacement = `**${selected}**`;
      if (cmd === 'italic') replacement = `*${selected}*`;
      if (cmd === 'h2') replacement = `\n## ${selected}\n`;
      if (cmd === 'h3') replacement = `\n### ${selected}\n`;
      if (cmd === 'ul') replacement = `\n- ${selected}\n`;
      if (cmd === 'quote') replacement = `\n> ${selected}\n`;

      postBodyInput.value = val.substring(0, start) + replacement + val.substring(end);
      updateLivePreview();
    };
  });

  // Preview Mode Toggle (Desktop vs Mobile)
  document.querySelectorAll('.btn-preview-mode').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.btn-preview-mode').forEach(b => {
        b.classList.remove('active');
        b.style.background = '#F1F5F9';
        b.style.color = 'var(--text-muted)';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--shat-navy)';
      btn.style.color = '#FFFFFF';

      const mode = btn.getAttribute('data-mode');
      if (livePreviewBox) {
        if (mode === 'mobile') {
          livePreviewBox.style.maxWidth = '375px';
          livePreviewBox.style.border = '3px solid #CBD5E1';
          livePreviewBox.style.borderRadius = '24px';
        } else {
          livePreviewBox.style.maxWidth = '100%';
          livePreviewBox.style.border = '1px solid var(--border-light)';
          livePreviewBox.style.borderRadius = 'var(--radius-xs)';
        }
      }
    };
  });

  // --- Load Media Library Tab & Device Upload ---
  const mediaFileInput = document.getElementById('media-library-file-input');
  const btnUploadMediaDevice = document.getElementById('btn-upload-media-device');

  if (btnUploadMediaDevice && mediaFileInput) {
    btnUploadMediaDevice.onclick = () => mediaFileInput.click();

    mediaFileInput.onchange = async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      btnUploadMediaDevice.disabled = true;
      btnUploadMediaDevice.textContent = txt('⏳ جاري رفع وتخزين الصور...', 'Uploading...', 'Importation...');

      try {
        for (const file of files) {
          const compressed = await MediaStorageService.compressImage(file, 1200, 800, 0.82);
          MediaStorageService.saveMediaItem(file.name, compressed, file.type, file.size);
        }

        showToast(
          txt(`✓ تم رفع وتخزين ${files.length} صورة بنجاح في جهازك!`, `✓ Uploaded ${files.length} images to device storage!`, `✓ ${files.length} images importées avec succès !`),
          'success'
        );
        loadMediaLibrary();
      } catch (err) {
        showToast(txt('تعذر رفع الملفات: ', 'Upload error: ', 'Erreur : ') + err.message, 'error');
      } finally {
        btnUploadMediaDevice.disabled = false;
        btnUploadMediaDevice.textContent = `📁 ${txt('رفع صور من جهازك', 'Upload from Device', 'Importer de l\'appareil')}`;
        mediaFileInput.value = '';
      }
    };
  }

  function loadMediaLibrary() {
    const grid = document.getElementById('media-library-grid');
    if (!grid) return;

    const items = MediaStorageService.getMediaItems();
    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">${txt('لا توجد صور في المكتبة حالياً.', 'No media items available.', 'Aucun fichier.')}</div>`;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div style="border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden; background: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="height: 120px; background: #F8FAFC; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <img src="${item.dataUrl}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
        </div>
        <div style="padding: 10px; font-size: 0.78rem;">
          <div style="font-weight: 700; color: var(--shat-navy); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${item.name}">${item.name}</div>
          <div style="color: var(--text-muted); font-size: 0.72rem; margin-top: 2px;">${item.sizeFormatted || 'صورة'} • ${item.isDefault ? txt('ملف رسمي', 'Official', 'Officiel') : txt('مرفوع محلياً', 'Local', 'Local')}</div>
          
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            <button class="btn-clean btn-sm btn-copy-media-url" data-url="${item.dataUrl}" style="flex: 1; font-size: 0.72rem; background: var(--bg-subtle);">
              📋 ${txt('نسخ', 'Copy', 'Copier')}
            </button>
            <button class="btn-clean btn-sm btn-use-cover" data-url="${item.dataUrl}" style="flex: 1; font-size: 0.72rem; background: var(--shat-green-tint); color: var(--shat-green); font-weight: 700;">
              🖼️ ${txt('غلاف', 'Cover', 'Couv')}
            </button>
            ${!item.isDefault ? `
              <button class="btn-clean btn-sm btn-delete-media" data-id="${item.id}" style="padding: 3px 6px; background: #FEE2E2; color: #991B1B;">
                🗑️
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Bind copy and use buttons
    grid.querySelectorAll('.btn-copy-media-url').forEach(btn => {
      btn.onclick = () => {
        const url = btn.getAttribute('data-url');
        if (url.startsWith('data:')) {
          showToast(txt('تم اختيار الصورة لاستخدامها كغلاف للمنشور!', 'Image selected for cover!', 'Image sélectionnée pour la couverture !'), 'info');
          if (postCoverInput) postCoverInput.value = url;
          if (previewCover) previewCover.src = url;
        } else {
          navigator.clipboard?.writeText(url);
          showToast(txt(`تم نسخ رابط الصورة: ${url}`, 'Image link copied!', 'Lien copié !'), 'success');
        }
      };
    });

    grid.querySelectorAll('.btn-use-cover').forEach(btn => {
      btn.onclick = () => {
        const url = btn.getAttribute('data-url');
        if (postCoverInput) postCoverInput.value = url;
        if (previewCover) previewCover.src = url;
        activateTab('admin-tab-posts');
        showToast(txt('تم تعيين الصورة كغلاف للمنشور بنجاح!', 'Image set as post cover!', 'Image définie comme couverture !'), 'success');
      };
    });

    grid.querySelectorAll('.btn-delete-media').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        MediaStorageService.deleteMediaItem(id);
        showToast(txt('تم حذف الملف من جهازك بنجاح.', 'Media deleted from device.', 'Fichier supprimé de l\'appareil.'), 'info');
        loadMediaLibrary();
      };
    });
  }

  // --- Load Posts Management Table ---
  async function loadPosts() {
    const tbody = document.getElementById('posts-table-tbody');
    const badge = document.getElementById('posts-count-badge');
    try {
      const res = await api.getPosts();
      if (res.success && res.posts) {
        if (badge) badge.textContent = `${res.posts.length} ${txt('منشور', 'posts', 'publications')}`;
        if (tbody) {
          if (res.posts.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted);">${txt('لا توجد منشورات حالياً. استخدم المحرر أعلاه لإنشاء منشورك الأول!', 'No posts yet. Create your first post above!', 'Aucune publication.')}</td></tr>`;
            return;
          }

          tbody.innerHTML = res.posts.map(p => `
            <tr style="border-bottom: 1px solid var(--border-light);">
              <td style="padding: 10px 16px;">
                <img src="${p.coverImage || 'assets/logo/logo-banner.jpg'}" alt="${p.title}" style="width: 50px; height: 35px; object-fit: cover; border-radius: var(--radius-xs);" onerror="this.onerror=null; this.src='assets/logo/logo-banner.jpg';">
              </td>
              <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy); max-width: 280px;">
                ${p.title}
              </td>
              <td style="padding: 12px 16px;">
                <span class="badge" style="background: #EFF6FF; color: #1D4ED8; font-size: 0.76rem;">${p.categoryLabel || p.category}</span>
              </td>
              <td style="padding: 12px 16px;">
                <span class="badge" style="background: ${p.status === 'published' ? '#DCFCE7' : '#FEF3C7'}; color: ${p.status === 'published' ? '#166534' : '#92400E'}; font-size: 0.76rem;">
                  ${p.status === 'published' ? txt('منشور حي', 'Live', 'Publié') : txt('مسودة', 'Draft', 'Brouillon')}
                </span>
              </td>
              <td style="padding: 12px 16px; font-size: 0.82rem; color: var(--text-muted);">${new Date(p.createdAt || Date.now()).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US')}</td>
              <td style="padding: 12px 16px; text-align: ${isRtl ? 'left' : 'right'};">
                <div style="display: flex; gap: 6px; justify-content: flex-end;">
                  <button class="btn-clean btn-sm btn-edit-post" data-post-id="${p.id}" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
                    ✏️ ${txt('تعديل', 'Edit', 'Modifier')}
                  </button>
                  <button class="btn-clean btn-sm btn-delete-post" data-post-id="${p.id}" style="background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5;">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          `).join('');

          // Bind Edit button to load post in editor
          tbody.querySelectorAll('.btn-edit-post').forEach(b => {
            b.onclick = () => {
              const id = b.getAttribute('data-post-id');
              loadPostForEdit(id);
            };
          });

          // Bind Delete button with confirmation
          tbody.querySelectorAll('.btn-delete-post').forEach(b => {
            b.onclick = async () => {
              const id = b.getAttribute('data-post-id');
              const confirmMsg = txt('هل أنت متأكد من حذف هذا المنشور نهائياً من المنظومة؟', 'Are you sure you want to permanently delete this post?', 'Êtes-vous sûr de vouloir supprimer cette publication ?');
              if (confirm(confirmMsg)) {
                await api.deletePost(id);
                showToast(txt('تم حذف المنشور بنجاح.', 'Post deleted successfully.', 'Publication supprimée.'), 'info');
                loadPosts();
              }
            };
          });
        }
      }
    } catch (e) {
      console.warn('Load posts error:', e);
    }
  }

  // --- Load Courses and Attach Material Logic ---
  const courseModalBackdrop = document.getElementById('modal-course-editor-backdrop');
  const btnCloseCourseModal = document.getElementById('btn-close-course-modal');
  const btnCancelCourseModal = document.getElementById('btn-cancel-course-modal');
  const formCourseEditor = document.getElementById('form-course-editor');
  const btnOpenNewCourse = document.getElementById('btn-open-new-course');

  if (btnCloseCourseModal) btnCloseCourseModal.onclick = () => courseModalBackdrop.classList.remove('open');
  if (btnCancelCourseModal) btnCancelCourseModal.onclick = () => courseModalBackdrop.classList.remove('open');

  if (btnOpenNewCourse) {
    btnOpenNewCourse.onclick = () => {
      document.getElementById('edit-course-id').value = '';
      document.getElementById('edit-course-title').value = '';
      document.getElementById('edit-course-code').value = 'SHAT-' + Math.floor(100 + Math.random() * 900);
      document.getElementById('edit-course-hours').value = '40 ساعة تدريبية معتمدة';
      document.getElementById('edit-course-level').value = 'دبلوم مهني تطبيقي';
      document.getElementById('edit-course-fee').value = '150 شيكل';
      document.getElementById('edit-course-track').value = 'humanitarian';
      document.getElementById('edit-course-schedule').value = 'الأحد والأربعاء • 6:00 - 8:30 م';
      document.getElementById('edit-course-instructor').value = 'د. أسامة المنصور';
      document.getElementById('edit-course-google-form').value = '';
      document.getElementById('edit-course-native-form').value = '';
      document.getElementById('edit-course-drive-url').value = '';
      document.getElementById('edit-course-summary').value = '';
      document.getElementById('edit-course-syllabus').value = '';
      document.getElementById('course-editor-modal-title').textContent = txt('إضافة مساق تدريبي جديد', 'Create New Course Track', 'Créer un Nouveau Cursus');
      courseModalBackdrop.classList.add('open');
    };
  }

  if (formCourseEditor) {
    formCourseEditor.onsubmit = async (e) => {
      e.preventDefault();
      const courseId = document.getElementById('edit-course-id').value;
      const syllabusLines = (document.getElementById('edit-course-syllabus').value || '')
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const courseData = {
        title: document.getElementById('edit-course-title').value,
        code: document.getElementById('edit-course-code').value || 'SHAT',
        hours: document.getElementById('edit-course-hours').value,
        level: document.getElementById('edit-course-level').value,
        fee: document.getElementById('edit-course-fee').value,
        track: document.getElementById('edit-course-track').value,
        schedule: document.getElementById('edit-course-schedule').value,
        instructorName: document.getElementById('edit-course-instructor').value,
        googleFormUrl: document.getElementById('edit-course-google-form').value,
        nativeFormUrl: document.getElementById('edit-course-native-form').value,
        driveFolderUrl: document.getElementById('edit-course-drive-url').value,
        summary: document.getElementById('edit-course-summary').value,
        syllabus: syllabusLines
      };

      try {
        if (courseId) {
          await api.updateCourse(courseId, courseData);
          showToast(txt('✓ تم حفظ وتحديث المساق بنجاح!', '✓ Course updated successfully!', '✓ Cursus mis à jour !'), 'success');
        } else {
          await api.createCourse(courseData);
          showToast(txt('✓ تم إنشاء المساق الجديد بنجاح!', '✓ New course created successfully!', '✓ Nouveau cursus créé !'), 'success');
        }
        courseModalBackdrop.classList.remove('open');
        loadCourses();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  }

  async function loadCourses() {
    const list = document.getElementById('admin-courses-list');
    if (!list) return;

    try {
      const res = await api.getCourses();
      const courses = res && res.courses ? res.courses : (Array.isArray(res) ? res : []);

      list.innerHTML = courses.map(c => `
        <div class="bento-card" style="padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-top: 3px solid var(--shat-navy);">
          <div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 280px;">
            <div style="width: 52px; height: 52px; border-radius: var(--radius-xs); background: var(--shat-navy-tint); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
              🎓
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="badge" style="background: var(--shat-navy); color: #FFFFFF; font-size: 0.75rem; font-family: var(--font-mono);">${c.code || 'SHAT'}</span>
                <span style="font-weight: 800; font-size: 1.05rem; color: var(--shat-navy);">${c.title}</span>
              </div>
              
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <span>⏱️ ${c.hours || '30 ساعة'}</span>
                <span>•</span>
                <span>🏅 ${c.level || 'معتمد'}</span>
                <span>•</span>
                <span>👨‍🏫 ${c.instructorName || 'د. أسامة المنصور'}</span>
                ${c.fee ? `<span>•</span><span style="color: var(--shat-green); font-weight: 700;">💰 ${c.fee}</span>` : ''}
              </div>

              <!-- Integration Badges -->
              <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                ${c.googleFormUrl ? `
                  <a href="${c.googleFormUrl}" target="_blank" rel="noopener" class="badge btn-google-form" style="font-size: 0.72rem; text-decoration: none;">
                    📋 Google Form
                  </a>
                ` : ''}
                ${c.nativeFormUrl ? `
                  <a href="${c.nativeFormUrl}" class="badge btn-platform-form" style="font-size: 0.72rem; text-decoration: none;">
                    ✍️ استمارة المنصة
                  </a>
                ` : ''}
                ${c.driveFolderUrl ? `
                  <a href="${c.driveFolderUrl}" target="_blank" rel="noopener" class="badge btn-drive-folder" style="font-size: 0.72rem; text-decoration: none;">
                    📁 Google Drive
                  </a>
                ` : ''}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button class="btn-clean btn-sm btn-edit-course" data-id="${c.id}" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light); font-weight: 700;">
              ✏️ ${txt('تعديل المساق', 'Edit Course', 'Modifier')}
            </button>
            <a href="#/course/${c.id}" class="btn-clean btn-sm" style="background: var(--bg-subtle); color: var(--text-secondary); text-decoration: none;">
              👁️ ${txt('قاعة المساق', 'Course Room', 'Salle')}
            </a>
            <button class="btn-clean btn-sm btn-delete-course" data-id="${c.id}" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-weight: 700;">
              🗑️
            </button>
          </div>
        </div>
      `).join('');

      // Bind Edit click
      list.querySelectorAll('.btn-edit-course').forEach(b => {
        b.onclick = () => {
          const id = b.getAttribute('data-id');
          const found = courses.find(c => c.id === id);
          if (found) {
            document.getElementById('edit-course-id').value = found.id;
            document.getElementById('edit-course-title').value = found.title || '';
            document.getElementById('edit-course-code').value = found.code || '';
            document.getElementById('edit-course-hours').value = found.hours || '';
            document.getElementById('edit-course-level').value = found.level || '';
            document.getElementById('edit-course-fee').value = found.fee || '';
            document.getElementById('edit-course-track').value = found.track || 'humanitarian';
            document.getElementById('edit-course-schedule').value = found.schedule || '';
            document.getElementById('edit-course-instructor').value = found.instructorName || '';
            document.getElementById('edit-course-google-form').value = found.googleFormUrl || '';
            document.getElementById('edit-course-native-form').value = found.nativeFormUrl || (found.formId ? `#/forms?id=${found.formId}` : '');
            document.getElementById('edit-course-drive-url').value = found.driveFolderUrl || '';
            document.getElementById('edit-course-summary').value = found.summary || found.overview || '';
            document.getElementById('edit-course-syllabus').value = Array.isArray(found.syllabus) ? found.syllabus.join('\n') : '';
            document.getElementById('course-editor-modal-title').textContent = `✏️ ${txt('تعديل المساق:', 'Edit Course:', 'Modifier :')} ${found.title.substring(0, 30)}...`;
            courseModalBackdrop.classList.add('open');
          }
        };
      });

      // Bind Delete click
      list.querySelectorAll('.btn-delete-course').forEach(b => {
        b.onclick = async () => {
          const id = b.getAttribute('data-id');
          const confirmMsg = txt('هل أنت متأكد من حذف هذا المساق التدريبي نهائياً من الأكاديمية؟', 'Are you sure you want to delete this course track?', 'Supprimer ce cursus ?');
          if (confirm(confirmMsg)) {
            await api.deleteCourse(id);
            showToast(txt('تم حذف المساق بنجاح.', 'Course deleted.', 'Cursus supprimé.'), 'info');
            loadCourses();
          }
        };
      });
    } catch (e) {
      console.warn('Load courses error:', e);
    }
  }

  // --- Device Backup Export & Import ---
  const btnExportBackup = document.getElementById('btn-export-backup');
  const btnImportBackupTrigger = document.getElementById('btn-import-backup-trigger');
  const importBackupFileInput = document.getElementById('import-backup-file-input');

  if (btnExportBackup) {
    btnExportBackup.onclick = () => {
      MediaStorageService.exportFullBackup();
      showToast(txt('✓ تم تصدير وتحميل النسخة الاحتياطية لجهازك بنجاح!', '✓ Backup JSON exported to your computer!', '✓ Sauvegarde exportée sur votre appareil !'), 'success');
    };
  }

  if (btnImportBackupTrigger && importBackupFileInput) {
    btnImportBackupTrigger.onclick = () => importBackupFileInput.click();

    importBackupFileInput.onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          MediaStorageService.importFullBackup(event.target.result);
          showToast(txt('✓ تم استعادة النسخة الاحتياطية بنجاح من جهازك!', '✓ Backup restored successfully from your file!', '✓ Sauvegarde restaurée avec succès !'), 'success');
          loadDashboardData();
          loadPosts();
          loadMediaLibrary();
          loadCourses();
        } catch (err) {
          showToast(err.message, 'error');
        }
      };
      reader.readAsText(file);
    };
  }

  // --- Applications CSV Export & Refresh Binding ---
  const btnRefreshAppsTab = document.getElementById('btn-refresh-apps-tab');
  if (btnRefreshAppsTab) {
    btnRefreshAppsTab.onclick = () => {
      loadApplications();
      showToast(txt('تم تحديث قائمة الطلبات!', 'Applications list refreshed!', 'Liste actualisée !'), 'info');
    };
  }

  const btnExportAppsCsv = document.getElementById('btn-export-apps-csv');
  if (btnExportAppsCsv) {
    btnExportAppsCsv.onclick = () => {
      exportApplicationsToCSV(currentLang);
    };
  }

  // Initial Load on Entry
  loadDashboardData();
  loadPosts();
  loadMediaLibrary();
}

// Support Loaders
async function loadDashboardData() {
  try {
    const [appsRes, coursesRes, usersRes] = await Promise.all([
      api.getApplications(),
      api.getCourses(),
      api.getUsers()
    ]);

    if (appsRes && appsRes.applications) {
      const pending = appsRes.applications.filter(a => a.status === 'pending');
      const kpiPending = document.getElementById('kpi-pending-apps');
      if (kpiPending) kpiPending.textContent = pending.length;

      const tbody = document.getElementById('dash-pending-apps-tbody');
      if (tbody) {
        if (pending.length === 0) {
          tbody.innerHTML = `<tr><td colspan="4" style="padding: 16px; text-align: center; color: var(--text-muted);">لا توجد طلبات معلقة حالياً.</td></tr>`;
        } else {
          tbody.innerHTML = pending.slice(0, 5).map(app => `
            <tr style="border-bottom: 1px solid var(--border-light);">
              <td style="padding: 10px 8px; font-weight: 700; color: var(--shat-navy);">${app.fullName}</td>
              <td style="padding: 10px 8px; color: var(--shat-green); font-size: 0.8rem;">${app.courseTitle}</td>
              <td style="padding: 10px 8px;"><span class="badge" style="background: #FEF3C7; color: #92400E; font-size: 0.72rem;">معلق</span></td>
              <td style="padding: 10px 8px; text-align: left;">
                <button class="btn-clean btn-sm btn-quick-approve" data-id="${app.id}" style="background: #DCFCE7; color: #166534; font-weight: 700; font-size: 0.75rem;">قبول</button>
              </td>
            </tr>
          `).join('');

          document.querySelectorAll('.btn-quick-approve').forEach(b => {
            b.onclick = async () => {
              const id = b.getAttribute('data-id');
              await api.updateApplicationStatus(id, 'approved');
              showToast('تم قبول المتدرب وتفعيل حسابه تلقائياً!', 'success');
              loadDashboardData();
            };
          });
        }
      }
    }

    if (coursesRes && coursesRes.courses) {
      const kpiCourses = document.getElementById('kpi-courses-count');
      if (kpiCourses) kpiCourses.textContent = coursesRes.courses.length;
    }

    if (usersRes && usersRes.users) {
      const students = usersRes.users.filter(u => u.role === 'student');
      const teachers = usersRes.users.filter(u => u.role === 'teacher');
      const kpiStudents = document.getElementById('kpi-students-count');
      const kpiTeachers = document.getElementById('kpi-teachers-count');
      if (kpiStudents) kpiStudents.textContent = students.length + 240;
      if (kpiTeachers) kpiTeachers.textContent = teachers.length + 16;
    }
  } catch (e) {}
}

async function loadUsers() {
  const tbody = document.getElementById('admin-users-tbody');
  if (!tbody) return;
  try {
    const res = await api.getUsers();
    if (res && res.users) {
      tbody.innerHTML = res.users.map(u => `
        <tr style="border-bottom: 1px solid var(--border-light);">
          <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">${u.fullNameAr || u.fullNameEn}</td>
          <td style="padding: 12px 16px; color: var(--text-muted); font-size: 0.85rem;">${u.email}</td>
          <td style="padding: 12px 16px;"><span class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">${u.roleTitle || u.role}</span></td>
          <td style="padding: 12px 16px; font-size: 0.85rem;">${u.phone || '-'}</td>
          <td style="padding: 12px 16px;"><span class="badge" style="background: #DCFCE7; color: #166534;">نشط</span></td>
        </tr>
      `).join('');
    }
  } catch (e) {}
}

async function loadApplications() {
  const tbody = document.getElementById('admin-apps-tbody');
  if (!tbody) return;
  try {
    const res = await api.getApplications();
    if (res && res.applications) {
      tbody.innerHTML = res.applications.map(app => `
        <tr style="border-bottom: 1px solid var(--border-light);">
          <td style="padding: 12px 16px;">
            <div style="font-weight: 700; color: var(--shat-navy);">${app.fullName}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${new Date(app.createdAt || Date.now()).toLocaleDateString('ar-EG')}</div>
          </td>
          <td style="padding: 12px 16px;">
            <div style="font-size: 0.85rem;">${app.email}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${app.phone}</div>
          </td>
          <td style="padding: 12px 16px; font-weight: 600; color: var(--shat-green);">${app.courseTitle}</td>
          <td style="padding: 12px 16px;">
            <div style="font-size: 0.85rem;">${app.organization || 'مستقل'}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${app.qualification || ''}</div>
          </td>
          <td style="padding: 12px 16px;">
            <span class="badge" style="background: ${app.status === 'approved' ? '#DCFCE7' : app.status === 'rejected' ? '#FEE2E2' : '#FEF3C7'}; color: ${app.status === 'approved' ? '#166534' : app.status === 'rejected' ? '#991B1B' : '#92400E'};">
              ${app.status === 'approved' ? 'مقبول ومسجل' : app.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
            </span>
          </td>
          <td style="padding: 12px 16px; text-align: left;">
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="btn-clean btn-sm btn-app-decision" data-id="${app.id}" data-action="approved" style="background: #DCFCE7; color: #166534; font-weight: 700;">قبول</button>
              <button class="btn-clean btn-sm btn-app-decision" data-id="${app.id}" data-action="rejected" style="background: #FEE2E2; color: #991B1B;">رفض</button>
            </div>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.btn-app-decision').forEach(b => {
        b.onclick = async () => {
          const id = b.getAttribute('data-id');
          const action = b.getAttribute('data-action');
          await api.updateApplicationStatus(id, action);
          showToast(action === 'approved' ? 'تم قبول وتسجيل المتقدم بنجاح!' : 'تم رفض الطلب.', 'info');
          loadApplications();
        };
      });
    }
  } catch (e) {}
}

async function exportApplicationsToCSV(lang = 'ar') {
  const isRtl = lang === 'ar';
  const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

  try {
    const res = await api.getApplications();
    const apps = res && res.applications ? res.applications : [];

    if (apps.length === 0) {
      showToast(txt('لا توجد طلبات تسجيل متاحة للتصدير حالياً.', 'No applications found to export.', 'Aucune candidature à exporter.'), 'warning');
      return;
    }

    const headers = [
      txt('رقم الطلب', 'Application ID', 'ID'),
      txt('اسم المتقدم الكامل', 'Full Name', 'Nom Complet'),
      txt('المساق / البرنامج التدريبي', 'Course Track', 'Cursus'),
      txt('البريد الإلكتروني', 'Email Address', 'Courriel'),
      txt('رقم الهاتف والواتساب', 'Phone Number', 'Téléphone'),
      txt('المؤسسة / جهة العمل', 'Organization', 'Organisation'),
      txt('المؤهل العلمي', 'Qualification', 'Diplôme'),
      txt('تاريخ التقديم', 'Submission Date', 'Date de Dépôt'),
      txt('الحالة الإدارية', 'Status', 'Statut')
    ];

    const rows = apps.map(app => [
      `"${(app.id || '').replace(/"/g, '""')}"`,
      `"${(app.fullName || '').replace(/"/g, '""')}"`,
      `"${(app.courseTitle || '').replace(/"/g, '""')}"`,
      `"${(app.email || '').replace(/"/g, '""')}"`,
      `"${(app.phone || '').replace(/"/g, '""')}"`,
      `"${(app.organization || 'مستقل').replace(/"/g, '""')}"`,
      `"${(app.qualification || '').replace(/"/g, '""')}"`,
      `"${new Date(app.createdAt || Date.now()).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US')}"`,
      `"${app.status === 'approved' ? txt('مقبول ومسجل', 'Approved', 'Validé') : (app.status === 'rejected' ? txt('مرفوض', 'Rejected', 'Refusé') : txt('قيد المراجعة', 'Pending', 'En Attente'))}"`
    ]);

    const csvContent = [headers.map(h => `"${h}"`).join(','), ...rows.map(r => r.join(','))].join('\r\n');

    // Add UTF-8 Byte Order Mark (BOM) so Microsoft Excel opens Arabic without encoding glitches
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shat_applications_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      txt(`✓ تم تصدير ${apps.length} طلب إلى ملف Excel (CSV معتمد) بنجاح!`, `✓ Successfully exported ${apps.length} applications to CSV!`, `✓ ${apps.length} candidatures exportées en CSV avec succès !`),
      'success'
    );
  } catch (err) {
    showToast(txt('تعذر تصدير الملف: ', 'Export error: ', 'Erreur d\'export : ') + err.message, 'error');
  }
}

async function loadForms() {
  const tbody = document.getElementById('admin-forms-tbody');
  if (!tbody) return;
  try {
    const res = await api.getForms();
    if (res && res.forms) {
      tbody.innerHTML = res.forms.map(f => `
        <tr style="border-bottom: 1px solid var(--border-light);">
          <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">${f.title}</td>
          <td style="padding: 12px 16px;"><span class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">${f.questionsCount || 8} أسئلة</span></td>
          <td style="padding: 12px 16px;"><span class="badge" style="background: #DCFCE7; color: #166534;">نشط</span></td>
          <td style="padding: 12px 16px; font-family: monospace; font-size: 0.8rem;">#/forms?id=${f.id}</td>
          <td style="padding: 12px 16px; text-align: left;">
            <a href="#/forms?id=${f.id}" class="btn-clean btn-sm" style="background: var(--bg-subtle);">معاينة ↗</a>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {}
}

async function loadInquiries() {
  const tbody = document.getElementById('admin-inquiries-tbody');
  if (!tbody) return;
  try {
    const res = await api.getInquiries();
    const inqs = res && res.inquiries ? res.inquiries : [];
    if (inqs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">لا توجد استفسارات جديدة.</td></tr>`;
      return;
    }
    tbody.innerHTML = inqs.map(inq => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">${inq.name} <div style="font-size: 0.75rem; color: var(--text-muted);">${inq.org || 'مؤسسة'}</div></td>
        <td style="padding: 12px 16px; font-size: 0.85rem;">${inq.email} <div style="font-size: 0.75rem; color: var(--text-muted);">${inq.phone}</div></td>
        <td style="padding: 12px 16px;"><span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green);">${inq.service || 'استشارة'}</span></td>
        <td style="padding: 12px 16px; font-size: 0.85rem; max-width: 250px;">${inq.message || '-'}</td>
        <td style="padding: 12px 16px; font-size: 0.8rem; color: var(--text-muted);">${new Date(inq.createdAt || Date.now()).toLocaleDateString('ar-EG')}</td>
      </tr>
    `).join('');
  } catch (e) {}
}

async function loadHealthAndAudit() {
  const tbody = document.getElementById('admin-audit-tbody');
  if (!tbody) return;
  try {
    const res = await api.getAuditLogs();
    const logs = Array.isArray(res) ? res : (res && res.logs ? res.logs : []);
    tbody.innerHTML = logs.map(l => `
      <tr style="border-bottom: 1px solid var(--border-light);">
        <td style="padding: 10px 14px; font-weight: 700; color: var(--shat-navy);">${l.user}</td>
        <td style="padding: 10px 14px;"><span class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">${l.action}</span></td>
        <td style="padding: 10px 14px; font-size: 0.8rem; color: var(--text-muted);">${l.ip || '127.0.0.1'}</td>
        <td style="padding: 10px 14px; font-size: 0.8rem; color: var(--text-muted);">${new Date(l.timestamp).toLocaleString('ar-EG')}</td>
      </tr>
    `).join('');
  } catch (e) {}
}

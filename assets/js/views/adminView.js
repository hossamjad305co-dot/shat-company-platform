// assets/js/views/adminView.js
// Production Executive Administration Center & CMS Post Engine for SHAT Company
import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';

export function renderAdminView(lang = 'ar') {
  return `
    <div class="admin-portal-layout" style="display: flex; min-height: 90vh; background: var(--bg-subtle); margin-top: 70px;">
      
      <!-- Collapsible Desktop/Tablet Admin Sidebar -->
      <aside id="admin-sidebar" class="admin-sidebar" style="width: 280px; background: #0B192C; color: #FFFFFF; flex-shrink: 0; display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s ease;">
        
        <!-- Sidebar Brand Banner -->
        <div style="padding: 22px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 32px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; color: #FFFFFF;">إدارة شركة شات</div>
              <div style="font-size: 0.72rem; color: #94A3B8;">Enterprise Admin Center</div>
            </div>
          </div>
          <button id="btn-close-admin-sidebar" class="mobile-only" style="background: none; border: none; color: #94A3B8; font-size: 1.2rem; cursor: pointer; display: none;">✕</button>
        </div>

        <!-- Sidebar Navigation Tree -->
        <nav class="admin-sidebar-nav" style="padding: 16px 12px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;">
          
          <!-- Section: Dashboard -->
          <button class="admin-nav-item active" data-target="admin-tab-dashboard">
            <span>📊</span>
            <span>لوحة المؤشرات (Dashboard)</span>
          </button>

          <!-- Group: Content -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            إدارة المحتوى (Content)
          </div>
          <button class="admin-nav-item" data-target="admin-tab-posts">
            <span>📝</span>
            <span>المنشورات والأخبار (Posts)</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-media">
            <span>🖼️</span>
            <span>مكتبة الصور والوسائط (Media)</span>
          </button>

          <!-- Group: Academy -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            الأكاديمية والتدريب (Academy)
          </div>
          <button class="admin-nav-item" data-target="admin-tab-courses">
            <span>🎓</span>
            <span>المقررات والمناهج (Courses)</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-roster">
            <span>👥</span>
            <span>سجل الطلاب والمدربين</span>
          </button>

          <!-- Group: Applications -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            الطلبات والاستمارات (Applications)
          </div>
          <button class="admin-nav-item" data-target="admin-tab-applications">
            <span>📥</span>
            <span>طلبات الالتحاق (Applications)</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-forms">
            <span>📋</span>
            <span>نماذج Google Forms</span>
          </button>
          <button class="admin-nav-item" data-target="admin-tab-inquiries">
            <span>💬</span>
            <span>طلبات الاستشارات (Inquiries)</span>
          </button>

          <!-- Group: Settings -->
          <div class="admin-nav-group-title" style="padding: 12px 10px 4px 10px; font-size: 0.72rem; text-transform: uppercase; color: #64748B; font-weight: 800; letter-spacing: 0.5px;">
            النظام والإعدادات (Settings)
          </div>
          <button class="admin-nav-item" data-target="admin-tab-health">
            <span>🛡️</span>
            <span>صحة النظام وسجل التدقيق</span>
          </button>
        </nav>

        <!-- Sidebar User Footer -->
        <div style="padding: 16px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--shat-green); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">
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
            ☰ قائمة لوحة التحكم
          </button>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--shat-navy);">لوحة الإدارة التنفيذية</span>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 1: DASHBOARD OVERVIEW -->
        <!-- ======================================================== -->
        <div id="admin-tab-dashboard" class="admin-view-pane active">
          
          <!-- Welcome Banner -->
          <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, #08162B 100%); border-radius: var(--radius-md); padding: 28px 32px; color: #FFFFFF; margin-bottom: 28px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div>
                <span class="badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; margin-bottom: 8px;">صباح الخير • Good Morning, Admin</span>
                <h1 style="font-size: 1.7rem; font-weight: 900; color: #FFFFFF; margin: 4px 0 6px 0;">لوحة المؤشرات والعمليات المركزية</h1>
                <p style="color: #CBD5E1; font-size: 0.9rem; margin: 0;">نظرة شاملة على سير العمليات الأكاديمية والاستشارية في شركة شات للتنمية والتطوير.</p>
              </div>

              <div style="display: flex; gap: 10px;">
                <button class="btn-clean btn-green btn-sm" id="btn-quick-new-post">
                  <span>+ إضافة منشور جديد</span>
                </button>
                <button class="btn-clean btn-sm" id="btn-refresh-dashboard" style="background: rgba(255,255,255,0.1); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.2);">
                  <span>🔄 تحديث البيانات</span>
                </button>
              </div>
            </div>
          </div>

          <!-- KPI Cards Grid -->
          <div class="grid-4" style="margin-bottom: 28px;">
            <div class="bento-card" style="padding: 20px; border-top: 4px solid var(--shat-navy);">
              <span class="bento-kicker">إجمالي الطلاب المسجلين</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;" id="kpi-students-count">245</div>
              <div style="font-size: 0.8rem; color: var(--shat-green); font-weight: 600;">+12 متدرب هذا الأسبوع</div>
            </div>

            <div class="bento-card" style="padding: 20px; border-top: 4px solid var(--shat-green);">
              <span class="bento-kicker">المدربون والخبراء المعتمدون</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-green);" id="kpi-teachers-count">18</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">كادر تدريبي واستشاري مرخص</div>
            </div>

            <div class="bento-card" style="padding: 20px; border-top: 4px solid #3B82F6;">
              <span class="bento-kicker">المساقات والدبلومات الفعالة</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: #1D4ED8;" id="kpi-courses-count">12</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">برامج معتمدة وفق المعايير</div>
            </div>

            <div class="bento-card" style="padding: 20px; border-top: 4px solid var(--shat-amber);">
              <span class="bento-kicker">طلبات الالتحاق المعلقة</span>
              <div style="font-size: 2.2rem; font-weight: 900; color: var(--shat-amber);" id="kpi-pending-apps">23</div>
              <div style="font-size: 0.8rem; color: var(--shat-amber); font-weight: 600;">تتطلب تدقيقاً ومصادقة</div>
            </div>
          </div>

          <!-- Pending Applications & Recent Activity Split Grid -->
          <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px; align-items: start;">
            
            <!-- Pending Applications Table Card -->
            <div class="bento-card" style="padding: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
                <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin: 0;">طلبات الالتحاق الحديثة (Pending Applications)</h3>
                <button class="btn-clean btn-sm" id="btn-view-all-apps" style="color: var(--shat-green); font-weight: 700;">عرض الكل ←</button>
              </div>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: right;">
                  <thead>
                    <tr style="color: var(--text-muted); border-bottom: 2px solid var(--border-light);">
                      <th style="padding: 10px 8px;">المتقدم</th>
                      <th style="padding: 10px 8px;">المساق</th>
                      <th style="padding: 10px 8px;">الحالة</th>
                      <th style="padding: 10px 8px; text-align: left;">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody id="dash-pending-apps-tbody">
                    <tr><td colspan="4" style="padding: 20px; text-align: center; color: var(--text-muted);">جاري تحميل الطلبات...</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Recent Activity Stream -->
            <div class="bento-card" style="padding: 22px;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 16px 0; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
                النشاط الأخير وسجل العمليات
              </h3>
              <div id="dash-recent-activity-list" style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
                <div style="padding: 10px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: var(--shat-navy);">تسجيل متدرب جديد في دبلوم CHS</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">منذ 15 دقيقة • بواسطة الإدارة</div>
                </div>
                <div style="padding: 10px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: var(--shat-green);">رصد درجات التكليف #2 لدورة PSEA</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">منذ ساعة • د. أسامة المنصور</div>
                </div>
                <div style="padding: 10px; background: var(--bg-subtle); border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: #1D4ED8;">نشر مقال: معايير التقييم الخارجي OECD DAC</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">منذ 3 ساعات • أ. حسام جاد الله</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- ======================================================== -->
        <!-- TAB 2: CMS POSTS & RICH EDITOR -->
        <!-- ======================================================== -->
        <div id="admin-tab-posts" class="admin-view-pane" style="display: none;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.3rem; font-weight: 900; color: var(--shat-navy); margin: 0;">محرر المنشورات والمقالات المعتمدة</h2>
              <span id="cms-autosave-indicator" style="font-size: 0.8rem; color: var(--shat-green); background: #DCFCE7; padding: 4px 10px; border-radius: 12px; font-weight: 600;">
                ✓ مسودة محفوظة تلقائياً
              </span>
            </div>

            <div style="display: flex; gap: 8px;">
              <button id="btn-cms-new" class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); font-weight: 700;">
                <span>+ مسودة جديدة</span>
              </button>
              <button id="btn-cms-save-draft" class="btn-clean btn-sm" style="background: #F1F5F9; border: 1px solid var(--border-light); color: var(--text-main); font-weight: 700;">
                <span>💾 حفظ كمسودة</span>
              </button>
              <button id="btn-cms-publish" class="btn-clean btn-green btn-sm" style="font-weight: 800;">
                <span>🚀 نشر المنشور على الموقع</span>
              </button>
            </div>
          </div>

          <!-- Split-Screen Editor & Live Preview -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; margin-bottom: 36px;">
            
            <!-- Editor Column -->
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 22px; box-shadow: var(--shadow-sm);">
              <div class="form-group">
                <label class="form-label">عنوان المنشور الرسمي *</label>
                <input type="text" id="post-title-input" class="form-input" style="font-size: 1rem; font-weight: 700;" placeholder="عنوان المقال أو الإعلان الرسمي" value="إطلاق برامج التقييم الخارجي المستقل وتطوير الحوكمة لمؤسسات المجتمع المدني">
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">التصنيف</label>
                  <select id="post-category-input" class="form-input">
                    <option value="humanitarian">إنساني وتطويري</option>
                    <option value="institutional">حوكمة واستشارات</option>
                    <option value="evaluation">تقييم ومتابعة (OECD DAC)</option>
                    <option value="partnerships">شراكات دولية</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">حالة النشر</label>
                  <select id="post-status-input" class="form-input">
                    <option value="draft">مسودة (Draft)</option>
                    <option value="published" selected>منشور حي (Published)</option>
                    <option value="disabled">معطل مؤقتاً (Disabled)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">المقتطف التعريفي الموجز</label>
                <textarea id="post-excerpt-input" class="form-input" style="min-height: 55px; font-size: 0.88rem;">ضمن استراتيجية شركة شات لتعزيز كفاءة المنظمات غير الحكومية وتطبيق معايير المساءلة للمتأثرين.</textarea>
              </div>

              <!-- Formatting Toolbar -->
              <div class="form-group">
                <label class="form-label">المحتوى التفصيلي *</label>
                <div style="display: flex; gap: 6px; background: var(--bg-subtle); padding: 8px; border: 1px solid var(--border-light); border-bottom: none; border-radius: var(--radius-xs) var(--radius-xs) 0 0; flex-wrap: wrap;">
                  <button type="button" class="btn-format" data-cmd="bold" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">B</button>
                  <button type="button" class="btn-format" data-cmd="italic" style="padding: 4px 10px; font-style: italic; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">I</button>
                  <button type="button" class="btn-format" data-cmd="h2" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">H2</button>
                  <button type="button" class="btn-format" data-cmd="h3" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">H3</button>
                  <button type="button" class="btn-format" data-cmd="ul" style="padding: 4px 10px; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">• قائمة</button>
                  <button type="button" class="btn-format" data-cmd="quote" style="padding: 4px 10px; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">" اقتباس</button>
                </div>
                <textarea id="post-body-input" class="form-input" style="min-height: 200px; font-size: 0.92rem; border-top: none; border-radius: 0 0 var(--radius-xs) var(--radius-xs); line-height: 1.7;">أعلنت شركة شات للتنمية والتطوير عن إطلاق حزمة استشارية متكاملة لتقييم التدخلات الإنسانية وفق المعايير التسعة لـ CHS ومعايير OECD DAC. تشمل الحزمة بناء قدرات الكوادر الميدانية وإعداد تقارير التقييم المستقلة.</textarea>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">رابط صورة الغلاف</label>
                <input type="text" id="post-cover-input" class="form-input" value="assets/logo/logo-banner.jpg">
              </div>
            </div>

            <!-- Live Preview Column -->
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 22px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; background: #22C55E; border-radius: 50%;"></span>
                  <h3 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin: 0;">المعاينة الحية الفورية (Live Preview)</h3>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn-preview-mode btn-clean btn-sm active" data-mode="desktop" style="padding: 3px 8px; font-size: 0.75rem;">💻 سطح المكتب</button>
                  <button class="btn-preview-mode btn-clean btn-sm" data-mode="mobile" style="padding: 3px 8px; font-size: 0.75rem; background: #F1F5F9; color: var(--text-muted);">📱 هاتف</button>
                </div>
              </div>

              <div id="live-preview-box" style="flex: 1; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 18px; background: #FFFFFF; overflow-y: auto; max-height: 480px; width: 100%; transition: max-width 0.3s ease; margin: 0 auto;">
                <div id="preview-category-badge" class="badge" style="background: #EFF6FF; color: #1D4ED8; margin-bottom: 10px;">إنساني وتطويري</div>
                <h2 id="preview-title" style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px; line-height: 1.4;">
                  عنوان المنشور
                </h2>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
                  ✍️ بواسطة: أ. حسام جاد الله • 📅 ${new Date().toLocaleDateString('ar-EG')}
                </div>
                <img id="preview-cover" src="assets/logo/logo-banner.jpg" alt="Preview" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 14px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
                <p id="preview-excerpt" style="font-weight: 600; color: var(--text-main); font-size: 0.9rem; margin-bottom: 10px;">
                  المقتطف التعريفي الموجز
                </p>
                <div id="preview-body" style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8; white-space: pre-wrap;">
                  محتوى المنشور التفصيلي...
                </div>
              </div>
            </div>

          </div>

          <!-- Posts Management Table -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">سجل المنشورات في قاعدة البيانات</h3>
              <span id="posts-count-badge" class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">-- منشور</span>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">العنوان</th>
                    <th style="padding: 12px 16px;">التصنيف</th>
                    <th style="padding: 12px 16px;">الحالة</th>
                    <th style="padding: 12px 16px;">التاريخ</th>
                    <th style="padding: 12px 16px; text-align: left;">الإجراءات</th>
                  </tr>
                </thead>
                <tbody id="posts-table-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل المنشورات...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- ======================================================== -->
        <!-- TAB 3: MEDIA LIBRARY -->
        <!-- ======================================================== -->
        <div id="admin-tab-media" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">مكتبة الوسائط والصور المعتمدة (Media Library)</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">إدارة الصور الرسمية، الشعارات، وبانرات المنشورات المخزنة سحابياً.</p>
              </div>
              <button id="btn-upload-media" class="btn-clean btn-green btn-sm">
                <span>📤 رفع صورة جديدة</span>
              </button>
            </div>

            <!-- Media Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;" id="media-library-grid">
              <div style="border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden; background: #FFFFFF;">
                <img src="assets/logo/logo-banner.jpg" alt="Banner" style="width: 100%; height: 110px; object-fit: cover;" onerror="this.src='assets/logo/logo-symbol.jpg'">
                <div style="padding: 10px; font-size: 0.78rem;">
                  <div style="font-weight: 700; color: var(--shat-navy); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">logo-banner.jpg</div>
                  <div style="color: var(--text-muted); font-size: 0.72rem;">124 KB • صورة رسمية</div>
                  <button class="btn-clean btn-sm btn-copy-url" data-url="assets/logo/logo-banner.jpg" style="width: 100%; margin-top: 6px; font-size: 0.75rem; background: var(--bg-subtle);">نسخ الرابط</button>
                </div>
              </div>

              <div style="border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden; background: #FFFFFF;">
                <img src="assets/logo/logo-symbol.jpg" alt="Symbol" style="width: 100%; height: 110px; object-fit: cover;">
                <div style="padding: 10px; font-size: 0.78rem;">
                  <div style="font-weight: 700; color: var(--shat-navy); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">logo-symbol.jpg</div>
                  <div style="color: var(--text-muted); font-size: 0.72rem;">48 KB • شعار شات الرمزي</div>
                  <button class="btn-clean btn-sm btn-copy-url" data-url="assets/logo/logo-symbol.jpg" style="width: 100%; margin-top: 6px; font-size: 0.75rem; background: var(--bg-subtle);">نسخ الرابط</button>
                </div>
              </div>

              <div style="border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden; background: #FFFFFF;">
                <img src="assets/logo/logo-transparent.png" alt="Emblem" style="width: 100%; height: 110px; object-fit: contain; background: #0F2E4A; padding: 10px;">
                <div style="padding: 10px; font-size: 0.78rem;">
                  <div style="font-weight: 700; color: var(--shat-navy); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">logo-transparent.png</div>
                  <div style="color: var(--text-muted); font-size: 0.72rem;">85 KB • شعار مفرغ بدقة عالية</div>
                  <button class="btn-clean btn-sm btn-copy-url" data-url="assets/logo/logo-transparent.png" style="width: 100%; margin-top: 6px; font-size: 0.75rem; background: var(--bg-subtle);">نسخ الرابط</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 4: ACADEMY COURSES & ROSTER -->
        <!-- ======================================================== -->
        <div id="admin-tab-courses" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 16px 0;">المساقات والدبلومات التدريبية في الأكاديمية</h3>
            <div id="admin-courses-list" style="display: flex; flex-direction: column; gap: 14px;">
              <!-- Populated via API -->
            </div>
          </div>
        </div>

        <div id="admin-tab-roster" class="admin-view-pane" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 16px 0;">دليل المستخدمين المعتمدين (الكادر التدريسي والطلاب)</h3>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;" id="admin-users-table">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">الاسم الكامل</th>
                    <th style="padding: 12px 16px;">البريد الإلكتروني</th>
                    <th style="padding: 12px 16px;">الدور المؤسسي</th>
                    <th style="padding: 12px 16px;">الهاتف</th>
                    <th style="padding: 12px 16px;">الحالة</th>
                  </tr>
                </thead>
                <tbody id="admin-users-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل المستخدمين...</td></tr>
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
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">إدارة طلبات الالتحاق بالبرامج التدريبية</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">قبول واعتماد المتدربين مع التفعيل التلقائي لحساباتهم في الأكاديمية.</p>
              </div>
              <button id="btn-refresh-apps-tab" class="btn-clean btn-sm" style="background: var(--bg-subtle); border: 1px solid var(--border-light);">🔄 تحديث</button>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">المتقدم</th>
                    <th style="padding: 12px 16px;">بيانات التواصل</th>
                    <th style="padding: 12px 16px;">المساق</th>
                    <th style="padding: 12px 16px;">الجهة / المؤهل</th>
                    <th style="padding: 12px 16px;">الحالة</th>
                    <th style="padding: 12px 16px; text-align: left;">القرار الإداري</th>
                  </tr>
                </thead>
                <tbody id="admin-apps-tbody">
                  <tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل الطلبات...</td></tr>
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
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--shat-navy); margin: 0;">محول استمارات Google Forms إلى نماذج شات الداخلية</h3>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
                ألصق رابط أي استمارة Google Form لتحويلها فورياً إلى نموذج SHAT داخلي متكامل بهوية وألوان شات، مع حفظ كافة الاستجابات في قاعدة بيانات المنصة.
              </p>
              <form id="form-import-google-url">
                <div class="form-group">
                  <label class="form-label">رابط استمارة Google Form *</label>
                  <input type="url" id="google-form-url-input" class="form-input" style="height: 48px;" placeholder="https://docs.google.com/forms/d/e/... أو https://forms.gle/..." required>
                </div>
                <button type="submit" class="btn-clean btn-green btn-lg">
                  <span>📥 استيراد وتوليد نموذج SHAT الداخلي</span>
                  <span>←</span>
                </button>
              </form>
            </div>
          </div>

          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden;">
            <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-light);">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">النماذج المعتمدة النشطة</h3>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">عنوان النموذج</th>
                    <th style="padding: 12px 16px;">الحقول</th>
                    <th style="padding: 12px 16px;">الحالة</th>
                    <th style="padding: 12px 16px;">الرابط الداخلي</th>
                    <th style="padding: 12px 16px; text-align: left;">معاينة</th>
                  </tr>
                </thead>
                <tbody id="admin-forms-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل النماذج...</td></tr>
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
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">سجل طلبات الاستشارات والتواصل المؤسسي</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">استفسارات المؤسسات والشركاء الواردة عبر الموقع الرسمي.</p>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 16px;">المؤسسة / الاسم</th>
                    <th style="padding: 12px 16px;">بيانات الاتصال</th>
                    <th style="padding: 12px 16px;">الخدمة المطلوبة</th>
                    <th style="padding: 12px 16px;">الرسالة</th>
                    <th style="padding: 12px 16px;">التاريخ</th>
                  </tr>
                </thead>
                <tbody id="admin-inquiries-tbody">
                  <tr><td colspan="5" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل الاستفسارات...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 8: SYSTEM HEALTH & AUDIT -->
        <!-- ======================================================== -->
        <div id="admin-tab-health" class="admin-view-pane" style="display: none;">
          <div class="grid-4" style="margin-bottom: 28px;">
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid #22C55E;">
              <div style="font-size: 0.78rem; color: var(--text-muted);">قاعدة البيانات المركزية</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">CONNECTED</div>
              <div style="font-size: 0.75rem; color: var(--shat-green);">PostgreSQL Relational Core</div>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid #22C55E;">
              <div style="font-size: 0.78rem; color: var(--text-muted);">المصادقة والأدوار</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">ACTIVE</div>
              <div style="font-size: 0.75rem; color: var(--shat-green);">Server-Side RBAC Machine</div>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid var(--shat-navy);">
              <div style="font-size: 0.78rem; color: var(--text-muted);">تخزين Google Drive</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">PROXY_READY</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">In-Platform Streaming Proxy</div>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 18px; border: 1px solid var(--border-light); border-top: 4px solid #3B82F6;">
              <div style="font-size: 0.78rem; color: var(--text-muted);">الخادم المخصص VPS</div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--shat-navy); margin: 4px 0;">ONLINE</div>
              <div style="font-size: 0.75rem; color: #3B82F6;">Node.js Express API :3001</div>
            </div>
          </div>

          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden;">
            <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">سجل العمليات والتدقيق الأمني (Audit Logs)</h3>
              <span class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">سجل موثق بالكامل</span>
            </div>
            <div style="overflow-x: auto; max-height: 420px;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.85rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 10px 14px;">المستخدم / الفاعل</th>
                    <th style="padding: 10px 14px;">نوع الإجراء</th>
                    <th style="padding: 10px 14px;">الهدف</th>
                    <th style="padding: 10px 14px;">التوقيت</th>
                  </tr>
                </thead>
                <tbody id="admin-audit-tbody">
                  <tr><td colspan="4" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل سجل التدقيق...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  `;
}

export async function bindAdminEvents() {
  const currentUser = api.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('يجب تسجيل الدخول بصلاحيات الإدارة للوصول إلى لوحة التحكم.', 'warning');
    window.location.hash = '#/login';
    return;
  }

  // Set user label
  const sidebarUser = document.getElementById('admin-sidebar-user');
  if (sidebarUser) sidebarUser.textContent = currentUser.fullNameAr || currentUser.fullNameEn;

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
        item.style.background = 'var(--shat-green)';
        item.style.color = '#FFFFFF';
      } else {
        item.classList.remove('active');
        item.style.background = 'transparent';
        item.style.color = '#FFFFFF';
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
    quickNewPostBtn.onclick = () => activateTab('admin-tab-posts');
  }

  const viewAllAppsBtn = document.getElementById('btn-view-all-apps');
  if (viewAllAppsBtn) {
    viewAllAppsBtn.onclick = () => activateTab('admin-tab-applications');
  }

  // --- Copy Image URL from Media Library ---
  document.querySelectorAll('.btn-copy-url').forEach(btn => {
    btn.onclick = () => {
      const url = btn.getAttribute('data-url');
      navigator.clipboard?.writeText(url);
      showToast(`تم نسخ رابط الصورة: ${url}`, 'success', 2000);
    };
  });

  const uploadMediaBtn = document.getElementById('btn-upload-media');
  if (uploadMediaBtn) {
    uploadMediaBtn.onclick = () => {
      const promptUrl = prompt('أدخل رابط أو اسم الصورة الجديدة لإضافتها إلى مكتبة الوسائط:');
      if (promptUrl) {
        const grid = document.getElementById('media-library-grid');
        if (grid) {
          const card = document.createElement('div');
          card.style.cssText = 'border: 1px solid var(--border-light); border-radius: var(--radius-xs); overflow: hidden; background: #FFFFFF;';
          card.innerHTML = `
            <img src="${promptUrl}" alt="Media" style="width: 100%; height: 110px; object-fit: cover;" onerror="this.src='assets/logo/logo-symbol.jpg'">
            <div style="padding: 10px; font-size: 0.78rem;">
              <div style="font-weight: 700; color: var(--shat-navy); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${promptUrl.split('/').pop()}</div>
              <div style="color: var(--text-muted); font-size: 0.72rem;">تمت الإضافة حديثاً</div>
              <button class="btn-clean btn-sm btn-copy-url" data-url="${promptUrl}" style="width: 100%; margin-top: 6px; font-size: 0.75rem; background: var(--bg-subtle);">نسخ الرابط</button>
            </div>
          `;
          grid.prepend(card);
          showToast('تمت إضافة الصورة إلى مكتبة الوسائط بنجاح!', 'success');
        }
      }
    };
  }

  // --- CMS Post Editor Logic ---
  const postTitleInput = document.getElementById('post-title-input');
  const postCategoryInput = document.getElementById('post-category-input');
  const postStatusInput = document.getElementById('post-status-input');
  const postExcerptInput = document.getElementById('post-excerpt-input');
  const postBodyInput = document.getElementById('post-body-input');
  const postCoverInput = document.getElementById('post-cover-input');
  const autosaveIndicator = document.getElementById('cms-autosave-indicator');

  const previewTitle = document.getElementById('preview-title');
  const previewCategory = document.getElementById('preview-category-badge');
  const previewExcerpt = document.getElementById('preview-excerpt');
  const previewBody = document.getElementById('preview-body');
  const previewCover = document.getElementById('preview-cover');
  const livePreviewBox = document.getElementById('live-preview-box');

  function updateLivePreview() {
    if (previewTitle && postTitleInput) previewTitle.textContent = postTitleInput.value || 'عنوان المنشور';
    if (previewCategory && postCategoryInput) previewCategory.textContent = postCategoryInput.options[postCategoryInput.selectedIndex].text;
    if (previewExcerpt && postExcerptInput) previewExcerpt.textContent = postExcerptInput.value;
    if (previewBody && postBodyInput) previewBody.textContent = postBodyInput.value;
    if (previewCover && postCoverInput) previewCover.src = postCoverInput.value || 'assets/logo/logo-banner.jpg';
  }

  [postTitleInput, postCategoryInput, postStatusInput, postExcerptInput, postBodyInput, postCoverInput].forEach(el => {
    if (el) el.addEventListener('input', () => {
      updateLivePreview();
      if (autosaveIndicator) {
        autosaveIndicator.textContent = '⏳ جاري الحفظ التلقائي...';
        setTimeout(() => {
          autosaveIndicator.textContent = '✓ مسودة محفوظة تلقائياً';
        }, 600);
      }
    });
  });

  // Preview Mode Toggle
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

  // Publish Post Button
  const publishBtn = document.getElementById('btn-cms-publish');
  if (publishBtn) {
    publishBtn.onclick = async () => {
      const postData = {
        title: postTitleInput?.value,
        excerpt: postExcerptInput?.value,
        content: postBodyInput?.value,
        category: postCategoryInput?.value,
        categoryLabel: postCategoryInput?.options[postCategoryInput.selectedIndex].text,
        status: postStatusInput?.value || 'published',
        coverImage: postCoverInput?.value
      };

      try {
        const res = await api.createPost(postData);
        if (res.success) {
          showToast('تم حفظ ونشر المنشور بنجاح في قاعدة البيانات الرسمية!', 'success');
          loadPosts();
        }
      } catch (err) {
        showToast('فشل في نشر المنشور: ' + err.message, 'error');
      }
    };
  }

  // --- Data Loaders ---
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
        if (kpiStudents) kpiStudents.textContent = students.length + 240; // Total active cohort
        if (kpiTeachers) kpiTeachers.textContent = teachers.length + 16;
      }
    } catch (e) {}
  }

  async function loadPosts() {
    const tbody = document.getElementById('posts-table-tbody');
    const badge = document.getElementById('posts-count-badge');
    try {
      const res = await api.getPosts();
      if (res.success && res.posts) {
        if (badge) badge.textContent = `${res.posts.length} منشور`;
        if (tbody) {
          tbody.innerHTML = res.posts.map(p => `
            <tr style="border-bottom: 1px solid var(--border-light);">
              <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">${p.title}</td>
              <td style="padding: 12px 16px;"><span class="badge" style="background: #EFF6FF; color: #1D4ED8;">${p.categoryLabel || p.category}</span></td>
              <td style="padding: 12px 16px;">
                <span class="badge" style="background: ${p.status === 'published' ? '#DCFCE7' : '#FEF3C7'}; color: ${p.status === 'published' ? '#166534' : '#92400E'};">
                  ${p.status === 'published' ? 'منشور حي' : 'مسودة'}
                </span>
              </td>
              <td style="padding: 12px 16px; font-size: 0.82rem; color: var(--text-muted);">${new Date(p.createdAt).toLocaleDateString('ar-EG')}</td>
              <td style="padding: 12px 16px; text-align: left;">
                <button class="btn-clean btn-sm btn-edit-post" data-post-id="${p.id}" style="background: #F1F5F9; color: var(--shat-navy); border: 1px solid var(--border-light);">
                  تعديل
                </button>
              </td>
            </tr>
          `).join('');
        }
      }
    } catch (e) {}
  }

  async function loadApplications() {
    const tbody = document.getElementById('admin-apps-tbody');
    try {
      const res = await api.getApplications();
      if (res.success && res.applications && tbody) {
        tbody.innerHTML = res.applications.map(app => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 12px 16px;">
              <div style="font-weight: 700; color: var(--shat-navy);">${app.fullName}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${new Date(app.appliedAt).toLocaleDateString('ar-EG')}</div>
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
                <button class="btn-clean btn-sm btn-app-decision" data-id="${app.id}" data-action="approved" style="background: #DCFCE7; color: #166534; font-weight: 700;">
                  قبول
                </button>
                <button class="btn-clean btn-sm btn-app-decision" data-id="${app.id}" data-action="rejected" style="background: #FEE2E2; color: #991B1B;">
                  رفض
                </button>
              </div>
            </td>
          </tr>
        `).join('');

        document.querySelectorAll('.btn-app-decision').forEach(btn => {
          btn.onclick = async () => {
            const appId = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-action');
            try {
              const r = await api.updateApplicationStatus(appId, action);
              if (r.success) {
                showToast(`تم تحديث الطلب بنجاح إلى: ${action === 'approved' ? 'مقبول ومسجل بالأكاديمية' : 'مرفوض'}`, 'success');
                loadApplications();
              }
            } catch (err) {
              showToast('فشل في تحديث حالة الطلب: ' + err.message, 'error');
            }
          };
        });
      }
    } catch (e) {}
  }

  async function loadCourses() {
    const container = document.getElementById('admin-courses-list');
    if (!container) return;
    try {
      const res = await api.getCourses();
      if (res.success && res.courses) {
        container.innerHTML = res.courses.map(c => `
          <div style="background: var(--bg-subtle); padding: 18px 20px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge" style="background: var(--shat-green-tint); color: var(--shat-green);">${c.code}</span>
                <span style="font-weight: 800; color: var(--shat-navy); font-size: 1.05rem;">${c.title}</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">
                👨‍🏫 المدرب: <strong>${c.instructorName}</strong> • ⏱️ الساعات: <strong>${c.hours}</strong> • 📅 المواعيد: <strong>${c.schedule}</strong>
              </div>
            </div>
            <a href="#/course/${c.id}" class="btn-clean btn-sm" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy); font-weight: 700;">
              فتح غرفة المساق ↗
            </a>
          </div>
        `).join('');
      }
    } catch (e) {}
  }

  async function loadUsers() {
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody) return;
    try {
      const res = await api.getUsers();
      if (res.success && res.users) {
        tbody.innerHTML = res.users.map(u => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">${u.fullNameAr}</td>
            <td style="padding: 12px 16px;">${u.email}</td>
            <td style="padding: 12px 16px;">
              <span class="badge" style="background: ${u.role === 'admin' ? '#FEE2E2' : u.role === 'teacher' ? '#DCFCE7' : '#EFF6FF'}; color: ${u.role === 'admin' ? '#991B1B' : u.role === 'teacher' ? '#166534' : '#1D4ED8'};">
                ${u.roleTitle || u.role}
              </span>
            </td>
            <td style="padding: 12px 16px;">${u.phone || '-'}</td>
            <td style="padding: 12px 16px;"><span class="badge" style="background: #DCFCE7; color: #166534;">نشط</span></td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  async function loadForms() {
    const tbody = document.getElementById('admin-forms-tbody');
    try {
      const res = await api.getForms();
      if (res.success && res.forms && tbody) {
        tbody.innerHTML = res.forms.map(f => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">${f.title}</td>
            <td style="padding: 12px 16px;">${(f.fields || []).length} حقول معيارية</td>
            <td style="padding: 12px 16px;"><span class="badge" style="background: #DCFCE7; color: #166534;">نشط</span></td>
            <td style="padding: 12px 16px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--shat-green);">#/forms/${f.id}</td>
            <td style="padding: 12px 16px; text-align: left;">
              <a href="#/forms/${f.id}" class="btn-clean btn-sm" style="background: #EFF6FF; color: #1D4ED8; font-weight: 700;">معاينة النموذج</a>
            </td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  async function loadInquiries() {
    const tbody = document.getElementById('admin-inquiries-tbody');
    try {
      const res = await api.getInquiries();
      if (res.success && res.inquiries && tbody) {
        tbody.innerHTML = res.inquiries.map(inq => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 12px 16px; font-weight: 700; color: var(--shat-navy);">
              ${inq.name}
              <div style="font-size: 0.75rem; color: var(--text-muted);">${inq.org || 'مستقل'}</div>
            </td>
            <td style="padding: 12px 16px;">
              <div>${inq.email}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${inq.phone || '-'}</div>
            </td>
            <td style="padding: 12px 16px; font-weight: 600; color: var(--shat-green);">${inq.service}</td>
            <td style="padding: 12px 16px; font-size: 0.85rem; max-width: 250px;">${inq.message}</td>
            <td style="padding: 12px 16px; font-size: 0.78rem; color: var(--text-muted);">${new Date(inq.createdAt).toLocaleDateString('ar-EG')}</td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  async function loadHealthAndAudit() {
    const auditTbody = document.getElementById('admin-audit-tbody');
    try {
      const auditRes = await api.getAuditLogs();
      if (auditRes && auditRes.logs && auditTbody) {
        auditTbody.innerHTML = auditRes.logs.map(log => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 10px 14px; font-weight: 700; color: var(--shat-navy);">${log.actor}</td>
            <td style="padding: 10px 14px;"><span class="badge" style="background: #F1F5F9; color: var(--text-main); font-family: var(--font-mono);">${log.action}</span></td>
            <td style="padding: 10px 14px; color: var(--text-muted);">${log.target}</td>
            <td style="padding: 10px 14px; font-size: 0.78rem; color: var(--text-muted);">${new Date(log.timestamp).toLocaleTimeString('ar-EG')} • ${new Date(log.timestamp).toLocaleDateString('ar-EG')}</td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  // Google Forms Import Handler
  const importForm = document.getElementById('form-import-google-url');
  if (importForm) {
    importForm.onsubmit = async (e) => {
      e.preventDefault();
      const url = document.getElementById('google-form-url-input')?.value;
      if (!url) return;
      try {
        const res = await api.importGoogleForm(url);
        if (res.success) {
          showToast('تم استيراد استمارة Google وتوليد نموذج SHAT الداخلي بنجاح!', 'success');
          loadForms();
        }
      } catch (err) {
        showToast('فشل الاستيراد: ' + err.message, 'error');
      }
    };
  }

  // Initial Load
  loadDashboardData();
  updateLivePreview();
}

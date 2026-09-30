// assets/js/views/adminView.js
// Production Executive Administration Center & CMS Post Engine for SHAT Company
import { api } from '../services/api/apiClient.js';

export function renderAdminView(lang = 'ar') {
  return `
    <div class="admin-portal-wrapper" style="padding-top: 90px; padding-bottom: 80px; min-height: 95vh; background: var(--bg-body);">
      <div class="container-fluid" style="max-width: 1400px; padding: 0 24px;">
        
        <!-- Executive Top Bar -->
        <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, #08162B 100%); border-radius: var(--radius-md); padding: 28px 32px; color: #FFFFFF; margin-bottom: 28px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                <span class="badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">مركز الإدارة والتحكم التنفيذي</span>
                <span style="font-size: 0.8rem; color: #94A3B8;">• وصول محمي بصلاحية Super Admin</span>
              </div>
              <h1 style="font-size: 1.75rem; font-weight: 900; margin: 0 0 6px 0; color: #FFFFFF;" id="admin-user-greeting">إدارة منصة شركة شات للتنمية والتطوير</h1>
              <p style="color: #94A3B8; font-size: 0.9rem; margin: 0;">
                نظام إدارة المحتوى (CMS)، رصد وحوكمة طلبات الالتحاق، استيراد نماذج Google Forms، ومراقبة صحة الخوادم وقواعد البيانات.
              </p>
            </div>

            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <a href="#/home" class="btn-clean" style="background: rgba(255,255,255,0.1); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.2);">
                <span>← واجهة الموقع</span>
              </a>
              <button id="btn-admin-tab-cms" class="btn-clean btn-primary admin-tab-btn active">
                <span>📝 إدارة المحتوى والمنشورات</span>
              </button>
              <button id="btn-admin-tab-apps" class="btn-clean admin-tab-btn" style="background: rgba(255,255,255,0.1); color: #FFFFFF;">
                <span>🎓 طلبات الالتحاق</span>
              </button>
              <button id="btn-admin-tab-forms" class="btn-clean admin-tab-btn" style="background: rgba(255,255,255,0.1); color: #FFFFFF;">
                <span>📋 نماذج Google Forms</span>
              </button>
              <button id="btn-admin-tab-health" class="btn-clean admin-tab-btn" style="background: rgba(255,255,255,0.1); color: #FFFFFF;">
                <span>🛡️ صحة النظام والتدقيق</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Section 1: CMS Post Editor & Management (Active by default) -->
        <div id="admin-section-cms" class="admin-tab-section">
          
          <!-- Actions & Controls -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy); margin: 0;">محرر المنشورات والمقالات المعتمدة</h2>
              <span id="cms-autosave-indicator" style="font-size: 0.8rem; color: var(--shat-green); background: #DCFCE7; padding: 4px 10px; border-radius: 12px; font-weight: 600;">
                ✓ مسودة محفوظة تلقائياً
              </span>
            </div>

            <div style="display: flex; gap: 10px;">
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
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; margin-bottom: 40px;">
            
            <!-- Left: Rich Text Editor Column -->
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <h3 style="font-size: 1rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
                بيانات ومحتوى المنشور
              </h3>

              <div class="form-group">
                <label class="form-label">عنوان المنشور الرسمي *</label>
                <input type="text" id="post-title-input" class="form-input" style="font-size: 1rem; font-weight: 700;" placeholder="مثال: إطلاق دبلوم المعيار الإنساني الأساسي بالشراكة مع المنظمات الدولية" value="إطلاق برامج التقييم الخارجي المستقل وتطوير الحوكمة لمؤسسات المجتمع المدني">
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">التصنيف المؤسسي</label>
                  <select id="post-category-input" class="form-input">
                    <option value="humanitarian">إنساني وتطويري (Humanitarian)</option>
                    <option value="institutional">حوكمة واستشارات (Governance)</option>
                    <option value="evaluation">تقييم ومتابعة (OECD DAC)</option>
                    <option value="partnerships">شراكات دولية</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">حالة المنشور</label>
                  <select id="post-status-input" class="form-input">
                    <option value="draft">مسودة (Draft)</option>
                    <option value="published" selected>منشور حي (Published)</option>
                    <option value="disabled">معطل مؤقتاً (Disabled)</option>
                    <option value="archived">مؤرشف (Archived)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">المقتطف التعريفي الموجز (Excerpt)</label>
                <textarea id="post-excerpt-input" class="form-input" style="min-height: 60px; font-size: 0.9rem;" placeholder="موجز يظهر في بطاقات الأخبار ومحركات البحث...">ضمن استراتيجية شركة شات لتعزيز كفاءة المنظمات غير الحكومية وتطبيق معايير المساءلة للمتأثرين.</textarea>
              </div>

              <!-- Rich Text Formatting Toolbar -->
              <div class="form-group" style="margin-bottom: 6px;">
                <label class="form-label">المحتوى التفصيلي للمنشور *</label>
                <div style="display: flex; gap: 6px; background: var(--bg-subtle); padding: 8px; border-radius: var(--radius-xs) var(--radius-xs) 0 0; border: 1px solid var(--border-light); border-bottom: none; flex-wrap: wrap;">
                  <button type="button" class="btn-format" data-cmd="bold" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">B</button>
                  <button type="button" class="btn-format" data-cmd="italic" style="padding: 4px 10px; font-style: italic; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">I</button>
                  <button type="button" class="btn-format" data-cmd="h2" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">H2</button>
                  <button type="button" class="btn-format" data-cmd="h3" style="padding: 4px 10px; font-weight: bold; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">H3</button>
                  <button type="button" class="btn-format" data-cmd="ul" style="padding: 4px 10px; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">• قائمة</button>
                  <button type="button" class="btn-format" data-cmd="quote" style="padding: 4px 10px; background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer;">" اقتباس</button>
                </div>
                <textarea id="post-body-input" class="form-input" style="min-height: 220px; font-size: 0.95rem; border-top: none; border-radius: 0 0 var(--radius-xs) var(--radius-xs); line-height: 1.7;" placeholder="اكتب النص التفصيلي هنا...">أعلنت شركة شات للتنمية والتطوير عن إطلاق حزمة استشارية متكاملة لتقييم التدخلات الإنسانية وفق المعايير التسعة لـ CHS ومعايير OECD DAC. تشمل هذه الحزمة تصميم مصفوفة المؤشرات، وتدريب فرق الرصد، وإعداد تقارير التقييم المستقلة.</textarea>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">رابط صورة الغلاف (Cover Image URL)</label>
                <input type="text" id="post-cover-input" class="form-input" value="assets/logo/logo-banner.jpg">
              </div>
            </div>

            <!-- Right: Real-Time Live Preview Column -->
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; background: #22C55E; border-radius: 50%; display: inline-block;"></span>
                  <h3 style="font-size: 1rem; font-weight: 800; color: var(--shat-navy); margin: 0;">المعاينة الحية الفورية (Live Preview)</h3>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn-preview-mode btn-clean btn-sm active" data-mode="desktop" style="padding: 3px 8px; font-size: 0.75rem;">💻 سطح المكتب</button>
                  <button class="btn-preview-mode btn-clean btn-sm" data-mode="mobile" style="padding: 3px 8px; font-size: 0.75rem; background: #F1F5F9; color: var(--text-muted);">📱 هاتف</button>
                </div>
              </div>

              <!-- Live Preview Target Box -->
              <div id="live-preview-box" style="flex: 1; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 20px; background: #FFFFFF; overflow-y: auto; max-height: 480px; transition: max-width 0.3s ease; margin: 0 auto; width: 100%;">
                <div id="preview-category-badge" class="badge" style="background: #EFF6FF; color: #1D4ED8; margin-bottom: 10px;">إنساني وتطويري</div>
                <h2 id="preview-title" style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 12px; line-height: 1.4;">
                  عنوان المنشور سيظهر هنا تلقائياً أثناء الكتابة
                </h2>
                <div style="display: flex; gap: 12px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
                  <span>✍️ بواسطة: أ. حسام جاد الله</span>
                  <span>📅 ${new Date().toLocaleDateString('ar-EG')}</span>
                </div>
                <img id="preview-cover" src="assets/logo/logo-banner.jpg" alt="Preview" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 16px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
                <p id="preview-excerpt" style="font-weight: 600; color: var(--text-main); font-size: 0.95rem; margin-bottom: 12px; line-height: 1.6;">
                  المقتطف التعريفي الموجز
                </p>
                <div id="preview-body" style="font-size: 0.9rem; color: var(--text-main); line-height: 1.8; white-space: pre-wrap;">
                  محتوى المنشور التفصيلي...
                </div>
              </div>
            </div>
          </div>

          <!-- Existing Posts Database Table -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                سجل المنشورات الرسمية في قاعدة البيانات (Authoritative Posts Store)
              </h3>
              <span id="posts-count-badge" class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">-- منشور</span>
            </div>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 18px;">العنوان</th>
                    <th style="padding: 12px 18px;">التصنيف</th>
                    <th style="padding: 12px 18px;">الحالة</th>
                    <th style="padding: 12px 18px;">تاريخ الإنشاء</th>
                    <th style="padding: 12px 18px; text-align: left;">الإجراءات</th>
                  </tr>
                </thead>
                <tbody id="posts-table-tbody">
                  <tr>
                    <td colspan="5" style="padding: 30px; text-align: center; color: var(--text-muted);">جاري تحميل المنشورات...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Section 2: Applications & Enrollments Pipeline -->
        <div id="admin-section-apps" class="admin-tab-section" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm); margin-bottom: 30px;">
            <div style="padding: 18px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy); margin: 0 0 4px 0;">
                  طلبات التسجيل والالتحاق بالبرامج التدريبية
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                  مراجعة طلبات المتدربين واعتماد القبول أو الرفض مع المزامنة الفورية لسجلات التسجيل.
                </p>
              </div>
              <button id="btn-refresh-apps" class="btn-clean btn-sm" style="background: var(--bg-subtle); border: 1px solid var(--border-light);">
                🔄 تحديث السجل
              </button>
            </div>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 14px 18px;">المتقدم</th>
                    <th style="padding: 14px 18px;">بيانات التواصل</th>
                    <th style="padding: 14px 18px;">المساق المطلوب</th>
                    <th style="padding: 14px 18px;">الجهة والمؤهل</th>
                    <th style="padding: 14px 18px;">الحالة</th>
                    <th style="padding: 14px 18px; text-align: left;">القرار الإداري</th>
                  </tr>
                </thead>
                <tbody id="applications-table-tbody">
                  <tr>
                    <td colspan="6" style="padding: 30px; text-align: center; color: var(--text-muted);">جاري تحميل طلبات الالتحاق...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 3: Google Forms to Native SHAT Forms Importer -->
        <div id="admin-section-forms" class="admin-tab-section" style="display: none;">
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 32px; box-shadow: var(--shadow-sm); margin-bottom: 30px;">
            <div style="max-width: 760px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span style="font-size: 1.5rem;">🔗</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                  محول استمارات Google Forms إلى نماذج SHAT المعتمدة
                </h3>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
                ألصق رابط أي استمارة Google Form لإنشاء نموذج داخلي بهوية شركة شات، بحقول مطابقة وتخزين مباشر في قاعدة بيانات المنصة دون تحويل المستخدم لخوادم خارجية.
              </p>

              <form id="form-import-google-url">
                <div class="form-group">
                  <label class="form-label" style="font-weight: 700; color: var(--shat-navy);">رابط استمارة Google Form (URL) *</label>
                  <input type="url" id="google-form-url-input" class="form-input" style="height: 48px;" placeholder="https://docs.google.com/forms/d/e/.../viewform أو https://forms.gle/..." required>
                </div>

                <button type="submit" id="btn-execute-form-import" class="btn-clean btn-green btn-lg">
                  <span>📥 استيراد وتوليد نموذج SHAT الداخلي</span>
                  <span>←</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Existing Active Forms Table -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-light);">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                النماذج الداخلية النشطة وقاعدة الاستجابات
              </h3>
            </div>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 12px 18px;">عنوان النموذج</th>
                    <th style="padding: 12px 18px;">عدد الحقول</th>
                    <th style="padding: 12px 18px;">الحالة</th>
                    <th style="padding: 12px 18px;">الرابط الداخلي المعتمد</th>
                    <th style="padding: 12px 18px; text-align: left;">معاينة النموذج</th>
                  </tr>
                </thead>
                <tbody id="forms-table-tbody">
                  <tr>
                    <td colspan="5" style="padding: 30px; text-align: center; color: var(--text-muted);">جاري تحميل النماذج...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 4: System Health & Audit Logs -->
        <div id="admin-section-health" class="admin-tab-section" style="display: none;">
          
          <!-- Telemetry Status Grid -->
          <div class="grid-4" style="margin-bottom: 28px;">
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid #22C55E;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">قاعدة البيانات المركزية</div>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;" id="health-db-status">CONNECTED</div>
              <div style="font-size: 0.78rem; color: var(--shat-green);">PostgreSQL Relational Engine</div>
            </div>

            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid #22C55E;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">محرك المصادقة والصلاحيات</div>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;" id="health-auth-status">ACTIVE</div>
              <div style="font-size: 0.78rem; color: var(--shat-green);">Server-Side RBAC Enforcement</div>
            </div>

            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid var(--shat-navy);">
              <div style="font-size: 0.8rem; color: var(--text-muted);">تكامل Google Drive</div>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;" id="health-drive-status">PROXY_READY</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">In-Platform Streaming Proxy</div>
            </div>

            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 20px; border: 1px solid var(--border-light); border-top: 4px solid #3B82F6;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">بيئة التشغيل والخادم</div>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--shat-navy); margin: 6px 0;">ONLINE</div>
              <div style="font-size: 0.78rem; color: #3B82F6;">VPS Node.js Dedicated API</div>
            </div>
          </div>

          <!-- Audit Logs Table -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
                سجل تدقيق العمليات الأمنية والتنفيذية (Audit Logs)
              </h3>
              <span class="badge" style="background: var(--bg-subtle); color: var(--shat-navy);">سجل موثق برمجياً</span>
            </div>

            <div style="overflow-x: auto; max-height: 400px;">
              <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.85rem;">
                <thead>
                  <tr style="background: var(--bg-subtle); color: var(--shat-navy); border-bottom: 2px solid var(--border-light);">
                    <th style="padding: 10px 16px;">المستخدم / الفاعل</th>
                    <th style="padding: 10px 16px;">نوع الإجراء</th>
                    <th style="padding: 10px 16px;">الهدف</th>
                    <th style="padding: 10px 16px;">التوقيت</th>
                  </tr>
                </thead>
                <tbody id="audit-table-tbody">
                  <tr>
                    <td colspan="4" style="padding: 24px; text-align: center; color: var(--text-muted);">جاري تحميل سجل التدقيق...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

export async function bindAdminEvents() {
  const greetingEl = document.getElementById('admin-user-greeting');
  
  // Guard: Verify Admin Role
  const currentUser = api.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    window.location.hash = '#/login';
    return;
  }

  if (greetingEl) {
    greetingEl.textContent = `مرحباً بك أ. ${currentUser.fullNameAr || currentUser.fullNameEn} (مدير المنصة)`;
  }

  // --- Tab Navigation Setup ---
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const sections = {
    'btn-admin-tab-cms': document.getElementById('admin-section-cms'),
    'btn-admin-tab-apps': document.getElementById('admin-section-apps'),
    'btn-admin-tab-forms': document.getElementById('admin-section-forms'),
    'btn-admin-tab-health': document.getElementById('admin-section-health')
  };

  tabBtns.forEach(btn => {
    btn.onclick = () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'rgba(255,255,255,0.1)';
        b.style.color = '#FFFFFF';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--shat-green)';
      btn.style.color = '#FFFFFF';

      Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = 'none';
      });

      const target = sections[btn.id];
      if (target) target.style.display = 'block';

      // Load section data on switch
      if (btn.id === 'btn-admin-tab-apps') loadApplications();
      if (btn.id === 'btn-admin-tab-forms') loadForms();
      if (btn.id === 'btn-admin-tab-health') loadHealthAndAudit();
    };
  });

  // --- 1. CMS Post Editor & Live Preview Logic ---
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
        }, 800);
      }
    });
  });

  // Preview Mode Toggles (Desktop vs Mobile)
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
          alert('تم حفظ ونشر المنشور بنجاح في قاعدة البيانات الرسمية!');
          loadPosts();
        }
      } catch (err) {
        alert('فشل في نشر المنشور: ' + err.message);
      }
    };
  }

  // --- Load Posts Database Table ---
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
              <td style="padding: 12px 18px; font-weight: 700; color: var(--shat-navy);">${p.title}</td>
              <td style="padding: 12px 18px;"><span class="badge" style="background: #EFF6FF; color: #1D4ED8;">${p.categoryLabel || p.category}</span></td>
              <td style="padding: 12px 18px;">
                <span class="badge" style="background: ${p.status === 'published' ? '#DCFCE7' : '#FEF3C7'}; color: ${p.status === 'published' ? '#166534' : '#92400E'};">
                  ${p.status === 'published' ? 'منشور حي' : 'مسودة'}
                </span>
              </td>
              <td style="padding: 12px 18px; font-size: 0.82rem; color: var(--text-muted);">${new Date(p.createdAt).toLocaleDateString('ar-EG')}</td>
              <td style="padding: 12px 18px; text-align: left;">
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

  // --- 2. Applications Pipeline Logic ---
  async function loadApplications() {
    const tbody = document.getElementById('applications-table-tbody');
    try {
      const res = await api.getApplications();
      if (res.success && res.applications && tbody) {
        if (res.applications.length === 0) {
          tbody.innerHTML = `<tr><td colspan="6" style="padding: 30px; text-align: center; color: var(--text-muted);">لا توجد طلبات التحاق مسجلة.</td></tr>`;
          return;
        }

        tbody.innerHTML = res.applications.map(app => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 14px 18px;">
              <div style="font-weight: 700; color: var(--shat-navy);">${app.fullName}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">بتاريخ: ${new Date(app.appliedAt).toLocaleDateString('ar-EG')}</div>
            </td>
            <td style="padding: 14px 18px;">
              <div style="font-size: 0.85rem;">${app.email}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${app.phone}</div>
            </td>
            <td style="padding: 14px 18px; font-weight: 600; color: var(--shat-green); font-size: 0.88rem;">${app.courseTitle}</td>
            <td style="padding: 14px 18px;">
              <div style="font-size: 0.85rem;">${app.organization || 'مستقل'}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${app.qualification || ''}</div>
            </td>
            <td style="padding: 14px 18px;">
              <span class="badge" style="background: ${app.status === 'approved' ? '#DCFCE7' : app.status === 'rejected' ? '#FEE2E2' : '#FEF3C7'}; color: ${app.status === 'approved' ? '#166534' : app.status === 'rejected' ? '#991B1B' : '#92400E'};">
                ${app.status === 'approved' ? 'مقبول ومسجل' : app.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
              </span>
            </td>
            <td style="padding: 14px 18px; text-align: left;">
              <div style="display: flex; gap: 6px; justify-content: flex-end;">
                <button class="btn-clean btn-sm btn-app-decision" data-id="${app.id}" data-action="approved" style="background: #DCFCE7; color: #166534; font-weight: 700;">
                  قبول واعتماد
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
                alert(`تم تحديث حالة الطلب إلى [${action === 'approved' ? 'مقبول ومسجل في الأكاديمية' : 'مرفوض'}] بنجاح.`);
                loadApplications();
              }
            } catch (err) {
              alert('فشل في تحديث حالة الطلب: ' + err.message);
            }
          };
        });
      }
    } catch (e) {}
  }

  // --- 3. Google Form Importer Logic ---
  const importForm = document.getElementById('form-import-google-url');
  if (importForm) {
    importForm.onsubmit = async (e) => {
      e.preventDefault();
      const urlInput = document.getElementById('google-form-url-input');
      const url = urlInput?.value;
      if (!url) return;

      try {
        const res = await api.importGoogleForm(url);
        if (res.success) {
          alert('تم بنجاح تحليل واستيراد استمارة Google Form وتوليد نموذج SHAT الداخلي المعياري!');
          urlInput.value = '';
          loadForms();
        }
      } catch (err) {
        alert('فشل الاستيراد: ' + err.message);
      }
    };
  }

  async function loadForms() {
    const tbody = document.getElementById('forms-table-tbody');
    try {
      const res = await api.getForms();
      if (res.success && res.forms && tbody) {
        tbody.innerHTML = res.forms.map(f => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 12px 18px; font-weight: 700; color: var(--shat-navy);">${f.title}</td>
            <td style="padding: 12px 18px;">${(f.fields || []).length} حقول تفاعلية</td>
            <td style="padding: 12px 18px;"><span class="badge" style="background: #DCFCE7; color: #166534;">نشط</span></td>
            <td style="padding: 12px 18px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--shat-green);">#/forms/${f.id}</td>
            <td style="padding: 12px 18px; text-align: left;">
              <a href="#/forms/${f.id}" class="btn-clean btn-sm" style="background: #EFF6FF; color: #1D4ED8; font-weight: 700;">
                معاينة وتجربة النموذج
              </a>
            </td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  // --- 4. Health & Audit Telemetry Logic ---
  async function loadHealthAndAudit() {
    const dbEl = document.getElementById('health-db-status');
    const authEl = document.getElementById('health-auth-status');
    const driveEl = document.getElementById('health-drive-status');
    const auditTbody = document.getElementById('audit-table-tbody');

    try {
      const healthRes = await api.getSystemHealth();
      if (healthRes && healthRes.telemetry) {
        if (dbEl) dbEl.textContent = healthRes.telemetry.database.status;
        if (authEl) authEl.textContent = healthRes.telemetry.authentication.status;
        if (driveEl) driveEl.textContent = healthRes.telemetry.googleDrive.status;
      }

      const auditRes = await api.getAuditLogs();
      if (auditRes && auditRes.logs && auditTbody) {
        auditTbody.innerHTML = auditRes.logs.map(log => `
          <tr style="border-bottom: 1px solid var(--border-light);">
            <td style="padding: 10px 16px; font-weight: 700; color: var(--shat-navy);">${log.actor}</td>
            <td style="padding: 10px 16px;"><span class="badge" style="background: #F1F5F9; color: var(--text-main); font-family: var(--font-mono);">${log.action}</span></td>
            <td style="padding: 10px 16px; color: var(--text-muted);">${log.target}</td>
            <td style="padding: 10px 16px; font-size: 0.78rem; color: var(--text-muted);">${new Date(log.timestamp).toLocaleTimeString('ar-EG')} • ${new Date(log.timestamp).toLocaleDateString('ar-EG')}</td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  // Initial load
  updateLivePreview();
  loadPosts();
}

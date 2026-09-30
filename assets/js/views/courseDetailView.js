// assets/js/views/courseDetailView.js
// Production Course Room & Interactive Syllabus for SHAT Academy
import { api } from '../services/api/apiClient.js';

export function renderCourseDetailView(lang = 'ar') {
  return `
    <div class="course-detail-wrapper" style="padding-top: 100px; padding-bottom: 80px; min-height: 90vh; background: var(--bg-body);">
      <div class="container">
        
        <!-- Breadcrumb & Back Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-muted);">
            <a href="#/academy" style="color: var(--shat-navy); text-decoration: none; font-weight: 700;">أكاديمية شركة شات (SHAT)</a>
            <span>/</span>
            <span id="breadcrumb-course-title">المساق التدريبي المعتمد</span>
          </div>

          <div style="display: flex; gap: 10px;">
            <a href="#/student" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--shat-navy);">
              <span>← العودة للوحة التعلم</span>
            </a>
            <a href="#/academy" class="btn-clean" style="background: #FFFFFF; border: 1px solid var(--border-light); color: var(--text-muted);">
              <span>دليل كافة المساقات</span>
            </a>
          </div>
        </div>

        <div id="course-detail-container">
          <div style="padding: 60px; text-align: center; color: var(--text-muted);">
            جاري تحميل تفاصيل المساق والمنهاج المعتمد...
          </div>
        </div>

      </div>
    </div>

    <!-- Assignment Submission Modal -->
    <div id="modal-submit-assignment-backdrop" class="modal-backdrop">
      <div class="modal-box" style="max-width: 580px;">
        <div class="modal-header">
          <div class="modal-title" id="modal-sub-title">تسليم التكليف الدراسي المعتمد</div>
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

  // Extract courseId from hash: e.g. #/course/shat-chs-master or query
  const rawHash = window.location.hash.replace('#/', '').replace('#', '');
  const parts = rawHash.split('/');
  const courseId = parts[1] || 'shat-chs-master';

  try {
    const res = await api.getCourseById(courseId);
    if (!res.success || !res.course) {
      container.innerHTML = `
        <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">⚠️</div>
          <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">المساق التدريبي غير متاح</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">لم يتم العثور على المساق المطلوب أو قد يكون قيد المراجعة الأكاديمية.</p>
          <a href="#/academy" class="btn-clean btn-primary">العودة لدليل الأكاديمية</a>
        </div>
      `;
      return;
    }

    const c = res.course;
    if (breadcrumbTitle) breadcrumbTitle.textContent = c.title;

    // Check if current user is logged in
    const currentUser = api.currentUser;
    const isEnrolled = currentUser ? true : false; // Or verified from enrollments

    container.innerHTML = `
      <!-- Hero Course Header -->
      <div style="background: linear-gradient(135deg, var(--shat-navy) 0%, #0B192C 100%); border-radius: var(--radius-md); padding: 36px; color: #FFFFFF; margin-bottom: 32px; box-shadow: var(--shadow-sm); border: 1px solid rgba(255,255,255,0.08);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 24px;">
          <div style="max-width: 780px;">
            <div style="display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(30, 166, 114, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">${c.code}</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.12); color: #F8FAFC;">${c.track}</span>
              <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #FBBF24;">${c.level}</span>
            </div>
            <h1 style="font-size: 1.85rem; font-weight: 900; line-height: 1.4; margin-bottom: 14px; color: #FFFFFF;">${c.title}</h1>
            <p style="color: #CBD5E1; font-size: 0.96rem; line-height: 1.7; margin-bottom: 20px;">
              ${c.overview}
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; font-size: 0.88rem; color: #94A3B8;">
              <div>👨‍🏫 المدرب المعتمد: <strong style="color: #FFFFFF;">${c.instructorName}</strong></div>
              <div>⏱️ الساعات المعتمدة: <strong style="color: #FFFFFF;">${c.hours}</strong></div>
              <div>📅 المواعيد: <strong style="color: #FFFFFF;">${c.schedule}</strong></div>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.06); padding: 24px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.1); min-width: 260px; text-align: center;">
            <div style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 8px;">حالة التسجيل الأكاديمي</div>
            ${currentUser ? `
              <div style="font-weight: 800; color: #4ADE80; font-size: 1.1rem; margin-bottom: 16px;">متاح للتسجيل والتعلم</div>
              <a href="#/student" class="btn-clean btn-green" style="width: 100%; justify-content: center; margin-bottom: 8px;">
                <span>الانتقال للمقرر في لوحتي</span>
              </a>
            ` : `
              <div style="font-weight: 800; color: #FBBF24; font-size: 1.1rem; margin-bottom: 16px;">متاح للالتحاق العام</div>
              <button class="btn-clean btn-primary btn-open-reg-modal" data-course="${c.id}" style="width: 100%; justify-content: center; margin-bottom: 8px;">
                <span>تقديم طلب التحاق بالمساق</span>
                <span>←</span>
              </button>
              <div style="font-size: 0.78rem; color: #94A3B8;">يتم التدقيق والاعتماد الإداري خلال 24 ساعة</div>
            `}
          </div>
        </div>
      </div>

      <!-- Main Course Grid: Content & Chapters -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px; align-items: start;">
        
        <!-- Left: Course Chapters & Lessons -->
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <h2 style="font-size: 1.3rem; font-weight: 800; color: var(--shat-navy); margin: 0;">
              المنهاج التفصيلي والوحدات التدريبية (${c.chapters ? c.chapters.length : 0} فصول)
            </h2>
            <span style="font-size: 0.85rem; color: var(--text-muted);">تحميل الوثائق مباشرة من داخل المنصة</span>
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
                  <span style="font-size: 0.82rem; color: var(--text-muted);">${(ch.lessons || []).length} درس تفصيلي</span>
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
                            <div style="font-size: 0.8rem; font-weight: 700; color: var(--shat-green); margin-bottom: 8px;">المراجع والملفات المعتمدة:</div>
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
                                      <span>📥 تنزيل مباشر</span>
                                    </a>
                                  ` : `
                                    <button class="btn-clean btn-sm btn-open-reg-modal" data-course="${c.id}" style="background: #F1F5F9; color: var(--text-muted); border: 1px solid var(--border-light); font-size: 0.78rem;">
                                      <span>🔒 يتطلب تسجيلاً</span>
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

        <!-- Right: Course Highlights & Assignments -->
        <div>
          <!-- Course Details Widget -->
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 16px; border-bottom: 2px solid var(--shat-green); padding-bottom: 8px;">
              معايير وضوابط المساق
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.88rem; color: var(--text-main); display: flex; flex-direction: column; gap: 12px;">
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                شهادة إتمام معتمدة رسمياً وموثقة برقم ترخيص مهني
              </li>
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                دراسات حالة حية مأخوذة من قطاع العمل الإنساني والتنموي
              </li>
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                تغذية راجعة فردية مباشرة من خبير التدريب المعتمد
              </li>
              <li style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--shat-green); font-weight: 800;">✓</span>
                حفظ وتسليم كافة التكليفات في المستودع الأكاديمي المباشر
              </li>
            </ul>
          </div>

          <!-- Academic Policies Widget -->
          <div style="background: #F8FAFC; border-radius: var(--radius-sm); border: 1px solid var(--border-light); padding: 24px;">
            <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--shat-navy); margin-bottom: 10px;">
              سياسة الحضور والإنجاز
            </h4>
            <p style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.7; margin: 0;">
              يشترط للحصول على الشهادة المعتمدة حضور ما لا يقل عن 80% من الجلسات التفاعلية المباشرة، وتسليم كافة التكليفات المطلوبة والحصول على تقييم لا يقل عن 70% في المشروع النهائي.
            </p>
          </div>
        </div>

      </div>
    `;

    // Modal register listeners if visitor clicks enrollment
    document.querySelectorAll('.btn-open-reg-modal').forEach(btn => {
      btn.onclick = (e) => {
        const cId = btn.getAttribute('data-course') || courseId;
        if (window.openGlobalModal) window.openGlobalModal(cId);
      };
    });

  } catch (err) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border-radius: var(--radius-md); padding: 48px; text-align: center; border: 1px solid var(--border-light);">
        <div style="font-size: 2.5rem; margin-bottom: 16px; color: var(--accent-red);">❌</div>
        <h2 style="font-weight: 800; color: var(--shat-navy); margin-bottom: 8px;">خطأ في الاتصال بالخادم</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">${err.message}</p>
        <a href="#/academy" class="btn-clean btn-primary">العودة لدليل الأكاديمية</a>
      </div>
    `;
  }
}

const fs = require('fs');
const filePath = 'assets/js/pages.js';
let content = fs.readFileSync(filePath, 'utf8');

const target = `<div id="upload-progress-container" style="display: none; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
                  <span id="upload-status-text">جارٍ الرفع والمزامنة مع Google Drive...</span>
                  <span id="upload-percent-text">100%</span>
                </div>
                <div class="progress-bar-track"><div class="progress-bar-fill" id="upload-progress-bar" style="width: 100%;"></div></div>
              </div>-shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <span class="status-pill active" style="background: #ecfdf5; color: #047857;">شهادة التخرج المعتمدة</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">كود التحقق: SHAT-CERT-2026</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 8px;">
                شهادة إتمام دبلوم المعيار الإنساني الأساسي
              </h3>
              <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                تمنح هذه الشهادة رسمياً بعد استكمال متطلبات الدورة بنسبة حضور لا تقل عن 80% وتسليم كافة التمارين العملية الميدانية.
              </p>
            </div>
            <button class="btn-cta btn-trigger-real-download" data-file="شهادة_تخرج_معتمدة_SHAT_2026.pdf" style="width: 100%; padding: 11px; font-weight: 700; font-size: 0.88rem;">
              ↓ تحميل الشهادة الرسمية بصيغة PDF لجهازك
            </button>
          </div>
        </div>
      </div>

      <!-- ==========================================
           TAB 6: INSTRUCTOR DRIVE UPLOADER (للمدرس)
           ========================================== -->
      \${userRole === 'instructor' ? \`
        <div class="classroom-pane" id="pane-instructor-upload" style="display: none;">
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); max-width: 760px; margin: 0 auto;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--shat-navy-950); margin-bottom: 6px;">
              ▲ رفع حقيبة تدريبية جديدة إلى Google Drive والمنصة
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
              الملفات المرفوعة يتم حفظها فوراً في سحابة Google Drive التابعة للصف التدريبي وتتاح للطلاب للتنزيل المباشر.
            </p>

            <form id="teacher-file-upload-form">
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">المساق التدريبي المستهدف:</label>
                <select id="upload-course-select" class="form-select">
                  <option value="shat-chs-master">دبلوم المعيار الإنساني الأساسي (CHS)</option>
                  <option value="shat-psea-expert">استشارات الحماية وصون السلامة (PSEA)</option>
                  <option value="shat-oecd-eval">الشهادة الاحترافية في التقييم OECD DAC</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" style="font-weight: 700; font-size: 0.86rem;">عنوان الملف / اسم الحقيبة:</label>
                <input type="text" id="upload-file-title" class="form-input" required placeholder="مثال: حقيبة_المساءلة_الميدانية_المحدثة_2026.pdf">
              </div>

              <div class="upload-dropzone" id="teacher-dropzone" style="margin-bottom: 16px; border: 2px dashed #10b981; border-radius: var(--radius-md); padding: 28px; text-align: center; cursor: pointer; background: #f0fdf4;">
                <div style="font-size: 2.2rem; margin-bottom: 6px;">◈️</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--shat-navy-950);">اسحب الملف هنا أو انقر للاختيار</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">يتم التخزين والمزامنة السحابية الفورية</div>
                <input type="file" id="teacher-file-input" style="display: none;">
              </div>

              <div id="upload-progress-container" style="display: none; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
                  <span id="upload-status-text">جارٍ الرفع والمزامنة مع Google Drive...</span>
                  <span id="upload-percent-text">100%</span>
                </div>
                <div class="progress-bar-track"><div class="progress-bar-fill" id="upload-progress-bar" style="width: 100%;"></div></div>
              </div>

              <button type="submit" class="btn-cta" style="width: 100%; padding: 11px; font-weight: 700;">
                رفع الملف واعتماده فوراً للطلاب
              </button>
            </form>
          </div>
        </div>
      \` : ''}`;

const replacement = `<div id="upload-progress-container" style="display: none; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
                  <span id="upload-status-text">جارٍ الرفع والمزامنة مع Google Drive...</span>
                  <span id="upload-percent-text">100%</span>
                </div>
                <div class="progress-bar-track"><div class="progress-bar-fill" id="upload-progress-bar" style="width: 100%;"></div></div>
              </div>

              <button type="submit" class="btn-cta" style="width: 100%; padding: 11px; font-weight: 700;">
                رفع الملف واعتماده فوراً للطلاب
              </button>
            </form>
          </div>
        </div>
      \` : ''}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully replaced duplicate block!');
} else {
  console.log('Target not found directly, finding via normalized newlines...');
  const normContent = content.replace(/\r\n/g, '\n');
  const normTarget = target.replace(/\r\n/g, '\n');
  if (normContent.includes(normTarget)) {
    const fixed = normContent.replace(normTarget, replacement.replace(/\r\n/g, '\n'));
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log('Successfully replaced duplicate block with normalized newlines!');
  } else {
    console.log('Target still not matched.');
  }
}

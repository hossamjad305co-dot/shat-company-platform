// SHAT Platform — Post Editor Modal Component (components/cms/PostEditorModal.js)
// Full-featured CMS Editor with Split/Tabbed Live Preview, Rich Text, Media Library & Autosave

import { cmsService, CMSPostStatus } from '../../services/cms/cmsService.js';
import { RichTextEditor, initRichTextEditor, sanitizeHtml } from './RichTextEditor.js';
import { openMediaLibrary } from './MediaLibraryModal.js';
import { ENV } from '../../config/env.js';

let isDirty = false;
let autosaveTimer = null;
let currentPostId = null;

export function PostEditorModal() {
  return `
    <div id="shat-post-editor-modal" class="shat-modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8); z-index: 9999; align-items: center; justify-content: center; padding: 12px;">
      <div class="shat-modal-content post-editor-dialog" style="background: #ffffff; width: 100%; max-width: 1200px; height: 92vh; border-radius: var(--radius-xl); display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow-xl);">
        
        <!-- Top Action Bar -->
        <div style="padding: 14px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: #f8fafc; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h3 id="post-editor-title" style="margin: 0; font-size: var(--font-size-h4); color: var(--shat-navy-950);">تحرير المنشور</h3>
            <span id="post-autosave-indicator" style="font-size: 0.78rem; color: var(--text-muted); background: #ffffff; border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: var(--radius-full);">
              جاهز
            </span>
          </div>

          <!-- Mobile View Switcher (Visible on < 768px) -->
          <div class="editor-mobile-tabs" style="display: none; gap: 4px;">
            <button type="button" id="tab-btn-editor" class="shat-btn shat-btn-primary shat-btn-sm active">المحرر</button>
            <button type="button" id="tab-btn-preview" class="shat-btn shat-btn-secondary shat-btn-sm">المعاينة الحية</button>
          </div>

          <!-- Controls -->
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" id="btn-save-draft" class="shat-btn shat-btn-secondary shat-btn-sm">
              ✓ حفظ كمسودة
            </button>
            <button type="button" id="btn-publish-post" class="shat-btn shat-btn-primary shat-btn-sm">
              ★ نشر المنشور
            </button>
            <button type="button" id="btn-close-editor" class="shat-btn shat-btn-ghost shat-btn-sm" style="min-width: 44px; min-height: 44px; font-size: 1.2rem;">
              ✕
            </button>
          </div>
        </div>

        <!-- Main Body: Split View (Editor | Live Preview) -->
        <div class="post-editor-split-container" style="flex: 1; display: grid; grid-template-columns: 1.1fr 0.9fr; overflow: hidden;">
          
          <!-- Column 1: Editor Form -->
          <div id="editor-form-col" class="editor-column" style="overflow-y: auto; padding: 20px; border-inline-end: 1px solid var(--border-subtle);">
            <form id="cms-post-form">
              <input type="hidden" id="post-form-id" value="" />

              <!-- Title -->
              <div class="shat-form-group" style="margin-bottom: 14px;">
                <label class="shat-form-label" style="font-weight: 700;">عنوان المنشور *</label>
                <input type="text" id="post-input-title" class="shat-form-input" placeholder="أدخل عنواناً جذاباً ودقيقاً..." required />
              </div>

              <!-- Category & Platform -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;" class="form-row-mobile">
                <div class="shat-form-group">
                  <label class="shat-form-label">التصنيف</label>
                  <select id="post-select-category" class="shat-form-input">
                    <option value="training">تدريب ومعايير</option>
                    <option value="protection">استشارات الحماية</option>
                    <option value="evaluation">تقييم وأثر مؤسسي</option>
                    <option value="general">أخبار وتحديثات عامة</option>
                  </select>
                </div>
                <div class="shat-form-group">
                  <label class="shat-form-label">المنصة المستهدفة</label>
                  <select id="post-select-platform" class="shat-form-input">
                    <option value="Website">الموقع الرسمي (Website)</option>
                    <option value="Facebook">فيسبوك (Facebook)</option>
                    <option value="Instagram">إنستغرام (Instagram)</option>
                    <option value="LinkedIn">لينكد إن (LinkedIn)</option>
                  </select>
                </div>
              </div>

              <!-- Cover Image & Media Library -->
              <div class="shat-form-group" style="margin-bottom: 14px;">
                <label class="shat-form-label">صورة الغلاف / البوستر</label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="post-input-img" class="shat-form-input" placeholder="رابط الصورة أو اختر من المكتبة..." style="flex: 1;" dir="ltr"/>
                  <button type="button" id="btn-open-media-for-post" class="shat-btn shat-btn-secondary" style="white-space: nowrap;">
                    ◈ مكتبة الوسائط
                  </button>
                </div>
              </div>

              <!-- Summary / Excerpt -->
              <div class="shat-form-group" style="margin-bottom: 14px;">
                <label class="shat-form-label">الموجز التنفيذي (Excerpt) *</label>
                <textarea id="post-input-excerpt" class="shat-form-input" rows="3" placeholder="مقدمة مختصرة تظهر في بطاقة المنشور ومحركات البحث..."></textarea>
              </div>

              <!-- Rich Text Editor -->
              <div class="shat-form-group" style="margin-bottom: 14px;">
                <label class="shat-form-label">المحتوى الكامل (Rich Content) *</label>
                ${RichTextEditor({ id: 'post-rich-editor' })}
              </div>

              <!-- CTA Button Configuration -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;" class="form-row-mobile">
                <div class="shat-form-group">
                  <label class="shat-form-label">نص زر الإجراء (CTA)</label>
                  <input type="text" id="post-input-cta-text" class="shat-form-input" placeholder="مثال: التسجيل في المساق" />
                </div>
                <div class="shat-form-group">
                  <label class="shat-form-label">رابط الزر (CTA Link)</label>
                  <input type="text" id="post-input-cta-link" class="shat-form-input" placeholder="#/apply?course=shat-chs-master" dir="ltr" />
                </div>
              </div>

              <!-- Tags -->
              <div class="shat-form-group" style="margin-bottom: 14px;">
                <label class="shat-form-label">الكلمات الدلالية (مفصولة بفاصلة)</label>
                <input type="text" id="post-input-tags" class="shat-form-input" placeholder="CHS, Sphere, تدريب, حماية" />
              </div>
            </form>
          </div>

          <!-- Column 2: Live Preview -->
          <div id="preview-col" class="preview-column" style="overflow-y: auto; padding: 24px; background: #f1f5f9; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 100%; max-width: 500px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                  ◈ المعاينة الحية الفورية (Live Preview)
                </span>
                <span id="preview-badge-status" class="shat-badge shat-badge-warning">DRAFT</span>
              </div>

              <!-- Live Card Rendering -->
              <div id="live-preview-card" class="shat-card" style="padding: 0; overflow: hidden; background: #ffffff; border-radius: var(--radius-xl); box-shadow: var(--shadow-md);">
                <div style="height: 200px; background: #0f172a; position: relative; overflow: hidden;">
                  <img id="preview-img" src="assets/logo/logo-banner.jpg" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/logo/logo-badge.jpg'"/>
                  <span id="preview-platform-pill" style="position: absolute; top: 12px; inset-inline-end: 12px; background: rgba(15,23,42,0.85); color: #ffffff; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.72rem; font-weight: 700;">
                    Website
                  </span>
                </div>

                <div style="padding: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span id="preview-category-label" class="shat-badge shat-badge-navy">تدريب ومعايير</span>
                    <span id="preview-date" style="font-size: 0.75rem; color: var(--text-muted);">سبتمبر 2026</span>
                  </div>

                  <h3 id="preview-title" style="font-size: 1.15rem; color: var(--shat-navy-950); margin: 0 0 10px; line-height: 1.5; font-weight: 800;">
                    عنوان المنشور يظهر هنا
                  </h3>

                  <p id="preview-excerpt" style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 16px;">
                    الموجز التنفيذي للمنشور يظهر هنا لمساعدة القارئ على فهم محتوى المقال والورشة.
                  </p>

                  <div id="preview-tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
                    <span class="shat-badge shat-badge-neutral">#شات</span>
                  </div>

                  <div id="preview-cta-wrapper" style="border-top: 1px solid var(--border-subtle); padding-top: 14px;">
                    <a id="preview-cta-btn" href="#" class="shat-btn shat-btn-primary" style="width: 100%; text-align: center; text-decoration: none; justify-content: center;">
                      قراءة المزيد
                    </a>
                  </div>
                </div>
              </div>

              <!-- Article Content Preview -->
              <div style="margin-top: 20px; background: #ffffff; border-radius: var(--radius-xl); padding: 20px; border: 1px solid var(--border-subtle);">
                <strong style="display: block; font-size: 0.85rem; color: var(--shat-navy-900); margin-bottom: 8px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
                  نص المقال الكامل:
                </strong>
                <div id="preview-full-content" style="font-size: 0.88rem; line-height: 1.7; color: var(--text-primary);">
                  محتوى المنشور الكامل...
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function openPostEditor(post = null, onSaved = null) {
  const modal = document.getElementById('shat-post-editor-modal');
  if (!modal) return;

  isDirty = false;
  currentPostId = post ? post.id : null;
  modal.style.display = 'flex';

  const titleEl = document.getElementById('post-editor-title');
  const idEl = document.getElementById('post-form-id');
  const titleInput = document.getElementById('post-input-title');
  const catSelect = document.getElementById('post-select-category');
  const platSelect = document.getElementById('post-select-platform');
  const imgInput = document.getElementById('post-input-img');
  const excerptInput = document.getElementById('post-input-excerpt');
  const ctaTextInput = document.getElementById('post-input-cta-text');
  const ctaLinkInput = document.getElementById('post-input-cta-link');
  const tagsInput = document.getElementById('post-input-tags');
  const richEditor = document.getElementById('post-rich-editor');

  // Fill data
  if (post) {
    titleEl.textContent = 'تعديل المنشور: ' + post.title;
    idEl.value = post.id;
    titleInput.value = post.title || '';
    catSelect.value = post.category || 'training';
    platSelect.value = post.platform || 'Website';
    imgInput.value = post.img || post.cover_image_url || 'assets/logo/logo-banner.jpg';
    excerptInput.value = post.excerpt || '';
    ctaTextInput.value = post.ctaText || '';
    ctaLinkInput.value = post.ctaLink || '';
    tagsInput.value = Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '');
    if (richEditor) richEditor.innerHTML = post.content_rich_text || `<p>${post.fullText || ''}</p>`;
  } else {
    titleEl.textContent = 'إنشاء منشور جديد';
    idEl.value = '';
    titleInput.value = '';
    catSelect.value = 'training';
    platSelect.value = 'Website';
    imgInput.value = 'assets/logo/logo-banner.jpg';
    excerptInput.value = '';
    ctaTextInput.value = 'التسجيل في الدورة';
    ctaLinkInput.value = '#/apply?course=shat-chs-master';
    tagsInput.value = 'CHS, تدريب, شات';
    if (richEditor) richEditor.innerHTML = '<p>اكتب تفاصيل المحتوى هنا...</p>';
  }

  // Init rich text editor listener
  initRichTextEditor('post-rich-editor', () => {
    isDirty = true;
    updateLivePreview();
    triggerAutosave();
  });

  // Inputs change listeners
  [titleInput, catSelect, platSelect, imgInput, excerptInput, ctaTextInput, ctaLinkInput, tagsInput].forEach(inp => {
    if (inp) {
      inp.oninput = () => {
        isDirty = true;
        updateLivePreview();
        triggerAutosave();
      };
    }
  });

  // Open Media Library Button
  const btnMedia = document.getElementById('btn-open-media-for-post');
  if (btnMedia) {
    btnMedia.onclick = () => {
      openMediaLibrary({
        onSelectImage: (selectedUrl) => {
          imgInput.value = selectedUrl;
          isDirty = true;
          updateLivePreview();
          triggerAutosave();
        }
      });
    };
  }

  // Mobile Tabs
  const tabEditor = document.getElementById('tab-btn-editor');
  const tabPreview = document.getElementById('tab-btn-preview');
  const colEditor = document.getElementById('editor-form-col');
  const colPreview = document.getElementById('preview-col');

  if (tabEditor && tabPreview) {
    tabEditor.onclick = () => {
      tabEditor.classList.add('active');
      tabPreview.classList.remove('active');
      colEditor.style.display = 'block';
      colPreview.style.display = 'none';
    };
    tabPreview.onclick = () => {
      tabPreview.classList.add('active');
      tabEditor.classList.remove('active');
      colEditor.style.display = 'none';
      colPreview.style.display = 'flex';
      updateLivePreview();
    };
  }

  // Initial preview sync
  updateLivePreview();

  // Save as Draft
  const btnDraft = document.getElementById('btn-save-draft');
  if (btnDraft) {
    btnDraft.onclick = async () => {
      const data = collectFormData(CMSPostStatus.DRAFT);
      if (!data.title) {
        alert('يرجى إدخال عنوان المنشور على الأقل.');
        return;
      }
      await savePost(data);
    };
  }

  // Publish Post
  const btnPublish = document.getElementById('btn-publish-post');
  if (btnPublish) {
    btnPublish.onclick = async () => {
      const data = collectFormData(CMSPostStatus.PUBLISHED);
      if (!data.title || !data.excerpt) {
        alert('يرجى استكمال العنوان والموجز لنشر المنشور.');
        return;
      }
      await savePost(data);
    };
  }

  // Close with unsaved changes guard
  const btnClose = document.getElementById('btn-close-editor');
  if (btnClose) {
    btnClose.onclick = () => {
      if (isDirty) {
        const confirmClose = confirm('لديك تعديلات غير محفوظة. هل ترغب بحفظها كمسودة قبل الخروج؟');
        if (confirmClose) {
          const data = collectFormData(CMSPostStatus.DRAFT);
          savePost(data).then(() => {
            modal.style.display = 'none';
          });
          return;
        }
      }
      modal.style.display = 'none';
    };
  }

  function updateLivePreview() {
    const title = titleInput.value.trim() || 'عنوان المنشور يظهر هنا';
    const excerpt = excerptInput.value.trim() || 'الموجز التنفيذي للمنشور يظهر هنا...';
    const img = imgInput.value.trim() || 'assets/logo/logo-banner.jpg';
    const cat = catSelect.options[catSelect.selectedIndex].text;
    const plat = platSelect.value;
    const ctaText = ctaTextInput.value.trim() || 'قراءة المزيد';
    const ctaLink = ctaLinkInput.value.trim() || '#';
    const tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);
    const fullContent = richEditor ? richEditor.innerHTML : '';

    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-excerpt').textContent = excerpt;
    document.getElementById('preview-img').src = img;
    document.getElementById('preview-category-label').textContent = cat;
    document.getElementById('preview-platform-pill').textContent = plat;
    document.getElementById('preview-cta-btn').textContent = ctaText;
    document.getElementById('preview-cta-btn').href = ctaLink;
    document.getElementById('preview-tags').innerHTML = tags.map(t => `<span class="shat-badge shat-badge-neutral">#${t}</span>`).join('');
    document.getElementById('preview-full-content').innerHTML = fullContent;
  }

  function collectFormData(status) {
    return {
      id: idEl.value,
      title: titleInput.value.trim(),
      category: catSelect.value,
      categoryLabel: catSelect.options[catSelect.selectedIndex].text,
      platform: platSelect.value,
      img: imgInput.value.trim(),
      excerpt: excerptInput.value.trim(),
      fullText: richEditor ? richEditor.innerText.trim() : '',
      content_rich_text: richEditor ? sanitizeHtml(richEditor.innerHTML) : '',
      ctaText: ctaTextInput.value.trim(),
      ctaLink: ctaLinkInput.value.trim(),
      tags: tagsInput.value,
      status
    };
  }

  async function savePost(data) {
    let saved;
    if (data.id) {
      saved = await cmsService.updatePost(data.id, data);
    } else {
      saved = await cmsService.createPost(data);
      idEl.value = saved.id;
    }
    isDirty = false;
    const ind = document.getElementById('post-autosave-indicator');
    if (ind) {
      ind.textContent = data.status === CMSPostStatus.PUBLISHED ? 'منشور الآن ✓' : 'محفوظ كمسودة ✓';
      ind.style.color = '#059669';
    }
    if (typeof onSaved === 'function') onSaved(saved);
    return saved;
  }

  function triggerAutosave() {
    const ind = document.getElementById('post-autosave-indicator');
    if (ind) {
      ind.textContent = 'جاري الحفظ...';
      ind.style.color = '#d97706';
    }

    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(async () => {
      const data = collectFormData(CMSPostStatus.DRAFT);
      if (data.title) {
        await savePost(data);
      }
    }, ENV.features.autosaveIntervalMs || 3000);
  }
}

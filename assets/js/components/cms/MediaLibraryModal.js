// SHAT Platform — Media Library Modal Component (components/cms/MediaLibraryModal.js)
// Centralized image asset manager: upload, preview, copy link, and select for posts

import { cmsService } from '../../services/cms/cmsService.js';
import { ENV } from '../../config/env.js';

export function MediaLibraryModal() {
  return `
    <div id="shat-media-library-modal" class="shat-modal-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); z-index: 10000; align-items: center; justify-content: center; padding: 16px;">
      <div class="shat-modal-content" style="background: #ffffff; width: 100%; max-width: 900px; max-height: 90vh; border-radius: var(--radius-xl); display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow-xl);">
        
        <!-- Header -->
        <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
          <div>
            <h3 style="margin: 0; font-size: var(--font-size-h3); color: var(--shat-navy-950);">🖼️ مكتبة الوسائط والصور (Media Library)</h3>
            <p style="margin: 4px 0 0; font-size: var(--font-size-caption); color: var(--text-muted);">إدارة الصور والبوسترات المعتمدة لاستخدامها في المنشورات والأغلفة</p>
          </div>
          <button type="button" class="btn-close-media-library" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted); min-height: 44px; min-width: 44px;">✕</button>
        </div>

        <!-- Controls: Search & Upload -->
        <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center;">
          <input 
            type="text" 
            id="media-search-input" 
            placeholder="بحث في الصور..." 
            class="shat-form-input" 
            style="flex: 1; min-width: 200px; max-width: 380px;"
          />

          <div style="display: flex; gap: 8px;">
            <label class="shat-btn shat-btn-primary" style="cursor: pointer; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
              <span>📁 رفع صورة جديدة</span>
              <input type="file" id="media-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="display: none;" />
            </label>
          </div>
        </div>

        <!-- Media Grid Area -->
        <div id="media-library-grid" style="flex: 1; overflow-y: auto; padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;">
          <!-- Rendered dynamically -->
        </div>

        <!-- Footer -->
        <div style="padding: 12px 24px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: #f8fafc; font-size: var(--font-size-caption); color: var(--text-muted);">
          <span>الحد الأقصى للملف: 5 ميجابايت (PNG, JPG, WebP)</span>
          <button type="button" class="shat-btn shat-btn-secondary btn-close-media-library">إغلاق</button>
        </div>

      </div>
    </div>
  `;
}

export function openMediaLibrary({ onSelectImage = null } = {}) {
  const modal = document.getElementById('shat-media-library-modal');
  if (!modal) return;

  modal.style.display = 'flex';
  renderMediaItems();

  const searchInput = document.getElementById('media-search-input');
  if (searchInput) {
    searchInput.value = '';
    searchInput.oninput = () => renderMediaItems(searchInput.value);
  }

  const fileInput = document.getElementById('media-file-input');
  if (fileInput) {
    fileInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (file.size > ENV.features.maxUploadSizeBytes) {
        alert('حجم الملف يتجاوز الحد الأقصى المسموح (5 ميجابايت).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        cmsService.addMediaItem({
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: base64Url,
          size: `${Math.round(file.size / 1024)} KB`,
          type: file.type
        });
        renderMediaItems();
      };
      reader.readAsDataURL(file);
    };
  }

  modal.querySelectorAll('.btn-close-media-library').forEach(btn => {
    btn.onclick = () => {
      modal.style.display = 'none';
    };
  });

  function renderMediaItems(query = '') {
    const grid = document.getElementById('media-library-grid');
    if (!grid) return;

    const items = cmsService.getMediaItems(query);
    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">📷</div>
          <p>لا توجد صور مطابقة لعملية البحث</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="media-item-card" style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; background: #ffffff; display: flex; flex-direction: column;">
        <div style="height: 120px; background: #0f172a; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
          <img src="${item.url}" alt="${item.title}" style="max-width: 100%; max-height: 100%; object-fit: cover;" onerror="this.src='assets/logo/logo-badge.jpg'"/>
        </div>
        <div style="padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <strong style="font-size: 0.8rem; color: var(--shat-navy-950); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.title}</strong>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${item.size}</span>
          </div>
          <div style="display: flex; gap: 4px; margin-top: 8px;">
            <button type="button" class="shat-btn shat-btn-primary shat-btn-sm btn-select-media" data-url="${item.url}" style="flex: 1; padding: 4px 6px; font-size: 0.75rem;">
              اختيار
            </button>
            <button type="button" class="shat-btn shat-btn-secondary shat-btn-sm btn-copy-media" data-url="${item.url}" title="نسخ الرابط" style="padding: 4px 6px; font-size: 0.75rem;">
              📋
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Wire selection buttons
    grid.querySelectorAll('.btn-select-media').forEach(btn => {
      btn.onclick = () => {
        const url = btn.getAttribute('data-url');
        if (typeof onSelectImage === 'function') {
          onSelectImage(url);
        }
        modal.style.display = 'none';
      };
    });

    grid.querySelectorAll('.btn-copy-media').forEach(btn => {
      btn.onclick = async () => {
        const url = btn.getAttribute('data-url');
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          alert('تم نسخ رابط الصورة بنجاح!');
        } else {
          prompt('رابط الصورة:', url);
        }
      };
    });
  }
}

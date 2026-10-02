// SHAT Platform — Bottom Sheet Component (components/ui/BottomSheet.js)
// Mobile-native modal sliding from bottom with drag handle, safe-area support & accessible dismiss

import { icons } from '../../icons.js';

export function BottomSheet({ id = 'shat-bottom-sheet', title = '', children = '', onClose = null } = {}) {
  return `
    <div id="${id}" class="shat-bottom-sheet-overlay" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); z-index: 10050; align-items: flex-end; justify-content: center;">
      <div class="bottom-sheet-container" style="background: #ffffff; width: 100%; max-width: 600px; max-height: 85vh; border-radius: var(--radius-xl) var(--radius-xl) 0 0; display: flex; flex-direction: column; overflow: hidden; padding-bottom: var(--safe-area-bottom); box-shadow: var(--shadow-xl); animation: slideUpSheet 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
        
        <!-- Drag Handle Indicator -->
        <div style="padding: 10px 0 4px; display: flex; justify-content: center; cursor: grab;">
          <div style="width: 44px; height: 5px; background: #cbd5e1; border-radius: var(--radius-full);"></div>
        </div>

        <!-- Sheet Header -->
        <div style="padding: 12px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--shat-navy-950);">${title}</h4>
          <button type="button" class="btn-close-sheet" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted); min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;">${icons.x('', 18)}</button>
        </div>

        <!-- Sheet Scrollable Content -->
        <div class="bottom-sheet-content" style="padding: 20px; overflow-y: auto; flex: 1;">
          ${children}
        </div>

      </div>
    </div>
  `;
}

export function openBottomSheet(id) {
  const sheet = document.getElementById(id);
  if (!sheet) return;

  sheet.style.display = 'flex';

  const overlayClick = (e) => {
    if (e.target === sheet) {
      closeBottomSheet(id);
    }
  };

  sheet.addEventListener('click', overlayClick);

  sheet.querySelectorAll('.btn-close-sheet').forEach(btn => {
    btn.onclick = () => closeBottomSheet(id);
  });
}

export function closeBottomSheet(id) {
  const sheet = document.getElementById(id);
  if (sheet) {
    sheet.style.display = 'none';
  }
}

// assets/js/components/toast.js
// Production In-App Toast Notification Engine for SHAT Platform
import { icons } from '../icons.js';

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'shat-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
      max-width: 90vw;
      width: 420px;
    `;
    document.body.appendChild(toastContainer);
  }
}

/**
 * Show modern, accessible in-app toast notification
 * @param {string} message - Message to display
 * @param {'success' | 'error' | 'warning' | 'info'} type - Toast type
 * @param {number} duration - Display time in ms (default 4000)
 */
export function showToast(message, type = 'info', duration = 4000) {
  ensureToastContainer();

  const cleanMessage = typeof message === 'string' ? message.replace(/^[✓✕ℹ️▪️▲\s]+/, '') : message;

  const toast = document.createElement('div');
  toast.className = `shat-toast shat-toast-${type}`;

  const colors = {
    success: { bg: '#0F2E4A', border: '#4B8834', icon: icons.checkCircle('', 16), text: '#FFFFFF', iconColor: '#4ADE80' },
    error: { bg: '#450A0A', border: '#EF4444', icon: icons.alertCircle('', 16), text: '#FFFFFF', iconColor: '#F87171' },
    warning: { bg: '#451A03', border: '#F59E0B', icon: icons.alertCircle('', 16), text: '#FFFFFF', iconColor: '#FBBF24' },
    info: { bg: '#0F2E4A', border: '#3B82F6', icon: icons.info('', 16), text: '#FFFFFF', iconColor: '#60A5FA' }
  };

  const style = colors[type] || colors.info;

  toast.style.cssText = `
    pointer-events: auto;
    background: ${style.bg};
    color: ${style.text};
    border: 1px solid ${style.border};
    border-right: 5px solid ${style.border};
    border-radius: 8px;
    padding: 14px 18px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.5;
    opacity: 0;
    transform: translateY(-15px) scale(0.97);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.15); color: ${style.iconColor}; flex-shrink: 0;">
        ${style.icon}
      </span>
      <span>${cleanMessage}</span>
    </div>
    <button style="background: none; border: none; color: #94A3B8; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 2px 6px;" aria-label="إغلاق">${icons.x('', 16)}</button>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  });

  const dismiss = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px) scale(0.97)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  };

  toast.querySelector('button').onclick = dismiss;

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
}

// Make globally accessible
if (typeof window !== 'undefined') {
  window.showToast = showToast;
}

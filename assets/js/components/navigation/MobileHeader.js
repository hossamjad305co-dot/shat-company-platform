import { authService } from '../../services/auth/authService.js';
import { notificationService } from '../../services/notifications/notificationService.js';
import { icons } from '../../icons.js';

export function MobileHeader({ title = '', backRoute = null, showNotification = true } = {}) {
  const unreadCount = notificationService.getUnreadCount();
  const user = authService.getCurrentUser() || { name: 'زائر', role: 'visitor' };

  return `
    <header class="shat-mobile-header" style="display: none; position: sticky; top: 0; z-index: 1000; background: rgba(15, 46, 74, 0.98); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.1); padding-top: var(--safe-area-top); color: #ffffff;">
      <div style="height: var(--mobile-header-height, 56px); display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
        
        <!-- Left / Start Area (Back button or Logo) -->
        <div style="display: flex; align-items: center; gap: 10px;">
          ${backRoute ? `
            <a href="${backRoute}" class="mobile-header-back-btn" style="color: #ffffff; text-decoration: none; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: var(--radius-full); background: rgba(255,255,255,0.12);" aria-label="الرجوع">
              <span style="display: flex; align-items: center; justify-content: center;">${icons.arrowRight('mob-icon', 20)}</span>
            </a>
            <span style="font-size: 1rem; font-weight: 800; color: #ffffff; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${title}
            </span>
          ` : `
            <a href="#/home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #ffffff; flex-direction: row;">
              <div style="display: flex; flex-direction: column; text-align: right;">
                <span style="font-size: 0.95rem; font-weight: 900; letter-spacing: 0.5px; line-height: 1;">SHAT</span>
                <span style="font-size: 0.65rem; opacity: 0.8; line-height: 1;">للتنمية والتطوير</span>
              </div>
              <img src="assets/logo/logo-badge.jpg" alt="SHAT" style="width: 32px; height: 32px; border-radius: 6px; object-fit: cover;" onerror="this.src='assets/logo/logo-transparent.png'"/>
            </a>
          `}
        </div>

        <!-- Right / End Area (Notifications & Mobile Menu) -->
        <div style="display: flex; align-items: center; gap: 8px;">
          ${showNotification ? `
            <a href="#/notifications" class="mobile-notif-trigger" style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; color: #ffffff; text-decoration: none;" aria-label="الإشعارات">
              <span style="display: flex; align-items: center; justify-content: center;">${icons.bell('mob-icon', 22)}</span>
              ${unreadCount > 0 ? `
                <span style="position: absolute; top: 6px; inset-inline-end: 6px; background: #ef4444; color: #ffffff; font-size: 0.68rem; font-weight: 800; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #0F2E4A;">
                  ${unreadCount > 9 ? '9+' : unreadCount}
                </span>
              ` : ''}
            </a>
          ` : ''}

          <button type="button" id="btn-mobile-drawer-toggle" style="background: none; border: none; color: #ffffff; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;" aria-label="القائمة الرئيسية">
            ${icons.menu('mob-icon', 24)}
          </button>
        </div>

      </div>
    </header>
  `;
}

// SHAT Platform — Notifications Page (pages/company/NotificationsPage.js)
// In-App Notification Center with read indicators, filter states and direct action links

import { notificationService } from '../../services/notifications/notificationService.js';
import { BaseLayout } from '../../layouts/baseLayout.js';
import { icons } from '../../icons.js';

export function renderNotificationsPage() {
  const notifications = notificationService.getNotifications();
  const unreadCount = notificationService.getUnreadCount();

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'مركز التنبيهات والإشعارات' }
  ];

  return BaseLayout({
    title: 'مركز التنبيهات والإشعارات | منصة شات',
    breadcrumbs,
    children: `
      <section style="padding: 24px 16px 80px; max-width: 720px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h1 style="font-size: var(--font-size-h3); color: var(--shat-navy-950); margin: 0 0 4px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-flex; align-items: center; color: var(--shat-navy);">${icons.bell('', 24)}</span>
              <span>الإشعارات والتنبيهات</span>
            </h1>
            <span style="font-size: var(--font-size-caption); color: var(--text-muted);">
              ${unreadCount > 0 ? `لديك ${unreadCount} إشعارات جديدة غير مقروءة` : 'جميع الإشعارات مقروءة'}
            </span>
          </div>

          ${unreadCount > 0 ? `
            <button type="button" id="btn-mark-all-read" class="shat-btn shat-btn-outline shat-btn-sm" style="font-size: 0.8rem;">
              ✓ تعيين الكل كمقروء
            </button>
          ` : ''}
        </div>

        <!-- Notification List -->
        <div class="notifications-container" style="display: flex; flex-direction: column; gap: 12px;">
          ${notifications.length === 0 ? `
            <div style="text-align: center; padding: 48px 20px; background: #ffffff; border-radius: var(--radius-xl); border: 1px solid var(--border-subtle); color: var(--text-muted);">
              <div style="font-size: 2.8rem; margin-bottom: 8px;">◈</div>
              <h3 style="color: var(--shat-navy-900); margin-bottom: 4px; font-size: 1.1rem;">لا توجد إشعارات حالياً</h3>
              <p style="font-size: 0.88rem; margin: 0;">ستصلك إشعارات حالة طلبات التسجيل، مواعيد التكليفات والدروس الجديدة هنا.</p>
            </div>
          ` : notifications.map(n => `
            <div 
              class="shat-notification-card ${n.isRead ? 'read' : 'unread'}" 
              data-id="${n.id}"
              style="background: ${n.isRead ? '#ffffff' : '#f0fdf4'}; border: 1.5px solid ${n.isRead ? 'var(--border-subtle)' : '#86efac'}; border-radius: var(--radius-lg); padding: 16px; display: flex; align-items: flex-start; gap: 14px; transition: all 0.2s ease; box-shadow: var(--shadow-sm);"
            >
              <div style="width: 10px; height: 10px; border-radius: 50%; background: ${n.isRead ? 'transparent' : '#16a34a'}; margin-top: 6px; flex-shrink: 0;" title="${n.isRead ? 'مقروء' : 'غير مقروء'}"></div>
              
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="font-size: 0.95rem; color: var(--shat-navy-950); font-weight: 700;">
                    ${n.title}
                  </strong>
                  <span style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap;">
                    ${new Date(n.createdAt).toLocaleDateString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 10px;">
                  ${n.message}
                </p>

                ${n.link ? `
                  <a href="${n.link}" class="shat-btn shat-btn-sm shat-btn-secondary notif-action-link" data-id="${n.id}" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-size: 0.8rem; padding: 4px 10px;">
                    <span>عرض التفاصيل</span>
                    <span>←</span>
                  </a>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

      </section>
    `
  });
}

export function initNotificationsEvents() {
  const btnMarkAll = document.getElementById('btn-mark-all-read');
  if (btnMarkAll) {
    btnMarkAll.onclick = () => {
      notificationService.markAllAsRead();
      window.location.reload();
    };
  }

  document.querySelectorAll('.notif-action-link').forEach(link => {
    link.onclick = () => {
      const id = link.getAttribute('data-id');
      if (id) notificationService.markAsRead(id);
    };
  });
}

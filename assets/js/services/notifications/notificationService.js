// SHAT Platform — In-App Notifications Service (services/notifications/notificationService.js)
// Real-time in-app alerts and notifications for Students, Instructors, and Admins

import { authService } from '../auth/authService.js';

const NOTIFICATIONS_STORAGE_KEY = 'shat_user_notifications';

function getStoredNotifications() {
  try {
    return JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveStoredNotifications(list) {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list.slice(-100)));
  } catch (e) {
    console.warn('Notifications storage error:', e);
  }
}

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif_welcome',
    recipientRole: 'all',
    userId: 'all',
    type: 'system',
    title: 'مرحباً بك في منصة شات للتنمية والتطوير',
    message: 'تم تفعيل مساحتك المؤسسية المعتمدة. يمكنك استعراض المساقات والبرامج التدريبية.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: false,
    link: '#/academy'
  },
  {
    id: 'notif_chs_session',
    recipientRole: 'student',
    userId: 'student_1',
    type: 'course_enrollment',
    title: 'تأكيد التسجيل في دبلوم المعيار الإنساني (CHS)',
    message: 'تم قبول طلبك واعتماد تسجيلك رسمياً. الحقيبة التدريبية ومجلد درايف متاحان الآن.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    isRead: false,
    link: '#/course/shat-chs-master'
  },
  {
    id: 'notif_assignment_reminder',
    recipientRole: 'student',
    userId: 'student_1',
    type: 'assignment',
    title: 'تذكير بموعد تسليم التكليف الميداني',
    message: 'مصفوفة المساءلة للمتأثرين مستحقة للتسليم قبل 5 أكتوبر 2026.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isRead: false,
    link: '#/academy/assignments'
  }
];

export const notificationService = {
  /**
   * Get notifications applicable to current logged in user
   */
  getNotifications() {
    const user = authService.getCurrentUser();
    if (!user) return [];

    let allNotifs = getStoredNotifications();
    if (allNotifs.length === 0) {
      allNotifs = [...DEFAULT_NOTIFICATIONS];
      saveStoredNotifications(allNotifs);
    }

    const userId = user.id || user.username || '';
    const userRole = user.role || 'visitor';

    return allNotifs.filter(n => {
      if (n.userId === 'all' || n.userId === userId) return true;
      if (n.recipientRole === 'all' || n.recipientRole === userRole) return true;
      return false;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  /**
   * Count unread notifications
   */
  getUnreadCount() {
    return this.getNotifications().filter(n => !n.isRead).length;
  },

  /**
   * Mark a specific notification as read
   */
  markAsRead(id) {
    const allNotifs = getStoredNotifications();
    const target = allNotifs.find(n => n.id === id);
    if (target) {
      target.isRead = true;
      saveStoredNotifications(allNotifs);
      window.dispatchEvent(new CustomEvent('shat:notifications_updated'));
    }
  },

  /**
   * Mark all user notifications as read
   */
  markAllAsRead() {
    const user = authService.getCurrentUser();
    const userId = user ? (user.id || user.username) : '';
    const userRole = user ? user.role : 'visitor';

    const allNotifs = getStoredNotifications();
    allNotifs.forEach(n => {
      if (n.userId === 'all' || n.userId === userId || n.recipientRole === userRole) {
        n.isRead = true;
      }
    });
    saveStoredNotifications(allNotifs);
    window.dispatchEvent(new CustomEvent('shat:notifications_updated'));
  },

  /**
   * Create a new notification
   */
  createNotification({ userId = 'all', recipientRole = 'all', type = 'info', title, message, link = '' }) {
    const newNotif = {
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      userId,
      recipientRole,
      type,
      title,
      message,
      link,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    const allNotifs = getStoredNotifications();
    allNotifs.unshift(newNotif);
    saveStoredNotifications(allNotifs);
    window.dispatchEvent(new CustomEvent('shat:notifications_updated'));
    return newNotif;
  }
};

// SHAT Platform — Mobile Bottom Navigation Component (components/navigation/MobileBottomNav.js)
// Role-aware bottom bar with safe-area insets, active states and 44px min touch targets

import { authService } from '../../services/auth/authService.js';
import { notificationService } from '../../services/notifications/notificationService.js';
import { icons } from '../../icons.js';

export function MobileBottomNav({ currentRoute = 'home' } = {}) {
  const user = authService.getCurrentUser() || { role: 'visitor' };
  const role = user.role || 'visitor';
  const unreadNotifs = notificationService.getUnreadCount();

  let navItems = [];

  if (role === 'admin' || role === 'super_admin') {
    navItems = [
      { id: 'admin', label: 'الإدارة', icon: icons.shield('mob-nav-icon', 19), href: '#/admin' },
      { id: 'cms', label: 'المحتوى', icon: icons.fileText('mob-nav-icon', 19), href: '#/admin/cms' },
      { id: 'apps', label: 'الطلبات', icon: icons.clipboardCheck('mob-nav-icon', 19), href: '#/admin/applications' },
      { id: 'audit', label: 'الرقابة', icon: icons.eye('mob-nav-icon', 19), href: '#/admin/audit' },
      { id: 'settings', label: 'الإعدادات', icon: icons.settings('mob-nav-icon', 19), href: '#/admin/settings' }
    ];
  } else if (role === 'teacher' || role === 'instructor') {
    navItems = [
      { id: 'home', label: 'الرئيسية', icon: icons.home('mob-nav-icon', 19), href: '#/home' },
      { id: 'teacher', label: 'لوحة المدرب', icon: icons.award('mob-nav-icon', 19), href: '#/teacher' },
      { id: 'courses', label: 'دوراتي', icon: icons.book('mob-nav-icon', 19), href: '#/academy' },
      { id: 'profile', label: 'حسابي', icon: icons.user('mob-nav-icon', 19), href: '#/profile' }
    ];
  } else if (role === 'student') {
    navItems = [
      { id: 'home', label: 'الرئيسية', icon: icons.home('mob-nav-icon', 19), href: '#/home' },
      { id: 'academy', label: 'لوحتي', icon: icons.academy('mob-nav-icon', 19), href: '#/academy' },
      { id: 'assignments', label: 'التكليفات', icon: icons.clipboardCheck('mob-nav-icon', 19), href: '#/academy/assignments' },
      { id: 'notifications', label: 'الإشعارات', icon: icons.bell('mob-nav-icon', 19), href: '#/notifications', badge: unreadNotifs },
      { id: 'profile', label: 'حسابي', icon: icons.user('mob-nav-icon', 19), href: '#/profile' }
    ];
  } else {
    navItems = [
      { id: 'home', label: 'الرئيسية', icon: icons.home('mob-nav-icon', 19), href: '#/home' },
      { id: 'tracks', label: 'المسارات', icon: icons.compass('mob-nav-icon', 19), href: '#/tracks' },
      { id: 'academy', label: 'الأكاديمية', icon: icons.academy('mob-nav-icon', 19), href: '#/academy' },
      { id: 'apply', label: 'التسجيل', icon: icons.form('mob-nav-icon', 19), href: '#/apply' },
      { id: 'login', label: 'دخول', icon: icons.key('mob-nav-icon', 19), href: '#/auth/login' }
    ];
  }

  return `
    <nav class="shat-mobile-bottom-nav" aria-label="شريط التنقل السفلي للهاتف">
      <div class="bottom-nav-inner">
        ${navItems.map(item => {
          const isActive = currentRoute === item.id || (item.id === 'home' && (currentRoute === '' || currentRoute === 'home'));
          return `
            <a href="${item.href}" class="bottom-nav-link ${isActive ? 'active' : ''}" style="position: relative;">
              <span class="bottom-nav-icon" style="display: flex; align-items: center; justify-content: center;">${item.icon}</span>
              <span class="bottom-nav-label">${item.label}</span>
              ${item.badge && item.badge > 0 ? `
                <span class="bottom-nav-badge">${item.badge}</span>
              ` : ''}
            </a>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

// SHAT Platform — Mobile Bottom Navigation Component (components/navigation/MobileBottomNav.js)
// Role-aware bottom bar with safe-area insets, active states and 44px min touch targets

import { authService } from '../../services/auth/authService.js';
import { notificationService } from '../../services/notifications/notificationService.js';

export function MobileBottomNav({ currentRoute = 'home' } = {}) {
  const user = authService.getCurrentUser() || { role: 'visitor' };
  const role = user.role || 'visitor';
  const unreadNotifs = notificationService.getUnreadCount();

  let navItems = [];

  if (role === 'admin' || role === 'super_admin') {
    navItems = [
      { id: 'admin', label: 'الإدارة', icon: '⚙', href: '#/admin' },
      { id: 'cms', label: 'المحتوى', icon: '▪', href: '#/admin/cms' },
      { id: 'apps', label: 'الطلبات', icon: '▪', href: '#/admin/applications' },
      { id: 'audit', label: 'الرقابة', icon: '◈', href: '#/admin/audit' },
      { id: 'settings', label: 'الإعدادات', icon: '⚙', href: '#/admin/settings' }
    ];
  } else if (role === 'teacher' || role === 'instructor') {
    navItems = [
      { id: 'home', label: 'الرئيسية', icon: '◈', href: '#/home' },
      { id: 'teacher', label: 'لوحة المدرب', icon: '▪', href: '#/teacher' },
      { id: 'courses', label: 'دوراتي', icon: '▪', href: '#/academy' },
      { id: 'profile', label: 'حسابي', icon: '▪', href: '#/profile' }
    ];
  } else if (role === 'student') {
    navItems = [
      { id: 'home', label: 'الرئيسية', icon: '◈', href: '#/home' },
      { id: 'academy', label: 'لوحتي', icon: '★', href: '#/academy' },
      { id: 'assignments', label: 'التكليفات', icon: '▪', href: '#/academy/assignments' },
      { id: 'notifications', label: 'الإشعارات', icon: '▪', href: '#/notifications', badge: unreadNotifs },
      { id: 'profile', label: 'حسابي', icon: '▪', href: '#/profile' }
    ];
  } else {
    navItems = [
      { id: 'home', label: 'الرئيسية', icon: '◈', href: '#/home' },
      { id: 'tracks', label: 'المسارات', icon: '▪', href: '#/tracks' },
      { id: 'academy', label: 'الأكاديمية', icon: '★', href: '#/academy' },
      { id: 'apply', label: 'التسجيل', icon: '✓', href: '#/apply' },
      { id: 'login', label: 'دخول', icon: '▪', href: '#/auth/login' }
    ];
  }

  return `
    <nav class="shat-mobile-bottom-nav" aria-label="شريط التنقل السفلي للهاتف">
      <div class="bottom-nav-inner">
        ${navItems.map(item => {
          const isActive = currentRoute === item.id || (item.id === 'home' && (currentRoute === '' || currentRoute === 'home'));
          return `
            <a href="${item.href}" class="bottom-nav-link ${isActive ? 'active' : ''}" style="position: relative;">
              <span class="bottom-nav-icon">${item.icon}</span>
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

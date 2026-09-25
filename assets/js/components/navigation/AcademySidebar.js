// SHAT Platform — Academy Sidebar Component (components/navigation/AcademySidebar.js)
import { authService } from '../../services/auth/authService.js';
import { RoleBadge } from '../ui/core.js';

export function AcademySidebar({ activeRoute = 'academy' }) {
  const user = authService.getCurrentUser();
  const isAdmin = authService.isAdmin();
  const isInstructor = authService.isInstructor();

  const links = [
    { route: 'academy', label: 'لوحة التعلم (Dashboard)', icon: '📊', href: '#/academy' },
    { route: 'academy/courses', label: 'المساقات والحقائب', icon: '📚', href: '#/academy' },
    { route: 'academy/assignments', label: 'التكليفات والأنشطة', icon: '📝', href: '#/academy/assignments' },
    { route: 'academy/exams', label: 'الاختبارات والتقييم', icon: '⏱️', href: '#/academy/exams' },
    { route: 'academy/grades', label: 'سجل الدرجات', icon: '🎖️', href: '#/academy/grades' },
    { route: 'academy/files', label: 'مستودع درايف (5TB)', icon: '☁️', href: '#/academy/files' }
  ];

  const teacherLinks = (isInstructor || isAdmin) ? [
    { route: 'teacher/builder', label: 'منشئ المناهج (Course Builder)', icon: '🛠️', href: '#/teacher/builder' },
    { route: 'teacher/grading', label: 'مركز التصحيح (Grading Queue)', icon: '✍️', href: '#/teacher/grading' }
  ] : [];

  const adminLinks = isAdmin ? [
    { route: 'admin/users', label: 'إدارة المستخدمين والصلاحيات', icon: '👥', href: '#/admin/users' },
    { route: 'admin/integrations', label: 'مركز الربط السحابي', icon: '🔌', href: '#/admin/integrations' },
    { route: 'admin/audit', label: 'سجلات الرقابة والعمليات', icon: '📜', href: '#/admin/audit' }
  ] : [];

  return `
    <aside class="shat-academy-sidebar" style="width: var(--sidebar-width); background: var(--bg-surface); border-inline-end: 1px solid var(--border-subtle); padding: var(--space-lg); display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <!-- Academy Brand Emblem -->
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: var(--space-xl); padding-bottom: var(--space-md); border-bottom: 1px solid var(--border-subtle);">
          <img src="assets/logo/logo-transparent.png" alt="SHAT" style="height: 36px;" onerror="this.src='assets/logo/logo-symbol.jpg'">
          <div>
            <div style="font-weight: 800; font-size: var(--font-size-body); color: var(--shat-navy-950);">أكاديمية شات</div>
            <div style="font-size: var(--font-size-caption); color: var(--shat-green-700); font-weight: 600;">LMS & Capacity Hub</div>
          </div>
        </div>

        <!-- User Role Profile Pill -->
        <div style="background: var(--shat-slate-50); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: var(--space-xl);">
          <div style="font-size: var(--font-size-body-sm); font-weight: 700; color: var(--text-primary);">${user.name}</div>
          <div style="margin-top: 4px;">
            ${RoleBadge({ role: user.role })}
          </div>
        </div>

        <!-- Academic Nav Section -->
        <div style="font-size: var(--font-size-caption); font-weight: 700; color: var(--text-subtle); text-transform: uppercase; margin-bottom: var(--space-xs); letter-spacing: 0.5px;">
          المساحة الأكاديمية
        </div>
        <nav style="display: flex; flex-direction: column; gap: 4px; margin-bottom: var(--space-xl);">
          ${links.map(l => {
            const isActive = activeRoute === l.route || (l.route === 'academy' && activeRoute === '');
            return `
              <a href="${l.href}" class="shat-nav-item ${isActive ? 'active' : ''}" style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-sm); text-decoration: none; font-size: var(--font-size-body-sm); color: ${isActive ? 'var(--shat-green-800)' : 'var(--text-secondary)'}; background: ${isActive ? 'var(--shat-green-100)' : 'transparent'}; font-weight: ${isActive ? '700' : '500'}; transition: var(--transition-fast);">
                <span>${l.icon}</span>
                <span>${l.label}</span>
              </a>
            `;
          }).join('')}
        </nav>

        ${teacherLinks.length > 0 ? `
          <div style="font-size: var(--font-size-caption); font-weight: 700; color: var(--text-subtle); text-transform: uppercase; margin-bottom: var(--space-xs); letter-spacing: 0.5px;">
            أدوات التدريب والمعلم
          </div>
          <nav style="display: flex; flex-direction: column; gap: 4px; margin-bottom: var(--space-xl);">
            ${teacherLinks.map(l => {
              const isActive = activeRoute === l.route;
              return `
                <a href="${l.href}" class="shat-nav-item ${isActive ? 'active' : ''}" style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-sm); text-decoration: none; font-size: var(--font-size-body-sm); color: ${isActive ? 'var(--shat-green-800)' : 'var(--text-secondary)'}; background: ${isActive ? 'var(--shat-green-100)' : 'transparent'}; font-weight: ${isActive ? '700' : '500'}; transition: var(--transition-fast);">
                  <span>${l.icon}</span>
                  <span>${l.label}</span>
                </a>
              `;
            }).join('')}
          </nav>
        ` : ''}

        ${adminLinks.length > 0 ? `
          <div style="font-size: var(--font-size-caption); font-weight: 700; color: var(--text-subtle); text-transform: uppercase; margin-bottom: var(--space-xs); letter-spacing: 0.5px;">
            أدوات الإدارة والرقابة
          </div>
          <nav style="display: flex; flex-direction: column; gap: 4px;">
            ${adminLinks.map(l => {
              const isActive = activeRoute === l.route;
              return `
                <a href="${l.href}" class="shat-nav-item ${isActive ? 'active' : ''}" style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-sm); text-decoration: none; font-size: var(--font-size-body-sm); color: ${isActive ? 'var(--shat-green-800)' : 'var(--text-secondary)'}; background: ${isActive ? 'var(--shat-green-100)' : 'transparent'}; font-weight: ${isActive ? '700' : '500'}; transition: var(--transition-fast);">
                  <span>${l.icon}</span>
                  <span>${l.label}</span>
                </a>
              `;
            }).join('')}
          </nav>
        ` : ''}
      </div>

      <!-- Return to Company Website -->
      <div style="padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle);">
        <a href="#/home" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; border-radius: var(--radius-sm); background: var(--shat-slate-100); color: var(--text-primary); text-decoration: none; font-size: var(--font-size-body-sm); font-weight: 600;">
          <span class="shat-icon-directional">↗</span>
          <span>العودة لموقع الشركة</span>
        </a>
      </div>
    </aside>
  `;
}

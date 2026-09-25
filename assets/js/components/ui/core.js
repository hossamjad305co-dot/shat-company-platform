// SHAT Platform — Atomic UI Primitives (components/ui/core.js)
// Implements Phase 2 Design Tokens, WCAG AAA accessibility, and CSS Logical Properties

export function Button({
  text = '',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger'
  size = 'md',        // 'sm', 'md', 'lg'
  icon = '',
  iconPosition = 'start',
  id = '',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  attributes = ''
}) {
  const idAttr = id ? `id="${id}"` : '';
  const disabledAttr = disabled || loading ? 'disabled' : '';
  const variantClass = `shat-btn-${variant}`;
  const sizeClass = size !== 'md' ? `shat-btn-${size}` : '';

  const spinner = loading ? '<span class="shat-spinner" aria-hidden="true"></span>' : '';
  const iconMarkup = icon && !loading ? `<span class="shat-btn-icon">${icon}</span>` : '';

  const content = iconPosition === 'start'
    ? `${spinner}${iconMarkup}<span>${text}</span>`
    : `${spinner}<span>${text}</span>${iconMarkup}`;

  return `
    <button type="${type}" ${idAttr} class="shat-btn ${variantClass} ${sizeClass} ${className}" ${disabledAttr} ${attributes}>
      ${content}
    </button>
  `;
}

export function Badge({ text = '', variant = 'navy', icon = '', className = '' }) {
  const iconMarkup = icon ? `<span class="badge-icon">${icon}</span>` : '';
  return `<span class="shat-badge shat-badge-${variant} ${className}">${iconMarkup}${text}</span>`;
}

export function StatusBadge({ status = 'pending', label = '' }) {
  let variant = 'info';
  let defaultLabel = 'قيد الانتظار';

  switch (status.toLowerCase()) {
    case 'active':
    case 'published':
    case 'completed':
    case 'approved':
    case 'graded':
      variant = 'success';
      defaultLabel = 'نشط / مكتمل';
      break;
    case 'pending':
    case 'in-progress':
    case 'review':
      variant = 'warning';
      defaultLabel = 'قيد المراجعة';
      break;
    case 'inactive':
    case 'rejected':
    case 'overdue':
    case 'failed':
      variant = 'danger';
      defaultLabel = 'غير نشط';
      break;
    case 'unconfigured':
      variant = 'unconfigured';
      defaultLabel = 'غير مهيأ (NOT CONFIGURED)';
      break;
  }

  return `<span class="shat-badge shat-badge-${variant}">${label || defaultLabel}</span>`;
}

export function RoleBadge({ role = 'visitor' }) {
  const roleMap = {
    super_admin: { label: 'مدير عام أعلى', variant: 'danger' },
    admin: { label: 'مدير النظام', variant: 'navy' },
    employee: { label: 'موظف مؤسسي', variant: 'info' },
    teacher: { label: 'مدرب معتمد', variant: 'success' },
    instructor: { label: 'مدرب معتمد', variant: 'success' },
    student: { label: 'متدرب معتمد', variant: 'warning' },
    visitor: { label: 'زائر', variant: 'unconfigured' }
  };
  const config = roleMap[role] || { label: role, variant: 'navy' };
  return `<span class="shat-badge shat-badge-${config.variant}">👤 ${config.label}</span>`;
}

export function Input({
  id = '',
  label = '',
  type = 'text',
  placeholder = '',
  value = '',
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  attributes = ''
}) {
  const requiredMark = required ? '<span class="required" style="color: var(--color-danger);">*</span>' : '';
  const errorClass = error ? 'shat-input-error' : '';
  const errorText = error ? `<span class="shat-error-text" role="alert">${error}</span>` : '';
  const helper = helperText && !error ? `<span class="shat-helper-text">${helperText}</span>` : '';

  return `
    <div class="shat-form-group">
      ${label ? `<label class="shat-label" for="${id}">${label} ${requiredMark}</label>` : ''}
      <input type="${type}" id="${id}" class="shat-input ${errorClass}" placeholder="${placeholder}" value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${attributes} />
      ${errorText}
      ${helper}
    </div>
  `;
}

export function Card({
  title = '',
  subtitle = '',
  children = '',
  footer = '',
  className = '',
  headerAction = '',
  id = ''
}) {
  const idAttr = id ? `id="${id}"` : '';
  return `
    <div ${idAttr} class="shat-card ${className}">
      ${(title || headerAction) ? `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md); gap: var(--space-md);">
          <div>
            ${title ? `<h3 style="font-size: var(--font-size-h4); color: var(--text-primary); margin: 0;">${title}</h3>` : ''}
            ${subtitle ? `<div style="font-size: var(--font-size-caption); color: var(--text-muted); margin-top: 4px;">${subtitle}</div>` : ''}
          </div>
          ${headerAction ? `<div>${headerAction}</div>` : ''}
        </div>
      ` : ''}
      <div class="shat-card-body">
        ${children}
      </div>
      ${footer ? `<div style="margin-top: var(--space-lg); padding-top: var(--space-md); border-top: 1px solid var(--border-subtle);">${footer}</div>` : ''}
    </div>
  `;
}

export function ProgressBar({ value = null, max = 100, label = 'نسبة الإنجاز' }) {
  if (value === null || value === undefined) {
    return `
      <div class="shat-progress-box">
        <div style="display: flex; justify-content: space-between; font-size: var(--font-size-caption); color: var(--text-muted); margin-bottom: 4px;">
          <span>${label}</span>
          <span style="font-style: italic;">قيد بدء النشاط (0%)</span>
        </div>
        <div style="height: 6px; background: var(--border-subtle); border-radius: var(--radius-full); overflow: hidden;">
          <div style="width: 0%; height: 100%; background: var(--shat-green-700); transition: width 0.3s ease;"></div>
        </div>
      </div>
    `;
  }

  const clamped = Math.min(Math.max(value, 0), max);
  const percent = Math.round((clamped / max) * 100);

  return `
    <div class="shat-progress-box">
      <div style="display: flex; justify-content: space-between; font-size: var(--font-size-caption); color: var(--text-secondary); margin-bottom: 4px;">
        <span>${label}</span>
        <span style="font-weight: 700; color: var(--shat-green-700);">${percent}%</span>
      </div>
      <div style="height: 6px; background: var(--border-subtle); border-radius: var(--radius-full); overflow: hidden;">
        <div style="width: ${percent}%; height: 100%; background: var(--shat-green-700); transition: width 0.3s ease;"></div>
      </div>
    </div>
  `;
}

export function Breadcrumbs({ items = [] }) {
  if (!items.length) return '';
  return `
    <nav class="shat-breadcrumbs" aria-label="مسار التصفح">
      <ol style="display: flex; align-items: center; gap: 8px; list-style: none; padding: 0; margin: 0; font-size: var(--font-size-body-sm);">
        ${items.map((item, index) => {
          const isLast = index === items.length - 1;
          const separator = !isLast ? '<span class="breadcrumb-separator" style="color: var(--text-subtle);">/</span>' : '';
          return `
            <li style="display: flex; align-items: center; gap: 8px;">
              ${isLast 
                ? `<span style="color: var(--text-primary); font-weight: 600;" aria-current="page">${item.label}</span>`
                : `<a href="${item.href || '#'}" style="color: var(--text-muted); text-decoration: none;">${item.label}</a>`}
              ${separator}
            </li>
          `;
        }).join('')}
      </ol>
    </nav>
  `;
}

export function EmptyState({
  icon = '📭',
  title = 'لا توجد بيانات متاحة حالياً',
  description = 'لم يتم تسجيل أي عناصر أو أنشطة في هذا القسم حتى الآن.',
  actionText = '',
  actionRoute = '',
  actionId = ''
}) {
  return `
    <div class="shat-empty-state">
      <div class="empty-icon">${icon}</div>
      <h3 class="empty-title">${title}</h3>
      <p class="empty-desc">${description}</p>
      ${actionText ? `
        <div style="margin-top: var(--space-lg);">
          <a href="${actionRoute || '#'}" ${actionId ? `id="${actionId}"` : ''} class="shat-btn shat-btn-primary">
            <span>${actionText}</span>
          </a>
        </div>
      ` : ''}
    </div>
  `;
}

export function ErrorState({
  code = '404',
  title = 'الصفحة غير موجودة',
  description = 'عذراً، المسار أو المحتوى الذي تحاول الوصول إليه غير متاح.',
  actionText = 'العودة للرئيسية',
  actionRoute = '#/home'
}) {
  return `
    <div class="shat-empty-state" style="padding: var(--space-3xl) var(--space-xl);">
      <div style="font-size: 3.5rem; font-weight: 800; color: var(--shat-navy-900); line-height: 1; margin-bottom: var(--space-md);">${code}</div>
      <h2 class="empty-title">${title}</h2>
      <p class="empty-desc">${description}</p>
      <div style="margin-top: var(--space-xl);">
        <a href="${actionRoute}" class="shat-btn shat-btn-primary">
          <span>${actionText}</span>
        </a>
      </div>
    </div>
  `;
}

export function Skeleton({ count = 3, type = 'card' }) {
  const items = Array.from({ length: count });
  if (type === 'card') {
    return items.map(() => `
      <div class="shat-skeleton-card">
        <div class="shat-skeleton skeleton-img"></div>
        <div style="padding: var(--space-lg);">
          <div class="shat-skeleton skeleton-title"></div>
          <div class="shat-skeleton skeleton-line"></div>
          <div class="shat-skeleton skeleton-line" style="width: 60%;"></div>
        </div>
      </div>
    `).join('');
  }
  return items.map(() => `<div class="shat-skeleton skeleton-line" style="margin-bottom: 8px;"></div>`).join('');
}

export function IntegrationStatusCard({
  provider = 'Google Drive Enterprise (5TB)',
  configured = false,
  message = 'الخدمة السحابية غير مهيأة بعد في البيئة الحالية.',
  statusText = 'NOT CONFIGURED'
}) {
  return `
    <div class="shat-card" style="border-inline-start: 4px solid ${configured ? 'var(--shat-green-700)' : 'var(--color-unconfigured)'};">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
        <h4 style="margin: 0; color: var(--text-primary); font-size: var(--font-size-h4); display: flex; align-items: center; gap: 8px;">
          <span>☁️ ${provider}</span>
        </h4>
        <span class="shat-badge ${configured ? 'shat-badge-success' : 'shat-badge-unconfigured'}">
          ${statusText}
        </span>
      </div>
      <p style="font-size: var(--font-size-body-sm); color: var(--text-muted); margin: 0;">
        ${message}
      </p>
    </div>
  `;
}

export function PermissionGate({
  requiredRole = '',
  requiredPermission = '',
  userRole = 'visitor',
  userPermissions = [],
  children = '',
  fallback = ''
}) {
  const hasRole = !requiredRole || userRole === 'admin' || userRole === 'super_admin' || userRole === requiredRole;
  const hasPerm = !requiredPermission || userPermissions.includes('all') || userPermissions.includes(requiredPermission);

  if (hasRole && hasPerm) {
    return children;
  }
  return fallback;
}

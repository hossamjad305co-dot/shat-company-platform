// SHAT Platform — Admin Executive Layout Shell (layouts/admin/adminLayout.js)
import { AcademySidebar } from '../../components/navigation/AcademySidebar.js';
import { Breadcrumbs } from '../../components/ui/core.js';

export function AdminLayout({
  activeRoute = 'admin/users',
  breadcrumbs = [],
  pageTitle = '',
  pageSubtitle = '',
  headerAction = '',
  children = ''
}) {
  return `
    <div class="shat-admin-layout" style="display: flex; min-height: calc(100vh - 120px); background: var(--bg-page);">
      <!-- ADMIN & ACADEMY SIDEBAR -->
      ${AcademySidebar({ activeRoute })}

      <!-- ADMIN DATA CANVAS -->
      <div class="shat-admin-workspace" style="flex: 1; padding: var(--space-xl) clamp(16px, 3vw, 40px); overflow-y: auto;">
        <div style="max-width: var(--max-width-content); margin-inline: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); flex-wrap: wrap; gap: var(--space-md); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-md);">
            <div>
              ${Breadcrumbs({ items: breadcrumbs })}
              ${pageTitle ? `
                <h1 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin: var(--space-xs) 0 4px 0; font-weight: 800; display: flex; align-items: center; gap: 10px;">
                  <span>⚙️ ${pageTitle}</span>
                  <span class="shat-badge shat-badge-navy">إدارة عليا</span>
                </h1>
              ` : ''}
              ${pageSubtitle ? `
                <p style="font-size: var(--font-size-body-sm); color: var(--text-muted); margin: 0;">
                  ${pageSubtitle}
                </p>
              ` : ''}
            </div>
            ${headerAction ? `<div>${headerAction}</div>` : ''}
          </div>

          <div class="shat-admin-content-body">
            ${children}
          </div>
        </div>
      </div>
    </div>
  `;
}

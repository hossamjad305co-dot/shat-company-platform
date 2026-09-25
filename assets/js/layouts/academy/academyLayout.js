// SHAT Platform — Academy Workspace Layout Shell (layouts/academy/academyLayout.js)
import { AcademySidebar } from '../../components/navigation/AcademySidebar.js';
import { Breadcrumbs } from '../../components/ui/core.js';

export function AcademyLayout({
  activeRoute = 'academy',
  breadcrumbs = [],
  pageTitle = '',
  pageSubtitle = '',
  headerAction = '',
  children = ''
}) {
  return `
    <div class="shat-academy-layout" style="display: flex; min-height: calc(100vh - 120px); background: var(--bg-page);">
      <!-- DOCKED ACADEMY SIDEBAR (Desktop) -->
      ${AcademySidebar({ activeRoute })}

      <!-- MAIN ACADEMIC WORKSPACE CANVAS -->
      <div class="shat-academy-workspace" style="flex: 1; padding: var(--space-xl) clamp(16px, 3vw, 40px); overflow-y: auto;">
        <div style="max-width: var(--max-width-content); margin-inline: auto;">
          <!-- Top Breadcrumb & Actions Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); flex-wrap: wrap; gap: var(--space-md);">
            <div>
              ${Breadcrumbs({ items: breadcrumbs })}
              ${pageTitle ? `
                <h1 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin: var(--space-xs) 0 4px 0; font-weight: 800;">
                  ${pageTitle}
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

          <!-- Dynamic Workspace Content -->
          <div class="shat-academy-content-body">
            ${children}
          </div>
        </div>
      </div>
    </div>
  `;
}

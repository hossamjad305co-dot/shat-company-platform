// SHAT Platform — Base Layout Shell (layouts/baseLayout.js)
import { Breadcrumbs } from '../components/ui/core.js';

export function BaseLayout({
  breadcrumbs = [],
  title = '',
  subtitle = '',
  children = ''
} = {}) {
  return `
    <div class="shat-base-layout" style="min-height: calc(100vh - 140px); background: var(--bg-page); padding: clamp(20px, 4vw, 40px) 16px;">
      <div style="max-width: var(--max-width-content); margin: 0 auto;">
        ${breadcrumbs && breadcrumbs.length > 0 ? `
          <div style="margin-bottom: var(--space-md);">
            ${Breadcrumbs({ items: breadcrumbs })}
          </div>
        ` : ''}

        ${title ? `
          <div style="margin-bottom: var(--space-xl);">
            <h1 style="font-size: var(--font-size-h2); color: var(--shat-navy-950); margin: 0 0 6px; font-weight: 800;">
              ${title}
            </h1>
            ${subtitle ? `
              <p style="font-size: var(--font-size-body-sm); color: var(--text-muted); margin: 0;">
                ${subtitle}
              </p>
            ` : ''}
          </div>
        ` : ''}

        <div class="shat-base-content-canvas">
          ${children}
        </div>
      </div>
    </div>
  `;
}

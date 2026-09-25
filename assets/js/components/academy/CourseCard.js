// SHAT Platform — Course Card Component (components/academy/CourseCard.js)
import { Badge, ProgressBar } from '../ui/core.js';

export function CourseCard({ course, currentLang = 'ar' }) {
  if (!course) return '';

  return `
    <div class="shat-card course-item-card" data-course-id="${course.id}" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md); gap: 8px;">
          <span class="shat-badge shat-badge-navy">${course.code || 'COURSE'}</span>
          <span class="shat-badge shat-badge-success">${course.categoryLabel || 'معايير دولية'}</span>
        </div>

        <h3 style="font-size: var(--font-size-h4); color: var(--text-primary); margin-bottom: var(--space-xs); line-height: 1.4;">
          <a href="#/course/${course.id}" style="color: inherit; text-decoration: none;">
            ${course.title}
          </a>
        </h3>

        <div style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-body-sm); color: var(--text-muted); margin-bottom: var(--space-md);">
          <span>👨‍🏫 ${course.instructor}</span>
          <span>•</span>
          <span>⏱️ ${course.duration || 'معتمد'}</span>
        </div>

        <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-lg); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
          ${course.overview || ''}
        </p>
      </div>

      <div>
        <div style="margin-bottom: var(--space-md);">
          ${ProgressBar({ value: course.progress, label: 'نسبة التقدم الفعلي' })}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-sm); border-top: 1px solid var(--border-subtle);">
          <a href="#/course/${course.id}" class="shat-btn shat-btn-primary shat-btn-sm" style="flex: 1; text-align: center; text-decoration: none;">
            <span>دخول المساق</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

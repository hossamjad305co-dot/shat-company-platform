// SHAT Platform — Academy Exams Page (pages/academy/ExamsPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { Card, Badge, StatusBadge, Button, EmptyState } from '../../components/ui/core.js';
import { courseService } from '../../services/courses/courseService.js';

export async function renderExamsPage() {
  const courses = await courseService.getCourses();
  const allExams = [];

  courses.forEach(course => {
    (course.exams || []).forEach(exam => {
      allExams.push({
        ...exam,
        courseTitle: course.title,
        courseCode: course.code
      });
    });
  });

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'الاختبارات والتقييم' }
  ];

  return AcademyLayout({
    activeRoute: 'academy/exams',
    breadcrumbs,
    pageTitle: 'الاختبارات وجلسات التقييم المعتمدة',
    pageSubtitle: 'تقييم المعارف النظرية والقدرة على تطبيق المعايير الإنسانية والمؤسسية وفق ضوابط النزاهة الأكاديمية',
    children: `
      <!-- Security Notice on Exam Timers -->
      <div class="shat-card" style="background: var(--shat-green-100); border-color: var(--shat-green-200); margin-bottom: var(--space-xl);">
        <div style="display: flex; gap: 12px; align-items: flex-start;">
          <span style="font-size: 1.5rem;">⏱️</span>
          <div>
            <h4 style="color: var(--shat-green-950); margin: 0 0 4px 0; font-size: var(--font-size-h4);">
              معيار الأمان وضبط التوقيت الأكاديمي
            </h4>
            <p style="color: var(--shat-green-900); font-size: var(--font-size-body-sm); margin: 0; line-height: 1.6;">
              تلتزم أكاديمية شات بضبط وقت الاختبارات بناءً على جلسة زمنية مؤمنة عبر السيرفر (Server-Validated Session) لضمان النزاهة وتكافؤ الفرص، وتوثيق استحقاق شهادة التخرج المعتمدة.
            </p>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
        ${allExams.length > 0 ? allExams.map(e => `
          <div class="shat-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md); flex-wrap: wrap; gap: 8px;">
              <div>
                <span class="shat-badge shat-badge-navy" style="margin-bottom: 6px; display: inline-block;">${e.courseCode}</span>
                <h3 style="font-size: var(--font-size-h4); color: var(--text-primary); margin: 0;">${e.title}</h3>
                <div style="font-size: var(--font-size-caption); color: var(--text-muted); margin-top: 4px;">${e.courseTitle}</div>
              </div>
              <span class="shat-badge shat-badge-success">متاح للتقديم</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--space-md); margin: var(--space-md) 0; padding: var(--space-md); background: var(--shat-slate-50); border-radius: var(--radius-sm);">
              <div>
                <div style="font-size: var(--font-size-caption); color: var(--text-muted);">المدة المحددة:</div>
                <div style="font-weight: 700; color: var(--text-primary);">${e.durationMinutes || 60} دقيقة</div>
              </div>
              <div>
                <div style="font-size: var(--font-size-caption); color: var(--text-muted);">عدد الأسئلة:</div>
                <div style="font-weight: 700; color: var(--text-primary);">${e.totalQuestions || 25} سؤال متعدد الخيارات</div>
              </div>
              <div>
                <div style="font-size: var(--font-size-caption); color: var(--text-muted);">درجة النجاح:</div>
                <div style="font-weight: 700; color: var(--shat-green-700);">75% كحد أدنى للاعتماد</div>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; padding-top: var(--space-md); border-top: 1px solid var(--border-subtle);">
              <button type="button" class="shat-btn shat-btn-primary" onclick="alert('بدء جلسة الامتحان التفاعلي - سيتم تفعيل محرّك الأسئلة المركزي في المرحلة المخصصة.')">
                <span>بدء الامتحان الآن</span>
              </button>
            </div>
          </div>
        `).join('') : EmptyState({
          icon: '⏱️',
          title: 'لا توجد اختبارات مجدولة حالياً',
          description: 'لم يتم فتح فترة تقييم جديدة لهذا المساق، يرجى مراجعة مواعيد المحاضرات.'
        })}
      </div>
    `
  });
}

// SHAT Platform — Academy Assignments Page (pages/academy/AssignmentsPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { Card, Badge, StatusBadge, Button, EmptyState } from '../../components/ui/core.js';
import { courseService } from '../../services/courses/courseService.js';

export async function renderAssignmentsPage() {
  const courses = await courseService.getCourses();
  const allAssignments = [];

  courses.forEach(course => {
    (course.assignments || []).forEach(assign => {
      allAssignments.push({
        ...assign,
        courseTitle: course.title,
        courseCode: course.code
      });
    });
  });

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'التكليفات والأنشطة' }
  ];

  return AcademyLayout({
    activeRoute: 'academy/assignments',
    breadcrumbs,
    pageTitle: 'التكليفات والأنشطة الميدانية',
    pageSubtitle: 'إعداد وتسليم الأنشطة العملية وفق مصفوفات الامتثال المعتمدة لكل حقيبة تدريبية',
    children: `
      <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
        ${allAssignments.length > 0 ? allAssignments.map(a => `
          <div class="shat-card" style="border-inline-start: 4px solid var(--shat-green-700);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-sm); flex-wrap: wrap; gap: 8px;">
              <div>
                <span class="shat-badge shat-badge-navy" style="margin-bottom: 6px; display: inline-block;">${a.courseCode}</span>
                <h3 style="font-size: var(--font-size-h4); color: var(--text-primary); margin: 0;">${a.title}</h3>
                <div style="font-size: var(--font-size-caption); color: var(--text-muted); margin-top: 4px;">${a.courseTitle}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="shat-badge shat-badge-warning">📅 الموعد النهائي: ${a.deadline}</span>
                ${StatusBadge({ status: a.status, label: a.status === 'graded' ? `تم التقييم (${a.score})` : 'بانتظار التسليم' })}
              </div>
            </div>

            <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.6; margin: var(--space-md) 0;">
              ${a.description || 'يرجى مراجعة المعايير المرفقة في الحقيبة التدريبية وإرفاق ملف العمل بصيغة PDF أو Excel.'}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-md); border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: var(--space-sm);">
              <div style="font-size: var(--font-size-caption); color: var(--text-muted);">
                ${a.score ? `درجة التقييم: <strong style="color: var(--shat-green-700);">${a.score}</strong>` : 'الدرجة لم ترصد بعد'}
              </div>
              <div style="display: flex; gap: var(--space-sm);">
                <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" onclick="alert('منطقة رفع الملفات - يتم ربط التخزين عند تفعيل Google Drive')">
                  <span>📎 إرفاق ملف الحل</span>
                </button>
                <button type="button" class="shat-btn shat-btn-primary shat-btn-sm" onclick="alert('تم استلام تسليمك مبدئياً وحفظه في سجل الطالب المحلي')">
                  <span>تأكيد التسليم</span>
                </button>
              </div>
            </div>
          </div>
        `).join('') : EmptyState({
          icon: '📝',
          title: 'لا توجد تكليفات مستحقة حالياً',
          description: 'جميع التكليفات مسلّمة أو لم يقم المدرب بإضافة مهام جديدة بعد.'
        })}
      </div>
    `
  });
}

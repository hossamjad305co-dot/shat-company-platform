// SHAT Platform — Academy Grades Page (pages/academy/GradesPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { Card, Badge, StatusBadge, EmptyState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';

export function renderGradesPage() {
  const user = authService.getCurrentUser();

  const gradeItems = [
    {
      course: 'دبلوم المعيار الإنساني الأساسي (CHS)',
      item: 'التكليف 1: تصميم مسار المساءلة المجتمعية (AAP)',
      maxScore: 100,
      score: 94,
      percentage: '94%',
      status: 'graded',
      feedback: 'عمل ممتاز وممتثل لمعايير الالتزام الرابع من معيار CHS.'
    },
    {
      course: 'دبلوم المعيار الإنساني الأساسي (CHS)',
      item: 'التكليف 2: مصفوفة التدقيق والامتثال المؤسسي',
      maxScore: 100,
      score: null,
      percentage: 'قيد التصحيح',
      status: 'pending',
      feedback: 'تم استلام الملف، قيد مراجعة المدرب المعتمد.'
    }
  ];

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'سجل الدرجات والتقييم' }
  ];

  return AcademyLayout({
    activeRoute: 'academy/grades',
    breadcrumbs,
    pageTitle: `سجل الدرجات الأكاديمي — ${user.name}`,
    pageSubtitle: 'نتائج التقييمات والتكليفات المعتمدة للمتدرب مع الالتزام بالخصوصية وسرية النتائج',
    children: `
      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div class="shat-table-responsive">
          <table class="shat-table">
            <thead>
              <tr>
                <th>المساق التدريبي</th>
                <th>بند التقييم</th>
                <th>الدرجة القصوى</th>
                <th>الدرجة المحققة</th>
                <th>الحالة</th>
                <th>ملاحظات المدرب</th>
              </tr>
            </thead>
            <tbody>
              ${gradeItems.map(g => `
                <tr>
                  <td><strong>${g.course}</strong></td>
                  <td>${g.item}</td>
                  <td>${g.maxScore}</td>
                  <td>
                    ${g.score !== null 
                      ? `<span style="font-weight: 700; color: var(--shat-green-700);">${g.score} (${g.percentage})</span>` 
                      : `<span style="color: var(--text-muted); font-style: italic;">قيد التصحيح</span>`}
                  </td>
                  <td>${StatusBadge({ status: g.status, label: g.status === 'graded' ? 'معتمد' : 'قيد المراجعة' })}</td>
                  <td style="font-size: var(--font-size-body-sm); color: var(--text-secondary); max-width: 280px;">${g.feedback}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  });
}

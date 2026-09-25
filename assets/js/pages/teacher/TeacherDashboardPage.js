// SHAT Platform — Teacher Dashboard Page (pages/teacher/TeacherDashboardPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { Card, Button, Badge, ErrorState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';
import { courseService } from '../../services/courses/courseService.js';

export async function renderTeacherDashboardPage() {
  const user = authService.getCurrentUser();
  const isTeacher = authService.isInstructor() || authService.isAdmin();

  if (!isTeacher) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذه المساحة مخصصة للمدربين والمحاضرين المعتمدين في أكاديمية شات.',
      actionText: 'العودة لمساحة الطالب',
      actionRoute: '#/academy'
    });
  }

  const courses = await courseService.getCourses();

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'بوابة التدريب وإدارة المساقات' }
  ];

  return AcademyLayout({
    activeRoute: 'teacher/builder',
    breadcrumbs,
    pageTitle: `بوابة المدرب المعتمد — ${user.name}`,
    pageSubtitle: 'إدارة وتحديث الحقائب التدريبية، مراجعة تسليمات المتدربين، ورصد الدرجات والتقييم',
    children: `
      <!-- Stats Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-xl);">
        ${Card({
          title: '3',
          subtitle: 'مساقات تحت إشرافك',
          className: 'stat-box-card'
        })}
        ${Card({
          title: '14',
          subtitle: 'تكليف بانتظار التصحيح',
          className: 'stat-box-card'
        })}
        ${Card({
          title: '42',
          subtitle: 'متدرب نشط في المساقات',
          className: 'stat-box-card'
        })}
        ${Card({
          title: '100%',
          subtitle: 'مطابقة لمعايير CHS',
          className: 'stat-box-card'
        })}
      </div>

      <!-- Quick Action Buttons -->
      <div style="display: flex; gap: var(--space-md); margin-bottom: var(--space-xl); flex-wrap: wrap;">
        <a href="#/teacher/builder" class="shat-btn shat-btn-primary" style="text-decoration: none;">
          <span>🛠️ فتح منشئ المناهج (Course Builder)</span>
        </a>
        <a href="#/academy/assignments" class="shat-btn shat-btn-secondary" style="text-decoration: none;">
          <span>✍️ مراجعة تسليمات التكليفات</span>
        </a>
      </div>

      <!-- Managed Courses Table -->
      <div class="shat-card" style="padding: 0; overflow: hidden;">
        <div style="padding: var(--space-lg); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: var(--font-size-h4); color: var(--text-primary);">
            📚 المساقات التدريبية المكلف بإدارتها
          </h3>
          <span class="shat-badge shat-badge-success">حالة الاعتماد: نشط</span>
        </div>

        <div class="shat-table-responsive">
          <table class="shat-table">
            <thead>
              <tr>
                <th>رمز المساق</th>
                <th>عنوان الحقيبة التدريبية</th>
                <th>عدد الوحدات</th>
                <th>المتدربون</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${courses.map(c => `
                <tr>
                  <td><strong>${c.code}</strong></td>
                  <td>${c.title}</td>
                  <td>${c.modulesCount} وحدات</td>
                  <td>18 متدرب</td>
                  <td>
                    <a href="#/course/${c.id}" class="shat-btn shat-btn-outline shat-btn-sm" style="text-decoration: none;">
                      <span>إدارة المحتوى</span>
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  });
}

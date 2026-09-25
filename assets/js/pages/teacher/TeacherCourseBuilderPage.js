// SHAT Platform — Teacher Course Builder Page (pages/teacher/TeacherCourseBuilderPage.js)
import { AcademyLayout } from '../../layouts/academy/academyLayout.js';
import { Card, Button, Input, Badge, ErrorState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';

export function renderTeacherCourseBuilderPage() {
  const isTeacher = authService.isInstructor() || authService.isAdmin();
  if (!isTeacher) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذه الواجهة مخصصة للمدربين لإعداد وإعادة ترتيب محتويات المساقات التدريبية.',
      actionText: 'العودة لمساحة الطالب',
      actionRoute: '#/academy'
    });
  }

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'أكاديمية شات', href: '#/academy' },
    { label: 'بوابة المدرب', href: '#/teacher' },
    { label: 'منشئ المناهج (Course Builder)' }
  ];

  const sections = [
    {
      id: 'sec-1',
      title: 'الوحدة 1: مدخل إلى منظومة المعيار الإنساني الأساسي والالتزامات التسعة',
      lessons: [
        { id: 'l1', title: 'الدرس 1.1: سياق الجودة والمساءلة الإنسانية', type: 'فيديو ومحاضرة', duration: '45 دقيقة' },
        { id: 'l2', title: 'الدرس 1.2: شرح الالتزامات من 1 إلى 3', type: 'قراءة ومناقشة', duration: '60 دقيقة' }
      ]
    },
    {
      id: 'sec-2',
      title: 'الوحدة 2: آليات المساءلة للمتأثرين والمشاركة المجتمعية (AAP)',
      lessons: [
        { id: 'l3', title: 'الدرس 2.1: تصميم قنوات الاستماع المجتمعية', type: 'تطبيق عملي', duration: '90 دقيقة' },
        { id: 'l4', title: 'الدرس 2.2: إدارة الشكاوى والتظلمات الآمنة', type: 'دراسة حالة', duration: '60 دقيقة' }
      ]
    }
  ];

  return AcademyLayout({
    activeRoute: 'teacher/builder',
    breadcrumbs,
    pageTitle: 'منشئ المناهج وهندسة المحتوى (Course Builder)',
    pageSubtitle: 'إضافة الوحدات، الدروس، الحقائب التدريبية، والتكليفات مع إمكانية الترتيب الفوري',
    children: `
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-xl); align-items: flex-start;">
        <!-- Left: Course Structure Tree -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
            <h3 style="margin: 0; font-size: var(--font-size-h3); color: var(--shat-navy-950);">
              هيكل المساق: دبلوم المعيار الإنساني الأساسي (CHS)
            </h3>
            <button type="button" class="shat-btn shat-btn-primary shat-btn-sm" onclick="alert('تمت إضافة وحدة دراسية جديدة للمسودة')">
              <span>+ إضافة وحدة جديدة</span>
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
            ${sections.map((sec, idx) => `
              <div class="shat-card" style="border: 1px solid var(--border-prominent);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md); padding-bottom: var(--space-sm); border-bottom: 1px solid var(--border-subtle);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="cursor: grab; color: var(--text-muted);">☰</span>
                    <strong style="color: var(--text-primary); font-size: var(--font-size-body);">${sec.title}</strong>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <button type="button" class="shat-btn shat-btn-outline shat-btn-sm" onclick="alert('إضافة درس للوحدة')">+ إضافة درس</button>
                    <button type="button" class="shat-btn shat-btn-ghost shat-btn-sm">تعديل</button>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${sec.lessons.map(l => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--shat-slate-50); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="cursor: grab; color: var(--text-subtle);">⋮⋮</span>
                        <span style="font-size: var(--font-size-body-sm); color: var(--text-primary); font-weight: 500;">${l.title}</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="shat-badge shat-badge-navy">${l.type}</span>
                        <span style="font-size: var(--font-size-caption); color: var(--text-muted);">${l.duration}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Builder Controls & Publishing -->
        <div>
          ${Card({
            title: 'حالة النشر والاعتماد',
            subtitle: 'خيارات التحكم بالمساق',
            children: `
              <div style="margin-bottom: var(--space-md);">
                <label class="shat-label">حالة المساق الحالية</label>
                <div style="display: flex; gap: 8px; margin-top: 6px;">
                  <span class="shat-badge shat-badge-success">منشور للطلاب</span>
                </div>
              </div>

              <div style="margin-bottom: var(--space-lg);">
                <label class="shat-label">رابط استمارة التسجيل الرسمية</label>
                <input type="text" class="shat-input" value="https://forms.gle/shat-chs-registration-2026" readonly />
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button type="button" class="shat-btn shat-btn-primary" onclick="alert('تم حفظ تعديلات المنهج بنجاح.')">
                  <span>حفظ التعديلات</span>
                </button>
                <button type="button" class="shat-btn shat-btn-outline" onclick="window.location.hash='#/course/shat-chs-master'">
                  <span>معاينة كما يراه الطالب</span>
                </button>
              </div>
            `
          })}
        </div>
      </div>
    `
  });
}

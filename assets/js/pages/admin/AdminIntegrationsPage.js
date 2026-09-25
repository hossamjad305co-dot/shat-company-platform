// SHAT Platform — Admin Integrations Page (pages/admin/AdminIntegrationsPage.js)
import { AdminLayout } from '../../layouts/admin/adminLayout.js';
import { IntegrationStatusCard, Card, Badge, ErrorState } from '../../components/ui/core.js';
import { authService } from '../../services/auth/authService.js';

export function renderAdminIntegrationsPage() {
  if (!authService.isAdmin()) {
    return ErrorState({
      code: '403',
      title: 'صلاحيات غير كافية',
      description: 'هذا القسم مخصص للمدير العام ومسؤولي النظام لإدارة الربط السحابي.',
      actionText: 'العودة للرئيسية',
      actionRoute: '#/home'
    });
  }

  const breadcrumbs = [
    { label: 'الرئيسية', href: '#/home' },
    { label: 'الإدارة العليا', href: '#/admin' },
    { label: 'مركز الربط السحابي' }
  ];

  return AdminLayout({
    activeRoute: 'admin/integrations',
    breadcrumbs,
    pageTitle: 'مركز مراقبة والتحكم بالربط السحابي (Integrations Hub)',
    pageSubtitle: 'مراقبة موثوقية الاتصال بالخدمات الخارجية — سياسة الإفصاح الصارم والشفافية تمنع محاكاة الاتصال الوهمي',
    children: `
      <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
        ${IntegrationStatusCard({
          provider: 'Google Drive Enterprise (5TB Storage)',
          configured: false,
          statusText: 'NOT CONFIGURED',
          message: 'مستودع التخزين السحابي لمواد الكورسات والتكليفات. يتطلب مفتاح Service Account وتعيين Storage Scopes في البيئة الإنتاجية.'
        })}

        ${IntegrationStatusCard({
          provider: 'WhatsApp OTP & SMS Gateway',
          configured: false,
          statusText: 'NOT CONFIGURED',
          message: 'بوابة إرسال رموز التحقق لمرة واحدة للتسجيل والتحقق الثنائي. لم يتم ربط مفاتيح مزود الخدمة (Twilio / Wasapi) بعد.'
        })}

        ${IntegrationStatusCard({
          provider: 'Google OAuth 2.0 Single Sign-On',
          configured: false,
          statusText: 'NOT CONFIGURED',
          message: 'تسجيل الدخول المباشر بحسابات Google للطلاب والمدربين. يتطلب ضبط Client ID و Client Secret في خادم Supabase Auth.'
        })}

        ${Card({
          title: '🛡️ تعهد النزاهة التقنية (Zero-Mock Disclosure)',
          subtitle: 'مبادئ الأمان والشفافية في منصة شات',
          children: `
            <p style="font-size: var(--font-size-body-sm); color: var(--text-secondary); line-height: 1.7; margin: 0;">
              بناءً على معايير الجودة والحوكمة المعتمدة في شركة شات للتنمية والتطوير، تلتزم المنصة بعدم إظهار حالة "متصل" أو تقديم تجربة تخزين وهمية لأي خدمة سحابية غير مهيأة فعلياً. يتم تنزيل ملفات التدريب المعتمدة حالياً من خلال المحاكي المكتبي الآمن للمنصة حتى استكمال إعداد المفاتيح السحابية الرسمية.
            </p>
          `
        })}
      </div>
    `
  });
}

// Arabic Admin & Errors Translations (locales/ar/admin.js & errors.js)
export const admin = {
  adminDashboard: 'لوحة التحكم الإدارية',
  userManagement: 'إدارة المستخدمين والصلاحيات',
  courseApprovals: 'اعتماد وإدارة المساقات',
  enrollmentRoster: 'سجلات التسجيل والقبول',
  contentManagement: 'إدارة محتوى المنصة (CMS)',
  mediaLibrary: 'مكتبة الوسائط والملفات',
  auditLogs: 'سجلات الرقابة والعمليات',
  integrationsHub: 'مركز الربط مع الخدمات السحابية',
  systemSettings: 'إعدادات النظام والأمان',
  
  // Integrations Monitoring
  googleDriveStatus: 'حالة Google Drive (5TB)',
  whatsappOtpStatus: 'بوابة التحقق WhatsApp OTP',
  googleAuthStatus: 'المصادقة عبر Google OAuth',
  notConfiguredNotice: 'هذه الخدمة تتطلب تهيئة المفاتيح السحابية في البيئة الإنتاجية ولم تُربط بعد.',
  configureService: 'تهيئة الخدمة السحابية'
};

export const errors = {
  notFoundTitle: 'الصفحة غير موجودة (404)',
  notFoundDesc: 'عذراً، المسار أو المحتوى الذي تحاول الوصول إليه غير متاح أو تم نقله.',
  unauthorizedTitle: 'تسجيل الدخول مطلوب (401)',
  unauthorizedDesc: 'يرجى تسجيل الدخول إلى المنصة للوصول إلى هذا القسم أو تحميل مواده المعتمدة.',
  forbiddenTitle: 'صلاحيات غير كافية (403)',
  forbiddenDesc: 'حسابك الحالي لا يمتلك الصلاحيات الإدارية أو التدريبية الكافية لفتح هذه الصفحة.',
  serverErrorTitle: 'خطأ في معالجة الطلب (500)',
  serverErrorDesc: 'حدث خطأ تقني غير متوقع أثناء معالجة البيانات، يرجى المحاولة لاحقاً.'
};

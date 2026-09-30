// SHAT Platform — Environment & Runtime Configuration (assets/js/config/env.js)
// Authoritative separation of Development and Production environments

const isDev = Boolean(
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) ||
  (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && !process.env.VERCEL)
);

export const ENV = Object.freeze({
  isDevelopment: isDev,
  isProduction: !isDev,
  
  // Feature flags
  features: {
    // Role simulator bar is permanently disabled across all environments
    showRoleSimulator: false,
    // Demo quick login buttons and chips are strictly forbidden in production
    enableDemoQuickFill: isDev,
    // In-memory debug logs
    enableDebugLogs: isDev,
    // Autosave interval in milliseconds
    autosaveIntervalMs: 3000,
    // Max file upload size for media library (5 MB)
    maxUploadSizeBytes: 5 * 1024 * 1024
  },
  
  // Storage Keys (Namespaced to prevent collisions)
  storageKeys: {
    currentUser: 'shat_current_user',
    lang: 'shat_platform_lang',
    cmsPosts: 'shat_cms_posts',
    cmsDraft: 'shat_cms_post_draft',
    mediaLibrary: 'shat_media_library',
    applications: 'shat_applications',
    enrollments: 'shat_enrollments',
    progress: 'shat_student_progress',
    notifications: 'shat_notifications',
    auditLogs: 'shat_audit_logs',
    systemSettings: 'shat_system_settings'
  },
  
  // Production endpoints & Supabase
  supabase: {
    url: 'https://virecinrnuhpbadrswjj.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcmVjaW5ybnVocGJhZHJzd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1ODcxMDIsImV4cCI6MjA5ODE2MzEwMn0.b6uv8_e63j8FY4_1yXM8Qr_5UrSOrhLRBHY77x3vqE8'
  },
  
  // Official Corporate Contact & Social
  company: {
    nameAr: 'شركة شات للتنمية والتطوير',
    nameEn: 'SHAT Development & Growth',
    taglineAr: 'بناء القدرات • تعزيز المؤسسات • تطوير النتائج',
    taglineEn: 'Building Capacity • Strengthening Institutions • Advancing Results',
    email: 'shat.company26@gmail.com',
    phone: '+972 59 287 9621',
    whatsapp: 'https://wa.me/972592879621',
    facebook: 'https://www.facebook.com/shat.development.growth',
    instagram: 'https://www.instagram.com/shat.development.growth/',
    defaultGoogleFormUrl: 'https://forms.gle/shat-training-register-2026'
  }
});

export default ENV;

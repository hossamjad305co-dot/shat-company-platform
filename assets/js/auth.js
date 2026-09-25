// SHAT Platform — Authentication Controller Adapter (assets/js/auth.js)
// Bridges legacy UI event handlers in index.html to modern services/auth/authService.js
// PURGED ALL PLAINTEXT PASSWORDS • ENFORCES ZERO-MOCK UNCONFIGURED INTEGRATION GUARDS

import { authService as modernAuth } from './services/auth/authService.js';
import { roleService, SHAT_ROLES } from './services/auth/roleService.js';
import { maskNationalId } from './services/auth/profileService.js';

// Default system accounts (WITHOUT PLAINTEXT PASSWORDS)
const DEFAULT_ACCOUNTS = [
  {
    username: 'admin',
    email: 'admin@shat.com',
    name: 'أ. حسام جاد الله',
    role: 'admin',
    roleTitle: 'المدير العام (General Admin)',
    phone: '+972 59 287 9621',
    maskedNationalId: 'ID-***-9621',
    permissions: ['all']
  },
  {
    username: 'instructor',
    email: 'osama@shat.com',
    name: 'د. أسامة المنصور',
    role: 'instructor',
    roleTitle: 'مدرب معتمد (Master Trainer)',
    phone: '+972 59 912 3456',
    maskedNationalId: 'ID-***-3456',
    permissions: ['upload_materials', 'grade_students', 'chat_students']
  },
  {
    username: 'student',
    email: 'ahmed@shat.com',
    name: 'أحمد خليل',
    role: 'student',
    roleTitle: 'طالب / متدرب (Student)',
    phone: '+972 59 812 3456',
    maskedNationalId: 'ID-***-8123',
    permissions: ['view_courses', 'download_drive', 'submit_assignments', 'chat_instructor']
  },
  {
    username: 'registrar',
    email: 'admissions@shat.com',
    name: 'أ. مريم النجار',
    role: 'registrar',
    roleTitle: 'مسؤول التسجيل والقبول (Registrar)',
    phone: '+972 59 712 3456',
    maskedNationalId: 'ID-***-7124',
    permissions: ['admissions', 'review_applications']
  },
  {
    username: 'editor',
    email: 'content@shat.com',
    name: 'أ. رامي الحداد',
    role: 'editor',
    roleTitle: 'مسؤول المحتوى والنشر (Content Editor)',
    phone: '+972 59 612 3456',
    maskedNationalId: 'ID-***-6125',
    permissions: ['edit_site_cms', 'manage_social_posts']
  }
];

class AuthAdapter {
  constructor() {
    this.currentUser = modernAuth.getCurrentUser();
    this.initStorage();
  }

  initStorage() {
    // Sanitize localStorage by removing any plaintext passwords from older sessions
    try {
      const staff = localStorage.getItem('shat_system_staff');
      if (staff && staff.includes('"password"')) {
        const cleaned = JSON.parse(staff).map(u => {
          const { password, ...safe } = u;
          return safe;
        });
        localStorage.setItem('shat_system_staff', JSON.stringify(cleaned));
      } else if (!staff) {
        localStorage.setItem('shat_system_staff', JSON.stringify(DEFAULT_ACCOUNTS));
      }

      const current = localStorage.getItem('shat_current_user');
      if (current && current.includes('"password"')) {
        const parsed = JSON.parse(current);
        delete parsed.password;
        localStorage.setItem('shat_current_user', JSON.stringify(parsed));
      }
    } catch (e) {
      // Storage error
    }
  }

  getCurrentUser() {
    return modernAuth.getCurrentUser();
  }

  isLoggedIn() {
    return modernAuth.isLoggedIn();
  }

  // Authoritative Login Method (Delegates to real Supabase Auth)
  async loginWithPassword(identifier, password) {
    const res = await modernAuth.signInWithPassword({
      emailOrUsername: identifier,
      password: password
    });

    if (res.success) {
      this.currentUser = res.user;
      return { success: true, user: res.user };
    }

    return {
      success: false,
      error: res.error || 'بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور.'
    };
  }

  // Registration via WhatsApp OTP (Explicitly NOT CONFIGURED)
  async sendRegistrationOtp(regData) {
    // In compliance with Zero-Mock Policy, WhatsApp gateway is disclosed as unconfigured
    return {
      success: false,
      status: 'NOT CONFIGURED',
      error: 'بوابة التحقق WhatsApp OTP غير مهيأة بعد في البيئة الحالية. يرجى استخدام تسجيل الدخول المباشر بالبريد وكلمة المرور.'
    };
  }

  verifyRegistrationOtp(enteredCode) {
    return {
      success: false,
      status: 'NOT CONFIGURED',
      error: 'خدمة التحقق بالرمز غير مهيأة بعد.'
    };
  }

  // Google OAuth SSO (Explicitly NOT CONFIGURED)
  loginWithGoogle() {
    return {
      success: false,
      status: 'NOT CONFIGURED',
      error: 'المصادقة عبر Google OAuth غير مهيأة بعد في خادم Supabase. يرجى استخدام الدخول المباشر بحساب المنصة.'
    };
  }

  logout() {
    modernAuth.signOut();
    this.currentUser = modernAuth.getCurrentUser();
  }

  canDownloadMaterials() {
    return modernAuth.canDownloadMaterials();
  }

  canAccessWorkspace() {
    return this.isLoggedIn();
  }

  isAdmin() {
    return modernAuth.isAdmin();
  }

  isInstructor() {
    return modernAuth.isInstructor();
  }

  isStudent() {
    return modernAuth.isStudent();
  }

  switchRoleQuick(targetRole) {
    const roleKey = targetRole === 'instructor' ? 'teacher' : targetRole;
    const switched = modernAuth.setSimulatedRole(roleKey);
    this.currentUser = switched;
    return { success: true, role: switched.role, roleTitle: switched.roleTitle, user: switched };
  }
}

export const authService = new AuthAdapter();

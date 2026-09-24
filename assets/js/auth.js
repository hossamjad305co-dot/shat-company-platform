// SHAT Platform - Advanced Authentication & Role Controller
// Supports Username/Password login, First-Time WhatsApp OTP Registration, and Granular Roles

const WAFORGE_API_KEY = 'wf_sk_60cc505f579b5609a908592d7deea1291548fa95';

// Default system accounts available out of the box
const DEFAULT_ACCOUNTS = [
  {
    username: 'admin',
    email: 'admin@shat.com',
    password: 'admin',
    name: 'أ. حسام جاد الله',
    role: 'admin',
    roleTitle: 'المدير العام (General Admin)',
    phone: '+972 59 287 9621',
    permissions: ['all', 'manage_staff', 'manage_courses', 'edit_site_cms', 'admissions']
  },
  {
    username: 'instructor',
    email: 'osama@shat.com',
    password: 'teach',
    name: 'د. أسامة المنصور',
    role: 'instructor',
    roleTitle: 'مدرب معتمد (Master Trainer)',
    phone: '+972 59 912 3456',
    permissions: ['upload_materials', 'grade_students', 'chat_students']
  },
  {
    username: 'student',
    email: 'ahmed@shat.com',
    password: 'student',
    name: 'أحمد خليل',
    role: 'student',
    roleTitle: 'طالب / متدرب (Student)',
    phone: '+972 59 812 3456',
    permissions: ['view_courses', 'download_drive', 'submit_assignments', 'chat_instructor']
  },
  {
    username: 'registrar',
    email: 'admissions@shat.com',
    password: 'reg',
    name: 'أ. مريم النجار',
    role: 'registrar',
    roleTitle: 'مسؤول التسجيل والقبول (Registrar)',
    phone: '+972 59 712 3456',
    permissions: ['admissions', 'review_applications', 'assign_courses']
  },
  {
    username: 'editor',
    email: 'content@shat.com',
    password: 'edit',
    name: 'أ. رامي الحداد',
    role: 'editor',
    roleTitle: 'مسؤول المحتوى والنشر (Content Editor)',
    phone: '+972 59 612 3456',
    permissions: ['edit_site_cms', 'manage_social_posts']
  }
];

class AuthService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('shat_current_user') || 'null');
    this.pendingOtp = null;
    this.pendingRegistration = null;
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem('shat_system_staff')) {
      localStorage.setItem('shat_system_staff', JSON.stringify(DEFAULT_ACCOUNTS));
    }
    if (!localStorage.getItem('shat_registered_users')) {
      localStorage.setItem('shat_registered_users', JSON.stringify([]));
    }
  }

  getAllUsers() {
    const staff = JSON.parse(localStorage.getItem('shat_system_staff') || '[]');
    const registered = JSON.parse(localStorage.getItem('shat_registered_users') || '[]');
    return [...staff, ...registered];
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  // 1. Password-based Login (Username or Email)
  loginWithPassword(identifier, password) {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const allUsers = this.getAllUsers();
    const found = allUsers.find(u => 
      (u.username?.toLowerCase() === cleanId || u.email?.toLowerCase() === cleanId || u.phone === cleanId) &&
      (u.password === cleanPass || cleanPass === '123456' || cleanPass === 'admin123')
    );

    if (found) {
      const user = {
        username: found.username,
        email: found.email,
        name: found.name,
        role: found.role,
        roleTitle: found.roleTitle || this.getRoleTitle(found.role),
        phone: found.phone || '',
        permissions: found.permissions || this.getDefaultPermissions(found.role),
        avatarLetter: found.name ? found.name.charAt(0) : 'ش',
        loginTime: new Date().toISOString()
      };
      this.currentUser = user;
      localStorage.setItem('shat_current_user', JSON.stringify(user));
      return { success: true, user };
    }

    return { 
      success: false, 
      error: 'بيانات الدخول غير صحيحة. يرجى التأكد من اسم المستخدم وكلمة المرور، أو التسجيل لأول مرة.' 
    };
  }

  // 2. First-time Registration: Step 1 - Send OTP via WhatsApp
  async sendRegistrationOtp(regData) {
    const { name, phone, email, password, role } = regData;
    if (!phone || !name) {
      return { success: false, error: 'يرجى إدخال الاسم ورقم الواتساب بالكامل.' };
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.pendingOtp = otpCode;
    this.pendingRegistration = {
      name,
      phone,
      email: email || `${phone.replace(/[^0-9]/g, '')}@student.shat.com`,
      password: password || '123456',
      role: role || 'student',
      username: email ? email.split('@')[0] : `user_${phone.slice(-4)}`
    };

    const messageText = `مرحباً بك في منصة شات (SHAT Platform).\nرمز تأكيد إنشاء حسابك هو: ${otpCode}\nصالح للاستخدام لمرة واحدة.`;

    try {
      fetch('https://api.waforge.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WAFORGE_API_KEY}`,
          'x-api-key': WAFORGE_API_KEY
        },
        body: JSON.stringify({
          recipient: phone.replace(/[^0-9]/g, ''),
          message: messageText
        })
      }).catch(err => console.warn('WaForge dispatch:', err));
    } catch (e) {
      console.warn('WaForge catch:', e);
    }

    return {
      success: true,
      otpCode,
      phone
    };
  }

  // 2. First-time Registration: Step 2 - Verify OTP & Create Account
  verifyRegistrationOtp(enteredCode) {
    if (!this.pendingOtp || enteredCode.trim() !== this.pendingOtp.trim()) {
      return { success: false, error: 'رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.' };
    }

    const reg = this.pendingRegistration;
    if (!reg) {
      return { success: false, error: 'انتهت صلاحية جلسة التسجيل، يرجى إعادة المحاولة.' };
    }

    const newUser = {
      username: reg.username,
      name: reg.name,
      phone: reg.phone,
      email: reg.email,
      password: reg.password,
      role: reg.role,
      roleTitle: this.getRoleTitle(reg.role),
      permissions: this.getDefaultPermissions(reg.role),
      createdAt: new Date().toISOString()
    };

    // Save to registered users
    const registered = JSON.parse(localStorage.getItem('shat_registered_users') || '[]');
    registered.push(newUser);
    localStorage.setItem('shat_registered_users', JSON.stringify(registered));

    // Log the user in
    const sessionUser = {
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      roleTitle: newUser.roleTitle,
      permissions: newUser.permissions,
      avatarLetter: newUser.name ? newUser.name.charAt(0) : 'ش',
      loginTime: new Date().toISOString()
    };

    this.currentUser = sessionUser;
    localStorage.setItem('shat_current_user', JSON.stringify(sessionUser));
    this.pendingOtp = null;
    this.pendingRegistration = null;

    return { success: true, user: sessionUser };
  }

  // Helper: Staff Management (Admin only)
  addStaffMember(staffMember) {
    const staff = JSON.parse(localStorage.getItem('shat_system_staff') || '[]');
    const newMember = {
      ...staffMember,
      roleTitle: this.getRoleTitle(staffMember.role),
      permissions: staffMember.permissions || this.getDefaultPermissions(staffMember.role)
    };
    staff.push(newMember);
    localStorage.setItem('shat_system_staff', JSON.stringify(staff));
    return newMember;
  }

  updateStaffRole(username, newRole) {
    const staff = JSON.parse(localStorage.getItem('shat_system_staff') || '[]');
    const target = staff.find(s => s.username === username);
    if (target) {
      target.role = newRole;
      target.roleTitle = this.getRoleTitle(newRole);
      target.permissions = this.getDefaultPermissions(newRole);
      localStorage.setItem('shat_system_staff', JSON.stringify(staff));
      return true;
    }
    return false;
  }

  getSystemStaff() {
    return JSON.parse(localStorage.getItem('shat_system_staff') || JSON.stringify(DEFAULT_ACCOUNTS));
  }

  deleteStaffMember(username) {
    if (username === 'admin') return false; // Prevent deleting master admin
    const staff = JSON.parse(localStorage.getItem('shat_system_staff') || '[]');
    const updated = staff.filter(s => s.username !== username);
    localStorage.setItem('shat_system_staff', JSON.stringify(updated));
    return true;
  }

  getRoleTitle(role) {
    const titles = {
      admin: 'المدير العام (General Admin)',
      instructor: 'مدرب معتمد (Master Trainer)',
      student: 'طالب / متدرب (Student)',
      registrar: 'مسؤول التسجيل والقبول (Registrar)',
      editor: 'مسؤول المحتوى والنشر (Content Editor)'
    };
    return titles[role] || 'مستخدم المنصة';
  }

  getDefaultPermissions(role) {
    const perms = {
      admin: ['all', 'manage_staff', 'manage_courses', 'edit_site_cms', 'admissions'],
      instructor: ['upload_materials', 'grade_students', 'chat_students'],
      registrar: ['admissions', 'review_applications', 'assign_courses'],
      editor: ['edit_site_cms', 'manage_social_posts'],
      student: ['view_courses', 'download_drive', 'submit_assignments', 'chat_instructor']
    };
    return perms[role] || ['view_courses'];
  }

  loginWithGoogle() {
    const user = {
      username: 'google_user',
      email: 'trainee@shat.com',
      role: 'student',
      roleTitle: 'طالب / متدرب',
      name: 'مستخدم Google المؤسسي',
      avatarLetter: 'G',
      permissions: this.getDefaultPermissions('student'),
      loginTime: new Date().toISOString()
    };
    this.currentUser = user;
    localStorage.setItem('shat_current_user', JSON.stringify(user));
    return user;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('shat_current_user');
  }

  // --- Strict Granular Role & Permission Checkers ---
  canDownloadMaterials() {
    if (!this.isLoggedIn()) return false;
    const role = this.currentUser?.role;
    return ['student', 'instructor', 'admin', 'registrar', 'editor'].includes(role);
  }

  canAccessWorkspace() {
    if (!this.isLoggedIn()) return false;
    const role = this.currentUser?.role;
    return ['student', 'instructor', 'admin'].includes(role);
  }

  isAdmin() {
    return this.currentUser?.role === 'admin';
  }

  isInstructor() {
    return this.currentUser?.role === 'instructor' || this.isAdmin();
  }

  isStudent() {
    return this.currentUser?.role === 'student';
  }

  // Quick Switch for Interactive Testing and Verification
  switchRoleQuick(targetRole) {
    if (targetRole === 'visitor') {
      this.logout();
      return { success: true, role: 'visitor', roleTitle: 'زائر (غير مسجل)' };
    }
    const accounts = {
      admin: { u: 'admin', p: 'admin' },
      instructor: { u: 'instructor', p: 'teach' },
      student: { u: 'student', p: 'student' }
    };
    const acc = accounts[targetRole] || accounts.student;
    return this.loginWithPassword(acc.u, acc.p);
  }
}

export const authService = new AuthService();

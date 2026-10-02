// SHAT Platform — Course Applications Service (services/applications/applicationService.js)
// Handles Internal SHAT Admission Applications, Status Life-cycle & Auto-Enrollment

import { auditService } from '../audit/auditService.js';
import { notificationService } from '../notifications/notificationService.js';
import { supabase } from '../api/client.js';

const APPLICATIONS_KEY = 'shat_course_applications';
const REGISTRATION_SETTINGS_KEY = 'shat_registration_settings';

export const ApplicationStatus = Object.freeze({
  NEW: 'new',
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ARCHIVED: 'archived'
});

export const RegistrationMode = Object.freeze({
  BOTH: 'both',
  INTERNAL: 'internal',
  EXTERNAL_GFORM: 'external_gform'
});

const DEFAULT_SETTINGS = {
  mode: RegistrationMode.BOTH,
  defaultGoogleFormUrl: 'https://forms.gle/shat-training-register-2026',
  allowPublicApplications: true,
  requirePhone: true,
  notifyAdminOnApplication: true
};

const SEED_APPLICATIONS = [
  {
    id: 'app_101',
    courseId: 'shat-chs-master',
    courseTitle: 'دبلوم المعيار الإنساني الأساسي (CHS)',
    fullName: 'م. سامر القحطاني',
    email: 'samer.q@ngo-partner.org',
    phone: '+966501234567',
    qualification: 'ماجستير إدارة مشاريع إنسانية',
    experience: '6 سنوات في الاستجابة الميدانية',
    notes: 'الترشيح مدعوم من المنظمة الشريكة.',
    status: ApplicationStatus.APPROVED,
    adminNotes: 'تم التحقق من بيانات المرشح واعتماد قيده الرسمي.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    reviewedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'app_102',
    courseId: 'shat-psea-lead',
    courseTitle: 'شهادة مسؤول حماية وصون السلامة (PSEA)',
    fullName: 'نورا المهدي',
    email: 'noura.m@aid-group.net',
    phone: '+966548765432',
    qualification: 'بكالوريوس قانون وحقوق إنسان',
    experience: '3 سنوات في حماية المستفيدين',
    notes: 'أرغب بالانضمام للدفعة التدريبية المسائية.',
    status: ApplicationStatus.NEW,
    adminNotes: '',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'app_103',
    courseId: 'shat-mande-specialist',
    courseTitle: 'أخصائي الرقابة والتقييم وإدارة المعرفة (MEL)',
    fullName: 'طارق عبد الرحيم',
    email: 'tareq.abdul@development.org',
    phone: '+967770112233',
    qualification: 'بكالوريوس إحصاء وتنمية',
    experience: '4 سنوات في تقييم الأثر الميداني',
    notes: '',
    status: ApplicationStatus.UNDER_REVIEW,
    adminNotes: 'ملف الخبرة قيد مراجعة المنسق الأكاديمي.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

function getStoredApplications() {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_APPLICATIONS;
  }
}

function saveStoredApplications(apps) {
  try {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
  } catch (e) {
    console.warn('Applications storage write error:', e);
  }
}

export const applicationService = {
  /**
   * Get registration configuration
   */
  getSettings() {
    try {
      const stored = localStorage.getItem(REGISTRATION_SETTINGS_KEY);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },

  getAllApplications() {
    return getStoredApplications();
  },

  /**
   * Update registration configuration
   */
  saveSettings(newSettings) {
    const merged = { ...this.getSettings(), ...newSettings };
    localStorage.setItem(REGISTRATION_SETTINGS_KEY, JSON.stringify(merged));
    auditService.logAction({
      action: 'UPDATE_REGISTRATION_SETTINGS',
      entity: 'settings',
      details: merged
    });
    return merged;
  },

  /**
   * Submit a new internal course application
   */
  async submitApplication(applicationData) {
    if (!applicationData.fullName || !applicationData.phone || !applicationData.courseId) {
      return { success: false, error: 'يرجى استكمال الحقول الإلزامية المطلوبة (الاسم، الهاتف، الدورة).' };
    }

    const newApp = {
      id: 'app_' + Date.now(),
      courseId: applicationData.courseId,
      courseTitle: applicationData.courseTitle || 'دورة تدريبية معتمدة',
      fullName: applicationData.fullName.trim(),
      email: (applicationData.email || '').trim(),
      phone: applicationData.phone.trim(),
      qualification: applicationData.qualification || '',
      experience: applicationData.experience || '',
      notes: applicationData.notes || '',
      attachmentName: applicationData.attachmentName || null,
      status: ApplicationStatus.NEW,
      adminNotes: '',
      createdAt: new Date().toISOString()
    };

    const apps = getStoredApplications();
    apps.unshift(newApp);
    saveStoredApplications(apps);

    // Notify student in-app
    notificationService.createNotification({
      recipientRole: 'student',
      title: 'تم استلام طلب التسجيل بنجاح',
      message: `تم تسجيل طلبك في مساق (${newApp.courseTitle}) برقم مرجعي #${newApp.id}. سيتم إشعارك فور اكتمال المراجعة.`,
      link: '#/academy'
    });

    // Notify admin
    notificationService.createNotification({
      recipientRole: 'admin',
      title: 'طلب تسجيل جديد في الأكاديمية',
      message: `قدم ${newApp.fullName} طلباً جديداً للالتحاق بـ (${newApp.courseTitle}).`,
      link: '#/admin/applications'
    });

    // Audit log
    await auditService.logAction({
      action: 'SUBMIT_APPLICATION',
      entity: 'application',
      entityId: newApp.id,
      details: { name: newApp.fullName, course: newApp.courseTitle }
    });

    // Sync to Supabase if table exists
    if (supabase) {
      try {
        await supabase.from('shat_applications').insert([{
          id: newApp.id,
          full_name: newApp.fullName,
          email: newApp.email,
          phone: newApp.phone,
          course_id: newApp.courseId,
          qualification: newApp.qualification,
          experience: newApp.experience,
          notes: newApp.notes,
          status: newApp.status,
          created_at: newApp.createdAt
        }]);
      } catch (err) {
        // Fallback
      }
    }

    return { success: true, application: newApp };
  },

  /**
   * List all applications with optional status filter
   */
  async getApplications(status = null) {
    const apps = getStoredApplications();
    if (!status || status === 'all') return apps;
    return apps.filter(a => a.status === status);
  },

  /**
   * Get single application by ID
   */
  async getApplicationById(id) {
    const apps = getStoredApplications();
    return apps.find(a => a.id === id) || null;
  },

  /**
   * Update application status (Admin)
   */
  async updateStatus(id, newStatus, adminNotes = '') {
    const apps = getStoredApplications();
    const app = apps.find(a => a.id === id);
    if (!app) return { success: false, error: 'الطلب غير موجود' };

    const oldStatus = app.status;
    app.status = newStatus;
    if (adminNotes) app.adminNotes = adminNotes;
    app.reviewedAt = new Date().toISOString();

    saveStoredApplications(apps);

    // If approved, trigger auto-enrollment
    if (newStatus === ApplicationStatus.APPROVED && oldStatus !== ApplicationStatus.APPROVED) {
      notificationService.createNotification({
        recipientRole: 'student',
        title: 'تم اعتماد وقبول طلب تسجيلك',
        message: `تم اعتماد تسجيلك رسمياً في (${app.courseTitle}). يمكنك الآن دخول المساق وتحميل الحقائب.`,
        link: `#/course/${app.courseId}`
      });
    } else if (newStatus === ApplicationStatus.REJECTED) {
      notificationService.createNotification({
        recipientRole: 'student',
        title: 'تحديث بشأن طلب التسجيل',
        message: `نعتذر عن عدم قبول طلب الالتحاق بـ (${app.courseTitle}) لهذه الدفعة. ${adminNotes ? 'السبب: ' + adminNotes : ''}`,
        link: '#/academy'
      });
    }

    await auditService.logAction({
      action: `APPLICATION_${newStatus.toUpperCase()}`,
      entity: 'application',
      entityId: id,
      details: { applicant: app.fullName, course: app.courseTitle, adminNotes }
    });

    return { success: true, application: app };
  }
};

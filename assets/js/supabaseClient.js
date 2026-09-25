// SHAT Company Platform - Supabase Integration Client
// Manages real-time data synchronization with Supabase & offline persistent fallback

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://virecinrnuhpbadrswjj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcmVjaW5ybnVocGJhZHJzd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1ODcxMDIsImV4cCI6MjA5ODE2MzEwMn0.b6uv8_e63j8FY4_1yXM8Qr_5UrSOrhLRBHY77x3vqE8';

export let supabase = null;

try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('[SHAT Platform] Supabase client initialized.');
} catch (e) {
  console.warn('[SHAT Platform] Supabase initialization notice:', e);
}

// Helper: Save to local fallback storage
function saveToLocalStorage(key, item) {
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ ...item, local_saved_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage fallback write error:', err);
  }
}

// 1. Submit Consultation Request
export async function submitConsultation(data) {
  saveToLocalStorage('shat_local_consultations', data);

  if (!supabase) {
    return { success: true, mode: 'local', data };
  }

  try {
    const { error, data: inserted } = await supabase
      .from('consultations')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        organization: data.organization || null,
        service_type: data.serviceType,
        details: data.details || null,
        language: data.language || 'ar'
      }])
      .select();

    if (error) {
      console.warn('[Supabase consultations insert notice]:', error.message);
      return { success: true, mode: 'local_fallback', data };
    }
    return { success: true, mode: 'supabase', data: inserted };
  } catch (err) {
    console.warn('[Supabase consultations network notice]:', err.message);
    return { success: true, mode: 'local_fallback', data };
  }
}

// 2. Submit Academy Course Enrollment
export async function submitAcademyEnrollment(data) {
  saveToLocalStorage('shat_local_academy_enrollments', data);

  if (!supabase) {
    return { success: true, mode: 'local', data };
  }

  try {
    const { error, data: inserted } = await supabase
      .from('academy_enrollments')
      .insert([{
        course_id: data.courseId,
        course_title: data.courseTitle,
        student_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        organization: data.organization || null,
        professional_background: data.background || null
      }])
      .select();

    if (error) {
      console.warn('[Supabase academy_enrollments notice]:', error.message);
      return { success: true, mode: 'local_fallback', data };
    }
    return { success: true, mode: 'supabase', data: inserted };
  } catch (err) {
    console.warn('[Supabase academy_enrollments network notice]:', err.message);
    return { success: true, mode: 'local_fallback', data };
  }
}

// 3. Submit General Contact Inquiry
export async function submitInquiry(data) {
  saveToLocalStorage('shat_local_inquiries', data);

  if (!supabase) {
    return { success: true, mode: 'local', data };
  }

  try {
    const { error, data: inserted } = await supabase
      .from('inquiries')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        subject: data.subject || 'General Inquiry',
        message: data.message
      }])
      .select();

    if (error) {
      console.warn('[Supabase inquiries notice]:', error.message);
      return { success: true, mode: 'local_fallback', data };
    }
    return { success: true, mode: 'supabase', data: inserted };
  } catch (err) {
    console.warn('[Supabase inquiries network notice]:', err.message);
    return { success: true, mode: 'local_fallback', data };
  }
}

// 4. Verify Certificate
export async function verifyCertificate(certificateNumber) {
  const cleanCode = certificateNumber.trim().toUpperCase();

  // Known official sample verifications
  const sampleCertificates = {
    'SHAT-2026-CHS-01': {
      certificate_number: 'SHAT-2026-CHS-01',
      recipient_name: 'أحمد محمد العلي',
      course_name: 'دبلوم المعيار الإنساني الأساسي (CHS) وتصميم التدخلات',
      issue_date: '2026-02-15',
      grade: 'امتياز مع مرتبة الشرف (Distinction)',
      accreditation_details: 'معتمد وفق معايير Core Humanitarian Standard و Sphere Handbook'
    },
    'SHAT-2026-PSEA-02': {
      certificate_number: 'SHAT-2026-PSEA-02',
      recipient_name: 'سارة خالد المحمود',
      course_name: 'البرنامج المتقدم في استشارات الحماية وصون السلامة (PSEA)',
      issue_date: '2026-03-01',
      grade: 'امتياز (Excellence)',
      accreditation_details: 'معتمد وفق أطر الحماية العالمية ومبادئ Do No Harm'
    },
    'SHAT-2026-OECD-03': {
      certificate_number: 'SHAT-2026-OECD-03',
      recipient_name: 'د. عمر بن عبد العزيز',
      course_name: 'خبير التقييم الخارجي المستقل للمشاريع وفق معايير OECD DAC الستة',
      issue_date: '2026-03-10',
      grade: 'امتياز (Excellence)',
      accreditation_details: 'معتمد وفق معايير OECD DAC و UNEG Norms & Standards'
    }
  };

  if (sampleCertificates[cleanCode]) {
    return { found: true, certificate: sampleCertificates[cleanCode] };
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('certificate_verifications')
        .select('*')
        .eq('certificate_number', cleanCode)
        .single();

      if (!error && data) {
        return { found: true, certificate: data };
      }
    } catch (e) {
      console.warn('Certificate query notice:', e);
    }
  }

  return { found: false };
}

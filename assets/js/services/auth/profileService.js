// SHAT Platform — Profile & Identity Service (services/auth/profileService.js)
// Implements Phase 1 Identity Model:
// 1. Username = National ID
// 2. Strict National ID masking (ID-***-XXXX) in all client views
// 3. Field governance: Required, Optional, Editable, Immutable, Admin-only
// 4. Queries public.shat_profiles & public.shat_public_profiles

import { supabase } from '../api/client.js';

export const ProfileFieldGovernance = Object.freeze({
  REQUIRED: ['username', 'full_name_ar', 'full_name_en', 'email', 'phone', 'date_of_birth'],
  OPTIONAL: ['whatsapp_number', 'avatar_url', 'organization', 'job_title', 'specialization'],
  EDITABLE: ['phone', 'whatsapp_number', 'avatar_url', 'organization', 'job_title', 'specialization'],
  IMMUTABLE: ['username', 'national_id_hash', 'date_of_birth'],
  ADMIN_ONLY: ['status', 'role_assignments']
});

export function maskNationalId(nationalId) {
  if (!nationalId) return 'ID-***-****';
  const clean = nationalId.trim();
  if (clean.length <= 4) return 'ID-***-' + clean;
  const lastFour = clean.slice(-4);
  return `ID-***-${lastFour}`;
}

export function validateProfileData(data) {
  const errors = {};
  if (!data.full_name_ar || data.full_name_ar.trim().length < 3) {
    errors.full_name_ar = 'الاسم الكامل بالعربية مطلوب ويجب ألا يقل عن 3 أحرف.';
  }
  if (!data.full_name_en || data.full_name_en.trim().length < 3) {
    errors.full_name_en = 'الاسم الكامل بالإنجليزية مطلوب.';
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'عنوان بريد إلكتروني صحيح مطلوب.';
  }
  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = 'رقم الهاتف مطلوب للتواصل الأكاديمي.';
  }
  if (!data.date_of_birth) {
    errors.date_of_birth = 'تاريخ الميلاد مطلوب للتحقق من الأهلية المهنية.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export const validateProfileFields = validateProfileData;

class ProfileService {
  hashNationalId(rawNationalId) {
    if (!rawNationalId) return null;
    // Client-side deterministic non-reversible representation for uniqueness lookup
    let hash = 0;
    const str = 'shat_salt_2026_' + rawNationalId.trim();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'nid_hash_' + Math.abs(hash).toString(16).padStart(8, '0');
  }

  filterEditableFields(updatePayload, isAdmin = false) {
    const safePayload = {};
    const allowedFields = isAdmin
      ? [...ProfileFieldGovernance.EDITABLE, ...ProfileFieldGovernance.ADMIN_ONLY]
      : ProfileFieldGovernance.EDITABLE;

    for (const key of allowedFields) {
      if (key in updatePayload) {
        safePayload[key] = updatePayload[key];
      }
    }
    return safePayload;
  }

  async getProfile(userId) {
    if (!userId) return null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('shat_profiles')
          .select('*')
          .eq('auth_user_id', userId)
          .single();

        if (!error && data) {
          return {
            ...data,
            masked_national_id: maskNationalId(data.username)
          };
        }
      } catch (e) {
        // Table not found in remote cache (404 PGRST205)
      }
    }

    return null;
  }

  async getPublicProfile(profileId) {
    if (!profileId) return null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('shat_public_profiles')
          .select('*')
          .eq('id', profileId)
          .single();

        if (!error && data) return data;
      } catch (e) {
        // Fallback
      }
    }
    return null;
  }

  async updateEditableProfile(profileId, updateFields, isAdmin = false) {
    const safePayload = this.filterEditableFields(updateFields, isAdmin);

    if (Object.keys(safePayload).length === 0) {
      return { success: false, message: 'لا توجد حقول قابلة للتعديل في هذا الطلب.' };
    }

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('shat_profiles')
          .update(safePayload)
          .eq('id', profileId)
          .select();

        if (error) {
          return { success: false, message: error.message };
        }
        return { success: true, data };
      } catch (e) {
        return { success: false, message: e.message };
      }
    }

    return { success: false, message: 'قاعدة البيانات غير مهيأة بعد للتعديل المباشر.' };
  }
}

export const profileService = new ProfileService();

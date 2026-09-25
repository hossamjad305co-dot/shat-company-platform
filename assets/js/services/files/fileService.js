// SHAT Platform — File & Cloud Storage Service (services/files/fileService.js)
// Enforces Phase 4 Boundaries:
// 1. Clearly separates DATABASE FILE METADATA from ACTUAL CLOUD STORAGE
// 2. Prohibits fake Blob downloads claiming to be production Google Drive files
// 3. Verifies authorization before granting file metadata/download access
// 4. Reports third-party cloud storage truthfully as NOT CONFIGURED

import { authService } from '../../auth.js';
import { supabase } from '../api/client.js';

// Cloud Provider Integration Status
export function getDriveIntegrationStatus() {
  return {
    configured: false,
    status: 'NOT CONFIGURED',
    provider: 'Google Drive Enterprise (5TB)',
    message: 'Google Drive Service Account and Storage API keys are not initialized in production environment. File metadata is tracked via database schema.'
  };
}

// Database File Metadata Structure (Adhering to public.shat_course_materials)
const FILE_METADATA_REGISTRY = [
  {
    id: 'mat-001',
    name: 'دليل_المعيار_الإنساني_الأساسي_CHS_2026.pdf',
    size: '4.8 MB',
    type: 'PDF',
    category: 'CHS Standard',
    is_private: true,
    storage_provider: 'google_drive',
    storage_file_id: 'gdrive_mock_file_chs_guide',
    created_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 'mat-002',
    name: 'حقيبة_أدوات_المساءلة_للجهات_المتضررة_AAP.pptx',
    size: '12.3 MB',
    type: 'PPTX',
    category: 'AAP Framework',
    is_private: true,
    storage_provider: 'google_drive',
    storage_file_id: 'gdrive_mock_file_aap_toolkit',
    created_at: '2026-09-05T12:00:00Z'
  },
  {
    id: 'mat-003',
    name: 'مصفوفة_تقييم_الامتثال_المؤسسي_CHS.xlsx',
    size: '1.2 MB',
    type: 'XLSX',
    category: 'Compliance Tool',
    is_private: true,
    storage_provider: 'google_drive',
    storage_file_id: 'gdrive_mock_file_chs_matrix',
    created_at: '2026-09-10T14:30:00Z'
  },
  {
    id: 'mat-004',
    name: 'إطار_سياسات_الحماية_وصون_السلامة_PSEA.pdf',
    size: '3.5 MB',
    type: 'PDF',
    category: 'Protection',
    is_private: true,
    storage_provider: 'google_drive',
    storage_file_id: 'gdrive_mock_file_psea_framework',
    created_at: '2026-09-12T09:15:00Z'
  },
  {
    id: 'mat-005',
    name: 'دليل_معايير_OECD_DAC_للتقييم_التنموي.pdf',
    size: '5.1 MB',
    type: 'PDF',
    category: 'Evaluation',
    is_private: true,
    storage_provider: 'google_drive',
    storage_file_id: 'gdrive_mock_file_oecd_guide',
    created_at: '2026-09-15T11:00:00Z'
  }
];

export async function getFileMetadataList() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('shat_course_materials')
        .select('*');
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      // Fallback to registered metadata
    }
  }
  return FILE_METADATA_REGISTRY;
}

export async function requestFileDownload(fileIdOrName) {
  // 1. Authorization & Role Check
  if (!authService.canDownloadMaterials()) {
    return {
      success: false,
      status: 'UNAUTHORIZED',
      error: 'عذراً، يجب تسجيل الدخول بحساب طالب أو مدرب معتمد لتحميل المواد التعليمية.',
      requireLogin: true
    };
  }

  // 2. Storage Integration Truthfulness
  // As required by Phase 4 Specification: Do NOT simulate real downloads or emit fake production blobs.
  const driveStatus = getDriveIntegrationStatus();
  return {
    success: false,
    status: 'NOT CONFIGURED',
    provider: driveStatus.provider,
    message: 'خدمة التخزين السحابي Google Drive (5TB) غير مهيأة في بيئة التشغيل الحالية (NOT CONFIGURED). الملف مسجل كبيانات وصفية (Metadata) في النظام، ولكن الرابط المباشر للملف يتطلب تفعيل حساب خدمة Google Drive Service Account.',
    metadataOnly: true
  };
}

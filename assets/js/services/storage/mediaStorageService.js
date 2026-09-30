// assets/js/services/storage/mediaStorageService.js
// High-Performance Device File Storage & Image Optimization Engine for SHAT Platform

const MEDIA_STORAGE_KEY = 'shat_platform_media_library';
const BACKUP_PREFIX = 'shat_backup_';

export class MediaStorageService {
  /**
   * Read any local file from the device as Base64 Data URL
   * @param {File} file 
   * @returns {Promise<string>}
   */
  static readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('No file selected'));
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Compress image on device using HTML5 Canvas to optimize storage and speed
   * @param {File} file 
   * @param {number} maxWidth 
   * @param {number} maxHeight 
   * @param {number} quality 0.1 - 1.0
   * @returns {Promise<string>} compressed Base64 Data URL
   */
  static compressImage(file, maxWidth = 1200, maxHeight = 800, quality = 0.82) {
    return new Promise((resolve, reject) => {
      // If not an image (e.g. PDF/DOCX), just read as Data URL
      if (!file.type.startsWith('image/')) {
        return this.readFileAsDataUrl(file).then(resolve).catch(reject);
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;

          // Scale dimensions while maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Export as compressed WebP or JPEG
          const outputType = file.type === 'image/png' && quality >= 0.9 ? 'image/png' : 'image/jpeg';
          const compressedDataUrl = canvas.toDataURL(outputType, quality);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Get all media items stored on the user's device
   */
  static getMediaItems() {
    try {
      const data = localStorage.getItem(MEDIA_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse media library from storage:', e);
    }

    // Default authoritative branding assets
    const defaults = [
      {
        id: 'media-default-01',
        name: 'logo-banner.jpg',
        title: 'بانر منصة شات الرسمي • Cover Banner',
        dataUrl: 'assets/logo/logo-banner.jpg',
        sizeFormatted: '124 KB',
        type: 'image/jpeg',
        createdAt: '2026-01-01T00:00:00Z',
        isDefault: true
      },
      {
        id: 'media-default-02',
        name: 'logo-symbol.jpg',
        title: 'شعار شات الرمزي المعتمد • Brand Symbol',
        dataUrl: 'assets/logo/logo-symbol.jpg',
        sizeFormatted: '48 KB',
        type: 'image/jpeg',
        createdAt: '2026-01-01T00:00:00Z',
        isDefault: true
      },
      {
        id: 'media-default-03',
        name: 'logo-transparent.png',
        title: 'شعار شات المفرغ عالي الدقة • Transparent Emblem',
        dataUrl: 'assets/logo/logo-transparent.png',
        sizeFormatted: '85 KB',
        type: 'image/png',
        createdAt: '2026-01-01T00:00:00Z',
        isDefault: true
      }
    ];

    this.saveAllMediaItems(defaults);
    return defaults;
  }

  /**
   * Save a single media item to device storage
   */
  static saveMediaItem(name, dataUrl, type = 'image/jpeg', fileSize = null) {
    const items = this.getMediaItems();
    const sizeInBytes = fileSize || Math.round((dataUrl.length * 3) / 4);
    const sizeFormatted = sizeInBytes > 1048576 
      ? (sizeInBytes / 1048576).toFixed(1) + ' MB' 
      : Math.round(sizeInBytes / 1024) + ' KB';

    const newItem = {
      id: `media-${Date.now()}`,
      name: name || `upload-${Date.now()}.jpg`,
      title: name || 'صورة مرفوعة من الجهاز',
      dataUrl,
      sizeFormatted,
      type,
      createdAt: new Date().toISOString(),
      isDefault: false
    };

    items.unshift(newItem);
    this.saveAllMediaItems(items);
    return newItem;
  }

  /**
   * Delete a media item from device storage
   */
  static deleteMediaItem(id) {
    const items = this.getMediaItems().filter(item => item.id !== id);
    this.saveAllMediaItems(items);
    return true;
  }

  static saveAllMediaItems(items) {
    try {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Storage quota exceeded for media, trimming oldest items:', e);
      // If quota exceeded, keep only latest 20 items
      if (items.length > 20) {
        const trimmed = items.slice(0, 20);
        try {
          localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(trimmed));
        } catch (e2) {}
      }
    }
  }

  /**
   * Export all platform state (Posts, Courses, Applications, Submissions, Media)
   * into a downloadable JSON file on the user's computer
   */
  static exportFullBackup() {
    const backup = {
      metadata: {
        platform: 'SHAT Development & Growth Platform',
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      },
      posts: JSON.parse(localStorage.getItem('shat_platform_posts') || '[]'),
      courses: JSON.parse(localStorage.getItem('shat_platform_courses') || '[]'),
      applications: JSON.parse(localStorage.getItem('shat_platform_applications') || '[]'),
      inquiries: JSON.parse(localStorage.getItem('shat_platform_inquiries') || '[]'),
      submissions: JSON.parse(localStorage.getItem('shat_platform_submissions') || '[]'),
      media: JSON.parse(localStorage.getItem(MEDIA_STORAGE_KEY) || '[]')
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shat_platform_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  }

  /**
   * Import and restore backup from a device JSON file
   */
  static importFullBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        throw new Error('الملف غير صالح');
      }

      if (data.posts && Array.isArray(data.posts)) {
        localStorage.setItem('shat_platform_posts', JSON.stringify(data.posts));
      }
      if (data.courses && Array.isArray(data.courses)) {
        localStorage.setItem('shat_platform_courses', JSON.stringify(data.courses));
      }
      if (data.applications && Array.isArray(data.applications)) {
        localStorage.setItem('shat_platform_applications', JSON.stringify(data.applications));
      }
      if (data.inquiries && Array.isArray(data.inquiries)) {
        localStorage.setItem('shat_platform_inquiries', JSON.stringify(data.inquiries));
      }
      if (data.submissions && Array.isArray(data.submissions)) {
        localStorage.setItem('shat_platform_submissions', JSON.stringify(data.submissions));
      }
      if (data.media && Array.isArray(data.media)) {
        localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(data.media));
      }

      return { success: true };
    } catch (err) {
      throw new Error('فشل استيراد النسخة الاحتياطية: ' + err.message);
    }
  }
}

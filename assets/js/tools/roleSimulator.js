// assets/js/tools/roleSimulator.js
// Production Executive Role Simulator Engine
// Enables immediate preview & switching across:
// 1. Visitor (زائر عام)
// 2. Student / Trainee (متدرب معتمد)
// 3. Instructor / Trainer (مدرب ومحاضر معتمد)
// 4. Executive Admin (مدير النظام)

import { api } from '../services/api/apiClient.js';
import { showToast } from '../components/toast.js';
import { icons } from '../icons.js';

export const roleSimulator = {
  roles: [
    {
      id: 'visitor',
      labelAr: 'زائر استكشافي',
      labelEn: 'Public Visitor',
      iconFn: () => icons.compass('sim-icon', 13),
      route: '#/home',
      badgeColor: '#64748B'
    },
    {
      id: 'student',
      labelAr: 'متدرب معتمد',
      labelEn: 'Student Trainee',
      iconFn: () => icons.academy('sim-icon', 13),
      route: '#/student',
      badgeColor: '#2563EB',
      user: {
        id: 'student-01',
        role: 'student',
        username: 'student.ahmed',
        fullNameAr: 'أحمد خليل منصور',
        fullNameEn: 'Ahmed Khalil Mansoor',
        email: 'ahmed.khalil@shat-company.ps',
        maskedNationalId: 'SHAT-TR-2026-904',
        token: 'sim_student_' + Date.now()
      }
    },
    {
      id: 'teacher',
      labelAr: 'خبير مدرب',
      labelEn: 'Master Trainer',
      iconFn: () => icons.award('sim-icon', 13),
      route: '#/teacher',
      badgeColor: '#166534',
      user: {
        id: 'teacher-01',
        role: 'teacher',
        username: 'osama',
        fullNameAr: 'د. أسامة المنصور',
        fullNameEn: 'Dr. Osama Al-Mansoor',
        email: 'dr.osama@shat-company.ps',
        assignedCourses: ['shat-chs-master', 'shat-psea-expert'],
        token: 'sim_teacher_' + Date.now()
      }
    },
    {
      id: 'admin',
      labelAr: 'المدير التنفيذي',
      labelEn: 'Executive Admin',
      iconFn: () => icons.shield('sim-icon', 13),
      route: '#/admin',
      badgeColor: '#0F2E4A',
      user: {
        id: 'admin-01',
        role: 'admin',
        username: 'admin',
        fullNameAr: 'أ. حسام جاد الله',
        fullNameEn: 'Hossam Jadallah',
        email: 'management@shat-company.ps',
        token: 'sim_admin_' + Date.now()
      }
    }
  ],

  renderBar(lang = 'ar') {
    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));
    const currentUser = api.currentUser;
    const currentRole = currentUser ? currentUser.role : 'visitor';

    return `
      <div class="role-simulator-bar" id="role-simulator-bar" style="background: #061523; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 5px 0; font-size: 0.78rem; position: relative; z-index: 1050;">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="live-pulse-dot" style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981;"></span>
            <span style="font-weight: 700; color: #E2E8F0;">
              ${txt('محاكي الصلاحيات التفاعلي:', 'Interactive Role Simulator:', 'Simulateur de Rôles :')}
            </span>
            <span class="sim-bar-hint" style="color: #94A3B8; font-size: 0.74rem;">
              (${txt('اختر الدور للمعاينة الفورية لكافة البوابات', 'Select role to instantly preview all portals', 'Aperçu instantané des portails')})
            </span>
          </div>

          <!-- Role Selector Buttons -->
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;" id="simulator-role-buttons">
            ${this.roles.map(r => {
              const isActive = (r.id === 'teacher' && currentRole === 'teacher') ||
                               (r.id === 'instructor' && currentRole === 'teacher') ||
                               (r.id === currentRole);
              return `
                <button type="button" class="btn-clean sim-role-btn ${isActive ? 'active' : ''}" data-role-id="${r.id}" style="display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; border: 1px solid ${isActive ? '#10B981' : 'rgba(255,255,255,0.18)'}; background: ${isActive ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}; color: ${isActive ? '#6EE7B7' : '#E2E8F0'}; transition: all 0.15s ease;">
                  <span style="display: inline-flex; align-items: center;">${r.iconFn()}</span>
                  <span>${isRtl ? r.labelAr : r.labelEn}</span>
                  ${isActive ? '<span style="font-size: 0.65rem; color: #10B981;">●</span>' : ''}
                </button>
              `;
            }).join('')}
            
            <button type="button" id="btn-open-site-customizer-bar" class="btn-clean" style="display: inline-flex; align-items: center; gap: 5px; padding: 4px 11px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; border: 1px solid rgba(251,191,36,0.6); background: rgba(251,191,36,0.18); color: #FCD34D; cursor: pointer; transition: all 0.15s ease;" title="${txt('تخصيص كامل لكافة نصوص وروابط وأقسام واستمارات المنصة', 'Customize all copy, links, sections & forms', 'Personnaliser la plateforme')}">
              <span style="display: inline-flex; align-items: center;">${icons.settings('sim-icon', 13)}</span>
              <span>${txt('تخصيص المنصة', 'Customizer', 'Personnaliser')}</span>
            </button>
          </div>

        </div>
      </div>
    `;
  },

  bindEvents(lang = 'ar') {
    const container = document.getElementById('simulator-role-buttons');
    if (!container) return;

    const isRtl = lang === 'ar';
    const txt = (ar, en, fr) => (lang === 'fr' ? fr || en : (lang === 'en' ? en : ar));

    const customizerBarBtn = document.getElementById('btn-open-site-customizer-bar');
    if (customizerBarBtn) {
      customizerBarBtn.onclick = () => {
        if (window.openSiteCustomizer) {
          window.openSiteCustomizer(lang);
        } else {
          showToast('أداة تخصيص المنصة قيد التحميل...', 'info');
        }
      };
    }

    container.querySelectorAll('.sim-role-btn').forEach(btn => {
      btn.onclick = async () => {
        const roleId = btn.getAttribute('data-role-id');
        const roleObj = this.roles.find(r => r.id === roleId);
        if (!roleObj) return;

        if (roleId === 'visitor') {
          await api.logout();
          showToast(txt('تم تفعيل وضع الزائر العام', 'Switched to Public Visitor view', 'Mode Visiteur Public activé'), 'info');
          window.location.hash = '#/home';
        } else {
          // Store simulated identity
          localStorage.setItem('shat_current_user', JSON.stringify(roleObj.user));
          // Update apiClient cached user
          api.currentUser = roleObj.user;

          showToast(
            txt(`تم التبديل الفوري لدور: ${roleObj.labelAr}`, `Switched instantly to: ${roleObj.labelEn}`, `Basculé en mode : ${roleObj.labelEn}`),
            'success'
          );

          window.location.hash = roleObj.route;
        }

        // Trigger platform re-render
        window.dispatchEvent(new CustomEvent('shat:auth-updated'));
      };
    });
  }
};

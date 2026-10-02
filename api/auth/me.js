// api/auth/me.js
// Vercel Serverless Function for Session Verification

const USERS = [
  {
    id: 'admin-01',
    username: 'admin',
    email: 'admin@shat.com',
    fullNameAr: 'أ. حسام جاد الله',
    fullNameEn: 'Hossam Jadallah',
    role: 'admin',
    roleTitle: 'المدير العام والمسؤول التنفيذي (Super Admin)',
    phone: '+972 59 287 9621',
    maskedNationalId: 'ID-***-9621'
  },
  {
    id: 'teacher-01',
    username: 'osama',
    email: 'osama@shat.com',
    fullNameAr: 'د. أسامة المنصور',
    fullNameEn: 'Dr. Osama Al-Mansoor',
    role: 'teacher',
    roleTitle: 'مدرب ومحاضر معتمد (Master Trainer)',
    phone: '+972 59 912 3456',
    maskedNationalId: 'ID-***-3456',
    assignedCourses: ['shat-chs-master', 'shat-psea-expert']
  },
  {
    id: 'student-01',
    username: '1098765432',
    email: 'ahmed@shat.com',
    fullNameAr: 'أحمد خليل',
    fullNameEn: 'Ahmed Khalil',
    role: 'student',
    roleTitle: 'متدرب معتمد (Student)',
    phone: '+972 59 812 3456',
    maskedNationalId: 'ID-***-5432'
  },
  {
    id: 'content-01',
    username: 'content',
    email: 'content@shat.com',
    fullNameAr: 'سارة عبد الله',
    fullNameEn: 'Sara Abdullah',
    role: 'admin',
    roleTitle: 'مسؤول المحتوى والنشر (Content Editor)',
    phone: '+972 59 612 3456',
    maskedNationalId: 'ID-***-6125'
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token || token === 'null' || token === 'undefined') {
    return res.status(200).json({
      authenticated: false,
      user: null
    });
  }

  // Check for simulated or generated JWT token
  const match = token.match(/^shat_jwt_([a-z]+)/);
  if (match) {
    const role = match[1];
    const user = USERS.find(u => u.role === role) || USERS[0];
    return res.status(200).json({
      authenticated: true,
      user
    });
  }

  // Simulated session token support
  if (token === 'simulated_session_token') {
    return res.status(200).json({
      authenticated: true,
      user: USERS[0]
    });
  }

  return res.status(200).json({
    authenticated: false,
    user: null
  });
}

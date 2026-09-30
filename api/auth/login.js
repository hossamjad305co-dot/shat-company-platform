// api/auth/login.js
// Vercel Serverless Function for SHAT Platform Authentication

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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { usernameOrEmail, password } = req.body || {};

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'يرجى إدخال اسم المستخدم وكلمة المرور' });
  }

  const clean = usernameOrEmail.trim().toLowerCase();
  const user = USERS.find(u => 
    u.username.toLowerCase() === clean || 
    u.email.toLowerCase() === clean ||
    (clean === 'teacher' && u.username === 'osama') ||
    (clean === 'student' && u.username === '1098765432') ||
    (clean === 'employee' && u.username === 'content')
  );

  if (!user) {
    return res.status(401).json({ error: 'اسم المستخدم أو البريد الإلكتروني غير مسجل في المنظومة' });
  }

  if (password !== 'password123' && password !== 'admin123') {
    return res.status(401).json({ error: 'كلمة المرور غير صحيحة. يرجى التحقق والمحاولة مجدداً.' });
  }

  const token = `shat_jwt_${user.role}_${Date.now()}`;
  return res.status(200).json({
    success: true,
    token,
    user,
    message: 'تم تسجيل الدخول بنجاح إلى منصة شركة شات للتنمية والتطوير'
  });
}

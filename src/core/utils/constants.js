// API Endpoints
export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  STUDENTS: {
    LIST: '/students',
    DETAIL: (id) => `/students/${id}`,
    CREATE: '/students',
    UPDATE: (id) => `/students/${id}`,
    DELETE: (id) => `/students/${id}`,
    SEARCH: '/students/search',
    ATTENDANCE: (id) => `/students/${id}/attendance`,
    PERFORMANCE: (id) => `/students/${id}/performance`,
  },
  ATTENDANCE: {
    LIST: '/attendance',
    MARK: '/attendance/mark',
    UPDATE: (id) => `/attendance/${id}`,
    STATS: '/attendance/stats',
  },
  PAYMENTS: {
    LIST: '/payments',
    CREATE_ORDER: '/payments/order',
    VERIFY: '/payments/verify',
    RECEIPT: (id) => `/payments/${id}/receipt`,
    HISTORY: (studentId) => `/payments/student/${studentId}`,
  },
  VEHICLES: {
    LIST: '/vehicles',
    ASSIGN: '/vehicles/assign',
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/summary',
    REVENUE: '/analytics/revenue',
    ATTENDANCE: '/analytics/attendance',
    PERFORMANCE: '/analytics/performance',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id) => `/notifications/${id}/read`,
  },
};

// User Roles
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT',
};

// Vehicle Types
export const VEHICLE_TYPES = {
  LMV: { label: 'Light Motor Vehicle', code: 'LMV' },
  HMV: { label: 'Heavy Motor Vehicle', code: 'HMV' },
  TRACTOR: { label: 'Tractor', code: 'TRACTOR' },
  BUS: { label: 'Bus', code: 'BUS' },
  TRUCK: { label: 'Truck', code: 'TRUCK' },
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
};

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  CANCELLED: 'CANCELLED',
};

// Course Modules
export const COURSE_MODULES = [
  { id: 'basics', name: 'Driving Basics', duration: '2 weeks' },
  { id: 'traffic', name: 'Traffic Rules', duration: '1 week' },
  { id: 'parking', name: 'Parking & Maneuvering', duration: '1 week' },
  { id: 'highway', name: 'Highway Driving', duration: '2 weeks' },
  { id: 'night', name: 'Night Driving', duration: '1 week' },
  { id: 'emergency', name: 'Emergency Handling', duration: '1 week' },
];

// Time ranges for analytics
export const TIME_RANGES = {
  WEEK: { label: 'This Week', value: '7d', days: 7 },
  MONTH: { label: 'This Month', value: '30d', days: 30 },
  QUARTER: { label: 'This Quarter', value: '90d', days: 90 },
  YEAR: { label: 'This Year', value: '365d', days: 365 },
};

// Form validation patterns
export const PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{4,6}$/i,
  PINCODE: /^[1-9][0-9]{5}$/,
  LICENSE: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4,6}$/,
};

// WhatsApp configuration
export const WHATSAPP = {
  NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || '919443822462',
  MESSAGE: encodeURIComponent('Hi, I\'m interested in joining Dhanalakshmi Heavy Driving School. Can you help me?'),
  URL: (number, message) => `https://wa.me/${number}?text=${message}`,
};

// Razorpay configuration
export const RAZORPAY = {
  KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID,
  CURRENCY: 'INR',
  WEBHOOK_SECRET: import.meta.env.VITE_RAZORPAY_WEBHOOK_SECRET,
};

// App configuration
export const APP = {
  NAME: 'Dhanalakshmi Heavy Driving School',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@dhanalakshmidrivingschool.com',
  SUPPORT_PHONE: '+91 9443822462',
};
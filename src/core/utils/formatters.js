// Format currency in INR
export const formatCurrency = (amount, showSymbol = true) => {
  if (amount === null || amount === undefined) return '-';
  
  const formatted = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
  
  return showSymbol ? formatted : formatted.replace('₹', '').trim();
};

// Format date
export const formatDate = (date, options = {}) => {
  if (!date) return '-';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
};

// Format date with time
export const formatDateTime = (date) => {
  if (!date) return '-';
  
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format phone number
export const formatPhone = (phone) => {
  if (!phone) return '-';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Indian numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};

// Format percentage
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';
  return `${parseFloat(value).toFixed(decimals)}%`;
};

// Format duration (hours)
export const formatDuration = (hours) => {
  if (!hours) return '0 hrs';
  
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hrs`;
  return `${h}h ${m}m`;
};

// Format name (capitalize)
export const formatName = (name) => {
  if (!name) return '-';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Format status with badge style
export const formatStatus = (status) => {
  const styles = {
    // Payment
    PENDING: { label: 'Pending', variant: 'warning' },
    SUCCESS: { label: 'Paid', variant: 'success' },
    FAILED: { label: 'Failed', variant: 'danger' },
    REFUNDED: { label: 'Refunded', variant: 'info' },
    
    // Attendance
    PRESENT: { label: 'Present', variant: 'success' },
    ABSENT: { label: 'Absent', variant: 'danger' },
    LATE: { label: 'Late', variant: 'warning' },
    CANCELLED: { label: 'Cancelled', variant: 'muted' },
    
    // Student
    ACTIVE: { label: 'Active', variant: 'success' },
    INACTIVE: { label: 'Inactive', variant: 'muted' },
    COMPLETED: { label: 'Completed', variant: 'success' },
    IN_PROGRESS: { label: 'In Progress', variant: 'info' },
  };
  
  return styles[status] || { label: status, variant: 'muted' };
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export default {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatPhone,
  formatPercent,
  formatDuration,
  formatName,
  formatStatus,
  truncateText,
  getInitials,
};
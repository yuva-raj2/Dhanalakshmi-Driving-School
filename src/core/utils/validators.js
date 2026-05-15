import { PATTERNS } from './constants';

// Validate email
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!PATTERNS.EMAIL.test(email)) return 'Invalid email address';
  return null;
};

// Validate password
export const validatePassword = (password, minLength = 6) => {
  if (!password) return 'Password is required';
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  if (!/[A-Z]/.test(password)) return 'Password must contain uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain number';
  return null;
};

// Validate phone (Indian format)
export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  const cleaned = phone.replace(/\D/g, '');
  if (!/^[6-9][0-9]{9}$/.test(cleaned)) return 'Invalid Indian phone number';
  return null;
};

// Validate name
export const validateName = (name, field = 'Name') => {
  if (!name?.trim()) return `${field} is required`;
  if (name.trim().length < 2) return `${field} must be at least 2 characters`;
  if (name.trim().length > 100) return `${field} must be less than 100 characters`;
  return null;
};

// Validate required field
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value && value !== 0 && value !== false) return `${fieldName} is required`;
  return null;
};

// Validate number range
export const validateRange = (value, min, max, fieldName = 'Value') => {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  if (isNaN(num)) return `${fieldName} must be a number`;
  if (num < min) return `${fieldName} must be at least ${min}`;
  if (num > max) return `${fieldName} must be at most ${max}`;
  return null;
};

// Validate date is not in future
export const validateDateNotFuture = (date, fieldName = 'Date') => {
  if (!date) return null;
  if (new Date(date) > new Date()) return `${fieldName} cannot be in the future`;
  return null;
};

// Validate file type
export const validateFileType = (file, allowedTypes, fieldName = 'File') => {
  if (!file) return null;
  if (!allowedTypes.includes(file.type)) {
    return `${fieldName} must be one of: ${allowedTypes.join(', ')}`;
  }
  return null;
};

// Validate file size
export const validateFileSize = (file, maxSizeMB, fieldName = 'File') => {
  if (!file) return null;
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxSizeMB) {
    return `${fieldName} must be less than ${maxSizeMB}MB`;
  }
  return null;
};

// Validate Indian PIN code
export const validatePincode = (pincode) => {
  if (!pincode) return 'PIN code is required';
  if (!PATTERNS.PINCODE.test(pincode)) return 'Invalid PIN code format';
  return null;
};

// Validate Indian license number
export const validateLicense = (license) => {
  if (!license) return 'License number is required';
  if (!PATTERNS.LICENSE.test(license)) return 'Invalid license format';
  return null;
};

// Compose multiple validators
export const composeValidators = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateRequired,
  validateRange,
  validateDateNotFuture,
  validateFileType,
  validateFileSize,
  validatePincode,
  validateLicense,
  composeValidators,
};
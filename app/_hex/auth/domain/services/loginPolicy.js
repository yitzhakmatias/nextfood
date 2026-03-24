import { isValidEmail, normalizeEmail } from '@/app/_hex/auth/domain/value-objects/email';

export const MIN_PASSWORD_LENGTH = 8;

export function validateLoginInput(input) {
  const email = normalizeEmail(input?.email);
  const password = String(input?.password ?? '');
  const fieldErrors = {};

  if (!email) {
    fieldErrors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    fieldErrors.password = 'Password is required.';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    fieldErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    sanitizedInput: { email, password },
    fieldErrors,
  };
}

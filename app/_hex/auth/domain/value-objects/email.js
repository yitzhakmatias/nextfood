const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(normalizeEmail(value));
}

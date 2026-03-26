import { isValidEmail, normalizeEmail } from '@/app/_hex/auth/domain/value-objects/email';
import type { LoginPayload } from '@/app/_hex/auth/application/ports/authRepository';

export const MIN_PASSWORD_LENGTH = 8;

export type LoginFieldErrors = Partial<Record<keyof LoginPayload, string>>;

type LoginValidationResult = {
  isValid: boolean;
  sanitizedInput: LoginPayload;
  fieldErrors: LoginFieldErrors;
};

export function validateLoginInput(input?: Partial<LoginPayload> | null): LoginValidationResult {
  const email = normalizeEmail(input?.email);
  const password = String(input?.password ?? '');
  const fieldErrors: LoginFieldErrors = {};

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

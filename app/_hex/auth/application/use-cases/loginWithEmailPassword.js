import { AUTH_ERROR_CODES, createAuthError } from '@/app/_hex/auth/domain/errors/authErrors';
import { validateLoginInput } from '@/app/_hex/auth/domain/services/loginPolicy';

export async function loginWithEmailPassword(input, authRepository) {
  const validation = validateLoginInput(input);

  if (!validation.isValid) {
    return {
      ok: false,
      error: createAuthError(
        AUTH_ERROR_CODES.VALIDATION_ERROR,
        'Please fix the highlighted fields.',
        { fieldErrors: validation.fieldErrors }
      ),
    };
  }

  const response = await authRepository.loginWithEmailPassword(validation.sanitizedInput);

  if (!response.ok) {
    return {
      ok: false,
      error: createAuthError(response.error.code, response.error.message),
    };
  }

  return {
    ok: true,
    data: {
      user: response.user,
    },
  };
}

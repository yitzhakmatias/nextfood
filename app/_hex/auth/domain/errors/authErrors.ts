export const AUTH_ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export function createAuthError<TMeta extends Record<string, unknown>>(
  code: AuthErrorCode,
  message: string,
  meta?: TMeta
) {
  return {
    code,
    message,
    ...(meta || ({} as TMeta)),
  };
}

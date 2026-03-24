export const AUTH_ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export function createAuthError(code, message, meta = {}) {
  return {
    code,
    message,
    ...meta,
  };
}

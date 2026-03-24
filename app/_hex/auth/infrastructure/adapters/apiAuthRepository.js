import { AUTH_ERROR_CODES } from '@/app/_hex/auth/domain/errors/authErrors';

export function createApiAuthRepository(options = {}) {
  const baseUrl = options.baseUrl || process.env.NEXT_PUBLIC_AUTH_BASE_URL || '';

  return {
    async loginWithEmailPassword(payload) {
      if (!baseUrl) {
        return {
          ok: false,
          error: {
            code: AUTH_ERROR_CODES.NETWORK_ERROR,
            message: 'Auth API base URL is not configured.',
          },
        };
      }

      try {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
          return {
            ok: false,
            error: {
              code: body?.code || AUTH_ERROR_CODES.INVALID_CREDENTIALS,
              message: body?.message || 'Login failed. Please try again.',
            },
          };
        }

        return {
          ok: true,
          user: {
            id: body?.user?.id || '',
            email: body?.user?.email || payload.email,
            name: body?.user?.name || 'User',
          },
        };
      } catch {
        return {
          ok: false,
          error: {
            code: AUTH_ERROR_CODES.NETWORK_ERROR,
            message: 'Unable to reach the authentication service.',
          },
        };
      }
    },
  };
}

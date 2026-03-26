import { AUTH_ERROR_CODES } from '@/app/_hex/auth/domain/errors/authErrors';
import type { AuthErrorCode } from '@/app/_hex/auth/domain/errors/authErrors';
import type { AuthRepository, AuthUser, LoginPayload } from '@/app/_hex/auth/application/ports/authRepository';

type ApiAuthRepositoryOptions = {
  baseUrl?: string;
};

type ApiLoginResponseBody = {
  code?: string;
  message?: string;
  user?: Partial<AuthUser>;
};

function toAuthErrorCode(value: string | undefined): AuthErrorCode {
  if (value && Object.values(AUTH_ERROR_CODES).includes(value as AuthErrorCode)) {
    return value as AuthErrorCode;
  }

  return AUTH_ERROR_CODES.INVALID_CREDENTIALS;
}

export function createApiAuthRepository(options: ApiAuthRepositoryOptions = {}): AuthRepository {
  const baseUrl = options.baseUrl || process.env.NEXT_PUBLIC_AUTH_BASE_URL || '';

  return {
    async loginWithEmailPassword(payload: LoginPayload) {
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

        const body = (await response.json().catch(() => ({}))) as ApiLoginResponseBody;

        if (!response.ok) {
          return {
            ok: false,
            error: {
              code: toAuthErrorCode(body?.code),
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

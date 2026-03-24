import { AUTH_ERROR_CODES } from '@/app/_hex/auth/domain/errors/authErrors';

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function createMockAuthRepository() {
  return {
    async loginWithEmailPassword(payload) {
      await sleep(700);

      const validEmail = payload.email === 'demo@example.com';
      const validPassword = payload.password === 'password123';

      if (!validEmail || !validPassword) {
        return {
          ok: false,
          error: {
            code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
            message: 'Invalid email or password.',
          },
        };
      }

      return {
        ok: true,
        user: {
          id: 'u_demo_001',
          email: payload.email,
          name: 'Demo User',
        },
      };
    },
  };
}

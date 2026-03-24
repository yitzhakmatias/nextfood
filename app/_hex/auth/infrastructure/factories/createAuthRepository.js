import { createApiAuthRepository } from '@/app/_hex/auth/infrastructure/adapters/apiAuthRepository';
import { createMockAuthRepository } from '@/app/_hex/auth/infrastructure/adapters/mockAuthRepository';

export function createAuthRepository() {
  const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'mock';

  if (provider === 'api') {
    return createApiAuthRepository();
  }

  return createMockAuthRepository();
}

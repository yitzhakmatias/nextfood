import { createApiAuthRepository } from '@/app/_hex/auth/infrastructure/adapters/apiAuthRepository';
import { createMockAuthRepository } from '@/app/_hex/auth/infrastructure/adapters/mockAuthRepository';
import type { AuthRepository } from '@/app/_hex/auth/application/ports/authRepository';

export function createAuthRepository(): AuthRepository {
  const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'mock';

  if (provider === 'api') {
    return createApiAuthRepository();
  }

  return createMockAuthRepository();
}

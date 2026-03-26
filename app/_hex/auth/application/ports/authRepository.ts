import type { AuthErrorCode } from '@/app/_hex/auth/domain/errors/authErrors';

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginSuccess = {
  ok: true;
  user: AuthUser;
};

export type LoginFailure = {
  ok: false;
  error: {
    code: AuthErrorCode;
    message: string;
  };
};

export type AuthRepository = {
  loginWithEmailPassword: (payload: LoginPayload) => Promise<LoginSuccess | LoginFailure>;
};

export function createAuthRepositoryPort() {
  throw new Error('createAuthRepositoryPort is a documentation-only helper.');
}

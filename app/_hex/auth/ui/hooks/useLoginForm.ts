'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { loginWithEmailPassword } from '@/app/_hex/auth/application/use-cases/loginWithEmailPassword';
import { AUTH_ERROR_CODES } from '@/app/_hex/auth/domain/errors/authErrors';
import type { LoginFieldErrors } from '@/app/_hex/auth/domain/services/loginPolicy';
import { createAuthRepository } from '@/app/_hex/auth/infrastructure/factories/createAuthRepository';

const authRepository = createAuthRepository();

type LoginFields = {
  email: string;
  password: string;
};

type LoginFieldName = keyof LoginFields;

type TouchedFields = Record<LoginFieldName, boolean>;

type FormStatus = {
  type: 'idle' | 'error' | 'success';
  message: string;
};

const INITIAL_FIELDS: LoginFields = {
  email: '',
  password: '',
};

const INITIAL_TOUCHED: TouchedFields = {
  email: false,
  password: false,
};

function isLoginFieldName(name: string): name is LoginFieldName {
  return name === 'email' || name === 'password';
}

function getUserMessage(errorCode: string): string {
  switch (errorCode) {
    case AUTH_ERROR_CODES.INVALID_CREDENTIALS:
      return 'The credentials are incorrect. Try demo@example.com / password123.';
    case AUTH_ERROR_CODES.NETWORK_ERROR:
      return 'Could not connect to auth service. Check your network or API settings.';
    case AUTH_ERROR_CODES.VALIDATION_ERROR:
      return 'Please fix the highlighted fields.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export function useLoginForm() {
  const router = useRouter();
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const hasFieldError = useMemo(() => {
    return {
      email: touched.email && Boolean(fieldErrors.email),
      password: touched.password && Boolean(fieldErrors.password),
    };
  }, [fieldErrors, touched]);

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (!isLoginFieldName(name)) {
      return;
    }

    setFields((current) => ({
      ...current,
      [name]: value,
    }));

    setStatus({ type: 'idle', message: '' });

    if (fieldErrors[name]) {
      setFieldErrors((current: LoginFieldErrors) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function handleFieldBlur(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target;

    if (!isLoginFieldName(name)) {
      return;
    }

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTouched({
      email: true,
      password: true,
    });
    setStatus({ type: 'idle', message: '' });
    setIsSubmitting(true);

    const result = await loginWithEmailPassword(fields, authRepository);

    setIsSubmitting(false);

    if (!result.ok) {
      setFieldErrors(result.error.fieldErrors || {});
      setStatus({
        type: 'error',
        message: getUserMessage(result.error.code),
      });
      return;
    }

    setFieldErrors({});
    setStatus({
      type: 'success',
      message: `Welcome back, ${result.data.user.name}! (Mock login success)`,
    });

    document.cookie = 'auth_session=active; Path=/; Max-Age=604800; SameSite=Lax';
    router.push('/');
    router.refresh();
  }

  return {
    fields,
    touched,
    fieldErrors,
    hasFieldError,
    isSubmitting,
    status,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  };
}

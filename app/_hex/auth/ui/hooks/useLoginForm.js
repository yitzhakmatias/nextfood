'use client';

import { useMemo, useState } from 'react';

import { loginWithEmailPassword } from '@/app/_hex/auth/application/use-cases/loginWithEmailPassword';
import { AUTH_ERROR_CODES } from '@/app/_hex/auth/domain/errors/authErrors';
import { createAuthRepository } from '@/app/_hex/auth/infrastructure/factories/createAuthRepository';

const authRepository = createAuthRepository();

const INITIAL_FIELDS = {
  email: '',
  password: '',
};

const INITIAL_TOUCHED = {
  email: false,
  password: false,
};

function getUserMessage(errorCode) {
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
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });

  const hasFieldError = useMemo(() => {
    return {
      email: touched.email && Boolean(fieldErrors.email),
      password: touched.password && Boolean(fieldErrors.password),
    };
  }, [fieldErrors, touched]);

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setFields((current) => ({
      ...current,
      [name]: value,
    }));

    setStatus({ type: 'idle', message: '' });

    if (fieldErrors[name]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function handleFieldBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  }

  async function handleSubmit(event) {
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

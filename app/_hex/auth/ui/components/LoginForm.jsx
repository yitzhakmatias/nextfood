'use client';

import Link from 'next/link';

import classes from '@/app/_hex/auth/ui/components/LoginForm.module.css';
import { useLoginForm } from '@/app/_hex/auth/ui/hooks/useLoginForm';

export default function LoginForm() {
  const {
    fields,
    touched,
    fieldErrors,
    hasFieldError,
    isSubmitting,
    status,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  } = useLoginForm();

  return (
    <section className={classes.wrapper}>
      <div className={classes.card}>
        <p className={classes.eyebrow}>Account Access</p>
        <h1 className={classes.title}>Sign in</h1>
        <p className={classes.subtitle}>Use your email and password to continue.</p>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <div className={classes.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              aria-invalid={hasFieldError.email}
              aria-describedby={hasFieldError.email ? 'email-error' : undefined}
              placeholder="you@example.com"
              required
            />
            {touched.email && fieldErrors.email ? (
              <p id="email-error" className={classes.fieldError}>
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className={classes.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={fields.password}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              aria-invalid={hasFieldError.password}
              aria-describedby={hasFieldError.password ? 'password-error' : undefined}
              placeholder="At least 8 characters"
              required
            />
            {touched.password && fieldErrors.password ? (
              <p id="password-error" className={classes.fieldError}>
                {fieldErrors.password}
              </p>
            ) : null}
          </div>

          <button type="submit" className={classes.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <p
            className={`${classes.statusMessage} ${
              status.type === 'error' ? classes.error : status.type === 'success' ? classes.success : ''
            }`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>

          <div className={classes.linksRow}>
            <Link href="/forgot-password" className={classes.link}>
              Forgot password?
            </Link>
            <Link href="/register" className={classes.link}>
              Create account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

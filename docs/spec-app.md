# Spec: App Login (Hexagonal, FE-Only)

## Goal
Implement a frontend-only login page in a Next.js App Router project using a hexagonal architecture that can switch to a real API with minimal changes.

## Project Context
- Framework: Next.js App Router
- Main entry area: `app/`
- Route target: `/login`
- Runtime mode now: FE-only (mock auth)

## Implemented Route
- `app/(auth)/login/page.js`

Behavior:
- Exposes page metadata (`title`, `description`)
- Renders the login form component from the hexagonal UI layer

## Implemented Architecture (inside `app/`)

### Domain Layer
- `app/_hex/auth/domain/errors/authErrors.js`
  - Shared error codes and error factory
- `app/_hex/auth/domain/value-objects/email.js`
  - Email normalization and format validation
- `app/_hex/auth/domain/services/loginPolicy.js`
  - Login validation policy
  - Rules:
    - email required
    - valid email format
    - password required
    - password min length = 8

### Application Layer
- `app/_hex/auth/application/ports/authRepository.js`
  - Auth repository contract (JSDoc)
- `app/_hex/auth/application/use-cases/loginWithEmailPassword.js`
  - Orchestrates validation + repository call
  - Returns normalized success/error result for UI

### Infrastructure Layer
- `app/_hex/auth/infrastructure/adapters/mockAuthRepository.js`
  - Simulated async auth (700ms)
  - Demo success credentials:
    - email: `demo@example.com`
    - password: `password123`
- `app/_hex/auth/infrastructure/adapters/apiAuthRepository.js`
  - Prepared real API adapter via `fetch`
  - Endpoint contract expected: `POST {BASE_URL}/auth/login`
- `app/_hex/auth/infrastructure/factories/createAuthRepository.js`
  - Provider switch:
    - `mock` (default)
    - `api`

### UI Layer
- `app/_hex/auth/ui/hooks/useLoginForm.js`
  - Form state, touched state, field errors, status messages, submit flow
- `app/_hex/auth/ui/components/LoginForm.jsx`
  - Accessible login UI
  - Inputs: email, password
  - Submit button with loading state
  - Status message region (`aria-live="polite"`)
  - Helper links:
    - `/forgot-password`
    - `/register`
- `app/_hex/auth/ui/components/LoginForm.module.css`
  - Scoped responsive styling for auth card/form

## API-Switch Readiness
No UI or domain rewrite is needed to switch to API.

Set environment variables:
- `NEXT_PUBLIC_AUTH_PROVIDER=api`
- `NEXT_PUBLIC_AUTH_BASE_URL=https://your-api.example.com`

For FE/mock mode:
- `NEXT_PUBLIC_AUTH_PROVIDER=mock` (or omit; mock is default)

## UX and Validation Rules
- Required field validation runs on submit
- Field-level messages shown inline
- Form-level status message shown for success/error
- Submit button disabled while submitting

## Non-Functional Constraints
- JavaScript only (no TypeScript migration)
- Keep implementation under `app/` as main app entry structure
- Keep layers separated by responsibility
- Avoid direct `fetch` in UI components

## Acceptance Criteria
- `/login` route renders correctly in dev and build
- Invalid inputs show clear inline validation messages
- Invalid credentials show user-friendly auth error
- Demo credentials produce success state
- Adapter can be switched from mock to API via env only

## Verification
Executed checks:
- `npm run lint` -> pass
- `npm run build` -> pass

## Follow-up (Optional)
- Add placeholder pages for:
  - `app/forgot-password/page.js`
  - `app/register/page.js`
- Add automated tests once test framework is configured in this repo.

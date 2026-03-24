/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginSuccess
 * @property {true} ok
 * @property {{ id: string, email: string, name: string }} user
 */

/**
 * @typedef {Object} LoginFailure
 * @property {false} ok
 * @property {{ code: string, message: string }} error
 */

/**
 * @typedef {Object} AuthRepository
 * @property {(payload: LoginPayload) => Promise<LoginSuccess|LoginFailure>} loginWithEmailPassword
 */

export function createAuthRepositoryPort() {
  throw new Error('createAuthRepositoryPort is a documentation-only helper.');
}

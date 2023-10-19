import { decryptData, encryptData } from '@utils/crypto.ts';

// Constants -------------------------------------------------------------------

const SESSION_DURATION = 3600; // 1 hour

// External Helpers ------------------------------------------------------------

/**
 * Creates a session for the user.
 * - A property `expiresAt` will be added to the payload to indicate when the session will expire.
 * @param payload A JSON object with the data to be encrypted.
 * @returns A string with the encrypted data.
 */
export async function createUserSession<Payload extends Record<string, unknown>>(
  payload: Payload
): Promise<string> {
  const secret = Deno.env.get('SESSION_SECRET');
  if (!secret) throw new MissingSessionSecretError();
  try {
    const data = await encryptData({ ...payload, expiresAt: _getExpirationDate() }, secret);
    if (!data) throw new UnableToCreateSessionDueToEncryptionError();
    return data;
  } catch (_error) {
    throw new UnableToCreateSessionDueToEncryptionError();
  }
}

/**
 * Decrypts the session data and returns it.
 * @param session A string with the encrypted data.
 * @returns The decrypted session data.
 */
export async function getSessionData<Data extends DataWithExpirationDate>(
  session: string
): Promise<Data> {
  const secret = Deno.env.get('SESSION_SECRET');
  if (!secret) throw new MissingSessionSecretError();
  try {
    return await decryptData<Data>(session, secret);
  } catch (_error) {
    throw new UnableToGetSessionDataDueToDecryptionError();
  }
}

/**
 * Checks if the session is expired.
 * @param encryptedSession A string with the encrypted session data.
 * @returns Whether the session is expired or not.
 */
export async function isSessionExpired(encryptedSession: string) {
  const decryptedSession = await getSessionData(encryptedSession);
  if(!decryptedSession.expiresAt) return true;
  return new Date(decryptedSession.expiresAt).getTime() < Date.now();
}

// Helpers ---------------------------------------------------------------------

function _getExpirationDate(): string {
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + SESSION_DURATION);
  return expiration.toISOString();
}

// Errors ----------------------------------------------------------------------

class MissingSessionSecretError extends Error {
  constructor() {
    super('Unable to complete operation: SESSION_SECRET is not defined');
  }
}

class UnableToCreateSessionDueToEncryptionError extends Error {
  constructor() {
    super('Unable to create session: unable to encrypt data');
  }
}

class UnableToGetSessionDataDueToDecryptionError extends Error {
  constructor() {
    super('Unable to get session data: unable to decrypt data');
  }
}

// Types -----------------------------------------------------------------------

type DataWithExpirationDate = Record<string, unknown> & { expiresAt?: string; };
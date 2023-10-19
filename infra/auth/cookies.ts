// ToDo: Add https to development or add a check to see if the request is coming 
// from localhost in order to add the secure flag to the cookie.
// const SESSION_COOKIE_NAME = '__Host-session';
const SESSION_COOKIE_NAME = 'session';

// External Helpers ------------------------------------------------------------

/**
 * Creates a secure session cookie.
 * @param session A string with the session data.
 * @param domain A string with the domain name.
 * @returns A string with the session cookie.
 */
export function createSessionCookie(params: CreateSessionCookieParams) {
  const { session, domain } = params;
  return `${SESSION_COOKIE_NAME}=${session}; Secure; HttpOnly; SameSite=Strict; Max-Age=3600; domain=${domain}; path=/;`;
}

/**
 * Extracts the session cookie from the request headers.
 * @param headers A Headers object with the request headers.
 * @returns A string with the session cookie.
 * @throws An error if the session cookie is not found.
 */
export function getSessionCookie(headers: Headers) {
  const cookie = headers
    .get('Cookie')
    ?.split(';')
    .find(c => c.trim().startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!cookie) throw new MissingSessionCookieError();

  const session = cookie.split('=')[1];
  if (!session) throw new MissingSessionCookieError();
  return session;
}

// Errors ----------------------------------------------------------------------

class MissingSessionCookieError extends Error {
  constructor() {
    super('Unable to get session cookie from request headers: session cookie not found');
  }
}

// Types -----------------------------------------------------------------------

type CreateSessionCookieParams = {
  /** Encrypted string containing the cookie to be stored in the session. */
  session: string;
  /** Domain name where the cookie will be stored. */
  domain: string;
};
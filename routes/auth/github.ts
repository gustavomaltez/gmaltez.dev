import { Handlers } from "$fresh/server.ts";
import { createUserSession, isSessionExpired } from "../../infra/auth/session.ts";
import { createSessionCookie, getSessionCookie } from "../../infra/auth/cookies.ts";
import { getUserAccessTokenByAuthCode, getUserDataByAccessToken } from "../../infra/auth/github.ts";

export const handler: Handlers = {
  async GET(req) {
    const response = _isVerifyingSession(req) ? _verifyUserSession(req) : _createUserSession(req);
    return await response;
  },
};

// Helpers ---------------------------------------------------------------------

// Session -----

async function _verifyUserSession(req: Request): Promise<Response> {
  const previousLocation = req.headers.get("Referer") ?? "/";
  const session = _getSessionCookie(req.headers);
  if (session && !await isSessionExpired(session)) {
    return _authenticationSuccessResponse({
      session,
      previousLocation,
      domain: _getDomainFromRequest(req),
    });
  }

  return _redirectToGitHubResponse({ previousLocation });
}

async function _createUserSession(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const previousLocation = url.searchParams.get("redirect") ?? "/";

  if (!code) return _missingCodeResponse({ previousLocation });

  try {
    const token = await getUserAccessTokenByAuthCode(code);
    const data = await getUserDataByAccessToken(token);
    const session = await createUserSession({ id: data.id, token });
    return _authenticationSuccessResponse({
      session,
      previousLocation,
      domain: _getDomainFromRequest(req),
    });
  } catch (_error) {
    return _authenticationFailedResponse({ previousLocation });
  }
}

// Request Data Extractors -----

function _isVerifyingSession(req: Request): boolean {
  const url = new URL(req.url);
  return url.searchParams.get("mode") === "verify";
}

function _getDomainFromRequest(req: Request): string {
  const host = req.headers.get("Host");
  return host?.split(":")[0] ?? "";
}

// Error Responses -----

function _missingCodeResponse({ previousLocation }: PreviousLocationParams): Response {
  return _buildErrorResponse({
    status: 400,
    previousLocation,
    error: "Missing GitHub auth code",
  });
}

function _authenticationFailedResponse({ previousLocation }: PreviousLocationParams): Response {
  return _buildErrorResponse({
    status: 500,
    previousLocation,
    error: "Authentication failed",
  });
}

function _buildErrorResponse({ error, previousLocation, status }: BuildErrorResponseParams): Response {
  const headers = _buildPreviousLocationHeader(previousLocation);
  return new Response(JSON.stringify({ error }), { status, headers });
}

// Success Responses -----

function _authenticationSuccessResponse(params: AuthenticationSuccessParams): Response {
  const { session, previousLocation, domain } = params;
  return new Response(null, {
    status: 302,
    headers: {
      ..._buildPreviousLocationHeader(previousLocation),
      'Set-Cookie': createSessionCookie({ session, domain }),
    },
  });
}

function _redirectToGitHubResponse({ previousLocation }: { previousLocation: string; }): Response {
  const GITHUB_CLIENT_ID = Deno.env.get("GITHUB_CLIENT_ID") ?? "";
  const redirectTo = `${Deno.env.get("GITHUB_CALLBACK_URL") ?? ""}?redirect=${previousLocation}`;
  return new Response(null, {
    status: 302,
    headers: {
      'Location': `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectTo}`,
    },
  });
}

// Session -----

function _getSessionCookie(headers: Headers): string | null {
  try {
    return getSessionCookie(headers);
  } catch (_error) {
    return null;
  }
}

// Headers ---------------------------------------------------------------------

function _buildPreviousLocationHeader(previousLocation: string): HeadersInit {
  return { 'Location': previousLocation };
}

// Types -----------------------------------------------------------------------

type BuildErrorResponseParams = {
  error: string;
  status: number;
  previousLocation: string;
};

type AuthenticationSuccessParams = {
  domain: string;
  session: string,
  previousLocation: string,
};

type PreviousLocationParams = {
  previousLocation: string;
};
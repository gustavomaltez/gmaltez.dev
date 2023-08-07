// Utility Methods -------------------------------------------------------------

/**
 * Calls the GitHub API to get the user access token from the code.
 * @throws An error if is not possible to get the access token.
 * @see https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
 * @param code The code returned by GitHub after the user authentication.
 * @returns The user access token. 
 */
export async function getUserAccessTokenByAuthCode(code: string): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: Deno.env.get("GITHUB_CLIENT_ID"),
      client_secret: Deno.env.get("GITHUB_CLIENT_SECRET"),
    }),
  });
  if (!response.ok) throw new UnableToGetAccessTokenError();

  const data = await response.json();
  if (data.error || !data.access_token) throw new UnableToGetAccessTokenError();

  return data.access_token;
}

/**
 * Calls the GitHub API to get the user data from the access token.
 * @throws An error if is not possible to get the user data.
 * @see https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
 * @param accessToken The user access token.
 * @returns The user data.
 */
export async function getUserDataByAccessToken(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: { 'Authorization': `Bearer  ${accessToken}` },
  });
  if (!response.ok) throw new UnableToGetUserDataError();

  const data = await response.json();
  if (data.error || !data.id) throw new UnableToGetUserDataError();

  return data;
}

// Types -----------------------------------------------------------------------

export type GitHubUser = {
  id: number;
  login: string;
  email: string;
  avatar_url: string;
};

// Errors ----------------------------------------------------------------------

class UnableToGetAccessTokenError extends Error {
  constructor() {
    super("Unable to get the user access token from the code.");
  }
}

class UnableToGetUserDataError extends Error {
  constructor() {
    super("Unable to get the user data from the access token.");
  }
}
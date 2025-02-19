import { ACCOUNT_URL } from '@/shared/constants';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;

let REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN as string;

interface SpotifyToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

let cachedToken: SpotifyToken | null = null;
let tokenExpirationTime: number | null = null;

export async function getAccessToken(forceRefresh = false): Promise<string> {
  if (
    !forceRefresh &&
    cachedToken &&
    tokenExpirationTime &&
    Date.now() < tokenExpirationTime
  ) {
    return cachedToken.access_token;
  }

  console.log('Refreshing Spotify access token...');

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  );
  const response = await fetch(`${ACCOUNT_URL}/api/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }).toString(),
  });

  const data = await response.json();

  if (data.error) {
    console.error('Error refreshing token:', data);

    throw new Error(
      `Failed to refresh token: ${data.error_description || 'Unknown error'}`
    );
  }

  cachedToken = data;
  tokenExpirationTime = Date.now() + data.expires_in * 1000;

  if (data.refresh_token) {
    REFRESH_TOKEN = data.refresh_token;
  }

  return data.access_token;
}

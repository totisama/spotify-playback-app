import { ACCOUNT_URL } from '@/shared/constants';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN as string;

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let cachedToken: SpotifyToken | null = null;
let tokenExpirationTime: number | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return cachedToken.access_token;
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${ACCOUNT_URL}/api/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data: SpotifyToken = await response.json();
  cachedToken = data;
  tokenExpirationTime = Date.now() + data.expires_in * 1000;

  return data.access_token;
}

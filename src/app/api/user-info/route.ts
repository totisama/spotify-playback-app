import { SPOTIFY_API_URL } from '@/shared/constants';
import { getAccessToken } from '@/shared/services/spotifyAuth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getAccessToken();
    const res = await fetch(`${SPOTIFY_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch user info`);
    const user = await res.json();

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user info' },
      { status: 500 }
    );
  }
}

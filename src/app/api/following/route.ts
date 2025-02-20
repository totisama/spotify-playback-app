import { SPOTIFY_API_URL } from '@/shared/constants';
import { getAccessToken } from '@/shared/services/spotifyAuth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getAccessToken();
    const res = await fetch(`${SPOTIFY_API_URL}/me/following?type=artist`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch following artists`);
    const data = await res.json();

    return NextResponse.json({ following: data.artists });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch following artists' },
      { status: 500 }
    );
  }
}

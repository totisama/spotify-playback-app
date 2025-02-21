import { SPOTIFY_API_URL } from '@/shared/constants';
import { getAccessToken } from '@/shared/services/spotifyAuth';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get('id');

  if (!albumId) {
    return NextResponse.json(
      { error: 'Missing album ID parameter `id`' },
      { status: 400 }
    );
  }

  const token = await getAccessToken();

  try {
    const res = await fetch(`${SPOTIFY_API_URL}/albums/${albumId}?market=ES`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch album`);
    const album = await res.json();

    return NextResponse.json({ album });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch album data' },
      { status: 500 }
    );
  }
}

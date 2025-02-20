import { SPOTIFY_API_URL } from '@/shared/constants';
import { getAccessToken } from '@/shared/services/spotifyAuth';
import { type NextRequest, NextResponse } from 'next/server';

async function fetchFromSpotify(endpoint: string, token: string) {
  const res = await fetch(`${SPOTIFY_API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const data = await res.json();

  return data;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get('id');

  if (!artistId) {
    return NextResponse.json(
      { error: 'Missing artist ID parameter `id`' },
      { status: 400 }
    );
  }

  const token = await getAccessToken();

  try {
    const [artist, albums, topTracks] = await Promise.all([
      fetchFromSpotify(`/artists/${artistId}`, token),
      fetchFromSpotify(`/artists/${artistId}/albums`, token),
      fetchFromSpotify(`/artists/${artistId}/top-tracks?market=ES`, token),
    ]);

    return NextResponse.json({ artist, albums, topTracks });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch artist data' },
      { status: 500 }
    );
  }
}

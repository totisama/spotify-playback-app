import { type NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/shared/services/spotifyAuth';
import { API_URL } from '@/shared/constants';

export async function GET(req: NextRequest) {
  const searchQuery = req.nextUrl.searchParams.get('q');

  if (!searchQuery) {
    return NextResponse.json(
      { error: 'Missing search query parameter `q`' },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(searchQuery)}&type=artist%2Calbum%2Ctrack`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch search results' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

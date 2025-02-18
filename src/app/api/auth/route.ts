import { NextResponse } from 'next/server';
import { getAccessToken } from '@/shared/services/spotify';

export async function GET() {
  try {
    const token = await getAccessToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error getting access token:', error);
    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    );
  }
}

import { api } from '@/app/utils/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await api.get('/api/ducks');

    const ducks = response.data;
    const imageUrls = ducks.map((duck: any) => duck.image_url);

    return NextResponse.json({ imageUrls });
  } catch (error) {
    console.error('Error fetching ducks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch duck images' },
      { status: 500 }
    );
  }
}

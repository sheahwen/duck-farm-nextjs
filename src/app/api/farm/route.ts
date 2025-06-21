import { api } from '@/app/utils/api';
import { Duck } from '@/types/duck';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await api.get<Duck[]>('/api/ducks');

    const ducks = response.data;
    console.log('ducks', ducks);
    const imageUrls = ducks.map((duck: Duck) => duck.image_url);

    console.log('imageUrls', imageUrls);
    return NextResponse.json({ imageUrls });
  } catch (error) {
    console.error('Error fetching ducks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch duck images' },
      { status: 500 }
    );
  }
}

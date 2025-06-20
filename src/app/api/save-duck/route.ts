import { api } from '@/app/utils/api';
import { APP_NAME } from '@/app/utils/contants';
import { currentUser } from '@clerk/nextjs/server';
import { AxiosError } from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, prompt, imageUrl } = await req.json();

    if (!name || !prompt || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing name, prompt, or image URL' },
        { status: 400 }
      );
    }

    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json(
        { error: 'User session not found. Please login to continue.' },
        { status: 401 }
      );
    }

    const response = await api.post('/api/ducks', {
      name,
      description: prompt,
      image_url: imageUrl,
      created_by: APP_NAME,
      user_id: user?.id,
    });

    return NextResponse.json({ ...response.data });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        'Error saving duck:',
        error.response?.data || error.message
      );
      return NextResponse.json(
        {
          error: 'Failed to save duck to backend',
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }

    // Handle non-axios errors
    console.error('Unexpected error saving duck:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while saving the duck' },
      { status: 500 }
    );
  }
}

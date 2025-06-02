import { APP_NAME } from '@/app/utils/contants';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
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
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const response = await axios.post('http://localhost:3001/api/ducks', {
      name,
      description: prompt,
      imageUrl,
      created_by: APP_NAME,
      userId: user?.id,
    });

    return NextResponse.json({ ...response.data });
  } catch (error: any) {
    console.error('Error saving duck:', error.response);
    return NextResponse.json(
      { error: 'Failed to save duck to backend' },
      { status: 500 }
    );
  }
}

import { api } from '@/app/utils/api';
import { Duck } from '@/types/duck';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    console.log('userId', userId);

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    console.log('userId', userId);

    const response = await api.get<Duck[]>(`/api/ducks/user/${userId}`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching user ducks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user ducks' },
      { status: 500 }
    );
  }
}

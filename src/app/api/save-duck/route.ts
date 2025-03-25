// src/app/api/save-duck/route.ts
import { HARDCODED_USER_ID } from '@/app/utils/contants';
import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, prompt } = await req.json();

    if (!name || !prompt) {
      return NextResponse.json(
        { error: 'Missing name or prompt' },
        { status: 400 }
      );
    }

    const response = await axios.post('http://localhost:3001/api/ducks', {
      name,
      description: prompt,
      userId: HARDCODED_USER_ID,
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

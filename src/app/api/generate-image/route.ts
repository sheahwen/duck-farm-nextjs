import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    // Sanitize prompt
    if (!prompt.toLowerCase().includes('duck')) {
      return NextResponse.json(
        { error: "Hmmm it doesn't look like you mentioned a duck" },
        { status: 400 }
      );
    }

    const editedPrompt = `${prompt}. Generate the image in modern pixel art style. Remove the background.`;

    const image = await openai.images.generate({
      model: 'dall-e-2',
      prompt: editedPrompt,
      n: 1,
      size: '512x512',
    });

    const imageUrl = image.data[0].url;
    console.log('imageUrl', imageUrl);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting image:', error.message);
    } else {
      console.error('Unknown error generating image:', error);
    }
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

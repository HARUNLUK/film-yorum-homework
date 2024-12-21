import { NextResponse } from 'next/server';
import { getMovieInfo } from '@/lib/ai-service';

export async function POST(req: Request) {
  try {
    console.log("POST:")
    const { movieName } = await req.json();
    console.log("Movie name",movieName )
    
    if (!movieName?.trim()) {
      return NextResponse.json(
        { error: 'Movie name is required' },
        { status: 400 }
      );
    }

    const data = await getMovieInfo(movieName);
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return NextResponse.json(
        { error: 'No information available for this movie' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Movie API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie information' },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
import { AI_API_URL, AI_API_KEY } from './constants';

interface AIResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: string;
}

export async function getMovieInfo(movieName: string): Promise<AIResponse> {
  try {
    const response = await fetch(`${AI_API_URL}?key=${AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: movieName }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
}
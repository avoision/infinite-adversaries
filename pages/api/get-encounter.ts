import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

const handler = async (request: Request): Promise<Response> => {
  const { prompt } = (await request.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'In the style of a narrator, using second person perspective, act as a storyteller and create exciting stories full of action and fantasy. Always respond using second person point of view, in the present tense. These stories should be similar to fairy tales or myths.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
};

export default handler;

import { OpenAIStream, OpenAIStreamPayload } from '../../app/util/OpenAIStream';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;

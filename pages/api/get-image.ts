import { NextApiResponse } from 'next';
import { NextApiRequestPrompt } from './types';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequestPrompt, res: NextApiResponse) {
  const response = await openai.images.generate({
    prompt: req.body.prompt,
    n: 1,
    size: '1024x1024',
  });

  console.log('response', response);

  const imageURL = response?.data[0]?.url ?? '';
  if (imageURL) {
    res.status(200).json({ url: imageURL });
  } else {
    throw new Error('We got a problem with the image');
  }
}

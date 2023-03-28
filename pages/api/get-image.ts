import { NextApiResponse } from 'next';
import { NextApiRequestPrompt } from './types';
import { Configuration, OpenAIApi } from 'openai';

export const config = {
  runtime: 'edge',
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequestPrompt, res: NextApiResponse) {
  const response = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: '1024x1024',
  });

  const imageURL = response?.data?.data[0]?.url ?? '';
  if (imageURL) {
    res.status(200).json({ url: imageURL });
  } else {
    throw new Error('We got a problem with the image');
  }
}

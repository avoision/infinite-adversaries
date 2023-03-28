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
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: req.body.prompt,
    temperature: 0.8,
    max_tokens: 2000,
  });

  // console.log('response data', response?.data);
  const promptAnswerRaw = response?.data?.choices[0]?.text?.trim();

  if (promptAnswerRaw) {
    // console.log('promptAnswerRaw', promptAnswerRaw);
    const formattedAnswer = JSON.parse(promptAnswerRaw);
    res.status(200).json(formattedAnswer);
  } else {
    console.log(res);
    throw new Error('we got a problem');
  }
}

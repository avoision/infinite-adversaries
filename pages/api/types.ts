import { NextApiRequest } from 'next';

interface NextApiRequestPrompt extends NextApiRequest {
  body: {
    prompt: string;
  };
}

export type { NextApiRequestPrompt };

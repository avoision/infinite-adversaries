import { Raleway, Spectral } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export const initialLetter = Spectral({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-initial-letter',
});

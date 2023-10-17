import AppContextProvider from './components/AppContext/AppContextProvider';
import './styles/globals.scss';
import { Header } from './components';
import { raleway } from './fonts';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  metadataBase: new URL('https://infiniteadversaries.com'),
  title: 'Infinite Adversaries',
  description:
    'A random, perpetually procedural game created and narrated by ChatGPT, illustrated by DALL-E.',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Adversaries',
    description:
      'A random, perpetually procedural game created and narrated by ChatGPT, illustrated by DALL-E.',
    siteId: '1641174911791112194',
    creator: '@adversariesAI',
    creatorId: '1641174911791112194',
    images: ['https://infiniteadversaries.com/img/og-large.jpg'],
  },

  openGraph: {
    title: 'Infinite Adversaries',
    description:
      'A random, perpetually procedural game created and narrated by ChatGPT, illustrated by DALL-E.',
    url: 'https://infiniteadversaries.com/',
    siteName: 'infiniteadversaries.com',
    images: [
      {
        url: 'https://infiniteadversaries.com/img/og-med.jpg',
        width: 600,
        height: 400,
      },
      {
        url: 'https://infiniteadversaries.com/img/og-large.jpg',
        width: 1400,
        height: 933,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {<Header />}
        <AppContextProvider>{children}</AppContextProvider>
        <Analytics />
      </body>
      <Script id="google-analytics" src="https://www.googletagmanager.com/gtag/js?id=G-BJE17QQRDT">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-BJE17QQRDT');
        `}
      </Script>
    </html>
  );
}

// Favicon Info
// Graphics Author: Copyright 2020 Twitter, Inc and other contributors (https://github.com/twitter/twemoji)
// Graphics Source: https://github.com/twitter/twemoji/blob/master/assets/svg/2694.svg
// Graphics License: CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)

import AppContextProvider from './components/AppContext/AppContextProvider';
import './styles/globals.scss';
import { Header } from './components';
import { Raleway } from 'next/font/google';
import Script from 'next/script';

export const metadata = {
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

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {<Header />}
        <AppContextProvider>{children}</AppContextProvider>
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

import AppContextProvider from './components/AppContext/AppContextProvider';
import './styles/globals.scss';
import { Header } from './components';
import { Raleway } from 'next/font/google';

export const metadata = {
  title: 'Infinite adversaries',
  description: 'An adversarial game that goes on forever',
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
    </html>
  );
}

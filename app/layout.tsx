import "./styles/globals.scss";
import { Header } from "./components";

export const metadata = {
  title: "Infinite adversaries",
  description: "An adversarial game that goes on forever",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {<Header />}
        {children}
      </body>
    </html>
  );
}
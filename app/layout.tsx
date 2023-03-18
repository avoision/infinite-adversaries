import './globals.scss'

export const metadata = {
  title: 'Infinite adversaries',
  description: 'An adversarial game that goes on forever',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

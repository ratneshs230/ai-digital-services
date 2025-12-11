import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Merch Personalizer',
  description: 'AI-powered tool that generates personalized merch designs based on fan preferences and trending themes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

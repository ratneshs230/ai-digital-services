import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Sentiment Routing',
  description: 'Intelligently routes calls to agents best suited to handle the caller\'s emotional state, improving customer satisfaction and resolution rates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

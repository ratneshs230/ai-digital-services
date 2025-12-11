import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StratAI Competitive Monitor',
  description: 'AI-powered platform that monitors competitors\' strategies, predicts their moves, and identifies emerging threats/opportunities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

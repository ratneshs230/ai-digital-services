import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Sentiment Analysis of Earnings Calls',
  description: 'Analyzes earnings call transcripts and audio to provide real-time sentiment scoring and identify subtle shifts in management tone.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

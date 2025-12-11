import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sentiment Trend Forecaster',
  description: 'Predicts future sentiment trends for brands based on current online conversations and historical data, allowing proactive reputation management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

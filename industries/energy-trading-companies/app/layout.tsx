import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Market Sentiment Analyzer',
  description: 'Analyzes news, social media, and trading data to provide real-time sentiment scores for energy commodities, helping traders anticipate market movements.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

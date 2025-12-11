import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sentiment-Calibrated Review Summarizer',
  description: 'AI-powered tool that summarizes customer reviews, weighting summaries by sentiment score to provide a more accurate reflection of overall feedback.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sentiment Analysis & Anomaly Detector',
  description: 'AI-powered tool that analyzes community sentiment in real-time and flags unusual activity, toxicity spikes, or emerging negative trends.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

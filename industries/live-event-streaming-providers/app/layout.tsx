import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Audience Sentiment Analyzer',
  description: 'Real-time analysis of audience sentiment during live streams to inform content and engagement strategies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

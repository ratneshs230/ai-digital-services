import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fan Sentiment Analyzer',
  description: 'Analyzes fan sentiment across different platforms to identify trending topics and predict potential controversies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Script Optimizer',
  description: 'Analyzes video scripts using NLP to predict audience engagement and suggest improvements to dialogue, pacing, and scene structure.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

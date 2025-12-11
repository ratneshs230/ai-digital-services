import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Stream Summarizer',
  description: 'Automatically generates concise summaries and highlights reels of past game streams, saving viewers time and helping them discover interesting content.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

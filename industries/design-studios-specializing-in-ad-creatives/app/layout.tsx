import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AdCreativeAI Analyzer',
  description: 'AI-powered service that analyzes ad creatives to predict their performance and suggest improvements.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

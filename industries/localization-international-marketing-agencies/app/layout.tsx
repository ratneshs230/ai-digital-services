import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Global Content Analyzer',
  description: 'AI-powered tool that analyzes content for cultural relevance, linguistic nuances, and potential misunderstandings before localization.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

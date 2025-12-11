import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Essay Insights AI',
  description: 'AI-powered tool to analyze and score student essays, providing feedback on grammar, style, and content relevance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Portfolio Reviewer',
  description: 'Provides automated feedback on student portfolios, identifying strengths, weaknesses, and areas for improvement using computer vision and stylistic analysi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

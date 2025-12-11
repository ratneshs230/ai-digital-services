import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Content Ideation Assistant',
  description: 'An AI tool that generates content ideas based on trending topics, keyword analysis, and competitor research, helping agencies overcome writer\'s block and c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

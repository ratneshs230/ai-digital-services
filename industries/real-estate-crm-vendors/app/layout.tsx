import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Lead Scoring & Prioritization',
  description: 'Automatically scores and prioritizes leads based on their likelihood to convert, helping agents focus on the most promising prospects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Sentiment Analysis for Parent Feedback',
  description: 'Analyzes parent messages and feedback to identify sentiment trends, enabling proactive intervention and improved communication strategies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

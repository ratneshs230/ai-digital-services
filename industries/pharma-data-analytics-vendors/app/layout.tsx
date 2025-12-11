import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Literature Review Summarizer',
  description: 'Automatically summarizes research papers and clinical trial data using NLP to accelerate literature reviews for drug discovery and competitive analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

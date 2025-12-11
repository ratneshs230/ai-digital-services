import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Content Brief Analyzer',
  description: 'Analyzes client briefs using NLP to identify gaps, suggest improvements, and predict content performance, ensuring higher quality and more effective copy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

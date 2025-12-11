import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Content Optimizer',
  description: 'Analyzes content in real-time to suggest SEO improvements, readability enhancements, and topic clustering for optimal ranking.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

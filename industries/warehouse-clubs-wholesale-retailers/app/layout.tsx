import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Markdown Optimizer',
  description: 'AI-powered system that dynamically adjusts markdown pricing based on real-time inventory, competitor pricing, and predicted demand.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

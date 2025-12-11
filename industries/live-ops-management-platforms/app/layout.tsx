import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart A/B Test Optimizer',
  description: 'AI-powered A/B test analysis that automatically identifies winning variations and maximizes key performance indicators.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

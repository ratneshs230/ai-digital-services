import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Maintenance for Meters',
  description: 'AI-powered service that predicts meter failures before they happen, enabling proactive maintenance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

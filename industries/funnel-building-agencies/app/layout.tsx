import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Funnel Flow Optimizer',
  description: 'Continuously A/B tests and optimizes funnel steps using reinforcement learning to maximize conversion rates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

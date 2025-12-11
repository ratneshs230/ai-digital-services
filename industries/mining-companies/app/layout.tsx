import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Maintenance AI',
  description: 'AI-powered system predicting equipment failures before they happen, minimizing downtime and maintenance costs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

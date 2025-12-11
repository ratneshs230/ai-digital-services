import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Route Optimization & Predictive Maintenance',
  description: 'Intelligently optimizes routes considering real-time conditions and predicts maintenance needs to minimize downtime and fuel costs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

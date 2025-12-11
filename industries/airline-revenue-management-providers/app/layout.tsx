import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Origin-Destination Pricing AI',
  description: 'AI-powered pricing engine that optimizes fares for every possible origin-destination pair, maximizing revenue based on real-time demand and competitor pric',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

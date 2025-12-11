import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Strategy Recommendation Engine',
  description: 'An AI-powered tool that analyzes market data and internal company information to recommend optimal business strategies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

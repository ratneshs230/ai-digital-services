import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deal Sourcing AI',
  description: 'AI-powered platform to identify promising investment opportunities based on financial data, market trends, and alternative data sources.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

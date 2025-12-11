import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Pricing Optimizer',
  description: 'AI-powered tool that adjusts charging prices in real-time based on demand, grid load, and user behavior.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

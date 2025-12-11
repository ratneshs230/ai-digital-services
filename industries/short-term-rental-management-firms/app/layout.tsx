import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Pricing Pro',
  description: 'AI-powered dynamic pricing tool that optimizes rental rates based on real-time demand, competitor pricing, and property-specific factors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

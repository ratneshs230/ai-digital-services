import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Pricing Optimizer',
  description: 'AI-driven pricing engine that adjusts rental rates based on real-time demand, vehicle availability, location, and competitor pricing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

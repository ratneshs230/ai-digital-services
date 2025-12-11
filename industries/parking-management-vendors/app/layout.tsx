import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Parking Revenue Optimizer',
  description: 'AI-powered pricing and availability management system to maximize parking revenue based on real-time demand and events.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Inventory Optimization',
  description: 'AI-powered system that predicts demand and optimizes inventory levels in real-time to minimize waste and maximize sales.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Inventory Optimization',
  description: 'AI-powered inventory management that predicts demand and optimizes stock levels to minimize waste and maximize freshness.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

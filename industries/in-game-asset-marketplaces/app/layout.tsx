import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Asset Valuation AI',
  description: 'AI-driven tool that accurately estimates the fair market value of in-game assets based on rarity, stats, demand, and historical sales data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

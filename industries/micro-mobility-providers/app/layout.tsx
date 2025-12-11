import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Fleet Rebalancing',
  description: 'Predictive rebalancing of scooters and bikes based on demand forecasting, optimizing availability and reducing operational costs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

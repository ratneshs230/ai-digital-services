import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CityPulse AI',
  description: 'Real-time city-wide anomaly detection and prediction for proactive infrastructure management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

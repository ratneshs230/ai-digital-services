import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Sensor Calibration',
  description: 'AI-powered service that predicts when environmental sensors need calibration, minimizing downtime and ensuring data accuracy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

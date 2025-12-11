import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive AQI Forecaster',
  description: 'AI-powered service that predicts future air quality index (AQI) levels with high accuracy, enabling proactive alerts and mitigation strategies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

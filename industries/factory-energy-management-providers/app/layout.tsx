import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Energy Consumption Forecaster',
  description: 'AI-powered service that forecasts future energy consumption based on production schedules, weather patterns, and historical data to optimize energy procure',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

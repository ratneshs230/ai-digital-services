import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Driven Property Valuation Forecaster',
  description: 'Predictive analytics tool that forecasts property values based on macroeconomic trends, hyperlocal events, and historical data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

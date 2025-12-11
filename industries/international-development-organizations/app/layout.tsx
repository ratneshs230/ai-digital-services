import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impact Forecaster AI',
  description: 'Predicts the impact of development projects using machine learning on historical data and socio-economic indicators to optimize resource allocation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

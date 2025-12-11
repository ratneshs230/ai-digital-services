import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Player Performance Forecaster',
  description: 'Predicts player performance based on historical data, practice metrics, and opponent analysis to optimize team strategies and player development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Actuarial Risk Forecaster',
  description: 'AI-powered platform that predicts future risks and liabilities based on historical data and market trends, providing proactive risk management insights.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

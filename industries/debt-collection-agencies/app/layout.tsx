import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Propensity-to-Pay Scoring',
  description: 'AI-powered scoring system that predicts the likelihood of a debtor paying based on their financial history and communication patterns.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

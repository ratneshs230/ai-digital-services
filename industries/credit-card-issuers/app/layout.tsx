import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fraud Pattern Forecaster',
  description: 'Predicts emerging fraud patterns before they impact cardholders using real-time transaction analysis and anomaly detection.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

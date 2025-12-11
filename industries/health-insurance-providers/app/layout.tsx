import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Driven Claim Predictor',
  description: 'Predicts the likelihood of a claim being filed based on patient data, demographics, and historical trends, enabling proactive risk management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

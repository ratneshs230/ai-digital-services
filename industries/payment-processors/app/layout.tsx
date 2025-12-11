import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fraud Prevention AI',
  description: 'Real-time fraud detection using advanced machine learning to analyze transaction patterns and identify suspicious activities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

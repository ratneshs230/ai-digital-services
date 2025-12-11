import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adaptive Fraud Prevention AI',
  description: 'An AI service that dynamically adjusts fraud detection rules based on real-time data patterns and emerging threat landscapes, minimizing false positives an',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

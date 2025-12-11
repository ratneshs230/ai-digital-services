import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Anomaly Detection Service',
  description: 'Real-time anomaly detection service that identifies deviations from normal operational patterns, predicting potential equipment failures.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

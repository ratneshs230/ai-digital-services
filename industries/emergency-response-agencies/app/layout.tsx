import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Incident Prediction',
  description: 'Predicts potential emergency incidents based on historical data, weather patterns, and real-time sensor data to enable proactive resource allocation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Maintenance Optimizer',
  description: 'AI-powered service that optimizes predictive maintenance schedules based on real-time sensor data and historical failure patterns.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

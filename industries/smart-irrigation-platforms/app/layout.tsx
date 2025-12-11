import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Irrigation Scheduler',
  description: 'Dynamically adjusts irrigation schedules based on real-time weather forecasts, soil moisture data, and plant-specific needs using machine learning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

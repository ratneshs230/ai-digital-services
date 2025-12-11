import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Accident Alert',
  description: 'AI-powered service that predicts potential accidents in real-time based on driving behavior and environmental conditions, sending alerts to drivers and ins',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

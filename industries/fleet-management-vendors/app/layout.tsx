import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Maintenance Advisor',
  description: 'AI-powered service that analyzes vehicle data to predict maintenance needs and prevent breakdowns, optimizing fleet uptime.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

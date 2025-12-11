import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anomaly Root Cause Analyzer',
  description: 'AI-powered service that automatically identifies the root cause of anomalies in complex systems, reducing MTTR.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Anomaly Detection',
  description: 'Automatically identify anomalies (e.g., structural damage, vegetation stress) in drone imagery using AI, enabling faster and more targeted inspections.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

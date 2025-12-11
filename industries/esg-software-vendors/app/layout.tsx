import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ESG Data Anomaly Detector',
  description: 'AI-powered service that automatically identifies inconsistencies and errors in ESG data reported by companies, ensuring data quality and compliance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

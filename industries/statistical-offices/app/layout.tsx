import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Data Quality Auditor',
  description: 'AI-powered tool that automatically identifies and flags anomalies, inconsistencies, and errors in statistical datasets.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

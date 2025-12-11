import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Lead Enrichment',
  description: 'Automatically enrich lead profiles with predicted attributes (e.g., industry, revenue, employee count) based on AI analysis of partial data and similar pro',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

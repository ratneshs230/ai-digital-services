import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Lead Scoring & Prioritization',
  description: 'Predictive lead scoring tool that uses AI to identify and prioritize the most promising leads for SDRs, increasing conversion rates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

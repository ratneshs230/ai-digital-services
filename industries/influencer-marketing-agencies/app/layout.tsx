import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Influencer Discovery',
  description: 'Find the perfect influencers for your campaigns using AI-driven analysis of audience demographics, engagement quality, and brand affinity.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

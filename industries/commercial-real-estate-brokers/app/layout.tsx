import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Property Matchmaker',
  description: 'An AI-powered platform that instantly matches commercial properties with potential tenants or buyers based on their specific needs and preferences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

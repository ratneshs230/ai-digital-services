import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deal Flow Scorer',
  description: 'AI-powered platform that automatically scores and ranks incoming deal flow based on various factors to prioritize the most promising opportunities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

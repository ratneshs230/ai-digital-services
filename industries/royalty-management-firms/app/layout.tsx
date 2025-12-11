import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RoyalTrack AI',
  description: 'AI-powered royalty audit and tracking platform that identifies discrepancies and maximizes revenue capture.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

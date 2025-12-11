import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Rerouting AI',
  description: 'Real-time rerouting based on predictive AI that anticipates traffic, accidents, and weather impacts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

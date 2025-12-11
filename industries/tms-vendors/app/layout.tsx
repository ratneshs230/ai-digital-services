import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Route Optimization',
  description: 'Dynamically optimizes routes in real-time, considering traffic, weather, and delivery constraints, to minimize costs and delivery times.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

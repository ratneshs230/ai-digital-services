import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Route Optimization',
  description: 'Dynamically optimizes delivery routes in real-time based on traffic, weather, and delivery schedules, minimizing delays and fuel consumption.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

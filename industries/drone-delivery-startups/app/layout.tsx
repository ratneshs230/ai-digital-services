import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Optimal Route Planner',
  description: 'AI-powered route optimization service that minimizes delivery time and energy consumption for drone fleets.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Route Optimization',
  description: 'Dynamically optimizes delivery routes in real-time based on predictive traffic, weather, and demand patterns, minimizing transportation costs and improving',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

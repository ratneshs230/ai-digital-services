import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AquaWise AI',
  description: 'AI-powered irrigation scheduling that optimizes water usage based on real-time weather data and crop needs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

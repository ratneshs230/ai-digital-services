import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Route Optimization',
  description: 'AI-powered route optimization that dynamically adjusts to real-time traffic, weather, and delivery constraints for faster and cheaper delivery.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

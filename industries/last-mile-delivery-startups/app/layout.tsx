import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Route Optimization & Predictive Congestion',
  description: 'AI-powered route optimization that predicts and avoids traffic congestion in real-time, minimizing delays and fuel consumption.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

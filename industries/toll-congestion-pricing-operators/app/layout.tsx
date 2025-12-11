import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Toll Optimizer',
  description: 'AI-powered system that adjusts toll prices in real-time based on traffic conditions, predicted demand, and environmental factors to optimize traffic flow a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Dispatch Optimization',
  description: 'AI-powered dispatch system that minimizes idle time and maximizes driver utilization based on real-time demand and traffic conditions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

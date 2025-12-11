import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leak Detection AI',
  description: 'AI-powered platform that analyzes sensor data and historical patterns to detect and predict water pipeline leaks in real-time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

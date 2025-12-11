import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Streetlight Management',
  description: 'AI-powered system that optimizes streetlight brightness and schedules based on real-time conditions, reducing energy consumption and improving safety.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

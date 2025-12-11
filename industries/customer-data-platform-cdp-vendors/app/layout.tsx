import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Customer Journey Orchestration',
  description: 'Dynamically personalize customer journeys in real-time based on AI-driven predictions of customer behavior and preferences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

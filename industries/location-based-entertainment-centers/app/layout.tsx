import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Game Difficulty Adjustment',
  description: 'Dynamically adjusts game difficulty in real-time based on player performance to maximize engagement and prevent frustration.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Career Path Forecaster',
  description: 'Predicts future career trajectory and skill requirements based on individual\'s current skills and market trends.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

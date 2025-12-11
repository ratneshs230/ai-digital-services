import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Content Personalization AI',
  description: 'AI-driven content recommendations that adapt to individual viewing habits and preferences in real-time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

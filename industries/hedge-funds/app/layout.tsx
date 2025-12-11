import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alpha AI Signal Generator',
  description: 'AI-powered platform that generates novel alpha signals by analyzing alternative datasets and identifying hidden market inefficiencies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

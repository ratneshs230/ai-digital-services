import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ModGenius AI',
  description: 'AI-powered mod recommendation engine that personalizes mod discovery for players based on their gaming history and preferences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

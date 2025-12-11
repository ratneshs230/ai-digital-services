import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Narrative Architect AI',
  description: 'AI-powered platform that helps narrative designers rapidly prototype and test story structures and branching narratives.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

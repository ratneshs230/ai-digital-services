import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adaptive Difficulty Modeler',
  description: 'AI-powered tool that dynamically adjusts game difficulty based on a child\'s real-time performance and learning patterns.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Quoting Assistant',
  description: 'Automatically generate accurate and competitive quotes for CNC machining jobs using AI analysis of part geometry, material, and machine capabilities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

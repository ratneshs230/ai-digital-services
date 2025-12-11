import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Curriculum Alignment',
  description: 'Automatically aligns game content to specific educational standards and learning objectives using AI-powered analysis of game mechanics and content.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

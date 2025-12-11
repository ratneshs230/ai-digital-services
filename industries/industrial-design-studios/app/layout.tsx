import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Design Ideation Assistant',
  description: 'An AI tool that generates novel design concepts and variations based on user-defined parameters and style preferences, accelerating the initial design phas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

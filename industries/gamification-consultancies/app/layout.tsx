import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Game Design AI Assistant',
  description: 'AI tool that helps gamification consultants rapidly prototype and iterate on game mechanics and reward systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

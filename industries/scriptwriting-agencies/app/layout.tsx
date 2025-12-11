import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Story Generator',
  description: 'Generates story ideas and plot outlines based on keywords, genres, and target audience.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Personalized Content Curator',
  description: 'AI-powered tool that automatically curates learning content from various sources based on individual student\'s needs and learning styles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

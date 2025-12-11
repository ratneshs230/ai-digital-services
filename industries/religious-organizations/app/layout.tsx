import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SermonSpark AI',
  description: 'AI-powered sermon and homily generator that helps religious leaders create engaging and relevant content.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

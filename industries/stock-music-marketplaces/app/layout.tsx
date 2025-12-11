import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Music Tagging Pro',
  description: 'Automatically generate detailed and accurate tags for music tracks using AI, improving searchability and discoverability.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

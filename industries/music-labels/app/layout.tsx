import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Music Discovery Assistant',
  description: 'An AI-powered tool that analyzes vast amounts of audio data to identify promising new artists and tracks for music labels.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

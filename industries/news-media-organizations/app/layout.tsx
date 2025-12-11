import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Content Authenticity Tracker',
  description: 'AI-powered tool to verify the authenticity of news content (images, videos, text) and detect deepfakes or manipulated media.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

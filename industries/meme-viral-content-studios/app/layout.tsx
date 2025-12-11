import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MemeGenius',
  description: 'AI-powered meme template generator that suggests the best template for a given text prompt.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PanelAI',
  description: 'AI-powered panel layout and composition assistant for comic artists, suggesting optimal arrangements and visual storytelling techniques.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Music Tutor',
  description: 'Personalized AI tutor that provides real-time feedback on student\'s playing, adapting to their skill level and musical goals.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Tournament Broadcaster',
  description: 'Automated broadcasting system that uses AI to analyze gameplay and dynamically switch camera angles, add commentary, and generate highlight reels.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

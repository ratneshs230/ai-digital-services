import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skills Gap Navigator',
  description: 'AI-powered platform that identifies employee skills gaps and recommends personalized learning paths to bridge them.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

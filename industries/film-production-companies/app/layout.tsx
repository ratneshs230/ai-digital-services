import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SceneWise',
  description: 'AI-powered script breakdown and scheduling tool that optimizes production timelines and resource allocation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

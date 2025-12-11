import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Storyboard Assistant',
  description: 'AI-powered tool that generates storyboard panels from script descriptions, saving animators time and effort.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

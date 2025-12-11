import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AR Feature Prioritizer',
  description: 'AI-powered tool that analyzes user reviews, competitor apps, and market trends to recommend the most impactful AR features to build next.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

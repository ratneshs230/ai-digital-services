import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cognitive RPA Process Discovery',
  description: 'AI-powered tool that automatically discovers and documents RPA-suitable processes within an organization by analyzing user activity and system logs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

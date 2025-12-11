import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SampleMatch AI',
  description: 'AI-powered platform to optimize product sampling campaigns by matching the right samples to the most receptive consumer segments.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

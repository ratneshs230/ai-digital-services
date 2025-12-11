import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carbon Footprint Analyzer',
  description: 'AI-powered platform to automatically calculate and analyze a company\'s carbon footprint across its entire value chain.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

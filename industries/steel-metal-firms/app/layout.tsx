import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DefectWise',
  description: 'AI-powered visual inspection system that detects defects in steel and metal products in real-time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

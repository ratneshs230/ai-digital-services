import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlavorPrint AI',
  description: 'AI-powered personalized flavor profiling and recommendation engine for gourmet food selection.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

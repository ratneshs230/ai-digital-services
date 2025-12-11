import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GearWise',
  description: 'AI-powered personalized gear recommendation engine for online and in-store shoppers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

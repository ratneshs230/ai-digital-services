import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Audience Persona Generator',
  description: 'AI-powered tool that automatically generates detailed audience personas from various data sources to optimize marketing campaigns.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

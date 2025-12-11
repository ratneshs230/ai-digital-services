import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Standards Compliance AI Assistant',
  description: 'An AI assistant that helps companies automatically check their products and processes against relevant industry standards.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

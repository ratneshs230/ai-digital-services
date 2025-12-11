import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlloyAI',
  description: 'AI-powered alloy recommendation engine that optimizes material properties based on desired performance characteristics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

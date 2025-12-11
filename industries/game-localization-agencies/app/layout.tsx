import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Linguistic Asset Management',
  description: 'Centralized platform that uses AI to manage, optimize, and reuse linguistic assets (TMs, glossaries, style guides) for game localization.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

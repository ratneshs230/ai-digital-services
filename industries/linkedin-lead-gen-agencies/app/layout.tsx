import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Lead Qualifier',
  description: 'Automatically qualifies LinkedIn leads based on profile data, engagement patterns, and inferred intent, saving agency time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

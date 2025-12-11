import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Personalized Product Finder',
  description: 'Recommends beauty products based on user\'s skin type, concerns, and preferences, analyzed from uploaded selfies and questionnaires.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

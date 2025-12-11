import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Personalized Learning Path Generator',
  description: 'Dynamically creates tailored learning paths based on individual student\'s strengths, weaknesses, and learning styles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

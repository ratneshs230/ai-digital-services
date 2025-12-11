import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Certi-Prep AI',
  description: 'AI-powered personalized learning paths and practice exams to optimize certification preparation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

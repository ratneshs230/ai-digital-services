import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Personalized Study Plans',
  description: 'Generates customized study schedules based on a student\'s diagnostic test results, learning style, and target score.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

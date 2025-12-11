import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Curriculum Recommendation Engine',
  description: 'Suggests optimal curriculum pathways and learning resources based on student performance, learning styles, and career aspirations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

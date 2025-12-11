import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Curriculum Personalizer',
  description: 'Dynamically adjusts the difficulty and content of STEM lessons based on each student\'s real-time performance and learning style.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

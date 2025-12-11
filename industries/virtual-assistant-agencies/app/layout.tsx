import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VA Skill Matcher',
  description: 'AI-powered platform to match clients with virtual assistants based on skills, experience, and personality traits.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

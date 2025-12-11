import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Experiential Design Assistant',
  description: 'An AI tool that helps agencies design optimal experiential marketing campaigns based on audience data, past campaign performance, and real-time feedback.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Session Summarizer',
  description: 'Automatically generates concise summaries of therapy sessions, saving therapists time on note-taking and improving recall.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

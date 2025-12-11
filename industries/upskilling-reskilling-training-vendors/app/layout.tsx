import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skills Gap Navigator',
  description: 'AI-powered platform to identify specific skill gaps within organizations and recommend tailored training programs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

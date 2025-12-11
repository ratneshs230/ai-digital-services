import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Audit AI Assistant',
  description: 'AI-powered assistant to automate repetitive audit tasks and improve accuracy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

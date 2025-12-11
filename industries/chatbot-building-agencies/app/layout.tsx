import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intent Optimization Engine',
  description: 'AI-powered tool that analyzes chatbot conversation data to automatically identify and suggest improvements to intent definitions, training phrases, and ent',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

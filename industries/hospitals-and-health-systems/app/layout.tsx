import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Patient Triage & Routing',
  description: 'Intelligent system that analyzes patient symptoms and medical history to route them to the most appropriate care setting (e.g., ER, urgent care, telehealth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

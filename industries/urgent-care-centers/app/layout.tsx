import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Symptom Checker & Triage',
  description: 'A virtual assistant that uses AI to assess patient symptoms and direct them to the appropriate care setting (e.g., urgent care, ER, telehealth).',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

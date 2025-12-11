import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Harmonized System (HS) Classifier',
  description: 'Automatically classifies goods with the correct HS code using AI, reducing errors and speeding up the import/export process.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

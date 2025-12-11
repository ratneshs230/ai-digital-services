import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Pronunciation Coach',
  description: 'An AI-powered tool that provides real-time feedback on pronunciation, helping students improve their spoken language skills.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

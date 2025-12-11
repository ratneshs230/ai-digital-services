import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Portfolio Risk Analyzer',
  description: 'Analyzes portfolio risk using AI to identify potential vulnerabilities and suggest mitigation strategies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

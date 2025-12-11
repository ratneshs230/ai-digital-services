import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Clinical Documentation Improvement (CDI)',
  description: 'Automated CDI tool that analyzes clinical documentation in real-time to identify areas for improvement in coding accuracy and completeness.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

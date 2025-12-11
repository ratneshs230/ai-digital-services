import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Risk Profiler AI',
  description: 'AI-powered risk assessment tool that analyzes applicant data to generate comprehensive risk profiles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

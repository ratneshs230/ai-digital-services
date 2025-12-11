import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Chemical Synthesis Planner',
  description: 'An AI tool that designs optimal chemical synthesis pathways, suggesting reagents, conditions, and predicting yields.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

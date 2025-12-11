import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Driven Target Identification',
  description: 'Identifies novel drug targets by analyzing vast datasets of genomic, proteomic, and clinical data using AI and machine learning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

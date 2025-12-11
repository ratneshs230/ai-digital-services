import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Archival Metadata Extractor',
  description: 'Automatically extract and enrich metadata from scanned archival documents using AI-powered OCR and NLP.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

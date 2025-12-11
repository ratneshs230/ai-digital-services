import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Material Defect AI Detector',
  description: 'AI-powered visual inspection system that identifies defects in construction materials during manufacturing, ensuring quality control.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

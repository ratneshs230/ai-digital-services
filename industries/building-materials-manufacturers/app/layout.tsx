import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Material Defect Detection AI',
  description: 'AI-powered visual inspection system to automatically identify defects in building materials during manufacturing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Site Safety Monitor',
  description: 'Real-time video analysis to detect safety violations and hazards on construction sites.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

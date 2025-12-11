import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seismic Data Interpretation AI',
  description: 'AI-powered platform that automates and enhances seismic data interpretation to identify potential drilling locations more accurately and efficiently.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

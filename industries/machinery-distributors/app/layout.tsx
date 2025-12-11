import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Equipment Recommendation Engine',
  description: 'AI-powered tool to suggest optimal machinery configurations based on customer needs and project specifications.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

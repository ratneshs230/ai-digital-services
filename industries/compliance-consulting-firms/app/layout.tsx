import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RegAlert AI',
  description: 'AI-powered regulatory change monitoring and alert system that helps compliance teams stay ahead of evolving regulations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

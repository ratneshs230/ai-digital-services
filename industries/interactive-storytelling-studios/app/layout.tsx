import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Dialogue Generator',
  description: 'Generates realistic and branching dialogue options based on character profiles, plot points, and player choices, saving writers time and expanding narrativ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

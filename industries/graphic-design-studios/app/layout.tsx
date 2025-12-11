import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brand Style Guide AI',
  description: 'Automatically generates and maintains a comprehensive brand style guide based on a company\'s existing design assets and AI-driven trend analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

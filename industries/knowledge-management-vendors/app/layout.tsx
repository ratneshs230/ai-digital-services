import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Knowledge Gap Finder',
  description: 'Identifies critical knowledge gaps within an organization\'s documentation and expertise, highlighting areas where information is missing or outdated.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

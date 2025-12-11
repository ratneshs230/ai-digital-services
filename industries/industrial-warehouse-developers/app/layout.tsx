import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SiteAI',
  description: 'AI-powered site selection tool that analyzes geographic, economic, and logistical data to identify optimal warehouse development locations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

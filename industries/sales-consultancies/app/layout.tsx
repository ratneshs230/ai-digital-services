import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Sales Playbook Generator',
  description: 'Automatically creates customized sales playbooks based on client industry, target market, and sales goals using AI-powered analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

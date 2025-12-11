import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lease Optimizer AI',
  description: 'AI-powered tool that recommends optimal lease terms and vehicle configurations based on customer needs and market trends.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

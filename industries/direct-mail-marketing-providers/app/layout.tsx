import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Audience Segmentation',
  description: 'Dynamically segment mailing lists based on AI-driven insights into customer behavior and preferences, improving targeting accuracy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Avatar Stylist',
  description: 'Suggests avatar customization options (clothing, accessories, hairstyles) based on user preferences, current trends, and virtual world context.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

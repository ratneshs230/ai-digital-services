import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Product Description Generator',
  description: 'Automatically generate engaging and SEO-optimized product descriptions using AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

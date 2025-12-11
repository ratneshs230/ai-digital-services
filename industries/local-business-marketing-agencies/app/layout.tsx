import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hyperlocal Content Generator',
  description: 'AI-powered content creation tool that automatically generates blog posts, social media updates, and website copy tailored to specific local areas and demog',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

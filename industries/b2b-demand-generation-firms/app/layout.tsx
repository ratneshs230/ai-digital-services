import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Content Personalization Engine',
  description: 'Dynamically tailors content (ads, emails, landing pages) to each prospect based on their real-time behavior and firmographic data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

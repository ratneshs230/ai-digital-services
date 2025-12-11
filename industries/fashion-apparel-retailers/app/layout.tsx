import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StyleAI Advisor',
  description: 'AI-powered personal stylist that provides personalized recommendations based on user preferences, body type, and current trends.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

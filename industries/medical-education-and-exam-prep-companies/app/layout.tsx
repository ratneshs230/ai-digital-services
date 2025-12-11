import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Personalized Study Plan Generator',
  description: 'Creates custom study schedules for medical students based on their strengths, weaknesses, and exam dates using AI-driven analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

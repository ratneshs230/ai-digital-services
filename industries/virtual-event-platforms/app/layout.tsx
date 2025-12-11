import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Networking Matchmaker',
  description: 'Intelligently connects attendees based on their profiles, interests, and real-time event activity to foster relevant networking opportunities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

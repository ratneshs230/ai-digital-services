import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Intake Assistant',
  description: 'Automates patient intake with an AI chatbot that gathers relevant history, assesses initial needs, and matches patients with appropriate therapists.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

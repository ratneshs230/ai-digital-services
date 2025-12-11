import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Threat Hunting Assistant',
  description: 'Augments security analysts with AI to proactively discover hidden threats and anomalies within network traffic and endpoint data.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

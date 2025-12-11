import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Sales Coach',
  description: 'Personalized AI-driven coaching platform that provides real-time feedback and guidance during sales simulations and role-playing exercises.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

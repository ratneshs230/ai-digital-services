import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered PPE Recommendation Engine',
  description: 'Recommends optimal Personal Protective Equipment (PPE) based on job task analysis and environmental hazards using AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

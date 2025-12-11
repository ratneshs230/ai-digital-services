import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Teledermatology Triage',
  description: 'Automated initial assessment of patient-submitted images and symptoms to prioritize urgent cases and streamline virtual consultations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

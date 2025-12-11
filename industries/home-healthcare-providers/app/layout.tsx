import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Medication Adherence Monitor',
  description: 'A smart home device and mobile app that uses computer vision and voice recognition to ensure patients take their medications correctly and on time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

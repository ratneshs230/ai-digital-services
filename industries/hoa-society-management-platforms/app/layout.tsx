import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Rule Violation Detection',
  description: 'Automatically identify and flag potential rule violations using computer vision and machine learning applied to resident-submitted photos and videos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

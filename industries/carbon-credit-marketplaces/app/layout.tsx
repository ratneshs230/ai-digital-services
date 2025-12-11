import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carbon Project Validator AI',
  description: 'AI-powered verification of carbon offset project data, ensuring accuracy and preventing fraud.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

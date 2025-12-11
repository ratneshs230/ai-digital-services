import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Grant Proposal Writer',
  description: 'Automates the creation of grant proposals using AI to match NGO projects with relevant funding opportunities and generate compelling narratives.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

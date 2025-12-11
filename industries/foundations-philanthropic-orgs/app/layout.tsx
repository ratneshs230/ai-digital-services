import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grant Proposal AI Assistant',
  description: 'AI-powered tool that analyzes grant proposals, providing feedback on content, structure, and alignment with foundation priorities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

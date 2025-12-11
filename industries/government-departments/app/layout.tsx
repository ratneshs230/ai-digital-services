import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Citizen Inquiry Assistant',
  description: 'An AI chatbot that provides instant answers to citizen inquiries, reducing wait times and freeing up human agents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

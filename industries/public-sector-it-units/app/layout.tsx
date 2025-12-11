import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Citizen Inquiry Routing & Response',
  description: 'AI-powered chatbot and routing system to handle citizen inquiries and route them to the appropriate department or agent.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

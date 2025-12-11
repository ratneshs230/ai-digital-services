import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Curriculum Personalizer',
  description: 'Dynamically adjusts curriculum content and pace based on individual student learning patterns and needs, ensuring optimal comprehension and engagement.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

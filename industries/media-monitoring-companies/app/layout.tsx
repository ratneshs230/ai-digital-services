import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Content Authenticity Verifier',
  description: 'AI-powered tool to verify the authenticity of media content, detecting deepfakes and manipulated media in real-time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

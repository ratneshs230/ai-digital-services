import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Style Transfer for Branding',
  description: 'Automatically apply consistent visual styles (colors, fonts, transitions) to all videos, ensuring brand alignment and reducing manual adjustments.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

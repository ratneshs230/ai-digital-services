import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Print Optimizer',
  description: 'Automatically optimizes 3D print parameters (speed, temperature, layer height) for given materials and printer models to minimize print time and material w',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

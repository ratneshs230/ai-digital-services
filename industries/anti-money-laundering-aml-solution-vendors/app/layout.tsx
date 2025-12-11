import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered KYC Accelerator',
  description: 'Automates and accelerates the Know Your Customer (KYC) process using AI to verify identities and assess risk more efficiently.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

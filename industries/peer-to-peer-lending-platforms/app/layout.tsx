import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Loan Risk Assessor',
  description: 'Predicts loan default risk more accurately using diverse data sources and machine learning, improving lender ROI and reducing losses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

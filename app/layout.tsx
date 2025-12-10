import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Digital Services | Transform Your Industry with AI',
  description: 'Discover AI-powered solutions tailored for your industry. From healthcare to finance, retail to real estate - explore cutting-edge AI tools that drive business growth.',
  keywords: ['AI', 'artificial intelligence', 'digital services', 'industry solutions', 'automation', 'machine learning'],
  authors: [{ name: 'AI Digital Services' }],
  openGraph: {
    title: 'AI Digital Services | Transform Your Industry with AI',
    description: 'Discover AI-powered solutions tailored for your industry.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

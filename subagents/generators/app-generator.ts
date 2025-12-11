/**
 * Web Application Generator
 * Generates complete, beautiful, animated web applications for each industry
 */

import * as fs from 'fs'
import * as path from 'path'
import { callGemini, generateCode, generateJSON } from '../lib/gemini-client'
import {
  generateColorPalette,
  generateAnimations,
  generateIcon,
  getUnsplashImage,
} from '../tools/image-generator'

export interface IndustrySpec {
  slug: string
  industry: string
  idea: string
  overview: string
  problemItSolves: string
  coreSolution: string
  targetUsers: string
  businessImpact: string
  exampleUseCase: string
  documentation?: any
}

export interface AppConfig {
  name: string
  slug: string
  industry: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
  }
  features: string[]
  animations: string
}

/**
 * Load industry specification from digital-solutions folder
 */
export function loadIndustrySpec(slug: string): IndustrySpec | null {
  const docPath = path.join(
    process.cwd(),
    'digital-solutions',
    slug,
    'DOCUMENTATION.md'
  )
  const specPath = path.join(process.cwd(), 'digital-solutions', slug, 'spec.json')

  if (!fs.existsSync(docPath)) {
    console.error(`Documentation not found for: ${slug}`)
    return null
  }

  const docContent = fs.readFileSync(docPath, 'utf-8')

  // Parse documentation
  const titleMatch = docContent.match(/^#\s+(.+)$/m)
  const industryMatch = docContent.match(/##\s+Industry:\s+(.+)$/m)
  const overviewMatch = docContent.match(/###\s+Overview\n([\s\S]*?)(?=###|$)/)
  const problemMatch = docContent.match(
    /###\s+Problem It Solves\n([\s\S]*?)(?=###|$)/
  )
  const solutionMatch = docContent.match(/###\s+Core Solution\n([\s\S]*?)(?=###|$)/)
  const usersMatch = docContent.match(/###\s+Target Users\n([\s\S]*?)(?=###|$)/)
  const impactMatch = docContent.match(/###\s+Business Impact\n([\s\S]*?)(?=###|$)/)
  const useCaseMatch = docContent.match(
    /###\s+Example Use Case\n([\s\S]*?)(?=###|---|$)/
  )

  let documentation = null
  if (fs.existsSync(specPath)) {
    try {
      documentation = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
    } catch {
      // Ignore parse errors
    }
  }

  return {
    slug,
    industry: industryMatch?.[1]?.trim() || slug,
    idea: titleMatch?.[1]?.trim() || '',
    overview: overviewMatch?.[1]?.trim() || '',
    problemItSolves: problemMatch?.[1]?.trim() || '',
    coreSolution: solutionMatch?.[1]?.trim() || '',
    targetUsers: usersMatch?.[1]?.trim() || '',
    businessImpact: impactMatch?.[1]?.trim() || '',
    exampleUseCase: useCaseMatch?.[1]?.trim() || '',
    documentation,
  }
}

/**
 * Generate unique app configuration based on industry
 */
export async function generateAppConfig(spec: IndustrySpec): Promise<AppConfig> {
  // Generate unique color palette
  const colors = await generateColorPalette(spec.industry, 'professional')

  // Extract features from documentation
  let features: string[] = []
  if (spec.documentation?.services?.[0]?.core_features) {
    features = spec.documentation.services[0].core_features.slice(0, 6)
  } else {
    // Generate features using AI
    const featureResponse = await generateJSON<{ features: string[] }>(
      `Generate 6 key features for a ${spec.industry} AI tool that: ${spec.idea}.
      Return JSON: { "features": ["feature1", "feature2", ...] }`
    )
    features = featureResponse.data?.features || [
      'AI-Powered Analysis',
      'Real-time Processing',
      'Smart Automation',
      'Detailed Reports',
      'Secure Platform',
      'Easy Integration',
    ]
  }

  // Generate custom animations
  const animations = await generateAnimations(spec.industry, [
    'hero',
    'cards',
    'buttons',
    'sections',
  ])

  return {
    name: spec.idea,
    slug: spec.slug,
    industry: spec.industry,
    colors,
    features,
    animations,
  }
}

/**
 * Generate the complete Next.js application
 */
export async function generateWebApp(
  spec: IndustrySpec,
  outputDir: string
): Promise<boolean> {
  console.log(`\n[AppGenerator] Starting generation for: ${spec.slug}`)

  const config = await generateAppConfig(spec)

  // Create directory structure
  const dirs = [
    '',
    'app',
    'app/api',
    'app/api/chat',
    'app/api/generate',
    'app/demo',
    'components',
    'components/ui',
    'lib',
    'public',
  ]

  for (const dir of dirs) {
    const fullPath = path.join(outputDir, dir)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }
  }

  // Generate all files
  await Promise.all([
    generatePackageJson(outputDir, config),
    generateTailwindConfig(outputDir, config),
    generateGlobalStyles(outputDir, config),
    generateLayout(outputDir, config, spec),
    generateHomePage(outputDir, config, spec),
    generateDemoPage(outputDir, config, spec),
    generateChatApi(outputDir, config, spec),
    generateComponents(outputDir, config, spec),
    generateLib(outputDir, config),
    generateNextConfig(outputDir),
    generateTsConfig(outputDir),
    generatePostcssConfig(outputDir),
  ])

  console.log(`[AppGenerator] Completed generation for: ${spec.slug}`)
  return true
}

async function generatePackageJson(dir: string, config: AppConfig): Promise<void> {
  const content = {
    name: `@ai-digital-services/${config.slug}`,
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'framer-motion': '^10.16.0',
      'lucide-react': '^0.294.0',
      clsx: '^2.0.0',
      'tailwind-merge': '^2.0.0',
    },
    devDependencies: {
      typescript: '^5.0.0',
      '@types/react': '^18.2.0',
      '@types/node': '^20.0.0',
      tailwindcss: '^3.4.0',
      autoprefixer: '^10.4.0',
      postcss: '^8.4.0',
    },
  }

  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(content, null, 2)
  )
}

async function generateTailwindConfig(
  dir: string,
  config: AppConfig
): Promise<void> {
  const content = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${config.colors.primary}',
        secondary: '${config.colors.secondary}',
        accent: '${config.colors.accent}',
        background: '${config.colors.background}',
        foreground: '${config.colors.foreground}',
        muted: '${config.colors.muted}',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px ${config.colors.primary}40' },
          '50%': { boxShadow: '0 0 40px ${config.colors.primary}60' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.03\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}
`

  fs.writeFileSync(path.join(dir, 'tailwind.config.js'), content)
}

async function generateGlobalStyles(
  dir: string,
  config: AppConfig
): Promise<void> {
  const content = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: ${config.colors.primary};
  --secondary: ${config.colors.secondary};
  --accent: ${config.colors.accent};
  --background: ${config.colors.background};
  --foreground: ${config.colors.foreground};
  --muted: ${config.colors.muted};
}

body {
  background: var(--background);
  color: var(--foreground);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--background);
}

::-webkit-scrollbar-thumb {
  background: var(--muted);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass effect */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glow effect */
.glow {
  box-shadow: 0 0 30px var(--primary);
}

/* Animated gradient background */
.animated-gradient {
  background: linear-gradient(-45deg, var(--primary), var(--secondary), var(--accent), var(--primary));
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

/* Particle effect container */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: float 8s ease-in-out infinite;
}

${config.animations}
`

  fs.writeFileSync(path.join(dir, 'app', 'globals.css'), content)
}

async function generateLayout(
  dir: string,
  config: AppConfig,
  spec: IndustrySpec
): Promise<void> {
  const content = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '${spec.idea} | ${spec.industry}',
  description: '${spec.overview.slice(0, 160)}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
`

  fs.writeFileSync(path.join(dir, 'app', 'layout.tsx'), content)
}

async function generateHomePage(
  dir: string,
  config: AppConfig,
  spec: IndustrySpec
): Promise<void> {
  const heroImage = getUnsplashImage(spec.industry, 1920, 1080)

  const content = `'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, BarChart, Users, Globe } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FeatureCard } from '@/components/FeatureCard'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { StatsSection } from '@/components/StatsSection'
import { TestimonialSection } from '@/components/TestimonialSection'

const features = ${JSON.stringify(
    config.features.map((f, i) => ({
      title: f.split(':')[0] || f,
      description: f.split(':')[1] || f,
      icon: ['Sparkles', 'Zap', 'Shield', 'BarChart', 'Users', 'Globe'][i % 6],
    })),
    null,
    2
  )}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-Powered ${spec.industry} Solution</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">${spec.idea}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-10"
          >
            ${spec.overview}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Try Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 glass font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: \`\${20 + i * 15}%\`,
                top: \`\${30 + (i % 3) * 20}%\`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The <span className="gradient-text">Problem</span> We Solve
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                ${spec.problemItSolves}
              </p>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Our Solution</h3>
              <p className="text-muted leading-relaxed">
                ${spec.coreSolution}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Everything you need to transform your ${spec.industry.toLowerCase()} operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Example Use Case</h2>
            </div>
            <p className="text-lg text-muted leading-relaxed">
              ${spec.exampleUseCase}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection industry="${spec.industry}" />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="animated-gradient rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of ${spec.industry.toLowerCase()} professionals already using our AI-powered solution.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer industry="${spec.industry}" />
    </div>
  )
}
`

  fs.writeFileSync(path.join(dir, 'app', 'page.tsx'), content)
}

async function generateDemoPage(
  dir: string,
  config: AppConfig,
  spec: IndustrySpec
): Promise<void> {
  const content = `'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft, Send, Loader2, Sparkles, Mic, MicOff,
  Image as ImageIcon, Video, MessageSquare, RefreshCw
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'image' | 'loading'
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\\'m your AI assistant for ${spec.idea}. How can I help you today? You can ask me questions, request analysis, or generate content related to ${spec.industry.toLowerCase()}.',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response || 'Sorry, I could not process that request.' },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateImage = async () => {
    if (isLoading) return

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: 'Generate an image for ${spec.industry}' },
    ])
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'image', prompt: '${spec.industry} ${spec.idea}' }),
      })

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.imageUrl || data.response || 'Image generated successfully!',
          type: data.imageUrl ? 'image' : 'text'
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, could not generate image.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    { label: 'Analyze data', prompt: 'Analyze my ${spec.industry.toLowerCase()} data and provide insights' },
    { label: 'Generate report', prompt: 'Generate a comprehensive ${spec.industry.toLowerCase()} report' },
    { label: 'Get recommendations', prompt: 'What are your recommendations for improving ${spec.industry.toLowerCase()} operations?' },
    { label: 'Explain features', prompt: 'Explain the key features and how they benefit ${spec.industry.toLowerCase()}' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">${spec.idea}</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={\`flex \${message.role === 'user' ? 'justify-end' : 'justify-start'}\`}
              >
                <div
                  className={\`max-w-[80%] rounded-2xl px-6 py-4 \${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'glass'
                  }\`}
                >
                  {message.type === 'image' ? (
                    <img src={message.content} alt="Generated" className="rounded-lg max-w-full" />
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass rounded-2xl px-6 py-4 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-muted">Thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 border-t border-white/10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(action.prompt)
                }}
                className="flex-shrink-0 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 glass rounded-2xl px-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about ${spec.industry.toLowerCase()}..."
                className="flex-1 bg-transparent py-4 outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleGenerateImage}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-primary"
                title="Generate Image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsListening(!isListening)}
                className={\`p-2 rounded-lg transition-colors \${
                  isListening ? 'bg-red-500/20 text-red-500' : 'hover:bg-white/10 text-muted hover:text-primary'
                }\`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
`

  fs.writeFileSync(path.join(dir, 'app', 'demo', 'page.tsx'), content)
}

async function generateChatApi(
  dir: string,
  config: AppConfig,
  spec: IndustrySpec
): Promise<void> {
  const content = `import { NextRequest, NextResponse } from 'next/server'

const API_KEYS = process.env.GEMINI_API_KEYS?.split(',') || []
let currentKeyIndex = 0

function getNextKey(): string {
  if (API_KEYS.length === 0) return ''
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length
  return API_KEYS[currentKeyIndex].trim()
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const apiKey = getNextKey()

    if (!apiKey) {
      // Return mock response if no API key
      return NextResponse.json({
        response: generateMockResponse(message),
      })
    }

    const systemPrompt = \`You are an AI assistant for ${spec.idea} in the ${spec.industry} industry.

About this solution:
${spec.overview}

Problem solved: ${spec.problemItSolves}

Core solution: ${spec.coreSolution}

Target users: ${spec.targetUsers}

Be helpful, professional, and knowledgeable about ${spec.industry.toLowerCase()}.
Provide actionable insights and recommendations.\`

    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=\${apiKey}\`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nUser: \${message}\` }] },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Gemini API error')
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      response: 'I apologize, but I encountered an error. Please try again.',
    })
  }
}

function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('analyze') || lowerMessage.includes('analysis')) {
    return \`Based on my analysis of your ${spec.industry.toLowerCase()} data:

**Key Findings:**
1. Current performance metrics show room for optimization
2. Several areas could benefit from AI-powered automation
3. Data patterns suggest opportunities for predictive insights

**Recommendations:**
- Implement automated monitoring systems
- Leverage AI for predictive analytics
- Optimize workflows based on data-driven insights

Would you like me to elaborate on any of these points?\`
  }

  if (lowerMessage.includes('report') || lowerMessage.includes('generate')) {
    return \`Here's your ${spec.industry} analysis report:

**Executive Summary:**
${spec.overview}

**Current Challenges:**
${spec.problemItSolves}

**Proposed Solution:**
${spec.coreSolution}

**Expected Impact:**
${spec.businessImpact}

**Next Steps:**
1. Schedule a detailed consultation
2. Define specific KPIs and metrics
3. Begin implementation planning

Would you like me to expand on any section?\`
  }

  return \`Thank you for your question about ${spec.industry.toLowerCase()}.

${spec.coreSolution}

Our solution helps ${spec.targetUsers.toLowerCase()} by addressing key challenges in the industry.

**How can I help you further?**
- Analyze your specific data
- Generate detailed reports
- Provide recommendations
- Explain our features

Just let me know what you'd like to explore!\`
}
`

  fs.writeFileSync(path.join(dir, 'app', 'api', 'chat', 'route.ts'), content)

  // Also create generate API
  const generateApiContent = `import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { type, prompt } = await request.json()

    if (type === 'image') {
      // Generate placeholder or SVG
      const svgContent = \`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${config.colors.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${config.colors.secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="16" font-family="Arial">AI Generated Visual</text>
      </svg>\`

      const base64 = Buffer.from(svgContent).toString('base64')
      return NextResponse.json({
        imageUrl: \`data:image/svg+xml;base64,\${base64}\`,
      })
    }

    return NextResponse.json({ response: 'Content generated successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
`

  fs.writeFileSync(
    path.join(dir, 'app', 'api', 'generate', 'route.ts'),
    generateApiContent
  )
}

async function generateComponents(
  dir: string,
  config: AppConfig,
  spec: IndustrySpec
): Promise<void> {
  // Header component
  const headerContent = `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass mx-4 mt-4 rounded-2xl px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:block">${spec.idea.split(' ').slice(0, 3).join(' ')}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted hover:text-foreground transition-colors">Features</a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">About</a>
            <Link
              href="/demo"
              className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all hover:scale-105"
            >
              Try Demo
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mx-4 mt-2 rounded-2xl p-6"
        >
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-muted hover:text-foreground transition-colors">Features</a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">About</a>
            <Link
              href="/demo"
              className="px-5 py-3 bg-primary text-white rounded-full text-center hover:bg-primary/90"
            >
              Try Demo
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}
`

  fs.writeFileSync(path.join(dir, 'components', 'Header.tsx'), headerContent)

  // Footer component
  const footerContent = `import { Sparkles } from 'lucide-react'

export function Footer({ industry }: { industry: string }) {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">${spec.idea.split(' ').slice(0, 3).join(' ')}</span>
          </div>

          <div className="flex gap-8 text-sm text-muted">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} AI Digital Services
          </p>
        </div>
      </div>
    </footer>
  )
}
`

  fs.writeFileSync(path.join(dir, 'components', 'Footer.tsx'), footerContent)

  // Feature Card component
  const featureCardContent = `'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, BarChart, Users, Globe, LucideIcon } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  Sparkles, Zap, Shield, BarChart, Users, Globe
}

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  const Icon = icons[icon] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass rounded-2xl p-6 hover:border-primary/50 transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
`

  fs.writeFileSync(
    path.join(dir, 'components', 'FeatureCard.tsx'),
    featureCardContent
  )

  // Animated Background component
  const animatedBgContent = `'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: \`\${particle.x}%\`,
            top: \`\${particle.y}%\`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + particle.delay,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
`

  fs.writeFileSync(
    path.join(dir, 'components', 'AnimatedBackground.tsx'),
    animatedBgContent
  )

  // Stats Section component
  const statsSectionContent = `'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const stats = [
  { value: 10000, suffix: '+', label: 'Active Users' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 50, suffix: 'M+', label: 'Processed' },
  { value: 24, suffix: '/7', label: 'Support' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {value % 1 === 0 ? count.toLocaleString() : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 px-6 border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
`

  fs.writeFileSync(
    path.join(dir, 'components', 'StatsSection.tsx'),
    statsSectionContent
  )

  // Testimonial Section component
  const testimonialContent = `'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "This AI solution has completely transformed how we operate. The efficiency gains are remarkable.",
    author: "Sarah Johnson",
    role: "Operations Director",
    rating: 5,
  },
  {
    quote: "Incredible accuracy and speed. Our team can now focus on strategic decisions instead of manual tasks.",
    author: "Michael Chen",
    role: "Technology Lead",
    rating: 5,
  },
  {
    quote: "The best investment we've made this year. ROI was visible within the first month.",
    author: "Emily Rodriguez",
    role: "CEO",
    rating: 5,
  },
]

export function TestimonialSection({ industry }: { industry: string }) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">{industry}</span> Leaders
          </h2>
          <p className="text-muted">See what our customers have to say</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
`

  fs.writeFileSync(
    path.join(dir, 'components', 'TestimonialSection.tsx'),
    testimonialContent
  )
}

async function generateLib(dir: string, config: AppConfig): Promise<void> {
  const utilsContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

  fs.writeFileSync(path.join(dir, 'lib', 'utils.ts'), utilsContent)
}

async function generateNextConfig(dir: string): Promise<void> {
  const content = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'placehold.co'],
  },
}

module.exports = nextConfig
`

  fs.writeFileSync(path.join(dir, 'next.config.js'), content)
}

async function generateTsConfig(dir: string): Promise<void> {
  const content = {
    compilerOptions: {
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./*'],
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }

  fs.writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify(content, null, 2))
}

async function generatePostcssConfig(dir: string): Promise<void> {
  const content = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

  fs.writeFileSync(path.join(dir, 'postcss.config.js'), content)
}

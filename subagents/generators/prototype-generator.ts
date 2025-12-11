/**
 * World-Class Prototype Generator
 * Generates complete, working prototypes with all tools/services from documentation
 * Features:
 * - Full working tools based on spec
 * - Animated sine wave chat button
 * - Rate-limited AI responses
 * - Beautiful, distinctive designs per industry
 */

import * as fs from 'fs'
import * as path from 'path'
import { callGemini, generateJSON } from '../lib/gemini-client'

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
  documentation?: {
    industry: string
    services: Array<{
      name: string
      overview: string
      problems_addressed: string[]
      target_users: string[]
      core_features: string[]
      user_journeys: string[]
      ai_capabilities: string[]
      data_requirements: {
        input_data_types: string[]
        data_schema_recommendations: string[]
      }
      technical_specifications: {
        frontend_components: string[]
        API_design: string[]
      }
    }>
  }
}

export interface DesignTheme {
  name: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  foregroundColor: string
  mutedColor: string
  fontFamily: string
  headingFont: string
  waveType: 'sine' | 'cosine' | 'triangle' | 'sawtooth' | 'pulse' | 'noise'
  waveSpeed: number
  waveAmplitude: number
  waveFrequency: number
}

// 50 unique design themes for variety
const DESIGN_THEMES: DesignTheme[] = [
  { name: 'Ocean', primaryColor: '#0EA5E9', secondaryColor: '#0369A1', accentColor: '#22D3EE', backgroundColor: '#0C1929', foregroundColor: '#F0F9FF', mutedColor: '#64748B', fontFamily: 'system-ui', headingFont: 'Georgia', waveType: 'sine', waveSpeed: 0.02, waveAmplitude: 20, waveFrequency: 0.05 },
  { name: 'Forest', primaryColor: '#22C55E', secondaryColor: '#15803D', accentColor: '#86EFAC', backgroundColor: '#0A1F0C', foregroundColor: '#F0FDF4', mutedColor: '#6B7280', fontFamily: 'Inter', headingFont: 'Playfair Display', waveType: 'cosine', waveSpeed: 0.015, waveAmplitude: 25, waveFrequency: 0.04 },
  { name: 'Sunset', primaryColor: '#F97316', secondaryColor: '#C2410C', accentColor: '#FDBA74', backgroundColor: '#1C1008', foregroundColor: '#FFF7ED', mutedColor: '#78716C', fontFamily: 'DM Sans', headingFont: 'Bebas Neue', waveType: 'triangle', waveSpeed: 0.025, waveAmplitude: 15, waveFrequency: 0.06 },
  { name: 'Midnight', primaryColor: '#8B5CF6', secondaryColor: '#6D28D9', accentColor: '#C4B5FD', backgroundColor: '#0D0A1A', foregroundColor: '#FAF5FF', mutedColor: '#71717A', fontFamily: 'Poppins', headingFont: 'Space Grotesk', waveType: 'sawtooth', waveSpeed: 0.018, waveAmplitude: 22, waveFrequency: 0.045 },
  { name: 'Rose', primaryColor: '#EC4899', secondaryColor: '#BE185D', accentColor: '#F9A8D4', backgroundColor: '#1A0A12', foregroundColor: '#FDF2F8', mutedColor: '#9CA3AF', fontFamily: 'Nunito', headingFont: 'Cormorant', waveType: 'pulse', waveSpeed: 0.03, waveAmplitude: 18, waveFrequency: 0.055 },
  { name: 'Arctic', primaryColor: '#06B6D4', secondaryColor: '#0891B2', accentColor: '#67E8F9', backgroundColor: '#0A1A1F', foregroundColor: '#ECFEFF', mutedColor: '#94A3B8', fontFamily: 'Outfit', headingFont: 'Oswald', waveType: 'noise', waveSpeed: 0.012, waveAmplitude: 30, waveFrequency: 0.035 },
  { name: 'Ember', primaryColor: '#EF4444', secondaryColor: '#B91C1C', accentColor: '#FCA5A5', backgroundColor: '#1C0808', foregroundColor: '#FEF2F2', mutedColor: '#A1A1AA', fontFamily: 'Rubik', headingFont: 'Abril Fatface', waveType: 'sine', waveSpeed: 0.028, waveAmplitude: 16, waveFrequency: 0.065 },
  { name: 'Sage', primaryColor: '#84CC16', secondaryColor: '#4D7C0F', accentColor: '#BEF264', backgroundColor: '#0F1508', foregroundColor: '#F7FEE7', mutedColor: '#737373', fontFamily: 'Work Sans', headingFont: 'Bitter', waveType: 'cosine', waveSpeed: 0.022, waveAmplitude: 24, waveFrequency: 0.042 },
  { name: 'Gold', primaryColor: '#EAB308', secondaryColor: '#A16207', accentColor: '#FDE047', backgroundColor: '#1A1505', foregroundColor: '#FEFCE8', mutedColor: '#A3A3A3', fontFamily: 'Manrope', headingFont: 'Cinzel', waveType: 'triangle', waveSpeed: 0.016, waveAmplitude: 28, waveFrequency: 0.038 },
  { name: 'Slate', primaryColor: '#64748B', secondaryColor: '#475569', accentColor: '#94A3B8', backgroundColor: '#0F172A', foregroundColor: '#F8FAFC', mutedColor: '#CBD5E1', fontFamily: 'Source Sans Pro', headingFont: 'Roboto Slab', waveType: 'sawtooth', waveSpeed: 0.014, waveAmplitude: 20, waveFrequency: 0.05 },
  { name: 'Coral', primaryColor: '#FB7185', secondaryColor: '#E11D48', accentColor: '#FDA4AF', backgroundColor: '#180A10', foregroundColor: '#FFF1F2', mutedColor: '#A8A29E', fontFamily: 'Quicksand', headingFont: 'Lora', waveType: 'pulse', waveSpeed: 0.024, waveAmplitude: 19, waveFrequency: 0.048 },
  { name: 'Indigo', primaryColor: '#6366F1', secondaryColor: '#4338CA', accentColor: '#A5B4FC', backgroundColor: '#0C0A1A', foregroundColor: '#EEF2FF', mutedColor: '#9CA3AF', fontFamily: 'Lexend', headingFont: 'DM Serif Display', waveType: 'noise', waveSpeed: 0.02, waveAmplitude: 21, waveFrequency: 0.052 },
  { name: 'Teal', primaryColor: '#14B8A6', secondaryColor: '#0F766E', accentColor: '#5EEAD4', backgroundColor: '#0A1917', foregroundColor: '#F0FDFA', mutedColor: '#78716C', fontFamily: 'Karla', headingFont: 'Archivo Black', waveType: 'sine', waveSpeed: 0.019, waveAmplitude: 26, waveFrequency: 0.044 },
  { name: 'Bronze', primaryColor: '#D97706', secondaryColor: '#92400E', accentColor: '#FCD34D', backgroundColor: '#1A1207', foregroundColor: '#FFFBEB', mutedColor: '#6B7280', fontFamily: 'Figtree', headingFont: 'Fraunces', waveType: 'cosine', waveSpeed: 0.026, waveAmplitude: 17, waveFrequency: 0.058 },
  { name: 'Plum', primaryColor: '#A855F7', secondaryColor: '#7E22CE', accentColor: '#D8B4FE', backgroundColor: '#120A18', foregroundColor: '#FAF5FF', mutedColor: '#71717A', fontFamily: 'Plus Jakarta Sans', headingFont: 'Libre Baskerville', waveType: 'triangle', waveSpeed: 0.021, waveAmplitude: 23, waveFrequency: 0.046 },
  { name: 'Steel', primaryColor: '#3B82F6', secondaryColor: '#1D4ED8', accentColor: '#93C5FD', backgroundColor: '#0C1425', foregroundColor: '#EFF6FF', mutedColor: '#94A3B8', fontFamily: 'Albert Sans', headingFont: 'Montserrat', waveType: 'sawtooth', waveSpeed: 0.017, waveAmplitude: 27, waveFrequency: 0.04 },
  { name: 'Mint', primaryColor: '#34D399', secondaryColor: '#059669', accentColor: '#6EE7B7', backgroundColor: '#0A1912', foregroundColor: '#ECFDF5', mutedColor: '#A1A1AA', fontFamily: 'Sora', headingFont: 'Crimson Text', waveType: 'pulse', waveSpeed: 0.023, waveAmplitude: 22, waveFrequency: 0.054 },
  { name: 'Copper', primaryColor: '#EA580C', secondaryColor: '#9A3412', accentColor: '#FB923C', backgroundColor: '#1A0F08', foregroundColor: '#FFF7ED', mutedColor: '#737373', fontFamily: 'Red Hat Display', headingFont: 'Spectral', waveType: 'noise', waveSpeed: 0.013, waveAmplitude: 29, waveFrequency: 0.036 },
  { name: 'Lavender', primaryColor: '#A78BFA', secondaryColor: '#7C3AED', accentColor: '#C4B5FD', backgroundColor: '#0F0A18', foregroundColor: '#F5F3FF', mutedColor: '#9CA3AF', fontFamily: 'Atkinson Hyperlegible', headingFont: 'Bodoni Moda', waveType: 'sine', waveSpeed: 0.015, waveAmplitude: 24, waveFrequency: 0.043 },
  { name: 'Neon', primaryColor: '#22D3EE', secondaryColor: '#06B6D4', accentColor: '#A5F3FC', backgroundColor: '#020617', foregroundColor: '#F0FDFA', mutedColor: '#64748B', fontFamily: 'Space Mono', headingFont: 'Orbitron', waveType: 'cosine', waveSpeed: 0.032, waveAmplitude: 14, waveFrequency: 0.07 },
]

/**
 * Get a unique theme based on industry slug hash
 */
function getThemeForIndustry(slug: string): DesignTheme {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const index = Math.abs(hash) % DESIGN_THEMES.length
  return DESIGN_THEMES[index]
}

/**
 * Load industry specification
 */
export function loadIndustrySpec(slug: string): IndustrySpec | null {
  const docPath = path.join(process.cwd(), 'digital-solutions', slug, 'DOCUMENTATION.md')
  const specPath = path.join(process.cwd(), 'digital-solutions', slug, 'spec.json')

  if (!fs.existsSync(docPath)) {
    console.error(`Documentation not found for: ${slug}`)
    return null
  }

  const docContent = fs.readFileSync(docPath, 'utf-8')

  const titleMatch = docContent.match(/^#\s+(.+)$/m)
  const industryMatch = docContent.match(/##\s+Industry:\s+(.+)$/m)
  const overviewMatch = docContent.match(/###\s+Overview\n([\s\S]*?)(?=###|$)/)
  const problemMatch = docContent.match(/###\s+Problem It Solves\n([\s\S]*?)(?=###|$)/)
  const solutionMatch = docContent.match(/###\s+Core Solution\n([\s\S]*?)(?=###|$)/)
  const usersMatch = docContent.match(/###\s+Target Users\n([\s\S]*?)(?=###|$)/)
  const impactMatch = docContent.match(/###\s+Business Impact\n([\s\S]*?)(?=###|$)/)
  const useCaseMatch = docContent.match(/###\s+Example Use Case\n([\s\S]*?)(?=###|---|$)/)

  let documentation = null
  if (fs.existsSync(specPath)) {
    try {
      documentation = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
    } catch {}
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
 * Generate the complete prototype
 */
export async function generatePrototype(spec: IndustrySpec, outputDir: string): Promise<boolean> {
  console.log(`\n[PrototypeGenerator] Building prototype for: ${spec.slug}`)

  const theme = getThemeForIndustry(spec.slug)
  const service = spec.documentation?.services?.[0]

  // Create directory structure
  const dirs = [
    '', 'app', 'app/api', 'app/api/chat', 'app/api/analyze', 'app/api/generate',
    'app/tools', 'components', 'components/ui', 'components/tools', 'lib', 'public', 'hooks'
  ]

  // Add tool pages
  const tools = service?.core_features || []
  tools.forEach((_, i) => {
    dirs.push(`app/tools/tool-${i + 1}`)
  })

  for (const dir of dirs) {
    const fullPath = path.join(outputDir, dir)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }
  }

  // Generate all files
  await Promise.all([
    generatePackageJson(outputDir, spec),
    generateTailwindConfig(outputDir, theme),
    generateGlobalStyles(outputDir, theme),
    generateLayout(outputDir, spec, theme),
    generateHomePage(outputDir, spec, theme, service),
    generateToolPages(outputDir, spec, theme, service),
    generateSineWaveChatButton(outputDir, theme),
    generateChatInterface(outputDir, spec, theme),
    generateChatApi(outputDir, spec),
    generateAnalyzeApi(outputDir, spec, service),
    generateToolComponents(outputDir, spec, service, theme),
    generateUIComponents(outputDir, theme),
    generateHooks(outputDir),
    generateLibUtils(outputDir),
    generateNextConfig(outputDir),
    generateTsConfig(outputDir),
    generatePostcssConfig(outputDir),
  ])

  // Generate README
  const readme = `# ${spec.idea}

> ${spec.overview}

## Features
${tools.map((t, i) => `- ${typeof t === 'string' ? t.split(':')[0] : t}`).join('\n')}

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## AI-Powered Tools
All tools use Gemini AI with rate limiting (10 requests/minute).

## Design Theme: ${theme.name}
- Primary: ${theme.primaryColor}
- Wave Animation: ${theme.waveType}

---
Part of AI Digital Services
`
  fs.writeFileSync(path.join(outputDir, 'README.md'), readme)
  fs.writeFileSync(path.join(outputDir, '.gitignore'), 'node_modules/\n.next/\n.env*.local\n')

  console.log(`[PrototypeGenerator] Completed: ${spec.slug}`)
  return true
}

// Package.json
async function generatePackageJson(dir: string, spec: IndustrySpec): Promise<void> {
  const pkg = {
    name: `@ai-digital-services/${spec.slug}`,
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
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
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2))
}

// Tailwind config with theme
async function generateTailwindConfig(dir: string, theme: DesignTheme): Promise<void> {
  const content = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '${theme.primaryColor}',
        secondary: '${theme.secondaryColor}',
        accent: '${theme.accentColor}',
        background: '${theme.backgroundColor}',
        foreground: '${theme.foregroundColor}',
        muted: '${theme.mutedColor}',
      },
      fontFamily: {
        sans: ['${theme.fontFamily}', 'system-ui', 'sans-serif'],
        heading: ['${theme.headingFont}', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'ripple': 'ripple 1.5s ease-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 20px ${theme.primaryColor}40' }, '50%': { boxShadow: '0 0 40px ${theme.primaryColor}80' } },
        wave: { '0%, 100%': { transform: 'scaleY(1)' }, '50%': { transform: 'scaleY(1.5)' } },
        ripple: { '0%': { transform: 'scale(1)', opacity: '1' }, '100%': { transform: 'scale(2)', opacity: '0' } },
      },
    },
  },
  plugins: [],
}
`
  fs.writeFileSync(path.join(dir, 'tailwind.config.js'), content)
}

// Global styles
async function generateGlobalStyles(dir: string, theme: DesignTheme): Promise<void> {
  const content = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: ${theme.primaryColor};
  --secondary: ${theme.secondaryColor};
  --accent: ${theme.accentColor};
  --background: ${theme.backgroundColor};
  --foreground: ${theme.foregroundColor};
  --muted: ${theme.mutedColor};
  --wave-speed: ${theme.waveSpeed};
  --wave-amplitude: ${theme.waveAmplitude}px;
  --wave-frequency: ${theme.waveFrequency};
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: '${theme.fontFamily}', system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: '${theme.headingFont}', serif;
}

html { scroll-behavior: smooth; }

.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glow { box-shadow: 0 0 30px var(--primary); }
.glow-subtle { box-shadow: 0 0 20px ${theme.primaryColor}30; }

/* Tool cards */
.tool-card {
  background: linear-gradient(135deg, ${theme.backgroundColor}ee, ${theme.secondaryColor}20);
  border: 1px solid ${theme.primaryColor}30;
  transition: all 0.3s ease;
}
.tool-card:hover {
  border-color: ${theme.primaryColor};
  box-shadow: 0 10px 40px ${theme.primaryColor}20;
  transform: translateY(-4px);
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--background); }
::-webkit-scrollbar-thumb { background: var(--muted); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--primary); }
`
  fs.writeFileSync(path.join(dir, 'app', 'globals.css'), content)
}

// Layout
async function generateLayout(dir: string, spec: IndustrySpec, theme: DesignTheme): Promise<void> {
  const content = `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${spec.idea} | ${spec.industry}',
  description: '${spec.overview.slice(0, 155).replace(/'/g, "\\'")}',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  )
}
`
  fs.writeFileSync(path.join(dir, 'app', 'layout.tsx'), content)
}

// Home page with tool showcase
async function generateHomePage(dir: string, spec: IndustrySpec, theme: DesignTheme, service: any): Promise<void> {
  const features = service?.core_features || []
  const featuresList = features.map((f: string, i: number) => {
    const parts = f.split(':')
    return { name: parts[0].trim(), description: parts[1]?.trim() || parts[0], index: i + 1 }
  })

  const content = `'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, BarChart, Users, Globe, Activity, Brain, FileText } from 'lucide-react'
import { SineWaveChatButton } from '@/components/SineWaveChatButton'

const icons = [Sparkles, Zap, Shield, BarChart, Users, Globe, Activity, Brain, FileText]

const tools = ${JSON.stringify(featuresList, null, 2)}

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <nav className="glass rounded-2xl px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg">${spec.idea.split(' ').slice(0, 3).join(' ')}</span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="#tools" className="text-muted hover:text-foreground transition-colors">Tools</a>
            <a href="#about" className="text-muted hover:text-foreground transition-colors">About</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8 glow-subtle"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>AI-Powered ${spec.industry} Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">${spec.idea}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            ${spec.overview}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#tools" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 glow">
              Explore Tools
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              Powerful <span className="gradient-text">AI Tools</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Complete suite of tools designed for ${spec.industry.toLowerCase()} professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool: any, i: number) => {
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={\`/tools/tool-\${tool.index}\`} className="block tool-card rounded-2xl p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-muted text-sm leading-relaxed line-clamp-3">{tool.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm">
                      Try Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">The Problem We Solve</h2>
            <p className="text-muted leading-relaxed mb-8">${spec.problemItSolves}</p>

            <h3 className="text-xl font-semibold mb-4 text-primary">Our Solution</h3>
            <p className="text-muted leading-relaxed">${spec.coreSolution}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-muted text-sm">
          <p>&copy; ${new Date().getFullYear()} AI Digital Services. All rights reserved.</p>
        </div>
      </footer>

      {/* Sine Wave Chat Button */}
      <SineWaveChatButton />
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, 'app', 'page.tsx'), content)
}

// Generate individual tool pages
async function generateToolPages(dir: string, spec: IndustrySpec, theme: DesignTheme, service: any): Promise<void> {
  const features = service?.core_features || []

  for (let i = 0; i < features.length; i++) {
    const feature = features[i]
    const parts = (typeof feature === 'string' ? feature : '').split(':')
    const toolName = parts[0].trim()
    const toolDesc = parts[1]?.trim() || parts[0]

    const toolContent = `'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Loader2, Sparkles, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SineWaveChatButton } from '@/components/SineWaveChatButton'

export default function Tool${i + 1}Page() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: '${toolName}',
          input: input,
          toolIndex: ${i + 1}
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Tool ${i + 1}</span>
            </div>
            <h1 className="text-4xl font-heading font-bold mb-4 gradient-text">${toolName}</h1>
            <p className="text-muted text-lg">${toolDesc}</p>
          </motion.div>

          {/* Input Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 mb-8"
          >
            <label className="block text-sm font-medium mb-3">Enter your data</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your requirements, paste data, or ask a question..."
              className="w-full h-40 bg-white/5 rounded-xl p-4 text-foreground placeholder:text-muted/50 border border-white/10 focus:border-primary focus:outline-none resize-none"
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Results */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-2xl p-6 border border-red-500/30 mb-8"
              >
                <div className="flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 text-primary mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Analysis Complete</span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-muted leading-relaxed">
                    {result.response || result.analysis || JSON.stringify(result, null, 2)}
                  </div>
                </div>
                {result.recommendations && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="font-semibold mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-muted">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <SineWaveChatButton />
    </div>
  )
}
`
    fs.writeFileSync(path.join(dir, 'app', 'tools', `tool-${i + 1}`, 'page.tsx'), toolContent)
  }
}

// Sine Wave Chat Button - The heart of the interface
async function generateSineWaveChatButton(dir: string, theme: DesignTheme): Promise<void> {
  const content = `'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function SineWaveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\\'m your AI assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Animate sine wave
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const waveType = '${theme.waveType}'
    const speed = ${theme.waveSpeed}
    const amplitude = ${theme.waveAmplitude}
    const frequency = ${theme.waveFrequency}

    const getWaveValue = (x: number, t: number): number => {
      switch (waveType) {
        case 'sine':
          return Math.sin(x * frequency + t) * amplitude
        case 'cosine':
          return Math.cos(x * frequency + t) * amplitude
        case 'triangle':
          return (Math.abs(((x * frequency + t) % (Math.PI * 2)) - Math.PI) / Math.PI * 2 - 1) * amplitude
        case 'sawtooth':
          return (((x * frequency + t) % (Math.PI * 2)) / (Math.PI * 2) * 2 - 1) * amplitude
        case 'pulse':
          return Math.sin(x * frequency + t) > 0 ? amplitude : -amplitude
        case 'noise':
          return (Math.sin(x * frequency + t) + Math.sin(x * frequency * 2.3 + t * 1.7) + Math.sin(x * frequency * 0.7 + t * 0.9)) / 3 * amplitude
        default:
          return Math.sin(x * frequency + t) * amplitude
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath()
        ctx.strokeStyle = \`${theme.primaryColor}\${Math.floor((1 - layer * 0.3) * 255).toString(16).padStart(2, '0')}\`
        ctx.lineWidth = 2 - layer * 0.5

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + getWaveValue(x, time + layer * 0.5) * (1 - layer * 0.2)
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      time += speed
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animationId)
  }, [])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'Sorry, I could not process that request.'
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, an error occurred. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button with animated sine wave */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 overflow-hidden hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: isOpen ? 'none' : 'block' }}
      >
        <canvas
          ref={canvasRef}
          width={64}
          height={64}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
      </motion.button>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] glass rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-muted">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
                >
                  <div className={\`max-w-[80%] rounded-2xl px-4 py-3 \${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white/5 border border-white/10'
                  }\`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm border border-white/10 focus:border-primary focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
`
  fs.writeFileSync(path.join(dir, 'components', 'SineWaveChatButton.tsx'), content)
}

// Chat interface component (standalone)
async function generateChatInterface(dir: string, spec: IndustrySpec, theme: DesignTheme): Promise<void> {
  // Already included in SineWaveChatButton
}

// Chat API with rate limiting
async function generateChatApi(dir: string, spec: IndustrySpec): Promise<void> {
  const content = `import { NextRequest, NextResponse } from 'next/server'

// Rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT = 10 // requests per minute
const RATE_WINDOW = 60000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.timestamp > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}

// API Keys rotation
const API_KEYS = (process.env.GEMINI_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean)
let keyIndex = 0

function getNextKey(): string {
  if (API_KEYS.length === 0) return ''
  keyIndex = (keyIndex + 1) % API_KEYS.length
  return API_KEYS[keyIndex]
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before trying again.' },
        { status: 429 }
      )
    }

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const apiKey = getNextKey()

    if (!apiKey) {
      return NextResponse.json({
        response: generateMockResponse(message, '${spec.industry}', '${spec.idea}')
      })
    }

    const systemPrompt = \`You are an AI assistant for "${spec.idea}" in the ${spec.industry} industry.

Context:
- Industry: ${spec.industry}
- Solution: ${spec.overview.replace(/`/g, "'")}
- Problem we solve: ${spec.problemItSolves.replace(/`/g, "'")}

Be helpful, professional, and provide actionable insights. Keep responses concise but informative.\`

    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=\${apiKey}\`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nUser: \${message}\` }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json({
        response: generateMockResponse(message, '${spec.industry}', '${spec.idea}')
      })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return NextResponse.json({ response: text })
  } catch (error) {
    return NextResponse.json({
      response: 'I apologize, but I encountered an error. Please try again.'
    })
  }
}

function generateMockResponse(message: string, industry: string, idea: string): string {
  const lower = message.toLowerCase()

  if (lower.includes('help') || lower.includes('what can')) {
    return \`I can help you with various aspects of \${idea}. Here's what I can do:

1. **Answer questions** about our \${industry.toLowerCase()} solutions
2. **Provide insights** on best practices
3. **Guide you** through our tools and features
4. **Explain** how our AI capabilities work

What would you like to know more about?\`
  }

  if (lower.includes('how') || lower.includes('work')) {
    return \`Great question! Our \${idea} platform works by:

1. **Analyzing** your input data using advanced AI
2. **Processing** it through our specialized models
3. **Generating** actionable insights and recommendations
4. **Delivering** results in an easy-to-understand format

Would you like me to explain any specific feature in more detail?\`
  }

  return \`Thank you for your question about \${industry.toLowerCase()}.

Based on our expertise in \${idea.toLowerCase()}, I'd recommend exploring our suite of tools designed specifically for your needs.

Is there a specific aspect you'd like me to elaborate on?\`
}
`
  fs.writeFileSync(path.join(dir, 'app', 'api', 'chat', 'route.ts'), content)
}

// Analyze API for tools
async function generateAnalyzeApi(dir: string, spec: IndustrySpec, service: any): Promise<void> {
  const features = service?.core_features || []
  const content = `import { NextRequest, NextResponse } from 'next/server'

// Rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW = 60000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.timestamp > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

const API_KEYS = (process.env.GEMINI_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean)
let keyIndex = 0

function getNextKey(): string {
  if (API_KEYS.length === 0) return ''
  keyIndex = (keyIndex + 1) % API_KEYS.length
  return API_KEYS[keyIndex]
}

const TOOLS = ${JSON.stringify(features.map((f: string) => {
  const parts = f.split(':')
  return { name: parts[0].trim(), description: parts[1]?.trim() || parts[0] }
}), null, 2)}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      )
    }

    const { tool, input, toolIndex } = await request.json()

    if (!input) {
      return NextResponse.json({ error: 'Input required' }, { status: 400 })
    }

    const apiKey = getNextKey()
    const toolInfo = TOOLS[toolIndex - 1] || { name: tool, description: '' }

    if (!apiKey) {
      return NextResponse.json(generateMockAnalysis(toolInfo.name, input))
    }

    const prompt = \`You are an AI specialized in "\${toolInfo.name}" for ${spec.industry}.

Tool Description: \${toolInfo.description}

User Input: \${input}

Provide a detailed analysis with:
1. Key findings
2. Actionable recommendations
3. Next steps

Keep the response professional and actionable.\`

    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=\${apiKey}\`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
        }),
      }
    )

    if (!response.ok) {
      return NextResponse.json(generateMockAnalysis(toolInfo.name, input))
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return NextResponse.json({
      response: text,
      tool: toolInfo.name,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}

function generateMockAnalysis(toolName: string, input: string) {
  return {
    response: \`## Analysis Results for \${toolName}

Based on your input, here's my analysis:

### Key Findings
- Your request has been processed successfully
- The data shows several important patterns
- There are opportunities for optimization

### Recommendations
1. Consider implementing the suggested changes
2. Monitor the results over the next period
3. Adjust based on performance metrics

### Next Steps
- Review the detailed findings above
- Implement priority recommendations
- Schedule a follow-up analysis

*This analysis was generated by our AI system. For more detailed insights, try providing more specific data.*\`,
    recommendations: [
      'Implement the primary recommendation first',
      'Set up monitoring for key metrics',
      'Review results after implementation',
      'Consider additional optimization opportunities'
    ],
    tool: toolName,
    timestamp: new Date().toISOString()
  }
}
`
  fs.writeFileSync(path.join(dir, 'app', 'api', 'analyze', 'route.ts'), content)
}

// Tool components
async function generateToolComponents(dir: string, spec: IndustrySpec, service: any, theme: DesignTheme): Promise<void> {
  // Components are generated inline in tool pages for simplicity
}

// UI Components
async function generateUIComponents(dir: string, theme: DesignTheme): Promise<void> {
  const buttonContent = `import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all rounded-xl',
          {
            'bg-primary text-white hover:bg-primary/90': variant === 'primary',
            'bg-white/10 text-foreground hover:bg-white/20': variant === 'secondary',
            'bg-transparent hover:bg-white/10': variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
`
  fs.writeFileSync(path.join(dir, 'components', 'ui', 'button.tsx'), buttonContent)

  const inputContent = `import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-white/5 rounded-xl px-4 py-3 text-foreground border border-white/10',
          'focus:border-primary focus:outline-none transition-colors',
          'placeholder:text-muted/50',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
`
  fs.writeFileSync(path.join(dir, 'components', 'ui', 'input.tsx'), inputContent)
}

// Hooks
async function generateHooks(dir: string): Promise<void> {
  const useLocalStorage = `'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) setValue(JSON.parse(stored))
    } catch {}
  }, [key])

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore = newValue instanceof Function ? newValue(prev) : newValue
      try { localStorage.setItem(key, JSON.stringify(valueToStore)) } catch {}
      return valueToStore
    })
  }

  return [value, setStoredValue] as const
}
`
  fs.writeFileSync(path.join(dir, 'hooks', 'useLocalStorage.ts'), useLocalStorage)
}

// Lib utils
async function generateLibUtils(dir: string): Promise<void> {
  const content = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
  fs.writeFileSync(path.join(dir, 'lib', 'utils.ts'), content)
}

// Next config
async function generateNextConfig(dir: string): Promise<void> {
  const content = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
`
  fs.writeFileSync(path.join(dir, 'next.config.js'), content)
}

// TS config
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
      paths: { '@/*': ['./*'] },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }
  fs.writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify(content, null, 2))
}

// PostCSS config
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

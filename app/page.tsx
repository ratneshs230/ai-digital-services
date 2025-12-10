import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Users, Globe } from 'lucide-react'
import { IndustryCard } from '@/components/IndustryCard'

const featuredIndustries = [
  {
    slug: 'hospitals-and-health-systems',
    name: 'Healthcare',
    idea: 'AI-Powered Patient Triage & Routing',
    summary: 'Intelligent system that analyzes patient symptoms and medical history to route them to the most appropriate care setting.',
  },
  {
    slug: 'telemedicine-platforms',
    name: 'Telemedicine',
    idea: 'AI-Powered Symptom Checker & Triage',
    summary: 'Intelligent symptom analysis and automated patient triage to the appropriate medical professional.',
  },
  {
    slug: 'financial-services',
    name: 'Finance',
    idea: 'AI Risk Assessment Engine',
    summary: 'Real-time risk analysis and fraud detection powered by machine learning for financial institutions.',
  },
  {
    slug: 'retail-commerce',
    name: 'Retail',
    idea: 'Smart Inventory Optimization',
    summary: 'AI-driven demand forecasting and inventory management to reduce costs and prevent stockouts.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    idea: 'Property Valuation AI',
    summary: 'Automated property assessment using computer vision and market data analysis.',
  },
  {
    slug: 'education',
    name: 'Education',
    idea: 'Personalized Learning Engine',
    summary: 'Adaptive learning platform that customizes educational content based on student performance.',
  },
]

const features = [
  {
    name: 'Industry-Specific Solutions',
    description: 'AI tools tailored to the unique challenges and workflows of each industry.',
    icon: Globe,
  },
  {
    name: 'Rapid Deployment',
    description: 'Pre-built components and integrations for faster time-to-value.',
    icon: Zap,
  },
  {
    name: 'Enterprise Security',
    description: 'Built with compliance and data protection as core principles.',
    icon: Shield,
  },
  {
    name: 'Measurable Impact',
    description: 'Clear metrics and ROI tracking for every implementation.',
    icon: BarChart3,
  },
]

const stats = [
  { value: '500+', label: 'Industry Solutions' },
  { value: '50+', label: 'AI Models' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Support' },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/50 transition-colors">
                Exploring 500+ AI solutions across industries.{' '}
                <Link href="/industries" className="font-semibold text-primary">
                  <span className="absolute inset-0" aria-hidden="true" />
                  View all <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Transform Your Industry with{' '}
              <span className="text-primary">AI-Powered</span> Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover cutting-edge AI tools designed specifically for your industry.
              From healthcare to finance, retail to real estate, explore intelligent
              solutions that drive efficiency and growth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/industries"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Contact Sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-sm font-medium text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Industry Solutions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore AI-powered tools designed for specific industry needs
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {featuredIndustries.map((industry) => (
              <IndustryCard
                key={industry.slug}
                slug={industry.slug}
                name={industry.name}
                idea={industry.idea}
                summary={industry.summary}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View all 500+ industry solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Our AI Solutions?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built with enterprise needs in mind, our AI tools deliver real business value
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our portfolio of AI solutions and find the perfect fit for your industry.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/industries"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Browse All Solutions
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Users, Zap, Database, Code, Rocket, BarChart3 } from 'lucide-react'
import { loadIndustriesFromCSV, getIndustryBySlug } from '@/lib/industry-loader'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const industries = loadIndustriesFromCSV()
  return industries.map((industry) => ({
    slug: industry.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) return { title: 'Industry Not Found' }

  return {
    title: `${industry.idea} | ${industry.industry} | AI Digital Services`,
    description: industry.oneLineSummary,
  }
}

export default function IndustryPage({ params }: PageProps) {
  const industry = getIndustryBySlug(params.slug)

  if (!industry) {
    notFound()
  }

  const doc = industry.documentation
  const service = doc?.services?.[0]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 border-b">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Industries
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                {industry.industry}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {industry.idea}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {industry.oneLineSummary}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/industries/${params.slug}/demo`}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Try Live Demo
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Quick Overview</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Problem Solved</dt>
                  <dd className="mt-1 text-sm">{industry.problemItSolves}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Target Users</dt>
                  <dd className="mt-1 text-sm">{industry.targetUsers}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Business Impact</dt>
                  <dd className="mt-1 text-sm">{industry.businessImpact}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solution */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Core Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {industry.coreSolution}
          </p>

          {service && (
            <div className="mt-8 p-6 bg-muted/30 rounded-xl">
              <h3 className="font-semibold mb-4">Example Use Case</h3>
              <p className="text-muted-foreground">{industry.exampleUseCase}</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      {service?.core_features && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.core_features.map((feature, index) => (
                <div key={index} className="flex gap-3 p-4 bg-background rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Target Users */}
      {service?.target_users && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Target Users
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.target_users.map((user, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {user}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Capabilities */}
      {service?.ai_capabilities && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              AI Capabilities
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.ai_capabilities.map((capability, index) => (
                <div key={index} className="p-4 bg-background rounded-lg border">
                  <p className="text-sm">{capability}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs */}
      {service?.technical_specifications && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Technical Specifications
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(service.technical_specifications.recommended_tech_stack || {}).map(
                ([key, value]) => (
                  <div key={key} className="p-4 bg-muted/30 rounded-lg">
                    <dt className="text-sm font-medium text-primary uppercase">{key}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </dd>
                  </div>
                )
              )}
            </div>

            {service.technical_specifications.API_design && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">API Endpoints</h3>
                <div className="bg-muted/30 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm">
                    {service.technical_specifications.API_design.map((api, index) => (
                      <div key={index} className="py-1">
                        {typeof api === 'string' ? api : JSON.stringify(api, null, 2)}
                      </div>
                    ))}
                  </code>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Success Metrics */}
      {service?.success_metrics && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Success Metrics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.success_metrics.map((metric, index) => (
                <div key={index} className="flex gap-3 p-4 bg-background rounded-lg border">
                  <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Implement This Solution?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get started with our {industry.idea} solution today. Our team is ready to help
              you transform your {industry.industry.toLowerCase()} operations with AI.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/industries/${params.slug}/demo`}
                className="rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:bg-background/90 transition-colors"
              >
                Try Live Demo
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

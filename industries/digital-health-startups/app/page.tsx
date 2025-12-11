'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, ChevronRight, Sparkles, Shield, Zap, BarChart3, Users, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SineWaveChat } from '@/components/shared/SineWaveChat'

const icons = [Sparkles, Shield, Zap, BarChart3, Users, Brain]

const features = [
  {
    "name": "Personalized Wellness Plan Generation – Analyzes user data to create tailored plans for nutrition, exercise, sleep, and mental health, considering individual goals, preferences, and health conditions.",
    "description": ""
  },
  {
    "name": "Real-time Feedback and Nudges – Provides timely feedback and motivational messages based on user activity and progress, encouraging adherence to the wellness plan.",
    "description": ""
  },
  {
    "name": "Progress Tracking and Reporting – Monitors user progress across various health metrics and generates reports to visualize trends and identify areas for improvement.",
    "description": ""
  },
  {
    "name": "Integration with Wearable Devices and Health Apps – Seamlessly integrates with popular wearable devices (e.g., Fitbit, Apple Watch) and health apps to collect data automatically.",
    "description": ""
  },
  {
    "name": "AI-Powered Chatbot Support – Offers 24/7 support and guidance through an AI-powered chatbot, answering questions, providing advice, and escalating complex issues to human coaches if needed.",
    "description": ""
  },
  {
    "name": "Personalized Content Recommendations – Delivers relevant articles, videos, and other educational content based on user interests and goals.",
    "description": ""
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered Personalized Wellness Coach</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A virtual coach providing customized wellness plans and real-time feedback based on user data and AI algorithms.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools">
                <Button size="lg" className="gap-2 rounded-full">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 rounded-full">
                  View Dashboard <BarChart3 className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform your workflow with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Try our interactive tools and see the difference AI can make.
              </p>
              <Link href="/tools">
                <Button size="lg" variant="secondary" className="rounded-full gap-2">
                  Launch Tools <Play className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Widget */}
      <SineWaveChat />
    </div>
  )
}

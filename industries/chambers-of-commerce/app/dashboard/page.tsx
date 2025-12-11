'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, TrendingDown, Users, Activity, BarChart3, PieChart, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SineWaveChat } from '@/components/shared/SineWaveChat'

const metrics = [
  { label: 'Total Processed', value: '2,847', change: 12.5, trend: 'up', icon: Activity },
  { label: 'Active Users', value: '1,234', change: 8.2, trend: 'up', icon: Users },
  { label: 'Avg. Response Time', value: '1.2s', change: -15.3, trend: 'down', icon: Clock },
  { label: 'Success Rate', value: '94.7%', change: 2.1, trend: 'up', icon: CheckCircle },
]

const recentActivity = [
  { id: 1, type: 'Analysis', status: 'completed', time: '2 min ago', result: 'High Priority' },
  { id: 2, type: 'Review', status: 'completed', time: '5 min ago', result: 'Moderate' },
  { id: 3, type: 'Analysis', status: 'completed', time: '12 min ago', result: 'Low Priority' },
  { id: 4, type: 'Analysis', status: 'completed', time: '18 min ago', result: 'High Priority' },
  { id: 5, type: 'Review', status: 'completed', time: '25 min ago', result: 'Critical' },
]

const distributionData = [
  { label: 'Critical', value: 8, color: 'bg-destructive' },
  { label: 'High', value: 22, color: 'bg-warning' },
  { label: 'Moderate', value: 45, color: 'bg-primary' },
  { label: 'Low', value: 25, color: 'bg-success' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="font-semibold">Analytics Dashboard</h1>
          <Link href="/tools">
            <Button size="sm">New Analysis</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Distribution Chart */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Priority Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {distributionData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} transition-all`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                    <Badge variant={
                      item.result === 'Critical' ? 'destructive' :
                      item.result === 'High Priority' ? 'warning' :
                      item.result === 'Moderate' ? 'default' : 'success'
                    }>
                      {item.result}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SineWaveChat />
    </div>
  )
}

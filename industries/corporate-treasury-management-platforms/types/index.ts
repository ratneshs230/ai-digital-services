export interface AnalysisResult {
  recommendation: string
  confidence: number
  urgencyLevel: 'low' | 'moderate' | 'high' | 'critical'
  rationale: string
  nextSteps: string[]
}

export interface FormData {
  [key: string]: string | number | boolean | string[]
}

export interface Feature {
  name: string
  description: string
  icon: string
}

export interface DashboardMetric {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
}

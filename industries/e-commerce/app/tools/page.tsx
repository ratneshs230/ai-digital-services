'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2, CheckCircle, AlertTriangle, Send, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { SineWaveChat } from '@/components/shared/SineWaveChat'

// Multi-step wizard steps
const STEPS = [
  { id: 'input', label: 'Input Data' },
  { id: 'details', label: 'Details' },
  { id: 'review', label: 'Review' },
  { id: 'results', label: 'Results' },
]

interface FormState {
  primaryInput: string
  severity: number
  category: string
  options: string[]
  additionalNotes: string
}

const CATEGORIES = ['Category A', 'Category B', 'Category C', 'Category D', 'Other']
const OPTIONS = [
  'Option 1', 'Option 2', 'Option 3', 'Option 4',
  'Option 5', 'Option 6', 'Option 7', 'Option 8'
]

export default function ToolsPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [form, setForm] = useState<FormState>({
    primaryInput: '',
    severity: 5,
    category: '',
    options: [],
    additionalNotes: ''
  })

  const progress = ((step + 1) / STEPS.length) * 100

  const toggleOption = (opt: string) => {
    setForm(prev => ({
      ...prev,
      options: prev.options.includes(opt)
        ? prev.options.filter(o => o !== opt)
        : [...prev.options, opt]
    }))
  }

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
      setStep(3)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep(0)
    setResult(null)
    setForm({ primaryInput: '', severity: 5, category: '', options: [], additionalNotes: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="font-semibold">AI-Powered Product Recommendation Engine</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center gap-2 text-sm ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  i < step ? 'bg-primary border-primary text-primary-foreground' :
                  i === step ? 'border-primary text-primary' : 'border-muted-foreground'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Input */}
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Input</label>
                    <Textarea
                      value={form.primaryInput}
                      onChange={(e) => setForm({ ...form, primaryInput: e.target.value })}
                      placeholder="Describe your situation, needs, or requirements..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-4">
                      Severity Level: <span className="text-primary">{form.severity}/10</span>
                    </label>
                    <Slider
                      value={form.severity}
                      onChange={(val) => setForm({ ...form, severity: val })}
                      min={1}
                      max={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(1)}
                    disabled={!form.primaryInput}
                    className="w-full"
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Select all that apply:</label>
                    <div className="grid grid-cols-2 gap-3">
                      {OPTIONS.map(opt => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            form.options.includes(opt) ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'
                          }`}
                        >
                          <Checkbox
                            checked={form.options.includes(opt)}
                            onCheckedChange={() => toggleOption(opt)}
                          />
                          <span className="text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                    <Textarea
                      value={form.additionalNotes}
                      onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                      placeholder="Any other relevant information..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                    <Button onClick={() => setStep(2)} className="flex-1">
                      Review <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h4 className="font-medium mb-2">Input</h4>
                      <p className="text-muted-foreground">{form.primaryInput}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-secondary/50">
                        <h4 className="font-medium mb-1">Category</h4>
                        <p className="text-muted-foreground">{form.category || 'Not specified'}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/50">
                        <h4 className="font-medium mb-1">Severity</h4>
                        <p className="text-2xl font-bold text-primary">{form.severity}/10</p>
                      </div>
                    </div>

                    {form.options.length > 0 && (
                      <div className="p-4 rounded-lg bg-secondary/50">
                        <h4 className="font-medium mb-2">Selected Options</h4>
                        <div className="flex flex-wrap gap-2">
                          {form.options.map(opt => (
                            <Badge key={opt} variant="secondary">{opt}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {form.additionalNotes && (
                      <div className="p-4 rounded-lg bg-secondary/50">
                        <h4 className="font-medium mb-2">Notes</h4>
                        <p className="text-muted-foreground">{form.additionalNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
                    <strong>Note:</strong> This analysis is for informational purposes only.
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={handleAnalyze} disabled={loading} className="flex-1">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 3 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className={`border-2 ${
                result.urgencyLevel === 'critical' ? 'border-destructive bg-destructive/5' :
                result.urgencyLevel === 'high' ? 'border-warning bg-warning/5' :
                result.urgencyLevel === 'moderate' ? 'border-primary bg-primary/5' :
                'border-success bg-success/5'
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      result.urgencyLevel === 'critical' ? 'destructive' :
                      result.urgencyLevel === 'high' ? 'warning' :
                      result.urgencyLevel === 'moderate' ? 'default' : 'success'
                    } className="text-sm">
                      {result.urgencyLevel.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(result.confidence * 100)}% confidence
                    </span>
                  </div>
                  <CardTitle className="text-2xl mt-4">{result.recommendation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{result.rationale}</p>

                  {result.nextSteps && result.nextSteps.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Next Steps</h4>
                      <ul className="space-y-2">
                        {result.nextSteps.map((step: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={reset} className="flex-1">
                  Start New Analysis
                </Button>
                <Link href="/dashboard">
                  <Button>View Dashboard</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SineWaveChat />
    </div>
  )
}

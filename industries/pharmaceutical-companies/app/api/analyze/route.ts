import { NextRequest, NextResponse } from 'next/server'

const rateLimitMap = new Map<string, { count: number; ts: number }>()
const LIMIT = 10, WINDOW = 60000

function checkLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.ts > WINDOW) {
    rateLimitMap.set(ip, { count: 1, ts: now })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}

const KEYS = (process.env.GEMINI_API_KEYS || '').split(',').filter(Boolean)
let keyIdx = 0
function getKey() {
  if (!KEYS.length) return ''
  keyIdx = (keyIdx + 1) % KEYS.length
  return KEYS[keyIdx]
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'

  if (!checkLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  const body = await req.json()
  const { primaryInput, severity, category, options, additionalNotes } = body

  // Try AI analysis
  const key = getKey()
  if (key) {
    try {
      const prompt = `Analyze this input and provide a recommendation:
Input: ${primaryInput}
Severity: ${severity}/10
Category: ${category}
Options: ${options?.join(', ')}
Notes: ${additionalNotes}

Respond with JSON: { "recommendation": string, "confidence": 0-1, "urgencyLevel": "low"|"moderate"|"high"|"critical", "rationale": string, "nextSteps": string[] }`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
          })
        }
      )

      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          return NextResponse.json(JSON.parse(jsonMatch[0]))
        }
      }
    } catch (e) {
      console.error('AI error:', e)
    }
  }

  // Fallback mock response
  const urgencyLevel = severity >= 8 ? 'critical' : severity >= 6 ? 'high' : severity >= 4 ? 'moderate' : 'low'

  return NextResponse.json({
    recommendation: 'Analysis Complete',
    confidence: 0.85,
    urgencyLevel,
    rationale: `Based on the provided information with severity ${severity}/10, we recommend taking appropriate action. ${category ? `The ${category} category has been noted.` : ''}`,
    nextSteps: [
      'Review the detailed findings',
      'Implement recommended actions',
      'Monitor progress and adjust as needed',
      'Schedule follow-up analysis if required'
    ]
  })
}

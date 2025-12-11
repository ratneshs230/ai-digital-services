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

  const { message } = await req.json()
  const key = getKey()

  if (key) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `You are a helpful AI assistant for AI-Powered Scene Augmentation. Intelligently adds realistic details and elements to virtual environments, saving artists time and improving realism.\n\nUser: ${message}` }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
          })
        }
      )

      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        return NextResponse.json({ response: text })
      }
    } catch (e) {
      console.error('AI error:', e)
    }
  }

  return NextResponse.json({
    response: 'I can help you with AI-Powered Scene Augmentation. What would you like to know?'
  })
}

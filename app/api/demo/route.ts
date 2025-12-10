import { NextRequest, NextResponse } from 'next/server'
import { getIndustryBySlug } from '@/lib/industry-loader'

// Simple in-memory rate limiting
const rateLimiter = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // requests per minute
const RATE_WINDOW = 60000 // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimiter.get(ip)

  if (!record || now > record.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { industry, input } = body

    if (!industry || !input) {
      return NextResponse.json(
        { error: 'Missing required fields: industry and input' },
        { status: 400 }
      )
    }

    // Get industry data for context
    const industryData = getIndustryBySlug(industry)

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      // Return mock response if no API key
      return NextResponse.json({
        response: generateMockResponse(industryData?.industry || industry, input),
        mock: true,
      })
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant specialized in ${industryData?.industry || industry}.
            You help with: ${industryData?.idea || 'industry-specific tasks'}.
            ${industryData?.coreSolution || ''}
            Provide helpful, accurate, and professional responses.`,
          },
          {
            role: 'user',
            content: input,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await openaiResponse.json()
    const aiResponse = data.choices?.[0]?.message?.content || 'No response generated'

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Demo API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}

function generateMockResponse(industry: string, input: string): string {
  const inputLower = input.toLowerCase()

  // Generate contextual mock responses based on industry
  const responses: Record<string, string> = {
    healthcare: `Based on your query about "${input}", here's my analysis:

**Assessment:**
This appears to be a health-related inquiry that would benefit from professional medical evaluation.

**Recommendations:**
1. Consider scheduling a consultation with a healthcare provider
2. Monitor any symptoms and note their duration/severity
3. Maintain a health journal for accurate reporting

**Next Steps:**
For a complete assessment, please provide more details about your medical history and current symptoms.

*Note: This is a demo response. In production, our AI would provide more detailed, personalized analysis based on comprehensive medical data integration.*`,

    finance: `Analyzing your financial query: "${input}"

**Key Insights:**
- Risk assessment indicates moderate considerations
- Market conditions suggest careful evaluation needed
- Compliance requirements should be reviewed

**Recommendations:**
1. Review current portfolio allocation
2. Consider diversification strategies
3. Evaluate risk tolerance levels

*Note: This demo showcases our AI capabilities. Production version includes real-time market data and personalized financial modeling.*`,

    default: `Processing your request: "${input}"

**Analysis:**
Our AI has analyzed your query and identified the following key points:
- Context: ${industry} industry application
- Type: General inquiry requiring specialized processing

**Recommendations:**
1. Our system can help optimize this workflow
2. AI-powered automation available for similar tasks
3. Integration with existing systems possible

**Next Steps:**
Contact our team to see how this solution can be customized for your specific needs.

*This is a demonstration of our AI capabilities. Production systems include full API integrations and real-time data processing.*`,
  }

  if (inputLower.includes('symptom') || inputLower.includes('health') || inputLower.includes('medical')) {
    return responses.healthcare
  }
  if (inputLower.includes('finance') || inputLower.includes('invest') || inputLower.includes('money')) {
    return responses.finance
  }

  return responses.default
}

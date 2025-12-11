/**
 * Gemini API Client with Key Rotation and Fallback
 * Supports text generation, image generation, and multimodal capabilities
 */

import * as fs from 'fs'
import * as path from 'path'

// Load API keys from file
function loadApiKeys(): string[] {
  const keysPath = path.join(process.cwd(), 'api_keys.txt')
  if (!fs.existsSync(keysPath)) {
    console.error('API keys file not found at:', keysPath)
    return []
  }

  const content = fs.readFileSync(keysPath, 'utf-8')
  const match = content.match(/GEMINI_API_KEYS\s*=\s*(.+)/i)
  if (!match) return []

  return match[1]
    .split(',')
    .map((key) => key.trim())
    .filter((key) => key.length > 0)
}

const API_KEYS = loadApiKeys()
let currentKeyIndex = 0
let keyUsageCount: Record<string, number> = {}
let keyErrorCount: Record<string, number> = {}

// Initialize usage tracking
API_KEYS.forEach((key) => {
  keyUsageCount[key] = 0
  keyErrorCount[key] = 0
})

export interface GeminiConfig {
  model?: string
  temperature?: number
  maxOutputTokens?: number
  topP?: number
  topK?: number
}

export interface GeminiResponse {
  text: string
  success: boolean
  error?: string
  keyUsed?: string
}

export interface ImageGenerationResponse {
  imageUrl?: string
  imageBase64?: string
  success: boolean
  error?: string
}

/**
 * Get the next available API key using round-robin with error tracking
 */
function getNextKey(): string {
  // Find keys with lowest error count
  const sortedKeys = [...API_KEYS].sort(
    (a, b) => (keyErrorCount[a] || 0) - (keyErrorCount[b] || 0)
  )

  // Rotate through keys
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length
  const key = sortedKeys[currentKeyIndex % sortedKeys.length]

  keyUsageCount[key] = (keyUsageCount[key] || 0) + 1
  return key
}

/**
 * Mark a key as having an error
 */
function markKeyError(key: string): void {
  keyErrorCount[key] = (keyErrorCount[key] || 0) + 1
  console.log(`Key error count for ${key.slice(0, 10)}...: ${keyErrorCount[key]}`)
}

/**
 * Reset error count for a key on success
 */
function markKeySuccess(key: string): void {
  keyErrorCount[key] = Math.max(0, (keyErrorCount[key] || 0) - 1)
}

/**
 * Call Gemini API with automatic key rotation and retry
 */
export async function callGemini(
  prompt: string,
  config: GeminiConfig = {},
  maxRetries: number = 3
): Promise<GeminiResponse> {
  const {
    model = 'gemini-1.5-flash-latest',
    temperature = 0.7,
    maxOutputTokens = 8192,
    topP = 0.95,
    topK = 40,
  } = config

  let lastError: string = ''
  let attempts = 0

  while (attempts < maxRetries) {
    const apiKey = getNextKey()
    attempts++

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature,
              maxOutputTokens,
              topP,
              topK,
            },
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        lastError = errorData.error?.message || `HTTP ${response.status}`
        markKeyError(apiKey)
        console.log(`Gemini API error (attempt ${attempts}): ${lastError}`)
        continue
      }

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

      if (!text) {
        lastError = 'Empty response from Gemini'
        markKeyError(apiKey)
        continue
      }

      markKeySuccess(apiKey)
      return { text, success: true, keyUsed: apiKey.slice(0, 10) + '...' }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error'
      markKeyError(apiKey)
      console.log(`Gemini API exception (attempt ${attempts}): ${lastError}`)
    }
  }

  return { text: '', success: false, error: lastError }
}

/**
 * Generate code using Gemini with specific instructions
 */
export async function generateCode(
  prompt: string,
  language: string = 'typescript',
  config: GeminiConfig = {}
): Promise<GeminiResponse> {
  const codePrompt = `You are an expert ${language} developer. Generate clean, production-ready code.

IMPORTANT: Return ONLY the code, no explanations, no markdown code blocks.

${prompt}`

  return callGemini(codePrompt, { ...config, temperature: 0.3 })
}

/**
 * Generate JSON using Gemini
 */
export async function generateJSON<T = unknown>(
  prompt: string,
  config: GeminiConfig = {}
): Promise<{ data: T | null; success: boolean; error?: string }> {
  const jsonPrompt = `${prompt}

IMPORTANT: Return ONLY valid JSON, no explanations, no markdown code blocks.`

  const response = await callGemini(jsonPrompt, { ...config, temperature: 0.2 })

  if (!response.success) {
    return { data: null, success: false, error: response.error }
  }

  try {
    // Try to extract JSON from response
    let jsonStr = response.text.trim()

    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7)
    }
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3)
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3)
    }

    const data = JSON.parse(jsonStr.trim()) as T
    return { data, success: true }
  } catch (error) {
    return {
      data: null,
      success: false,
      error: `JSON parse error: ${error instanceof Error ? error.message : 'Unknown'}`,
    }
  }
}

/**
 * Generate image using Gemini Imagen model
 * Note: Using text-to-image capabilities
 */
export async function generateImage(
  prompt: string,
  options: {
    width?: number
    height?: number
    style?: string
  } = {}
): Promise<ImageGenerationResponse> {
  const { width = 1024, height = 1024, style = 'modern, professional' } = options

  // For now, we'll use Gemini to generate SVG or describe an image
  // The actual Imagen API may need different endpoints
  const imagePrompt = `Create a detailed SVG image for: ${prompt}
Style: ${style}
Dimensions: ${width}x${height}

Return ONLY the complete SVG code, starting with <svg and ending with </svg>.
Make it visually appealing with gradients, shapes, and modern design.`

  const response = await callGemini(imagePrompt, { temperature: 0.8 })

  if (!response.success) {
    return { success: false, error: response.error }
  }

  // Extract SVG from response
  const svgMatch = response.text.match(/<svg[\s\S]*<\/svg>/i)
  if (svgMatch) {
    const svgBase64 = Buffer.from(svgMatch[0]).toString('base64')
    return {
      success: true,
      imageBase64: svgBase64,
      imageUrl: `data:image/svg+xml;base64,${svgBase64}`,
    }
  }

  return { success: false, error: 'Could not generate SVG image' }
}

/**
 * Chat completion with conversation history
 */
export async function chat(
  messages: Array<{ role: 'user' | 'model'; content: string }>,
  config: GeminiConfig = {}
): Promise<GeminiResponse> {
  const {
    model = 'gemini-1.5-flash-latest',
    temperature = 0.7,
    maxOutputTokens = 8192,
    topP = 0.95,
    topK = 40,
  } = config

  const contents = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }))

  let lastError: string = ''
  let attempts = 0

  while (attempts < 3) {
    const apiKey = getNextKey()
    attempts++

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: { temperature, maxOutputTokens, topP, topK },
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        lastError = errorData.error?.message || `HTTP ${response.status}`
        markKeyError(apiKey)
        continue
      }

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

      markKeySuccess(apiKey)
      return { text, success: true, keyUsed: apiKey.slice(0, 10) + '...' }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error'
      markKeyError(apiKey)
    }
  }

  return { text: '', success: false, error: lastError }
}

/**
 * Get API key statistics
 */
export function getKeyStats(): {
  totalKeys: number
  usage: Record<string, number>
  errors: Record<string, number>
} {
  return {
    totalKeys: API_KEYS.length,
    usage: { ...keyUsageCount },
    errors: { ...keyErrorCount },
  }
}

export { API_KEYS }

/**
 * Image Generation Tool using Gemini
 * Generates SVG images, placeholder images, and AI-described visuals
 */

import { callGemini, generateCode } from '../lib/gemini-client'

export interface ImageOptions {
  width?: number
  height?: number
  style?: 'modern' | 'minimal' | 'gradient' | 'illustrated' | 'tech' | 'organic'
  colors?: string[]
  format?: 'svg' | 'placeholder'
}

export interface GeneratedImage {
  svg?: string
  dataUrl?: string
  placeholder?: string
  success: boolean
  error?: string
}

/**
 * Generate an SVG icon for the industry
 */
export async function generateIcon(
  industry: string,
  idea: string,
  options: ImageOptions = {}
): Promise<GeneratedImage> {
  const { style = 'modern', colors = ['#3B82F6', '#1E40AF', '#60A5FA'] } = options

  const prompt = `Create an SVG icon for a ${industry} company that provides "${idea}".

Requirements:
- Style: ${style}
- Primary colors: ${colors.join(', ')}
- Size: 64x64 viewBox
- Simple, recognizable, professional
- Use paths and shapes, no text
- Include subtle gradients

Return ONLY the SVG code starting with <svg and ending with </svg>.`

  const response = await callGemini(prompt, { temperature: 0.7 })

  if (!response.success) {
    return { success: false, error: response.error }
  }

  const svgMatch = response.text.match(/<svg[\s\S]*?<\/svg>/i)
  if (svgMatch) {
    const svg = svgMatch[0]
    return {
      svg,
      dataUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
      success: true,
    }
  }

  return { success: false, error: 'Could not extract SVG from response' }
}

/**
 * Generate a hero section background SVG
 */
export async function generateHeroBackground(
  industry: string,
  options: ImageOptions = {}
): Promise<GeneratedImage> {
  const {
    width = 1920,
    height = 1080,
    style = 'gradient',
    colors = ['#0F172A', '#1E293B', '#3B82F6'],
  } = options

  const prompt = `Create an SVG background for a ${industry} website hero section.

Requirements:
- ViewBox: 0 0 ${width} ${height}
- Style: ${style}, abstract, professional
- Colors: ${colors.join(', ')}
- Include: flowing shapes, subtle patterns, depth
- NO text, NO realistic images
- Should work as a background (not too busy)

Return ONLY the SVG code.`

  const response = await callGemini(prompt, { temperature: 0.8 })

  if (!response.success) {
    // Return a fallback gradient
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]}"/>
          <stop offset="50%" style="stop-color:${colors[1]}"/>
          <stop offset="100%" style="stop-color:${colors[2]}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
    </svg>`
    return {
      svg: fallbackSvg,
      dataUrl: `data:image/svg+xml;base64,${Buffer.from(fallbackSvg).toString('base64')}`,
      success: true,
    }
  }

  const svgMatch = response.text.match(/<svg[\s\S]*?<\/svg>/i)
  if (svgMatch) {
    return {
      svg: svgMatch[0],
      dataUrl: `data:image/svg+xml;base64,${Buffer.from(svgMatch[0]).toString('base64')}`,
      success: true,
    }
  }

  return { success: false, error: 'Could not extract SVG' }
}

/**
 * Generate feature illustration SVG
 */
export async function generateFeatureIllustration(
  feature: string,
  industry: string,
  options: ImageOptions = {}
): Promise<GeneratedImage> {
  const { style = 'illustrated', colors = ['#3B82F6', '#10B981', '#8B5CF6'] } = options

  const prompt = `Create a small SVG illustration for the feature: "${feature}" in ${industry} context.

Requirements:
- ViewBox: 0 0 200 200
- Style: ${style}, friendly, professional
- Colors: ${colors.join(', ')}
- Simple shapes representing the concept
- NO text, abstract representation

Return ONLY the SVG code.`

  const response = await callGemini(prompt, { temperature: 0.8 })

  if (!response.success) {
    return { success: false, error: response.error }
  }

  const svgMatch = response.text.match(/<svg[\s\S]*?<\/svg>/i)
  if (svgMatch) {
    return {
      svg: svgMatch[0],
      dataUrl: `data:image/svg+xml;base64,${Buffer.from(svgMatch[0]).toString('base64')}`,
      success: true,
    }
  }

  return { success: false, error: 'Could not extract SVG' }
}

/**
 * Generate a color palette for the industry
 */
export async function generateColorPalette(
  industry: string,
  mood: string = 'professional'
): Promise<{
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  success: boolean
}> {
  const prompt = `Generate a color palette for a ${industry} website with a ${mood} mood.

Return ONLY a JSON object with these exact keys (hex colors):
{
  "primary": "#...",
  "secondary": "#...",
  "accent": "#...",
  "background": "#...",
  "foreground": "#...",
  "muted": "#..."
}

Make colors harmonious and appropriate for the industry.`

  const response = await callGemini(prompt, { temperature: 0.5 })

  if (!response.success) {
    // Return default palette
    return {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#10B981',
      background: '#0F172A',
      foreground: '#F8FAFC',
      muted: '#64748B',
      success: true,
    }
  }

  try {
    const jsonMatch = response.text.match(/\{[\s\S]*\}/i)
    if (jsonMatch) {
      const palette = JSON.parse(jsonMatch[0])
      return { ...palette, success: true }
    }
  } catch {
    // Return default on parse error
  }

  return {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#10B981',
    background: '#0F172A',
    foreground: '#F8FAFC',
    muted: '#64748B',
    success: true,
  }
}

/**
 * Generate animated CSS for visual effects
 */
export async function generateAnimations(
  industry: string,
  elements: string[]
): Promise<string> {
  const prompt = `Generate CSS animations for a ${industry} website. Create animations for: ${elements.join(', ')}.

Requirements:
- Modern, smooth animations
- Use @keyframes
- Include hover effects
- Performance optimized (use transform, opacity)
- Subtle and professional

Return ONLY CSS code, no explanations.`

  const response = await callGemini(prompt, { temperature: 0.6 })

  if (!response.success) {
    // Return default animations
    return `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-fade-in { animation: fadeIn 0.5s ease-out; }
.animate-slide-up { animation: slideUp 0.5s ease-out; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-gradient { animation: gradientShift 5s ease infinite; background-size: 200% 200%; }
`
  }

  return response.text
}

/**
 * Generate placeholder image URL
 */
export function getPlaceholderImage(
  width: number,
  height: number,
  text?: string,
  bgColor: string = '1E293B',
  textColor: string = '94A3B8'
): string {
  const encodedText = encodeURIComponent(text || `${width}x${height}`)
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`
}

/**
 * Generate Unsplash image URL for industry
 */
export function getUnsplashImage(
  query: string,
  width: number = 1200,
  height: number = 800
): string {
  const encodedQuery = encodeURIComponent(query)
  return `https://source.unsplash.com/${width}x${height}/?${encodedQuery}`
}

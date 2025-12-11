/**
 * World-Class Web Application Building Agent
 * Builds complete, working prototypes with all tools/services from documentation
 *
 * Features:
 * - Full working AI-powered tools based on industry spec
 * - Animated sine wave chat buttons (unique per industry)
 * - Rate-limited AI responses via Gemini
 * - Beautiful, distinctive designs (20+ unique themes)
 * - GitHub integration for code push
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import { generateInteractiveApp, IndustrySpec } from './generators/interactive-app-generator'
import { getKeyStats } from './lib/gemini-client'

interface AgentConfig {
  industrySlug?: string
  startIndex?: number
  endIndex?: number
  skipGit?: boolean
  dryRun?: boolean
}

interface AgentResult {
  slug: string
  success: boolean
  error?: string
  duration: number
  toolsGenerated: number
}

/**
 * Get all available industry slugs
 */
function getAvailableIndustries(): string[] {
  const digitalSolutionsDir = path.join(process.cwd(), 'digital-solutions')

  if (!fs.existsSync(digitalSolutionsDir)) {
    console.error('digital-solutions directory not found')
    return []
  }

  return fs
    .readdirSync(digitalSolutionsDir)
    .filter((dir) => {
      const docPath = path.join(digitalSolutionsDir, dir, 'DOCUMENTATION.md')
      return fs.existsSync(docPath)
    })
    .sort()
}

/**
 * Load industry specification from digital-solutions folder
 */
function loadIndustrySpec(slug: string): IndustrySpec | null {
  const docPath = path.join(process.cwd(), 'digital-solutions', slug, 'DOCUMENTATION.md')
  const specPath = path.join(process.cwd(), 'digital-solutions', slug, 'spec.json')

  if (!fs.existsSync(docPath)) {
    console.error(`Documentation not found for: ${slug}`)
    return null
  }

  const docContent = fs.readFileSync(docPath, 'utf-8')

  const titleMatch = docContent.match(/^#\s+(.+)$/m)
  const industryMatch = docContent.match(/##\s+Industry:\s+(.+)$/m)
  const overviewMatch = docContent.match(/###\s+Overview\n([\s\S]*?)(?=###|$)/)
  const problemMatch = docContent.match(/###\s+Problem It Solves\n([\s\S]*?)(?=###|$)/)
  const solutionMatch = docContent.match(/###\s+Core Solution\n([\s\S]*?)(?=###|$)/)
  const usersMatch = docContent.match(/###\s+Target Users\n([\s\S]*?)(?=###|$)/)
  const impactMatch = docContent.match(/###\s+Business Impact\n([\s\S]*?)(?=###|$)/)

  let documentation = null
  if (fs.existsSync(specPath)) {
    try {
      documentation = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
    } catch {}
  }

  return {
    slug,
    industry: industryMatch?.[1]?.trim() || slug,
    idea: titleMatch?.[1]?.trim() || '',
    overview: overviewMatch?.[1]?.trim() || '',
    problemItSolves: problemMatch?.[1]?.trim() || '',
    coreSolution: solutionMatch?.[1]?.trim() || '',
    targetUsers: usersMatch?.[1]?.trim() || '',
    businessImpact: impactMatch?.[1]?.trim() || '',
    documentation,
  }
}

/**
 * Build a complete interactive prototype for an industry
 */
async function buildIndustry(slug: string, skipGit: boolean): Promise<AgentResult> {
  const startTime = Date.now()

  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  Building Interactive App: ${slug.padEnd(39)}║
╚════════════════════════════════════════════════════════════════════╝`)

  try {
    // Load industry specification
    const spec = loadIndustrySpec(slug)
    if (!spec) {
      return {
        slug,
        success: false,
        error: 'Could not load industry spec',
        duration: Date.now() - startTime,
        toolsGenerated: 0,
      }
    }

    console.log(`  Industry: ${spec.industry}`)
    console.log(`  Idea: ${spec.idea}`)

    const toolCount = spec.documentation?.services?.[0]?.core_features?.length || 0
    console.log(`  Features: ${toolCount}`)

    // Output directory
    const outputDir = path.join(process.cwd(), 'industries', slug)

    // Generate the complete interactive app
    await generateInteractiveApp(spec, outputDir)

    // Git operations
    if (!skipGit) {
      console.log('\n  Pushing to GitHub...')

      try {
        execSync(`git add "industries/${slug}"`, {
          cwd: process.cwd(),
          stdio: 'pipe',
        })

        const commitMsg = `feat(${slug}): Add complete prototype with ${toolCount} AI tools`
        execSync(
          `git commit -m "${commitMsg}" --no-verify`,
          { cwd: process.cwd(), stdio: 'pipe' }
        )

        execSync('git push origin main', { cwd: process.cwd(), stdio: 'pipe' })
        console.log('  ✓ Pushed to GitHub')
      } catch (gitError) {
        console.log('  ⚠ Git operation skipped:', gitError instanceof Error ? gitError.message : 'Unknown')
      }
    }

    const duration = Date.now() - startTime
    console.log(`\n  ✓ Completed in ${(duration / 1000).toFixed(2)}s`)

    return { slug, success: true, duration, toolsGenerated: toolCount }
  } catch (error) {
    const duration = Date.now() - startTime
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error(`\n  ✗ Failed: ${errorMsg}`)

    return { slug, success: false, error: errorMsg, duration, toolsGenerated: 0 }
  }
}

/**
 * Run the agent
 */
async function runAgent(config: AgentConfig = {}): Promise<void> {
  const { industrySlug, startIndex = 0, endIndex, skipGit = false, dryRun = false } = config

  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║     WORLD-CLASS WEB APPLICATION BUILDING AGENT v2.0               ║
║     ─────────────────────────────────────────────────             ║
║     • Complete working prototypes with all tools                   ║
║     • Animated sine wave chat buttons                              ║
║     • Rate-limited AI responses                                    ║
║     • 20+ unique design themes                                     ║
╚════════════════════════════════════════════════════════════════════╝
`)

  // Get industries to process
  let industries: string[] = []

  if (industrySlug) {
    industries = [industrySlug]
  } else {
    const allIndustries = getAvailableIndustries()
    const end = endIndex ?? allIndustries.length
    industries = allIndustries.slice(startIndex, end)
  }

  console.log(`Industries to process: ${industries.length}`)
  console.log(`Skip Git: ${skipGit}`)
  console.log(`Dry Run: ${dryRun}`)

  const keyStats = getKeyStats()
  console.log(`Gemini API Keys: ${keyStats.totalKeys}`)

  if (dryRun) {
    console.log('\n[DRY RUN] Would process:')
    industries.forEach((slug, i) => console.log(`  ${i + 1}. ${slug}`))
    return
  }

  // Process industries
  const results: AgentResult[] = []
  const overallStart = Date.now()

  for (let i = 0; i < industries.length; i++) {
    const slug = industries[i]
    console.log(`\n[${i + 1}/${industries.length}] Processing: ${slug}`)

    const result = await buildIndustry(slug, skipGit)
    results.push(result)

    // Small delay between builds
    if (i < industries.length - 1) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  // Summary
  const overallDuration = Date.now() - overallStart
  const successful = results.filter((r) => r.success)
  const failed = results.filter((r) => !r.success)
  const totalTools = results.reduce((sum, r) => sum + r.toolsGenerated, 0)

  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                       BUILD SUMMARY                                 ║
╠════════════════════════════════════════════════════════════════════╣
║  Total Industries: ${results.length.toString().padEnd(47)}║
║  Successful: ${successful.length.toString().padEnd(54)}║
║  Failed: ${failed.length.toString().padEnd(58)}║
║  Total Tools Generated: ${totalTools.toString().padEnd(43)}║
║  Total Time: ${(overallDuration / 1000).toFixed(2)}s${' '.repeat(50 - (overallDuration / 1000).toFixed(2).length)}║
╚════════════════════════════════════════════════════════════════════╝
`)

  if (failed.length > 0) {
    console.log('\nFailed Industries:')
    failed.forEach((r) => console.log(`  - ${r.slug}: ${r.error}`))
  }
}

/**
 * CLI entry point
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const config: AgentConfig = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === '--industry' && args[i + 1]) {
      config.industrySlug = args[++i]
    } else if (arg === '--start' && args[i + 1]) {
      config.startIndex = parseInt(args[++i], 10)
    } else if (arg === '--end' && args[i + 1]) {
      config.endIndex = parseInt(args[++i], 10)
    } else if (arg === '--skip-git') {
      config.skipGit = true
    } else if (arg === '--dry-run') {
      config.dryRun = true
    } else if (arg === '--help') {
      console.log(`
World-Class Web Application Building Agent

Usage:
  npx tsx subagents/agent.ts [options]

Options:
  --industry <slug>   Build a specific industry
  --start <n>         Start index (0-based)
  --end <n>           End index (exclusive)
  --skip-git          Skip git operations
  --dry-run           Preview without building
  --help              Show this help

Examples:
  npx tsx subagents/agent.ts --industry hospitals-and-health-systems --skip-git
  npx tsx subagents/agent.ts --start 0 --end 10
  npx tsx subagents/agent.ts --dry-run

Features:
  • Complete working prototypes with all tools from documentation
  • Animated sine wave chat button (unique per industry)
  • Rate-limited AI responses (10 req/min per IP)
  • 20+ unique design themes
  • Full Next.js 14 applications
`)
      return
    }
  }

  await runAgent(config)
}

export { runAgent, buildIndustry, getAvailableIndustries }

main().catch(console.error)

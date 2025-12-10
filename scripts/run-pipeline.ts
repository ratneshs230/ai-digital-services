import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import { loadIndustriesFromCSV, IndustryData, generateIndustriesJson } from '../lib/industry-loader'
import { generateIndustryTool } from './generate-industry'

const INDUSTRIES_DIR = path.join(process.cwd(), 'industries')

interface PipelineOptions {
  startIndex?: number
  endIndex?: number
  industrySlug?: string
  skipGit?: boolean
  dryRun?: boolean
}

async function runPipeline(options: PipelineOptions = {}): Promise<void> {
  console.log('='.repeat(60))
  console.log('AI Digital Services Pipeline')
  console.log('='.repeat(60))
  console.log('')

  // Load industries from CSV
  console.log('[1/5] Loading industries from CSV...')
  const allIndustries = loadIndustriesFromCSV()
  console.log(`     Found ${allIndustries.length} industries`)

  // Generate industries.json for static usage
  console.log('[2/5] Generating industries.json...')
  generateIndustriesJson()

  // Filter industries based on options
  let industries = allIndustries

  if (options.industrySlug) {
    industries = allIndustries.filter((i) => i.slug === options.industrySlug)
    if (industries.length === 0) {
      console.error(`     Industry not found: ${options.industrySlug}`)
      return
    }
  } else if (options.startIndex !== undefined || options.endIndex !== undefined) {
    const start = options.startIndex || 0
    const end = options.endIndex || allIndustries.length
    industries = allIndustries.slice(start, end)
  }

  console.log(`     Processing ${industries.length} industries`)
  console.log('')

  // Ensure industries directory exists
  if (!fs.existsSync(INDUSTRIES_DIR)) {
    fs.mkdirSync(INDUSTRIES_DIR, { recursive: true })
  }

  // Generate tools for each industry
  console.log('[3/5] Generating industry tools...')
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < industries.length; i++) {
    const industry = industries[i]
    const progress = `[${i + 1}/${industries.length}]`

    try {
      if (options.dryRun) {
        console.log(`     ${progress} Would generate: ${industry.slug}`)
      } else {
        console.log(`     ${progress} Generating: ${industry.slug}`)
        await generateIndustryTool(industry)
        successCount++
      }
    } catch (error) {
      console.error(`     ${progress} Error: ${industry.slug}`)
      console.error(`           ${error}`)
      errorCount++
    }
  }

  console.log('')
  console.log(`     Generated: ${successCount}, Errors: ${errorCount}`)
  console.log('')

  // Git operations
  if (!options.skipGit && !options.dryRun) {
    console.log('[4/5] Git operations...')

    try {
      // Check if we're in a git repository
      execSync('git status', { stdio: 'ignore' })

      // Add all changes
      console.log('     Adding changes...')
      execSync('git add .', { stdio: 'inherit' })

      // Create commit
      const commitMessage =
        industries.length === 1
          ? `feat: Add ${industries[0].industry} AI tools`
          : `feat: Add ${industries.length} industry AI tools`

      console.log('     Creating commit...')
      execSync(`git commit -m "${commitMessage}" --allow-empty`, { stdio: 'inherit' })

      // Push to remote
      console.log('     Pushing to remote...')
      execSync('git push origin main', { stdio: 'inherit' })

      console.log('     Git operations complete!')
    } catch (error) {
      console.log('     Git operations skipped (not a git repo or error)')
    }
  } else {
    console.log('[4/5] Git operations skipped')
  }

  console.log('')
  console.log('[5/5] Pipeline complete!')
  console.log('')
  console.log('='.repeat(60))
  console.log('Summary:')
  console.log(`- Industries processed: ${industries.length}`)
  console.log(`- Successful: ${successCount}`)
  console.log(`- Errors: ${errorCount}`)
  console.log(`- Output directory: ${INDUSTRIES_DIR}`)
  console.log('='.repeat(60))
}

// Parse command line arguments
function parseArgs(): PipelineOptions {
  const args = process.argv.slice(2)
  const options: PipelineOptions = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === '--start' && args[i + 1]) {
      options.startIndex = parseInt(args[++i], 10)
    } else if (arg === '--end' && args[i + 1]) {
      options.endIndex = parseInt(args[++i], 10)
    } else if (arg === '--industry' && args[i + 1]) {
      options.industrySlug = args[++i]
    } else if (arg === '--skip-git') {
      options.skipGit = true
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--help') {
      console.log(`
AI Digital Services Pipeline

Usage: npm run generate [options]

Options:
  --start <n>        Start from industry index n (0-based)
  --end <n>          End at industry index n (exclusive)
  --industry <slug>  Generate only a specific industry
  --skip-git         Skip git add/commit/push operations
  --dry-run          Show what would be done without doing it
  --help             Show this help message

Examples:
  npm run generate                     # Generate all industries
  npm run generate --start 0 --end 10  # Generate first 10 industries
  npm run generate --industry healthcare  # Generate only healthcare
  npm run generate --dry-run           # Preview without changes
`)
      process.exit(0)
    }
  }

  return options
}

// Run the pipeline
const options = parseArgs()
runPipeline(options).catch((error) => {
  console.error('Pipeline failed:', error)
  process.exit(1)
})

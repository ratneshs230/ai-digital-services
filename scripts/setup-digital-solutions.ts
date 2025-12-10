import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

const DIGITAL_SOLUTIONS_DIR = path.join(process.cwd(), 'digital-solutions')

interface IndustryRow {
  Industry: string
  Idea: string
  one_line_summary: string
  ' problem_it_solves'?: string
  problem_it_solves?: string
  core_solution: string
  target_users: string
  business_impact: string
  example_use_case: string
  Documentation: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseDocumentation(docString: string): object | null {
  if (!docString || docString.trim() === '') return null

  try {
    let cleanJson = docString.trim()
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.slice(7)
    }
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.slice(3)
    }
    if (cleanJson.endsWith('```')) {
      cleanJson = cleanJson.slice(0, -3)
    }
    cleanJson = cleanJson.trim()

    return JSON.parse(cleanJson)
  } catch (error) {
    return null
  }
}

function createDocumentationFile(industry: IndustryRow, slug: string): string {
  const doc = parseDocumentation(industry.Documentation)
  const problemItSolves = industry[' problem_it_solves'] || industry.problem_it_solves || ''

  let content = `# ${industry.Idea}

## Industry: ${industry.Industry}

### Overview
${industry.one_line_summary}

### Problem It Solves
${problemItSolves}

### Core Solution
${industry.core_solution}

### Target Users
${industry.target_users}

### Business Impact
${industry.business_impact}

### Example Use Case
${industry.example_use_case}

---

## Technical Documentation

`

  if (doc) {
    content += '```json\n' + JSON.stringify(doc, null, 2) + '\n```\n'
  } else {
    content += '*Technical documentation not available or could not be parsed.*\n'
  }

  return content
}

async function setupDigitalSolutions(): Promise<void> {
  console.log('='.repeat(60))
  console.log('Setting up Digital Solutions Structure')
  console.log('='.repeat(60))
  console.log('')

  // Create main directory
  if (!fs.existsSync(DIGITAL_SOLUTIONS_DIR)) {
    fs.mkdirSync(DIGITAL_SOLUTIONS_DIR, { recursive: true })
  }

  // Load CSV
  const csvPath = path.join(process.cwd(), 'Industry Workflow - Industry Idea.csv')
  console.log(`[1/3] Loading CSV from: ${csvPath}`)

  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found!')
    return
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8')
  const records: IndustryRow[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
  })

  console.log(`     Found ${records.length} industries`)
  console.log('')

  // Create folders and documentation files
  console.log('[2/3] Creating industry folders and documentation...')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < records.length; i++) {
    const industry = records[i]
    const slug = slugify(industry.Industry)
    const industryDir = path.join(DIGITAL_SOLUTIONS_DIR, slug)

    try {
      // Create industry folder
      if (!fs.existsSync(industryDir)) {
        fs.mkdirSync(industryDir, { recursive: true })
      }

      // Create documentation file
      const docContent = createDocumentationFile(industry, slug)
      fs.writeFileSync(path.join(industryDir, 'DOCUMENTATION.md'), docContent)

      // Also save raw JSON if available
      const parsedDoc = parseDocumentation(industry.Documentation)
      if (parsedDoc) {
        fs.writeFileSync(
          path.join(industryDir, 'spec.json'),
          JSON.stringify(parsedDoc, null, 2)
        )
      }

      successCount++

      if ((i + 1) % 50 === 0) {
        console.log(`     Progress: ${i + 1}/${records.length} industries created`)
      }
    } catch (error) {
      console.error(`     Error creating ${slug}: ${error}`)
      errorCount++
    }
  }

  console.log('')
  console.log('[3/3] Complete!')
  console.log('')
  console.log('='.repeat(60))
  console.log('Summary:')
  console.log(`- Total industries: ${records.length}`)
  console.log(`- Successful: ${successCount}`)
  console.log(`- Errors: ${errorCount}`)
  console.log(`- Output directory: ${DIGITAL_SOLUTIONS_DIR}`)
  console.log('='.repeat(60))
}

setupDigitalSolutions().catch(console.error)

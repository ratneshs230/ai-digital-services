import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import * as path from 'path'
import { slugify } from './utils'

export interface IndustryData {
  slug: string
  industry: string
  idea: string
  oneLineSummary: string
  problemItSolves: string
  coreSolution: string
  targetUsers: string
  businessImpact: string
  exampleUseCase: string
  documentation: IndustryDocumentation | null
}

export interface IndustryDocumentation {
  industry: string
  services: ServiceSpec[]
}

export interface ServiceSpec {
  name: string
  overview: string
  problems_addressed: string[]
  target_users: string[]
  core_features: string[]
  user_journeys: string[]
  ai_capabilities: string[]
  data_requirements: {
    input_data_types: string[]
    data_schema_recommendations: string[]
    data_sources: string[]
    privacy_and_compliance: string
  }
  integration_plan: {
    required_integrations: string[]
    authentication_strategy: string
  }
  technical_specifications: {
    architecture: string
    recommended_tech_stack: {
      frontend: string
      backend: string
      database: string
      storage: string
      AI: string
      APIs: string
      CI_CD: string
    }
    API_design: string[]
    frontend_components: string[]
  }
  deployment_instructions: string[]
  business_model: {
    pricing_strategy: string[]
    customer_segments: string[]
  }
  success_metrics: string[]
}

function parseDocumentation(docString: string): IndustryDocumentation | null {
  if (!docString || docString.trim() === '') return null

  try {
    // Remove markdown code block markers if present
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

    return JSON.parse(cleanJson) as IndustryDocumentation
  } catch (error) {
    console.warn('Failed to parse documentation JSON:', error)
    return null
  }
}

export function loadIndustriesFromCSV(csvPath?: string): IndustryData[] {
  const filePath = csvPath || path.join(process.cwd(), 'Industry Workflow - Industry Idea.csv')

  if (!fs.existsSync(filePath)) {
    console.error(`CSV file not found: ${filePath}`)
    return []
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
  })

  return records.map((record: Record<string, string>) => {
    const industry = record['Industry'] || ''
    return {
      slug: slugify(industry),
      industry: industry,
      idea: record['Idea'] || '',
      oneLineSummary: record['one_line_summary'] || '',
      problemItSolves: record[' problem_it_solves'] || record['problem_it_solves'] || '',
      coreSolution: record['core_solution'] || '',
      targetUsers: record['target_users'] || '',
      businessImpact: record['business_impact'] || '',
      exampleUseCase: record['example_use_case'] || '',
      documentation: parseDocumentation(record['Documentation'] || ''),
    }
  })
}

export function getIndustryBySlug(slug: string, industries?: IndustryData[]): IndustryData | undefined {
  const data = industries || loadIndustriesFromCSV()
  return data.find(ind => ind.slug === slug)
}

export function getAllIndustrySlugs(industries?: IndustryData[]): string[] {
  const data = industries || loadIndustriesFromCSV()
  return data.map(ind => ind.slug)
}

// Generate a JSON file from the CSV for static usage
export function generateIndustriesJson(outputPath?: string): void {
  const industries = loadIndustriesFromCSV()
  const output = outputPath || path.join(process.cwd(), 'data', 'industries.json')

  // Ensure directory exists
  const dir = path.dirname(output)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(output, JSON.stringify(industries, null, 2))
  console.log(`Generated industries.json with ${industries.length} industries`)
}

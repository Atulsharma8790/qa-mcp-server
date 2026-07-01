import { ask, parseJSON } from '../ai'

export async function generateTestData(args: {
  schema_or_description: string
  format: 'json' | 'csv' | 'sql' | 'yaml'
  count?: number
  constraints?: string
  include_edge_cases?: boolean
}) {
  const { schema_or_description, format, count = 10, constraints, include_edge_cases = true } = args

  const system = `You are a test data engineer. Generate realistic, diverse test data for QA testing.
Include boundary values, special characters, and edge cases where requested.
Respond with valid JSON only.`

  const user = `Schema / Description:
${schema_or_description}

Output format: ${format}
Number of records: ${count}
Constraints: ${constraints || 'none specified'}
Include edge cases (nulls, boundaries, special chars): ${include_edge_cases}

Return JSON:
{
  "format": "${format}",
  "record_count": number,
  "data": "the actual test data as a string in the requested format",
  "edge_cases_included": ["list of edge cases covered"],
  "notes": "any assumptions made about the schema"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

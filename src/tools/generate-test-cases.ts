import { ask, parseJSON } from '../ai'

export async function generateTestCases(args: {
  feature_description: string
  format: 'bdd' | 'plain' | 'both'
  coverage_areas?: string
  negative_cases?: boolean
}) {
  const { feature_description, format, coverage_areas, negative_cases = true } = args

  const system = `You are a senior QA engineer. Generate comprehensive test cases.
Always respond with valid JSON only — no markdown fences, no prose outside JSON.`

  const user = `Feature: ${feature_description}
Format: ${format}
Coverage areas to focus on: ${coverage_areas || 'happy path, edge cases, error handling'}
Include negative/failure cases: ${negative_cases}

Return JSON:
{
  "summary": "brief description of what was tested",
  "total_cases": number,
  "test_cases": [
    {
      "id": "TC-001",
      "title": "...",
      "type": "positive|negative|edge",
      "priority": "high|medium|low",
      "bdd": { "given": "...", "when": "...", "then": "..." },
      "steps": ["step1", "step2"],
      "expected_result": "...",
      "tags": ["regression", "smoke", etc]
    }
  ]
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

import { ask, parseJSON } from '../ai'

export async function findTestGaps(args: {
  feature_spec: string
  existing_tests: string
}) {
  const { feature_spec, existing_tests } = args

  const system = `You are a QA architect performing test coverage analysis. Identify what is NOT tested.
Respond with valid JSON only.`

  const user = `Feature Specification:
${feature_spec}

Existing Test Cases:
${existing_tests}

Analyse coverage and return JSON:
{
  "coverage_score": "estimated % of scenarios covered (0-100)",
  "covered_areas": ["what is already tested"],
  "gaps": [
    {
      "area": "what is missing",
      "risk": "high|medium|low",
      "description": "why this matters",
      "suggested_test": "brief test case to fill this gap"
    }
  ],
  "missing_test_types": ["e.g. performance, security, accessibility tests missing"],
  "priority_gaps": ["top 3 most critical gaps to fix first"],
  "recommendation": "overall coverage assessment and next steps"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

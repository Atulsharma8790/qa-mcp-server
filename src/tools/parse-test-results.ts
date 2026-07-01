import { ask, parseJSON } from '../ai'

export async function parseTestResults(args: {
  results: string
  format?: 'junit-xml' | 'testng-xml' | 'allure-json' | 'plain' | 'auto'
}) {
  const { results, format = 'auto' } = args

  const system = `You are a QA lead. Analyze test execution results and provide actionable insights.
Detect format automatically if 'auto'. Respond with valid JSON only.`

  const user = `Test Results (format: ${format}):
${results}

Return JSON:
{
  "summary": {
    "total": number,
    "passed": number,
    "failed": number,
    "skipped": number,
    "pass_rate": "e.g. 87.5%",
    "duration": "total duration if available"
  },
  "failures": [
    {
      "test_name": "...",
      "error_message": "...",
      "root_cause_hypothesis": "likely reason for failure",
      "suggested_fix": "what to investigate or fix"
    }
  ],
  "flaky_tests": ["tests that look potentially flaky"],
  "slowest_tests": ["top slow tests if duration data available"],
  "patterns": ["any patterns in failures e.g. all auth tests failing"],
  "overall_health": "healthy|warning|critical",
  "recommended_actions": ["prioritized list of actions to take"]
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

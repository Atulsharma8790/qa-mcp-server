import { ask, parseJSON } from '../ai'

export async function generateBugReport(args: {
  description: string
  environment?: string
  steps_to_reproduce?: string
  severity?: 'critical' | 'high' | 'medium' | 'low'
}) {
  const { description, environment, steps_to_reproduce, severity } = args

  const system = `You are a QA engineer writing professional bug reports. Make them clear, reproducible, and developer-friendly.
Respond with valid JSON only.`

  const user = `Raw bug description: ${description}
Environment: ${environment || 'not specified'}
Steps (if provided): ${steps_to_reproduce || 'derive from description'}
Suggested severity: ${severity || 'assess from description'}

Return JSON:
{
  "title": "concise bug title (under 80 chars)",
  "severity": "critical|high|medium|low",
  "priority": "P1|P2|P3|P4",
  "environment": "...",
  "summary": "2-3 sentence clear description",
  "steps_to_reproduce": ["numbered steps"],
  "expected_result": "...",
  "actual_result": "...",
  "impact": "what is affected / who is impacted",
  "possible_root_cause": "hypothesis",
  "attachments_needed": ["screenshots", "logs", etc],
  "labels": ["suggested JIRA labels/tags"],
  "jira_ready": "full formatted bug description ready to paste into JIRA"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

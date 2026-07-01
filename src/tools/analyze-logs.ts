import { ask, parseJSON } from '../ai'

export async function analyzeLogs(args: {
  logs: string
  context?: string
}) {
  const { logs, context } = args

  const system = `You are a senior engineer analysing application logs. Find errors, patterns, and root causes.
Respond with valid JSON only.`

  const user = `Application Context: ${context || 'not specified'}

Logs:
${logs}

Return JSON:
{
  "summary": "overall log health assessment",
  "error_count": number,
  "warning_count": number,
  "errors": [
    {
      "message": "...",
      "count": number,
      "first_occurrence": "timestamp if available",
      "severity": "critical|error|warning",
      "root_cause_hypothesis": "...",
      "suggested_fix": "..."
    }
  ],
  "patterns": ["repeating patterns or anomalies detected"],
  "timeline": "sequence of events if timestamps present",
  "recommended_actions": ["prioritised list"]
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

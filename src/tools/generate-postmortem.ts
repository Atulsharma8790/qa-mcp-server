import { ask, parseJSON } from '../ai'

export async function generatePostmortem(args: {
  incident_description: string
  timeline?: string
  impact?: string
  team?: string
}) {
  const { incident_description, timeline, impact, team } = args

  const system = `You are a senior SRE/QA lead writing a blameless incident postmortem. Focus on systemic issues, not individuals.
Respond with valid JSON only.`

  const user = `Incident: ${incident_description}
Timeline: ${timeline || 'not provided'}
Impact: ${impact || 'not specified'}
Team: ${team || 'not specified'}

Return JSON:
{
  "title": "...",
  "severity": "SEV1|SEV2|SEV3|SEV4",
  "summary": "...",
  "timeline": [{ "time": "...", "event": "..." }],
  "root_cause": "...",
  "contributing_factors": ["..."],
  "impact": { "users_affected": "...", "duration": "...", "business_impact": "..." },
  "what_went_well": ["..."],
  "what_went_wrong": ["..."],
  "action_items": [
    { "action": "...", "owner": "...", "priority": "high|medium|low", "due": "..." }
  ],
  "prevention": "how to prevent recurrence",
  "detection_improvements": "how to detect faster next time"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

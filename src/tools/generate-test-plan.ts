import { ask, parseJSON } from '../ai'

export async function generateTestPlan(args: {
  project_description: string
  scope: string
  tech_stack?: string
  timeline?: string
}) {
  const { project_description, scope, tech_stack, timeline } = args

  const system = `You are a QA lead writing a formal test plan. Be thorough and professional.
Respond with valid JSON only.`

  const user = `Project: ${project_description}
Scope: ${scope}
Tech stack: ${tech_stack || 'not specified'}
Timeline: ${timeline || 'not specified'}

Return JSON:
{
  "test_plan_id": "TP-001",
  "objective": "...",
  "scope": {
    "in_scope": ["..."],
    "out_of_scope": ["..."]
  },
  "test_strategy": {
    "levels": ["unit", "integration", "system", "UAT"],
    "types": ["functional", "regression", "performance", "security", "accessibility"],
    "approach": "description of overall approach"
  },
  "entry_criteria": ["conditions before testing starts"],
  "exit_criteria": ["conditions for testing sign-off"],
  "test_environments": [
    { "name": "QA", "purpose": "...", "owner": "..." }
  ],
  "tools": ["recommended tools for this stack"],
  "risks": [
    { "risk": "...", "mitigation": "..." }
  ],
  "schedule": "high-level testing phases with time allocation",
  "deliverables": ["what QA will produce"],
  "sign_off_checklist": ["checklist items before go-live"]
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

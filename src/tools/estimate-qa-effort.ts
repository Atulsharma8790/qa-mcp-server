import { ask, parseJSON } from '../ai'

export async function estimateQaEffort(args: {
  feature_description: string
  team_size?: number
  automation_coverage_target?: number
  sprint_duration_days?: number
}) {
  const { feature_description, team_size = 1, automation_coverage_target = 70, sprint_duration_days = 14 } = args

  const system = `You are a QA lead with 10+ years of experience estimating testing effort. Give realistic, detailed estimates.
Respond with valid JSON only.`

  const user = `Feature to estimate:
${feature_description}

Team size: ${team_size} QA engineer(s)
Automation coverage target: ${automation_coverage_target}%
Sprint duration: ${sprint_duration_days} days

Return JSON:
{
  "total_effort_days": number,
  "breakdown": {
    "test_planning": "X days",
    "test_case_design": "X days",
    "manual_execution": "X days",
    "automation_development": "X days",
    "bug_verification": "X days",
    "regression": "X days"
  },
  "fits_in_sprint": boolean,
  "risks": ["factors that could increase effort"],
  "assumptions": ["what was assumed for this estimate"],
  "recommendation": "strategy recommendation for the team",
  "automation_candidates": ["test cases best suited for automation"]
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

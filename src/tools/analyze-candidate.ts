import { ask, parseJSON } from '../ai'

export async function analyzeCandidate(args: {
  resume_text: string
  role?: string
  seniority?: string
}) {
  const { resume_text, role = 'QA Engineer', seniority = 'not specified' } = args

  const system = `You are a QA hiring manager. Analyse resumes and provide structured hiring recommendations.
Respond with valid JSON only.`

  const user = `Resume:
${resume_text}

Applying for: ${role} (${seniority})

Return JSON:
{
  "candidate_name": "extracted from resume",
  "hiring_signal": "Strong Yes|Yes|Maybe|No",
  "overall_score": number (0-100),
  "radar": {
    "automation": number (0-10),
    "api_testing": number (0-10),
    "performance": number (0-10),
    "mobile": number (0-10),
    "ci_cd": number (0-10),
    "manual_testing": number (0-10),
    "communication": number (0-10),
    "leadership": number (0-10)
  },
  "tools_detected": ["Selenium", "JIRA", etc],
  "strengths": ["..."],
  "gaps": ["..."],
  "red_flags": ["..."],
  "interview_questions": ["6 targeted questions based on this resume"],
  "executive_summary": "2-3 paragraph hiring recommendation"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

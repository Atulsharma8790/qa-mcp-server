import { ask, parseJSON } from '../ai'

export async function generateInterviewQuestions(args: {
  role: string
  seniority: 'junior' | 'mid' | 'senior' | 'lead' | 'architect'
  focus_areas?: string
  count?: number
}) {
  const { role, seniority, focus_areas, count = 15 } = args

  const system = `You are a QA hiring manager with 15+ years of experience. Generate targeted, role-specific interview questions.
Respond with valid JSON only.`

  const user = `Role: ${role}
Seniority: ${seniority}
Focus areas: ${focus_areas || 'general QA skills, automation, processes'}
Number of questions: ${count}

Return JSON:
{
  "role": "${role}",
  "seniority": "${seniority}",
  "questions": [
    {
      "id": "Q1",
      "category": "technical|behavioral|situational|process",
      "question": "...",
      "what_to_look_for": "key points a strong candidate should cover",
      "red_flags": "warning signs in the answer",
      "difficulty": "easy|medium|hard"
    }
  ],
  "must_ask": ["IDs of the 5 most critical questions"],
  "evaluation_rubric": "brief guide for scoring candidates"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

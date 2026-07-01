import { ask, parseJSON } from '../ai'

export async function evaluatePrompt(args: { prompt: string }) {
  const system = `You are an expert prompt engineer. Score prompts across 6 dimensions.
Respond with valid JSON only.`

  const user = `Evaluate this prompt:
${args.prompt}

Return JSON:
{
  "overallScore": number (0-100),
  "grade": "A|B|C|D|F",
  "scores": [
    { "dimension": "Clarity", "score": number, "rationale": "...", "suggestion": "..." },
    { "dimension": "Specificity", "score": number, "rationale": "...", "suggestion": "..." },
    { "dimension": "Role Definition", "score": number, "rationale": "...", "suggestion": "..." },
    { "dimension": "Output Format", "score": number, "rationale": "...", "suggestion": "..." },
    { "dimension": "Context", "score": number, "rationale": "...", "suggestion": "..." },
    { "dimension": "Constraints", "score": number, "rationale": "...", "suggestion": "..." }
  ],
  "strengths": ["..."],
  "topFixes": ["..."],
  "improvedPrompt": "rewritten improved version"
}`

  const raw = await ask(system, args.prompt)
  return parseJSON(raw)
}

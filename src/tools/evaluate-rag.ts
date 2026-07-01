import { ask, parseJSON } from '../ai'

export async function evaluateRag(args: {
  question: string
  context: string
  answer: string
}) {
  const { question, context, answer } = args

  const system = `You are an expert in RAG evaluation. Score across 4 RAGAS-style metrics and detect hallucinations.
Respond with valid JSON only.`

  const user = `Question: ${question}

Retrieved Context:
${context}

LLM Answer:
${answer}

Return JSON:
{
  "overallScore": number (0-100),
  "hallucinationFlag": boolean,
  "hallucinationDetails": "description if hallucination found, null otherwise",
  "scores": [
    { "metric": "Faithfulness", "score": number, "rationale": "...", "detail": "..." },
    { "metric": "Answer Relevance", "score": number, "rationale": "...", "detail": "..." },
    { "metric": "Context Recall", "score": number, "rationale": "...", "detail": "..." },
    { "metric": "Context Precision", "score": number, "rationale": "...", "detail": "..." }
  ],
  "suggestions": ["actionable improvements"]
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

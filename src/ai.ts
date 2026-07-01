import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const MODEL = 'claude-sonnet-4-6'

export async function ask(system: string, user: string): Promise<string> {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system,
    messages: [{ role: 'user', content: user }],
  })
  const block = msg.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text
}

export function parseJSON<T>(raw: string): T {
  // Strip markdown code fences if present
  let text = raw.trim()
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenced) text = fenced[1].trim()
  // Find the outermost JSON object or array in case of leading/trailing prose
  const objStart = text.indexOf('{')
  const arrStart = text.indexOf('[')
  let start = -1
  if (objStart !== -1 && (arrStart === -1 || objStart < arrStart)) start = objStart
  else if (arrStart !== -1) start = arrStart
  if (start > 0) text = text.slice(start)
  return JSON.parse(text) as T
}

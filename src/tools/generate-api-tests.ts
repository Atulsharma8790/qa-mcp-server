import { ask, parseJSON } from '../ai'

export async function generateApiTests(args: {
  spec: string
  framework: 'postman' | 'rest-assured' | 'pytest-requests' | 'supertest' | 'karate'
  include_auth?: boolean
  include_negative?: boolean
}) {
  const { spec, framework, include_auth = true, include_negative = true } = args

  const system = `You are a senior API test engineer. Given an API spec (OpenAPI YAML/JSON, cURL, or plain description), generate ready-to-run test scripts.
Respond with valid JSON only.`

  const user = `API Spec / Description:
${spec}

Target framework: ${framework}
Include auth scenarios: ${include_auth}
Include negative/error scenarios: ${include_negative}

Return JSON:
{
  "summary": "what APIs are being tested",
  "framework": "${framework}",
  "scenarios": [
    {
      "name": "...",
      "method": "GET|POST|PUT|DELETE|PATCH",
      "endpoint": "...",
      "description": "...",
      "request": { "headers": {}, "body": {}, "params": {} },
      "assertions": ["status is 200", "response contains id", ...],
      "type": "happy_path|negative|auth|performance"
    }
  ],
  "code": "full ready-to-run ${framework} test code as a string"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

import { ask, parseJSON } from '../ai'

export async function convertToAutomation(args: {
  test_case: string
  framework: 'playwright' | 'selenium-java' | 'selenium-python' | 'cypress' | 'webdriverio' | 'appium'
  language?: string
  base_url?: string
  page_object_pattern?: boolean
}) {
  const { test_case, framework, language, base_url, page_object_pattern = false } = args

  const system = `You are a senior test automation engineer. Convert manual test cases into production-quality automation scripts.
Respond with valid JSON only.`

  const user = `Manual Test Case:
${test_case}

Framework: ${framework}
Language: ${language || 'default for framework'}
Base URL: ${base_url || 'https://example.com (replace with actual)'}
Use Page Object Model pattern: ${page_object_pattern}

Return JSON:
{
  "framework": "${framework}",
  "language": "...",
  "files": [
    {
      "filename": "...",
      "description": "what this file contains",
      "code": "full file content as string"
    }
  ],
  "dependencies": ["list of packages/imports needed"],
  "setup_instructions": "how to run this test",
  "notes": "any assumptions or manual steps that couldn't be automated"
}`

  const raw = await ask(system, user)
  return parseJSON(raw)
}

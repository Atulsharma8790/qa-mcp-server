import { NextRequest, NextResponse } from 'next/server'
import { generateTestCases }          from '@/src/tools/generate-test-cases'
import { generateApiTests }           from '@/src/tools/generate-api-tests'
import { convertToAutomation }        from '@/src/tools/convert-to-automation'
import { generateTestData }           from '@/src/tools/generate-test-data'
import { parseTestResults }           from '@/src/tools/parse-test-results'
import { generateBugReport }          from '@/src/tools/generate-bug-report'
import { findTestGaps }               from '@/src/tools/find-test-gaps'
import { estimateQaEffort }           from '@/src/tools/estimate-qa-effort'
import { generateTestPlan }           from '@/src/tools/generate-test-plan'
import { generateInterviewQuestions } from '@/src/tools/generate-interview-questions'
import { evaluatePrompt }             from '@/src/tools/evaluate-prompt'
import { evaluateRag }                from '@/src/tools/evaluate-rag'
import { analyzeCandidate }           from '@/src/tools/analyze-candidate'
import { generatePostmortem }         from '@/src/tools/generate-postmortem'
import { analyzeLogs }                from '@/src/tools/analyze-logs'

const PASSCODE = process.env.MCP_PASSCODE ?? 'qatools2026'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOLS: Record<string, (args: any) => Promise<unknown>> = {
  generate_test_cases:         generateTestCases,
  generate_api_tests:          generateApiTests,
  convert_to_automation:       convertToAutomation,
  generate_test_data:          generateTestData,
  parse_test_results:          parseTestResults,
  generate_bug_report:         generateBugReport,
  find_test_gaps:              findTestGaps,
  estimate_qa_effort:          estimateQaEffort,
  generate_test_plan:          generateTestPlan,
  generate_interview_questions: generateInterviewQuestions,
  evaluate_prompt:             evaluatePrompt,
  evaluate_rag_output:         evaluateRag,
  analyze_qa_candidate:        analyzeCandidate,
  generate_postmortem:         generatePostmortem,
  analyze_logs:                analyzeLogs,
}

export async function POST(req: NextRequest) {
  const { passcode, tool, args } = await req.json()

  if (passcode !== PASSCODE)
    return NextResponse.json({ error: 'Invalid passcode.' }, { status: 401 })

  const fn = TOOLS[tool]
  if (!fn)
    return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 })

  try {
    const result = await fn(args)
    return NextResponse.json({ result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

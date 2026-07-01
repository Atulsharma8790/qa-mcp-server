import { createMcpHandler } from '@vercel/mcp-adapter'
import { z } from 'zod'
import { generateTestCases }        from '@/src/tools/generate-test-cases'
import { generateApiTests }         from '@/src/tools/generate-api-tests'
import { convertToAutomation }      from '@/src/tools/convert-to-automation'
import { generateTestData }         from '@/src/tools/generate-test-data'
import { parseTestResults }         from '@/src/tools/parse-test-results'
import { generateBugReport }        from '@/src/tools/generate-bug-report'
import { findTestGaps }             from '@/src/tools/find-test-gaps'
import { estimateQaEffort }         from '@/src/tools/estimate-qa-effort'
import { generateTestPlan }         from '@/src/tools/generate-test-plan'
import { generateInterviewQuestions } from '@/src/tools/generate-interview-questions'
import { evaluatePrompt }           from '@/src/tools/evaluate-prompt'
import { evaluateRag }              from '@/src/tools/evaluate-rag'
import { analyzeCandidate }         from '@/src/tools/analyze-candidate'
import { generatePostmortem }       from '@/src/tools/generate-postmortem'
import { analyzeLogs }              from '@/src/tools/analyze-logs'

const handler = createMcpHandler(
  server => {

    // ── 1. Generate Test Cases ────────────────────────────────────
    server.tool(
      'generate_test_cases',
      'Generate comprehensive test cases (BDD Gherkin and/or plain) from a feature description. Returns structured JSON with test IDs, steps, priorities, and tags.',
      {
        feature_description: z.string().describe('Describe the feature or user story to test'),
        format: z.enum(['bdd', 'plain', 'both']).default('both').describe('Output format'),
        coverage_areas: z.string().optional().describe('Specific areas to focus on e.g. "login, password reset, session timeout"'),
        negative_cases: z.boolean().default(true).describe('Include negative/failure test cases'),
      },
      async (args) => {
        const result = await generateTestCases(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 2. Generate API Tests ─────────────────────────────────────
    server.tool(
      'generate_api_tests',
      'Generate ready-to-run API test scripts from an OpenAPI spec, cURL examples, or plain description. Supports Postman, REST Assured (Java), pytest-requests (Python), Supertest (JS), and Karate.',
      {
        spec: z.string().describe('OpenAPI YAML/JSON, cURL command, or plain description of the API'),
        framework: z.enum(['postman', 'rest-assured', 'pytest-requests', 'supertest', 'karate']).describe('Target test framework'),
        include_auth: z.boolean().default(true).describe('Include authentication test scenarios'),
        include_negative: z.boolean().default(true).describe('Include error/negative scenarios'),
      },
      async (args) => {
        const result = await generateApiTests(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 3. Convert to Automation ──────────────────────────────────
    server.tool(
      'convert_to_automation',
      'Convert a manual test case into a runnable automation script. Supports Playwright, Selenium (Java/Python), Cypress, WebdriverIO, and Appium.',
      {
        test_case: z.string().describe('Manual test case steps and expected results'),
        framework: z.enum(['playwright', 'selenium-java', 'selenium-python', 'cypress', 'webdriverio', 'appium']).describe('Target automation framework'),
        language: z.string().optional().describe('Programming language (uses framework default if not specified)'),
        base_url: z.string().optional().describe('Base URL for the application under test'),
        page_object_pattern: z.boolean().default(false).describe('Generate Page Object Model structure'),
      },
      async (args) => {
        const result = await convertToAutomation(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 4. Generate Test Data ─────────────────────────────────────
    server.tool(
      'generate_test_data',
      'Generate realistic, diverse test data from a schema or description. Output formats: JSON, CSV, SQL INSERT, or YAML. Includes boundary values and edge cases.',
      {
        schema_or_description: z.string().describe('JSON schema, database table description, or plain description of the data model'),
        format: z.enum(['json', 'csv', 'sql', 'yaml']).describe('Output format'),
        count: z.number().default(10).describe('Number of records to generate'),
        constraints: z.string().optional().describe('Data constraints e.g. "age must be 18-65, email must be unique"'),
        include_edge_cases: z.boolean().default(true).describe('Include nulls, boundaries, special characters'),
      },
      async (args) => {
        const result = await generateTestData(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 5. Parse Test Results ─────────────────────────────────────
    server.tool(
      'parse_test_results',
      'Analyse test execution results (JUnit XML, TestNG, Allure JSON, or plain text) and return an AI summary with failure root causes, flaky test detection, and recommended actions.',
      {
        results: z.string().describe('Raw test results content — paste JUnit XML, TestNG XML, Allure JSON, or plain text output'),
        format: z.enum(['junit-xml', 'testng-xml', 'allure-json', 'plain', 'auto']).default('auto').describe('Results format (auto-detects if not specified)'),
      },
      async (args) => {
        const result = await parseTestResults(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 6. Generate Bug Report ────────────────────────────────────
    server.tool(
      'generate_bug_report',
      'Turn a rough bug description into a professional, JIRA-ready bug report with reproducible steps, severity assessment, impact analysis, and root cause hypothesis.',
      {
        description: z.string().describe('Rough description of the bug — what went wrong'),
        environment: z.string().optional().describe('Browser, OS, app version, environment (e.g. "Chrome 120, macOS, staging")'),
        steps_to_reproduce: z.string().optional().describe('Known steps to reproduce (will be inferred if not provided)'),
        severity: z.enum(['critical', 'high', 'medium', 'low']).optional().describe('Suggested severity (will be assessed if not provided)'),
      },
      async (args) => {
        const result = await generateBugReport(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 7. Find Test Gaps ─────────────────────────────────────────
    server.tool(
      'find_test_gaps',
      'Compare a feature specification against existing test cases and identify untested scenarios, missing test types (performance, security, a11y), and coverage score.',
      {
        feature_spec: z.string().describe('Feature specification, user story, or requirements document'),
        existing_tests: z.string().describe('Existing test cases — paste titles, descriptions, or full test case content'),
      },
      async (args) => {
        const result = await findTestGaps(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 8. Estimate QA Effort ─────────────────────────────────────
    server.tool(
      'estimate_qa_effort',
      'Estimate QA testing effort in person-days for a feature or sprint, broken down by activity (planning, design, execution, automation). Includes risk factors and sprint fit assessment.',
      {
        feature_description: z.string().describe('Feature or sprint scope to estimate'),
        team_size: z.number().default(1).describe('Number of QA engineers available'),
        automation_coverage_target: z.number().default(70).describe('Target automation coverage percentage (0-100)'),
        sprint_duration_days: z.number().default(14).describe('Sprint length in calendar days'),
      },
      async (args) => {
        const result = await estimateQaEffort(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 9. Generate Test Plan ─────────────────────────────────────
    server.tool(
      'generate_test_plan',
      'Generate a formal test plan document including strategy, scope, entry/exit criteria, environments, risk register, and sign-off checklist.',
      {
        project_description: z.string().describe('What the project/product does'),
        scope: z.string().describe('What features or modules are in scope for this test plan'),
        tech_stack: z.string().optional().describe('Technology stack e.g. "React frontend, Java Spring backend, PostgreSQL"'),
        timeline: z.string().optional().describe('Testing timeline or sprint dates'),
      },
      async (args) => {
        const result = await generateTestPlan(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 10. Generate Interview Questions ──────────────────────────
    server.tool(
      'generate_interview_questions',
      'Generate targeted QA interview questions for any role and seniority level, with evaluation guidance, red flags to watch for, and a must-ask shortlist.',
      {
        role: z.string().describe('Job role e.g. "QA Automation Engineer", "SDET", "QA Lead"'),
        seniority: z.enum(['junior', 'mid', 'senior', 'lead', 'architect']).describe('Seniority level'),
        focus_areas: z.string().optional().describe('Specific areas to focus on e.g. "Selenium, API testing, CI/CD"'),
        count: z.number().default(15).describe('Number of questions to generate'),
      },
      async (args) => {
        const result = await generateInterviewQuestions(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 11. Evaluate Prompt ───────────────────────────────────────
    server.tool(
      'evaluate_prompt',
      'Score an LLM prompt across 6 quality dimensions (clarity, specificity, role definition, output format, context, constraints) and receive an improved version.',
      {
        prompt: z.string().describe('The system prompt or full prompt to evaluate'),
      },
      async (args) => {
        const result = await evaluatePrompt(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 12. Evaluate RAG Output ───────────────────────────────────
    server.tool(
      'evaluate_rag_output',
      'Evaluate a RAG pipeline output across 4 RAGAS-style metrics (Faithfulness, Answer Relevance, Context Recall, Context Precision) with hallucination detection.',
      {
        question: z.string().describe('The original user question'),
        context: z.string().describe('The retrieved context chunks used to generate the answer'),
        answer: z.string().describe('The LLM-generated answer to evaluate'),
      },
      async (args) => {
        const result = await evaluateRag(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 13. Analyze QA Candidate ──────────────────────────────────
    server.tool(
      'analyze_qa_candidate',
      'Analyse a QA candidate resume and return a hiring signal (Strong Yes/Yes/Maybe/No), 8-dimension skill radar, strengths, gaps, red flags, and tailored interview questions.',
      {
        resume_text: z.string().describe('Full resume text — paste plain text extracted from PDF/Word'),
        role: z.string().optional().describe('Role being hired for (defaults to QA Engineer)'),
        seniority: z.string().optional().describe('Expected seniority level'),
      },
      async (args) => {
        const result = await analyzeCandidate(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 14. Generate Incident Postmortem ──────────────────────────
    server.tool(
      'generate_postmortem',
      'Generate a blameless incident postmortem with root cause analysis, contributing factors, timeline, impact assessment, and prioritised action items.',
      {
        incident_description: z.string().describe('What happened — describe the incident'),
        timeline: z.string().optional().describe('Sequence of events with timestamps if available'),
        impact: z.string().optional().describe('Users/services affected, duration, business impact'),
        team: z.string().optional().describe('Team or system involved'),
      },
      async (args) => {
        const result = await generatePostmortem(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )

    // ── 15. Analyze Logs ──────────────────────────────────────────
    server.tool(
      'analyze_logs',
      'Parse application/server logs and return a structured analysis: errors grouped by type, root cause hypotheses, anomaly patterns, and recommended fixes.',
      {
        logs: z.string().describe('Raw log content — paste application logs, server logs, or test output'),
        context: z.string().optional().describe('What application/service generated these logs'),
      },
      async (args) => {
        const result = await analyzeLogs(args)
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }
    )
  },
  {},
  { maxDuration: 60 }
)

export { handler as GET, handler as POST }

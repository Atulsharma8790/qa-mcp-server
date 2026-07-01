const TOOLS = [
  {
    name: 'generate_test_cases', emoji: '✅',
    desc: 'Generate BDD Gherkin and/or plain test cases from a feature description. Returns structured JSON with IDs, priorities, steps, and tags.',
    params: [
      { name: 'feature_description', type: 'string', req: true,  desc: 'The feature or user story to test' },
      { name: 'format',              type: '"bdd" | "plain" | "both"', req: false, def: '"both"', desc: 'Output format' },
      { name: 'coverage_areas',      type: 'string', req: false, desc: 'Specific areas to focus on' },
      { name: 'negative_cases',      type: 'boolean', req: false, def: 'true', desc: 'Include negative/failure cases' },
    ],
    returns: '{ summary, total_cases, test_cases[] }',
  },
  {
    name: 'generate_api_tests', emoji: '🔌',
    desc: 'Generate ready-to-run API test scripts from an OpenAPI spec, cURL, or plain description.',
    params: [
      { name: 'spec',             type: 'string', req: true,  desc: 'OpenAPI YAML/JSON, cURL, or plain API description' },
      { name: 'framework',        type: '"postman" | "rest-assured" | "pytest-requests" | "supertest" | "karate"', req: true, desc: 'Target framework' },
      { name: 'include_auth',     type: 'boolean', req: false, def: 'true', desc: 'Include auth scenarios' },
      { name: 'include_negative', type: 'boolean', req: false, def: 'true', desc: 'Include error scenarios' },
    ],
    returns: '{ summary, framework, scenarios[], code }',
  },
  {
    name: 'convert_to_automation', emoji: '🤖',
    desc: 'Convert a manual test case into a runnable automation script with optional Page Object Model.',
    params: [
      { name: 'test_case',           type: 'string', req: true,  desc: 'Manual test case steps and expected results' },
      { name: 'framework',           type: '"playwright" | "selenium-java" | "selenium-python" | "cypress" | "webdriverio" | "appium"', req: true, desc: 'Target framework' },
      { name: 'language',            type: 'string', req: false, desc: 'Language override (uses framework default if not set)' },
      { name: 'base_url',            type: 'string', req: false, desc: 'Application base URL' },
      { name: 'page_object_pattern', type: 'boolean', req: false, def: 'false', desc: 'Generate Page Object Model structure' },
    ],
    returns: '{ framework, language, files[], dependencies[], setup_instructions, notes }',
  },
  {
    name: 'generate_test_data', emoji: '🗄️',
    desc: 'Generate realistic test data with edge cases, boundaries, and special characters.',
    params: [
      { name: 'schema_or_description', type: 'string',  req: true,  desc: 'JSON schema or plain description of the data model' },
      { name: 'format',                type: '"json" | "csv" | "sql" | "yaml"', req: true, desc: 'Output format' },
      { name: 'count',                 type: 'number',  req: false, def: '10',   desc: 'Number of records' },
      { name: 'constraints',           type: 'string',  req: false, desc: 'e.g. "age 18-65, email unique"' },
      { name: 'include_edge_cases',    type: 'boolean', req: false, def: 'true', desc: 'Include nulls, boundaries, special chars' },
    ],
    returns: '{ format, record_count, data, edge_cases_included[], notes }',
  },
  {
    name: 'parse_test_results', emoji: '📊',
    desc: 'Analyse JUnit XML, TestNG, Allure JSON, or plain text test output. Returns failure root causes and recommended actions.',
    params: [
      { name: 'results', type: 'string', req: true,  desc: 'Raw test results content' },
      { name: 'format',  type: '"auto" | "junit-xml" | "testng-xml" | "allure-json" | "plain"', req: false, def: '"auto"', desc: 'Results format' },
    ],
    returns: '{ summary{total,passed,failed,pass_rate}, failures[], flaky_tests[], patterns[], overall_health, recommended_actions[] }',
  },
  {
    name: 'generate_bug_report', emoji: '🐛',
    desc: 'Turn a rough bug description into a professional JIRA-ready bug report with severity, impact, and root cause hypothesis.',
    params: [
      { name: 'description',        type: 'string', req: true,  desc: 'What went wrong' },
      { name: 'environment',        type: 'string', req: false, desc: 'Browser, OS, app version, environment' },
      { name: 'steps_to_reproduce', type: 'string', req: false, desc: 'Known reproduction steps' },
      { name: 'severity',           type: '"critical" | "high" | "medium" | "low"', req: false, desc: 'Suggested severity' },
    ],
    returns: '{ title, severity, priority, steps_to_reproduce[], expected_result, actual_result, impact, jira_ready }',
  },
  {
    name: 'find_test_gaps', emoji: '🔍',
    desc: 'Compare a feature spec against existing test cases to find untested scenarios and coverage score.',
    params: [
      { name: 'feature_spec',    type: 'string', req: true, desc: 'Feature specification or requirements' },
      { name: 'existing_tests',  type: 'string', req: true, desc: 'Existing test case titles or descriptions' },
    ],
    returns: '{ coverage_score, covered_areas[], gaps[]{area,risk,description,suggested_test}, missing_test_types[], priority_gaps[], recommendation }',
  },
  {
    name: 'estimate_qa_effort', emoji: '⏱️',
    desc: 'Estimate QA effort in person-days broken down by activity, with sprint fit assessment and risk factors.',
    params: [
      { name: 'feature_description',       type: 'string',  req: true,  desc: 'Feature or sprint scope' },
      { name: 'team_size',                 type: 'number',  req: false, def: '1',  desc: 'Number of QA engineers' },
      { name: 'automation_coverage_target', type: 'number', req: false, def: '70', desc: 'Target automation % (0-100)' },
      { name: 'sprint_duration_days',      type: 'number',  req: false, def: '14', desc: 'Sprint length in days' },
    ],
    returns: '{ total_effort_days, breakdown{}, fits_in_sprint, risks[], assumptions[], automation_candidates[] }',
  },
  {
    name: 'generate_test_plan', emoji: '📋',
    desc: 'Generate a formal test plan with strategy, scope, entry/exit criteria, risks, environments, and sign-off checklist.',
    params: [
      { name: 'project_description', type: 'string', req: true,  desc: 'What the project does' },
      { name: 'scope',               type: 'string', req: true,  desc: 'Features in scope for testing' },
      { name: 'tech_stack',          type: 'string', req: false, desc: 'Technology stack' },
      { name: 'timeline',            type: 'string', req: false, desc: 'Testing timeline or sprint dates' },
    ],
    returns: '{ objective, scope{in/out}, test_strategy, entry_criteria[], exit_criteria[], environments[], risks[], sign_off_checklist[] }',
  },
  {
    name: 'generate_interview_questions', emoji: '🎯',
    desc: 'Generate targeted QA interview questions with evaluation guidance, red flags, and a must-ask shortlist.',
    params: [
      { name: 'role',        type: 'string', req: true,  desc: 'Job role e.g. "SDET", "QA Lead"' },
      { name: 'seniority',   type: '"junior" | "mid" | "senior" | "lead" | "architect"', req: true, desc: 'Seniority level' },
      { name: 'focus_areas', type: 'string',  req: false, desc: 'Specific skills to probe' },
      { name: 'count',       type: 'number',  req: false, def: '15', desc: 'Number of questions' },
    ],
    returns: '{ questions[]{id,category,question,what_to_look_for,red_flags,difficulty}, must_ask[], evaluation_rubric }',
  },
  {
    name: 'evaluate_prompt', emoji: '⚡',
    desc: 'Score an LLM prompt across 6 quality dimensions with an improved version and priority fixes.',
    params: [
      { name: 'prompt', type: 'string', req: true, desc: 'The system prompt or full prompt to evaluate' },
    ],
    returns: '{ overallScore, grade, scores[]{dimension,score,rationale,suggestion}, strengths[], topFixes[], improvedPrompt }',
  },
  {
    name: 'evaluate_rag_output', emoji: '🔬',
    desc: 'Evaluate a RAG pipeline output across 4 RAGAS-style metrics with hallucination detection.',
    params: [
      { name: 'question', type: 'string', req: true, desc: 'Original user question' },
      { name: 'context',  type: 'string', req: true, desc: 'Retrieved context chunks' },
      { name: 'answer',   type: 'string', req: true, desc: 'LLM-generated answer to evaluate' },
    ],
    returns: '{ overallScore, hallucinationFlag, hallucinationDetails, scores[]{metric,score,rationale,detail}, suggestions[] }',
  },
  {
    name: 'analyze_qa_candidate', emoji: '👤',
    desc: 'Analyse a QA resume and return a hiring signal, 8-dimension skill radar, strengths, gaps, red flags, and tailored interview questions.',
    params: [
      { name: 'resume_text', type: 'string', req: true,  desc: 'Plain text extracted from resume' },
      { name: 'role',        type: 'string', req: false, desc: 'Role being hired for' },
      { name: 'seniority',   type: 'string', req: false, desc: 'Expected seniority' },
    ],
    returns: '{ hiring_signal, overall_score, radar{automation,api_testing,...}, tools_detected[], strengths[], gaps[], red_flags[], interview_questions[], executive_summary }',
  },
  {
    name: 'generate_postmortem', emoji: '🚨',
    desc: 'Generate a blameless incident postmortem with root cause analysis, timeline, and prioritised action items.',
    params: [
      { name: 'incident_description', type: 'string', req: true,  desc: 'What happened' },
      { name: 'timeline',             type: 'string', req: false, desc: 'Events with timestamps' },
      { name: 'impact',               type: 'string', req: false, desc: 'Users/services affected' },
      { name: 'team',                 type: 'string', req: false, desc: 'Team involved' },
    ],
    returns: '{ title, severity, summary, timeline[], root_cause, contributing_factors[], impact{}, what_went_well[], action_items[]{action,priority,due} }',
  },
  {
    name: 'analyze_logs', emoji: '📝',
    desc: 'Parse application/server logs and return grouped errors with root cause hypotheses, patterns, and recommended fixes.',
    params: [
      { name: 'logs',    type: 'string', req: true,  desc: 'Raw log content' },
      { name: 'context', type: 'string', req: false, desc: 'Application or service name' },
    ],
    returns: '{ summary, error_count, warning_count, errors[]{message,count,root_cause_hypothesis,suggested_fix}, patterns[], recommended_actions[] }',
  },
]

const CLIENTS = [
  {
    name: 'Claude Desktop',
    lang: 'json',
    code: `// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "qa-intelligence": {
      "url": "https://qa-mcp-server-theta.vercel.app/api/mcp"
    }
  }
}`,
  },
  {
    name: 'Cursor / VS Code',
    lang: 'json',
    code: `// .cursor/mcp.json  or  .vscode/mcp.json
{
  "servers": {
    "qa-intelligence": {
      "type": "http",
      "url": "https://qa-mcp-server-theta.vercel.app/api/mcp"
    }
  }
}`,
  },
  {
    name: 'Python',
    lang: 'python',
    code: `from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession
import asyncio, json

async def main():
    async with streamablehttp_client(
        "https://qa-mcp-server-theta.vercel.app/api/mcp"
    ) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()
            result = await session.call_tool(
                "generate_test_cases",
                { "feature_description": "User login with 2FA" }
            )
            print(json.dumps(result.content[0].text, indent=2))

asyncio.run(main())`,
  },
  {
    name: 'TypeScript',
    lang: 'typescript',
    code: `import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const client = new Client({ name: 'my-app', version: '1.0' })
const transport = new StreamableHTTPClientTransport(
  new URL('https://qa-mcp-server-theta.vercel.app/api/mcp')
)
await client.connect(transport)

const result = await client.callTool('generate_test_cases', {
  feature_description: 'User login with 2FA',
  format: 'bdd',
})
console.log(result.content[0].text)`,
  },
  {
    name: 'Java',
    lang: 'java',
    code: `// Using OkHttp — MCP Java SDK coming soon
// Direct HTTP call to the playground API endpoint:
OkHttpClient http = new OkHttpClient();
String body = """
  { "passcode": "qatools2026",
    "tool": "generate_test_cases",
    "args": { "feature_description": "User login with 2FA" } }
  """;
Request req = new Request.Builder()
  .url("https://qa-mcp-server-theta.vercel.app/api/playground")
  .post(RequestBody.create(body, MediaType.get("application/json")))
  .build();
Response res = http.newCall(req).execute();
System.out.println(res.body().string());`,
  },
]

const S = {
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 } as React.CSSProperties,
  tag:  (req: boolean) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, background: req ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)', color: req ? '#FCA5A5' : '#818CF8' }) as React.CSSProperties,
}

import React from 'react'

export default function Docs() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>📖 Documentation</h1>
        <p style={{ color: '#64748B', fontSize: 15 }}>All 15 tools — parameters, return types, and integration examples.</p>
      </div>

      {/* MCP endpoint */}
      <div style={{ ...S.card, borderColor: 'rgba(99,102,241,0.25)', marginBottom: 40 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#818CF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Base MCP Endpoint</p>
        <code style={{ fontSize: 15, color: '#A5F3FC', fontFamily: 'monospace' }}>https://qa-mcp-server-theta.vercel.app/api/mcp</code>
        <p style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>Handles both SSE (<code style={{ color: '#7DD3FC' }}>GET</code>) and Streamable HTTP (<code style={{ color: '#7DD3FC' }}>POST</code>) transports automatically.</p>
      </div>

      {/* Client examples */}
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Connecting from your language</h2>
      <div style={{ display: 'grid', gap: 14, marginBottom: 48 }}>
        {CLIENTS.map(c => (
          <div key={c.name} style={S.card}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>{c.name}</p>
            <pre style={{ fontSize: 12, color: '#A5F3FC', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6 }}>{c.code}</pre>
          </div>
        ))}
      </div>

      {/* Tool reference */}
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Tool Reference</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {TOOLS.map(t => (
          <div key={t.name} id={t.name} style={S.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{t.emoji}</span>
              <code style={{ fontSize: 16, fontWeight: 800, color: '#818CF8' }}>{t.name}</code>
            </div>
            <p style={{ color: '#7B8FA8', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>{t.desc}</p>

            <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Parameters</p>
            <div style={{ display: 'grid', gap: 6, marginBottom: 16 }}>
              {t.params.map(p => (
                <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <div>
                    <code style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 700 }}>{p.name}</code>
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      <span style={S.tag(!!p.req)}>{p.req ? 'required' : 'optional'}</span>
                      {('def' in p) && <span style={{ fontSize: 10, color: '#475569', padding: '2px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: 4 }}>default: {p.def}</span>}
                    </div>
                  </div>
                  <div>
                    <code style={{ fontSize: 11, color: '#7DD3FC' }}>{p.type}</code>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Returns</p>
            <code style={{ fontSize: 12, color: '#86EFAC', fontFamily: 'monospace' }}>{t.returns}</code>
          </div>
        ))}
      </div>
    </main>
  )
}

export const metadata = {
  title: 'Guide & Tutorial — QA Intelligence MCP Server',
  description: 'Learn what MCP is, how to connect the QA MCP server to your IDE, and how to use all 15 tools. No setup required to read.',
}

const S = {
  section: { marginBottom: 56 } as React.CSSProperties,
  h2: { fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 } as React.CSSProperties,
  h3: { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 10, marginTop: 20 } as React.CSSProperties,
  p: { fontSize: 14, color: '#94A3B8', lineHeight: 1.75, marginBottom: 10 } as React.CSSProperties,
  card: (border = 'rgba(255,255,255,0.08)') => ({ background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`, borderRadius: 12, padding: '16px 20px', marginBottom: 8 }) as React.CSSProperties,
  tag: (color: string) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: color + '18', color, border: `1px solid ${color}25`, marginRight: 6, marginBottom: 6 }) as React.CSSProperties,
  num: (color: string) => ({ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0, marginTop: 2, background: color + '20', color }) as React.CSSProperties,
  code: { background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#A5F3FC', whiteSpace: 'pre-wrap', wordBreak: 'break-word', display: 'block', lineHeight: 1.7 } as React.CSSProperties,
}

import React from 'react'

export default function Guide() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <a href="/" style={{ fontSize: 12, color: '#475569', textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>← Back to Home</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📖</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>QA MCP Server — Full Guide</h1>
        </div>
        <p style={S.p}>
          Everything you need: what MCP is, how to connect this server to your IDE or language, and how to use all 15 tools effectively. No prior MCP experience required.
        </p>
        <div style={{ marginTop: 12 }}>
          {['Beginner Friendly', 'IDE Integration', 'All Languages', '15 QA Tools'].map(t => (
            <span key={t} style={S.tag('#14B8A6')}>{t}</span>
          ))}
        </div>
      </div>

      {/* Table of Contents */}
      <div style={{ ...S.card('rgba(20,184,166,0.2)'), marginBottom: 48 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#2DD4BF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Contents</p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
          {[
            ['1', 'What is MCP?', '#what-mcp'],
            ['2', 'What is this QA MCP Server?', '#what-server'],
            ['3', 'Connecting to Your IDE', '#connect'],
            ['4', 'Using from Python, TypeScript, Java', '#languages'],
            ['5', 'Tool Walkthrough: All 15 Tools', '#tools'],
            ['6', 'The Playground (no IDE needed)', '#playground'],
            ['7', 'Common Patterns & Workflows', '#workflows'],
            ['8', 'Tips & Troubleshooting', '#tips'],
          ].map(([n, label, href]) => (
            <li key={href}>
              <a href={href} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#94A3B8', fontSize: 13 }}>
                <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: 11, width: 16 }}>{n}.</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Section 1 */}
      <section id="what-mcp" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>1.</span> What is MCP?</h2>
        <p style={S.p}>
          MCP stands for <strong style={{ color: '#fff' }}>Model Context Protocol</strong> — an open standard developed by Anthropic that lets AI assistants (like Claude) talk to external tools, APIs, and services in a structured way.
        </p>
        <p style={S.p}>
          Think of it like this: before MCP, if you wanted Claude to check your test results, you had to copy-paste them into the chat. With MCP, Claude can call a tool directly — <em style={{ color: '#CBD5E1' }}>without leaving your editor</em>.
        </p>
        <div style={S.card('rgba(99,102,241,0.2)')}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#818CF8', marginBottom: 8 }}>The analogy</p>
          <p style={{ fontSize: 13, color: '#7B8FA8', lineHeight: 1.7 }}>
            MCP is to AI what REST APIs are to web apps. It gives AI a standardised way to call external capabilities — generate test cases, parse a JUnit report, evaluate a prompt — and get structured results back. The AI can then reason over those results, ask follow-up questions, or chain multiple tool calls together.
          </p>
        </div>
        <h3 style={S.h3}>Which tools support MCP?</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {[
            { tool: 'Claude Desktop', desc: 'Native MCP support. Add the server URL in config and use tools in any conversation.' },
            { tool: 'Cursor', desc: 'MCP support in .cursor/mcp.json. Claude can call tools while writing or reviewing code.' },
            { tool: 'VS Code Copilot', desc: 'MCP support via .vscode/mcp.json. Works alongside GitHub Copilot.' },
            { tool: 'Any MCP Client', desc: 'Python, TypeScript, Java, Go — official SDKs available for all major languages.' },
          ].map(({ tool, desc }) => (
            <div key={tool} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2DD4BF', width: 130, flexShrink: 0 }}>{tool}</span>
              <span style={{ fontSize: 12, color: '#64748B' }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section id="what-server" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>2.</span> What is this QA MCP Server?</h2>
        <p style={S.p}>
          This is a purpose-built MCP server that exposes <strong style={{ color: '#fff' }}>15 AI-powered QA & SDLC tools</strong> to any AI client or language. Instead of opening a web app, you can call these tools directly from your IDE or scripts while you work.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { emoji: '✅', name: 'Test Case Generation', desc: 'BDD + plain from feature descriptions' },
            { emoji: '🔌', name: 'API Test Scripts', desc: 'Postman, pytest, REST Assured, Karate' },
            { emoji: '🤖', name: 'Automation Conversion', desc: 'Manual → Playwright, Selenium, Cypress' },
            { emoji: '📊', name: 'Results Analysis', desc: 'JUnit / Allure → root cause insights' },
            { emoji: '🐛', name: 'Bug Reports', desc: 'Raw description → JIRA-ready report' },
            { emoji: '🔍', name: 'Test Gap Analysis', desc: 'Coverage score + missing scenarios' },
            { emoji: '⏱️', name: 'Effort Estimation', desc: 'Feature → person-day breakdown' },
            { emoji: '📋', name: 'Test Plan Generation', desc: 'Full plan with risks + sign-off' },
            { emoji: '🎯', name: 'Interview Questions', desc: 'Role + seniority → targeted Qs' },
            { emoji: '🚨', name: 'Postmortem Generation', desc: 'Incident → blameless postmortem' },
          ].map(({ emoji, name, desc }) => (
            <div key={name} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 14 }}>{emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0' }}>{name}</span>
              </div>
              <p style={{ fontSize: 11, color: '#475569', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <p style={S.p}>All tools are <strong style={{ color: '#fff' }}>language-agnostic</strong> — the MCP protocol means it does not matter if you code in Python, Java, TypeScript, or Go. The server handles everything.</p>
      </section>

      {/* Section 3 */}
      <section id="connect" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>3.</span> Connecting to Your IDE</h2>
        <p style={S.p}>Pick your editor and follow the one-time setup. After this, the tools are available in every conversation or code session.</p>

        <h3 style={S.h3}>Claude Desktop</h3>
        <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'grid', gap: 12 }}>
          {[
            { step: 'Open config file', detail: 'Mac: ~/Library/Application Support/Claude/claude_desktop_config.json\nWindows: %APPDATA%/Claude/claude_desktop_config.json' },
            { step: 'Add this block', detail: `{\n  "mcpServers": {\n    "qa-intelligence": {\n      "url": "https://qa-mcp-server-theta.vercel.app/api/mcp"\n    }\n  }\n}` },
            { step: 'Restart Claude Desktop', detail: 'Quit and reopen. You should see the QA tools appear when you click the ⚡ icon in a conversation.' },
          ].map(({ step, detail }, i) => (
            <li key={i} style={{ display: 'flex', gap: 14 }}>
              <div style={S.num('#14B8A6')}>{i + 1}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{step}</p>
                <pre style={S.code}>{detail}</pre>
              </div>
            </li>
          ))}
        </ol>

        <h3 style={S.h3}>Cursor</h3>
        <p style={{ ...S.p, marginBottom: 8 }}>Create or edit <code style={{ color: '#A5F3FC', fontSize: 12 }}>.cursor/mcp.json</code> in your project root:</p>
        <pre style={S.code}>{`{
  "servers": {
    "qa-intelligence": {
      "type": "http",
      "url": "https://qa-mcp-server-theta.vercel.app/api/mcp"
    }
  }
}`}</pre>
        <p style={{ ...S.p, marginTop: 8 }}>Reload the window. In any Cursor chat, ask Claude: <em style={{ color: '#CBD5E1' }}>"Generate BDD test cases for the login feature"</em> and it will call the tool automatically.</p>

        <h3 style={S.h3}>VS Code Copilot</h3>
        <p style={{ ...S.p, marginBottom: 8 }}>Create <code style={{ color: '#A5F3FC', fontSize: 12 }}>.vscode/mcp.json</code>:</p>
        <pre style={S.code}>{`{
  "servers": {
    "qa-intelligence": {
      "type": "http",
      "url": "https://qa-mcp-server-theta.vercel.app/api/mcp"
    }
  }
}`}</pre>
      </section>

      {/* Section 4 */}
      <section id="languages" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>4.</span> Using from Python, TypeScript, Java</h2>
        <p style={S.p}>Any language with an HTTP client can call the tools. Install the MCP SDK for the best experience, or use the Playground REST API for a simpler direct call.</p>

        <h3 style={S.h3}>Python — via MCP SDK</h3>
        <pre style={{ ...S.code, marginBottom: 16 }}>{`pip install mcp

import asyncio
from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession

async def main():
    async with streamablehttp_client(
        "https://qa-mcp-server-theta.vercel.app/api/mcp"
    ) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # Generate BDD test cases
            result = await session.call_tool(
                "generate_test_cases",
                {
                    "feature_description": "User can reset password via email OTP",
                    "format": "bdd",
                    "negative_cases": True
                }
            )
            import json
            print(json.loads(result.content[0].text))

asyncio.run(main())`}</pre>

        <h3 style={S.h3}>TypeScript / Node.js — via MCP SDK</h3>
        <pre style={{ ...S.code, marginBottom: 16 }}>{`npm install @modelcontextprotocol/sdk

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const client = new Client({ name: 'my-qa-pipeline', version: '1.0' })
const transport = new StreamableHTTPClientTransport(
  new URL('https://qa-mcp-server-theta.vercel.app/api/mcp')
)
await client.connect(transport)

// Parse failed test results
const result = await client.callTool('parse_test_results', {
  results: junitXmlContent,
  format: 'junit-xml'
})
const analysis = JSON.parse(result.content[0].text)
console.log('Failed tests:', analysis.failures)`}</pre>

        <h3 style={S.h3}>Java — via Playground REST API</h3>
        <p style={{ ...S.p, fontSize: 12 }}>The Java MCP SDK is in early development. Use the Playground API endpoint directly — it is a plain HTTP POST:</p>
        <pre style={S.code}>{`// Using OkHttp (or any HTTP client)
OkHttpClient client = new OkHttpClient();

String requestBody = """
    {
      "passcode": "YOUR_PASSCODE",
      "tool": "generate_bug_report",
      "args": {
        "description": "Checkout fails silently when cart has 5+ items",
        "environment": "Chrome 120, macOS, production",
        "severity": "high"
      }
    }
    """;

Request request = new Request.Builder()
    .url("https://qa-mcp-server-theta.vercel.app/api/playground")
    .post(RequestBody.create(requestBody,
          MediaType.get("application/json")))
    .build();

try (Response response = client.newCall(request).execute()) {
    System.out.println(response.body().string());
}`}</pre>
      </section>

      {/* Section 5 */}
      <section id="tools" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>5.</span> Tool Walkthrough: All 15 Tools</h2>
        <p style={S.p}>Here is when to reach for each tool and what it gives you back.</p>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            {
              emoji: '✅', name: 'generate_test_cases',
              when: 'You have a user story, feature spec, or JIRA ticket and need test cases fast.',
              gives: 'Structured test cases with IDs, BDD Given/When/Then, steps, expected result, priority (high/medium/low), and tags (regression, smoke, etc.)',
              tip: 'Set format: "both" to get BDD and plain side-by-side. Paste the output directly into your test management tool.',
            },
            {
              emoji: '🔌', name: 'generate_api_tests',
              when: 'You have an API spec, cURL example, or endpoint description and need runnable test code.',
              gives: 'Full test code in your chosen framework (Postman collection JSON, pytest file, REST Assured class, etc.) plus a scenarios list.',
              tip: 'Paste the full OpenAPI YAML for the best results. For a single endpoint, a cURL or plain description works fine.',
            },
            {
              emoji: '🤖', name: 'convert_to_automation',
              when: 'You have manual test steps that need to be automated.',
              gives: 'Ready-to-run code files in your framework with dependencies list and setup instructions. Enable page_object_pattern for production-quality structure.',
              tip: 'Include the base_url so the generated script targets the right environment.',
            },
            {
              emoji: '🗄️', name: 'generate_test_data',
              when: 'You need realistic test data for a database table, API payload, or CSV import.',
              gives: 'Data in JSON/CSV/SQL/YAML format with realistic values, boundary values, and edge cases (nulls, special characters, max-length strings).',
              tip: 'Set include_edge_cases: true — this generates the tricky records that break applications.',
            },
            {
              emoji: '📊', name: 'parse_test_results',
              when: 'Your CI/CD pipeline ran tests. You have JUnit XML, TestNG output, or Allure JSON and want to understand what failed and why.',
              gives: 'Pass/fail summary, grouped failure analysis with root cause hypotheses and suggested fixes, flaky test detection, and overall health (healthy/warning/critical).',
              tip: 'Paste the raw XML or JSON directly — no pre-processing needed. The tool auto-detects format.',
            },
            {
              emoji: '🐛', name: 'generate_bug_report',
              when: 'You found a bug and need a well-structured JIRA ticket without spending 20 minutes writing it.',
              gives: 'Title, severity, priority, numbered reproduction steps, expected vs actual result, impact assessment, root cause hypothesis, and a complete JIRA-ready description.',
              tip: 'Even a rough 2-3 sentence description produces a professional report. Add environment details for higher accuracy.',
            },
            {
              emoji: '🔍', name: 'find_test_gaps',
              when: 'You have existing tests and want to know what is NOT covered before a release.',
              gives: 'Coverage score (%), list of covered areas, gaps with risk levels and suggested tests, missing test types (security, a11y, performance), and top 3 priority gaps.',
              tip: 'Paste just the test titles — does not need to be full test code. Even a list of 10 test names gives meaningful gap analysis.',
            },
            {
              emoji: '⏱️', name: 'estimate_qa_effort',
              when: 'Sprint planning: you need a realistic QA effort estimate before committing to a sprint scope.',
              gives: 'Effort in person-days broken down by activity (planning, design, execution, automation, regression), sprint fit assessment, risks, and automation candidates.',
              tip: 'Set team_size accurately — a 2-person QA team has very different capacity than 1 engineer.',
            },
            {
              emoji: '📋', name: 'generate_test_plan',
              when: 'Starting a new project, feature, or release cycle and need a formal test plan document.',
              gives: 'Complete test plan: objective, in/out scope, test strategy (levels and types), entry/exit criteria, environments, tools, risk register, schedule, deliverables, and sign-off checklist.',
              tip: 'Use the output as a starting template — it is designed to be edited, not treated as final.',
            },
            {
              emoji: '🎯', name: 'generate_interview_questions',
              when: 'You are hiring a QA engineer and need targeted, seniority-appropriate interview questions.',
              gives: 'Questions categorised by type (technical/behavioural/situational/process), what to look for in a strong answer, red flags to watch for, difficulty rating, and a must-ask shortlist.',
              tip: 'Specify focus_areas to probe specific technologies the role requires (e.g. "Playwright, k6, GitHub Actions").',
            },
            {
              emoji: '⚡', name: 'evaluate_prompt',
              when: 'You wrote or received an LLM prompt and want to know objectively how good it is.',
              gives: 'Score 0–100 across 6 dimensions (clarity, specificity, role definition, output format, context, constraints), an improved version, and priority fixes.',
              tip: 'Score below 60 = significant rework needed. Use the improved version as a starting point.',
            },
            {
              emoji: '🔬', name: 'evaluate_rag_output',
              when: 'You built a RAG pipeline (chatbot over documents) and want to check if the answers are accurate.',
              gives: 'Faithfulness, Answer Relevance, Context Recall, Context Precision scores + hallucination detection with exact description of what was fabricated.',
              tip: 'If Faithfulness < 7, your answer contains fabricated claims. Check the hallucinationDetails field for specifics.',
            },
            {
              emoji: '👤', name: 'analyze_qa_candidate',
              when: 'You received a QA resume and need a structured, consistent evaluation quickly.',
              gives: 'Hiring signal (Strong Yes/Yes/Maybe/No), 8-dimension skill radar, tool detection, strengths, gaps, red flags, 6 tailored interview questions, and executive summary.',
              tip: 'Extract plain text from the PDF first (use any PDF-to-text tool) then paste here.',
            },
            {
              emoji: '🚨', name: 'generate_postmortem',
              when: 'A production incident occurred and you need a blameless postmortem written up.',
              gives: 'Severity classification, reconstructed timeline, 5-Whys root cause analysis, contributing factors, what went well/wrong, and prioritised action items with owners.',
              tip: 'Even a rough incident description produces a solid postmortem draft. Add the actual timeline if you have it for higher accuracy.',
            },
            {
              emoji: '📝', name: 'analyze_logs',
              when: 'Something broke and you have application/server logs but need to find the signal in the noise.',
              gives: 'Error count, warning count, grouped errors with root cause hypotheses and suggested fixes, anomaly patterns, and a prioritised action list.',
              tip: 'You do not need to clean the logs first. Paste raw output — the tool handles mixed formats.',
            },
          ].map(({ emoji, name, when, gives, tip }) => (
            <div key={name} style={{ ...S.card(), padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{emoji}</span>
                <code style={{ fontSize: 13, fontWeight: 800, color: '#2DD4BF' }}>{name}</code>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', width: 60, flexShrink: 0, paddingTop: 1 }}>When</span>
                  <span style={{ fontSize: 13, color: '#7B8FA8', lineHeight: 1.6 }}>{when}</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', width: 60, flexShrink: 0, paddingTop: 1 }}>Gives</span>
                  <span style={{ fontSize: 13, color: '#7B8FA8', lineHeight: 1.6 }}>{gives}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, padding: '8px 10px', background: 'rgba(20,184,166,0.05)', borderRadius: 8, marginTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0D9488', textTransform: 'uppercase', width: 60, flexShrink: 0, paddingTop: 1 }}>Tip</span>
                  <span style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 */}
      <section id="playground" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>6.</span> The Playground (no IDE needed)</h2>
        <p style={S.p}>
          The <a href="/playground" style={{ color: '#2DD4BF' }}>Playground</a> is a web interface where anyone can try all 15 tools without installing anything or connecting an IDE. Perfect for demos, onboarding, or exploring capabilities.
        </p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
          {[
            { step: 'Enter the passcode', detail: 'Request the passcode from the server owner. It is shared separately to prevent public abuse.' },
            { step: 'Pick a tool', detail: 'Choose from the left sidebar. Every tool has a "Load Example" button — hit that first to see it in action with a pre-filled, realistic input.' },
            { step: 'Fill in your inputs', detail: 'Replace the example with your own content. Required fields are marked with ★. Optional fields add precision but are not needed.' },
            { step: 'Click Run', detail: 'The tool calls the AI and returns structured JSON. Use "Copy JSON" to grab the output for your pipeline or documentation.' },
          ].map(({ step, detail }, i) => (
            <li key={i} style={{ display: 'flex', gap: 14 }}>
              <div style={S.num('#14B8A6')}>{i + 1}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{step}</p>
                <p style={{ fontSize: 13, color: '#7B8FA8', margin: 0 }}>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 7 */}
      <section id="workflows" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>7.</span> Common Patterns & Workflows</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {[
            {
              title: 'Feature testing workflow (start to finish)',
              steps: ['generate_test_cases — get BDD scenarios from the user story', 'find_test_gaps — cross-check against any existing tests', 'generate_test_data — get realistic data for the test cases', 'convert_to_automation — convert the top priority cases to Playwright'],
            },
            {
              title: 'CI/CD failure triage',
              steps: ['parse_test_results — understand what failed and why', 'analyze_logs — correlate with application logs if tests are environment-sensitive', 'generate_bug_report — raise the top failures as structured JIRA tickets'],
            },
            {
              title: 'Sprint planning',
              steps: ['estimate_qa_effort — get an effort breakdown for the sprint scope', 'generate_test_plan — produce a test plan for the sprint', 'find_test_gaps — identify what regression to prioritise'],
            },
            {
              title: 'New API → tests in 3 calls',
              steps: ['generate_api_tests — get Postman collection + test code from the spec', 'generate_test_data — get request payloads for edge case testing', 'evaluate_prompt (optional) — if the API uses an LLM, evaluate its prompt quality'],
            },
          ].map(({ title, steps }) => (
            <div key={title} style={S.card('rgba(20,184,166,0.15)')}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#2DD4BF', marginBottom: 10 }}>→ {title}</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                {steps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#7B8FA8' }}>
                    <span style={{ color: '#14B8A6', fontWeight: 700 }}>{i + 1}.</span>
                    <span><code style={{ color: '#A5F3FC', fontSize: 12 }}>{s.split(' — ')[0]}</code> — {s.split(' — ')[1]}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8 */}
      <section id="tips" style={S.section}>
        <h2 style={S.h2}><span style={{ color: '#14B8A6' }}>8.</span> Tips & Troubleshooting</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            { type: 'tip', title: 'All outputs are JSON', detail: 'Every tool returns structured JSON, not prose. This means you can use the output programmatically — pipe it into a script, save it to a file, or feed it into another tool.' },
            { type: 'tip', title: 'Chain tools in sequence', detail: 'The output of one tool can become the input of the next. For example: use generate_test_cases, then pass the test_cases array to find_test_gaps as existing_tests.' },
            { type: 'tip', title: 'More input = better output', detail: 'These tools are AI — the more context you provide, the more accurate and specific the output. A 3-sentence feature description produces generic cases. A 2-paragraph description with constraints produces precise, relevant cases.' },
            { type: 'avoid', title: 'Do not paste sensitive data', detail: 'The tools call an AI API — do not paste production credentials, PII, or confidential customer data into any field. Use anonymised or synthetic data for testing.' },
            { type: 'avoid', title: 'Treat output as a draft, not final', detail: 'AI-generated test cases, effort estimates, and bug reports are starting points. Review and adjust before using in production workflows. The tools dramatically reduce time-to-first-draft, not thinking time.' },
            { type: 'avoid', title: '"Connection refused" or 404', detail: 'The MCP endpoint URL must match exactly. Make sure you are using /api/mcp (not /api or /mcp). If self-hosting locally, the server must be running on the expected port.' },
          ].map(({ type, title, detail }) => (
            <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderRadius: 10,
              background: type === 'tip' ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
              border: `1px solid ${type === 'tip' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}` }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{type === 'tip' ? '✓' : '⚠'}</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: type === 'tip' ? '#86EFAC' : '#FCA5A5' }}>
                  {type === 'tip' ? 'Tip: ' : 'Avoid: '}{title}
                </p>
                <p style={{ fontSize: 13, color: '#7B8FA8', margin: 0, lineHeight: 1.6 }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '40px 32px', borderRadius: 20, background: 'linear-gradient(135deg,rgba(20,184,166,0.07),rgba(99,102,241,0.07))', border: '1px solid rgba(20,184,166,0.15)' }}>
        <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Ready to try it?</p>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Use the Playground for zero-setup access, or connect your IDE for the full experience.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/playground" style={{ background: 'linear-gradient(135deg,#14B8A6,#06B6D4)', color: '#fff', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
            ▶ Open Playground
          </a>
          <a href="/docs" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
            📖 Full API Docs
          </a>
        </div>
      </div>

    </main>
  )
}

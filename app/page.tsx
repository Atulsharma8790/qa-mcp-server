const TOOLS = [
  { name: 'generate_test_cases',          emoji: '✅', desc: 'BDD + plain test cases from a feature description' },
  { name: 'generate_api_tests',           emoji: '🔌', desc: 'Postman / REST Assured / pytest / Supertest / Karate from API spec' },
  { name: 'convert_to_automation',        emoji: '🤖', desc: 'Manual test case → Playwright / Selenium / Cypress / Appium script' },
  { name: 'generate_test_data',           emoji: '🗄️',  desc: 'Realistic test data as JSON / CSV / SQL / YAML with edge cases' },
  { name: 'parse_test_results',           emoji: '📊', desc: 'JUnit XML / TestNG / Allure → AI failure analysis & root causes' },
  { name: 'generate_bug_report',          emoji: '🐛', desc: 'Rough description → structured, JIRA-ready bug report' },
  { name: 'find_test_gaps',               emoji: '🔍', desc: 'Compare spec vs existing tests → coverage score + missing scenarios' },
  { name: 'estimate_qa_effort',           emoji: '⏱️',  desc: 'Feature description → effort breakdown in person-days' },
  { name: 'generate_test_plan',           emoji: '📋', desc: 'Full formal test plan with strategy, risks & sign-off checklist' },
  { name: 'generate_interview_questions', emoji: '🎯', desc: 'Targeted QA interview questions by role + seniority' },
  { name: 'evaluate_prompt',             emoji: '⚡', desc: 'Score an LLM prompt across 6 quality dimensions' },
  { name: 'evaluate_rag_output',          emoji: '🔬', desc: 'RAGAS-style RAG evaluation + hallucination detection' },
  { name: 'analyze_qa_candidate',         emoji: '👤', desc: 'Resume → hiring signal, skill radar, red flags, interview Qs' },
  { name: 'generate_postmortem',          emoji: '🚨', desc: 'Incident description → blameless postmortem + action items' },
  { name: 'analyze_logs',                emoji: '📝', desc: 'Paste app logs → error analysis, patterns, root causes' },
]

const CARD: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12, padding: '14px 18px',
}

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 999, padding: '6px 16px', fontSize: 12, color: '#818CF8', marginBottom: 20 }}>
          ⚡ 15 AI-powered tools · Language agnostic · MCP protocol
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
          <span style={{ background: 'linear-gradient(135deg,#6366F1,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>QA Intelligence</span>
          <br />MCP Server
        </h1>
        <p style={{ color: '#7B8FA8', fontSize: 16, maxWidth: 540, margin: '0 auto 32px' }}>
          AI-powered QA & SDLC tools callable from any IDE, any language — Python, TypeScript, Java, Go — via the Model Context Protocol.
        </p>
        <p style={{ color: '#475569', fontSize: 13, marginBottom: 32 }}>
          Built by <strong style={{ color: '#94A3B8' }}>Atul Sharma</strong> · QA Automation Architect
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/playground" style={{ background: 'linear-gradient(135deg,#6366F1,#818CF8)', color: '#fff', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            ▶ Try the Playground
          </a>
          <a href="/docs" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            📖 View Docs
          </a>
        </div>
      </div>

      {/* MCP Endpoint callout */}
      <div style={{ ...CARD, borderColor: 'rgba(99,102,241,0.25)', marginBottom: 48, padding: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#818CF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>MCP Endpoint</p>
        <code style={{ fontSize: 14, color: '#A5F3FC', fontFamily: 'monospace' }}>
          https://your-deployment.vercel.app/api/mcp
        </code>
        <p style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>
          Supports both SSE and Streamable HTTP transports. Compatible with Claude Desktop, Cursor, VS Code Copilot, and any MCP client.
        </p>
      </div>

      {/* Tools grid */}
      <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>All 15 Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 10, marginBottom: 64 }}>
        {TOOLS.map(t => (
          <div key={t.name} style={CARD}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{t.emoji}</span>
              <code style={{ fontSize: 12, fontWeight: 700, color: '#818CF8' }}>{t.name}</code>
            </div>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick connect */}
      <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Quick Connect</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 64 }}>
        {[
          {
            label: 'Claude Desktop',
            code: `// claude_desktop_config.json
{
  "mcpServers": {
    "qa-intelligence": {
      "url": "https://your-deployment.vercel.app/api/mcp"
    }
  }
}`,
          },
          {
            label: 'Python (mcp client)',
            code: `from mcp import ClientSession, StdioServerParameters
from mcp.client.streamable_http import streamablehttp_client

async with streamablehttp_client(
  "https://your-deployment.vercel.app/api/mcp"
) as (r, w, _):
  async with ClientSession(r, w) as session:
    await session.initialize()
    result = await session.call_tool(
      "generate_test_cases",
      {"feature_description": "Login with OTP"}
    )`,
          },
        ].map(({ label, code }) => (
          <div key={label} style={CARD}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>{label}</p>
            <pre style={{ fontSize: 11, color: '#A5F3FC', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
          </div>
        ))}
      </div>
    </main>
  )
}

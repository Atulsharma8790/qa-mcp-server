'use client'
import { useState, useRef, useEffect } from 'react'

const SESSION_KEY = 'mcp_authed'

// ── Tool definitions ──────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'generate_test_cases',
    emoji: '✅',
    label: 'Generate Test Cases',
    hint: 'Paste a user story or feature description → get BDD Gherkin + plain test cases with IDs, priorities, and tags.',
    fields: [
      { key: 'feature_description', label: 'Feature Description', type: 'textarea', required: true, placeholder: 'e.g. User can reset their password via email OTP' },
      { key: 'format', label: 'Format', type: 'select', options: ['both', 'bdd', 'plain'] },
      { key: 'coverage_areas', label: 'Coverage Areas (optional)', type: 'text', placeholder: 'e.g. happy path, rate limiting, expired OTP' },
      { key: 'negative_cases', label: 'Include negative cases', type: 'boolean' },
    ],
    example: { feature_description: 'User can log in with email + password. Account locks after 5 failed attempts. Supports "Remember me" for 30-day sessions.', format: 'both', negative_cases: true },
  },
  {
    name: 'generate_api_tests',
    emoji: '🔌',
    label: 'Generate API Tests',
    hint: 'Paste an OpenAPI spec, cURL, or endpoint description → get runnable test code in Postman, pytest, REST Assured, Supertest, or Karate.',
    fields: [
      { key: 'spec', label: 'API Spec / cURL / Description', type: 'textarea', required: true, placeholder: 'Paste OpenAPI YAML, a cURL command, or plain description of the API' },
      { key: 'framework', label: 'Framework', type: 'select', options: ['postman', 'rest-assured', 'pytest-requests', 'supertest', 'karate'] },
      { key: 'include_auth', label: 'Include auth scenarios', type: 'boolean' },
      { key: 'include_negative', label: 'Include negative scenarios', type: 'boolean' },
    ],
    example: { spec: 'POST /api/v1/users — creates a new user. Body: { name: string, email: string, role: "admin"|"user" }. Returns 201 with user object. Returns 400 if email invalid. Returns 409 if email already exists. Requires Bearer token.', framework: 'pytest-requests', include_auth: true, include_negative: true },
  },
  {
    name: 'convert_to_automation',
    emoji: '🤖',
    label: 'Convert to Automation',
    hint: 'Paste manual test steps → get ready-to-run Playwright, Selenium, Cypress, or Appium code with dependencies and setup instructions.',
    fields: [
      { key: 'test_case', label: 'Manual Test Case', type: 'textarea', required: true, placeholder: 'Paste your manual test steps and expected results' },
      { key: 'framework', label: 'Framework', type: 'select', options: ['playwright', 'selenium-java', 'selenium-python', 'cypress', 'webdriverio', 'appium'] },
      { key: 'base_url', label: 'Base URL (optional)', type: 'text', placeholder: 'https://app.example.com' },
      { key: 'page_object_pattern', label: 'Use Page Object Pattern', type: 'boolean' },
    ],
    example: { test_case: 'Test: Login with valid credentials\n1. Navigate to /login\n2. Enter email: test@example.com\n3. Enter password: Test@123\n4. Click "Sign In" button\nExpected: User is redirected to /dashboard and sees "Welcome" message', framework: 'playwright', page_object_pattern: false },
  },
  {
    name: 'generate_test_data',
    emoji: '🗄️',
    label: 'Generate Test Data',
    hint: 'Describe a data model or paste a schema → get realistic test records as JSON, CSV, SQL, or YAML with edge cases and boundary values.',
    fields: [
      { key: 'schema_or_description', label: 'Schema / Description', type: 'textarea', required: true, placeholder: 'Describe your data model or paste a JSON schema' },
      { key: 'format', label: 'Output Format', type: 'select', options: ['json', 'csv', 'sql', 'yaml'] },
      { key: 'count', label: 'Number of Records', type: 'number', placeholder: '10' },
      { key: 'constraints', label: 'Constraints (optional)', type: 'text', placeholder: 'e.g. age 18-65, email must be unique' },
      { key: 'include_edge_cases', label: 'Include edge cases', type: 'boolean' },
    ],
    example: { schema_or_description: 'E-commerce Order: id (UUID), customer_name, customer_email, product_name, quantity (1-50), unit_price, order_date, status (pending/shipped/delivered/cancelled)', format: 'json', count: 8, include_edge_cases: true },
  },
  {
    name: 'parse_test_results',
    emoji: '📊',
    label: 'Parse Test Results',
    hint: 'Paste JUnit XML, TestNG, Allure JSON, or plain test output → get AI failure analysis, root cause hypotheses, and recommended fixes.',
    fields: [
      { key: 'results', label: 'Test Results', type: 'textarea', required: true, placeholder: 'Paste JUnit XML, TestNG XML, Allure JSON, or plain test output' },
      { key: 'format', label: 'Format', type: 'select', options: ['auto', 'junit-xml', 'testng-xml', 'allure-json', 'plain'] },
    ],
    example: { results: `<?xml version="1.0" encoding="UTF-8"?>\n<testsuite name="LoginTests" tests="5" failures="2" time="12.4">\n  <testcase name="testLoginSuccess" time="1.2"/>\n  <testcase name="testLoginInvalidPassword" time="0.8"><failure>Expected 401 but got 200</failure></testcase>\n  <testcase name="testLoginRateLimit" time="3.1"><failure>Timeout after 3000ms — rate limiter not responding</failure></testcase>\n  <testcase name="testLogout" time="0.6"/>\n  <testcase name="testRememberMe" time="6.7"/>\n</testsuite>`, format: 'auto' },
  },
  {
    name: 'generate_bug_report',
    emoji: '🐛',
    label: 'Generate Bug Report',
    hint: 'Write a rough bug description → get a structured, JIRA-ready bug report with severity, steps to reproduce, impact, and root cause hypothesis.',
    fields: [
      { key: 'description', label: 'Bug Description', type: 'textarea', required: true, placeholder: 'Describe what went wrong' },
      { key: 'environment', label: 'Environment (optional)', type: 'text', placeholder: 'e.g. Chrome 120, macOS, staging' },
      { key: 'steps_to_reproduce', label: 'Steps to Reproduce (optional)', type: 'textarea', placeholder: 'Known steps...' },
      { key: 'severity', label: 'Severity', type: 'select', options: ['', 'critical', 'high', 'medium', 'low'] },
    ],
    example: { description: 'After clicking "Place Order" the loading spinner runs forever. No order is created. The issue only happens when the cart has more than 5 items. With 1-5 items it works fine.', environment: 'Safari 17, iOS 17, production', severity: 'high' },
  },
  {
    name: 'find_test_gaps',
    emoji: '🔍',
    label: 'Find Test Gaps',
    hint: 'Paste your feature spec + existing test list → get a coverage score, list of untested scenarios with risk levels, and missing test types.',
    fields: [
      { key: 'feature_spec', label: 'Feature Specification', type: 'textarea', required: true, placeholder: 'Paste your feature spec, user story, or requirements' },
      { key: 'existing_tests', label: 'Existing Test Cases', type: 'textarea', required: true, placeholder: 'Paste your current test case titles or descriptions' },
    ],
    example: { feature_spec: 'Payment feature: users can pay via Credit Card, PayPal, or Apple Pay. 3D Secure is required for cards over $500. Refunds can be requested within 30 days. Currency: USD only. Failed payments retry once automatically.', existing_tests: 'TC-01: Successful credit card payment\nTC-02: Invalid card number rejected\nTC-03: PayPal payment flow\nTC-04: Refund request submitted' },
  },
  {
    name: 'estimate_qa_effort',
    emoji: '⏱️',
    label: 'Estimate QA Effort',
    hint: 'Describe the feature scope and team size → get a person-day effort breakdown by activity, sprint fit check, risks, and automation candidates.',
    fields: [
      { key: 'feature_description', label: 'Feature Description', type: 'textarea', required: true, placeholder: 'Describe the feature or sprint scope' },
      { key: 'team_size', label: 'Team Size (QA engineers)', type: 'number', placeholder: '1' },
      { key: 'automation_coverage_target', label: 'Automation Target (%)', type: 'number', placeholder: '70' },
      { key: 'sprint_duration_days', label: 'Sprint Duration (days)', type: 'number', placeholder: '14' },
    ],
    example: { feature_description: 'New checkout flow: guest checkout, address validation via Google Maps API, saved addresses for logged-in users, order summary with tax calculation, discount code support', team_size: 2, automation_coverage_target: 70, sprint_duration_days: 14 },
  },
  {
    name: 'generate_test_plan',
    emoji: '📋',
    label: 'Generate Test Plan',
    hint: 'Describe your project and scope → get a full formal test plan with strategy, entry/exit criteria, environments, risk register, and sign-off checklist.',
    fields: [
      { key: 'project_description', label: 'Project Description', type: 'textarea', required: true, placeholder: 'What does this project/product do?' },
      { key: 'scope', label: 'Scope', type: 'textarea', required: true, placeholder: 'What features are in scope for testing?' },
      { key: 'tech_stack', label: 'Tech Stack (optional)', type: 'text', placeholder: 'e.g. React, Node.js, PostgreSQL, AWS' },
      { key: 'timeline', label: 'Timeline (optional)', type: 'text', placeholder: 'e.g. 3-week sprint, release Nov 15' },
    ],
    example: { project_description: 'B2B SaaS platform for managing employee expense claims. Finance managers approve/reject claims. Integrates with Xero for accounting sync.', scope: 'Expense submission, approval workflow, Xero integration, reporting dashboard, email notifications', tech_stack: 'React, Node.js, PostgreSQL, Xero API', timeline: '4-week testing phase before Q1 release' },
  },
  {
    name: 'generate_interview_questions',
    emoji: '🎯',
    label: 'Interview Questions',
    hint: 'Pick a role and seniority level → get targeted QA interview questions with what to look for, red flags, and a must-ask shortlist.',
    fields: [
      { key: 'role', label: 'Role', type: 'text', required: true, placeholder: 'e.g. QA Automation Engineer, SDET, QA Lead' },
      { key: 'seniority', label: 'Seniority', type: 'select', options: ['mid', 'junior', 'senior', 'lead', 'architect'] },
      { key: 'focus_areas', label: 'Focus Areas (optional)', type: 'text', placeholder: 'e.g. Selenium, API testing, CI/CD pipelines' },
      { key: 'count', label: 'Number of Questions', type: 'number', placeholder: '15' },
    ],
    example: { role: 'QA Automation Engineer', seniority: 'senior', focus_areas: 'Playwright, API testing with REST Assured, CI/CD with GitHub Actions', count: 12 },
  },
  {
    name: 'evaluate_prompt',
    emoji: '⚡',
    label: 'Evaluate Prompt',
    hint: 'Paste any LLM system prompt → get a 0–100 score across 6 dimensions (clarity, specificity, role, format, context, constraints) plus an improved version.',
    fields: [
      { key: 'prompt', label: 'Prompt to Evaluate', type: 'textarea', required: true, placeholder: 'Paste the LLM system prompt or full prompt' },
    ],
    example: { prompt: 'You are a helpful assistant. Answer the user\'s questions about our product. Be nice and professional. If you don\'t know something, say so.' },
  },
  {
    name: 'evaluate_rag_output',
    emoji: '🔬',
    label: 'Evaluate RAG Output',
    hint: 'Provide the question, retrieved context, and AI answer → get Faithfulness, Relevance, Recall, Precision scores + hallucination detection.',
    fields: [
      { key: 'question', label: 'Question', type: 'textarea', required: true, placeholder: 'The user\'s original question' },
      { key: 'context', label: 'Retrieved Context', type: 'textarea', required: true, placeholder: 'The chunks retrieved from your vector store' },
      { key: 'answer', label: 'LLM Answer', type: 'textarea', required: true, placeholder: 'The answer your RAG pipeline generated' },
    ],
    example: { question: 'What is the refund policy for annual plans?', context: 'Annual subscriptions: pro-rated refund within 30 days of start. After 30 days, no refunds. Contact billing@acme.com with order ID.', answer: 'Annual plans can be refunded within 14 days for a full refund. After that, no refunds are available. Email support@acme.com to start the process.' },
  },
  {
    name: 'analyze_qa_candidate',
    emoji: '👤',
    label: 'Analyze QA Candidate',
    hint: 'Paste resume plain text → get hiring signal (Strong Yes/Yes/Maybe/No), 8-dimension skill radar, gaps, red flags, and 6 tailored interview questions.',
    fields: [
      { key: 'resume_text', label: 'Resume Text', type: 'textarea', required: true, placeholder: 'Paste plain text extracted from the resume' },
      { key: 'role', label: 'Role (optional)', type: 'text', placeholder: 'e.g. QA Automation Lead' },
      { key: 'seniority', label: 'Expected Seniority (optional)', type: 'text', placeholder: 'e.g. Senior' },
    ],
    example: { resume_text: '5 years QA experience. Selenium WebDriver, Java, TestNG, Cucumber BDD. REST API testing with Postman and RestAssured. CI/CD with Jenkins and GitHub Actions. Team lead for 2 QA engineers. Experience with Agile/Scrum. ISTQB certified.', role: 'QA Automation Lead', seniority: 'Senior' },
  },
  {
    name: 'generate_postmortem',
    emoji: '🚨',
    label: 'Generate Postmortem',
    hint: 'Describe a production incident → get a blameless postmortem with timeline, 5-Whys root cause, what went well/wrong, and prioritised action items.',
    fields: [
      { key: 'incident_description', label: 'Incident Description', type: 'textarea', required: true, placeholder: 'What happened?' },
      { key: 'timeline', label: 'Timeline (optional)', type: 'textarea', placeholder: '14:30 - Alert fired\n14:45 - Engineer paged...' },
      { key: 'impact', label: 'Impact (optional)', type: 'text', placeholder: 'e.g. 2,000 users affected, 45 min downtime' },
      { key: 'team', label: 'Team (optional)', type: 'text', placeholder: 'e.g. Payments team' },
    ],
    example: { incident_description: 'Database connection pool exhausted during peak traffic on Black Friday. All checkout requests failed with 503 for 28 minutes. Root trigger: a slow query from a new discount code feature deployed same morning.', impact: '~8,500 failed checkout attempts, est. $180k lost revenue', team: 'Backend platform team' },
  },
  {
    name: 'analyze_logs',
    emoji: '📝',
    label: 'Analyze Logs',
    hint: 'Paste raw application or server logs → get grouped errors with root cause hypotheses, anomaly patterns, and recommended fixes. No cleanup needed.',
    fields: [
      { key: 'logs', label: 'Log Content', type: 'textarea', required: true, placeholder: 'Paste your application or server logs here' },
      { key: 'context', label: 'Application Context (optional)', type: 'text', placeholder: 'e.g. Node.js API server, production' },
    ],
    example: { logs: '[2025-01-15 14:23:01] ERROR: Database query timeout after 30000ms - query: SELECT * FROM orders WHERE status=pending\n[2025-01-15 14:23:01] ERROR: Database query timeout after 30000ms - query: SELECT * FROM orders WHERE status=pending\n[2025-01-15 14:23:02] WARN: Retry attempt 1/3 for order processing\n[2025-01-15 14:23:04] ERROR: Max retries exceeded for order #45821\n[2025-01-15 14:23:05] ERROR: Database query timeout after 30000ms', context: 'Node.js order processing service' },
  },
]

type Field = { key: string; label: string; type: string; required?: boolean; placeholder?: string; options?: string[] }
type Tool  = typeof TOOLS[0]

// ── Component ─────────────────────────────────────────────────────────────────
export default function Playground() {
  // Initialize false always (avoid SSR/client mismatch), then check sessionStorage in effect
  const [authed, setAuthed]     = useState(false)
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
    if (sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true)
  }, [])
  const [passcode, setPasscode] = useState('')
  const [authErr, setAuthErr]   = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const [selectedTool, setSelectedTool] = useState<Tool>(TOOLS[0])
  const [formValues, setFormValues]     = useState<Record<string, unknown>>({})
  const [loading, setLoading]           = useState(false)
  const [result, setResult]             = useState<Record<string, unknown> | unknown[] | null>(null)
  const [error, setError]               = useState('')
  const unlock = async () => {
    setAuthLoading(true); setAuthErr('')
    const res  = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ passcode }) })
    const data = await res.json()
    setAuthLoading(false)
    if (data.ok) {
      sessionStorage.setItem(SESSION_KEY, '1')
      sessionStorage.setItem('mcp_passcode', passcode)  // store real passcode for API calls
      setAuthed(true)
    } else setAuthErr(data.error || 'Wrong passcode')
  }

  const loadExample = () => {
    setFormValues(selectedTool.example as Record<string, unknown>)
    setResult(null); setError('')
  }

  const changeTool = (name: string) => {
    const t = TOOLS.find(t => t.name === name)!
    setSelectedTool(t); setFormValues({}); setResult(null); setError('')
  }

  const run = async () => {
    // Read the passcode that was saved to sessionStorage at unlock time
    const pc = sessionStorage.getItem('mcp_passcode') ?? ''
    setLoading(true); setResult(null); setError('')
    const res  = await fetch('/api/playground', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: pc, tool: selectedTool.name, args: formValues }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.error) {
      // Passcode expired / invalid → force re-auth
      if (res.status === 401) {
        sessionStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem('mcp_passcode')
        setAuthed(false)
        setError('Session expired — please enter your passcode again.')
      } else {
        setError(data.error)
      }
    } else setResult(data.result)
  }

  const S = {
    page: { maxWidth: 1100, margin: '0 auto', padding: '40px 24px' } as React.CSSProperties,
    panel: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 } as React.CSSProperties,
  }

  // ── Loading shimmer (avoids hydration flash) ──────────────────────────────
  if (!hydrated) return null

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ ...S.panel, width: '100%', maxWidth: 400, borderColor: 'rgba(99,102,241,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Playground Access</h2>
            <p style={{ color: '#64748B', fontSize: 13 }}>Enter the passcode to try the tools live</p>
          </div>
          <label className="label">Passcode</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input type={showPass ? 'text' : 'password'} className="input" style={{ flex: 1 }}
              value={passcode} onChange={e => setPasscode(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && unlock()}
              placeholder="Enter passcode" autoFocus />
            <button className="btn btn-ghost" style={{ flexShrink: 0 }} onClick={() => setShowPass(p => !p)}>
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
          {authErr && <p style={{ color: '#FCA5A5', fontSize: 13, marginBottom: 12 }}>{authErr}</p>}
          <button className="btn btn-indigo" style={{ width: '100%' }} onClick={unlock} disabled={authLoading || !passcode}>
            {authLoading ? <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent spin" style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', display: 'inline-block' }} /> Checking...</> : '🔓 Unlock Playground'}
          </button>
        </div>
      </div>
    )
  }

  // ── Playground ────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>▶ Playground</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>Select a tool, fill the inputs, and run it live against the AI.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Tool sidebar */}
        <div style={{ ...S.panel, padding: '20px 0' }}>
          <p className="label" style={{ marginBottom: 10, paddingLeft: 16, paddingRight: 16 }}>15 Tools</p>
          {TOOLS.map(t => {
            const active = selectedTool.name === t.name
            return (
              <button key={t.name} onClick={() => changeTool(t.name)}
                style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '8px 14px', border: 'none', cursor: 'pointer', marginBottom: 1, textAlign: 'left', fontFamily: 'inherit',
                  background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                  borderLeft: active ? '2px solid #6366F1' : '2px solid transparent',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 13 }}>{t.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: active ? '#818CF8' : '#94A3B8' }}>{t.label}</span>
                </div>
                {active && (
                  <p style={{ fontSize: 11, color: '#475569', margin: '4px 0 0 20px', lineHeight: 1.5 }}>{t.hint}</p>
                )}
              </button>
            )
          })}
        </div>

        {/* Main panel */}
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={S.panel}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{selectedTool.emoji}</span>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{selectedTool.label}</h2>
                  <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{selectedTool.hint}</p>
                </div>
              </div>
              <button className="btn btn-ghost" onClick={loadExample} style={{ fontSize: 12, flexShrink: 0, marginLeft: 12 }}>
                ✦ Load Example
              </button>
            </div>

            {/* How-to strip */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.15)' }}>
              {[
                { n: '1', text: 'Click "Load Example" to see it working instantly' },
                { n: '2', text: 'Replace with your own content in the fields below' },
                { n: '3', text: 'Click Run — results appear as structured JSON on the right' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: '10px 14px', background: 'rgba(99,102,241,0.05)', borderRight: i < 2 ? '1px solid rgba(99,102,241,0.1)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', color: '#818CF8', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</span>
                    <span style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4 }}>{s.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {selectedTool.fields.map((f: Field) => (
                <div key={f.key}>
                  <label className="label">{f.label}{f.required && <span style={{ color: '#F59E0B' }}> *</span>}</label>
                  {f.type === 'textarea' && (
                    <textarea className="input" rows={4} placeholder={f.placeholder}
                      value={(formValues[f.key] as string) ?? ''}
                      onChange={e => setFormValues(v => ({ ...v, [f.key]: e.target.value }))} />
                  )}
                  {f.type === 'text' && (
                    <input type="text" className="input" placeholder={f.placeholder}
                      value={(formValues[f.key] as string) ?? ''}
                      onChange={e => setFormValues(v => ({ ...v, [f.key]: e.target.value }))} />
                  )}
                  {f.type === 'number' && (
                    <input type="number" className="input" placeholder={f.placeholder}
                      value={(formValues[f.key] as number) ?? ''}
                      onChange={e => setFormValues(v => ({ ...v, [f.key]: Number(e.target.value) }))} />
                  )}
                  {f.type === 'select' && (
                    <select className="input"
                      value={(formValues[f.key] as string) ?? f.options![0]}
                      onChange={e => setFormValues(v => ({ ...v, [f.key]: e.target.value }))}>
                      {f.options!.map(o => <option key={o} value={o}>{o || '— auto —'}</option>)}
                    </select>
                  )}
                  {f.type === 'boolean' && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input type="checkbox" checked={(formValues[f.key] as boolean) ?? true}
                        onChange={e => setFormValues(v => ({ ...v, [f.key]: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: '#6366F1' }} />
                      <span style={{ fontSize: 13, color: '#94A3B8' }}>Yes</span>
                    </label>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              <button className="btn btn-indigo" style={{ width: '100%', padding: '12px' }} onClick={run} disabled={loading}>
                {loading
                  ? <><span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.75s linear infinite' }} /> Running...</>
                  : `▶ Run ${selectedTool.label}`}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: 16 }}>
              <p style={{ color: '#FCA5A5', fontSize: 13 }}>⚠ {error}</p>
            </div>
          )}

          {!result && !loading && !error && (
            <div style={{ ...S.panel, padding: 28, textAlign: 'center', borderStyle: 'dashed', borderColor: 'rgba(99,102,241,0.2)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{selectedTool.emoji}</div>
              <p style={{ fontWeight: 700, color: '#fff', fontSize: 14, marginBottom: 6 }}>Results will appear here</p>
              <p style={{ fontSize: 12, color: '#475569', marginBottom: 20 }}>Hit <strong style={{ color: '#818CF8' }}>✦ Load Example</strong> above to prefill the form with a working example, then click Run.</p>
              <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 10, padding: '12px 16px', textAlign: 'left' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#818CF8', marginBottom: 6 }}>What you get back</p>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{selectedTool.hint}</p>
              </div>
            </div>
          )}

          {loading && (
            <div style={{ ...S.panel, padding: 28, textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366F1', animation: 'spin 0.75s linear infinite', margin: '0 auto 14px' }} />
              <p style={{ fontSize: 13, color: '#64748B' }}>AI is working on it...</p>
            </div>
          )}

          {result && (
            <div style={S.panel}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>✅</span>
                  <p className="label" style={{ marginBottom: 0 }}>Result</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost" style={{ fontSize: 11 }}
                    onClick={() => { setResult(null); setError('') }}>
                    Clear
                  </button>
                  <button className="btn btn-ghost" style={{ fontSize: 11 }}
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}>
                    Copy JSON
                  </button>
                </div>
              </div>
              <pre className="code-block">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QA Intelligence MCP Server — Atul Sharma',
  description: '15 AI-powered QA & SDLC tools via MCP — works from any language or IDE',
  authors: [{ name: 'Atul Sharma' }],
  creator: 'Atul Sharma',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(7,6,26,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 20 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#6366F1,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#fff' }}>QA</div>
              <span style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>QA MCP Server</span>
            </a>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: '/',           label: 'Home' },
                { href: '/playground', label: '▶ Playground' },
                { href: '/docs',       label: '📖 Docs' },
                { href: '/guide',      label: '🎓 Guide' },
              ].map(t => (
                <a key={t.href} href={t.href}
                  style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

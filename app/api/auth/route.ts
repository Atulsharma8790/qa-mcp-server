import { NextRequest, NextResponse } from 'next/server'

const PASSCODE = process.env.MCP_PASSCODE ?? 'qatools2026'

export async function POST(req: NextRequest) {
  const { passcode } = await req.json()
  if (passcode === PASSCODE) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: 'Wrong passcode.' }, { status: 401 })
}

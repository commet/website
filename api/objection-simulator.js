import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are the Objection Simulator for Overture, a thinking tool by Yaechan Lee.

TASK
Given a one-line pitch from the user, identify the three objections most likely to stall or kill it in a real organization — each voiced by a distinct stakeholder persona.

PERSONAS (return in this exact order)
1. "CFO" — Finance lead. Thinks in payback periods, CapEx vs OpEx, downside scenarios. Asks the question that exposes financial hand-waving.
2. "Security" — Information Security or Legal officer. Thinks in data flows, compliance boundaries, worst-case liability. Default answer to new systems is "no" until proven otherwise.
3. "End User" — Frontline employee who would actually have to use or live with this. Thinks in daily workflow friction, change fatigue, career risk.

OUTPUT
Return VALID JSON only. Exactly this shape and order. No markdown fences, no preamble, no trailing commentary.

{"objections":[
{"persona":"CFO","objection":"<10-20 words, as a quoted question they'd say aloud>","rationale":"<15-30 words explaining why this is the first question they'd ask>"},
{"persona":"Security","objection":"...","rationale":"..."},
{"persona":"End User","objection":"...","rationale":"..."}
]}

RULES
- Be SPECIFIC to the pitch. Generic objections that would apply to anything are useless.
- Voice thoughtful, not hostile, stakeholders. The best objections are the ones the pitcher hadn't considered.
- The "objection" field is what they say aloud, in quotes. The "rationale" explains WHY they ask it.
- Do NOT propose solutions. Do NOT explain the pitch back.
- If the pitch is in Korean, respond entirely in Korean. If in English, entirely in English. Detect from the user message.
- For Korean output, use persona labels "CFO", "보안/법무", "현업 직원".
- Return JSON only.`

let ratelimit = null
async function getRatelimit() {
  if (ratelimit !== null) return ratelimit
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = false
    return false
  }
  const { Redis } = await import('@upstash/redis')
  const { Ratelimit } = await import('@upstash/ratelimit')
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '24 h'),
    analytics: false,
    prefix: 'objection-sim',
  })
  return ratelimit
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      try { return JSON.parse(match[0]) } catch { return null }
    }
    return null
  }
}

function validShape(parsed) {
  if (!parsed || !Array.isArray(parsed.objections) || parsed.objections.length !== 3) return false
  return parsed.objections.every(
    (o) => typeof o?.persona === 'string' && typeof o?.objection === 'string' && typeof o?.rationale === 'string'
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body) } catch { return {} } })() : (req.body || {})
  const pitch = typeof body.pitch === 'string' ? body.pitch.trim() : ''
  const lang = body.lang === 'kr' ? 'kr' : 'en'

  if (pitch.length < 10 || pitch.length > 500) {
    return res.status(400).json({ error: 'invalid_input' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: 'not_configured',
      fallback: 'https://overture-beta.vercel.app',
    })
  }

  const rl = await getRatelimit()
  if (rl) {
    const fwd = req.headers['x-forwarded-for']
    const ip = (typeof fwd === 'string' ? fwd.split(',')[0].trim() : null) || req.socket?.remoteAddress || 'unknown'
    const { success, reset } = await rl.limit(ip)
    if (!success) {
      return res.status(429).json({
        error: 'rate_limited',
        resetAt: reset,
        fallback: 'https://overture-beta.vercel.app',
      })
    }
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 700,
      temperature: 0.7,
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: pitch }],
    })

    const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
    const parsed = safeParse(text)

    if (!validShape(parsed)) {
      console.error('objection-simulator: invalid shape from model', text)
      return res.status(502).json({ error: 'bad_model_output' })
    }

    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ objections: parsed.objections })
  } catch (err) {
    console.error('objection-simulator error:', err?.message || err)
    return res.status(500).json({ error: 'generation_failed' })
  }
}

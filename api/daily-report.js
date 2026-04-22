import { Resend } from 'resend'

const VERCEL_API = 'https://api.vercel.com'
const PROJECT_ID = 'prj_H8zVKlhQOfi9rqV7OM3TfFUcpVoW'
const TEAM_ID = 'team_Rl6K0F7x6qLFP2crqbJ6uNAL'

const OWNER_IPS = (process.env.OWNER_IPS || '106.248.34.181,125.130.59.240')
  .split(',').map((s) => s.trim()).filter(Boolean)

// ───── Helpers ─────

function safeCompare(a, b) {
  const lenDiff = a.length !== b.length ? 1 : 0
  const ref = lenDiff ? a : b
  let mismatch = lenDiff
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ ref.charCodeAt(i)
  return mismatch === 0
}

function escHtml(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function kstRange(daysAgo) {
  const now = new Date()
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  kstNow.setUTCDate(kstNow.getUTCDate() - daysAgo)
  const label = kstNow.toISOString().split('T')[0]
  const start = new Date(`${label}T00:00:00+09:00`).toISOString()
  const end = new Date(`${label}T23:59:59.999+09:00`).toISOString()
  return { start, end, label }
}

function kstDateLabel(date) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  return kst.toISOString().split('T')[0]
}

async function vercelStat(type, from, to) {
  const token = process.env.VERCEL_API_TOKEN
  if (!token) return []
  const params = new URLSearchParams({
    projectId: PROJECT_ID,
    teamId: TEAM_ID,
    environment: 'production',
    from, to,
    limit: '100',
  })
  const url = `${VERCEL_API}/v1/web/insights/stats/${type}?${params}`
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return []
    const json = await res.json()
    return Array.isArray(json?.data) ? json.data : []
  } catch {
    return []
  }
}

async function vercelRealtime() {
  const token = process.env.VERCEL_API_TOKEN
  if (!token) return { devices: 0, total: 0 }
  try {
    const res = await fetch(
      `${VERCEL_API}/v1/web/insights/realtime?projectId=${PROJECT_ID}&teamId=${TEAM_ID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) return { devices: 0, total: 0 }
    return await res.json()
  } catch { return { devices: 0, total: 0 } }
}

async function upstashSimulatorTraces() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !tok) return []
  try {
    const scan = await fetch(`${url}/scan/0/match/objection-sim*/count/1000`, {
      headers: { Authorization: `Bearer ${tok}` },
    })
    if (!scan.ok) return []
    const scanJson = await scan.json()
    const keys = scanJson?.result?.[1] || []
    const results = []
    for (const key of keys) {
      const [valRes, ttlRes] = await Promise.all([
        fetch(`${url}/get/${encodeURIComponent(key)}`, { headers: { Authorization: `Bearer ${tok}` } }),
        fetch(`${url}/ttl/${encodeURIComponent(key)}`, { headers: { Authorization: `Bearer ${tok}` } }),
      ])
      const valJson = valRes.ok ? await valRes.json() : { result: null }
      const ttlJson = ttlRes.ok ? await ttlRes.json() : { result: -1 }
      const ip = key.split(':')[1] || 'unknown'
      results.push({
        key, ip,
        count: Number(valJson?.result ?? 0),
        ttlSec: Number(ttlJson?.result ?? 0),
        isOwner: OWNER_IPS.includes(ip),
      })
    }
    return results
  } catch { return [] }
}

function classifyReferrer(host) {
  if (!host) return 'Direct'
  const h = String(host).toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  if (h.includes('anthropic')) return 'Anthropic 🎯'
  if (h.includes('greenhouse') || h.includes('lever') || h.includes('ashby') || h.includes('workday')) return 'ATS (Greenhouse/Lever/Ashby) 🎯'
  if (h.includes('linkedin')) return 'LinkedIn'
  if (h.includes('threads')) return 'Threads'
  if (h.includes('github')) return 'GitHub'
  if (h.includes('google')) return 'Google Search'
  if (h.includes('yclee.today')) return 'Internal'
  if (h.includes('vercel')) return 'Vercel preview'
  return h
}

const EVENT_LABELS = {
  case_study_view: 'STRIX 케이스 스터디 열람',
  case_study_open: '케이스 스터디 클릭',
  case_study_back: '케이스 스터디에서 돌아감',
  cv_download: '이력서 다운로드',
  contact_click: '이메일 클릭',
  simulator_submit: 'Simulator 제출',
  simulator_success: 'Simulator 완료',
  simulator_error: 'Simulator 에러',
  simulator_reset: 'Simulator 재시작',
  simulator_example: 'Simulator 예시 클릭',
  project_click: '프로젝트 링크 클릭',
  social_click: '소셜 링크 클릭',
  overture_link: 'Overture 외부 이동',
  lang_toggle: '언어 전환',
  nav_click: '네비 클릭',
}

const HIGH_INTENT = ['case_study_view', 'case_study_open', 'cv_download', 'contact_click', 'simulator_submit']

// ───── Handler ─────

export default async function handler(req, res) {
  // Auth — Vercel cron sends Bearer <CRON_SECRET>
  const authHeader = req.headers?.authorization || ''
  const expected = `Bearer ${process.env.CRON_SECRET || ''}`
  if (!process.env.CRON_SECRET || !safeCompare(authHeader, expected)) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  // Preview mode ?preview=1 → render HTML without sending email
  const preview = req.query?.preview === '1'

  const yesterday = kstRange(1)
  const today = kstRange(0)
  const last7Start = kstRange(7).start
  const last7End = kstRange(1).end

  // ─── Fetch all analytics in parallel ───
  const [
    pathStats, referrerStats, refHostStats, countryStats, deviceStats, eventStats, osStats,
    pathStats7d,
    realtime, simTraces,
  ] = await Promise.all([
    vercelStat('path', yesterday.start, yesterday.end),
    vercelStat('referrer', yesterday.start, yesterday.end),
    vercelStat('referrer_hostname', yesterday.start, yesterday.end),
    vercelStat('country', yesterday.start, yesterday.end),
    vercelStat('device_type', yesterday.start, yesterday.end),
    vercelStat('event_name', yesterday.start, yesterday.end),
    vercelStat('os_name', yesterday.start, yesterday.end),
    vercelStat('path', last7Start, last7End),
    vercelRealtime(),
    upstashSimulatorTraces(),
  ])

  // ─── Aggregate ───
  const totalViews = pathStats.reduce((sum, r) => sum + (Number(r.total) || 0), 0)
  const totalVisitors = pathStats.reduce((sum, r) => sum + (Number(r.devices) || 0), 0)

  const eventMap = Object.fromEntries(eventStats.map((r) => [r.key ?? r.name, Number(r.total) || 0]))
  const highIntentCounts = HIGH_INTENT.map((k) => ({ key: k, label: EVENT_LABELS[k] || k, count: eventMap[k] || 0 }))

  const refBuckets = {}
  for (const r of refHostStats) {
    const label = classifyReferrer(r.key ?? r.name ?? '')
    refBuckets[label] = (refBuckets[label] || 0) + (Number(r.total) || 0)
  }
  if (!refHostStats.length) refBuckets['Direct'] = totalViews

  const countryRows = countryStats.map((r) => ({
    code: r.key ?? r.name ?? '—',
    total: Number(r.total) || 0,
    devices: Number(r.devices) || 0,
  })).sort((a, b) => b.total - a.total).slice(0, 6)

  const deviceRows = deviceStats.map((r) => ({
    kind: r.key ?? r.name ?? '—',
    total: Number(r.total) || 0,
  })).sort((a, b) => b.total - a.total)

  const pathRows = pathStats.map((r) => ({
    path: r.key ?? r.name ?? '/',
    total: Number(r.total) || 0,
    devices: Number(r.devices) || 0,
  })).sort((a, b) => b.total - a.total).slice(0, 8)

  // 7-day trend — bucketize by KST date from path7d (Vercel returns per-period totals only, so we render 7 aggregate rows)
  // Fallback: if the API doesn't return per-day breakdown, we query 7 individual days
  const trendDays = []
  for (let i = 6; i >= 0; i--) {
    const day = kstRange(i)
    trendDays.push(day)
  }
  const perDayTotals = await Promise.all(trendDays.map(async (d) => {
    const rows = await vercelStat('path', d.start, d.end)
    const total = rows.reduce((s, r) => s + (Number(r.total) || 0), 0)
    const devices = rows.reduce((s, r) => s + (Number(r.devices) || 0), 0)
    return { date: d.label, total, devices }
  }))

  const simTotal = simTraces.reduce((s, t) => s + t.count, 0)
  const simExternal = simTraces.filter((t) => !t.isOwner)
  const simExternalTotal = simExternal.reduce((s, t) => s + t.count, 0)

  // ─── Render HTML ───
  const subject = `[yclee.today] ${yesterday.label} — 방문 ${totalVisitors} · STRIX ${eventMap.case_study_view || 0} · CV ${eventMap.cv_download || 0}`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #1a1a1a; background: #fafaf9;">
  <div style="border-bottom: 3px solid #c2410c; padding-bottom: 16px; margin-bottom: 24px;">
    <h1 style="font-size: 20px; margin: 0;">yclee.today Daily Report</h1>
    <p style="color: #78716c; font-size: 13px; margin: 4px 0 0;">${escHtml(yesterday.label)} (KST) · BDR 지원 포트폴리오</p>
  </div>

  <!-- TOP LINE -->
  <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">어제 트래픽</h2>
    <div style="display: flex; gap: 32px; flex-wrap: wrap;">
      <div>
        <p style="font-size: 28px; font-weight: 800; margin: 0; color: #c2410c;">${totalVisitors}</p>
        <p style="font-size: 12px; color: #78716c; margin: 2px 0 0;">방문자 (유니크 디바이스)</p>
      </div>
      <div>
        <p style="font-size: 28px; font-weight: 800; margin: 0; color: #ea580c;">${totalViews}</p>
        <p style="font-size: 12px; color: #78716c; margin: 2px 0 0;">페이지뷰</p>
      </div>
      <div>
        <p style="font-size: 28px; font-weight: 800; margin: 0; color: #a8a29e;">${realtime?.devices ?? 0}</p>
        <p style="font-size: 12px; color: #78716c; margin: 2px 0 0;">지금 이 순간 접속</p>
      </div>
    </div>
    ${totalViews === 0 ? '<p style="font-size: 12px; color: #a8a29e; margin: 12px 0 0;">어제는 방문 없음. Web Analytics beacon이 정상이라면 리크루터가 아직 안 눌렀다는 뜻.</p>' : ''}
  </div>

  <!-- HIGH-INTENT SIGNALS -->
  <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">🎯 High-intent 시그널</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      ${highIntentCounts.map((r) => `
        <tr>
          <td style="padding: 6px 0; border-bottom: 1px solid #f5f5f4;">${escHtml(r.label)}</td>
          <td style="padding: 6px 0; border-bottom: 1px solid #f5f5f4; text-align: right; font-weight: ${r.count > 0 ? '700' : '400'}; color: ${r.count > 0 ? '#c2410c' : '#d6d3d1'};">${r.count}</td>
        </tr>
      `).join('')}
    </table>
    <p style="font-size: 11px; color: #a8a29e; margin: 10px 0 0; line-height: 1.5;">케이스 스터디 열람 + CV 다운로드 + 이메일 클릭 중 둘 이상이면 리크루터가 제대로 읽었다는 시그널.</p>
  </div>

  <!-- REFERRERS -->
  <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">📍 어디서 왔나</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      ${Object.entries(refBuckets).sort(([, a], [, b]) => b - a).slice(0, 8).map(([src, count]) => {
        const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0
        return `<tr>
          <td style="padding: 6px 0; border-bottom: 1px solid #f5f5f4;">${escHtml(src)}</td>
          <td style="padding: 6px 0; border-bottom: 1px solid #f5f5f4; text-align: right; font-weight: 600;">${count}</td>
          <td style="padding: 6px 0 6px 12px; border-bottom: 1px solid #f5f5f4; text-align: right; color: #78716c; font-size: 11px; width: 48px;">${pct}%</td>
        </tr>`
      }).join('') || '<tr><td style="padding: 6px 0; color: #a8a29e;">데이터 없음</td></tr>'}
    </table>
  </div>

  <!-- COUNTRY + DEVICE -->
  <div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
    <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; flex: 1; min-width: 260px;">
      <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">🌍 국가</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        ${countryRows.map((r) => `<tr>
          <td style="padding: 4px 0; border-bottom: 1px solid #f5f5f4;">${escHtml(r.code)} ${r.code === 'US' ? '🎯' : ''}</td>
          <td style="padding: 4px 0; border-bottom: 1px solid #f5f5f4; text-align: right; font-weight: 600;">${r.total}</td>
        </tr>`).join('') || '<tr><td style="padding: 4px 0; color: #a8a29e;">—</td></tr>'}
      </table>
    </div>
    <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; flex: 1; min-width: 260px;">
      <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">💻 디바이스</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        ${deviceRows.map((r) => `<tr>
          <td style="padding: 4px 0; border-bottom: 1px solid #f5f5f4;">${escHtml(r.kind)}</td>
          <td style="padding: 4px 0; border-bottom: 1px solid #f5f5f4; text-align: right; font-weight: 600;">${r.total}</td>
        </tr>`).join('') || '<tr><td style="padding: 4px 0; color: #a8a29e;">—</td></tr>'}
      </table>
    </div>
  </div>

  <!-- PATH BREAKDOWN -->
  <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">📄 페이지별 읽힘</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      ${pathRows.map((r) => {
        const isStrix = r.path.includes('/case-study/strix')
        return `<tr>
          <td style="padding: 6px 0; border-bottom: 1px solid #f5f5f4; font-family: monospace; font-size: 12px;">${escHtml(r.path)} ${isStrix ? '<span style="background: #fed7aa; color: #9a3412; padding: 1px 6px; border-radius: 6px; font-size: 10px; margin-left: 4px;">심층 관심</span>' : ''}</td>
          <td style="padding: 6px 0; border-bottom: 1px solid #f5f5f4; text-align: right; font-weight: 600;">${r.total}</td>
          <td style="padding: 6px 0 6px 12px; border-bottom: 1px solid #f5f5f4; text-align: right; color: #78716c; font-size: 11px; width: 60px;">${r.devices} uniq</td>
        </tr>`
      }).join('') || '<tr><td style="padding: 6px 0; color: #a8a29e;">—</td></tr>'}
    </table>
  </div>

  <!-- SIMULATOR -->
  <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">🧪 Objection Simulator 활동 (Redis, 지난 24h)</h2>
    <p style="font-size: 13px; margin: 0 0 10px;">
      <strong>${simTotal}</strong>회 호출 · 본인 제외 <strong style="color: ${simExternalTotal > 0 ? '#c2410c' : '#a8a29e'};">${simExternalTotal}</strong>회 · IP ${simTraces.length}개
    </p>
    ${simExternal.length === 0 ? '<p style="font-size: 12px; color: #a8a29e; margin: 0;">외부 사용자 시뮬레이터 시도 없음.</p>' : `
    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
      ${simExternal.map((t) => `<tr>
        <td style="padding: 4px 0; font-family: monospace;">${escHtml(t.ip)}</td>
        <td style="padding: 4px 0; text-align: right;">${t.count}회</td>
        <td style="padding: 4px 0 4px 12px; text-align: right; color: #a8a29e;">만료까지 ${Math.round(t.ttlSec / 3600)}h</td>
      </tr>`).join('')}
    </table>`}
  </div>

  <!-- 7-DAY TREND -->
  <div style="background: white; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
    <h2 style="font-size: 14px; color: #78716c; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">📈 지난 7일 페이지뷰</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      ${perDayTotals.map((d) => {
        const max = Math.max(...perDayTotals.map((x) => x.total), 1)
        const barPct = Math.round((d.total / max) * 100)
        return `<tr>
          <td style="padding: 4px 0; font-family: monospace; font-size: 12px; width: 90px;">${escHtml(d.date)}</td>
          <td style="padding: 4px 8px;">
            <div style="background: #e7e5e4; border-radius: 4px; height: 10px;">
              <div style="background: #c2410c; border-radius: 4px; height: 10px; width: ${barPct}%;"></div>
            </div>
          </td>
          <td style="padding: 4px 0; text-align: right; font-weight: 600; width: 56px;">${d.total}</td>
          <td style="padding: 4px 0 4px 8px; text-align: right; color: #a8a29e; font-size: 11px; width: 44px;">(${d.devices})</td>
        </tr>`
      }).join('')}
    </table>
    <p style="font-size: 11px; color: #a8a29e; margin: 8px 0 0;">우측 괄호는 유니크 방문자 수</p>
  </div>

  <p style="font-size: 11px; color: #a8a29e; text-align: center; margin-top: 24px;">
    yclee.today Daily Report — 매일 KST 09:00 자동 발송 · Vercel Web Analytics + Upstash
  </p>
</body>
</html>
`.trim()

  if (preview) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.status(200).send(html)
  }

  // ─── Send ───
  if (!process.env.RESEND_API_KEY || !process.env.REPORT_EMAIL_TO) {
    return res.status(200).json({
      ok: false,
      reason: 'resend_not_configured',
      date: yesterday.label,
      totalViews, totalVisitors,
      events: eventMap,
    })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'yclee.today <onboarding@resend.dev>',
      to: process.env.REPORT_EMAIL_TO,
      subject,
      html,
    })
    return res.status(200).json({
      ok: true,
      date: yesterday.label,
      totalViews, totalVisitors,
      events: eventMap,
      simulator: { total: simTotal, external: simExternalTotal },
    })
  } catch (err) {
    console.error('[daily-report] send error:', err?.message || err)
    return res.status(500).json({ error: 'send_failed', message: err?.message || 'unknown' })
  }
}

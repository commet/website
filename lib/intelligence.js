import { providers } from '../src/intelligence-config.js';

const DAY = 86400000;
const regions = { panama: [9.1, -79.7, 1000], newark: [40.684, -74.15, 750] };
export function distanceKm(lat1, lon1, lat2, lon2) {
  const r = Math.PI / 180;
  const a = Math.sin((lat2 - lat1) * r / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin((lon2 - lon1) * r / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function inRegion(coords, mission) {
  if (!regions[mission]) return true;
  if (!coords || !Number.isFinite(coords[0]) || !Number.isFinite(coords[1])) return false;
  const [lat, lon, radius] = regions[mission];
  return distanceKm(lat, lon, coords[1], coords[0]) <= radius;
}
export function safeUrl(value) {
  try { const u = new URL(value); return u.protocol === 'https:' ? u.href : null; } catch { return null; }
}
export function sourceUrl(id, mission) {
  if (id === 'weather') return `https://api.weather.gov/alerts/active${mission === 'newark' ? '?point=40.684,-74.15' : ''}`;
  if (id === 'disasters') return 'https://eonet.gsfc.nasa.gov/api/v3/events?status=all&days=30&category=severeStorms,wildfires,volcanoes&limit=100';
  if (id === 'earthquakes') return 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
  throw new Error('Unknown source');
}
export function normalizeSource(id, raw, mission, now = Date.now()) {
  let items;
  let updatedAt = null;
  if (id === 'weather') {
    if (!Array.isArray(raw.features)) throw new Error('Invalid weather response');
    updatedAt = raw.updated ?? null;
    const severity = { Extreme: 0, Severe: 1, Moderate: 2, Minor: 3, Unknown: 4 };
    items = raw.features.filter(({ properties: p }) => !p.expires || Date.parse(p.expires) > now).map(({ properties: p, id: key }) => ({
      key, title: p.headline || p.event, detail: `${p.areaDesc || ''}. ${p.description || ''}`.slice(0, 900),
      occurredAt: p.sent, expiresAt: p.expires || null, event: p.event, severity: p.severity, url: safeUrl(key) || 'https://www.weather.gov/',
    })).sort((a, b) => (severity[a.severity] ?? 4) - (severity[b.severity] ?? 4));
  } else if (id === 'disasters') {
    if (!Array.isArray(raw.events)) throw new Error('Invalid event response');
    items = raw.events.flatMap(e => {
      const g = [...(e.geometry || [])].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0];
      if (!g || now - Date.parse(g.date) > 30 * DAY || !inRegion(g.type === 'Point' ? g.coordinates : null, mission)) return [];
      return [{ key: e.id, title: e.title, detail: `${e.categories.map(c => c.title).join(', ')}. ${e.closed ? 'Closed event' : 'Listed as open; status is not a confirmed operational impact.'}`, occurredAt: g.date,
        url: safeUrl(e.sources?.[0]?.url) || safeUrl(e.link), coords: g.type === 'Point' ? g.coordinates : null }];
    }).sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt));
  } else {
    if (!Array.isArray(raw.features)) throw new Error('Invalid earthquake response');
    updatedAt = raw.metadata?.generated ? new Date(raw.metadata.generated).toISOString() : null;
    items = raw.features.filter(f => inRegion(f.geometry?.coordinates, mission)).map(f => ({
      key: f.id, title: f.properties.title, detail: `Magnitude ${f.properties.mag}. ${f.properties.place}. This observation does not establish transport disruption.`,
      occurredAt: new Date(f.properties.time).toISOString(), url: safeUrl(f.properties.url), coords: f.geometry.coordinates.slice(0, 2), magnitude: f.properties.mag,
    })).sort((a, b) => b.magnitude - a.magnitude);
  }
  const fetchedAt = new Date(now).toISOString();
  return { id, status: 'ok', fetchedAt, updatedAt, count: items.length, sampleLimit: id === 'disasters' ? 100 : null,
    selection: id === 'weather' ? 'Up to 6 active alerts by severity; not a comprehensive briefing of all US weather.' : id === 'disasters' ? 'Up to 6 newest matching records from a catalog capped at 100; never generalize their status to all natural events.' : 'Up to 6 highest-magnitude matching earthquakes; subtype population statistics are not provided.',
    scope: mission === 'world' ? (id === 'weather' ? 'United States' : 'Global') : id === 'weather' ? 'NWS alerts at the Newark point only' : `${mission}: ${regions[mission][2]} km radius`,
    url: sourceUrl(id, mission), records: items.slice(0, 6).map((item, i) => ({ ...item, id: `${id}-${i + 1}`, source: id })) };
}
export async function fetchSource(id, mission, fetcher = fetch) {
  if (id === 'weather' && mission === 'panama') return { id, status: 'not_applicable', count: 0, records: [], fetchedAt: new Date().toISOString(), scope: 'NWS does not cover Panama', url: sourceUrl(id, mission) };
  try {
    const response = await fetcher(sourceUrl(id, mission), { headers: { 'User-Agent': 'YaechanPortfolio/1.0 (https://yclee.today)', Accept: 'application/geo+json, application/json' }, signal: AbortSignal.timeout(9000) });
    if (!response.ok) throw new Error('Upstream unavailable');
    return normalizeSource(id, await response.json(), mission);
  } catch {
    return { id, status: 'unavailable', count: null, records: [], fetchedAt: new Date().toISOString(), url: sourceUrl(id, mission) };
  }
}
export async function fetchSources(mission, fetcher = fetch) {
  return Promise.all(providers.map(p => fetchSource(p.id, mission, fetcher)));
}
export function validateBrief(value, sources) {
  const allowed = new Set(sources.filter(s => s.status === 'ok').map(s => s.id));
  const records = new Map(sources.flatMap(s => s.records.map(r => [r.id, s.id])));
  if (!value || typeof value.title !== 'string' || typeof value.summary !== 'string' || !Array.isArray(value.findings) || value.findings.length > 3 || !Array.isArray(value.unknowns)) return null;
  // A returned URL is accepted only when it exactly matches a retrieved source;
  // canonicalize it to the same internal ID before applying citation validation.
  const findings = value.findings.map(f => ({ ...f, sources: Array.isArray(f?.sources) ? f.sources.map(id => sources.find(s => s.url === id)?.id || id) : f?.sources }));
  if (!findings.every(f => typeof f.title === 'string' && typeof f.detail === 'string' && typeof f.action === 'string' && Array.isArray(f.sources) && f.sources.length > 0 && f.sources.every(id => allowed.has(id)) && Array.isArray(f.records) && (f.records.length > 0 || f.sources.every(id => sources.find(s => s.id === id)?.count === 0)) && f.records.every(id => records.has(id) && f.sources.includes(records.get(id))))) return null;
  if (!value.unknowns.every(v => typeof v === 'string')) return null;
  return { title: value.title.slice(0, 180), summary: value.summary.slice(0, 800), findings: findings.map(f => ({ title: f.title.slice(0, 180), detail: f.detail.slice(0, 700), action: f.action.slice(0, 400), sources: f.sources, records: f.records })), unknowns: value.unknowns.slice(0, 4).map(v => v.slice(0, 300)) };
}
export function boundEmptyFindings(brief, sources, lang) {
  const seen = new Set();
  return { ...brief, findings: brief.findings.flatMap(f => {
    if (f.records.length) return [f];
    const key = [...f.sources].sort().join(',');
    if (seen.has(key)) return [];
    seen.add(key);
    const names = f.sources.map(id => providers.find(p => p.id === id)?.name).join(', ');
    const scope = f.sources.map(id => sources.find(s => s.id === id)?.scope).filter(Boolean).join('; ');
    return [{ ...f,
      title: lang === 'kr' ? '조회 범위에서 일치하는 항목 없음' : 'No matching entries in this lookup',
      detail: lang === 'kr' ? `${names}의 제한된 조회에서 일치하는 항목을 찾지 못했습니다. 관측의 부재가 위험의 부재를 뜻하지는 않습니다.` : `${names} returned no matching entries in this bounded lookup (${scope}). This does not establish the absence of risk.`,
      action: lang === 'kr' ? '원문 조회 범위와 현지 기관의 최신 공지를 함께 확인하세요.' : 'Check the source coverage and the latest notices from local authorities.',
    }];
  }) };
}

// A bad optional finding must not discard other independently cited observations.
// If any finding is removed, rebuild the headline/summary from retained evidence too.
export function groundBrief(value, sources, lang) {
  if (!Array.isArray(value?.findings) || !value.findings.length) return null;
  const findings = value.findings.filter(f => validateBrief({ ...value, findings: [f] }, sources)).slice(0, 2);
  if (!findings.length) return null;
  const valid = validateBrief({ ...value, findings }, sources);
  if (!valid) return null;
  const brief = boundEmptyFindings(valid, sources, lang);
  if (findings.length !== value.findings.length || findings.every(f => !f.records.length)) {
    brief.title = brief.findings[0].title;
    brief.summary = brief.findings[0].detail;
  }
  return brief;
}

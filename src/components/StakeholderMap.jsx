import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Pentagon positions (percentage of container). C-suite apex top; Strategy & Security
// form the primary tension pair mid-level; Legal & IT sit at the base.
const NODES = [
  { id: 'cSuite',   pos: { x: 50,  y: 12 } },
  { id: 'strategy', pos: { x: 86,  y: 42 } },
  { id: 'it',       pos: { x: 72,  y: 88 } },
  { id: 'legal',    pos: { x: 28,  y: 88 } },
  { id: 'security', pos: { x: 14,  y: 42 } },
]

// K5 full mesh — every stakeholder interacts with every other
const EDGES = [
  ['cSuite','strategy'], ['cSuite','it'], ['cSuite','legal'], ['cSuite','security'],
  ['strategy','it'], ['strategy','legal'], ['strategy','security'],
  ['it','legal'], ['it','security'],
  ['legal','security'],
]

const t = {
  en: {
    helper: 'Hover a stakeholder to see what they wanted and why they might block.',
    helperMobile: 'Tap a stakeholder to see what they wanted and why they might block.',
    wantLabel: 'Wanted',
    blockLabel: 'Might block',
    legend: '5 stakeholders · 10 interactions · every pair matters',
    nodes: {
      cSuite:   { name: 'C-suite / CEO',        want: 'Risk-adjusted ROI, unambiguous',           block: 'Would not sign without clean economics' },
      strategy: { name: 'Strategy leadership',  want: 'Productivity unlock for analysts',         block: 'Reputational risk if regulated data leaks' },
      it:       { name: 'IT Infrastructure',    want: 'Maintainable, boring systems',             block: 'Would inherit ongoing ops burden' },
      legal:    { name: 'Legal',                want: 'Defensible posture on regulated data',     block: 'Liability when data leaves the boundary' },
      security: { name: 'Information Security', want: 'Clean NIS audit posture',                  block: 'Default answer to external AI: no' },
    },
  },
  kr: {
    helper: '이해관계자에 마우스를 올리면 각자의 동기와 블록 이유가 드러납니다.',
    helperMobile: '이해관계자를 탭하면 각자의 동기와 블록 이유가 드러납니다.',
    wantLabel: '원하는 것',
    blockLabel: '막을 수 있는 이유',
    legend: '5명 · 10개 상호작용 · 모든 페어가 결정에 영향',
    nodes: {
      cSuite:   { name: 'C-suite / CEO',    want: '명확한 리스크 조정 ROI',             block: '깔끔한 경제학 없이는 서명 불가' },
      strategy: { name: '전략기획본부 리더십', want: '애널리스트 생산성 해금',             block: '규제 데이터 리스크로 인한 평판 훼손' },
      it:       { name: 'IT 인프라',         want: '유지보수 가능한 지루한 시스템',        block: '운영 부담이 자기 쪽으로 전이됨' },
      legal:    { name: '법무',             want: '규제 데이터에 대한 방어 가능한 포지션',  block: '데이터가 경계 밖으로 나가는 순간의 책임' },
      security: { name: '정보보안팀',        want: '국정원 감사 대응 태세',              block: '외부 AI에 대한 기본값: 불가' },
    },
  },
}

export default function StakeholderMap({ lang = 'en' }) {
  const c = t[lang] || t.en
  const [active, setActive] = useState(null) // hovered / focused node id
  const wrapRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const connected = (id) => EDGES.filter((e) => e.includes(id)).flat().filter((x) => x !== id)

  return (
    <div>
      {/* Intro helper */}
      <p className="text-[13px] text-stone-500 leading-relaxed mb-6 md:mb-8">
        <span className="hidden md:inline">{c.helper}</span>
        <span className="md:hidden">{c.helperMobile}</span>
      </p>

      {/* Desktop: pentagon graph */}
      <div className="hidden md:block">
        <div
          ref={wrapRef}
          className="relative w-full mx-auto"
          style={{ maxWidth: 720, aspectRatio: '16 / 11' }}
          onMouseLeave={() => setActive(null)}
        >
          {/* SVG edges — drawn first so nodes sit on top */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {EDGES.map(([a, b], i) => {
              const na = NODES.find((n) => n.id === a)
              const nb = NODES.find((n) => n.id === b)
              const highlighted = active && (active === a || active === b)
              return (
                <line
                  key={i}
                  x1={na.pos.x} y1={na.pos.y}
                  x2={nb.pos.x} y2={nb.pos.y}
                  stroke={highlighted ? '#c2410c' : '#d6d3d1'}
                  strokeOpacity={highlighted ? 0.55 : 0.28}
                  strokeWidth={highlighted ? 0.35 : 0.2}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: 'stroke 180ms ease, stroke-opacity 180ms ease' }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((n, i) => {
            const data = c.nodes[n.id]
            const isActive = active === n.id
            const isRelated = active && active !== n.id && connected(active).includes(n.id)
            const isDimmed = active && !isActive && !isRelated
            return (
              <motion.button
                key={n.id}
                type="button"
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: isDimmed ? 0.35 : 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  'absolute -translate-x-1/2 -translate-y-1/2',
                  'px-3.5 py-2 rounded-full border bg-white',
                  'text-[13px] font-medium whitespace-nowrap',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
                  'cursor-pointer transition-colors duration-200',
                  isActive
                    ? 'border-accent text-accent shadow-[0_1px_0_rgba(194,65,12,0.08)]'
                    : isRelated
                      ? 'border-accent/60 text-stone-800'
                      : 'border-stone-300 text-stone-700 hover:border-stone-500',
                ].join(' ')}
                style={{ left: `${n.pos.x}%`, top: `${n.pos.y}%` }}
                aria-label={`${data.name} — ${c.wantLabel}: ${data.want}. ${c.blockLabel}: ${data.block}`}
                aria-pressed={isActive}
              >
                {data.name}
              </motion.button>
            )
          })}
        </div>

        {/* Active node detail panel — fixed-height slot so layout doesn't jump */}
        <div className="mt-6 min-h-[120px] max-w-[720px] mx-auto">
          {active ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-[auto_1fr_1fr] gap-x-8 gap-y-2 items-baseline border-t border-stone-200 pt-5"
            >
              <div className="text-[15px] font-semibold text-stone-900 pr-6 border-r border-stone-200/80">
                {c.nodes[active].name}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1.5">{c.wantLabel}</div>
                <p className="text-[14px] text-stone-700 leading-[1.55]">{c.nodes[active].want}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1.5">{c.blockLabel}</div>
                <p className="text-[14px] text-accent/90 leading-[1.55]">{c.nodes[active].block}</p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-[12px] text-stone-400 tracking-wide pt-10">
              {c.legend}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: accessible stack (no pentagon — pentagon doesn't render well at <480px) */}
      <div className="md:hidden border-t border-stone-200">
        {NODES.map((n) => {
          const data = c.nodes[n.id]
          return (
            <div key={n.id} className="py-5 border-b border-stone-200">
              <div className="text-[15px] font-semibold text-stone-900 mb-2">{data.name}</div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 pt-0.5">{c.wantLabel}</span>
                <span className="text-stone-700 leading-relaxed">{data.want}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 pt-0.5">{c.blockLabel}</span>
                <span className="text-accent/90 leading-relaxed">{data.block}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

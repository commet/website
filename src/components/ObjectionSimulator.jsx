import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'

const t = {
  en: {
    label: 'Objection Simulator',
    poweredBy: 'Powered by Overture',
    prompt: 'Pitch your idea in one line.',
    hint: "Three stakeholders will tell you what they'd ask first.",
    placeholder: 'e.g., We should adopt Claude for our customer support team',
    tryLabel: 'Try:',
    examples: [
      'Adopt Claude for our customer support team',
      'Build an internal RAG system for the Legal team',
    ],
    submit: 'Simulate',
    simulating: 'Simulating…',
    again: 'Try another pitch',
    full: 'See the full Overture',
    loadingTitle: 'Three stakeholders are thinking…',
    resultTitle: 'Three stakeholders weigh in:',
    caseStudyBridge: 'Want to see how I cleared this in a real enterprise rollout?',
    caseStudyLink: 'Read the STRIX case study →',
    charCount: (n) => `${n}/500`,
    personas: { CFO: 'CFO', Security: 'Security', 'End User': 'End User' },
    errors: {
      rate_limited: 'Demo limit reached (5 per day per visitor). Come back tomorrow, or try Overture in full →',
      not_configured: 'Interactive demo is warming up. Try Overture in full while I finish wiring this →',
      generation_failed: 'Generation failed. Try again, or open the full Overture →',
      bad_model_output: 'The model returned something unparseable. Try a different phrasing.',
      invalid_input: 'Enter between 10 and 500 characters.',
      method_not_allowed: 'Something went wrong. Try the full Overture →',
      generic: 'Something went wrong. Try the full Overture →',
    },
  },
  kr: {
    label: 'Objection Simulator',
    poweredBy: 'Powered by Overture',
    prompt: '당신의 아이디어를 한 줄로 적어보세요.',
    hint: '세 명의 이해관계자가 가장 먼저 던질 질문을 보여드립니다.',
    placeholder: '예: 고객지원팀에 Claude를 도입하자',
    tryLabel: '예시:',
    examples: [
      '고객지원팀에 Claude 도입하자',
      '법무팀 전용 내부 RAG 만들자',
    ],
    submit: '시뮬레이션',
    simulating: '시뮬레이션 중…',
    again: '다른 아이디어로 해보기',
    full: '전체 Overture 보러가기',
    loadingTitle: '세 명의 이해관계자가 생각 중…',
    resultTitle: '세 명의 이해관계자가 반응합니다:',
    caseStudyBridge: '실제 엔터프라이즈에서 이런 반대를 어떻게 뚫었는지 궁금하신가요?',
    caseStudyLink: 'STRIX 케이스 스터디 읽기 →',
    charCount: (n) => `${n}/500`,
    personas: { CFO: 'CFO', Security: '보안/법무', 'End User': '현업 직원' },
    errors: {
      rate_limited: '데모 제한에 도달했습니다 (방문자당 하루 5회). 내일 다시 오시거나 전체 Overture에서 체험 →',
      not_configured: '인터랙티브 데모 준비 중입니다. 전체 Overture에서 먼저 체험해보세요 →',
      generation_failed: '생성에 실패했습니다. 다시 시도하거나 전체 Overture에서 →',
      bad_model_output: '모델 응답이 파싱되지 않았습니다. 다른 표현으로 다시 시도해주세요.',
      invalid_input: '10자 이상 500자 이하로 입력해주세요.',
      method_not_allowed: '문제가 발생했습니다. 전체 Overture에서 →',
      generic: '문제가 발생했습니다. 전체 Overture에서 →',
    },
  },
}

const MIN_LOADING_MS = 1200
const OVERTURE_URL = 'https://overture-beta.vercel.app'

export default function ObjectionSimulator() {
  const { lang } = useLang()
  const c = t[lang]

  const [pitch, setPitch] = useState('')
  const [view, setView] = useState('idle') // idle | loading | result | error
  const [objections, setObjections] = useState(null)
  const [errorKey, setErrorKey] = useState(null)
  const abortRef = useRef(null)

  const trimmed = pitch.trim()
  const canSubmit = trimmed.length >= 10 && trimmed.length <= 500 && view !== 'loading'

  const submit = async () => {
    if (!canSubmit) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setView('loading')
    setObjections(null)
    setErrorKey(null)
    track('simulator_submit', { pitch_length: trimmed.length, lang })

    const started = Date.now()

    try {
      const res = await fetch('/api/objection-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch: trimmed, lang }),
        signal: controller.signal,
      })

      const data = await res.json().catch(() => ({}))
      const elapsed = Date.now() - started
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed))
      }

      if (!res.ok) {
        const key = typeof data?.error === 'string' && c.errors[data.error] ? data.error : 'generic'
        setErrorKey(key)
        setView('error')
        track('simulator_error', { error: key })
        return
      }

      setObjections(data.objections)
      setView('result')
      track('simulator_success', { lang })
    } catch (err) {
      if (err?.name === 'AbortError') return
      setErrorKey('generic')
      setView('error')
    }
  }

  const reset = () => {
    setView('idle')
    setObjections(null)
    setErrorKey(null)
    track('simulator_reset')
  }

  const useExample = (ex) => {
    setPitch(ex)
    track('simulator_example', { example: ex })
  }

  return (
    <div className="border border-stone-200/70 rounded-2xl bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 md:px-7 py-3.5 border-b border-stone-100 bg-stone-50/40">
        <span className="text-[11px] text-stone-500 uppercase tracking-[0.22em] font-medium">
          {c.label}
        </span>
        <a
          href={OVERTURE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('overture_link', { from: 'simulator_header' })}
          className="text-[11px] text-stone-400 hover:text-accent transition-colors no-underline"
        >
          {c.poweredBy} →
        </a>
      </div>

      {/* Body */}
      <div className="p-5 md:p-7">
        <AnimatePresence mode="wait">
          {view === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-[15px] md:text-[16px] text-stone-900 font-medium mb-1">{c.prompt}</p>
              <p className="text-[13px] text-stone-500 mb-4">{c.hint}</p>

              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value.slice(0, 500))}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit()
                }}
                placeholder={c.placeholder}
                rows={3}
                className="w-full text-[15px] text-stone-900 leading-[1.6] bg-cream/30 border border-stone-200 rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-accent/60 focus:bg-white transition-colors placeholder:text-stone-400"
              />

              <div className="mt-3 flex items-center flex-wrap gap-2">
                <span className="text-[12px] text-stone-400 mr-1">{c.tryLabel}</span>
                {c.examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => useExample(ex)}
                    className="text-[12px] text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors rounded-md px-2.5 py-1 cursor-pointer border-0"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className={`text-[11px] tabular-nums ${pitch.length > 450 ? 'text-accent' : 'text-stone-400'}`}>
                  {c.charCount(pitch.length)}
                </span>
                <button
                  onClick={submit}
                  disabled={!canSubmit}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-stone-900 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-0"
                >
                  {c.submit}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {view === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-[14px] text-stone-500 mb-5 flex items-center gap-2">
                <ThinkingDots />
                {c.loadingTitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <SkeletonCard key={i} delay={i * 0.15} />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'result' && objections && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-[13px] text-stone-500 mb-5">{c.resultTitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {objections.map((o, i) => (
                  <ObjectionCard
                    key={i}
                    index={i}
                    persona={c.personas[o.persona] || o.persona}
                    objection={o.objection}
                    rationale={o.rationale}
                  />
                ))}
              </div>

              {/* Narrative bridge to STRIX case study */}
              <div className="mt-7 pt-5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[13px] text-stone-500 leading-relaxed">{c.caseStudyBridge}</p>
                <a
                  href="/case-study/strix"
                  onClick={(e) => {
                    e.preventDefault()
                    track('case_study_open', { study: 'strix', location: 'simulator_bridge' })
                    import('../navigate').then((m) => m.navigate('/case-study/strix'))
                  }}
                  className="text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors whitespace-nowrap"
                >
                  {c.caseStudyLink}
                </a>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  onClick={reset}
                  className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-0"
                >
                  ← {c.again}
                </button>
                <a
                  href={OVERTURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('overture_link', { from: 'simulator_result' })}
                  className="text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors"
                >
                  {c.full} →
                </a>
              </div>
            </motion.div>
          )}

          {view === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-6"
            >
              <p className="text-[14px] text-stone-700 leading-relaxed max-w-[520px]">
                {c.errors[errorKey] || c.errors.generic}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={reset}
                  className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-0"
                >
                  ← {c.again}
                </button>
                <a
                  href={OVERTURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('overture_link', { from: 'simulator_error' })}
                  className="text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors"
                >
                  {c.full} →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </span>
  )
}

function SkeletonCard({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-cream/40 border border-stone-200/70 rounded-xl p-4"
    >
      <div className="h-3 w-14 bg-stone-200 rounded mb-3 animate-pulse" />
      <div className="h-3 w-full bg-stone-200/70 rounded mb-2 animate-pulse" />
      <div className="h-3 w-4/5 bg-stone-200/70 rounded mb-4 animate-pulse" />
      <div className="h-2.5 w-full bg-stone-200/50 rounded mb-1.5 animate-pulse" />
      <div className="h-2.5 w-3/4 bg-stone-200/50 rounded animate-pulse" />
    </motion.div>
  )
}

function ObjectionCard({ index, persona, objection, rationale }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="bg-cream/30 border border-stone-200/70 rounded-xl p-4 md:p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="text-[11px] text-stone-500 uppercase tracking-[0.18em] font-semibold">
          {persona}
        </span>
      </div>
      <p className="text-[14px] md:text-[15px] text-stone-900 font-serif italic leading-[1.5] mb-3">
        {objection}
      </p>
      <p className="text-[12.5px] text-stone-500 leading-[1.6]">{rationale}</p>
    </motion.div>
  )
}

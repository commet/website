import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'
import { navigate } from '../navigate'
import ObjectionSimulator from './ObjectionSimulator'

const sayuAnimals = [
  { apt: 'LAEF', animal: 'Fox', slug: 'laef-fox' },
  { apt: 'LAEC', animal: 'Cat', slug: 'laec-cat' },
  { apt: 'LAMF', animal: 'Owl', slug: 'lamf-owl' },
  { apt: 'LAMC', animal: 'Turtle', slug: 'lamc-turtle' },
  { apt: 'LREF', animal: 'Chameleon', slug: 'lref-chameleon' },
  { apt: 'LREC', animal: 'Hedgehog', slug: 'lrec-hedgehog' },
  { apt: 'LRMF', animal: 'Octopus', slug: 'lrmf-octopus' },
  { apt: 'LRMC', animal: 'Beaver', slug: 'lrmc-beaver' },
  { apt: 'SAEF', animal: 'Butterfly', slug: 'saef-butterfly' },
  { apt: 'SAEC', animal: 'Penguin', slug: 'saec-penguin' },
  { apt: 'SAMF', animal: 'Parrot', slug: 'samf-parrot' },
  { apt: 'SAMC', animal: 'Deer', slug: 'samc-deer' },
  { apt: 'SREF', animal: 'Dog', slug: 'sref-dog' },
  { apt: 'SREC', animal: 'Duck', slug: 'srec-duck' },
  { apt: 'SRMF', animal: 'Elephant', slug: 'srmf-elephant' },
  { apt: 'SRMC', animal: 'Eagle', slug: 'srmc-eagle' },
]

const t = {
  en: {
    section: 'Selected Work',
    thread: (
      <>
        Five builds, one thesis — AI gets adopted when it lives inside what users already do,{' '}
        <span className="md:whitespace-nowrap">not when it asks them to change.</span>
      </>
    ),
    argus: {
      chapter: '01 — Live Product',
      sub: 'Decision Navigation for the AI Era',
      date: '2026 · Solo build',
      desc: `When AI takes over execution, what's left — and what atrophies — is judgment. Argus is my answer: not an oracle that hands you answers, but a mirror that grows your own. Decisions are sealed as predictions, then settled against reality when the check-in date arrives. The conclusion stays yours.`,
      build: `Shipped solo in 4 months — web app, MCP server on npm, Claude Code plugin, Telegram bot. Built AI-natively all the way down: 44-agent parallel audits, and CI guards that catch what LLMs do best — confident, plausible fabrication. The repo documents the method as operating principles.`,
      quote: `Making AI do the work, and refusing to trust its plausibility, are two different skills.`,
      cite: '— The repo demonstrates both',
      proof: '1,588 commits · 4 months · 4 surfaces · live at argus.voyage',
      ctaLive: 'Sail Argus',
      ctaRepo: 'Read the repo',
    },
    strix: {
      chapter: '02 — Case Study',
      sub: 'Enterprise RAG System',
      date: 'SK On · 2024',
      mysuni: 'Featured on SK Group mySUNI',
      reviews: 'Employee reviews on mySUNI',
      feedback: 'Direct feedback from SK subsidiary PM',
      desc: 'LLM-powered knowledge system for SK On\'s Strategy Division. Navigated enterprise constraints — data security, audit trails, executive skepticism — and drove organization-wide adoption. Presented to CEO and C-level as a best practice case.',
      transferPreview: {
        intro: 'Three patterns inside the case study',
        items: [
          'Risk posture sold before capability',
          'Claude delivered inside Excel, not a new tab',
          'Cost reframed as CapEx, not SaaS',
        ],
      },
      quote: '"By my standards, you saved me a month of struggling."',
      cite: '— PM at another SK subsidiary',
      stat1: 'registered',
      stat2: 'daily (Strategy Division)',
      caseStudyCta: 'Read the full case study',
    },
    tower: {
      chapter: '03 — Client Work',
      sub: 'Maritime Logistics AX · via Praxis',
      date: '2026 · Independent',
      desc: `After SK On, I registered a one-person business — Praxis — and won an AI-transformation engagement with a shipping & logistics company. Domain research, weekly consulting reports, then a deployed control tower: vessel on-time prediction (P-ETA), risk dashboards, port congestion analysis. The full forward-deployed cycle, purchased at market price.`,
      note: 'Client deployment — private. Walkthrough available on request.',
    },
    sayu: {
      chapter: '05 — Live Product',
      sub: 'AI Art Curation',
      desc: 'The bet: AI can curate for feeling, not just retrieval.',
      stack: '16 APT types · 5M+ artworks indexed · global exhibition matching · built end-to-end (taxonomy, pgvector, AI counselor, onboarding)',
      proof: '100% onboarding completion · 20% K-factor · live at sayu.my',
      proofNote: 'Owned end-to-end: acquisition, activation, retention.',
      cta: 'Experience SAYU',
    },
    overture: {
      chapter: '04 — Live Demo',
      sub: 'AI Thinking Tool',
      desc: 'The real barrier to AI adoption isn\'t technical — it\'s cognitive. Overture sharpens thinking so you can harness what\'s in front of you.',
      quote: '"Blunt thinking can\'t harness AI. Overture sharpens your thinking."',
      cite: '— Overture\'s first user, a developer who also designs',
      cta: 'Try Overture',
      tryHint: 'The three personas — CFO, Security, End User — raise objections shaped by the ones I actually faced building STRIX.',
    },
  },
  kr: {
    section: '주요 프로젝트',
    thread: '다섯 개의 결과물, 하나의 명제 — AI는 사용자에게 바뀌라고 요구할 때가 아니라, 이미 하고 있는 일 안에 스며들 때 채택됩니다.',
    argus: {
      chapter: '01 — 라이브 제품',
      sub: 'AI 시대의 판단 항해',
      date: '2026 · 1인 개발',
      desc: 'AI가 실행을 가져간 시대, 남는 것도 무뎌지는 것도 판단입니다. Argus는 그 답입니다 — 답을 주는 신탁(oracle)이 아니라 판단을 기르는 거울(mirror). 결정을 예측으로 봉인(seal)하고, 확인일이 오면 현실과 대조해 정산(settle)합니다. 결론은 끝까지 사용자의 것으로 남습니다.',
      build: '4개월간 웹앱 · MCP 서버(npm) · Claude Code 플러그인 · 텔레그램 봇을 혼자 출시. 만드는 방법도 AI Native였습니다 — 44개 에이전트 병렬 감사, LLM의 그럴듯한 거짓을 CI가 붙잡는 가드 구조까지 리포에 원칙 문서로 공개되어 있습니다.',
      quote: 'AI에게 일을 시키는 능력과, AI의 그럴듯함을 믿지 않는 구조를 짓는 능력은 다른 능력입니다.',
      cite: '— 리포가 둘 다를 증명합니다',
      proof: '1,588 커밋 · 4개월 · 4개 표면 · argus.voyage 운영 중',
      ctaLive: 'Argus 항해하기',
      ctaRepo: 'GitHub 리포',
    },
    strix: {
      chapter: '02 — 케이스 스터디',
      sub: '엔터프라이즈 RAG 시스템',
      date: 'SK On · 2024',
      mysuni: 'SK그룹 mySUNI Best Practice 선정',
      reviews: 'mySUNI 수강생 리뷰',
      feedback: '타 SK 계열사 PM의 직접 피드백',
      desc: 'SK On 전략기획본부를 위한 LLM 기반 지식 시스템. 데이터 보안, 감사 추적, 경영진 설득 등 엔터프라이즈 제약을 돌파하고 전사 도입까지 이끌었습니다. CEO 및 C-level 대상 Best Practice로 발표.',
      transferPreview: {
        intro: '케이스 스터디 안의 세 가지 패턴',
        items: [
          '성능이 아니라 리스크 포스처를 먼저 판 방법',
          'Claude를 새 탭이 아니라 Excel 안으로 배달',
          '비용을 SaaS가 아니라 CapEx로 재정의',
        ],
      },
      quote: '"제 기준으로 삽질할 1달은 아꼈어요."',
      cite: '— 타 SK 계열사 PM',
      stat1: '명 등록',
      stat2: '명 매일 사용 (전략기획본부)',
      caseStudyCta: '전체 케이스 스터디 읽기',
    },
    tower: {
      chapter: '03 — 클라이언트 워크',
      sub: '해운물류 AX · Praxis',
      date: '2026 · 독립 수주',
      desc: 'SK On을 나와 1인 사업자 Praxis를 등록하고, 해운물류 기업의 AX 프로젝트를 독립으로 수주했습니다. 도메인 리서치, 주간 컨설팅 리포트, 그리고 실제 배포된 control tower — 선박 정시율 예측(P-ETA), 리스크 대시보드, 항만 체선 분석까지. 소속 없이 시장이 값을 치르고 산 AI 역량입니다.',
      note: '클라이언트 배포물 — 비공개. 요청 시 워크스루를 제공합니다.',
    },
    sayu: {
      chapter: '05 — 라이브 제품',
      sub: 'AI 아트 큐레이션',
      desc: '내기 하나 — AI는 정보 검색이 아니라 감정을 curation할 수 있을까.',
      stack: '16 APT 유형 · 500만+ 작품 인덱싱 · 글로벌 전시 매칭 · end-to-end 설계 (분류 체계, pgvector, AI 큐레이터, 온보딩)',
      proof: '온보딩 완료율 100% · K-factor 20% · sayu.my 운영 중',
      proofNote: '유입 · 활성화 · 리텐션 전부 직접 설계하고 계측했습니다.',
      cta: 'SAYU 경험하기',
    },
    overture: {
      chapter: '04 — 라이브 데모',
      sub: 'AI 사고 도구',
      desc: 'AI 도입의 진짜 장벽은 기술이 아니라 인지입니다. Overture는 낯선 영역에서도 사고를 선명하게 만듭니다.',
      quote: '"생각이 뭉툭하면 AI를 다룰 수 없다. Overture는 생각을 뾰족하게 만든다."',
      cite: '— Overture 첫 사용자, 개발자이자 디자이너',
      cta: 'Overture 체험하기',
      tryHint: '세 페르소나 — CFO · 보안 · 현업 — 이 제기하는 반대는 제가 STRIX를 만들며 실제로 마주친 반발에서 설계됐습니다.',
    },
  },
}

function Argus() {
  const { lang } = useLang()
  const c = t[lang].argus

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-4 font-medium">{c.chapter}</p>

      {/* Poster title — display scale, matches STRIX weight */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6 mb-8 md:mb-10 pb-2 border-b border-stone-200">
        <div>
          <h3 className="text-[clamp(3rem,8.5vw,6rem)] font-bold text-stone-900 tracking-[-0.05em] leading-[0.92]">Argus</h3>
          <p className="font-serif italic text-[18px] md:text-[22px] text-stone-600 mt-2 tracking-[-0.01em]">{c.sub}</p>
        </div>
        <span className="text-[12px] text-stone-400 tracking-wide pb-2">{c.date}</span>
      </div>

      {/* Thesis (left) | build method + differentiator (right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-8 md:mb-10">
        <div className="md:col-span-6">
          <p className="text-[16px] md:text-[17px] text-stone-800 leading-[1.75]">{c.desc}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="text-[14px] text-stone-500 leading-[1.75] mb-5">{c.build}</p>
          <blockquote className="border-l-2 border-accent/50 pl-5">
            <p className="text-[16px] md:text-[17px] text-stone-800 italic leading-[1.55]">{c.quote}</p>
            <cite className="text-[12px] text-stone-400 not-italic block mt-2">{c.cite}</cite>
          </blockquote>
        </div>
      </div>

      {/* Proof line + CTAs */}
      <div className="pt-5 border-t border-stone-200/70">
        <p className="text-[15px] text-stone-900 font-semibold mb-5">{c.proof}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://argus.voyage"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('project_click', { project: 'argus', area: 'cta' })}
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline bg-accent text-white px-5 py-3 rounded-lg hover:bg-stone-900 transition-colors shadow-sm"
          >
            {c.ctaLive}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
          <a
            href="https://github.com/commet/Argus"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('project_click', { project: 'argus', area: 'repo' })}
            className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors"
          >
            {c.ctaRepo}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ControlTower() {
  const { lang } = useLang()
  const c = t[lang].tower

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-4 font-medium">{c.chapter}</p>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6 mb-8 md:mb-10">
        <div>
          <h3 className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-stone-900 tracking-[-0.05em] leading-[0.92]">Control Tower</h3>
          <p className="font-serif italic text-[14px] md:text-[16px] text-stone-500 mt-2 tracking-[-0.01em]">{c.sub}</p>
        </div>
        <span className="text-[12px] text-stone-400 tracking-wide pb-2">{c.date}</span>
      </div>

      <p className="text-[16px] md:text-[17px] text-stone-700 leading-[1.75] max-w-[760px] mb-6">
        {c.desc}
      </p>
      <p className="text-[12.5px] text-stone-400 italic leading-[1.6]">{c.note}</p>
    </motion.div>
  )
}

function Strix() {
  const { lang } = useLang()
  const c = t[lang].strix

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-4 font-medium">{c.chapter}</p>

      {/* Poster title — display scale */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6 mb-6 md:mb-8 pb-2 border-b border-stone-200">
        <div>
          <h3 className="text-[clamp(3rem,8.5vw,6rem)] font-bold text-stone-900 tracking-[-0.05em] leading-[0.92]">STRIX</h3>
          <p className="font-serif italic text-[18px] md:text-[22px] text-stone-600 mt-2 tracking-[-0.01em]">{c.sub}</p>
        </div>
        <span className="text-[12px] text-stone-400 tracking-wide pb-2">{c.date}</span>
      </div>

      {/* Main image — no chrome, full-bleed feel */}
      <div className="space-y-3 mb-10 md:mb-12">
        <figure>
          <div className="aspect-[16/9] overflow-hidden bg-stone-50 rounded-2xl">
            <img src="/images/strix-video.jpeg" alt={c.mysuni} className="w-full h-full object-cover object-top block" />
          </div>
          <figcaption className="text-[11px] text-stone-400 mt-2 tracking-wide italic">{c.mysuni}</figcaption>
        </figure>

        {/* Two evidence images side by side */}
        <div className="grid grid-cols-2 gap-3 items-start pt-2">
          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
            <div className="flex items-center px-3 py-1.5 border-b border-stone-100 bg-stone-50/50">
              <span className="text-[10px] text-stone-400">{c.reviews}</span>
            </div>
            <div className="h-[260px] md:h-[300px] overflow-hidden">
              <img src="/images/strix-mysuni.jpeg" alt={c.reviews} className="w-full h-full object-cover object-top" />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-stone-900">
            <div className="flex items-center px-3 py-1.5 border-b border-stone-800">
              <span className="text-[10px] text-stone-500">{c.feedback}</span>
            </div>
            <div className="h-[260px] md:h-[300px] bg-stone-900 flex items-center justify-center p-2">
              <img src="/images/strix-feedback-quote.jpeg" alt={c.feedback} className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: desc (left) | quote + stats (right) — peer balance */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-14">
        <div className="md:col-span-6">
          <p className="text-stone-500 leading-[1.75]">{c.desc}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <blockquote className="border-l-2 border-accent/50 pl-5 mb-5">
            <p className="text-[16px] md:text-[17px] text-stone-800 italic leading-[1.55]">{c.quote}</p>
            <cite className="text-[12px] text-stone-400 not-italic block mt-2">{c.cite}</cite>
          </blockquote>
          <div className="text-[13px] space-y-1">
            <div>
              <span className="text-stone-900 font-semibold">600+</span>
              <span className="text-stone-500 font-normal ml-1">{c.stat1}</span>
            </div>
            <div>
              <span className="text-stone-900 font-semibold">~30</span>
              <span className="text-stone-500 font-normal ml-1">{c.stat2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Three patterns — full-width callout */}
      <div className="bg-cream/50 border border-stone-200/70 rounded-xl p-5 md:p-7 mb-8 md:mb-10 max-w-[860px]">
        <p className="text-[11px] text-stone-500 uppercase tracking-[0.22em] font-medium mb-4">{c.transferPreview.intro}</p>
        <ul className="space-y-3 md:space-y-3.5">
          {c.transferPreview.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-[15px] md:text-[16px] text-stone-800 leading-[1.55]">
              <span className="text-accent font-mono text-[12px] tracking-wide leading-[1.8] flex-shrink-0 font-semibold">0{i+1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Row 3: CTA */}
      <a
        href="/case-study/strix"
        onClick={(e) => {
          e.preventDefault()
          track('case_study_open', { study: 'strix', location: 'projects_card' })
          navigate('/case-study/strix')
        }}
        className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline bg-accent text-white px-5 py-3 rounded-lg hover:bg-stone-900 transition-colors shadow-sm"
      >
        {c.caseStudyCta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
      </a>
    </motion.div>
  )
}

function Sayu() {
  const { lang } = useLang()
  const c = t[lang].sayu

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-6 font-medium">{c.chapter}</p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
      <a href="https://sayu.my" target="_blank" rel="noopener noreferrer" onClick={() => track('project_click', { project: 'sayu', area: 'image' })} className="md:col-span-5 block group">
        <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-stone-100 bg-stone-50/50">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <span className="ml-3 text-[10px] text-stone-400 truncate">sayu.my — 16 Art Personality Types</span>
          </div>
          <div className="p-3 bg-cream/25">
            <div className="grid grid-cols-4 gap-2">
              {sayuAnimals.map((a) => (
                <div
                  key={a.apt}
                  className="flex flex-col items-center justify-center aspect-square rounded-lg bg-white border border-stone-100/80 p-1.5 group-hover:border-accent/30 transition-colors"
                  title={`${a.apt} — ${a.animal}`}
                >
                  <img
                    src={`/images/sayu/${a.slug}.webp`}
                    alt={`${a.apt} ${a.animal}`}
                    loading="lazy"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '64%' }}
                  />
                  <span className="text-[9px] text-stone-400 mt-1 font-mono tracking-wide leading-none">{a.apt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
      <div className="md:col-span-6 md:col-start-7">
        {/* Title + subtitle — subtitle sized down to match Overture, title dominates */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-stone-900 tracking-[-0.05em] leading-[0.92]">SAYU</h3>
          <p className="font-serif italic text-[14px] md:text-[16px] text-stone-500 mt-2 tracking-[-0.01em]">{c.sub}</p>
        </div>

        {/* Unit 1: thesis + tech specs as one continuous block */}
        <div className="mb-6 md:mb-7">
          <p className="text-[17px] md:text-[18px] text-stone-800 leading-[1.55] mb-2">{c.desc}</p>
          <p className="text-[13px] text-stone-400 leading-[1.65]">{c.stack}</p>
        </div>

        {/* Unit 2: metrics + ownership note as one block, separated by thin line */}
        <div className="mb-7 md:mb-8 pt-5 border-t border-stone-200/70">
          <p className="text-[15px] text-stone-900 font-semibold mb-1">{c.proof}</p>
          <p className="text-[12.5px] text-stone-500 italic leading-[1.6]">{c.proofNote}</p>
        </div>

        <a href="https://sayu.my" target="_blank" rel="noopener noreferrer" onClick={() => track('project_click', { project: 'sayu', area: 'cta' })}
          className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors">
          {c.cta}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>
      </div>
    </motion.div>
  )
}

function Overture() {
  const { lang } = useLang()
  const c = t[lang].overture

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-4 font-medium">{c.chapter}</p>

      {/* Title: subtitle sized down so title dominates, no divider */}
      <div className="mb-10 md:mb-12">
        <h3 className="text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold text-stone-900 tracking-[-0.05em] leading-[0.92]">Overture</h3>
        <p className="font-serif italic text-[14px] md:text-[16px] text-stone-500 mt-2 tracking-[-0.01em]">{c.sub}</p>
      </div>

      {/* Unified desc */}
      <p className="text-[16px] md:text-[17px] text-stone-700 leading-[1.75] max-w-[760px] mb-8">
        {c.desc}
      </p>

      {/* Supporting quote — subdued, not competing with title */}
      <blockquote className="border-l border-stone-300 pl-4 mb-10 max-w-[760px]">
        <p className="font-serif italic text-stone-700 text-[16px] md:text-[18px] leading-[1.55]">{c.quote}</p>
        <cite className="text-[12px] text-stone-400 not-italic block mt-2 tracking-wide">{c.cite}</cite>
      </blockquote>

      {/* Simulator: bridge hint directly above, no eyebrow (simulator has its own) */}
      <p className="text-[13px] text-stone-500 leading-[1.65] max-w-[760px] mb-4">
        {c.tryHint}
      </p>
      <ObjectionSimulator />
    </motion.div>
  )
}

export default function Projects() {
  const { lang } = useLang()

  return (
    <section id="work" className="py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t[lang].section}
        </motion.h2>
        <motion.p
          className="font-serif italic text-stone-600 text-[17px] md:text-[19px] leading-[1.55] max-w-[760px] mb-10 md:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t[lang].thread}
        </motion.p>
        <Argus />
      </div>
      <div className="bg-cream/40 mt-12 md:mt-16 py-12 md:py-16 px-6 md:px-10 -mx-6 md:-mx-10">
        <div className="max-w-[1200px] mx-auto">
          <Strix />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 md:mt-16">
        <ControlTower />
      </div>
      <div className="bg-cream/40 mt-12 md:mt-16 py-12 md:py-16 px-6 md:px-10 -mx-6 md:-mx-10">
        <div className="max-w-[1200px] mx-auto">
          <Overture />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 md:mt-16">
        <Sayu />
      </div>
    </section>
  )
}

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
    thread: 'Three products, one thesis — AI gets adopted when it lives inside what users already do, not when it asks them to change.',
    strix: {
      chapter: '01 — Case Study',
      sub: 'Enterprise RAG System',
      date: 'SK On · 2024',
      mysuni: 'Featured on SK Group mySUNI',
      reviews: 'Employee reviews on mySUNI',
      feedback: 'Direct feedback from SK subsidiary PM',
      desc: 'LLM-powered knowledge system for SK On\'s Strategy Division. Navigated enterprise constraints — data security, audit trails, executive skepticism — and drove organization-wide adoption. Presented to CEO and C-level as a best practice case.',
      transferPreview: 'Three patterns inside the case study: selling risk posture before capability · putting Claude inside Excel · CapEx framing, not SaaS.',
      quote: '"By my standards, you saved me a month of struggling."',
      cite: '— PM at another SK subsidiary',
      stat1: 'registered',
      stat2: 'daily (Strategy Division)',
      caseStudyCta: 'Read the full case study',
    },
    sayu: {
      chapter: '03 — Live Product',
      sub: 'AI Art Curation',
      desc: 'The bet: AI can curate for feeling, not just retrieval.',
      stack: '16 APT types · 5M+ artworks indexed · global exhibition matching · built end-to-end (taxonomy, pgvector, AI counselor, onboarding)',
      proof: '100% onboarding completion · 20% K-factor · live at sayu.my',
      proofNote: 'Owned end-to-end: acquisition, activation, retention.',
      cta: 'Experience SAYU',
    },
    overture: {
      chapter: '02 — Live Demo',
      sub: 'AI Thinking Tool',
      desc: 'The real barrier to AI adoption isn\'t technical — it\'s cognitive. Overture sharpens thinking so you can harness what\'s in front of you.',
      quote: '"Blunt thinking can\'t harness AI. Overture sharpens your thinking."',
      cite: '— Overture\'s first user, a developer who also designs',
      cta: 'Try Overture',
      tryLabel: 'Try a live slice of Overture',
      tryHint: 'The three personas — CFO, Security, End User — raise objections shaped by the ones I actually faced building STRIX.',
    },
  },
  kr: {
    section: '주요 프로젝트',
    thread: '세 제품, 하나의 명제 — AI는 사용자에게 바뀌라고 요구할 때가 아니라, 이미 하고 있는 일 안에 스며들 때 채택됩니다.',
    strix: {
      chapter: '01 — 케이스 스터디',
      sub: '엔터프라이즈 RAG 시스템',
      date: 'SK On · 2024',
      mysuni: 'SK그룹 mySUNI Best Practice 선정',
      reviews: 'mySUNI 수강생 리뷰',
      feedback: '타 SK 계열사 PM의 직접 피드백',
      desc: 'SK On 전략기획본부를 위한 LLM 기반 지식 시스템. 데이터 보안, 감사 추적, 경영진 설득 등 엔터프라이즈 제약을 돌파하고 전사 도입까지 이끌었습니다. CEO 및 C-level 대상 Best Practice로 발표.',
      transferPreview: '케이스 스터디 안의 세 가지 패턴: 성능보다 리스크 포스처 먼저 · Claude를 Excel 안에 · SaaS가 아니라 CapEx로.',
      quote: '"제 기준으로 삽질할 1달은 아꼈어요."',
      cite: '— 타 SK 계열사 PM',
      stat1: '명 등록',
      stat2: '명 매일 사용 (전략기획본부)',
      caseStudyCta: '전체 케이스 스터디 읽기',
    },
    sayu: {
      chapter: '03 — 라이브 제품',
      sub: 'AI 아트 큐레이션',
      desc: '내기 하나 — AI는 정보 검색이 아니라 감정을 curation할 수 있을까.',
      stack: '16 APT 유형 · 500만+ 작품 인덱싱 · 글로벌 전시 매칭 · end-to-end 설계 (분류 체계, pgvector, AI 큐레이터, 온보딩)',
      proof: '온보딩 완료율 100% · K-factor 20% · sayu.my 운영 중',
      proofNote: '유입 · 활성화 · 리텐션 전부 직접 설계하고 계측했습니다.',
      cta: 'SAYU 경험하기',
    },
    overture: {
      chapter: '02 — 라이브 데모',
      sub: 'AI 사고 도구',
      desc: 'AI 도입의 진짜 장벽은 기술이 아니라 인지입니다. Overture는 낯선 영역에서도 사고를 선명하게 만듭니다.',
      quote: '"생각이 뭉툭하면 AI를 다룰 수 없다. Overture는 생각을 뾰족하게 만든다."',
      cite: '— Overture 첫 사용자, 개발자이자 디자이너',
      cta: 'Overture 체험하기',
      tryLabel: 'Overture의 한 조각, 지금 써보기',
      tryHint: '세 페르소나 — CFO · 보안 · 현업 — 이 제기하는 반대는 제가 STRIX를 만들며 실제로 마주친 반발에서 설계됐습니다.',
    },
  },
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
            <img src="/images/strix-video.jpeg" alt={c.mysuni} className="w-full h-full object-cover object-center block" />
          </div>
          <figcaption className="text-[11px] text-stone-400 mt-2 tracking-wide italic">{c.mysuni}</figcaption>
        </figure>

        {/* Two evidence images side by side */}
        <div className="grid grid-cols-2 gap-3 items-start pt-2">
          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
            <div className="flex items-center px-3 py-1.5 border-b border-stone-100 bg-stone-50/50">
              <span className="text-[10px] text-stone-400">{c.reviews}</span>
            </div>
            <div className="h-[200px] overflow-hidden">
              <img src="/images/strix-mysuni.jpeg" alt={c.reviews} className="w-full h-full object-cover object-top" />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-stone-900">
            <div className="flex items-center px-3 py-1.5 border-b border-stone-800">
              <span className="text-[10px] text-stone-500">{c.feedback}</span>
            </div>
            <div className="h-[200px] bg-stone-900 flex items-center justify-center p-2">
              <img src="/images/strix-feedback-quote.jpeg" alt={c.feedback} className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Content below */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <p className="text-stone-500 leading-[1.75] mb-5">{c.desc}</p>
          <p className="text-[13px] text-stone-700 leading-[1.7] mb-5 border-l-2 border-accent/40 pl-3.5">{c.transferPreview}</p>
          <a
            href="/case-study/strix"
            onClick={(e) => {
              e.preventDefault()
              track('case_study_open', { study: 'strix', location: 'projects_card' })
              navigate('/case-study/strix')
            }}
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline bg-accent text-white px-4 py-2.5 rounded-lg hover:bg-stone-900 transition-colors shadow-sm"
          >
            {c.caseStudyCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <blockquote className="border-l-2 border-accent/30 pl-4 mb-5">
            <p className="text-[15px] text-stone-700 italic leading-relaxed">{c.quote}</p>
            <cite className="text-[12px] text-stone-400 not-italic block mt-1.5">{c.cite}</cite>
          </blockquote>
          <div className="text-[13px] space-y-1">
            <div>
              <span className="text-stone-900 font-semibold">600+</span>
              <span className="text-stone-400 font-normal ml-1">{c.stat1}</span>
            </div>
            <div>
              <span className="text-stone-900 font-semibold">~30</span>
              <span className="text-stone-400 font-normal ml-1">{c.stat2}</span>
            </div>
          </div>
        </div>
      </div>
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
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">SAYU</span>
          <span className="text-[13px] text-accent font-medium">{c.sub}</span>
        </div>
        <p className="text-stone-500 leading-[1.75] mb-3">{c.desc}</p>
        <p className="text-[12px] text-stone-400 leading-[1.65] mb-5">{c.stack}</p>
        <p className="text-[13px] text-stone-700 font-medium mb-1">{c.proof}</p>
        <p className="text-[12px] text-stone-500 leading-[1.6] mb-5">{c.proofNote}</p>
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
      <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-6 font-medium">{c.chapter}</p>
      {/* Intro: title + description + quote */}
      <div className="max-w-[760px] mb-8">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">Overture</span>
          <span className="text-[13px] text-accent font-medium">{c.sub}</span>
        </div>
        <p className="text-stone-500 leading-[1.75] mb-3">{c.desc}</p>
        <blockquote className="border-l-2 border-accent/30 pl-4">
          <p className="font-serif italic text-stone-600 text-[15px] leading-relaxed">{c.quote}</p>
          <cite className="text-[12px] text-stone-400 not-italic block mt-1.5">{c.cite}</cite>
        </blockquote>
      </div>

      {/* Widget — the live Overture slice */}
      <div className="mb-4">
        <p className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-2 font-medium">
          {c.tryLabel}
        </p>
        <p className="text-[13px] text-stone-600 leading-[1.7] max-w-[760px] mb-4">
          {c.tryHint}
        </p>
        <ObjectionSimulator />
      </div>
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
        <Strix />
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

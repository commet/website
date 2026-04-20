import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

const t = {
  en: {
    section: 'Selected Work',
    strix: {
      sub: 'Enterprise RAG System',
      date: 'SK On · 2024',
      mysuni: 'Featured on SK Group mySUNI',
      reviews: 'Employee reviews on mySUNI',
      feedback: 'Direct feedback from SK subsidiary PM',
      desc: 'LLM-powered knowledge system for SK On\'s Strategy Division. Navigated enterprise constraints — data security, audit trails, executive skepticism — and drove organization-wide adoption. Presented to CEO and C-level as a best practice case.',
      quote: '"By my standards, you saved me a month of struggling."',
      cite: '— PM at another SK subsidiary',
      users: 'users',
    },
    sayu: {
      sub: 'AI Art Curation',
      desc: '16 AI curators that understand your aesthetic taste. 5,000+ artworks, 12,000 exhibition records, 200+ users onboarded. Built and operate end-to-end: data architecture, Claude integration, personalization engine, onboarding to retention.',
      cta: 'Experience SAYU',
    },
    overture: {
      sub: 'AI Thinking Tool',
      desc: 'For people navigating unfamiliar territory with AI. The biggest barrier to AI adoption isn\'t technical — it\'s cognitive. Overture helps you think clearly enough to harness it.',
      quote: '"Blunt thinking can\'t harness AI. Overture sharpens your thinking."',
      cta: 'Try Overture',
    },
  },
  kr: {
    section: '주요 프로젝트',
    strix: {
      sub: '엔터프라이즈 RAG 시스템',
      date: 'SK On · 2024',
      mysuni: 'SK그룹 mySUNI Best Practice 선정',
      reviews: 'mySUNI 수강생 리뷰',
      feedback: '타 SK 계열사 PM의 직접 피드백',
      desc: 'SK On 전략기획실을 위한 LLM 기반 지식 시스템. 데이터 보안, 감사 추적, 경영진 설득 등 엔터프라이즈 제약을 돌파하고 전사 도입까지 이끌었습니다. CEO 및 C-level 대상 Best Practice로 발표.',
      quote: '"제 기준으로 삽질할 1달은 아꼈어요."',
      cite: '— 타 SK 계열사 PM',
      users: '명 사용',
    },
    sayu: {
      sub: 'AI 아트 큐레이션',
      desc: '당신의 취향을 이해하는 16명의 AI 큐레이터. 5,000점 이상의 작품, 12,000개의 전시 데이터, 200명 이상의 사용자. 데이터 설계부터 Claude 연동, 개인화 엔진, 온보딩부터 리텐션까지 직접 구축·운영.',
      cta: 'SAYU 경험하기',
    },
    overture: {
      sub: 'AI 사고 도구',
      desc: 'AI와 함께 낯선 영역을 탐색하는 사람을 위한 도구. AI 도입의 가장 큰 장벽은 기술이 아니라 인지입니다. Overture는 사고를 선명하게 만듭니다.',
      quote: '"생각이 뭉툭하면 AI를 다룰 수 없다. Overture는 생각을 뾰족하게 만든다."',
      cta: 'Overture 체험하기',
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
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">STRIX</span>
          <span className="text-[13px] text-accent font-medium">{c.sub}</span>
        </div>
        <span className="text-[12px] text-stone-400">{c.date}</span>
      </div>

      {/* Image layout: full-width main, then two small evidence shots */}
      <div className="space-y-3 mb-8">
        {/* Main screenshot in browser frame */}
        <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-stone-100 bg-stone-50/50">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <span className="ml-3 text-[10px] text-stone-400 truncate">mysuni.sk.com</span>
          </div>
          <img src="/images/strix-video.jpeg" alt={c.mysuni} className="w-full h-auto block" />
        </div>

        {/* Two evidence images side by side — compact, equal height */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
            <div className="flex items-center px-3 py-1.5 border-b border-stone-100 bg-stone-50/50">
              <span className="text-[10px] text-stone-400">{c.reviews}</span>
            </div>
            <div className="h-[160px] overflow-hidden">
              <img src="/images/strix-mysuni.jpeg" alt={c.reviews} className="w-full h-full object-cover object-top" />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-stone-900">
            <div className="flex items-center px-3 py-1.5 border-b border-stone-800">
              <span className="text-[10px] text-stone-500">{c.feedback}</span>
            </div>
            <div className="h-[160px] overflow-hidden">
              <img src="/images/strix-feedback.jpeg" alt={c.feedback} className="w-full h-full object-cover object-[50%_75%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Content below */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <p className="text-stone-500 leading-[1.75]">{c.desc}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <blockquote className="border-l-2 border-accent/30 pl-4 mb-5">
            <p className="text-[15px] text-stone-700 italic leading-relaxed">{c.quote}</p>
            <cite className="text-[12px] text-stone-400 not-italic block mt-1.5">{c.cite}</cite>
          </blockquote>
          <span className="text-[13px] text-stone-900 font-semibold">600+<span className="text-stone-400 font-normal ml-1">{c.users}</span></span>
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
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <a href="https://sayu.my" target="_blank" rel="noopener noreferrer" className="md:col-span-5 block group">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-cream border border-stone-200/40">
          <div className="absolute inset-5 grid grid-cols-3 grid-rows-3 gap-1.5">
            <div className="col-span-2 row-span-2 rounded-lg bg-gradient-to-br from-stone-800/8 to-stone-600/4 group-hover:from-stone-800/14 transition-all duration-700" />
            <div className="rounded-lg bg-accent/8 group-hover:bg-accent/14 transition-all duration-700" />
            <div className="row-span-2 rounded-lg bg-gradient-to-b from-accent-light/15 to-accent-light/5 group-hover:from-accent-light/25 transition-all duration-700" />
            <div className="rounded-lg bg-stone-700/4" />
            <div className="col-span-3 rounded-lg bg-stone-500/3" />
          </div>
          <div className="absolute bottom-4 right-5 text-[11px] text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            sayu.my <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
        </div>
      </a>
      <div className="md:col-span-6 md:col-start-7">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">SAYU</span>
          <span className="text-[13px] text-accent font-medium">{c.sub}</span>
        </div>
        <p className="text-stone-500 leading-[1.75] mb-4">{c.desc}</p>
        <a href="https://sayu.my" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors">
          {c.cta}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>
    </motion.div>
  )
}

function Overture() {
  const { lang } = useLang()
  const c = t[lang].overture

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="md:col-span-6 md:order-1">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">Overture</span>
          <span className="text-[13px] text-accent font-medium">{c.sub}</span>
        </div>
        <p className="text-stone-500 leading-[1.75] mb-2">{c.desc}</p>
        <p className="font-serif italic text-stone-600 text-[15px] leading-relaxed mb-4">{c.quote}</p>
        <a href="https://overture-beta.vercel.app" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors">
          {c.cta}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>
      <a href="https://overture-beta.vercel.app" target="_blank" rel="noopener noreferrer" className="md:col-span-5 md:col-start-8 md:order-2 block group">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 flex items-center justify-center border border-stone-800">
          <div className="text-center px-8 space-y-4">
            {[
              { en: 'Define the problem', kr: '문제를 정의하라' },
              { en: 'Structure your thinking', kr: '사고를 구조화하라' },
              { en: 'Reach your destination', kr: '목적지에 도착하라' },
            ].map((step, i) => (
              <div key={step.en} className={`flex items-center gap-3 transition-opacity duration-500 ${i < 2 ? 'opacity-30 group-hover:opacity-50' : 'opacity-80 group-hover:opacity-100'}`}>
                <span className="text-[10px] text-accent font-bold font-mono w-5">{String(i+1).padStart(2,'0')}</span>
                <span className="text-[13px] text-white/80">{lang === 'en' ? step.en : step.kr}</span>
              </div>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function Projects() {
  const { lang } = useLang()

  return (
    <section id="work" className="py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t[lang].section}
        </motion.h2>
        <Strix />
        <div className="border-t border-stone-100 my-12 md:my-16" />
        <Sayu />
        <div className="border-t border-stone-100 my-12 md:my-16" />
        <Overture />
      </div>
    </section>
  )
}

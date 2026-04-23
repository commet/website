import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'

const t = {
  en: {
    credential: 'Seoul National University · SK On Strategy · Enterprise AI Adoption',
    anchor: 'I know how Korean enterprises adopt AI, because I was the one adopting it.',
    statement: `At SK On, I built STRIX — the Claude-powered RAG that reached 1,000+ employees through SK Group's mySUNI and ran daily in our 30-person strategy division. Security review, executive buy-in, cross-department rollout — I drove all of it.`,
    context: 'Before SK On: co-founded a B2B healthcare startup, sold neuroscience-based subscriptions to hospital directors.',
    stats: [
      { num: '4 yrs', label: 'Enterprise strategy' },
      { num: '3', label: 'Products shipped' },
      { num: 'KR/EN', label: 'Bilingual · Military interpreter' },
    ],
  },
  kr: {
    credential: '서울대학교 · SK On 전략기획 · 엔터프라이즈 AI 도입',
    anchor: '한국 기업이 AI를 도입하는 과정을 안에서 경험한 사람입니다.',
    statement: 'SK On에서 STRIX를 만들었습니다 — SK그룹 mySUNI로 1,000명+에게 노출되고, 전략기획본부 30명이 매일 사용한 Claude 기반 RAG. 보안 심사, 경영진 설득, 전사 확산까지 제가 직접 통과시켰습니다.',
    context: 'SK On 이전: B2B 헬스케어 스타트업을 공동 창업해 뇌과학 기반 구독 서비스를 병원장에게 직접 영업.',
    stats: [
      { num: '4년', label: '엔터프라이즈 전략' },
      { num: '3개', label: '제품 출시' },
      { num: 'KR/EN', label: '이중 언어 · 군 통역' },
    ],
  },
}

export default function Hero() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="pt-20 pb-0 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Name block */}
        <motion.div
          className="pt-8 md:pt-14 pb-8 md:pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-[clamp(2.6rem,6.5vw,5rem)] font-bold text-stone-900 tracking-[-0.04em] leading-[1.05]">
            Yaechan Lee
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mt-3">
            <span className="font-serif italic text-lg text-stone-400">이예찬</span>
            <span className="hidden sm:block w-6 border-t border-stone-300" />
            <span className="text-[14px] text-stone-500">{c.credential}</span>
          </div>
        </motion.div>

        {/* Anchor — display-scale thesis as hero focal moment */}
        <motion.p
          className="font-serif italic text-stone-900 leading-[1.2] tracking-[-0.015em] text-[clamp(1.75rem,5.2vw,3.4rem)] max-w-[960px] py-10 md:py-14 border-t border-stone-200"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {c.anchor}
        </motion.p>

        {/* Stats row — no subtitle noise, clean rhythm */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 -mx-6 md:-mx-10 border-y border-stone-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {c.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-6 md:py-8 ${i === 1 ? 'border-y md:border-y-0 md:border-x border-stone-200 bg-cream/40' : ''}`}
            >
              <span className="text-2xl md:text-[32px] font-bold text-stone-900 tracking-tight block leading-none">{stat.num}</span>
              <span className="text-[13px] text-stone-600 block mt-2 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Evidence body — detailed statement + context + links */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-14"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <p className="text-[16px] md:text-[17px] text-stone-700 leading-[1.75] tracking-[-0.005em]">
            {c.statement}
          </p>
          <div className="flex flex-col justify-between gap-5">
            <p className="text-[15px] text-stone-500 leading-[1.7]">{c.context}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              <a href="https://www.linkedin.com/in/yaechan-lee/" target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { target: 'linkedin', location: 'hero' })} className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">LinkedIn</a>
              <a href="https://www.threads.com/@and__yc" target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { target: 'threads', location: 'hero' })} className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">Threads</a>
              <a href="mailto:yclee913@gmail.com" onClick={() => track('contact_click', { location: 'hero' })} className="text-stone-400 no-underline hover:text-accent transition-colors">yclee913@gmail.com</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

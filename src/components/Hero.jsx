import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'

const t = {
  en: {
    tagline: 'Enterprise AI × Go-to-Market × Strategy',
    credential: 'Seoul National University · SK On Strategy · Claude Builder',
    statement: (
      <>
        At SK On, I built <span className="font-semibold">STRIX</span> — the Claude-powered RAG that reached 1,000+ employees through SK Group's mySUNI and ran daily in our 30-person strategy division. Security review, executive buy-in, cross-department rollout — I drove all of it.{' '}
        <span className="text-accent">I know how Korean enterprises adopt AI, because I was the one adopting it.</span>
      </>
    ),
    context: 'Before SK On, I co-founded a B2B healthcare startup and sold to hospital directors. The lesson that still steers how I build: enterprise adoption fails when buyers can\'t defend the purchase to their board.',
    stats: [
      { num: '4 yrs', label: 'Enterprise strategy', context: 'Portfolio optimization and business valuation at Korea\'s leading EV battery manufacturer' },
      { num: '3', label: 'Products shipped', context: 'STRIX (enterprise RAG), Overture (AI thinking tool), SAYU (art curation)' },
      { num: 'KR/EN', label: 'Bilingual', context: 'Interpreted general-level Korea-US military meetings at USFK' },
    ],
  },
  kr: {
    tagline: 'Enterprise AI × Go-to-Market × 전략',
    credential: '서울대학교 · SK On 전략기획 · Claude Builder',
    statement: (
      <>
        SK On에서 <span className="font-semibold">STRIX</span>를 만들었습니다 — SK그룹 mySUNI로 1,000명+에게 노출되고, 전략기획본부 30명이 매일 사용한 Claude 기반 RAG. 보안 심사, 경영진 설득, 전사 확산까지 제가 직접 통과시켰습니다.{' '}
        <span className="text-accent">한국 기업이 AI를 도입하는 과정을 안에서 경험한 사람입니다.</span>
      </>
    ),
    context: 'SK On 이전엔 B2B 헬스케어 스타트업을 공동 창업해 병원장에게 직접 영업했습니다. 그때 배운 한 가지가 지금도 제 설계를 지배합니다 — 구매자가 이사회에 설명하지 못하면, 엔터프라이즈 도입은 실패한다는 것.',
    stats: [
      { num: '4년', label: '엔터프라이즈 전략', context: '한국 대표 EV 배터리 기업에서 포트폴리오 최적화 및 기업가치 평가' },
      { num: '3개', label: '제품 출시', context: 'STRIX (엔터프라이즈 RAG), Overture (AI 사고 도구), SAYU (아트 큐레이션)' },
      { num: 'KR/EN', label: '이중 언어', context: '주한미군사 장성급 한미 군사회의 통역' },
    ],
  },
}

export default function Hero() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="pt-20 pb-0 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="pt-8 md:pt-14 pb-10 md:pb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[13px] text-stone-400 mb-4 tracking-wide">{c.tagline}</p>
          <h1 className="text-[clamp(2.6rem,6.5vw,5rem)] font-bold text-stone-900 tracking-[-0.04em] leading-[1.05]">
            Yaechan Lee
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mt-3">
            <span className="font-serif italic text-lg text-stone-400">이예찬</span>
            <span className="hidden sm:block w-6 border-t border-stone-300" />
            <span className="text-[14px] text-stone-500">{c.credential}</span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pb-10 md:pb-14 border-b border-stone-200"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-[20px] md:text-[22px] text-stone-900 leading-[1.55] tracking-[-0.01em]">
            {c.statement}
          </p>
          <div className="flex flex-col justify-between">
            <p className="text-stone-500 leading-[1.75] mb-6">{c.context}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              <a href="https://www.linkedin.com/in/yaechan-lee/" target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { target: 'linkedin', location: 'hero' })} className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">LinkedIn</a>
              <a href="https://www.threads.com/@and__yc" target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { target: 'threads', location: 'hero' })} className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">Threads</a>
              <a href="mailto:yclee913@gmail.com" onClick={() => track('contact_click', { location: 'hero' })} className="text-stone-400 no-underline hover:text-accent transition-colors">yclee913@gmail.com</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 -mx-6 md:-mx-10"
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
              <span className="text-[13px] text-stone-700 block mt-2 font-medium">{stat.label}</span>
              <span className="text-[12px] text-stone-400 leading-snug block mt-1">{stat.context}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

const t = {
  en: {
    section: 'Background',
    expTitle: 'Experience',
    eduTitle: 'Education',
    skillsTitle: 'Skills',
    experience: [
      {
        org: 'SK On',
        role: 'Professional Manager, Strategic Planning',
        period: '2022 – Present',
        detail: 'Corporate strategy, portfolio optimization, and business valuation for Korea\'s leading EV battery manufacturer. Supported pre-IPO readiness. Selected as AI Frontier representative — SK Group\'s internal AI leadership cohort.',
      },
      {
        org: 'Brain Music Lab',
        role: 'Co-Founder & CFO',
        period: '2019 – 2020',
        highlights: true,
        detail: 'B2B healthcare startup — sold neuroscience-based subscriptions to hospital directors. Learned firsthand: enterprise adoption fails when buyers can\'t defend the purchase to their board.',
      },
      {
        org: 'USFK / KATUSA',
        role: 'Operations Translator & Linguist',
        period: '2016 – 2017',
        detail: 'Interpreted general-level meetings for Combined Joint Provost Marshal (USFK/CFC/UNC). Supported 2-year Korea-US detained persons agreement revision.',
      },
    ],
    education: [
      {
        org: 'Seoul National University',
        detail: 'B.A. Economics · B.A. Science & Technology Studies (Double Major)',
        note: 'GPA 4.0/4.3 · National Merit Scholarship (Full Tuition) · 1st Place, SNU STS Academic Conference',
      },
      {
        org: 'Curating School Seoul',
        detail: 'Core Member · Professional curatorial training',
        note: 'Park Seo-Bo Foundation · Presented SAYU to art industry professionals',
      },
    ],
  },
  kr: {
    section: '배경',
    expTitle: '경력',
    eduTitle: '학력',
    skillsTitle: '스킬',
    experience: [
      {
        org: 'SK On',
        role: '전략기획본부 매니저',
        period: '2022 – 현재',
        detail: '한국 대표 EV 배터리 기업의 전사 전략기획, 포트폴리오 최적화, 기업가치 평가. Pre-IPO 준비 지원. AI Frontier 대표 선정 — SK그룹 사내 AI 리더십 코호트.',
      },
      {
        org: 'Brain Music Lab',
        role: '공동창업자 & CFO',
        period: '2019 – 2020',
        highlights: true,
        detail: 'B2B 헬스케어 스타트업 — 뇌과학 기반 구독 서비스를 병원장에게 직접 영업. 핵심 교훈: 구매자가 이사회에 설명할 수 없으면 엔터프라이즈 도입은 실패한다.',
      },
      {
        org: 'USFK / KATUSA',
        role: '작전 통역병',
        period: '2016 – 2017',
        detail: '한미연합사 헌병감 장성급 회의 통역. 2년간의 한미 피구금자 협정 개정 과정 지원.',
      },
    ],
    education: [
      {
        org: '서울대학교',
        detail: '경제학부 · 과학기술학(STS) 이중전공',
        note: 'GPA 4.0/4.3 · 국가장학금(전액) · SNU STS 학술대회 1등',
      },
      {
        org: '큐레이팅스쿨서울',
        detail: '정회원 · 전문 큐레이션 교육과정',
        note: '박서보재단 · 아트 업계 전문가 대상 SAYU 발표',
      },
    ],
  },
}

export default function Background() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section id="background" className="py-14 md:py-20 px-6 md:px-10 bg-cream/30">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {c.section}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-[0.1em] mb-5">{c.expTitle}</h3>
            <div className="space-y-6">
              {c.experience.map((item) => (
                <div key={item.org} className={item.highlights ? 'bg-accent/[0.04] -mx-3 px-3 py-3 rounded-xl border border-accent/10' : ''}>
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <span className="text-[16px] font-semibold text-stone-900 tracking-[-0.01em]">{item.org}</span>
                    <span className="text-[11px] text-stone-400 flex-shrink-0">{item.period}</span>
                  </div>
                  <p className="text-[13px] text-accent mb-1.5">{item.role}</p>
                  <p className="text-[14px] text-stone-500 leading-[1.7]">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-[0.1em] mb-5">{c.eduTitle}</h3>
            <div className="space-y-6">
              {c.education.map((item) => (
                <div key={item.org}>
                  <span className="text-[16px] font-semibold text-stone-900 tracking-[-0.01em] block mb-1">{item.org}</span>
                  <p className="text-[14px] text-stone-600 mb-1">{item.detail}</p>
                  <p className="text-[12px] text-stone-400 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200/60">
              <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-[0.1em] mb-3">{c.skillsTitle}</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Claude API', 'RAG Systems', 'pgvector', 'Python', 'SQL', 'VBA',
                  lang === 'en' ? 'Korean (Native)' : '한국어 (모국어)',
                  lang === 'en' ? 'English (Fluent — Military interpreter)' : '영어 (유창 — 군 통역 수준)',
                ].map((skill) => (
                  <span key={skill} className="text-[11px] text-stone-500 bg-white border border-stone-200/60 rounded-md px-2 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

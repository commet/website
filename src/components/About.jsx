import { motion } from 'framer-motion'

const paragraphs = [
  [
    'SK On 전략기획실에서 4년,',
    '배터리 산업의 전략을 짰습니다.',
  ],
  [
    '그러다 Claude를 만났고,',
    '비개발자로서 직접 프로덕트를 만들기 시작했습니다.',
  ],
  [
    '600명이 쓰는 사내 AI 시스템,',
    '200명이 쓰는 아트 큐레이션 서비스,',
    '그리고 사람들이 AI와 함께 목적지에 도착하도록 돕는 도구.',
  ],
  [
    '지금은 기술과 예술의 교차점에서',
    '사람을 위한 AI를 만들고 있습니다.',
  ],
]

export default function About() {
  return (
    <section id="about" className="py-32 md:py-44 px-6 relative">
      {/* Subtle side accent */}
      <div className="absolute left-6 md:left-10 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent" />

      <div className="max-w-xl mx-auto md:ml-[20%]">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] text-stone-400 tracking-[0.25em] uppercase font-body">
            About
          </span>
        </motion.div>

        {/* Paragraphs with staggered reveal */}
        <div className="space-y-10">
          {paragraphs.map((lines, pi) => (
            <motion.div
              key={pi}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: pi * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {lines.map((line, li) => (
                <p
                  key={li}
                  className={`text-lg md:text-[21px] leading-[1.75] ${
                    pi === paragraphs.length - 1
                      ? 'text-stone-900 font-medium'
                      : 'text-stone-600'
                  }`}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Ambassador badge */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-50/80 border border-amber-200/50 text-amber-700 text-[13px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Claude Community Ambassador
          </span>
        </motion.div>
      </div>
    </section>
  )
}

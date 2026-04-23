import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

const t = {
  en: {
    quote: "Enterprise adoption fails when buyers can't defend the purchase to their board.",
    attribution: 'The thesis that steers everything I build',
  },
  kr: {
    quote: '구매자가 이사회에 설명하지 못하면, 엔터프라이즈 도입은 실패합니다.',
    attribution: '내가 만드는 모든 것을 관통하는 명제',
  },
}

export default function BreathQuote() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 bg-cream/40 border-y border-stone-200/70">
      <div className="max-w-[1100px] mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[900px]"
        >
          <p className="font-serif italic text-stone-900 leading-[1.2] tracking-[-0.015em] text-[clamp(1.75rem,5vw,3.2rem)]">
            {c.quote}
          </p>
          <cite className="mt-8 md:mt-10 block text-[12px] text-stone-400 uppercase tracking-[0.22em] not-italic">
            {c.attribution}
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}

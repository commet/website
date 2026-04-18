import { motion } from 'framer-motion'

const writings = [
  {
    title: '밀라 요보비치가 GitHub에 레포를 올렸습니다',
    platforms: 'LinkedIn · Threads',
    tag: '바이럴',
    href: '#',
  },
  {
    title: 'Claude Code Remote Control 소개',
    platforms: 'LinkedIn',
    tag: '한국어 최초',
    href: '#',
  },
  {
    title: 'AI를 열심히 쓰면서도 멍청해지지 않는 법',
    platforms: 'LinkedIn',
    tag: null,
    href: '#',
  },
]

export default function Writing() {
  return (
    <section id="writing" className="py-32 md:py-44 px-6 bg-white/60">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-end justify-between mb-16 md:mb-20 border-b border-stone-200 pb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            글
          </h2>
          <span className="font-serif italic text-base text-stone-400 hidden md:block">
            Writing
          </span>
        </motion.div>

        {/* Writing list */}
        <div>
          {writings.map((writing, i) => (
            <motion.a
              key={writing.title}
              href={writing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-7 md:py-8 border-b border-stone-100 no-underline first:pt-0"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="flex items-start md:items-center gap-4 md:gap-6 flex-1 min-w-0">
                {/* Number */}
                <span className="text-[13px] font-body text-stone-300 tabular-nums pt-0.5 md:pt-0">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-[17px] text-stone-800 group-hover:text-amber-600 transition-colors duration-300 leading-snug mb-1.5">
                    {writing.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[12px] text-stone-400 font-body">
                      {writing.platforms}
                    </span>
                    {writing.tag && (
                      <span className="text-[11px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                        {writing.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-stone-200 group-hover:text-amber-500 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 ml-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

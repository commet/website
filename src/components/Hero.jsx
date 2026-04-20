import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-20 pb-0 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Name — large, confident, with personality */}
        <motion.div
          className="pt-8 md:pt-14 pb-10 md:pb-14"
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
            <span className="text-[14px] text-stone-500">
              Seoul National University · SK On Strategy · Claude Builder
            </span>
          </div>
        </motion.div>

        {/* Two-column intro */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pb-10 md:pb-14 border-b border-stone-200"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Left: One strong statement */}
          <p className="text-[20px] md:text-[22px] text-stone-900 leading-[1.55] tracking-[-0.01em]">
            I deployed Claude to 600+ enterprise users, navigating security reviews, executive buy-in, and cross-department rollout —{' '}
            <span className="text-accent">as a non-developer.</span>
          </p>

          {/* Right: Context + links */}
          <div className="flex flex-col justify-between">
            <p className="text-stone-500 leading-[1.75] mb-6">
              4 years of corporate strategy at Korea's leading EV battery maker. Now building AI products at the intersection of enterprise, art, and human thinking. 3 products shipped, all powered by Claude.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              <a href="https://www.linkedin.com/in/yaechan-lee/" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">LinkedIn</a>
              <a href="https://www.threads.com/@and__yc" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">Threads</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium no-underline hover:text-accent transition-colors">GitHub</a>
              <a href="mailto:yclee913@gmail.com" className="text-stone-400 no-underline hover:text-accent transition-colors">yclee913@gmail.com</a>
            </div>
          </div>
        </motion.div>

        {/* Stats strip — visual accent */}
        <motion.div
          className="grid grid-cols-3 -mx-6 md:-mx-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { num: '600+', label: 'Enterprise users', context: 'STRIX · SK On' },
            { num: '200+', label: 'Users onboarded', context: 'SAYU · Art curation' },
            { num: '3', label: 'Products shipped', context: 'Enterprise · Consumer · Dev tool' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 md:px-10 py-6 md:py-8 ${
                i === 1 ? 'border-x border-stone-200 bg-cream/40' : ''
              }`}
            >
              <span className="text-2xl md:text-[32px] font-bold text-stone-900 tracking-tight block leading-none">
                {stat.num}
              </span>
              <span className="text-[13px] text-stone-700 block mt-2">{stat.label}</span>
              <span className="text-[11px] text-stone-400">{stat.context}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

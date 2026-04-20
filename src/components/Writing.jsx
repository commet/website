import { motion } from 'framer-motion'

const writings = [
  { title: 'Milla Jovovich pushed a repo to GitHub', platform: 'LinkedIn · Threads', note: 'Viral', href: '#' },
  { title: 'Introducing Claude Code Remote Control', platform: 'LinkedIn', note: 'First in Korean', href: '#' },
  { title: 'How to use AI hard without getting dumber', platform: 'LinkedIn', note: null, href: '#' },
]

export default function Writing() {
  return (
    <section id="writing" className="py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Writing
        </motion.h2>

        {writings.map((w, i) => (
          <motion.a
            key={w.title}
            href={w.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-4 border-b border-stone-100 first:border-t no-underline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span className="text-[15px] text-stone-700 group-hover:text-accent transition-colors truncate font-medium">{w.title}</span>
              {w.note && (
                <span className="text-[10px] text-accent bg-accent/8 rounded px-1.5 py-0.5 flex-shrink-0 uppercase tracking-wider font-semibold hidden sm:block">
                  {w.note}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <span className="text-[12px] text-stone-400 hidden md:block">{w.platform}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-stone-300 group-hover:text-accent transition-colors"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

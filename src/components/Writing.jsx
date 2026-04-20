import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

const t = {
  en: {
    section: 'Writing',
    items: [
      { title: 'Milla Jovovich pushed a repo to GitHub', platform: 'LinkedIn · Threads', href: '#' },
      { title: 'Introducing Claude Code Remote Control', platform: 'LinkedIn', href: '#' },
      { title: 'How to use AI intensely without losing your edge', platform: 'LinkedIn', href: '#' },
    ],
  },
  kr: {
    section: '글',
    items: [
      { title: '밀라 요보비치가 GitHub에 레포를 올렸습니다', platform: 'LinkedIn · Threads', href: '#' },
      { title: 'Claude Code Remote Control 소개', platform: 'LinkedIn', href: '#' },
      { title: 'AI를 열심히 쓰면서도 멍청해지지 않는 법', platform: 'LinkedIn', href: '#' },
    ],
  },
}

export default function Writing() {
  const { lang } = useLang()
  const c = t[lang]

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
          {c.section}
        </motion.h2>

        {c.items.map((w, i) => (
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
            <span className="text-[15px] text-stone-700 group-hover:text-accent transition-colors truncate font-medium">{w.title}</span>
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

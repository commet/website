import { motion } from 'framer-motion'

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Email', href: 'mailto:yaechan.lee@email.com' },
]

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10">
        {/* Decorative line above name */}
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent to-stone-300 mx-auto mb-10"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
        />

        {/* Korean name */}
        <motion.h1
          className="font-sans text-[clamp(3.5rem,10vw,7rem)] font-extrabold text-stone-900 tracking-[-0.04em] leading-[1] mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          이예찬
        </motion.h1>

        {/* English name - elegant serif italic */}
        <motion.p
          className="font-serif italic text-lg md:text-xl text-stone-400 tracking-[0.08em] mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Yaechan Lee
        </motion.p>

        {/* Subtitle - the key message */}
        <motion.p
          className="text-base md:text-lg text-stone-500 mb-10 font-light leading-relaxed max-w-md mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          전략기획자가 AI로 프로덕트를 만듭니다.
        </motion.p>

        {/* Keywords — refined pill tags */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {['전략', '큐레이션', 'AI'].map((keyword, i) => (
            <span key={keyword} className="flex items-center gap-3">
              <span className="text-[11px] md:text-xs text-stone-400 tracking-[0.2em] uppercase font-body">
                {keyword}
              </span>
              {i < 2 && (
                <span className="w-1 h-1 rounded-full bg-amber-400" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Social links — text-based, elegant */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {socialLinks.map(({ label, href }, i) => (
            <span key={label} className="flex items-center gap-6">
              <a
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="text-xs text-stone-400 hover:text-amber-600 transition-colors duration-300 no-underline tracking-wide"
              >
                {label}
              </a>
              {i < socialLinks.length - 1 && (
                <span className="text-stone-200 text-[10px]">/</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] text-stone-400 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-stone-300 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}

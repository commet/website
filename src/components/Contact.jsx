import { motion } from 'framer-motion'

const links = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Threads', href: '#' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-44 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative line */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-stone-300 mx-auto mb-12" />

          <p className="text-[13px] text-stone-400 tracking-[0.2em] uppercase font-body mb-6">
            Get in touch
          </p>

          <a
            href="mailto:yaechan.lee@email.com"
            className="text-2xl md:text-3xl text-stone-900 hover:text-amber-600 transition-colors duration-300 no-underline font-light tracking-tight"
          >
            yaechan.lee@email.com
          </a>

          <div className="flex items-center justify-center gap-1 mt-10">
            {links.map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-stone-400 hover:text-amber-600 transition-colors duration-300 no-underline px-2 py-1"
                >
                  {link.label}
                </a>
                {i < links.length - 1 && (
                  <span className="text-stone-200 text-[10px]">/</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

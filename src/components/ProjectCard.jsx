import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Project number + name header */}
      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-[13px] font-body text-amber-600/60 tabular-nums">
          {num}
        </span>
        <div>
          <h3 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-[-0.02em]">
            {project.name}
          </h3>
          <p className="text-[13px] text-stone-400 tracking-[0.1em] uppercase font-body mt-1">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Content grid: image + text */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {/* Screenshot area */}
        <div className={`md:col-span-7 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 to-stone-50 border border-stone-200/60 aspect-[16/10] flex items-center justify-center cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              boxShadow: '0 4px 40px -12px rgba(0,0,0,0.06)',
            }}
          >
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle, #1C1917 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />

            {/* Placeholder */}
            <div className="text-center relative z-10">
              <div className="text-5xl md:text-6xl font-serif text-stone-200 tracking-tight">
                {project.name}
              </div>
              <p className="text-[11px] text-stone-300 mt-3 tracking-wider uppercase">
                Screenshot
              </p>
            </div>

            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>

        {/* Text content */}
        <div className={`md:col-span-5 flex flex-col justify-center ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
          {/* Description */}
          <div className="space-y-1 mb-6">
            {project.description.map((line, i) => (
              <p key={i} className="text-[15px] md:text-base text-stone-600 leading-[1.8]">
                {line}
              </p>
            ))}
          </div>

          {/* Quote */}
          {project.quote && (
            <div className="mb-6 pl-4 border-l border-amber-300/60">
              {project.quote.map((line, i) => (
                <p key={i} className="text-[14px] text-stone-500 italic leading-relaxed font-serif">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] rounded-md bg-warm-subtle text-stone-500 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-amber-600 hover:text-amber-700 transition-all duration-300 no-underline font-medium group/link"
            >
              <span className="border-b border-amber-600/30 group-hover/link:border-amber-600 transition-colors pb-px">
                {project.link.label}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="transform group-hover/link:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

import { motion } from 'framer-motion'

const experience = [
  {
    org: 'SK On',
    role: 'Professional Manager, Strategic Planning',
    period: '2022 – Present',
    detail: 'Corporate strategy, portfolio optimization, business valuation for Korea\'s leading EV battery manufacturer. AI Frontier representative.',
  },
  {
    org: 'Brain Music Lab',
    role: 'Co-Founder & CFO',
    period: '2019 – 2020',
    detail: 'B2B neuroscience-based healthcare startup. Sold to hospital directors — learned that adoption fails when buyers can\'t defend the decision to their boards.',
  },
  {
    org: 'USFK / KATUSA',
    role: 'Operations Translator & Linguist',
    period: '2016 – 2017',
    detail: 'Interpreted general-level meetings for Combined Joint Provost Marshal. Supported 2-year Korea-US detained persons agreement revision.',
  },
]

const education = [
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
]

export default function Background() {
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
          Background
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Experience column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-[0.1em] mb-5">Experience</h3>
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.org}>
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

          {/* Education column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-[0.1em] mb-5">Education</h3>
            <div className="space-y-6">
              {education.map((item) => (
                <div key={item.org}>
                  <span className="text-[16px] font-semibold text-stone-900 tracking-[-0.01em] block mb-1">{item.org}</span>
                  <p className="text-[14px] text-stone-600 mb-1">{item.detail}</p>
                  <p className="text-[12px] text-stone-400 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>

            {/* Skills compact */}
            <div className="mt-8 pt-6 border-t border-stone-200/60">
              <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-[0.1em] mb-3">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Claude API', 'LangChain', 'RAG Systems', 'Python', 'SQL', 'Vector DB', 'Korean (Native)', 'English (Fluent — Military interpreter)'].map((skill) => (
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

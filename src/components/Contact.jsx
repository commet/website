import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'

export default function Contact() {
  const { lang } = useLang()

  return (
    <section id="contact" className="py-14 md:py-20 px-6 md:px-10 border-t border-stone-200">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-[22px] md:text-[26px] text-stone-900 font-medium tracking-[-0.02em] leading-snug">
              {lang === 'en'
                ? 'Always happy to connect.'
                : '편하게 연락 주세요.'}
            </p>
          </div>
          <div className="md:text-right">
            <a href="mailto:yclee913@gmail.com" onClick={() => track('contact_click', { location: 'contact_section' })} className="text-xl text-accent hover:text-stone-900 transition-colors no-underline font-semibold">
              yclee913@gmail.com
            </a>
            <div className="flex md:justify-end items-center gap-5 mt-3 text-[13px]">
              <a
                href="/yaechan-lee-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cv_download', { location: 'contact_section' })}
                className="text-stone-900 font-medium hover:text-accent transition-colors no-underline"
              >
                {lang === 'en' ? 'Resume (PDF)' : '이력서 (PDF)'}
              </a>
              <a href="https://www.linkedin.com/in/yaechan-lee/" target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { target: 'linkedin', location: 'contact_section' })} className="text-stone-400 hover:text-stone-900 transition-colors no-underline">LinkedIn</a>
              <a href="https://www.threads.com/@and__yc" target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { target: 'threads', location: 'contact_section' })} className="text-stone-400 hover:text-stone-900 transition-colors no-underline">Threads</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

export default function Contact() {
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
              Let's talk about AI, enterprise adoption, or art.
            </p>
          </div>
          <div className="md:text-right">
            <a href="mailto:yclee913@gmail.com" className="text-xl text-accent hover:text-stone-900 transition-colors no-underline font-semibold">
              yclee913@gmail.com
            </a>
            <div className="flex md:justify-end items-center gap-5 mt-3 text-[13px]">
              <a href="https://www.linkedin.com/in/yaechan-lee/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors no-underline">LinkedIn</a>
              <a href="https://www.threads.com/@and__yc" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors no-underline">Threads</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors no-underline">GitHub</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

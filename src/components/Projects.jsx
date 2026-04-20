import { motion } from 'framer-motion'

function Strix() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">STRIX</span>
          <span className="text-[13px] text-accent font-medium">Enterprise RAG System</span>
        </div>
        <span className="text-[12px] text-stone-400">SK On · 2024</span>
      </div>

      {/* Image composition: large left + two portrait right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8">
        {/* Main: mySUNI page — natural proportion, shows the platform context */}
        <div className="md:col-span-7 rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
          {/* Browser-style top bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-stone-100 bg-stone-50/50">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            <span className="ml-3 text-[10px] text-stone-400 truncate">mysuni.sk.com</span>
          </div>
          <img
            src="/images/strix-video.jpeg"
            alt="STRIX featured on SK Group mySUNI platform — video presentation"
            className="w-full h-auto block"
          />
        </div>

        {/* Right column: two portrait evidence images stacked */}
        <div className="md:col-span-5 grid grid-rows-2 gap-3">
          {/* Reviews — show top portion with visible comments */}
          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white">
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-100 bg-stone-50/50">
              <span className="text-[10px] text-stone-400">31 reviews on mySUNI</span>
            </div>
            <div className="h-[200px] md:h-auto md:flex-1 overflow-hidden">
              <img
                src="/images/strix-mysuni.jpeg"
                alt="User reviews on mySUNI — 31 comments from SK employees"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* KakaoTalk feedback — show the key message */}
          <div className="rounded-2xl overflow-hidden border border-stone-200/60 bg-stone-900">
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-800">
              <span className="text-[10px] text-stone-500">Direct feedback from SK subsidiary PM</span>
            </div>
            <div className="h-[200px] md:h-auto md:flex-1 overflow-hidden">
              <img
                src="/images/strix-feedback.jpeg"
                alt="PM feedback: saved me a month of struggling"
                className="w-full h-full object-cover object-[50%_75%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content below */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <p className="text-stone-500 leading-[1.75]">
            LLM-powered knowledge system for SK On's Strategy Division. Navigated enterprise constraints — data security, audit trails, executive skepticism — and drove organization-wide adoption. Presented to CEO and C-level as best practice case. Featured on SK Group's mySUNI learning platform.
          </p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <blockquote className="border-l-2 border-accent/30 pl-4 mb-5">
            <p className="text-[15px] text-stone-700 italic leading-relaxed">
              "By my standards, you saved me a month of struggling."
            </p>
            <cite className="text-[12px] text-stone-400 not-italic block mt-1.5">— PM at another SK subsidiary</cite>
          </blockquote>
          <div className="flex gap-5 text-[13px]">
            <span className="text-stone-900 font-semibold">600+<span className="text-stone-400 font-normal ml-1">users</span></span>
            <span className="text-stone-900 font-semibold">31<span className="text-stone-400 font-normal ml-1">reviews</span></span>
            <span className="text-stone-900 font-semibold">50%<span className="text-stone-400 font-normal ml-1">time saved</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Sayu() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Visual */}
      <a href="https://sayu.my" target="_blank" rel="noopener noreferrer" className="md:col-span-5 block group">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-cream border border-stone-200/40">
          <div className="absolute inset-5 grid grid-cols-3 grid-rows-3 gap-1.5">
            <div className="col-span-2 row-span-2 rounded-lg bg-gradient-to-br from-stone-800/8 to-stone-600/4 group-hover:from-stone-800/14 transition-all duration-700" />
            <div className="rounded-lg bg-accent/8 group-hover:bg-accent/14 transition-all duration-700" />
            <div className="row-span-2 rounded-lg bg-gradient-to-b from-accent-light/15 to-accent-light/5 group-hover:from-accent-light/25 transition-all duration-700" />
            <div className="rounded-lg bg-stone-700/4" />
            <div className="col-span-3 rounded-lg bg-stone-500/3" />
          </div>
          <div className="absolute bottom-4 right-5 text-[11px] text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            sayu.my <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
        </div>
      </a>

      {/* Content */}
      <div className="md:col-span-6 md:col-start-7">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">SAYU</span>
          <span className="text-[13px] text-accent font-medium">AI Art Curation</span>
        </div>
        <p className="text-stone-500 leading-[1.75] mb-4">
          16 AI curators that understand your aesthetic taste. 5,000+ artworks, 12,000 exhibition records, 200+ users onboarded. Built and operate end-to-end: data architecture, Claude integration, personalization engine, onboarding to retention.
        </p>
        <a href="https://sayu.my" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors">
          Experience SAYU
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>
    </motion.div>
  )
}

function Overture() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Content — left */}
      <div className="md:col-span-6 md:order-1">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[24px] md:text-[28px] font-bold text-stone-900 tracking-[-0.03em]">Overture</span>
          <span className="text-[13px] text-accent font-medium">AI Thinking Tool</span>
        </div>
        <p className="text-stone-500 leading-[1.75] mb-2">
          For people navigating unfamiliar territory with AI. The biggest barrier to AI adoption isn't technical — it's cognitive. Overture helps you think sharply enough to harness it.
        </p>
        <p className="font-serif italic text-stone-600 text-[15px] leading-relaxed mb-4">
          "Blunt thinking can't harness AI. Overture sharpens your thinking."
        </p>
        <a href="https://overture-beta.vercel.app" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium no-underline hover:text-stone-900 transition-colors">
          Try Overture
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>

      {/* Visual — right */}
      <a href="https://overture-beta.vercel.app" target="_blank" rel="noopener noreferrer" className="md:col-span-5 md:col-start-8 md:order-2 block group">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 flex items-center justify-center border border-stone-800">
          <div className="text-center px-8 space-y-4">
            {['Define the problem', 'Structure your thinking', 'Reach your destination'].map((step, i) => (
              <div key={step} className={`flex items-center gap-3 transition-opacity duration-500 ${i < 2 ? 'opacity-30 group-hover:opacity-50' : 'opacity-80 group-hover:opacity-100'}`}>
                <span className="text-[10px] text-accent font-bold font-mono w-5">{String(i+1).padStart(2,'0')}</span>
                <span className="text-[13px] text-white/80">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Selected Work
        </motion.h2>

        <Strix />
        <div className="border-t border-stone-100 my-12 md:my-16" />
        <Sayu />
        <div className="border-t border-stone-100 my-12 md:my-16" />
        <Overture />
      </div>
    </section>
  )
}

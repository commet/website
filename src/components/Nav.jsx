import { useState, useEffect } from 'react'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#FAFAF8]/85 backdrop-blur-xl border-b border-stone-200/50' : ''
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-12">
        <a href="#top" onClick={scrollToTop} aria-label="Back to top" className="text-[14px] font-semibold text-stone-900 no-underline tracking-[-0.03em]">
          YC<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-5">
          {[
            { label: 'Work', href: '#work' },
            { label: 'Background', href: '#background' },
            { label: 'Writing', href: '#writing' },
          ].map((item) => (
            <a key={item.label} href={item.href} onClick={() => track('nav_click', { target: item.label })} className="text-[13px] text-stone-400 hover:text-stone-900 transition-colors no-underline hidden md:block">
              {item.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => {
              const next = lang === 'en' ? 'kr' : 'en'
              track('lang_toggle', { to: next })
              setLang(next)
            }}
            className="text-[12px] text-stone-400 hover:text-stone-900 transition-colors tracking-wide border border-stone-200 rounded-md px-2 py-0.5 cursor-pointer bg-transparent"
          >
            {lang === 'en' ? 'KR' : 'EN'}
          </button>

          <a
            href="/yaechan-lee-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('cv_download', { location: 'nav' })}
            className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors no-underline hidden sm:inline-block"
          >
            {lang === 'en' ? 'Resume' : '이력서'}
          </a>

          <a href="mailto:yclee913@gmail.com" onClick={() => track('contact_click', { location: 'nav' })} className="text-[13px] text-accent hover:text-stone-900 transition-colors no-underline font-medium">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

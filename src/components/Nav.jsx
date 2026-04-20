import { useState, useEffect } from 'react'
import { useLang } from '../LangContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#FAFAF8]/85 backdrop-blur-xl border-b border-stone-200/50' : ''
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-12">
        <a href="#" className="text-[14px] font-semibold text-stone-900 no-underline tracking-[-0.03em]">
          YC<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-5">
          {[
            { label: 'Work', href: '#work' },
            { label: 'Background', href: '#background' },
            { label: 'Writing', href: '#writing' },
          ].map((item) => (
            <a key={item.label} href={item.href} className="text-[13px] text-stone-400 hover:text-stone-900 transition-colors no-underline hidden md:block">
              {item.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'kr' : 'en')}
            className="text-[12px] text-stone-400 hover:text-stone-900 transition-colors tracking-wide border border-stone-200 rounded-md px-2 py-0.5 cursor-pointer bg-transparent"
          >
            {lang === 'en' ? 'KR' : 'EN'}
          </button>

          <a href="mailto:yclee913@gmail.com" className="text-[13px] text-accent hover:text-stone-900 transition-colors no-underline font-medium">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

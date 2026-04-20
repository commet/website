import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { LangProvider } from './LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Background from './components/Background'
import Writing from './components/Writing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudyStrix from './components/CaseStudyStrix'

function MainPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <Nav />
      <Hero />
      <Projects />
      <Background />
      <Writing />
      <Contact />
      <Footer />
    </div>
  )
}

export default function App() {
  const [path, setPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )

  useEffect(() => {
    const onNav = (e) => setPath(e.detail)
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('navigate', onNav)
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('navigate', onNav)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  const isCaseStudyStrix = path === '/case-study/strix' || path === '/case-study/strix/'

  return (
    <LangProvider>
      {isCaseStudyStrix ? <CaseStudyStrix /> : <MainPage />}
      <Analytics />
    </LangProvider>
  )
}

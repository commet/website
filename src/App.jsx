import { LangProvider } from './LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Background from './components/Background'
import Writing from './components/Writing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-warm-bg">
        <Nav />
        <Hero />
        <Projects />
        <Background />
        <Writing />
        <Contact />
        <Footer />
      </div>
    </LangProvider>
  )
}

import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Community from './components/Community'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Writing />
      <Community />
      <Contact />
      <Footer />
    </div>
  )
}

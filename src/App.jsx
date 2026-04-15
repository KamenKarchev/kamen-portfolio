import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Masthead from './components/Masthead'
import Hero from './components/Hero'
import SectionHead from './components/SectionHead'
import FeatureArticle from './components/FeatureArticle'
import ProjectsArticle from './components/ProjectsArticle'
import ContactArticle from './components/ContactArticle'
import NewspaperPage from './components/NewspaperPage'
import Footer from './components/Footer'

export default function App() {
  const [theme, setTheme] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main className="wrap">
        <Masthead />
        <NewspaperPage isFirst>
          <Hero />
        </NewspaperPage>
        <NewspaperPage tall>
          <SectionHead eyebrow="Lead article" title="Video portfolio and about me" id="feature" />
          <FeatureArticle />
        </NewspaperPage>
        <NewspaperPage tall>
          <SectionHead eyebrow="Second article" title="Projects" id="projects" />
          <ProjectsArticle />
        </NewspaperPage>
        <NewspaperPage tall>
          <SectionHead eyebrow="Back page" title="Links, CV and contact" id="contact" />
          <ContactArticle />
        </NewspaperPage>
        <Footer />
      </main>
    </>
  )
}

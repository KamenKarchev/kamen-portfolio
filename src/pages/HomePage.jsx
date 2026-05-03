import Masthead from '../components/Masthead'
import Hero from '../components/Hero'
import SectionHead from '../components/SectionHead'
import FeatureArticle from '../components/FeatureArticle'
import ProjectsArticle from '../components/ProjectsArticle'
import ContactArticle from '../components/ContactArticle'
import NewspaperPage from '../components/NewspaperPage'
import Footer from '../components/Footer'

export default function HomePage({ copy }) {
  return (
    <main className="wrap">
      <Masthead copy={copy.masthead} />
      <NewspaperPage isFirst>
        <Hero copy={copy.hero} />
      </NewspaperPage>
      <NewspaperPage tall>
        <SectionHead {...copy.sections.feature} id="feature" />
        <FeatureArticle copy={copy.feature} />
      </NewspaperPage>
      <NewspaperPage tall>
        <SectionHead {...copy.sections.projects} id="projects" />
        <ProjectsArticle copy={copy.projects} />
      </NewspaperPage>
      <NewspaperPage tall>
        <SectionHead {...copy.sections.contact} id="contact" />
        <ContactArticle copy={copy.contact} />
      </NewspaperPage>
      <Footer copy={copy.footer} />
    </main>
  )
}

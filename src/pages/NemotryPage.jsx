import Masthead from '../components/Masthead'
import SectionHead from '../components/SectionHead'
import NemotryArticle from '../components/NemotryArticle'
import NewspaperPage from '../components/NewspaperPage'
import Footer from '../components/Footer'

export default function NemotryPage({ copy }) {
  return (
    <main className="wrap">
      <Masthead copy={copy.masthead} />
      <NewspaperPage tall>
        <SectionHead {...copy.sections.projects} id="nemotry" />
        <NemotryArticle />
      </NewspaperPage>
      <Footer copy={copy.footer} />
    </main>
  )
}

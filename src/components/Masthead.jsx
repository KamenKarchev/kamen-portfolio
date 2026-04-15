import { motion } from 'motion/react'

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export default function Masthead() {
  return (
    <motion.section
      className="masthead"
      variants={fade}
      initial="hidden"
      animate="show"
      transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
    >
      <div className="masthead-top">
        <aside className="masthead-meta">
          <span className="smallcaps">Varna edition</span>
          <span>Portfolio website</span>
          <span>Classic paper × digital news</span>
        </aside>
        <h1 className="paper-title">Kamen Karchev</h1>
        <aside className="masthead-meta" style={{ textAlign: 'right' }}>
          <span className="smallcaps">Issue two</span>
          <span>Backend · Android · growth</span>
          <span>Dark and light themes</span>
        </aside>
      </div>
      <div className="masthead-bottom">
        <span>CV, resume, video portfolio, project links, contact information</span>
        <span>Newspaper structure with minimal futuristic finish</span>
        <span>Varna, Bulgaria</span>
      </div>
    </motion.section>
  )
}

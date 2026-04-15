import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PROJECTS } from '../data/content'
import { squarify } from '../utils/squarify'

const Tags = ({ items }) => (
  <div className="tags">
    {items.map(t => <span className="tag" key={t}>{t}</span>)}
  </div>
)

export default function ProjectsArticle() {
  const containerRef = useRef(null)
  const [layout, setLayout] = useState({})
  const layoutItems = useMemo(() => [PROJECTS.lead, ...PROJECTS.mini], [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const updateLayout = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      if (!width || !height) return

      const rects = squarify(
        layoutItems.map(item => ({ id: item.id, value: item.value })),
        width,
        height,
        8,
      )
      const byId = Object.fromEntries(rects.map(rect => [rect.id, rect]))
      setLayout(byId)
    }

    updateLayout()
    const observer = new ResizeObserver(updateLayout)
    observer.observe(container)
    return () => observer.disconnect()
  }, [layoutItems])

  const getRectStyle = (id) => {
    const rect = layout[id]
    if (!rect) return { opacity: 0, pointerEvents: 'none' }
    return {
      left: `${rect.x}px`,
      top: `${rect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      opacity: 1,
      pointerEvents: 'auto',
    }
  }

  return (
    <motion.section
      className="glass"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
      viewport={{ once: true, amount: .1 }}
    >
      <div className="article-pad">
        <div className="article-head">
          <span className="smallcaps">Work article</span>
          <h3 className="article-title">The strongest work should take the most space.</h3>
          <p className="article-deck">
            Presented like a newspaper spread — the most important technical story leads,
            supporting work adds range and credibility.
          </p>
        </div>

        <div className="projects-layout" ref={containerRef}>
          <motion.article
            className="lead-project projects-item"
            style={getRectStyle(PROJECTS.lead.id)}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
            transition={{ duration: .2 }}
          >
            <div className="project-visual">
              {PROJECTS.lead.image && <img src={PROJECTS.lead.image} alt={PROJECTS.lead.title} />}
              {!PROJECTS.lead.image && (
                <div className="caption">
                  <strong>Lead backend story</strong>
                  <span>Replace with an architecture diagram, auth flow, or backend screenshot.</span>
                </div>
              )}
            </div>
            <h4 className="project-title">{PROJECTS.lead.title}</h4>
            <p className="project-body">{PROJECTS.lead.body}</p>
            <Tags items={PROJECTS.lead.tags} />
          </motion.article>

          {PROJECTS.mini.map(p => (
            <motion.article
              className="mini-project projects-item"
              style={getRectStyle(p.id)}
              key={p.id}
              whileHover={{ y: -3, boxShadow: 'var(--shadow)' }}
              transition={{ duration: .2 }}
            >
              <div className="mini-visual">
                {p.image && <img src={p.image} alt={p.title} />}
              </div>
              <h4 className="project-title" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>{p.title}</h4>
              <p className="project-body">{p.body}</p>
              <Tags items={p.tags} />
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

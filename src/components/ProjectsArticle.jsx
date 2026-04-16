import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PROJECTS } from '../data/content'
import { packProjects } from '../utils/potpack'

export default function ProjectsArticle() {
  const containerRef = useRef(null)
  const [layout, setLayout]       = useState({ boxes: [], height: 0 })

  const projects = useMemo(() => [PROJECTS.lead, ...PROJECTS.mini], [])

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const run = () => {
      const w = el.clientWidth
      if (w <= 0) return
      const items = projects.map(p => ({ id: p.id, value: p.value ?? 1 }))
      setLayout(packProjects(items, w))
    }

    run()
    const ro = new ResizeObserver(run)
    ro.observe(el)
    return () => ro.disconnect()
  }, [projects])

  const byId = Object.fromEntries(layout.boxes.map(b => [b.id, b]))

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
          <h3 className="article-title">Projects sized by importance.</h3>
          <p className="article-deck">
            Packed like a portfolio heatmap — larger work gets more space,
            smaller work still keeps its place in the grid.
          </p>
        </div>

        <div
          ref={containerRef}
          className="projects-layout"
          style={layout.height > 0 ? { height: layout.height } : undefined}
        >
          {projects.map(p => {
            const b = byId[p.id]
            if (!b) return null

            const minSide = Math.min(b.w, b.h)
            const area    = b.w * b.h
            const isLarge  = area > 90_000 || minSide > 240
            const showImg  = minSide > 160
            const showBody = minSide > 155 && area > 40_000
            const showTags = minSide > 140 && area > 32_000
            const titleSize = minSide > 260 ? '2rem' : minSide > 160 ? '1.3rem' : '1rem'

            return (
              <motion.article
                key={p.id}
                className={`projects-item ${isLarge ? 'lead-project' : 'mini-project'}`}
                style={{ left: b.x, top: b.y, width: b.w, height: b.h, opacity: 1 }}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
                transition={{ duration: .2 }}
              >
                {showImg && (
                  <div className={isLarge ? 'project-visual' : 'mini-visual'}>
                    {p.image && <img src={p.image} alt={p.title} />}
                  </div>
                )}
                <h4 className="project-title" style={{ fontSize: titleSize }}>{p.title}</h4>
                {showBody && <p className="project-body">{p.body}</p>}
                {showTags && (
                  <div className="tags">
                    {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PROJECTS } from '../data/content'
import { packProjects } from '../utils/potpack'

export default function ProjectsArticle() {
  const containerRef = useRef(null)
  const [rects, setRects] = useState({})
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const run = () => {
      const w = el.clientWidth
      if (w <= 0) return
      const { rects, height } = packProjects(PROJECTS, w)
      setRects(rects)
      setHeight(height)
    }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

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

        {/* Outer container — sized by the packer */}
        <div
          ref={containerRef}
          className="projects-layout"
          style={height > 0 ? { height } : undefined}
        >
          {PROJECTS.map(p => {
            const b = rects[p.id]
            if (!b) return null

            return (
              // Outer wrapper — owns position & size, provides padding for spacing
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: b.x,
                  top:  b.y,
                  width:  b.w,
                  height: b.h,
                  boxSizing: 'border-box',
                }}
              >
                {/* Inner article — fills the padded space, holds all content */}
                <motion.article
                  className="projects-item"
                  style={{ width: '97.5%', height: '97.5%' }}
                  whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
                  transition={{ duration: .2 }}
                >
                  {p.image && (
                    <div className="project-visual">
                      <img src={p.image} alt={p.title} />
                    </div>
                  )}
                  <h4 className="project-title">{p.title}</h4>
                  <p className="project-body">{p.body}</p>
                  <div className="tags">
                    {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </motion.article>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

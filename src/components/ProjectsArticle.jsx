import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PROJECTS } from '../data/content'
import { squarify } from '../utils/squarify'

const Tags = ({ items }) => (
  <div className="tags">
    {items.map(t => <span className="tag" key={t}>{t}</span>)}
  </div>
)

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function ProjectsArticle() {
  const containerRef = useRef(null)
  const [layout, setLayout] = useState({})
  const [layoutHeight, setLayoutHeight] = useState(0)

  const projects = useMemo(
    () => [PROJECTS.lead, ...PROJECTS.mini],
    [],
  )

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const updateLayout = () => {
      const width = container.clientWidth
      // Guard: don't compute squarify until the container has a real width
      if (width <= 0) return

      const height = clamp(Math.round(width * 1.18), 560, 980)
      setLayoutHeight(height)

      const rects = squarify(
        projects.map(item => ({
          id: item.id,
          value: Number.isFinite(item.value) && item.value > 0 ? item.value : undefined,
        })),
        width,
        height,
        10,
      )

      setLayout(Object.fromEntries(rects.map(r => [r.id, r])))
    }

    updateLayout()
    const observer = new ResizeObserver(updateLayout)
    observer.observe(container)
    return () => observer.disconnect()
  }, [projects])

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
          <h3 className="article-title">Projects sized by importance.</h3>
          <p className="article-deck">
            Packed like a portfolio heatmap — larger work gets more space,
            smaller work still keeps its place in the grid.
          </p>
        </div>

        <div
          className="projects-layout"
          ref={containerRef}
          style={layoutHeight > 0 ? { height: `${layoutHeight}px` } : undefined}
        >
          {projects.map(project => {
            const rect = layout[project.id]
            const area = rect ? rect.width * rect.height : 0
            const minSide = rect ? Math.min(rect.width, rect.height) : 0

            const isLarge  = area > 110_000 || minSide > 260
            const showImage = minSide > 180
            const showBody  = minSide > 170 && area > 45_000
            const showTags  = minSide > 150 && area > 38_000

            const titleSize =
              minSide > 280 ? 'clamp(2rem, 3vw, 2.8rem)'
              : minSide > 180 ? 'clamp(1.4rem, 2.3vw, 2rem)'
              : 'clamp(1rem, 1.6vw, 1.25rem)'

            return (
              <motion.article
                key={project.id}
                className={`projects-item ${isLarge ? 'lead-project' : 'mini-project'}`}
                style={getRectStyle(project.id)}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
                transition={{ duration: .2 }}
              >
                {showImage && (
                  <div className={isLarge ? 'project-visual' : 'mini-visual'}>
                    {project.image && (
                      <img src={project.image} alt={project.title} />
                    )}
                  </div>
                )}

                <h4 className="project-title" style={{ fontSize: titleSize }}>
                  {project.title}
                </h4>

                {showBody && (
                  <p className="project-body">{project.body}</p>
                )}

                {showTags && <Tags items={project.tags} />}
              </motion.article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

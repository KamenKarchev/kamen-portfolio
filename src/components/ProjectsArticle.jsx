import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PROJECTS } from '../data/content'

/**
 * Hardcoded tile layout — each project has an explicit col/row span.
 * The grid is 12 columns. Sizes are defined here, not computed.
 *
 * Adjust `cols` and `rows` per project to change how much space it gets.
 */
const TILE_SIZES = {
  'hero-project':  { cols: 7, rows: 2 },  // lead — big
  'side-project':  { cols: 5, rows: 2 },  // medium
  'small-project': { cols: 4, rows: 1 },  // small
  'misc-project':  { cols: 4, rows: 1 },  // small
}

const TOTAL_COLS = 12
const GAP = 10

/** Convert col/row spans into absolute pixel rects. */
function buildLayout(containerWidth) {
  const colW = (containerWidth - GAP * (TOTAL_COLS - 1)) / TOTAL_COLS

  // Row height = colW so tiles are always square cells
  const rowH = colW

  const rects = {}
  let cursorCol = 0
  let cursorRow = 0

  for (const [id, size] of Object.entries(TILE_SIZES)) {
    const { cols, rows } = size

    // Wrap to next row if this tile doesn't fit
    if (cursorCol + cols > TOTAL_COLS) {
      cursorRow += 1  // simple single-row advance; adjust if you add more items
      cursorCol  = 0
    }

    const x = cursorCol * (colW + GAP)
    const y = cursorRow * (rowH + GAP)
    const w = cols * colW + (cols - 1) * GAP
    const h = rows * rowH + (rows - 1) * GAP

    rects[id] = { x, y, w, h }
    cursorCol += cols
  }

  const maxBottom = Math.max(...Object.values(rects).map(r => r.y + r.h))
  return { rects, height: maxBottom }
}

export default function ProjectsArticle() {
  const containerRef = useRef(null)
  const [layout, setLayout] = useState({ rects: {}, height: 0 })

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const run = () => {
      const w = el.clientWidth
      if (w <= 0) return
      setLayout(buildLayout(w))
    }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const projects = [PROJECTS.lead, ...PROJECTS.mini]

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
            const b = layout.rects[p.id]
            if (!b) return null

            const minSide  = Math.min(b.w, b.h)
            const isLarge  = minSide > 260
            const showImg  = minSide > 160
            const showBody = b.h > 160 && b.w > 200
            const showTags = b.h > 140 && b.w > 180
            const titleSize = isLarge ? '2rem' : minSide > 160 ? '1.3rem' : '1rem'

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

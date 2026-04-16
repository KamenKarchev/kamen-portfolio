import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PROJECTS } from '../data/content'

/**
 * Dev assigns each project a percentage of the total container area.
 * Must sum to 100. The packer fills them shelf by shelf.
 */
const SIZES = {
  'hero-project':  45,
  'side-project':  30,
  'small-project': 15,
  'misc-project':  10,
}

const GAP = 10

function pack(projects, containerW) {
  // Total container height is derived so area = containerW * containerH
  // We don't know containerH yet — we let it grow from the shelves.
  // Each tile's area = (pct/100) * containerW * containerH
  // Since containerH is unknown, we work in 1D: each tile gets a
  // width proportional to its share of the current shelf, and we
  // assign heights so area is correct once containerH is resolved.
  //
  // Simpler: fix containerH = containerW (square canvas), derive tile
  // dimensions from that, then pack shelves greedily.

  const totalArea = containerW * containerW  // square canvas
  const rects = {}

  // Build tiles with target area and a natural aspect ratio
  const tiles = projects.map(p => {
    const pct  = SIZES[p.id] ?? 10
    const area = (pct / 100) * totalArea
    // aspect ratio: keep tiles roughly square
    const w = Math.sqrt(area)
    const h = area / w
    return { id: p.id, w, h, area }
  })

  // Sort widest-first for better shelf packing
  tiles.sort((a, b) => b.w - a.w)

  let shelfX = 0, shelfY = 0, shelfH = 0

  for (const tile of tiles) {
    // Scale tile to fit remaining shelf width
    let w = tile.w
    let h = tile.h

    if (shelfX + w > containerW) {
      // Start new shelf
      shelfY += shelfH + GAP
      shelfX  = 0
      shelfH  = 0
    }

    // If tile is wider than full container, clamp and fix height to preserve area
    if (w > containerW) {
      w = containerW
      h = tile.area / w
    }

    rects[tile.id] = {
      x: shelfX + GAP / 2,
      y: shelfY + GAP / 2,
      w: w - GAP,
      h: h - GAP,
    }

    shelfX += w
    if (h > shelfH) shelfH = h
  }

  const height = shelfY + shelfH
  return { rects, height }
}

export default function ProjectsArticle() {
  const containerRef = useRef(null)
  const [layout, setLayout] = useState({ rects: {}, height: 0 })
  const projects = [PROJECTS.lead, ...PROJECTS.mini]

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const run = () => {
      const w = el.clientWidth
      if (w <= 0) return
      setLayout(pack(projects, w))
    }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(el)
    return () => ro.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

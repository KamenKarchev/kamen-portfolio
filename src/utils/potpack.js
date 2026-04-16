/**
 * Bin packing for portfolio project tiles.
 *
 * Each project in content.js declares:
 *   w — desired width  as % of containerWidth
 *   h — desired height as % of containerWidth  (height is also relative to
 *       width so the layout scales consistently across screen sizes)
 *
 * This function converts those percentages to pixels and packs the tiles
 * using a simple shelf algorithm (left-to-right, wrap to next shelf when
 * the tile doesn't fit). Returns absolute pixel rects keyed by project id,
 * plus the total height of the packed layout.
 *
 * @param {Array<{id, w, h}>} projects  — from content.js
 * @param {number} containerWidth       — measured container width in px
 * @returns {{ rects: Record<string,{x,y,w,h}>, height: number }}
 */
export function packProjects(projects, containerWidth) {
  const rects = {}
  let shelfX = 0
  let shelfY = 0
  let shelfH = 0

  for (const p of projects) {
    const pw = (p.w / 100) * containerWidth
    const ph = (p.h / 100) * containerWidth

    // Wrap to next shelf if tile doesn't fit horizontally
    if (shelfX + pw > containerWidth && shelfX > 0) {
      shelfY += shelfH
      shelfX  = 0
      shelfH  = 0
    }

    rects[p.id] = { x: shelfX, y: shelfY, w: pw, h: ph }

    shelfX += pw
    if (ph > shelfH) shelfH = ph
  }

  return {
    rects,
    height: shelfY + shelfH,
  }
}

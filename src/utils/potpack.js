/**
 * Rectangle packing for portfolio tiles.
 * Based on Volodymyr Agafonkin's simple rectangle packing:
 * https://observablehq.com/@mourner/simple-rectangle-packing
 *
 * All tiles have a 1:1 aspect ratio. Area is proportional to project value.
 * Boxes are packed into containerWidth, height is derived from the packing.
 */

const GAP = 10

export function packProjects(items, containerWidth) {
  if (!items.length || containerWidth <= 0) return { boxes: [], height: 0 }

  const totalValue = items.reduce((s, i) => s + i.value, 0)
  const unitArea   = containerWidth * containerWidth

  // All tiles are square — side = sqrt(proportional area)
  const boxes = items.map(item => {
    const area = (item.value / totalValue) * unitArea
    const side = Math.sqrt(area)
    return { id: item.id, w: side, h: side }
  })

  // Sort tallest-first (potpack heuristic)
  boxes.sort((a, b) => b.h - a.h)

  // Shelf packing: one open space = full-width, infinite height
  const spaces = [{ x: 0, y: 0, w: containerWidth, h: Infinity }]

  for (const box of boxes) {
    // Clamp to container width, keep square
    const side = Math.min(box.w, containerWidth)
    box.w = side
    box.h = side

    for (let i = spaces.length - 1; i >= 0; i--) {
      const sp = spaces[i]
      if (box.w > sp.w || box.h > sp.h) continue

      box.x = sp.x
      box.y = sp.y

      if (box.w === sp.w && box.h === sp.h) {
        const last = spaces.pop()
        if (i < spaces.length) spaces[i] = last
      } else if (box.h === sp.h) {
        sp.x += box.w
        sp.w -= box.w
      } else if (box.w === sp.w) {
        sp.y += box.h
        sp.h -= box.h
      } else {
        spaces.push({ x: sp.x + box.w, y: sp.y, w: sp.w - box.w, h: box.h })
        sp.y += box.h
        sp.h -= box.h
      }
      break
    }
  }

  // Scale horizontally so boxes fill containerWidth exactly
  const packedW = Math.max(...boxes.map(b => b.x + b.w))
  const scale   = containerWidth / packedW

  for (const box of boxes) {
    box.x *= scale
    box.y *= scale
    box.w *= scale
    box.h *= scale   // keep 1:1 — scale both axes equally
  }

  const totalH = Math.max(...boxes.map(b => b.y + b.h))

  const half = GAP / 2
  return {
    boxes: boxes.map(b => ({
      id: b.id,
      x: b.x + half,
      y: b.y + half,
      w: Math.max(0, b.w - GAP),
      h: Math.max(0, b.h - GAP),
    })),
    height: Math.ceil(totalH),
  }
}

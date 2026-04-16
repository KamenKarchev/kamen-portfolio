/**
 * Potpack-style rectangle packing adapted for portfolio tiles.
 * Original algorithm by Volodymyr Agafonkin:
 * https://observablehq.com/@mourner/simple-rectangle-packing
 *
 * Given a container width and an array of {id, value} items, this:
 * 1. Converts each value into a box with a proportional area and a
 *    "natural" aspect ratio (wider items for higher values).
 * 2. Scales all boxes so they exactly fill containerWidth × totalHeight.
 * 3. Returns {id, x, y, w, h} for each item plus the total height.
 */

const GAP = 10

export function packProjects(items, containerWidth) {
  if (!items.length || containerWidth <= 0) return { boxes: [], height: 0 }

  const totalValue = items.reduce((s, i) => s + i.value, 0)

  // Give each project a box whose w:h ratio is derived from its weight.
  // Base cell is square; heavier items get wider.
  // We work in "unit" space first, then scale to fit containerWidth.
  const unitW = containerWidth
  const unitArea = unitW * unitW // total canvas area in unit space

  const boxes = items.map(item => {
    const share = item.value / totalValue          // 0..1
    const area  = share * unitArea
    // aspect ratio: heavier items are wider (up to 16:9), lighter are squarish
    const ratio = 1 + (item.value / totalValue) * 1.2
    const h = Math.sqrt(area / ratio)
    const w = area / h
    return { id: item.id, w, h, origW: w, origH: h }
  })

  // Sort tallest-first (potpack heuristic)
  boxes.sort((a, b) => b.h - a.h)

  // Run the packing — start with one space the full container width, infinite height
  const spaces = [{ x: 0, y: 0, w: containerWidth, h: Infinity }]

  for (const box of boxes) {
    // Scale the box width to fit within containerWidth (never wider than container)
    box.w = Math.min(box.w, containerWidth)
    // Maintain aspect ratio after width clamp
    box.h = (box.origH / box.origW) * box.w

    // Find a fitting space (scan backwards — smaller spaces first)
    for (let i = spaces.length - 1; i >= 0; i--) {
      const space = spaces[i]
      if (box.w > space.w || box.h > space.h) continue

      // Place box in top-left of this space
      box.x = space.x
      box.y = space.y

      if (box.w === space.w && box.h === space.h) {
        const last = spaces.pop()
        if (i < spaces.length) spaces[i] = last
      } else if (box.h === space.h) {
        space.x += box.w
        space.w -= box.w
      } else if (box.w === space.w) {
        space.y += box.h
        space.h -= box.h
      } else {
        spaces.push({ x: space.x + box.w, y: space.y, w: space.w - box.w, h: box.h })
        space.y += box.h
        space.h -= box.h
      }
      break
    }
  }

  // --- Scale to fill containerWidth exactly ---
  const packedW = Math.max(...boxes.map(b => b.x + b.w))
  const scaleX = containerWidth / packedW
  const packedH = Math.max(...boxes.map(b => b.y + b.h))

  // Apply horizontal scale, keep aspect ratios
  for (const box of boxes) {
    box.x *= scaleX
    box.w *= scaleX
    box.y *= scaleX   // scale y uniformly with x
    box.h *= scaleX
  }

  const totalH = Math.max(...boxes.map(b => b.y + b.h))

  // Apply gap insets
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

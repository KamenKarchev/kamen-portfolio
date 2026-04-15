function sumAreas(row) {
  return row.reduce((acc, item) => acc + item.area, 0)
}

function worstAspectRatio(row, shortSide) {
  if (!row.length || shortSide <= 0) return Number.POSITIVE_INFINITY
  const areaSum = sumAreas(row)
  if (areaSum <= 0) return Number.POSITIVE_INFINITY

  let maxArea = -Infinity
  let minArea = Infinity

  for (const item of row) {
    if (item.area > maxArea) maxArea = item.area
    if (item.area < minArea) minArea = item.area
  }

  const side2 = shortSide * shortSide
  const sum2 = areaSum * areaSum
  const first = (side2 * maxArea) / sum2
  const second = sum2 / (side2 * minArea)
  return Math.max(first, second)
}

function layoutRow(row, rect, horizontal, out) {
  const rowArea = sumAreas(row)
  if (rowArea <= 0) return rect

  if (horizontal) {
    const rowHeight = rowArea / rect.width
    let cursorX = rect.x
    for (const item of row) {
      const width = item.area / rowHeight
      out.push({ id: item.id, x: cursorX, y: rect.y, width, height: rowHeight })
      cursorX += width
    }
    return {
      x: rect.x,
      y: rect.y + rowHeight,
      width: rect.width,
      height: rect.height - rowHeight,
    }
  }

  const rowWidth = rowArea / rect.height
  let cursorY = rect.y
  for (const item of row) {
    const height = item.area / rowWidth
    out.push({ id: item.id, x: rect.x, y: cursorY, width: rowWidth, height })
    cursorY += height
  }
  return {
    x: rect.x + rowWidth,
    y: rect.y,
    width: rect.width - rowWidth,
    height: rect.height,
  }
}

function normalizeItems(items, width, height) {
  const safeItems = items.filter(item => item && item.id)
  const valued = safeItems.filter(item => Number.isFinite(item.value))
  const auto = safeItems.filter(item => !Number.isFinite(item.value))

  const valuedSum = valued.reduce((acc, item) => acc + Math.max(item.value, 0), 0)
  const valuedAvg = valued.length ? (valuedSum / valued.length) : 1
  const autoValue = valuedAvg > 0 ? valuedAvg : 1
  const totalWeight = valuedSum + auto.length * autoValue
  const containerArea = Math.max(0, width) * Math.max(0, height)

  if (containerArea <= 0 || totalWeight <= 0) return []

  return safeItems
    .map(item => {
      const weight = Number.isFinite(item.value) ? Math.max(item.value, 0) : autoValue
      return {
        id: item.id,
        area: (weight / totalWeight) * containerArea,
      }
    })
    .sort((a, b) => b.area - a.area)
}

export function squarify(items, containerWidth, containerHeight, gap = 8) {
  const width = Math.max(0, containerWidth)
  const height = Math.max(0, containerHeight)
  const normalized = normalizeItems(items, width, height)
  const rects = []

  if (!normalized.length) return rects

  let remaining = [...normalized]
  let freeRect = { x: 0, y: 0, width, height }

  while (remaining.length && freeRect.width > 0 && freeRect.height > 0) {
    const horizontal = freeRect.width >= freeRect.height
    const shortSide = horizontal ? freeRect.height : freeRect.width

    let row = [remaining[0]]
    let i = 1

    while (i < remaining.length) {
      const candidate = [...row, remaining[i]]
      if (worstAspectRatio(candidate, shortSide) <= worstAspectRatio(row, shortSide)) {
        row = candidate
        i += 1
      } else {
        break
      }
    }

    freeRect = layoutRow(row, freeRect, horizontal, rects)
    remaining = remaining.slice(row.length)
  }

  const halfGap = Math.max(0, gap) / 2
  return rects.map(rect => ({
    id: rect.id,
    x: rect.x + halfGap,
    y: rect.y + halfGap,
    width: Math.max(0, rect.width - (halfGap * 2)),
    height: Math.max(0, rect.height - (halfGap * 2)),
  }))
}


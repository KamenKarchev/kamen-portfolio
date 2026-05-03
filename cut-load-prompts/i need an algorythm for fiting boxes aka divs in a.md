<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# i need an algorythm for fiting boxes aka divs in a bigger box they need to fit in each box is asiggned a value 1 is 100% possible with and it scales from that. the inside boxes are 1:1. the idea is this algo will be used to dispaly the projeccts in my portfolio in a value/waigh assigned way si more important projects are bigger if an item does not have a value assigned it should be auto adjusted os the parent box is filled compleatly. So basicaly i am looking for an algorythm to fit boxes in a box withouth empty spce. Of course thare should be options to add pading after the perfect fit is calulate os the child boxes actually have spacing between them

The best fit for your use case is the **Squarified Treemap** algorithm — it fills the container 100%, respects weights, keeps aspect ratios close to 1:1, and is well-tested in data visualization.  Here is a complete, self-contained JavaScript implementation you can drop straight into your portfolio.[^1][^2]

## How the Algorithm Works

The squarify algorithm works by greedily placing items in rows.  For each row it keeps adding items until the worst (most extreme) aspect ratio in that row would get worse by adding the next item — at that point it commits the row and starts a new one. Since items are sorted by weight descending, the biggest projects always appear first and largest.[^3][^2]

```
1. Normalize all weights → they sum to parent area (px²)
2. Sort items descending by weight
3. Auto-fill unweighted items: distribute leftover weight evenly
4. Squarify loop:
   - Try adding next item to current row
   - If aspect ratio improves → add it
   - If it gets worse → lay out the current row, reset
5. Apply padding inward on each cell after layout
```


## Full Implementation

```js
/**
 * Squarified Treemap Layout
 * Returns an array of { id, x, y, width, height } — all in px.
 *
 * @param {Array}  items     - [{ id, value? }]  value=1 means "normal" size
 * @param {number} W         - container width  (px)
 * @param {number} H         - container height (px)
 * @param {number} [gap=8]   - padding between cells (px)
 */
function squarify(items, W, H, gap = 8) {
  const totalArea = W * H;

  // --- 1. Separate valued vs auto items ---
  const valued = items.filter(i => i.value != null);
  const auto   = items.filter(i => i.value == null);

  // Sum of explicit weights (value=1 → "baseline" unit)
  const valuedSum = valued.reduce((s, i) => s + i.value, 0);
  // Remaining area fraction for auto items
  const autoCount = auto.length;
  const autoWeight = autoCount > 0
    ? valuedSum / valued.length   // each auto item = average of valued items
    : 0;
  const totalWeight = valuedSum + autoWeight * autoCount;

  // Assign normalized area (px²) to every item
  const normalized = [
    ...valued.map(i => ({ ...i, area: (i.value / totalWeight) * totalArea })),
    ...auto.map(i   => ({ ...i, area: (autoWeight / totalWeight) * totalArea })),
  ].sort((a, b) => b.area - a.area);  // descending

  // --- 2. Core squarify ---
  const rects = [];

  function layoutRow(row, x, y, rowW, rowH, isHorizontal) {
    let cursor = isHorizontal ? x : y;
    for (const item of row) {
      const ratio = item.area / (isHorizontal ? rowH : rowW);
      const rect = isHorizontal
        ? { id: item.id, x: cursor, y, width: ratio, height: rowH }
        : { id: item.id, x, y: cursor, width: rowW, height: ratio };
      rects.push(rect);
      cursor += isHorizontal ? ratio : ratio;
    }
  }

  function worstRatio(row, w) {
    const s = row.reduce((acc, i) => acc + i.area, 0);
    const rMax = Math.max(...row.map(i => i.area));
    const rMin = Math.min(...row.map(i => i.area));
    return Math.max((w * w * rMax) / (s * s), (s * s) / (w * w * rMin));
  }

  function squarifyRegion(items, x, y, width, height) {
    if (!items.length) return;
    if (items.length === 1) {
      rects.push({ id: items[^0].id, x, y, width, height });
      return;
    }

    const isHorizontal = width >= height;
    const w = isHorizontal ? height : width;  // "short" side drives row thickness

    let row = [];
    let remaining = [...items];

    while (remaining.length) {
      const next = remaining[^0];
      const candidate = [...row, next];

      if (row.length === 0 || worstRatio(candidate, w) <= worstRatio(row, w)) {
        row = candidate;
        remaining = remaining.slice(1);
      } else {
        // Commit row
        const rowArea = row.reduce((s, i) => s + i.area, 0);
        const rowThickness = rowArea / (isHorizontal ? width : height);

        layoutRow(row, x, y, width, height, isHorizontal);

        // Recurse on remaining space
        if (isHorizontal) {
          squarifyRegion(remaining, x, y + rowThickness, width, height - rowThickness);
        } else {
          squarifyRegion(remaining, x + rowThickness, y, width - rowThickness, height);
        }
        return;
      }
    }

    // Lay out the last row
    const rowArea = row.reduce((s, i) => s + i.area, 0);
    const rowThickness = rowArea / (isHorizontal ? width : height);
    layoutRow(row, x, y, width, height, isHorizontal);
  }

  squarifyRegion(normalized, 0, 0, W, H);

  // --- 3. Apply gap (shrink each cell inward) ---
  const half = gap / 2;
  return rects.map(r => ({
    ...r,
    x:      r.x      + half,
    y:      r.y      + half,
    width:  r.width  - gap,
    height: r.height - gap,
  }));
}
```


## Usage in your portfolio

```js
const projects = [
  { id: "bigProject",    value: 3   },
  { id: "mediumProject", value: 1.5 },
  { id: "smallProject",  value: 0.8 },
  { id: "autoProject"   /* no value — auto-sized */ },
];

const container = document.getElementById("portfolio");
const W = container.offsetWidth;
const H = container.offsetHeight;

const layout = squarify(projects, W, H, 12); // 12px gap

layout.forEach(({ id, x, y, width, height }) => {
  const el = document.getElementById(id);
  Object.assign(el.style, {
    position: "absolute",
    left:   x + "px",
    top:    y + "px",
    width:  width  + "px",
    height: height + "px",
  });
});
```

Make the container `position: relative`.[^4]

## Key properties

| Property | Behavior |
| :-- | :-- |
| `value: 3` | 3× larger area than `value: 1` |
| `value` omitted | Gets average weight of valued items |
| `gap` | Applied symmetrically; does not break total fill |
| Aspect ratio | Kept close to 1:1 by squarify's row logic |
| Sort order | Heaviest always rendered first (top-left) |

A `ResizeObserver` on the container calling `squarify` again on resize will make it fully responsive.[^4][^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://github.com/huy-nguyen/squarify

[^2]: https://vanwijk.win.tue.nl/stm.pdf

[^3]: https://stackoverflow.com/questions/9880635/implementing-a-squarified-treemap-in-javascript

[^4]: https://www.david-colson.com/2020/03/10/exploring-rect-packing.html

[^5]: https://www.reddit.com/r/algorithms/comments/sdwk6f/looking_for_a_rectangle_packing_algorithm_that/

[^6]: https://stackoverflow.com/questions/7439560/whats-the-algorithm-to-pack-squares-and-rectangles

[^7]: https://arxiv.org/abs/1711.07851

[^8]: https://www.sciencedirect.com/science/article/pii/S1572528609000206

[^9]: https://www.tutorialspoint.com/article/binary-space-partitioning

[^10]: https://salvatoshi.com/assets/downloads/thesis_rectangle_packing.pdf

[^11]: https://en.wikipedia.org/wiki/Binary_space_partitioning

[^12]: https://philogb.github.io/blog/assets/jit-1.0a/doc/core/files/Treemap-js.html

[^13]: https://www.geeksforgeeks.org/dsa/binary-space-partitioning/

[^14]: https://book.gtoolkit.com/explaining-the-squarified-treemap-algorith-aoisxyi4qtrf1q2378evsjf67

[^15]: https://backdrifting.net/post/074_bsp_dungeons


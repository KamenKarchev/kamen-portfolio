# Pretext Integration Guide

## kamen-portfolio — Cursor Agent Instructions

> **Goal:** Use the `pretext` library to make `CheckpointCard` images
> size-aware of their text content, and to adjust element positions in
> `ProjectsArticle` cards based on how much text actually occupies.

---

## 0. Install

```bash
npm install pretext
```

Import wherever you measure:

```js
import { measureText } from 'pretext'
```

---

## 1. What Pretext Does Here

Pretext measures a string's rendered pixel dimensions (width, height,
number of lines) using the Canvas API — **no DOM reflow, no layout
shift**. You get the sizes before React paints, so you can drive layout
decisions from real text metrics.

---

## 2. Timeline Checkpoint Cards — `FeatureArticle.jsx`

### The Problem

`CheckpointCard` has a fixed `.checkpoint-img` div above a
`.checkpoint-label` div. If `cp.body` is long (3 lines) the card grows
taller, but the image height stays fixed — so it gets disproportionately
small. If `cp.body` is short (1 line) the image gets disproportionately
large.

### The Fix — Measure body text, derive image height

**Step 1 — Create `src/utils/measureCheckpointCard.js`**

```js
import { measureText } from 'pretext'

/**
 * Returns how tall the image should be given the card width and the
 * text content it must share vertical space with.
 *
 * @param {string} body       - cp.body string
 * @param {string} title      - cp.title string
 * @param {number} cardWidth  - pixel width of .checkpoint-card
 * @returns {{ imageHeight: number, textHeight: number }}
 */
export function measureCheckpointCard(body, title, cardWidth) {
  const labelPadding = 16           // px padding inside .checkpoint-label
  const labelWidth = cardWidth - labelPadding * 2

  // Measure title (font matches your CSS — adjust if different)
  // .checkpoint-label h4: font-weight 600, font-size .98rem ≈ 16px, Instrument Serif
  const titleMetrics = measureText(title, {
    font: '600 16px "your-body-font", sans-serif',
    maxWidth: labelWidth,
  })

  // Measure body paragraph
  // .checkpoint-label p: font-weight 300, font-size .86rem ≈ 14px, Instrument Serif
  const bodyMetrics = measureText(body, {
    font: '300 14px "your-body-font", sans-serif',
    maxWidth: labelWidth,
    lineHeight: 1.6,
  })

  // year label height is fixed ~20px, gap ~8px
  const fixedLabelOverhead = 20 + 8
  const textHeight =
    fixedLabelOverhead + titleMetrics.height + 8 + bodyMetrics.height + 12

  // Image takes whatever is left; clamp between 80px and 180px
  const totalCardHeight = 280          // your target card height
  const imageHeight = Math.max(80, Math.min(180, totalCardHeight - textHeight))

  return { imageHeight, textHeight }
}
```

**Step 2 — Use it in `CheckpointCard`**

```jsx
// FeatureArticle.jsx

import { useRef, useState, useLayoutEffect } from 'react'
import { measureCheckpointCard } from '../utils/measureCheckpointCard'

function CheckpointCard({ cp }) {
  const cardRef = useRef(null)
  const [imageHeight, setImageHeight] = useState(100) // matches CSS default height: 100px

  useLayoutEffect(() => {
    const el = cardRef.current
    if (!el) return

    const update = () => {
      const { imageHeight } = measureCheckpointCard(
        cp.body,
        cp.title,
        el.clientWidth
      )
      setImageHeight(imageHeight)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [cp.body, cp.title])

  return (
    <Motion.div className="checkpoint-card" variants={item} ref={cardRef}>
      <div className="checkpoint-img" style={{ height: imageHeight }}>
        {cp.image && <img src={cp.image} alt={cp.title} />}
      </div>
      <div className="checkpoint-label">
        <span className="smallcaps">{cp.year}</span>
        <h4>{cp.title}</h4>
        <p>{cp.body}</p>
      </div>
    </Motion.div>
  )
}
```

**What changes:** `.checkpoint-img` now has a dynamic `height` style
driven by the actual text height below it. Short body → more image
space. Long body → compressed image. CSS should NOT set a fixed height
on `.checkpoint-img` — remove or override it.

---

## 3. Project Cards — `ProjectsArticle.jsx`

### The Problem

Cards already have correct `x/y/w/h` from `packProjects`. But inside
each card, `.project-visual` (the image), `.project-title`, `.project-body`,
and `.tags` stack without knowing how much vertical space the text
actually needs. Small cards clip content. Large cards waste space.

### The Fix — Two-pass: measure text first, then decide image height

**Step 1 — Create `src/utils/measureProjectCard.js`**

```js
import { measureText } from 'pretext'

/**
 * Given a project card's pixel dimensions and content, returns:
 * - imageHeight: how tall to render the project-visual
 * - showBody:    whether the body paragraph fits at all
 * - showTags:    whether there's room for tags
 *
 * @param {{ title: string, body: string, tags: string[] }} project
 * @param {{ w: number, h: number }} pixelRect  - pixel width/height of the card
 * @returns {{ imageHeight: number, showBody: boolean, showTags: boolean }}
 */
export function measureProjectCard(project, pixelRect) {
  const padding = 14        // px — matches .projects-item padding
  const innerW = pixelRect.w - padding * 2

  // Fixed chrome heights
  const TAGS_ROW_H = 28
  const TITLE_MARGIN = 8
  const BODY_MARGIN  = 8
  const IMAGE_MARGIN = 8

  // Measure title
  // .project-title: font-family var(--font-display) = Instrument Serif, clamp(1.8rem…2.6rem)
  const titleMetrics = measureText(project.title, {
    font: '400 29px "your-display-font", serif',
    maxWidth: innerW,
  })

  // Measure body
  // .project-body: font-family var(--font-tech) = Inter, font-size .95rem ≈ 15px
  const bodyMetrics = measureText(project.body, {
    font: '400 15px "your-tech-font", sans-serif',
    maxWidth: innerW,
    lineHeight: 1.7,
  })

  const titleH = titleMetrics.height + TITLE_MARGIN
  const bodyH  = bodyMetrics.height  + BODY_MARGIN
  const tagsH  = TAGS_ROW_H

  const availableH = pixelRect.h - padding * 2

  // Decide what fits
  const fullH    = titleH + bodyH + tagsH + IMAGE_MARGIN
  const noBodyH  = titleH + tagsH + IMAGE_MARGIN
  const noTagsH  = titleH + bodyH + IMAGE_MARGIN

  let showBody = true
  let showTags = true
  let textBlockH = fullH

  if (fullH > availableH * 0.65) {
    // Try dropping body
    showBody = false
    textBlockH = noBodyH
  }
  if (noBodyH > availableH * 0.65) {
    // Also drop tags on tiny cards
    showTags = false
    textBlockH = titleH + IMAGE_MARGIN
  }

  // Image gets remaining space; clamp sensibly
  const imageHeight = Math.max(0, Math.min(availableH - textBlockH, availableH * 0.55))

  return { imageHeight, showBody, showTags }
}
```

**Step 2 — Use it in `ProjectsArticle.jsx`**

```jsx
// ProjectsArticle.jsx — replace the card render section

import { measureProjectCard } from '../utils/measureProjectCard'

// Inside the map, after `const b = rects[p.id]` — compute metrics:
// (You need pixelRect in px, but b.x/y/w/h are already px from packProjects)

{projects.map(p => {
  const b = rects[p.id]
  if (!b) return null

  // Derive layout from text measurement
  const { imageHeight, showBody, showTags } = measureProjectCard(p, { w: b.w, h: b.h })

  return (
    <div
      key={p.id}
      style={{
        position: 'absolute',
        left: b.x, top: b.y,
        width: b.w, height: b.h,
        boxSizing: 'border-box',
      }}
    >
      <Motion.article
        className="projects-item"
        style={{ width: '97.5%', height: '97.5%' }}
        whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
        transition={{ duration: .2 }}
      >
        {p.image && imageHeight > 0 && (
          <div className="project-visual" style={{ height: imageHeight, flexShrink: 0 }}>
            <img src={p.image} alt={p.title} />
          </div>
        )}

        <h4 className="project-title">{p.title}</h4>

        {showBody && (
          <p className="project-body">{p.body}</p>
        )}

        {showTags && (
          <div className="tags">
            {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        )}
      </Motion.article>
    </div>
  )
})}
```

---

## 4. Font Name Substitution

In both utility files, replace `"your-body-font"` with whatever CSS
`font-family` is set on `.checkpoint-card` / `.projects-item` — check
`src/styles/`. The font string in `measureText` must **exactly** match
the rendered font or measurements will be off by a few pixels.

```js
// This project uses Instrument Serif (prose/display) and Inter (tech/UI).
// Checkpoint card title + body → Instrument Serif:
font: '600 16px "Instrument Serif", Georgia, serif'
font: '300 14px "Instrument Serif", Georgia, serif'

// Project card body → Inter:
font: '400 15px "Inter", ui-sans-serif, system-ui, sans-serif'
```

---

## 5. CSS Adjustments Required

In your stylesheet, after this change:

**For `.checkpoint-img`:** Remove any fixed `height` or `min-height` CSS
rule. The height is now controlled inline by React.

```css
/* BEFORE */
.checkpoint-img { height: 100px; }

/* AFTER — let React control height; only set object-fit */
.checkpoint-img {
  overflow: hidden;
  flex-shrink: 0;
  background: var(--image-surface);
}
.checkpoint-img img { width: 100%; height: 100%; object-fit: cover; }
```

**For `.project-visual`:** The current CSS uses `aspect-ratio: 16/10` (not a fixed pixel height).
Remove `aspect-ratio` and `margin-bottom` so the inline `height` style from React takes full control.

```css
/* BEFORE */
.project-visual { aspect-ratio: 16 / 10; margin-bottom: 1rem; ... }

/* AFTER — let React control height; aspect-ratio must be removed */
.project-visual {
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--image-surface);
  overflow: hidden;
  flex-shrink: 0;
}
.project-visual img { width: 100%; height: 100%; object-fit: cover; }
```

---

## 6. Edge Cases to Handle


| Case                                     | Behaviour                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `cp.image` is null/undefined             | `imageHeight` is still computed but the `<img>` is not rendered — no empty box       |
| Card width < 100px                       | Clamp `imageHeight` to 0 — image is hidden entirely                                  |
| `pretext` not yet loaded (SSR/hydration) | Default state value (`100`) acts as a safe placeholder until `useLayoutEffect` fires |
| `ResizeObserver` fires before font loads | Re-run measurement on `document.fonts.ready` inside the effect                       |


For the font-ready edge case, add this inside your `useLayoutEffect`:

```js
document.fonts.ready.then(update)
```

---

## 7. Files to Modify


| File                                 | Change                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `src/utils/measureCheckpointCard.js` | **Create** — new utility                                                                               |
| `src/utils/measureProjectCard.js`    | **Create** — new utility                                                                               |
| `src/components/FeatureArticle.jsx`  | Add `useRef`, `useState`, `useLayoutEffect`; pass `ref` to card; apply dynamic `imageHeight`           |
| `src/components/ProjectsArticle.jsx` | Import `measureProjectCard`; compute metrics per card in the map; conditionally render body/tags/image |
| `src/styles/*.css`                   | Remove fixed heights on `.checkpoint-img` and `.project-visual`                                        |



/**
 * measureProjectFitPretext — tile content visibility using @chenglou/pretext.
 *
 * Same outer contract as measureProjectFit.js (input/output). Constants and
 * inner geometry must stay aligned with measureProjectFit.js and global.css
 * (.projects-item, .project-visual, .project-title, .project-body, .tag).
 *
 * Title/body font sizes mirror global.css (container cqw/cqh clamps — checkpoint-style caps).
 *
 * Rules:
 *   - Title rejected if its laid-out height is strictly greater than 65% of
 *     the image band height, or if the title block does not fit textAreaH.
 *   - Tags hidden before body when space is tight; if title+body does not fit,
 *     try title+tags (body off, tags on if they fit).
 *
 * @param {{ title: string, body: string, tags: string[] }} project
 * @param {{ w: number, h: number }} rect
 * @param {{ isLast?: boolean }} [options] — `isLast` matches `.projects-item--last` (8px padding + smaller title cap in CSS)
 * @returns {{ titleFits: boolean, showBody: boolean, showTags: boolean }}
 */

import { prepare, layout } from '@chenglou/pretext'

// ── Keep in sync with measureProjectFit.js + global.css ─────────────────────
const ITEM_PADDING      = 12
const ITEM_PADDING_LAST = 8 // .projects-item--last
const ITEM_SCALE        = 0.975
const IMAGE_FRACTION    = 0.40
const IMAGE_MARGIN_PX   = 16

/** Max share of image band height the title may occupy (strict > fails). */
const TITLE_MAX_OF_IMAGE = 0.65

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n))
}

function padPx(isLast) {
  return isLast ? ITEM_PADDING_LAST : ITEM_PADDING
}

/**
 * Mirrors scaled CSS (~20% smaller than original project clamps):
 *   clamp(0.8rem, 0.44rem + 2.4cqw + 1cqh, 1.6rem)
 *   .projects-item--last: clamp(0.736rem, 0.36rem + 2cqw + 0.8cqh, 1.2rem)
 */
function titleFontPxFromTile(innerW, innerH, isLast) {
  const rem = 16
  const cqw = innerW / 100
  const cqh = innerH / 100
  if (isLast) {
    const pref = 0.36 * rem + 2 * cqw + 0.8 * cqh
    return clamp(pref, 0.736 * rem, 1.2 * rem)
  }
  const pref = 0.44 * rem + 2.4 * cqw + 1 * cqh
  return clamp(pref, 0.8 * rem, 1.6 * rem)
}

/** Mirrors: clamp(0.048rem, 0.032rem + 0.28cqw, 0.104rem) */
function titleLetterSpacingPx(innerW) {
  const rem = 16
  return clamp(0.048 * rem, 0.032 * rem + 0.0028 * innerW, 0.104 * rem)
}

/** Mirrors: clamp(0.28rem, 0.16rem + 0.48cqh, 0.44rem) */
function titleMarginBottomPx(innerH) {
  const rem = 16
  const cqh = innerH / 100
  return clamp(0.28 * rem, 0.16 * rem + 0.48 * cqh, 0.44 * rem)
}

/**
 * Mirrors: clamp(0.704rem, 0.4rem + 1.76cqw + 0.72cqh, calc(1.2rem + 2px))
 */
function bodyFontPxFromTile(innerW, innerH) {
  const rem = 16
  const cqw = innerW / 100
  const cqh = innerH / 100
  const maxPx = 1.2 * rem + 2
  const pref = 0.4 * rem + 1.76 * cqw + 0.72 * cqh
  return clamp(pref, 0.704 * rem, maxPx)
}

/** Mirrors: clamp(0.48rem, 0.32rem + 0.64cqh, 0.72rem) */
function bodyMarginBottomPx(innerH) {
  const rem = 16
  const cqh = innerH / 100
  return clamp(0.48 * rem, 0.32 * rem + 0.64 * cqh, 0.72 * rem)
}

/**
 * Mirrors: clamp(0.52rem, 0.4rem + 0.88cqw, 0.616rem)
 */
function tagFontPxFromTile(innerW) {
  const rem = 16
  const cqw = innerW / 100
  const pref = 0.4 * rem + 0.88 * cqw
  return clamp(pref, 0.52 * rem, 0.616 * rem)
}

/**
 * @param {string} text
 * @param {number} innerW
 * @param {number} innerH
 * @param {number} bodyFontPx
 */
function bodyHeight(text, innerW, bodyFontPx) {
  const t = String(text ?? '')
  if (!t.trim()) return 0
  const prepared = prepare(t, `400 ${bodyFontPx}px "Inter", ui-sans-serif, sans-serif`)
  const { height } = layout(prepared, innerW, bodyFontPx * 1.6)
  return height
}

/**
 * Wrapped height for tag chips as flowing text (approximation of .tags flex).
 * @param {string[]} tags
 * @param {number} innerW
 */
function tagsBlockHeight(tags, innerW) {
  if (!tags?.length) return 0
  const line = tags.join('  ')
  const tPx = tagFontPxFromTile(innerW)
  const prepared = prepare(line, `700 ${tPx}px "Inter", sans-serif`)
  const lh = Math.max(10.4, tPx * 1.2)
  const { height } = layout(prepared, innerW, lh)
  return height + 6
}

export function measureProjectFitPretext(project, rect, options = {}) {
  const { isLast = false } = options

  const itemW  = rect.w * ITEM_SCALE
  const itemH  = rect.h * ITEM_SCALE
  const pad    = padPx(isLast)
  const innerW = itemW - pad * 2
  const innerH = itemH - pad * 2

  if (innerW < 40 || innerH < 40) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const imageH    = itemH * IMAGE_FRACTION
  const textAreaH = innerH - imageH - IMAGE_MARGIN_PX

  if (textAreaH < 20) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const tPx            = titleFontPxFromTile(innerW, innerH, isLast)
  const titleLetterPx  = titleLetterSpacingPx(innerW)
  const titleMarginPx  = titleMarginBottomPx(innerH)

  const title = String(project.title ?? '')
  const titlePrepared = prepare(
    title,
    `700 ${tPx}px "Instrument Serif", Georgia, serif`,
    { letterSpacing: titleLetterPx }
  )
  const titleLH = tPx * 0.95
  const { height: titleH } = layout(titlePrepared, innerW, titleLH)

  if (titleH > TITLE_MAX_OF_IMAGE * imageH) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const titleBlock = titleH + titleMarginPx
  if (titleBlock > textAreaH) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const bodyFontPx = bodyFontPxFromTile(innerW, innerH)
  const bodyH      = bodyHeight(project.body, innerW, bodyFontPx)
  const bodyMarginPx = bodyMarginBottomPx(innerH)
  const bodyBlock    = bodyH > 0 ? bodyH + bodyMarginPx : 0

  const tags       = Array.isArray(project.tags) ? project.tags : []
  const tagsBlock  = tags.length ? tagsBlockHeight(tags, innerW) : 0

  const full = titleBlock + bodyBlock + tagsBlock
  if (full <= textAreaH) {
    return {
      titleFits: true,
      showBody:  bodyH > 0,
      showTags:  tags.length > 0,
    }
  }

  const noTags = titleBlock + bodyBlock
  if (noTags <= textAreaH) {
    return { titleFits: true, showBody: bodyH > 0, showTags: false }
  }

  const noBody = titleBlock + tagsBlock
  if (noBody <= textAreaH) {
    return { titleFits: true, showBody: false, showTags: tags.length > 0 }
  }

  return { titleFits: true, showBody: false, showTags: false }
}

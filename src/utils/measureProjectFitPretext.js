/**
 * measureProjectFitPretext — tile content visibility using @chenglou/pretext.
 *
 * Same outer contract as measureProjectFit.js (input/output). Constants and
 * inner geometry must stay aligned with measureProjectFit.js and global.css
 * (.projects-item, .project-visual, .project-title, .project-body, .tag).
 *
 * Rules:
 *   - Title rejected if its laid-out height is strictly greater than 65% of
 *     the image band height, or if the title block does not fit textAreaH.
 *   - Tags hidden before body when space is tight; if title+body does not fit,
 *     try title+tags (body off, tags on if they fit).
 *
 * @param {{ title: string, body: string, tags: string[] }} project
 * @param {{ w: number, h: number }} rect
 * @returns {{ titleFits: boolean, showBody: boolean, showTags: boolean }}
 */

import { prepare, layout } from '@chenglou/pretext'

// ── Keep in sync with measureProjectFit.js + global.css ─────────────────────
const ITEM_PADDING     = 12
const ITEM_SCALE       = 0.975
const IMAGE_FRACTION   = 0.40
const IMAGE_MARGIN_PX  = 16
const BODY_MARGIN_PX   = 14
const TITLE_MARGIN_PX  = 8
const TITLE_LETTER_SP  = 2.08 // 0.13rem @ 16px — matches .project-title

/** Max share of image band height the title may occupy (strict > fails). */
const TITLE_MAX_OF_IMAGE = 0.65

function titleFontPx() {
  const vwPx = typeof window !== 'undefined' ? window.innerWidth : 1200
  return Math.min(41.6, Math.max(28.8, vwPx * 0.03))
}

/**
 * @param {string} text
 * @param {number} innerW
 * @param {number} bodyFontPx
 */
function bodyHeight(text, innerW, bodyFontPx) {
  const t = String(text ?? '')
  if (!t.trim()) return 0
  const prepared = prepare(t, `400 ${bodyFontPx}px "Inter", ui-sans-serif, sans-serif`)
  const { height } = layout(prepared, innerW, bodyFontPx * 1.7)
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
  // .tag: ~.77rem + padding; single-line box ~14px text + vertical chrome
  const prepared = prepare(line, '700 12px "Inter", sans-serif')
  const { height } = layout(prepared, innerW, 14)
  return height + 6
}

export function measureProjectFitPretext(project, rect) {
  const itemW  = rect.w * ITEM_SCALE
  const itemH  = rect.h * ITEM_SCALE
  const innerW = itemW - ITEM_PADDING * 2
  const innerH = itemH - ITEM_PADDING * 2

  if (innerW < 40 || innerH < 40) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const imageH    = itemH * IMAGE_FRACTION
  const textAreaH = innerH - imageH - IMAGE_MARGIN_PX

  if (textAreaH < 20) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const tPx   = titleFontPx()
  const title = String(project.title ?? '')
  const titlePrepared = prepare(
    title,
    `700 ${tPx}px "Instrument Serif", Georgia, serif`,
    { letterSpacing: TITLE_LETTER_SP }
  )
  const titleLH = tPx * 0.95
  const { height: titleH } = layout(titlePrepared, innerW, titleLH)

  if (titleH > TITLE_MAX_OF_IMAGE * imageH) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const titleBlock = titleH + TITLE_MARGIN_PX
  if (titleBlock > textAreaH) {
    return { titleFits: false, showBody: false, showTags: false }
  }

  const bodyFontPx = 17
  const bodyH      = bodyHeight(project.body, innerW, bodyFontPx)
  const bodyBlock  = bodyH > 0 ? bodyH + BODY_MARGIN_PX : 0

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

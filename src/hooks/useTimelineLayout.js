import { useRef, useEffect } from 'react'

/**
 * useTimelineLayout
 *
 * Observes the timeline **viewport** (.timeline-window) via ResizeObserver.
 * That element must stay dimensionally stable (contain + overflow hidden in CSS)
 * so mode / --tl-secondary updates do not feed back into its own size.
 *
 * Mode uses **hysteresis** around ratio = 1 to avoid flip-flop:
 *   horizontal → vertical when ratio > 1.12
 *   vertical → horizontal when ratio < 0.88
 *
 * ratio = clientHeight / clientWidth (timeline parent box).
 * --tl-secondary: piecewise linear keyframes 1:2 → 0.85, 1:1 → 0.45, 2:1 → 0.25
 */

const KEYFRAMES = [
  { ratio: 0.5, secondary: 0.85 },
  { ratio: 1.0, secondary: 0.45 },
  { ratio: 2.0, secondary: 0.25 },
]

/** Upper bound to leave horizontal; lower bound to leave vertical */
const HYST_UP = 1.12
const HYST_DOWN = 0.88

function interpolateSecondary(ratio) {
  if (ratio <= KEYFRAMES[0].ratio) return KEYFRAMES[0].secondary
  if (ratio >= KEYFRAMES[KEYFRAMES.length - 1].ratio)
    return KEYFRAMES[KEYFRAMES.length - 1].secondary

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const lo = KEYFRAMES[i]
    const hi = KEYFRAMES[i + 1]
    if (ratio >= lo.ratio && ratio <= hi.ratio) {
      const t = (ratio - lo.ratio) / (hi.ratio - lo.ratio)
      return lo.secondary + t * (hi.secondary - lo.secondary)
    }
  }
  return 0.45
}

function nextMode(prev, ratio) {
  if (prev == null) return ratio <= 1.0 ? 'horizontal' : 'vertical'
  if (prev === 'horizontal') {
    return ratio > HYST_UP ? 'vertical' : 'horizontal'
  }
  return ratio < HYST_DOWN ? 'horizontal' : 'vertical'
}

export function useTimelineLayout() {
  const ref = useRef(null)
  const modeRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { clientHeight, clientWidth } = entry.target
        if (!clientWidth) return

        const ratio = clientHeight / clientWidth
        const mode = nextMode(modeRef.current, ratio)
        modeRef.current = mode
        const secondary = interpolateSecondary(ratio)

        el.dataset.tlMode = mode
        el.style.setProperty('--tl-secondary', secondary.toFixed(4))
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

# Spec: Timeline sizing + responsiveness rework

## Summary

Timeline layout mode = fn(allocated region post-video), not viewport `orientation` / `1080px`.
Phase 2: spine = scrollbar (drag); spine outside `.timeline-col`; wheel hijack on timeline until scroll end.
Container queries + CSS vars; JS (`ResizeObserver`, vars) if interpolation/wheel needed.

## Affected Files

- `src/styles/global.css` — `.newspaper-page--tall .glass`, `.feature-article-*`, `.timeline-*`, `.timeline-col`, `.timeline-spine-h`, `.tl-line-h`, `.checkpoint-card`, `@media (max-width: 1080px)`, `@media (orientation: *)` touching timeline
- `src/components/FeatureArticle.jsx` — markup, refs, listeners, `CheckpointCard`, timeline `motion.div`
- `src/components/NewspaperPage.jsx` — maybe tall min-height vs scroll if conflicts
- `src/App.jsx` — maybe `container-type` wrapper
- `src/data/content.js` — unlikely

## New Files

- `src/hooks/useTimelineViewport.js` (opt) — `ResizeObserver` → class or `--timeline-secondary`, mode
- `cut-load-prompts/03-opus-plan.md` — Stage 2

## Component Breakdown

- **FeatureArticle:** props none; state/ref: scroll parent, mode `horizontal|vertical`, wheel/drag cleanup; children: spine once outside map; cols = card + stubs
- **CheckpointCard:** props `cp`; state refs if needed for drag targets
- **Spine:** one track per mode; drag → `scrollLeft` / `scrollTop`

## Interaction + Animation

- Wide/short → H scroll X; narrow/tall → V scroll Y; exact threshold → Claw (raw line 47 typo: both "horizontal")
- H: base = height 100%, width derived; V: base = width 100%, height derived
- Secondary: piecewise linear on parent ratio; keyframes **1:2→0.85**, **1:1→0.45**, **2:1→0.25**; example **1:1.5→0.65** (ratio axis = Open Q)
- Spine drag; wheel over timeline scrolls timeline then bubbles to page
- Keep `whileInView` / `variants` unless block; Motion values optional

## State Management

- Prefer `@container` + vars on timeline parent (`container-type: size` vs `inline-size` TBD)
- Else `useRef` + `useLayoutEffect`/`useEffect`, `ResizeObserver`, `passive: false` wheel where `preventDefault`

## Library APIs

- **MDN CSS:** `@container`, `width`/`height`/`inline-size`/`block-size`/`aspect-ratio`/`orientation` on container; `container-type: size` vs `inline-size`
- **motion/react:** `useMotionValue`, `useMotionValueEvent`; drag/gesture docs Stage 2 if needed

## Open Questions (Claw)

1. Layout rule: raw `sizing_and_responsivnes_rework.txt` L47 duplicate "horizontal" — fix threshold (alloc height ≤ article width → H vs V).
2. Ratio = h:w vs w:h vs logical `inline/block` for keyframes 1:2, 1:1, 2:1; which side is "base=1".
3. "Secondary" maps to what CSS (aspect, col width, `.checkpoint-img` height, type scale)?
4. CSS-only breakpoints vs JS continuous `--timeline-secondary`.
5. Vertical spine geometry + drag axis mapping.
6. a11y: keyboard + `aria` for faux scrollbar.
7. `NewspaperPage` `useScroll` + wheel hijack: avoid double-scroll / jank.

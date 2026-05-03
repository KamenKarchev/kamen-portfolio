<role>
You are an expert software architect. Your ONLY output is a numbered implementation plan. You write zero code. Cursor Composer will execute your plan step by step.
</role>
<context>
Executing model after you: Cursor Composer
Project: kamen-portfolio (React + Vite portfolio site)
Key files:
- src/components/FeatureArticle.jsx — timeline component with CheckpointCard, horizontal scroll, motion variants
- src/components/NewspaperPage.jsx — card-deck page transitions with useScroll/useTransform
- src/styles/global.css — all timeline styles (.timeline-col, .timeline-scroll-wrap, .timeline-spine-h, orientation media queries)
- src/data/content.js — TIMELINE array (6 entries with year, title, body, image)
- src/App.jsx — wraps FeatureArticle in NewspaperPage tall

Current timeline structure:
- .timeline-scroll-wrap: overflow-x auto, flex:1, fills remaining height after video
- .timeline-scroll: display flex, min-width max-content
- .timeline-col: aspect-ratio 13/20, height 100%, flex-shrink 0; each col has .timeline-spine-h (dot+line) and .checkpoint-card
- Media queries: orientation landscape sets ratio 3/2, portrait sets 3/5
- .newspaper-page--tall .glass: min-height calc(200vh - 80px), drops to calc(100vh - 80px) at max-width 1080px
</context>
<task>
Write a step-by-step implementation plan saved to cut-load-prompts/03-opus-plan.md.
Each step must include:
- Step N: [title]
- Files affected: [exact paths]
- What to do: [precise instructions, no code]
- Why: [your architectural reasoning]
- Verify: [how to confirm this step worked]
Resolve all open questions from the spec before planning.
Flag any steps with high risk of breaking existing functionality.
Maximum 10 steps.
Do NOT write code, pseudocode, or JSX.
</task>
<next_actor>
Cursor Composer executes this plan. It needs precision, not prose.
</next_actor>
<spec>
# Spec: Timeline sizing and responsiveness rework

## Summary

Rework the feature article timeline so layout mode (horizontal vs vertical) follows the **allocated timeline region** inside the article (after video), not viewport orientation alone. Replace brittle `max-width: 1080px` / `orientation` hacks with **container-relative** or measured sizing where needed. Add a second phase: spine as interactive scrollbar (drag + wheel hijack) with spine DOM moved outside per-column cells.

## Affected Files

- `src/styles/global.css` — `.newspaper-page--tall .glass`, `.feature-article-pad`, `.timeline-section`, `.timeline-scroll-wrap`, `.timeline-scroll`, `.timeline-col`, `.timeline-spine-h`, `.tl-line-h`, `.checkpoint-card`, `@media (max-width: 1080px)`, `@media (orientation: landscape|portrait)` blocks touching timeline/tall page
- `src/components/FeatureArticle.jsx` — timeline markup structure; possible ref for resize/container; `CheckpointCard`, `motion.div` wrappers for timeline scroll
- `src/components/NewspaperPage.jsx` — only if tall-page min-height strategy must align with new timeline sizing (scroll / deck behavior)
- `src/App.jsx` — only if wrapper/container-type must be set at page level
- `src/data/content.js` — only if `TIMELINE` data shape changes (unlikely)

## New Files (suggested)

- `src/hooks/useTimelineViewport.js` (optional) — `ResizeObserver` on timeline parent; sets CSS vars or class for mode + interpolated `--timeline-secondary-scale` if pure CSS cannot express piecewise linear keyframes
- `cut-load-prompts/03-opus-plan.md` — Stage 2 output (not written in Stage 1)

## Component Breakdown

**FeatureArticle**

- **Props:** none (current)
- **State (if JS path):** ref to timeline scroll parent; optional `layoutMode: 'horizontal' | 'vertical'` derived from measured width/height of allocated region; wheel/drag listeners cleanup
- **Children:** unchanged copy/video; timeline subtree restructured: single shared spine track **outside** the mapped `timeline-col` rows/columns; checkpoint columns/rows only contain card + optional connector stubs

**CheckpointCard**

- **Props:** `cp` (from `TIMELINE`)
- **State:** none unless drag targets attach by ref
- **Children:** image strip + label (unchanged semantics)

**Timeline spine (new structure)**

- One spine element per mode: horizontal mode = spine parallels horizontal scroll; vertical mode = spine along vertical stack
- Draggable hit targets on dot/line; map drag delta → `scrollLeft` or `scrollTop` of scroll container

## Interaction & Animation Requirements

- **Mode switch:** When allocated timeline box is "wide/short" → horizontal strip (scroll X); when "narrow/tall" → vertical stack (scroll Y). Exact threshold: **Claw resolves**; raw idea text contradicts itself ("horizontal" twice in one sentence) — see Open Questions.
- **Base dimension:** Horizontal mode: checkpoint column height is base (100% height of track); width derived. Vertical mode: width is base (100% width); height derived.
- **Secondary scale:** Piecewise linear interpolation of a numeric factor from parent **height:width** (or agreed ratio) with keyframes: at ratio **1:2** → secondary **0.85**; **1:1** → **0.45**; **2:1** → **0.25**; intermediate ratios linear between adjacent keyframes (user example: **1:1.5** → **0.65**).
- **Spine as scrollbar:** User drags spine (dot + line visuals) to move through checkpoints; spine sits **outside** each `timeline-col` wrapper.
- **Wheel hijack:** While pointer over timeline region, wheel deltas scroll timeline until start/end; only then propagate vertical page scroll.
- **Motion:** Existing `whileInView` / `variants` on timeline may stay; new interactions may use `motion` values or native listeners — no aesthetic change required beyond layout/UX.

## State Management

- Prefer **CSS custom properties** set via `@container` on timeline parent (`container-type: size` or `inline-size` per query needs) for mode + `--timeline-secondary` if expressible.
- If keyframe interpolation or wheel hijack cannot be CSS-only: React `useRef` + `useLayoutEffect`/`useEffect` for `ResizeObserver`, scroll position sync, `passive: false` wheel listener where preventDefault needed; local state only inside `FeatureArticle` unless lifted for testing.

## Library APIs Needed

- **CSS (MDN):** `@container` size queries; descriptors `width`, `height`, `inline-size`, `block-size`, `aspect-ratio`, `orientation` on **container**; `container-type: size` vs `inline-size` for querying block dimension.
- **Motion (`motion/react`):** `useMotionValue`, `useMotionValueEvent` — optional for drag sync; gesture/drag docs may be needed in Stage 2 if implementing drag via Motion rather than pointer events.

## Open Questions for Claw

1. **Layout threshold:** Raw `sizing_and_responsivnes_rework.txt` line 47 says both branches "horizontal"; confirm intended rule: e.g. **timeline allocated height ≤ article content width** → horizontal, else vertical (or inverse).
2. **Ratio definition:** Confirm parent metric is **height/width**, **width/height**, or **inline-size/block-size** of the timeline container for the three keyframes (1:2, 1:1, 2:1) and which dimension is "base = 1".
3. **What "secondary" binds to:** Card aspect ratio, column width fraction, image height, typography scale, or combined CSS var consumed by `.timeline-col` / `.checkpoint-card`.
4. **Pure CSS vs JS:** Can container queries + discrete `@container` breakpoints replace continuous interpolation, or must JS compute `--timeline-secondary` on resize?
5. **Spine in vertical mode:** Geometry of line segments when cards stack (single spine left vs between cards); how drag maps when scroll axis flips.
6. **Accessibility:** Keyboard operation for timeline scroll when spine is draggable; `aria` for custom scrollbar pattern.
7. **Conflict with `NewspaperPage` scroll transforms:** Wheel hijack + Framer scroll-linked page — ensure no double-scroll or jank on tall pages.
</spec>

# Implementation Plan: Timeline Sizing + Responsiveness Rework

## Resolved Open Questions

**Q1 — Layout threshold:** The raw text has a typo. Intended rule: if timeline allocated height ≤ timeline allocated width → **horizontal** (wide/short box). If height > width → **vertical** (narrow/tall box). Threshold is `height === width` → default horizontal.

**Q2 — Ratio definition:** Ratio is **height ÷ width** of the `.timeline-section` measured box. The three keyframes read as h:w ratios: `0.5` (1:2, short/wide), `1.0` (1:1, square), `2.0` (2:1, tall/narrow). "Base = 1" means the base dimension (height in H mode, width in V mode) always fills 100% of the track; the secondary dimension is the one being scaled.

**Q3 — What "secondary" binds to:** Secondary is a single CSS custom property `--tl-secondary` (value 0–1) consumed by `.timeline-col` as the **aspect-ratio's non-base component**. In horizontal mode: `aspect-ratio: var(--tl-secondary) / 1` (width = secondary × height). In vertical mode: `aspect-ratio: 1 / var(--tl-secondary)` (height = secondary × width). This drives card proportions; `.checkpoint-img` height proportionally follows via flex inside the card.

**Q4 — Pure CSS vs JS:** Container queries can handle the **mode switch** (H vs V) with 2–3 discrete breakpoints. The **continuous piecewise-linear interpolation** of `--tl-secondary` cannot be expressed in pure CSS — requires JS `ResizeObserver` to compute and set the custom property. Hybrid approach: CSS handles layout mode class via container queries; JS handles the numeric `--tl-secondary` value.

**Q5 — Spine in vertical mode:** Single spine runs along the **left edge** of the stacked cards. Dots align vertically; connecting lines run between dots. Drag maps to `scrollTop` of the scroll container.

**Q6 — Accessibility:** The timeline scroll container gets `role="region"`, `aria-label="Timeline"`, `tabindex="0"`. Arrow keys (Left/Right in H mode, Up/Down in V mode) scroll by one card width/height. The spine is `aria-hidden="true"` (decorative — scroll container itself is the accessible target).

**Q7 — NewspaperPage conflict:** Wheel hijack uses `passive: false` on the `.timeline-scroll-wrap` element only. The handler calls `preventDefault()` only when timeline has remaining scroll in the wheel direction. When at scroll boundary, it does NOT preventDefault, allowing the event to propagate naturally to the page scroll handled by NewspaperPage. No changes to NewspaperPage required.

---

## Step 1: Create the `useTimelineLayout` hook

- **Files affected:** `src/hooks/useTimelineLayout.js` (new)
- **What to do:** Create a custom hook that accepts a ref to the timeline section container. Inside, set up a `ResizeObserver` on that ref. On each resize callback: (a) read `clientHeight` and `clientWidth` of the observed element, (b) compute ratio = height / width, (c) determine mode: ratio ≤ 1.0 → `"horizontal"`, else `"vertical"`, (d) compute `--tl-secondary` via piecewise linear interpolation between keyframes [ratio 0.5 → 0.85, ratio 1.0 → 0.45, ratio 2.0 → 0.25], clamping at boundaries, (e) set both `--tl-secondary` and a `data-tl-mode` attribute (`horizontal` or `vertical`) directly on the observed element via `el.style.setProperty()` and `el.dataset.tlMode`. Return the ref. Clean up the observer on unmount.
- **Why:** JS is required for continuous interpolation. Setting CSS vars + data attribute on the DOM element lets CSS handle all visual layout via selectors like `[data-tl-mode="vertical"]`, while the numeric `--tl-secondary` drives aspect ratios smoothly.
- **Verify:** Add a temporary `console.log` of mode and secondary value. Resize the browser window. Confirm mode flips at the right threshold and secondary interpolates smoothly.

---

## Step 2: Remove orientation and pixel-based media queries for timeline

- **Files affected:** `src/styles/global.css`
- **What to do:** Delete the `@media (orientation: landscape)` block that sets `--timeline-col-min`, `--timeline-col-max`, `--timeline-col-ratio` on `.timeline-col`. Delete the `@media (orientation: portrait)` block that does the same. In the `@media (max-width: 1080px)` block, remove the `.newspaper-page--tall .glass { min-height: calc(100vh - 80px); }` rule (this will be replaced by container-aware sizing). Keep all other rules in those media blocks untouched.
- **Why:** These are the "brittle" rules that override timeline sizing based on viewport rather than allocated space. The hook from Step 1 replaces them.
- **Verify:** After this step the timeline will temporarily look wrong (no ratio overrides). That's expected — Step 3 fixes it.
- **⚠️ HIGH RISK:** Removing the 1080px min-height override affects the tall page sizing on mobile. Will be addressed in Step 4.

---

## Step 3: Add container-aware timeline CSS using `data-tl-mode` selectors

- **Files affected:** `src/styles/global.css`
- **What to do:** Replace the removed media-query styles with attribute selectors keyed off `data-tl-mode`. Add two rule blocks: (a) `[data-tl-mode="horizontal"] .timeline-scroll-wrap` — overflow-x auto, overflow-y hidden; `.timeline-scroll` — display flex, horizontal layout; `.timeline-col` — height 100%, width auto, `aspect-ratio: var(--tl-secondary) / 1`, flex-shrink 0. (b) `[data-tl-mode="vertical"] .timeline-scroll-wrap` — overflow-y auto, overflow-x hidden; `.timeline-scroll` — display flex, flex-direction column; `.timeline-col` — width 100%, height auto, `aspect-ratio: 1 / var(--tl-secondary)`, flex-shrink 0. Set sensible defaults for `--tl-secondary` (e.g. `0.65`) on `.timeline-section` so the layout works even before JS hydrates.
- **Why:** The `data-tl-mode` attribute set by the hook drives all layout switching. Using attribute selectors instead of classes avoids React re-renders — the hook writes directly to the DOM.
- **Verify:** Resize the browser between wide and tall aspect ratios. The timeline should flip between horizontal scroll strip and vertical stack. Cards should change proportions as the window ratio changes.

---

## Step 4: Update `.newspaper-page--tall` min-height strategy

- **Files affected:** `src/styles/global.css`
- **What to do:** Change `.newspaper-page--tall .glass` from `min-height: calc(200vh - 80px)` to `min-height: calc(max(100vh - 80px, 600px))`. This ensures the tall card is at least viewport height but doesn't force exactly 2× viewport. The timeline section already has `flex: 1` and will take remaining space, which the hook then measures. On small screens (below 600px viewport height), the 600px minimum prevents the card from collapsing too small.
- **Why:** The old 200vh forced a specific height that didn't adapt to content. The new approach lets the article content + timeline fill available space naturally, while the hook reads whatever space the timeline gets and adjusts accordingly.
- **Verify:** On desktop (tall viewport): card should be roughly viewport height, timeline gets generous space → horizontal mode likely. On mobile portrait: card is viewport height, timeline stacks vertically. Resize to confirm smooth transitions.
- **⚠️ HIGH RISK:** This changes the visual height of all three tall articles (Feature, Projects, Contact). Feature is the target; Projects and Contact should be visually checked for regression.

---

## Step 5: Wire the hook into FeatureArticle

- **Files affected:** `src/components/FeatureArticle.jsx`
- **What to do:** Import `useTimelineLayout` from `../hooks/useTimelineLayout`. Create a ref with `useRef(null)`. Call `useTimelineLayout(ref)`. Attach the ref to the `.timeline-section` div. Remove any hardcoded `--timeline-col-ratio` or `--timeline-col-min/max` inline styles if present. The hook will now manage `data-tl-mode` and `--tl-secondary` on that div.
- **Why:** This connects the measurement hook to the actual DOM element. The CSS from Step 3 reacts to the data attribute and custom property automatically.
- **Verify:** Open DevTools, inspect the `.timeline-section` element. It should have a `data-tl-mode` attribute and `--tl-secondary` custom property in its inline styles. Values should update live when resizing.

---

## Step 6: Restructure spine DOM — move spine outside per-column wrappers

- **Files affected:** `src/components/FeatureArticle.jsx`, `src/styles/global.css`
- **What to do:** In FeatureArticle: move the `.timeline-spine-h` markup out of each `.timeline-col`. Instead, render a single `.timeline-spine` element as a **sibling** of `.timeline-scroll` inside `.timeline-scroll-wrap`. This spine contains one dot per checkpoint and connecting lines between dots. The spine element is `position: absolute` and overlays the scroll area. In CSS: `.timeline-spine` gets `position: absolute; top: 0; left: 0; pointer-events: none;` (pointer-events will be re-enabled in Step 8 for drag). In horizontal mode: spine runs horizontally at the top (height ~24px, width 100% of scroll content). In vertical mode: spine runs vertically along the left edge (width ~24px, height 100% of scroll content). Dots are positioned at equal intervals matching checkpoint positions. Remove all `.timeline-spine-h` specific styles that assume per-column placement.
- **Why:** The spine must be a single continuous track to serve as a scrollbar in Step 8. Per-column spine fragments can't be dragged as a unit.
- **Verify:** Visual check: dots and connecting lines should appear in the same positions as before (top of each column in H mode, left of each row in V mode). No broken layout or missing dots.
- **⚠️ HIGH RISK:** This is the biggest structural markup change. The existing `tl-line-h--before` / `tl-line-h--after` pattern must be replaced with a continuous line. Visually compare before/after carefully.

---

## Step 7: Add wheel hijack to timeline scroll container

- **Files affected:** `src/components/FeatureArticle.jsx`
- **What to do:** In `FeatureArticle`, add a `useEffect` that attaches a `wheel` event listener to the `.timeline-scroll-wrap` element (via the existing ref or a new one). The listener: (a) reads current `scrollLeft` (H mode) or `scrollTop` (V mode) and compares against `scrollWidth - clientWidth` (H) or `scrollHeight - clientHeight` (V), (b) if the timeline can scroll further in the wheel direction, calls `event.preventDefault()` and applies `event.deltaY` (or `deltaX` in H mode) to the scroll position, (c) if at scroll boundary in the wheel direction, does nothing (lets the event propagate to page scroll). Listener must be registered with `{ passive: false }`. Read the current mode from the `data-tl-mode` attribute on the timeline section element. Clean up the listener on unmount.
- **Why:** This gives the timeline its own scroll trapping behavior. The boundary check ensures users can scroll past the timeline naturally once they've reached the end.
- **Verify:** Hover over the timeline area and scroll with mouse wheel. Timeline should scroll through checkpoints. At the start/end of the timeline, continued scrolling should move the page instead. Test in both H and V mode.

---

## Step 8: Make spine draggable as scrollbar

- **Files affected:** `src/components/FeatureArticle.jsx`, `src/styles/global.css`
- **What to do:** On the `.timeline-spine` element, re-enable `pointer-events: auto`. Add `pointerdown` / `pointermove` / `pointerup` listeners (via `useEffect` and refs). On `pointerdown` on the spine: capture the pointer (`setPointerCapture`), record initial pointer position and initial scroll position. On `pointermove`: compute delta from initial position, map that delta to scroll position proportionally (delta pixels ÷ spine visible length × total scroll range), set `scrollLeft` or `scrollTop` on the scroll container. On `pointerup`: release capture. In CSS: give the spine `cursor: grab` and while dragging `cursor: grabbing`. Add `touch-action: none` on the spine to prevent browser default touch behavior.
- **Why:** This turns the decorative timeline line into a functional scrollbar, matching the spec's "spine as scrollbar" requirement.
- **Verify:** Click and drag on the timeline spine (the line/dots). The timeline should scroll proportionally. Release should stop scrolling. Test with both mouse and touch (if available). Verify the drag doesn't interfere with the wheel hijack from Step 7.

---

## Step 9: Add keyboard accessibility to timeline

- **Files affected:** `src/components/FeatureArticle.jsx`, `src/styles/global.css`
- **What to do:** On `.timeline-scroll-wrap`: add `tabindex="0"`, `role="region"`, `aria-label="Timeline"`. In the wheel/keyboard `useEffect`, also attach a `keydown` listener. Arrow Left/Right (H mode) or Arrow Up/Down (V mode) scrolls by one card width/height (read from first `.timeline-col`'s `offsetWidth` or `offsetHeight`). Home/End jump to start/end. Add a visible `:focus-visible` outline style on `.timeline-scroll-wrap` in CSS (e.g. `outline: 2px solid var(--primary); outline-offset: 4px; border-radius: 20px`). The spine remains `aria-hidden="true"`.
- **Why:** Custom scroll regions must be keyboard-operable. The scroll container is the accessible target; the spine is decorative enhancement.
- **Verify:** Tab to the timeline region. A focus ring should appear. Use arrow keys to scroll through checkpoints. Home/End should jump to boundaries. Screen reader should announce "Timeline, region".

---

## Step 10: Final cleanup and cross-mode visual polish

- **Files affected:** `src/styles/global.css`, `src/components/FeatureArticle.jsx`
- **What to do:** (a) Remove the old `--timeline-col-min`, `--timeline-col-max` CSS custom properties from `.timeline-col` base styles if they're still defined (they're no longer used since aspect ratio comes from `--tl-secondary`). (b) Remove any leftover `.tl-line-h--before` / `.tl-line-h--after` styles that were for the old per-column spine. (c) Verify `.checkpoint-img` height works in both modes — in V mode cards are wide so image can be taller; in H mode cards are narrow so image stays compact. Adjust `.checkpoint-img` to use a relative height (e.g. `flex: 0 0 30%` of card height rather than fixed `100px`) so it scales with the card in both modes. (d) Remove the `console.log` from Step 1. (e) Test the full flow: load page → scroll to feature article → timeline appears with correct mode → resize window → mode and proportions update → wheel scrolls timeline → drag spine scrolls timeline → keyboard navigates → scroll past timeline returns to page scroll.
- **Why:** Cleanup pass ensures no dead CSS, no debug output, and both modes look polished.
- **Verify:** Full visual regression check at desktop wide, desktop square, tablet portrait, mobile portrait. Confirm no console errors, no layout jumps on resize, no broken animations. Compare the NewspaperPage card-deck transitions for Feature, Projects, and Contact articles — they should be unaffected by the min-height change from Step 4.

# Language Switch Request (EN/BG) for Curser

## Goal
Add a language switch control for English/Bulgarian that feels like the existing interactive style of the site, with a "card around a ring" reveal animation.

The practical behavior is simple: clicking switches app language between `en` and `bg`.

## Desired Interaction Feel
- The switch is made of two joined cards around a central ring axis.
- In idle state, it looks like a rounded rectangle showing the current language flag/card on top.
- On hover, the top card rotates sideways to reveal the second card beneath it.
- If user clicks the revealed card, that language becomes active.
- After click, the previously active card rotates all the way back into its resting position automatically (smooth completion animation).

## Functional Requirements
- Support exactly two locales for now: English (`en`) and Bulgarian (`bg`).
- Keep one source of truth for active language at app level.
- All visible UI text should render from locale-aware content, not hardcoded strings.
- The switch must be keyboard accessible:
  - Focusable control
  - Enter/Space toggles language
  - ARIA label reflects action (e.g. "Switch language to Bulgarian")
- Persist language preference (recommended: `localStorage`) and restore on reload.

## Visual/Animation Requirements
- Shape language: rounded rectangular cards, compact enough for navbar use.
- Keep animation style consistent with current motion usage (`motion/react`).
- Hover reveal animation must be reversible/cancel-safe (no janky snap when pointer leaves).
- Click-to-switch animation should feel decisive and complete even if pointer moves away mid-transition.
- Respect reduced-motion preference where possible (fallback to minimal transition).

## Scope
### In Scope
- New language switch component with hover/click animation behavior.
- App-level language state management.
- Refactor existing text content into locale dictionaries.
- Wire all current visible copy to localized values.

### Out of Scope (for this task)
- Adding more than two languages.
- Full i18n framework integration unless needed.
- Auto-detecting browser locale with complex fallback trees.
- Translating PDF assets (`CV`, `Resume`) unless explicitly requested.

## Affected Files and Functions

### `src/App.jsx`
- Add app-level `language` state (e.g. `const [language, setLanguage] = useState(...)`).
- Add `toggleLanguage()` or `setLanguage(next)` handler.
- Pass language props to `Nav` and content-rendering components.
- Keep existing theme behavior unchanged.

### `src/components/Nav.jsx`
- Integrate the new language switch component near the existing `LightSwitch`.
- Pass down `language` and `setLanguage`/toggle callbacks.
- Ensure layout still works on desktop and mobile widths.

### `src/components/LightSwitch.jsx`
- No behavior change required.
- Keep as reference for interaction quality and motion patterns.

### New file: `src/components/LanguageSwitch.jsx` (recommended)
- Encapsulate hover-reveal + click-swap behavior.
- Expose props:
  - `language`
  - `onLanguageChange(nextLanguage)`
- Include keyboard and ARIA support.

### `src/data/content.js`
- Refactor from single-language constants to locale-keyed content structure.
- Example direction:
  - `CONTENT.en.NAV_LINKS`
  - `CONTENT.bg.NAV_LINKS`
- Keep object shapes stable to minimize component changes.

### Text-rendering components that currently use hardcoded English
Likely updates needed in:
- `src/components/Masthead.jsx`
- `src/components/Hero.jsx`
- `src/components/FeatureArticle.jsx`
- `src/components/ProjectsArticle.jsx`
- `src/components/ContactArticle.jsx`
- `src/components/Footer.jsx`
- `src/components/SectionHead.jsx`

Each should read localized copy from props/content dictionary rather than embedding literals.

### `src/styles/global.css`
- Add style block for language switch (`.language-switch-*` classes).
- Ensure harmony with existing nav density, glass aesthetic, and theme tokens.
- Add responsive adjustments if nav gets crowded.

## Data Contract Recommendation
- Use a single content object:
  - `CONTENT = { en: {...}, bg: {...} }`
- App computes `const copy = CONTENT[language]`.
- Components consume only `copy` slices they need.

This keeps migration incremental and avoids pulling an i18n library prematurely.

## Acceptance Criteria
- User can switch between English and Bulgarian from navbar control.
- Hover reveals alternate language card with ring/card rotation feel.
- Click on revealed card switches language and completes return animation cleanly.
- All currently visible page text updates to selected language.
- Language choice persists across reload.
- No regressions to theme switch behavior or nav responsiveness.

## Notes for Curser
- Prioritize interaction polish of the switch first, then complete text migration.
- Keep implementation modular so adding a 3rd language later is straightforward.
- Reuse existing motion conventions from project (`motion/react`, spring easing style).

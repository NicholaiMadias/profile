# Game quality verification matrix

Automated checks do not replace manual browser gameplay tests.

## Automated: npm run check, Node 22.18+

| Game | Regression coverage |
| --- | --- |
| Vim Defender | Rectangle collisions; one bullet/one enemy; concurrent hits; misses; quiz streaks; capped drones; wrong-answer progression |
| Matrix of Conscience | Malformed progress; legacy saves; versioned persistence; randomized quiz selection and edge cases |
| Certification Academy | Mission uniqueness; question uniqueness; valid answers; explanations and sources |
| Word Sprint | Existing word selection and accuracy tests |
| Website | TypeScript, all Node tests, production build |

## Manual browser smoke test checklist

### Vim Defender
- Start, move using H/L and Left/Right, and fire using Space.
- Verify pointer move/fire on phones, keyboard controls on desktop, and no unexpected scrolling.
- Check score changes by exactly 10 per hit; overlapping enemies must not give duplicate hits.
- Complete three correct quiz answers; confirm the next wave begins. Wrong answers must reset the combo.
- Pause/resume, switch tabs, blur browser, end run and restart. Confirm no stuck keys.
- Verify accessibility: focus navigation, readable status, screen-reader controls, and contrast.

### Matrix of Conscience
- Start a new campaign; validate locked sector restrictions, quiz gates and all ten sector unlocks.
- Reload, restore saved campaign progress, and confirm invalid saved data resets safely.
- Exercise tower placement, insufficient funds, victory/defeat, replay and map navigation.
- Play all level engines on phone-sized and desktop viewports; check overlays and canvas interactions.

### Certification Academy
- Play each mission correctly and incorrectly, verifying feedback, explanations and score.
- Retry only missed questions, replay full rounds and check best-score persistence after reload.
- Check hash navigation, radio keyboard controls, progress feedback and responsive layouts.

### Other arcade games
- Bible Quiz: ten questions and correct saved best result.
- Word Sprint: timely input focus, deadline enforcement and replay.
- Quick Click: pointer mode, keyboard mode, one hit per target and visibility behavior.

## Release gate

A green CI build plus a completed browser, touch, and keyboard smoke test is required before declaring the entire game collection production-verified. These manual checks have not yet been performed.

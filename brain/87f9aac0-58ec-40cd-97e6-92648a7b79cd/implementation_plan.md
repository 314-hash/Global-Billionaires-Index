# Implementation Plan - Restrict Animation to Hero Section

## Goal
Restrict the recently implemented scroll-driven frame animation so that it stays contained within the Hero section, rather than being a fixed background for the entire page.

## Proposed Changes

### `src/components/sections/Hero.jsx`
- Change `position: fixed` to `position: absolute` for the `canvas` element.
- Ensure `Hero` section container has `position: relative` (already present) so the canvas is positioned relative to it.
- The `scrollY` hook will still drive the animation frame index, meaning the animation will play as the user scrolls *while* the Hero section is visible. Once the user scrolls past the Hero, the animation will scroll out of view.

## Verification
- Manual verification via browser:
  - Scroll down: Animation plays, but the canvas moves up with the Hero section and eventually goes out of viewport.
  - Scroll up: Animation plays in reverse (scrubs), canvas moves back into viewport.

# Hero Title Animation
Implemented the requested 140-frame animation as the background for the **"Web3 Founding CTO"** title.

## Changes Implemented

### 1. Animated Title Background
- Refactored the animation logic into a reusable `<FrameAnimation />` component.
- Placed the animation *specifically behind* the main title text ("Web3 Founding CTO").
- Used a relative container with `absolute inset-0` for the canvas to ensure it fits the text capability using `ResizeObserver`.
- Added `mix-blend-screen` and `bg-clip-text` effects to the text for a premium "knockout" or integrated look.

### 2. Assets
- Uses frames `ezgif-frame-001.png` to `ezgif-frame-140.png` from `public/hero-frames/`.
- Preloads images and plays at 24fps.

### 3. Cleanup & Fixes
- Removed global video background.
- Fixed CSS `@import` order in `index.css`.
- Fixed visibility issues by ensuring the canvas strictly tracks the parent container's dimensions.

## Verification Results

### Automated Build
- `npm run build` passed successfully.

### Manual Verification
- **Visuals**: The "Web3 Founding CTO" title should have the animated GIF frames playing behind it.
- **Performance**: Canvas uses `requestAnimationFrame` and only draws when frames are ready.

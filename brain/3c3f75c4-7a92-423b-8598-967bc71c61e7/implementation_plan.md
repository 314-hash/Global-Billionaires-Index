# Implementation Plan - Dynamic Landing Page

This plan outlines the steps to build a premium, cinematic Web3 landing page for "Dynamic".

## Goal Description
Create a "Dynamic" landing page that feels powerful, futuristic, and gravity-defying. 
Stack: Vite + React + Framer Motion + Vanilla CSS (module/global).

## User Review Required
- [ ] Confirm if the existing `ezgif-frame-*.png` files in the root should be used for the background animation or if we should generate a code-based alternative (Canvas/CSS). **Plan: Default to code-based particles for performance/quality, but can use these if requested.**

## Proposed Changes

### Project Setup
- Initialize Vite + React project in a subdirectory `dynamic-landing`.
- Clean up default boilerplate.
- Set up `src/styles/variables.css` for the dark theme color palette.

### Dependencies
- `framer-motion`: For complex animations (scroll, layout, shared element).
- `lucide-react`: For high-quality SVG icons.

### Component Architecture
Reusable UI components for consistency:
- `Button`: Primary/Secondary with glow effects.
- `Card`: For Platform Pillars, with hover lift.
- `Section`: Wrapper with scroll-reveal logic.
- `Glow`: Helper component for PNG-based glow assets (using CSS radial gradients as fallback or generated assets).

### Section Breakdown
#### 1. Hero
- Large typography.
- Background: Abstract particle system (Canvas or CSS).
- Animation: Fade in + slow vertical drift (Antigravity).

#### 2. Floating Tagline
- Sticky positioning (`position: sticky`).
- Horizontal drift on scroll (using `useScroll` + `useTransform`).

#### 3. About
- Text block with side graphic.
- Reveal animation.

#### 4. Platform Pillars
- Grid layout.
- Cards with stagger animation on entry.

#### 5. Tech Stack
- List items with animated dividers.

#### 6. Ownership & Economy
- Horizontal scroll container or simple flex grid depending on content width.

#### 7. Security
- Pinned section effect using `position: sticky` or Framer Motion scroll hook.

#### 8. Governance & Future & CTA
- Standard sections with "Blur-to-sharp" text reveals.

## Verification Plan
### Automated Tests
- Build verification (`npm run build`).
- Lint check.

### Manual Verification
- Verify animation smoothness (60fps).
- Check responsive behavior on Mobile/Desktop breakpoints.
- Verify "Antigravity" effect feeling (subtle float).

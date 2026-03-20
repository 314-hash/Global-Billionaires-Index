# Expansion of Hero Frames to Landing Page

## Goal Description
The user wants the "hero frames" animation (currently a small background behind the title) to cover the entire Hero Section. Additionally, the Hero Section should effectively become the "Landing Page", implying the removal or hiding of other content sections.

## User Review Required
> [!IMPORTANT]
> I will be hiding/removing other sections (`IdentitySection`, `ExecutionStack`, etc.) from the landing page to focus entirely on the Hero Section. If this is not intended, please let me know.

## Proposed Changes

### Components

#### [MODIFY] [HeroSection.tsx](file:///c:/Users/Janus/extro/janus-systems/src/components/HeroSection.tsx)
- Move `FrameAnimation` from the Title wrapper to the main `section` background (`absolute inset-0`).
- Ensure it sits behind the content but above the fallback background.
- Adjust opacity/blending if necessary to ensure text readability.

### Pages

#### [MODIFY] [Index.tsx](file:///c:/Users/Janus/extro/janus-systems/src/pages/Index.tsx)
- Remove or comment out other sections (`IdentitySection`, `ExecutionStack`, `FeaturedSystems`, `ProcessSection`, `TrustSection`, `ChatbotSection`, `ContactSection`) to make the Hero Section the primary focus.
- Keep `GlitchBackground`, `VignetteOverlay`, `Navigation` and `Footer` as they are global/shell elements.

## Verification Plan

### Manual Verification
1.  **Visual Check**:
    - Open the landing page (`/`).
    - Verify that the frame animation covers the entire screen/background.
    - Verify that the text is still readable.
    - Verify that other sections are gone (scroll down should verify this, or just see that the page ends after the hero/footer).

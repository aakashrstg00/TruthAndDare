# UI/UX & Design System

## 1. Visual Aesthetics
**Vibe**: Neon, sleek, modern, and slightly provocative. The UX should feel like a premium party app or a high-end dating app.
**Background**: Deep dark themes (e.g., pure black `#000000` or very dark violet `#0f0c29` to `#302b63` gradient) to make the neon accents pop.
**Accents (Group Mode)**: Electric Blue and Neon Pink.
**Accents (Couple Mode)**: Deep Crimson, Velvet Red, and Gold.

## 2. Typography
- **Headings**: `Outfit` or `Poppins` (Google Fonts) - bold, modern, and easily readable.
- **Body/Questions**: `Inter` - highly legible for reading truths and dares in dark or party environments.

## 3. Core Components

### The Bottle (Spinning Mechanism)
- A highly polished 2D or faux-3D SVG/PNG of a liquor or champagne bottle.
- Needs to be centrally placed.
- **Animation (Framer Motion)**:
  - When triggered, the bottle rotates rapidly, slowing down using an ease-out timing function.
  - Calculate rotation: `rotation = previousRotation + (360 * randomSpins) + baseAngleToTargetPlayer`.
  - Add a pulsing glow effect when it stops.

### Truth / Dare / Shot Cards
- **Glassmorphism**: Use semi-transparent backgrounds with background-blur (`backdrop-blur-md`, `bg-white/10`) to overlay over the dark gradient background.
- **Buttons**:
  - `Truth` Button: Pulsing blue theme.
  - `Dare` Button: Pulsing red/pink theme.
  - `Take a Shot` (Skip) Button: Ghost button or outline button, indicating it's a penalty.

## 4. Mobile Responsiveness
- Ensure touch targets are large enough (minimum 48x48px).
- Prevent accidental double-taps zooming in the UI (`user-select: none`, `touch-action: manipulation`).
- All interactions should feel tactile, potentially utilizing the `navigator.vibrate([100])` API when the bottle stops or a button is pressed.

## 5. Animation Guidelines
- **Spinning**: Use `spring` physics in Framer Motion for the bottle to settle naturally.
- **Card Reveal**: When a Truth/Dare is chosen, the card should flip or slide up from the bottom of the screen (`initial={{ y: "100%" }} animate={{ y: 0 }}`).

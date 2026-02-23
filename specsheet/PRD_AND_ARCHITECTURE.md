# Product Requirements Document (PRD) & Architecture

## 1. Project Overview
**Name**: Truth & Dare PWA (Progressive Web App)
**Objective**: Build a responsive, highly sensory, and visually stunning Truth & Dare game for mobile browsers, installable as a PWA. The application will use a turn-based system with a spinning bottle animation to select players, offering two distinct modes: Group (casual/mildly explicit) and Couple (highly explicit, focused on intimacy and relationship building).
**Penalty System**: Players can choose to answer a Truth, perform a Dare, or skip by taking a penalty (taking a vodka shot).
**Tech Stack**: 
- **Framework**: React (using Vite for fast bundling)
- **Styling**: Tailwind CSS (for rapid, responsive, and beautiful UI scaling)
- **Animations**: Framer Motion (crucial for the smooth bottle spin and page transitions)
- **PWA**: `vite-plugin-pwa` to enable offline access and mobile installation
- **State Management**: Zustand or React Context for lightweight game state management.
- **AI Integration**: Integration with an LLM Provider API (e.g., OpenAI API, Anthropic Claude API, Google Gemini API) to dynamically generate new truth and dare cards on-the-fly.

## 2. Core Features
- **PWA Capabilities**: Installable directly from the browser to the home screen.
- **Player Setup**: Input player names before starting the game.
- **Game Modes**:
  - *Group Mode*: Mildly explicit, fun, and harmless questions.
  - *Couple Mode*: Highly explicit, sexual, and intimate prompts designed for deep connection.
- **Turn-based System**: The app tracks turns. A central bottle spins and lands on the player whose turn it is.
- **Truth/Dare/Shot Mechanics**: Selected player gets the option:
  - Truth.
  - Dare.
  - Skip taking a shot (Vodka).
- **Responsive & Dynamic UI**: Smooth 60fps animations, mobile-first design, haptic feedback (using Web Vibration API if supported).
- **Dynamic AI Task Generation**: Players can request a dynamically generated truth or dare to keep the game endless. The app interfaces with an AI model using highly detailed system prompts to assure tone consistency and safety, tailored to the specific game mode.

## 3. Architecture & Tech Stack Decisions
We choose **React + Vite** over Vanilla JS because:
1. Managing complex game state (players, current turn, scores/shots taken, history) is much simpler and less bug-prone with React.
2. Generating smooth, physics-based UI animations (like the bottle spin) is highly streamlined with **Framer Motion**.
3. Reusable components (buttons, modals, cards) lead to a cleaner, more maintainable codebase.

### State Management
The core state to manage:
- `mode`: 'group' | 'couple'
- `players`: Array of `{ id: string, name: string, skippedCount: number }`
- `activePlayerIndex`: number
- `gameState`: 'setup' | 'spinning' | 'choosing' | 'performing' | 'game_over'
- `currentPrompt`: The active truth/dare string.

## 4. Claude Implementation Guide
1. **Initialize**: `npm create vite@latest truth-and-dare -- --template react-ts`
2. **Install Dependencies**: `npm install framer-motion tailwindcss postcss autoprefixer zustand lucide-react`
3. **Setup PWA**: Install and configure `vite-plugin-pwa` in `vite.config.ts` to manifest icons and offline support.
4. **Implement UI**: Follow the UI/UX design documents.

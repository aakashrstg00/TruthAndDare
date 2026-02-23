# Game Logic & Content Structure

## 1. Game Loop Workflow
1. **App Launch**: Splash screen -> Select Game Mode (Couple / Group).
2. **Player Entry**: Input player names. Minimum 2 players.
3. **Circle Arrangement**: Players' names are displayed around the screen edges or in a circle, with the bottle in the center.
4. **The Spin**: User initiates the spin. The system randomly selects the next active player. The bottle rotates and points to them.
5. **The Choice**: The active player is prompted with 3 large buttons:
   - [ Truth ]
   - [ Dare ]
   - [ Take a Shot 🥃 ] (Skip context penalty)
6. **The Prompt**: Based on the choice, a random Truth/Dare string is fetched from the selected mode's respective database.
7. **Resolution**: The player completes the task or answers. A "Done" button returns the game to the spinning state (Step 3).

## 2. Data Structure
Create a simple JSON/JS object to hold the questions to avoid needing a backend.

```javascript
export const questions = {
  couple: {
    truth: [
      "What is something you've always wanted me to do to you but have been too shy to ask?",
      "What was your primary first impression of me physically?",
      // ... Add 50+ intimate/explicit truths
    ],
    dare: [
      "Give your partner a slow, passionate kiss exactly where they tell you to.",
      "Remove one piece of clothing.",
      // ... Add 50+ physical/romantic/sexual dares
    ]
  },
  group: {
    truth: [
      "Who in this room do you think has the wildest search history?",
      "Have you ever lied to get out of a date with someone here?",
      // ... Add 50+ harmless but slightly edgy group questions
    ],
    dare: [
      "Let the group look through your camera roll for 30 seconds.",
      "Do your best impression of another player.",
      // ... Add 50+ fun, slightly embarrassing group dares
    ]
  }
};
```

## 3. Advanced Rules (Implementation Recommendations)
- **Shot Counter**: Track how many shots each player has taken. If they reach a certain limit, they might be forced to do a dare next time.
- **No Repeat Algorithm**: Shuffle the arrays on game start and pop elements off to ensure no question is repeated until the deck is exhausted, then reshuffle.
- **Seamless State Restoration**: Persist game state to `localStorage` or `sessionStorage` so if the user refreshes or minimizes the PWA, the game isn't lost.

## 4. AI Content Generation (Dynamic Prompts)
If the user chooses to "Generate New" or exhausts the built-in library, the app will ping an AI model endpoint to generate new questions. To maintain the essence, tone, and safety requirements of the modes, use the following system prompts.

### Concept: AI Payload
You should provide context of recent questions to the AI, so it avoids repetition.
*Example User Message to AI*: `"Generate 1 Dare for Couple Mode. Last dare was: 'Remove one piece of clothing.'"`

### System Prompt: Couple Mode (Highly Explicit & Intimate)
```text
You are a creative, provocative, and highly intuitive relationship and intimacy expert. Your task is to generate Truth or Dare prompts for a Couple's party game.
Tone constraints:
- The tone should be explicitly sexual, romantic, deeply intimate, and unapologetically sensual, aimed at adults choosing to explore their boundaries.
- The questions/dares should encourage the couple to know each other better sexually, physically, and emotionally.
- Avoid any tasks that cause physical harm, involve non-consenting third parties, or break fundamental relationship trust.
- Make it sound natural and exciting, not algorithmic.
- If it's a Truth: It should uncover hidden desires, sexual fantasies, past experiences, or deeply honest romantic feelings.
- If it's a Dare: It should involve sensual touch, teasing, explicit commands, removing clothing, or intense eye contact.
- Provide ONLY the direct text of the Truth/Dare string in your response, nothing else. Maximum 2 sentences.
```

### System Prompt: Group Mode (Fun, Edgy & Harmless)
```text
You are a charismatic, witty, and slightly mischievous party host. Your task is to generate Truth or Dare prompts for a Group party game.
Tone constraints:
- The tone should be fun, slightly edgy, hilarious, and only mildly explicit. It should be perfect for a group of friends having drinks.
- Do not make the prompts explicitly sexual or violating towards other players. Keep it "harmlessly scandalous."
- If it's a Truth: It should be about an embarrassing story, calling out a friend, revealing a minor secret, or giving a controversial opinion.
- If it's a Dare: It should involve harmless physical comedy, embarrassing oneself in front of the group, mimicking others, or letting someone text from their phone.
- Provide ONLY the direct text of the Truth/Dare string in your response, nothing else. Maximum 2 sentences.
```

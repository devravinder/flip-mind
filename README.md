# 🧠 FlipMind — Memory Card Game

> A modern memory card game built with **React + TypeScript + TailwindCSS + shadcn/ui + TanStack Router + TanStack DB**.
> Flip cards, match pairs, and challenge your memory — play solo vs. bot or with friends!

---

## 🚀 Overview

**FlipMind** is a fun and interactive **memory match** game where players take turns flipping two hidden cards to find matching pairs.

The game ends when all pairs are matched — the player with the most matches wins!
You can play **against the bot** (default mode) or **with friends** in pass-and-play mode.

---

## 🧩 Game Rules

1. Minimum **two players** required:

   * Human vs Bot (default)
   * Human vs Human (pass & play)
2. The board starts with **20 cards** (10 pairs).
3. On a turn:

   * Player flips **two cards**.
   * If both cards **match** → player scores +1 and plays again.
   * If both cards **don’t match** → cards flip back and next player’s turn begins.
4. Game ends when **all cards are cleared**.
5. **Winner:** player with the most matched pairs.

---

## ⚙️ Features

| Feature          | Description                                     |
| ---------------- | ----------------------------------------------- |
| 🎮 Game Modes    | Play with Bot / Play with Friend (pass & play)  |
| 👥 Multiplayer   | Up to 20 players                                |
| 🧱 Dynamic Cards | Choose number of cards (up to 100, always even) |
| 🤖 Smart Bot     | AI logic remembers flipped cards                |
| 🧠 Scoreboard    | Tracks turns and earned pairs                   |
| 🧩 Custom Icons  | Uses Lucide icons for cards                     |
| 🎨 UI            | Tailwind + shadcn for a minimal, modern design  |
| 🔁 Replay        | Restart anytime or switch mode mid-game         |

---

## 🏗️ Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Framework | React + TypeScript               |
| Styling   | TailwindCSS + shadcn/ui          |
| Routing   | TanStack Router                  |
| State/DB  | TanStack Query / TanStack DB     |
| Icons     | Lucide Icons                     |
| Animation | CSS transitions for flip effects |

---

## 📁 Project Structure

```bash
flipmind/
├── src/
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── GameBoard.tsx
│   │   ├── ScoreBoard.tsx
│   │   ├── PlayerPanel.tsx
│   │   └── ModeSelector.tsx
│   ├── hooks/
│   │   ├── useGameLogic.ts
│   │   ├── useBotLogic.ts
│   │   └── useShuffle.ts
│   ├── utils/
│   │   ├── generateCards.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── pages/
│   │   └── GamePage.tsx
│   ├── data/
│   │   └── icons.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── favicon.ico
├── package.json
├── tailwind.config.ts
└── README.md
```

---

## 🧠 Core Logic

### 1. Card Generation

* Randomly shuffle pairs of icons using `generateCards()`.
* Always produce an **even number** of cards.

### 2. Turn-Based System

* Game state managed by `useGameLogic()` hook.
* Keeps track of:

  * `currentPlayer`
  * `flippedCards`
  * `matchedCards`
  * `scoreBoard`

### 3. Bot Logic

* Implemented in `useBotLogic()`.
* Bot “remembers” previously flipped cards.
* Random move if memory doesn’t help.

### 4. Match Detection

```ts
if (flipped[0].icon === flipped[1].icon) {
  markAsMatched(flipped);
  addPoints(currentPlayer);
} else {
  nextPlayer();
}
```

---

## 💻 Installation & Setup

### Prerequisites

* Node.js ≥ 18
* npm / pnpm / bun

### Setup

```bash
# Clone repo
git clone https://github.com/<your-username>/flipmind.git
cd flipmind

# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open 👉 [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 Available Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build production bundle  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run linter               |

---

## 🎨 UI Preview (Concept)

```bash
+--------------------------------+
| Player: Rabindranath  🔁 Bot   |
|--------------------------------|
| [🂠][🂠][🂠][🂠][🂠]               |
| [🂠][🂠][🂠][🂠][🂠]               |
| [🂠][🂠][🂠][🂠][🂠]               |
| [🂠][🂠][🂠][🂠][🂠]               |
|--------------------------------|
| Scores: 🧑 3 | 🤖 5              |
+--------------------------------+
```

* Flip animation on hover/click.
* Disabled interaction when not player’s turn.
* Winner message when board is cleared.

---

## 🏁 Future Enhancements

* ⏱️ Add timer and leaderboard.
* 🌐 Multiplayer via WebSocket.
* 📱 Mobile touch optimizations.
* 🎵 Add sound effects for flips/matches.
* 🧩 Theme customization (card back designs).

---

## 📜 License

MIT License © 2025 [Ravinder Reddy Kothabad]

---

## 🙌 Credits

* **UI Components:** [shadcn/ui](https://ui.shadcn.com)
* **Routing & State:** [TanStack](https://tanstack.com)
* **Icons:** [Lucide Icons](https://lucide.dev)

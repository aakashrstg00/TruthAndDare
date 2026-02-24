export type GameMode = 'group' | 'couple' | 'steamy';
export type GameState = 'splash' | 'setup' | 'spinning' | 'choosing' | 'performing';

export interface Player {
    id: string;
    name: string;
    shotsTaken: number;
}

export interface GameStore {
    mode: GameMode;
    isVirtual: boolean;
    gameState: GameState;
    players: Player[];
    activePlayerIndex: number;
    currentPrompt: string;
    currentType: 'truth' | 'dare' | 'shot' | null;
    history: { type: string, prompt: string }[];

    setMode: (mode: GameMode) => void;
    setVirtual: (isVirtual: boolean) => void;
    setGameState: (state: GameState) => void;
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    startGame: () => void;
    spinBottle: () => void;
    setPrompt: (type: 'truth' | 'dare' | 'shot', prompt: string) => void;
    completeTurn: () => void;
    endGame: () => void;
}

import { create } from 'zustand';

export const useGameStore = create<GameStore>((set, get) => ({
    mode: 'group',
    isVirtual: false,
    gameState: 'splash',
    players: [],
    activePlayerIndex: -1,
    currentPrompt: '',
    currentType: null,
    history: [],

    setMode: (mode) => {
        if (mode === 'steamy') {
            set({ mode, isVirtual: false });
        } else {
            set({ mode });
        }
    },
    setVirtual: (isVirtual) => set({ isVirtual }),
    setGameState: (gameState) => set({ gameState }),

    addPlayer: (name) => set((state) => ({
        players: [...state.players, { id: Date.now().toString(), name, shotsTaken: 0 }]
    })),

    removePlayer: (id) => set((state) => ({
        players: state.players.filter(p => p.id !== id)
    })),

    startGame: () => set({
        gameState: 'spinning',
        activePlayerIndex: -1,
    }),

    spinBottle: () => {
        const { players, activePlayerIndex } = get();
        if (players.length < 2) return;

        // logic to select next player, ensuring it's not the same player if possible, 
        // or just random for now
        let nextIndex = Math.floor(Math.random() * players.length);
        if (nextIndex === activePlayerIndex && players.length > 1) {
            nextIndex = (nextIndex + 1) % players.length;
        }

        set({
            activePlayerIndex: nextIndex,
            gameState: 'choosing',
        });
    },

    setPrompt: (type, prompt) => set((state) => {
        if (type === 'shot') {
            const newPlayers = [...state.players];
            newPlayers[state.activePlayerIndex].shotsTaken += 1;
            return { currentType: type, currentPrompt: prompt, gameState: 'performing', players: newPlayers };
        }

        return {
            currentType: type,
            currentPrompt: prompt,
            gameState: 'performing',
            history: [...state.history, { type, prompt }]
        };
    }),

    completeTurn: () => set({
        gameState: 'spinning',
        currentPrompt: '',
        currentType: null,
    }),

    endGame: () => set({
        gameState: 'splash',
        players: [],
        activePlayerIndex: -1,
        currentPrompt: '',
        currentType: null,
        history: [],
    }),
}));

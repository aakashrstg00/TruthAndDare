import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { UserPlus, X, Play, ChevronLeft } from 'lucide-react';
import { VERSION, BUILD_NUMBER } from '../version';

export const Setup = () => {
    const { mode, players, addPlayer, removePlayer, startGame, setGameState } = useGameStore();
    const [nameInput, setNameInput] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (nameInput.trim().length > 0) {
            addPlayer(nameInput.trim());
            setNameInput('');
        }
    };

    const handleStart = async () => {
        // Request iOS motion permission if needed
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
            try {
                await (DeviceMotionEvent as any).requestPermission();
            } catch (e) {
                console.error("Permission denied for motion sensors", e);
            }
        }
        startGame();
    };

    const isGroup = mode === 'group';
    const isLimited = mode === 'couple' || mode === 'steamy';
    const reachedLimit = isLimited && players.length >= 2;

    return (
        <div className="flex flex-col h-full px-6 py-8 max-w-md mx-auto w-full relative">
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setGameState('splash')}
                className="absolute top-8 left-4 p-2 text-white/80 hover:text-white transition-colors z-50 rounded-full active:bg-white/10"
            >
                <ChevronLeft size={28} />
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10 mt-12"
            >
                <h2 className="text-3xl font-outfit font-bold text-white mb-2">Who is playing?</h2>
                <p className="text-white/60 text-sm">
                    {isGroup ? "Add everyone in the room." : (reachedLimit ? "Ready to play!" : "Add your partner and yourself.")}
                </p>
            </motion.div>

            <motion.form
                onSubmit={handleAdd}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 mb-8"
            >
                <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    disabled={reachedLimit}
                    placeholder={reachedLimit ? "Limit Reached" : "Player Name"}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-white/50 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={!nameInput.trim() || reachedLimit}
                    className={`px-5 rounded-xl flex items-center justify-center transition-all active:scale-95 ${mode === 'steamy' ? 'bg-steamy-main hover:bg-steamy-accent shadow-lg shadow-steamy-main/20' : isGroup ? 'bg-group-pink hover:bg-group-pink/80 shadow-lg shadow-group-pink/20' : 'bg-couple-crimson hover:bg-couple-crimson/80 shadow-lg shadow-couple-crimson/20'
                        } disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`}
                >
                    <UserPlus size={24} className="text-white" />
                </button>
            </motion.form>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                {players.map((p, idx) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex items-center justify-between glass-panel px-4 py-3 rounded-xl ${mode === 'steamy' ? 'border-steamy-main/20 bg-steamy-dark/20' : ''}`}
                    >
                        <span className={`font-poppins text-white text-lg ${mode === 'steamy' ? 'text-steamy-main' : ''}`}>{p.name}</span>
                        <button
                            onClick={() => removePlayer(p.id)}
                            className="text-white/40 hover:text-white/90 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
            >
                <button
                    onClick={handleStart}
                    disabled={players.length < 2 || (isLimited && players.length !== 2)}
                    className={`w-full py-4 rounded-full font-outfit font-bold text-xl flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed
            ${mode === 'steamy'
                            ? 'bg-gradient-to-r from-steamy-main to-steamy-secondary text-white shadow-steamy-main/30'
                            : isGroup
                                ? 'bg-gradient-to-r from-group-blue to-group-pink text-white shadow-[#ff007f]/30'
                                : 'bg-gradient-to-r from-couple-crimson to-couple-gold text-black shadow-[#dc143c]/30'}
          `}
                >
                    <Play fill="currentColor" size={24} />
                    Let's Play
                </button>
            </motion.div>

            <footer className="mt-8 text-center text-white/20 text-[10px] font-inter tracking-widest uppercase pb-2">
                v{VERSION} ({BUILD_NUMBER})
            </footer>
        </div>
    );
};

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Users, Heart } from 'lucide-react';

export const Splash = () => {
    const { setMode, setGameState, isVirtual, setVirtual } = useGameStore();

    const handleSelectMode = (mode: 'group' | 'couple') => {
        setMode(mode);
        setGameState('setup');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-12 px-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center"
            >
                <h1 className="text-6xl font-outfit font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-group-blue to-group-pink drop-shadow-[0_0_15px_rgba(255,0,127,0.5)]">
                    Truth
                </h1>
                <h2 className="text-4xl font-outfit italic text-white/80 my-2">&amp;</h2>
                <h1 className="text-6xl font-outfit font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-couple-crimson to-couple-gold drop-shadow-[0_0_15px_rgba(220,20,60,0.5)]">
                    Dare
                </h1>
            </motion.div>

            <motion.div
                className="w-full max-w-sm space-y-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <button
                    onClick={() => handleSelectMode('group')}
                    className="w-full relative group overflow-hidden rounded-2xl glass-panel p-6 flex flex-col items-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-group-blue/20 to-group-pink/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Users className="w-10 h-10 text-group-blue drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
                    <div className="text-center">
                        <h3 className="text-2xl font-poppins font-bold text-white tracking-wide">Group Mode</h3>
                        <p className="text-sm text-white/60 font-inter mt-1">Fun, slightly edgy, &amp; harmless.</p>
                    </div>
                </button>

                <button
                    onClick={() => handleSelectMode('couple')}
                    className="w-full relative group overflow-hidden rounded-2xl glass-panel p-6 flex flex-col items-center gap-3 transition-all hover:scale-105 active:scale-95 border-couple-crimson/30"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-couple-crimson/20 to-couple-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Heart className="w-10 h-10 text-couple-crimson drop-shadow-[0_0_10px_rgba(220,20,60,0.8)] fill-couple-crimson/30" />
                    <div className="text-center">
                        <h3 className="text-2xl font-poppins font-bold text-white tracking-wide">Couple Mode</h3>
                        <p className="text-sm text-couple-gold/80 font-inter mt-1">Highly explicit &amp; intimate.</p>
                    </div>
                </button>

                <div className="flex items-center justify-between glass-panel px-6 py-4 rounded-2xl w-full">
                    <div>
                        <h4 className="font-poppins font-bold text-white tracking-wide text-lg">Virtual Mode</h4>
                        <p className="text-white/50 text-xs font-inter mt-1">Play over video call/distance</p>
                    </div>
                    <button
                        onClick={() => setVirtual(!isVirtual)}
                        className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${isVirtual ? 'bg-group-pink justify-end' : 'bg-white/20 justify-start'}`}
                    >
                        <motion.div
                            layout
                            className="w-6 h-6 rounded-full bg-white shadow-md"
                        />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

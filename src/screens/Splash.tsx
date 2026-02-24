import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Users, Heart, Flame } from 'lucide-react';
import { VERSION, BUILD_NUMBER } from '../version';

export const Splash = () => {
    const { setMode, setGameState, isVirtual, setVirtual } = useGameStore();

    const handleSelectMode = (mode: 'group' | 'couple' | 'steamy') => {
        setMode(mode);
        setGameState('setup');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 py-10 overflow-y-auto no-scrollbar">
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
                className="w-full max-w-sm space-y-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <button
                    onClick={() => handleSelectMode('group')}
                    className="w-full relative group overflow-hidden rounded-2xl glass-panel p-5 flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-group-blue/20 to-group-pink/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Users className="w-8 h-8 text-group-blue drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
                    <div className="text-center">
                        <h3 className="text-xl font-poppins font-bold text-white tracking-wide">Group Mode</h3>
                        <p className="text-xs text-white/60 font-inter mt-0.5">Fun, slightly edgy, &amp; harmless.</p>
                    </div>
                </button>

                <button
                    onClick={() => handleSelectMode('couple')}
                    className="w-full relative group overflow-hidden rounded-2xl glass-panel p-5 flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 border-couple-crimson/30"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-couple-crimson/20 to-couple-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Heart className="w-8 h-8 text-couple-crimson drop-shadow-[0_0_10px_rgba(220,20,60,0.8)] fill-couple-crimson/30" />
                    <div className="text-center">
                        <h3 className="text-xl font-poppins font-bold text-white tracking-wide">Couple Mode</h3>
                        <p className="text-xs text-couple-gold/80 font-inter mt-0.5">Highly explicit &amp; intimate.</p>
                    </div>
                </button>

                <button
                    onClick={() => handleSelectMode('steamy')}
                    className="w-full relative group overflow-hidden rounded-2xl glass-panel p-5 flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 border-steamy-accent/30 shadow-[0_0_20px_rgba(255,77,0,0.1)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-steamy-main/20 to-steamy-dark/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Flame className="w-8 h-8 text-steamy-main drop-shadow-[0_0_12px_rgba(255,77,0,0.8)] fill-steamy-main/20" />
                    <div className="text-center">
                        <h3 className="text-xl font-poppins font-bold text-white tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-steamy-main to-steamy-accent">Steamy Mode</h3>
                        <p className="text-xs text-steamy-main font-inter mt-0.5 font-bold drop-shadow-sm">Explicit sexual dares. No truths.</p>
                    </div>
                </button>

                <div className="flex items-center justify-between glass-panel px-6 py-3 rounded-2xl w-full">
                    <div>
                        <h4 className="font-poppins font-bold text-white tracking-wide text-md">Virtual Mode</h4>
                        <p className="text-white/50 text-[10px] font-inter">Play over distance</p>
                    </div>
                    <button
                        onClick={() => setVirtual(!isVirtual)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${isVirtual ? 'bg-group-pink justify-end' : 'bg-white/20 justify-start'}`}
                    >
                        <motion.div
                            layout
                            className="w-5 h-5 rounded-full bg-white shadow-md"
                        />
                    </button>
                </div>
            </motion.div>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-auto text-white/30 text-[10px] font-inter tracking-widest uppercase"
            >
                v{VERSION} ({BUILD_NUMBER})
            </motion.footer>
        </div>
    );
};

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { getRandomQuestion } from '../data/questions';
import { Bottle } from '../components/Bottle';
import { useShake } from '../hooks/useShake';

export const Game = () => {
    const { mode, isVirtual, players, gameState, activePlayerIndex, currentPrompt, currentType, spinBottle, setPrompt, completeTurn, endGame } = useGameStore();
    const [rotation, setRotation] = useState(0);

    const isGroup = mode === 'group';

    const handleSpin = () => {
        spinBottle();
    };

    // Shake to spin!
    useShake(() => {
        if (gameState === 'spinning') {
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate(50);
            }
            handleSpin();
        }
    });

    // When game enters choosing state, wait for bottle to finish rotating
    useEffect(() => {
        if (gameState === 'choosing' && activePlayerIndex !== -1) {
            // Calculate angle to the player
            let targetAngle = 0;
            if (isGroup) {
                const sliceAngle = 360 / players.length;
                targetAngle = (sliceAngle * activePlayerIndex);
            } else {
                targetAngle = activePlayerIndex === 0 ? 0 : 180;
            }

            // Random full rotations
            const extraSpins = 3 + Math.floor(Math.random() * 4); // 3 to 6 full spins
            const newRotation = rotation + (extraSpins * 360) + targetAngle - (rotation % 360);

            setRotation(newRotation);
        }
    }, [gameState, activePlayerIndex]);

    const activePlayer = players[activePlayerIndex];

    const handleSelection = (type: 'truth' | 'dare' | 'shot') => {
        if (type === 'shot') {
            setPrompt('shot', "Take a shot! 🥃");
        } else {
            const prompt = getRandomQuestion(mode, type, isVirtual);
            setPrompt(type, prompt);
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            {/* End Game Button */}
            <button
                onClick={endGame}
                className="absolute top-6 right-6 z-50 px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all active:scale-95 border border-white/10 text-white/80 shadow-lg"
                aria-label="End game"
            >
                End Game
            </button>

            {/* Circle of players */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {players.map((p, i) => {
                    let angle = 0;
                    let radius = window.innerWidth < 400 ? 150 : 200;

                    if (isGroup) {
                        angle = (i * (360 / players.length)) * (Math.PI / 180);
                    } else {
                        angle = (i === 0 ? 0 : 180) * (Math.PI / 180);
                        radius = window.innerWidth < 400 ? 180 : 240;
                    }

                    const x = Math.sin(angle) * radius;
                    const y = -Math.cos(angle) * radius;

                    const isActive = gameState !== 'spinning' && i === activePlayerIndex;

                    return (
                        <motion.div
                            key={p.id}
                            initial={{ x, y, scale: 0, opacity: 0 }}
                            animate={{ x, y, scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.6 }}
                            className={`absolute transition-colors font-outfit font-bold px-3 py-1 rounded-full whitespace-nowrap
                ${isActive ? (mode === 'steamy' ? 'text-steamy-main bg-steamy-main/10 shadow-[0_0_15px_rgba(255,77,0,0.3)]' : isGroup ? 'text-group-blue bg-white/10' : 'text-couple-gold bg-white/10') : 'text-white/50'}
              `}
                        >
                            {p.name}
                            {p.shotsTaken > 0 && <span className="ml-1 text-xs">🥃{p.shotsTaken}</span>}
                        </motion.div>
                    );
                })}
            </div>

            {/* The Bottle */}
            <div
                className={`cursor-pointer z-10 ${gameState === 'spinning' ? 'hover:scale-105 transition-transform' : ''}`}
                onClick={() => { if (gameState === 'spinning') handleSpin() }}
            >
                <Bottle rotation={rotation} />
            </div>

            {/* Tap to Spin Prompt */}
            {gameState === 'spinning' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-20 z-20"
                >
                    <span className={`font-inter tracking-widest uppercase text-sm animate-pulse ${mode === 'steamy' ? 'text-steamy-main' : 'text-white/50'}`}>
                        Tap or Shake to Spin
                    </span>
                </motion.div>
            )}

            {/* Choice Modal */}
            <AnimatePresence>
                {gameState === 'choosing' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } }}
                        transition={{ delay: 1.5 }} // delay for spin to finish
                        className={`absolute bottom-10 inset-x-4 glass-panel p-6 rounded-3xl flex flex-col items-center gap-4 z-30 ${mode === 'steamy' ? 'border-steamy-accent/30 shadow-[0_0_30px_rgba(255,77,0,0.1)]' : ''}`}
                    >
                        <h3 className={`text-2xl font-poppins font-bold text-center ${mode === 'steamy' ? 'text-white' : ''}`}>
                            {activePlayer?.name}'s Turn
                        </h3>
                        <div className="flex gap-4 w-full justify-center">
                            {mode !== 'steamy' && (
                                <button onClick={() => handleSelection('truth')} className={`flex-1 py-4 text-xl font-bold rounded-2xl bg-gradient-to-br border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg ${isGroup ? 'from-group-blue/80 to-blue-600 shadow-group-blue/30 text-white' : 'from-couple-gold/80 to-yellow-600 shadow-couple-gold/30 text-black'}`}>
                                    Truth
                                </button>
                            )}
                            <button onClick={() => handleSelection('dare')} className={`flex-1 py-4 text-xl font-bold rounded-2xl bg-gradient-to-br border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg 
                                ${mode === 'steamy' 
                                    ? 'from-steamy-main to-steamy-secondary shadow-steamy-main/30 text-white' 
                                    : isGroup ? 'from-group-pink/80 to-pink-600 shadow-group-pink/30 text-white' : 'from-couple-crimson/80 to-red-900 shadow-couple-crimson/30 text-white'}`}>
                                {mode === 'steamy' ? 'Perform Dare 🔥' : 'Dare'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Performing Modal */}
            <AnimatePresence>
                {gameState === 'performing' && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: "spring", damping: 20 }}
                        className={`absolute inset-0 z-40 p-6 flex flex-col justify-center items-center text-center
              ${mode === 'steamy' ? 'bg-gradient-to-br from-steamy-accent/20 via-steamy-dark to-black/95 backdrop-blur-3xl' : isGroup ? 'bg-gradient-to-br from-group-blue/20 to-group-pink/20 backdrop-blur-3xl' : 'bg-gradient-to-br from-couple-crimson/20 to-black/80 backdrop-blur-3xl'}
            `}
                    >
                        <span className={`text-sm tracking-widest uppercase font-bold mb-4
              ${mode === 'steamy' ? 'text-steamy-main' : currentType === 'truth' ? (isGroup ? 'text-group-blue' : 'text-couple-gold') : currentType === 'dare' ? (isGroup ? 'text-group-pink' : 'text-couple-crimson') : 'text-orange-400'}`
                        }>
                            {mode === 'steamy' ? 'Steamy Dare' : currentType}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-12 drop-shadow-md leading-tight">
                            {currentPrompt}
                        </h2>

                        <div className="flex flex-col gap-4 w-full max-w-sm">
                            <button
                                onClick={completeTurn}
                                className="w-full py-4 rounded-full font-outfit font-bold text-xl uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 shadow-lg"
                            >
                                Done
                            </button>
                            {currentType !== 'shot' && (
                                <button
                                    onClick={() => handleSelection('shot')}
                                    className="w-full py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/80 font-bold text-md tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
                                >
                                    Skip (Take a Shot 🥃)
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

import { motion } from 'framer-motion';

import bottleImg from '../assets/bottle.png';

interface BottleProps {
    rotation: number;
}

export const Bottle = ({ rotation }: BottleProps) => {
    return (
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: rotation }}
            transition={{
                type: "spring",
                damping: 15,
                stiffness: 40,
                restDelta: 0.1,
                restSpeed: 0.1
            }}
            className="relative z-10 flex items-center justify-center drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            {/* Absolute Pointing indicator on top of the bottle neck */}
            {/* <div className="absolute -top-4 text-[#ff007f] drop-shadow-lg z-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2z" />
                </svg>
            </div> */}

            <img
                src={bottleImg}
                alt="Bottle"
                className="w-64 h-auto object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}
            />
        </motion.div>
    );
};

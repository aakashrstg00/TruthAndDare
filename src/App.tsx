import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { Splash } from './screens/Splash';
import { Setup } from './screens/Setup';
import { Game } from './screens/Game';

function App() {
  const { gameState, mode, isVirtual } = useGameStore();

  // Prevent zooming on mobile
  useEffect(() => {
    const disablePinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', disablePinchZoom, { passive: false });
    return () => {
      document.removeEventListener('touchmove', disablePinchZoom);
    };
  }, []);

  const getBackground = () => {
    if (gameState === 'splash' || gameState === 'setup') {
      if (isVirtual) {
        return 'bg-gradient-to-b from-[rgb(43,15,69)] via-[rgb(21,11,36)] to-black';
      }
      return 'bg-gradient-to-b from-dark-gradientStart via-dark-gradientMid to-dark-gradientEnd';
    }

    // In game, maybe solid dark or subtle radial gradient based on mode
    if (mode === 'group') {
      return isVirtual
        ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/50 via-[#130b2e] to-black'
        : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black';
    } else if (mode === 'couple') {
      return isVirtual
        ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/40 via-[#260f1b] to-black'
        : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black';
    } else {
        // Steamy mode - intense heat theme
        return 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-steamy-accent/20 via-steamy-dark to-black';
    }
  };

  return (
    <div className={`w-screen h-[100dvh] overflow-hidden text-white transition-colors duration-1000 ${getBackground()}`}>
      {gameState === 'splash' && <Splash />}
      {gameState === 'setup' && <Setup />}
      {(gameState === 'spinning' || gameState === 'choosing' || gameState === 'performing') && <Game />}
    </div>
  );
}

export default App;

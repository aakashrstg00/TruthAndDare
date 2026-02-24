import { useEffect, useRef } from 'react';

export const useShake = (onShake: () => void, threshold = 25) => {
    const lastUpdate = useRef(0);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const lastZ = useRef(0);

    useEffect(() => {
        const handleMotion = (event: DeviceMotionEvent) => {
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;

            const curTime = Date.now();
            // Capture every 100ms
            if ((curTime - lastUpdate.current) > 100) {
                const diffTime = curTime - lastUpdate.current;
                lastUpdate.current = curTime;

                const x = acc.x || 0;
                const y = acc.y || 0;
                const z = acc.z || 0;

                // Simple shake detection algorithm:
                // Sum of differences in acceleration divided by time
                const speed = Math.abs(x + y + z - lastX.current - lastY.current - lastZ.current) / diffTime * 10000;

                if (speed > threshold) {
                    onShake();
                }

                lastX.current = x;
                lastY.current = y;
                lastZ.current = z;
            }
        };

        window.addEventListener('devicemotion', handleMotion);
        return () => window.removeEventListener('devicemotion', handleMotion);
    }, [onShake, threshold]);
};

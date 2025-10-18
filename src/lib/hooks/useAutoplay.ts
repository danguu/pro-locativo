import { useEffect, useRef } from "react";

export const useAutoplay = (callback: () => void, delay = 6000, isActive = true) => {
  const savedCallback = useRef(callback);
  const savedDelay = useRef(delay);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedDelay.current = delay;
  }, [delay]);

  useEffect(() => {
    if (!isActive) return;

    const tick = () => savedCallback.current();
    const id = window.setInterval(tick, savedDelay.current);

    return () => window.clearInterval(id);
  }, [isActive]);
};

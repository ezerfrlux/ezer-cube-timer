import { useRef, useState } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = () => {
    if (running) return;

    startTimeRef.current = Date.now() - time;

    intervalRef.current = window.setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);

    setRunning(true);
  };

  const stop = () => {
    if (!running) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setRunning(false);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setRunning(false);
  };

  return {
    time,
    running,
    start,
    stop,
    reset,
  };
}

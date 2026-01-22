import { useEffect, useRef, useState } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [solves, setSolves] = useState<number[]>([]);

  const [running, setRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);

    startTimeRef.current = Date.now();

    intervalRef.current = window.setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);

    setRunning(true);
  };

const stop = () => {
    if (!running) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const deleteSolve = (indexToDelete: number) => {
    setSolves((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return {
    solves,
    setSolves,
    time,
    running,
    start,
    stop,
    deleteSolve,
  };
}

import { useEffect } from "react";

import "./App.css";
import { useTimer } from "./hooks/useTimer";
import TimesPanel from "./components/TimesPanel";

function App() {
  const { time, running, start, stop, solves, setSolves,deleteSolve } = useTimer();

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStop = () => {
    stop();
    setSolves((prev) => [time, ...prev]);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return;

      if (event.code === "Space") {
        event.preventDefault();

        if (running) {
          handleStop();
        } else {
          start();
        }
      }
    };

    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [running, start, stop]);
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background">
      <TimesPanel solves={solves} onDelete={deleteSolve} />
      <main className="flex flex-col items-center justify-center p-8">
        <h1 className="mb-8 font-mono font-bold tracking-tighter text-7xl text-primary">
          {formatTime(time)}
        </h1>
      </main>
    </div>
  );
}

export default App;

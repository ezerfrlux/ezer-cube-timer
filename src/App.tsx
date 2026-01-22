import { useEffect, useState } from "react";

import "./App.css";
import { useTimer } from "./hooks/useTimer";
import TimesPanel from "./components/TimesPanel";

function App() {
  const [solves, setSolves] = useState<number[]>([]);
  const { time, running, start, stop } = useTimer();
  
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor(ms % 1000 / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStop = () => {
    stop()
    setSolves((prev) => [time, ...prev])
  }

  useEffect(() => {},[running, time, start, stop])

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background">
      <TimesPanel solves={solves}/>
      <main className="flex flex-col items-center justify-center p-8">
        <h1 className="mb-8 font-mono font-bold tracking-tighter text-7xl text-primary">
          {formatTime(time)}
        </h1>

        <div className="flex gap-4">
          <button
            onClick={running ? handleStop : start}
            className="px-6 py-3 font-bold rounded shadow-lg shadow-primary/20"
          >
            {running ? "STOP" : "START"}
          </button>

 
        </div>
      </main>
    </div>
  );
}

export default App;

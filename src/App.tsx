import "./App.css";
import { useTimer } from "./hooks/useTimer";
import TimesPanel from "./components/TimesPanel";

function App() {
  const { time, running, start, stop, reset } = useTimer();

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor(ms % 1000 / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background">
      <TimesPanel />
      <main className="flex flex-col items-center justify-center p-8">
        <h1 className="text-7xl font-mono font-bold text-primary mb-8 tracking-tighter">
          {formatTime(time)}
        </h1>

        <div className="flex gap-4">
          <button
            onClick={running ? stop : start}
            className="shadow-lg shadow-primary/20 px-6 py-3 rounded font-bold"
          >
            {running ? "STOP" : "START"}
          </button>

          <button
            onClick={reset}
            className="px-6 py-3 rounded border border-white/10"
          >
            RESET
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

import { useEffect, useCallback, useState } from "react";
import "./App.css";
import { useTimer } from "./hooks/useTimer";
import TimesPanel from "./components/TimesPanel";
import { useScramble } from "./hooks/useScramble";

function App() {
  const { scramble, generateNewScramble } = useScramble();
  const { time, running, start, stop, solves, setSolves, deleteSolve } =
    useTimer();
  const [isReady, setIsReady] = useState(false);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  // Usamos useCallback para que no se recree en cada render
  const handleStop = useCallback(() => {
    stop();
    setSolves((prev) => [time, ...prev]);
    generateNewScramble(); // <--- Generar nuevo scramble al terminar
  }, [stop, time, setSolves, generateNewScramble]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.code === "Space") {
        event.preventDefault();

        if (running) {
          // Detenemos el timer
          handleStop();
          // Bloqueamos que se reinicie al soltar esta misma pulsación
          setIsReady(false);
        } else {
          // Si no está corriendo, indicamos que estamos listos para empezar
          setIsReady(true);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();

        // Solo empezamos si NO estaba corriendo y si venimos de un keyDown válido
        if (!running && isReady) {
          start();
          setIsReady(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [running, isReady, start, handleStop]);
  useEffect(() => {
    generateNewScramble();
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-[300px_1fr] bg-[#0c0c0e] text-[#e4e4e7] selection:bg-primary/30">
      {/* Panel Lateral con un toque de Blur o borde sutil */}
      <aside className="border-r border-white/5 bg-black/20 backdrop-blur-md">
        <TimesPanel solves={solves} onDelete={deleteSolve} />
      </aside>

      <main className="relative flex flex-col items-center justify-center p-12 overflow-hidden">
        {/* Decoración de fondo sutil (Opcional) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Contenedor del Scramble */}
        <div
          className={`w-full max-w-4xl transition-all duration-500 ease-in-out ${
            running
              ? "opacity-0 scale-95 blur-md"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          <div className="relative group">
            <div className="absolute transition duration-1000 opacity-25 -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur group-hover:opacity-50"></div>
            <div className="relative px-8 py-6 bg-[#161618] border border-white/5 rounded-xl shadow-2xl">
              <span className="absolute top-[-10px] left-4 px-2 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-[#161618] text-muted-foreground/60 border border-white/5 rounded">
                Current Scramble
              </span>
              <p className="font-mono text-2xl lg:text-3xl leading-relaxed text-center tracking-[0.15em] text-white/90 drop-shadow-sm">
                {scramble.split(" ").map((move, i) => (
                  <span
                    key={i}
                    className="inline-block mx-1 transition-colors cursor-default hover:text-primary"
                  >
                    {move}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Timer Principal */}
        <div className="flex flex-col items-center mt-20 mb-12">
          <h1
            className={`font-mono font-black tracking-tighter text-[10rem] tabular-nums transition-all duration-300 ${
              running
                ? "text-white scale-110"
                : isReady
                  ? "text-green-400"
                  : "text-primary"
            }`}
          >
            {formatTime(time)}
          </h1>

          {/* Atajo de teclado / Status */}
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 transition-opacity duration-500 ${running ? "opacity-0" : "opacity-100"}`}
          >
            <kbd className="px-2 py-0.5 rounded bg-white/10 text-xs font-sans border border-white/10 shadow-inner">
              SPACE
            </kbd>
            <span className="text-xs font-medium tracking-widest uppercase opacity-60">
              {isReady ? "Release to Start" : "Hold to Ready"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

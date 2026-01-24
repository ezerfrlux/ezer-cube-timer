import { useEffect, useCallback, useState } from "react";
import "./App.css";
import { useTimer } from "./hooks/useTimer";
import TimesPanel from "./components/TimesPanel";
import { useScramble } from "./hooks/useScramble";
import CubeVisualizer from "./components/CubeVisualizer";
import { Eye, EyeOff } from "lucide-react";

function App() {
  const { scramble, generateNewScramble } = useScramble();
  const [showVisualizer, setShowVisualizer] = useState(true);
  const { time, running, start, stop, solves, setSolves, deleteSolve } = useTimer();
  const [isReady, setIsReady] = useState(false);

  // Formateo de tiempo profesional (0:00.00)
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    }
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStop = useCallback(() => {
    stop();
    setSolves((prev) => [time, ...prev]);
    generateNewScramble();
    setIsReady(false);
  }, [stop, time, setSolves, generateNewScramble]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.code === "Space") {
        event.preventDefault();
        if (running) {
          handleStop();
        } else {
          setIsReady(true);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
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
    <div className="min-h-screen grid grid-cols-[300px_1fr] bg-[#0c0c0e] text-[#e4e4e7] overflow-hidden">
      {/* Panel Lateral de Tiempos */}
      <aside className="z-20 border-r border-white/5 bg-black/40 backdrop-blur-xl">
        <TimesPanel solves={solves} onDelete={deleteSolve} />
      </aside>

      {/* Área Principal */}
      <main className="relative flex flex-col items-center justify-center p-12 overflow-hidden bg-radial-gradient">
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* --- SECCIÓN DEL SCRAMBLE --- */}
        <div
          className={`w-full max-w-4xl flex flex-col items-center transition-all duration-700 ease-in-out ${
            running
              ? "opacity-0 scale-95 blur-2xl pointer-events-none"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          <div className="relative w-full group">
            {/* Resplandor de fondo al hacer hover */}
            <div className="absolute transition duration-1000 opacity-20 -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:opacity-40"></div>
            
            <div className="relative px-10 py-8 bg-[#121214] border border-white/[0.05] rounded-2xl shadow-2xl">
              <span className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-black tracking-[0.25em] uppercase bg-[#121214] text-primary/70 border border-white/[0.05] rounded-md shadow-lg">
                Scramble
              </span>
              <p className="font-mono text-xl lg:text-3xl leading-relaxed text-center tracking-[0.12em] text-white/90 drop-shadow-md selection:bg-primary/30">
                {scramble}
              </p>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN DEL TIMER --- */}
        <div className="flex flex-col items-center mt-24 mb-12">
          <h1
            className={`font-mono font-black tracking-tighter text-[11rem] tabular-nums transition-all duration-300 drop-shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
              running
                ? "text-white scale-105"
                : isReady
                ? "text-green-500 scale-100 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                : "text-primary scale-100"
            }`}
          >
            {formatTime(time)}
          </h1>
          
          <div
            className={`flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/[0.05] bg-white/[0.02] transition-all duration-500 shadow-inner ${
              running ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <kbd className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold border border-white/10 text-white/40 shadow-sm">
              SPACE
            </kbd>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
              {isReady ? "Release to Start" : "Hold to Ready"}
            </span>
          </div>
        </div>

        {/* --- WIDGET DEL CUBO FLOTANTE (DARK STEALTH) --- */}
        <div
          className={`fixed bottom-10 right-10 flex flex-col items-end gap-5 transition-all duration-700 ease-in-out z-50 ${
            running ? "opacity-0 translate-y-10 scale-90 blur-xl pointer-events-none" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Contenedor del Cubo */}
          <div
            className={`transition-all duration-500 origin-bottom-right ${
              showVisualizer 
                ? "scale-100 opacity-100" 
                : "scale-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-[#0c0c0e]/90 border border-white/[0.05] p-5 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.9)] backdrop-blur-3xl ring-1 ring-white/[0.05]">
               {/* Aplicamos un filtro sutil para que el cubo encaje con el modo oscuro */}
              <div className="brightness-90 contrast-110 grayscale-[10%]">
                <CubeVisualizer scramble={scramble} />
              </div>
            </div>
          </div>

          {/* Botón de Control Minimalista */}
          <button
            onClick={() => setShowVisualizer(!showVisualizer)}
            className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 border active:scale-90 overflow-hidden ${
              showVisualizer 
                ? "bg-primary/10 border-primary/20" 
                : "bg-[#121214] border-white/[0.05] hover:border-white/[0.1] shadow-2xl"
            }`}
          >
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              showVisualizer ? "opacity-100" : "opacity-0"
            } bg-gradient-to-br from-primary/10 to-transparent`} />

            <div className="relative z-10">
              {showVisualizer ? (
                <EyeOff size={22} className="transition-all duration-300 text-primary group-hover:text-white" />
              ) : (
                <Eye size={22} className="transition-all duration-300 text-white/20 group-hover:text-white/50" />
              )}
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
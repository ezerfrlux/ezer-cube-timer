import "./App.css";
import TimesPanel from "./components/TimesPanel";

function App() {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background">
      <TimesPanel />
      <main className="flex flex-col items-center justify-center p-8">
        <h1 className="text-7xl font-mono font-bold text-primary mb-8 tracking-tighter">
          00:00.00
        </h1>

        <div className="flex gap-4">
          <button className="shadow-lg shadow-primary/20 px-6 py-3 rounded font-bold">
            START
          </button>

          <input
            type="text"
            placeholder="Escribe algo..."
            className="w-64 px-4 py-2 rounded bg-white/5 border border-white/10"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
